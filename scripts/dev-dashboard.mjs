import { spawn, exec } from "child_process";
import readline from "readline";

const apps = [
    {
        id: "all",
        key: "a",
        name: "ALL APPLICATIONS",
        shortName: "All (Combined)",
        port: null,
        color: "\x1b[35m", // Magenta
        badge: "ALL",
    },
    {
        id: "01",
        key: "1",
        name: "01-minimal",
        shortName: "portfolio-01-minimal",
        port: 3001,
        cmd: "pnpm",
        args: ["--filter", "portfolio-01-minimal", "dev"],
        color: "\x1b[36m", // Cyan
        badge: "01-MINIMAL",
    },
    {
        id: "02",
        key: "2",
        name: "02-dev",
        shortName: "portfolio-02-dev",
        port: 3002,
        cmd: "pnpm",
        args: ["--filter", "portfolio-02-dev", "dev"],
        color: "\x1b[35m", // Magenta
        badge: "02-DEV",
    },
    {
        id: "03",
        key: "3",
        name: "03-interactive",
        shortName: "portfolio-03-interactive",
        port: 3003,
        cmd: "pnpm",
        args: ["--filter", "portfolio-03-interactive", "dev"],
        color: "\x1b[33m", // Yellow
        badge: "03-INTERACTIVE",
    },
    {
        id: "04",
        key: "4",
        name: "04-vite-express",
        shortName: "portfolio-04-vite-express",
        port: 3004,
        cmd: "pnpm",
        args: ["--filter", "portfolio-04-vite-express", "dev"],
        color: "\x1b[34m", // Blue
        badge: "04-VITE-EXPRESS",
    },
];

const state = {
    selectedIndex: 0,
    logs: {
        all: [],
        "01": [],
        "02": [],
        "03": [],
        "04": [],
    },
    processes: {},
    statuses: {
        "01": "STOPPED",
        "02": "STOPPED",
        "03": "STOPPED",
        "04": "STOPPED",
    },
    maxLogs: 2000,
    renderScheduled: false,
};

function appendLog(appId, line, isRaw = false) {
    const timestamp = new Date().toLocaleTimeString();
    const app = apps.find((a) => a.id === appId);
    const color = app ? app.color : "\x1b[37m";

    const formattedSingle = isRaw ? line : `${color}[${timestamp}]\x1b[0m ${line}`;
    const formattedAll = isRaw ? line : `${color}[${app?.badge || appId}]\x1b[0m ${line}`;

    if (appId !== "all") {
        state.logs[appId].push(formattedSingle);
        if (state.logs[appId].length > state.maxLogs) state.logs[appId].shift();
    }

    state.logs.all.push(formattedAll);
    if (state.logs.all.length > state.maxLogs) state.logs.all.shift();

    scheduleRender();
}

function startApp(app) {
    if (app.id === "all") return;
    if (state.processes[app.id]) return;

    state.statuses[app.id] = "STARTING";
    appendLog(app.id, `Starting ${app.shortName} on port ${app.port}...`);

    const proc = spawn(app.cmd, app.args, {
        cwd: process.cwd(),
        env: { ...process.env, PORT: String(app.port) },
        shell: true,
    });

    state.processes[app.id] = proc;
    state.statuses[app.id] = "RUNNING";

    const rlOut = readline.createInterface({ input: proc.stdout });
    rlOut.on("line", (line) => {
        if (line.trim()) appendLog(app.id, line);
    });

    const rlErr = readline.createInterface({ input: proc.stderr });
    rlErr.on("line", (line) => {
        if (line.trim()) appendLog(app.id, `\x1b[31m${line}\x1b[0m`);
    });

    proc.on("close", (code) => {
        delete state.processes[app.id];
        state.statuses[app.id] = code === 0 ? "STOPPED" : "CRASHED";
        appendLog(app.id, `Process exited with code ${code}`);
        scheduleRender();
    });

    proc.on("error", (err) => {
        delete state.processes[app.id];
        state.statuses[app.id] = "CRASHED";
        appendLog(app.id, `Failed to start process: ${err.message}`);
        scheduleRender();
    });
}

function startAll() {
    apps.forEach((app) => {
        if (app.id !== "all") startApp(app);
    });
}

function stopApp(appId) {
    const proc = state.processes[appId];
    if (proc) {
        state.statuses[appId] = "STOPPED";
        try {
            proc.kill("SIGTERM");
        } catch {
            // ignore
        }
        delete state.processes[appId];
    }
}

function restartApp(app) {
    if (app.id === "all") {
        apps.forEach((a) => {
            if (a.id !== "all") {
                stopApp(a.id);
                setTimeout(() => startApp(a), 300);
            }
        });
    } else {
        stopApp(app.id);
        setTimeout(() => startApp(app), 300);
    }
}

function openInBrowser(app) {
    if (!app.port) return;
    const url = `http://localhost:${app.port}`;
    const startCmd =
        process.platform === "darwin"
            ? `open ${url}`
            : process.platform === "win32"
            ? `start ${url}`
            : `xdg-open ${url}`;
    exec(startCmd);
    appendLog(app.id, `Opened ${url} in browser.`);
}

function scheduleRender() {
    if (state.renderScheduled) return;
    state.renderScheduled = true;
    setImmediate(() => {
        state.renderScheduled = false;
        render();
    });
}

function render() {
    const cols = process.stdout.columns || 100;
    const rows = process.stdout.rows || 30;

    const sidebarWidth = 32;
    const mainWidth = cols - sidebarWidth - 1;

    let buf = "\x1b[H"; // Move to home (0,0)

    const selectedApp = apps[state.selectedIndex];

    // Build Header
    const title = ` PORTFOLIO MONOREPO DEV DASHBOARD `;
    const headerLine = `\x1b[44m\x1b[1m\x1b[37m${title.padEnd(cols, " ")}\x1b[0m\n`;
    buf += headerLine;

    const contentHeight = rows - 4; // space for header, statusbar, keybindings

    for (let r = 0; r < contentHeight; r++) {
        // Sidebar item
        let sideText = "";
        const appIndex = r;
        if (appIndex < apps.length) {
            const app = apps[appIndex];
            const isSelected = appIndex === state.selectedIndex;
            const status = state.statuses[app.id] || "RUNNING";
            let statusIcon = "\x1b[32m●\x1b[0m"; // Green
            if (status === "STOPPED") statusIcon = "\x1b[90m○\x1b[0m";
            if (status === "CRASHED") statusIcon = "\x1b[31m✖\x1b[0m";
            if (status === "STARTING") statusIcon = "\x1b[33m◌\x1b[0m";

            const portText = app.port ? `:${app.port}` : " [Combined]";
            const label = `[${app.key}] ${app.name}${portText}`;

            if (isSelected) {
                sideText = `\x1b[7m\x1b[1m ${statusIcon} ${label.padEnd(sidebarWidth - 4, " ")}\x1b[0m`;
            } else {
                sideText = ` ${statusIcon} ${label.padEnd(sidebarWidth - 4, " ")}`;
            }
        } else if (r === apps.length + 1) {
            sideText = `\x1b[90m─ Quick Actions ─────────────\x1b[0m`;
        } else if (r === apps.length + 2) {
            sideText = ` \x1b[36m[A/1-4]\x1b[0m Switch Tab`;
        } else if (r === apps.length + 3) {
            sideText = ` \x1b[36m[O]\x1b[0m Open Browser`;
        } else if (r === apps.length + 4) {
            sideText = ` \x1b[36m[R]\x1b[0m Restart Active`;
        } else if (r === apps.length + 5) {
            sideText = ` \x1b[36m[C]\x1b[0m Clear Logs`;
        } else if (r === apps.length + 6) {
            sideText = ` \x1b[36m[Q]\x1b[0m Quit Dashboard`;
        }

        // Pad sidebar
        const paddedSide = padAnsi(sideText, sidebarWidth);

        // Main Log line
        const activeLogs = state.logs[selectedApp.id] || [];
        const visibleLogCount = contentHeight;
        const startIndex = Math.max(0, activeLogs.length - visibleLogCount);
        const logLine = activeLogs[startIndex + r] || "";
        const paddedLog = padAnsi(logLine, mainWidth);

        buf += `${paddedSide}\x1b[90m│\x1b[0m${paddedLog}\n`;
    }

    // Active App Header Bar
    const activeInfo = selectedApp.port
        ? `${selectedApp.shortName} → http://localhost:${selectedApp.port} [STATUS: ${state.statuses[selectedApp.id]}]`
        : `Viewing all merged logs across 4 portfolio applications`;
    const barLine = `\x1b[47m\x1b[30m\x1b[1m ${activeInfo.padEnd(cols - 2, " ")} \x1b[0m\n`;
    buf += barLine;

    // Controls Legend
    const legend = ` Controls: [↑/↓] Navigate  [1-4/A] Switch  [O] Open URL  [R] Restart  [C] Clear  [Q] Quit `;
    buf += `\x1b[90m${legend.padEnd(cols, " ")}\x1b[0m`;

    process.stdout.write(buf);
}

function padAnsi(str, targetLen) {
    // Strip ANSI codes to measure printable length
    const plain = str.replace(/\x1b\[[0-9;]*m/g, "");
    const diff = targetLen - plain.length;
    if (diff > 0) {
        return str + " ".repeat(diff);
    }
    return str; // If longer, string remains
}

function cleanupAndExit() {
    process.stdout.write("\x1b[?25h\x1b[2J\x1b[H"); // Show cursor, clear screen
    console.log("Shutting down dev servers...");
    apps.forEach((app) => stopApp(app.id));
    process.exit(0);
}

function setupKeyboard() {
    readline.emitKeypressEvents(process.stdin);
    if (process.stdin.isTTY) process.stdin.setRawMode(true);

    process.stdout.write("\x1b[?25l"); // Hide cursor
    process.stdout.write("\x1b[2J"); // Clear screen

    process.stdin.on("keypress", (str, key) => {
        if (key.ctrl && key.name === "c") {
            cleanupAndExit();
        } else if (key.name === "q") {
            cleanupAndExit();
        } else if (key.name === "up") {
            state.selectedIndex = (state.selectedIndex - 1 + apps.length) % apps.length;
            scheduleRender();
        } else if (key.name === "down") {
            state.selectedIndex = (state.selectedIndex + 1) % apps.length;
            scheduleRender();
        } else if (str === "a" || str === "A") {
            state.selectedIndex = 0;
            scheduleRender();
        } else if (str >= "1" && str <= "4") {
            state.selectedIndex = parseInt(str, 10);
            scheduleRender();
        } else if (str === "o" || str === "O") {
            openInBrowser(apps[state.selectedIndex]);
        } else if (str === "r" || str === "R") {
            restartApp(apps[state.selectedIndex]);
        } else if (str === "c" || str === "C") {
            state.logs[apps[state.selectedIndex].id] = [];
            scheduleRender();
        }
    });

    process.stdout.on("resize", () => {
        process.stdout.write("\x1b[2J");
        scheduleRender();
    });
}

// Start execution
setupKeyboard();
startAll();
render();

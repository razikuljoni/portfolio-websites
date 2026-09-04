import type { Metadata } from "next";
import ResumeContent from "./resume-content";

export const metadata: Metadata = {
    title: "Resume — MD Razikul Islam Joni",
    description:
        "Professional resume of MD Razikul Islam Joni — Full Stack (MERN) Developer around 2 years of experience in React, Next.js, Node.js, and MongoDB.",
};

export default function ResumePage() {
    return (
        <div className="resume-page-wrapper">
            <ResumeContent />
        </div>
    );
}

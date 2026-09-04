"use client";

import { Dialog } from "@base-ui/react/dialog";
import { LazyMotion, domAnimation, m } from "framer-motion";
import { Loader2, Mail, MessageSquare, User, X } from "lucide-react";
import { useCallback, useEffect, useReducer, useRef } from "react";

import { Button } from "@/src/components/ui/button";
import { Input } from "@/src/components/ui/input";
import { Textarea } from "@/src/components/ui/textarea";
import { cn } from "@/src/lib/utils";
import { FaCircleCheck } from "react-icons/fa6";
import { MdSubject } from "react-icons/md";

interface FormData {
    name: string;
    email: string;
    subject: string;
    message: string;
}

interface FormErrors {
    name?: string;
    email?: string;
    subject?: string;
    message?: string;
}

type SubmitStatus = "idle" | "loading" | "success" | "error";

type FormState = {
    data: FormData;
    errors: FormErrors;
    status: SubmitStatus;
    rateUntil: number | null;
    cooldownRemaining: number;
};

type FormAction =
    | { type: "updateField"; field: keyof FormData; value: string }
    | { type: "setErrors"; errors: FormErrors }
    | { type: "setStatus"; status: SubmitStatus }
    | { type: "submitSuccess"; until: number; remaining: number }
    | { type: "tick"; remaining: number };

const RATE_LIMIT_MS = 60_000;

const initialFormData: FormData = {
    name: "",
    email: "",
    subject: "",
    message: "",
};

const initialState: FormState = {
    data: initialFormData,
    errors: {},
    status: "idle",
    rateUntil: null,
    cooldownRemaining: 0,
};

function formReducer(state: FormState, action: FormAction): FormState {
    switch (action.type) {
        case "updateField": {
            const nextErrors = { ...state.errors };
            delete nextErrors[action.field];
            return {
                ...state,
                data: { ...state.data, [action.field]: action.value },
                errors: nextErrors,
            };
        }
        case "setErrors":
            return { ...state, errors: action.errors };
        case "setStatus":
            return { ...state, status: action.status };
        case "submitSuccess":
            return {
                ...state,
                status: "success",
                errors: {},
                data: initialFormData,
                rateUntil: action.until,
                cooldownRemaining: action.remaining,
            };
        case "tick":
            return {
                ...state,
                cooldownRemaining: action.remaining,
                rateUntil: action.remaining <= 0 ? null : state.rateUntil,
            };
        default:
            return state;
    }
}

function validateEmail(email: string): boolean {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function validateForm(data: FormData): FormErrors {
    const errors: FormErrors = {};

    if (!data.name.trim()) {
        errors.name = "Name is required";
    }

    if (!data.subject.trim()) {
        errors.subject = "Subject is required";
    }

    if (!data.email.trim()) {
        errors.email = "Email is required";
    } else if (!validateEmail(data.email.trim())) {
        errors.email = "Please enter a valid email";
    }

    if (!data.message.trim()) {
        errors.message = "Message is required";
    } else if (data.message.trim().length < 10) {
        errors.message = "Message must be at least 10 characters";
    }

    return errors;
}

/*
 * Web3Forms Configuration:
 * 1. Sign up at https://web3forms.com/ to get your access key
 * 2. Replace YOUR_ACCESS_KEY_HERE with your actual access key
 * 3. The form will POST to https://api.web3forms.com/submit
 */

export function ContactFormDialog({
    open,
    onOpenChange,
}: {
    open: boolean;
    onOpenChange: (open: boolean) => void;
}) {
    return (
        <Dialog.Root open={open} onOpenChange={onOpenChange}>
            <Dialog.Portal>
                <Dialog.Backdrop className="data-open:animate-in data-closed:animate-out data-closed:fade-out-0 data-open:fade-in-0 fixed inset-0 z-50 bg-black/40 duration-150 supports-backdrop-filter:backdrop-blur-xs" />
                <Dialog.Popup className="data-open:animate-in data-closed:animate-out data-closed:fade-out-0 data-open:fade-in-0 data-closed:zoom-out-95 data-open:zoom-in-95 fixed top-1/2 left-1/2 z-50 grid w-full max-w-lg -translate-x-1/2 -translate-y-1/2 outline-none">
                    <ContactFormContent onClose={() => onOpenChange(false)} />
                </Dialog.Popup>
            </Dialog.Portal>
        </Dialog.Root>
    );
}

function ContactFormSuccess() {
    return (
        <div className="flex flex-col items-center gap-3 py-8 text-center">
            <FaCircleCheck className="size-5" />
            <p className="text-sm font-medium">Message sent successfully!</p>
            <p className="text-muted-foreground text-xs">I&apos;ll get back to you soon.</p>
        </div>
    );
}

type ContactFormFieldsProps = {
    formData: FormData;
    errors: FormErrors;
    status: SubmitStatus;
    isSubmitting: boolean;
    isRateLimited: boolean;
    cooldownRemaining: number;
    nameInputRef: React.RefObject<HTMLInputElement | null>;
    onChange: (
        field: keyof FormData,
    ) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
    onSubmit: (e: React.FormEvent) => void;
};

function ContactFormFields({
    formData,
    errors,
    status,
    isSubmitting,
    isRateLimited,
    cooldownRemaining,
    nameInputRef,
    onChange,
    onSubmit,
}: ContactFormFieldsProps) {
    return (
        <form onSubmit={onSubmit} className="flex flex-col gap-4" noValidate>
            <div
                aria-hidden="true"
                className="absolute -left-[9999px] top-0 opacity-0"
                tabIndex={-1}
            >
                <label htmlFor="bot-field">Leave this empty</label>
                <input
                    id="bot-field"
                    name="bot-field"
                    type="text"
                    tabIndex={-1}
                    autoComplete="off"
                    onChange={() => {}}
                />
            </div>

            <div className="flex flex-col gap-1.5">
                <label
                    htmlFor="contact-name"
                    className="text-muted-foreground flex items-center gap-1.5 text-xs"
                >
                    <User className="size-3.5" />
                    Name
                </label>
                <Input
                    ref={nameInputRef}
                    id="contact-name"
                    name="name"
                    type="text"
                    placeholder="Your full name"
                    value={formData.name}
                    onChange={onChange("name")}
                    aria-required="true"
                    aria-invalid={!!errors.name}
                    aria-describedby={errors.name ? "contact-name-error" : undefined}
                    disabled={isSubmitting}
                />
                {errors.name && (
                    <p id="contact-name-error" className="text-destructive text-xs" role="alert">
                        {errors.name}
                    </p>
                )}
            </div>

            <div className="flex flex-col gap-1.5">
                <label
                    htmlFor="contact-email"
                    className="text-muted-foreground flex items-center gap-1.5 text-xs"
                >
                    <Mail className="size-3.5" />
                    Email
                </label>
                <Input
                    id="contact-email"
                    name="email"
                    type="email"
                    placeholder="your_email@example.com"
                    value={formData.email}
                    onChange={onChange("email")}
                    aria-required="true"
                    aria-invalid={!!errors.email}
                    aria-describedby={errors.email ? "contact-email-error" : undefined}
                    disabled={isSubmitting}
                />
                {errors.email && (
                    <p id="contact-email-error" className="text-destructive text-xs" role="alert">
                        {errors.email}
                    </p>
                )}
            </div>

            <div className="flex flex-col gap-1.5">
                <label
                    htmlFor="contact-subject"
                    className="text-muted-foreground flex items-center gap-1.5 text-xs"
                >
                    <MdSubject className="size-3.5" />
                    Subject
                </label>
                <Input
                    id="contact-subject"
                    name="subject"
                    type="text"
                    placeholder="Subject of email"
                    value={formData.subject}
                    onChange={onChange("subject")}
                    aria-required="true"
                    aria-invalid={!!errors.subject}
                    aria-describedby={errors.subject ? "contact-subject-error" : undefined}
                    disabled={isSubmitting}
                />
                {errors.subject && (
                    <p id="contact-subject-error" className="text-destructive text-xs" role="alert">
                        {errors.subject}
                    </p>
                )}
            </div>

            <div className="flex flex-col gap-1.5">
                <label
                    htmlFor="contact-message"
                    className="text-muted-foreground flex items-center gap-1.5 text-xs"
                >
                    <MessageSquare className="size-3.5" />
                    Message
                </label>
                <Textarea
                    id="contact-message"
                    name="message"
                    placeholder="Your message…"
                    value={formData.message}
                    onChange={onChange("message")}
                    aria-required="true"
                    aria-invalid={!!errors.message}
                    aria-describedby={errors.message ? "contact-message-error" : undefined}
                    disabled={isSubmitting}
                    rows={4}
                />
                {errors.message && (
                    <p id="contact-message-error" className="text-destructive text-xs" role="alert">
                        {errors.message}
                    </p>
                )}
            </div>

            {status === "error" && (
                <div
                    className="bg-destructive/10 text-destructive flex items-center gap-2 px-2.5 py-2 text-xs"
                    role="alert"
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="14"
                        height="14"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        aria-hidden="true"
                    >
                        <path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3" />
                        <path d="M12 9v4" />
                        <path d="M12 17h.01" />
                    </svg>
                    <span>Failed to send. Please try again or email me directly.</span>
                </div>
            )}

            <div className="mt-2 flex flex-col gap-2">
                <Button
                    type="submit"
                    disabled={isSubmitting || isRateLimited}
                    aria-label={
                        isSubmitting
                            ? "Sending message…"
                            : isRateLimited
                              ? `Please wait ${cooldownRemaining}s before sending another message`
                              : "Send message"
                    }
                    className={cn(
                        "text-xs",
                        (isSubmitting || isRateLimited) && "cursor-not-allowed opacity-50",
                    )}
                >
                    {isSubmitting ? (
                        <>
                            <Loader2 className="size-3.5 animate-spin" />
                            Sending…
                        </>
                    ) : isRateLimited ? (
                        `Wait ${cooldownRemaining}s`
                    ) : (
                        "Send Message"
                    )}
                </Button>
                <p className="text-muted-foreground text-center text-[10px]">
                    Or email me directly at{" "}
                    <a
                        href="mailto:contact.razikuljoni@gmail.com"
                        className="underline underline-offset-2 hover:text-foreground transition-colors"
                    >
                        contact.razikuljoni@gmail.com
                    </a>
                </p>
            </div>
        </form>
    );
}

function ContactFormContent({ onClose }: { onClose: () => void }) {
    const [state, dispatch] = useReducer(formReducer, initialState);
    const { data: formData, errors, status, rateUntil, cooldownRemaining } = state;
    const nameInputRef = useRef<HTMLInputElement>(null);
    const cooldownTimerRef = useRef<ReturnType<typeof setInterval> | null>(null);

    useEffect(() => {
        const focusTimer = setTimeout(() => nameInputRef.current?.focus(), 100);
        return () => clearTimeout(focusTimer);
    }, []);

    useEffect(() => {
        if (!rateUntil) {
            return undefined;
        }

        cooldownTimerRef.current = setInterval(() => {
            const remaining = Math.max(0, Math.ceil((rateUntil - Date.now()) / 1000));
            dispatch({ type: "tick", remaining });
            if (remaining <= 0 && cooldownTimerRef.current) {
                clearInterval(cooldownTimerRef.current);
                cooldownTimerRef.current = null;
            }
        }, 1000);

        return () => {
            if (cooldownTimerRef.current) clearInterval(cooldownTimerRef.current);
        };
    }, [rateUntil]);

    const updateContactField = useCallback(
        (field: keyof FormData) =>
            (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
                dispatch({ type: "updateField", field, value: e.target.value });
            },
        [],
    );

    const handleSubmit = useCallback(
        async (e: React.FormEvent) => {
            e.preventDefault();

            const validationErrors = validateForm(formData);
            if (Object.keys(validationErrors).length > 0) {
                dispatch({ type: "setErrors", errors: validationErrors });
                return;
            }

            dispatch({ type: "setStatus", status: "loading" });
            dispatch({ type: "setErrors", errors: {} });

            try {
                const response = await fetch("https://api.web3forms.com/submit", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                        access_key: "YOUR_ACCESS_KEY_HERE",
                        name: formData.name.trim(),
                        email: formData.email.trim(),
                        message: formData.message.trim(),
                    }),
                });

                if (!response.ok) {
                    throw new Error("Failed to send message");
                }

                const until = Date.now() + RATE_LIMIT_MS;
                dispatch({
                    type: "submitSuccess",
                    until,
                    remaining: Math.ceil(RATE_LIMIT_MS / 1000),
                });

                setTimeout(() => {
                    dispatch({ type: "setStatus", status: "idle" });
                    onClose();
                }, 3000);
            } catch {
                dispatch({ type: "setStatus", status: "error" });
                setTimeout(() => dispatch({ type: "setStatus", status: "idle" }), 5000);
            }
        },
        [formData, onClose],
    );

    const isRateLimited = rateUntil !== null && cooldownRemaining > 0;
    const isSubmitting = status === "loading";

    return (
        <LazyMotion features={domAnimation}>
            <m.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, ease: "easeOut" }}
                className="bg-background ring-foreground/10 w-full rounded-none p-6 ring-1 sm:p-8"
            >
                <div className="mb-6 flex items-center justify-between">
                    <Dialog.Title className="text-sm font-medium">Get in Touch</Dialog.Title>
                    <Dialog.Close
                        className="text-muted-foreground hover:text-foreground inline-flex size-6 items-center justify-center transition-colors focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none"
                        aria-label="Close contact form"
                    >
                        <X className="size-4" />
                    </Dialog.Close>
                </div>

                <Dialog.Description className="text-muted-foreground mb-6 text-xs">
                    Send me a message and I&apos;ll get back to you as soon as possible.
                </Dialog.Description>

                {status === "success" ? (
                    <ContactFormSuccess />
                ) : (
                    <ContactFormFields
                        formData={formData}
                        errors={errors}
                        status={status}
                        isSubmitting={isSubmitting}
                        isRateLimited={isRateLimited}
                        cooldownRemaining={cooldownRemaining}
                        nameInputRef={nameInputRef}
                        onChange={updateContactField}
                        onSubmit={handleSubmit}
                    />
                )}
            </m.div>
        </LazyMotion>
    );
}

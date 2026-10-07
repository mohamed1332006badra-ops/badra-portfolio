import React from "react";

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  hint?: string;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, hint, className = "", id, ...props }, ref) => {
    const inputId = id || (label ? label.toLowerCase().replace(/\s+/g, "-") : undefined);

    return (
      <div className="w-full flex flex-col gap-1.5">
        {label && (
          <label htmlFor={inputId} className="text-xs font-medium text-slate-700 dark:text-slate-300">
            {label}
          </label>
        )}
        <input
          ref={ref}
          id={inputId}
          className={`w-full px-3.5 py-2.5 text-sm rounded-md bg-white dark:bg-[#141722] border ${
            error
              ? "border-red-500 focus:border-red-500 focus:ring-1 focus:ring-red-500"
              : "border-slate-300 dark:border-white/10 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
          } text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500 transition-colors ${className}`}
          {...props}
        />
        {hint && !error && <span className="text-[11px] text-slate-500 dark:text-slate-400">{hint}</span>}
        {error && <span className="text-[11px] text-red-500 font-medium">{error}</span>}
      </div>
    );
  }
);

Input.displayName = "Input";

export interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
  hint?: string;
}

export const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ label, error, hint, className = "", id, rows = 4, ...props }, ref) => {
    const textareaId = id || (label ? label.toLowerCase().replace(/\s+/g, "-") : undefined);

    return (
      <div className="w-full flex flex-col gap-1.5">
        {label && (
          <label htmlFor={textareaId} className="text-xs font-medium text-slate-700 dark:text-slate-300">
            {label}
          </label>
        )}
        <textarea
          ref={ref}
          id={textareaId}
          rows={rows}
          className={`w-full px-3.5 py-2.5 text-sm rounded-md bg-white dark:bg-[#141722] border ${
            error
              ? "border-red-500 focus:border-red-500 focus:ring-1 focus:ring-red-500"
              : "border-slate-300 dark:border-white/10 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
          } text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500 transition-colors resize-y ${className}`}
          {...props}
        />
        {hint && !error && <span className="text-[11px] text-slate-500 dark:text-slate-400">{hint}</span>}
        {error && <span className="text-[11px] text-red-500 font-medium">{error}</span>}
      </div>
    );
  }
);

Textarea.displayName = "Textarea";

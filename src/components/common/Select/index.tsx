"use client";

import { Check, ChevronDown } from "lucide-react";
import {
  useEffect,
  useId,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";

export interface SelectOption {
  [key: string]: string;
}

interface SelectProps {
  label?: ReactNode;
  value: string;
  options: any[];
  onChange: (value: any) => void;
  helperText?: ReactNode;
  placeholder?: string;
  error?: boolean;
  disabled?: boolean;
  id?: string;
  name?: string;
  className?: string;
  fieldValue?: string;
  fieldLabel?: string;
}

export default function Select({
  label,
  value,
  options,
  onChange,
  helperText,
  placeholder,
  error = false,
  disabled = false,
  id,
  name,
  className = "",
  fieldValue = "value",
  fieldLabel = "label",
}: SelectProps) {
  const autoId = useId();
  const selectId = id ?? autoId;
  const helperId = helperText ? `${selectId}-helper` : undefined;
  const labelId = label ? `${selectId}-label` : undefined;
  const listboxId = `${selectId}-listbox`;
  const rootRef = useRef<HTMLDivElement | null>(null);
  const [isOpen, setIsOpen] = useState(false);

  const selectedOption = useMemo(
    () =>
      options.find(
        (option) => option[fieldValue as keyof SelectOption] === value,
      ),
    [options, value, fieldValue],
  );

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (!rootRef.current) {
        return;
      }
      if (!rootRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  return (
    <div ref={rootRef} className={`space-y-2 ${className}`}>
      {label && (
        <label
          id={labelId}
          htmlFor={selectId}
          className="block text-sm font-medium text-text-main-light dark:text-gray-300"
        >
          {label}
        </label>
      )}
      <div className="relative">
        <button
          id={selectId}
          type="button"
          name={name}
          disabled={disabled}
          aria-expanded={isOpen}
          aria-haspopup="listbox"
          aria-controls={listboxId}
          aria-describedby={helperId}
          aria-labelledby={labelId}
          onClick={() => {
            if (!disabled) {
              setIsOpen((open) => !open);
            }
          }}
          onKeyDown={(event) => {
            if (event.key === "Escape") {
              setIsOpen(false);
            }
            if (event.key === "ArrowDown" && !isOpen) {
              setIsOpen(true);
            }
          }}
          className={`flex w-full items-center justify-between rounded-xl border bg-white/90 px-4 py-3 text-left text-sm text-text-main-light shadow-sm transition-all outline-none focus:outline-none focus:ring-2 focus:ring-primary/30 dark:bg-[#14161B] dark:text-gray-100 ${
            error
              ? "border-red-400/70 focus:ring-red-500/20"
              : "border-border-light dark:border-border-dark hover:border-primary/50"
          } ${disabled ? "cursor-not-allowed opacity-60" : "cursor-pointer"}`}
        >
          <span
            className={`truncate ${
              !selectedOption && placeholder
                ? "text-text-muted-light dark:text-text-muted-dark"
                : ""
            }`}
          >
            {String(
              selectedOption?.[fieldLabel as keyof SelectOption] ??
                placeholder ??
                "Select an option",
            )}
          </span>
          <ChevronDown
            className={`h-4 w-4 text-text-muted-light dark:text-text-muted-dark transition-transform ${
              isOpen ? "rotate-180" : ""
            }`}
          />
        </button>

        {isOpen && (
          <div
            id={listboxId}
            role="listbox"
            aria-labelledby={labelId}
            className="absolute z-50 mt-2 w-full rounded-xl border border-border-light bg-white p-1 shadow-xl dark:border-border-dark dark:bg-[#14161B]"
          >
            <div className="max-h-60 overflow-y-auto p-1 gap-1 flex flex-col">
              {options.map((option) => {
                const isSelected =
                  option[fieldValue as keyof SelectOption] === value;
                return (
                  <button
                    key={String(option.value)}
                    type="button"
                    role="option"
                    aria-selected={isSelected}
                    // disabled={option.disabled} --- IGNORE ---
                    onClick={() => {
                      if (!option.disabled) {
                        onChange(option);
                        setIsOpen(false);
                      }
                    }}
                    className={`flex w-full items-center justify-between rounded-lg px-3 py-2 text-sm transition-colors outline-none focus:outline-none ${
                      option.disabled
                        ? "cursor-not-allowed text-text-muted-light/60 dark:text-text-muted-dark/60"
                        : "text-text-main-light hover:bg-gray-100 dark:text-gray-100 dark:hover:bg-gray-800"
                    } ${isSelected ? "bg-primary/10 text-text-main-light" : ""}`}
                  >
                    <span className="truncate">
                      {String(option[fieldLabel as keyof SelectOption])}
                    </span>
                    {isSelected && <Check className="h-4 w-4 text-primary" />}
                  </button>
                );
              })}
            </div>
          </div>
        )}
      </div>
      {helperText && (
        <p
          id={helperId}
          className={`text-xs ${
            error
              ? "text-red-500"
              : "text-text-muted-light dark:text-text-muted-dark"
          }`}
        >
          {helperText}
        </p>
      )}
    </div>
  );
}

"use client";

import * as React from "react";
import { Check, ChevronDown, Search } from "lucide-react";
import { cn } from "@/lib/utils";

export interface SearchableSelectOption {
  value: string;
  label: string;
  disabled?: boolean;
}

interface SearchableSelectProps {
  value: string;
  onValueChange: (value: string) => void;
  options: SearchableSelectOption[];
  placeholder?: string;
  disabled?: boolean;
  className?: string;
}

export function SearchableSelect({
  value,
  onValueChange,
  options,
  placeholder = "Select an option",
  disabled,
  className,
}: SearchableSelectProps) {
  const [open, setOpen] = React.useState(false);
  const [search, setSearch] = React.useState("");
  const inputRef = React.useRef<HTMLInputElement>(null);
  const containerRef = React.useRef<HTMLDivElement>(null);

  // Get selected option
  const selectedOption = options.find((opt) => opt.value === value);

  // Filter options based on search
  const filteredOptions = React.useMemo(() => {
    // If no options, return empty
    if (!options || options.length === 0) return [];
    
    if (!search) return options;
    
    const lowerSearch = search.toLowerCase().trim();
    if (!lowerSearch) return options;
    
    return options.filter((opt) =>
      opt.label.toLowerCase().includes(lowerSearch) ||
      opt.value.toLowerCase().includes(lowerSearch)
    );
  }, [options, search]);

  // Close on outside click
  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setOpen(false);
        setSearch("");
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Focus search input when opened
  React.useEffect(() => {
    if (open && inputRef.current) {
      inputRef.current.focus();
      // Set search to empty string when opening to show all options
      setSearch("");
    }
  }, [open]);

  return (
    <div ref={containerRef} className={cn("relative", className)}>
      <button
        type="button"
        onClick={() => !disabled && setOpen(!open)}
        disabled={disabled}
        className={cn(
          "flex h-9 w-full items-center justify-between rounded-lg border border-input bg-transparent px-3 py-2 text-sm shadow-sm ring-offset-background transition-colors",
          "placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
          "disabled:cursor-not-allowed disabled:opacity-50",
          open && "ring-2 ring-ring ring-offset-2"
        )}
      >
        <span className={selectedOption ? "text-foreground" : "text-muted-foreground"}>
          {selectedOption?.label || placeholder}
        </span>
        <ChevronDown className="h-4 w-4 opacity-50" />
      </button>

      {open && (
        <div className="absolute z-50 w-full mt-1 bg-popover border rounded-lg shadow-lg overflow-hidden">
          {/* Search Input */}
          <div className="flex items-center border-b px-3">
            <Search className="h-4 w-4 mr-2 text-muted-foreground" />
            <input
              ref={inputRef}
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search..."
              className="flex-1 bg-transparent py-2 text-sm outline-none placeholder:text-muted-foreground"
            />
          </div>

          {/* Options List */}
          <div className="max-h-60 overflow-y-auto p-1">
            {(!options || options.length === 0) ? (
              <div className="py-6 text-center text-sm text-muted-foreground">
                Loading options...
              </div>
            ) : filteredOptions.length === 0 ? (
              <div className="py-6 text-center text-sm text-muted-foreground">
                No results found
              </div>
            ) : (
              filteredOptions.map((option) => (
                <button
                  key={option.value}
                  type="button"
                  onClick={() => {
                    onValueChange(option.value);
                    setOpen(false);
                    setSearch("");
                  }}
                  disabled={option.disabled}
                  className={cn(
                    "relative flex w-full cursor-default select-none items-center rounded-md py-2 pl-8 pr-2 text-sm outline-none",
                    "hover:bg-accent hover:text-accent-foreground",
                    "data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
                    value === option.value && "bg-accent text-accent-foreground"
                  )}
                >
                  <span className="absolute left-2 flex h-3.5 w-3.5 items-center justify-center">
                    {value === option.value && (
                      <Check className="h-4 w-4" />
                    )}
                  </span>
                  <span>{option.label}</span>
                </button>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  );
}

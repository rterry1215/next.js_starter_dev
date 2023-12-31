"use client";

import * as React from "react";
import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface ErrorProps {
  error: Error | null;
  reset: () => void;
}

export default function Error({ error, reset }: ErrorProps) {
  const [copyStatus, setCopyStatus] = useState<string | null>(null);
  const path = usePathname();

  useEffect(() => {
    if (error) console.error(error);
  }, [error]);

  const copyToClipboard = () => {
    const currentURL = path;
    const errorMessage = error?.message || "";
    const clipboardText = `[🦜 Relivator Catcher: The Logs]\nLink: ${currentURL}\nError: ${errorMessage}`;

    navigator.clipboard
      .writeText(clipboardText)
      .then(() => {
        setCopyStatus("Details Copied! ☑️");
        setTimeout(() => setCopyStatus(null), 3000); // Reset after 2.2 seconds
      })
      .catch(() => setCopyStatus("Failed to copy"));
  };

  return (
    <main className="flex h-full flex-col items-center justify-center space-y-4 bg-background px-4 pt-10 text-foreground md:px-8 lg:px-20">
      <section className="flex flex-col items-center justify-center space-y-4">
        <div className="rounded-md border border-input bg-transparent p-4 px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50">
          <h1 className="text-lg font-bold">Something went wrong 🫠</h1>
          {error && (
            <>
              <p className="mt-3 font-mono text-sm">
                <span className="font-semibold">Error: </span>
                {error.message}
              </p>
              <div className="mt-4 flex items-center gap-2">
                <button
                  onClick={() => reset()}
                  className="rounded border px-2 py-1 outline-none focus-within:bg-slate-100 hover:bg-slate-100"
                >
                  Try Again
                </button>
                <Link
                  href="/"
                  className="rounded border px-2 py-1 outline-none focus-within:bg-slate-100 hover:bg-slate-100"
                >
                  Go Home
                </Link>
              </div>
              <button
                onClick={copyToClipboard}
                className="mt-2 rounded border px-2 py-1 outline-none focus-within:bg-slate-100 hover:bg-slate-100"
              >
                {copyStatus ? copyStatus : "Copy Error Details"}
              </button>
            </>
          )}
        </div>
      </section>
    </main>
  );
}

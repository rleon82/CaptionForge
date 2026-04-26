"use client";

import { useState, useCallback } from "react";
import { GeneratorForm } from "./generator-form";
import { GeneratorResults } from "./generator-results";
import { ProgressBar } from "@/components/ui";
import { HistoryPanel } from "@/components/features/history/history-panel";
import { useHistory } from "@/hooks/useHistory";
import { exportTxt } from "@/lib/export-txt";
import type { GenerateRequest, GeneratorState, GenerateResult } from "@/types/generator";

/**
 * GeneratorSection — główny Client Component dla generatora.
 * Zarządza stanem formularza + wyników + historią (przez callback).
 * Wywoływany w page.tsx jako leaf Client Component — reszta landing = Server.
 */
export function GeneratorSection() {
  const [formValues, setFormValues] = useState<Partial<GenerateRequest>>({
    platform: "instagram",
    tone: "inspirational",
    language: "pl",
  });

  const [state, setState] = useState<GeneratorState>({ status: "idle" });
  const { addEntry } = useHistory();

  const handleGenerate = useCallback(
    async (params: GenerateRequest) => {
      setState({ status: "loading", stage: 0 });

      try {
        const res = await fetch("/api/generate", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(params),
        });

        if (!res.ok) {
          const errorData = (await res.json().catch(() => ({}))) as {
            error?: string;
          };
          throw new Error(errorData.error ?? `HTTP ${res.status}`);
        }

        const result = (await res.json()) as GenerateResult;
        setState({ status: "success", result });
        // Zapisz do historii
        addEntry(params, result);
      } catch (err) {
        const message =
          err instanceof Error ? err.message : "Nieznany błąd. Spróbuj ponownie.";

        if (message.includes("Failed to fetch")) {
          setState({
            status: "error",
            message: "❌ Brak połączenia z internetem.",
          });
        } else {
          setState({ status: "error", message: `❌ ${message}` });
        }
      }
    },
    [addEntry]
  );

  const handleRegenerate = useCallback(() => {
    if (Object.keys(formValues).length >= 5) {
      void handleGenerate(formValues as GenerateRequest);
    } else {
      setState({ status: "idle" });
    }
  }, [formValues, handleGenerate]);

  const handleRestoreFromHistory = useCallback(
    (params: GenerateRequest) => {
      setFormValues(params);
    },
    []
  );

  const handleExport = useCallback(() => {
    if (state.status === "success") {
      exportTxt(formValues as GenerateRequest, state.result);
    }
  }, [state, formValues]);

  return (
    <>
    <section id="generator" className="section-padding">
      <div className="section-container">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-block px-4 py-2 rounded-full text-sm font-semibold mb-4 bg-[rgb(var(--color-primary)/0.1)] text-[rgb(var(--color-primary))]">
            Generator
          </div>
          <h2 className="text-3xl md:text-4xl font-black mb-4">
            Wypróbuj{" "}
            <span className="gradient-text">CaptionForge</span> teraz
          </h2>
          <p className="text-lg text-[rgb(var(--color-text-secondary))] max-w-xl mx-auto">
            Uzupełnij formularz i kliknij &ldquo;Generuj opisy&rdquo; — 3 warianty gotowe w
            10 sekund.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {/* Left: Form */}
          <GeneratorForm
            initialValues={formValues}
            onSubmit={handleGenerate}
            isLoading={state.status === "loading"}
            onValuesChange={setFormValues}
          />

          {/* Right: Results */}
          <div className="flex flex-col gap-6">
            {state.status === "loading" && (
              <div className="card p-8">
                <ProgressBar isActive />
              </div>
            )}

            {state.status !== "loading" && (
              <GeneratorResults
                state={state}
                platform={formValues.platform ?? "instagram"}
                params={formValues}
                onRegenerate={handleRegenerate}
              />
            )}
          </div>
        </div>
      </div>
    </section>
    <HistoryPanel onRestore={handleRestoreFromHistory} />
    </>
  );
}

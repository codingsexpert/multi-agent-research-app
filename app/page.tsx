"use client"

import { useCallback, useEffect, useMemo, useState } from "react"
import { Clock, Github, Key, Plus, Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"
import { ThemeToggle } from "@/components/theme-toggle"
import { ResearchInput } from "@/components/research-input"
import { AgentPipeline } from "@/components/agent-pipeline"
import { ResearchDocumentView } from "@/components/research-document"
import { ResearchChat } from "@/components/research-chat"
import { HistoryPanel } from "@/components/history-panel"
import { ApiKeyModal } from "@/components/api-key-modal"
import { useResearch } from "@/hooks/use-research"
import type { ResearchDepth, ResearchDocument, ResearchTemplate } from "@/lib/research-types"

export default function Page() {
  const { state, run, reset, loadDocument } = useResearch()
  const [historyOpen, setHistoryOpen] = useState(false)
  const [apiKeyOpen, setApiKeyOpen] = useState(false)

  const handleSubmit = useCallback(
    (data: { topic: string; depth: ResearchDepth; template: ResearchTemplate }) => {
      run(data)
      // Smooth scroll to pipeline
      setTimeout(() => {
        document.getElementById("pipeline")?.scrollIntoView({ behavior: "smooth", block: "start" })
      }, 100)
    },
    [run],
  )

  const handleHistorySelect = useCallback(
    (doc: ResearchDocument) => {
      loadDocument(doc)
    },
    [loadDocument],
  )

  const handleFollowUp = useCallback(
    (q: string) => {
      // Pre-fill topic and run deeper research
      run({ topic: q, depth: "standard", template: "general" })
      window.scrollTo({ top: 0, behavior: "smooth" })
    },
    [run],
  )

  // Keyboard shortcuts
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      // Cmd/Ctrl+K to focus input (new research)
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault()
        reset()
        window.scrollTo({ top: 0, behavior: "smooth" })
      }
      // Cmd/Ctrl+H to open history
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "h") {
        e.preventDefault()
        setHistoryOpen((v) => !v)
      }
      // Cmd/Ctrl+; to open API key settings
      if ((e.metaKey || e.ctrlKey) && e.key === ";") {
        e.preventDefault()
        setApiKeyOpen((v) => !v)
      }
    }
    window.addEventListener("keydown", handler)
    return () => window.removeEventListener("keydown", handler)
  }, [reset])

  const currentDoc: ResearchDocument | null = useMemo(() => {
    if (!state.documentId || !state.createdAt) return null
    if (state.status === "idle") return null
    if (state.status === "running" && state.insights.length === 0) return null
    return {
      id: state.documentId,
      topic: state.topic,
      depth: state.depth,
      template: state.template,
      createdAt: state.createdAt,
      executiveSummary: state.executiveSummary,
      sources: state.sources,
      summaries: state.summaries,
      insights: state.insights,
      contradictions: state.contradictions,
      factChecks: state.factChecks,
      followUpQuestions: state.followUpQuestions,
      keywords: state.keywords,
    }
  }, [state])

  const showPipeline = state.status !== "idle"
  const canShowChat = state.status === "done" && currentDoc

  return (
    <div className="min-h-screen bg-background">
      {/* Premium gradient background */}
      <div className="pointer-events-none fixed inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5" />

      {/* Header */}
      <header className="sticky top-0 z-40 border-b border-border/40 bg-background/80 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-4 md:px-6">
          {/* Logo */}
          <div className="flex items-center gap-3 group">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-primary to-accent text-white shadow-lg shadow-primary/20 group-hover:shadow-primary/40 transition-shadow">
              <Sparkles className="h-5 w-5" />
            </div>
            <div>
              <div className="font-serif text-xl font-bold leading-none tracking-tight bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                Lumen
              </div>
              <div className="text-[10px] font-semibold uppercase tracking-widest text-muted-foreground">
                Research AI
              </div>
            </div>
          </div>

          {/* Right actions */}
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setApiKeyOpen(true)}
              className="hidden gap-2 md:inline-flex hover:bg-accent/10"
              title="API Configuration (⌘;)"
            >
              <Key className="h-3.5 w-3.5" />
              <span className="text-xs">API Key</span>
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setHistoryOpen(true)}
              className="hidden gap-2 md:inline-flex hover:bg-primary/10"
            >
              <Clock className="h-3.5 w-3.5" />
              <span className="text-xs">History</span>
              <kbd className="ml-1 hidden rounded border border-border bg-muted px-1.5 font-mono text-[9px] text-muted-foreground lg:inline">
                ⌘H
              </kbd>
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setApiKeyOpen(true)}
              className="md:hidden"
              aria-label="API Configuration"
            >
              <Key className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setHistoryOpen(true)}
              className="md:hidden"
              aria-label="History"
            >
              <Clock className="h-4 w-4" />
            </Button>
            {state.status !== "idle" && (
              <Button variant="outline" size="sm" onClick={reset} className="gap-2">
                <Plus className="h-3.5 w-3.5" />
                <span className="hidden sm:inline">New</span>
                <kbd className="ml-0.5 hidden rounded border border-border bg-muted px-1 font-mono text-[10px] text-muted-foreground sm:inline">
                  ⌘K
                </kbd>
              </Button>
            )}
            <ThemeToggle />
          </div>
        </div>
      </header>

      <main className="relative mx-auto max-w-7xl px-4 py-12 md:px-6 md:py-16">
        {/* Hero / input */}
        {state.status === "idle" && (
          <section className="mb-16 md:mb-20">
            <div className="mx-auto max-w-4xl">
              {/* Badge */}
              <div className="mb-6 flex justify-center">
                <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-4 py-1.5 text-xs font-medium text-primary backdrop-blur-sm">
                  <span className="inline-block h-1.5 w-1.5 rounded-full bg-primary animate-pulse" />
                  Five agents · Real-time insights · Web search
                </div>
              </div>

              {/* Hero text */}
              <h1 className="text-center font-serif text-5xl md:text-6xl lg:text-7xl leading-[1.1] tracking-tight">
                <span className="font-bold">Research</span>
                <br />
                <span className="bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">
                  Amplified
                </span>
              </h1>
              <p className="mt-6 text-center text-base md:text-lg text-muted-foreground leading-relaxed max-w-2xl mx-auto">
                Orchestrate five specialized AI agents in parallel to search, analyze, fact-check, and synthesize
                information into structured research documents with full source attribution.
              </p>

              {/* Input */}
              <div className="mx-auto mt-12 max-w-3xl">
                <ResearchInput onSubmit={handleSubmit} />
              </div>

              {/* Example queries */}
              <div className="mt-8 flex flex-col items-center gap-3">
                <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Popular queries</span>
                <div className="flex flex-wrap justify-center gap-2">
                  {[
                    "Future of quantum computing",
                    "AI ethics frameworks",
                    "Climate tech innovations",
                  ].map((q) => (
                    <button
                      key={q}
                      onClick={() => {
                        const textarea = document.querySelector("textarea")
                        if (textarea) textarea.value = q
                      }}
                      className="rounded-lg border border-border/40 bg-card/40 px-4 py-2 text-xs font-medium text-foreground transition hover:border-primary/60 hover:bg-primary/5 hover:text-primary"
                    >
                      {q}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </section>
        )}

        {/* Pipeline */}
        {showPipeline && (
          <section id="pipeline" className="mb-8 md:mb-12">
            <AgentPipeline agents={state.agents} active={state.status === "running"} />
            {state.error && (
              <div className="mt-4 rounded-xl border border-destructive/40 bg-destructive/5 p-4 text-sm text-destructive">
                {state.error}
              </div>
            )}
          </section>
        )}

        {/* Document */}
        {currentDoc && (
          <section className="mb-12">
            <ResearchDocumentView document={currentDoc} onFollowUp={handleFollowUp} />
          </section>
        )}

        {/* Chat */}
        {canShowChat && currentDoc && (
          <section className="mb-16">
            <ResearchChat document={currentDoc} />
          </section>
        )}

        {/* Footer */}
        <footer className="mt-20 flex flex-col items-center gap-3 border-t border-border/40 pt-12 text-center">
          <div className="space-y-2">
            <div className="flex items-center justify-center gap-2 text-xs text-muted-foreground">
              <Sparkles className="h-3 w-3" />
              <span className="font-medium">Powered by AI SDK & Vercel AI Gateway</span>
            </div>
            <div className="flex items-center justify-center gap-4 text-xs text-muted-foreground">
              <div className="flex items-center gap-1">
                <kbd className="rounded border border-border bg-card px-1.5 py-0.5 font-mono text-[9px]">
                  ⌘K
                </kbd>
                <span>New</span>
              </div>
              <span>·</span>
              <div className="flex items-center gap-1">
                <kbd className="rounded border border-border bg-card px-1.5 py-0.5 font-mono text-[9px]">
                  ⌘H
                </kbd>
                <span>History</span>
              </div>
              <span>·</span>
              <div className="flex items-center gap-1">
                <kbd className="rounded border border-border bg-card px-1.5 py-0.5 font-mono text-[9px]">
                  ⌘;
                </kbd>
                <span>API Key</span>
              </div>
            </div>
          </div>
          <a
            href="https://github.com"
            target="_blank"
            rel="noreferrer noopener"
            className="mt-4 inline-flex items-center gap-1.5 rounded-lg border border-border/40 bg-card/40 px-4 py-2 text-xs font-medium text-foreground transition hover:border-primary/60 hover:bg-primary/5 hover:text-primary"
          >
            <Github className="h-3 w-3" />
            Star on GitHub
          </a>
        </footer>
      </main>

      <HistoryPanel
        open={historyOpen}
        onOpenChange={setHistoryOpen}
        onSelect={handleHistorySelect}
        activeId={state.documentId}
      />
      <ApiKeyModal open={apiKeyOpen} onOpenChange={setApiKeyOpen} />
    </div>
  )
}

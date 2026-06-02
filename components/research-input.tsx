"use client"

import { useState } from "react"
import { ArrowRight, Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { DEPTH_CONFIG, TEMPLATES, type ResearchDepth, type ResearchTemplate } from "@/lib/research-types"
import { cn } from "@/lib/utils"

interface Props {
  onSubmit: (data: { topic: string; depth: ResearchDepth; template: ResearchTemplate }) => void
  disabled?: boolean
}

const SUGGESTIONS = [
  "Impact of large language models on software engineering productivity",
  "State of fusion energy research in 2026",
  "Long-term effects of intermittent fasting on metabolic health",
  "How federated learning is changing healthcare AI",
]

export function ResearchInput({ onSubmit, disabled }: Props) {
  const [topic, setTopic] = useState("")
  const [depth, setDepth] = useState<ResearchDepth>("standard")
  const [template, setTemplate] = useState<ResearchTemplate>("general")

  const submit = () => {
    const t = topic.trim()
    if (!t || disabled) return
    onSubmit({ topic: t, depth, template })
  }

  return (
    <div className="relative">
      <div className="group relative overflow-hidden rounded-2xl border border-border bg-card/40 backdrop-blur-sm shadow-md hover:shadow-lg transition-shadow duration-300">
        {/* Background gradient on hover */}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-primary/5 via-transparent to-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        
        <div className="relative p-5">
          <div className="flex items-start gap-4">
            <div className="mt-2 flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-primary to-accent text-white shadow-lg">
              <Sparkles className="h-5 w-5" />
            </div>
            <Textarea
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && (e.metaKey || e.ctrlKey)) {
                  e.preventDefault()
                  submit()
                }
              }}
              placeholder="What would you like to research? e.g. 'How is AI transforming drug discovery?'"
              className="min-h-[80px] resize-none border-0 bg-transparent p-0 text-base shadow-none placeholder:text-muted-foreground/60 focus-visible:ring-0 md:text-lg"
              disabled={disabled}
            />
          </div>

          {/* Divider */}
          <div className="my-4 h-px bg-gradient-to-r from-border via-border/40 to-transparent" />

          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="flex flex-wrap items-center gap-2">
              <Select value={template} onValueChange={(v) => setTemplate(v as ResearchTemplate)} disabled={disabled}>
                <SelectTrigger className="h-10 w-auto gap-2 bg-background/60 hover:bg-background border-border transition">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {TEMPLATES.map((t) => (
                    <SelectItem key={t.value} value={t.value}>
                      <div className="flex flex-col">
                        <span className="font-medium">{t.label}</span>
                        <span className="text-xs text-muted-foreground">{t.hint}</span>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <div className="flex h-10 items-center overflow-hidden rounded-lg border border-border bg-background/60">
                {(Object.keys(DEPTH_CONFIG) as ResearchDepth[]).map((d) => (
                  <button
                    key={d}
                    type="button"
                    onClick={() => setDepth(d)}
                    disabled={disabled}
                    className={cn(
                      "h-full px-3 text-xs font-semibold transition-all duration-200",
                      depth === d
                        ? "bg-gradient-to-r from-primary to-primary/80 text-primary-foreground shadow-md"
                        : "text-muted-foreground hover:bg-muted/60 hover:text-foreground",
                    )}
                    title={DEPTH_CONFIG[d].hint}
                  >
                    {DEPTH_CONFIG[d].label}
                  </button>
                ))}
              </div>
            </div>

            <Button 
              onClick={submit} 
              disabled={disabled || !topic.trim()} 
              className="gap-2 rounded-lg shadow-md hover:shadow-lg transition-shadow"
            >
              Research
              <ArrowRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>

      {/* Suggestions */}
      <div className="mt-4 space-y-2">
        <span className="block text-xs font-semibold text-muted-foreground uppercase tracking-wide">Popular queries</span>
        <div className="flex flex-wrap gap-2">
          {SUGGESTIONS.map((s) => (
            <button
              key={s}
              type="button"
              onClick={() => setTopic(s)}
              disabled={disabled}
              className="rounded-full border border-border/50 bg-card/30 hover:bg-card/60 px-4 py-2 text-xs text-muted-foreground hover:text-foreground transition-all duration-200 hover:border-primary/40"
            >
              {s}
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}

"use client"

import { useCallback, useEffect, useState } from "react"
import { Copy, Eye, EyeOff, Key, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { toast } from "sonner"
import { cn } from "@/lib/utils"

interface Props {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function ApiKeyModal({ open, onOpenChange }: Props) {
  const [apiKey, setApiKey] = useState("")
  const [showKey, setShowKey] = useState(false)
  const [isSaved, setIsSaved] = useState(false)

  // Load from localStorage
  useEffect(() => {
    const saved = localStorage.getItem("lumen_api_key")
    if (saved) {
      setApiKey(saved)
      setIsSaved(true)
    }
  }, [])

  const handleSave = useCallback(() => {
    const trimmed = apiKey.trim()
    if (!trimmed) {
      toast.error("Please enter an API key")
      return
    }
    localStorage.setItem("lumen_api_key", trimmed)
    setIsSaved(true)
    toast.success("API key saved successfully")
    setTimeout(() => onOpenChange(false), 500)
  }, [apiKey, onOpenChange])

  const handleCopy = useCallback(() => {
    navigator.clipboard.writeText(apiKey)
    toast.success("API key copied to clipboard")
  }, [apiKey])

  const handleClear = useCallback(() => {
    if (confirm("Are you sure you want to remove the saved API key?")) {
      setApiKey("")
      localStorage.removeItem("lumen_api_key")
      setIsSaved(false)
      toast.success("API key removed")
    }
  }, [])

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md gap-6 border-border">
        <DialogHeader className="space-y-3">
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-gradient-to-br from-primary to-accent text-white shadow-lg">
              <Key className="h-6 w-6" />
            </div>
            <div className="space-y-1">
              <DialogTitle className="text-lg font-semibold">API Configuration</DialogTitle>
              <DialogDescription className="text-xs">Manage your API key securely</DialogDescription>
            </div>
          </div>
        </DialogHeader>

        <div className="space-y-5">
          {/* API Key Input */}
          <div className="space-y-3">
            <label className="text-sm font-semibold text-foreground">API Key</label>
            <div className="relative group">
              <Input
                type={showKey ? "text" : "password"}
                value={apiKey}
                onChange={(e) => setApiKey(e.target.value)}
                placeholder="Paste your API key here..."
                className="pr-12 font-mono text-sm border-border focus-visible:ring-2 focus-visible:ring-primary"
              />
              <button
                type="button"
                onClick={() => setShowKey(!showKey)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                aria-label={showKey ? "Hide API key" : "Show API key"}
              >
                {showKey ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
            </div>
            <p className="text-xs text-muted-foreground leading-relaxed">
              Your API key is stored securely in your browser&apos;s localStorage and never transmitted to our servers.
            </p>
          </div>

          {/* Status Badge */}
          {isSaved && (
            <div className="rounded-lg border border-green-500/30 bg-gradient-to-r from-green-500/5 to-transparent p-3.5 animate-in fade-in">
              <p className="flex items-center gap-2.5 text-sm font-medium text-green-700 dark:text-green-400">
                <span className="inline-block h-2.5 w-2.5 rounded-full bg-green-500 animate-pulse" />
                API key configured and ready
              </p>
            </div>
          )}

          {/* Action Buttons */}
          <div className="space-y-2 pt-2">
            <Button 
              onClick={handleSave} 
              disabled={!apiKey.trim()} 
              className="w-full gap-2 font-semibold"
            >
              {isSaved ? "Update" : "Save"} API Key
            </Button>
            {apiKey && (
              <Button
                type="button"
                variant="outline"
                onClick={handleCopy}
                className="w-full gap-2"
              >
                <Copy className="h-4 w-4" />
                Copy to Clipboard
              </Button>
            )}
          </div>

          {/* Clear Button */}
          {isSaved && (
            <Button
              type="button"
              variant="ghost"
              className="w-full gap-2 text-destructive hover:bg-destructive/10 hover:text-destructive"
              onClick={handleClear}
            >
              <X className="h-4 w-4" />
              Remove API Key
            </Button>
          )}
        </div>
      </DialogContent>
    </Dialog>
  )
}

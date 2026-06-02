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
      <DialogContent className="max-w-md gap-6">
        <DialogHeader>
          <div className="flex items-center gap-2">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
              <Key className="h-5 w-5" />
            </div>
            <div>
              <DialogTitle>API Configuration</DialogTitle>
              <DialogDescription>Manage your API key for research operations</DialogDescription>
            </div>
          </div>
        </DialogHeader>

        <div className="space-y-4">
          {/* API Key Input */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground">API Key</label>
            <div className="relative">
              <Input
                type={showKey ? "text" : "password"}
                value={apiKey}
                onChange={(e) => setApiKey(e.target.value)}
                placeholder="Paste your API key here..."
                className="pr-12"
              />
              <button
                type="button"
                onClick={() => setShowKey(!showKey)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground transition hover:text-foreground"
              >
                {showKey ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
            </div>
            <p className="text-xs text-muted-foreground">
              Your API key is stored locally in your browser and never shared with our servers.
            </p>
          </div>

          {/* Status Badge */}
          {isSaved && (
            <div className="rounded-lg border border-green-500/30 bg-green-500/5 p-3">
              <p className="flex items-center gap-2 text-sm text-green-700 dark:text-green-400">
                <span className="inline-block h-2 w-2 rounded-full bg-green-500" />
                API key configured and ready to use
              </p>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex gap-2 pt-2">
            <Button onClick={handleSave} className="flex-1 gap-2" disabled={!apiKey.trim()}>
              {isSaved ? "Update" : "Save"} API Key
            </Button>
            {apiKey && (
              <Button
                type="button"
                variant="outline"
                size="icon"
                onClick={handleCopy}
                title="Copy to clipboard"
              >
                <Copy className="h-4 w-4" />
              </Button>
            )}
          </div>

          {/* Clear Button */}
          {isSaved && (
            <Button
              type="button"
              variant="ghost"
              className="w-full gap-2 text-destructive hover:bg-destructive/5 hover:text-destructive"
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

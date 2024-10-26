import { useState, useEffect } from 'react'
import { Progress } from "@/components/ui/progress"
import { Loader2, CheckCircle } from "lucide-react"

const steps = [
  "Connecting to API",
  "Running polymorphic build",
  "Generating Unique Loader",
  "Generated Loader"
]

export function LoaderScreen({ onComplete }: { onComplete: () => void }) {
  const [currentStep, setCurrentStep] = useState(0)
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentStep((prev) => {
        if (prev < steps.length - 1) {
          return prev + 1
        }
        clearInterval(interval)
        setTimeout(onComplete, 1000) // Wait 1 more second on the last step before completing
        return prev
      })
    }, 1250) // 5000ms / 4 steps = 1250ms per step

    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev < 100) {
          return prev + 1
        }
        clearInterval(progressInterval)
        return 100
      })
    }, 50) // Update progress every 50ms

    return () => {
      clearInterval(interval)
      clearInterval(progressInterval)
    }
  }, [onComplete])

  return (
    <div className="fixed inset-0 bg-[#0a0c10] flex items-center justify-center">
      <div className="w-full max-w-md p-6 space-y-6">
        <div className="text-center">
          {currentStep === steps.length - 1 ? (
            <CheckCircle className="h-12 w-12 mx-auto mb-4 text-[#22c55e]" />
          ) : (
            <Loader2 className="h-12 w-12 animate-spin mx-auto mb-4 text-[#e2e8f0]" />
          )}
          <h2 className="text-2xl font-bold mb-2 text-[#e2e8f0]">{steps[currentStep]}</h2>
          <p className="text-[#94a3b8]">Please wait while we process your request</p>
        </div>
        <Progress value={progress} className="w-full bg-[#1e293b]" />
      </div>
    </div>
  )
}
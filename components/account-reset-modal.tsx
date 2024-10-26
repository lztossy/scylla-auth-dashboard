import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"

export function AccountResetModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const [step, setStep] = useState<'2fa' | 'reset'>('2fa')
  const [twoFACode, setTwoFACode] = useState('')
  const [resetType, setResetType] = useState<'username' | 'password'>('username')
  const [resetValue, setResetValue] = useState('')

  const handleSubmit2FA = () => {
    // Here you would validate the 2FA code
    // For now, we'll just move to the next step
    setStep('reset')
  }

  const handleReset = () => {
    // Handle the reset logic here
    console.log(`Resetting ${resetType}: ${resetValue}`)
    onClose()
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Account Reset</DialogTitle>
          <DialogDescription>
            {step === '2fa' 
              ? 'Enter the 2FA code sent to your email.'
              : `Reset your ${resetType}.`}
          </DialogDescription>
        </DialogHeader>
        {step === '2fa' ? (
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="2faCode" className="text-right">
                2FA Code
              </Label>
              <Input
                id="2faCode"
                value={twoFACode}
                onChange={(e) => setTwoFACode(e.target.value)}
                className="col-span-3"
                placeholder="Enter 6-digit code"
                maxLength={6}
              />
            </div>
          </div>
        ) : (
          <div className="grid gap-4 py-4">
            <RadioGroup defaultValue="username" onValueChange={(value) => setResetType(value as 'username' | 'password')}>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="username" id="username" />
                <Label htmlFor="username">Reset Username</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="password" id="password" />
                <Label htmlFor="password">Reset Password</Label>
              </div>
            </RadioGroup>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="resetValue" className="text-right">
                New {resetType}
              </Label>
              <Input
                id="resetValue"
                value={resetValue}
                onChange={(e) => setResetValue(e.target.value)}
                className="col-span-3"
                placeholder={`Enter new ${resetType}`}
              />
            </div>
          </div>
        )}
        <DialogFooter>
          <Button type="submit" onClick={step === '2fa' ? handleSubmit2FA : handleReset}>
            {step === '2fa' ? 'Verify' : 'Reset'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"

export function HardwareResetModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const [resetType, setResetType] = useState<'license' | 'username'>('license')
  const [resetValue, setResetValue] = useState('')

  const handleSubmit = () => {
    // Handle hardware reset logic here
    console.log({ resetType, resetValue })
    onClose()
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Hardware Reset</DialogTitle>
          <DialogDescription>
            Reset Hardware-Lock on a Scylla license.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <RadioGroup defaultValue="license" onValueChange={(value) => setResetType(value as 'license' | 'username')}>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="license" id="license" />
              <Label htmlFor="license">License Key</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="username" id="username" />
              <Label htmlFor="username">Scylla Username</Label>
            </div>
          </RadioGroup>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="resetValue" className="text-right">
              {resetType === 'license' ? 'License Key' : 'Username'}
            </Label>
            <Input
              id="resetValue"
              value={resetValue}
              onChange={(e) => setResetValue(e.target.value)}
              className="col-span-3"
              placeholder={resetType === 'license' ? 'Enter your license key' : 'Enter your Scylla username'}
            />
          </div>
        </div>
        <DialogFooter>
          <Button type="submit" onClick={handleSubmit}>Reset Hardware</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
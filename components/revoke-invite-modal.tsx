import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export function RevokeInviteModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const [userId, setUserId] = useState('')

  const handleSubmit = () => {
    // Handle revoke invite logic here
    console.log({ userId })
    onClose()
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Revoke Invite</DialogTitle>
          <DialogDescription>
            Enter the User ID of the invite you want to revoke.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="userId" className="text-right">
              User ID
            </Label>
            <Input
              id="userId"
              value={userId}
              onChange={(e) => setUserId(e.target.value)}
              className="col-span-3"
            />
          </div>
        </div>
        <DialogFooter>
          <Button type="submit" onClick={handleSubmit}>Revoke Invite</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
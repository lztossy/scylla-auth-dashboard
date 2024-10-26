import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export function GenerateInviteModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const [discordId, setDiscordId] = useState('')
  const [product, setProduct] = useState('')
  const [agreeTerms, setAgreeTerms] = useState(false)
  const [agreePay, setAgreePay] = useState(false)

  const handleSubmit = () => {
    // Handle invite generation logic here
    console.log({ discordId, product, agreeTerms, agreePay })
    onClose()
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Generate Invite</DialogTitle>
          <DialogDescription className="text-sm">
            Create a new invite for a user. Please fill out all required information.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="discordId" className="text-right whitespace-nowrap">
              Discord User ID
            </Label>
            <Input
              id="discordId"
              value={discordId}
              onChange={(e) => setDiscordId(e.target.value)}
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="product" className="text-right whitespace-nowrap">
              Product Invite
            </Label>
            <Select onValueChange={setProduct}>
              <SelectTrigger className="col-span-3">
                <SelectValue placeholder="Select a product" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="fortnite">Fortnite</SelectItem>
                <SelectItem value="valorant">Valorant</SelectItem>
                <SelectItem value="all">All</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox 
              id="terms" 
              checked={agreeTerms} 
              onCheckedChange={(checked) => setAgreeTerms(checked === true)}
            />
            <label
              htmlFor="terms"
              className="text-sm text-muted-foreground leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              By inviting this user, both parties agree to Scylla's terms and conditions
            </label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox 
              id="pay" 
              checked={agreePay} 
              onCheckedChange={(checked) => setAgreePay(checked === true)}
            />
            <label
              htmlFor="pay"
              className="text-sm text-muted-foreground leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              Failure to pay for the products within 48 hours with a generated invite will terminate both registered accounts
            </label>
          </div>
        </div>
        <DialogFooter>
          <Button type="submit" onClick={handleSubmit}>Generate Invite</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
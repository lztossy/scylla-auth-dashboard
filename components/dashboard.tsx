"use client"

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Progress } from "@/components/ui/progress"
import { ThemeToggle } from "@/components/theme-toggle"
import { LoaderScreen } from "@/components/loader-screen"
import { GenerateInviteModal } from "@/components/generate-invite-modal"
import { TrackerDashboard } from "@/components/tracker-dashboard"
import { RevokeInviteModal } from "@/components/revoke-invite-modal"
import { HardwareResetModal } from "@/components/hardware-reset-modal"
import { AccountResetModal } from "@/components/account-reset-modal"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"

export default function Dashboard() {
  const [showLoader, setShowLoader] = useState(false)
  const [inviteCount, setInviteCount] = useState(3)
  const [showGenerateInvite, setShowGenerateInvite] = useState(false)
  const [showRevokeInvite, setShowRevokeInvite] = useState(false)
  const [showTrackerDashboard, setShowTrackerDashboard] = useState(false)
  const [showHardwareReset, setShowHardwareReset] = useState(false)
  const [showAccountReset, setShowAccountReset] = useState(false)
  const router = useRouter()
  const supabase = createClientComponentClient()

  const handleDownloadLoader = () => {
    setShowLoader(true)
    setTimeout(() => setShowLoader(false), 5000)
  }

  const getInviteCountColor = (count: number) => {
    if (count >= 3) return "text-green-500"
    if (count > 0) return "text-yellow-500"
    return "text-red-500"
  }

  const handleSignOut = async () => {
    await supabase.auth.signOut()
    router.push('/auth')
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      <main className="container mx-auto p-4">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">Scylla Dashboard Account Management</h1>
          <div className="flex items-center gap-4">
            <ThemeToggle />
            <Button onClick={handleSignOut}>Sign Out</Button>
          </div>
        </div>
        <p className="text-sm text-muted-foreground mb-8">
          You're logged in with account id 4acng********************************
        </p>
        
        <div className="grid gap-6 md:grid-cols-2">
          <ActivationCard title="Activation Key" type="Fortnite" onDownloadLoader={handleDownloadLoader} />
          <ActivationCard title="Activation Key" type="Valorant" onDownloadLoader={handleDownloadLoader} />
        </div>
        
        <div className="grid gap-6 md:grid-cols-2 mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Invite Dashboard</CardTitle>
              <p className={`text-sm ${getInviteCountColor(inviteCount)}`}>
                Remaining invites: {inviteCount}
              </p>
            </CardHeader>
            <CardContent className="space-y-4">
              <Button className="w-full" onClick={() => setShowGenerateInvite(true)}>Generate Invite</Button>
              <Button variant="secondary" className="w-full" onClick={() => setShowTrackerDashboard(true)}>Tracker Dashboard</Button>
              <Button variant="secondary" className="w-full" onClick={() => setShowRevokeInvite(true)}>Revoke Invite</Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Account Settings</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <Button className="w-full" onClick={() => setShowHardwareReset(true)}>Hardware Reset</Button>
              <Button variant="secondary" className="w-full" onClick={() => setShowAccountReset(true)}>Account Reset</Button>
              <Button variant="secondary" className="w-full">Switch Sub (extra €15)</Button>
            </CardContent>
          </Card>
        </div>
        
        <div className="grid gap-6 md:grid-cols-2 mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Web Interface</CardTitle>
            </CardHeader>
            <CardFooter>
              <Button variant="secondary">Check Back Soon</Button>
            </CardFooter>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Community Discord</CardTitle>
            </CardHeader>
            <CardFooter className="flex gap-2">
              <Button>Join</Button>
              <Button variant="outline">Update Role</Button>
            </CardFooter>
          </Card>
        </div>
      </main>

      {showLoader && <LoaderScreen onComplete={() => setShowLoader(false)} />}
      <GenerateInviteModal isOpen={showGenerateInvite} onClose={() => setShowGenerateInvite(false)} />
      <RevokeInviteModal isOpen={showRevokeInvite} onClose={() => setShowRevokeInvite(false)} />
      <HardwareResetModal isOpen={showHardwareReset} onClose={() => setShowHardwareReset(false)} />
      <AccountResetModal isOpen={showAccountReset} onClose={() => setShowAccountReset(false)} />
      
      {showTrackerDashboard && (
        <Dialog open={showTrackerDashboard} onOpenChange={() => setShowTrackerDashboard(false)}>
          <DialogContent className="sm:max-w-[800px]">
            <DialogHeader>
              <DialogTitle>Tracker Dashboard</DialogTitle>
              <DialogDescription>
                View all invited users and their details.
              </DialogDescription>
            </DialogHeader>
            <TrackerDashboard />
          </DialogContent>
        </Dialog>
      )}
    </div>
  )
}

function ActivationCard({ title, type, onDownloadLoader }: { title: string; type: string; onDownloadLoader: () => void }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <p className="text-sm text-muted-foreground">Copy this to activate Scylla {type}</p>
      </CardHeader>
      <CardContent className="space-y-4">
        <Input readOnly value="************************" />
        <div className="flex gap-2">
          <Button variant="secondary" onClick={onDownloadLoader}>Download Loader</Button>
          <Button variant="secondary">Update License</Button>
        </div>
      </CardContent>
      <CardFooter className="flex-col items-start gap-4">
        <div className="w-full">
          <div className="flex justify-between mb-2">
            <span className="text-sm font-medium">Need Help?</span>
          </div>
          <Button className="w-full">Get Help with {type}</Button>
        </div>
        <div className="w-full">
          <div className="flex justify-between mb-2">
            <span className="text-sm font-medium">Remaining Time</span>
          </div>
          <Progress value={33} className="w-full" />
        </div>
      </CardFooter>
    </Card>
  )
}
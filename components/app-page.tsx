'use client'

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Progress } from "@/components/ui/progress"

export function Page() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <main className="container mx-auto p-4">
        <h1 className="text-3xl font-bold mb-6">Scylla Dashboard Account Management</h1>
        <p className="text-sm text-muted-foreground mb-8">
          You're logged in with account id 4acng********************************
        </p>
        
        <div className="grid gap-6 md:grid-cols-2">
          <ActivationCard title="Activation Key" type="Permanent" />
          <ActivationCard title="Activation Key" type="Temporary" />
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
    </div>
  )
}

function ActivationCard({ title, type }: { title: string; type: "Permanent" | "Temporary" }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <p className="text-sm text-muted-foreground">Copy this to activate SerialShield {type}</p>
      </CardHeader>
      <CardContent className="space-y-4">
        <Input readOnly value="************************" />
        <div className="flex gap-2">
          <Button variant="secondary">Download Loader</Button>
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
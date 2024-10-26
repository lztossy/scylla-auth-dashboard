"use client";

import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  CardDescription,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
  Card,
} from "@/components/ui/card";

export default function AuthPage() {
  const [isLogin, setIsLogin] = useState(true);
  const supabase = createClient();
  const router = useRouter();

  const [errorMessage, setErrorMessage] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage("");

    if (isLogin) {
      const { error } = await supabase.auth.signInWithPassword({
        email: email.includes("@") ? email : `${email}@example.com`, // Use email if it contains @, otherwise treat as username
        password,
      });
      if (error) {
        setErrorMessage(error.message);
      } else {
        router.push("/");
      }
    } else {
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            username,
          },
        },
      });
      if (error) {
        if (error.message.includes("is not authorized")) {
          setErrorMessage(
            `Email address "${email}" cannot be used as it is not authorized`
          );
        } else {
          setErrorMessage(error.message);
        }
      } else {
        alert(
          "Registration successful! Please check your email for verification."
        );
        setIsLogin(true);
      }
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-background">
      <Card className="w-[350px]">
        <CardHeader>
          <CardTitle>{isLogin ? "Login" : "Register"}</CardTitle>
          <CardDescription>
            {isLogin
              ? "Welcome back to Scylla Dashboard"
              : "Create a new Scylla account"}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleAuth}>
            <div className="grid w-full items-center gap-4">
              {!isLogin && (
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="username">Username</Label>
                  <Input
                    id="username"
                    placeholder="Enter your username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                  />
                </div>
              )}
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="email">
                  {isLogin ? "Username or Email" : "Email"}
                </Label>
                <Input
                  id="email"
                  type={isLogin ? "text" : "email"}
                  placeholder={
                    isLogin
                      ? "Enter your username or email"
                      : "Enter your email"
                  }
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
            </div>
            {errorMessage && (
              <p className="text-red-500 text-sm mt-2">{errorMessage}</p>
            )}
            <Button className="w-full mt-4" type="submit">
              {isLogin ? "Login" : "Register"}
            </Button>
          </form>
        </CardContent>
        <CardFooter className="flex flex-col">
          <p className="mt-2 text-sm text-center">
            {isLogin ? "Don't have an account? " : "Already have an account? "}
            <button
              className="text-primary hover:underline"
              onClick={() => {
                setIsLogin(!isLogin);
                setErrorMessage("");
              }}
            >
              {isLogin ? "Register" : "Login"}
            </button>
          </p>
        </CardFooter>
      </Card>
    </div>
  );
}

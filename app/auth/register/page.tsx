"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";
import { RegisterFormData, registerSchema } from "@/app/_Schema/register";

export default function RegisterForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
  });

  function onSubmit(formData: RegisterFormData) {
    console.log("Registration data:", formData);
  }

  return (
    <div className="flex justify-center items-center w-full min-h-[calc(100vh-5rem)] py-2 px-4 overflow-hidden">
      <Card className="w-full max-w-md shadow-xl border border-neutral-800 bg-card text-card-foreground my-auto">
        <CardHeader className="space-y-0.5 text-center pb-3">
          <CardTitle className="text-xl sm:text-2xl font-bold tracking-tight">Create an account</CardTitle>
          <CardDescription className="text-xs sm:text-sm text-muted-foreground">
            Enter your details below to create your account
          </CardDescription>
        </CardHeader>
        <CardContent className="pb-3">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
            <div className="space-y-1.5">
              <Label htmlFor="name" className="text-xs sm:text-sm font-medium">Full Name</Label>
              <Input 
                id="name" 
                placeholder="John Doe" 
                className="h-9 bg-background border-input text-foreground focus-visible:ring-ring text-sm"
                {...register("name")} 
              />
              {errors.name && (
                <p className="text-[11px] text-red-500 font-medium">{errors.name.message}</p>
              )}
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="email" className="text-xs sm:text-sm font-medium">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="example@domain.com"
                className="h-9 bg-background border-input text-foreground focus-visible:ring-ring text-sm"
                {...register("email")}
              />
              {errors.email && (
                <p className="text-[11px] text-red-500 font-medium">{errors.email.message}</p>
              )}
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="password" className="text-xs sm:text-sm font-medium">Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                className="h-9 bg-background border-input text-foreground focus-visible:ring-ring text-sm"
                {...register("password")}
              />
              {errors.password && (
                <p className="text-[11px] text-red-500 font-medium">{errors.password.message}</p>
              )}
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="confirmPassword" className="text-xs sm:text-sm font-medium">Confirm Password</Label>
              <Input
                id="confirmPassword"
                type="password"
                placeholder="••••••••"
                className="h-9 bg-background border-input text-foreground focus-visible:ring-ring text-sm"
                {...register("confirmPassword")}
              />
              {errors.confirmPassword && (
                <p className="text-[11px] text-red-500 font-medium">
                  {errors.confirmPassword.message}
                </p>
              )}
            </div>

            <Button type="submit" className="w-full h-9 mt-2 font-medium text-sm">
              Register
            </Button>
          </form>
        </CardContent>
        <CardFooter className="flex justify-center border-t border-border/40 py-3">
          <p className="text-xs sm:text-sm text-muted-foreground">
            Already have an account?{" "}
            <Link
              href="/auth/login"
              className="text-primary font-medium underline underline-offset-4 hover:opacity-80"
            >
              Sign in
            </Link>
          </p>
        </CardFooter>
      </Card>
    </div>
  );
}
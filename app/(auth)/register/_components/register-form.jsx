"use client"

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useActionState } from "react";
import { Loader2 } from "lucide-react"
import { registerUser } from "./register-action";

const initialState = {
  errors: {},
  success: false,
  data: {}
}

export default function RegisterForm() {
  const [state, formAction, isPending] = useActionState(registerUser, initialState);

  return (
    <form>
      <div className="pb-2">
      </div>
      <div className="grid w-full items-center gap-4">
        <div className="flex flex-col space-y-1.5 gap-1">
          <Label htmlFor="email">Email</Label>
          <Input
            type="text"
            autoCapitalize="none"
            autoComplete="email"
            autoCorrect="off"
            name="email"
            placeholder="your-email@altimetrik.com"
            defaultValue={state.data.email}
          />
           {state.errors?.email && (
            <Label variant="error">
              {state.errors.email._errors[0]}
            </Label>
          )}
        </div>
        <div className="flex flex-col space-y-1.5 gap-1">
          <Label htmlFor="password">Password</Label>
          <Input
            type="password"
            autoCapitalize="none"
            autoComplete="none"
            autoCorrect="off"
            name="password"
            placeholder="•••••••••••"
            defaultValue={state.data.password}
          />
          {state.errors?.password && (
            <Label variant="error">
              {state.errors.password._errors[0]}
            </Label>
          )}
        </div>
        <div className="flex flex-col space-y-1.5 gap-1">
          <Label htmlFor="confirmPassword">Confirm Password</Label>
          <Input
            type="password"
            autoCapitalize="none"
            autoComplete="none"
            autoCorrect="off"
            name="confirmPassword"
            placeholder="•••••••••••"
            defaultValue={state.data.confirmPassword}
          />
          {state.errors?.confirmPassword && (
            <Label variant="error">
              {state.errors.confirmPassword._errors[0]}
            </Label>
          )}
        </div>
      </div>
      <div className="flex w-full justify-center pt-6 pb-2">
        <Button formAction={formAction} disabled={isPending}>
          {isPending && <Loader2 className="animate-spin" />}
          {isPending && "Saving"}
          {!isPending && "Register"}
        </Button>
      </div>
    </form>
  )
}

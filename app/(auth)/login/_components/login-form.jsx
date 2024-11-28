"use client"

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useActionState } from "react";
import { Loader2 } from "lucide-react"
import { signIn } from "./login-action";

const initialState = {
  errors: {},
  success: false,
  data: {}
}

export default function LoginForm() {

  const [state, formAction, isPending] = useActionState(signIn, initialState);

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
          />
          {state.errors?.email && (
            <Label variant="error">
              {state.errors.password._errors[0]}
            </Label>
          )}
        </div>
      </div>
      <div className="flex w-full justify-center pt-6 pb-2">
        <Button formAction={formAction} disabled={isPending}>
          {isPending && <Loader2 className="animate-spin" />}
          {isPending && "Validating..."}
          {!isPending && "Enter"}
        </Button>
      </div>
    </form>
  )
}

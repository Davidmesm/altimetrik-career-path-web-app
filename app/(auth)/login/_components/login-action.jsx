"use server"

import { createSession } from "@/lib/session";
import { redirect } from "next/navigation"
import { z } from "zod";

const loginSchema = z.object({
  email: z
    .string()
    .min(1, "Email is required")
    .email("Invalid email format"),
  password: z
    .string()
    .min(1, "Password is required")
})


export async function signIn(prevState, formData) {

  const data = Object.fromEntries(formData)

  const res = await loginSchema.safeParseAsync(data);

  if (!res.success) {
    const errors = res.error.format();
    return {
        errors: errors,
        success: false,
        data: data
    }
  }

  try {
    const response = await fetch("http://24.199.121.110/api/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(res.data),
    });
    
    if (!response.ok) {
      const errorData = await response.json();
      console.warn(errorData);
      return {
        errors: {system: {_errors: [errorData.error]}},
        success: false,
        data: data
      }
    }
    
    const { token } = await response.json();
    
    createSession(token);
  } catch (error) {
    console.error(error);
    return {
      errors: {system: {_errors: ["An unexpected error occurred. Please try again later or contact support if the problem persists."]}},
      success: false,
      data: data
    }
  }
      
     
  redirect("/")
}
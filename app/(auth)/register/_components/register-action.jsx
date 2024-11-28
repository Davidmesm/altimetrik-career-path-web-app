"use server"

import { redirect } from "next/navigation"
import { z } from "zod";
import { createSession } from "@/lib/session";

const registerSchema = z.object({
  email: z
    .string()
    .min(1, "Email is required")
    .email("Invalid email format")
    .refine((email) => email.endsWith("@altimetrik.com"), {
      message: "Email must be from Altimetrik",
    }),
  password: z
    .string()
    .min(1, "Password is required")
    .min(8, "Password must be at least 8 characters")
    .max(20, "Password must be less than 20 characters")
    .regex(/[a-z]/, "Password must include a lowercase letter")
    .regex(/[A-Z]/, "Password must include an uppercase letter")
    .regex(/\d/, "Password must include a number"),
  confirmPassword: z
    .string()
    .min(1, "Confirm Password is required")
}).refine((data) => data.password === data.confirmPassword, {
    message: "Confirm Password doesn't match Password",
    path: ["confirmPassword"]
});


export async function registerUser(prevState, formData) {

  const data = Object.fromEntries(formData)

  const res = await registerSchema.safeParseAsync(data);

  if (!res.success) {
    const errors = res.error.format();
    return {
        errors: errors,
        success: false,
        data: data
    }
  }

  try {
      const response = await fetch("http://24.199.121.110/api/auth/register", {
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
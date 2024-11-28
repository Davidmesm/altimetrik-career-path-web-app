"use server"

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

const callLoginMock = (data) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        console.log("Login:", data.email);
        resolve({ success: true, message: "User logged in successfully!" });
      }, 2000); 
    });
};

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
    await callLoginMock(res.data);
  } catch (error) {
    return {
      errors: {system: {_errors: ["An unexpected error occurred. Please try again later or contact support if the problem persists."]}},
      success: false,
      data: data
    }
  }
 
  redirect("/")
}
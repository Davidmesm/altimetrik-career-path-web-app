"use server"

import { redirect } from "next/navigation"
import { z } from "zod";

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

const callRegisterMock = (data) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        console.log("User Registered:", data);
        resolve({ success: true, message: "User registered successfully!" });
      }, 2000); 
    });
};

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
    await callRegisterMock(res.data);
  } catch (error) {
    return {
      errors: {system: {_errors: ["An unexpected error occurred. Please try again later or contact support if the problem persists."]}},
      success: false,
      data: data
    }
  }
  
 
  redirect("/")
}
"use server"

import { redirect } from "next/navigation"
import { z } from "zod";

const profileSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  bio: z.string().min(1, "Bio is required"),
  fieldOfStudy: z.string().min(1, "Field of study is required"), 
  educationLevelId: z.string().uuid("Invalid education level"),
  currentJobAreaId: z.string().uuid("Invalid current job role"),
  currentJobLevelId: z.string().uuid("Invalid current job level"),
  futureJobAreaId: z.string().uuid("Invalid future job role"),
  futureJobLevelId: z.string().uuid("Invalid future job level")
});

export async function submitProfile(prevState, formData) {
  const data = Object.fromEntries(formData);

  // Validate the form data against the schema
  const res = await profileSchema.safeParseAsync(data);

  if (!res.success) {
    const errors = res.error.format();
    return {
      errors: errors,
      success: false,
      data: data
    };
  }

  try {
    // Placeholder for API call (commented out)
    /*
    const response = await fetch("http://24.199.121.110/api/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(res.data),
    });

    if (!response.ok) {
      const errorData = await response.json();
      return {
        errors: { system: { _errors: [errorData.error] } },
        success: false,
        data: data
      };
    }
    */

    redirect("/");
  } catch (error) {
    console.error(error);
    return {
      errors: { system: { _errors: ["An unexpected error occurred. Please try again later or contact support if the problem persists."] } },
      success: false,
      data: data
    };
  }
}

export async function getProfileMocks() {
  const educationLevels = [
    { id: "guid-education-1", label: "High School" },
    { id: "guid-education-2", label: "Associate Degree" },
    { id: "guid-education-3", label: "Bachelor's Degree" },
    { id: "guid-education-4", label: "Master's Degree" },
    { id: "guid-education-5", label: "PhD" }
  ];

  const jobRoles = [
    {
      JobRoleId: "guid-jobrole-1",
      JobArea: { Id: "guid-jobarea-1", Name: "Software Development" },
      JobLevel: { Id: "guid-joblevel-junior", Name: "Junior" }
    },
    {
      JobRoleId: "guid-jobrole-2",
      JobArea: { Id: "guid-jobarea-2", Name: "Data Science" },
      JobLevel: { Id: "guid-joblevel-senior", Name: "Senior" }
    }
  ];

  const jobLevels = [
    { id: "guid-joblevel-junior", label: "Junior" },
    { id: "guid-joblevel-mid", label: "Mid-Level" },
    { id: "guid-joblevel-senior", label: "Senior" },
    { id: "guid-joblevel-lead", label: "Lead" },
    { id: "guid-joblevel-manager", label: "Manager" }
  ];

  return { educationLevels, jobRoles, jobLevels };
}


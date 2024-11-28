"use client"

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { useActionState } from "react";
import { Loader2 } from "lucide-react";
import { submitProfile } from "./profile-actions"; 

// Mock options for education levels
const educationLevels = [
  { id: "guid-education-1", label: "High School" },
  { id: "guid-education-2", label: "Associate Degree" },
  { id: "guid-education-3", label: "Bachelor's Degree" },
  { id: "guid-education-4", label: "Master's Degree" },
  { id: "guid-education-5", label: "PhD" }
];

// Mock job roles with GUIDs
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
  // Add more job roles as needed
];

// Mock job levels
const jobLevels = [
  { id: "guid-joblevel-junior", label: "Junior" },
  { id: "guid-joblevel-mid", label: "Mid-Level" },
  { id: "guid-joblevel-senior", label: "Senior" },
  { id: "guid-joblevel-lead", label: "Lead" },
  { id: "guid-joblevel-manager", label: "Manager" }
];

const initialState = {
  errors: {},
  success: false,
  data: {}
}

export default function ProfileForm({ mocks }) {
  const [state, formAction, isPending] = useActionState(submitProfile, initialState);

  const { educationLevels, jobRoles, jobLevels } = mocks; 

  return (
    <form className="w-full max-w-4xl mx-auto">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div className="flex flex-col space-y-1.5 gap-1">
          <Label htmlFor="firstName">First Name</Label>
          <Input
            type="text"
            name="firstName"
            defaultValue={state.data.firstName}
          />
          {state.errors?.firstName && (
            <Label variant="error">
              {state.errors.firstName._errors[0]}
            </Label>
          )}
        </div>

        <div className="flex flex-col space-y-1.5 gap-1">
          <Label htmlFor="lastName">Last Name</Label>
          <Input
            type="text"
            name="lastName"
            defaultValue={state.data.lastName}
          />
          {state.errors?.lastName && (
            <Label variant="error">
              {state.errors.lastName._errors[0]}
            </Label>
          )}
        </div>

        <div className="col-span-2 flex flex-col space-y-1.5 gap-1">
          <Label htmlFor="bio">Bio</Label>
          <Textarea
            name="bio"
            placeholder="Tell us about yourself..."
            defaultValue={state.data.bio}
          />
          {state.errors?.bio && (
            <Label variant="error">
              {state.errors.bio._errors[0]}
            </Label>
          )}
        </div>

        <div className="flex flex-col space-y-1.5 gap-1">
          <Label htmlFor="educationLevelId">Education Level</Label>
          <select
            name="educationLevelId"
            defaultValue={state.data.educationLevel}
            className="p-2 border rounded"
          >
            {educationLevels.map((level) => (
              <option key={level.id} value={level.id}>
                {level.label}
              </option>
            ))}
          </select>
          {state.errors?.educationLevel && (
            <Label variant="error">
              {state.errors.educationLevel._errors[0]}
            </Label>
          )}
        </div>

        <div className="flex flex-col space-y-1.5 gap-1">
          <Label htmlFor="fieldOfStudy">Field of Study</Label>
          <Input
            type="text"
            name="fieldOfStudy"
            placeholder="Computer Science"
            defaultValue={state.data.fieldOfStudy}
          />
          {state.errors?.fieldOfStudy && (
            <Label variant="error">
              {state.errors.fieldOfStudy._errors[0]}
            </Label>
          )}
        </div>

        <div className="col-span-1 sm:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div className="flex flex-col space-y-1.5 gap-1">
            <Label htmlFor="currentJobAreaId">Current Job Role</Label>
            <select
              name="currentJobAreaId"
              defaultValue={state.data.currentJobRoleId}
              className="p-2 border rounded"
            >
              {jobRoles.map((role) => (
                <option key={role.JobRoleId} value={role.JobRoleId}>
                  {role.JobArea.Name}
                </option>
              ))}
            </select>
            {state.errors?.currentJobRoleId && (
              <Label variant="error">
                {state.errors.currentJobRoleId._errors[0]}
              </Label>
            )}
          </div>

          <div className="flex flex-col space-y-1.5 gap-1">
            <Label htmlFor="currentJobLevelId">Current Job Level</Label>
            <select
              name="currentJobLevelId"
              defaultValue={state.data.currentJobLevelId}
              className="p-2 border rounded"
            >
              {jobLevels.map((level) => (
                <option key={level.id} value={level.id}>
                  {level.label}
                </option>
              ))}
            </select>
            {state.errors?.currentJobLevel && (
              <Label variant="error">
                {state.errors.currentJobLevel._errors[0]}
              </Label>
            )}
          </div>

          {/* Future Job Role and Level */}
          <div className="flex flex-col space-y-1.5 gap-1">
            <Label htmlFor="futureJobAreaId">Future Job Role</Label>
            <select
              name="futureJobAreaId"
              defaultValue={state.data.futureJobRoleId}
              className="p-2 border rounded"
            >
              {jobRoles.map((role) => (
                <option key={role.JobRoleId} value={role.JobRoleId}>
                  {role.JobArea.Name}
                </option>
              ))}
            </select>
          </div>

          <div className="flex flex-col space-y-1.5 gap-1">
            <Label htmlFor="futureJobLevelId">Future Job Level</Label>
            <select
              name="futureJobLevelId"
              defaultValue={state.data.futureJobLevelId}
              className="p-2 border rounded"
            >
              {jobLevels.map((level) => (
                <option key={level.id} value={level.id}>
                  {level.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="flex w-full justify-end pt-6 pb-2">
          <Button formAction={formAction} disabled={isPending}>
            {isPending && <Loader2 className="animate-spin" />}
            {isPending && "Submitting..."}
            {!isPending && "Submit"}
          </Button>
        </div>
      </div>
    </form>
  );
}

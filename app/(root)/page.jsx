import { redirect } from "next/navigation";
import { getUser } from "./_components/root-actions";
import ProfileForm from "./_components/profile-form";
import { getProfileMocks } from "./_components/profile-actions";

export default async function Home() {

  const userResponse = await getUser()

  if(!userResponse.success)
  {
    redirect("/login");
  }

  const mocks = await getProfileMocks()
  
  return (
    <div className="w-full px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto bg-white p-6 rounded-lg shadow-lg">
        <h1 className="text-2xl font-semibold mb-4">Profile</h1>
        <ProfileForm mocks={mocks}/>
      </div>
    </div>
  );
}

import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card'
import RegisterForm from './_components/register-form'
import Link from 'next/link'

export default function RegisterPage() {
  return (
    <div className="w-full px-2 md:w-2/3">
      <Card>
        <CardHeader>
          <CardTitle>Register</CardTitle>
          <CardDescription>Create your account</CardDescription>
        </CardHeader>
        <CardContent>
          <RegisterForm/>
        </CardContent>
        <CardFooter>
          Already have an account?
          <Link
            href="/login"
            className="pl-1 text-orange-500 dark:text-orange-300 hover:underline"
          >
            Login
          </Link>
        </CardFooter>
      </Card>
    </div>
  )
}

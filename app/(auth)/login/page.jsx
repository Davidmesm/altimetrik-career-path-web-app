import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card'
import LoginForm from './_components/login-form'
import Link from 'next/link'

export default function LoginPage() {
  return (
    <div className="w-full px-2 md:w-2/3">
      <Card>
        <CardHeader>
          <CardTitle>Sign In</CardTitle>
          <CardDescription>Sign in to your account</CardDescription>
        </CardHeader>
        <CardContent>
          <LoginForm/>
        </CardContent>
        <CardFooter>
          Don’t have an account?
          <Link
            href="/register"
            className="pl-1 text-orange-500 dark:text-orange-300 hover:underline"
          >
            Register
          </Link>
        </CardFooter>
      </Card>
    </div>
  )
}

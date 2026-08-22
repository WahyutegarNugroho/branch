import { RegisterForm } from './RegisterForm'

export default async function RegisterPage({
  searchParams,
}: {
  searchParams: Promise<{ username?: string }>
}) {
  const { username } = await searchParams

  return <RegisterForm initialUsername={username ?? null} />
}

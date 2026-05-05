'use server'

import { z } from 'zod'

const schema = z.object({
  name: z.string(),
  email: z.string().email(),
  message: z.string(),
})

export async function saveContactRequest(prevState: { message: string | null }, formData: FormData): Promise<{ message: string | null; errors?: { name?: string[]; email?: string[]; message?: string[] } }> {
  const validatedFields = schema.safeParse({
    name: formData.get('name'),
    email: formData.get('email'),
    message: formData.get('message'),
  })

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: null,
    }
  }

  // Save contact request to database...
  console.log(validatedFields.data)

  return { message: 'Your message has been sent!' }
}

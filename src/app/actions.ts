'use server'

interface ContactFormState {
  message: string | null;
  errors?: {
    name?: string[];
    email?: string[];
    message?: string[];
  };
}

export async function saveContactRequest(
  prevState: ContactFormState,
  formData: FormData
): Promise<ContactFormState> {
  // Hidden honeypot check
  const honeypot = formData.get('website')?.toString().trim() || '';
  if (honeypot) {
    return { message: 'Your message has been sent!' };
  }

  const name = formData.get('name')?.toString().trim() || '';
  const email = formData.get('email')?.toString().trim() || '';
  const message = formData.get('message')?.toString().trim() || '';

  const errors: ContactFormState['errors'] = {};

  if (!name || name.length < 2 || name.length > 100) {
    errors.name = ['Name must be between 2 and 100 characters.'];
  }
  if (!email || email.length > 254 || !/^[\w.+-]+@[\w-]+\.[\w.-]+$/.test(email)) {
    errors.email = ['A valid email address is required.'];
  }
  if (!message || message.length < 5 || message.length > 2000) {
    errors.message = ['Message must be between 5 and 2000 characters.'];
  }

  if (Object.keys(errors).length > 0) {
    return { errors, message: null };
  }

  return { message: 'Your message has been sent!' };
}

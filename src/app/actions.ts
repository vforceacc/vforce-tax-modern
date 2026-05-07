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
  const name = formData.get('name')?.toString().trim() || '';
  const email = formData.get('email')?.toString().trim() || '';
  const message = formData.get('message')?.toString().trim() || '';

  const errors: ContactFormState['errors'] = {};

  if (!name) errors.name = ['Name is required.'];
  if (!email || !/^[\w.+-]+@[\w-]+\.[\w.-]+$/.test(email)) {
    errors.email = ['A valid email address is required.'];
  }
  if (!message) errors.message = ['Message is required.'];

  if (Object.keys(errors).length > 0) {
    return { errors, message: null };
  }

  // Log contact request (replace with DB write or email service)
  console.log('[Contact Form]', { name, email, message });

  return { message: 'Your message has been sent!' };
}

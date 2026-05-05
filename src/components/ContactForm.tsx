'use client'

import { useFormState } from 'react-dom'
import { saveContactRequest } from '@/app/actions'

const initialState = {
  message: null,
}

export function ContactForm() {
  const [state, formAction] = useFormState(saveContactRequest, initialState)

  return (
    <form action={formAction} className="space-y-4">
      <div>
        <label htmlFor="name" className="block text-sm font-medium">Name</label>
        <input type="text" id="name" name="name" className="mt-1 block w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-md text-white focus:outline-none focus:ring-primary focus:border-primary sm:text-sm" />
      </div>
      <div>
        <label htmlFor="email" className="block text-sm font-medium">Email</label>
        <input type="email" id="email" name="email" className="mt-1 block w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-md text-white focus:outline-none focus:ring-primary focus:border-primary sm:text-sm" />
      </div>
      <div>
        <label htmlFor="message" className="block text-sm font-medium">Message</label>
        <textarea id="message" name="message" rows={4} className="mt-1 block w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-md text-white focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"></textarea>
      </div>
      <button type="submit" className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-primary hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary">
        Send Message
      </button>
      <p className="text-sm text-gray-500">{state?.message}</p>
    </form>
  )
}

export default ContactForm;

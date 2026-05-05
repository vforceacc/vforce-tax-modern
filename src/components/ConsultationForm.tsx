'use client';

import { useState } from 'react';

export default function ConsultationForm() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Handle form submission logic here
    console.log({ name, email, message });
    setSubmitted(true);
  };

  return (
    <div className="bg-gray-100 p-8 rounded-lg shadow-md">
      <h3 className="text-2xl font-semibold mb-6">Request a Consultation</h3>
      {submitted ? (
        <p className="text-lg text-green-500">Thank you for your message! We will get back to you shortly.</p>
      ) : (
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="name" className="block text-gray-700 font-medium mb-2">Name</label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setName(e.target.value)}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-vforce-green"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-700 font-medium mb-2">Email</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-vforce-green"
              required
            />
          </div>
          <div className="mb-6">
            <label htmlFor="message" className="block text-gray-700 font-medium mb-2">Message</label>
            <textarea
              id="message"
              value={message}
              onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setMessage(e.target.value)}
              rows={4}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-vforce-green"
              required
            ></textarea>
          </div>
          <button
            type="submit"
            className="w-full bg-vforce-green text-white font-bold py-3 px-6 rounded-md hover:bg-opacity-90 transition-colors"
          >
            Send Message
          </button>
        </form>
      )}
    </div>
  );
}

import React, {useState} from 'react';
import { useRouter } from 'next/router';

import { api } from "~/utils/api";

export default function SignUp() {
    const router = useRouter();
    const [formData, setFormData] = useState({
      name: '',
      email: '',
      password: ''
    });
  
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    };
    const signUp = api.user.signUp.useMutation();
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      // Handle form submission, e.g., send data to server
      console.log(formData);
      /**
       * Represents the user object returned from the signUp API mutation.
       */
      const user = signUp.mutate(formData);
      console.log(user)
      // Reset form fields
      router.push({
        pathname: '/verify',
        query: { email: formData.email },
      }).catch((error) => {
        console.error('Error navigating to verify page:', error);
      });
      // setFormData({
      //   name: '',
      //   email: '',
      //   password: ''
      // });
    
    };
  
    return (
      <div>
        <h2>Sign Up</h2>
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="name">Name:</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
            />
          </div>
          <div>
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
            />
          </div>
          <div>
            <label htmlFor="password">Password:</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
            />
          </div>
          <button type="submit">Sign Up</button>
        </form>
        <p>
          Already have an account? <a href="/login">Login</a>
        </p>
      </div>
    );
}

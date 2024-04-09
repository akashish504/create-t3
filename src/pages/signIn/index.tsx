import React ,{ useState } from 'react';
import { api } from "~/utils/api";
import { useRouter } from 'next/router';

interface SignInFormData {
  email: string;
  password: string;
}

export default function SignIn() {
  const [formData, setFormData] = useState<SignInFormData>({
    email: '',
    password: ''
  });

	const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };
  const signIn = api.user.signIn.useMutation();
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
		signIn.mutate(formData);
		router.push({
			pathname: '/chooseCategory'
		}).catch((error) => {
			console.error('Error navigating to verify page:', error);
		});
    // Here you can handle form submission, e.g., sending data to server
    console.log(formData);
  };

  return (
    <div>
      <h2>Sign In</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="email">Email:</label>
          <input
            type="text"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
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
            required
          />
        </div>
        <button type="submit">Sign In</button>
      </form>
    </div>
  );
}

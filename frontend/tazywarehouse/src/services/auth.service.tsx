import { User } from "next-auth";

const API_URL = 'http://localhost:5149/api/auth'; // Замените на ваш URL бэкенда

export async function registerUser(email: string, password: string): Promise<Omit<User, 'password'>> {
    const response = await fetch(`${API_URL}/register`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
    });

    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Registration failed');
    }

    return await response.json();
}

export async function loginUser(email: string, password: string): Promise<Omit<User, 'password'> | null> {
    const response = await fetch(`${API_URL}/login`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
    });

    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Login failed');
    }

    return await response.json();
}
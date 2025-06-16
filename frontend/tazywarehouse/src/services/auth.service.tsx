const STORAGE_KEY = "tazywarehouse_users";

export async function registerUser(email: string, password: string): Promise<{ email: string }> {
    await new Promise((resolve) => setTimeout(resolve, 200)); // эмуляция задержки
    const users = JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
    if (users.some((u: any) => u.email === email)) {
        throw new Error("Пользователь с таким email уже существует");
    }
    const newUser = { email, password };
    users.push(newUser);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(users));
    return { email };
}

export async function loginUser(email: string, password: string): Promise<{ email: string } | null> {
    await new Promise((resolve) => setTimeout(resolve, 200)); // эмуляция задержки
    const users = JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
    const user = users.find((u: any) => u.email === email && u.password === password);
    if (!user) {
        throw new Error("Неверный email или пароль");
    }
    return { email: user.email };
}
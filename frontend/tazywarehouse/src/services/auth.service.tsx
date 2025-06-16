const STORAGE_KEY = "tazywarehouse_users";

export async function registerUser(
  email: string,
  password: string
): Promise<{ id: string; email: string; name: string; role: string }> {
  await new Promise((resolve) => setTimeout(resolve, 200)); // эмуляция задержки
  const users = JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
  if (users.some((u: any) => u.email === email)) {
    throw new Error("Пользователь с таким email уже существует");
  }
  const newUser = {
    id: crypto.randomUUID ? crypto.randomUUID() : String(Date.now()),
    email,
    password,
    name: email.split("@")[0],
    role: "user",
  };
  users.push(newUser);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(users));
  // Не возвращаем пароль!
  return {
    id: newUser.id,
    email: newUser.email,
    name: newUser.name,
    role: newUser.role,
  };
}

export async function loginUser(
  email: string,
  password: string
): Promise<{ id: string; email: string; name: string; role: string } | null> {
  await new Promise((resolve) => setTimeout(resolve, 200)); // эмуляция задержки
  const users = JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
  const user = users.find((u: any) => u.email === email && u.password === password);
  if (!user) {
    throw new Error("Неверный email или пароль");
  }
  return {
    id: user.id,
    email: user.email,
    name: user.name ?? user.email.split("@")[0],
    role: user.role ?? "user",
  };
}
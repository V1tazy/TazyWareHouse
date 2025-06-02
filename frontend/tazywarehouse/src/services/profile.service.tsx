const API_URL = "http://localhost:5149/";


export interface ProfileData {
  email: string;
  firstName: string;
  lastName: string;
  phoneNumber: string;
}


export interface ChangePasswordRequest {
  email: string;
  currentPassword: string;
  newPassword: string;
}

export async function fetchProfileData(email: string ): Promise<ProfileData> {
  const response = await fetch(`${API_URL}api/Profile/LoadDataProfile`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email}),
  });

  if (!response.ok) {
    throw new Error("Не удалось загрузить данные профиля.");
  }

  return await response.json();
}

export async function fetchProfileUpdateData(email: string, firstName: string, lastName: string, phoneNumber: string): Promise<ProfileData> {
  const response = await fetch(`${API_URL}api/Profile/UpdateProfile`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, firstName, lastName, phoneNumber }),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || "Не удалось обновить данные профиля.");
  }

  return await response.json();
}


export async function changePassword(request: ChangePasswordRequest): Promise<void> {
    const response = await fetch(`${API_URL}/api/Profile/ChangePassword`, {
        method: "POST",
        headers: {
        "Content-Type": "application/json",
        },
        body: JSON.stringify(request),
    });
    
    if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || "Не удалось изменить пароль.");
    }
}

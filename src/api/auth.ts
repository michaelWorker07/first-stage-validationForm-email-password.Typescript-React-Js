const API_URL = "http://localhost:4000";

export const loginUser = async (email: string, password: string) => {
   
    const response = await fetch(`${API_URL}/users`);
    const users = await response.json();

    
    const user = users.find((u: any) => u.email === email && u.password === password);

   
    return user || null;
}
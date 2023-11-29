import PocketBase from 'pocketbase';

const hostname = import.meta.env.PUBLIC_POCKETBASE_HOST;

const pb = new PocketBase(hostname);

export async function signup( email: string, password: string, name: string) : Promise<string> {
    const data = {
        "email": email,
        "password": password,
        "passwordConfirm": password,
        "name": name
    };
    await pb.collection('users').create(data);
    await pb.collection('users').authWithPassword(data.email, data.password);
    const cookie = pb.authStore.exportToCookie();
    pb.authStore.clear();
    return cookie;
}

export async function login(email: string, password: string) : Promise<string> {
    try{
        await pb.collection('users').authWithPassword(email, password);
    } catch (e) {
        console.log(e);
    }
    const cookie = pb.authStore.exportToCookie();
    pb.authStore.clear();
    return cookie;
}
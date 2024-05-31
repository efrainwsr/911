import { ref } from 'vue';

export function isAuthenticated() {
    const user = localStorage.getItem('user');
    return user !== null;
}

export const saveToken = (token) => {
    localStorage.setItem('token', token);
    
    isAuthenticated.value = true;
};

export const saveUserInfo = (info)=>{
    localStorage.setItem('user', JSON.stringify(info));
}

export const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    isAuthenticated.value = false;
};
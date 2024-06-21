import { clsx } from "clsx"
import { twMerge } from "tailwind-merge"


export function cn(...inputs) {
    return twMerge(clsx(inputs))
}

export async function makeHttpRequest(endPoint,method,body) {
    const url = `${process.env.BASE_URL}/api/${endPoint}`

    try {
        const fetchOptions = {
            method: method,            
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            credentials: 'include',
            body: JSON.stringify(body) 
        }    
        
        const response = await fetch(url, fetchOptions)  
        const responseBody = await response.json();

    
        console.log(url,responseBody.Status);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status},${await response.json()}`);
        }
        return responseBody

    } catch (error) {
        console.error('Request failed', error);
        return error
    }
}
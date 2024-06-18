import { clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs) {
  return twMerge(clsx(inputs))
}

export async function makeHttpRequest(endPoint,method,body) {
    const url = `${process.env.BASE_URL}/api/${endPoint}`
    
    console.log('url', url)
    try {
        const response = await fetch(url, {
            method: method,
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(body)
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status},${await response.json()}`);
        }

        return await response.json()

    } catch (error) {
        console.error('Request failed', error);
    }
}
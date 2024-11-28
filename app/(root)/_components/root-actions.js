"use server"

import { getSession } from "@/lib/session";

export async function getUser() {
    const session = await getSession();

    try {
        const response = await fetch('http://24.199.121.110/api/user', {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${session.token}`, 
            },
        });

        if (!response.ok) {

            if (response.status === 401) {
                return {
                    errors: { system: { _errors: ['unauthorized'] } },
                    success: false,
                    data: null
                };
            }

            let errorData = {};
            try {
                errorData = await response.json();
            } catch (e) {
                errorData = { error: 'An error occurred but no detailed message was provided.' };
            }

            console.warn("Error:", errorData);
            
            return {
                errors: { system: { _errors: [errorData.error || 'An unknown error occurred.'] } },
                success: false,
                data: null
            };
        }

        const data = await response.json();
        return {
            errors: {},
            success: true,
            data: data
        };
    } catch (error) {
        console.error("Unexpected error:", error);
        return {
            errors: { system: { _errors: ["An unexpected error occurred. Please try again later or contact support if the problem persists."] } },
            success: false,
            data: null
        };
    }


}

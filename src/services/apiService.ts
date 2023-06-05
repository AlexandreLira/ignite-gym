import { API_URL } from "@constants/index";

interface postProps {
    body: BodyInit | null | undefined;
    url: string;
}

export class api {
    static async post(data: postProps) {
        const {body, url} = data
        const response = await fetch(`${API_URL}/${url}`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: body
        })

        const result = await response.json()
        return result
    }
}
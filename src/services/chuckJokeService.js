import {createHttpClient} from "@/utils/api.js";

export const chuckJokeService = () => {
    const api = createHttpClient(
        import.meta.env.VITE_CHUCK_API_URL,
        {
            'X-Api-Key': import.meta.env.VITE_CHUCK_API_TOKEN
        }
    )

    const getChuckJokes = async () => {
        try {
            const {joke} = await api.get('/chucknorris')
            return joke
        } catch (error) {
            console.error(error)
            return error;
        }
    }

    return {
        getChuckJokes
    }
}
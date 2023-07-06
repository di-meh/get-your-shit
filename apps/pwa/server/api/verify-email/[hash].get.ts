export default defineEventHandler(
    async (event) => {
        const data = await useGatewayFetch('/auth/verify', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: {
                hash: event.context.params.hash
            },
            onResponse(context) {
                if (!context.response.ok) {
                    throw createError({statusCode: 500, message: "Votre mail n'a pas pu être vérifié."})
                }
            }
        })
        return sendRedirect(event, '/login', 301)
    },
)

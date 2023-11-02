/**
 * Set additional headers and other the configuration on each request. This function runs every time the SvelteKit server receives a request.
 * - [Hooks documentation](https://kit.svelte.dev/docs/hooks)
 * - [handle() hook documentation](https://kit.svelte.dev/docs/hooks#server-hooks-handle)
 * @param {{}} options Event and resolve.
> */
export const handle = async ({ event, resolve }) => {
    const response = await resolve(event);
    response.headers.set('Access-Control-Allow-Origin', '*');

    return response;
};

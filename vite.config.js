import { sveltekit } from '@sveltejs/kit/vite';

/**
 * Vite configuration.
 * - server.fs.allow['..'] Search up directory for workspace root by default.
 * @type {import('vite').UserConfig}
 * */
const config = {
    server: {
        fs: {
            allow: ['..']
        }
    },
    plugins: [sveltekit()]
};

export default config;

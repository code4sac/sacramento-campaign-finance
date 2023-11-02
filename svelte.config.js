import adapter from '@sveltejs/adapter-netlify';
import preprocess from 'svelte-preprocess';

/**
 * Svelte configuration. Supports Netlify Edge Function and SCSS.
 * @type {import('@sveltejs/kit').Config}
 * */
const config = {
    kit: {
        // default options are shown
        adapter: adapter({
            // if true, will create a Netlify Edge Function rather
            // than using standard Node-based functions
            edge: false,

            // if true, will split your app into multiple functions
            // instead of creating a single one for the entire app.
            // if `edge` is true, this option cannot be used
            split: false
        })
    },

    // enable SCSS
    preprocess: preprocess(),

    prerender: {
        entries: ['/body/sac-city', '/election/2022-11-08']
    }
};

export default config;

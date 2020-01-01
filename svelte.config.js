const sveltePreprocess = require('svelte-preprocess');

module.exports = {
    preprocess: sveltePreprocess({
        postcss: true
        // ...svelte-preprocess options
    }),
    // ...other svelte options
};
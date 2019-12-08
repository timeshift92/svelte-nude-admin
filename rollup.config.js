import svelte from 'rollup-plugin-svelte';
import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import livereload from 'rollup-plugin-livereload';
import { terser } from 'rollup-plugin-terser';
import importResolver from "rollup-plugin-import-resolver";
import htmlTemplate from 'rollup-plugin-generate-html-template';
import autoPreprocess from 'svelte-preprocess';
import { fileRouter } from 'svelte-filerouter'
import sass from 'rollup-plugin-sass';
import postcss from 'rollup-plugin-postcss';
// import svelte from 'rollup-plugin-svelte-hot'
import hmr, { autoCreate } from 'rollup-plugin-hot'

// Set this to true to pass the --single flag to sirv (this serves your
// index.html for any unmatched route, which is a requirement for SPA
// routers using History API / pushState)
//
// NOTE This will have no effect when running with Nollup. For Nollup, you'd
// have to add the --history-api-fallback yourself in your package.json
// scripts (see: https://github.com/PepsRyuu/nollup/#nollup-options)
//
const spa = false

// NOTE The NOLLUP env variable is picked by various HMR plugins to switch
// in compat mode. You should not change its name (and set the env variable
// yourself if you launch nollup with custom comands).
const nollup = !!process.env.NOLLUP
const watch = nollup || !!process.env.ROLLUP_WATCH
const useLiveReload = !!process.env.LIVERELOAD

const dev = watch || useLiveReload
const production = !dev

const hot = watch && !useLiveReload

export default {
	input: 'src/main.js',
	output: {
		sourcemap: true,
		// "amd", "cjs", "system", "esm", "iife" or "umd".
		format: 'esm',
		name: 'app',
		dir: 'public/bundle',
		// file: nollup ? 'build/bundle.js' : 'public/build/bundle.js',
	},
	plugins: [
		fileRouter({
			appFile: 'src/App.svelte',
			pages: './src/pages',
			dynamicImports: true
			// ignore: ''
		}),
		importResolver({
			extensions: ['.svelte', '.mjs', '.html', '.js'],
			alias: {
				'~': './src',
				'co': './src/components'
			},

		}),
		// htmlTemplate({
		// 	template: 'src/template.html',
		// 	target: 'index.html',
		// }),
		svelte({
			preprocess: autoPreprocess({
				postcss: true,
				scss: true
			}),
			// enable run-time checks when not in production
			dev: !production,
			// we'll extract any component CSS out into
			// a separate file — better for performance
			css: css => {
				css.write('public/components.css');
			}
		}),
		// svelte({
		// 	preprocess: autoPreprocess({
		// 		postcss: true,
		// 		scss: true
		// 	}),
		// 	// enable run-time checks when not in production
		// 	dev: !production,
		// 	// we'll extract any component CSS out into
		// 	// a separate file — better for performance
		// 	...(!hot && {
		// 		css: css => {
		// 			css.write('public/build/bundle.css')
		// 		},
		// 	}),
		// 	hot: hot && {
		// 		// optimistic will try to recover from runtime
		// 		// errors during component init
		// 		optimistic: true,
		// 		// turn on to disable preservation of local component
		// 		// state -- i.e. non exported `let` variables
		// 		noPreserveState: false,
		// 	},
		// }),
		hot && autoCreate({
			include: 'src/**/*',
			// Set false to prevent recreating a file that has just been
			// deleted (Rollup watch will crash when you do that though).
			recreate: true,
		}),
		hot && hmr({
			public: 'public',
			inMemory: true
		}),
		dev && !nollup && serve(),
		useLiveReload && livereload('public'),

		// If you have external dependencies installed from
		// npm, you'll most likely need these plugins. In
		// some cases you'll need additional configuration —
		// consult the documentation for details:
		// https://github.com/rollup/rollup-plugin-commonjs
		resolve({
			browser: true,
			dedupe: importee => importee === 'svelte' || importee.startsWith('svelte/')
		}),
		postcss({
			extract: 'public/utils.css'
		}),
		sass(),

		commonjs(),
		// Watch the `public` directory and refresh the
		// browser on changes when not in production
		// !production && livereload('public'),

		// If we're building for production (npm run build
		// instead of npm run dev), minify
		production && terser()
	],
	watch: {
		clearScreen: false
	}
};

function serve() {
	let started = false
	return {
		name: 'svelte/template:serve',
		writeBundle() {
			if (!started) {
				started = true
				const flags = ['run', 'start', '--', '--dev']
				if (spa) {
					flags.push('--single')
				}
				require('child_process').spawn('npm', flags, {
					stdio: ['ignore', 'inherit', 'inherit'],
					shell: true,
				})
			}
		},
	}
}

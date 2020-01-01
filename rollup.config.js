import svelte from 'rollup-plugin-svelte-hot'
import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import livereload from 'rollup-plugin-livereload';
import { terser } from 'rollup-plugin-terser';
import importResolver from "rollup-plugin-import-resolver";
import autoPreprocess from 'svelte-preprocess';
import { routify } from '@sveltech/routify'
import sass from 'rollup-plugin-sass';
import postcss from 'rollup-plugin-postcss';
import hmr, { autoCreate } from 'rollup-plugin-hot'


// Routify needs SPA support from server
const spa = true

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
		format: 'iife',
		name: 'app',
		...nollup ? {
			dir: 'public/build',
			entryFileNames: 'build/bundle.js',
		} : {
				file: nollup ? 'build/bundle.js' : 'public/build/bundle.js',
			}
	},
	plugins: [
		routify(),
		importResolver({
			extensions: ['.svelte', '.mjs', '.html', '.js'],
			alias: {
				'~': './src',
				'co': './src/components'
			},

		}),

		svelte({
			preprocess: autoPreprocess(),

			// enable run-time checks when not in production
			dev: !production,
			// we'll extract any component CSS out into
			// a separate file — better for performance
			...(!hot && {
			  css: css => {
				css.write('public/build/bundle.css')
			  },
			}),
			hot: hot && {
			  // optimistic will try to recover from runtime
			  // errors during component init
			  optimistic: true,
			  // turn on to disable preservation of local component
			  // state -- i.e. non exported `let` variables
			  noPreserveState: false,
			},
		  }),

		useLiveReload && livereload('public'),


		resolve({
			browser: true,
			dedupe: importee => importee === 'svelte' || importee.startsWith('svelte/')
		}),
		postcss({
			extract: 'public/utils.css'
		}),
		sass(),

		commonjs(),
		dev && !nollup && serve({ spa }),

		production && terser(),
		hot &&
		autoCreate({
			include: 'src/**/*',
			// Set false to prevent recreating a file that has just been
			// deleted (Rollup watch will crash when you do that though).
			recreate: true,
		}),

		hot &&
		hmr({
			public: 'public',
			inMemory: true,
		}),
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

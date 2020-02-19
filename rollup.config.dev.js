
import svelte from 'rollup-plugin-svelte-hot'
import hmr, { autoCreate } from 'rollup-plugin-hot';
import commonjs from 'rollup-plugin-commonjs';
import livereload from 'rollup-plugin-livereload';
import { terser } from 'rollup-plugin-terser';
import { config } from '@sveltech/routify'
import copy from 'rollup-plugin-copy'
import del from 'del'
import ppidChanged from 'ppid-changed'
import path from 'path'
import alias from '@rollup/plugin-alias';
import resolve from '@rollup/plugin-node-resolve';
const spa = true
const projectRootDir = path.resolve(__dirname);
import postcss from 'rollup-plugin-postcss';
import autoPreprocess from 'svelte-preprocess';
// const production = !process.env.ROLLUP_WATCH;
const { distDir, staticDir, sourceDir, dynamicImports: split } = config
const buildDir = `${distDir}/build`
const template = staticDir + (split ? '/__dynamic.html' : '/__bundled.html')

const nollup = !!process.env.NOLLUP
const watch = nollup || !!process.env.ROLLUP_WATCH
const useLiveReload = !!process.env.LIVERELOAD

const dev = watch || useLiveReload
const production = !dev

const hot = watch && !useLiveReload

const src = process.env.NODE_ENV === 'test' ? 'src.test' : 'src'

// Delete the dist folder, but not between build steps
// ("build": "build-step-1 && build-step-2 && etc")
if (ppidChanged()) del.sync(distDir + '/**')

export default {
	input: `${sourceDir}/main.js`,
	output: {
		sourcemap: true,
		format: 'iife',
		name: 'app',
		...nollup ? {
			dir: 'dist/build',
			entryFileNames: 'build/bundle.js',
		} : {
				file: nollup ? 'build/bundle.js' : 'dist/build/bundle.js',
			}
	},
	plugins: [
		copy({ targets: [{ src: staticDir + '/*', dest: distDir }] }),
		copy({ targets: [{ src: template, dest: distDir, rename: '__app.html' }] }),
		copy({ targets: [{ src: template, dest: distDir, rename: 'index.html' }] }),

		alias({
			entries: [
				{
					find: '~',
					replacement: path.resolve(projectRootDir, 'src')
				},
				{
					find: 'co',
					replacement: path.resolve(projectRootDir, 'src/components')
				},
				{
					find: 'crud',
					replacement: path.resolve(projectRootDir, 'src/components/base/crud')
				}
			],
			resolve: ['.mjs', '.js', '.jsx', '.json', '.sass', '.scss', '.svelte']
		}),
		postcss(),
		svelte({
			preprocess: autoPreprocess({ postcss: true }),
			// enable run-time checks when not in production
			dev: !production,
			hydratable: true,
			// we'll extract any component CSS out into
			// a separate file — better for performance
			...(!hot && {
				css: css => {
					css.write(`${buildDir}/bundle.css`);
				}
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

		// If you have external dependencies installed from
		// npm, you'll most likely need these plugins. In
		// some cases you'll need additional configuration —
		// consult the documentation for details:
		// https://github.com/rollup/rollup-plugin-commonjs
		resolve({
			browser: true,
			dedupe: importee => importee === 'svelte' || importee.startsWith('svelte/')
		}),
		commonjs(),

		dev && !nollup && serve({ spa }),
		// Watch the `public` directory and refresh the
		// browser on changes when not in production
		hot &&
		autoCreate({
			include: 'src/**/*',
			// Set false to prevent recreating a file that has just been
			// deleted (Rollup watch will crash when you do that though).
			recreate: true,
		}),

		hot &&
		hmr({
			public: 'dist',
			inMemory: true,
		}),
	],
	watch: {
		clearScreen: false
	}
}

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

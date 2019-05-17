# sapper-trimmings

Decorate your [Sapper](https://sapper.svelte.dev/) project with some (semi-optional) holiday spirit.

 * [PostCSS](https://postcss.org/) (CSS)
 * [sapper-svgo](https://github.com/sapper-dragon/svgo) (SVG preparation for Sapper)
 * [Remark](https://remark.js.org/) (Markdown)
 <!-- * [LilyPond](http://lilypond.org/) (Sheet Music) -->
 * [JSON ... to come]

Currently this is an overly-bundled grab bag of useful tools alongside Sapper. These tools are all employed in a very specific and opinionated manner. This may change in the future with the option to specify which bundles to include and instuctions on how to create a less burdensome download weight. But since this is a development-only tool mostly for personal reuse on various projects, I've kept it pretty weighty. In any case, the goal is something consistent for reuse that I mostly don't have to think about, but just tweak every now and then.

Another note, this lib *only* works with Svelte v3 and Sapper 0.26.0 and up.

You've been warned. 🐉

## Installation

```
npm install @sapper-dragon/trimmings --save-dev
# or
yarn add @sapper-dragon/trimmings --dev
```

## Usage

Watch various Sapper helper tools through the command line:
```
trim watch [options]
```

### Options

```
-p, --postcss     Use PostCSS for preprocessing  (default false)
-s, --svg         Use SVG compiler  (default false)
-m, --markdown    Use markdown compiler  (default false)
```

### package.json script

I'm using an NPM/Yarn `package.json` script like so (including any desired options):

```json
"watch": "trim watch --svg --postcss --markdown"
```

### Config

You can place a `trimmings.config.js` file in the root of your project to set configutations. These are the defaults:

```js
export default {

	postcss: {
		watchPath: 'src/trimmings/postcss', // path to watch *.postcss files:
		filename: 'global', // name of file without extension
		pathMatcher: /\.(postcss|css|scss)$/, // pattern for files to watch:
		staticPath: 'static/css', // output path:
		preImport: 'svelte-pre-imports', // filename without extension for pre-importing postcss vars and mixins
	},

	svgo: {
		watchPath: 'src/trimmings/svgo', // path to watch *.svg files:
		pathMatcher: /\.(svg)$/, // pattern for files to watch:
		sveltePath: 'src/routes/_svg', // svelte output path:
		staticPath: 'static/svg', // static output path:
	},

	remark: {
		watchPath: 'src/trimmings/remark', // path to watch *.md files:
		pathMatcher: /\.md$/, // pattern for files to watch:
		sveltePath: 'src/routes/_markdown', // svelte output path:
	},

}
```

### LiveReload

When using any of these tools, a file is generated for the use of triggering LiveReload if so desired. This file is generated everytime a change is made to any of the given files associated with the tools (*.css, *.svg, or *.md). The file is `./src/routes/_refresh.svelte`. You should add this to your `.gitignore` file:

```
/src/routes/_refresh.svelte
```

If you want this to actually trigger LiveReload, add it somewhere in your actual layout. I'm doing the following in any `_layout.svelte` file:

```html
<Refresh/>
<script>
	import Refresh from './_refresh.svelte'
</script>
```

The file is just a hidden component with a id that changes to invalidate and refresh.

## PostCSS

This package also includes a PostCSS preprocessor, separate from the cli `trim`. To use it, import it in your `rollup.config.js` file, and add it as a preproccesor like so:

```js
import { preprocess } from '@sapper-dragon/trimmings'
...
svelte({
	...
	preprocess: preprocess(),
	...
}),
```

NOTE: this preprocessor expects to find a file at `./src/trimmings/postcss/svelte-pre-imports.postcss` (depending on your settings). Make sure it exists. DO NOT include actual compiled CSS in this preprended file. That will bundle CSS into every component, which you most likely won't want. (Maybe there's such a relevant use case?) This mostly allows you to prepend variables or mixins or other `*.postcss` files into every component processed.

## Q&A

**Q:** Why not `rollup-plugin-*`?

**A:** Partly because I wanted tighter control, partly because Rollup isn't always easy to do wild and crazy things, and partly because this is just that, a grab bag of all sorts of reusable goods. I don't really expect anyone else to use this, but it's available for the taking if so desired.

**Q:** This isn't working exactly as specified.

**A:** I'm sure it isn't! It's highly tailored for my environment. Let me know what's wrong and how to fix it. Open an issue and I'll see what I can do.

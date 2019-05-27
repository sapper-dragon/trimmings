# sapper-trimmings

Decorate your [Sapper](https://sapper.svelte.dev/) project with some (semi-optional) holiday spirit.


This package is a grab bag of useful "plugins" for Sapper. These tools are all employed in a very specific and opinionated manner. The packages are all broken up into specific sub-packages, like so:

 * [@sapper-dragon/postcss](https://github.com/sapper-dragon/postcss) (PostCSS/CSS)
 * [@sapper-dragon/svgo](https://github.com/sapper-dragon/svgo) (SVGO/SVG)
 * [@sapper-dragon/remark](https://github.com/sapper-dragon/remark) (Remark/Markdown)
 <!-- * [LilyPond](http://lilypond.org/) (Sheet Music) -->
 <!-- * [JSON ... to come] -->

> NOTE: this lib *only* works with Svelte v3, Sapper 0.26.0+, and Rollup. _You've been warned_. 🐉

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

You can place a `trimmings.config.js` file in the root of your project to set configutations. Individual configurations can be found in each `@sapper-dragon/*` packages, but the basic format is like this:

```js
export default {
	postcss: {/* ...see @sapper-dragon/postcss package... */},
	svgo: {/* ...see @sapper-dragon/svgo package... */},
	remark: {/* ...see @sapper-dragon/remark package... */},
	// etc.
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

## Q&A

**Q:** Why not `rollup-plugin-*`?

**A:** Partly because I wanted tighter control, partly because Rollup isn't always easy to do wild and crazy things, and partly because this is just that, a grab bag of all sorts of reusable goods. I don't really expect anyone else to use this, but it's available for the taking if so desired.

**Q:** This isn't working exactly as specified.

**A:** I'm sure it isn't! It's highly tailored for my environment. Let me know what's wrong and how to fix it. Open an issue and I'll see what I can do.

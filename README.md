# generator-ng-electron

> Generator for an Electron wrapper app around an Angular web app.

Wraps an Angular application (you'll be prompted for a GitHub repository) with our custom [electron-boilerplate](https://github.com/TricomB2B/electron-boilerplate). Makes setup of this process a breeze.

## Installation

First, install [Yeoman](http://yeoman.io), [NodeJS](https://nodejs.org/), and [Yarn](https://yarnpkg.com/en/).

This generator is currently not available on the NPM registry. So you must clone and link manually:

```sh
$ git clone git@github.com:TricomB2B/generator-ng-electron.git ~/Projects/generator-ng-electron
$ cd ~/Projects/generator-ng-electron
$ yarn
.... stuff happening
$ npm link
```

## Usage

Generate your new project:

```sh
$ mkdir ~/Projects/great-project
$ cd ~/Projects/great-project
$ yo ng-electron
```

You'll be prompted for the necessary information. The generator will

- Download the electron-boilerplate.
- Install your Angular application to the appropriate location.
- Make the necessary file edits to make the web app work within Electron.
- Install electron-boilerplate dependencies.
- Start a dev instance of the app.

Super easy.

## Requirements

Your Angular app must be structured pretty specifically for everything to go smoothly out-of-the-box.

- `./dist/` must be present and must be the full distributable package. No lolligaggers. What this mean is it must include:
  - `index.html`
      - `<base href="/">` will be automatically removed
  - `js/bundle.js`
      - Must be minifed JavaScript
      - `html5Mode(!0)` will be converted to `html5Mode(0)`
  - All of your other assets. Images, icons, CSS, _everything_. You should be able to point a web server to your `./dist/` directory and the app should run with no additional files present.

## License

unlicense © [TricomB2B](http://www.tricomb2b.com)
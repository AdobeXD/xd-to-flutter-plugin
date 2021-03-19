# Build Process

## Initial set up
* One time: Install nodejs (https://nodejs.org/en/download/) and yarn (npm i yarn -g)
* Open terminal and navigate to the /xd-flutter-plugin-src folder
* run `yarn`
* run `yarn build`, plugin files will be copied into the `/build` folder
* Install the Adobe UXP Developer Tool (UDT) via the Creative Cloud app
* In UDT "Add (Existing) Plugin..." and select `/build/manifest.json`

## Development
* Open terminal and navigate to the `/xd-to-flutter-plugin` folder
* run `yarn build`, it will watch for changes and update the `/build` folder
* In UDT select "Load" under the "Actions (...)" menu for XD to Flutter
* select "Watch" in the actions menu - UDT will watch for changes in `/build`, and update the plugin in XD

## Notes
* If you get errors about missing dependencies when building, you probably need to run `yarn` again
* builds are run in watch mode by default, meaning webpack re-bundles on file save
* add `--no-watch` to disable watch mode
* changes to `manifest.json` will not trigger a build, rerun `yarn build`, then unload/load the plugin in UDT

## Production builds
If you are creating production builds for publishing, there are a few other things to consider:
* in version.js: set `debug` to true
* re-export / test the example thoroughly, double checking console for issues
* in version.js: update the `version`, `xdVersionRequired`, & set `debug` to false
* re-export / test the example again (to ensure no issues related to disabling debug)
* update the version in manifest.json, and ensure the README and CHANGELOG are up to date (incl. version) and committed.
* clear the `build` folder and use `yarn build --production`
* this disables source maps, minifies the code, and generates a `.xdx` file named with the current version in manifest.json
* once the plugin is submitted, tag the commit with it's version number (ex. `v1.0.0`)

### adobe_xd
If you are also publishing a new version of the adobe_xd package:
* update version in adobe_xd/pubspec.yaml and the plugin README (Flutter Dependencies), and ensure the README and CHANGELOG are up to date (incl. version) and committed.
* update Flutter and run Clean Project & Upgrade Packages on adobe_xd and example
* run Format Document on adobe_xd files (set line length to 80 first)
* re-export / test the example thoroughly
* update change log
# XD to Flutter Plugin

## READ THIS FIRST
Thank you for helping to test this plugin! Our goal is to release the best plugin we possibly can, and your feedback is a huge part of that.

Before you get started, please read through the rest of this document, especially "Using This Plugin".


### Issues & Feedback
If you encounter a bug, have a feature request, or would like to ask a question, please use the [GitHub repo](https://github.com/AdobeXD/xd-to-flutter-plugin). Before submitting a new issue, please check the known issues below, and search on GitHub to ensure it hasn't already been reported - the less time we spend filtering duplicate posts, the more time we have to actually improve things.

When you file a bug, please provide as much info as possible to help us to reproduce it. If possible, include a link to a `.xd` file that isolates the problem. There may be relevant information in the Developer Console accessible from the Plugin > Development menu. Also note that whenever you click an action button, the results of that action will be displayed immediately above the buttons.


### Contributing
Contributions are welcomed! Read the [Contributing Guide](./.github/CONTRIBUTING.md) for more information.


### Licensing
This project is licensed under the simplified BSD License. See [LICENSE](LICENSE) for more information.


# Installation & Setup
In the Adobe XD menubar, go to Plugins > Discover Plugins, then search for and install the "Flutter" plugin. It will now show up in your plugins sidebar in the bottom left of XD.

If you haven't already, install VS Code, and the Flutter / Dart extensions for it:

https://flutter.dev/docs/get-started/editor?tab=vscode

If you've never worked with Flutter before, it may be worth creating a starter app to gain some familiarity:

https://flutter.dev/docs/get-started/codelab


## Hot Reload
Hot reload will alow you to see changes you make reflected on a device or simulator immediately each time you export from XD.

To enable it, open the settings for the Dart extension in VS Code, and turn on `Preview Hot Reload On Save Watcher`. This will automatically hot reload your Flutter app whenever an external application (such as Adobe XD) saves changes to a `.dart` file in your project.


## Flutter Dependencies
Certain features have dependencies on custom widgets that are defined in the [adobe_xd](https://pub.dev/packages/adobe_xd) package on pubdev. In your Flutter project, add it as a dependency in your `pubspec.yaml` similar to:

	// in pubspec.yaml
	dependencies:
	  adobe_xd: ^0.1.0


## Example
There is a simple example in the `adobe_xd/example/` folder.


# Using This plugin
This plugin is intended to generate assets for use in an existing Flutter project.
There are two primary ways you can work with it:


## Copy and paste
If you select any item in XD (except an Artboard or Component), you can click the "Copy Selected" button in the plugin panel to copy Dart code to your clipboard. You can then paste it into your project directly.


## Export widgets
Artboards and Components can be exported as Flutter widgets that can be used in your project.

Select an artboard or component and click the "Export Widget" button. If you haven't already done so, you will be prompted to select your Flutter project's directory. The exported widget will be written to a dart file in the directory specified by the Code Path setting (defaults to "lib"). You can now instantiate and use that widget in your Flutter project.

Use the "Export All Widgets" button or menu item (`cmd/ctrl-shift-F`) to export all artboards and components in the file that do not have "Include In Export All Widgets" unchecked.


## Exporting Images
In order to optimize export, images are not exported with widgets. Only images with a name assigned in the plugin panel can be exported (the name also used to match duplicate images). Select an image and click "Export Image", or use the "Export All Images" button to export all images with a name to the Image Path.


# Notes:

## Unsupported Features:
- masks
- stroke joins, dashed strokes, stroke position on Rectangles and Ellipses.
- shadow, image fill on shapes
- layout / responsive (waiting on layout API in XD)
- viewport height (waiting on layout to add support)
- super/subscript, text transformation, paragraph spacing, stroked text
- blur brightness
- prototype triggers other than `tap`
- prototype actions other than `go to artboard` and `go back`

## Known Issues:
 - the panel can "interrupt" some actions, such as drawing paths with the pen tool or editing shapes (XD)
 - images that have been flipped (horizontally or vertically) may be exported incorrectly (XD)
 - images in Repeat Grids may scale improperly (XD)
 - color assets export in a random order (XD)
 - color assets are currently not used in the exported code (XD - see "Color Assets" below)
 - text scrolling does not work unless the text is positioned at 0,0 (Flutter)
 - tap interactions (prototype & tap callback) currently require an `Align` widget to fix some issues with hit areas (Flutter)
 - tap interactions may fail for children that are transformed beyond the calculated bounds of the parent (Flutter)
 - objects that exceed the width of the display region can cause unexpected results (Flutter)
 - objects blurs are implemented using the `BackgroundBlur` widget which can cause unexpected results in some cases (empty/transparent object, the blur gets clipped if the blur radius is too high leaving hard edges)
 - occasional console errors when the plugin first loads
 - radial gradients don't always map 100% accurately in shapes

## Shapes vs Rectangles & Ellipses
Rectangles & Ellipses are exported as Flutter Container primitives, and do not support some stroke options. Other vector shapes are exported as SVG and rendered to a canvas via the `flutter_svg` package, which prevents support for shadows or image fills.

Adjacent shapes are combined together in the Flutter export to avoid creating a new canvas for every shape object.


## Components
The panel will display a notice when selecting components, or children of components that are not the "master" component. This is to work around limitations with accessing and modifying master components. Press Cmd/Ctrl-Shift-K with a component selected to locate the master.


## Multi-select
The panel will display a notice when selecting multiple elements. We would like to support multi-select fully in a future release.


## Text
Text rendering is generally similar, but not identical between Flutter and XD. Expect to see minor differences in positioning and rendering.

Line height is a multiplier in Flutter, and is calculated per line based on the largest text in the line. In XD it is a fixed value for all lines in a field. This may result in significant differences when displaying multiline text having multiple text sizes.


## Fonts
The plugin currently relies on users to manually assign the names of the fonts that will be used in Flutter, and set up those fonts as appropriate.

It will generate warnings on export if any fonts are not defined in the `pubspec.yaml` file for the project.


## Color Assets
Color assets are optionally exported as a class of named static properties which can be used in your application.

Currently these named colors are not used in the exported widgets due to limitations in how Adobe XD implements color assets. Current color assets simply associate a name with a color value, which means that any use of that color in the design file gets associated with the the name, often incorrectly.


## Images
An `Image Export Name` must be provided to export an image.

The plugin currently can not identify identical images or determine when they have been changed. As such, it relies on the user to export images when appropriate, and to enter matching image names for identical images.

For images that were dragged into XD from the file system, the plugin can extract a file name, and use that to match images. The plugin will automatically sync names between these images.


## Resolution Aware Images
If the `Resolution Aware Images` setting is enabled, the plugin will find the largest instance of that image in the file (based on the display size), and use its dimensions (adjusted for aspect ratio) as the x1 image size. If the original image source is large enough, it will export x2 and x3 versions.

If it is disabled, the plugin exports all images at their natural size (the size of the original asset).


## Parameters
Parameters are named values that are exposed on the containing widget as a constructor parameter. This allows you to have multiple instances of the same widget showing different values (text, colors, images, etc). Parameters on an element are assigned to the nearest widget ancestor (Artboard or Component). 

**Example 1:** If a named "color" parameter is added to a Text field inside a "button" Component on an Artboard, then that parameter would be exposed on the exported button widget, but not on the artboard widget.

**Example 2:** If a tap callback was added to the button Component directly, the nearest widget ancestor would be the button itself, and it would be added there.


## Tap Callbacks
Similar to parameters, tap callbacks provide a mechanism to add functionality to a widget without modifying its exported code. A tap callback is effectively a parameter to which a callback method can be assigned, that will be called when a user clicks or taps that element. Tap callbacks follow the same rules as parameters.

For example, adding a tap callback named `onTapMyGroup` to a Group in an Artboard, would allow you to assign a callback handler to `onTapMyGroup` in the Artboard widget's constructor, which would be called when the user taps that group in the running app.


## Repeat Grid
On export, an item "template" is generated that is used to render each of the children of the grid. In order to support more extensive customization of individual grid elements, any components in the template are flattened into it.


## Opacity
For optimization reasons we currently multiply opacity against leaf node colors / fills. This means that the output does not pre-composite elements like groups before applying opacity (opacity is applied to each child of the group individually). The option to enable pre-compositing could be added in a future release.


## Blend Modes
Blend modes are currently exported as a custom BlendMask widget which composites its child to the scene with the specified blend mode and opacity. This is enabled on all widgets whose blend mode is not `pass-through`. Note that using blend modes may negatively impact your application's performance.


## Visibility
The plugin currently ignores any hidden elements (ex. a hidden Component will not be exported in 'Export All Widgets').
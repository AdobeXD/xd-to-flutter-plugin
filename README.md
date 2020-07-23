# XD to Flutter Plugin

## READ THIS FIRST
Thank you for helping to test this plugin! Our goal is to release the best plugin we possibly can, and your feedback is a huge part of that.

Before you get started, please read through the rest of this document, especially "Using This Plugin".


### Issues & Feedback
If you encounter a bug, have a feature request, or would like to ask a question, please use the [GitHub repo](https://github.com/AdobeXD/xd-to-flutter-plugin). Before submitting a new issue, please check the known issues below, and search on GitHub to ensure it hasn't already been reported - the less time we spend filtering duplicate posts, the more time we have to actually improve things.

When you file a bug, please provide as much info as possible to help us to reproduce it. If possible, include a link to a `.xd` file that isolates the problem. There may be relevant information in the Developer Console accessible from the Plugin > Development menu.


### Contributing
Contributions are welcomed! Read the [Contributing Guide](./.github/CONTRIBUTING.md) for more information.


### Licensing
This project is licensed under the simplified BSD License. See [LICENSE](LICENSE) for more information.


# Installation & Setup
In the Adobe XD menubar, go to Plugins > Discover Plugins, then search for and install the "Flutter" plugin. It will now show up in your plugins sidebar in the bottom left of XD. If you don't see the plugin listed, make sure you have the most recent version of Adobe XD installed, and try again.

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
	  adobe_xd: ^1.0.0


## Example
There is a simple example in the `adobe_xd/example/` folder.


# Using This plugin
This plugin is intended to generate assets for use in an existing Flutter project.
There are two primary ways you can work with it:


## Copy and paste
If you select any item in XD (except an Artboard or Component), you can click the "Copy Selected" button or menu item (`cmd/ctrl-alt-C`) in the plugin panel to copy Dart code to your clipboard. You can then paste it into your project directly.


## Export widgets
Artboards and Components can be exported as Flutter widgets that can be used in your project.

Select an artboard or component and click the "Export Widget" button or menu item (`cmd/ctrl-shift-alt-1`). If you haven't already done so, you will be prompted to select your Flutter project's directory. The exported widget will be written to a dart file in the directory specified by the Code Path setting (defaults to "lib"). You can now instantiate and use that widget in your Flutter project.

Use the "Export All Widgets" button or menu item (`cmd/ctrl-shift-F`) to export all artboards and components in the file that do not have "Include In Export All Widgets" unchecked.


## Exporting Images
In order to optimize export, images are not exported with widgets. Only images with a name assigned in the plugin panel can be exported. Select an image and click "Export Image", or use the "Export All Images" button to export all images with a name to the Image Path.


# Notes:

## Unsupported Features:
- component states (not exposed by API as of XD v30)
- layout padding & stacks (not exposed by API as of XD v30)
- stroke joins, dashed strokes, stroke position on Rectangles and Ellipses. (Flutter decoration limitation)
- shadow, image fill on shapes (Flutter SVG limitation)
- super/subscript, text transformation, paragraph spacing, stroked text (Flutter text limitation)
- object blur, blur brightness (Flutter limitation)
- scroll groups
- masks
- prototype triggers other than `tap`
- prototype actions other than `go to artboard` and `go back`
- gradient backgrounds on artboards

## Known Issues:
 - the panel can "interrupt" some actions, such as drawing paths with the pen tool or editing shapes (XD)
 - images that have been flipped (horizontally or vertically) may be exported incorrectly (XD)
 - images in Repeat Grids may scale improperly (XD)
 - color & character style assets are currently not used in the exported code (XD - see "Assets Export" below)
 - issues with text scrolling for statically positioned text fields (Flutter)
 - issues with tap interactions (prototype & tap callback) with statically positioned elements (Flutter)
 - objects that exceed the width of the display region can cause unexpected results (Flutter)
 - radial gradients don't always map 100% accurately in shapes

## Shapes vs Rectangles & Ellipses
Rectangles & Ellipses are exported as Flutter Container primitives, and do not support some stroke options. Other vector shapes are exported as SVG and rendered to a canvas via the `flutter_svg` package, which prevents support for shadows or image fills.


## Combine Shapes
Enabling the `Combine Shapes` option on a Group will aggressively combine any shapes, including rectangles & ellipses, and shapes in sub groups. This is useful for reducing a complex vector drawing into a single SVG string. For best results, disable responsive resize on the group and any subgroups.

When not enabled, vector shapes (other than rectangles & ellipses) in adjacent layers within non-responsive groups will still be combined.


## Components
The panel will display a notice when selecting components, or children of components that are not the "master" component. This is to work around limitations with accessing and modifying master components. Press Cmd/Ctrl-Shift-K with a component selected to locate the master.


## Multi-select
The panel will display a notice when selecting multiple elements. We would like to support multi-select fully in a future release.


## Text
Text rendering is generally similar, but not identical between Flutter and XD. Expect to see minor differences in positioning and rendering.

Line height is a multiplier in Flutter, and is calculated per line based on the largest text in the line. In XD it is a fixed value for all lines in a field. This may result in significant differences when displaying multiline text having multiple text sizes. Also, line height is applied to the first line in Flutter, but not in XD.


## Fonts
The plugin currently relies on users to manually assign the names of the fonts that will be used in Flutter, and set up those fonts as appropriate.

It will generate warnings on export if any fonts are not defined in the `pubspec.yaml` file for the project.


## Assets Export
Color & character style assets (ie. from the XD Assets panel) are optionally exported as a class of static properties which can be used in your application. Only assets that have been given a name are included.

Currently these assets are not used in the exported widgets due to limitations in how Adobe XD implements assets. Current assets simply associate a name with a value, which means that any use of that value in the design file gets associated with the the name, often incorrectly.


## Images
An `Image Export Name` must be provided to export an image. If you provide the same name for different images, they will be assumed to be identical.

To speed up export, the plugin currently relies on the user to export images when appropriate.


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

As of 0.2.0, export for repeat grid does not support partial columns, since this is a rare use case, and causes significant challenges for responsiveness. This may be revisited in the future.

To make items in a grid responsive, group everything in the item, and enable "responsive resize" for the group. This is an experimental feature and may have unexpected results in some cases.


## Opacity
For optimization reasons we currently multiply opacity against leaf node colors / fills. This means that the output does not pre-composite elements like groups before applying opacity (opacity is applied to each child of the group individually). The option to enable pre-compositing could be added in a future release.


## Blend Modes
Blend modes are currently exported as a custom BlendMask widget which composites its child to the scene with the specified blend mode and opacity. This is enabled on all widgets whose blend mode is not `pass-through`. Note that using blend modes may negatively impact your application's performance.


## Visibility
The plugin currently ignores any hidden elements (ex. a hidden Component will not be exported in 'Export All Widgets').
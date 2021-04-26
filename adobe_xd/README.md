# adobe_xd
Generate code for building apps with Flutter based on your designs in Adobe XD with the [XD to Flutter](https://adobe.com/go/xd_to_flutter) plugin. This package contains helper widgets used by the plugin.


## Pin
The `Pinned` widget uses horizontal and vertical `Pin` instances (`hPin` / `vPin`) to specify a highly flexible layout based on responsive resize model in Adobe XD, but can be used fully independently of the tool and the other classes in this package.

The size and position of a child within its parent can be defined entirely by the position of its starting (top or left) and ending (bottom or right) edges. The `Pin` class provides a number of ways to specify these positions along an axis.

You can specify an absolute pixel position for an edge relative to its parent. For example, this would draw the child with a 10 pixel gap on each side.

``` dart
Pin(start: 10.0, end: 10.0)
```

You can specify a relative (fractional) position instead. Assuming the horizontal axis, the following would draw the child with the left edge at 20% of the width of its parent, and its right edge at 90% of the width of its parent (ie. 10% in from the right):

``` dart
Pin(startFraction: 0.2, endFraction: 0.1)
```

You can mix these approaches:

``` dart
Pin(start: 25.0, endFraction: 0.6)
```

Or, specify one edge, and set a fixed size in pixels for the child:

``` dart
Pin(start: 50.0, size: 100.0)
Pin(size: 80.0, endFraction: 0.2)
```

Lastly, you can specify a fixed size along with a middle position. This places the child's center relative to the available space after accounting for the size. For example, the following would center the child with a size of 50 pixels:

``` dart
Pin(middle: 0.5, size: 50.0)
```

This example would place the right edge (assuming horizontal) of the child at the right edge of the available space – it would _not_ place the middle of the child at the right edge of its parent.

``` dart
Pin(middle: 1.0, size: 50.0)
```

As a note: an empty pin defaults to filling the full available area, which is equivalent to:

``` dart
Pin(start: 0.0, end: 0.0)
```


## Pinned
The `Pinned` widget implements the responsive resize model in Adobe XD. With it, you can pin the edges of the child within the available space, pin its center within the space, and/or give it a fixed size.

The `Pinned.fromPins` constructor accepts a horizontal and vertical pin, as well as a child widget:

``` dart
Pinned.fromPins(
	Pin(start: 10.0, endFraction: 0.75), // horizontal
	Pin(middle: 0.5, size: 50.0), // vertical
	child: Text("Hello!"),
)
```

The default `Pinned` constructor accepts semantic parameters that map to the values of the horizontal and vertical pins. For example, `right` becomes `hPin.end` and `height` becomes `vPin.size`. This example is equivalent to the `Pinned.fromPins` example above:

``` dart
Pinned(
	left: 10.0,
	rightFraction: 0.75,
	verticalMiddle: 0.5,
	height: 50.0,
	child: Text("Hello!"),
)
```

The `Pinned.fromSize` constructor calculates the pin positions from a nominal parent size and child boundaries, with parameters that indicate whether that edge should be pinned to an absolute position – it defaults to a fractional position otherwise.

This constructor directly mirrors the UI in Adobe XD, and can be used to assemble a pinned layout by examining a pre-existing design. XD to Flutter used the `Pinned.fromSize` constructor up to v2.0.0, when it switched to `Pinned.fromPins` to allow for more condensed and understandable code.

Once again, this example results in the same layout as those above, but calculates it from a "reference" size and position:

``` dart
Pinned.fromSize(
	size: Size(width: 100.0, height: 100.0), // nominal parent size
	bounds: Rect.fromLTWH(10.0, 25.0, 65.0, 50.0), // nominal child bounds w/in parent
	pinLeft: true, // use absolute pixel position on left
	// no pinRight specified, default to relative position on right
	fixedHeight: true, // use fixed height & middle because no top or bottom are specified
	child: Text("Hello!"),
)
```


## BlendMask
The `BlendMask` widget applies a blend mode to its child.

``` dart
BlendMask(
	blendMode: BlendMode.overlay,
	child: Text("Hello!"),
)
```


## GradientXDTransform
Attempts to match Adobe XD gradient transformations within Flutter. Not very useful outside this context.


## PageLink
Enables prototype interactions & navigation exported from Adobe XD. Not very useful outside this context.


### Contributing
Contributions are welcomed! Read the [Contributing Guide](../.github/CONTRIBUTING.md) for more information.


### Licensing
This project is licensed under the simplified BSD License. See [LICENSE](LICENSE) for more information.

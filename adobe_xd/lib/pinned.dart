import 'dart:math';
import 'package:flutter/material.dart';
import 'package:flutter/rendering.dart';

class Pinned extends SingleChildRenderObjectWidget {
  final Pin hPin;
  final Pin vPin;

  /// Positions and sizes a single child based on settings defined in horizontal and vertical
  /// [Pin] instances. See the [Pin] documentation for details.
  Pinned.fromPins(this.hPin, this.vPin, {Widget child, Key key}) : super(key: key, child: child);

  /// Constructs a Pinned instance by building horizontal & vertical [Pin] instances
  /// from semantic parameters. For example, providing `left` & `width` parameters would
  /// result in a `hPin` having `start` and `size` values.
  /// 
  /// Pinned attempts to fill as much space as is available, and position its child within
  /// that space.
  Pinned({
    Key key,
    double left,
    double leftFraction,
    double right,
    double rightFraction,
    double width,
    double horizontalMiddle,
    double top,
    double topFraction,
    double bottom,
    double bottomFraction,
    double height,
    double verticalMiddle,
    Widget child,
  }) : this.fromPins(
            Pin(
              start: left,
              startFraction: leftFraction,
              end: right,
              endFraction: rightFraction,
              size: width,
              middle: horizontalMiddle,
            ),
            Pin(
              start: top,
              startFraction: topFraction,
              end: bottom,
              endFraction: bottomFraction,
              size: height,
              middle: verticalMiddle,
            ),
            child: child,
            key: key);

  /// Constructs a Pinned instance based on parameters that reflect the pinning mode exposed by Adobe XD:
  ///
  /// * `bounds` - the original boundaries of the child within its parent
  /// * `size` - the original dimensions of the parent
  /// * pin parameters that indicate the child should be pinned to an absolute position for that side
  /// * parameters indicating if it should use a fixed width or height
  ///
  /// The first two values are used for calculating the initial position of the child within its parent.
  /// That initial position is then used in conjunction with the other parameters to construct the `hPin`
  /// and `vPin` objects used by Pinned.
  Pinned.fromSize({
    Key key,
    @required Rect bounds,
    @required Size size,
    bool pinLeft = false,
    bool pinRight = false,
    bool pinTop = false,
    bool pinBottom = false,
    bool fixedWidth = false,
    bool fixedHeight = false,
    Widget child,
  }) : this.fromPins(
            Pin(
              size: fixedWidth ? bounds.width : null,
              start: pinLeft ? bounds.left : null,
              end: pinRight ? size.width - bounds.right : null,
              startFraction: !pinLeft && !fixedWidth ? bounds.left / size.width : null,
              endFraction: !pinRight && !fixedWidth ? (size.width - bounds.right) / size.width : null,
              middle: fixedWidth && !pinLeft && !pinRight ? bounds.left / (size.width - bounds.width) : null,
            ),
            Pin(
              size: fixedHeight ? bounds.height : null,
              start: pinTop ? bounds.top : null,
              end: pinBottom ? size.height - bounds.bottom : null,
              startFraction: !pinTop && !fixedHeight ? bounds.top / size.height : null,
              endFraction: !pinBottom && !fixedHeight ? (size.height - bounds.bottom) / size.height : null,
              middle: fixedHeight && !pinTop && !pinBottom ? bounds.top / (size.height - bounds.height) : null,
            ),
            child: child,
            key: key);

  @override
  RenderShiftedBox createRenderObject(BuildContext context) {
    /*
    return RenderPositionedBox(
      alignment: Alignment.center,
      widthFactor: 1.0,
      heightFactor: 1.0,
      textDirection: Directionality.of(context),
    );
    */
    return RenderPinned(
      hPin: hPin,
      vPin: vPin,
    );
  }

  @override
  void updateRenderObject(BuildContext context, RenderPinned renderObject) {
    renderObject
      ..hPin = hPin
      ..vPin = vPin;
  }

  @override
  String toString({DiagnosticLevel minLevel = DiagnosticLevel.info}) {
    return "Pinned(\n  hPin: $hPin,\n  vPin: $vPin\n)";
  }
}

/// Defines a pinned layout along a single axis (horizontal or vertical). Used with (and by) the [Pinned]
/// layout widget. In most cases, it's easiest to think of a Pin as defining the position of the starting
/// and ending edges of the child. So, for a horizontal Pin, `start` maps to `left`, and `end` maps to `right`.
///
/// Each edge can be defined relative to the enclosing parent's dimensions, or relative to the opposite edge.
/// Both absolute (eg. "pixel") values, and fractional (eg. "percentage") values can be used.
///
/// The `start` and `end` parameters specify a pixel inset from the parent dimensions.
/// Ex. A horizontal pin defined as `Pin(start: 20.0, end: 30.0)`, laying out a child in a parent that is 200
/// wide would position the child with its left edge at 20, and its right edge at 170 (ie. 200 - 30).
///
/// The `startFraction` and `endFraction` parameters specify a fractional inset from the parent dimensions.
/// Ex. A horizontal pin defined as `Pin(startFraction: 0.15, endFraction: 0.2)`, laying out a child in a parent
/// that is 200 wide would position the child with its left edge at 30 (ie. 0.15 * 200), and its right edge at 160
/// (ie. 200 - 0.2 * 200).
///
/// The `size` parameter can be paired with either a single edge parameter (see above), or `middle` (see below) to
/// set a pixel size for the child.
/// Ex. a horizontal pin defined as `Pin(startFraction: 0.3, size: 70.0)` in a 200 wide parent, would position
/// the child with its left edge at 60 (ie. 0.3 * 200), and right edge at 130 (ie. 60 + 70).
///
/// Finally, the `middle` parameter is paired with the `size` parameter to position the child based on a fraction
/// of the remaining size in the parent.
/// Ex. Given a horizontal pin defined as `Pin(size: 80.0, middle: 0.5)` in a parent 200 wide, the remaining size
/// would be 120 (ie. 200 - 80). The left edge would be positioned at 60 (ie. 120 * 0.5), and the right edge at
/// 240 (ie. 60 + 80), centering it in the available space.
@immutable
class Pin {
  final double start;
  final double startFraction;
  final double end;
  final double endFraction;
  final double size;
  final double middle;

  Pin({this.start, this.startFraction, this.end, this.endFraction, this.size, this.middle})
      : assert(!(start != null && startFraction != null), "Cannot have both start and startFraction values."),
        assert(!(end != null && endFraction != null), "Cannot have both end and endFraction values."),
        assert(!(middle != null && size == null), "A size value is required with a middle value."),
        assert(!(middle != null && (start ?? startFraction ?? end ?? endFraction) != null),
            "Only a size value can be used with a middle value."),
        assert(!(size != null && (start ?? startFraction) != null && (end ?? endFraction) != null),
            "Cannot have both start and end values when a size value is used.");

  /// Compares two Pins for equality.
  @override
  bool operator ==(dynamic other) {
    return other is Pin
        && other.start == start
        && other.startFraction == startFraction
        && other.end == end
        && other.endFraction == endFraction
        && other.size == size
        && other.middle == middle;
  }

  @override
  int get hashCode => hashValues(start, startFraction, end, endFraction, size, middle);

  String toString() {
    return "Pin(start: $start, startFraction: $startFraction, end: $end, endFraction: $endFraction, size: $size, middle: $middle, )";
  }
}

// Positions its child based on the given Pins.
class RenderPinned extends RenderShiftedBox {
  Pin _hPin;
  Pin _vPin;

  RenderPinned({Pin hPin, Pin vPin, RenderBox child})
      : assert(hPin != null),
        assert(vPin != null),
        _hPin = hPin,
        _vPin = vPin,
        super(child);

  _Span _calculateSpanFromPin(Pin pin, double maxSize) {
    double start = 0.0, end = 0.0;
    if (pin.size == null) {
      // Size is unknown, so we must be pinned on both sides
      start = pin.start ?? pin.startFraction * maxSize;
      end = maxSize - (pin.end ?? pin.endFraction * maxSize);
    } else if (pin.size >= maxSize) {
      // Exceeds max size, fill.
      // Note: this isn't exactly what XD does, but it's the closest we can get without overflow.
      start = 0;
      end = maxSize;
    } else if (pin.start != null || pin.startFraction != null) {
      // Pinned to start
      start = min(maxSize - pin.size, pin.start ?? pin.startFraction * maxSize);
      end = start + pin.size;
    } else if (pin.end != null || pin.endFraction != null) {
      // Pinned to end
      end = max(pin.size, maxSize - (pin.end ?? pin.endFraction * maxSize));
      start = end - pin.size;
    } else {
      // Not pinned at all, use middle to position
      start = pin.middle * (maxSize - pin.size);
      end = start + pin.size;
    }
    return _Span(start, end);
  }

  Pin get hPin => _hPin;
  set hPin(Pin pin) {
    assert(pin != null);
    if (pin == _hPin) { return; }
    _hPin = pin;
    markNeedsLayout();
  }

  Pin get vPin => _vPin;
  set vPin(Pin pin) {
    assert(pin != null);
    if (pin == _vPin) { return; }
    _vPin = pin;
    markNeedsLayout();
  }

  @override
  void performLayout() {
    if (child == null) {
      size = constraints.constrain(Size(0, 0));
      return;
    }
    double maxW = constraints.maxWidth;
    double maxH = constraints.maxHeight;
    _Span _hSpan = _calculateSpanFromPin(_hPin, maxW);
    _Span _vSpan = _calculateSpanFromPin(_vPin, maxH);

    final BoxConstraints innerConstraints = BoxConstraints.expand(width: _hSpan.size, height: _vSpan.size);
    child.layout(innerConstraints, parentUsesSize: true);
    final BoxParentData childParentData = child.parentData as BoxParentData;
    childParentData.offset = Offset(_hSpan.start, _vSpan.start);
    
    size = Size(maxW, maxH);
  }
}

@immutable
class _Span {
  final double start;
  final double end;

  _Span(this.start, this.end);

  double get size => max(0, end - start);

  String toString() {
    return "_Span(start: $start, end: $end, )";
  }
}

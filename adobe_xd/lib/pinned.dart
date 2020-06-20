import 'dart:math';
import 'package:flutter/material.dart';
import 'pinned_stack.dart';

@immutable
class Pin {
  final double start;
  final double startFraction;
  final double end;
  final double endFraction;
  final double size;
  final double centerFraction;

  Pin({this.start, this.startFraction, this.end, this.endFraction, this.size, this.centerFraction});

  String toString() {
    return "Pin(start: $start, startFraction: $startFraction, end: $end, endFraction: $endFraction, size: $size, centerFraction: $centerFraction, )";
  }
}

class Pinned extends StatelessWidget {
  final Pin hPin;
  final Pin vPin;
  final Widget child;

  Pinned({Key key, this.hPin, this.vPin, this.child}) : super(key: key);

  Pinned.fromSize({
    Key key,
    @required Rectangle bounds, @required Size size,
    bool pinLeft=false, bool pinRight=false,
    bool pinTop=false, bool pinBottom=false,
    bool fixedWidth=false, bool fixedHeight=false,
    this.child,
  }) : hPin = Pin(
         size: fixedWidth ? bounds.width : null,
         start: pinLeft ? bounds.left : null,
         end: pinRight ? size.width - bounds.right : null,
         startFraction: !pinLeft && !fixedWidth ? bounds.left / size.width : null,
         endFraction: !pinRight && !fixedWidth ? (size.width - bounds.right) / size.width : null,
         centerFraction: fixedWidth && !pinLeft && !pinRight ? bounds.left / (size.width - bounds.width) : null,
       ),
       vPin = Pin(
         size: fixedHeight ? bounds.height : null,
         start: pinTop ? bounds.top : null,
         end: pinBottom ? size.height - bounds.bottom : null,
         startFraction: !pinTop && !fixedHeight ? bounds.top / size.height : null,
         endFraction: !pinBottom && !fixedHeight ? (size.height - bounds.bottom) / size.height : null,
         centerFraction: fixedHeight && !pinTop && !pinBottom ? bounds.top / (size.height - bounds.height) : null,
       ),
       super(key: key);

  _Span calculateSpanFromPin(Pin pin, double maxSize) {
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
      // Not pinned at all, use center to position
      start = pin.centerFraction * (maxSize - pin.size);
      end = start + pin.size;
    }
    return _Span(start, end);
  }

  @override
  Widget build(BuildContext context) {
    // Check to see if we have been provided some StackConstraints by [ PinnedStack ]
    StackConstraints constraints = context.dependOnInheritedWidgetOfExactType<StackConstraints>();
    if (constraints != null) {
      return _buildContent(constraints.constraints);
    }
    // If not, we need to find our own constraints
    else {
      return LayoutBuilder(
        builder: (context, constraints) => _buildContent(constraints),
      );
    }
  }

  Widget _buildContent(BoxConstraints constraints) {
    _Span hSpan = calculateSpanFromPin(hPin, constraints.maxWidth);
    _Span vSpan = calculateSpanFromPin(vPin, constraints.maxHeight);
    // Hide child if either dimension is 0
    bool visible = (hSpan.size > 0 && vSpan.size > 0);
    return Padding(
      padding: EdgeInsets.fromLTRB(max(0.0, hSpan.start), max(0.0, vSpan.start), 0.0, 0.0),
      child: SizedBox(width: hSpan.size, height: vSpan.size, child: visible ? child : null),
    );
  }

  @override
  String toString({DiagnosticLevel minLevel = DiagnosticLevel.info}) {
    return "Pinned(\n  hPin: $hPin,\n  vPin: $vPin\n)";
  }
}

@immutable
class _Span {
  final double start;
  final double end;
  
  _Span(this.start, this.end);

  double get size => max(0, end - start);
}

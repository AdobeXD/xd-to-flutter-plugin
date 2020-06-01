import 'dart:math';
import 'package:flutter/material.dart';
import 'pinned_stack.dart';

class Pin {
  final double start;
  final double startFraction;
  final double end;
  final double endFraction;
  final double size;
  final double centerFraction;

  Pin({this.start, this.startFraction, this.end, this.endFraction, this.size, this.centerFraction});
}

class Pinned extends StatelessWidget {
  final Pin hPin;
  final Pin vPin;
  final Widget child;

  Pinned({Key key, this.hPin, this.vPin, this.child}) : super(key: key);

  _Span calculateSpanFromPin(Pin pin, double maxSize) {
    var s = _Span();
    //Size is unknown, so we must be pinned on both sides
    if (pin.size == null) {
      s.start = pin.start ?? pin.startFraction * maxSize;
      s.end = maxSize - (pin.end ?? pin.endFraction * maxSize);
    }
    //We know the size, figure out which side we're pinned on, if any
    else {
      //Pinned to start
      if (pin.start != null || pin.startFraction != null) {
        s.start = pin.start ?? pin.startFraction * maxSize;
        s.end = s.start + pin.size;
      }
      //Pinned to end
      else if (pin.end != null || pin.endFraction != null) {
        s.end = maxSize - (pin.end ?? pin.endFraction * maxSize);
        s.start = s.end - pin.size;
      }
      //Not pinned at all, use center - size/2 to position
      else {
        s.start = (pin.centerFraction * maxSize) - pin.size * .5;
        s.end = s.start + pin.size;
      }
    }
    return s;
  }

  @override
  Widget build(BuildContext context) {
    //Check to see if we have been provided some StackConstraints by [ PinnedStack ]
    StackConstraints constraints = context.dependOnInheritedWidgetOfExactType<StackConstraints>();
    if (constraints != null) {
      return _buildContent(constraints.constraints);
    }
    //If not, we need to find our own constraints
    else {
      return LayoutBuilder(
        builder: (context, constraints) => _buildContent(constraints),
      );
    }
  }

  Widget _buildContent(BoxConstraints constraints) {
    var hzSpan = calculateSpanFromPin(hPin, constraints.maxWidth);
    var vtSpan = calculateSpanFromPin(vPin, constraints.maxHeight);
    //Hide child if either dimension is 0
    bool showChild = (hzSpan.size > 0 && vtSpan.size > 0);
    return Transform.translate(
      offset: Offset(hzSpan.start, vtSpan.start),
      child: Align(
        alignment: Alignment.topLeft,
        child: SizedBox(width: hzSpan.size, height: vtSpan.size, child: showChild ? child : null),
      ),
    );
  }
}

class _Span {
  double start;
  double end;

  double get size => max(0, end - start);
}

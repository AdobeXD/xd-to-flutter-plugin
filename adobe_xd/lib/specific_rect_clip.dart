import 'package:flutter/material.dart';

/// Clips child to a rectangle.

class _SpecificRectClipper extends CustomClipper<Rect> {

  Rect rect;

  _SpecificRectClipper(this.rect);

  @override
  Rect getClip(Size size) {
    return rect;
  }

  @override
  bool shouldReclip(_SpecificRectClipper oldClipper) {
    return rect != oldClipper.rect;
  }

}

class SpecificRectClip extends StatelessWidget {

  final Rect rect;
  final Widget child;

  SpecificRectClip({ Key key, this.rect, this.child }) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return ClipRect(
        clipper: _SpecificRectClipper(rect),
        child: child,
    );
  }
}



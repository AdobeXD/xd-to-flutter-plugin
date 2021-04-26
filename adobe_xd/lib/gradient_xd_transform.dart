/*
Copyright 2020 Adobe
All Rights Reserved.

NOTICE: Adobe permits you to use, modify, and distribute this file in
accordance with the terms of the Adobe license agreement accompanying
it. If you have received this file from a source other than Adobe,
then your use, modification, or distribution of it requires the prior
written permission of Adobe. 
*/

import 'package:flutter/material.dart';

/// Attempts to match Adobe XD gradient transformations within Flutter.
@immutable
class GradientXDTransform extends GradientTransform {
  const GradientXDTransform(
      this.a, this.b, this.c, this.d, this.e, this.f, this.center);

  final double a;
  final double b;
  final double c;
  final double d;
  final double e;
  final double f;
  final Alignment center;

  @override
  Matrix4? transform(Rect bounds, {TextDirection? textDirection}) {
    double w = bounds.width, h = bounds.height, m = w / h, mx = 1.0, my = 1.0;

    // Adjust for the aspect ratio of the widget:
    if (m > 1) {
      mx *= m;
    } else {
      my /= m;
    }

    // Convert from [-1 - +1] to [0 - 1], & find the pixel location of the gradient center:
    double cx = (center.x + 1.0) / 2.0, cy = (center.y + 1.0) / 2.0;
    Offset pt = Offset(
        bounds.left + bounds.width * cx, bounds.top + bounds.height * cy);

    Matrix4 transform = Matrix4(
      a * mx, b * my, 0.0, 0.0, //
      c * mx, d * my, 0.0, 0.0, //
      0.0, 0.0, 1.0, 0.0, //
      0.0, 0.0, 0.0, 1.0,
    );

    // This offsets the draw position to account for the widget's position being
    // multiplied against the transformation:
    List<double> loc = transform.applyToVector3Array([pt.dx, pt.dy, 0.0]);
    double dx = pt.dx - loc[0], dy = pt.dy - loc[1];

    return Matrix4.identity()
      ..translate(dx, dy, 0.0)
      ..multiply(transform);
  }
}

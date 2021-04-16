/*
Copyright 2020 Adobe
All Rights Reserved.

NOTICE: Adobe permits you to use, modify, and distribute this file in
accordance with the terms of the Adobe license agreement accompanying
it. If you have received this file from a source other than Adobe,
then your use, modification, or distribution of it requires the prior
written permission of Adobe. 
*/

import 'dart:ui' as ui;
import 'package:flutter/rendering.dart';
import 'package:flutter/widgets.dart';

/// Applies a BlendMode to its child.
class BlendMask extends SingleChildRenderObjectWidget {
  final BlendMode blendMode;
  final double opacity;
  final ui.Rect? region;

  BlendMask(
      {required this.blendMode,
      this.opacity = 1.0,
      this.region,
      Key? key,
      required Widget child})
      : super(key: key, child: child);

  @override
  RenderObject createRenderObject(context) {
    return RenderBlendMask(blendMode, opacity, region);
  }

  @override
  void updateRenderObject(BuildContext context, RenderBlendMask renderObject) {
    renderObject._blendMode = blendMode;
    renderObject._opacity = opacity;
    renderObject._region = region;
  }
}

class RenderBlendMask extends RenderProxyBox {
  BlendMode _blendMode;
  double _opacity;
  ui.Rect? _region;

  RenderBlendMask(BlendMode blendMode, double opacity, [ui.Rect? region])
      : _blendMode = blendMode,
        _opacity = opacity,
        _region = region;

  @override
  void paint(context, offset) {
    // Create a new layer and specify the blend mode and opacity to composite it with:
    context.canvas.saveLayer(
        (_region != null ? _region : offset & size),
        Paint()
          ..blendMode = _blendMode
          ..color = Color.fromARGB((_opacity * 255).round(), 255, 255, 255));

    super.paint(context, offset);

    // Composite the layer back into the canvas using the blendmode:
    context.canvas.restore();
  }
}

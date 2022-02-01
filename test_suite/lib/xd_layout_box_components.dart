import 'package:flutter/material.dart';
import './xd_small_corner.dart';
import 'package:adobe_xd/pinned.dart';
import './xd_edge.dart';
import './xd_center_point.dart';

class XDLayoutBoxComponents extends StatelessWidget {
  XDLayoutBoxComponents({
    Key? key,
  }) : super(key: key);
  @override
  Widget build(BuildContext context) {
    return Stack(
      children: <Widget>[
        Align(
          alignment: Alignment.bottomRight,
          child: SizedBox(
            width: 8.0,
            height: 8.0,
            child:
                // Adobe XD layer: 'br' (component)
                XDSmallCorner(),
          ),
        ),
        Align(
          alignment: Alignment.bottomLeft,
          child: SizedBox(
            width: 8.0,
            height: 8.0,
            child: Transform.rotate(
              angle: 1.5708,
              child:
                  // Adobe XD layer: 'bl' (component)
                  XDSmallCorner(),
            ),
          ),
        ),
        Align(
          alignment: Alignment.topLeft,
          child: SizedBox(
            width: 8.0,
            height: 8.0,
            child: Transform.rotate(
              angle: 3.1416,
              child:
                  // Adobe XD layer: 'tl' (component)
                  XDSmallCorner(),
            ),
          ),
        ),
        Align(
          alignment: Alignment.topRight,
          child: SizedBox(
            width: 8.0,
            height: 8.0,
            child: Transform.rotate(
              angle: 4.7124,
              child:
                  // Adobe XD layer: 'tr' (component)
                  XDSmallCorner(),
            ),
          ),
        ),
        Pinned.fromPins(
          Pin(size: 4.0, end: 0.0),
          Pin(start: 16.0, end: 16.0),
          child:
              // Adobe XD layer: 'right' (component)
              XDEdge(),
        ),
        Center(
          child: SizedBox(
            width: 4.0,
            height: 4.0,
            child:
                // Adobe XD layer: 'center' (component)
                XDCenterPoint(),
          ),
        ),
        Pinned.fromPins(
          Pin(start: 18.0, end: 18.0),
          Pin(size: 8.0, end: -2.0),
          child: Transform.rotate(
            angle: 1.5708,
            child:
                // Adobe XD layer: 'right' (component)
                XDEdge(),
          ),
        ),
        Pinned.fromPins(
          Pin(size: 4.0, start: 0.0),
          Pin(start: 16.0, end: 16.0),
          child: Transform.rotate(
            angle: 3.1416,
            child:
                // Adobe XD layer: 'right' (component)
                XDEdge(),
          ),
        ),
        Pinned.fromPins(
          Pin(start: 18.0, end: 18.0),
          Pin(size: 8.0, start: -2.0),
          child: Transform.rotate(
            angle: 4.7124,
            child:
                // Adobe XD layer: 'right' (component)
                XDEdge(),
          ),
        ),
      ],
    );
  }
}

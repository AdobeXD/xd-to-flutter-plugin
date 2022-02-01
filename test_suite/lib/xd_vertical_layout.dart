import 'package:flutter/material.dart';
import 'package:adobe_xd/pinned.dart';

class XDVerticalLayout extends StatelessWidget {
  XDVerticalLayout({
    Key? key,
  }) : super(key: key);
  @override
  Widget build(BuildContext context) {
    return Stack(
      children: <Widget>[
        Pinned.fromPins(
          Pin(startFraction: 0.8431, endFraction: 0.0784),
          Pin(size: 64.0, end: 8.0),
          child:
              // Adobe XD layer: 'fixHeightPinBottom' (shape)
              Container(
            color: const Color(0xff62008d),
          ),
        ),
        Pinned.fromPins(
          Pin(startFraction: 0.7451, endFraction: 0.1765),
          Pin(size: 64.0, start: 8.0),
          child:
              // Adobe XD layer: 'fixHeightPinTop' (shape)
              Container(
            color: const Color(0xff62008d),
          ),
        ),
        Pinned.fromPins(
          Pin(startFraction: 0.6471, endFraction: 0.2745),
          Pin(size: 64.0, middle: 0.5),
          child:
              // Adobe XD layer: 'fixHeight' (shape)
              Container(
            color: const Color(0xff62008d),
          ),
        ),
        Pinned.fromPins(
          Pin(startFraction: 0.5098, endFraction: 0.4118),
          Pin(start: 40.0, end: 40.0),
          child:
              // Adobe XD layer: 'pinBoth' (shape)
              Container(
            color: const Color(0xff008d00),
          ),
        ),
        Pinned.fromPins(
          Pin(startFraction: 0.4118, endFraction: 0.5098),
          Pin(end: 8.0, startFraction: 0.5),
          child:
              // Adobe XD layer: 'pinBottom' (shape)
              Container(
            color: const Color(0xff008d00),
          ),
        ),
        Pinned.fromPins(
          Pin(startFraction: 0.3137, endFraction: 0.6078),
          Pin(start: 8.0, endFraction: 0.5),
          child:
              // Adobe XD layer: 'pinTop' (shape)
              Container(
            color: const Color(0xff008d00),
          ),
        ),
        Pinned.fromPins(
          Pin(startFraction: 0.2157, endFraction: 0.7059),
          Pin(startFraction: 0.2778, endFraction: 0.2778),
          child:
              // Adobe XD layer: 'none' (shape)
              Container(
            color: const Color(0xff008d00),
          ),
        ),
        Pinned.fromPins(
          Pin(startFraction: 0.0784, endFraction: 0.8431),
          Pin(start: 8.0, end: 8.0),
          child:
              // Adobe XD layer: 'fullHeight' (shape)
              Container(
            color: const Color(0xff62008d),
          ),
        ),
        // Adobe XD layer: 'outline' (shape)
        Container(
          decoration: BoxDecoration(
            border: Border.all(width: 1.0, color: const Color(0xff00e2ff)),
          ),
        ),
      ],
    );
  }
}

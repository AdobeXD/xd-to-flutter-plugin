import 'package:flutter/material.dart';
import 'package:adobe_xd/pinned.dart';

class XDSmallCorner extends StatelessWidget {
  XDSmallCorner({
    Key? key,
  }) : super(key: key);
  @override
  Widget build(BuildContext context) {
    return Stack(
      children: <Widget>[
        Pinned.fromPins(
          Pin(startFraction: 0.0, endFraction: 0.0),
          Pin(startFraction: 0.5, endFraction: 0.0),
          child: Container(
            color: const Color(0xff0097c4),
          ),
        ),
        Pinned.fromPins(
          Pin(startFraction: 0.5, endFraction: 0.0),
          Pin(startFraction: 0.0, endFraction: 0.0),
          child: Container(
            color: const Color(0xff00c4ff),
          ),
        ),
      ],
    );
  }
}

import 'package:flutter/material.dart';
import 'package:adobe_xd/pinned.dart';

class XDEdge extends StatelessWidget {
  XDEdge({
    Key? key,
  }) : super(key: key);
  @override
  Widget build(BuildContext context) {
    return Stack(
      children: <Widget>[
        Pinned.fromPins(
          Pin(startFraction: 0.0, endFraction: 0.0),
          Pin(startFraction: 0.0, endFraction: 0.0),
          child: Container(
            decoration: BoxDecoration(
              gradient: LinearGradient(
                begin: Alignment(0.0, -1.0),
                end: Alignment(0.0, 1.0),
                colors: [const Color(0xffec55ff), const Color(0xff640071)],
                stops: [0.0, 1.0],
              ),
            ),
          ),
        ),
      ],
    );
  }
}

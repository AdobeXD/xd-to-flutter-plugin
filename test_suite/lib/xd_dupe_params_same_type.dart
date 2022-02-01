import 'package:flutter/material.dart';
import 'package:adobe_xd/pinned.dart';

class XDDupeParamsSameType extends StatelessWidget {
  final String label;
  final Color labelColor;
  XDDupeParamsSameType({
    Key? key,
    this.label = 'Two',
    this.labelColor = const Color(0xff000000),
  }) : super(key: key);
  @override
  Widget build(BuildContext context) {
    return Stack(
      children: <Widget>[
        Container(
          decoration: BoxDecoration(
            color: const Color(0xffffffff),
            border: Border.all(width: 1.0, color: const Color(0xff707070)),
          ),
        ),
        Pinned.fromPins(
          Pin(end: 50.0, startFraction: 0.0851),
          Pin(size: 18.0, middle: 0.5714),
          child: Text(
            label,
            style: TextStyle(
              fontFamily: 'Arial',
              fontSize: 14,
              color: labelColor,
              fontWeight: FontWeight.w700,
            ),
          ),
        ),
        Pinned.fromPins(
          Pin(end: 6.0, startFraction: 0.5532),
          Pin(size: 18.0, middle: 0.5714),
          child: Text(
            label,
            style: TextStyle(
              fontFamily: 'Arial',
              fontSize: 14,
              color: labelColor,
              fontWeight: FontWeight.w700,
            ),
          ),
        ),
      ],
    );
  }
}

import 'package:flutter/material.dart';
import 'package:adobe_xd/pinned.dart';

class XDBtn extends StatelessWidget {
  final String label;
  final Color labelColor;
  XDBtn({
    Key? key,
    this.label = 'label',
    this.labelColor = const Color(0xff000000),
  }) : super(key: key);
  @override
  Widget build(BuildContext context) {
    return Stack(
      children: <Widget>[
        // Adobe XD layer: 'bg' (shape)
        Container(
          decoration: BoxDecoration(
            color: const Color(0xffffffff),
            borderRadius: BorderRadius.circular(3.0),
            border: Border.all(width: 1.0, color: const Color(0xfff0f0f0)),
            boxShadow: [
              BoxShadow(
                color: const Color(0x0f000000),
                offset: Offset(0, 1),
                blurRadius: 3,
              ),
            ],
          ),
        ),
        Pinned.fromPins(
          Pin(start: 16.0, end: 16.0),
          Pin(size: 18.0, middle: 0.5),
          child:
              // Adobe XD layer: 'label' (text)
              Text(
            label,
            style: TextStyle(
              fontFamily: 'Arial',
              fontSize: 14,
              color: labelColor,
            ),
            textAlign: TextAlign.center,
          ),
        ),
      ],
    );
  }
}

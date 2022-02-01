import 'package:flutter/material.dart';
import 'package:adobe_xd/pinned.dart';

class XDComponent171 extends StatelessWidget {
  final ImageProvider icon;
  final String label;
  final Color labelColor;
  XDComponent171({
    Key? key,
    this.icon = const AssetImage('assets/images/one.png'),
    this.label = 'One',
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
          Pin(start: 4.0, endFraction: 0.6111),
          Pin(start: 4.0, end: 4.0),
          child:
              // Adobe XD layer: 'one' (shape)
              Container(
            decoration: BoxDecoration(
              image: DecorationImage(
                image: icon,
                fit: BoxFit.cover,
              ),
              border: Border.all(width: 1.0, color: const Color(0xff707070)),
            ),
          ),
        ),
        Pinned.fromPins(
          Pin(end: 4.0, startFraction: 0.4444),
          Pin(size: 18.0, middle: 0.5),
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

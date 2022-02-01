import 'package:flutter/material.dart';
import 'package:adobe_xd/pinned.dart';

class XDComponent181 extends StatelessWidget {
  XDComponent181({
    Key? key,
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
                image: const AssetImage('assets/images/one.png'),
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
            'One',
            style: TextStyle(
              fontFamily: 'Arial',
              fontSize: 14,
              color: const Color(0xff000000),
              fontWeight: FontWeight.w700,
            ),
          ),
        ),
      ],
    );
  }
}

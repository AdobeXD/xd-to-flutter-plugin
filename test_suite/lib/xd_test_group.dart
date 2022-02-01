import 'package:flutter/material.dart';
import 'package:adobe_xd/pinned.dart';

class XDTestGroup extends StatelessWidget {
  final String title;
  XDTestGroup({
    Key? key,
    this.title = 'title',
  }) : super(key: key);
  @override
  Widget build(BuildContext context) {
    return Stack(
      children: <Widget>[
        // Adobe XD layer: 'bg' (shape)
        Container(
          decoration: BoxDecoration(
            color: const Color(0xfff9f9f9),
            boxShadow: [
              BoxShadow(
                color: const Color(0x1a000000),
                offset: Offset(0, 3),
                blurRadius: 6,
              ),
            ],
          ),
        ),
        Pinned.fromPins(
          Pin(start: 0.0, end: 0.0),
          Pin(size: 32.0, start: 0.0),
          child:
              // Adobe XD layer: 'headerbg' (shape)
              Container(
            color: const Color(0xffe9e9e9),
          ),
        ),
        Pinned.fromPins(
          Pin(start: 12.0, end: 20.0),
          Pin(size: 17.0, start: 7.0),
          child: Text(
            title,
            style: TextStyle(
              fontFamily: 'Arial',
              fontSize: 14,
              color: const Color(0xff666666),
              fontWeight: FontWeight.w700,
            ),
          ),
        ),
      ],
    );
  }
}

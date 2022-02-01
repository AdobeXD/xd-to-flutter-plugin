import 'package:flutter/material.dart';
import 'package:adobe_xd/pinned.dart';
import './xd_component5.dart';

class XDPageSize extends StatelessWidget {
  XDPageSize({
    Key? key,
  }) : super(key: key);
  @override
  Widget build(BuildContext context) {
    return Stack(
      children: <Widget>[
        SizedBox(
          width: 960.0,
          height: 720.0,
          child:
              // Adobe XD layer: 'Elements' (group)
              Stack(
            children: <Widget>[
              Transform.rotate(
                angle: 3.1416,
                child: Container(
                  width: 960.0,
                  height: 720.0,
                  decoration: BoxDecoration(
                    color: const Color(0x66ffffff),
                    border:
                        Border.all(width: 2.0, color: const Color(0x6600c4ff)),
                  ),
                ),
              ),
              Pinned.fromPins(
                Pin(size: 32.0, start: 928.0),
                Pin(size: 32.0, start: 688.0),
                child:
                    // Adobe XD layer: 'LargeCorner' (component)
                    XDComponent5(),
              ),
              Pinned.fromPins(
                Pin(size: 32.0, start: 928.0),
                Pin(size: 32.0, start: 0.0),
                child: Transform.rotate(
                  angle: 4.7124,
                  child:
                      // Adobe XD layer: 'LargeCorner' (component)
                      XDComponent5(),
                ),
              ),
              Pinned.fromPins(
                Pin(size: 32.0, start: 0.0),
                Pin(size: 32.0, start: 688.0),
                child: Transform.rotate(
                  angle: 1.5708,
                  child:
                      // Adobe XD layer: 'LargeCorner' (component)
                      XDComponent5(),
                ),
              ),
              Align(
                alignment: Alignment.topLeft,
                child: SizedBox(
                  width: 32.0,
                  height: 32.0,
                  child: Transform.rotate(
                    angle: 3.1416,
                    child:
                        // Adobe XD layer: 'LargeCorner' (component)
                        XDComponent5(),
                  ),
                ),
              ),
            ],
          ),
        ),
      ],
    );
  }
}

import 'package:flutter/material.dart';
import './xd_component171.dart';
import 'package:adobe_xd/pinned.dart';
import './xd_component163.dart';

class XDNestedComponent extends StatelessWidget {
  XDNestedComponent({
    Key? key,
  }) : super(key: key);
  @override
  Widget build(BuildContext context) {
    return Stack(
      children: <Widget>[
        Padding(
          padding: EdgeInsets.fromLTRB(0.0, 0.0, 32.0, 0.0),
          child: XDComponent171(
            icon: const AssetImage('assets/images/one.png'),
            label: 'One',
            labelColor: const Color(0xff000000),
          ),
        ),
        Pinned.fromPins(
          Pin(size: 32.0, end: 0.0),
          Pin(start: 0.0, end: 0.0),
          child: XDComponent163(),
        ),
        Align(
          alignment: Alignment.topLeft,
          child: Container(
            width: 104.0,
            height: 32.0,
            decoration: BoxDecoration(
              border: Border.all(width: 2.0, color: const Color(0xff707070)),
            ),
          ),
        ),
      ],
    );
  }
}

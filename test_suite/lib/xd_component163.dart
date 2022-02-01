import 'package:flutter/material.dart';

class XDComponent163 extends StatelessWidget {
  XDComponent163({
    Key? key,
  }) : super(key: key);
  @override
  Widget build(BuildContext context) {
    return Stack(
      children: <Widget>[
        Container(
          width: 32.0,
          height: 32.0,
          decoration: BoxDecoration(
            color: const Color(0xff008d00),
            borderRadius: BorderRadius.circular(8.0),
          ),
        ),
        Transform.translate(
          offset: Offset(0.0, 5.0),
          child: SizedBox(
            width: 32.0,
            height: 22.0,
            child: Text(
              'Hi!',
              style: TextStyle(
                fontFamily: 'Arial',
                fontSize: 18,
                color: const Color(0xffffffff),
                fontWeight: FontWeight.w700,
              ),
              textAlign: TextAlign.center,
            ),
          ),
        ),
      ],
    );
  }
}

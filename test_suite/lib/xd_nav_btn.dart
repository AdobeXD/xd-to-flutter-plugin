import 'package:flutter/material.dart';

class XDNavBtn extends StatelessWidget {
  XDNavBtn({
    Key? key,
  }) : super(key: key);
  @override
  Widget build(BuildContext context) {
    return Stack(
      children: <Widget>[
        Container(
          decoration: BoxDecoration(
            color: const Color(0xffffffff),
            borderRadius: BorderRadius.circular(8.0),
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
      ],
    );
  }
}

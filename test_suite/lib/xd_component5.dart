import 'package:flutter/material.dart';
import 'package:flutter_svg/flutter_svg.dart';

class XDComponent5 extends StatelessWidget {
  XDComponent5({
    Key? key,
  }) : super(key: key);
  @override
  Widget build(BuildContext context) {
    return Stack(
      children: <Widget>[
        SizedBox.expand(
            child: SvgPicture.string(
          _svg_ecce7l,
          allowDrawingOutsideViewBox: true,
          fit: BoxFit.fill,
        )),
      ],
    );
  }
}

const String _svg_ecce7l =
    '<svg viewBox="0.0 0.0 32.0 32.0" ><path  d="M 27.99990081787109 32.00040054321289 L 0 32.00040054321289 L 0 27.99990081787109 L 27.99990081787109 27.99990081787109 L 27.99990081787109 0 L 32.00040054321289 0 L 32.00040054321289 32.00040054321289 L 27.99990081787109 32.00040054321289 Z" fill="#00c4ff" stroke="none" stroke-width="1" stroke-miterlimit="4" stroke-linecap="butt" /></svg>';

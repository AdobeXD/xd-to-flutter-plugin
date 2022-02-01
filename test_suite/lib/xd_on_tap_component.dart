import 'package:flutter/material.dart';

class XDOnTapComponent extends StatelessWidget {
  final VoidCallback? onTestTapComponent;
  final String label;
  final Color labelColor;
  XDOnTapComponent({
    Key? key,
    this.onTestTapComponent,
    this.label = 'onTap Comp',
    this.labelColor = const Color(0xff008d00),
  }) : super(key: key);
  @override
  Widget build(BuildContext context) {
    return GestureDetector(
      onTap: () => onTestTapComponent?.call(),
      child: Stack(
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
          Padding(
            padding: EdgeInsets.symmetric(horizontal: 16.0, vertical: 7.0),
            child: SizedBox.expand(
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
            )),
          ),
        ],
      ),
    );
  }
}

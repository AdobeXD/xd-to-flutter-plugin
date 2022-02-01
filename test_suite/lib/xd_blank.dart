import 'package:flutter/material.dart';
import './xd_page_size.dart';
import 'package:adobe_xd/pinned.dart';
import './xd_title_bar.dart';

class XDBlank extends StatelessWidget {
  XDBlank({
    Key? key,
  }) : super(key: key);
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: const Color(0xfff3f3f3),
      body: Stack(
        children: <Widget>[
          SizedBox(
            width: 960.0,
            height: 720.0,
            child:
                // Adobe XD layer: 'PageSize' (component)
                XDPageSize(),
          ),
          Pinned.fromPins(
            Pin(start: 0.0, end: 0.0),
            Pin(size: 48.0, start: 0.0),
            child:
                // Adobe XD layer: 'TitleBar' (component)
                XDTitleBar(
              title: 'Blank (for adhoc tests)',
            ),
          ),
          Pinned.fromPins(
            Pin(start: 254.0, end: 20.0),
            Pin(size: 21.0, start: 15.0),
            child: Text(
              'This artboard is just a handy place to quickly sketch new tests, or isolate existing ones.',
              style: TextStyle(
                fontFamily: 'Arial',
                fontSize: 14,
                color: const Color(0xff000000),
              ),
            ),
          ),
        ],
      ),
    );
  }
}

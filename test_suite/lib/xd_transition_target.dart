import 'package:flutter/material.dart';
import './xd_btn.dart';
import 'package:adobe_xd/page_link.dart';

class XDTransitionTarget extends StatelessWidget {
  XDTransitionTarget({
    Key? key,
  }) : super(key: key);
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: const Color(0xff008d00),
      body: Stack(
        children: <Widget>[
          Center(
            child: SizedBox(
              width: 128.0,
              height: 32.0,
              child:
                  // Adobe XD layer: 'Btn' (component)
                  PageLink(
                links: [
                  PageLinkInfo(),
                ],
                child: XDBtn(
                  label: 'Go Back',
                  labelColor: const Color(0xff008d00),
                ),
              ),
            ),
          ),
        ],
      ),
    );
  }
}

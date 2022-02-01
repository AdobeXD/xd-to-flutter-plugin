import 'package:flutter/material.dart';
import 'package:adobe_xd/pinned.dart';
import './xd_nav_btn.dart';
import 'package:adobe_xd/page_link.dart';

class XDTitleBar extends StatelessWidget {
  final String title;
  XDTitleBar({
    Key? key,
    this.title = 'Title',
  }) : super(key: key);
  @override
  Widget build(BuildContext context) {
    return Stack(
      children: <Widget>[
        Pinned.fromPins(
          Pin(start: 0.0, end: 0.0),
          Pin(size: 48.0, start: 0.0),
          child:
              // Adobe XD layer: 'bg' (shape)
              Container(
            color: const Color(0xffe2e2e2),
          ),
        ),
        Pinned.fromPins(
          Pin(start: 64.0, end: 22.0),
          Pin(size: 20.0, start: 14.0),
          child:
              // Adobe XD layer: 'title' (text)
              Text(
            title,
            style: TextStyle(
              fontFamily: 'Arial',
              fontSize: 16,
              color: const Color(0xff000000),
              fontWeight: FontWeight.w700,
            ),
          ),
        ),
        Pinned.fromPins(
          Pin(size: 32.0, start: 16.0),
          Pin(size: 32.0, middle: 0.5),
          child:
              // Adobe XD layer: 'home_btn' (group)
              PageLink(
            links: [
              PageLinkInfo(),
            ],
            child: Stack(
              children: <Widget>[
                Align(
                  alignment: Alignment.topLeft,
                  child: SizedBox(
                    width: 32.0,
                    height: 32.0,
                    child:
                        // Adobe XD layer: 'NavButton' (component)
                        XDNavBtn(),
                  ),
                ),
                Pinned.fromPins(
                  Pin(size: 16.9, start: 8.0),
                  Pin(size: 16.0, start: 8.0),
                  child:
                      // Adobe XD layer: 'glyphicons-21-home@…' (shape)
                      Container(
                    decoration: BoxDecoration(
                      image: DecorationImage(
                        image: const AssetImage('assets/images/home.png'),
                        fit: BoxFit.fill,
                        colorFilter: new ColorFilter.mode(
                            Colors.black.withOpacity(0.5), BlendMode.dstIn),
                      ),
                    ),
                  ),
                ),
              ],
            ),
          ),
        ),
      ],
    );
  }
}

import 'package:flutter/material.dart';
import './xd_page_size.dart';
import 'package:adobe_xd/pinned.dart';
import './xd_nav_row.dart';
import './xd_shapes.dart';
import 'package:adobe_xd/page_link.dart';
import './xd_shape_collapsing.dart';
import './xd_miscellaneous.dart';
import './xd_blank.dart';
import './xd_repeat_grid.dart';
import './xd_components.dart';
import './xd_layout.dart';
import './xd_stacks_padding_scrollable.dart';
import './xd_text.dart';
import './xd_component251.dart';
import './xd_component261.dart';

class XDHome extends StatelessWidget {
  XDHome({
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
            Pin(start: 32.0, endFraction: 0.5167),
            Pin(size: 40.0, start: 463.0),
            child:
                // Adobe XD layer: 'NavRow' (component)
                PageLink(
              links: [
                PageLinkInfo(
                  transition: LinkTransition.Fade,
                  ease: Curves.easeOut,
                  duration: 0.3,
                  pageBuilder: () => XDShapes(),
                ),
              ],
              child: XDNavRow(
                label: 'Shapes',
              ),
            ),
          ),
          Pinned.fromPins(
            Pin(start: 32.0, endFraction: 0.5167),
            Pin(size: 40.0, start: 511.0),
            child:
                // Adobe XD layer: 'NavRow' (component)
                PageLink(
              links: [
                PageLinkInfo(
                  transition: LinkTransition.Fade,
                  ease: Curves.easeOut,
                  duration: 0.3,
                  pageBuilder: () => XDShapeCollapsing(),
                ),
              ],
              child: XDNavRow(
                label: 'Shape Collapsing',
              ),
            ),
          ),
          Pinned.fromPins(
            Pin(start: 32.0, endFraction: 0.5167),
            Pin(size: 40.0, start: 559.0),
            child:
                // Adobe XD layer: 'NavRow' (component)
                PageLink(
              links: [
                PageLinkInfo(
                  transition: LinkTransition.Fade,
                  ease: Curves.easeOut,
                  duration: 0.3,
                  pageBuilder: () => XDMiscellaneous(),
                ),
              ],
              child: XDNavRow(
                label: 'Miscellaneous',
              ),
            ),
          ),
          Pinned.fromPins(
            Pin(start: 32.0, endFraction: 0.5167),
            Pin(size: 40.0, start: 645.0),
            child:
                // Adobe XD layer: 'NavRow' (component)
                PageLink(
              links: [
                PageLinkInfo(
                  transition: LinkTransition.Fade,
                  ease: Curves.easeOut,
                  duration: 0.3,
                  pageBuilder: () => XDBlank(),
                ),
              ],
              child: XDNavRow(
                label: 'Blank (for adhoc tests)',
              ),
            ),
          ),
          Pinned.fromPins(
            Pin(end: 32.0, startFraction: 0.5167),
            Pin(size: 40.0, start: 415.0),
            child:
                // Adobe XD layer: 'NavRow' (component)
                PageLink(
              links: [
                PageLinkInfo(
                  transition: LinkTransition.Fade,
                  ease: Curves.easeOut,
                  duration: 0.3,
                  pageBuilder: () => XDRepeatGrid(),
                ),
              ],
              child: XDNavRow(
                label: 'Repeat Grid',
              ),
            ),
          ),
          Pinned.fromPins(
            Pin(end: 32.0, startFraction: 0.5167),
            Pin(size: 40.0, start: 463.0),
            child:
                // Adobe XD layer: 'NavRow' (component)
                PageLink(
              links: [
                PageLinkInfo(
                  transition: LinkTransition.Fade,
                  ease: Curves.easeOut,
                  duration: 0.3,
                  pageBuilder: () => XDComponents(),
                ),
              ],
              child: XDNavRow(
                label: 'Components & Groups',
              ),
            ),
          ),
          Pinned.fromPins(
            Pin(end: 32.0, startFraction: 0.5167),
            Pin(size: 40.0, start: 511.0),
            child:
                // Adobe XD layer: 'NavRow' (component)
                PageLink(
              links: [
                PageLinkInfo(
                  transition: LinkTransition.Fade,
                  ease: Curves.linear,
                  duration: 0.5,
                  pageBuilder: () => XDLayout(),
                ),
              ],
              child: XDNavRow(
                label: 'Layout & Positioning',
              ),
            ),
          ),
          Pinned.fromPins(
            Pin(end: 32.0, startFraction: 0.5167),
            Pin(size: 40.0, start: 559.0),
            child:
                // Adobe XD layer: 'NavRow' (component)
                PageLink(
              links: [
                PageLinkInfo(
                  transition: LinkTransition.Fade,
                  ease: Curves.linear,
                  duration: 0.5,
                  pageBuilder: () => XDStacksPaddingScrollable(),
                ),
              ],
              child: XDNavRow(
                label: 'Stacks, Padding/Background, Scrollable Groups',
              ),
            ),
          ),
          Pinned.fromPins(
            Pin(start: 32.0, endFraction: 0.5167),
            Pin(size: 40.0, start: 415.0),
            child:
                // Adobe XD layer: 'NavRow' (component)
                PageLink(
              links: [
                PageLinkInfo(
                  transition: LinkTransition.Fade,
                  ease: Curves.easeOut,
                  duration: 0.3,
                  pageBuilder: () => XDText(),
                ),
              ],
              child: XDNavRow(
                label: 'Text',
              ),
            ),
          ),
          Pinned.fromPins(
            Pin(size: 886.0, start: 40.0),
            Pin(size: 338.0, start: 34.0),
            child: Stack(
              children: <Widget>[
                Align(
                  alignment: Alignment.topLeft,
                  child: SizedBox(
                    width: 264.0,
                    height: 27.0,
                    child: Text(
                      'XD to Flutter Test Suite',
                      style: TextStyle(
                        fontFamily: 'Arial',
                        fontSize: 24,
                        color: const Color(0xff000000),
                        fontWeight: FontWeight.w700,
                      ),
                      softWrap: false,
                    ),
                  ),
                ),
                Pinned.fromPins(
                  Pin(size: 86.0, middle: 0.6275),
                  Pin(size: 31.0, start: 4.0),
                  child: Text(
                    'Legend',
                    style: TextStyle(
                      fontFamily: 'Arial',
                      fontSize: 24,
                      color: const Color(0xff000000),
                      fontWeight: FontWeight.w700,
                    ),
                  ),
                ),
                Pinned.fromPins(
                  Pin(size: 456.0, start: 0.0),
                  Pin(start: 35.0, end: 0.0),
                  child: Text.rich(
                    TextSpan(
                      style: TextStyle(
                        fontFamily: 'Arial',
                        fontSize: 14,
                        color: const Color(0xff000000),
                      ),
                      children: [
                        TextSpan(
                          text: 'This file is still a work in progress.',
                          style: TextStyle(
                            fontWeight: FontWeight.w700,
                          ),
                        ),
                        TextSpan(
                          text:
                              ' It includes elements that cover most features / scenarios that the plugin handles, including those that it explicitly does not support. It also provides a reasonable test for overall export performance.\n\nIt is not exhaustive, but does provide a reasonably robust set of tests for most features, and a starting point for more in-depth testing.\n\nYou can test individual features by selecting a single artboard and using "Export Widget" or selecting a specific element and using "Copy to Clipboard" in the plugin panel. A “blank” artboard is included, which you can copy individual tests to and export them in isolation.\n\nIt should be updated whenever new features are added to the plugin, or new issues are confirmed.',
                        ),
                      ],
                    ),
                    textHeightBehavior:
                        TextHeightBehavior(applyHeightToFirstAscent: false),
                  ),
                ),
                Pinned.fromPins(
                  Pin(size: 384.0, end: 0.0),
                  Pin(size: 180.0, start: 43.0),
                  child: Stack(
                    children: <Widget>[
                      Padding(
                        padding: EdgeInsets.fromLTRB(35.0, 0.0, 0.0, 59.0),
                        child: SizedBox.expand(
                            child: Text.rich(
                          TextSpan(
                            style: TextStyle(
                              fontFamily: 'Arial',
                              fontSize: 14,
                              color: const Color(0xff008d00),
                            ),
                            children: [
                              TextSpan(
                                text: 'working',
                                style: TextStyle(
                                  fontWeight: FontWeight.w700,
                                ),
                              ),
                              TextSpan(
                                text: ' - feature works as expected\n\n',
                                style: TextStyle(
                                  color: const Color(0xff000000),
                                ),
                              ),
                              TextSpan(
                                text: 'unsupported',
                                style: TextStyle(
                                  color: const Color(0xff981a1a),
                                  fontWeight: FontWeight.w700,
                                ),
                              ),
                              TextSpan(
                                text:
                                    ' - unsupported in current plugin. May include GitHub issue # for related feature request.\n\n',
                                style: TextStyle(
                                  color: const Color(0xff000000),
                                ),
                              ),
                              TextSpan(
                                text: 'known issue(s)',
                                style: TextStyle(
                                  color: const Color(0xffc37f00),
                                  fontWeight: FontWeight.w700,
                                ),
                              ),
                              TextSpan(
                                text:
                                    ' - should work, but doesn’t. Should include GitHub issue #',
                                style: TextStyle(
                                  color: const Color(0xff000000),
                                ),
                              ),
                            ],
                          ),
                          textHeightBehavior: TextHeightBehavior(
                              applyHeightToFirstAscent: false),
                        )),
                      ),
                      Pinned.fromPins(
                        Pin(size: 251.0, start: 25.0),
                        Pin(size: 45.0, end: 0.0),
                        child: Text(
                          'generates warning(s)\nshould generate warning but doesn’t',
                          style: TextStyle(
                            fontFamily: 'Arial',
                            fontSize: 14,
                            color: const Color(0xff000000),
                            height: 1.8571428571428572,
                          ),
                          textHeightBehavior: TextHeightBehavior(
                              applyHeightToFirstAscent: false),
                        ),
                      ),
                      Align(
                        alignment: Alignment(-1.0, 0.659),
                        child: SizedBox(
                          width: 16.0,
                          height: 16.0,
                          child: XDComponent251(),
                        ),
                      ),
                      Pinned.fromPins(
                        Pin(size: 16.0, start: 0.0),
                        Pin(size: 16.0, end: 6.0),
                        child: XDComponent261(),
                      ),
                      Align(
                        alignment: Alignment.topLeft,
                        child: Container(
                          width: 18.0,
                          height: 18.0,
                          color: const Color(0xff008d00),
                        ),
                      ),
                      Align(
                        alignment: Alignment(-1.0, -0.568),
                        child: Container(
                          width: 18.0,
                          height: 18.0,
                          color: const Color(0xff981a1a),
                        ),
                      ),
                      Align(
                        alignment: Alignment(-1.0, 0.049),
                        child: Container(
                          width: 18.0,
                          height: 18.0,
                          color: const Color(0xffc37f00),
                        ),
                      ),
                      Pinned.fromPins(
                        Pin(size: 18.0, start: 8.0),
                        Pin(size: 18.0, start: 5.0),
                        child: Container(
                          color: const Color(0xff62048d),
                        ),
                      ),
                    ],
                  ),
                ),
              ],
            ),
          ),
        ],
      ),
    );
  }
}

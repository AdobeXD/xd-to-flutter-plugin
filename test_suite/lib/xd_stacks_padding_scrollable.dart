import 'package:flutter/material.dart';
import './xd_page_size.dart';
import 'package:adobe_xd/pinned.dart';
import './xd_title_bar.dart';
import './xd_test_group.dart';
import './xd_component251.dart';
import 'package:adobe_xd/gradient_xd_transform.dart';
import 'package:flutter_svg/flutter_svg.dart';

class XDStacksPaddingScrollable extends StatelessWidget {
  XDStacksPaddingScrollable({
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
              title: 'Stacks, Padding/Background, Scrollable Groups',
            ),
          ),
          Pinned.fromPins(
            Pin(start: 16.0, endFraction: 0.4406),
            Pin(end: 16.0, startFraction: 0.3958),
            child:
                // Adobe XD layer: 'stacks' (group)
                Stack(
              children: <Widget>[
                Pinned.fromPins(
                  Pin(start: 0.0, end: 0.0),
                  Pin(start: 0.0, endFraction: 0.0),
                  child: XDTestGroup(
                    title: 'Stacks',
                  ),
                ),
                Padding(
                  padding: EdgeInsets.fromLTRB(21.0, 49.0, 18.0, 39.0),
                  child:
                      // Adobe XD layer: 'content' (group)
                      Stack(
                    children: <Widget>[
                      Pinned.fromPins(
                        Pin(start: 0.0, end: 274.0),
                        Pin(size: 142.0, start: 0.0),
                        child:
                            // Adobe XD layer: 'vertical' (group)
                            Stack(
                          children: <Widget>[
                            Pinned.fromPins(
                              Pin(start: 0.0, end: 64.0),
                              Pin(size: 110.0, start: 32.0),
                              child:
                                  // Adobe XD layer: 'vStack' (group)
                                  Stack(
                                children: [
// background:
                                  Positioned.fill(
                                    child:
                                        // Adobe XD layer: 'bg' (shape)
                                        Container(
                                      decoration: BoxDecoration(
                                        color: const Color(0xffe3e3e3),
                                        border: Border.all(
                                            width: 3.0,
                                            color: const Color(0xff008d00)),
                                      ),
                                    ),
                                  ),
                                  Positioned.fill(
                                    child: Padding(
                                      padding: EdgeInsets.all(8.0),
                                      child: Column(
                                        crossAxisAlignment:
                                            CrossAxisAlignment.stretch,
                                        children: <Widget>[
                                          SizedBox(
                                            height: 8.0,
                                            child:
                                                // Adobe XD layer: 'fullWidth' (shape)
                                                Container(
                                              color: const Color(0xff62008d),
                                            ),
                                          ),
                                          SizedBox(
                                            height: 10.0,
                                          ),
                                          SizedBox(
                                            height: 8.0,
                                            child: Pinned.fromPins(
                                              Pin(
                                                  startFraction: 0.25,
                                                  endFraction: 0.25),
                                              Pin(),
                                              child:
                                                  // Adobe XD layer: 'none' (shape)
                                                  Container(
                                                color: const Color(0xff008d00),
                                              ),
                                            ),
                                          ),
                                          SizedBox(
                                            height: 2.0,
                                          ),
                                          SizedBox(
                                            height: 8.0,
                                            child: Pinned.fromPins(
                                              Pin(start: 0.0, endFraction: 0.5),
                                              Pin(),
                                              child:
                                                  // Adobe XD layer: 'pinLeft' (shape)
                                                  Container(
                                                color: const Color(0xff008d00),
                                              ),
                                            ),
                                          ),
                                          SizedBox(
                                            height: 2.0,
                                          ),
                                          SizedBox(
                                            height: 8.0,
                                            child: Pinned.fromPins(
                                              Pin(end: 0.0, startFraction: 0.5),
                                              Pin(),
                                              child:
                                                  // Adobe XD layer: 'pinRight' (shape)
                                                  Container(
                                                color: const Color(0xff008d00),
                                              ),
                                            ),
                                          ),
                                          SizedBox(
                                            height: 2.0,
                                          ),
                                          SizedBox(
                                            height: 8.0,
                                            child: Pinned.fromPins(
                                              Pin(start: 32.0, end: 32.0),
                                              Pin(),
                                              child:
                                                  // Adobe XD layer: 'pinBoth' (shape)
                                                  Container(
                                                color: const Color(0xff008d00),
                                              ),
                                            ),
                                          ),
                                          SizedBox(
                                            height: 10.0,
                                          ),
                                          SizedBox(
                                            height: 8.0,
                                            child: Pinned.fromPins(
                                              Pin(size: 64.0, middle: 0.5),
                                              Pin(),
                                              child:
                                                  // Adobe XD layer: 'fixWidth' (shape)
                                                  Container(
                                                color: const Color(0xff62008d),
                                              ),
                                            ),
                                          ),
                                          SizedBox(
                                            height: 2.0,
                                          ),
                                          SizedBox(
                                            height: 8.0,
                                            child: Pinned.fromPins(
                                              Pin(size: 64.0, start: 0.0),
                                              Pin(),
                                              child:
                                                  // Adobe XD layer: 'fixWidthPinLeft' (shape)
                                                  Container(
                                                color: const Color(0xff62008d),
                                              ),
                                            ),
                                          ),
                                          SizedBox(
                                            height: 2.0,
                                          ),
                                          SizedBox(
                                            height: 8.0,
                                            child: Pinned.fromPins(
                                              Pin(size: 64.0, end: 0.0),
                                              Pin(),
                                              child:
                                                  // Adobe XD layer: 'fixWidthPinRight' (shape)
                                                  Container(
                                                color: const Color(0xff62008d),
                                              ),
                                            ),
                                          ),
                                        ],
                                      ),
                                    ),
                                  ),
                                ],
                              ),
                            ),
                            Pinned.fromPins(
                              Pin(start: 0.0, endFraction: 0.0),
                              Pin(size: 20.0, start: 0.0),
                              child: Text.rich(
                                TextSpan(
                                  style: TextStyle(
                                    fontFamily: 'Arial',
                                    fontSize: 14,
                                    color: const Color(0xff62008d),
                                  ),
                                  children: [
                                    TextSpan(
                                      text: 'LR,',
                                    ),
                                    TextSpan(
                                      text: ' none, L, R, LR,',
                                      style: TextStyle(
                                        color: const Color(0xff008d00),
                                      ),
                                    ),
                                    TextSpan(
                                      text: ' W, W/L, W/R',
                                    ),
                                  ],
                                ),
                                textHeightBehavior: TextHeightBehavior(
                                    applyHeightToFirstAscent: false),
                              ),
                            ),
                          ],
                        ),
                      ),
                      Pinned.fromPins(
                        Pin(start: 0.0, endFraction: 0.5685),
                        Pin(start: 158.0, end: 0.0),
                        child:
                            // Adobe XD layer: 'horiztonal' (group)
                            Stack(
                          children: <Widget>[
                            Pinned.fromPins(
                              Pin(size: 110.0, start: 9.0),
                              Pin(start: 29.0, end: 0.0),
                              child:
                                  // Adobe XD layer: 'hStack' (group)
                                  Stack(
                                children: [
// background:
                                  Positioned.fill(
                                    child:
                                        // Adobe XD layer: 'bg' (shape)
                                        Container(
                                      decoration: BoxDecoration(
                                        color: const Color(0xffe3e3e3),
                                        border: Border.all(
                                            width: 3.0,
                                            color: const Color(0xff008d00)),
                                      ),
                                    ),
                                  ),
                                  Positioned.fill(
                                    child: Padding(
                                      padding: EdgeInsets.all(8.0),
                                      child: Row(
                                        crossAxisAlignment:
                                            CrossAxisAlignment.stretch,
                                        children: <Widget>[
                                          SizedBox(
                                            width: 8.0,
                                            child:
                                                // Adobe XD layer: 'fullHeight' (shape)
                                                Container(
                                              color: const Color(0xff62008d),
                                            ),
                                          ),
                                          SizedBox(
                                            width: 10.0,
                                          ),
                                          SizedBox(
                                            width: 8.0,
                                            child: Pinned.fromPins(
                                              Pin(),
                                              Pin(
                                                  startFraction: 0.25,
                                                  endFraction: 0.25),
                                              child:
                                                  // Adobe XD layer: 'none' (shape)
                                                  Container(
                                                color: const Color(0xff008d00),
                                              ),
                                            ),
                                          ),
                                          SizedBox(
                                            width: 2.0,
                                          ),
                                          SizedBox(
                                            width: 8.0,
                                            child: Pinned.fromPins(
                                              Pin(),
                                              Pin(start: 0.0, endFraction: 0.5),
                                              child:
                                                  // Adobe XD layer: 'pinTop' (shape)
                                                  Container(
                                                color: const Color(0xff008d00),
                                              ),
                                            ),
                                          ),
                                          SizedBox(
                                            width: 2.0,
                                          ),
                                          SizedBox(
                                            width: 8.0,
                                            child: Pinned.fromPins(
                                              Pin(),
                                              Pin(end: 0.0, startFraction: 0.5),
                                              child:
                                                  // Adobe XD layer: 'pinBottom' (shape)
                                                  Container(
                                                color: const Color(0xff008d00),
                                              ),
                                            ),
                                          ),
                                          SizedBox(
                                            width: 2.0,
                                          ),
                                          SizedBox(
                                            width: 8.0,
                                            child: Pinned.fromPins(
                                              Pin(),
                                              Pin(start: 32.0, end: 32.0),
                                              child:
                                                  // Adobe XD layer: 'pinBoth' (shape)
                                                  Container(
                                                color: const Color(0xff008d00),
                                              ),
                                            ),
                                          ),
                                          SizedBox(
                                            width: 10.0,
                                          ),
                                          SizedBox(
                                            width: 8.0,
                                            child: Pinned.fromPins(
                                              Pin(),
                                              Pin(size: 64.0, middle: 0.5),
                                              child:
                                                  // Adobe XD layer: 'fixHeight' (shape)
                                                  Container(
                                                color: const Color(0xff62008d),
                                              ),
                                            ),
                                          ),
                                          SizedBox(
                                            width: 2.0,
                                          ),
                                          SizedBox(
                                            width: 8.0,
                                            child: Pinned.fromPins(
                                              Pin(),
                                              Pin(size: 64.0, start: 0.0),
                                              child:
                                                  // Adobe XD layer: 'fixHeightPinTop' (shape)
                                                  Container(
                                                color: const Color(0xff62008d),
                                              ),
                                            ),
                                          ),
                                          SizedBox(
                                            width: 2.0,
                                          ),
                                          SizedBox(
                                            width: 8.0,
                                            child: Pinned.fromPins(
                                              Pin(),
                                              Pin(size: 64.0, end: 0.0),
                                              child:
                                                  // Adobe XD layer: 'fixHeightPinBottom' (shape)
                                                  Container(
                                                color: const Color(0xff62008d),
                                              ),
                                            ),
                                          ),
                                        ],
                                      ),
                                    ),
                                  ),
                                ],
                              ),
                            ),
                            Pinned.fromPins(
                              Pin(start: 0.0, end: 0.0),
                              Pin(size: 17.0, start: 0.0),
                              child: Text.rich(
                                TextSpan(
                                  style: TextStyle(
                                    fontFamily: 'Arial',
                                    fontSize: 14,
                                    color: const Color(0xff62008d),
                                  ),
                                  children: [
                                    TextSpan(
                                      text: 'TB,',
                                    ),
                                    TextSpan(
                                      text: ' none, T, B, TB,',
                                      style: TextStyle(
                                        color: const Color(0xff008d00),
                                      ),
                                    ),
                                    TextSpan(
                                      text: ' H, H/T, H/B',
                                    ),
                                  ],
                                ),
                                textHeightBehavior: TextHeightBehavior(
                                    applyHeightToFirstAscent: false),
                              ),
                            ),
                          ],
                        ),
                      ),
                      Pinned.fromPins(
                        Pin(size: 126.0, end: 133.0),
                        Pin(size: 109.0, start: 0.0),
                        child:
                            // Adobe XD layer: 'transformations' (group)
                            Stack(
                          children: <Widget>[
                            Pinned.fromPins(
                              Pin(size: 102.9, start: 0.0),
                              Pin(start: 29.0, end: 0.0),
                              child:
                                  // Adobe XD layer: 'hStack' (group)
                                  Stack(
                                children: [
// background:
                                  Positioned.fill(
                                    child:
                                        // Adobe XD layer: 'bg' (shape)
                                        Container(
                                      decoration: BoxDecoration(
                                        color: const Color(0xffe3e3e3),
                                        border: Border.all(
                                            width: 3.0,
                                            color: const Color(0xff008d00)),
                                      ),
                                    ),
                                  ),
                                  Positioned.fill(
                                    child: Padding(
                                      padding: EdgeInsets.all(8.0),
                                      child: Row(
                                        crossAxisAlignment:
                                            CrossAxisAlignment.stretch,
                                        children: <Widget>[
                                          SizedBox(
                                            width: 8.0,
                                            child:
                                                // Adobe XD layer: 'none' (shape)
                                                Container(
                                              color: const Color(0xff008d00),
                                            ),
                                          ),
                                          SizedBox(
                                            width: 10.0,
                                          ),
                                          SizedBox(
                                            width: 8.0,
                                            child: Transform.rotate(
                                              angle: 0.7854,
                                              child:
                                                  // Adobe XD layer: 'none' (shape)
                                                  Container(
                                                color: const Color(0xff981a1a),
                                              ),
                                            ),
                                          ),
                                          SizedBox(
                                            width: 10.0,
                                          ),
                                          SizedBox(
                                            width: 8.0,
                                            child:
                                                // Adobe XD layer: 'pinBoth' (shape)
                                                Container(
                                              color: const Color(0xff008d00),
                                            ),
                                          ),
                                        ],
                                      ),
                                    ),
                                  ),
                                ],
                              ),
                            ),
                            Pinned.fromPins(
                              Pin(start: 0.0, end: 13.0),
                              Pin(size: 20.0, start: 0.0),
                              child: Text(
                                'Transformations',
                                style: TextStyle(
                                  fontFamily: 'Arial',
                                  fontSize: 14,
                                  color: const Color(0xff666666),
                                ),
                              ),
                            ),
                            Align(
                              alignment: Alignment.topRight,
                              child: SizedBox(
                                width: 16.0,
                                height: 16.0,
                                child: XDComponent251(),
                              ),
                            ),
                          ],
                        ),
                      ),
                      Pinned.fromPins(
                        Pin(size: 123.0, end: 136.0),
                        Pin(size: 112.0, start: 161.0),
                        child:
                            // Adobe XD layer: 'transformedBg' (group)
                            Stack(
                          children: <Widget>[
                            Pinned.fromPins(
                              Pin(size: 76.0, start: 0.0),
                              Pin(start: 22.0, end: 0.0),
                              child:
                                  // Adobe XD layer: 'hStack' (group)
                                  Stack(
                                children: [
// background:
                                  Positioned.fill(
                                    child:
                                        // Adobe XD layer: 'bg' (shape)
                                        Container(
                                      decoration: BoxDecoration(
                                        color: const Color(0xffe3e3e3),
                                        border: Border.all(
                                            width: 3.0,
                                            color: const Color(0xff981a1a)),
                                      ),
                                    ),
                                  ),
                                  Positioned.fill(
                                    child: Padding(
                                      padding: EdgeInsets.fromLTRB(
                                          25.0, 13.0, 25.0, 13.0),
                                      child: Row(
                                        crossAxisAlignment:
                                            CrossAxisAlignment.stretch,
                                        children: <Widget>[
                                          SizedBox(
                                            width: 8.0,
                                            child:
                                                // Adobe XD layer: 'none' (shape)
                                                Container(
                                              color: const Color(0xff008d00),
                                            ),
                                          ),
                                          SizedBox(
                                            width: 10.0,
                                          ),
                                          SizedBox(
                                            width: 8.0,
                                            child:
                                                // Adobe XD layer: 'pinBoth' (shape)
                                                Container(
                                              color: const Color(0xff008d00),
                                            ),
                                          ),
                                        ],
                                      ),
                                    ),
                                  ),
                                ],
                              ),
                            ),
                            Pinned.fromPins(
                              Pin(start: 0.0, end: 13.0),
                              Pin(size: 22.0, start: 0.0),
                              child: Text(
                                'Transformed Bg',
                                style: TextStyle(
                                  fontFamily: 'Arial',
                                  fontSize: 14,
                                  color: const Color(0xff666666),
                                ),
                              ),
                            ),
                            Transform.translate(
                              offset: Offset(107.0, 1.0),
                              child: SizedBox(
                                width: 16.0,
                                height: 16.0,
                                child: Stack(
                                  children: <Widget>[
                                    SizedBox.expand(
                                        child: SvgPicture.string(
                                      _svg_sqgj52,
                                      allowDrawingOutsideViewBox: true,
                                      fit: BoxFit.fill,
                                    )),
                                  ],
                                ),
                              ),
                            ),
                          ],
                        ),
                      ),
                      Align(
                        alignment: Alignment.topRight,
                        child: SizedBox(
                          width: 104.0,
                          height: 109.0,
                          child:
                              // Adobe XD layer: 'nested' (group)
                              Stack(
                            children: <Widget>[
                              Pinned.fromPins(
                                Pin(size: 104.0, middle: 0.5),
                                Pin(start: 29.0, end: 0.0),
                                child: Stack(
                                  children: [
// background:
                                    Positioned.fill(
                                      child: Container(
                                        decoration: BoxDecoration(
                                          color: const Color(0xffffffff),
                                          border: Border.all(
                                              width: 1.0,
                                              color: const Color(0xff707070)),
                                        ),
                                      ),
                                    ),
                                    Positioned.fill(
                                      child: Padding(
                                        padding: EdgeInsets.all(8.0),
                                        child: Row(
                                          crossAxisAlignment:
                                              CrossAxisAlignment.stretch,
                                          children: <Widget>[
                                            SizedBox(
                                              width: 24.0,
                                              child: Pinned.fromPins(
                                                Pin(),
                                                Pin(size: 64.0, middle: 0.5),
                                                child: Stack(
                                                  children: [
// background:
                                                    Positioned.fill(
                                                      child: Container(
                                                        decoration:
                                                            BoxDecoration(
                                                          color: const Color(
                                                              0xffffffff),
                                                          border: Border.all(
                                                              width: 1.0,
                                                              color: const Color(
                                                                  0xff707070)),
                                                        ),
                                                      ),
                                                    ),
                                                    Positioned.fill(
                                                      child: Padding(
                                                        padding:
                                                            EdgeInsets.all(8.0),
                                                        child: Column(
                                                          crossAxisAlignment:
                                                              CrossAxisAlignment
                                                                  .stretch,
                                                          children: <Widget>[
                                                            SizedBox(
                                                              height: 9.0,
                                                              child: Container(
                                                                color: const Color(
                                                                    0xff008d00),
                                                              ),
                                                            ),
                                                            SizedBox(
                                                              height: 4.0,
                                                            ),
                                                            SizedBox(
                                                              height: 9.0,
                                                              child: Container(
                                                                color: const Color(
                                                                    0xff008d00),
                                                              ),
                                                            ),
                                                            SizedBox(
                                                              height: 4.0,
                                                            ),
                                                            SizedBox(
                                                              height: 9.0,
                                                              child: Container(
                                                                color: const Color(
                                                                    0xff008d00),
                                                              ),
                                                            ),
                                                            SizedBox(
                                                              height: 4.0,
                                                            ),
                                                            SizedBox(
                                                              height: 9.0,
                                                              child: Container(
                                                                color: const Color(
                                                                    0xff008d00),
                                                              ),
                                                            ),
                                                          ],
                                                        ),
                                                      ),
                                                    ),
                                                  ],
                                                ),
                                              ),
                                            ),
                                            SizedBox(
                                              width: 8.0,
                                            ),
                                            SizedBox(
                                              width: 24.0,
                                              child: Pinned.fromPins(
                                                Pin(),
                                                Pin(size: 64.0, middle: 0.5),
                                                child: Stack(
                                                  children: [
// background:
                                                    Positioned.fill(
                                                      child: Container(
                                                        decoration:
                                                            BoxDecoration(
                                                          color: const Color(
                                                              0xffffffff),
                                                          border: Border.all(
                                                              width: 1.0,
                                                              color: const Color(
                                                                  0xff707070)),
                                                        ),
                                                      ),
                                                    ),
                                                    Positioned.fill(
                                                      child: Padding(
                                                        padding:
                                                            EdgeInsets.all(8.0),
                                                        child: Column(
                                                          crossAxisAlignment:
                                                              CrossAxisAlignment
                                                                  .stretch,
                                                          children: <Widget>[
                                                            SizedBox(
                                                              height: 9.0,
                                                              child: Container(
                                                                color: const Color(
                                                                    0xff008d00),
                                                              ),
                                                            ),
                                                            SizedBox(
                                                              height: 4.0,
                                                            ),
                                                            SizedBox(
                                                              height: 9.0,
                                                              child: Container(
                                                                color: const Color(
                                                                    0xff008d00),
                                                              ),
                                                            ),
                                                            SizedBox(
                                                              height: 4.0,
                                                            ),
                                                            SizedBox(
                                                              height: 9.0,
                                                              child: Container(
                                                                color: const Color(
                                                                    0xff008d00),
                                                              ),
                                                            ),
                                                            SizedBox(
                                                              height: 4.0,
                                                            ),
                                                            SizedBox(
                                                              height: 9.0,
                                                              child: Container(
                                                                color: const Color(
                                                                    0xff008d00),
                                                              ),
                                                            ),
                                                          ],
                                                        ),
                                                      ),
                                                    ),
                                                  ],
                                                ),
                                              ),
                                            ),
                                            SizedBox(
                                              width: 8.0,
                                            ),
                                            SizedBox(
                                              width: 24.0,
                                              child: Pinned.fromPins(
                                                Pin(),
                                                Pin(size: 64.0, middle: 0.5),
                                                child: Stack(
                                                  children: [
// background:
                                                    Positioned.fill(
                                                      child: Container(
                                                        decoration:
                                                            BoxDecoration(
                                                          color: const Color(
                                                              0xffffffff),
                                                          border: Border.all(
                                                              width: 1.0,
                                                              color: const Color(
                                                                  0xff707070)),
                                                        ),
                                                      ),
                                                    ),
                                                    Positioned.fill(
                                                      child: Padding(
                                                        padding:
                                                            EdgeInsets.all(8.0),
                                                        child: Column(
                                                          crossAxisAlignment:
                                                              CrossAxisAlignment
                                                                  .stretch,
                                                          children: <Widget>[
                                                            SizedBox(
                                                              height: 9.0,
                                                              child: Container(
                                                                color: const Color(
                                                                    0xff008d00),
                                                              ),
                                                            ),
                                                            SizedBox(
                                                              height: 4.0,
                                                            ),
                                                            SizedBox(
                                                              height: 9.0,
                                                              child: Container(
                                                                color: const Color(
                                                                    0xff008d00),
                                                              ),
                                                            ),
                                                            SizedBox(
                                                              height: 4.0,
                                                            ),
                                                            SizedBox(
                                                              height: 9.0,
                                                              child: Container(
                                                                color: const Color(
                                                                    0xff008d00),
                                                              ),
                                                            ),
                                                            SizedBox(
                                                              height: 4.0,
                                                            ),
                                                            SizedBox(
                                                              height: 9.0,
                                                              child: Container(
                                                                color: const Color(
                                                                    0xff008d00),
                                                              ),
                                                            ),
                                                          ],
                                                        ),
                                                      ),
                                                    ),
                                                  ],
                                                ),
                                              ),
                                            ),
                                          ],
                                        ),
                                      ),
                                    ),
                                  ],
                                ),
                              ),
                              Pinned.fromPins(
                                Pin(start: 0.0, end: 0.0),
                                Pin(size: 17.0, start: 0.0),
                                child: Text(
                                  'Nested',
                                  style: TextStyle(
                                    fontFamily: 'Arial',
                                    fontSize: 14,
                                    color: const Color(0xff666666),
                                  ),
                                ),
                              ),
                            ],
                          ),
                        ),
                      ),
                    ],
                  ),
                ),
              ],
            ),
          ),
          Pinned.fromPins(
            Pin(start: 16.0, endFraction: 0.6635),
            Pin(start: 60.0, endFraction: 0.6264),
            child:
                // Adobe XD layer: 'paddingBackground' (group)
                Stack(
              children: <Widget>[
                Pinned.fromPins(
                  Pin(start: 0.0, end: 0.0),
                  Pin(start: 0.0, endFraction: 0.0),
                  child: XDTestGroup(
                    title: 'Padding/Background',
                  ),
                ),
                Pinned.fromPins(
                  Pin(start: 18.0, end: 23.0),
                  Pin(size: 137.0, end: 27.0),
                  child:
                      // Adobe XD layer: 'content' (group)
                      Stack(
                    children: <Widget>[
                      Pinned.fromPins(
                        Pin(start: 0.0, endFraction: 0.5301),
                        Pin(size: 22.0, start: 0.0),
                        child: Text(
                          'homogenous',
                          style: TextStyle(
                            fontFamily: 'Arial',
                            fontSize: 14,
                            color: const Color(0xff0f8d1e),
                          ),
                        ),
                      ),
                      Pinned.fromPins(
                        Pin(end: 0.0, startFraction: 0.5301),
                        Pin(size: 22.0, start: 0.0),
                        child: Text(
                          'mixed',
                          style: TextStyle(
                            fontFamily: 'Arial',
                            fontSize: 14,
                            color: const Color(0xff0f8d1e),
                          ),
                        ),
                      ),
                      Pinned.fromPins(
                        Pin(start: 0.0, endFraction: 0.5301),
                        Pin(start: 27.0, end: 0.0),
                        child: Stack(
                          children: [
// background:
                            Positioned.fill(
                              child:
                                  // Adobe XD layer: 'background' (shape)
                                  Container(
                                decoration: BoxDecoration(
                                  color: const Color(0xffe3e3e3),
                                  border: Border.all(
                                      width: 3.0,
                                      color: const Color(0xff008d00)),
                                ),
                              ),
                            ),
                            Positioned.fill(
                              child: Padding(
                                padding: EdgeInsets.all(16.0),
                                child: Stack(
                                  children: <Widget>[
                                    Pinned.fromPins(
                                      Pin(
                                          startFraction: 0.0,
                                          endFraction: 0.4194),
                                      Pin(
                                          startFraction: 0.3718,
                                          endFraction: 0.0),
                                      child: Container(
                                        decoration: BoxDecoration(
                                          color: const Color(0xff008d00),
                                          border: Border.all(
                                              width: 1.0,
                                              color: const Color(0xff707070)),
                                        ),
                                      ),
                                    ),
                                    Pinned.fromPins(
                                      Pin(
                                          startFraction: 0.4194,
                                          endFraction: 0.0),
                                      Pin(
                                          startFraction: 0.0,
                                          endFraction: 0.3718),
                                      child: Container(
                                        decoration: BoxDecoration(
                                          color: const Color(0xff62078d),
                                          border: Border.all(
                                              width: 1.0,
                                              color: const Color(0xff707070)),
                                        ),
                                      ),
                                    ),
                                  ],
                                ),
                              ),
                            ),
                          ],
                        ),
                      ),
                      Pinned.fromPins(
                        Pin(end: 0.0, startFraction: 0.5301),
                        Pin(start: 27.0, end: 0.0),
                        child: Stack(
                          children: [
// background:
                            Positioned.fill(
                              child:
                                  // Adobe XD layer: 'background' (shape)
                                  Container(
                                decoration: BoxDecoration(
                                  color: const Color(0xffe3e3e3),
                                  border: Border.all(
                                      width: 3.0,
                                      color: const Color(0xff008d00)),
                                ),
                              ),
                            ),
                            Positioned.fill(
                              child: Padding(
                                padding:
                                    EdgeInsets.fromLTRB(8.0, 4.0, 24.0, 28.0),
                                child: Stack(
                                  children: <Widget>[
                                    Pinned.fromPins(
                                      Pin(
                                          startFraction: 0.0,
                                          endFraction: 0.4194),
                                      Pin(
                                          startFraction: 0.3718,
                                          endFraction: 0.0),
                                      child: Container(
                                        decoration: BoxDecoration(
                                          color: const Color(0xff008d00),
                                          border: Border.all(
                                              width: 1.0,
                                              color: const Color(0xff707070)),
                                        ),
                                      ),
                                    ),
                                    Pinned.fromPins(
                                      Pin(
                                          startFraction: 0.4194,
                                          endFraction: 0.0),
                                      Pin(
                                          startFraction: 0.0,
                                          endFraction: 0.3718),
                                      child: Container(
                                        decoration: BoxDecoration(
                                          color: const Color(0xff62078d),
                                          border: Border.all(
                                              width: 1.0,
                                              color: const Color(0xff707070)),
                                        ),
                                      ),
                                    ),
                                  ],
                                ),
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
          ),
          Pinned.fromPins(
            Pin(end: 16.0, startFraction: 0.3531),
            Pin(start: 60.0, endFraction: 0.6264),
            child:
                // Adobe XD layer: 'scrollableGroups' (group)
                Stack(
              children: <Widget>[
                Pinned.fromPins(
                  Pin(start: 0.0, end: 0.0),
                  Pin(start: 0.0, endFraction: 0.0),
                  child: XDTestGroup(
                    title: 'Scrollable Groups',
                  ),
                ),
                Transform.translate(
                  offset: Offset(22.0, 45.0),
                  child: SizedBox(
                    width: 544.0,
                    height: 157.0,
                    child:
                        // Adobe XD layer: 'content' (group)
                        Stack(
                      children: <Widget>[
                        SizedBox(
                          width: 96.0,
                          height: 123.0,
                          child:
                              // Adobe XD layer: 'vertical' (group)
                              Stack(
                            children: <Widget>[
                              Transform.translate(
                                offset: Offset(0.0, 27.0),
                                child: Container(
                                  width: 96.0,
                                  height: 96.0,
                                  decoration: BoxDecoration(
                                    border: Border.all(
                                        width: 1.0,
                                        color: const Color(0xff666666)),
                                  ),
                                ),
                              ),
                              Transform.translate(
                                offset: Offset(0.0, 27.0),
                                child: SizedBox(
                                  width: 96.0,
                                  height: 96.0,
                                  child: SingleChildScrollView(
                                    primary: false,
                                    child: SizedBox(
                                      width: 96.0,
                                      height: 223.0,
                                      child: Stack(
                                        children: <Widget>[
                                          // Adobe XD layer: 'fullWidth' (shape)
                                          Container(
                                            width: 96.0,
                                            height: 8.0,
                                            color: const Color(0xff62008d),
                                          ),
                                          Transform.translate(
                                            offset: Offset(0.0, 16.0),
                                            child:
                                                // Adobe XD layer: 'fullWidth' (shape)
                                                Container(
                                              width: 96.0,
                                              height: 191.0,
                                              decoration: BoxDecoration(
                                                gradient: LinearGradient(
                                                  begin: Alignment(0.0, -1.0),
                                                  end: Alignment(0.0, 1.0),
                                                  colors: [
                                                    const Color(0xff008d00),
                                                    const Color(0xff62078d)
                                                  ],
                                                  stops: [0.0, 1.0],
                                                ),
                                              ),
                                            ),
                                          ),
                                          Transform.translate(
                                            offset: Offset(0.0, 215.0),
                                            child:
                                                // Adobe XD layer: 'fullWidth' (shape)
                                                Container(
                                              width: 96.0,
                                              height: 8.0,
                                              color: const Color(0xff008d00),
                                            ),
                                          ),
                                        ],
                                      ),
                                    ),
                                  ),
                                ),
                              ),
                              Transform.translate(
                                offset: Offset(4.0, 0.0),
                                child: SizedBox(
                                  width: 92.0,
                                  height: 22.0,
                                  child: Text(
                                    'vertical',
                                    style: TextStyle(
                                      fontFamily: 'Arial',
                                      fontSize: 14,
                                      color: const Color(0xff0f8d1e),
                                    ),
                                  ),
                                ),
                              ),
                            ],
                          ),
                        ),
                        Transform.translate(
                          offset: Offset(112.0, 0.0),
                          child: SizedBox(
                            width: 96.0,
                            height: 123.0,
                            child:
                                // Adobe XD layer: 'vertical' (group)
                                Stack(
                              children: <Widget>[
                                Transform.translate(
                                  offset: Offset(0.0, 27.0),
                                  child: Container(
                                    width: 96.0,
                                    height: 96.0,
                                    decoration: BoxDecoration(
                                      border: Border.all(
                                          width: 1.0,
                                          color: const Color(0xff666666)),
                                    ),
                                  ),
                                ),
                                Transform.translate(
                                  offset: Offset(0.0, 27.0),
                                  child: SizedBox(
                                    width: 96.0,
                                    height: 96.0,
                                    child: SingleChildScrollView(
                                      primary: false,
                                      child: SizedBox(
                                        width: 96.0,
                                        height: 223.0,
                                        child: Stack(
                                          children: <Widget>[
                                            // Adobe XD layer: 'fullWidth' (shape)
                                            Container(
                                              width: 96.0,
                                              height: 8.0,
                                              color: const Color(0xff62008d),
                                            ),
                                            Transform.translate(
                                              offset: Offset(0.0, 16.0),
                                              child:
                                                  // Adobe XD layer: 'fullWidth' (shape)
                                                  Container(
                                                width: 96.0,
                                                height: 191.0,
                                                decoration: BoxDecoration(
                                                  gradient: LinearGradient(
                                                    begin: Alignment(0.0, -1.0),
                                                    end: Alignment(0.0, 1.0),
                                                    colors: [
                                                      const Color(0xff008d00),
                                                      const Color(0xff62078d)
                                                    ],
                                                    stops: [0.0, 1.0],
                                                  ),
                                                ),
                                              ),
                                            ),
                                            Transform.translate(
                                              offset: Offset(0.0, 215.0),
                                              child:
                                                  // Adobe XD layer: 'fullWidth' (shape)
                                                  Container(
                                                width: 96.0,
                                                height: 8.0,
                                                color: const Color(0xff008d00),
                                              ),
                                            ),
                                          ],
                                        ),
                                      ),
                                    ),
                                  ),
                                ),
                                Transform.translate(
                                  offset: Offset(4.0, 0.0),
                                  child: SizedBox(
                                    width: 92.0,
                                    height: 22.0,
                                    child: Text(
                                      '+ offset',
                                      style: TextStyle(
                                        fontFamily: 'Arial',
                                        fontSize: 14,
                                        color: const Color(0xff981a1a),
                                      ),
                                    ),
                                  ),
                                ),
                              ],
                            ),
                          ),
                        ),
                        Transform.translate(
                          offset: Offset(224.0, 0.0),
                          child: SizedBox(
                            width: 96.0,
                            height: 123.0,
                            child:
                                // Adobe XD layer: 'vertical' (group)
                                Stack(
                              children: <Widget>[
                                Transform.translate(
                                  offset: Offset(0.0, 27.0),
                                  child: Container(
                                    width: 96.0,
                                    height: 96.0,
                                    decoration: BoxDecoration(
                                      border: Border.all(
                                          width: 1.0,
                                          color: const Color(0xff666666)),
                                    ),
                                  ),
                                ),
                                Transform.translate(
                                  offset: Offset(0.0, 27.0),
                                  child: SizedBox(
                                    width: 96.0,
                                    height: 96.0,
                                    child: SingleChildScrollView(
                                      primary: false,
                                      child: SizedBox(
                                        width: 96.0,
                                        height: 223.0,
                                        child: Stack(
                                          children: <Widget>[
                                            // Adobe XD layer: 'fullWidth' (shape)
                                            Container(
                                              width: 96.0,
                                              height: 8.0,
                                              color: const Color(0xff62008d),
                                            ),
                                            Transform.translate(
                                              offset: Offset(0.0, 16.0),
                                              child:
                                                  // Adobe XD layer: 'fullWidth' (shape)
                                                  Container(
                                                width: 96.0,
                                                height: 191.0,
                                                decoration: BoxDecoration(
                                                  gradient: LinearGradient(
                                                    begin: Alignment(0.0, -1.0),
                                                    end: Alignment(0.0, 1.0),
                                                    colors: [
                                                      const Color(0xff008d00),
                                                      const Color(0xff62078d)
                                                    ],
                                                    stops: [0.0, 1.0],
                                                  ),
                                                ),
                                              ),
                                            ),
                                            Transform.translate(
                                              offset: Offset(0.0, 215.0),
                                              child:
                                                  // Adobe XD layer: 'fullWidth' (shape)
                                                  Container(
                                                width: 96.0,
                                                height: 8.0,
                                                color: const Color(0xff008d00),
                                              ),
                                            ),
                                          ],
                                        ),
                                      ),
                                    ),
                                  ),
                                ),
                                Transform.translate(
                                  offset: Offset(4.0, 0.0),
                                  child: SizedBox(
                                    width: 92.0,
                                    height: 22.0,
                                    child: Text(
                                      '- offset',
                                      style: TextStyle(
                                        fontFamily: 'Arial',
                                        fontSize: 14,
                                        color: const Color(0xff981a1a),
                                      ),
                                    ),
                                  ),
                                ),
                              ],
                            ),
                          ),
                        ),
                        Transform.translate(
                          offset: Offset(336.0, 0.0),
                          child: SizedBox(
                            width: 96.0,
                            height: 123.0,
                            child:
                                // Adobe XD layer: 'vertical' (group)
                                Stack(
                              children: <Widget>[
                                Transform.translate(
                                  offset: Offset(0.0, 27.0),
                                  child: Container(
                                    width: 96.0,
                                    height: 96.0,
                                    decoration: BoxDecoration(
                                      border: Border.all(
                                          width: 1.0,
                                          color: const Color(0xff666666)),
                                    ),
                                  ),
                                ),
                                Transform.translate(
                                  offset: Offset(0.0, 27.0),
                                  child: SizedBox(
                                    width: 96.0,
                                    height: 96.0,
                                    child: SingleChildScrollView(
                                      primary: false,
                                      scrollDirection: Axis.horizontal,
                                      child: SizedBox(
                                        width: 223.0,
                                        height: 96.0,
                                        child: Stack(
                                          children: <Widget>[
                                            // Adobe XD layer: 'fullWidth' (shape)
                                            Container(
                                              width: 8.0,
                                              height: 96.0,
                                              color: const Color(0xff62008d),
                                            ),
                                            Transform.translate(
                                              offset: Offset(16.0, 0.0),
                                              child:
                                                  // Adobe XD layer: 'fullWidth' (shape)
                                                  Container(
                                                width: 191.0,
                                                height: 96.0,
                                                decoration: BoxDecoration(
                                                  gradient: LinearGradient(
                                                    begin: Alignment(-1.0, 0.0),
                                                    end: Alignment(1.0, 0.0),
                                                    colors: [
                                                      const Color(0xff008d00),
                                                      const Color(0xff62078d)
                                                    ],
                                                    stops: [0.0, 1.0],
                                                  ),
                                                ),
                                              ),
                                            ),
                                            Transform.translate(
                                              offset: Offset(215.0, 0.0),
                                              child:
                                                  // Adobe XD layer: 'fullWidth' (shape)
                                                  Container(
                                                width: 8.0,
                                                height: 96.0,
                                                color: const Color(0xff008d00),
                                              ),
                                            ),
                                          ],
                                        ),
                                      ),
                                    ),
                                  ),
                                ),
                                Transform.translate(
                                  offset: Offset(4.0, 0.0),
                                  child: SizedBox(
                                    width: 92.0,
                                    height: 22.0,
                                    child: Text(
                                      'horizontal',
                                      style: TextStyle(
                                        fontFamily: 'Arial',
                                        fontSize: 14,
                                        color: const Color(0xff0f8d1e),
                                      ),
                                    ),
                                  ),
                                ),
                              ],
                            ),
                          ),
                        ),
                        Transform.translate(
                          offset: Offset(448.0, 0.0),
                          child: SizedBox(
                            width: 96.0,
                            height: 123.0,
                            child:
                                // Adobe XD layer: 'vertical' (group)
                                Stack(
                              children: <Widget>[
                                Transform.translate(
                                  offset: Offset(0.0, 27.0),
                                  child: Container(
                                    width: 96.0,
                                    height: 96.0,
                                    decoration: BoxDecoration(
                                      border: Border.all(
                                          width: 1.0,
                                          color: const Color(0xff666666)),
                                    ),
                                  ),
                                ),
                                Transform.translate(
                                  offset: Offset(0.0, 27.0),
                                  child: SizedBox(
                                    width: 96.0,
                                    height: 96.0,
                                    child: SingleChildScrollView(
                                      primary: false,
                                      child: SizedBox(
                                        width: 191.0,
                                        height: 223.0,
                                        child: Stack(
                                          children: <Widget>[
                                            // Adobe XD layer: 'fullWidth' (shape)
                                            Container(
                                              width: 191.0,
                                              height: 8.0,
                                              color: const Color(0xff62008d),
                                            ),
                                            Transform.translate(
                                              offset: Offset(0.0, 16.0),
                                              child:
                                                  // Adobe XD layer: 'fullWidth' (shape)
                                                  Container(
                                                width: 191.0,
                                                height: 191.0,
                                                decoration: BoxDecoration(
                                                  gradient: RadialGradient(
                                                    center: Alignment(0.0, 0.0),
                                                    radius: 0.5,
                                                    colors: [
                                                      const Color(0xff008d00),
                                                      const Color(0xff62078d)
                                                    ],
                                                    stops: [0.0, 1.0],
                                                    transform:
                                                        GradientXDTransform(
                                                            1.0,
                                                            0.0,
                                                            0.0,
                                                            1.0,
                                                            0.0,
                                                            0.0,
                                                            Alignment(
                                                                0.0, 0.0)),
                                                  ),
                                                ),
                                              ),
                                            ),
                                            Transform.translate(
                                              offset: Offset(0.0, 215.0),
                                              child:
                                                  // Adobe XD layer: 'fullWidth' (shape)
                                                  Container(
                                                width: 191.0,
                                                height: 8.0,
                                                color: const Color(0xff008d00),
                                              ),
                                            ),
                                          ],
                                        ),
                                      ),
                                    ),
                                  ),
                                ),
                                Transform.translate(
                                  offset: Offset(4.0, 0.0),
                                  child: SizedBox(
                                    width: 92.0,
                                    height: 22.0,
                                    child: Text(
                                      'panning',
                                      style: TextStyle(
                                        fontFamily: 'Arial',
                                        fontSize: 14,
                                        color: const Color(0xff981a1a),
                                      ),
                                    ),
                                  ),
                                ),
                                Align(
                                  alignment: Alignment.topRight,
                                  child: SizedBox(
                                    width: 16.0,
                                    height: 16.0,
                                    child: XDComponent251(),
                                  ),
                                ),
                              ],
                            ),
                          ),
                        ),
                        Transform.translate(
                          offset: Offset(12.0, 135.0),
                          child: SizedBox(
                            width: 514.0,
                            height: 22.0,
                            child: Text(
                              'Offsets are not preserved in output. Panning converts to vertical w/warning.',
                              style: TextStyle(
                                fontFamily: 'Arial',
                                fontSize: 14,
                                color: const Color(0xff666666),
                              ),
                              textAlign: TextAlign.center,
                            ),
                          ),
                        ),
                      ],
                    ),
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

const String _svg_sqgj52 =
    '<svg viewBox="0.0 0.0 16.0 16.0" ><path transform="translate(0.0, 0.0)" d="M 16.00020217895508 16.00020408630371 L 15.99858283996582 16.00020408630371 L 2.850494411177351e-06 16.00020408630371 L 8.000102996826172 5.000762939744163e-06 L 15.99947261810303 15.99875545501709 L 16.00020217895508 16.00020408630371 Z M 7.666203022003174 11.52000522613525 C 7.114852905273438 11.52000522613525 6.666302680969238 11.96855545043945 6.666302680969238 12.51990509033203 L 6.666302680969238 13.08059501647949 C 6.666302680969238 13.63194465637207 7.114852905273438 14.08050537109375 7.666203022003174 14.08050537109375 L 8.333103179931641 14.08050537109375 C 8.884452819824219 14.08050537109375 9.333003044128418 13.63194465637207 9.333003044128418 13.08059501647949 L 9.333003044128418 12.51990509033203 C 9.333003044128418 11.96855545043945 8.884452819824219 11.52000522613525 8.333103179931641 11.52000522613525 L 7.666203022003174 11.52000522613525 Z M 6.666302680969238 5.120104789733887 L 7.333202838897705 10.24019527435303 L 8.669702529907227 10.24020481109619 L 9.333003044128418 5.120104789733887 L 6.666302680969238 5.120104789733887 Z" fill="#000000" stroke="none" stroke-width="1" stroke-miterlimit="4" stroke-linecap="butt" /></svg>';

import 'package:flutter/material.dart';
import './xd_page_size.dart';
import 'package:adobe_xd/pinned.dart';
import './xd_test_group.dart';
import './xd_horizontal_layout.dart';
import './xd_vertical_layout.dart';
import './xd_layout_box_components.dart';
import './xd_layout_box_transf_shapes.dart';
import './xd_layout_box_shapes.dart';
import './xd_title_bar.dart';
import 'package:flutter_svg/flutter_svg.dart';

class XDLayout extends StatelessWidget {
  XDLayout({
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
            Pin(start: 282.0, end: 390.0),
            Pin(size: 236.0, start: 60.0),
            child:
                // Adobe XD layer: 'horizontal' (group)
                Stack(
              children: <Widget>[
                Pinned.fromPins(
                  Pin(start: 0.0, end: 0.0),
                  Pin(start: 0.0, endFraction: 0.0),
                  child: XDTestGroup(
                    title: 'Hor:',
                  ),
                ),
                Padding(
                  padding: EdgeInsets.fromLTRB(0.0, 32.0, 0.0, 0.0),
                  child:
                      // Adobe XD layer: 'content' (group)
                      Stack(
                    children: <Widget>[
                      Pinned.fromPins(
                        Pin(end: 0.0, startFraction: 0.75),
                        Pin(start: 0.0, endFraction: 0.5),
                        child:
                            // Adobe XD layer: 'spacer' (shape)
                            Container(
                          color: const Color(0xffe9e9e9),
                        ),
                      ),
                      Pinned.fromPins(
                        Pin(start: 0.0, endFraction: 0.5),
                        Pin(start: 0.0, endFraction: 0.5),
                        child:
                            // Adobe XD layer: 'HorizontalLayout' (component)
                            XDHorizontalLayout(),
                      ),
                      Pinned.fromPins(
                        Pin(start: 0.0, end: 0.0),
                        Pin(end: 0.0, startFraction: 0.5),
                        child:
                            // Adobe XD layer: 'HorizontalLayout' (component)
                            XDHorizontalLayout(),
                      ),
                      Pinned.fromPins(
                        Pin(startFraction: 0.5, endFraction: 0.25),
                        Pin(start: 0.0, endFraction: 0.5),
                        child:
                            // Adobe XD layer: 'HorizontalLayout' (component)
                            XDHorizontalLayout(),
                      ),
                    ],
                  ),
                ),
                Pinned.fromPins(
                  Pin(start: 43.0, end: 4.0),
                  Pin(size: 17.0, start: 7.0),
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
                    textHeightBehavior:
                        TextHeightBehavior(applyHeightToFirstAscent: false),
                  ),
                ),
              ],
            ),
          ),
          Pinned.fromPins(
            Pin(size: 204.0, start: 14.0),
            Pin(start: 308.0, end: 91.0),
            child:
                // Adobe XD layer: 'vertical' (group)
                Stack(
              children: <Widget>[
                Pinned.fromPins(
                  Pin(start: 0.0, end: 0.0),
                  Pin(start: 0.0, endFraction: 0.0),
                  child: XDTestGroup(
                    title: 'Vert:',
                  ),
                ),
                Padding(
                  padding: EdgeInsets.fromLTRB(0.0, 33.0, 0.0, 0.0),
                  child:
                      // Adobe XD layer: 'content' (group)
                      Stack(
                    children: <Widget>[
                      Pinned.fromPins(
                        Pin(start: 0.0, endFraction: 0.5),
                        Pin(start: 0.0, endFraction: 0.5),
                        child:
                            // Adobe XD layer: 'VerticalLayout' (component)
                            XDVerticalLayout(),
                      ),
                      Pinned.fromPins(
                        Pin(start: 0.0, endFraction: 0.5),
                        Pin(startFraction: 0.5, endFraction: 0.25),
                        child:
                            // Adobe XD layer: 'VerticalLayout' (component)
                            XDVerticalLayout(),
                      ),
                      Pinned.fromPins(
                        Pin(end: 0.0, startFraction: 0.5),
                        Pin(start: 0.0, end: 0.0),
                        child:
                            // Adobe XD layer: 'VerticalLayout' (component)
                            XDVerticalLayout(),
                      ),
                      Pinned.fromPins(
                        Pin(start: 0.0, endFraction: 0.5),
                        Pin(end: 0.0, startFraction: 0.75),
                        child:
                            // Adobe XD layer: 'spacer' (shape)
                            Container(
                          color: const Color(0xffe9e9e9),
                        ),
                      ),
                    ],
                  ),
                ),
                Pinned.fromPins(
                  Pin(start: 47.0, end: 6.0),
                  Pin(size: 17.0, start: 7.0),
                  child: SingleChildScrollView(
                    primary: false,
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
                      textHeightBehavior:
                          TextHeightBehavior(applyHeightToFirstAscent: false),
                    ),
                  ),
                ),
              ],
            ),
          ),
          Pinned.fromPins(
            Pin(size: 236.0, end: 142.0),
            Pin(size: 236.0, start: 60.0),
            child:
                // Adobe XD layer: 'note' (group)
                Stack(
              children: <Widget>[
                Pinned.fromPins(
                  Pin(start: 0.0, end: 0.0),
                  Pin(start: 0.0, endFraction: 0.0),
                  child: XDTestGroup(
                    title: 'Note',
                  ),
                ),
                Padding(
                  padding: EdgeInsets.fromLTRB(10.0, 41.0, 11.0, 12.0),
                  child:
                      // Adobe XD layer: 'fixed_size_content' (group)
                      Stack(
                    children: <Widget>[
                      SizedBox.expand(
                          child: Text(
                        'XD uses slightly different (& I think incorrect) positioning math which appears to use a size ratio plus center ratio (?) instead of fractionally positioned edges.\n\nYou can see this in how the inner edges of the bars in row 3 & 4 diverge from the center in XD.',
                        style: TextStyle(
                          fontFamily: 'Arial',
                          fontSize: 14,
                          color: const Color(0xff666666),
                          height: 1.4285714285714286,
                        ),
                        textHeightBehavior:
                            TextHeightBehavior(applyHeightToFirstAscent: false),
                      )),
                    ],
                  ),
                ),
              ],
            ),
          ),
          Pinned.fromPins(
            Pin(start: 230.0, endFraction: 0.4802),
            Pin(start: 308.0, endFraction: 0.0167),
            child:
                // Adobe XD layer: 'boxes' (group)
                Stack(
              children: <Widget>[
                Pinned.fromPins(
                  Pin(start: 0.0, end: 0.0),
                  Pin(start: 0.0, endFraction: 0.0),
                  child: XDTestGroup(
                    title: 'Boxes',
                  ),
                ),
                Padding(
                  padding: EdgeInsets.fromLTRB(16.0, 55.0, 18.0, 27.0),
                  child:
                      // Adobe XD layer: 'content' (group)
                      Stack(
                    children: <Widget>[
                      Align(
                        alignment: Alignment(0.984, -1.0),
                        child: SizedBox(
                          width: 107.0,
                          height: 36.0,
                          child: Text(
                            'Transformed\nShapes',
                            style: TextStyle(
                              fontFamily: 'Arial',
                              fontSize: 14,
                              color: const Color(0xff981a1a),
                            ),
                            textAlign: TextAlign.center,
                          ),
                        ),
                      ),
                      Align(
                        alignment: Alignment.topLeft,
                        child: SizedBox(
                          width: 108.0,
                          height: 36.0,
                          child: Text(
                            'Transformed\nComponents',
                            style: TextStyle(
                              fontFamily: 'Arial',
                              fontSize: 14,
                              color: const Color(0xff981a1a),
                            ),
                            textAlign: TextAlign.center,
                          ),
                        ),
                      ),
                      Align(
                        alignment: Alignment(-1.0, 0.201),
                        child: SizedBox(
                          width: 108.0,
                          height: 35.0,
                          child: Text(
                            'Untransformed\nShapes',
                            style: TextStyle(
                              fontFamily: 'Arial',
                              fontSize: 14,
                              color: const Color(0xff008d00),
                            ),
                            textAlign: TextAlign.center,
                          ),
                        ),
                      ),
                      Pinned.fromPins(
                        Pin(start: 0.0, endFraction: 0.5404),
                        Pin(start: 40.0, endFraction: 0.5346),
                        child:
                            // Adobe XD layer: 'LayoutBoxComponents' (component)
                            XDLayoutBoxComponents(),
                      ),
                      Pinned.fromPins(
                        Pin(end: 0.0, startFraction: 0.5404),
                        Pin(start: 40.0, endFraction: 0.5346),
                        child:
                            // Adobe XD layer: 'LayoutBoxTransfShap…' (component)
                            XDLayoutBoxTransfShapes(),
                      ),
                      Pinned.fromPins(
                        Pin(startFraction: 0.0, endFraction: 0.5404),
                        Pin(end: 0.0, startFraction: 0.6604),
                        child:
                            // Adobe XD layer: 'LayoutBoxShapes' (component)
                            XDLayoutBoxShapes(),
                      ),
                    ],
                  ),
                ),
              ],
            ),
          ),
          Pinned.fromPins(
            Pin(size: 256.0, start: 14.0),
            Pin(size: 236.0, start: 60.0),
            child:
                // Adobe XD layer: 'staticTransformation' (group)
                Stack(
              children: <Widget>[
                Pinned.fromPins(
                  Pin(start: 0.0, end: 0.0),
                  Pin(start: 0.0, endFraction: 0.0),
                  child: XDTestGroup(
                    title: 'Static Transformation',
                  ),
                ),
                Transform.translate(
                  offset: Offset(10.0, 43.0),
                  child: SizedBox(
                    width: 236.0,
                    height: 152.0,
                    child:
                        // Adobe XD layer: 'static' (group)
                        Stack(
                      children: <Widget>[
                        SizedBox(
                          width: 236.0,
                          height: 63.0,
                          child:
                              // Adobe XD layer: 'rotation' (group)
                              Stack(
                            children: <Widget>[
                              SizedBox(
                                width: 236.0,
                                height: 15.0,
                                child: SingleChildScrollView(
                                  primary: false,
                                  child: Text(
                                    'rotation',
                                    style: TextStyle(
                                      fontFamily: 'Arial',
                                      fontSize: 14,
                                      color: const Color(0xff008d00),
                                    ),
                                  ),
                                ),
                              ),
                              Transform.translate(
                                offset: Offset(6.0, 25.0),
                                child: Transform.rotate(
                                  angle: 0.5236,
                                  child:
                                      // Adobe XD layer: 'rect' (shape)
                                      Container(
                                    width: 32.0,
                                    height: 32.0,
                                    decoration: BoxDecoration(
                                      gradient: LinearGradient(
                                        begin: Alignment(0.0, -1.0),
                                        end: Alignment(0.0, 1.0),
                                        colors: [
                                          const Color(0xff008d00),
                                          const Color(0xff0aff0a)
                                        ],
                                        stops: [0.0, 1.0],
                                      ),
                                    ),
                                  ),
                                ),
                              ),
                              Transform.translate(
                                offset: Offset(53.0, 27.0),
                                child: SizedBox(
                                  width: 32.0,
                                  height: 28.0,
                                  child: Transform.rotate(
                                    angle: 0.5236,
                                    child: Text(
                                      'ok',
                                      style: TextStyle(
                                        fontFamily: 'Arial',
                                        fontSize: 20,
                                        color: const Color(0xff008d00),
                                        fontWeight: FontWeight.w700,
                                      ),
                                      textAlign: TextAlign.center,
                                    ),
                                  ),
                                ),
                              ),
                              Transform.translate(
                                offset: Offset(94.1, 15.1),
                                child: SizedBox(
                                  width: 44.0,
                                  height: 44.0,
                                  child: SvgPicture.string(
                                    _svg_n90ne2,
                                    allowDrawingOutsideViewBox: true,
                                  ),
                                ),
                              ),
                              Transform.translate(
                                offset: Offset(147.9, 25.0),
                                child: SizedBox(
                                  width: 33.0,
                                  height: 32.0,
                                  child: Transform.rotate(
                                    angle: 0.5236,
                                    child:
                                        // Adobe XD layer: 'group' (group)
                                        Stack(
                                      children: <Widget>[
                                        Transform.translate(
                                          offset: Offset(1.0, 0.0),
                                          child: Container(
                                            width: 32.0,
                                            height: 32.0,
                                            decoration: BoxDecoration(
                                              gradient: LinearGradient(
                                                begin: Alignment(0.0, -1.0),
                                                end: Alignment(0.0, 1.0),
                                                colors: [
                                                  const Color(0xff008d00),
                                                  const Color(0xff0aff0a)
                                                ],
                                                stops: [0.0, 1.0],
                                              ),
                                            ),
                                          ),
                                        ),
                                        Transform.translate(
                                          offset: Offset(0.0, 2.3),
                                          child: SizedBox(
                                            width: 32.0,
                                            height: 26.0,
                                            child: Text(
                                              'ok',
                                              style: TextStyle(
                                                fontFamily: 'Arial',
                                                fontSize: 22,
                                                color: const Color(0xffffffff),
                                                fontWeight: FontWeight.w700,
                                              ),
                                              textAlign: TextAlign.center,
                                            ),
                                          ),
                                        ),
                                      ],
                                    ),
                                  ),
                                ),
                              ),
                              Transform.translate(
                                offset: Offset(197.8, 23.3),
                                child: SizedBox(
                                  width: 32.0,
                                  height: 34.0,
                                  child: Transform.rotate(
                                    angle: 0.5236,
                                    child:
                                        // Adobe XD layer: 'group2' (group)
                                        Stack(
                                      children: <Widget>[
                                        Transform.translate(
                                          offset: Offset(0.0, 1.7),
                                          child: Container(
                                            width: 32.0,
                                            height: 32.0,
                                            decoration: BoxDecoration(
                                              gradient: LinearGradient(
                                                begin: Alignment(0.0, -1.0),
                                                end: Alignment(0.0, 1.0),
                                                colors: [
                                                  const Color(0xff008d00),
                                                  const Color(0xff0aff0a)
                                                ],
                                                stops: [0.0, 1.0],
                                              ),
                                            ),
                                          ),
                                        ),
                                        Transform.translate(
                                          offset: Offset(-2.0, 3.0),
                                          child: SizedBox(
                                            width: 32.0,
                                            height: 26.0,
                                            child: Transform.rotate(
                                              angle: 1.5708,
                                              child: Text(
                                                'ok',
                                                style: TextStyle(
                                                  fontFamily: 'Arial',
                                                  fontSize: 22,
                                                  color:
                                                      const Color(0xffffffff),
                                                  fontWeight: FontWeight.w700,
                                                ),
                                                textAlign: TextAlign.center,
                                              ),
                                            ),
                                          ),
                                        ),
                                      ],
                                    ),
                                  ),
                                ),
                              ),
                              Transform.translate(
                                offset: Offset(0.0, 18.0),
                                child:
                                    // Adobe XD layer: 'outline' (shape)
                                    Container(
                                  width: 236.0,
                                  height: 45.0,
                                  decoration: BoxDecoration(
                                    border: Border.all(
                                        width: 1.0,
                                        color: const Color(0xff707070)),
                                  ),
                                ),
                              ),
                            ],
                          ),
                        ),
                        Transform.translate(
                          offset: Offset(0.0, 85.0),
                          child: SizedBox(
                            width: 236.0,
                            height: 67.0,
                            child:
                                // Adobe XD layer: 'flip' (group)
                                Stack(
                              children: <Widget>[
                                Transform.translate(
                                  offset: Offset(1.0, 0.0),
                                  child: SizedBox(
                                    width: 235.0,
                                    height: 19.0,
                                    child: Text(
                                      'flip',
                                      style: TextStyle(
                                        fontFamily: 'Arial',
                                        fontSize: 14,
                                        color: const Color(0xff008d00),
                                      ),
                                    ),
                                  ),
                                ),
                                Transform.translate(
                                  offset: Offset(6.0, 26.0),
                                  child:
                                      // Adobe XD layer: 'rect' (shape)
                                      Container(
                                    width: 32.0,
                                    height: 32.0,
                                    decoration: BoxDecoration(
                                      gradient: LinearGradient(
                                        begin: Alignment(0.0, 1.0),
                                        end: Alignment(0.0, -1.0),
                                        colors: [
                                          const Color(0xff008d00),
                                          const Color(0xff0aff0a)
                                        ],
                                        stops: [0.0, 1.0],
                                      ),
                                    ),
                                  ),
                                ),
                                Transform.translate(
                                  offset: Offset(53.0, 28.0),
                                  child: SizedBox(
                                    width: 32.0,
                                    height: 28.0,
                                    child: Transform(
                                      alignment: Alignment.center,
                                      transform: Matrix4.identity()
                                        ..rotateZ(3.1416)
                                        ..scale(1.0, -1.0),
                                      child: Text(
                                        'ok',
                                        style: TextStyle(
                                          fontFamily: 'Arial',
                                          fontSize: 20,
                                          color: const Color(0xff008d00),
                                          fontWeight: FontWeight.w700,
                                        ),
                                        textAlign: TextAlign.center,
                                      ),
                                    ),
                                  ),
                                ),
                                Transform.translate(
                                  offset: Offset(81.1, 23.3),
                                  child: SizedBox(
                                    width: 44.0,
                                    height: 44.0,
                                    child: SvgPicture.string(
                                      _svg_txpeua,
                                      allowDrawingOutsideViewBox: true,
                                    ),
                                  ),
                                ),
                                Transform.translate(
                                  offset: Offset(147.9, 26.0),
                                  child: SizedBox(
                                    width: 33.0,
                                    height: 32.0,
                                    child:
                                        // Adobe XD layer: 'group' (group)
                                        Stack(
                                      children: <Widget>[
                                        Container(
                                          width: 32.0,
                                          height: 32.0,
                                          decoration: BoxDecoration(
                                            gradient: LinearGradient(
                                              begin: Alignment(0.0, -1.0),
                                              end: Alignment(0.0, 1.0),
                                              colors: [
                                                const Color(0xff008d00),
                                                const Color(0xff0aff0a)
                                              ],
                                              stops: [0.0, 1.0],
                                            ),
                                          ),
                                        ),
                                        Transform.translate(
                                          offset: Offset(1.0, 2.3),
                                          child: SizedBox(
                                            width: 32.0,
                                            height: 26.0,
                                            child: Transform(
                                              alignment: Alignment.center,
                                              transform: Matrix4.identity()
                                                ..rotateZ(3.1416)
                                                ..scale(1.0, -1.0),
                                              child: Text(
                                                'ok',
                                                style: TextStyle(
                                                  fontFamily: 'Arial',
                                                  fontSize: 22,
                                                  color:
                                                      const Color(0xffffffff),
                                                  fontWeight: FontWeight.w700,
                                                ),
                                                textAlign: TextAlign.center,
                                              ),
                                            ),
                                          ),
                                        ),
                                      ],
                                    ),
                                  ),
                                ),
                                Transform.translate(
                                  offset: Offset(195.9, 26.0),
                                  child: SizedBox(
                                    width: 33.0,
                                    height: 32.0,
                                    child:
                                        // Adobe XD layer: 'group2' (group)
                                        Stack(
                                      children: <Widget>[
                                        Transform.translate(
                                          offset: Offset(1.0, 0.0),
                                          child: Container(
                                            width: 32.0,
                                            height: 32.0,
                                            decoration: BoxDecoration(
                                              gradient: LinearGradient(
                                                begin: Alignment(0.0, 1.0),
                                                end: Alignment(0.0, -1.0),
                                                colors: [
                                                  const Color(0xff008d00),
                                                  const Color(0xff0aff0a)
                                                ],
                                                stops: [0.0, 1.0],
                                              ),
                                            ),
                                          ),
                                        ),
                                        Transform.translate(
                                          offset: Offset(0.0, 3.7),
                                          child: SizedBox(
                                            width: 32.0,
                                            height: 26.0,
                                            child: Transform.rotate(
                                              angle: 3.1416,
                                              child: Text(
                                                'ok',
                                                style: TextStyle(
                                                  fontFamily: 'Arial',
                                                  fontSize: 22,
                                                  color:
                                                      const Color(0xffffffff),
                                                  fontWeight: FontWeight.w700,
                                                ),
                                                textAlign: TextAlign.center,
                                              ),
                                            ),
                                          ),
                                        ),
                                      ],
                                    ),
                                  ),
                                ),
                                Transform.translate(
                                  offset: Offset(0.0, 19.0),
                                  child:
                                      // Adobe XD layer: 'outline' (shape)
                                      Container(
                                    width: 236.0,
                                    height: 45.0,
                                    decoration: BoxDecoration(
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
                ),
              ],
            ),
          ),
          Pinned.fromPins(
            Pin(end: 144.0, startFraction: 0.5323),
            Pin(start: 308.0, end: 12.0),
            child:
                // Adobe XD layer: 'simplification' (group)
                Stack(
              children: <Widget>[
                Pinned.fromPins(
                  Pin(start: 0.0, end: 0.0),
                  Pin(start: 0.0, endFraction: 0.0),
                  child: XDTestGroup(
                    title: 'Simplification',
                  ),
                ),
                Padding(
                  padding: EdgeInsets.fromLTRB(42.5, 52.0, 42.5, 39.3),
                  child:
                      // Adobe XD layer: 'content' (group)
                      Stack(
                    children: <Widget>[
                      Align(
                        alignment: Alignment.topLeft,
                        child: SizedBox(
                          width: 100.0,
                          height: 31.0,
                          child: SingleChildScrollView(
                            primary: false,
                            child: Text(
                              'Align & Center\n(unpinned)',
                              style: TextStyle(
                                fontFamily: 'Arial',
                                fontSize: 14,
                                color: const Color(0xff008d00),
                              ),
                              textAlign: TextAlign.center,
                            ),
                          ),
                        ),
                      ),
                      Pinned.fromPins(
                        Pin(startFraction: 0.0, endFraction: 0.5455),
                        Pin(size: 31.1, middle: 0.5956),
                        child: SingleChildScrollView(
                          primary: false,
                          child: Text(
                            'Margins\n(Container)',
                            style: TextStyle(
                              fontFamily: 'Arial',
                              fontSize: 14,
                              color: const Color(0xff008d00),
                            ),
                            textAlign: TextAlign.center,
                          ),
                        ),
                      ),
                      Align(
                        alignment: Alignment.topRight,
                        child: SizedBox(
                          width: 100.0,
                          height: 31.0,
                          child: SingleChildScrollView(
                            primary: false,
                            child: Text(
                              'Align\n(pinned)',
                              style: TextStyle(
                                fontFamily: 'Arial',
                                fontSize: 14,
                                color: const Color(0xff008d00),
                              ),
                              textAlign: TextAlign.center,
                            ),
                          ),
                        ),
                      ),
                      Pinned.fromPins(
                        Pin(startFraction: 0.5455, endFraction: 0.0),
                        Pin(size: 31.1, middle: 0.5956),
                        child: SingleChildScrollView(
                          primary: false,
                          child: Text(
                            'Padding\n(Others)',
                            style: TextStyle(
                              fontFamily: 'Arial',
                              fontSize: 14,
                              color: const Color(0xff008d00),
                            ),
                            textAlign: TextAlign.center,
                          ),
                        ),
                      ),
                      Pinned.fromPins(
                        Pin(start: 0.0, endFraction: 0.5455),
                        Pin(start: 43.1, endFraction: 0.5357),
                        child:
                            // Adobe XD layer: 'align_unpinned' (group)
                            Stack(
                          children: <Widget>[
                            // Adobe XD layer: 'bg' (shape)
                            Container(
                              decoration: BoxDecoration(
                                color: const Color(0xffffffff),
                                border: Border.all(
                                    width: 1.0, color: const Color(0xff707070)),
                              ),
                            ),
                            Align(
                              alignment: Alignment.bottomRight,
                              child:
                                  // Adobe XD layer: 'bottomRight' (shape)
                                  Container(
                                width: 20.0,
                                height: 20.0,
                                color: const Color(0xff0b8d1e),
                              ),
                            ),
                            Align(
                              alignment: Alignment.bottomCenter,
                              child:
                                  // Adobe XD layer: 'bottomCenter' (shape)
                                  Container(
                                width: 20.0,
                                height: 20.0,
                                color: const Color(0xff0b8d1e),
                              ),
                            ),
                            Align(
                              alignment: Alignment.bottomLeft,
                              child:
                                  // Adobe XD layer: 'bottomLeft' (shape)
                                  Container(
                                width: 20.0,
                                height: 20.0,
                                color: const Color(0xff0b8d1e),
                              ),
                            ),
                            Align(
                              alignment: Alignment.centerRight,
                              child:
                                  // Adobe XD layer: 'centerRight' (shape)
                                  Container(
                                width: 20.0,
                                height: 20.0,
                                color: const Color(0xff0b8d1e),
                              ),
                            ),
                            Center(
                              child:
                                  // Adobe XD layer: 'center' (shape)
                                  Container(
                                width: 20.0,
                                height: 20.0,
                                color: const Color(0xff62038d),
                              ),
                            ),
                            Align(
                              alignment: Alignment.centerLeft,
                              child:
                                  // Adobe XD layer: 'centerLeft' (shape)
                                  Container(
                                width: 20.0,
                                height: 20.0,
                                color: const Color(0xff0b8d1e),
                              ),
                            ),
                            Align(
                              alignment: Alignment.topRight,
                              child:
                                  // Adobe XD layer: 'topRight' (shape)
                                  Container(
                                width: 20.0,
                                height: 20.0,
                                color: const Color(0xff0b8d1e),
                              ),
                            ),
                            Align(
                              alignment: Alignment.topCenter,
                              child:
                                  // Adobe XD layer: 'topCenter' (shape)
                                  Container(
                                width: 20.0,
                                height: 20.0,
                                color: const Color(0xff0b8d1e),
                              ),
                            ),
                            Align(
                              alignment: Alignment.topLeft,
                              child:
                                  // Adobe XD layer: 'topLeft' (shape)
                                  Container(
                                width: 20.0,
                                height: 20.0,
                                color: const Color(0xff0b8d1e),
                              ),
                            ),
                            Align(
                              alignment: Alignment(-0.5, -0.5),
                              child:
                                  // Adobe XD layer: 'alignment' (shape)
                                  Container(
                                width: 20.0,
                                height: 20.0,
                                color: const Color(0xff62038d),
                              ),
                            ),
                          ],
                        ),
                      ),
                      Pinned.fromPins(
                        Pin(end: 0.0, startFraction: 0.5455),
                        Pin(start: 43.1, endFraction: 0.5357),
                        child:
                            // Adobe XD layer: 'align_pinned' (group)
                            Stack(
                          children: <Widget>[
                            // Adobe XD layer: 'bg' (shape)
                            Container(
                              decoration: BoxDecoration(
                                color: const Color(0xffffffff),
                                border: Border.all(
                                    width: 1.0, color: const Color(0xff707070)),
                              ),
                            ),
                            Align(
                              alignment: Alignment.bottomRight,
                              child:
                                  // Adobe XD layer: 'bottomRight' (shape)
                                  Container(
                                width: 20.0,
                                height: 20.0,
                                color: const Color(0xff0b8d1e),
                              ),
                            ),
                            Align(
                              alignment: Alignment.bottomCenter,
                              child:
                                  // Adobe XD layer: 'bottomCenter' (shape)
                                  Container(
                                width: 20.0,
                                height: 20.0,
                                color: const Color(0xff0b8d1e),
                              ),
                            ),
                            Align(
                              alignment: Alignment.bottomLeft,
                              child:
                                  // Adobe XD layer: 'bottomLeft' (shape)
                                  Container(
                                width: 20.0,
                                height: 20.0,
                                color: const Color(0xff0b8d1e),
                              ),
                            ),
                            Align(
                              alignment: Alignment.centerRight,
                              child:
                                  // Adobe XD layer: 'centerRight' (shape)
                                  Container(
                                width: 20.0,
                                height: 20.0,
                                color: const Color(0xff0b8d1e),
                              ),
                            ),
                            Align(
                              alignment: Alignment.topRight,
                              child:
                                  // Adobe XD layer: 'topRight' (shape)
                                  Container(
                                width: 20.0,
                                height: 20.0,
                                color: const Color(0xff0b8d1e),
                              ),
                            ),
                            Align(
                              alignment: Alignment.centerLeft,
                              child:
                                  // Adobe XD layer: 'centerLeft' (shape)
                                  Container(
                                width: 20.0,
                                height: 20.0,
                                color: const Color(0xff0b8d1e),
                              ),
                            ),
                            Align(
                              alignment: Alignment.topCenter,
                              child:
                                  // Adobe XD layer: 'topCenter' (shape)
                                  Container(
                                width: 20.0,
                                height: 20.0,
                                color: const Color(0xff0b8d1e),
                              ),
                            ),
                            Align(
                              alignment: Alignment.topLeft,
                              child:
                                  // Adobe XD layer: 'topLeft' (shape)
                                  Container(
                                width: 20.0,
                                height: 20.0,
                                color: const Color(0xff0b8d1e),
                              ),
                            ),
                          ],
                        ),
                      ),
                      Pinned.fromPins(
                        Pin(start: 0.0, endFraction: 0.5455),
                        Pin(end: 0.0, startFraction: 0.6753),
                        child:
                            // Adobe XD layer: 'padding_container' (group)
                            Stack(
                          children: <Widget>[
                            // Adobe XD layer: 'bg' (shape)
                            Container(
                              decoration: BoxDecoration(
                                color: const Color(0xffffffff),
                                border: Border.all(
                                    width: 1.0, color: const Color(0xff707070)),
                              ),
                            ),
                            // Adobe XD layer: 'all' (shape)
                            Container(
                              color: const Color(0xff0b8d1e),
                              margin: EdgeInsets.all(30.0),
                            ),
                            // Adobe XD layer: 'symmetric' (shape)
                            Container(
                              color: const Color(0xff62038d),
                              margin: EdgeInsets.symmetric(
                                  horizontal: 45.0, vertical: 10.0),
                            ),
                            // Adobe XD layer: 'fromLTRB' (shape)
                            Container(
                              color: const Color(0xff62038d),
                              margin:
                                  EdgeInsets.fromLTRB(10.0, 10.0, 70.0, 70.2),
                            ),
                          ],
                        ),
                      ),
                      Pinned.fromPins(
                        Pin(end: 0.0, startFraction: 0.5455),
                        Pin(end: 0.0, startFraction: 0.6753),
                        child:
                            // Adobe XD layer: 'padding_shape' (group)
                            Stack(
                          children: <Widget>[
                            // Adobe XD layer: 'bg' (shape)
                            Container(
                              decoration: BoxDecoration(
                                color: const Color(0xffffffff),
                                border: Border.all(
                                    width: 1.0, color: const Color(0xff707070)),
                              ),
                            ),
                            Padding(
                              padding: EdgeInsets.all(30.0),
                              child: SizedBox.expand(
                                  child:
                                      // Adobe XD layer: 'all' (shape)
                                      SvgPicture.string(
                                _svg_mp7jt3,
                                allowDrawingOutsideViewBox: true,
                                fit: BoxFit.fill,
                              )),
                            ),
                            Padding(
                              padding: EdgeInsets.symmetric(
                                  horizontal: 45.0, vertical: 10.0),
                              child: SizedBox.expand(
                                  child:
                                      // Adobe XD layer: 'symmetric' (shape)
                                      SvgPicture.string(
                                _svg_v9s4uq,
                                allowDrawingOutsideViewBox: true,
                                fit: BoxFit.fill,
                              )),
                            ),
                            Padding(
                              padding:
                                  EdgeInsets.fromLTRB(10.0, 10.0, 70.0, 70.2),
                              child: SizedBox.expand(
                                  child:
                                      // Adobe XD layer: 'fromLTRB' (shape)
                                      SvgPicture.string(
                                _svg_l2zojg,
                                allowDrawingOutsideViewBox: true,
                                fit: BoxFit.fill,
                              )),
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
            Pin(start: 0.0, end: 0.0),
            Pin(size: 48.0, start: 0.0),
            child:
                // Adobe XD layer: 'TitleBar' (component)
                XDTitleBar(
              title: 'Layout & Positioning',
            ),
          ),
        ],
      ),
    );
  }
}

const String _svg_n90ne2 =
    '<svg viewBox="107.1 58.1 43.7 43.7" ><defs><linearGradient id="gradient" x1="0.5" y1="0.0" x2="0.5" y2="1.0"><stop offset="0.0" stop-color="#008d00" /><stop offset="1.0" stop-color="#00ff00" /></linearGradient></defs><path transform="matrix(0.866025, 0.5, -0.5, 0.866025, 123.14, 58.14)" d="M 15.99999809265137 0 L 31.99999809265137 32 L 0 32 Z" fill="url(#gradient)" stroke="none" stroke-width="1" stroke-miterlimit="4" stroke-linecap="butt" /></svg>';
const String _svg_txpeua =
    '<svg viewBox="94.1 151.3 43.7 43.7" ><defs><linearGradient id="gradient" x1="0.5" y1="0.0" x2="0.5" y2="1.0"><stop offset="0.0" stop-color="#008d00" /><stop offset="1.0" stop-color="#00ff00" /></linearGradient></defs><path transform="matrix(-0.866025, -0.5, 0.5, -0.866025, 121.86, 195.0)" d="M 15.99998378753662 0 L 31.99996948242188 31.99996566772461 L 0 31.99996566772461 Z" fill="url(#gradient)" stroke="none" stroke-width="1" stroke-miterlimit="4" stroke-linecap="butt" /></svg>';
const String _svg_mp7jt3 =
    '<svg viewBox="30.0 30.1 40.0 40.0" ><path transform="translate(30.0, 30.08)" d="M 0 0 L 40 0 L 34.162109375 18.7945556640625 L 40 40 L 0 40 L 0 0 Z" fill="#0b8d1e" stroke="none" stroke-width="1" stroke-miterlimit="4" stroke-linecap="butt" /></svg>';
const String _svg_v9s4uq =
    '<svg viewBox="45.0 10.0 10.0 80.2" ><path transform="translate(45.0, 10.03)" d="M 0 0 L 10 0 L 6.78515625 41.5888671875 L 10 80.20050048828125 L 0 80.20050048828125 L 0 0 Z" fill="#62038d" stroke="none" stroke-width="1" stroke-miterlimit="4" stroke-linecap="butt" /></svg>';
const String _svg_l2zojg =
    '<svg viewBox="10.0 10.0 20.0 20.1" ><path transform="translate(10.0, 10.03)" d="M 0 0 L 20 0 L 15.9765625 9.0771484375 L 20 20.05012512207031 L 0 20.05012512207031 L 0 0 Z" fill="#62038d" stroke="none" stroke-width="1" stroke-miterlimit="4" stroke-linecap="butt" /></svg>';

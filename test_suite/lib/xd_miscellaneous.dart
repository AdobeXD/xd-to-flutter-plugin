import 'package:flutter/material.dart';
import './xd_page_size.dart';
import 'package:adobe_xd/pinned.dart';
import './xd_test_group.dart';
import './xd_transition_target.dart';
import 'package:adobe_xd/page_link.dart';
import './xd_btn.dart';
import './xd_on_tap_component.dart';
import './xd_component251.dart';
import './xd_layout_box_shapes.dart';
import 'package:adobe_xd/gradient_xd_transform.dart';
import 'package:adobe_xd/blend_mask.dart';
import './xd_title_bar.dart';
import 'package:flutter_svg/flutter_svg.dart';

class XDMiscellaneous extends StatelessWidget {
  final VoidCallback? onTapTestInstance;
  XDMiscellaneous({
    Key? key,
    this.onTapTestInstance,
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
            Pin(start: 16.0, end: 16.0),
            Pin(size: 151.0, start: 60.0),
            child:
                // Adobe XD layer: 'interactions' (group)
                Stack(
              children: <Widget>[
                Pinned.fromPins(
                  Pin(start: 0.0, end: 0.0),
                  Pin(start: 0.0, endFraction: 0.0),
                  child: XDTestGroup(
                    title: 'Interactions',
                  ),
                ),
                Pinned.fromPins(
                  Pin(size: 672.0, start: 20.0),
                  Pin(size: 103.0, start: 48.0),
                  child:
                      // Adobe XD layer: 'fixed_size_content' (group)
                      Stack(
                    children: <Widget>[
                      PageLink(
                        links: [
                          PageLinkInfo(
                            transition: LinkTransition.SlideUp,
                            ease: Curves.easeOut,
                            duration: 0.3,
                            pageBuilder: () => XDTransitionTarget(),
                          ),
                        ],
                        child: Container(
                          decoration: BoxDecoration(
                            color: const Color(0xffffffff),
                            borderRadius: BorderRadius.circular(8.0),
                            border: Border.all(
                                width: 1.0, color: const Color(0xfff0f0f0)),
                            boxShadow: [
                              BoxShadow(
                                color: const Color(0x0f000000),
                                offset: Offset(0, 1),
                                blurRadius: 3,
                              ),
                            ],
                          ),
                          margin: EdgeInsets.fromLTRB(31.0, 22.0, 609.0, 49.0),
                        ),
                      ),
                      PageLink(
                        links: [
                          PageLinkInfo(
                            transition: LinkTransition.SlideLeft,
                            ease: Curves.easeOut,
                            duration: 0.3,
                            pageBuilder: () => XDTransitionTarget(),
                          ),
                        ],
                        child: Container(
                          decoration: BoxDecoration(
                            color: const Color(0xffffffff),
                            borderRadius: BorderRadius.circular(8.0),
                            border: Border.all(
                                width: 1.0, color: const Color(0xfff0f0f0)),
                            boxShadow: [
                              BoxShadow(
                                color: const Color(0x0f000000),
                                offset: Offset(0, 1),
                                blurRadius: 3,
                              ),
                            ],
                          ),
                          margin: EdgeInsets.fromLTRB(0.0, 38.0, 640.0, 33.0),
                        ),
                      ),
                      PageLink(
                        links: [
                          PageLinkInfo(
                            transition: LinkTransition.SlideRight,
                            ease: Curves.easeOut,
                            duration: 0.3,
                            pageBuilder: () => XDTransitionTarget(),
                          ),
                        ],
                        child: Container(
                          decoration: BoxDecoration(
                            color: const Color(0xffffffff),
                            borderRadius: BorderRadius.circular(8.0),
                            border: Border.all(
                                width: 1.0, color: const Color(0xfff0f0f0)),
                            boxShadow: [
                              BoxShadow(
                                color: const Color(0x0f000000),
                                offset: Offset(0, 1),
                                blurRadius: 3,
                              ),
                            ],
                          ),
                          margin: EdgeInsets.fromLTRB(63.0, 38.0, 577.0, 33.0),
                        ),
                      ),
                      PageLink(
                        links: [
                          PageLinkInfo(
                            transition: LinkTransition.SlideDown,
                            ease: Curves.easeOut,
                            duration: 0.3,
                            pageBuilder: () => XDTransitionTarget(),
                          ),
                        ],
                        child: Container(
                          decoration: BoxDecoration(
                            color: const Color(0xffffffff),
                            borderRadius: BorderRadius.circular(8.0),
                            border: Border.all(
                                width: 1.0, color: const Color(0xfff0f0f0)),
                            boxShadow: [
                              BoxShadow(
                                color: const Color(0x0f000000),
                                offset: Offset(0, 1),
                                blurRadius: 3,
                              ),
                            ],
                          ),
                          margin: EdgeInsets.fromLTRB(32.0, 54.0, 608.0, 17.0),
                        ),
                      ),
                      Align(
                        alignment: Alignment.topLeft,
                        child: SizedBox(
                          width: 96.0,
                          height: 16.0,
                          child: Text(
                            'Slide Transition',
                            style: TextStyle(
                              fontFamily: 'Arial',
                              fontSize: 14,
                              color: const Color(0xff008d00),
                            ),
                            textAlign: TextAlign.center,
                            softWrap: false,
                          ),
                        ),
                      ),
                      PageLink(
                        links: [
                          PageLinkInfo(
                            transition: LinkTransition.PushUp,
                            ease: Curves.easeOut,
                            duration: 0.3,
                            pageBuilder: () => XDTransitionTarget(),
                          ),
                        ],
                        child: Container(
                          decoration: BoxDecoration(
                            color: const Color(0xffffffff),
                            borderRadius: BorderRadius.circular(8.0),
                            border: Border.all(
                                width: 1.0, color: const Color(0xfff0f0f0)),
                            boxShadow: [
                              BoxShadow(
                                color: const Color(0x0f000000),
                                offset: Offset(0, 1),
                                blurRadius: 3,
                              ),
                            ],
                          ),
                          margin: EdgeInsets.fromLTRB(143.0, 22.0, 497.0, 49.0),
                        ),
                      ),
                      PageLink(
                        links: [
                          PageLinkInfo(
                            transition: LinkTransition.PushLeft,
                            ease: Curves.easeOut,
                            duration: 0.3,
                            pageBuilder: () => XDTransitionTarget(),
                          ),
                        ],
                        child: Container(
                          decoration: BoxDecoration(
                            color: const Color(0xffffffff),
                            borderRadius: BorderRadius.circular(8.0),
                            border: Border.all(
                                width: 1.0, color: const Color(0xfff0f0f0)),
                            boxShadow: [
                              BoxShadow(
                                color: const Color(0x0f000000),
                                offset: Offset(0, 1),
                                blurRadius: 3,
                              ),
                            ],
                          ),
                          margin: EdgeInsets.fromLTRB(112.0, 38.0, 528.0, 33.0),
                        ),
                      ),
                      PageLink(
                        links: [
                          PageLinkInfo(
                            transition: LinkTransition.PushRight,
                            ease: Curves.easeOut,
                            duration: 0.3,
                            pageBuilder: () => XDTransitionTarget(),
                          ),
                        ],
                        child: Container(
                          decoration: BoxDecoration(
                            color: const Color(0xffffffff),
                            borderRadius: BorderRadius.circular(8.0),
                            border: Border.all(
                                width: 1.0, color: const Color(0xfff0f0f0)),
                            boxShadow: [
                              BoxShadow(
                                color: const Color(0x0f000000),
                                offset: Offset(0, 1),
                                blurRadius: 3,
                              ),
                            ],
                          ),
                          margin: EdgeInsets.fromLTRB(175.0, 38.0, 465.0, 33.0),
                        ),
                      ),
                      PageLink(
                        links: [
                          PageLinkInfo(
                            transition: LinkTransition.PushDown,
                            ease: Curves.easeOut,
                            duration: 0.3,
                            pageBuilder: () => XDTransitionTarget(),
                          ),
                        ],
                        child: Container(
                          decoration: BoxDecoration(
                            color: const Color(0xffffffff),
                            borderRadius: BorderRadius.circular(8.0),
                            border: Border.all(
                                width: 1.0, color: const Color(0xfff0f0f0)),
                            boxShadow: [
                              BoxShadow(
                                color: const Color(0x0f000000),
                                offset: Offset(0, 1),
                                blurRadius: 3,
                              ),
                            ],
                          ),
                          margin: EdgeInsets.fromLTRB(144.0, 54.0, 496.0, 17.0),
                        ),
                      ),
                      Align(
                        alignment: Alignment(-0.611, -1.0),
                        child: SizedBox(
                          width: 96.0,
                          height: 16.0,
                          child: Text(
                            'Push Transition',
                            style: TextStyle(
                              fontFamily: 'Arial',
                              fontSize: 14,
                              color: const Color(0xffc37f00),
                            ),
                            textAlign: TextAlign.center,
                            softWrap: false,
                          ),
                        ),
                      ),
                      Align(
                        alignment: Alignment(-0.558, 1.0),
                        child: SizedBox(
                          width: 38.0,
                          height: 17.0,
                          child: Text(
                            '#92',
                            style: TextStyle(
                              fontFamily: 'Arial',
                              fontSize: 14,
                              color: const Color(0xffc37f00),
                            ),
                            textAlign: TextAlign.center,
                          ),
                        ),
                      ),
                      Align(
                        alignment: Alignment(-0.176, -1.0),
                        child: SizedBox(
                          width: 128.0,
                          height: 32.0,
                          child:
                              // Adobe XD layer: 'Btn' (component)
                              PageLink(
                            links: [
                              PageLinkInfo(
                                transition: LinkTransition.Fade,
                                ease: Curves.linear,
                                duration: 0.5,
                                pageBuilder: () => XDTransitionTarget(),
                              ),
                            ],
                            child: XDBtn(
                              label: '0.5s Dissolve',
                              labelColor: const Color(0xff008d00),
                            ),
                          ),
                        ),
                      ),
                      Align(
                        alignment: Alignment(0.353, -1.0),
                        child: SizedBox(
                          width: 128.0,
                          height: 32.0,
                          child:
                              // Adobe XD layer: 'Btn' (component)
                              PageLink(
                            links: [
                              PageLinkInfo(
                                transition: LinkTransition.PushDown,
                                ease: Curves.bounceIn,
                                duration: 1.0,
                                pageBuilder: () => XDTransitionTarget(),
                              ),
                            ],
                            child: XDBtn(
                              label: '1s Bounce',
                              labelColor: const Color(0xff008d00),
                            ),
                          ),
                        ),
                      ),
                      Align(
                        alignment: Alignment.topRight,
                        child: SizedBox(
                          width: 128.0,
                          height: 32.0,
                          child: GestureDetector(
                            onTap: () => onTapTestInstance?.call(),
                            child: Stack(
                              children: <Widget>[
                                // Adobe XD layer: 'Btn' (component)
                                XDBtn(
                                  label: 'onTap Param',
                                  labelColor: const Color(0xff008d00),
                                ),
                              ],
                            ),
                          ),
                        ),
                      ),
                      Align(
                        alignment: Alignment(1.0, 0.352),
                        child: SizedBox(
                          width: 128.0,
                          height: 32.0,
                          child:
                              // Adobe XD layer: 'OnTapComponent' (component)
                              XDOnTapComponent(
                            label: 'onTap Comp',
                            labelColor: const Color(0xff008d00),
                          ),
                        ),
                      ),
                      Align(
                        alignment: Alignment(-0.176, 0.352),
                        child: SizedBox(
                          width: 128.0,
                          height: 32.0,
                          child:
                              // Adobe XD layer: 'Btn' (component)
                              PageLink(
                            links: [
                              PageLinkInfo(
                                transition: LinkTransition.PushDown,
                                ease: Curves.slowMiddle,
                                duration: 5.0,
                                pageBuilder: () => XDTransitionTarget(),
                              ),
                            ],
                            child: XDBtn(
                              label: '5s Wind Up',
                              labelColor: const Color(0xff008d00),
                            ),
                          ),
                        ),
                      ),
                      Align(
                        alignment: Alignment(0.353, 0.352),
                        child: SizedBox(
                          width: 128.0,
                          height: 32.0,
                          child:
                              // Adobe XD layer: 'Btn' (component)
                              PageLink(
                            links: [
                              PageLinkInfo(
                                ease: Curves.linear,
                                duration: 0.2,
                                pageBuilder: () => XDTransitionTarget(),
                              ),
                            ],
                            child: XDBtn(
                              label: 'Auto Animate',
                              labelColor: const Color(0xff981a1a),
                            ),
                          ),
                        ),
                      ),
                      Pinned.fromPins(
                        Pin(size: 16.0, start: 476.0),
                        Pin(size: 15.0, middle: 0.6477),
                        child: XDComponent251(),
                      ),
                    ],
                  ),
                ),
              ],
            ),
          ),
          Pinned.fromPins(
            Pin(start: 16.0, end: 16.0),
            Pin(size: 137.0, start: 223.0),
            child:
                // Adobe XD layer: 'opacity' (group)
                Stack(
              children: <Widget>[
                Pinned.fromPins(
                  Pin(start: 0.0, end: 0.0),
                  Pin(start: 0.0, endFraction: 0.0),
                  child: XDTestGroup(
                    title: 'Opacity',
                  ),
                ),
                Pinned.fromPins(
                  Pin(size: 650.0, start: 21.0),
                  Pin(size: 68.0, start: 48.0),
                  child:
                      // Adobe XD layer: 'fixed_size_content' (group)
                      Stack(
                    children: <Widget>[
                      Align(
                        alignment: Alignment.topLeft,
                        child: SizedBox(
                          width: 72.0,
                          height: 16.0,
                          child: Text(
                            'Component',
                            style: TextStyle(
                              fontFamily: 'Arial',
                              fontSize: 14,
                              color: const Color(0xff981a1a),
                            ),
                            textAlign: TextAlign.center,
                            softWrap: false,
                          ),
                        ),
                      ),
                      Align(
                        alignment: Alignment(-0.656, -1.0),
                        child: SizedBox(
                          width: 80.0,
                          height: 16.0,
                          child: Text(
                            'Group Comp',
                            style: TextStyle(
                              fontFamily: 'Arial',
                              fontSize: 14,
                              color: const Color(0xff981a1a),
                            ),
                            textAlign: TextAlign.center,
                            softWrap: false,
                          ),
                        ),
                      ),
                      Align(
                        alignment: Alignment(-0.287, -1.0),
                        child: SizedBox(
                          width: 86.0,
                          height: 16.0,
                          child: Text(
                            'Nested Comp',
                            style: TextStyle(
                              fontFamily: 'Arial',
                              fontSize: 14,
                              color: const Color(0xff981a1a),
                            ),
                            textAlign: TextAlign.center,
                            softWrap: false,
                          ),
                        ),
                      ),
                      Align(
                        alignment: Alignment(0.003, -1.0),
                        child: SizedBox(
                          width: 26.0,
                          height: 16.0,
                          child: Text(
                            'Text',
                            style: TextStyle(
                              fontFamily: 'Arial',
                              fontSize: 14,
                              color: const Color(0xff008d00),
                            ),
                            textAlign: TextAlign.center,
                            softWrap: false,
                          ),
                        ),
                      ),
                      Align(
                        alignment: Alignment(0.203, -1.0),
                        child: SizedBox(
                          width: 28.0,
                          height: 16.0,
                          child: Text(
                            'Rect',
                            style: TextStyle(
                              fontFamily: 'Arial',
                              fontSize: 14,
                              color: const Color(0xff008d00),
                            ),
                            textAlign: TextAlign.center,
                            softWrap: false,
                          ),
                        ),
                      ),
                      Align(
                        alignment: Alignment(0.416, -1.0),
                        child: SizedBox(
                          width: 40.0,
                          height: 16.0,
                          child: Text(
                            'Shape',
                            style: TextStyle(
                              fontFamily: 'Arial',
                              fontSize: 14,
                              color: const Color(0xff008d00),
                            ),
                            textAlign: TextAlign.center,
                            softWrap: false,
                          ),
                        ),
                      ),
                      Pinned.fromPins(
                        Pin(size: 54.0, end: 95.0),
                        Pin(size: 16.0, start: 0.0),
                        child: Text(
                          'Gradient',
                          style: TextStyle(
                            fontFamily: 'Arial',
                            fontSize: 14,
                            color: const Color(0xff008d00),
                          ),
                          textAlign: TextAlign.center,
                          softWrap: false,
                        ),
                      ),
                      Pinned.fromPins(
                        Pin(size: 44.0, end: 12.0),
                        Pin(size: 16.0, start: 0.0),
                        child: Text(
                          'Nested',
                          style: TextStyle(
                            fontFamily: 'Arial',
                            fontSize: 14,
                            color: const Color(0xff008d00),
                          ),
                          textAlign: TextAlign.center,
                          softWrap: false,
                        ),
                      ),
                      Pinned.fromPins(
                        Pin(size: 36.0, middle: 0.5016),
                        Pin(size: 32.0, end: 5.0),
                        child: Text(
                          'Some\nText',
                          style: TextStyle(
                            fontFamily: 'Arial',
                            fontSize: 14,
                            color: const Color(0x3f000000),
                          ),
                          textAlign: TextAlign.center,
                          softWrap: false,
                        ),
                      ),
                      Pinned.fromPins(
                        Pin(size: 40.0, start: 16.0),
                        Pin(size: 40.0, end: 1.0),
                        child:
                            // Adobe XD layer: 'LayoutBoxShapes' (component)
                            XDLayoutBoxShapes(),
                      ),
                      Pinned.fromPins(
                        Pin(size: 80.0, start: 97.0),
                        Pin(size: 40.0, end: 1.0),
                        child:
                            // Adobe XD layer: 'groupedComponents' (group)
                            Stack(
                          children: <Widget>[
                            Pinned.fromPins(
                              Pin(size: 40.0, start: 0.0),
                              Pin(start: 0.0, end: 0.0),
                              child:
                                  // Adobe XD layer: 'LayoutBoxShapes' (component)
                                  XDLayoutBoxShapes(),
                            ),
                            Pinned.fromPins(
                              Pin(size: 40.0, end: 0.0),
                              Pin(start: 0.0, end: 0.0),
                              child:
                                  // Adobe XD layer: 'LayoutBoxShapes' (component)
                                  XDLayoutBoxShapes(),
                            ),
                          ],
                        ),
                      ),
                      Pinned.fromPins(
                        Pin(size: 80.0, middle: 0.3561),
                        Pin(size: 40.0, end: 1.0),
                        child:
                            // Adobe XD layer: 'nestedComponents' (group)
                            Stack(
                          children: <Widget>[
                            Pinned.fromPins(
                              Pin(size: 40.0, start: 0.0),
                              Pin(start: 0.0, end: 0.0),
                              child:
                                  // Adobe XD layer: 'LayoutBoxShapes' (component)
                                  XDLayoutBoxShapes(),
                            ),
                            Pinned.fromPins(
                              Pin(size: 40.0, end: 0.0),
                              Pin(start: 0.0, end: 0.0),
                              child:
                                  // Adobe XD layer: 'inner' (group)
                                  Stack(
                                children: <Widget>[
                                  // Adobe XD layer: 'LayoutBoxShapes' (component)
                                  XDLayoutBoxShapes(),
                                ],
                              ),
                            ),
                          ],
                        ),
                      ),
                      Align(
                        alignment: Alignment(0.21, 1.0),
                        child: Container(
                          width: 40.0,
                          height: 40.0,
                          decoration: BoxDecoration(
                            color: const Color(0x40008d00),
                            border: Border.all(
                                width: 4.0, color: const Color(0x40000000)),
                          ),
                        ),
                      ),
                      Align(
                        alignment: Alignment(0.623, 1.0),
                        child: Container(
                          width: 40.0,
                          height: 40.0,
                          decoration: BoxDecoration(
                            gradient: RadialGradient(
                              center: Alignment(0.0, 0.0),
                              radius: 0.5,
                              colors: [
                                const Color(0x40000000),
                                const Color(0x405cff5c)
                              ],
                              stops: [0.0, 1.0],
                              transform: GradientXDTransform(1.0, 0.0, 0.0, 1.0,
                                  0.0, 0.0, Alignment(0.0, 0.0)),
                            ),
                            border: Border.all(
                                width: 4.0, color: const Color(0x40000000)),
                          ),
                        ),
                      ),
                      Pinned.fromPins(
                        Pin(size: 40.0, middle: 0.7082),
                        Pin(size: 40.0, end: 1.0),
                        child:
                            // Adobe XD layer: 'poly_solid' (shape)
                            SvgPicture.string(
                          _svg_ptn5l3,
                          allowDrawingOutsideViewBox: true,
                          fit: BoxFit.fill,
                        ),
                      ),
                      Pinned.fromPins(
                        Pin(size: 40.0, end: 87.0),
                        Pin(size: 40.0, end: 1.0),
                        child:
                            // Adobe XD layer: 'poly_solid' (shape)
                            SvgPicture.string(
                          _svg_t1dbh,
                          allowDrawingOutsideViewBox: true,
                          fit: BoxFit.fill,
                        ),
                      ),
                      Align(
                        alignment: Alignment.bottomRight,
                        child: SizedBox(
                          width: 68.0,
                          height: 41.0,
                          child:
                              // Adobe XD layer: 'outer' (group)
                              Stack(
                            children: <Widget>[
                              Pinned.fromPins(
                                Pin(size: 40.0, end: 0.0),
                                Pin(start: 0.0, end: 1.0),
                                child:
                                    // Adobe XD layer: 'poly_solid' (shape)
                                    SvgPicture.string(
                                  _svg_cecrqz,
                                  allowDrawingOutsideViewBox: true,
                                  fit: BoxFit.fill,
                                ),
                              ),
                              Pinned.fromPins(
                                Pin(size: 40.0, start: 0.0),
                                Pin(start: 1.0, end: 0.0),
                                child:
                                    // Adobe XD layer: 'inner' (group)
                                    Stack(
                                  children: <Widget>[
                                    Container(
                                      decoration: BoxDecoration(
                                        gradient: RadialGradient(
                                          center: Alignment(0.0, 0.0),
                                          radius: 0.5,
                                          colors: [
                                            const Color(0x20000000),
                                            const Color(0x205cff5c)
                                          ],
                                          stops: [0.0, 1.0],
                                          transform: GradientXDTransform(
                                              1.0,
                                              0.0,
                                              0.0,
                                              1.0,
                                              0.0,
                                              0.0,
                                              Alignment(0.0, 0.0)),
                                        ),
                                        border: Border.all(
                                            width: 4.0,
                                            color: const Color(0x20000000)),
                                      ),
                                    ),
                                    Padding(
                                      padding: EdgeInsets.fromLTRB(
                                          0.0, 3.0, 4.0, 5.0),
                                      child: SizedBox.expand(
                                          child: Text(
                                        'Some\nText',
                                        style: TextStyle(
                                          fontFamily: 'Arial',
                                          fontSize: 14,
                                          color: const Color(0x3f000000),
                                        ),
                                        textAlign: TextAlign.center,
                                        softWrap: false,
                                      )),
                                    ),
                                  ],
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
            Pin(start: 16.0, end: 16.0),
            Pin(size: 208.0, start: 372.0),
            child:
                // Adobe XD layer: 'blend_modes' (group)
                Stack(
              children: <Widget>[
                Pinned.fromPins(
                  Pin(start: 0.0, end: 0.0),
                  Pin(start: 0.0, endFraction: 0.0),
                  child: XDTestGroup(
                    title: 'Blend Modes',
                  ),
                ),
                Pinned.fromPins(
                  Pin(size: 840.0, start: 16.0),
                  Pin(size: 144.0, start: 47.0),
                  child:
                      // Adobe XD layer: 'fixed_size_content' (group)
                      Stack(
                    children: <Widget>[
                      Align(
                        alignment: Alignment.topLeft,
                        child: SizedBox(
                          width: 60.0,
                          height: 64.0,
                          child:
                              // Adobe XD layer: 'normal' (group)
                              Stack(
                            children: <Widget>[
                              Pinned.fromPins(
                                Pin(start: 0.0, end: 0.0),
                                Pin(size: 16.0, start: 0.0),
                                child: Text(
                                  'normal',
                                  style: TextStyle(
                                    fontFamily: 'Arial',
                                    fontSize: 14,
                                    color: const Color(0xff008d00),
                                  ),
                                  textAlign: TextAlign.center,
                                ),
                              ),
                              Align(
                                alignment: Alignment.bottomLeft,
                                child: Container(
                                  width: 40.0,
                                  height: 40.0,
                                  decoration: BoxDecoration(
                                    gradient: LinearGradient(
                                      begin: Alignment(0.0, -1.0),
                                      end: Alignment(0.0, 1.0),
                                      colors: [
                                        const Color(0xffff0000),
                                        const Color(0xffffff00),
                                        const Color(0xff00ff00),
                                        const Color(0xff00ebff),
                                        const Color(0xff0039ff),
                                        const Color(0xfff500ff),
                                        const Color(0xffff0000)
                                      ],
                                      stops: [
                                        0.0,
                                        0.158,
                                        0.335,
                                        0.498,
                                        0.675,
                                        0.833,
                                        1.0
                                      ],
                                    ),
                                    border: Border.all(
                                        width: 3.0,
                                        color: const Color(0xff808080)),
                                  ),
                                ),
                              ),
                              Align(
                                alignment: Alignment.bottomRight,
                                child: Container(
                                  width: 40.0,
                                  height: 40.0,
                                  decoration: BoxDecoration(
                                    gradient: LinearGradient(
                                      begin: Alignment(-1.0, 0.0),
                                      end: Alignment(1.0, 0.0),
                                      colors: [
                                        const Color(0xffff0000),
                                        const Color(0xffffff00),
                                        const Color(0xff00ff00),
                                        const Color(0xff00ebff),
                                        const Color(0xff0039ff),
                                        const Color(0xfff500ff),
                                        const Color(0xffff0000)
                                      ],
                                      stops: [
                                        0.0,
                                        0.158,
                                        0.335,
                                        0.498,
                                        0.675,
                                        0.833,
                                        1.0
                                      ],
                                    ),
                                    borderRadius: BorderRadius.circular(40.0),
                                    border: Border.all(
                                        width: 3.0,
                                        color: const Color(0xff808080)),
                                  ),
                                ),
                              ),
                            ],
                          ),
                        ),
                      ),
                      Pinned.fromPins(
                        Pin(size: 60.0, start: 76.0),
                        Pin(size: 64.0, start: 0.0),
                        child:
                            // Adobe XD layer: 'darken' (group)
                            Stack(
                          children: <Widget>[
                            Pinned.fromPins(
                              Pin(start: 0.0, end: 0.0),
                              Pin(size: 16.0, start: 0.0),
                              child: Text(
                                'darken',
                                style: TextStyle(
                                  fontFamily: 'Arial',
                                  fontSize: 14,
                                  color: const Color(0xff008d00),
                                ),
                                textAlign: TextAlign.center,
                              ),
                            ),
                            Align(
                              alignment: Alignment.bottomLeft,
                              child: Container(
                                width: 40.0,
                                height: 40.0,
                                decoration: BoxDecoration(
                                  gradient: LinearGradient(
                                    begin: Alignment(0.0, -1.0),
                                    end: Alignment(0.0, 1.0),
                                    colors: [
                                      const Color(0xffff0000),
                                      const Color(0xffffff00),
                                      const Color(0xff00ff00),
                                      const Color(0xff00ebff),
                                      const Color(0xff0039ff),
                                      const Color(0xfff500ff),
                                      const Color(0xffff0000)
                                    ],
                                    stops: [
                                      0.0,
                                      0.158,
                                      0.335,
                                      0.498,
                                      0.675,
                                      0.833,
                                      1.0
                                    ],
                                  ),
                                  border: Border.all(
                                      width: 3.0,
                                      color: const Color(0xff808080)),
                                ),
                              ),
                            ),
                            Align(
                              alignment: Alignment.bottomRight,
                              child: BlendMask(
                                blendMode: BlendMode.darken,
                                child: Container(
                                  width: 40.0,
                                  height: 40.0,
                                  decoration: BoxDecoration(
                                    gradient: LinearGradient(
                                      begin: Alignment(-1.0, 0.0),
                                      end: Alignment(1.0, 0.0),
                                      colors: [
                                        const Color(0xffff0000),
                                        const Color(0xffffff00),
                                        const Color(0xff00ff00),
                                        const Color(0xff00ebff),
                                        const Color(0xff0039ff),
                                        const Color(0xfff500ff),
                                        const Color(0xffff0000)
                                      ],
                                      stops: [
                                        0.0,
                                        0.158,
                                        0.335,
                                        0.498,
                                        0.675,
                                        0.833,
                                        1.0
                                      ],
                                    ),
                                    borderRadius: BorderRadius.circular(40.0),
                                    border: Border.all(
                                        width: 3.0,
                                        color: const Color(0xff808080)),
                                  ),
                                ),
                              ),
                            ),
                          ],
                        ),
                      ),
                      Align(
                        alignment: Alignment(-0.631, -1.0),
                        child: SizedBox(
                          width: 60.0,
                          height: 64.0,
                          child:
                              // Adobe XD layer: 'multiply' (group)
                              Stack(
                            children: <Widget>[
                              Pinned.fromPins(
                                Pin(start: 0.0, end: 0.0),
                                Pin(size: 16.0, start: 0.0),
                                child: Text(
                                  'multiply',
                                  style: TextStyle(
                                    fontFamily: 'Arial',
                                    fontSize: 14,
                                    color: const Color(0xff008d00),
                                  ),
                                  textAlign: TextAlign.center,
                                ),
                              ),
                              Align(
                                alignment: Alignment.bottomLeft,
                                child: Container(
                                  width: 40.0,
                                  height: 40.0,
                                  decoration: BoxDecoration(
                                    gradient: LinearGradient(
                                      begin: Alignment(0.0, -1.0),
                                      end: Alignment(0.0, 1.0),
                                      colors: [
                                        const Color(0xffff0000),
                                        const Color(0xffffff00),
                                        const Color(0xff00ff00),
                                        const Color(0xff00ebff),
                                        const Color(0xff0039ff),
                                        const Color(0xfff500ff),
                                        const Color(0xffff0000)
                                      ],
                                      stops: [
                                        0.0,
                                        0.158,
                                        0.335,
                                        0.498,
                                        0.675,
                                        0.833,
                                        1.0
                                      ],
                                    ),
                                    border: Border.all(
                                        width: 3.0,
                                        color: const Color(0xff808080)),
                                  ),
                                ),
                              ),
                              Align(
                                alignment: Alignment.bottomRight,
                                child: BlendMask(
                                  blendMode: BlendMode.multiply,
                                  child: Container(
                                    width: 40.0,
                                    height: 40.0,
                                    decoration: BoxDecoration(
                                      gradient: LinearGradient(
                                        begin: Alignment(-1.0, 0.0),
                                        end: Alignment(1.0, 0.0),
                                        colors: [
                                          const Color(0xffff0000),
                                          const Color(0xffffff00),
                                          const Color(0xff00ff00),
                                          const Color(0xff00ebff),
                                          const Color(0xff0039ff),
                                          const Color(0xfff500ff),
                                          const Color(0xffff0000)
                                        ],
                                        stops: [
                                          0.0,
                                          0.158,
                                          0.335,
                                          0.498,
                                          0.675,
                                          0.833,
                                          1.0
                                        ],
                                      ),
                                      borderRadius: BorderRadius.circular(40.0),
                                      border: Border.all(
                                          width: 3.0,
                                          color: const Color(0xff808080)),
                                    ),
                                  ),
                                ),
                              ),
                            ],
                          ),
                        ),
                      ),
                      Align(
                        alignment: Alignment(-0.456, -1.0),
                        child: SizedBox(
                          width: 60.0,
                          height: 64.0,
                          child:
                              // Adobe XD layer: 'burn' (group)
                              Stack(
                            children: <Widget>[
                              Pinned.fromPins(
                                Pin(start: 0.0, end: 0.0),
                                Pin(size: 16.0, start: 0.0),
                                child: Text(
                                  'burn',
                                  style: TextStyle(
                                    fontFamily: 'Arial',
                                    fontSize: 14,
                                    color: const Color(0xff008d00),
                                  ),
                                  textAlign: TextAlign.center,
                                ),
                              ),
                              Align(
                                alignment: Alignment.bottomLeft,
                                child: Container(
                                  width: 40.0,
                                  height: 40.0,
                                  decoration: BoxDecoration(
                                    gradient: LinearGradient(
                                      begin: Alignment(0.0, -1.0),
                                      end: Alignment(0.0, 1.0),
                                      colors: [
                                        const Color(0xffff0000),
                                        const Color(0xffffff00),
                                        const Color(0xff00ff00),
                                        const Color(0xff00ebff),
                                        const Color(0xff0039ff),
                                        const Color(0xfff500ff),
                                        const Color(0xffff0000)
                                      ],
                                      stops: [
                                        0.0,
                                        0.158,
                                        0.335,
                                        0.498,
                                        0.675,
                                        0.833,
                                        1.0
                                      ],
                                    ),
                                    border: Border.all(
                                        width: 3.0,
                                        color: const Color(0xff808080)),
                                  ),
                                ),
                              ),
                              Align(
                                alignment: Alignment.bottomRight,
                                child: BlendMask(
                                  blendMode: BlendMode.colorBurn,
                                  child: Container(
                                    width: 40.0,
                                    height: 40.0,
                                    decoration: BoxDecoration(
                                      gradient: LinearGradient(
                                        begin: Alignment(-1.0, 0.0),
                                        end: Alignment(1.0, 0.0),
                                        colors: [
                                          const Color(0xffff0000),
                                          const Color(0xffffff00),
                                          const Color(0xff00ff00),
                                          const Color(0xff00ebff),
                                          const Color(0xff0039ff),
                                          const Color(0xfff500ff),
                                          const Color(0xffff0000)
                                        ],
                                        stops: [
                                          0.0,
                                          0.158,
                                          0.335,
                                          0.498,
                                          0.675,
                                          0.833,
                                          1.0
                                        ],
                                      ),
                                      borderRadius: BorderRadius.circular(40.0),
                                      border: Border.all(
                                          width: 3.0,
                                          color: const Color(0xff808080)),
                                    ),
                                  ),
                                ),
                              ),
                            ],
                          ),
                        ),
                      ),
                      Align(
                        alignment: Alignment(-0.262, -1.0),
                        child: SizedBox(
                          width: 60.0,
                          height: 64.0,
                          child:
                              // Adobe XD layer: 'lighten' (group)
                              Stack(
                            children: <Widget>[
                              Pinned.fromPins(
                                Pin(start: 0.0, end: 0.0),
                                Pin(size: 16.0, start: 0.0),
                                child: Text(
                                  'lighten',
                                  style: TextStyle(
                                    fontFamily: 'Arial',
                                    fontSize: 14,
                                    color: const Color(0xff008d00),
                                  ),
                                  textAlign: TextAlign.center,
                                ),
                              ),
                              Align(
                                alignment: Alignment.bottomLeft,
                                child: Container(
                                  width: 40.0,
                                  height: 40.0,
                                  decoration: BoxDecoration(
                                    gradient: LinearGradient(
                                      begin: Alignment(0.0, -1.0),
                                      end: Alignment(0.0, 1.0),
                                      colors: [
                                        const Color(0xffff0000),
                                        const Color(0xffffff00),
                                        const Color(0xff00ff00),
                                        const Color(0xff00ebff),
                                        const Color(0xff0039ff),
                                        const Color(0xfff500ff),
                                        const Color(0xffff0000)
                                      ],
                                      stops: [
                                        0.0,
                                        0.158,
                                        0.335,
                                        0.498,
                                        0.675,
                                        0.833,
                                        1.0
                                      ],
                                    ),
                                    border: Border.all(
                                        width: 3.0,
                                        color: const Color(0xff808080)),
                                  ),
                                ),
                              ),
                              Align(
                                alignment: Alignment.bottomRight,
                                child: BlendMask(
                                  blendMode: BlendMode.lighten,
                                  child: Container(
                                    width: 40.0,
                                    height: 40.0,
                                    decoration: BoxDecoration(
                                      gradient: LinearGradient(
                                        begin: Alignment(-1.0, 0.0),
                                        end: Alignment(1.0, 0.0),
                                        colors: [
                                          const Color(0xffff0000),
                                          const Color(0xffffff00),
                                          const Color(0xff00ff00),
                                          const Color(0xff00ebff),
                                          const Color(0xff0039ff),
                                          const Color(0xfff500ff),
                                          const Color(0xffff0000)
                                        ],
                                        stops: [
                                          0.0,
                                          0.158,
                                          0.335,
                                          0.498,
                                          0.675,
                                          0.833,
                                          1.0
                                        ],
                                      ),
                                      borderRadius: BorderRadius.circular(40.0),
                                      border: Border.all(
                                          width: 3.0,
                                          color: const Color(0xff808080)),
                                    ),
                                  ),
                                ),
                              ),
                            ],
                          ),
                        ),
                      ),
                      Align(
                        alignment: Alignment(-0.087, -1.0),
                        child: SizedBox(
                          width: 60.0,
                          height: 64.0,
                          child:
                              // Adobe XD layer: 'screen' (group)
                              Stack(
                            children: <Widget>[
                              Pinned.fromPins(
                                Pin(start: 0.0, end: 0.0),
                                Pin(size: 16.0, start: 0.0),
                                child: Text(
                                  'screen',
                                  style: TextStyle(
                                    fontFamily: 'Arial',
                                    fontSize: 14,
                                    color: const Color(0xff008d00),
                                  ),
                                  textAlign: TextAlign.center,
                                ),
                              ),
                              Align(
                                alignment: Alignment.bottomLeft,
                                child: Container(
                                  width: 40.0,
                                  height: 40.0,
                                  decoration: BoxDecoration(
                                    gradient: LinearGradient(
                                      begin: Alignment(0.0, -1.0),
                                      end: Alignment(0.0, 1.0),
                                      colors: [
                                        const Color(0xffff0000),
                                        const Color(0xffffff00),
                                        const Color(0xff00ff00),
                                        const Color(0xff00ebff),
                                        const Color(0xff0039ff),
                                        const Color(0xfff500ff),
                                        const Color(0xffff0000)
                                      ],
                                      stops: [
                                        0.0,
                                        0.158,
                                        0.335,
                                        0.498,
                                        0.675,
                                        0.833,
                                        1.0
                                      ],
                                    ),
                                    border: Border.all(
                                        width: 3.0,
                                        color: const Color(0xff808080)),
                                  ),
                                ),
                              ),
                              Align(
                                alignment: Alignment.bottomRight,
                                child: BlendMask(
                                  blendMode: BlendMode.screen,
                                  child: Container(
                                    width: 40.0,
                                    height: 40.0,
                                    decoration: BoxDecoration(
                                      gradient: LinearGradient(
                                        begin: Alignment(-1.0, 0.0),
                                        end: Alignment(1.0, 0.0),
                                        colors: [
                                          const Color(0xffff0000),
                                          const Color(0xffffff00),
                                          const Color(0xff00ff00),
                                          const Color(0xff00ebff),
                                          const Color(0xff0039ff),
                                          const Color(0xfff500ff),
                                          const Color(0xffff0000)
                                        ],
                                        stops: [
                                          0.0,
                                          0.158,
                                          0.335,
                                          0.498,
                                          0.675,
                                          0.833,
                                          1.0
                                        ],
                                      ),
                                      borderRadius: BorderRadius.circular(40.0),
                                      border: Border.all(
                                          width: 3.0,
                                          color: const Color(0xff808080)),
                                    ),
                                  ),
                                ),
                              ),
                            ],
                          ),
                        ),
                      ),
                      Align(
                        alignment: Alignment(0.087, -1.0),
                        child: SizedBox(
                          width: 60.0,
                          height: 64.0,
                          child:
                              // Adobe XD layer: 'dodge' (group)
                              Stack(
                            children: <Widget>[
                              Pinned.fromPins(
                                Pin(start: 0.0, end: 0.0),
                                Pin(size: 16.0, start: 0.0),
                                child: Text(
                                  'dodge',
                                  style: TextStyle(
                                    fontFamily: 'Arial',
                                    fontSize: 14,
                                    color: const Color(0xff008d00),
                                  ),
                                  textAlign: TextAlign.center,
                                ),
                              ),
                              Align(
                                alignment: Alignment.bottomLeft,
                                child: Container(
                                  width: 40.0,
                                  height: 40.0,
                                  decoration: BoxDecoration(
                                    gradient: LinearGradient(
                                      begin: Alignment(0.0, -1.0),
                                      end: Alignment(0.0, 1.0),
                                      colors: [
                                        const Color(0xffff0000),
                                        const Color(0xffffff00),
                                        const Color(0xff00ff00),
                                        const Color(0xff00ebff),
                                        const Color(0xff0039ff),
                                        const Color(0xfff500ff),
                                        const Color(0xffff0000)
                                      ],
                                      stops: [
                                        0.0,
                                        0.158,
                                        0.335,
                                        0.498,
                                        0.675,
                                        0.833,
                                        1.0
                                      ],
                                    ),
                                    border: Border.all(
                                        width: 3.0,
                                        color: const Color(0xff808080)),
                                  ),
                                ),
                              ),
                              Align(
                                alignment: Alignment.bottomRight,
                                child: BlendMask(
                                  blendMode: BlendMode.colorDodge,
                                  child: Container(
                                    width: 40.0,
                                    height: 40.0,
                                    decoration: BoxDecoration(
                                      gradient: LinearGradient(
                                        begin: Alignment(-1.0, 0.0),
                                        end: Alignment(1.0, 0.0),
                                        colors: [
                                          const Color(0xffff0000),
                                          const Color(0xffffff00),
                                          const Color(0xff00ff00),
                                          const Color(0xff00ebff),
                                          const Color(0xff0039ff),
                                          const Color(0xfff500ff),
                                          const Color(0xffff0000)
                                        ],
                                        stops: [
                                          0.0,
                                          0.158,
                                          0.335,
                                          0.498,
                                          0.675,
                                          0.833,
                                          1.0
                                        ],
                                      ),
                                      borderRadius: BorderRadius.circular(40.0),
                                      border: Border.all(
                                          width: 3.0,
                                          color: const Color(0xff808080)),
                                    ),
                                  ),
                                ),
                              ),
                            ],
                          ),
                        ),
                      ),
                      Align(
                        alignment: Alignment(0.282, -1.0),
                        child: SizedBox(
                          width: 60.0,
                          height: 64.0,
                          child:
                              // Adobe XD layer: 'overlay' (group)
                              Stack(
                            children: <Widget>[
                              Pinned.fromPins(
                                Pin(start: 0.0, end: 0.0),
                                Pin(size: 16.0, start: 0.0),
                                child: Text(
                                  'overlay',
                                  style: TextStyle(
                                    fontFamily: 'Arial',
                                    fontSize: 14,
                                    color: const Color(0xff008d00),
                                  ),
                                  textAlign: TextAlign.center,
                                ),
                              ),
                              Align(
                                alignment: Alignment.bottomLeft,
                                child: Container(
                                  width: 40.0,
                                  height: 40.0,
                                  decoration: BoxDecoration(
                                    gradient: LinearGradient(
                                      begin: Alignment(0.0, -1.0),
                                      end: Alignment(0.0, 1.0),
                                      colors: [
                                        const Color(0xffff0000),
                                        const Color(0xffffff00),
                                        const Color(0xff00ff00),
                                        const Color(0xff00ebff),
                                        const Color(0xff0039ff),
                                        const Color(0xfff500ff),
                                        const Color(0xffff0000)
                                      ],
                                      stops: [
                                        0.0,
                                        0.158,
                                        0.335,
                                        0.498,
                                        0.675,
                                        0.833,
                                        1.0
                                      ],
                                    ),
                                    border: Border.all(
                                        width: 3.0,
                                        color: const Color(0xff808080)),
                                  ),
                                ),
                              ),
                              Align(
                                alignment: Alignment.bottomRight,
                                child: BlendMask(
                                  blendMode: BlendMode.overlay,
                                  child: Container(
                                    width: 40.0,
                                    height: 40.0,
                                    decoration: BoxDecoration(
                                      gradient: LinearGradient(
                                        begin: Alignment(-1.0, 0.0),
                                        end: Alignment(1.0, 0.0),
                                        colors: [
                                          const Color(0xffff0000),
                                          const Color(0xffffff00),
                                          const Color(0xff00ff00),
                                          const Color(0xff00ebff),
                                          const Color(0xff0039ff),
                                          const Color(0xfff500ff),
                                          const Color(0xffff0000)
                                        ],
                                        stops: [
                                          0.0,
                                          0.158,
                                          0.335,
                                          0.498,
                                          0.675,
                                          0.833,
                                          1.0
                                        ],
                                      ),
                                      borderRadius: BorderRadius.circular(40.0),
                                      border: Border.all(
                                          width: 3.0,
                                          color: const Color(0xff808080)),
                                    ),
                                  ),
                                ),
                              ),
                            ],
                          ),
                        ),
                      ),
                      Align(
                        alignment: Alignment(0.456, -1.0),
                        child: SizedBox(
                          width: 60.0,
                          height: 64.0,
                          child:
                              // Adobe XD layer: 'softlight' (group)
                              Stack(
                            children: <Widget>[
                              Pinned.fromPins(
                                Pin(start: 0.0, end: 0.0),
                                Pin(size: 16.0, start: 0.0),
                                child: Text(
                                  'soft light',
                                  style: TextStyle(
                                    fontFamily: 'Arial',
                                    fontSize: 14,
                                    color: const Color(0xff008d00),
                                  ),
                                  textAlign: TextAlign.center,
                                ),
                              ),
                              Align(
                                alignment: Alignment.bottomLeft,
                                child: Container(
                                  width: 40.0,
                                  height: 40.0,
                                  decoration: BoxDecoration(
                                    gradient: LinearGradient(
                                      begin: Alignment(0.0, -1.0),
                                      end: Alignment(0.0, 1.0),
                                      colors: [
                                        const Color(0xffff0000),
                                        const Color(0xffffff00),
                                        const Color(0xff00ff00),
                                        const Color(0xff00ebff),
                                        const Color(0xff0039ff),
                                        const Color(0xfff500ff),
                                        const Color(0xffff0000)
                                      ],
                                      stops: [
                                        0.0,
                                        0.158,
                                        0.335,
                                        0.498,
                                        0.675,
                                        0.833,
                                        1.0
                                      ],
                                    ),
                                    border: Border.all(
                                        width: 3.0,
                                        color: const Color(0xff808080)),
                                  ),
                                ),
                              ),
                              Align(
                                alignment: Alignment.bottomRight,
                                child: BlendMask(
                                  blendMode: BlendMode.softLight,
                                  child: Container(
                                    width: 40.0,
                                    height: 40.0,
                                    decoration: BoxDecoration(
                                      gradient: LinearGradient(
                                        begin: Alignment(-1.0, 0.0),
                                        end: Alignment(1.0, 0.0),
                                        colors: [
                                          const Color(0xffff0000),
                                          const Color(0xffffff00),
                                          const Color(0xff00ff00),
                                          const Color(0xff00ebff),
                                          const Color(0xff0039ff),
                                          const Color(0xfff500ff),
                                          const Color(0xffff0000)
                                        ],
                                        stops: [
                                          0.0,
                                          0.158,
                                          0.335,
                                          0.498,
                                          0.675,
                                          0.833,
                                          1.0
                                        ],
                                      ),
                                      borderRadius: BorderRadius.circular(40.0),
                                      border: Border.all(
                                          width: 3.0,
                                          color: const Color(0xff808080)),
                                    ),
                                  ),
                                ),
                              ),
                            ],
                          ),
                        ),
                      ),
                      Align(
                        alignment: Alignment(0.631, -1.0),
                        child: SizedBox(
                          width: 60.0,
                          height: 64.0,
                          child:
                              // Adobe XD layer: 'hardlight' (group)
                              Stack(
                            children: <Widget>[
                              Pinned.fromPins(
                                Pin(start: 0.0, end: 0.0),
                                Pin(size: 16.0, start: 0.0),
                                child: Text(
                                  'hard light',
                                  style: TextStyle(
                                    fontFamily: 'Arial',
                                    fontSize: 14,
                                    color: const Color(0xff008d00),
                                  ),
                                  textAlign: TextAlign.center,
                                ),
                              ),
                              Align(
                                alignment: Alignment.bottomLeft,
                                child: Container(
                                  width: 40.0,
                                  height: 40.0,
                                  decoration: BoxDecoration(
                                    gradient: LinearGradient(
                                      begin: Alignment(0.0, -1.0),
                                      end: Alignment(0.0, 1.0),
                                      colors: [
                                        const Color(0xffff0000),
                                        const Color(0xffffff00),
                                        const Color(0xff00ff00),
                                        const Color(0xff00ebff),
                                        const Color(0xff0039ff),
                                        const Color(0xfff500ff),
                                        const Color(0xffff0000)
                                      ],
                                      stops: [
                                        0.0,
                                        0.158,
                                        0.335,
                                        0.498,
                                        0.675,
                                        0.833,
                                        1.0
                                      ],
                                    ),
                                    border: Border.all(
                                        width: 3.0,
                                        color: const Color(0xff808080)),
                                  ),
                                ),
                              ),
                              Align(
                                alignment: Alignment.bottomRight,
                                child: BlendMask(
                                  blendMode: BlendMode.hardLight,
                                  child: Container(
                                    width: 40.0,
                                    height: 40.0,
                                    decoration: BoxDecoration(
                                      gradient: LinearGradient(
                                        begin: Alignment(-1.0, 0.0),
                                        end: Alignment(1.0, 0.0),
                                        colors: [
                                          const Color(0xffff0000),
                                          const Color(0xffffff00),
                                          const Color(0xff00ff00),
                                          const Color(0xff00ebff),
                                          const Color(0xff0039ff),
                                          const Color(0xfff500ff),
                                          const Color(0xffff0000)
                                        ],
                                        stops: [
                                          0.0,
                                          0.158,
                                          0.335,
                                          0.498,
                                          0.675,
                                          0.833,
                                          1.0
                                        ],
                                      ),
                                      borderRadius: BorderRadius.circular(40.0),
                                      border: Border.all(
                                          width: 3.0,
                                          color: const Color(0xff808080)),
                                    ),
                                  ),
                                ),
                              ),
                            ],
                          ),
                        ),
                      ),
                      Pinned.fromPins(
                        Pin(size: 60.0, end: 68.0),
                        Pin(size: 64.0, start: 0.0),
                        child:
                            // Adobe XD layer: 'difference' (group)
                            Stack(
                          children: <Widget>[
                            Pinned.fromPins(
                              Pin(start: 0.0, end: 0.0),
                              Pin(size: 16.0, start: 0.0),
                              child: Text(
                                'diff',
                                style: TextStyle(
                                  fontFamily: 'Arial',
                                  fontSize: 14,
                                  color: const Color(0xff008d00),
                                ),
                                textAlign: TextAlign.center,
                              ),
                            ),
                            Align(
                              alignment: Alignment.bottomLeft,
                              child: Container(
                                width: 40.0,
                                height: 40.0,
                                decoration: BoxDecoration(
                                  gradient: LinearGradient(
                                    begin: Alignment(0.0, -1.0),
                                    end: Alignment(0.0, 1.0),
                                    colors: [
                                      const Color(0xffff0000),
                                      const Color(0xffffff00),
                                      const Color(0xff00ff00),
                                      const Color(0xff00ebff),
                                      const Color(0xff0039ff),
                                      const Color(0xfff500ff),
                                      const Color(0xffff0000)
                                    ],
                                    stops: [
                                      0.0,
                                      0.158,
                                      0.335,
                                      0.498,
                                      0.675,
                                      0.833,
                                      1.0
                                    ],
                                  ),
                                  border: Border.all(
                                      width: 3.0,
                                      color: const Color(0xff808080)),
                                ),
                              ),
                            ),
                            Align(
                              alignment: Alignment.bottomRight,
                              child: BlendMask(
                                blendMode: BlendMode.difference,
                                child: Container(
                                  width: 40.0,
                                  height: 40.0,
                                  decoration: BoxDecoration(
                                    gradient: LinearGradient(
                                      begin: Alignment(-1.0, 0.0),
                                      end: Alignment(1.0, 0.0),
                                      colors: [
                                        const Color(0xffff0000),
                                        const Color(0xffffff00),
                                        const Color(0xff00ff00),
                                        const Color(0xff00ebff),
                                        const Color(0xff0039ff),
                                        const Color(0xfff500ff),
                                        const Color(0xffff0000)
                                      ],
                                      stops: [
                                        0.0,
                                        0.158,
                                        0.335,
                                        0.498,
                                        0.675,
                                        0.833,
                                        1.0
                                      ],
                                    ),
                                    borderRadius: BorderRadius.circular(40.0),
                                    border: Border.all(
                                        width: 3.0,
                                        color: const Color(0xff808080)),
                                  ),
                                ),
                              ),
                            ),
                          ],
                        ),
                      ),
                      Align(
                        alignment: Alignment.topRight,
                        child: SizedBox(
                          width: 60.0,
                          height: 64.0,
                          child:
                              // Adobe XD layer: 'exclusion' (group)
                              Stack(
                            children: <Widget>[
                              Pinned.fromPins(
                                Pin(start: 0.0, end: 0.0),
                                Pin(size: 16.0, start: 0.0),
                                child: Text(
                                  'excl',
                                  style: TextStyle(
                                    fontFamily: 'Arial',
                                    fontSize: 14,
                                    color: const Color(0xff008d00),
                                  ),
                                  textAlign: TextAlign.center,
                                ),
                              ),
                              Align(
                                alignment: Alignment.bottomLeft,
                                child: Container(
                                  width: 40.0,
                                  height: 40.0,
                                  decoration: BoxDecoration(
                                    gradient: LinearGradient(
                                      begin: Alignment(0.0, -1.0),
                                      end: Alignment(0.0, 1.0),
                                      colors: [
                                        const Color(0xffff0000),
                                        const Color(0xffffff00),
                                        const Color(0xff00ff00),
                                        const Color(0xff00ebff),
                                        const Color(0xff0039ff),
                                        const Color(0xfff500ff),
                                        const Color(0xffff0000)
                                      ],
                                      stops: [
                                        0.0,
                                        0.158,
                                        0.335,
                                        0.498,
                                        0.675,
                                        0.833,
                                        1.0
                                      ],
                                    ),
                                    border: Border.all(
                                        width: 3.0,
                                        color: const Color(0xff808080)),
                                  ),
                                ),
                              ),
                              Align(
                                alignment: Alignment.bottomRight,
                                child: BlendMask(
                                  blendMode: BlendMode.exclusion,
                                  child: Container(
                                    width: 40.0,
                                    height: 40.0,
                                    decoration: BoxDecoration(
                                      gradient: LinearGradient(
                                        begin: Alignment(-1.0, 0.0),
                                        end: Alignment(1.0, 0.0),
                                        colors: [
                                          const Color(0xffff0000),
                                          const Color(0xffffff00),
                                          const Color(0xff00ff00),
                                          const Color(0xff00ebff),
                                          const Color(0xff0039ff),
                                          const Color(0xfff500ff),
                                          const Color(0xffff0000)
                                        ],
                                        stops: [
                                          0.0,
                                          0.158,
                                          0.335,
                                          0.498,
                                          0.675,
                                          0.833,
                                          1.0
                                        ],
                                      ),
                                      borderRadius: BorderRadius.circular(40.0),
                                      border: Border.all(
                                          width: 3.0,
                                          color: const Color(0xff808080)),
                                    ),
                                  ),
                                ),
                              ),
                            ],
                          ),
                        ),
                      ),
                      Align(
                        alignment: Alignment.bottomLeft,
                        child: SizedBox(
                          width: 60.0,
                          height: 64.0,
                          child:
                              // Adobe XD layer: 'hue' (group)
                              Stack(
                            children: <Widget>[
                              Pinned.fromPins(
                                Pin(start: 0.0, end: 0.0),
                                Pin(size: 16.0, start: 0.0),
                                child: Text(
                                  'hue',
                                  style: TextStyle(
                                    fontFamily: 'Arial',
                                    fontSize: 14,
                                    color: const Color(0xff008d00),
                                  ),
                                  textAlign: TextAlign.center,
                                ),
                              ),
                              Align(
                                alignment: Alignment.bottomLeft,
                                child: Container(
                                  width: 40.0,
                                  height: 40.0,
                                  decoration: BoxDecoration(
                                    gradient: LinearGradient(
                                      begin: Alignment(0.0, -1.0),
                                      end: Alignment(0.0, 1.0),
                                      colors: [
                                        const Color(0xffff0000),
                                        const Color(0xffffff00),
                                        const Color(0xff00ff00),
                                        const Color(0xff00ebff),
                                        const Color(0xff0039ff),
                                        const Color(0xfff500ff),
                                        const Color(0xffff0000)
                                      ],
                                      stops: [
                                        0.0,
                                        0.158,
                                        0.335,
                                        0.498,
                                        0.675,
                                        0.833,
                                        1.0
                                      ],
                                    ),
                                    border: Border.all(
                                        width: 3.0,
                                        color: const Color(0xff808080)),
                                  ),
                                ),
                              ),
                              Align(
                                alignment: Alignment.bottomRight,
                                child: BlendMask(
                                  blendMode: BlendMode.hue,
                                  child: Container(
                                    width: 40.0,
                                    height: 40.0,
                                    decoration: BoxDecoration(
                                      gradient: LinearGradient(
                                        begin: Alignment(-1.0, 0.0),
                                        end: Alignment(1.0, 0.0),
                                        colors: [
                                          const Color(0xffff0000),
                                          const Color(0xffffff00),
                                          const Color(0xff00ff00),
                                          const Color(0xff00ebff),
                                          const Color(0xff0039ff),
                                          const Color(0xfff500ff),
                                          const Color(0xffff0000)
                                        ],
                                        stops: [
                                          0.0,
                                          0.158,
                                          0.335,
                                          0.498,
                                          0.675,
                                          0.833,
                                          1.0
                                        ],
                                      ),
                                      borderRadius: BorderRadius.circular(40.0),
                                      border: Border.all(
                                          width: 3.0,
                                          color: const Color(0xff808080)),
                                    ),
                                  ),
                                ),
                              ),
                            ],
                          ),
                        ),
                      ),
                      Pinned.fromPins(
                        Pin(size: 60.0, start: 68.0),
                        Pin(size: 64.0, end: 0.0),
                        child:
                            // Adobe XD layer: 'saturation' (group)
                            Stack(
                          children: <Widget>[
                            Pinned.fromPins(
                              Pin(start: 0.0, end: 0.0),
                              Pin(size: 16.0, start: 0.0),
                              child: Text(
                                'sat',
                                style: TextStyle(
                                  fontFamily: 'Arial',
                                  fontSize: 14,
                                  color: const Color(0xff008d00),
                                ),
                                textAlign: TextAlign.center,
                              ),
                            ),
                            Align(
                              alignment: Alignment.bottomLeft,
                              child: Container(
                                width: 40.0,
                                height: 40.0,
                                decoration: BoxDecoration(
                                  gradient: LinearGradient(
                                    begin: Alignment(0.0, -1.0),
                                    end: Alignment(0.0, 1.0),
                                    colors: [
                                      const Color(0xffff0000),
                                      const Color(0xffffff00),
                                      const Color(0xff00ff00),
                                      const Color(0xff00ebff),
                                      const Color(0xff0039ff),
                                      const Color(0xfff500ff),
                                      const Color(0xffff0000)
                                    ],
                                    stops: [
                                      0.0,
                                      0.158,
                                      0.335,
                                      0.498,
                                      0.675,
                                      0.833,
                                      1.0
                                    ],
                                  ),
                                  border: Border.all(
                                      width: 3.0,
                                      color: const Color(0xff808080)),
                                ),
                              ),
                            ),
                            Align(
                              alignment: Alignment.bottomRight,
                              child: BlendMask(
                                blendMode: BlendMode.saturation,
                                child: Container(
                                  width: 40.0,
                                  height: 40.0,
                                  decoration: BoxDecoration(
                                    gradient: LinearGradient(
                                      begin: Alignment(-1.0, 0.0),
                                      end: Alignment(1.0, 0.0),
                                      colors: [
                                        const Color(0xffff0000),
                                        const Color(0xffffff00),
                                        const Color(0xff00ff00),
                                        const Color(0xff00ebff),
                                        const Color(0xff0039ff),
                                        const Color(0xfff500ff),
                                        const Color(0xffff0000)
                                      ],
                                      stops: [
                                        0.0,
                                        0.158,
                                        0.335,
                                        0.498,
                                        0.675,
                                        0.833,
                                        1.0
                                      ],
                                    ),
                                    borderRadius: BorderRadius.circular(40.0),
                                    border: Border.all(
                                        width: 3.0,
                                        color: const Color(0xff808080)),
                                  ),
                                ),
                              ),
                            ),
                          ],
                        ),
                      ),
                      Align(
                        alignment: Alignment(-0.651, 1.0),
                        child: SizedBox(
                          width: 60.0,
                          height: 64.0,
                          child:
                              // Adobe XD layer: 'color' (group)
                              Stack(
                            children: <Widget>[
                              Pinned.fromPins(
                                Pin(start: 0.0, end: 0.0),
                                Pin(size: 16.0, start: 0.0),
                                child: Text(
                                  'color',
                                  style: TextStyle(
                                    fontFamily: 'Arial',
                                    fontSize: 14,
                                    color: const Color(0xff008d00),
                                  ),
                                  textAlign: TextAlign.center,
                                ),
                              ),
                              Align(
                                alignment: Alignment.bottomLeft,
                                child: Container(
                                  width: 40.0,
                                  height: 40.0,
                                  decoration: BoxDecoration(
                                    gradient: LinearGradient(
                                      begin: Alignment(0.0, -1.0),
                                      end: Alignment(0.0, 1.0),
                                      colors: [
                                        const Color(0xffff0000),
                                        const Color(0xffffff00),
                                        const Color(0xff00ff00),
                                        const Color(0xff00ebff),
                                        const Color(0xff0039ff),
                                        const Color(0xfff500ff),
                                        const Color(0xffff0000)
                                      ],
                                      stops: [
                                        0.0,
                                        0.158,
                                        0.335,
                                        0.498,
                                        0.675,
                                        0.833,
                                        1.0
                                      ],
                                    ),
                                    border: Border.all(
                                        width: 3.0,
                                        color: const Color(0xff808080)),
                                  ),
                                ),
                              ),
                              Align(
                                alignment: Alignment.bottomRight,
                                child: BlendMask(
                                  blendMode: BlendMode.color,
                                  child: Container(
                                    width: 40.0,
                                    height: 40.0,
                                    decoration: BoxDecoration(
                                      gradient: LinearGradient(
                                        begin: Alignment(-1.0, 0.0),
                                        end: Alignment(1.0, 0.0),
                                        colors: [
                                          const Color(0xffff0000),
                                          const Color(0xffffff00),
                                          const Color(0xff00ff00),
                                          const Color(0xff00ebff),
                                          const Color(0xff0039ff),
                                          const Color(0xfff500ff),
                                          const Color(0xffff0000)
                                        ],
                                        stops: [
                                          0.0,
                                          0.158,
                                          0.335,
                                          0.498,
                                          0.675,
                                          0.833,
                                          1.0
                                        ],
                                      ),
                                      borderRadius: BorderRadius.circular(40.0),
                                      border: Border.all(
                                          width: 3.0,
                                          color: const Color(0xff808080)),
                                    ),
                                  ),
                                ),
                              ),
                            ],
                          ),
                        ),
                      ),
                      Align(
                        alignment: Alignment(-0.477, 1.0),
                        child: SizedBox(
                          width: 60.0,
                          height: 64.0,
                          child:
                              // Adobe XD layer: 'luminosity' (group)
                              Stack(
                            children: <Widget>[
                              Pinned.fromPins(
                                Pin(start: 0.0, end: 0.0),
                                Pin(size: 16.0, start: 0.0),
                                child: Text(
                                  'lumin',
                                  style: TextStyle(
                                    fontFamily: 'Arial',
                                    fontSize: 14,
                                    color: const Color(0xff008d00),
                                  ),
                                  textAlign: TextAlign.center,
                                ),
                              ),
                              Align(
                                alignment: Alignment.bottomLeft,
                                child: Container(
                                  width: 40.0,
                                  height: 40.0,
                                  decoration: BoxDecoration(
                                    gradient: LinearGradient(
                                      begin: Alignment(0.0, -1.0),
                                      end: Alignment(0.0, 1.0),
                                      colors: [
                                        const Color(0xffff0000),
                                        const Color(0xffffff00),
                                        const Color(0xff00ff00),
                                        const Color(0xff00ebff),
                                        const Color(0xff0039ff),
                                        const Color(0xfff500ff),
                                        const Color(0xffff0000)
                                      ],
                                      stops: [
                                        0.0,
                                        0.158,
                                        0.335,
                                        0.498,
                                        0.675,
                                        0.833,
                                        1.0
                                      ],
                                    ),
                                    border: Border.all(
                                        width: 3.0,
                                        color: const Color(0xff808080)),
                                  ),
                                ),
                              ),
                              Align(
                                alignment: Alignment.bottomRight,
                                child: BlendMask(
                                  blendMode: BlendMode.luminosity,
                                  child: Container(
                                    width: 40.0,
                                    height: 40.0,
                                    decoration: BoxDecoration(
                                      gradient: LinearGradient(
                                        begin: Alignment(-1.0, 0.0),
                                        end: Alignment(1.0, 0.0),
                                        colors: [
                                          const Color(0xffff0000),
                                          const Color(0xffffff00),
                                          const Color(0xff00ff00),
                                          const Color(0xff00ebff),
                                          const Color(0xff0039ff),
                                          const Color(0xfff500ff),
                                          const Color(0xffff0000)
                                        ],
                                        stops: [
                                          0.0,
                                          0.158,
                                          0.335,
                                          0.498,
                                          0.675,
                                          0.833,
                                          1.0
                                        ],
                                      ),
                                      borderRadius: BorderRadius.circular(40.0),
                                      border: Border.all(
                                          width: 3.0,
                                          color: const Color(0xff808080)),
                                    ),
                                  ),
                                ),
                              ),
                            ],
                          ),
                        ),
                      ),
                      Align(
                        alignment: Alignment(-0.262, 1.0),
                        child: SizedBox(
                          width: 60.0,
                          height: 64.0,
                          child:
                              // Adobe XD layer: 'component' (group)
                              Stack(
                            children: <Widget>[
                              Pinned.fromPins(
                                Pin(start: 0.0, end: 0.0),
                                Pin(size: 16.0, start: 0.0),
                                child: Text(
                                  'comp',
                                  style: TextStyle(
                                    fontFamily: 'Arial',
                                    fontSize: 14,
                                    color: const Color(0xff008d00),
                                  ),
                                  textAlign: TextAlign.center,
                                ),
                              ),
                              Align(
                                alignment: Alignment.bottomLeft,
                                child: Container(
                                  width: 40.0,
                                  height: 40.0,
                                  decoration: BoxDecoration(
                                    gradient: LinearGradient(
                                      begin: Alignment(0.0, -1.0),
                                      end: Alignment(0.0, 1.0),
                                      colors: [
                                        const Color(0xffff0000),
                                        const Color(0xffffff00),
                                        const Color(0xff00ff00),
                                        const Color(0xff00ebff),
                                        const Color(0xff0039ff),
                                        const Color(0xfff500ff),
                                        const Color(0xffff0000)
                                      ],
                                      stops: [
                                        0.0,
                                        0.158,
                                        0.335,
                                        0.498,
                                        0.675,
                                        0.833,
                                        1.0
                                      ],
                                    ),
                                    border: Border.all(
                                        width: 3.0,
                                        color: const Color(0xff808080)),
                                  ),
                                ),
                              ),
                              Align(
                                alignment: Alignment.bottomRight,
                                child: SizedBox(
                                  width: 40.0,
                                  height: 40.0,
                                  child:
                                      // Adobe XD layer: 'LayoutBoxShapes' (component)
                                      BlendMask(
                                    blendMode: BlendMode.multiply,
                                    child: XDLayoutBoxShapes(),
                                  ),
                                ),
                              ),
                            ],
                          ),
                        ),
                      ),
                      Align(
                        alignment: Alignment(-0.087, 1.0),
                        child: SizedBox(
                          width: 60.0,
                          height: 64.0,
                          child:
                              // Adobe XD layer: 'text' (group)
                              Stack(
                            children: <Widget>[
                              Pinned.fromPins(
                                Pin(start: 0.0, end: 0.0),
                                Pin(size: 16.0, start: 0.0),
                                child: Text(
                                  'Text',
                                  style: TextStyle(
                                    fontFamily: 'Arial',
                                    fontSize: 14,
                                    color: const Color(0xff008d00),
                                  ),
                                  textAlign: TextAlign.center,
                                ),
                              ),
                              Align(
                                alignment: Alignment.bottomLeft,
                                child: Container(
                                  width: 40.0,
                                  height: 40.0,
                                  decoration: BoxDecoration(
                                    gradient: LinearGradient(
                                      begin: Alignment(0.0, -1.0),
                                      end: Alignment(0.0, 1.0),
                                      colors: [
                                        const Color(0xffff0000),
                                        const Color(0xffffff00),
                                        const Color(0xff00ff00),
                                        const Color(0xff00ebff),
                                        const Color(0xff0039ff),
                                        const Color(0xfff500ff),
                                        const Color(0xffff0000)
                                      ],
                                      stops: [
                                        0.0,
                                        0.158,
                                        0.335,
                                        0.498,
                                        0.675,
                                        0.833,
                                        1.0
                                      ],
                                    ),
                                    border: Border.all(
                                        width: 3.0,
                                        color: const Color(0xff808080)),
                                  ),
                                ),
                              ),
                              Pinned.fromPins(
                                Pin(start: 0.0, end: 0.0),
                                Pin(size: 40.0, end: 0.0),
                                child: BlendMask(
                                  blendMode: BlendMode.multiply,
                                  child: Text(
                                    'OK',
                                    style: TextStyle(
                                      fontFamily: 'Arial',
                                      fontSize: 30,
                                      color: const Color(0xffb100ff),
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
                      Align(
                        alignment: Alignment(0.072, 1.0),
                        child: SizedBox(
                          width: 60.0,
                          height: 64.0,
                          child:
                              // Adobe XD layer: 'group' (group)
                              Stack(
                            children: <Widget>[
                              Pinned.fromPins(
                                Pin(start: 0.0, end: 0.0),
                                Pin(size: 16.0, start: 0.0),
                                child: Text(
                                  'Group',
                                  style: TextStyle(
                                    fontFamily: 'Arial',
                                    fontSize: 14,
                                    color: const Color(0xff008d00),
                                  ),
                                  textAlign: TextAlign.center,
                                ),
                              ),
                              Align(
                                alignment: Alignment.bottomLeft,
                                child: Container(
                                  width: 40.0,
                                  height: 40.0,
                                  decoration: BoxDecoration(
                                    gradient: LinearGradient(
                                      begin: Alignment(0.0, -1.0),
                                      end: Alignment(0.0, 1.0),
                                      colors: [
                                        const Color(0xffff0000),
                                        const Color(0xffffff00),
                                        const Color(0xff00ff00),
                                        const Color(0xff00ebff),
                                        const Color(0xff0039ff),
                                        const Color(0xfff500ff),
                                        const Color(0xffff0000)
                                      ],
                                      stops: [
                                        0.0,
                                        0.158,
                                        0.335,
                                        0.498,
                                        0.675,
                                        0.833,
                                        1.0
                                      ],
                                    ),
                                    border: Border.all(
                                        width: 3.0,
                                        color: const Color(0xff808080)),
                                  ),
                                ),
                              ),
                              Pinned.fromPins(
                                Pin(start: 0.0, end: 0.0),
                                Pin(size: 40.0, end: 0.0),
                                child:
                                    // Adobe XD layer: 'group' (group)
                                    BlendMask(
                                  blendMode: BlendMode.multiply,
                                  child: Stack(
                                    children: <Widget>[
                                      Pinned.fromPins(
                                        Pin(size: 40.0, end: 0.0),
                                        Pin(start: 0.0, end: 0.0),
                                        child: Container(
                                          decoration: BoxDecoration(
                                            gradient: LinearGradient(
                                              begin: Alignment(-1.0, 0.0),
                                              end: Alignment(1.0, 0.0),
                                              colors: [
                                                const Color(0xffff0000),
                                                const Color(0xffffff00),
                                                const Color(0xff00ff00),
                                                const Color(0xff00ebff),
                                                const Color(0xff0039ff),
                                                const Color(0xfff500ff),
                                                const Color(0xffff0000)
                                              ],
                                              stops: [
                                                0.0,
                                                0.158,
                                                0.335,
                                                0.498,
                                                0.675,
                                                0.833,
                                                1.0
                                              ],
                                            ),
                                            borderRadius:
                                                BorderRadius.circular(40.0),
                                            border: Border.all(
                                                width: 3.0,
                                                color: const Color(0xff808080)),
                                          ),
                                        ),
                                      ),
                                      SizedBox.expand(
                                          child: Text(
                                        'OK',
                                        style: TextStyle(
                                          fontFamily: 'Arial',
                                          fontSize: 30,
                                          color: const Color(0xffb100ff),
                                          fontWeight: FontWeight.w700,
                                        ),
                                        textAlign: TextAlign.center,
                                      )),
                                    ],
                                  ),
                                ),
                              ),
                            ],
                          ),
                        ),
                      ),
                      Align(
                        alignment: Alignment(0.246, 1.0),
                        child: SizedBox(
                          width: 60.0,
                          height: 64.0,
                          child:
                              // Adobe XD layer: 'nested' (group)
                              Stack(
                            children: <Widget>[
                              Pinned.fromPins(
                                Pin(start: 0.0, end: 0.0),
                                Pin(size: 16.0, start: 0.0),
                                child: Text(
                                  'Nested',
                                  style: TextStyle(
                                    fontFamily: 'Arial',
                                    fontSize: 14,
                                    color: const Color(0xff008d00),
                                  ),
                                  textAlign: TextAlign.center,
                                ),
                              ),
                              Align(
                                alignment: Alignment.bottomLeft,
                                child: Container(
                                  width: 40.0,
                                  height: 40.0,
                                  decoration: BoxDecoration(
                                    gradient: LinearGradient(
                                      begin: Alignment(0.0, -1.0),
                                      end: Alignment(0.0, 1.0),
                                      colors: [
                                        const Color(0xffff0000),
                                        const Color(0xffffff00),
                                        const Color(0xff00ff00),
                                        const Color(0xff00ebff),
                                        const Color(0xff0039ff),
                                        const Color(0xfff500ff),
                                        const Color(0xffff0000)
                                      ],
                                      stops: [
                                        0.0,
                                        0.158,
                                        0.335,
                                        0.498,
                                        0.675,
                                        0.833,
                                        1.0
                                      ],
                                    ),
                                    border: Border.all(
                                        width: 3.0,
                                        color: const Color(0xff808080)),
                                  ),
                                ),
                              ),
                              Pinned.fromPins(
                                Pin(start: 0.0, end: 0.0),
                                Pin(size: 40.0, end: 0.0),
                                child:
                                    // Adobe XD layer: 'group' (group)
                                    BlendMask(
                                  blendMode: BlendMode.multiply,
                                  child: Stack(
                                    children: <Widget>[
                                      Pinned.fromPins(
                                        Pin(size: 40.0, end: 0.0),
                                        Pin(start: 0.0, end: 0.0),
                                        child: BlendMask(
                                          blendMode: BlendMode.luminosity,
                                          child: Container(
                                            decoration: BoxDecoration(
                                              gradient: LinearGradient(
                                                begin: Alignment(-1.0, 0.0),
                                                end: Alignment(1.0, 0.0),
                                                colors: [
                                                  const Color(0xffff0000),
                                                  const Color(0xffffff00),
                                                  const Color(0xff00ff00),
                                                  const Color(0xff00ebff),
                                                  const Color(0xff0039ff),
                                                  const Color(0xfff500ff),
                                                  const Color(0xffff0000)
                                                ],
                                                stops: [
                                                  0.0,
                                                  0.158,
                                                  0.335,
                                                  0.498,
                                                  0.675,
                                                  0.833,
                                                  1.0
                                                ],
                                              ),
                                              borderRadius:
                                                  BorderRadius.circular(40.0),
                                              border: Border.all(
                                                  width: 3.0,
                                                  color:
                                                      const Color(0xff808080)),
                                            ),
                                          ),
                                        ),
                                      ),
                                      SizedBox.expand(
                                          child: Text(
                                        'OK',
                                        style: TextStyle(
                                          fontFamily: 'Arial',
                                          fontSize: 30,
                                          color: const Color(0xffb100ff),
                                          fontWeight: FontWeight.w700,
                                        ),
                                        textAlign: TextAlign.center,
                                      )),
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
              ],
            ),
          ),
          Pinned.fromPins(
            Pin(start: 0.0, end: 0.0),
            Pin(size: 48.0, start: 0.0),
            child:
                // Adobe XD layer: 'TitleBar' (component)
                XDTitleBar(
              title: 'Miscellaneous',
            ),
          ),
        ],
      ),
    );
  }
}

const String _svg_ptn5l3 =
    '<svg viewBox="433.0 27.0 40.0 40.0" ><path transform="translate(433.0, 27.0)" d="M 19.99999809265137 0 L 40 40 L 0 40 Z" fill="#008d00" fill-opacity="0.25" stroke="#000000" stroke-width="4" stroke-opacity="0.25" stroke-miterlimit="4" stroke-linecap="butt" /></svg>';
const String _svg_cecrqz =
    '<svg viewBox="28.0 0.0 40.0 40.0" ><defs><linearGradient id="gradient" x1="0.5" y1="0.0" x2="0.5" y2="1.0"><stop offset="0.0" stop-color="#000000" /><stop offset="1.0" stop-color="#5cff5c" /></linearGradient></defs><path transform="translate(28.0, 0.0)" d="M 19.99999809265137 0 L 40 40 L 0 40 Z" fill="url(#gradient)" fill-opacity="0.5" stroke="#000000" stroke-width="4" stroke-opacity="0.5" stroke-miterlimit="4" stroke-linecap="butt" /></svg>';
const String _svg_t1dbh =
    '<svg viewBox="524.0 27.0 40.0 40.0" ><defs><linearGradient id="gradient" x1="0.5" y1="0.0" x2="0.5" y2="1.0"><stop offset="0.0" stop-color="#000000" /><stop offset="1.0" stop-color="#5cff5c" /></linearGradient></defs><path transform="translate(524.0, 27.0)" d="M 19.99999809265137 0 L 40 40 L 0 40 Z" fill="url(#gradient)" fill-opacity="0.25" stroke="#000000" stroke-width="4" stroke-opacity="0.25" stroke-miterlimit="4" stroke-linecap="butt" /></svg>';

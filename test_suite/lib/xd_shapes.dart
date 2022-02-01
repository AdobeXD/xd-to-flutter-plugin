import 'package:flutter/material.dart';
import './xd_page_size.dart';
import 'package:adobe_xd/pinned.dart';
import './xd_test_group.dart';
import './xd_component261.dart';
import 'dart:ui' as ui;
import './xd_component251.dart';
import 'package:adobe_xd/gradient_xd_transform.dart';
import './xd_title_bar.dart';
import 'package:flutter_svg/flutter_svg.dart';

class XDShapes extends StatelessWidget {
  XDShapes({
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
            Pin(start: 16.0, end: 16.0),
            Pin(size: 225.0, end: 16.0),
            child:
                // Adobe XD layer: 'Unsupported' (group)
                Stack(
              children: <Widget>[
                Pinned.fromPins(
                  Pin(start: 0.0, end: 0.0),
                  Pin(start: 0.0, endFraction: 0.0),
                  child: XDTestGroup(
                    title: 'Unsupported',
                  ),
                ),
                Pinned.fromPins(
                  Pin(size: 852.0, start: 19.0),
                  Pin(size: 162.0, start: 48.0),
                  child:
                      // Adobe XD layer: 'fixed_size_content' (group)
                      Stack(
                    children: <Widget>[
                      Align(
                        alignment: Alignment.topLeft,
                        child:
                            // Adobe XD layer: 'rect_dashed_outline' (shape)
                            Container(
                          width: 64.0,
                          height: 64.0,
                          decoration: BoxDecoration(
                            color: const Color(0xffffffff),
                            border: Border.all(
                                width: 4.0, color: const Color(0xff981a1a)),
                          ),
                        ),
                      ),
                      Pinned.fromPins(
                        Pin(size: 64.0, start: 80.0),
                        Pin(size: 64.0, start: 0.0),
                        child:
                            // Adobe XD layer: 'rect_object_blur' (shape)
                            Container(
                          color: const Color(0xff981a1a),
                        ),
                      ),
                      Align(
                        alignment: Alignment(-0.594, -1.0),
                        child: SizedBox(
                          width: 64.0,
                          height: 64.0,
                          child:
                              // Adobe XD layer: 'poly_shadow' (shape)
                              SvgPicture.string(
                            _svg_j6zlqy,
                            allowDrawingOutsideViewBox: true,
                          ),
                        ),
                      ),
                      Align(
                        alignment: Alignment(0.239, -1.0),
                        child: SizedBox(
                          width: 64.0,
                          height: 64.0,
                          child:
                              // Adobe XD layer: 'poly_angular' (shape)
                              SvgPicture.string(
                            _svg_gnn4nj,
                            allowDrawingOutsideViewBox: true,
                          ),
                        ),
                      ),
                      Align(
                        alignment: Alignment(-0.391, -1.0),
                        child: SizedBox(
                          width: 64.0,
                          height: 64.0,
                          child:
                              // Adobe XD layer: 'poly_imagefill' (shape)
                              SvgPicture.string(
                            _svg_hzleq7,
                            allowDrawingOutsideViewBox: true,
                          ),
                        ),
                      ),
                      Pinned.fromPins(
                        Pin(size: 64.0, end: 35.0),
                        Pin(size: 64.0, start: 0.0),
                        child:
                            // Adobe XD layer: 'rect_transformed_im…' (shape)
                            Container(
                          decoration: BoxDecoration(
                            image: DecorationImage(
                              image: const AssetImage('assets/images/one.png'),
                              fit: BoxFit.cover,
                            ),
                            border: Border.all(
                                width: 4.0, color: const Color(0xff981a1a)),
                          ),
                        ),
                      ),
                      Align(
                        alignment: Alignment(-0.168, -1.0),
                        child: SizedBox(
                          width: 64.0,
                          height: 64.0,
                          child:
                              // Adobe XD layer: 'bgblur' (group)
                              Stack(
                            children: <Widget>[
                              Pinned.fromPins(
                                Pin(start: 6.0, end: 5.0),
                                Pin(size: 31.0, middle: 0.6667),
                                child:
                                    // Adobe XD layer: 'blur_target' (text)
                                    Text(
                                  'blur',
                                  style: TextStyle(
                                    fontFamily: 'Arial',
                                    fontSize: 28,
                                    color: const Color(0xff981a1a),
                                    fontWeight: FontWeight.w700,
                                  ),
                                  softWrap: false,
                                ),
                              ),
                              SizedBox.expand(
                                  child:
                                      // Adobe XD layer: 'poly_bgblur' (shape)
                                      SvgPicture.string(
                                _svg_xqr1cr,
                                allowDrawingOutsideViewBox: true,
                                fit: BoxFit.fill,
                              )),
                            ],
                          ),
                        ),
                      ),
                      Pinned.fromPins(
                        Pin(size: 48.0, middle: 0.209),
                        Pin(size: 48.0, end: 13.0),
                        child:
                            // Adobe XD layer: 'rect_stroke_center' (shape)
                            Container(
                          decoration: BoxDecoration(
                            border: Border.all(
                                width: 16.0, color: const Color(0xff981a1a)),
                          ),
                        ),
                      ),
                      Pinned.fromPins(
                        Pin(size: 48.0, middle: 0.3085),
                        Pin(size: 48.0, end: 13.0),
                        child:
                            // Adobe XD layer: 'rect_stroke_outer' (shape)
                            Container(
                          decoration: BoxDecoration(
                            border: Border.all(
                                width: 16.0, color: const Color(0xff981a1a)),
                          ),
                        ),
                      ),
                      Pinned.fromPins(
                        Pin(size: 64.0, middle: 0.4061),
                        Pin(size: 64.0, end: 5.0),
                        child:
                            // Adobe XD layer: 'rect_join_round' (shape)
                            Container(
                          decoration: BoxDecoration(
                            border: Border.all(
                                width: 20.0, color: const Color(0xff981a1a)),
                          ),
                        ),
                      ),
                      Pinned.fromPins(
                        Pin(size: 64.0, middle: 0.5076),
                        Pin(size: 64.0, end: 5.0),
                        child:
                            // Adobe XD layer: 'rect_join_bevel' (shape)
                            Container(
                          decoration: BoxDecoration(
                            border: Border.all(
                                width: 20.0, color: const Color(0xff981a1a)),
                          ),
                        ),
                      ),
                      Pinned.fromPins(
                        Pin(size: 48.0, start: 8.0),
                        Pin(size: 48.0, end: 13.0),
                        child:
                            // Adobe XD layer: 'poly_stroke_inner' (shape)
                            SvgPicture.string(
                          _svg_tb5jat,
                          allowDrawingOutsideViewBox: true,
                          fit: BoxFit.fill,
                        ),
                      ),
                      Pinned.fromPins(
                        Pin(size: 48.0, start: 88.0),
                        Pin(size: 48.0, end: 13.0),
                        child:
                            // Adobe XD layer: 'poly_stroke_outer' (shape)
                            SvgPicture.string(
                          _svg_ovew0f,
                          allowDrawingOutsideViewBox: true,
                          fit: BoxFit.fill,
                        ),
                      ),
                      Pinned.fromPins(
                        Pin(size: 16.0, end: 107.0),
                        Pin(size: 16.0, start: 24.0),
                        child: XDComponent261(),
                      ),
                      Align(
                        alignment: Alignment(0.036, -1.0),
                        child: SizedBox(
                          width: 64.0,
                          height: 64.0,
                          child:
                              // Adobe XD layer: 'bgbrightness' (group)
                              Stack(
                            children: <Widget>[
                              Pinned.fromPins(
                                Pin(start: 6.0, end: 5.0),
                                Pin(size: 31.0, middle: 0.5455),
                                child:
                                    // Adobe XD layer: 'blur_target' (text)
                                    Text(
                                  'blur',
                                  style: TextStyle(
                                    fontFamily: 'Arial',
                                    fontSize: 28,
                                    color: const Color(0xff981a1a),
                                    fontWeight: FontWeight.w700,
                                  ),
                                  softWrap: false,
                                ),
                              ),
                              // Adobe XD layer: 'rect_bgblur' (shape)
                              ClipRect(
                                child: BackdropFilter(
                                  filter: ui.ImageFilter.blur(
                                      sigmaX: 4.0, sigmaY: 4.0),
                                  child: Container(
                                    decoration: BoxDecoration(
                                      color: Colors.transparent,
                                      border: Border.all(
                                          width: 4.0,
                                          color: const Color(0xff981a1a)),
                                    ),
                                  ),
                                ),
                              ),
                            ],
                          ),
                        ),
                      ),
                      Align(
                        alignment: Alignment.bottomRight,
                        child: SizedBox(
                          width: 132.0,
                          height: 87.0,
                          child: Text(
                            'XD does not appear to expose ImageFill transformations, so we can’t generate a warning.',
                            style: TextStyle(
                              fontFamily: 'Arial',
                              fontSize: 14,
                              color: const Color(0xff000000),
                            ),
                          ),
                        ),
                      ),
                    ],
                  ),
                ),
                Pinned.fromPins(
                  Pin(size: 16.0, start: 106.0),
                  Pin(size: 15.0, middle: 0.0429),
                  child: XDComponent251(),
                ),
              ],
            ),
          ),
          Padding(
            padding: EdgeInsets.fromLTRB(16.0, 60.0, 16.0, 254.0),
            child:
                // Adobe XD layer: 'Pass' (group)
                Stack(
              children: <Widget>[
                Pinned.fromPins(
                  Pin(start: 0.0, end: 0.0),
                  Pin(start: 0.0, endFraction: 0.0),
                  child: XDTestGroup(
                    title: 'Supported',
                  ),
                ),
                Pinned.fromPins(
                  Pin(size: 864.0, start: 19.0),
                  Pin(size: 224.5, start: 51.0),
                  child:
                      // Adobe XD layer: 'fixed_size_content' (group)
                      Stack(
                    children: <Widget>[
                      Align(
                        alignment: Alignment.topRight,
                        child: SizedBox(
                          width: 64.0,
                          height: 64.0,
                          child:
                              // Adobe XD layer: 'bgblur' (group)
                              Stack(
                            children: <Widget>[
                              Pinned.fromPins(
                                Pin(start: 6.0, end: 5.0),
                                Pin(size: 31.0, middle: 0.5455),
                                child:
                                    // Adobe XD layer: 'blur_target' (text)
                                    Text(
                                  'blur',
                                  style: TextStyle(
                                    fontFamily: 'Arial',
                                    fontSize: 28,
                                    color: const Color(0xff008d00),
                                    fontWeight: FontWeight.w700,
                                  ),
                                  softWrap: false,
                                ),
                              ),
                              // Adobe XD layer: 'rect_bgblur' (shape)
                              ClipRect(
                                child: BackdropFilter(
                                  filter: ui.ImageFilter.blur(
                                      sigmaX: 4.0, sigmaY: 4.0),
                                  child: Container(
                                    decoration: BoxDecoration(
                                      color: Colors.transparent,
                                      border: Border.all(
                                          width: 4.0,
                                          color: const Color(0xff008d00)),
                                    ),
                                  ),
                                ),
                              ),
                            ],
                          ),
                        ),
                      ),
                      Pinned.fromPins(
                        Pin(size: 64.0, end: 80.0),
                        Pin(size: 64.0, start: 0.0),
                        child:
                            // Adobe XD layer: 'rect_shadow' (shape)
                            Container(
                          decoration: BoxDecoration(
                            color: const Color(0xff008d00),
                            boxShadow: [
                              BoxShadow(
                                color: const Color(0x99000000),
                                offset: Offset(0, 3),
                                blurRadius: 6,
                              ),
                            ],
                          ),
                        ),
                      ),
                      Align(
                        alignment: Alignment.topLeft,
                        child:
                            // Adobe XD layer: 'rect_solid' (shape)
                            Container(
                          width: 64.0,
                          height: 64.0,
                          color: const Color(0xff008d00),
                        ),
                      ),
                      Pinned.fromPins(
                        Pin(size: 64.0, start: 80.0),
                        Pin(size: 64.0, start: 0.0),
                        child:
                            // Adobe XD layer: 'rect_stroke' (shape)
                            Container(
                          decoration: BoxDecoration(
                            border: Border.all(
                                width: 4.0, color: const Color(0xff008d00)),
                          ),
                        ),
                      ),
                      Align(
                        alignment: Alignment(-0.6, -1.0),
                        child:
                            // Adobe XD layer: 'rect_fill_stroke' (shape)
                            Container(
                          width: 64.0,
                          height: 64.0,
                          decoration: BoxDecoration(
                            color: const Color(0x80008d00),
                            border: Border.all(
                                width: 4.0, color: const Color(0xff008d00)),
                          ),
                        ),
                      ),
                      Align(
                        alignment: Alignment(-0.4, -1.0),
                        child:
                            // Adobe XD layer: 'rect_linear' (shape)
                            Container(
                          width: 64.0,
                          height: 64.0,
                          decoration: BoxDecoration(
                            gradient: LinearGradient(
                              begin: Alignment(0.0, -1.0),
                              end: Alignment(0.0, 1.0),
                              colors: [
                                const Color(0xffffffff),
                                const Color(0xff008d00),
                                const Color(0xff000000)
                              ],
                              stops: [0.0, 0.478, 1.0],
                            ),
                            border: Border.all(
                                width: 4.0, color: const Color(0xff008d00)),
                          ),
                        ),
                      ),
                      Align(
                        alignment: Alignment(-0.2, -1.0),
                        child:
                            // Adobe XD layer: 'rect_linear_transfo…' (shape)
                            Container(
                          width: 64.0,
                          height: 64.0,
                          decoration: BoxDecoration(
                            gradient: LinearGradient(
                              begin: Alignment(-1.0, 1.0),
                              end: Alignment(1.0, -1.0),
                              colors: [
                                const Color(0xffffffff),
                                const Color(0xff008d00),
                                const Color(0xff000000)
                              ],
                              stops: [0.0, 0.478, 1.0],
                            ),
                            border: Border.all(
                                width: 4.0, color: const Color(0xff008d00)),
                          ),
                        ),
                      ),
                      Align(
                        alignment: Alignment.topCenter,
                        child:
                            // Adobe XD layer: 'rect_radial' (shape)
                            Container(
                          width: 64.0,
                          height: 64.0,
                          decoration: BoxDecoration(
                            gradient: RadialGradient(
                              center: Alignment(0.0, 0.0),
                              radius: 0.5,
                              colors: [
                                const Color(0xffffffff),
                                const Color(0xff008d00),
                                const Color(0xff001500),
                                const Color(0xff5e995e),
                                const Color(0xff7cc37c)
                              ],
                              stops: [0.0, 0.478, 0.842, 0.897, 1.0],
                              transform: GradientXDTransform(1.0, 0.0, 0.0, 1.0,
                                  0.0, 0.0, Alignment(0.0, 0.0)),
                            ),
                            border: Border.all(
                                width: 4.0, color: const Color(0xff008d00)),
                          ),
                        ),
                      ),
                      Align(
                        alignment: Alignment(0.4, -1.0),
                        child:
                            // Adobe XD layer: 'rect_angular' (shape)
                            Container(
                          width: 64.0,
                          height: 64.0,
                          decoration: BoxDecoration(
                            gradient: SweepGradient(
                              center: Alignment(-0.426, -0.355),
                              startAngle: 0.0,
                              endAngle: 6.2832,
                              colors: [
                                const Color(0xffffffff),
                                const Color(0xff008d00),
                                const Color(0xff001500),
                                const Color(0xff5e995e),
                                const Color(0xff7cc37c)
                              ],
                              stops: [0.0, 0.478, 0.842, 0.897, 1.0],
                              transform: GradientXDTransform(
                                  0.773,
                                  0.634,
                                  -0.634,
                                  0.773,
                                  0.0,
                                  0.0,
                                  Alignment(-0.426, -0.355)),
                            ),
                            border: Border.all(
                                width: 4.0, color: const Color(0xff008d00)),
                          ),
                        ),
                      ),
                      Align(
                        alignment: Alignment(0.2, -1.0),
                        child:
                            // Adobe XD layer: 'rect_radial_transfo…' (shape)
                            Container(
                          width: 64.0,
                          height: 64.0,
                          decoration: BoxDecoration(
                            gradient: RadialGradient(
                              center: Alignment(-1.0, 1.0),
                              radius: 0.95,
                              colors: [
                                const Color(0xffffffff),
                                const Color(0xff008d00),
                                const Color(0xff001500),
                                const Color(0xff5e995e),
                                const Color(0xff7cc37c)
                              ],
                              stops: [0.0, 0.478, 0.842, 0.897, 1.0],
                              transform: GradientXDTransform(
                                  0.707,
                                  -0.707,
                                  1.086,
                                  1.086,
                                  -1.086,
                                  -0.086,
                                  Alignment(-1.0, 1.0)),
                            ),
                            border: Border.all(
                                width: 4.0, color: const Color(0xff008d00)),
                          ),
                        ),
                      ),
                      Pinned.fromPins(
                        Pin(size: 64.0, start: 0.0),
                        Pin(size: 64.0, end: 0.5),
                        child:
                            // Adobe XD layer: 'rrect_all' (shape)
                            Container(
                          decoration: BoxDecoration(
                            color: const Color(0x80008d00),
                            borderRadius: BorderRadius.circular(24.0),
                            border: Border.all(
                                width: 4.0, color: const Color(0xff008d00)),
                          ),
                        ),
                      ),
                      Pinned.fromPins(
                        Pin(size: 64.0, start: 80.0),
                        Pin(size: 64.0, end: 0.5),
                        child:
                            // Adobe XD layer: 'rrect_each' (shape)
                            Container(
                          decoration: BoxDecoration(
                            color: const Color(0x80008d00),
                            borderRadius: BorderRadius.only(
                              topRight: Radius.circular(8.0),
                              bottomRight: Radius.circular(16.0),
                              bottomLeft: Radius.circular(32.0),
                            ),
                            border: Border.all(
                                width: 4.0, color: const Color(0xff008d00)),
                          ),
                        ),
                      ),
                      Align(
                        alignment: Alignment(0.6, -1.0),
                        child:
                            // Adobe XD layer: 'rect_imagefill' (shape)
                            Container(
                          width: 64.0,
                          height: 64.0,
                          decoration: BoxDecoration(
                            image: DecorationImage(
                              image: const AssetImage('assets/images/one.png'),
                              fit: BoxFit.cover,
                            ),
                            border: Border.all(
                                width: 4.0, color: const Color(0xff008d00)),
                          ),
                        ),
                      ),
                      Pinned.fromPins(
                        Pin(size: 64.0, middle: 0.2),
                        Pin(size: 64.0, end: 0.5),
                        child:
                            // Adobe XD layer: 'circle' (shape)
                            Container(
                          decoration: BoxDecoration(
                            color: const Color(0x80008d00),
                            borderRadius: BorderRadius.all(
                                Radius.elliptical(9999.0, 9999.0)),
                            border: Border.all(
                                width: 4.0, color: const Color(0xff008d00)),
                          ),
                        ),
                      ),
                      Pinned.fromPins(
                        Pin(size: 64.0, middle: 0.3),
                        Pin(size: 32.0, end: 16.5),
                        child:
                            // Adobe XD layer: 'ellipse' (shape)
                            Container(
                          decoration: BoxDecoration(
                            color: const Color(0x808d7700),
                            borderRadius: BorderRadius.all(
                                Radius.elliptical(9999.0, 9999.0)),
                            border: Border.all(
                                width: 4.0, color: const Color(0xffc37f00)),
                          ),
                        ),
                      ),
                      Pinned.fromPins(
                        Pin(size: 32.0, middle: 0.4038),
                        Pin(size: 64.0, end: 0.5),
                        child:
                            // Adobe XD layer: 'ellipse' (shape)
                            Container(
                          decoration: BoxDecoration(
                            color: const Color(0x808d7700),
                            borderRadius: BorderRadius.all(
                                Radius.elliptical(9999.0, 9999.0)),
                            border: Border.all(
                                width: 4.0, color: const Color(0xffc37f00)),
                          ),
                        ),
                      ),
                      Align(
                        alignment: Alignment.centerLeft,
                        child: SizedBox(
                          width: 64.0,
                          height: 64.0,
                          child:
                              // Adobe XD layer: 'poly_solid' (shape)
                              SvgPicture.string(
                            _svg_frukp,
                            allowDrawingOutsideViewBox: true,
                          ),
                        ),
                      ),
                      Pinned.fromPins(
                        Pin(size: 64.0, start: 80.0),
                        Pin(size: 64.0, middle: 0.4984),
                        child:
                            // Adobe XD layer: 'poly_stroke' (shape)
                            SvgPicture.string(
                          _svg_nh9mq2,
                          allowDrawingOutsideViewBox: true,
                          fit: BoxFit.fill,
                        ),
                      ),
                      Align(
                        alignment: Alignment(-0.6, -0.003),
                        child: SizedBox(
                          width: 64.0,
                          height: 64.0,
                          child:
                              // Adobe XD layer: 'poly_fill_stroke' (shape)
                              SvgPicture.string(
                            _svg_g2ic3s,
                            allowDrawingOutsideViewBox: true,
                          ),
                        ),
                      ),
                      Align(
                        alignment: Alignment(-0.4, -0.003),
                        child: SizedBox(
                          width: 64.0,
                          height: 64.0,
                          child:
                              // Adobe XD layer: 'poly_linear' (shape)
                              SvgPicture.string(
                            _svg_jljapw,
                            allowDrawingOutsideViewBox: true,
                          ),
                        ),
                      ),
                      Align(
                        alignment: Alignment(-0.2, -0.003),
                        child: SizedBox(
                          width: 64.0,
                          height: 64.0,
                          child:
                              // Adobe XD layer: 'poly_linear_transfo…' (shape)
                              SvgPicture.string(
                            _svg_rwlunm,
                            allowDrawingOutsideViewBox: true,
                          ),
                        ),
                      ),
                      Center(
                        child: SizedBox(
                          width: 64.0,
                          height: 64.0,
                          child:
                              // Adobe XD layer: 'poly_radial' (shape)
                              SvgPicture.string(
                            _svg_yqqm,
                            allowDrawingOutsideViewBox: true,
                          ),
                        ),
                      ),
                      Align(
                        alignment: Alignment(0.2, -0.003),
                        child: SizedBox(
                          width: 64.0,
                          height: 64.0,
                          child:
                              // Adobe XD layer: 'poly_radial_transfo…' (shape)
                              SvgPicture.string(
                            _svg_q8b9y2,
                            allowDrawingOutsideViewBox: true,
                          ),
                        ),
                      ),
                      Align(
                        alignment: Alignment(0.4, -0.003),
                        child: SizedBox(
                          width: 64.0,
                          height: 64.0,
                          child:
                              // Adobe XD layer: 'poly_custom' (shape)
                              SvgPicture.string(
                            _svg_qumbx,
                            allowDrawingOutsideViewBox: true,
                          ),
                        ),
                      ),
                      Align(
                        alignment: Alignment(0.6, -0.003),
                        child: SizedBox(
                          width: 64.0,
                          height: 64.0,
                          child:
                              // Adobe XD layer: 'poly_subtract' (shape)
                              SvgPicture.string(
                            _svg_qmuxnx,
                            allowDrawingOutsideViewBox: true,
                          ),
                        ),
                      ),
                      Align(
                        alignment: Alignment(0.188, 1.0),
                        child: SizedBox(
                          width: 1.0,
                          height: 64.0,
                          child:
                              // Adobe XD layer: 'line_v' (shape)
                              SvgPicture.string(
                            _svg_tctnye,
                            allowDrawingOutsideViewBox: true,
                          ),
                        ),
                      ),
                      Pinned.fromPins(
                        Pin(size: 64.0, end: 79.6),
                        Pin(size: 64.0, middle: 0.498),
                        child:
                            // Adobe XD layer: 'poly_xor' (shape)
                            SvgPicture.string(
                          _svg_zhu,
                          allowDrawingOutsideViewBox: true,
                          fit: BoxFit.fill,
                        ),
                      ),
                      Align(
                        alignment: Alignment(0.001, 1.0),
                        child: SizedBox(
                          width: 64.0,
                          height: 64.0,
                          child:
                              // Adobe XD layer: 'line' (shape)
                              SvgPicture.string(
                            _svg_goet9v,
                            allowDrawingOutsideViewBox: true,
                          ),
                        ),
                      ),
                      Pinned.fromPins(
                        Pin(size: 48.0, end: 86.5),
                        Pin(size: 48.0, end: 8.0),
                        child:
                            // Adobe XD layer: 'endcap_round' (shape)
                            SvgPicture.string(
                          _svg_viia28,
                          allowDrawingOutsideViewBox: true,
                          fit: BoxFit.fill,
                        ),
                      ),
                      Pinned.fromPins(
                        Pin(size: 48.0, end: 7.5),
                        Pin(size: 48.0, end: 8.0),
                        child:
                            // Adobe XD layer: 'encap_projecting' (shape)
                            SvgPicture.string(
                          _svg_k98h81,
                          allowDrawingOutsideViewBox: true,
                          fit: BoxFit.fill,
                        ),
                      ),
                      Pinned.fromPins(
                        Pin(size: 48.0, middle: 0.6961),
                        Pin(size: 48.0, end: 8.5),
                        child:
                            // Adobe XD layer: 'poly_join_round' (shape)
                            SvgPicture.string(
                          _svg_sgwrss,
                          allowDrawingOutsideViewBox: true,
                          fit: BoxFit.fill,
                        ),
                      ),
                      Pinned.fromPins(
                        Pin(size: 48.0, middle: 0.7953),
                        Pin(size: 48.0, end: 8.5),
                        child:
                            // Adobe XD layer: 'poly_join_bevel' (shape)
                            SvgPicture.string(
                          _svg_c6toy0,
                          allowDrawingOutsideViewBox: true,
                          fit: BoxFit.fill,
                        ),
                      ),
                      Pinned.fromPins(
                        Pin(size: 84.0, middle: 0.3449),
                        Pin(size: 16.0, end: 0.5),
                        child: Text(
                          '#98',
                          style: TextStyle(
                            fontFamily: 'Arial',
                            fontSize: 14,
                            color: const Color(0xffc37f00),
                          ),
                          textAlign: TextAlign.center,
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
              title: 'Shapes',
            ),
          ),
        ],
      ),
    );
  }
}

const String _svg_j6zlqy =
    '<svg viewBox="160.0 0.0 64.0 64.0" ><path transform="translate(160.0, 0.0)" d="M 31.99999618530273 0 L 63.99999618530273 64 L 0 64 Z" fill="#981a1a" stroke="none" stroke-width="1" stroke-miterlimit="4" stroke-linecap="butt" /></svg>';
const String _svg_gnn4nj =
    '<svg viewBox="488.0 0.0 64.0 64.0" ><path transform="translate(488.0, 0.0)" d="M 31.99999618530273 0 L 63.99999618530273 64 L 0 64 Z" fill="none" stroke="#981a1a" stroke-width="4" stroke-miterlimit="4" stroke-linecap="butt" /></svg>';
const String _svg_hzleq7 =
    '<svg viewBox="240.0 0.0 64.0 64.0" ><path transform="translate(240.0, 0.0)" d="M 31.99999618530273 0 L 63.99999618530273 64 L 0 64 Z" fill="none" stroke="#981a1a" stroke-width="4" stroke-miterlimit="4" stroke-linecap="butt" /></svg>';
const String _svg_xqr1cr =
    '<svg viewBox="0.0 0.0 64.0 64.0" ><path  d="M 31.99999618530273 0 L 63.99999618530273 64 L 0 64 Z" fill="#981a1a" fill-opacity="0.15" stroke="#981a1a" stroke-width="4" stroke-miterlimit="4" stroke-linecap="butt" /></svg>';
const String _svg_tb5jat =
    '<svg viewBox="8.0 101.0 48.0 48.0" ><path transform="translate(8.0, 101.0)" d="M 24 0 L 48 48 L 0 48 Z" fill="none" stroke="#981a1a" stroke-width="10" stroke-miterlimit="4" stroke-linecap="butt" /></svg>';
const String _svg_ovew0f =
    '<svg viewBox="88.0 101.0 48.0 48.0" ><path transform="translate(88.0, 101.0)" d="M 24 0 L 48 48 L 0 48 Z" fill="none" stroke="#981a1a" stroke-width="10" stroke-miterlimit="4" stroke-linecap="butt" /></svg>';
const String _svg_frukp =
    '<svg viewBox="0.0 80.0 64.0 64.0" ><path transform="translate(0.0, 80.0)" d="M 31.99999618530273 0 L 63.99999618530273 64 L 0 64 Z" fill="#008d00" stroke="none" stroke-width="1" stroke-miterlimit="4" stroke-linecap="butt" /></svg>';
const String _svg_nh9mq2 =
    '<svg viewBox="80.0 80.0 64.0 64.0" ><path transform="translate(80.0, 80.0)" d="M 31.99999618530273 0 L 63.99999618530273 64 L 0 64 Z" fill="none" stroke="#008d00" stroke-width="4" stroke-miterlimit="4" stroke-linecap="butt" /></svg>';
const String _svg_g2ic3s =
    '<svg viewBox="160.0 80.0 64.0 64.0" ><path transform="translate(160.0, 80.0)" d="M 31.99999618530273 0 L 63.99999618530273 64 L 0 64 Z" fill="#008d00" fill-opacity="0.5" stroke="#008d00" stroke-width="4" stroke-miterlimit="4" stroke-linecap="butt" /></svg>';
const String _svg_jljapw =
    '<svg viewBox="240.0 80.0 64.0 64.0" ><defs><linearGradient id="gradient" x1="0.5" y1="0.0" x2="0.5" y2="1.0"><stop offset="0.0" stop-color="#ffffff" /><stop offset="0.507389" stop-color="#008d00" /><stop offset="1.0" stop-color="#000000" /></linearGradient></defs><path transform="translate(240.0, 80.0)" d="M 31.99999618530273 0 L 63.99999618530273 64 L 0 64 Z" fill="url(#gradient)" stroke="#008d00" stroke-width="4" stroke-miterlimit="4" stroke-linecap="butt" /></svg>';
const String _svg_rwlunm =
    '<svg viewBox="320.0 80.0 64.0 64.0" ><defs><linearGradient id="gradient" x1="0.0" y1="1.0" x2="0.851502" y2="0.68573"><stop offset="0.0" stop-color="#ffffff" /><stop offset="0.507389" stop-color="#008d00" /><stop offset="1.0" stop-color="#000000" /></linearGradient></defs><path transform="translate(320.0, 80.0)" d="M 31.99999618530273 0 L 63.99999618530273 64 L 0 64 Z" fill="url(#gradient)" stroke="#008d00" stroke-width="4" stroke-miterlimit="4" stroke-linecap="butt" /></svg>';
const String _svg_yqqm =
    '<svg viewBox="400.0 80.0 64.0 64.0" ><defs><radialGradient id="gradient" gradientTransform="matrix(1.0 0.0 0.0 1.0 0.0 0.0)" fx="0.5" fy="0.5" fr="0.0" cx="0.5" cy="0.5" r="0.5"><stop offset="0.0" stop-color="#ffffff" /><stop offset="0.477833" stop-color="#008d00" /><stop offset="0.842365" stop-color="#001500" /><stop offset="0.896552" stop-color="#5e995e" /><stop offset="1.0" stop-color="#7cc37c" /></radialGradient></defs><path transform="translate(400.0, 80.0)" d="M 31.99999618530273 0 L 63.99999618530273 64 L 0 64 Z" fill="url(#gradient)" stroke="#008d00" stroke-width="4" stroke-miterlimit="4" stroke-linecap="butt" /></svg>';
const String _svg_q8b9y2 =
    '<svg viewBox="480.0 80.0 64.0 64.0" ><defs><radialGradient id="gradient" gradientTransform="matrix(1.0 0.0 0.0 3.866325 0.0 -0.224981)" fx="0.5" fy="0.078491" fr="0.0" cx="0.5" cy="0.078491" r="0.238342"><stop offset="0.0" stop-color="#ffffff" /><stop offset="0.477833" stop-color="#008d00" /><stop offset="0.842365" stop-color="#001500" /><stop offset="0.896552" stop-color="#5e995e" /><stop offset="1.0" stop-color="#7cc37c" /></radialGradient></defs><path transform="translate(480.0, 80.0)" d="M 31.99999618530273 0 L 63.99999618530273 64 L 0 64 Z" fill="url(#gradient)" stroke="#008d00" stroke-width="4" stroke-miterlimit="4" stroke-linecap="butt" /></svg>';
const String _svg_qumbx =
    '<svg viewBox="560.0 80.0 64.0 64.0" ><path transform="translate(-7.58, -20.08)" d="M 567.578125 103.5450668334961 C 605.7705078125 91.07482147216797 626.09716796875 116.2523193359375 626.09716796875 116.2523193359375 C 626.09716796875 116.2523193359375 643.6503295898438 136.1093139648438 615.9313354492188 151.7548522949219 C 588.2123413085938 167.400390625 561.7362060546875 170.487548828125 575.8258056640625 147.1605529785156 C 589.9154052734375 123.8335266113281 567.578125 103.5450668334961 567.578125 103.5450668334961 Z" fill="#008d00" stroke="none" stroke-width="1" stroke-miterlimit="4" stroke-linecap="butt" /></svg>';
const String _svg_qmuxnx =
    '<svg viewBox="640.0 80.0 64.0 64.0" ><path transform="translate(640.0, 80.0)" d="M 13.11273193359375 63.99957275390625 C 11.1270751953125 63.99957275390625 9.44451904296875 63.735107421875 8.11187744140625 63.2135009765625 C 6.73077392578125 62.67291259765625 5.7144775390625 61.8511962890625 5.0911865234375 60.771240234375 C 4.32928466796875 59.4510498046875 4.14599609375 57.7313232421875 4.54644775390625 55.65985107421875 C 4.9688720703125 53.474365234375 6.04718017578125 50.87091064453125 7.7513427734375 47.92181396484375 L 54.07977294921875 47.92181396484375 C 52.38836669921875 49.22393798828125 50.4615478515625 50.48663330078125 48.3533935546875 51.67657470703125 C 41.68280029296875 55.441650390625 34.91131591796875 58.56695556640625 28.77093505859375 60.71466064453125 C 22.62677001953125 62.86370849609375 17.21221923828125 63.99957275390625 13.11273193359375 63.99957275390625 Z M 57.11529541015625 45.30902099609375 L 35.49212646484375 2.0626220703125 C 38.95159912109375 3.057861328125 42.3126220703125 4.4189453125 45.4830322265625 6.106689453125 C 48.0213623046875 7.4578857421875 50.445556640625 9.02117919921875 52.68817138671875 10.753173828125 C 56.50592041015625 13.70172119140625 58.49920654296875 16.14990234375 58.5189208984375 16.17431640625 C 58.55194091796875 16.211669921875 61.8409423828125 19.97607421875 63.30120849609375 25.42449951171875 C 64.1588134765625 28.62420654296875 64.22711181640625 31.7701416015625 63.50421142578125 34.77490234375 C 62.60064697265625 38.5301513671875 60.45147705078125 42.07403564453125 57.11627197265625 45.30810546875 L 57.11529541015625 45.30902099609375 Z M 12.54248046875 35.6798095703125 L 12.54058837890625 35.67919921875 C 13.20880126953125 31.53802490234375 12.96588134765625 27.26824951171875 11.81854248046875 22.988525390625 C 10.9002685546875 19.56298828125 9.40374755859375 16.12322998046875 7.37054443359375 12.764892578125 C 3.9091796875 7.047607421875 0.0386962890625 3.50238037109375 0 3.46722412109375 C 7.0478515625 1.16595458984375 13.9825439453125 0 20.6116943359375 0 C 23.78546142578125 0 26.938720703125 0.26812744140625 29.98388671875 0.79705810546875 L 12.54248046875 35.6798095703125 Z" fill="#008d00" stroke="none" stroke-width="1" stroke-miterlimit="4" stroke-linecap="butt" /></svg>';
const String _svg_tctnye =
    '<svg viewBox="512.5 160.5 1.0 64.0" ><path transform="translate(512.5, 160.5)" d="M 0 0 L 0 64" fill="none" stroke="#008d00" stroke-width="4" stroke-miterlimit="4" stroke-linecap="butt" /></svg>';
const String _svg_zhu =
    '<svg viewBox="720.4 79.9 64.0 64.0" ><path transform="translate(720.42, 79.92)" d="M 64 64 L 63.99835205078125 64 L 31.99957275390625 64 L 47.99908447265625 32.0013427734375 L 63.999267578125 63.99859619140625 L 64 64 Z M 31.99951171875 64 L 31.9979248046875 64 L 0 64 L 15.99908447265625 32.0013427734375 L 31.99884033203125 63.99859619140625 L 31.99951171875 64 Z M 47.99951171875 32.00048828125 L 47.99859619140625 31.9986572265625 L 31.99957275390625 0 L 63.99993896484375 0 L 48.00042724609375 31.9986572265625 L 47.99951171875 32.00048828125 Z M 15.99951171875 32.00048828125 L 15.99859619140625 31.9986572265625 L 0 0 L 31.99957275390625 0 L 16.00042724609375 31.9986572265625 L 15.99951171875 32.00048828125 Z" fill="#008d00" fill-opacity="0.5" stroke="#008d00" stroke-width="4" stroke-miterlimit="4" stroke-linecap="butt" /></svg>';
const String _svg_goet9v =
    '<svg viewBox="400.5 160.5 64.0 64.0" ><path transform="translate(400.5, 160.5)" d="M 0 0 L 64 64" fill="none" stroke="#008d00" stroke-width="4" stroke-miterlimit="4" stroke-linecap="butt" /></svg>';
const String _svg_viia28 =
    '<svg viewBox="729.5 168.5 48.0 48.0" ><path transform="translate(729.5, 168.5)" d="M 0 0 L 48 48" fill="none" stroke="#008d00" stroke-width="20" stroke-miterlimit="4" stroke-linecap="round" /></svg>';
const String _svg_k98h81 =
    '<svg viewBox="808.5 168.5 48.0 48.0" ><path transform="translate(808.5, 168.5)" d="M 0 0 L 48 48" fill="none" stroke="#008d00" stroke-width="20" stroke-miterlimit="4" stroke-linecap="square" /></svg>';
const String _svg_sgwrss =
    '<svg viewBox="568.0 168.0 48.0 48.0" ><path transform="translate(568.0, 168.0)" d="M 24 0 L 48 48 L 0 48 Z" fill="none" stroke="#008d00" stroke-width="16" stroke-linecap="butt" stroke-linejoin="round" /></svg>';
const String _svg_c6toy0 =
    '<svg viewBox="649.0 168.0 48.0 48.0" ><path transform="translate(649.0, 168.0)" d="M 24 0 L 48 48 L 0 48 Z" fill="none" stroke="#008d00" stroke-width="16" stroke-linecap="butt" stroke-linejoin="bevel" /></svg>';

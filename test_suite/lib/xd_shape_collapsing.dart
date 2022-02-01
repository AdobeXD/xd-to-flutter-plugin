import 'package:flutter/material.dart';
import './xd_page_size.dart';
import 'package:adobe_xd/pinned.dart';
import 'dart:ui' as ui;
import 'package:adobe_xd/blend_mask.dart';
import 'package:flutter_svg/flutter_svg.dart';
import './xd_title_bar.dart';

class XDShapeCollapsing extends StatelessWidget {
  final VoidCallback? onTap;
  XDShapeCollapsing({
    Key? key,
    this.onTap,
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
          Transform.translate(
            offset: Offset(14.0, 64.0),
            child: SizedBox(
              width: 915.0,
              height: 640.0,
              child:
                  // Adobe XD layer: 'content' (group)
                  Stack(
                children: <Widget>[
                  Transform.translate(
                    offset: Offset(219.0, 0.0),
                    child: Container(
                      width: 5.0,
                      height: 640.0,
                      color: const Color(0xff909090),
                    ),
                  ),
                  Transform.translate(
                    offset: Offset(455.0, 0.0),
                    child: Container(
                      width: 5.0,
                      height: 640.0,
                      color: const Color(0xff909090),
                    ),
                  ),
                  Transform.translate(
                    offset: Offset(693.0, 0.0),
                    child: Container(
                      width: 5.0,
                      height: 640.0,
                      color: const Color(0xff909090),
                    ),
                  ),
                  Pinned.fromPins(
                    Pin(size: 201.0, start: 2.0),
                    Pin(size: 113.0, start: 6.0),
                    child:
                        // Adobe XD layer: 'shape_shape' (group)
                        Stack(
                      children: <Widget>[
                        SizedBox(
                          width: 201.0,
                          height: 40.0,
                          child: Text(
                            'shape -> shape, combine',
                            style: TextStyle(
                              fontFamily: 'Arial',
                              fontSize: 14,
                              color: const Color(0xff707070),
                            ),
                          ),
                        ),
                        Transform.translate(
                          offset: Offset(0.0, 46.0),
                          child: SizedBox(
                            width: 117.0,
                            height: 67.0,
                            child: SvgPicture.string(
                              _svg_tk4vb,
                              allowDrawingOutsideViewBox: true,
                            ),
                          ),
                        ),
                      ],
                    ),
                  ),
                  Pinned.fromPins(
                    Pin(size: 201.0, start: 2.0),
                    Pin(size: 113.0, middle: 0.2581),
                    child:
                        // Adobe XD layer: 'shape_rect' (group)
                        Stack(
                      children: <Widget>[
                        SizedBox(
                          width: 201.0,
                          height: 40.0,
                          child: Text(
                            'shape -> rect, shouldn’t combine',
                            style: TextStyle(
                              fontFamily: 'Arial',
                              fontSize: 14,
                              color: const Color(0xff707070),
                            ),
                          ),
                        ),
                        Transform.translate(
                          offset: Offset(0.0, 46.0),
                          child: SizedBox(
                            width: 78.0,
                            height: 67.0,
                            child: SvgPicture.string(
                              _svg_av0if6,
                              allowDrawingOutsideViewBox: true,
                            ),
                          ),
                        ),
                        Transform.translate(
                          offset: Offset(52.0, 46.0),
                          child: Container(
                            width: 67.0,
                            height: 67.0,
                            color: const Color(0xff14ff00),
                          ),
                        ),
                      ],
                    ),
                  ),
                  Pinned.fromPins(
                    Pin(size: 201.0, start: 2.0),
                    Pin(size: 113.0, middle: 0.5047),
                    child:
                        // Adobe XD layer: 'shape_rect_cs' (group)
                        Stack(
                      children: <Widget>[
                        SizedBox(
                          width: 201.0,
                          height: 40.0,
                          child: Text(
                            'shape -> rect (CS), combine',
                            style: TextStyle(
                              fontFamily: 'Arial',
                              fontSize: 14,
                              color: const Color(0xff707070),
                            ),
                          ),
                        ),
                        Transform.translate(
                          offset: Offset(0.0, 46.0),
                          child: SizedBox(
                            width: 119.0,
                            height: 67.0,
                            child: SvgPicture.string(
                              _svg_nc6dj,
                              allowDrawingOutsideViewBox: true,
                            ),
                          ),
                        ),
                      ],
                    ),
                  ),
                  Pinned.fromPins(
                    Pin(size: 201.0, start: 2.0),
                    Pin(size: 113.0, middle: 0.7514),
                    child:
                        // Adobe XD layer: 'rect_shape_cs' (group)
                        Stack(
                      children: <Widget>[
                        SizedBox(
                          width: 201.0,
                          height: 40.0,
                          child: Text(
                            'rect -> shape (CS), combine',
                            style: TextStyle(
                              fontFamily: 'Arial',
                              fontSize: 14,
                              color: const Color(0xff707070),
                            ),
                          ),
                        ),
                        Transform.translate(
                          offset: Offset(0.0, 46.0),
                          child: SizedBox(
                            width: 128.0,
                            height: 67.0,
                            child: SvgPicture.string(
                              _svg_yffzpr,
                              allowDrawingOutsideViewBox: true,
                            ),
                          ),
                        ),
                      ],
                    ),
                  ),
                  Pinned.fromPins(
                    Pin(size: 201.0, start: 0.0),
                    Pin(size: 113.0, end: 1.0),
                    child:
                        // Adobe XD layer: 'group' (group)
                        Stack(
                      children: <Widget>[
                        SizedBox(
                          width: 201.0,
                          height: 40.0,
                          child: Text(
                            'group (CS), combine',
                            style: TextStyle(
                              fontFamily: 'Arial',
                              fontSize: 14,
                              color: const Color(0xff707070),
                            ),
                          ),
                        ),
                        Transform.translate(
                          offset: Offset(0.0, 46.0),
                          child: SizedBox(
                            width: 173.0,
                            height: 67.0,
                            child: SvgPicture.string(
                              _svg_dg,
                              allowDrawingOutsideViewBox: true,
                            ),
                          ),
                        ),
                      ],
                    ),
                  ),
                  Pinned.fromPins(
                    Pin(size: 201.0, middle: 0.3361),
                    Pin(size: 143.3, start: 6.0),
                    child:
                        // Adobe XD layer: 'transformed' (group)
                        Stack(
                      children: <Widget>[
                        SizedBox(
                          width: 201.0,
                          height: 40.0,
                          child: Text(
                            'transformed shapes & rects (CS), combine',
                            style: TextStyle(
                              fontFamily: 'Arial',
                              fontSize: 14,
                              color: const Color(0xff707070),
                            ),
                          ),
                        ),
                        Transform.translate(
                          offset: Offset(0.0, 18.5),
                          child: SizedBox(
                            width: 199.0,
                            height: 125.0,
                            child: SvgPicture.string(
                              _svg_dy9pcm,
                              allowDrawingOutsideViewBox: true,
                            ),
                          ),
                        ),
                      ],
                    ),
                  ),
                  Align(
                    alignment: Alignment(-0.328, -0.484),
                    child: SizedBox(
                      width: 201.0,
                      height: 113.0,
                      child:
                          // Adobe XD layer: 'nested' (group)
                          Stack(
                        children: <Widget>[
                          SizedBox(
                            width: 201.0,
                            height: 40.0,
                            child: Text(
                              'nested group (CS), combine',
                              style: TextStyle(
                                fontFamily: 'Arial',
                                fontSize: 14,
                                color: const Color(0xff707070),
                              ),
                            ),
                          ),
                          Transform.translate(
                            offset: Offset(0.0, 46.0),
                            child: SizedBox(
                              width: 199.0,
                              height: 67.0,
                              child: SvgPicture.string(
                                _svg_vbl7at,
                                allowDrawingOutsideViewBox: true,
                              ),
                            ),
                          ),
                        ],
                      ),
                    ),
                  ),
                  Align(
                    alignment: Alignment(-0.328, 0.009),
                    child: SizedBox(
                      width: 201.0,
                      height: 113.0,
                      child:
                          // Adobe XD layer: 'nested_shapes' (group)
                          Stack(
                        children: <Widget>[
                          SizedBox(
                            width: 201.0,
                            height: 40.0,
                            child: Text(
                              'nested group of shapes, combine',
                              style: TextStyle(
                                fontFamily: 'Arial',
                                fontSize: 14,
                                color: const Color(0xff707070),
                              ),
                            ),
                          ),
                          Transform.translate(
                            offset: Offset(0.0, 46.0),
                            child: SizedBox(
                              width: 195.0,
                              height: 67.0,
                              child: SvgPicture.string(
                                _svg_b0xis2,
                                allowDrawingOutsideViewBox: true,
                              ),
                            ),
                          ),
                        ],
                      ),
                    ),
                  ),
                  Align(
                    alignment: Alignment(-0.328, 0.6),
                    child: SizedBox(
                      width: 201.0,
                      height: 145.0,
                      child:
                          // Adobe XD layer: 'mixed_group' (group)
                          Stack(
                        children: <Widget>[
                          SizedBox(
                            width: 201.0,
                            height: 72.0,
                            child: Text(
                              'mixed group: outer group preserved, orange rect as container, inner group combined. (CS)',
                              style: TextStyle(
                                fontFamily: 'Arial',
                                fontSize: 14,
                                color: const Color(0xff707070),
                              ),
                            ),
                          ),
                          Transform.translate(
                            offset: Offset(0.0, 78.0),
                            child: SizedBox(
                              width: 67.0,
                              height: 67.0,
                              child: SvgPicture.string(
                                _svg_ve3mgt,
                                allowDrawingOutsideViewBox: true,
                              ),
                            ),
                          ),
                          Transform.translate(
                            offset: Offset(19.0, 78.0),
                            child: SizedBox(
                              width: 180.0,
                              height: 67.0,
                              child:
                                  // Adobe XD layer: 'outer' (group)
                                  Stack(
                                children: <Widget>[
                                  Transform.translate(
                                    offset: Offset(0.0, 23.0),
                                    child: Text(
                                      'TEXT',
                                      style: TextStyle(
                                        fontFamily: 'Arial',
                                        fontSize: 20,
                                        color: const Color(0xff000000),
                                      ),
                                      softWrap: false,
                                    ),
                                  ),
                                  Transform.translate(
                                    offset: Offset(27.0, 0.0),
                                    child: SizedBox(
                                      width: 153.0,
                                      height: 67.0,
                                      child: SvgPicture.string(
                                        _svg_nxstu,
                                        allowDrawingOutsideViewBox: true,
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
                  Align(
                    alignment: Alignment(0.333, -1.0),
                    child: SizedBox(
                      width: 201.0,
                      height: 113.0,
                      child:
                          // Adobe XD layer: 'on_tap' (group)
                          Stack(
                        children: <Widget>[
                          SizedBox(
                            width: 201.0,
                            height: 40.0,
                            child: Text(
                              'combine before & after onTap (purple tri) (CS) ',
                              style: TextStyle(
                                fontFamily: 'Arial',
                                fontSize: 14,
                                color: const Color(0xff707070),
                              ),
                            ),
                          ),
                          Transform.translate(
                            offset: Offset(0.0, 46.0),
                            child: SizedBox(
                              width: 86.0,
                              height: 67.0,
                              child: SvgPicture.string(
                                _svg_hk9edj,
                                allowDrawingOutsideViewBox: true,
                              ),
                            ),
                          ),
                          Transform.translate(
                            offset: Offset(28.0, 46.0),
                            child: SizedBox(
                              width: 78.0,
                              height: 67.0,
                              child:
                                  // Adobe XD layer: 'tap_group' (group)
                                  GestureDetector(
                                onTap: () => onTap?.call(),
                                child: Stack(
                                  children: <Widget>[
                                    SizedBox(
                                      width: 78.0,
                                      height: 67.0,
                                      child: SvgPicture.string(
                                        _svg_pku0su,
                                        allowDrawingOutsideViewBox: true,
                                      ),
                                    ),
                                  ],
                                ),
                              ),
                            ),
                          ),
                          Transform.translate(
                            offset: Offset(67.0, 46.0),
                            child: SizedBox(
                              width: 106.0,
                              height: 67.0,
                              child: SvgPicture.string(
                                _svg_rl1j89,
                                allowDrawingOutsideViewBox: true,
                              ),
                            ),
                          ),
                        ],
                      ),
                    ),
                  ),
                  Align(
                    alignment: Alignment(0.328, -0.507),
                    child: SizedBox(
                      width: 201.0,
                      height: 113.0,
                      child:
                          // Adobe XD layer: 'shadow' (group)
                          Stack(
                        children: <Widget>[
                          SizedBox(
                            width: 201.0,
                            height: 40.0,
                            child: Text(
                              'combine before & after shadow (CS)',
                              style: TextStyle(
                                fontFamily: 'Arial',
                                fontSize: 14,
                                color: const Color(0xff707070),
                              ),
                            ),
                          ),
                          Transform.translate(
                            offset: Offset(0.0, 46.0),
                            child: SizedBox(
                              width: 86.0,
                              height: 67.0,
                              child: SvgPicture.string(
                                _svg_q2l3cz,
                                allowDrawingOutsideViewBox: true,
                              ),
                            ),
                          ),
                          Transform.translate(
                            offset: Offset(67.0, 46.0),
                            child: Container(
                              width: 67.0,
                              height: 67.0,
                              decoration: BoxDecoration(
                                color: const Color(0xffff9d00),
                                boxShadow: [
                                  BoxShadow(
                                    color: const Color(0xff000000),
                                    offset: Offset(0, 3),
                                    blurRadius: 6,
                                  ),
                                ],
                              ),
                            ),
                          ),
                          Transform.translate(
                            offset: Offset(95.0, 46.0),
                            child: SizedBox(
                              width: 106.0,
                              height: 67.0,
                              child: SvgPicture.string(
                                _svg_e2sy,
                                allowDrawingOutsideViewBox: true,
                              ),
                            ),
                          ),
                        ],
                      ),
                    ),
                  ),
                  Align(
                    alignment: Alignment(0.328, -0.013),
                    child: SizedBox(
                      width: 201.0,
                      height: 113.0,
                      child:
                          // Adobe XD layer: 'blur' (group)
                          Stack(
                        children: <Widget>[
                          SizedBox(
                            width: 201.0,
                            height: 40.0,
                            child: Text(
                              'combine before & after blur (CS)',
                              style: TextStyle(
                                fontFamily: 'Arial',
                                fontSize: 14,
                                color: const Color(0xff707070),
                              ),
                            ),
                          ),
                          Transform.translate(
                            offset: Offset(0.0, 46.0),
                            child: SizedBox(
                              width: 86.0,
                              height: 67.0,
                              child: SvgPicture.string(
                                _svg_u1m3ou,
                                allowDrawingOutsideViewBox: true,
                              ),
                            ),
                          ),
                          Transform.translate(
                            offset: Offset(67.0, 46.0),
                            child: ClipRect(
                              child: BackdropFilter(
                                filter: ui.ImageFilter.blur(
                                    sigmaX: 8.0, sigmaY: 8.0),
                                child: Container(
                                  width: 67.0,
                                  height: 67.0,
                                  decoration: BoxDecoration(
                                    color: Colors.transparent,
                                    border: Border.all(
                                        width: 4.0,
                                        color: const Color(0xff707070)),
                                  ),
                                ),
                              ),
                            ),
                          ),
                          Transform.translate(
                            offset: Offset(95.0, 46.0),
                            child: SizedBox(
                              width: 106.0,
                              height: 67.0,
                              child: SvgPicture.string(
                                _svg_f654ah,
                                allowDrawingOutsideViewBox: true,
                              ),
                            ),
                          ),
                        ],
                      ),
                    ),
                  ),
                  Align(
                    alignment: Alignment(0.328, 0.48),
                    child: SizedBox(
                      width: 201.0,
                      height: 113.0,
                      child:
                          // Adobe XD layer: 'image_fill' (group)
                          Stack(
                        children: <Widget>[
                          SizedBox(
                            width: 201.0,
                            height: 40.0,
                            child: Text(
                              'combine before & after image fill (CS)',
                              style: TextStyle(
                                fontFamily: 'Arial',
                                fontSize: 14,
                                color: const Color(0xff707070),
                              ),
                            ),
                          ),
                          Transform.translate(
                            offset: Offset(0.0, 46.0),
                            child: SizedBox(
                              width: 86.0,
                              height: 67.0,
                              child: SvgPicture.string(
                                _svg_qp1jgy,
                                allowDrawingOutsideViewBox: true,
                              ),
                            ),
                          ),
                          Transform.translate(
                            offset: Offset(67.0, 46.0),
                            child:
                                // Adobe XD layer: 'one' (shape)
                                Container(
                              width: 67.0,
                              height: 67.0,
                              decoration: BoxDecoration(
                                image: DecorationImage(
                                  image:
                                      const AssetImage('assets/images/one.png'),
                                  fit: BoxFit.cover,
                                ),
                                border: Border.all(
                                    width: 4.0, color: const Color(0xff707070)),
                              ),
                            ),
                          ),
                          Transform.translate(
                            offset: Offset(95.0, 46.0),
                            child: SizedBox(
                              width: 106.0,
                              height: 67.0,
                              child: SvgPicture.string(
                                _svg_nl39,
                                allowDrawingOutsideViewBox: true,
                              ),
                            ),
                          ),
                        ],
                      ),
                    ),
                  ),
                  Pinned.fromPins(
                    Pin(size: 201.0, middle: 0.6639),
                    Pin(size: 113.0, end: 7.0),
                    child:
                        // Adobe XD layer: 'blend' (group)
                        Stack(
                      children: <Widget>[
                        SizedBox(
                          width: 201.0,
                          height: 40.0,
                          child: Text(
                            'combine before & after blend (CS)',
                            style: TextStyle(
                              fontFamily: 'Arial',
                              fontSize: 14,
                              color: const Color(0xff707070),
                            ),
                          ),
                        ),
                        Transform.translate(
                          offset: Offset(0.0, 46.0),
                          child: SizedBox(
                            width: 86.0,
                            height: 67.0,
                            child: SvgPicture.string(
                              _svg_q2l3cz,
                              allowDrawingOutsideViewBox: true,
                            ),
                          ),
                        ),
                        Transform.translate(
                          offset: Offset(67.0, 46.0),
                          child: BlendMask(
                            blendMode: BlendMode.difference,
                            child: Container(
                              width: 67.0,
                              height: 67.0,
                              color: const Color(0xffff9d00),
                            ),
                          ),
                        ),
                        Transform.translate(
                          offset: Offset(95.0, 46.0),
                          child: SizedBox(
                            width: 106.0,
                            height: 67.0,
                            child: SvgPicture.string(
                              _svg_e2sy,
                              allowDrawingOutsideViewBox: true,
                            ),
                          ),
                        ),
                      ],
                    ),
                  ),
                  Align(
                    alignment: Alignment.topRight,
                    child: SizedBox(
                      width: 201.0,
                      height: 113.0,
                      child:
                          // Adobe XD layer: 'repeat_grid' (group)
                          Stack(
                        children: <Widget>[
                          SizedBox(
                            width: 201.0,
                            height: 40.0,
                            child: Text(
                              'should work in a repeat grid',
                              style: TextStyle(
                                fontFamily: 'Arial',
                                fontSize: 14,
                                color: const Color(0xff707070),
                              ),
                            ),
                          ),
                          Transform.translate(
                            offset: Offset(0.0, 46.0),
                            child: SizedBox(
                              width: 191.0,
                              height: 67.0,
                              child: SingleChildScrollView(
                                primary: false,
                                child: Wrap(
                                  alignment: WrapAlignment.center,
                                  spacing: 10,
                                  runSpacing: 20,
                                  children: [{}, {}].map((itemData) {
                                    return SizedBox(
                                      width: 86.0,
                                      height: 67.0,
                                      child: Stack(
                                        children: <Widget>[
                                          SizedBox(
                                            width: 86.0,
                                            height: 67.0,
                                            child: SvgPicture.string(
                                              _svg_o002c,
                                              allowDrawingOutsideViewBox: true,
                                            ),
                                          ),
                                        ],
                                      ),
                                    );
                                  }).toList(),
                                ),
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
          Pinned.fromPins(
            Pin(start: 0.0, end: 0.0),
            Pin(size: 48.0, start: 0.0),
            child:
                // Adobe XD layer: 'TitleBar' (component)
                XDTitleBar(
              title: 'Shape Collapsing',
            ),
          ),
          Pinned.fromPins(
            Pin(size: 373.0, middle: 0.3782),
            Pin(size: 16.0, start: 13.0),
            child: Text(
              '(CS) indicates “Combine Shape” is on (ie. aggressive mode)',
              style: TextStyle(
                fontFamily: 'Arial',
                fontSize: 14,
                color: const Color(0xff981a1a),
              ),
              softWrap: false,
            ),
          ),
        ],
      ),
    );
  }
}

const String _svg_o002c =
    '<svg viewBox="523.0 586.0 86.0 67.0" ><path transform="translate(531.0, 586.0)" d="M 38.99999618530273 0 L 78 67 L 0 67 Z" fill="#ff0000" stroke="none" stroke-width="1" stroke-miterlimit="4" stroke-linecap="butt" /><path transform="matrix(-1.0, 0.0, 0.0, -1.0, 601.0, 653.0)" d="M 38.99999618530273 0 L 78 67 L 0 67 Z" fill="#1bff36" stroke="none" stroke-width="1" stroke-miterlimit="4" stroke-linecap="butt" /></svg>';
const String _svg_tk4vb =
    '<svg viewBox="23.0 66.0 117.0 67.0" ><path transform="translate(23.0, 66.0)" d="M 38.99999618530273 0 L 78 67 L 0 67 Z" fill="#ff0000" stroke="none" stroke-width="1" stroke-miterlimit="4" stroke-linecap="butt" /><path transform="translate(62.0, 66.0)" d="M 38.99999618530273 0 L 78 67 L 0 67 Z" fill="#00ff58" stroke="none" stroke-width="1" stroke-miterlimit="4" stroke-linecap="butt" /></svg>';
const String _svg_av0if6 =
    '<svg viewBox="23.0 196.0 78.0 67.0" ><path transform="translate(23.0, 196.0)" d="M 38.99999618530273 0 L 78 67 L 0 67 Z" fill="#ff0000" stroke="none" stroke-width="1" stroke-miterlimit="4" stroke-linecap="butt" /></svg>';
const String _svg_nc6dj =
    '<svg viewBox="23.0 196.0 119.0 67.0" ><path transform="translate(23.0, 196.0)" d="M 38.99999618530273 0 L 78 67 L 0 67 Z" fill="#ff0000" stroke="none" stroke-width="1" stroke-miterlimit="4" stroke-linecap="butt" /><path transform="translate(75.0, 196.0)" d="M 0 0 L 67 0 L 67 67 L 0 67 Z" fill="#14ff00" stroke="none" stroke-width="1" stroke-miterlimit="4" stroke-linecap="butt" /></svg>';
const String _svg_yffzpr =
    '<svg viewBox="23.0 196.0 128.0 67.0" ><path transform="translate(23.0, 196.0)" d="M 0 0 L 67 0 L 67 67 L 0 67 Z" fill="#14ff00" stroke="none" stroke-width="1" stroke-miterlimit="4" stroke-linecap="butt" /><path transform="translate(73.0, 196.0)" d="M 38.99999618530273 0 L 78 67 L 0 67 Z" fill="#ff0000" stroke="none" stroke-width="1" stroke-miterlimit="4" stroke-linecap="butt" /></svg>';
const String _svg_dg =
    '<svg viewBox="23.0 456.0 173.0 67.0" ><path transform="translate(23.0, 456.0)" d="M 0 0 L 67 0 L 67 67 L 0 67 Z" fill="#14ff00" stroke="none" stroke-width="1" stroke-miterlimit="4" stroke-linecap="butt" /><path transform="translate(31.0, 456.0)" d="M 38.99999618530273 0 L 78 67 L 0 67 Z" fill="#ff0000" stroke="none" stroke-width="1" stroke-miterlimit="4" stroke-linecap="butt" /><g transform=""><path transform="translate(51.0, 456.0)" d="M 38.99999618530273 0 L 78 67 L 0 67 Z" fill="#d800ff" stroke="none" stroke-width="1" stroke-miterlimit="4" stroke-linecap="butt" /><path transform="translate(90.0, 456.0)" d="M 0 0 L 67 0 L 67 67 L 0 67 Z" fill="#ff9d00" stroke="none" stroke-width="1" stroke-miterlimit="4" stroke-linecap="butt" /><path transform="translate(109.0, 456.0)" d="M 0 0 L 67 0 L 67 67 L 0 67 Z" fill="#00ffb1" stroke="none" stroke-width="1" stroke-miterlimit="4" stroke-linecap="butt" /></g><path transform="translate(118.0, 456.0)" d="M 38.99999618530273 0 L 78 67 L 0 67 Z" fill="#e2ff00" stroke="none" stroke-width="1" stroke-miterlimit="4" stroke-linecap="butt" /></svg>';
const String _svg_dy9pcm =
    '<svg viewBox="259.0 168.5 199.0 124.8" ><path transform="translate(259.0, 196.0)" d="M 0 0 L 67 0 L 67 67 L 0 67 Z" fill="#ff9d00" stroke="none" stroke-width="1" stroke-miterlimit="4" stroke-linecap="butt" /><g transform="matrix(0.965926, 0.258819, -0.258819, 0.965926, 433.56, -393.35)"><path transform="translate(35.0, 586.0)" d="M 0 0 L 67 0 L 67 67 L 0 67 Z" fill="#14ff00" stroke="none" stroke-width="1" stroke-miterlimit="4" stroke-linecap="butt" /><path transform="matrix(0.898794, 0.438371, -0.438371, 0.898794, 94.63, 572.29)" d="M 38.99999618530273 0 L 78 67 L 0 67 Z" fill="#ff0000" stroke="none" stroke-width="1" stroke-miterlimit="4" stroke-linecap="butt" /></g><path transform="translate(391.0, 196.0)" d="M 0 0 L 67 0 L 67 67 L 0 67 Z" fill="#c400ff" stroke="none" stroke-width="1" stroke-miterlimit="4" stroke-linecap="butt" /></svg>';
const String _svg_vbl7at =
    '<svg viewBox="259.0 586.0 199.0 67.0" ><path transform="translate(259.0, 586.0)" d="M 0 0 L 67 0 L 67 67 L 0 67 Z" fill="#ff9d00" stroke="none" stroke-width="1" stroke-miterlimit="4" stroke-linecap="butt" /><g transform="translate(-16.0, 130.0)"><g transform="translate(286.0, -130.0)"><path transform="translate(35.0, 586.0)" d="M 0 0 L 67 0 L 67 67 L 0 67 Z" fill="#14ff00" stroke="none" stroke-width="1" stroke-miterlimit="4" stroke-linecap="butt" /><path transform="translate(76.0, 586.0)" d="M 38.99999618530273 0 L 78 67 L 0 67 Z" fill="#ff0000" stroke="none" stroke-width="1" stroke-miterlimit="4" stroke-linecap="butt" /></g><path transform="translate(407.0, 456.0)" d="M 0 0 L 67 0 L 67 67 L 0 67 Z" fill="#c400ff" stroke="none" stroke-width="1" stroke-miterlimit="4" stroke-linecap="butt" /></g></svg>';
const String _svg_b0xis2 =
    '<svg viewBox="259.0 586.0 195.0 67.0" ><path transform="translate(259.0, 586.0)" d="M 38.99999618530273 0 L 78 67 L 0 67 Z" fill="#ff0000" stroke="none" stroke-width="1" stroke-miterlimit="4" stroke-linecap="butt" /><g transform=""><path transform="translate(298.0, 586.0)" d="M 38.99999618530273 0 L 78 67 L 0 67 Z" fill="#d810f9" stroke="none" stroke-width="1" stroke-miterlimit="4" stroke-linecap="butt" /><g transform=""><path transform="translate(337.0, 586.0)" d="M 38.99999618530273 0 L 78 67 L 0 67 Z" fill="#e2ff3a" stroke="none" stroke-width="1" stroke-miterlimit="4" stroke-linecap="butt" /><path transform="translate(376.0, 586.0)" d="M 38.99999618530273 0 L 78 67 L 0 67 Z" fill="#1bff36" stroke="none" stroke-width="1" stroke-miterlimit="4" stroke-linecap="butt" /></g></g></svg>';
const String _svg_nxstu =
    '<svg viewBox="321.0 456.0 153.0 67.0" ><g transform="translate(286.0, -130.0)"><path transform="translate(35.0, 586.0)" d="M 0 0 L 67 0 L 67 67 L 0 67 Z" fill="#14ff00" stroke="none" stroke-width="1" stroke-miterlimit="4" stroke-linecap="butt" /><path transform="translate(76.0, 586.0)" d="M 38.99999618530273 0 L 78 67 L 0 67 Z" fill="#ff0000" stroke="none" stroke-width="1" stroke-miterlimit="4" stroke-linecap="butt" /></g><path transform="translate(407.0, 456.0)" d="M 0 0 L 67 0 L 67 67 L 0 67 Z" fill="#c400ff" stroke="none" stroke-width="1" stroke-miterlimit="4" stroke-linecap="butt" /></svg>';
const String _svg_ve3mgt =
    '<svg viewBox="497.0 228.0 67.0 67.0" ><path transform="translate(497.0, 228.0)" d="M 0 0 L 67 0 L 67 67 L 0 67 Z" fill="#ff9d00" stroke="none" stroke-width="1" stroke-miterlimit="4" stroke-linecap="butt" /></svg>';
const String _svg_pku0su =
    '<svg viewBox="63.0 716.0 78.0 67.0" ><path transform="translate(63.0, 716.0)" d="M 38.99999618530273 0 L 78 67 L 0 67 Z" fill="#d800ff" stroke="none" stroke-width="1" stroke-miterlimit="4" stroke-linecap="butt" /></svg>';
const String _svg_hk9edj =
    '<svg viewBox="257.0 66.0 86.0 67.0" ><path transform="translate(257.0, 66.0)" d="M 0 0 L 67 0 L 67 67 L 0 67 Z" fill="#14ff00" stroke="none" stroke-width="1" stroke-miterlimit="4" stroke-linecap="butt" /><path transform="translate(265.0, 66.0)" d="M 38.99999618530273 0 L 78 67 L 0 67 Z" fill="#ff0000" stroke="none" stroke-width="1" stroke-miterlimit="4" stroke-linecap="butt" /></svg>';
const String _svg_rl1j89 =
    '<svg viewBox="324.0 66.0 106.0 67.0" ><path transform="translate(324.0, 66.0)" d="M 0 0 L 67 0 L 67 67 L 0 67 Z" fill="#ff9d00" stroke="none" stroke-width="1" stroke-miterlimit="4" stroke-linecap="butt" /><path transform="translate(343.0, 66.0)" d="M 0 0 L 67 0 L 67 67 L 0 67 Z" fill="#00ffb1" stroke="none" stroke-width="1" stroke-miterlimit="4" stroke-linecap="butt" /><path transform="translate(352.0, 66.0)" d="M 38.99999618530273 0 L 78 67 L 0 67 Z" fill="#e2ff00" stroke="none" stroke-width="1" stroke-miterlimit="4" stroke-linecap="butt" /></svg>';
const String _svg_q2l3cz =
    '<svg viewBox="497.0 494.0 86.0 67.0" ><path transform="translate(497.0, 494.0)" d="M 0 0 L 67 0 L 67 67 L 0 67 Z" fill="#14ff00" stroke="none" stroke-width="1" stroke-miterlimit="4" stroke-linecap="butt" /><path transform="translate(505.0, 494.0)" d="M 38.99999618530273 0 L 78 67 L 0 67 Z" fill="#ff0000" stroke="none" stroke-width="1" stroke-miterlimit="4" stroke-linecap="butt" /></svg>';
const String _svg_e2sy =
    '<svg viewBox="592.0 494.0 106.0 67.0" ><path transform="translate(592.0, 494.0)" d="M 38.99999618530273 0 L 78 67 L 0 67 Z" fill="#e2ff00" stroke="none" stroke-width="1" stroke-miterlimit="4" stroke-linecap="butt" /><path transform="translate(620.0, 494.0)" d="M 38.99999618530273 0 L 78 67 L 0 67 Z" fill="#d810f9" stroke="none" stroke-width="1" stroke-miterlimit="4" stroke-linecap="butt" /></svg>';
const String _svg_u1m3ou =
    '<svg viewBox="497.0 358.0 86.0 67.0" ><path transform="translate(497.0, 358.0)" d="M 0 0 L 67 0 L 67 67 L 0 67 Z" fill="#14ff00" stroke="none" stroke-width="1" stroke-miterlimit="4" stroke-linecap="butt" /><path transform="translate(505.0, 358.0)" d="M 38.99999618530273 0 L 78 67 L 0 67 Z" fill="#ff0000" stroke="none" stroke-width="1" stroke-miterlimit="4" stroke-linecap="butt" /></svg>';
const String _svg_f654ah =
    '<svg viewBox="592.0 358.0 106.0 67.0" ><path transform="translate(592.0, 358.0)" d="M 38.99999618530273 0 L 78 67 L 0 67 Z" fill="#e2ff00" stroke="none" stroke-width="1" stroke-miterlimit="4" stroke-linecap="butt" /><path transform="translate(620.0, 358.0)" d="M 38.99999618530273 0 L 78 67 L 0 67 Z" fill="#d810f9" stroke="none" stroke-width="1" stroke-miterlimit="4" stroke-linecap="butt" /></svg>';
const String _svg_qp1jgy =
    '<svg viewBox="730.0 66.0 86.0 67.0" ><path transform="translate(730.0, 66.0)" d="M 0 0 L 67 0 L 67 67 L 0 67 Z" fill="#14ff00" stroke="none" stroke-width="1" stroke-miterlimit="4" stroke-linecap="butt" /><path transform="translate(738.0, 66.0)" d="M 38.99999618530273 0 L 78 67 L 0 67 Z" fill="#ff0000" stroke="none" stroke-width="1" stroke-miterlimit="4" stroke-linecap="butt" /></svg>';
const String _svg_nl39 =
    '<svg viewBox="825.0 66.0 106.0 67.0" ><path transform="translate(825.0, 66.0)" d="M 38.99999618530273 0 L 78 67 L 0 67 Z" fill="#e2ff00" stroke="none" stroke-width="1" stroke-miterlimit="4" stroke-linecap="butt" /><path transform="translate(853.0, 66.0)" d="M 38.99999618530273 0 L 78 67 L 0 67 Z" fill="#d810f9" stroke="none" stroke-width="1" stroke-miterlimit="4" stroke-linecap="butt" /></svg>';

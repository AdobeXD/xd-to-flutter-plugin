import 'package:flutter/material.dart';
import './xd_page_size.dart';
import 'package:adobe_xd/pinned.dart';
import './xd_title_bar.dart';
import './xd_test_group.dart';
import './xd_component251.dart';

class XDText extends StatelessWidget {
  XDText({
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
              title: 'Text',
            ),
          ),
          Padding(
            padding: EdgeInsets.fromLTRB(16.0, 60.0, 16.0, 158.0),
            child:
                // Adobe XD layer: 'pass' (group)
                Stack(
              children: <Widget>[
                Pinned.fromPins(
                  Pin(start: 0.0, end: 0.0),
                  Pin(start: 0.0, endFraction: 0.0),
                  child: XDTestGroup(
                    title: 'Pass',
                  ),
                ),
                Transform.translate(
                  offset: Offset(18.0, 51.0),
                  child: SizedBox(
                    width: 498.0,
                    height: 305.0,
                    child:
                        // Adobe XD layer: 'fixed_size_content' (group)
                        Stack(
                      children: <Widget>[
                        Transform.translate(
                          offset: Offset(1.0, 0.0),
                          child: Text(
                            'Normal single line text',
                            style: TextStyle(
                              fontFamily: 'Arial',
                              fontSize: 14,
                              color: const Color(0xff008d00),
                            ),
                            softWrap: false,
                          ),
                        ),
                        Transform.translate(
                          offset: Offset(372.0, 139.0),
                          child: Text(
                            'left aligned',
                            style: TextStyle(
                              fontFamily: 'Arial',
                              fontSize: 14,
                              color: const Color(0xff008d00),
                            ),
                            softWrap: false,
                          ),
                        ),
                        Transform.translate(
                          offset: Offset(0.0, 155.0),
                          child: SizedBox(
                            width: 495.0,
                            child: Text(
                              'right aligned',
                              style: TextStyle(
                                fontFamily: 'Arial',
                                fontSize: 14,
                                color: const Color(0xff008d00),
                              ),
                              textAlign: TextAlign.right,
                              softWrap: false,
                            ),
                          ),
                        ),
                        Transform.translate(
                          offset: Offset(195.0, 171.0),
                          child: SizedBox(
                            width: 478.0,
                            child: Text(
                              'center aligned',
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
                        Transform.translate(
                          offset: Offset(373.0, 199.0),
                          child: SizedBox(
                            width: 122.0,
                            child: Text(
                              'right aligned and wrapping',
                              style: TextStyle(
                                fontFamily: 'Arial',
                                fontSize: 14,
                                color: const Color(0xff008d00),
                              ),
                              textAlign: TextAlign.right,
                            ),
                          ),
                        ),
                        Transform.translate(
                          offset: Offset(373.0, 232.0),
                          child: SizedBox(
                            width: 122.0,
                            child: Text(
                              'center aligned and wrapping',
                              style: TextStyle(
                                fontFamily: 'Arial',
                                fontSize: 14,
                                color: const Color(0xff008d00),
                              ),
                              textAlign: TextAlign.center,
                            ),
                          ),
                        ),
                        Transform.translate(
                          offset: Offset(196.0, 0.0),
                          child: Text(
                            'Text with a\ncarriage return',
                            style: TextStyle(
                              fontFamily: 'Arial',
                              fontSize: 14,
                              color: const Color(0xff008d00),
                            ),
                            softWrap: false,
                          ),
                        ),
                        Transform.translate(
                          offset: Offset(372.0, 0.0),
                          child: Container(
                            width: 123.0,
                            height: 26.0,
                            decoration: BoxDecoration(
                              border: Border.all(
                                  width: 1.0, color: const Color(0xffd5d5d5)),
                            ),
                          ),
                        ),
                        Transform.translate(
                          offset: Offset(373.0, 0.0),
                          child: Text(
                            'TEXT WITH A LOW\nLINE HEIGHT',
                            style: TextStyle(
                              fontFamily: 'Arial',
                              fontSize: 14,
                              color: const Color(0xff008d00),
                              height: 0.7142857142857143,
                            ),
                            textHeightBehavior: TextHeightBehavior(
                                applyHeightToFirstAscent: false),
                            softWrap: false,
                          ),
                        ),
                        Transform.translate(
                          offset: Offset(372.0, 78.0),
                          child: Container(
                            width: 124.0,
                            height: 40.0,
                            decoration: BoxDecoration(
                              border: Border.all(
                                  width: 1.0, color: const Color(0xffd5d5d5)),
                            ),
                          ),
                        ),
                        Transform.translate(
                          offset: Offset(372.0, 78.0),
                          child: Text(
                            'TEXT WITH A HIGH\nLINE HEIGHT',
                            style: TextStyle(
                              fontFamily: 'Arial',
                              fontSize: 14,
                              color: const Color(0xff008d00),
                              height: 1.7142857142857142,
                            ),
                            textHeightBehavior: TextHeightBehavior(
                                applyHeightToFirstAscent: false),
                            softWrap: false,
                          ),
                        ),
                        Transform.translate(
                          offset: Offset(196.0, 69.0),
                          child: SizedBox(
                            width: 140.0,
                            height: 40.0,
                            child: Text(
                              'Fixed size text that wraps automatically',
                              style: TextStyle(
                                fontFamily: 'Arial',
                                fontSize: 14,
                                color: const Color(0xff008d00),
                              ),
                            ),
                          ),
                        ),
                        Transform.translate(
                          offset: Offset(196.0, 202.0),
                          child: SizedBox(
                            width: 128.0,
                            height: 55.0,
                            child: SingleChildScrollView(
                              primary: false,
                              child: Text(
                                'Scrolling text. It has scrolling enabled on export because it overflows its container in XD.',
                                style: TextStyle(
                                  fontFamily: 'Arial',
                                  fontSize: 14,
                                  color: const Color(0xff008d00),
                                ),
                              ),
                            ),
                          ),
                        ),
                        Transform.translate(
                          offset: Offset(1.0, 75.0),
                          child: Text(
                            'Bold',
                            style: TextStyle(
                              fontFamily: 'Arial',
                              fontSize: 14,
                              color: const Color(0xff008d00),
                              fontWeight: FontWeight.w700,
                            ),
                            softWrap: false,
                          ),
                        ),
                        Pinned.fromPins(
                          Pin(size: 29.0, start: 46.0),
                          Pin(size: 16.0, middle: 0.2595),
                          child: Text(
                            'Italic',
                            style: TextStyle(
                              fontFamily: 'Arial',
                              fontSize: 14,
                              color: const Color(0xff008d00),
                              fontStyle: FontStyle.italic,
                            ),
                            softWrap: false,
                          ),
                        ),
                        Transform.translate(
                          offset: Offset(91.0, 75.0),
                          child: Text(
                            'BoldItalic',
                            style: TextStyle(
                              fontFamily: 'Arial',
                              fontSize: 14,
                              color: const Color(0xff008d00),
                              fontStyle: FontStyle.italic,
                              fontWeight: FontWeight.w700,
                            ),
                            softWrap: false,
                          ),
                        ),
                        Transform.translate(
                          offset: Offset(0.0, 100.0),
                          child: Text(
                            'Underline',
                            style: TextStyle(
                              fontFamily: 'Arial',
                              fontSize: 14,
                              color: const Color(0xff008d00),
                              decoration: TextDecoration.underline,
                            ),
                            softWrap: false,
                          ),
                        ),
                        Transform.translate(
                          offset: Offset(76.0, 100.0),
                          child: Text(
                            'Strike',
                            style: TextStyle(
                              fontFamily: 'Arial',
                              fontSize: 14,
                              color: const Color(0xff008d00),
                              decoration: TextDecoration.lineThrough,
                            ),
                            softWrap: false,
                          ),
                        ),
                        Transform.translate(
                          offset: Offset(1.0, 26.0),
                          child: Text.rich(
                            TextSpan(
                              style: TextStyle(
                                fontFamily: 'Arial',
                                fontSize: 14,
                                color: const Color(0xff008d00),
                              ),
                              children: [
                                TextSpan(
                                  text: 'Rich',
                                  style: TextStyle(
                                    decoration: TextDecoration.underline,
                                  ),
                                ),
                                TextSpan(
                                  text: ' ',
                                ),
                                TextSpan(
                                  text: 'single',
                                  style: TextStyle(
                                    fontWeight: FontWeight.w700,
                                  ),
                                ),
                                TextSpan(
                                  text: ' ',
                                ),
                                TextSpan(
                                  text: 'line',
                                  style: TextStyle(
                                    color: const Color(0xff77008d),
                                  ),
                                ),
                                TextSpan(
                                  text: ' ',
                                ),
                                TextSpan(
                                  text: 'text',
                                  style: TextStyle(
                                    fontStyle: FontStyle.italic,
                                  ),
                                ),
                              ],
                            ),
                            textHeightBehavior: TextHeightBehavior(
                                applyHeightToFirstAscent: false),
                            softWrap: false,
                          ),
                        ),
                        Transform.translate(
                          offset: Offset(196.0, 140.0),
                          child: Text(
                            'Shadow?',
                            style: TextStyle(
                              fontFamily: 'Arial',
                              fontSize: 28,
                              color: const Color(0xff008d00),
                              fontWeight: FontWeight.w700,
                              shadows: [
                                Shadow(
                                  color: const Color(0x99000000),
                                  offset: Offset(0, 3),
                                  blurRadius: 6,
                                )
                              ],
                            ),
                            softWrap: false,
                          ),
                        ),
                        Transform.translate(
                          offset: Offset(0.0, 148.0),
                          child: SizedBox(
                            width: 170.0,
                            height: 157.0,
                            child: Text(
                              'Note that font style is more complex than suggested here, relying on font name matching to generate numeric weight values.\nex. "black" == 900\nTests are simplified to reduce font file size.',
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
                ),
                Padding(
                  padding: EdgeInsets.fromLTRB(542.0, 50.0, 17.0, 17.0),
                  child: SizedBox.expand(
                      child: Text.rich(
                    TextSpan(
                      style: TextStyle(
                        fontFamily: 'Arial',
                        fontSize: 14,
                        color: const Color(0xff008d00),
                        height: 1.7857142857142858,
                      ),
                      children: [
                        TextSpan(
                          text:
                              'All the features: multiline, responsive, wrapping, rich text with carriage returns and a line height.\n\nLorem ',
                        ),
                        TextSpan(
                          text: 'ipsum',
                          style: TextStyle(
                            color: const Color(0xff6f1696),
                            decoration: TextDecoration.lineThrough,
                          ),
                        ),
                        TextSpan(
                          text: ' dolor sit amet, ',
                        ),
                        TextSpan(
                          text: 'consectetur adipiscing',
                          style: TextStyle(
                            color: const Color(0xff62008d),
                            fontWeight: FontWeight.w700,
                          ),
                        ),
                        TextSpan(
                          text: ' elit. Pellentesque sed velit elit.\n\nNulla ',
                        ),
                        TextSpan(
                          text: 'imperdiet qu am',
                          style: TextStyle(
                            fontSize: 18,
                            color: const Color(0xff62008d),
                            fontWeight: FontWeight.w700,
                          ),
                        ),
                        TextSpan(
                          text:
                              ' eget nulla pulvinar, eu faucibus dui mattis. Integer commodo orci sed est ',
                        ),
                        TextSpan(
                          text: 'vehicula',
                          style: TextStyle(
                            color: const Color(0xff721b98),
                            decoration: TextDecoration.underline,
                          ),
                        ),
                        TextSpan(
                          text: ' rutrum.',
                        ),
                      ],
                    ),
                    textHeightBehavior:
                        TextHeightBehavior(applyHeightToFirstAscent: false),
                  )),
                ),
                Transform.translate(
                  offset: Offset(390.0, 189.0),
                  child: Container(
                    width: 124.0,
                    height: 134.0,
                    decoration: BoxDecoration(
                      border: Border.all(
                          width: 1.0, color: const Color(0xffd5d5d5)),
                    ),
                  ),
                ),
              ],
            ),
          ),
          Pinned.fromPins(
            Pin(start: 16.0, end: 16.0),
            Pin(size: 128.0, end: 15.0),
            child:
                // Adobe XD layer: 'unsupported' (group)
                Stack(
              children: <Widget>[
                Pinned.fromPins(
                  Pin(start: 0.0, end: 0.0),
                  Pin(start: 0.0, endFraction: 0.0),
                  child: XDTestGroup(
                    title: 'Unsupported',
                  ),
                ),
                Transform.translate(
                  offset: Offset(29.0, 52.0),
                  child: SizedBox(
                    width: 435.0,
                    height: 66.0,
                    child:
                        // Adobe XD layer: 'fixed_size_content' (group)
                        Stack(
                      children: <Widget>[
                        Text(
                          'CaPs',
                          style: TextStyle(
                            fontFamily: 'Arial',
                            fontSize: 14,
                            color: const Color(0xff8d0000),
                          ),
                          softWrap: false,
                        ),
                        Transform.translate(
                          offset: Offset(69.0, 0.0),
                          child: Text(
                            'LoWeR',
                            style: TextStyle(
                              fontFamily: 'Arial',
                              fontSize: 14,
                              color: const Color(0xff8d0000),
                            ),
                            softWrap: false,
                          ),
                        ),
                        Transform.translate(
                          offset: Offset(135.0, 0.0),
                          child: Text(
                            'tItLe CaPs',
                            style: TextStyle(
                              fontFamily: 'Arial',
                              fontSize: 14,
                              color: const Color(0xff8d0000),
                            ),
                            softWrap: false,
                          ),
                        ),
                        Transform.translate(
                          offset: Offset(230.0, 0.0),
                          child: Text(
                            'Superscript',
                            style: TextStyle(
                              fontFamily: 'Arial',
                              fontSize: 14,
                              color: const Color(0xff8d0000),
                            ),
                            softWrap: false,
                          ),
                        ),
                        Transform.translate(
                          offset: Offset(304.0, 0.0),
                          child: Text(
                            'Subscript',
                            style: TextStyle(
                              fontFamily: 'Arial',
                              fontSize: 14,
                              color: const Color(0xff8d0000),
                            ),
                            softWrap: false,
                          ),
                        ),
                        Transform.translate(
                          offset: Offset(0.0, 30.0),
                          child: Text(
                            'Outline',
                            style: TextStyle(
                              fontFamily: 'Arial',
                              fontSize: 28,
                              color: const Color(0xff981a1a),
                              fontWeight: FontWeight.w700,
                            ),
                            softWrap: false,
                          ),
                        ),
                        Transform.translate(
                          offset: Offset(131.0, 23.0),
                          child: Container(
                            width: 123.0,
                            height: 43.0,
                            color: const Color(0xff676767),
                          ),
                        ),
                        Transform.translate(
                          offset: Offset(141.0, 29.0),
                          child: Text(
                            'BG Blur',
                            style: TextStyle(
                              fontFamily: 'Arial',
                              fontSize: 28,
                              color: const Color(0xff981a1a),
                              fontWeight: FontWeight.w700,
                            ),
                            softWrap: false,
                          ),
                        ),
                        Transform.translate(
                          offset: Offset(284.0, 30.0),
                          child: Text(
                            'Object Blur',
                            style: TextStyle(
                              fontFamily: 'Arial',
                              fontSize: 28,
                              color: const Color(0xff981a1a),
                              fontWeight: FontWeight.w700,
                            ),
                            softWrap: false,
                          ),
                        ),
                      ],
                    ),
                  ),
                ),
                Pinned.fromPins(
                  Pin(size: 16.0, start: 106.0),
                  Pin(size: 15.0, middle: 0.0796),
                  child: XDComponent251(),
                ),
              ],
            ),
          ),
        ],
      ),
    );
  }
}

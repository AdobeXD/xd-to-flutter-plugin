import 'package:flutter/material.dart';
import './xd_page_size.dart';
import 'package:adobe_xd/pinned.dart';
import './xd_title_bar.dart';
import './xd_test_group.dart';
import 'package:flutter_svg/flutter_svg.dart';
import './xd_component163.dart';
import './xd_component251.dart';

class XDRepeatGrid extends StatelessWidget {
  XDRepeatGrid({
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
              title: 'Repeat Grid',
            ),
          ),
          Pinned.fromPins(
            Pin(size: 928.0, start: 16.0),
            Pin(size: 454.0, start: 60.0),
            child: Stack(
              children: <Widget>[
                Pinned.fromPins(
                  Pin(start: 0.0, end: 0.0),
                  Pin(start: 0.0, endFraction: 0.0),
                  child: XDTestGroup(
                    title: 'Fixed size',
                  ),
                ),
                Pinned.fromPins(
                  Pin(start: 31.0, end: 33.0),
                  Pin(size: 120.0, start: 43.0),
                  child:
                      // Adobe XD layer: 'contentTypes' (group)
                      Stack(
                    children: <Widget>[
                      Pinned.fromPins(
                        Pin(size: 84.0, start: 0.0),
                        Pin(start: 8.0, end: 0.0),
                        child:
                            // Adobe XD layer: 'shape' (group)
                            Stack(
                          children: <Widget>[
                            Padding(
                              padding: EdgeInsets.fromLTRB(0.0, 28.0, 0.0, 0.0),
                              child: SingleChildScrollView(
                                primary: false,
                                child: Wrap(
                                  alignment: WrapAlignment.center,
                                  spacing: 20,
                                  runSpacing: 20,
                                  children: [{}, {}, {}, {}].map((itemData) {
                                    return SizedBox(
                                      width: 32.0,
                                      height: 32.0,
                                      child: Stack(
                                        children: <Widget>[
                                          SizedBox.expand(
                                              child: SvgPicture.string(
                                            _svg_pcmu3c,
                                            allowDrawingOutsideViewBox: true,
                                            fit: BoxFit.fill,
                                          )),
                                        ],
                                      ),
                                    );
                                  }).toList(),
                                ),
                              ),
                            ),
                            Pinned.fromPins(
                              Pin(start: 0.0, end: 0.0),
                              Pin(size: 16.0, start: 0.0),
                              child: Text(
                                'shape',
                                style: TextStyle(
                                  fontFamily: 'Arial',
                                  fontSize: 14,
                                  color: const Color(0xff008d00),
                                ),
                                textAlign: TextAlign.center,
                              ),
                            ),
                            Container(
                              decoration: BoxDecoration(
                                border: Border.all(
                                    width: 1.0, color: const Color(0xff707070)),
                              ),
                              margin: EdgeInsets.fromLTRB(0.0, 28.0, 0.0, 0.0),
                            ),
                          ],
                        ),
                      ),
                      Pinned.fromPins(
                        Pin(size: 84.0, start: 116.0),
                        Pin(start: 8.0, end: 0.0),
                        child:
                            // Adobe XD layer: 'rect' (group)
                            Stack(
                          children: <Widget>[
                            Padding(
                              padding: EdgeInsets.fromLTRB(0.0, 28.0, 0.0, 0.0),
                              child: SingleChildScrollView(
                                primary: false,
                                child: Wrap(
                                  alignment: WrapAlignment.center,
                                  spacing: 20,
                                  runSpacing: 20,
                                  children: [{}, {}, {}, {}].map((itemData) {
                                    return SizedBox(
                                      width: 32.0,
                                      height: 32.0,
                                      child: Stack(
                                        children: <Widget>[
                                          Container(
                                            color: const Color(0xff008d00),
                                          ),
                                        ],
                                      ),
                                    );
                                  }).toList(),
                                ),
                              ),
                            ),
                            Pinned.fromPins(
                              Pin(start: 0.0, end: 0.0),
                              Pin(size: 16.0, start: 0.0),
                              child: Text(
                                'rect',
                                style: TextStyle(
                                  fontFamily: 'Arial',
                                  fontSize: 14,
                                  color: const Color(0xff008d00),
                                ),
                                textAlign: TextAlign.center,
                              ),
                            ),
                            Container(
                              decoration: BoxDecoration(
                                border: Border.all(
                                    width: 1.0, color: const Color(0xff707070)),
                              ),
                              margin: EdgeInsets.fromLTRB(0.0, 28.0, 0.0, 0.0),
                            ),
                          ],
                        ),
                      ),
                      Pinned.fromPins(
                        Pin(size: 85.0, middle: 0.2978),
                        Pin(start: 8.0, end: 0.0),
                        child:
                            // Adobe XD layer: 'text' (group)
                            Stack(
                          children: <Widget>[
                            Padding(
                              padding: EdgeInsets.fromLTRB(0.0, 28.0, 0.0, 0.0),
                              child: SingleChildScrollView(
                                primary: false,
                                child: Wrap(
                                  alignment: WrapAlignment.center,
                                  spacing: 20,
                                  runSpacing: 20,
                                  children: [{}, {}, {}, {}].map((itemData) {
                                    return SizedBox(
                                      width: 32.0,
                                      height: 22.0,
                                      child: Stack(
                                        children: <Widget>[
                                          SizedBox.expand(
                                              child: Text(
                                            'Hi!',
                                            style: TextStyle(
                                              fontFamily: 'Arial',
                                              fontSize: 18,
                                              color: const Color(0xff008d00),
                                              fontWeight: FontWeight.w700,
                                            ),
                                          )),
                                        ],
                                      ),
                                    );
                                  }).toList(),
                                ),
                              ),
                            ),
                            Pinned.fromPins(
                              Pin(start: 0.0, end: 1.0),
                              Pin(size: 16.0, start: 0.0),
                              child: Text(
                                'text',
                                style: TextStyle(
                                  fontFamily: 'Arial',
                                  fontSize: 14,
                                  color: const Color(0xff008d00),
                                ),
                                textAlign: TextAlign.center,
                              ),
                            ),
                            Pinned.fromPins(
                              Pin(start: 0.0, end: 1.0),
                              Pin(size: 84.0, end: 0.0),
                              child: Container(
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
                      Pinned.fromPins(
                        Pin(size: 84.0, end: 0.0),
                        Pin(start: 9.0, end: 0.0),
                        child:
                            // Adobe XD layer: 'component' (group)
                            Stack(
                          children: <Widget>[
                            Padding(
                              padding: EdgeInsets.fromLTRB(0.0, 27.0, 0.0, 0.0),
                              child: SingleChildScrollView(
                                primary: false,
                                child: Wrap(
                                  alignment: WrapAlignment.center,
                                  spacing: 20,
                                  runSpacing: 20,
                                  children: [{}, {}, {}, {}].map((itemData) {
                                    return SizedBox(
                                      width: 32.0,
                                      height: 32.0,
                                      child: Stack(
                                        children: <Widget>[
                                          Stack(
                                            children: <Widget>[
                                              Container(
                                                width: 32.0,
                                                height: 32.0,
                                                decoration: BoxDecoration(
                                                  color:
                                                      const Color(0xff008d00),
                                                  borderRadius:
                                                      BorderRadius.circular(
                                                          8.0),
                                                ),
                                              ),
                                              Transform.translate(
                                                offset: Offset(0.0, 5.0),
                                                child: SizedBox(
                                                  width: 32.0,
                                                  height: 22.0,
                                                  child: Text(
                                                    'Hi!',
                                                    style: TextStyle(
                                                      fontFamily: 'Arial',
                                                      fontSize: 18,
                                                      color: const Color(
                                                          0xffffffff),
                                                      fontWeight:
                                                          FontWeight.w700,
                                                    ),
                                                    textAlign: TextAlign.center,
                                                  ),
                                                ),
                                              ),
                                            ],
                                          ),
                                        ],
                                      ),
                                    );
                                  }).toList(),
                                ),
                              ),
                            ),
                            Pinned.fromPins(
                              Pin(start: 0.0, end: 0.0),
                              Pin(size: 16.0, start: 0.0),
                              child: Text(
                                'component',
                                style: TextStyle(
                                  fontFamily: 'Arial',
                                  fontSize: 14,
                                  color: const Color(0xff008d00),
                                ),
                                textAlign: TextAlign.center,
                              ),
                            ),
                            Container(
                              decoration: BoxDecoration(
                                border: Border.all(
                                    width: 1.0, color: const Color(0xff707070)),
                              ),
                              margin: EdgeInsets.fromLTRB(0.0, 27.0, 0.0, 0.0),
                            ),
                          ],
                        ),
                      ),
                      Pinned.fromPins(
                        Pin(size: 84.0, middle: 0.4462),
                        Pin(start: 0.0, end: 0.0),
                        child:
                            // Adobe XD layer: 'implicitGroup' (group)
                            Stack(
                          children: <Widget>[
                            Padding(
                              padding: EdgeInsets.fromLTRB(0.0, 36.0, 0.0, 0.0),
                              child: SingleChildScrollView(
                                primary: false,
                                child: Wrap(
                                  alignment: WrapAlignment.center,
                                  spacing: 20,
                                  runSpacing: 20,
                                  children: [{}, {}, {}, {}].map((itemData) {
                                    return SizedBox(
                                      width: 32.0,
                                      height: 32.0,
                                      child: Stack(
                                        children: <Widget>[
                                          Container(
                                            color: const Color(0xff008d00),
                                          ),
                                          Padding(
                                            padding: EdgeInsets.symmetric(
                                                horizontal: 0.0, vertical: 5.0),
                                            child: SizedBox.expand(
                                                child: Text(
                                              'Hi!',
                                              style: TextStyle(
                                                fontFamily: 'Arial',
                                                fontSize: 18,
                                                color: const Color(0xffffffff),
                                                fontWeight: FontWeight.w700,
                                              ),
                                              textAlign: TextAlign.center,
                                            )),
                                          ),
                                        ],
                                      ),
                                    );
                                  }).toList(),
                                ),
                              ),
                            ),
                            Pinned.fromPins(
                              Pin(start: 0.0, end: 0.0),
                              Pin(size: 33.0, start: 0.0),
                              child: Text(
                                'group\n(implicit)',
                                style: TextStyle(
                                  fontFamily: 'Arial',
                                  fontSize: 14,
                                  color: const Color(0xff008d00),
                                ),
                                textAlign: TextAlign.center,
                              ),
                            ),
                            Container(
                              decoration: BoxDecoration(
                                border: Border.all(
                                    width: 1.0, color: const Color(0xff707070)),
                              ),
                              margin: EdgeInsets.fromLTRB(0.0, 36.0, 0.0, 0.0),
                            ),
                          ],
                        ),
                      ),
                      Pinned.fromPins(
                        Pin(size: 85.0, middle: 0.5956),
                        Pin(start: 0.0, end: 0.0),
                        child:
                            // Adobe XD layer: 'explicitGroup' (group)
                            Stack(
                          children: <Widget>[
                            Padding(
                              padding: EdgeInsets.fromLTRB(0.0, 36.0, 0.0, 0.0),
                              child: SingleChildScrollView(
                                primary: false,
                                child: Wrap(
                                  alignment: WrapAlignment.center,
                                  spacing: 20,
                                  runSpacing: 20,
                                  children: [{}, {}, {}, {}].map((itemData) {
                                    return SizedBox(
                                      width: 32.0,
                                      height: 32.0,
                                      child: Stack(
                                        children: <Widget>[
                                          Container(
                                            color: const Color(0xff008d00),
                                          ),
                                          Padding(
                                            padding: EdgeInsets.symmetric(
                                                horizontal: 0.0, vertical: 5.0),
                                            child: SizedBox.expand(
                                                child: Text(
                                              'Hi!',
                                              style: TextStyle(
                                                fontFamily: 'Arial',
                                                fontSize: 18,
                                                color: const Color(0xffffffff),
                                                fontWeight: FontWeight.w700,
                                              ),
                                              textAlign: TextAlign.center,
                                            )),
                                          ),
                                        ],
                                      ),
                                    );
                                  }).toList(),
                                ),
                              ),
                            ),
                            Pinned.fromPins(
                              Pin(start: 0.0, end: 1.0),
                              Pin(size: 33.0, start: 0.0),
                              child: Text(
                                'group\n(explicit)',
                                style: TextStyle(
                                  fontFamily: 'Arial',
                                  fontSize: 14,
                                  color: const Color(0xff008d00),
                                ),
                                textAlign: TextAlign.center,
                              ),
                            ),
                            Pinned.fromPins(
                              Pin(start: 0.0, end: 1.0),
                              Pin(size: 84.0, end: 0.0),
                              child: Container(
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
                      Pinned.fromPins(
                        Pin(size: 168.0, end: 116.0),
                        Pin(start: 0.0, end: 0.0),
                        child: Text(
                          'implicit: select loose elements & create grid\nexplicit: group first\n\nXD UI displays these the same, but they are different under the hood.',
                          style: TextStyle(
                            fontFamily: 'Arial',
                            fontSize: 14,
                            color: const Color(0xff000000),
                          ),
                        ),
                      ),
                    ],
                  ),
                ),
                Pinned.fromPins(
                  Pin(size: 200.0, start: 31.0),
                  Pin(size: 112.0, end: 27.0),
                  child:
                      // Adobe XD layer: 'partialColumns' (group)
                      Stack(
                    children: <Widget>[
                      Align(
                        alignment: Alignment.bottomLeft,
                        child: SizedBox(
                          width: 73.0,
                          height: 84.0,
                          child: SingleChildScrollView(
                            primary: false,
                            child: Wrap(
                              alignment: WrapAlignment.center,
                              spacing: 20,
                              runSpacing: 20,
                              children: [{}, {}, {}, {}].map((itemData) {
                                return SizedBox(
                                  width: 32.0,
                                  height: 32.0,
                                  child: Stack(
                                    children: <Widget>[
                                      Container(
                                        color: const Color(0xff981a1a),
                                      ),
                                    ],
                                  ),
                                );
                              }).toList(),
                            ),
                          ),
                        ),
                      ),
                      Pinned.fromPins(
                        Pin(size: 55.0, end: 29.0),
                        Pin(size: 84.0, end: 0.0),
                        child: SingleChildScrollView(
                          primary: false,
                          child: Wrap(
                            alignment: WrapAlignment.center,
                            spacing: 20,
                            runSpacing: 20,
                            children: [{}, {}, {}, {}].map((itemData) {
                              return SizedBox(
                                width: 32.0,
                                height: 32.0,
                                child: Stack(
                                  children: <Widget>[
                                    Container(
                                      color: const Color(0xff981a1a),
                                    ),
                                  ],
                                ),
                              );
                            }).toList(),
                          ),
                        ),
                      ),
                      Pinned.fromPins(
                        Pin(start: 0.0, end: 0.0),
                        Pin(size: 16.0, start: 0.0),
                        child: Text(
                          'partial columns',
                          style: TextStyle(
                            fontFamily: 'Arial',
                            fontSize: 14,
                            color: const Color(0xff981a1a),
                          ),
                          textAlign: TextAlign.center,
                        ),
                      ),
                      Align(
                        alignment: Alignment.bottomLeft,
                        child: Container(
                          width: 84.0,
                          height: 84.0,
                          decoration: BoxDecoration(
                            border: Border.all(
                                width: 1.0, color: const Color(0xff707070)),
                          ),
                        ),
                      ),
                      Align(
                        alignment: Alignment.bottomRight,
                        child: Container(
                          width: 84.0,
                          height: 84.0,
                          decoration: BoxDecoration(
                            border: Border.all(
                                width: 1.0, color: const Color(0xff707070)),
                          ),
                        ),
                      ),
                      Pinned.fromPins(
                        Pin(size: 16.0, start: 29.0),
                        Pin(size: 15.0, middle: 0.0103),
                        child: XDComponent251(),
                      ),
                    ],
                  ),
                ),
                Pinned.fromPins(
                  Pin(size: 84.0, end: 117.0),
                  Pin(size: 22.0, middle: 0.4352),
                  child: Text(
                    'fixed size',
                    style: TextStyle(
                      fontFamily: 'Arial',
                      fontSize: 14,
                      color: const Color(0xff008d00),
                    ),
                    textAlign: TextAlign.center,
                  ),
                ),
                Pinned.fromPins(
                  Pin(size: 84.0, end: 117.0),
                  Pin(size: 84.0, middle: 0.5838),
                  child: SingleChildScrollView(
                    primary: false,
                    child: Wrap(
                      alignment: WrapAlignment.center,
                      spacing: 20,
                      runSpacing: 20,
                      children: [{}, {}, {}, {}].map((itemData) {
                        return SizedBox(
                          width: 32.0,
                          height: 32.0,
                          child: Stack(
                            children: <Widget>[
                              Container(
                                color: const Color(0xff008d00),
                              ),
                            ],
                          ),
                        );
                      }).toList(),
                    ),
                  ),
                ),
                Pinned.fromPins(
                  Pin(size: 84.0, end: 117.0),
                  Pin(size: 84.0, middle: 0.5838),
                  child: Container(
                    decoration: BoxDecoration(
                      border: Border.all(
                          width: 1.0, color: const Color(0xff707070)),
                    ),
                  ),
                ),
                Pinned.fromPins(
                  Pin(size: 665.0, start: 31.0),
                  Pin(size: 120.0, middle: 0.5359),
                  child:
                      // Adobe XD layer: 'params' (group)
                      Stack(
                    children: <Widget>[
                      Pinned.fromPins(
                        Pin(size: 85.0, middle: 0.6),
                        Pin(start: 0.0, end: 0.0),
                        child:
                            // Adobe XD layer: 'paramsComponentUnna…' (group)
                            Stack(
                          children: <Widget>[
                            Pinned.fromPins(
                              Pin(start: 0.0, end: 1.0),
                              Pin(size: 84.0, end: 0.0),
                              child: SingleChildScrollView(
                                primary: false,
                                child: Wrap(
                                  alignment: WrapAlignment.center,
                                  spacing: 20,
                                  runSpacing: 20,
                                  children: [
                                    {
                                      'text': '1',
                                    },
                                    {
                                      'text': '2',
                                    },
                                    {
                                      'text': '3',
                                    },
                                    {
                                      'text': '4',
                                    }
                                  ].map((itemData) {
                                    final text = itemData['text']!;
                                    return SizedBox(
                                      width: 32.0,
                                      height: 32.0,
                                      child: Stack(
                                        children: <Widget>[
                                          Stack(
                                            children: <Widget>[
                                              Container(
                                                width: 32.0,
                                                height: 32.0,
                                                decoration: BoxDecoration(
                                                  color:
                                                      const Color(0xff008d00),
                                                  borderRadius:
                                                      BorderRadius.circular(
                                                          8.0),
                                                ),
                                              ),
                                              Transform.translate(
                                                offset: Offset(0.0, 5.0),
                                                child: SizedBox(
                                                  width: 32.0,
                                                  height: 22.0,
                                                  child: Text(
                                                    text,
                                                    style: TextStyle(
                                                      fontFamily: 'Arial',
                                                      fontSize: 18,
                                                      color: const Color(
                                                          0xffffffff),
                                                      fontWeight:
                                                          FontWeight.w700,
                                                    ),
                                                    textAlign: TextAlign.center,
                                                  ),
                                                ),
                                              ),
                                            ],
                                          ),
                                        ],
                                      ),
                                    );
                                  }).toList(),
                                ),
                              ),
                            ),
                            Pinned.fromPins(
                              Pin(start: 1.0, end: 0.0),
                              Pin(size: 36.0, start: 0.0),
                              child: Text(
                                'component\n(unnamed)',
                                style: TextStyle(
                                  fontFamily: 'Arial',
                                  fontSize: 14,
                                  color: const Color(0xff008d00),
                                ),
                                textAlign: TextAlign.center,
                              ),
                            ),
                            Pinned.fromPins(
                              Pin(start: 0.0, end: 1.0),
                              Pin(size: 84.0, end: 0.0),
                              child: Container(
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
                      Pinned.fromPins(
                        Pin(size: 84.0, start: 0.0),
                        Pin(start: 0.0, end: 0.0),
                        child:
                            // Adobe XD layer: 'paramsImplicitGroup' (group)
                            Stack(
                          children: <Widget>[
                            Padding(
                              padding: EdgeInsets.fromLTRB(0.0, 36.0, 0.0, 0.0),
                              child: SingleChildScrollView(
                                primary: false,
                                child: Wrap(
                                  alignment: WrapAlignment.center,
                                  spacing: 20,
                                  runSpacing: 20,
                                  children: [
                                    {
                                      'label': '1',
                                    },
                                    {
                                      'label': '2',
                                    },
                                    {
                                      'label': '3',
                                    },
                                    {
                                      'label': '4',
                                    }
                                  ].map((itemData) {
                                    final label = itemData['label']!;
                                    return SizedBox(
                                      width: 32.0,
                                      height: 32.0,
                                      child: Stack(
                                        children: <Widget>[
                                          Container(
                                            color: const Color(0xff008d00),
                                          ),
                                          Padding(
                                            padding: EdgeInsets.symmetric(
                                                horizontal: 0.0, vertical: 5.0),
                                            child: SizedBox.expand(
                                                child: Text(
                                              label,
                                              style: TextStyle(
                                                fontFamily: 'Arial',
                                                fontSize: 18,
                                                color: const Color(0xffffffff),
                                                fontWeight: FontWeight.w700,
                                              ),
                                              textAlign: TextAlign.center,
                                            )),
                                          ),
                                        ],
                                      ),
                                    );
                                  }).toList(),
                                ),
                              ),
                            ),
                            Pinned.fromPins(
                              Pin(start: 0.0, end: 0.0),
                              Pin(size: 36.0, start: 0.0),
                              child: Text(
                                'group\n(implicit)',
                                style: TextStyle(
                                  fontFamily: 'Arial',
                                  fontSize: 14,
                                  color: const Color(0xff008d00),
                                ),
                                textAlign: TextAlign.center,
                              ),
                            ),
                            Container(
                              decoration: BoxDecoration(
                                border: Border.all(
                                    width: 1.0, color: const Color(0xff707070)),
                              ),
                              margin: EdgeInsets.fromLTRB(0.0, 36.0, 0.0, 0.0),
                            ),
                          ],
                        ),
                      ),
                      Pinned.fromPins(
                        Pin(size: 84.0, middle: 0.8003),
                        Pin(start: 0.0, end: 0.0),
                        child:
                            // Adobe XD layer: 'paramsImplicitGroup' (group)
                            Stack(
                          children: <Widget>[
                            Padding(
                              padding: EdgeInsets.fromLTRB(0.0, 36.0, 0.0, 0.0),
                              child: SingleChildScrollView(
                                primary: false,
                                child: Wrap(
                                  alignment: WrapAlignment.center,
                                  spacing: 20,
                                  runSpacing: 20,
                                  children: [
                                    {
                                      'icon': const AssetImage(
                                          'assets/images/one.png'),
                                    },
                                    {
                                      'icon': const AssetImage(
                                          'assets/images/two.png'),
                                    },
                                    {
                                      'icon': const AssetImage(
                                          'assets/images/three.png'),
                                    },
                                    {
                                      'icon': const AssetImage(
                                          'assets/images/four.png'),
                                    }
                                  ].map((itemData) {
                                    final icon = itemData['icon']!;
                                    return SizedBox(
                                      width: 32.0,
                                      height: 32.0,
                                      child: Stack(
                                        children: <Widget>[
                                          // Adobe XD layer: 'one' (shape)
                                          Container(
                                            decoration: BoxDecoration(
                                              image: DecorationImage(
                                                image: icon,
                                                fit: BoxFit.cover,
                                              ),
                                            ),
                                          ),
                                        ],
                                      ),
                                    );
                                  }).toList(),
                                ),
                              ),
                            ),
                            Pinned.fromPins(
                              Pin(start: 0.0, end: 0.0),
                              Pin(size: 36.0, start: 0.0),
                              child: Text(
                                'images\n(named)',
                                style: TextStyle(
                                  fontFamily: 'Arial',
                                  fontSize: 14,
                                  color: const Color(0xff008d00),
                                ),
                                textAlign: TextAlign.center,
                              ),
                            ),
                            Container(
                              decoration: BoxDecoration(
                                border: Border.all(
                                    width: 1.0, color: const Color(0xff707070)),
                              ),
                              margin: EdgeInsets.fromLTRB(0.0, 36.0, 0.0, 0.0),
                            ),
                          ],
                        ),
                      ),
                      Pinned.fromPins(
                        Pin(size: 84.0, end: 0.0),
                        Pin(start: 0.0, end: 0.0),
                        child:
                            // Adobe XD layer: 'paramsImplicitGroup' (group)
                            Stack(
                          children: <Widget>[
                            Padding(
                              padding: EdgeInsets.fromLTRB(0.0, 36.0, 0.0, 0.0),
                              child: SingleChildScrollView(
                                primary: false,
                                child: Wrap(
                                  alignment: WrapAlignment.center,
                                  spacing: 20,
                                  runSpacing: 20,
                                  children: [
                                    {
                                      'image': const AssetImage(
                                          'assets/images/one.png'),
                                    },
                                    {
                                      'image': const AssetImage(
                                          'assets/images/two.png'),
                                    },
                                    {
                                      'image': const AssetImage(
                                          'assets/images/three.png'),
                                    },
                                    {
                                      'image': const AssetImage(
                                          'assets/images/four.png'),
                                    }
                                  ].map((itemData) {
                                    final image = itemData['image']!;
                                    return SizedBox(
                                      width: 32.0,
                                      height: 32.0,
                                      child: Stack(
                                        children: <Widget>[
                                          // Adobe XD layer: 'one' (shape)
                                          Container(
                                            decoration: BoxDecoration(
                                              image: DecorationImage(
                                                image: image,
                                                fit: BoxFit.cover,
                                              ),
                                            ),
                                          ),
                                        ],
                                      ),
                                    );
                                  }).toList(),
                                ),
                              ),
                            ),
                            Pinned.fromPins(
                              Pin(start: 0.0, end: 0.0),
                              Pin(size: 36.0, start: 0.0),
                              child: Text(
                                'images\n(unnamed)',
                                style: TextStyle(
                                  fontFamily: 'Arial',
                                  fontSize: 14,
                                  color: const Color(0xff008d00),
                                ),
                                textAlign: TextAlign.center,
                              ),
                            ),
                            Container(
                              decoration: BoxDecoration(
                                border: Border.all(
                                    width: 1.0, color: const Color(0xff707070)),
                              ),
                              margin: EdgeInsets.fromLTRB(0.0, 36.0, 0.0, 0.0),
                            ),
                          ],
                        ),
                      ),
                      Pinned.fromPins(
                        Pin(size: 84.0, middle: 0.1997),
                        Pin(start: 0.0, end: 0.0),
                        child:
                            // Adobe XD layer: 'paramsExplicitGroup' (group)
                            Stack(
                          children: <Widget>[
                            Padding(
                              padding: EdgeInsets.fromLTRB(0.0, 36.0, 0.0, 0.0),
                              child: SingleChildScrollView(
                                primary: false,
                                child: Wrap(
                                  alignment: WrapAlignment.center,
                                  spacing: 20,
                                  runSpacing: 20,
                                  children: [
                                    {
                                      'label': '1',
                                    },
                                    {
                                      'label': '2',
                                    },
                                    {
                                      'label': '3',
                                    },
                                    {
                                      'label': '4',
                                    }
                                  ].map((itemData) {
                                    final label = itemData['label']!;
                                    return SizedBox(
                                      width: 32.0,
                                      height: 32.0,
                                      child: Stack(
                                        children: <Widget>[
                                          Container(
                                            color: const Color(0xff008d00),
                                          ),
                                          Padding(
                                            padding: EdgeInsets.symmetric(
                                                horizontal: 0.0, vertical: 5.0),
                                            child: SizedBox.expand(
                                                child: Text(
                                              label,
                                              style: TextStyle(
                                                fontFamily: 'Arial',
                                                fontSize: 18,
                                                color: const Color(0xffffffff),
                                                fontWeight: FontWeight.w700,
                                              ),
                                              textAlign: TextAlign.center,
                                            )),
                                          ),
                                        ],
                                      ),
                                    );
                                  }).toList(),
                                ),
                              ),
                            ),
                            Pinned.fromPins(
                              Pin(start: 0.0, end: 0.0),
                              Pin(size: 36.0, start: 0.0),
                              child: Text(
                                'group\n(explicit)',
                                style: TextStyle(
                                  fontFamily: 'Arial',
                                  fontSize: 14,
                                  color: const Color(0xff008d00),
                                ),
                                textAlign: TextAlign.center,
                              ),
                            ),
                            Container(
                              decoration: BoxDecoration(
                                border: Border.all(
                                    width: 1.0, color: const Color(0xff707070)),
                              ),
                              margin: EdgeInsets.fromLTRB(0.0, 36.0, 0.0, 0.0),
                            ),
                          ],
                        ),
                      ),
                      Pinned.fromPins(
                        Pin(size: 85.0, middle: 0.4),
                        Pin(start: 0.0, end: 0.0),
                        child:
                            // Adobe XD layer: 'paramsUnnamed' (group)
                            Stack(
                          children: <Widget>[
                            Padding(
                              padding: EdgeInsets.fromLTRB(0.0, 36.0, 0.0, 0.0),
                              child: SingleChildScrollView(
                                primary: false,
                                child: Wrap(
                                  alignment: WrapAlignment.center,
                                  spacing: 20,
                                  runSpacing: 20,
                                  children: [
                                    {
                                      'text': '1',
                                    },
                                    {
                                      'text': '2',
                                    },
                                    {
                                      'text': '3',
                                    },
                                    {
                                      'text': '4',
                                    }
                                  ].map((itemData) {
                                    final text = itemData['text']!;
                                    return SizedBox(
                                      width: 32.0,
                                      height: 32.0,
                                      child: Stack(
                                        children: <Widget>[
                                          Container(
                                            color: const Color(0xff008d00),
                                          ),
                                          Padding(
                                            padding: EdgeInsets.symmetric(
                                                horizontal: 0.0, vertical: 5.0),
                                            child: SizedBox.expand(
                                                child: Text(
                                              text,
                                              style: TextStyle(
                                                fontFamily: 'Arial',
                                                fontSize: 18,
                                                color: const Color(0xffffffff),
                                                fontWeight: FontWeight.w700,
                                              ),
                                              textAlign: TextAlign.center,
                                            )),
                                          ),
                                        ],
                                      ),
                                    );
                                  }).toList(),
                                ),
                              ),
                            ),
                            Pinned.fromPins(
                              Pin(start: 0.0, end: 1.0),
                              Pin(size: 36.0, start: 0.0),
                              child: Text(
                                'unnamed params',
                                style: TextStyle(
                                  fontFamily: 'Arial',
                                  fontSize: 14,
                                  color: const Color(0xff008d00),
                                ),
                                textAlign: TextAlign.center,
                              ),
                            ),
                            Pinned.fromPins(
                              Pin(start: 0.0, end: 1.0),
                              Pin(size: 84.0, end: 0.0),
                              child: Container(
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
                    ],
                  ),
                ),
                Pinned.fromPins(
                  Pin(size: 84.0, end: 18.0),
                  Pin(size: 89.0, middle: 0.5918),
                  child: Text(
                    'The other grids are responsive in a fixed size parent.',
                    style: TextStyle(
                      fontFamily: 'Arial',
                      fontSize: 14,
                      color: const Color(0xff000000),
                    ),
                  ),
                ),
              ],
            ),
          ),
          Pinned.fromPins(
            Pin(start: 16.0, end: 16.0),
            Pin(start: 526.0, endFraction: 0.0222),
            child: XDTestGroup(
              title: 'Responsive',
            ),
          ),
          Pinned.fromPins(
            Pin(start: 47.0, endFraction: 0.5313),
            Pin(start: 574.0, end: 37.0),
            child: Stack(
              children: <Widget>[
                Pinned.fromPins(
                  Pin(start: 0.0, endFraction: 0.0),
                  Pin(start: 25.0, end: 0.0),
                  child: SingleChildScrollView(
                    primary: false,
                    child: Wrap(
                      alignment: WrapAlignment.center,
                      spacing: 20,
                      runSpacing: 20,
                      children: [
                        {},
                        {},
                        {},
                        {},
                        {},
                        {},
                        {},
                        {},
                        {},
                        {},
                        {},
                        {},
                        {},
                        {},
                        {},
                        {}
                      ].map((itemData) {
                        return SizedBox(
                          width: 32.0,
                          height: 32.0,
                          child: Stack(
                            children: <Widget>[
                              Container(
                                color: const Color(0xff008d00),
                              ),
                              Padding(
                                padding: EdgeInsets.symmetric(
                                    horizontal: 0.0, vertical: 5.0),
                                child: SizedBox.expand(
                                    child: Text(
                                  'Hi!',
                                  style: TextStyle(
                                    fontFamily: 'Arial',
                                    fontSize: 18,
                                    color: const Color(0xffffffff),
                                    fontWeight: FontWeight.w700,
                                  ),
                                  textAlign: TextAlign.center,
                                )),
                              ),
                            ],
                          ),
                        );
                      }).toList(),
                    ),
                  ),
                ),
                Pinned.fromPins(
                  Pin(start: 0.0, endFraction: 0.0),
                  Pin(start: 25.0, end: 0.0),
                  child: Container(
                    decoration: BoxDecoration(
                      border: Border.all(
                          width: 1.0, color: const Color(0xff707070)),
                    ),
                  ),
                ),
                Pinned.fromPins(
                  Pin(start: 0.0, endFraction: 0.0),
                  Pin(size: 16.0, start: 0.0),
                  child: Text(
                    'fixed size item',
                    style: TextStyle(
                      fontFamily: 'Arial',
                      fontSize: 14,
                      color: const Color(0xff008d00),
                    ),
                    textAlign: TextAlign.center,
                  ),
                ),
              ],
            ),
          ),
          Pinned.fromPins(
            Pin(end: 45.0, startFraction: 0.5375),
            Pin(start: 574.0, end: 37.0),
            child: Stack(
              children: <Widget>[
                Pinned.fromPins(
                  Pin(end: 0.0, startFraction: 0.0),
                  Pin(start: 25.0, end: 0.0),
                  child: GridView.count(
                    mainAxisSpacing: 20,
                    crossAxisSpacing: 20,
                    crossAxisCount: 8,
                    childAspectRatio: 1.0,
                    children: [
                      {},
                      {},
                      {},
                      {},
                      {},
                      {},
                      {},
                      {},
                      {},
                      {},
                      {},
                      {},
                      {},
                      {},
                      {},
                      {}
                    ].map((itemData) {
                      return Stack(
                        children: <Widget>[
                          Container(
                            color: const Color(0xff008d00),
                          ),
                          Pinned.fromPins(
                            Pin(start: 0.0, end: 0.0),
                            Pin(size: 22.0, middle: 0.5),
                            child: Text(
                              'Hi!',
                              style: TextStyle(
                                fontFamily: 'Arial',
                                fontSize: 18,
                                color: const Color(0xffffffff),
                                fontWeight: FontWeight.w700,
                              ),
                              textAlign: TextAlign.center,
                            ),
                          ),
                        ],
                      );
                    }).toList(),
                  ),
                ),
                Pinned.fromPins(
                  Pin(end: 0.0, startFraction: 0.0),
                  Pin(start: 25.0, end: 0.0),
                  child: Container(
                    decoration: BoxDecoration(
                      border: Border.all(
                          width: 1.0, color: const Color(0xff707070)),
                    ),
                  ),
                ),
                Pinned.fromPins(
                  Pin(end: 0.0, startFraction: 0.0),
                  Pin(size: 16.0, start: 0.0),
                  child: Text(
                    'responsive item',
                    style: TextStyle(
                      fontFamily: 'Arial',
                      fontSize: 14,
                      color: const Color(0xff008d00),
                    ),
                    textAlign: TextAlign.center,
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

const String _svg_pcmu3c =
    '<svg viewBox="47.0 96.0 32.0 32.0" ><path transform="translate(47.0, 96.0)" d="M 15.99999809265137 0 L 31.99999809265137 32 L 0 32 Z" fill="#008d00" stroke="none" stroke-width="1" stroke-miterlimit="4" stroke-linecap="butt" /></svg>';

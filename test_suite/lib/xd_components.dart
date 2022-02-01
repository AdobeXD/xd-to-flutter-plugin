import 'package:flutter/material.dart';
import './xd_page_size.dart';
import 'package:adobe_xd/pinned.dart';
import './xd_title_bar.dart';
import './xd_test_group.dart';
import './xd_component171.dart';
import './xd_dupe_params_same_type.dart';
import './xd_nested_component.dart';
import './xd_component251.dart';
import './xd_component181.dart';

class XDComponents extends StatelessWidget {
  XDComponents({
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
              title: 'Components & Groups',
            ),
          ),
          Pinned.fromPins(
            Pin(start: 16.0, end: 16.0),
            Pin(size: 180.0, start: 64.0),
            child:
                // Adobe XD layer: 'components_supported' (group)
                Stack(
              children: <Widget>[
                Pinned.fromPins(
                  Pin(start: 0.0, end: 0.0),
                  Pin(start: 0.0, endFraction: 0.0),
                  child: XDTestGroup(
                    title: 'Components: Supported',
                  ),
                ),
                Pinned.fromPins(
                  Pin(size: 96.0, start: 16.0),
                  Pin(size: 102.0, start: 48.0),
                  child:
                      // Adobe XD layer: 'namedParams' (group)
                      Stack(
                    children: <Widget>[
                      Pinned.fromPins(
                        Pin(start: 0.0, end: 2.0),
                        Pin(size: 16.0, start: 0.0),
                        child: Text(
                          'named params',
                          style: TextStyle(
                            fontFamily: 'Arial',
                            fontSize: 14,
                            color: const Color(0xff008d00),
                          ),
                          textAlign: TextAlign.center,
                        ),
                      ),
                      Pinned.fromPins(
                        Pin(start: 0.0, end: 0.0),
                        Pin(size: 42.0, end: 0.0),
                        child:
                            // Adobe XD layer: 'NamedParams' (component)
                            XDComponent171(
                          icon: const AssetImage('assets/images/two.png'),
                          label: 'Two',
                          labelColor: const Color(0xff008d00),
                        ),
                      ),
                      Align(
                        alignment: Alignment(-1.0, -0.314),
                        child: SizedBox(
                          width: 72.0,
                          height: 32.0,
                          child: XDComponent171(
                            icon: const AssetImage('assets/images/one.png'),
                            label: 'One',
                            labelColor: const Color(0xff000000),
                          ),
                        ),
                      ),
                    ],
                  ),
                ),
                Pinned.fromPins(
                  Pin(size: 94.0, start: 264.0),
                  Pin(size: 112.0, start: 48.0),
                  child:
                      // Adobe XD layer: 'dupeParamsSameType' (group)
                      Stack(
                    children: <Widget>[
                      Pinned.fromPins(
                        Pin(start: 0.0, end: 0.0),
                        Pin(size: 49.0, start: 0.0),
                        child: Text(
                          'dupe params of same type\n(shared value)',
                          style: TextStyle(
                            fontFamily: 'Arial',
                            fontSize: 14,
                            color: const Color(0xff008d00),
                          ),
                          textAlign: TextAlign.center,
                        ),
                      ),
                      Pinned.fromPins(
                        Pin(start: 0.0, end: 0.0),
                        Pin(size: 25.0, middle: 0.6207),
                        child:
                            // Adobe XD layer: 'DupeParamsSameType' (component)
                            XDDupeParamsSameType(
                          label: 'Two',
                          labelColor: const Color(0xff000000),
                        ),
                      ),
                      Pinned.fromPins(
                        Pin(start: 0.0, end: 0.0),
                        Pin(size: 25.0, end: 0.0),
                        child:
                            // Adobe XD layer: 'DupeParamsSameType' (component)
                            XDDupeParamsSameType(
                          label: '4',
                          labelColor: const Color(0xff000000),
                        ),
                      ),
                    ],
                  ),
                ),
                Pinned.fromPins(
                  Pin(size: 104.0, start: 136.0),
                  Pin(size: 96.0, start: 48.0),
                  child:
                      // Adobe XD layer: 'nested' (group)
                      Stack(
                    children: <Widget>[
                      Pinned.fromPins(
                        Pin(start: 0.0, end: 10.0),
                        Pin(size: 16.0, start: 0.0),
                        child: Text(
                          'nested',
                          style: TextStyle(
                            fontFamily: 'Arial',
                            fontSize: 14,
                            color: const Color(0xffc37f00),
                          ),
                          textAlign: TextAlign.center,
                        ),
                      ),
                      Pinned.fromPins(
                        Pin(start: 0.0, end: 0.0),
                        Pin(size: 32.0, middle: 0.375),
                        child:
                            // Adobe XD layer: 'NestedComponent' (component)
                            XDNestedComponent(),
                      ),
                      Pinned.fromPins(
                        Pin(start: 0.0, end: 0.0),
                        Pin(size: 32.0, end: 0.0),
                        child:
                            // Adobe XD layer: 'NestedComponent' (component)
                            XDNestedComponent(),
                      ),
                    ],
                  ),
                ),
              ],
            ),
          ),
          Pinned.fromPins(
            Pin(start: 16.0, end: 16.0),
            Pin(size: 180.0, start: 260.0),
            child:
                // Adobe XD layer: 'components_unsuppor…' (group)
                Stack(
              children: <Widget>[
                Pinned.fromPins(
                  Pin(start: 0.0, end: 0.0),
                  Pin(start: 0.0, endFraction: 0.0),
                  child: XDTestGroup(
                    title: 'Components: Unsupported',
                  ),
                ),
                Pinned.fromPins(
                  Pin(size: 102.0, start: 352.0),
                  Pin(size: 97.0, start: 48.0),
                  child:
                      // Adobe XD layer: 'duplicateParams' (group)
                      Stack(
                    children: <Widget>[
                      Pinned.fromPins(
                        Pin(start: 4.0, end: 4.0),
                        Pin(size: 39.0, start: 0.0),
                        child: Text(
                          'dupe params\nof diff types',
                          style: TextStyle(
                            fontFamily: 'Arial',
                            fontSize: 14,
                            color: const Color(0xff981a1a),
                          ),
                          textAlign: TextAlign.center,
                        ),
                      ),
                      Pinned.fromPins(
                        Pin(start: 0.0, end: 0.0),
                        Pin(size: 36.0, middle: 0.6393),
                        child: Text(
                          'hidden-causes Flutter RTEs',
                          style: TextStyle(
                            fontFamily: 'Arial',
                            fontSize: 14,
                            color: const Color(0xff6b6b6b),
                          ),
                          textAlign: TextAlign.center,
                        ),
                      ),
                      Pinned.fromPins(
                        Pin(size: 16.0, start: 15.0),
                        Pin(size: 15.0, middle: 0.9634),
                        child: XDComponent251(),
                      ),
                      Pinned.fromPins(
                        Pin(start: 4.0, end: 4.0),
                        Pin(size: 16.0, end: 0.0),
                        child: Text(
                          'error',
                          style: TextStyle(
                            fontFamily: 'Arial',
                            fontSize: 14,
                            color: const Color(0xff000000),
                          ),
                          textAlign: TextAlign.center,
                        ),
                      ),
                    ],
                  ),
                ),
                Pinned.fromPins(
                  Pin(size: 96.0, start: 240.0),
                  Pin(size: 66.0, start: 48.0),
                  child:
                      // Adobe XD layer: 'arbitraryEdit' (group)
                      Stack(
                    children: <Widget>[
                      Pinned.fromPins(
                        Pin(start: 0.0, end: 2.0),
                        Pin(size: 16.0, start: 0.0),
                        child: Text(
                          'arbitrary edit',
                          style: TextStyle(
                            fontFamily: 'Arial',
                            fontSize: 14,
                            color: const Color(0xff981a1a),
                          ),
                          textAlign: TextAlign.center,
                        ),
                      ),
                      Pinned.fromPins(
                        Pin(start: 0.0, end: 0.0),
                        Pin(size: 42.0, end: 0.0),
                        child: XDComponent171(
                          icon: const AssetImage('assets/images/two.png'),
                          label: 'Two',
                          labelColor: const Color(0xff000000),
                        ),
                      ),
                    ],
                  ),
                ),
                Pinned.fromPins(
                  Pin(size: 102.0, start: 588.0),
                  Pin(size: 97.0, start: 48.0),
                  child:
                      // Adobe XD layer: 'noMainComponent' (group)
                      Stack(
                    children: <Widget>[
                      Pinned.fromPins(
                        Pin(start: 4.0, end: 4.0),
                        Pin(size: 16.0, start: 0.0),
                        child: Text(
                          'no main',
                          style: TextStyle(
                            fontFamily: 'Arial',
                            fontSize: 14,
                            color: const Color(0xff981a1a),
                          ),
                          textAlign: TextAlign.center,
                        ),
                      ),
                      Pinned.fromPins(
                        Pin(start: 4.0, end: 4.0),
                        Pin(size: 16.0, end: 0.0),
                        child: Text(
                          'error',
                          style: TextStyle(
                            fontFamily: 'Arial',
                            fontSize: 14,
                            color: const Color(0xff000000),
                          ),
                          textAlign: TextAlign.center,
                        ),
                      ),
                      Pinned.fromPins(
                        Pin(start: 0.0, end: 0.0),
                        Pin(size: 57.0, middle: 0.6),
                        child: Text(
                          'Not included to avoid errors during export.',
                          style: TextStyle(
                            fontFamily: 'Arial',
                            fontSize: 14,
                            color: const Color(0xff6b6b6b),
                          ),
                          textAlign: TextAlign.center,
                        ),
                      ),
                      Pinned.fromPins(
                        Pin(size: 16.0, start: 15.0),
                        Pin(size: 15.0, middle: 0.9878),
                        child: XDComponent251(),
                      ),
                    ],
                  ),
                ),
                Pinned.fromPins(
                  Pin(size: 96.0, start: 128.0),
                  Pin(size: 66.0, start: 48.0),
                  child:
                      // Adobe XD layer: 'richText' (group)
                      Stack(
                    children: <Widget>[
                      Pinned.fromPins(
                        Pin(start: 0.0, end: 2.0),
                        Pin(size: 16.0, start: 0.0),
                        child: Text(
                          'rich text',
                          style: TextStyle(
                            fontFamily: 'Arial',
                            fontSize: 14,
                            color: const Color(0xff981a1a),
                          ),
                          textAlign: TextAlign.center,
                        ),
                      ),
                      Pinned.fromPins(
                        Pin(start: 0.0, end: 0.0),
                        Pin(size: 42.0, end: 0.0),
                        child: XDComponent171(
                          icon: const AssetImage('assets/images/two.png'),
                          label: 'ABCD',
                          labelColor: const Color(0xff000000),
                        ),
                      ),
                    ],
                  ),
                ),
                Pinned.fromPins(
                  Pin(size: 96.0, start: 16.0),
                  Pin(size: 102.0, start: 48.0),
                  child:
                      // Adobe XD layer: 'unnamedParams' (group)
                      Stack(
                    children: <Widget>[
                      Pinned.fromPins(
                        Pin(start: 0.0, end: 2.0),
                        Pin(size: 16.0, start: 0.0),
                        child: Text(
                          'unnamed',
                          style: TextStyle(
                            fontFamily: 'Arial',
                            fontSize: 14,
                            color: const Color(0xff981a1a),
                          ),
                          textAlign: TextAlign.center,
                        ),
                      ),
                      Align(
                        alignment: Alignment(-1.0, -0.314),
                        child: SizedBox(
                          width: 72.0,
                          height: 32.0,
                          child: XDComponent181(),
                        ),
                      ),
                      Pinned.fromPins(
                        Pin(start: 0.0, end: 0.0),
                        Pin(size: 42.0, end: 0.0),
                        child:
                            // Adobe XD layer: 'UnnamedParams' (component)
                            XDComponent181(),
                      ),
                    ],
                  ),
                ),
                Pinned.fromPins(
                  Pin(size: 102.0, start: 470.0),
                  Pin(size: 97.0, start: 48.0),
                  child:
                      // Adobe XD layer: 'duplicateName' (group)
                      Stack(
                    children: <Widget>[
                      Pinned.fromPins(
                        Pin(start: 4.0, end: 4.0),
                        Pin(size: 16.0, start: 0.0),
                        child: Text(
                          'dupe name',
                          style: TextStyle(
                            fontFamily: 'Arial',
                            fontSize: 14,
                            color: const Color(0xff981a1a),
                          ),
                          textAlign: TextAlign.center,
                        ),
                      ),
                      Pinned.fromPins(
                        Pin(start: 4.0, end: 4.0),
                        Pin(size: 16.0, end: 0.0),
                        child: Text(
                          'error',
                          style: TextStyle(
                            fontFamily: 'Arial',
                            fontSize: 14,
                            color: const Color(0xff000000),
                          ),
                          textAlign: TextAlign.center,
                        ),
                      ),
                      Pinned.fromPins(
                        Pin(size: 16.0, start: 13.0),
                        Pin(size: 15.0, middle: 0.9878),
                        child: XDComponent251(),
                      ),
                      Pinned.fromPins(
                        Pin(start: 0.0, end: 0.0),
                        Pin(size: 57.0, middle: 0.6),
                        child: Text(
                          'Not included to avoid errors during export.',
                          style: TextStyle(
                            fontFamily: 'Arial',
                            fontSize: 14,
                            color: const Color(0xff6b6b6b),
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
          Padding(
            padding: EdgeInsets.fromLTRB(16.0, 456.0, 16.0, 84.0),
            child:
                // Adobe XD layer: 'groups' (group)
                Stack(
              children: <Widget>[
                Pinned.fromPins(
                  Pin(start: 0.0, end: 0.0),
                  Pin(start: 0.0, endFraction: 0.0),
                  child: XDTestGroup(
                    title: 'Groups',
                  ),
                ),
                Pinned.fromPins(
                  Pin(size: 150.0, start: 31.0),
                  Pin(start: 49.0, end: 31.0),
                  child:
                      // Adobe XD layer: 'layout' (group)
                      Stack(
                    children: <Widget>[
                      Container(
                        color: Colors.green,
                        child: Center(
                          child: Text(
                            "OK",
                            style: TextStyle(
                              color: Colors.white,
                              fontSize: 36.0,
                            ),
                          ),
                        ),
                      ),
                    ],
                  ),
                ),
                Pinned.fromPins(
                  Pin(size: 150.0, start: 197.0),
                  Pin(start: 49.0, end: 31.0),
                  child:
                      // Adobe XD layer: 'layout' (group)
                      Stack(
                    children: <Widget>[
                      buildExportAsBuilder(context),
                    ],
                  ),
                ),
                Pinned.fromPins(
                  Pin(size: 150.0, start: 363.0),
                  Pin(start: 49.0, end: 81.0),
                  child:
                      // Adobe XD layer: 'layout' (group)
                      Stack(
                    children: <Widget>[
                      Pinned.fromPins(
                        Pin(start: 0.0, end: 0.0),
                        Pin(size: 50.0, start: 0.0),
                        child: Text.rich(
                          TextSpan(
                            style: TextStyle(
                              fontFamily: 'Arial',
                              fontSize: 14,
                              color: const Color(0xff008d00),
                            ),
                            children: [
                              TextSpan(
                                text: 'Export as builder param: ',
                              ),
                              TextSpan(
                                text: 'Not included to avoid RTEs.',
                                style: TextStyle(
                                  color: const Color(0xff717171),
                                ),
                              ),
                            ],
                          ),
                          textHeightBehavior: TextHeightBehavior(
                              applyHeightToFirstAscent: false),
                          textAlign: TextAlign.center,
                        ),
                      ),
                    ],
                  ),
                ),
                Pinned.fromPins(
                  Pin(size: 150.0, start: 529.0),
                  Pin(start: 49.0, end: 81.0),
                  child:
                      // Adobe XD layer: 'layout' (group)
                      Stack(
                    children: <Widget>[
                      Pinned.fromPins(
                        Pin(start: 0.0, end: 0.0),
                        Pin(size: 50.0, start: 0.0),
                        child: Text.rich(
                          TextSpan(
                            style: TextStyle(
                              fontFamily: 'Arial',
                              fontSize: 14,
                              color: const Color(0xff981a1a),
                            ),
                            children: [
                              TextSpan(
                                text: 'Bad custom code:',
                              ),
                              TextSpan(
                                text: ' ',
                                style: TextStyle(
                                  color: const Color(0xff008d00),
                                ),
                              ),
                              TextSpan(
                                text: 'Not included to avoid errors.',
                                style: TextStyle(
                                  color: const Color(0xff717171),
                                ),
                              ),
                            ],
                          ),
                          textHeightBehavior: TextHeightBehavior(
                              applyHeightToFirstAscent: false),
                          textAlign: TextAlign.center,
                        ),
                      ),
                      Align(
                        alignment: Alignment(0.179, 1.0),
                        child: SizedBox(
                          width: 94.0,
                          height: 16.0,
                          child: Text(
                            'error',
                            style: TextStyle(
                              fontFamily: 'Arial',
                              fontSize: 14,
                              color: const Color(0xff000000),
                            ),
                            textAlign: TextAlign.center,
                          ),
                        ),
                      ),
                      Pinned.fromPins(
                        Pin(size: 16.0, start: 42.0),
                        Pin(size: 15.0, middle: 0.9714),
                        child: XDComponent251(),
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

  Widget buildExportAsBuilder(context) {
    return
        // Adobe XD layer: 'exportAsBuilder' (group)
        Stack(
      children: <Widget>[
        SizedBox.expand(
            child: Text.rich(
          TextSpan(
            style: TextStyle(
              fontFamily: 'Arial',
              fontSize: 14,
              color: const Color(0xff008d00),
            ),
            children: [
              TextSpan(
                text: 'Export as build method: ',
              ),
              TextSpan(
                text:
                    'Should generate and call a build method in the exported code.',
                style: TextStyle(
                  color: const Color(0xff717171),
                ),
              ),
            ],
          ),
          textHeightBehavior:
              TextHeightBehavior(applyHeightToFirstAscent: false),
          textAlign: TextAlign.center,
        )),
      ],
    );
  }
}

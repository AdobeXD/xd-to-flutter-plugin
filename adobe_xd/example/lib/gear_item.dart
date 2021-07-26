import 'package:flutter/material.dart';
import 'package:adobe_xd/pinned.dart';

class GearItem extends StatelessWidget {
  final String description;
  final String label;
  final ImageProvider icon;
  GearItem({
    Key? key,
    this.description =
        'Warm, dry, cool, and comfortable: Our favorite all-weather outer shell.',
    this.label = 'Outerwear',
    this.icon = const AssetImage('assets/images/jacket.png'),
  }) : super(key: key);
  @override
  Widget build(BuildContext context) {
    return Stack(
      children: <Widget>[
        Pinned.fromPins(
          Pin(start: 0.0, end: 0.0),
          Pin(start: 0.0, end: 0.0),
          child:
              // Adobe XD layer: 'content' (group)
              Stack(
            children: [
// background:
              Positioned.fill(
                child:
                    // Adobe XD layer: 'background' (shape)
                    Container(
                  decoration: BoxDecoration(
                    color: const Color(0xffffffff),
                    boxShadow: [
                      BoxShadow(
                        color: const Color(0xa8000000),
                        offset: Offset(0, 3),
                        blurRadius: 6,
                      ),
                    ],
                  ),
                ),
              ),
              Positioned.fill(
                child: Padding(
                  padding: EdgeInsets.fromLTRB(8.0, 16.0, 16.0, 16.0),
                  child: Stack(
                    children: <Widget>[
                      Pinned.fromPins(
                        Pin(start: 140.0, end: 0.0),
                        Pin(size: 103.0, middle: 1.0),
                        child:
                            // Adobe XD layer: 'Warm, dry, cool, an…' (text)
                            Text(
                          description,
                          style: TextStyle(
                            fontFamily: 'Georgia',
                            fontSize: 16,
                            color: const Color(0xff333333),
                          ),
                          textAlign: TextAlign.left,
                        ),
                      ),
                      Pinned.fromPins(
                        Pin(size: 128.0, start: 0.0),
                        Pin(size: 115.0, start: 0.0),
                        child:
                            // Adobe XD layer: 'icon' (group)
                            Stack(
                          children: <Widget>[
                            Transform.translate(
                              offset: Offset(0.0, 95.0),
                              child:
                                  // Adobe XD layer: 'Outerwear' (text)
                                  SizedBox(
                                width: 128.0,
                                height: 20.0,
                                child: Text(
                                  label,
                                  style: TextStyle(
                                    fontFamily: 'Helvetica',
                                    fontSize: 20,
                                    color: const Color(0xff00a9de),
                                  ),
                                  textAlign: TextAlign.center,
                                ),
                              ),
                            ),
                            Transform.translate(
                              offset: Offset(24.0, 0.0),
                              child:
                                  // Adobe XD layer: 'jacket' (shape)
                                  Container(
                                width: 81.0,
                                height: 85.0,
                                decoration: BoxDecoration(
                                  image: DecorationImage(
                                    image: icon,
                                    fit: BoxFit.cover,
                                  ),
                                ),
                              ),
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
    );
  }
}

import 'package:flutter/material.dart';

class GearItem extends StatelessWidget {
  final String description;
  final String label;
  final ImageProvider icon;
  GearItem({
    Key key,
    this.description =
        'Warm, dry, cool, and comfortable: Our favorite all-weather outer shell.',
    this.label = 'Outerwear',
    this.icon = const AssetImage('assets/images/jacket.png'),
  }) : super(key: key);
  @override
  Widget build(BuildContext context) {
    return Stack(
      children: <Widget>[
        Transform.translate(
          offset: Offset(157.5, 48.0),
          child:
              // Adobe XD layer: 'Warm, dry, cool, an…' (text)
              SizedBox(
            width: 188.0,
            height: 63.0,
            child: Text(
              description,
              style: TextStyle(
                fontFamily: 'Georgia',
                fontSize: 16,
                color: const Color(0xff333333),
              ),
              textAlign: TextAlign.left,
            ),
          ),
        ),
        Transform.translate(
          offset: Offset(-13.0, -353.0),
          child:
              // Adobe XD layer: 'jacket & label' (group)
              Stack(
            children: <Widget>[
              Transform.translate(
                offset: Offset(-1.0, 8.0),
                child:
                    // Adobe XD layer: 'label & rectangle' (group)
                    Stack(
                  children: <Widget>[
                    Transform.translate(
                      offset: Offset(14.0, 345.0),
                      child:
                          // Adobe XD layer: 'rectangle' (shape)
                          Container(
                        width: 158.0,
                        height: 158.0,
                        decoration: BoxDecoration(
                          borderRadius: BorderRadius.circular(4.0),
                        ),
                      ),
                    ),
                    Transform.translate(
                      offset: Offset(51.0, 474.0),
                      child:
                          // Adobe XD layer: 'Outerwear' (text)
                          SizedBox(
                        width: 84.0,
                        child: Text(
                          label,
                          style: TextStyle(
                            fontFamily: 'Helvetica',
                            fontSize: 15,
                            color: const Color(0xff00a9de),
                          ),
                          textAlign: TextAlign.center,
                        ),
                      ),
                    ),
                  ],
                ),
              ),
              Transform.translate(
                offset: Offset(41.0, 368.0),
                child:
                    // Adobe XD layer: 'jacket' (shape)
                    Container(
                  width: 102.0,
                  height: 102.0,
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
    );
  }
}

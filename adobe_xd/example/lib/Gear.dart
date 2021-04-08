import 'package:flutter/material.dart';
import 'package:adobe_xd/pinned.dart';
import './GearItem.dart';
import 'dart:ui' as ui;
import 'package:adobe_xd/page_link.dart';
import 'package:flutter_svg/flutter_svg.dart';

class Gear extends StatelessWidget {
  Gear({
    Key? key,
  }) : super(key: key);
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: const Color(0xffffffff),
      body: Stack(
        children: <Widget>[
          Pinned.fromSize(
            bounds: Rect.fromLTWH(13.0, 632.0, 345.5, 158.0),
            size: Size(375.0, 812.0),
            pinLeft: true,
            pinRight: true,
            pinTop: true,
            fixedHeight: true,
            child:
                // Adobe XD layer: 'GearItem' (component)
                GearItem(
              description:
                  'After 6 months of cooking on camp stoves, this was the last stove standing.',
              label: 'Supplies',
              icon: const AssetImage('assets/images/lantern.png'),
            ),
          ),
          Pinned.fromSize(
            bounds: Rect.fromLTWH(15.0, 454.0, 345.5, 158.0),
            size: Size(375.0, 812.0),
            pinLeft: true,
            pinRight: true,
            pinTop: true,
            fixedHeight: true,
            child:
                // Adobe XD layer: 'GearItem' (component)
                GearItem(
              description:
                  'Too heavy? Too small? Too much? Relax. This tent is Just Right.',
              label: 'Tent\n',
              icon: const AssetImage('assets/images/tent.png'),
            ),
          ),
          Pinned.fromSize(
            bounds: Rect.fromLTWH(13.0, 276.0, 345.5, 158.0),
            size: Size(375.0, 812.0),
            pinLeft: true,
            pinRight: true,
            pinTop: true,
            fixedHeight: true,
            child:
                // Adobe XD layer: 'GearItem' (component)
                GearItem(
              description:
                  'Warm, dry, cool, and comfortable: Our favorite all-weather outer shell.',
              label: 'Outerwear',
              icon: const AssetImage('assets/images/jacket.png'),
            ),
          ),
          Pinned.fromSize(
            bounds: Rect.fromLTWH(0.0, 0.0, 375.0, 256.0),
            size: Size(375.0, 812.0),
            pinLeft: true,
            pinRight: true,
            pinTop: true,
            fixedHeight: true,
            child:
                // Adobe XD layer: 'header' (group)
                Stack(
              children: <Widget>[
                Pinned.fromSize(
                  bounds: Rect.fromLTWH(0.0, 0.0, 375.0, 256.0),
                  size: Size(375.0, 256.0),
                  pinLeft: true,
                  pinRight: true,
                  pinTop: true,
                  pinBottom: true,
                  child:
                      // Adobe XD layer: 'photo' (shape)
                      Container(
                    decoration: BoxDecoration(
                      image: DecorationImage(
                        image: const AssetImage('assets/images/camp.jpg'),
                        fit: BoxFit.cover,
                      ),
                      boxShadow: [
                        BoxShadow(
                          color: const Color(0x66000000),
                          offset: Offset(0, 3),
                          blurRadius: 8,
                        ),
                      ],
                    ),
                  ),
                ),
                Pinned.fromSize(
                  bounds: Rect.fromLTWH(0.0, 172.0, 375.0, 84.0),
                  size: Size(375.0, 256.0),
                  pinLeft: true,
                  pinRight: true,
                  pinBottom: true,
                  fixedHeight: true,
                  child:
                      // Adobe XD layer: 'rectangle' (shape)
                      ClipRect(
                    child: BackdropFilter(
                      filter: ui.ImageFilter.blur(sigmaX: 4.95, sigmaY: 4.95),
                      child: Container(
                        decoration: BoxDecoration(
                          gradient: LinearGradient(
                            begin: Alignment(0.0, -1.0),
                            end: Alignment(0.0, 1.0),
                            colors: [
                              const Color(0x00000000),
                              const Color(0x00254f6e),
                              const Color(0xff254f6e)
                            ],
                            stops: [0.0, 0.0, 1.0],
                          ),
                        ),
                      ),
                    ),
                  ),
                ),
                Pinned.fromSize(
                  bounds: Rect.fromLTWH(344.0, 33.0, 19.0, 27.0),
                  size: Size(375.0, 256.0),
                  pinRight: true,
                  pinTop: true,
                  fixedWidth: true,
                  fixedHeight: true,
                  child:
                      // Adobe XD layer: 'send icon' (shape)
                      SvgPicture.string(
                    _svg_6z8g0n,
                    allowDrawingOutsideViewBox: true,
                    fit: BoxFit.fill,
                  ),
                ),
                Pinned.fromSize(
                  bounds: Rect.fromLTWH(304.0, 38.0, 22.0, 22.0),
                  size: Size(375.0, 256.0),
                  pinRight: true,
                  pinTop: true,
                  fixedWidth: true,
                  fixedHeight: true,
                  child:
                      // Adobe XD layer: 'search icon' (shape)
                      SvgPicture.string(
                    _svg_d9sdjy,
                    allowDrawingOutsideViewBox: true,
                    fit: BoxFit.fill,
                  ),
                ),
                Pinned.fromSize(
                  bounds: Rect.fromLTWH(12.0, 38.0, 11.3, 19.0),
                  size: Size(375.0, 256.0),
                  pinLeft: true,
                  pinTop: true,
                  fixedWidth: true,
                  fixedHeight: true,
                  child:
                      // Adobe XD layer: 'back button' (shape)
                      PageLink(
                    links: [
                      PageLinkInfo(),
                    ],
                    child: SvgPicture.string(
                      _svg_munyoe,
                      allowDrawingOutsideViewBox: true,
                      fit: BoxFit.fill,
                    ),
                  ),
                ),
                Pinned.fromSize(
                  bounds: Rect.fromLTWH(11.5, 214.0, 352.0, 17.0),
                  size: Size(375.0, 256.0),
                  pinLeft: true,
                  pinRight: true,
                  pinBottom: true,
                  fixedHeight: true,
                  child:
                      // Adobe XD layer: 'Your own personal s…' (text)
                      Text(
                    'Your own personal sherpa.',
                    style: TextStyle(
                      fontFamily: 'Georgia',
                      fontSize: 15,
                      color: const Color(0xffffffff),
                      fontStyle: FontStyle.italic,
                    ),
                    textAlign: TextAlign.center,
                  ),
                ),
                Pinned.fromSize(
                  bounds: Rect.fromLTWH(11.5, 197.0, 352.0, 16.0),
                  size: Size(375.0, 256.0),
                  pinLeft: true,
                  pinRight: true,
                  pinBottom: true,
                  fixedHeight: true,
                  child:
                      // Adobe XD layer: 'Gear Guide' (text)
                      Text(
                    'GEAR GUIDE',
                    style: TextStyle(
                      fontFamily: 'Helvetica',
                      fontSize: 16,
                      color: const Color(0xfffbf7ff),
                      letterSpacing: 0.64,
                      fontWeight: FontWeight.w700,
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

const String _svg_6z8g0n =
    '<svg viewBox="344.0 33.0 19.0 27.0" ><path transform="translate(86.0, -10.0)" d="M 259.0002136230469 70.00019836425781 C 258.39990234375 70.00019836425781 258.0003051757812 69.59970092773438 258.0003051757812 69.00030517578125 L 258.0003051757812 52.00020217895508 C 258.0003051757812 51.39990234375 258.39990234375 51.00030136108398 259.0002136230469 51.00030136108398 L 262.5003051757812 51.00030136108398 C 263.0997009277344 51.00030136108398 263.5002136230469 51.39990234375 263.5002136230469 52.00020217895508 C 263.5002136230469 52.59960174560547 263.0997009277344 53.00010299682617 262.5003051757812 53.00010299682617 L 260.0000915527344 53.00010299682617 L 260.0000915527344 68.00040435791016 L 275.0003967285156 68.00040435791016 L 275.0003967285156 53.00010299682617 L 272.5002136230469 53.00010299682617 C 271.89990234375 53.00010299682617 271.5003051757812 52.59960174560547 271.5003051757812 52.00020217895508 C 271.5003051757812 51.39990234375 271.89990234375 51.00030136108398 272.5002136230469 51.00030136108398 L 276.0003051757812 51.00030136108398 C 276.5997009277344 51.00030136108398 277.0002136230469 51.39990234375 277.0002136230469 52.00020217895508 L 277.0002136230469 69.00030517578125 C 277.0002136230469 69.59970092773438 276.5997009277344 70.00019836425781 276.0003051757812 70.00019836425781 L 259.0002136230469 70.00019836425781 Z M 266.4999084472656 58.79970169067383 L 266.4999084472656 46.4004020690918 L 264.2004089355469 48.69990158081055 C 263.7998962402344 49.10040283203125 263.1996154785156 49.10040283203125 262.8000183105469 48.69990158081055 C 262.4004211425781 48.30030059814453 262.4004211425781 47.70000076293945 262.8000183105469 47.30039978027344 L 266.7996215820312 43.29990005493164 C 267.2001037597656 42.90030288696289 267.8004150390625 42.90030288696289 268.2000122070312 43.29990005493164 L 272.1996154785156 47.30039978027344 C 272.60009765625 47.70000076293945 272.60009765625 48.30030059814453 272.1996154785156 48.69990158081055 C 271.9998168945312 48.89970016479492 271.8000183105469 48.99959945678711 271.5003051757812 48.99959945678711 C 271.19970703125 48.99959945678711 270.9999084472656 48.89970016479492 270.8001098632812 48.69990158081055 L 268.4996948242188 46.4004020690918 L 268.4996948242188 58.79970169067383 C 268.4996948242188 59.40000152587891 268.10009765625 59.79960250854492 267.4998168945312 59.79960250854492 C 266.9004211425781 59.79960250854492 266.4999084472656 59.40000152587891 266.4999084472656 58.79970169067383 Z" fill="#ffffff" stroke="none" stroke-width="1" stroke-miterlimit="4" stroke-linecap="butt" /></svg>';
const String _svg_d9sdjy =
    '<svg viewBox="304.0 38.0 22.0 22.0" ><path transform="translate(114.0, -699.0)" d="M 204.3553771972656 739.3668212890625 C 207.0109252929688 739.9168701171875 209.1165161132812 742.00732421875 209.6743621826172 744.64794921875 C 210.7821807861328 749.59912109375 206.6809692382812 753.89013671875 201.809814453125 753.22216796875 C 198.5964202880859 752.8919677734375 196.04296875 750.25927734375 195.60302734375 747.1785888671875 C 195.0451812744141 742.3375244140625 199.3663787841797 738.2667236328125 204.3553771972656 739.3668212890625 L 204.3553771972656 739.3668212890625 Z M 211.9999542236328 746.7384033203125 C 211.9999542236328 745.96826171875 211.9999542236328 745.1981201171875 211.7799682617188 744.4281005859375 C 211.1121368408203 740.797119140625 208.1187591552734 737.9364013671875 204.4653778076172 737.166259765625 C 198.5964202880859 736.0660400390625 193.3874206542969 740.5770263671875 193.3874206542969 746.2984619140625 C 193.3874206542969 748.3887939453125 194.0473785400391 750.25927734375 195.2730102539062 751.799560546875 C 193.3874206542969 753.662109375 190.7239837646484 756.1927490234375 190.5039825439453 756.4127197265625 C 190.1739959716797 756.8529052734375 189.6161804199219 757.8431396484375 190.3939971923828 758.61328125 C 191.1717987060547 759.3834228515625 192.1696166992188 758.8331298828125 192.6095886230469 758.5032958984375 L 197.3707733154297 753.772216796875 C 198.9263763427734 754.8724365234375 200.8119812011719 755.532470703125 202.9176025390625 755.532470703125 C 207.6787719726562 755.532470703125 211.7799682617188 751.6895751953125 211.9999542236328 746.7384033203125 L 211.9999542236328 746.7384033203125 Z" fill="#ffffff" stroke="#000000" stroke-width="1" stroke-opacity="0.0" stroke-miterlimit="4" stroke-linecap="butt" /></svg>';
const String _svg_munyoe =
    '<svg viewBox="12.0 38.0 11.3 19.0" ><path transform="matrix(0.0, 1.0, -1.0, 0.0, 79.98, -41.0)" d="M 97.46916961669922 59.76226043701172 C 98.18206787109375 59.06143569946289 98.18206787109375 57.91353225708008 97.46916961669922 57.20061874389648 C 96.75624084472656 56.49979782104492 95.60836029052734 56.49979782104492 94.90752410888672 57.20061874389648 L 88.50341796875 63.60472106933594 L 82.08724975585938 57.20061874389648 C 81.38643646240234 56.49979782104492 80.238525390625 56.49979782104492 79.52561187744141 57.20061874389648 C 78.82479095458984 57.91353225708008 78.82479095458984 59.06143569946289 79.52561187744141 59.76226043701172 L 87.22261047363281 67.45925903320312 C 87.92342376708984 68.16007995605469 89.07134246826172 68.16007995605469 89.78425598144531 67.45925903320312 L 97.46916961669922 59.76226043701172 Z" fill="#ffffff" stroke="#000000" stroke-width="1" stroke-opacity="0.0" stroke-miterlimit="4" stroke-linecap="butt" /></svg>';

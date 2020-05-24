import 'package:flutter/material.dart';
import 'dart:ui' as ui;
import 'package:flutter_svg/flutter_svg.dart';
import 'package:adobe_xd/page_link.dart';
import './GearItem.dart';

class Gear extends StatelessWidget {
  Gear({
    Key key,
  }) : super(key: key);
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: const Color(0xffffffff),
      body: Stack(
        children: <Widget>[
          // Adobe XD layer: 'photo' (shape)
          Container(
            width: 375.0,
            height: 256.0,
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
          Transform.translate(
            offset: Offset(0.0, 172.0),
            child:
                // Adobe XD layer: 'rectangle' (shape)
                ClipRect(
              child: BackdropFilter(
                filter: ui.ImageFilter.blur(sigmaX: 4.95, sigmaY: 4.95),
                child: Container(
                  width: 375.0,
                  height: 84.0,
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
          Transform.translate(
            offset: Offset(304.0, 33.0),
            child:
                // Adobe XD layer: 'send icon' (group)
                SvgPicture.string(
              _svg_w1wqfo,
              allowDrawingOutsideViewBox: true,
            ),
          ),
          Transform.translate(
            offset: Offset(12.0, 38.0),
            child: PageLink(
              links: [
                PageLinkInfo(),
              ],
              child:
                  // Adobe XD layer: 'back button' (shape)
                  SvgPicture.string(
                _svg_munyoe,
                allowDrawingOutsideViewBox: true,
              ),
            ),
          ),
          Transform.translate(
            offset: Offset(78.5, 214.0),
            child:
                // Adobe XD layer: 'Your own personal s…' (text)
                SizedBox(
              width: 218.0,
              child: Text(
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
          ),
          Transform.translate(
            offset: Offset(112.5, 195.0),
            child:
                // Adobe XD layer: 'Gear Guide' (text)
                SizedBox(
              width: 150.0,
              child: Text(
                'GEAR GUIDE',
                style: TextStyle(
                  fontFamily: 'Helvetica',
                  fontSize: 18,
                  color: const Color(0xffffffff),
                  letterSpacing: 1.44,
                  fontWeight: FontWeight.w700,
                ),
                textAlign: TextAlign.center,
              ),
            ),
          ),
          Transform.translate(
            offset: Offset(13.0, 273.0),
            child:
                // Adobe XD layer: 'GearItem' (component)
                GearItem(
              description:
                  'Warm, dry, cool, and comfortable: Our favorite all-weather outer shell.',
              label: 'Outerwear',
              icon: const AssetImage('assets/images/jacket.png'),
            ),
          ),
          Transform.translate(
            offset: Offset(13.0, 435.0),
            child:
                // Adobe XD layer: 'GearItem' (component)
                GearItem(
              description:
                  'Too heavy? Too small? Too much? Relax. This tent is Just Right.',
              label: 'Tent\n',
              icon: const AssetImage('assets/images/tent.png'),
            ),
          ),
          Transform.translate(
            offset: Offset(13.0, 600.0),
            child:
                // Adobe XD layer: 'GearItem' (component)
                GearItem(
              description:
                  'After 6 months of cooking on camp stoves, this was the last stove standing.',
              label: 'Supplies',
              icon: const AssetImage('assets/images/lantern.png'),
            ),
          ),
        ],
      ),
    );
  }
}

const String _svg_w1wqfo =
    '<svg viewBox="304.0 33.0 59.0 27.0" ><g transform="translate(344.0, 33.0)"><path transform="translate(0.0, -0.4)" d="M 18 8.399999618530273 L 14.5 8.399999618530273 C 13.89999961853027 8.399999618530273 13.5 8.799999237060547 13.5 9.399999618530273 C 13.5 10 13.89999961853027 10.39999961853027 14.5 10.39999961853027 L 17 10.39999961853027 L 17 25.39999961853027 L 2 25.39999961853027 L 2 10.39999961853027 L 4.5 10.39999961853027 C 5.099999904632568 10.39999961853027 5.5 10 5.5 9.399999618530273 C 5.5 8.799999237060547 5.099999904632568 8.399999618530273 4.5 8.399999618530273 L 1 8.399999618530273 C 0.3999999761581421 8.399999618530273 0 8.799999237060547 0 9.399999618530273 L 0 26.39999961853027 C 0 27 0.4000000059604645 27.39999961853027 1 27.39999961853027 L 18 27.39999961853027 C 18.60000038146973 27.39999961853027 19 27 19 26.39999961853027 L 19 9.399999618530273 C 19 8.800000190734863 18.60000038146973 8.399999618530273 18 8.399999618530273 Z" fill="#ffffff" stroke="none" stroke-width="1" stroke-miterlimit="4" stroke-linecap="butt" /><path  d="M 6.199999809265137 5.699999809265137 L 8.5 3.399999856948853 L 8.5 15.79999923706055 C 8.5 16.39999961853027 8.899999618530273 16.79999923706055 9.5 16.79999923706055 C 10.10000038146973 16.79999923706055 10.5 16.39999961853027 10.5 15.79999923706055 L 10.5 3.400000095367432 L 12.80000019073486 5.699999809265137 C 13 5.900000095367432 13.19999980926514 6 13.5 6 C 13.80000019073486 6 14 5.900000095367432 14.19999980926514 5.699999809265137 C 14.59999942779541 5.299999713897705 14.59999942779541 4.699999809265137 14.19999980926514 4.299999713897705 L 10.19999980926514 0.2999997138977051 C 9.800000190734863 -0.1000002920627594 9.199999809265137 -0.1000002920627594 8.800000190734863 0.2999997138977051 L 4.800000190734863 4.299999713897705 C 4.400000095367432 4.699999809265137 4.400000095367432 5.299999713897705 4.800000190734863 5.699999809265137 C 5.200000286102295 6.099999904632568 5.800000190734863 6.099999904632568 6.199999809265137 5.699999809265137 Z" fill="#ffffff" stroke="none" stroke-width="1" stroke-miterlimit="4" stroke-linecap="butt" /></g><path transform="translate(114.0, -699.0)" d="M 204.3553771972656 739.3668212890625 C 207.0109252929688 739.9168701171875 209.1165161132812 742.00732421875 209.6743621826172 744.64794921875 C 210.7821807861328 749.59912109375 206.6809692382812 753.89013671875 201.809814453125 753.22216796875 C 198.5964202880859 752.8919677734375 196.04296875 750.25927734375 195.60302734375 747.1785888671875 C 195.0451812744141 742.3375244140625 199.3663787841797 738.2667236328125 204.3553771972656 739.3668212890625 L 204.3553771972656 739.3668212890625 Z M 211.9999542236328 746.7384033203125 C 211.9999542236328 745.96826171875 211.9999542236328 745.1981201171875 211.7799682617188 744.4281005859375 C 211.1121368408203 740.797119140625 208.1187591552734 737.9364013671875 204.4653778076172 737.166259765625 C 198.5964202880859 736.0660400390625 193.3874206542969 740.5770263671875 193.3874206542969 746.2984619140625 C 193.3874206542969 748.3887939453125 194.0473785400391 750.25927734375 195.2730102539062 751.799560546875 C 193.3874206542969 753.662109375 190.7239837646484 756.1927490234375 190.5039825439453 756.4127197265625 C 190.1739959716797 756.8529052734375 189.6161804199219 757.8431396484375 190.3939971923828 758.61328125 C 191.1717987060547 759.3834228515625 192.1696166992188 758.8331298828125 192.6095886230469 758.5032958984375 L 197.3707733154297 753.772216796875 C 198.9263763427734 754.8724365234375 200.8119812011719 755.532470703125 202.9176025390625 755.532470703125 C 207.6787719726562 755.532470703125 211.7799682617188 751.6895751953125 211.9999542236328 746.7384033203125 L 211.9999542236328 746.7384033203125 Z" fill="#ffffff" stroke="#000000" stroke-width="1" stroke-opacity="0.0" stroke-miterlimit="4" stroke-linecap="butt" /></svg>';
const String _svg_munyoe =
    '<svg viewBox="12.0 38.0 11.3 19.0" ><path transform="matrix(0.0, 1.0, -1.0, 0.0, 79.98, -41.0)" d="M 97.46916961669922 59.76226043701172 C 98.18206787109375 59.06143569946289 98.18206787109375 57.91353225708008 97.46916961669922 57.20061874389648 C 96.75624084472656 56.49979782104492 95.60836029052734 56.49979782104492 94.90752410888672 57.20061874389648 L 88.50341796875 63.60472106933594 L 82.08724975585938 57.20061874389648 C 81.38643646240234 56.49979782104492 80.238525390625 56.49979782104492 79.52561187744141 57.20061874389648 C 78.82479095458984 57.91353225708008 78.82479095458984 59.06143569946289 79.52561187744141 59.76226043701172 L 87.22261047363281 67.45925903320312 C 87.92342376708984 68.16007995605469 89.07134246826172 68.16007995605469 89.78425598144531 67.45925903320312 L 97.46916961669922 59.76226043701172 Z" fill="#ffffff" stroke="#000000" stroke-width="1" stroke-opacity="0.0" stroke-miterlimit="4" stroke-linecap="butt" /></svg>';

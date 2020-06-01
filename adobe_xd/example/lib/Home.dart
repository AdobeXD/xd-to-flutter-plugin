import 'package:flutter/material.dart';
import 'package:flutter_svg/flutter_svg.dart';
import 'package:adobe_xd/specific_rect_clip.dart';
import 'package:adobe_xd/page_link.dart';
import './Gear.dart';

class Home extends StatelessWidget {
  Home({
    Key key,
  }) : super(key: key);
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: const Color(0xff254f6e),
      body: Stack(
        children: <Widget>[
          Transform.translate(
            offset: Offset(144.0, 168.5),
            child:
                // Adobe XD layer: 'blue divider line' (shape)
                SvgPicture.string(
              _svg_dzwujb,
              allowDrawingOutsideViewBox: true,
            ),
          ),
          Transform.translate(
            offset: Offset(24.0, 83.0),
            child:
                // Adobe XD layer: 'Welcome to Campvibe…' (text)
                SizedBox(
              width: 327.0,
              height: 74.0,
              child: Text(
                'Welcome to Campvibes!',
                style: TextStyle(
                  fontFamily: 'Helvetica',
                  fontSize: 30,
                  color: const Color(0xffffffff),
                  fontWeight: FontWeight.w700,
                ),
                textAlign: TextAlign.center,
              ),
            ),
          ),
          Transform.translate(
            offset: Offset(13.5, 287.0),
            child:
                // Adobe XD layer: 'white rectangle' (shape)
                Container(
              width: 348.0,
              height: 190.0,
              decoration: BoxDecoration(
                color: const Color(0xffffffff),
              ),
            ),
          ),
          Transform.translate(
            offset: Offset(46.5, 417.5),
            child:
                // Adobe XD layer: 'days, miles, camps,…' (none)
                SpecificRectClip(
              rect: Rect.fromLTWH(0, 0, 303, 48),
              child: UnconstrainedBox(
                alignment: Alignment.topLeft,
                child: Container(
                  width: 315,
                  height: 48,
                  child: GridView.count(
                    primary: false,
                    padding: EdgeInsets.all(0),
                    mainAxisSpacing: 20,
                    crossAxisSpacing: 13,
                    crossAxisCount: 4,
                    childAspectRatio: 1.4375,
                    children: [
                      {
                        'value': '10',
                        'label': 'Days',
                      },
                      {
                        'value': '160',
                        'label': 'Miles',
                      },
                      {
                        'value': '5',
                        'label': 'Camps',
                      },
                      {
                        'value': '2',
                        'label': 'Bears',
                      },
                    ].map((map) {
                      final value = map['value'];
                      final label = map['label'];
                      return Transform.translate(
                        offset: Offset(-45.0, -439.5),
                        child:
                            // Adobe XD layer: 'group' (group)
                            Stack(
                          children: <Widget>[
                            Transform.translate(
                              offset: Offset(36.0, 448.0),
                              child:
                                  // Adobe XD layer: 'numbers' (text)
                                  SizedBox(
                                width: 47.0,
                                height: 20.0,
                                child: Text(
                                  value,
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
                              offset: Offset(36.0, 473.0),
                              child:
                                  // Adobe XD layer: 'text' (text)
                                  SizedBox(
                                width: 47.0,
                                height: 11.0,
                                child: Text(
                                  label,
                                  style: TextStyle(
                                    fontFamily: 'Helvetica',
                                    fontSize: 11,
                                    color: const Color(0xffa2a2a2),
                                    letterSpacing: 0.22,
                                  ),
                                  textAlign: TextAlign.center,
                                ),
                              ),
                            ),
                            Transform.translate(
                              offset: Offset(102.5, 440.0),
                              child: Container(
                                width: 2.0,
                                height: 48.0,
                                decoration: BoxDecoration(
                                  color: const Color(0xffececec),
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
            ),
          ),
          Transform.translate(
            offset: Offset(147.5, 325.0),
            child:
                // Adobe XD layer: 'gray circle' (shape)
                Container(
              width: 80.0,
              height: 80.0,
              decoration: BoxDecoration(
                borderRadius: BorderRadius.all(Radius.elliptical(40.0, 40.0)),
                color: const Color(0xffd5d5d5),
              ),
            ),
          ),
          Transform.translate(
            offset: Offset(319.0, 302.5),
            child:
                // Adobe XD layer: 'compass' (group)
                SvgPicture.string(
              _svg_iykaj6,
              allowDrawingOutsideViewBox: true,
            ),
          ),
          Transform.translate(
            offset: Offset(29.5, 302.0),
            child:
                // Adobe XD layer: 'Your latest trip' (text)
                Text(
              'YOUR LATEST TRIP',
              style: TextStyle(
                fontFamily: 'Helvetica',
                fontSize: 11,
                color: const Color(0xff333333),
                letterSpacing: 1.1,
                fontWeight: FontWeight.w700,
              ),
              textAlign: TextAlign.left,
            ),
          ),
          Transform.translate(
            offset: Offset(13.5, 224.0),
            child: PageLink(
              links: [
                PageLinkInfo(
                  transition: LinkTransition.SlideLeft,
                  ease: Curves.easeOut,
                  duration: 0.3,
                  pageBuilder: () => Gear(),
                ),
              ],
              child:
                  // Adobe XD layer: 'rectangle' (shape)
                  Container(
                width: 348.0,
                height: 48.0,
                decoration: BoxDecoration(
                  color: const Color(0xff00a9de),
                  border:
                      Border.all(width: 1.0, color: const Color(0xff00a9de)),
                  boxShadow: [
                    BoxShadow(
                      color: const Color(0xa8000000),
                      offset: Offset(1, 3),
                      blurRadius: 6,
                    ),
                  ],
                ),
              ),
            ),
          ),
          Transform.translate(
            offset: Offset(123.5, 241.5),
            child: PageLink(
              links: [
                PageLinkInfo(
                  transition: LinkTransition.SlideLeft,
                  ease: Curves.easeOut,
                  duration: 0.3,
                  pageBuilder: () => Gear(),
                ),
              ],
              child:
                  // Adobe XD layer: 'Our Blog' (text)
                  SizedBox(
                width: 128.0,
                child: Text(
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
            ),
          ),
          Transform.translate(
            offset: Offset(0.5, -28.0),
            child:
                // Adobe XD layer: 'map' (group)
                Stack(
              children: <Widget>[
                Transform.translate(
                  offset: Offset(13.0, 525.0),
                  child:
                      // Adobe XD layer: 'rectangle' (shape)
                      Container(
                    width: 348.0,
                    height: 115.0,
                    decoration: BoxDecoration(
                      color: const Color(0xff00a9de),
                    ),
                  ),
                ),
                Transform.translate(
                  offset: Offset(13.0, 526.0),
                  child:
                      // Adobe XD layer: 'rectangle trail' (shape)
                      Container(
                    width: 294.0,
                    height: 115.0,
                    decoration: BoxDecoration(
                      image: DecorationImage(
                        image: const AssetImage('assets/images/trail.png'),
                        fit: BoxFit.cover,
                        colorFilter: new ColorFilter.mode(
                            Colors.black.withOpacity(0.59), BlendMode.dstIn),
                      ),
                    ),
                  ),
                ),
                Transform.translate(
                  offset: Offset(13.0, 525.0),
                  child:
                      // Adobe XD layer: 'rectangle' (shape)
                      SvgPicture.string(
                    _svg_5kapjt,
                    allowDrawingOutsideViewBox: true,
                  ),
                ),
                Transform.translate(
                  offset: Offset(206.0, 590.0),
                  child:
                      // Adobe XD layer: 'White Throne' (text)
                      Text(
                    'White Throne',
                    style: TextStyle(
                      fontFamily: 'Helvetica',
                      fontSize: 6,
                      color: const Color(0xffffffff),
                      fontWeight: FontWeight.w300,
                    ),
                    textAlign: TextAlign.left,
                  ),
                ),
                Transform.translate(
                  offset: Offset(211.5, 582.0),
                  child:
                      // Adobe XD layer: 'The Great' (text)
                      Text(
                    'The Great',
                    style: TextStyle(
                      fontFamily: 'Helvetica',
                      fontSize: 6,
                      color: const Color(0xffffffff),
                      fontWeight: FontWeight.w300,
                    ),
                    textAlign: TextAlign.left,
                  ),
                ),
                Transform.translate(
                  offset: Offset(62.0, 560.0),
                  child:
                      // Adobe XD layer: 'mountains 1' (shape)
                      SvgPicture.string(
                    _svg_5klruu,
                    allowDrawingOutsideViewBox: true,
                  ),
                ),
                Transform.translate(
                  offset: Offset(48.0, 544.0),
                  child:
                      // Adobe XD layer: 'Mt Majestic' (text)
                      Text(
                    'Mt Majestic',
                    style: TextStyle(
                      fontFamily: 'Helvetica',
                      fontSize: 5,
                      color: const Color(0xffffffff),
                      fontWeight: FontWeight.w300,
                    ),
                    textAlign: TextAlign.left,
                  ),
                ),
              ],
            ),
          ),
          Transform.translate(
            offset: Offset(-3.0, 395.0),
            child:
                // Adobe XD layer: 'Adventures Card' (group)
                Stack(
              children: <Widget>[
                Transform.translate(
                  offset: Offset(16.5, 277.0),
                  child:
                      // Adobe XD layer: 'rectangle background' (shape)
                      Container(
                    width: 348.0,
                    height: 120.0,
                    decoration: BoxDecoration(
                      color: const Color(0x80353535),
                      boxShadow: [
                        BoxShadow(
                          color: const Color(0x13000000),
                          offset: Offset(1, 1),
                          blurRadius: 1,
                        ),
                      ],
                    ),
                  ),
                ),
                Transform.translate(
                  offset: Offset(188.5, 379.0),
                  child:
                      // Adobe XD layer: '2 hours ago' (text)
                      Text(
                    '2 hours ago',
                    style: TextStyle(
                      fontFamily: 'Helvetica',
                      fontSize: 11,
                      color: const Color(0xff00a9de),
                      letterSpacing: 0.11,
                    ),
                    textAlign: TextAlign.left,
                  ),
                ),
                Transform.translate(
                  offset: Offset(188.5, 315.0),
                  child:
                      // Adobe XD layer: 'Finding Beauty' (text)
                      Text(
                    'Finding Beauty in\nthe Badlands',
                    style: TextStyle(
                      fontFamily: 'Helvetica',
                      fontSize: 15,
                      color: const Color(0xffffffff),
                      letterSpacing: 0.15,
                    ),
                    textAlign: TextAlign.left,
                  ),
                ),
                Transform.translate(
                  offset: Offset(187.5, 291.0),
                  child:
                      // Adobe XD layer: 'Adventures' (text)
                      Text(
                    'Adventures',
                    style: TextStyle(
                      fontFamily: 'Georgia',
                      fontSize: 12,
                      color: const Color(0x80ffffff),
                      fontStyle: FontStyle.italic,
                    ),
                    textAlign: TextAlign.left,
                  ),
                ),
                Transform.translate(
                  offset: Offset(16.5, 277.0),
                  child:
                      // Adobe XD layer: 'photo Badlands' (shape)
                      Container(
                    width: 158.0,
                    height: 120.0,
                    decoration: BoxDecoration(
                      image: DecorationImage(
                        image: const AssetImage('assets/images/badlands.jpg'),
                        fit: BoxFit.cover,
                      ),
                    ),
                  ),
                ),
              ],
            ),
          ),
          Transform.translate(
            offset: Offset(-3.5, 635.5),
            child:
                // Adobe XD layer: 'Latest Adventures' (text)
                SizedBox(
              width: 222.0,
              child: Text(
                'LATEST ADVENTURES',
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
          ),
          Transform.translate(
            offset: Offset(14.0, 38.0),
            child:
                // Adobe XD layer: 'search icon' (shape)
                SvgPicture.string(
              _svg_bjl606,
              allowDrawingOutsideViewBox: true,
            ),
          ),
        ],
      ),
    );
  }
}

const String _svg_dzwujb =
    '<svg viewBox="144.0 168.5 88.0 1.0" ><path transform="translate(144.0, 168.5)" d="M 0 0 L 88 0" fill="none" stroke="#00a9de" stroke-width="2" stroke-miterlimit="4" stroke-linecap="butt" /></svg>';
const String _svg_iykaj6 =
    '<svg viewBox="319.0 302.5 22.0 22.0" ><g transform="translate(318.5, 302.0)"><path transform="translate(0.5, 0.5)" d="M 11 0 C 17.07513236999512 0 22 4.924868106842041 22 11 C 22 17.07513236999512 17.07513236999512 22 11 22 C 4.924868106842041 22 0 17.07513236999512 0 11 C 0 4.924868106842041 4.924868106842041 0 11 0 Z" fill="none" stroke="#808080" stroke-width="3" stroke-miterlimit="4" stroke-linecap="butt" /><path  d="M 7.599999904632568 7.099999904632568 C 7.299999713897705 7.099999904632568 7.099999904632568 7.299999713897705 7.199999809265137 7.5 C 7.699999809265137 9.800000190734863 8.300000190734863 13.10000038146973 9.600000381469727 14.39999961853027 C 11 15.79999923706055 13.20000076293945 15.79999923706055 14.5 14.39999961853027 C 15.79999923706055 13 15.89999961853027 10.79999923706055 14.5 9.5 C 13.19999980926514 8.300000190734863 9.899999618530273 7.599999904632568 7.599999904632568 7.099999904632568 Z M 13.10000038146973 13.10000038146973 C 12.5 13.70000076293945 11.60000038146973 13.70000076293945 11 13.10000038146973 C 10.39999961853027 12.5 10.39999961853027 11.60000038146973 11 11 C 11.60000038146973 10.39999961853027 12.5 10.39999961853027 13.10000038146973 11 C 13.60000038146973 11.5 13.60000038146973 12.5 13.10000038146973 13.10000038146973 Z" fill="#808080" stroke="none" stroke-width="1" stroke-miterlimit="4" stroke-linecap="butt" /></g></svg>';
const String _svg_5kapjt =
    '<svg viewBox="13.0 525.0 348.0 115.0" ><path transform="translate(13.0, 525.0)" d="M 0 0 L 348 0 L 348 114.9999694824219 L 0 114.9999694824219 L 0 0 Z" fill="#000000" fill-opacity="0.1" stroke="none" stroke-width="1" stroke-opacity="0.1" stroke-miterlimit="4" stroke-linecap="butt" /><path transform="translate(217.0, 601.0)" d="M 9.110000610351562 6.539999961853027 C 9.460000038146973 5.860000133514404 10.01000022888184 5.809999942779541 10.39000034332275 6.46999979019165 C 11.42000007629395 8.289999008178711 13.05000019073486 11.88999652862549 13.83000087738037 13.39999580383301 C 14.19999885559082 14.11999797821045 14.65999984741211 14.13999843597412 15.10000038146973 13.37999629974365 C 15.76000118255615 12.26999759674072 17.21999931335449 9.95999813079834 17.95000267028809 8.709997177124023 C 18.32999992370605 8.049999237060547 19.01000213623047 8.060000419616699 19.42000007629395 8.69999885559082 C 20.67000007629395 10.65999603271484 23.03000259399414 15.07999610900879 23.8799991607666 16.67999839782715 C 24.2400016784668 17.35999488830566 23.7600040435791 17.99999618530273 23.05000305175781 17.99999618530273 L 4.989999294281006 17.99999618530273 C 4.28000020980835 17.99999618530273 3.839999675750732 17.3899974822998 4.059999942779541 16.63999557495117 C 4.59999942779541 14.77999591827393 7.780000686645508 9.069995880126953 9.110000610351562 6.539999961853027" fill="#ffffff" stroke="none" stroke-width="1" stroke-miterlimit="4" stroke-linecap="butt" /></svg>';
const String _svg_5klruu =
    '<svg viewBox="62.0 560.0 20.0 12.0" ><path transform="translate(58.0, 554.0)" d="M 9.110000610351562 6.539999961853027 C 9.460000038146973 5.860000133514404 10.01000022888184 5.809999942779541 10.39000034332275 6.46999979019165 C 11.42000007629395 8.289999008178711 13.05000019073486 11.88999652862549 13.83000087738037 13.39999580383301 C 14.19999885559082 14.11999797821045 14.65999984741211 14.13999843597412 15.10000038146973 13.37999629974365 C 15.76000118255615 12.26999759674072 17.21999931335449 9.95999813079834 17.95000267028809 8.709997177124023 C 18.32999992370605 8.049999237060547 19.01000213623047 8.060000419616699 19.42000007629395 8.69999885559082 C 20.67000007629395 10.65999603271484 23.03000259399414 15.07999610900879 23.8799991607666 16.67999839782715 C 24.2400016784668 17.35999488830566 23.7600040435791 17.99999618530273 23.05000305175781 17.99999618530273 L 4.989999294281006 17.99999618530273 C 4.28000020980835 17.99999618530273 3.839999675750732 17.3899974822998 4.059999942779541 16.63999557495117 C 4.59999942779541 14.77999591827393 7.780000686645508 9.069995880126953 9.110000610351562 6.539999961853027" fill="#ffffff" stroke="none" stroke-width="1" stroke-miterlimit="4" stroke-linecap="butt" /></svg>';
const String _svg_bjl606 =
    '<svg viewBox="14.0 38.0 348.0 22.0" ><path transform="translate(150.0, -699.0)" d="M 204.3553771972656 739.3668212890625 C 207.0109252929688 739.9168701171875 209.1165161132812 742.00732421875 209.6743621826172 744.64794921875 C 210.7821807861328 749.59912109375 206.6809692382812 753.89013671875 201.809814453125 753.22216796875 C 198.5964202880859 752.8919677734375 196.04296875 750.25927734375 195.60302734375 747.1785888671875 C 195.0451812744141 742.3375244140625 199.3663787841797 738.2667236328125 204.3553771972656 739.3668212890625 L 204.3553771972656 739.3668212890625 Z M 211.9999542236328 746.7384033203125 C 211.9999542236328 745.96826171875 211.9999542236328 745.1981201171875 211.7799682617188 744.4281005859375 C 211.1121368408203 740.797119140625 208.1187591552734 737.9364013671875 204.4653778076172 737.166259765625 C 198.5964202880859 736.0660400390625 193.3874206542969 740.5770263671875 193.3874206542969 746.2984619140625 C 193.3874206542969 748.3887939453125 194.0473785400391 750.25927734375 195.2730102539062 751.799560546875 C 193.3874206542969 753.662109375 190.7239837646484 756.1927490234375 190.5039825439453 756.4127197265625 C 190.1739959716797 756.8529052734375 189.6161804199219 757.8431396484375 190.3939971923828 758.61328125 C 191.1717987060547 759.3834228515625 192.1696166992188 758.8331298828125 192.6095886230469 758.5032958984375 L 197.3707733154297 753.772216796875 C 198.9263763427734 754.8724365234375 200.8119812011719 755.532470703125 202.9176025390625 755.532470703125 C 207.6787719726562 755.532470703125 211.7799682617188 751.6895751953125 211.9999542236328 746.7384033203125 L 211.9999542236328 746.7384033203125 Z" fill="#ffffff" stroke="#000000" stroke-width="1" stroke-opacity="0.0" stroke-miterlimit="4" stroke-linecap="butt" /><path transform="translate(14.1, 38.0)" d="M 13.89999961853027 0 C 13.20496368408203 0 12.80780029296875 0.4057970941066742 12.60921859741211 0.7101449370384216 L 3.474467992782593 17.95652198791504 L 1.488652467727661 17.95652198791504 C 0.5950354337692261 17.95652198791504 -0.1000000238418579 18.66666793823242 -0.1000000238418579 19.47826194763184 C -0.1000000238418579 20.28985595703125 0.5950353741645813 21 1.488652467727661 21 L 4.368085384368896 21 L 23.43191337585449 21 L 26.31134605407715 21 C 27.20496368408203 21 27.89999961853027 20.28985595703125 27.89999961853027 19.47826194763184 C 27.89999961853027 18.66666793823242 27.20496368408203 17.95652198791504 26.31134605407715 17.95652198791504 L 24.32553100585938 17.95652198791504 L 15.19077968597412 0.7101449370384216 C 14.99219799041748 0.4057970941066742 14.5950345993042 0 13.89999961853027 0 L 13.89999961853027 0 Z M 13.89999961853027 7.507246494293213 L 19.06311988830566 17.95652198791504 L 8.736879348754883 17.95652198791504 L 13.89999961853027 7.507246494293213 Z" fill="#ffffff" stroke="none" stroke-width="1" stroke-miterlimit="4" stroke-linecap="butt" /></svg>';

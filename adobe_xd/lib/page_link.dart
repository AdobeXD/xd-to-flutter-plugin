/*
Copyright 2020 Adobe
All Rights Reserved.

NOTICE: Adobe permits you to use, modify, and distribute this file in
accordance with the terms of the Adobe license agreement accompanying
it. If you have received this file from a source other than Adobe,
then your use, modification, or distribution of it requires the prior
written permission of Adobe. 
*/

import 'package:flutter/material.dart';

/// Enables Prototype tap interactions / navigation.
enum LinkTrigger {
  Tap,
  Drag,
}

enum LinkTransition {
  Fade,
  SlideLeft,
  SlideRight,
  SlideUp,
  SlideDown,
  PushUp,
  PushDown,
  PushLeft,
  PushRight
}

class PageLinkInfo {
  final Function? pageBuilder;
  final LinkTrigger trigger;
  final LinkTransition transition;
  final Curve ease;
  final double duration;

  PageLinkInfo(
      {this.pageBuilder,
      this.trigger = LinkTrigger.Tap,
      this.transition = LinkTransition.Fade,
      this.ease = Curves.easeOut,
      this.duration = 0});
}

class PageLink extends StatelessWidget {
  final List<PageLinkInfo>? links;
  final Widget? child;

  PageLink({Key? key, this.links, this.child}) : super(key: key);

  void _handlePageLinkTriggered(BuildContext context, PageLinkInfo? info) {
    if (info == null) return;
    // Go back?
    if (info.pageBuilder == null) {
      Navigator.pop(context);
      return;
    }
    // Go forward
    PageRoute route;
    switch (info.transition) {
      case LinkTransition.SlideUp:
        route = _RouteFactory.slide(info.pageBuilder, info.duration, info.ease, Offset(0, 1))
            as PageRoute<dynamic>;
        break;
      case LinkTransition.SlideDown:
        route = _RouteFactory.slide(info.pageBuilder, info.duration, info.ease, Offset(0, -1))
            as PageRoute<dynamic>;
        break;
      case LinkTransition.SlideLeft:
        route = _RouteFactory.slide(info.pageBuilder, info.duration, info.ease, Offset(1, 0))
            as PageRoute<dynamic>;
        break;
      case LinkTransition.SlideRight:
        route = _RouteFactory.slide(info.pageBuilder, info.duration, info.ease, Offset(-1, 0))
            as PageRoute<dynamic>;
        break;
      case LinkTransition.PushUp:
        route = _RouteFactory.push(info.pageBuilder, info.duration, info.ease, Offset(0, 1))
            as PageRoute<dynamic>;
        break;
      case LinkTransition.PushDown:
        route = _RouteFactory.push(info.pageBuilder, info.duration, info.ease, Offset(0, -1))
            as PageRoute<dynamic>;
        break;
      case LinkTransition.PushLeft:
        route = _RouteFactory.push(info.pageBuilder, info.duration, info.ease, Offset(1, 0))
            as PageRoute<dynamic>;
        break;
      case LinkTransition.PushRight:
        route = _RouteFactory.push(info.pageBuilder, info.duration, info.ease, Offset(-1, 0))
            as PageRoute<dynamic>;
        break;
      case LinkTransition.Fade:
      default:
        route =
            _RouteFactory.fade(info.pageBuilder, info.duration, info.ease) as PageRoute<dynamic>;
    }
    Navigator.of(context).push(route);
  }

  // If a tap link exists, fire it off.
  void _handleTap(BuildContext context) {
    PageLinkInfo? info = links?.firstWhere((i) => i.trigger == LinkTrigger.Tap);
    _handlePageLinkTriggered(context, info);
  }

  @override
  Widget build(BuildContext context) {
    if (links == null) print("[PageLink] Error: links[] is null");
    return GestureDetector(child: child, onTapUp: (d) => _handleTap(context));
  }
}

class _RouteFactory {
  static const double kDefaultDuration = .35;
  static const Curve kDefaultEase = Curves.easeOut;

  static Route fade(Function? childBuilder, [double duration = kDefaultDuration, Curve? ease]) {
    return PageRouteBuilder(
      transitionDuration: Duration(milliseconds: (duration * 1000).round()),
      pageBuilder: (context, animation, secondaryAnimation) => childBuilder!(),
      transitionsBuilder: (context, animation, secondaryAnimation, child) {
        return FadeTransition(
          opacity: Tween<double>(begin: 0, end: 1).animate(
            CurvedAnimation(parent: animation, curve: ease ?? Curves.linear),
          ),
          child: child,
        );
      },
    );
  }

  static Route push(Function? childBuilder,
      [double duration = kDefaultDuration,
      Curve? ease = kDefaultEase,
      Offset startOffset = const Offset(1, 0)]) {
    return slide(childBuilder, duration, ease, startOffset, true);
  }

  static Route slide(Function? childBuilder,
      [double duration = kDefaultDuration,
      Curve? ease = kDefaultEase,
      Offset startOffset = const Offset(1, 0),
      bool pushOldView = false]) {
    return PageRouteBuilder(
      transitionDuration: Duration(milliseconds: (duration * 1000).round()),
      pageBuilder: (context, animation, secondaryAnimation) => childBuilder!(),
      transitionsBuilder: (context, animation, secondaryAnimation, child) {
        // Create slide-in transition
        SlideTransition inTransition = SlideTransition(
          position: Tween<Offset>(begin: startOffset, end: Offset.zero)
              .animate(CurvedAnimation(parent: animation, curve: ease!)),
          child: child,
        );

        // Maybe create slideOut transition
        SlideTransition? outTransition;
        if (pushOldView) {
          // Flip the offset, so we end in the reverse position from where we started
          Offset endOffset = Offset(startOffset.dx * -1, startOffset.dy * -1);
          outTransition = SlideTransition(
            position: Tween<Offset>(begin: Offset.zero, end: endOffset)
                .animate(CurvedAnimation(parent: secondaryAnimation, curve: ease)),
            child: inTransition,
          );
        }
        // Return 'out' if we have one, fallback to just in
        return outTransition ?? inTransition;
      },
    );
  }
}

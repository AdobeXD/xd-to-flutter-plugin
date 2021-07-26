import 'home.dart';
import 'package:flutter/material.dart';

void main() {
  runApp(MyApp());
}

class MyApp extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'XD to Flutter example',
      theme: ThemeData(
        visualDensity: VisualDensity.adaptivePlatformDensity,
      ),


      // Home is an artboard exported from Adobe XD
      home: Home(
        // This assigns a handler to a "Tap Callback Name" that was defined
        // on the "Latest Adventures" card in the XD file:
        onTapAdventure: () => print("You tapped the Latest Adventure."),
      ), 

      
    );
  }
}

import 'dart:ui';

extension RGBA on Color {
  static Color rgba(int r, int g, int b, double opacity) {
    return Color.fromRGBO(r, g, b, opacity);
  }
}

abstract class MainColor {
  static final toolbarColor = RGBA.rgba(25, 26, 27, 1);
  static final backgroundColor = RGBA.rgba(15, 14, 15, 1);
  static final itemColor = RGBA.rgba(34, 34, 34, 1);

}
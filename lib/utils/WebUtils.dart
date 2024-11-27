import 'dart:html' as html;

class WebUtils {
  static bool get isMobile {
    final userAgent = html.window.navigator.userAgent.toLowerCase();
    return userAgent.contains('mobile') ||
        userAgent.contains('android') ||
        userAgent.contains('iphone');
  }
}
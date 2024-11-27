import 'package:flutter/foundation.dart' show kIsWeb;
import 'package:flutter/material.dart';
import 'dart:io' show Platform;

class PlatformUtils {
  // Platform detection
  static bool get isWeb => kIsWeb;

  static bool get isMobileDevice => !isWeb && (isAndroid || isIOS);

  static bool get isDesktopDevice => !isWeb && (isWindows || isLinux || isMacOS);

  static bool get isAndroid => !isWeb && Platform.isAndroid;

  static bool get isIOS => !isWeb && Platform.isIOS;

  static bool get isWindows => !isWeb && Platform.isWindows;

  static bool get isLinux => !isWeb && Platform.isLinux;

  static bool get isMacOS => !isWeb && Platform.isMacOS;

  // Responsive breakpoints
  static bool isMobileView(BuildContext context) {
    // For native mobile devices, always return true
    if (isMobileDevice) return true;

    // For web and desktop, check viewport width
    final width = MediaQuery.of(context).size.width;
    return width < 600;
  }

  static bool isTabletView(BuildContext context) {
    final width = MediaQuery.of(context).size.width;
    return width >= 600 && width < 900;
  }

  static bool isDesktopView(BuildContext context) {
    // For native desktop devices, always return true
    if (isDesktopDevice) return true;

    // For web and mobile, check viewport width
    final width = MediaQuery.of(context).size.width;
    return width >= 900;
  }

  // Helper methods for responsive design
  static double getResponsivePadding(BuildContext context) {
    if (isMobileView(context)) {
      return 16.0;
    } else if (isTabletView(context)) {
      return 24.0;
    } else {
      return 32.0;
    }
  }

  static double getResponsiveFontSize(BuildContext context, double baseSize) {
    if (isMobileView(context)) {
      return baseSize * 0.8;
    } else if (isTabletView(context)) {
      return baseSize * 0.9;
    } else {
      return baseSize;
    }
  }

  // Get design size based on current view
  static Size getDesignSize(BuildContext context) {
    if (isMobileView(context)) {
      return const Size(375, 812); // Mobile design size
    } else if (isTabletView(context)) {
      return const Size(768, 1024); // Tablet design size
    } else {
      return const Size(1980, 4400); // Desktop design size
    }
  }
}
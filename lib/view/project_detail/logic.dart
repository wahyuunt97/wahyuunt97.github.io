import 'dart:ui';

import 'package:get/get.dart';
import 'package:url_launcher/url_launcher.dart';

import 'state.dart';

class ProjectDetailLogic extends GetxController {
  final ProjectDetailState state = ProjectDetailState();
  final isHoverPreview = false.obs;
  final pointer = Offset.zero.obs;

  void goToPreview(String url) async {
    final Uri _url = Uri.parse(url);

    if (!await launchUrl(_url)) {
      throw Exception('Could not launch $_url');
    }
  }
}

import 'package:get/get.dart';

class ProjectComponentLogic extends GetxController {
  final isHover = false.obs;

  void setHover(bool _isHover) {
    isHover.value = _isHover;
  }
}

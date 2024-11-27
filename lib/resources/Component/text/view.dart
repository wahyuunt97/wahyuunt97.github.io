import 'package:flutter/material.dart';
import 'package:flutter_screenutil/flutter_screenutil.dart';
import 'package:get/get.dart';

import 'logic.dart';

class TextComponent extends StatelessWidget {
  TextComponent(
      {super.key, required this.text, this.size, this.color, this.align, this.isBold});

  final logic = Get.put(TextLogic());
  final state = Get.find<TextLogic>().state;

  final String text;
  final double? size;
  final Color? color;
  final TextAlign? align;
  final bool? isBold;

  @override
  Widget build(BuildContext context) {
    return Text(
      text,
      style: TextStyle(
        color: color ?? Colors.white,
        fontSize: size ?? 12.sp,
        fontWeight: isBold == true ? FontWeight.w700 : FontWeight.w400,
      ),
      textAlign: align,
    );
  }
}

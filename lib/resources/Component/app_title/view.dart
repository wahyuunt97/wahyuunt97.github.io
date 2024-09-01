import 'package:flutter/material.dart';
import 'package:flutter_screenutil/flutter_screenutil.dart';
import 'package:get/get.dart';
import 'package:wahyu_portfolio/resources/Component/text/view.dart';

import 'logic.dart';

class AppTitleComponent extends StatelessWidget {
  AppTitleComponent({Key? key, required this.item, required this.isLarge, required this.isItem}) : super(key: key);

  final logic = Get.put(AppTitleLogic());
  final state = Get.find<AppTitleLogic>().state;

  final Map<String, dynamic> item;
  final bool isLarge;
  final bool isItem;

  @override
  Widget build(BuildContext context) {
    final bool isLandscape = false;

    if (!isLandscape) {
      return Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          FractionallySizedBox(
            widthFactor: 1,
            child: Column(
              // crossAxisAlignment: CrossAxisAlignment.center,
              children: [
                Image.asset(item["icon_path"], width: isLarge ? 120.w : 75.w,fit: BoxFit.fitWidth,),
                TextComponent(text: item["app_title"],
                    size: isItem ? 20.sp : 24.sp,
                    color: Colors.white, align: TextAlign.center,),

                if(isItem)
                  TextComponent(text: item['category'], size: 12.sp,),
              ],
            ),
          ),
        ],
      );
    }
  }
}

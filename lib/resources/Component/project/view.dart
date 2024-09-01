import 'dart:math';

import 'package:flutter/material.dart';
import 'package:flutter_screenutil/flutter_screenutil.dart';
import 'package:get/get.dart';
import 'package:ionicons/ionicons.dart';
import 'package:wahyu_portfolio/resources/Component/app_title/view.dart';
import 'package:wahyu_portfolio/resources/Component/text/view.dart';
import 'package:wahyu_portfolio/resources/color.dart';
import 'package:wahyu_portfolio/resources/projectData.dart';
import 'package:wahyu_portfolio/view/project_detail/view.dart';

import 'logic.dart';

class ProjectComponent extends StatelessWidget {
  const ProjectComponent({super.key, required this.item, required this.onTap});

  final Map<String, dynamic> item;
  final Function onTap;

  @override
  Widget build(BuildContext context) {
    final logic = Get.put(ProjectComponentLogic(), tag: "${item['id']}");

    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Expanded(
          child: GestureDetector(
            onTap: () {
              onTap();
            },
            child: MouseRegion(
              cursor: SystemMouseCursors.click,
              onHover: (value) {
                if (logic.isHover.value == false) {
                  logic.setHover(true);
                  print("isHover");
                }
              },
              onExit: (value) {
                if (logic.isHover.value == true) {
                  logic.setHover(false);
                  print("isExit");
                }
              },
              child: Container(
                decoration: BoxDecoration(
                    borderRadius: BorderRadius.circular(30.r),
                    color: MainColor.itemColor),
                child: Stack(
                  children: [
                    Padding(
                      padding: EdgeInsets.symmetric(vertical: 0.h),
                      child: Stack(
                        children: [
                          Column(
                            mainAxisAlignment: MainAxisAlignment.end,
                            children: [
                              Image.asset(
                                item["icon_path"],
                                scale: 1,
                                width: double.infinity,
                                fit: BoxFit.fill,
                              ),
                            ],
                          ),
                          // Padding(
                          //   padding: EdgeInsets.all(120.h),
                          //   child: AppTitleComponent(item: item, isLarge: false, isItem: true, ),
                          // ),
                        ],
                      ),
                    ),
                    Obx(() {
                      return Visibility(
                        visible: logic.isHover.value,
                        // visible: true,
                        child: Container(
                          height: double.infinity,
                          width: double.infinity,
                          color: Colors.black.withOpacity(0.5),
                          child: Center(
                            child: Column(
                              crossAxisAlignment: CrossAxisAlignment.center,
                              mainAxisAlignment: MainAxisAlignment.center,
                              children: [
                                TextComponent(
                                  text: item["app_title"],
                                  size: 18.sp,
                                  color: Colors.white,
                                  isBold: true,
                                ),
                                TextComponent(
                                  text: item["category"],
                                  size: 18.sp,
                                  color: Colors.white,
                                ),
                              ],
                            ),
                          ),
                        ),
                      );
                    })
                  ],
                ),
              ),
            ),
          ),
        ), // appTitle(item),
      ],
    );
  }

// Widget appTitle( Map<String, dynamic> item) {
//   return Column(
//     crossAxisAlignment: CrossAxisAlignment.start,
//     children: [
//       Image.asset(item["icon_path"], width: 75.w,),
//       Row(
//         children: [
//           TextComponent(text: item["app_title"], size: 24.sp, color: Colors.black),
//         ],
//       ),
//       Row(
//         children: [
//           TextComponent(text: "${item["year"]} • ${item["role"]}", size: 10.sp, color: Colors.grey,),
//         ],
//       )
//     ],
//   );
// }
}

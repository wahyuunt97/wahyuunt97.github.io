import 'dart:math';

import 'package:flutter/material.dart';
import 'package:flutter_screenutil/flutter_screenutil.dart';
import 'package:flutter_svg/flutter_svg.dart';
import 'package:get/get.dart';
import 'package:ionicons/ionicons.dart';
import 'package:wahyu_portfolio/resources/Component/app_title/view.dart';
import 'package:wahyu_portfolio/resources/Component/text/view.dart';
import 'package:wahyu_portfolio/resources/color.dart';

import 'logic.dart';

class ProjectDetailPage extends StatelessWidget {
  ProjectDetailPage({super.key});

  final logic = Get.put(ProjectDetailLogic());
  final Map<String, dynamic> item = Get.arguments;

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: MainColor.backgroundColor,
      body: Obx(() {
        return MouseRegion(
          cursor: logic.isHoverPreview.value
              ? SystemMouseCursors.click
              : SystemMouseCursors.none,
          onHover: (eve) {
            logic.pointer.value = eve.position;
          },
          child: GestureDetector(
            onTap: () {
              Get.back();
            },
            child: Stack(
              children: [
                SingleChildScrollView(
                  child: Column(
                    mainAxisAlignment: MainAxisAlignment.center,
                    crossAxisAlignment: CrossAxisAlignment.center,
                    children: [
                      Container(
                        width: double.infinity,
                        child: Image.asset(
                          item["image_path"],
                          fit: BoxFit.fitWidth,
                        ),
                      ),
                      SizedBox(
                        height: 240.h,
                      ),
                      FusionTextWidgets(text: item["title"]),
                      SizedBox(
                        height: 240.h,
                      ),
                      SizedBox(
                        width: 1087.w,
                        child: Column(
                          mainAxisAlignment: MainAxisAlignment.start,
                          crossAxisAlignment: CrossAxisAlignment.start,
                          children: [
                            TextComponent(
                              text: "About",
                              size: 22.sp,
                              color: Colors.yellow,
                            ),
                            SizedBox(
                              height: 20.h,
                            ),
                            TextComponent(
                              text: item["about"],
                              color: Colors.white,
                              size: 22.sp,
                            ),
                            SizedBox(
                              height: 16.h,
                            ),
                            SizedBox(
                              height: 240.h,
                            ),
                            Row(
                              crossAxisAlignment: CrossAxisAlignment.start,
                              children: [
                                Flexible(
                                  child: Column(
                                    mainAxisAlignment: MainAxisAlignment.start,
                                    crossAxisAlignment:
                                        CrossAxisAlignment.start,
                                    children: [
                                      TextComponent(
                                        text: "Role",
                                        color: Colors.yellow,
                                        // Use grey color as in your design
                                        size: 22.sp,
                                      ),
                                      SizedBox(
                                        height: 20.h,
                                      ),
                                      TextComponent(
                                        text: item["role"],
                                        color: Colors.white,
                                        // Use grey color as in your design
                                        size: 22.sp,
                                      ),
                                      SizedBox(
                                        height: 64.h,
                                      ),
                                      TextComponent(
                                        text: "Outcome",
                                        color: Colors.yellow,
                                        // Use grey color as in your design
                                        size: 22.sp,
                                      ),
                                      SizedBox(
                                        height: 20.h,
                                      ),
                                      for (var item in item["outcome"])
                                        Column(
                                          children: [
                                            Row(
                                              mainAxisAlignment: MainAxisAlignment.start,
                                              crossAxisAlignment: CrossAxisAlignment.start,
                                              children: [
                                                Column(
                                                  children: [
                                                    SizedBox(height: 20.h,),
                                                    Icon(Ionicons.caret_forward, color: Colors.yellow, size: 18.sp,),
                                                  ],
                                                ),
                                                SizedBox(width: 24.w,),
                                                Flexible(child: TextComponent(text: item, color: Colors.white, size: 24.sp,)),
                                              ],
                                            ),
                                            SizedBox(
                                              height: 12.h,
                                            )
                                          ],
                                        )
                                    ],
                                  ),
                                ),
                                SizedBox(
                                  width: 20.w,
                                ),
                                Expanded(
                                  child: Column(
                                    crossAxisAlignment:
                                        CrossAxisAlignment.start,
                                    children: [
                                      Row(
                                        crossAxisAlignment:
                                            CrossAxisAlignment.start,
                                        children: [
                                          // Left-aligned label (Timeline)
                                          Expanded(
                                            flex: 2,
                                            // Give more weight to the label
                                            child: TextComponent(
                                              text: "Timeline",
                                              color: Colors.yellow,
                                              // Use grey color as in your design
                                              size: 22.sp,
                                            ),
                                          ),
                                          SizedBox(width: 16.w),
                                          // Right-aligned content for Timeline
                                          Expanded(
                                            flex: 5,
                                            // Give more space to the content
                                            child: Column(
                                              crossAxisAlignment:
                                                  CrossAxisAlignment.start,
                                              children: [
                                                TextComponent(
                                                  text: item["timeline"],
                                                  color: Colors.white,
                                                  size: 22.sp,
                                                  isBold: true,
                                                ),
                                                TextComponent(
                                                  text: item["timeline_detail"],
                                                  color: Colors.white,
                                                  size: 22.sp,
                                                ),
                                              ],
                                            ),
                                          ),
                                        ],
                                      ),
                                      SizedBox(height: 16.h),
                                      Row(
                                        crossAxisAlignment:
                                            CrossAxisAlignment.start,
                                        children: [
                                          // Left-aligned label (Responsibility)
                                          Expanded(
                                            flex: 2,
                                            // Align with the previous label's flex
                                            child: TextComponent(
                                              text: "Responsible",
                                              color: Colors.yellow,
                                              // Use grey color for the label
                                              size: 22.sp,
                                            ),
                                          ),
                                          SizedBox(width: 16.w),
                                          // Right-aligned content for Responsibility
                                          Expanded(
                                            flex: 5,
                                            // Same flex for the content as above
                                            child: TextComponent(
                                              text: item["responsibility"],
                                              size: 22.sp,
                                            ),
                                          ),
                                        ],
                                      ),
                                      SizedBox(height: 16.h),
                                      Row(
                                        crossAxisAlignment:
                                            CrossAxisAlignment.start,
                                        children: [
                                          // Left-aligned label (Stack)
                                          Expanded(
                                            flex: 2,
                                            // Align with the previous label's flex
                                            child: TextComponent(
                                              text: "Stack",
                                              color: Colors.yellow,
                                              // Use grey color for the label
                                              size: 22.sp,
                                            ),
                                          ),
                                          SizedBox(width: 16.w),
                                          // Right-aligned content for Stack
                                          Expanded(
                                            flex: 5,
                                            // Same flex for the content as above
                                            child: TextComponent(
                                              text: item["tech_stack"],
                                              color: Colors.white,
                                              size: 22.sp,
                                            ),
                                          ),
                                        ],
                                      ),
                                    ],
                                  ),
                                ),
                              ],
                            )
                          ],
                        ),
                      ),
                      SizedBox(
                        height: 1200.h,
                      )
                    ],
                  ),
                ),
                Obx(() {
                  if (!logic.isHoverPreview.value) {
                    return Positioned(
                      left: logic.pointer.value.dx - 10.w,
                      top: logic.pointer.value.dy - 60.h,
                      child: IgnorePointer(
                        child: Container(
                          height: 200.h,
                          width: 200.h,
                          decoration: BoxDecoration(
                              borderRadius:
                                  BorderRadius.all(Radius.circular(400.r)),
                              color: Colors.black.withOpacity(0.5)),
                          child: const Icon(
                            Ionicons.arrow_back,
                            color: Colors.white,
                          ),
                        ),
                      ),
                    );
                  }
                  return const SizedBox();
                }),
                if (item["link"] != "")
                  Positioned(
                    bottom: 16,
                    right: 16,
                    child: Container(
                      width: 240.w,
                      height: 75.w,
                      child: ElevatedButton(
                        style: ElevatedButton.styleFrom(
                          backgroundColor:
                              Colors.yellow, // Set background color to yellow
                        ),
                        onHover: (isHover) => {
                          logic.isHoverPreview.value = isHover,
                          print("isChange ${isHover}")
                        },
                        onPressed: () => logic.goToPreview(item["link"]),
                        child: TextComponent(
                          text: "Preview",
                          size: 24.sp,
                          color: Colors.black, // Set text color to black
                        ),
                      ),
                    ),
                  ),
              ],
            ),
          ),
        );
      }),
    );
  }
}

class FusionTextWidgets extends StatelessWidget {
  final String text;
  static final regex = RegExp(r"\[(.*?)\]|\{(.*?)\}");

  const FusionTextWidgets({Key? key, required this.text}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    final matches = regex.allMatches(text);

    final widgets = <InlineSpan>[];
    int currentIndex = 0;

    for (final match in matches) {
      final beforeText = text.substring(currentIndex, match.start);

      if (beforeText.isNotEmpty) {
        widgets.add(
          TextSpan(
            text: beforeText,
            style: TextStyle(
              fontSize: 60.sp,
              color: Colors.white,
            ),
          ),
        );
      }

      if (match.group(1) != null) {
        widgets.add(
          TextSpan(
            text: match.group(1),
            style: TextStyle(
              fontSize: 60.sp,
              color: Colors.white,
              fontWeight: FontWeight.bold,
            ),
          ),
        );
      } else if (match.group(2) != null) {
        widgets.add(
          const WidgetSpan(
            child: Icon(
              Icons.star,
              size: 60,
              color: Colors.white,
            ),
          ),
        );
      }

      currentIndex = match.end;
    }

    final remainingText = text.substring(currentIndex);
    print("remainingText: $remainingText");
    if (remainingText.isNotEmpty) {
      widgets.add(
        TextSpan(
          text: remainingText,
          style: TextStyle(
            fontSize: 60.sp,
            color: Colors.white,
          ),
        ),
      );
    }

    return Center(
      // Center the RichText widget
      child: RichText(
        textAlign: TextAlign.center, // Center all TextSpans
        text: TextSpan(
          children: widgets,
        ),
      ),
    );
  }
}

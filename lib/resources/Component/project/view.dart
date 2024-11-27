import 'package:flutter/material.dart';
import 'package:flutter_screenutil/flutter_screenutil.dart';
import 'package:flutter_svg/flutter_svg.dart';
import 'package:get/get.dart';
import 'package:wahyu_portfolio/resources/Component/project/logic.dart';
import 'package:wahyu_portfolio/resources/Component/text/view.dart';
import 'package:wahyu_portfolio/resources/color.dart';
import 'package:wahyu_portfolio/utils/PlatformDetection.dart';

class ProjectComponent extends StatelessWidget {
  const ProjectComponent({
    super.key,
    required this.item,
    required this.onTap,
    this.scaleFactor = 1.0,
  });

  final Map<String, dynamic> item;
  final Function onTap;
  final double scaleFactor;

  @override
  Widget build(BuildContext context) {
    final logic = Get.put(ProjectComponentLogic(), tag: "${item['id']}");
    // Adjust deviceIconScale for device icons specifically
    final deviceIconScale = PlatformUtils.isMobileView(context) ? 0.3 : 1.0;

    return Container(
      decoration: BoxDecoration(
          borderRadius: BorderRadius.circular((30 * scaleFactor).r),
          color: MainColor.itemColor
      ),
      child: GestureDetector(
        onTap: () {
          onTap();
        },
        child: MouseRegion(
          cursor: SystemMouseCursors.click,
          onHover: (value) {
            if (logic.isHover.value == false) {
              logic.setHover(true);
            }
          },
          onExit: (value) {
            if (logic.isHover.value == true) {
              logic.setHover(false);
            }
          },
          child: ClipRRect(
            borderRadius: BorderRadius.circular((30 * scaleFactor).r),
            child: Stack(
              children: [
                Image.asset(
                  item["icon_path"],
                  fit: BoxFit.cover,
                  width: double.infinity,
                  height: double.infinity,
                ),

                // Device Icons - Restored to original positioning
                Positioned(
                  right: 0,
                  top: 16.h,
                  child: Row(
                    mainAxisAlignment: MainAxisAlignment.center,
                    children: [
                      for (var device in item["device"]) ...[
                        Container(
                          padding: PlatformUtils.isMobileView(context)
                              ? EdgeInsets.symmetric(horizontal: (16 * deviceIconScale).w, vertical: (16 * deviceIconScale).h)
                              : EdgeInsets.symmetric(horizontal: 64.h, vertical: 64.h),
                          decoration: BoxDecoration(
                            color: Colors.white.withOpacity(0.75),
                            borderRadius: BorderRadius.circular(40.r),
                          ),
                          child: SvgPicture.asset(
                            device,
                            width: PlatformUtils.isMobileView(context) ? (24 * deviceIconScale).w : 60.w,
                            height: PlatformUtils.isMobileView(context) ? (24 * deviceIconScale).h : 60.h,
                          ),
                        ),
                        SizedBox(width: 4.w),
                      ],
                    ],
                  ),
                ),

                // Hover Overlay
                Obx(() {
                  return Visibility(
                    visible: logic.isHover.value,
                    child: Container(
                      color: Colors.black.withOpacity(0.5),
                      child: Center(
                        child: Column(
                          mainAxisAlignment: MainAxisAlignment.center,
                          children: [
                            TextComponent(
                              text: item["app_title"],
                              size: (18 * scaleFactor).sp,
                              color: Colors.white,
                              isBold: true,
                            ),
                            SizedBox(height: (8 * scaleFactor).h),
                            TextComponent(
                              text: item["category"],
                              size: (18 * scaleFactor).sp,
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
    );
  }
}
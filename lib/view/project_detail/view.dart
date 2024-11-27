import 'dart:math';

import 'package:flutter/material.dart';
import 'package:flutter_screenutil/flutter_screenutil.dart';
import 'package:flutter_svg/flutter_svg.dart';
import 'package:get/get.dart';
import 'package:ionicons/ionicons.dart';
import 'package:wahyu_portfolio/resources/Component/app_title/view.dart';
import 'package:wahyu_portfolio/resources/Component/text/view.dart';
import 'package:wahyu_portfolio/resources/color.dart';
import 'package:wahyu_portfolio/utils/PlatformDetection.dart';

import 'logic.dart';

class ProjectDetailPage extends StatelessWidget {
  ProjectDetailPage({super.key});

  final logic = Get.put(ProjectDetailLogic());
  final Map<String, dynamic> item = Get.arguments;

  @override
  Widget build(BuildContext context) {
    final isMobile = PlatformUtils.isMobileView(context);
    final scaleFactor = isMobile ? 0.3 : 1.0;

    return Scaffold(
      backgroundColor: MainColor.backgroundColor,
      appBar: isMobile ? AppBar(
        backgroundColor: MainColor.backgroundColor,
        leading: IconButton(
          icon: Icon(Icons.arrow_back, color: Colors.white),
          onPressed: () => Get.back(),
        ),
        elevation: 0,
      ) : null,
      body: isMobile
          ? SingleChildScrollView(
        child: buildContent(context, scaleFactor),
      )
          : MouseRegion(
        cursor: SystemMouseCursors.none,
        onHover: (eve) {
          logic.pointer.value = eve.position;
        },
        child: GestureDetector(
          onTap: () => Get.back(),
          child: Stack(
            children: [
              SingleChildScrollView(
                child: buildContent(context, scaleFactor),
              ),
              if (!isMobile) buildHoverCursor(),
              if (item["link"] != "") buildPreviewButton(isMobile),
            ],
          ),
        ),
      ),
    );
  }

  Widget buildHoverCursor() {
    return Obx(() => logic.isHoverPreview.value
        ? const SizedBox()
        : Positioned(
      left: logic.pointer.value.dx - 10.w,
      top: logic.pointer.value.dy - 60.h,
      child: IgnorePointer(
        child: Container(
          height: 200.h,
          width: 200.h,
          decoration: BoxDecoration(
              borderRadius: BorderRadius.all(Radius.circular(400.r)),
              color: Colors.black.withOpacity(0.5)
          ),
          child: const Icon(
            Ionicons.arrow_back,
            color: Colors.white,
          ),
        ),
      ),
    )
    );
  }

  Widget buildPreviewButton(bool isMobile) {
    return Positioned(
      bottom: isMobile ? 16.h : 16,
      right: isMobile ? 16.w : 16,
      child: Container(
        width: isMobile ? (120 * 0.3).w : 240.w,
        height: isMobile ? (75 * 0.3).w : 75.w,
        child: Obx(() => ElevatedButton(
          style: ElevatedButton.styleFrom(
            backgroundColor: Colors.yellow,
          ),
          onHover: (isHover) => logic.isHoverPreview.value = isHover,
          onPressed: () => logic.goToPreview(item["link"]),
          child: TextComponent(
            text: "Preview",
            size: isMobile ? (24 * 0.3).sp : 24.sp,
            color: Colors.black,
          ),
        )),
      ),
    );
  }

  Widget buildContent(BuildContext context, double scaleFactor) {
    final isMobile = PlatformUtils.isMobileView(context);
    final horizontalPadding = isMobile ? 16.w : 420.w;
    final descriptionTextSize = isMobile ? (18 * scaleFactor).sp : (16 * scaleFactor).sp;
    final deviceIconScale = PlatformUtils.isMobileView(context) ? 0.3 : 1.0;

    return Padding(
      padding: EdgeInsets.symmetric(horizontal: horizontalPadding),
      child: Column(
        mainAxisAlignment: MainAxisAlignment.center,
        crossAxisAlignment: CrossAxisAlignment.center,
        children: [
          Stack(
            children: [
              Container(
                width: double.infinity,
                child: Image.asset(
                  item["image_path"],
                  fit: BoxFit.fitWidth,
                ),
              ),
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

            ],
          ),
          SizedBox(height: (!isMobile ? 240 * scaleFactor : 16).h),
          FusionTextWidgets(
            text: item["title"],
            scaleFactor: scaleFactor,
          ),
          SizedBox(height: (!isMobile ? 240 * scaleFactor : 16).h),
          SizedBox(
            width: isMobile ? double.infinity : 1087.w,
            child: Column(
              mainAxisAlignment: MainAxisAlignment.start,
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                // About Section
                TextComponent(
                  text: "About",
                  size: (22 * scaleFactor).sp,
                  color: Colors.yellow,
                ),
                SizedBox(height: (20 * scaleFactor).h),
                TextComponent(
                  text: item["about"],
                  color: Colors.white,
                  size: descriptionTextSize,
                ),
                SizedBox(height: (64 * scaleFactor).h),

                // Use Column instead of Row for mobile
                isMobile
                    ? Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    // Role Section
                    buildRoleSection(scaleFactor),
                    SizedBox(height: (32 * scaleFactor).h),
                    // Info Rows Section
                    buildInfoSection(scaleFactor),
                  ],
                )
                    : Row(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    Flexible(
                      child: buildRoleSection(scaleFactor),
                    ),
                    SizedBox(width: (20 * scaleFactor).w),
                    Flexible(
                      child: buildInfoSection(scaleFactor),
                    ),
                  ],
                ),
              ],
            ),
          ),
          SizedBox(height: (100 * scaleFactor).h),
        ],
      ),
    );
  }

  Widget buildRoleSection(double scaleFactor) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        TextComponent(
          text: "Role",
          color: Colors.yellow,
          size: (22 * scaleFactor).sp,
        ),
        SizedBox(height: (20 * scaleFactor).h),
        TextComponent(
          text: item["role"],
          color: Colors.white,
          size: (22 * scaleFactor).sp,
        ),
        SizedBox(height: (64 * scaleFactor).h),
        TextComponent(
          text: "Outcome",
          color: Colors.yellow,
          size: (22 * scaleFactor).sp,
        ),
        SizedBox(height: (20 * scaleFactor).h),
        for (var outcome in item["outcome"])
          Column(
            children: [
              Row(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Column(
                    children: [
                      SizedBox(height: (8 * scaleFactor).h),
                      Icon(
                        Ionicons.caret_forward,
                        color: Colors.yellow,
                        size: (18 * scaleFactor).sp,
                      ),
                    ],
                  ),
                  SizedBox(width: (24 * scaleFactor).w),
                  Flexible(
                    child: TextComponent(
                      text: outcome,
                      color: Colors.white,
                      size: (22 * scaleFactor).sp,
                    ),
                  ),
                ],
              ),
              SizedBox(height: (12 * scaleFactor).h),
            ],
          ),
      ],
    );
  }

  Widget buildInfoSection(double scaleFactor) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        buildInfoRow("Timeline", item["timeline"], item["timeline_detail"], scaleFactor),
        SizedBox(height: (32 * scaleFactor).h),
        buildInfoRow("Responsible", item["responsibility"], null, scaleFactor),
        SizedBox(height: (32 * scaleFactor).h),
        buildInfoRow("Stack", item["tech_stack"], null, scaleFactor),
      ],
    );
  }

// Update buildInfoRow to use larger text for mobile
  Widget buildInfoRow(String label, String content, String? detail, double scaleFactor) {
    final isMobile = PlatformUtils.isMobileView(Get.context!);
    final contentTextSize = isMobile ? (24 * scaleFactor).sp : (22 * scaleFactor).sp;

    return Row(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Expanded(
          flex: 2,
          child: TextComponent(
            text: label,
            color: Colors.yellow,
            size: (22 * scaleFactor).sp,
          ),
        ),
        SizedBox(width: (16 * scaleFactor).w),
        Expanded(
          flex: 5,
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              TextComponent(
                text: content,
                color: Colors.white,
                size: contentTextSize,
                isBold: true,
              ),
              if (detail != null)
                TextComponent(
                  text: detail,
                  color: Colors.white,
                  size: contentTextSize,
                ),
            ],
          ),
        ),
      ],
    );
  }
}

class FusionTextWidgets extends StatelessWidget {
  final String text;
  final double scaleFactor;
  static final regex = RegExp(r"\[(.*?)\]|\{(.*?)\}");

  const FusionTextWidgets({
    Key? key,
    required this.text,
    required this.scaleFactor,
  }) : super(key: key);

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
              fontSize: (60 * scaleFactor).sp,
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
              fontSize: (60 * scaleFactor).sp,
              color: Colors.white,
              fontWeight: FontWeight.bold,
            ),
          ),
        );
      } else if (match.group(2) != null) {
        widgets.add(
          WidgetSpan(
            child: Icon(
              Icons.star,
              size: 60 * scaleFactor,
              color: Colors.white,
            ),
          ),
        );
      }

      currentIndex = match.end;
    }

    final remainingText = text.substring(currentIndex);
    if (remainingText.isNotEmpty) {
      widgets.add(
        TextSpan(
          text: remainingText,
          style: TextStyle(
            fontSize: (60 * scaleFactor).sp,
            color: Colors.white,
          ),
        ),
      );
    }

    return Center(
      child: RichText(
        textAlign: TextAlign.center,
        text: TextSpan(
          children: widgets,
        ),
      ),
    );
  }
}
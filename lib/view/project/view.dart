import 'package:flutter/material.dart';
import 'package:flutter_screenutil/flutter_screenutil.dart';
import 'package:get/get.dart';
import 'package:ionicons/ionicons.dart';
import 'package:wahyu_portfolio/resources/Component/project/view.dart';
import 'package:wahyu_portfolio/resources/Component/text/view.dart';
import 'package:wahyu_portfolio/resources/projectData.dart';
import 'package:wahyu_portfolio/utils/PlatformDetection.dart';
import 'package:wahyu_portfolio/view/project_detail/view.dart';

import 'logic.dart';

class ProjectPage extends StatelessWidget {
  ProjectPage({super.key});

  final logic = Get.put(ProjectLogic());

  @override
  Widget build(BuildContext context) {
    final scaleFactor = PlatformUtils.isMobileView(context) ? 0.3 : 1.0;
    final crossAxisCount = PlatformUtils.isMobileView(context) ? 2 : 3;
    final horizontalPadding = PlatformUtils.isMobileView(context) ? 16.w : 420.w;
    // Keep original height by adjusting aspect ratio
    final childAspectRatio = PlatformUtils.isMobileView(context)
        ? 1.0  // Original aspect ratio for both mobile and desktop
        : 1.0;

    return SingleChildScrollView(
      child: Padding(
        padding: EdgeInsets.symmetric(horizontal: horizontalPadding),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            SizedBox(height: (200 * scaleFactor).h),
            TextComponent(
                text: "Projects",
                size: (50 * scaleFactor).sp
            ),
            SizedBox(height: (20 * scaleFactor).h),
            GridView.count(
              shrinkWrap: true,
              physics: const NeverScrollableScrollPhysics(),
              crossAxisCount: crossAxisCount,
              crossAxisSpacing: (20 * scaleFactor).w,
              mainAxisSpacing: (20 * scaleFactor).h,
              childAspectRatio: childAspectRatio,  // Same aspect ratio for both views
              children: projectData.reversed.map((item) {
                return ProjectComponent(
                  item: item,
                  onTap: () {
                    Get.toNamed("/detail", arguments: item);
                  },
                  scaleFactor: scaleFactor,
                );
              }).toList(),
            )
          ],
        ),
      ),
    );
  }
}

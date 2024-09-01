import 'package:flutter/material.dart';
import 'package:flutter_screenutil/flutter_screenutil.dart';
import 'package:get/get.dart';
import 'package:ionicons/ionicons.dart';
import 'package:wahyu_portfolio/resources/Component/project/view.dart';
import 'package:wahyu_portfolio/resources/Component/text/view.dart';
import 'package:wahyu_portfolio/resources/projectData.dart';
import 'package:wahyu_portfolio/view/project_detail/view.dart';

import 'logic.dart';

class ProjectPage extends StatelessWidget {
  ProjectPage({super.key});

  final logic = Get.put(ProjectLogic());

  // final List<String> items = List.generate(12, (index) => "Item $index");

  @override
  Widget build(BuildContext context) {
    return Column(
      children: [
        Row(
          mainAxisAlignment: MainAxisAlignment.center,
          children: [
            SizedBox(
              width: 1150.w,
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  SizedBox(height: 200.h,),
                  Row(
                    mainAxisAlignment: MainAxisAlignment.spaceBetween,
                    children: [
                      TextComponent(text: "Projects", size: 50.sp),
                    ],
                  ),
                  GridView.count(
                    shrinkWrap: true,
                    // Makes the GridView take up only as much space as needed
                    physics: const NeverScrollableScrollPhysics(),
                    // Disables the scrolling
                    crossAxisCount: 3,
                    crossAxisSpacing: 10,
                    mainAxisSpacing: 10,
                    children: projectData.reversed.map((item) {
                      return Center(
                          child: ProjectComponent(
                              item: item,
                              onTap: () {
                                // Get.to(ProjectDetailPage(item: item), transition: Transition.cupertino);
                                Get.toNamed("/detail", arguments: item);
                                // logic.showDetailDialog(context, item);
                              }));
                    }).toList(),
                  )
                ],
              ),
            ),
          ],
        ),
        SizedBox(height: 512.h,),
      ],
    );
  }
}

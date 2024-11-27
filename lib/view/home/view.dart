import 'package:flutter/material.dart';
import 'package:flutter_screenutil/flutter_screenutil.dart';
import 'package:flutter_svg/flutter_svg.dart';
import 'package:get/get.dart';
import 'package:ionicons/ionicons.dart';
import 'package:wahyu_portfolio/resources/Component/text/view.dart';
import 'package:wahyu_portfolio/resources/color.dart';
import 'package:wahyu_portfolio/resources/projectData.dart';
import 'package:wahyu_portfolio/utils/PlatformDetection.dart';
import 'package:wahyu_portfolio/view/about/view.dart';
import 'package:wahyu_portfolio/view/project/view.dart';
import 'package:wahyu_portfolio/view/project_detail/view.dart';
import 'package:wahyu_portfolio/view/work/view.dart';

import 'logic.dart';

class HomePage extends StatelessWidget {
  final logic = Get.put(HomeLogic());

  @override
  Widget build(BuildContext context) {
    final spacing = PlatformUtils.isMobileView(context) ? 16.w : 42.w;

    return Scaffold(
      backgroundColor: MainColor.backgroundColor,
      appBar: AppBar(
        backgroundColor: MainColor.toolbarColor,
        title: Row(
          children: [
            SizedBox(width: 32.w,),
            SvgPicture.asset("assets/vectors/app_icon.svg", width: 32.w, height: 32.w,),
          ],
        ),
        actions: [
          TextButton(
            onPressed: () => logic.scrollToSection(logic.homeKey),
            child: TextComponent(text: "About Me",),
          ),
          TextButton(
            onPressed: () => logic.scrollToSection(logic.aboutKey),
            child: TextComponent(text: "Work",),
          ),
          TextButton(
            onPressed: () => logic.scrollToSection(logic.contactKey),
            child:TextComponent(text: "Projects",),
          ),
          SizedBox(width: 32.w,),
        ],
      ),
      body: SingleChildScrollView(
        controller: logic.scrollController,
        child: Column(
          children: [
            SizedBox(height: spacing),
            SizedBox(
              key: logic.homeKey,
              // height: MediaQuery
              //     .of(context)
              //     .size
              //     .height,
              child: Center(
                child: AboutPage(logic: logic,)
              ),
            ),
            Container(
              key: logic.aboutKey,
              // height: MediaQuery
              //     .of(context)
              //     .size
              //     .height,
              child: Center(
                child: WorkPage(logic: logic,)
              ),
            ),
            Container(
              key: logic.contactKey,
              // height: MediaQuery
              //     .of(context)
              //     .size
              //     .height,
              child: Center(
                child: ProjectPage()
              ),
            ),
            Container(
              padding: EdgeInsets.all(8.w),
              width: double.infinity,
              color: Colors.black,
              child: Center(child: Row(
                mainAxisAlignment: MainAxisAlignment.center,
                children: [
                  TextComponent(text: "Made with ",),
                  Icon(Ionicons.heart, color: Colors.red, size: 20.w,),
                  TextComponent(text: " using "),
                  SvgPicture.asset("assets/vectors/flutter_icon.svg", width: 50.w, height: 50.h,),
                  TextComponent(text: "Flutter"),
                ],
              )),
            ),

          ],
        ),
      ),
    );
  }
}

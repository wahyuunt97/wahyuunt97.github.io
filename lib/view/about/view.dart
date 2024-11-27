import 'package:flutter/material.dart';
import 'package:flutter_screenutil/flutter_screenutil.dart';
import 'package:flutter_svg/flutter_svg.dart';
import 'package:get/get.dart';
import 'package:ionicons/ionicons.dart';
import 'package:wahyu_portfolio/resources/Component/text/view.dart';
import 'package:wahyu_portfolio/utils/PlatformDetection.dart';
import 'package:wahyu_portfolio/view/home/logic.dart';

class AboutPage extends StatelessWidget {
  const AboutPage({super.key, required this.logic});

  final HomeLogic logic;

  @override
  Widget build(BuildContext context) {
    final scaleFactor = PlatformUtils.isMobileView(context) ? 0.3 : 1.0;
    final horizontalPadding = PlatformUtils.isMobileView(context) ? 16.w : 420.w;
    final iconSize = PlatformUtils.isMobileView(context) ? 20.w : 24.w;

    return SingleChildScrollView(
      child: Padding(
        padding: EdgeInsets.symmetric(horizontal: horizontalPadding),
        child: Row(
          children: [
            Expanded(
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  TextComponent(text: "Hello!", size: (19 * scaleFactor).sp),
                  TextComponent(text: "I Am Wahyu Untoro", color: Colors.yellow, isBold: true, size: (52 * scaleFactor).sp),
                          TextComponent(
                            text: "A passionate Front-end Mobile Developer and game developer with 7 years experience in Mobile programming with native and multi-platform framework. Familiar with Swift, Kotlin, React Native and Flutter.",
                            size: (22 * scaleFactor).sp,
                          ),
                  Row(
                    mainAxisSize: MainAxisSize.min,
                    children: [
                      IconButton(
                        onPressed: () => logic.openUrl("https://www.instagram.com/wahyuunt97/"),
                        icon: Icon(
                          Ionicons.logo_instagram,
                          color: Colors.white,
                          size: iconSize,
                        ),
                      ),
                      IconButton(
                        onPressed: () => logic.openUrl("https://www.linkedin.com/in/wahyuuntoro/"),
                        icon: Icon(
                          Ionicons.logo_linkedin,
                          color: Colors.white,
                          size: iconSize,
                        ),
                      ),
                      IconButton(
                        onPressed: () => logic.openUrl("https://github.com/wahyuunt97"),
                        icon: Icon(
                          Ionicons.logo_github,
                          color: Colors.white,
                          size: iconSize,
                        ),
                      ),
                      IconButton(
                        onPressed: () => logic.openUrl("mailto:wahyuuntoro54@gmail.com"),
                        icon: Icon(
                          Ionicons.mail_sharp,
                          color: Colors.white,
                          size: iconSize,
                        ),
                      ),
                    ],
                  )

                ],
              ),
            ),
            SizedBox(width: 16.w,),
            Column(
              children: [
                Image.asset(
                  "assets/images/profile_pic.png",
                  scale: PlatformUtils.isMobileView(context) ? 2.5 : 2.0,
                ),
              ],
            ),

          ],
        ),
      ),
    );
  }
}
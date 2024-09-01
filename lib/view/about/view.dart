import 'package:flutter/material.dart';
import 'package:flutter_screenutil/flutter_screenutil.dart';
import 'package:flutter_svg/flutter_svg.dart';
import 'package:get/get.dart';
import 'package:ionicons/ionicons.dart';
import 'package:wahyu_portfolio/resources/Component/text/view.dart';
import 'package:wahyu_portfolio/view/home/logic.dart';

import 'logic.dart';

class AboutPage extends StatelessWidget {
  const AboutPage({super.key, required this.logic});

  final HomeLogic logic;
  
  @override
  Widget build(BuildContext context) {
    return Row(
      mainAxisAlignment: MainAxisAlignment.center,
      children: [
        Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            SizedBox(height: 64.h,),
            Padding(
              padding: EdgeInsets.only(left: 200.w),
              child: Row(
                children: [
                  Stack(children: [
                    Image.asset("assets/images/arrow.png", ),
                    Row(
                      children: [
                        SizedBox(width: 130.w,),
                        Column(
                          children: [
                            SizedBox(height: 25.w,),
                            Row(children: [
                              TextComponent(text: "Hello! I Am ", size: 19.sp,),
                              TextComponent(text: "Wahyu Untoro", color: Colors.yellow, size: 19.sp,)
                            ],)
                          ],
                        )
                      ],
                    ),
                  ],),
                ],
              ),
            ),
            Row(
              children: [
                Column(
                  children: [
                    Image.asset("assets/images/profile_pic.png"),
                    Row(
                      crossAxisAlignment: CrossAxisAlignment.center,
                      mainAxisAlignment: MainAxisAlignment.center,
                      children: [
                        IconButton(onPressed: (){
                          logic.openUrl("https://www.instagram.com/wahyuunt97/");
                        }, icon: const Icon(Ionicons.logo_instagram, color: Colors.white,)),

                        IconButton(onPressed: (){
                          logic.openUrl("https://www.linkedin.com/in/wahyuunt97/");
                        }, icon: const Icon(Ionicons.logo_linkedin, color: Colors.white,)),

                        IconButton(onPressed: (){
                          logic.openUrl("https://github.com/wahyuunt97");
                        }, icon: const Icon(Ionicons.logo_github, color: Colors.white,)),

                        IconButton(onPressed: (){
                          logic.openUrl("mailto:wahyuuntoro54@gmail.com");
                        }, icon: const Icon(Ionicons.mail_sharp, color: Colors.white,))
                      ],
                    )

                  ],
                ),
                SizedBox(width: 15.w,),
                Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    Row(
                      children: [
                        SizedBox(width: 15.w,),
                        TextComponent(text: "A Programmer who", size: 17.sp,),
                      ],
                    ),
                    Column(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: [
                        Row(
                          children: [
                            SizedBox(width: 15.w,),
                            TextComponent(text: "Learning by", size: 50.sp,),
                          ],
                        ),
                        Stack(
                          children: [
                            SvgPicture.asset("assets/vectors/circle.svg", width: 188.w,),
                            Row(
                              children: [
                                SizedBox(width: 15.w,),
                                TextComponent(text: "Doing", size: 50.sp, color: Colors.yellow,),
                                TextComponent(text: "...", size: 50.sp)
                              ],
                            ),
                          ],
                        ),
                        Row(
                          children: [
                            SizedBox(width: 16.w,),
                            TextComponent(text: "Because If we never try how will we know"),
                          ],
                        )
                      ],
                    )
                  ],
                )
              ],
            ),
            SizedBox(height: 78.h),
            TextComponent(text: "I'm a Mobile Programmer", size: 50.sp),
            Row(
              children: [
                TextComponent(text: "Currently, I'm a Mobile Programmer at", size: 21.sp,),
                SizedBox(width: 16.w,),
                InkWell(
                  onTap: (){
                    logic.openUrl("https://timedoor.net/");
                  },
                  child: SvgPicture.asset("assets/vectors/timedoor_logo.svg", width: 100.w),
                )

              ],
            ),
            SizedBox(height: 44.h,),
            SizedBox(
              width: 1150.w,
                child: TextComponent(text: "A passionate Front-end Mobile Developer and game developer with 7 years experience in Mobile programming with native and multi-platform framework. Familiar with Swift, Kotlin, React Native and Flutter.", size: 22.sp,)
            )
          ],
        ),
      ],
    );
  }
}
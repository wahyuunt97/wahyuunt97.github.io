import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:flutter_screenutil/flutter_screenutil.dart';
import 'package:get/get.dart';
import 'package:ionicons/ionicons.dart';
import 'package:wahyu_portfolio/resources/Component/text/view.dart';
import 'package:wahyu_portfolio/resources/color.dart';
import 'package:wahyu_portfolio/view/home/logic.dart';

import 'dart:html' as html;
import 'dart:js' as js;
import 'logic.dart';

class WorkPage extends StatelessWidget {
  WorkPage({super.key, required this.logic});

  final HomeLogic logic;
  
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
                      TextComponent(text: "Work Experience", size: 50.sp),
                    ],
                  ),
                  SizedBox(height: 44.h,),
                  Row(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      Column(
                        children: [
                          SizedBox(height: 32.h,),
                          Container(decoration: BoxDecoration(color: Colors.yellow, borderRadius: BorderRadius.circular(30.r)), width: 15.w, height: 15.w,),
                          Container(width: 1.w, height: 1055.h, decoration: BoxDecoration(gradient: LinearGradient(colors: [Colors.yellow, MainColor.backgroundColor])),),
                          // Container(decoration: BoxDecoration(color: Colors.yellow, borderRadius: BorderRadius.circular(30.r)), width: 15.w, height: 15.w,),
                        ],
                      ),
                      SizedBox(width: 16.w,),
                      Expanded(
                        child: Column(
                          children: [
                            Row(
                              mainAxisAlignment: MainAxisAlignment.spaceBetween,
                              mainAxisSize: MainAxisSize.max,
                              children: [
                                TextComponent(text: "PT Timedoor Indonesia", size: 24.sp),
                                TextComponent(text: "Denpasar, Bali", size: 24.sp,)
                              ],
                            ),
                            SizedBox(height: 8.h,),
                            Row(
                              mainAxisAlignment: MainAxisAlignment.spaceBetween,
                              mainAxisSize: MainAxisSize.max,
                              children: [
                                TextComponent(text: "Mobile App Programmer", size: 18.sp, color: Colors.yellow,),
                                TextComponent(text: "Mar 2019 - Present", size: 18.sp, color: Colors.yellow,)
                              ],
                            ),
                            listTask("Berkolaborasi dengan team untuk membuah aplikasi e-commerce menggunakan framework Flutter", "Berhasil membuat sebuah aplikasi yang menampilkan data dari alat internet of things (IOT) dan dapat menterjemahkan permintaan client, serta sudah di publish di testFlight."),
                            SizedBox(height: 8.h,),
                            Row(
                              mainAxisAlignment: MainAxisAlignment.spaceBetween,
                              mainAxisSize: MainAxisSize.max,
                              children: [
                                TextComponent(text: "Research and Development Mobile Team Supervisor", size: 18.sp, color: Colors.yellow,),
                                TextComponent(text: "Mar 2022 - Feb 2024", size: 18.sp, color: Colors.yellow,)
                              ],
                            ),
                            listTask("Berhasil melakukan riset terhadap teknologi yang ingin di terapkan client di tahun 2022 dan 2023 dengan membagi task kepada setiap anggota team.", "Berkerjasama dengan team marketing untuk menjadwalkan artikel yang berhubungan dengan tech dan akan terbit tiap bulannya di tahun 2023."),
                            SizedBox(height: 72.h,),
                            Row(
                              children: [
                                TextButton(onPressed: (){ downloadFile('wahyu-untoro-cv.pdf', 'assets/file/MasterCV.pdf'); }, child: Row(
                                  children: [
                                    Icon(Ionicons.document, color: Colors.yellow, size: 20.w,),
                                    SizedBox(width: 8.w,),
                                    TextComponent(text: "Download my CV ", color: Colors.yellow, size: 20.sp,),
                                  ],
                                )),
                              ],
                            )
                          ],
                        ),
                      ),
                    ],
                  )
                ],
              ),
            ),
          ],
        ),
        SizedBox(height: 52.h,),
      ],
    );
  }

  Widget listTask(String task1, String task2) {
    return Column(
      children: [
        Row(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Padding(padding: EdgeInsets.only(top: 26.h), child: const Icon(Ionicons.ellipse, size: 8, color: Colors.white,)),
            SizedBox(width: 12.w,),
            Expanded(child: TextComponent(text: task1, size: 18.sp,))
          ],
        ),
        Row(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Padding(padding: EdgeInsets.only(top: 26.h), child: const Icon(Ionicons.ellipse, size: 8, color: Colors.white,)),
            SizedBox(width: 12.w,),
            Expanded(child: TextComponent(text: task2, size: 18.sp,))
          ],
        )
      ],
    );
  }
}

void downloadFile(String fileName, String filePath) async {
  // Load the file as bytes
  final bytes = await rootBundle.load(filePath);

  // Create a blob and URL for the file data
  final blob = html.Blob([bytes.buffer.asUint8List()]);
  final url = html.Url.createObjectUrlFromBlob(blob);

  // Create an anchor element
  final anchor = html.AnchorElement(href: url)
    ..setAttribute("download", fileName)
    ..click();

  // Clean up the URL to release memory
  html.Url.revokeObjectUrl(url);
}
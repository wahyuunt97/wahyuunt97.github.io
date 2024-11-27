import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:flutter_screenutil/flutter_screenutil.dart';
import 'package:ionicons/ionicons.dart';
import 'package:wahyu_portfolio/resources/Component/text/view.dart';
import 'package:wahyu_portfolio/resources/color.dart';
import 'package:wahyu_portfolio/utils/PlatformDetection.dart';
import 'package:wahyu_portfolio/view/home/logic.dart';
import 'dart:html' as html;

class WorkPage extends StatelessWidget {
  WorkPage({super.key, required this.logic});

  final HomeLogic logic;

  @override
  Widget build(BuildContext context) {
    final scaleFactor = PlatformUtils.isMobileView(context) ? 0.3 : 1.0;
    // Update web padding to 420.w
    final horizontalPadding = PlatformUtils.isMobileView(context) ? 16.w : 420.w;
    final lineHeight = PlatformUtils.isMobileView(context) ? 150.h : 1055.h;

    return SingleChildScrollView(
      child: Padding(
        padding: EdgeInsets.symmetric(horizontal: horizontalPadding),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            SizedBox(height: (200 * scaleFactor).h),
            TextComponent(
              text: "Work Experience",
              size: (50 * scaleFactor).sp,
              isBold: true,
            ),
            SizedBox(height: (44 * scaleFactor).h),
            Row(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                // Timeline line with dot
                Column(
                  children: [
                    Container(
                      decoration: BoxDecoration(
                        color: Colors.yellow,
                        shape: BoxShape.circle,
                      ),
                      width: (15 * scaleFactor).w,
                      height: (15 * scaleFactor).w,
                    ),
                    Container(
                      width: (2 * scaleFactor).w,
                      height: lineHeight, // Use the adjusted line height
                      decoration: BoxDecoration(
                          gradient: LinearGradient(
                              begin: Alignment.topCenter,
                              end: Alignment.bottomCenter,
                              colors: [Colors.yellow, Colors.transparent]
                          )
                      ),
                    ),
                  ],
                ),
                SizedBox(width: (32 * scaleFactor).w),
                // Content
                Expanded(
                  child: Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      // Company header
                      Row(
                        mainAxisAlignment: MainAxisAlignment.spaceBetween,
                        children: [
                          TextComponent(
                            text: "PT Timedoor Indonesia",
                            size: (24 * scaleFactor).sp,
                            isBold: true,
                          ),
                          TextComponent(
                            text: "Denpasar, Bali",
                            size: (24 * scaleFactor).sp,
                          ),
                        ],
                      ),
                      SizedBox(height: (16 * scaleFactor).h),

                      // Mobile App Programmer section
                      Row(
                        mainAxisAlignment: MainAxisAlignment.spaceBetween,
                        children: [
                          TextComponent(
                            text: "Mobile App Programmer",
                            size: (18 * scaleFactor).sp,
                            color: Colors.yellow,
                          ),
                          TextComponent(
                            text: "Mar 2019 - Present",
                            size: (18 * scaleFactor).sp,
                            color: Colors.yellow,
                          ),
                        ],
                      ),
                      SizedBox(height: (16 * scaleFactor).h),
                      _buildBulletPoint(
                        "Berkolaborasi dengan team untuk membuah aplikasi e-commerce menggunakan framework Flutter",
                        scaleFactor,
                      ),
                      _buildBulletPoint(
                        "Berhasil membuat sebuah aplikasi yang menampilkan data dari alat internet of things (IOT) dan dapat menterjemahkan permintaan client, serta sudah di publish di testFlight.",
                        scaleFactor,
                      ),
                      SizedBox(height: (32 * scaleFactor).h),

                      // Supervisor section
                      Row(
                        mainAxisAlignment: MainAxisAlignment.spaceBetween,
                        children: [
                          Expanded(
                            child: TextComponent(
                              text: "Research and Development Mobile Team Supervisor",
                              size: (18 * scaleFactor).sp,
                              color: Colors.yellow,
                            ),
                          ),
                          TextComponent(
                            text: "Mar 2022 - Feb 2024",
                            size: (18 * scaleFactor).sp,
                            color: Colors.yellow,
                          ),
                        ],
                      ),
                      SizedBox(height: (16 * scaleFactor).h),
                      _buildBulletPoint(
                        "Berhasil melakukan riset terhadap teknologi yang ingin di terapkan client di tahun 2022 dan 2023 dengan membagi task kepada setiap anggota team.",
                        scaleFactor,
                      ),
                      _buildBulletPoint(
                        "Berkerjasama dengan team marketing untuk menjadwalkan artikel yang berhubungan dengan tech dan akan terbit tiap bulannya di tahun 2023.",
                        scaleFactor,
                      ),

                      SizedBox(height: (48 * scaleFactor).h),
                      // CV Download button
                      TextButton.icon(
                        onPressed: () {
                          downloadFile('wahyu-untoro-cv.pdf', 'assets/file/MasterCV.pdf');
                        },
                        icon: Icon(
                          Ionicons.document,
                          color: Colors.yellow,
                          size: (24 * scaleFactor).sp,
                        ),
                        label: TextComponent(
                          text: "Download my CV",
                          color: Colors.yellow,
                          size: (20 * scaleFactor).sp,
                        ),
                      ),
                    ],
                  ),
                ),
              ],
            ),
          ],
        ),
      ),
    );
  }

  Widget _buildBulletPoint(String text, double scaleFactor) {
    return Padding(
      padding: EdgeInsets.only(bottom: (8 * scaleFactor).h),
      child: Row(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Padding(
            padding: EdgeInsets.only(top: (8 * scaleFactor).h),
            child: Container(
              width: (6 * scaleFactor).w,
              height: (6 * scaleFactor).w,
              decoration: BoxDecoration(
                color: Colors.white,
                shape: BoxShape.circle,
              ),
            ),
          ),
          SizedBox(width: (12 * scaleFactor).w),
          Expanded(
            child: TextComponent(
              text: text,
              size: (18 * scaleFactor).sp,
            ),
          ),
        ],
      ),
    );
  }
}

void downloadFile(String fileName, String filePath) async {
  final bytes = await rootBundle.load(filePath);
  final blob = html.Blob([bytes.buffer.asUint8List()]);
  final url = html.Url.createObjectUrlFromBlob(blob);
  final anchor = html.AnchorElement(href: url)
    ..setAttribute("download", fileName)
    ..click();
  html.Url.revokeObjectUrl(url);
}
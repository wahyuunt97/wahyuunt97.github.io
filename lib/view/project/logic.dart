import 'package:flutter/material.dart';
import 'package:get/get.dart';
import 'package:wahyu_portfolio/view/project_detail/view.dart';

import 'state.dart';

class ProjectLogic extends GetxController {
  final ProjectState state = ProjectState();

  // void showDetailDialog(BuildContext context, Map<String, dynamic> item) {
  //   showDialog(
  //     context: context,
  //     builder: (BuildContext context) {
  //       return AlertDialog(
  //         contentPadding: EdgeInsets.zero,
  //         content: ProjectDetailPage(item: item,),
  //         // actions: <Widget>[
  //         //   TextButton(
  //         //     child: Text('Close'),
  //         //     onPressed: () {
  //         //       Navigator.of(context).pop(); // Close the dialog
  //         //     },
  //         //   ),
  //         // ],
  //       );
  //     },
  //   );
  // }
}

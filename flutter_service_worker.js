'use strict';
const MANIFEST = 'flutter-app-manifest';
const TEMP = 'flutter-temp-cache';
const CACHE_NAME = 'flutter-app-cache';

const RESOURCES = {"flutter_bootstrap.js": "72494f7f102f46cf24be9b46a09f4df7",
"version.json": "46242dcbe6edc39f8fa43704a6393ee0",
"index.html": "d841266699187d11bfd30e4b3555c11d",
"/": "d841266699187d11bfd30e4b3555c11d",
"main.dart.js": "f564ae5f348b47e0acb10acb2534631d",
"flutter.js": "383e55f7f3cce5be08fcf1f3881f585c",
"favicon.png": "ea6c8581c0528f73e72e46e2fc723283",
"icons/Icon-192.png": "ac9a721a12bbc803b44f645561ecb1e1",
"icons/Icon-maskable-192.png": "c457ef57daa1d16f64b27b786ec2ea3c",
"icons/Icon-maskable-512.png": "301a7604d45b3e739efc881eb04896ea",
"icons/Icon-512.png": "96e752610906ba2a93c65f8abe1645f1",
"manifest.json": "d62476b716a0bc18eb6fc1d7b8bdbf08",
".dart_tool/flutter_build/e45971476d574938a632ce45714c179d/web_service_worker.stamp": "74a414b6f808e16a9407a3fd96e919dd",
".dart_tool/flutter_build/e45971476d574938a632ce45714c179d/dart2js.d": "51e0ef1af90794adff42912ce8e28048",
".dart_tool/flutter_build/e45971476d574938a632ce45714c179d/gen_localizations.stamp": "436d2f2faeb7041740ee3f49a985d62a",
".dart_tool/flutter_build/e45971476d574938a632ce45714c179d/web_static_assets.stamp": "02370d673a43e2269c583f032ff4a382",
".dart_tool/flutter_build/e45971476d574938a632ce45714c179d/main.dart.js.deps": "f7c3bf583f3cec21ca0b009025cb8b44",
".dart_tool/flutter_build/e45971476d574938a632ce45714c179d/main.dart.js": "bbab0810b75b21c8f4ed21d8283049e2",
".dart_tool/flutter_build/e45971476d574938a632ce45714c179d/app.dill": "e86f8c4617100512a894cd61a75941db",
".dart_tool/flutter_build/e45971476d574938a632ce45714c179d/outputs.json": "7399a04514eab5befd81420923a3a971",
".dart_tool/flutter_build/e45971476d574938a632ce45714c179d/web_templated_files.stamp": "759391a9d3bc93f1a233c19266bc856a",
".dart_tool/flutter_build/e45971476d574938a632ce45714c179d/web_release_bundle.stamp": "688cbc2c6ef780895a36a2b3d6c6e4c9",
".dart_tool/flutter_build/e45971476d574938a632ce45714c179d/flutter_assets.d": "09c3f52d8e3feaeaf91285a1284bdd14",
".dart_tool/flutter_build/e45971476d574938a632ce45714c179d/main.dart": "4e01ed417bdd3631b572a3ba376790f6",
".dart_tool/flutter_build/e45971476d574938a632ce45714c179d/dart2js.stamp": "09b7eae37c761b65eff653b08beba19c",
".dart_tool/flutter_build/e45971476d574938a632ce45714c179d/service_worker.d": "4ed0a0dd9cfc4afadd3a381e8d3864bf",
".dart_tool/flutter_build/e45971476d574938a632ce45714c179d/web_resources.d": "e9b288c28eb41a847fa0bccd73289646",
".dart_tool/flutter_build/e45971476d574938a632ce45714c179d/web_plugin_registrant.dart": "5256cc49698b6509f42403c1f86ecb1b",
".dart_tool/flutter_build/e45971476d574938a632ce45714c179d/app.dill.deps": "1c3305d64571ad84c8ded7c114828132",
".dart_tool/flutter_build/e45971476d574938a632ce45714c179d/web_entrypoint.stamp": "49229a858820e62338db58c81b096768",
".git/ORIG_HEAD": "eaac052f3ec9d3c18c34423a7ecaae8c",
".git/config": "10f4c26264c7eee89551f9c32f926567",
".git/objects/59/e9d3d07dd67b88897ea36f906ebed85ea19d2c": "75f19c84b655e4f6cb519dc24ede70d3",
".git/objects/66/6444c3e1b766e610386b4e4ea4b1240362b070": "e64d982cef5e1bcded6966a346d97c96",
".git/objects/50/95a0d2d23522cc3ef3846ecfd0958451a4c3f8": "d62b2a6f390ad4f4610bed915946702c",
".git/objects/68/c282b37f238cb68c9bfb3b48e4de1d5dfc34e1": "265c445a0b356c550a14df79efd1984e",
".git/objects/6f/21b0940b342fa7da0f9d647e6bd6471d59d57c": "987dc618e3ca07f11518c0d1ca3060f5",
".git/objects/6f/081d5d563c11c24bbc8b492b6b3b558ee7c827": "ebdc44a9927aa817bfbb25d75f99e5e1",
".git/objects/04/a85bd51a76db61ae8d673ad429855cfb427b28": "9610ca9291be26299d1ee8bbc6c1357a",
".git/objects/6a/9b56b1726c0c88d70d8bdd5a9be20115fa27a5": "ddeff70cf155bd2d918f57e8f7830bce",
".git/objects/35/b65bcfb19f8d3e8f1f4bae546c11c3e155a357": "cf58eec7d5613bc80356dbd7a6f90898",
".git/objects/3d/68830fc75684214373b05bd3623a187baa9ae1": "cd286547b8c77e4546cf49a7a2380c02",
".git/objects/3d/32837621d6858eb4bcf010e2f9b896c28a6b1d": "86bc49daba14ff810bbd91654909270f",
".git/objects/58/b007afeab6938f7283db26299ce2de9475d842": "6c6cbea527763bb3cdff2cecfee91721",
".git/objects/58/356635d1dc89f2ed71c73cf27d5eaf97d956cd": "f61f92e39b9805320d2895056208c1b7",
".git/objects/0b/5eea3bdc361c1d516f7a1c91be79f2bfc55cdb": "ca9aac9cb33116bcc4ed0983923c2341",
".git/objects/93/8b2dbb7c780640b44221428ea2130ee913c063": "488dd2323d62e49f2bb2c40eddba6c8f",
".git/objects/94/f7d06e926d627b554eb130e3c3522a941d670a": "77a772baf4c39f0a3a9e45f3e4b285bb",
".git/objects/60/3823b2bd11a3b36e4164093beed22f572c6dab": "32718b63667a3b2ffde81d62e7932307",
".git/objects/5a/2b7d2c70042e11c23bb42948f0f82d79e42dff": "731b1e08f8e027baff3244e22465e815",
".git/objects/5a/f09fb18269720f311d92738218ac40964b1d6e": "776f9064873747f5577f2fd918556bf6",
".git/objects/5f/271b9f74c62a8ea73ed6d92c1c410e609a3af3": "7783f48e336c9f0bd2600c0ec49873dc",
".git/objects/5f/9739e27db39b92b7abc8ea304af5c51f8d3bf7": "c30b128af32fa40d123423b171e54120",
".git/objects/b5/625e339fc600c4b0c8bf21950d68d78719dcbd": "8611751e05671f7247202d5dc0425179",
".git/objects/b5/8a3198eb140b29832b0c25e0e213175d411c9d": "05438436507e2394215d40aa80264470",
".git/objects/d9/88d42557b743b70005da2917899da3f4a0bbae": "415d7689712e5d9cff8ac3ca9d738da0",
".git/objects/ac/3efe13463b9ea57d26d8a0576f2cf8ee578148": "2b9425b01a7bcf19b52bf227345063fc",
".git/objects/ad/7ecbe890d8835e0b78a8a02ff01a7e60653d9e": "8b1b3b4143b919e4be892d708a315649",
".git/objects/ad/4a83d7da7518214709d9836b9de81bc5057cd2": "35a948772d020b144177561bf54373a9",
".git/objects/b3/dce58e91adecb70ad2a62c049ff8b12a62f7b9": "b70fc659dd1b772ad74b28db86d35bf9",
".git/objects/b3/ebbd38f666d4ffa1a394c5de15582f9d7ca6c0": "23010709b2d5951ca2b3be3dd49f09df",
".git/objects/df/e1f73696834f35fe4aa7ac8095e1ace0e580e6": "1eb549492165d478b3233ab1e49fa319",
".git/objects/da/7089b32fee7ae811b33abae840ecbd997a41fe": "3b4b548775682e0e3b849f7146b54619",
".git/objects/b4/a3ecb9428e2a4b8aff40c099e1c27d64a928f0": "6e4bc29289eb6be950713f1b329eaf0d",
".git/objects/b4/d7edf0a2bdb7daaa127cedca384ab78554aeba": "9ddb440b2ec89a42fc5006ad78f5f15c",
".git/objects/a2/642705166adacd801cce3f08adb8396f97739b": "1d88c4cbfcea9d5681a7c1761326de6d",
".git/objects/d1/4f07130216eba4d4a571fe23c6da939d2d93b5": "d3ae2b5fb80952a0e2626484ffe020da",
".git/objects/d1/098e7588881061719e47766c43f49be0c3e38e": "f17e6af17b09b0874aa518914cfe9d8c",
".git/objects/d6/9c56691fbdb0b7efa65097c7cc1edac12a6d3e": "868ce37a3a78b0606713733248a2f579",
".git/objects/d8/7de2c779525e354d063988ac2f5e8c0818a4d1": "11d1139b770aaa57105f0873669ad189",
".git/objects/d8/3289055915ada55546c08bdbac2c88ecb537f0": "d677e0402381d26077e1a4afd5060a8d",
".git/objects/ab/8febfb5288a2aa5e69206abf4e28a64e090b73": "6023ed640b67dc8253f4c4a4866c4946",
".git/objects/e2/afd8f626ca9b5622830ad347380210ee2e0e35": "3f5a8d3a0fc393142b20acee4e29c650",
".git/objects/e2/cacfd33dd909d09f7c2c6840f88e56b88ca60c": "e1fed6d976650e596d8c8fba620c78b1",
".git/objects/eb/9b4d76e525556d5d89141648c724331630325d": "37c0954235cbe27c4d93e74fe9a578ef",
".git/objects/eb/aa6708345679fc6dd86f7da4ef4c8e368f131d": "e2ea3db2c01678b86ce45edf5f502b7f",
".git/objects/ee/26138482be59be12cf87c69dd8ecb5b2d188b6": "d41966e93565549cc16cac311dd357d6",
".git/objects/c9/bf8af1b92c723b589cc9afadff1013fa0a0213": "632f11e7fee6909d99ecfd9eeab30973",
".git/objects/f2/04823a42f2d890f945f70d88b8e2d921c6ae26": "6b47f314ffc35cf6a1ced3208ecc857d",
".git/objects/f2/f7e77fe37670c46f241d37d13e04f44e7dd935": "ebcf0095260eb267cd86171ecf860d74",
".git/objects/f2/cc91d8c1d7714dd7e4955a2effa02d1a8c49b9": "47d75c45bc362a75156b17623b2f0f80",
".git/objects/cf/5c489ddfef510164e24e954ae313917e563df4": "4b2e7d90c5061a12db0a0a0a739c0280",
".git/objects/ca/c8712344487909996002f20ea7c6662a07e424": "138f74dfd56cd054db877e71cb48ca3c",
".git/objects/ca/88d494f33ea3b3455cfc27097c5a9398e45560": "a59f56f48870cf7e8984745431cab22f",
".git/objects/ed/5b71a896a308b46b181c96825a62f457d8701b": "ab80f001f07b1c3c79a040398bb691dc",
".git/objects/c1/9eaee39c1f48fe388a190baecdc47b6e682203": "c4872b57796a122a005236ab94d7f8fc",
".git/objects/20/cb2f80169bf29d673844d2bb6a73bc04f3bfb8": "b807949265987310dc442dc3f9f492a2",
".git/objects/20/1afe538261bd7f9a38bed0524669398070d046": "82a4d6c731c1d8cdc48bce3ab3c11172",
".git/objects/18/eb401097242a0ec205d5f8abd29a4c5e09c5a3": "4e08af90d04a082aab5eee741258a1dc",
".git/objects/27/f19e20a153899c744033d4278dfefdcbc458de": "9520c6bcdebff0509e020952f7c4c6da",
".git/objects/4b/07554b330d0edfecc9de993ab9a89900c24403": "4af2dae1d9522dd6aad54cc9432513ea",
".git/objects/4b/d2ccd6833694af0356f1d53994d4a5da8ded21": "2d20c62bdc4a81bf952dda01c605a835",
".git/objects/pack/pack-59b5de94f5b160a4354400e889f7f07a4ea3a35f.pack": "7372f6469ae622d66ff3ee429fa029d5",
".git/objects/pack/tmp_pack_iQfMZ6": "db1aaea5a6b464bac732e046ef6faf96",
".git/objects/pack/tmp_pack_i7lmlE": "698fc490ed917787ceaa61e6fbd7f08a",
".git/objects/pack/pack-59b5de94f5b160a4354400e889f7f07a4ea3a35f.idx": "102df7f17520b97476cb73be84736a53",
".git/objects/pack/tmp_pack_31b73c": "bda621939a29d34e928fe3082a7242d0",
".git/objects/7c/712098b96a3c90f2eacc36d11cd1039ed54513": "fd96a4f921013c0182e245e95fc09e2c",
".git/objects/7c/e33525ceaff46a30bf013cbc702c89017344c8": "a15ec2e40bff79d7f52ed732a2d460b4",
".git/objects/16/5d3eb63dd10b615bffd47e4c2912e9101884ea": "252e0e4f2904038bd6cab3f878a7dc70",
".git/objects/1f/45b5bcaac804825befd9117111e700e8fcb782": "7a9d811fd6ce7c7455466153561fb479",
".git/objects/87/bffea4c0a0c68bc9d849b0db1f74f0c14f4fd5": "9b6a6950983fdb2e680cca174bbd0387",
".git/objects/80/71a4d202c52e1201be33128d4d822e2aa40f82": "5a023ad4a23ab288b6740e379e7893ca",
".git/objects/28/4cbb1b15d93f6f79e0580ef948aaffdec1e903": "bd8540589b3016f9c1c362920704a9be",
".git/objects/8f/c38ffaa7c647773ce8183567e52bc1faf243be": "aafe27f557bcc0ac75a2306c057101c6",
".git/objects/10/41bebf43367b752834a93f60f325027f7f8ecd": "f8350f6fda6bbac0b287e3ef67b03cbc",
".git/objects/19/a463b224defde2fd4b1ef928b35d0fcc61276d": "6a3576dccc4ad74a0dfbd66718df97ec",
".git/objects/72/eb13a08ea940f2a31e64272f1a24af2c1db44c": "d38778f1225f6ad57aa25957786d7e33",
".git/objects/2a/64a0500550928ecb16c172a9289a0ff1090b7d": "a3fb3c9228dbb34f84e7488ba2cea69d",
".git/objects/2f/481ecf28e11c08bcd8ff07859f1450dee2c72f": "d7bd234e016c8a3913c42cd7592670fc",
".git/objects/88/cfd48dff1169879ba46840804b412fe02fefd6": "e42aaae6a4cbfbc9f6326f1fa9e3380c",
".git/objects/9f/a135a6abfeb16ed123e35e875d5f1389b1f1da": "3a7a6186a6891ab85e45f985dc9ee702",
".git/objects/5c/d65ae9e1a08c4ab95c5a31f1fca457a7195cd2": "195517394ee1d3ed96138a347c3752f6",
".git/objects/09/4bb6ae24f0cd847d40cb4cc4a2434f2ec9b83b": "b9e6d850322c11db635bcf0a45b762ff",
".git/objects/09/6b090dd5f3e0ea0ccc5937c888183c32dc8f83": "3ce8450a3d177b9705a34508bac07514",
".git/objects/91/0e4a6982ef5de2350e53f5bfa713fdb0d5e01f": "96bccb6dd74b303a5c55968e50d93cf6",
".git/objects/91/d25e7753ee22ccc35bc3c683942350362c9a45": "df7505cde3a5c7d85f8cc64a7a83e236",
".git/objects/3a/83b5c2eab37dcf1126d04847e13171de9cdc1b": "857061da77a2785d286cd5193afd5e9e",
".git/objects/3f/2a88a9e4ed7c01f3002f454cd446574a002471": "8bb57e9b5fba8c759e33ba588aec8f9c",
".git/objects/30/b9fea6fb781a4d86626b6e1bcb5eac4d248fb9": "13d8bd61c355f202e86748be36e0815e",
".git/objects/5b/ce3d6f61724f97aed95594746484ef5c62cf95": "d190a0843c8bd00a4ceeda03b3ac0648",
".git/objects/01/32a945199c62f8b013cff8b968312862e38e06": "c5f590bdd6f1be8789b881ec73cffb56",
".git/objects/63/1547e752db78497c96da9bc3f262ddeb7a807b": "e56e9bd819af15a05790593c8a613ecf",
".git/objects/0f/0c1aba7701b3788d97374a54c319d45ff48569": "c70e3ffb0db39bb9784ad6e2f5ce126b",
".git/objects/64/addedc2055fdc8f1ad9da251c52f20c9cca4a1": "bdba93aeadd36177f7ec2ae25519b2c6",
".git/objects/64/22624d94581293f4e24f413b53b9b5499c1ae2": "0f57535bac969aac87617c1ae687c1c5",
".git/objects/90/dcf8ac9027ae0443382b03a661601a26841591": "598e9b7ee4a254e2810a8525e1352fef",
".git/objects/bf/f474f151a2bac40c0afda821e96b321c73a4d2": "dede80d420a7945bd44a2427a4bcd192",
".git/objects/bf/4678cc4f711dca04689b8c5ce762580d67bba3": "a7a2358c53f5e3775de670824d5a6a02",
".git/objects/d3/e2a76b004b42e8995252201aaf46ed9b477c36": "4ab5a83c00b8b124e83c94b4c85e5cc3",
".git/objects/d4/3532a2348cc9c26053ddb5802f0e5d4b8abc05": "3dad9b209346b1723bb2cc68e7e42a44",
".git/objects/ba/5317db6066f0f7cfe94eec93dc654820ce848c": "9b7629bf1180798cf66df4142eb19a4e",
".git/objects/a7/01ba759211be377846160838f38cc9d1c03cd0": "72548cc216f2b64de1934f50150ed98f",
".git/objects/a7/6a35bf2c5c2e93420aac08a83ad9d3b77ac364": "08ca6fff1eb1e4c5a5b50c8a62b504f5",
".git/objects/b8/c1bf150d032a924a1ed403901e5e403bb0ae85": "456df5d94c1fcfc8a3fd8229659e7141",
".git/objects/b1/d75f9efc6837d9942e577e6d4136b2adbc992f": "768f7052006a05c018a0746b2962ab3b",
".git/objects/d2/6cfcf7cd844c1546a75dff244fdf00b428cb32": "2d4451a1ceeee0a96bed57ceb0976691",
".git/objects/d2/eda34f6738e922dfaea041b9d52723ff7b353b": "07e36524ef99c1db7b296c0ad9ee9672",
".git/objects/d2/ed682ffe4cff84e78fafd77f2ed8af1cb88c94": "8e90a0c34c7c50e6d58d0307cff8d7f2",
".git/objects/aa/88e98d863d0d5e1a642ca223320fd19ad936e9": "9c658f5c066d3293453af8672914b9d9",
".git/objects/aa/754ec57f3a74d989acbaf44e9dd3d732240d82": "f8b1c79caededd8a7a5042a5118eab10",
".git/objects/af/cedb2cfea5f593d4294de4a8a3500e054b39b8": "a300801b7aec1fedc35af87575f6a8f5",
".git/objects/b7/49bfef07473333cf1dd31e9eed89862a5d52aa": "36b4020dca303986cad10924774fb5dc",
".git/objects/b7/2d4c42822e07f5198971acf4ee01fd8f0beb6e": "be62101b8cbe2389dcc546709a07b155",
".git/objects/db/f748904c26cdc6eec14d5cf104a8cc665a0d86": "36caef474872c34f3d2fda8b6ecad43f",
".git/objects/db/3f1cf78c81c21f426644dd2480d7b0da42346d": "8b507aa510019a94bdd3819f6d79f961",
".git/objects/b9/2a0d854da9a8f73216c4a0ef07a0f0a44e4373": "f62d1eb7f51165e2a6d2ef1921f976f3",
".git/objects/cd/a30c0ad57aa4aac44ad96f36f08e5ccd354d0a": "9b61f528b5db935281a04ca32bdca997",
".git/objects/e8/60cef3a33bb5ab740675a800e5abd2aab75c11": "7ce050a760d247adfe703cf65656f93b",
".git/objects/e9/41b8574170210be4365fb70e2e2cc0a940220f": "ac81f94bbfaf1f6378d865f6fc341f85",
".git/objects/f1/f0587d2fcd69e47fc677dbf4c72e8d8f36267c": "933f33d9cc1e442364e63bd8f3741dfc",
".git/objects/e7/c2687d9b52430eb08df2598c357199e48b3320": "d364856a64acb4028ba7edb0a0c77c18",
".git/objects/f8/0b2eb1ae99c5d90541046b443adc173f11ba37": "009008701ceb8e789d6309c9283582fe",
".git/objects/e0/1d88d9eaef3c143c6a395129e06abf26a645d0": "5aaf885dea2b3016c7b577dff88ddb33",
".git/objects/46/40ec66bff19da296ce275d9c10d6e384a63323": "c43ef750fd56de6b9fa5f21651b8d4a9",
".git/objects/2c/22f0d8a113b46282f65c6102b1bca4468b5876": "fa1c95cc0f7c30241791f2bd85a2ecb8",
".git/objects/41/df2498547f69d2993561d50388f692f300d2f8": "6145bc97d86c70eb3a6f610ec6a84eba",
".git/objects/77/f5b016e3ae3b0a7fbbd5c1c7e23737de367bcc": "3589736bb2b1b5d275185e202180198c",
".git/objects/70/1fa3057ce8ebe6b22e295c3747b1a8e877d759": "2f4311f8464bc17c4ad51d0e3b501e87",
".git/objects/70/763ebf44564340b25465e92bbbb6359b989863": "732f8736249b6dd6ce981c33721d9e08",
".git/objects/1e/54f9e8245aae91a8e8645b3e4803fa443041af": "a46ef65032fbc8aa2c3569459d7121c9",
".git/objects/4a/01d65c8225c06699507120dceb264c09cbd6e2": "584369a5e88635b92d15b13d2a9f9c69",
".git/objects/24/1f71ecd228b84ee8c2f9105df8368b56b86ea6": "9c8b2a1e841345e3b72f993eb2631446",
".git/objects/4f/2c64c658f811feb3ec9567fccf2863c08143cb": "47b03f40edec6da3a521fbc9b265eb51",
".git/objects/12/572a8688d8d5eb682ab8fa9d8404c8e6bedd4e": "0dd26043bd1ec6e155194c6c174bf4aa",
".git/objects/8c/39c23644a1947575f95fd97b54f8fbc9ad89ad": "e4c21b989dd576d92b3d34c12214c8ef",
".git/objects/85/6a39233232244ba2497a38bdd13b2f0db12c82": "eef4643a9711cce94f555ae60fecd388",
".git/objects/71/3f932c591e8f661aa4a8e54c32c196262fd574": "66c6c54fbdf71902cb7321617d5fa33c",
".git/objects/1c/45abdb85f5727d411792c1716c1c363d16b41a": "184c12d9cce3fa475779fffca55b68a2",
".git/objects/49/adebdb511c8c293b28db3f6792e5bac28cdc32": "ba6a3971e7f06834fd6ec3844372ce17",
".git/objects/40/2559cc1ea20bab3dba869bcf9e0a7fea6ad9ad": "32f24a75943874d7832c292c497f3926",
".git/objects/7f/63c1b641012891cb5da127dc3f383096cc8d79": "48c2fac9ce4d2bb7eafde127130ff43b",
".git/objects/7f/4ed3f17c297b60b81056ce82b02218b137317f": "eb04122bac3d24f8d89e9e274e5cd5dc",
".git/objects/14/fbdd852fb7f41fceedbbbda16bb21732fa1595": "3105a9945323efa6b2c70d33aa369b2f",
".git/objects/8e/a1e2a4c3ef16fac34eac6d0f4512e41a8d8449": "0dd4d2970d19e8b4ef0d10130045ce6b",
".git/objects/22/7392aef51de487f3725e9074beed9cc7500646": "0e81b843ac57140511f73a2185853156",
".git/objects/25/bddd818d237ecc5bd06b9413287abe90faff7c": "37c5d02afdfa57531b27feee20c5f2f8",
".git/HEAD": "cf7dd3ce51958c5f13fece957cc417fb",
".git/info/exclude": "036208b4a1ab4a235d75c181e685e5a3",
".git/logs/HEAD": "3b158f96916695325f3c7e23a92930d9",
".git/logs/refs/heads/new": "e80fd01ab710ce08cfee6157650602c9",
".git/logs/refs/heads/main": "190c3328e6287398d0d70c597e2f0589",
".git/logs/refs/remotes/origin/HEAD": "a3779e3e823fead15f948591085862b9",
".git/logs/refs/remotes/origin/new": "60e0573e8bb58be104d921ffc76b01ad",
".git/logs/refs/remotes/origin/main": "e6f04bd05035b51ed60ea5383940c468",
".git/logs/refs/stash": "08d4a1340708fa6204d9f77c10a76fbf",
".git/description": "a0a7c3fff21f2aea3cfa1d0316dd816c",
".git/hooks/commit-msg.sample": "579a3c1e12a1e74a98169175fb913012",
".git/hooks/pre-rebase.sample": "56e45f2bcbc8226d2b4200f7c46371bf",
".git/hooks/pre-commit.sample": "305eadbbcd6f6d2567e033ad12aabbc4",
".git/hooks/applypatch-msg.sample": "ce562e08d8098926a3862fc6e7905199",
".git/hooks/fsmonitor-watchman.sample": "a0b2633a2c8e97501610bd3f73da66fc",
".git/hooks/pre-receive.sample": "2ad18ec82c20af7b5926ed9cea6aeedd",
".git/hooks/prepare-commit-msg.sample": "2b5c047bdb474555e1787db32b2d2fc5",
".git/hooks/post-update.sample": "2b7ea5cee3c49ff53d41e00785eb974c",
".git/hooks/pre-merge-commit.sample": "39cb268e2a85d436b9eb6f47614c3cbc",
".git/hooks/pre-applypatch.sample": "054f9ffb8bfe04a599751cc757226dda",
".git/hooks/pre-push.sample": "2c642152299a94e05ea26eae11993b13",
".git/hooks/update.sample": "647ae13c682f7827c22f5fc08a03674e",
".git/hooks/push-to-checkout.sample": "c7ab00c7784efeadad3ae9b228d4b4db",
".git/refs/heads/new": "eaac052f3ec9d3c18c34423a7ecaae8c",
".git/refs/heads/main": "01726b07f3e95ba010157701b81858a7",
".git/refs/remotes/origin/HEAD": "98b16e0b650190870f1b40bc8f4aec4e",
".git/refs/remotes/origin/new": "eaac052f3ec9d3c18c34423a7ecaae8c",
".git/refs/remotes/origin/main": "01726b07f3e95ba010157701b81858a7",
".git/refs/stash": "98b427375cb6d99a623f2556394261a9",
".git/index": "d7fec19618052f268459d271ced36644",
".git/COMMIT_EDITMSG": "01eb2c11c2685e04a0e3b0556549b914",
".git/FETCH_HEAD": "6d3d3ca2234198ecb78ff47521f62723",
"assets/AssetManifest.json": "ba0463425163c40e4658501bcb49be95",
"assets/NOTICES": "e2a8e665db92e0ba2d68f37b4cefb5c4",
"assets/FontManifest.json": "66b71d2bcd2b436ab06cceee43157084",
"assets/AssetManifest.bin.json": "07fd4ae9a2e621edf02100d6adc27bce",
"assets/packages/cupertino_icons/assets/CupertinoIcons.ttf": "e986ebe42ef785b27164c36a9abc7818",
"assets/packages/ionicons/assets/fonts/Ionicons.ttf": "757f33cf07178f986e73b03f8c195bd6",
"assets/shaders/ink_sparkle.frag": "ecc85a2e95f5e9f53123dcaf8cb9b6ce",
"assets/AssetManifest.bin": "4beab4e87b613be91479d62d548218a7",
"assets/fonts/MaterialIcons-Regular.otf": "d9b89054f47852048bbbed6db21de09a",
"assets/assets/file/MasterCV.pdf": "b1887fbd5b5e1f2fde86588aed083638",
"assets/assets/images/blur_bg.png": "44b1777ee8f43efcde1e24f0c1c6fc3d",
"assets/assets/images/app_logo/ayam_thumbnail.png": "ecf0aef1f30721cec696db8838952e11",
"assets/assets/images/app_logo/cerita_thumbnail.png": "79788c095ab402611df911e70a988e3d",
"assets/assets/images/app_logo/maranatha_thumbnail.png": "02b225bfb5e755cc3e34b625c0e7cb81",
"assets/assets/images/app_logo/aksara_thumbnail.png": "532982b2232d7a38a20111563e618d89",
"assets/assets/images/app_logo/cars_thumbnail.png": "2b0b019bd5053ce5743709375856804d",
"assets/assets/images/app_logo/healingpod_thumbnail.png": "101bf67c0031137a6738f0c7166044da",
"assets/assets/images/app_logo/spatia_thumbnail.png": "9c88485e7357c541910428122037cdc8",
"assets/assets/images/app_logo/bedugul_thumbnail.png": "1b02e37e2f63cb5cb30c45dc4b3cbf70",
"assets/assets/images/app_logo/tuyul_thumbnail.png": "7296e206f4bf548318422f8db288959a",
"assets/assets/images/app_logo/secret_bitess_thumbnail.png": "f78fb25067ee3fe182ea3ce4b9f62f2b",
"assets/assets/images/app_logo/minidepo_thumbnail.png": "cc5c630a79815bb437020fc9517702c9",
"assets/assets/images/app_logo/goalawah_thumbnail.png": "cef5b01e1cdc34410c4e718ecb88544a",
"assets/assets/images/app_logo/tds_thumbnail.png": "c830b2075464337dbed9311fb1d9b609",
"assets/assets/images/app_logo/ayo_menabung_thumbnail.png": "7f9de9312db76a5748ab4169e3a8df27",
"assets/assets/images/app_logo/lipi_poleng_thumbnail.png": "aa8ccfc366404459be907999fdc076e3",
"assets/assets/images/app_logo/shimajiro_thumbnail.png": "2c6ec09c295fc0f5e5f7b992188f460f",
"assets/assets/images/app_logo/rtga_thumbnail.png": "7fdd33edcdd8ec9a82f6efb2f4e117bb",
"assets/assets/images/app_logo/molecular_mastery_thumbnail.png": "cab1b51324b6c66ae4325beb5dd0a296",
"assets/assets/images/app_logo/ppgo_thumbnail.png": "8349e2aafb9bae91c0a1ccb2b365babe",
"assets/assets/images/app_logo/appmu_thumbnail.png": "a3e102b2871eb4cbac7962499ebdac64",
"assets/assets/images/app_logo/grun_thumbnail.png": "d218da3dc3007029ed2928a4fd36c86d",
"assets/assets/images/app_logo/lost_egg_thumbnail.png": "23d1199afc458f8c522e1ae413507f5b",
"assets/assets/images/app_logo/cativity_thumbnail.png": "602dc565e9f45c4244b51f1ff93c0d28",
"assets/assets/images/app_screenshot/healingpod_detail.png": "529973384806ee439ddee1c58957a788",
"assets/assets/images/app_screenshot/goalawah_detail.png": "aad4358309f4391d5153a13b8776fb52",
"assets/assets/images/app_screenshot/cars_detail.png": "b0b32ed2401c5e3320951f0dcefdf8d0",
"assets/assets/images/app_screenshot/secret_bitess_detail.png": "6a9b7c7dab39f0b7b7568fcbf22d7491",
"assets/assets/images/app_screenshot/tuyul.png": "edcd3dd5b09d7783aab38a912aa966e2",
"assets/assets/images/app_screenshot/lost_egg_detail.png": "46c96a506581c1bd349d92c2fb535c75",
"assets/assets/images/app_screenshot/shimajiro_detail.png": "53d8a93b8bfecdf8c7649bb854ba2f68",
"assets/assets/images/app_screenshot/minidepo_detail.png": "c54c5086f82902ba90a1dc1f7f04d53e",
"assets/assets/images/app_screenshot/ppgo_detail.png": "9bea533abbb0c4f39b0d953db074a878",
"assets/assets/images/app_screenshot/aksara_detail.png": "df2c8f94767effe67945e26eb60deeee",
"assets/assets/images/app_screenshot/molecular_mastery_detail.png": "28d0815fd0602f3b4563ef5f27f97f30",
"assets/assets/images/app_screenshot/grun_detail.png": "818bd3f8fc09f50b184e0228d1b55936",
"assets/assets/images/app_screenshot/lipi_poleng_detail.png": "5082f5f3169c63be6bd25526b1abaad1",
"assets/assets/images/app_screenshot/rtga_detail.png": "f7bf770388490ceb7ddb5a4f811254d8",
"assets/assets/images/app_screenshot/bedugul_detail.png": "03ad0c06b27d123d658ccb9c195e707f",
"assets/assets/images/app_screenshot/manarantha_detail.png": "ec851fec2aaed028b2b86796feec67b2",
"assets/assets/images/app_screenshot/ayo_menabung_detail.png": "00dc99efdcf94dc3254280f369194972",
"assets/assets/images/app_screenshot/cerita_detail.png": "35640e48ba9c1fa2a8bf8cbfe47367e5",
"assets/assets/images/app_screenshot/ayam_detail.png": "710ffbf66e5fd94b9cf8b7ae1a6b1701",
"assets/assets/images/app_screenshot/spatia.png": "e68c5f7c010ac40e92d18ee40447cd6c",
"assets/assets/images/app_screenshot/cativity_detail.png": "28f56c464024b0fee78fa18a9aa6d378",
"assets/assets/images/app_screenshot/tds_detail.png": "79a2d682b5c6e0093597b25596ef67d0",
"assets/assets/images/app_screenshot/appmu_detail.png": "5031a2a94196943c0e372e3cd9254bec",
"assets/assets/images/arrow.png": "07f315ec98a67a0a7392d0787d91b6db",
"assets/assets/images/profile_pic.png": "92a3fb7ec35a4f61303ca5be0ffc7926",
"assets/assets/vectors/timedoor_logo.svg": "1d019bb18a9bedbf3a15243a458f4065",
"assets/assets/vectors/circle.svg": "56ddf6300a5d75b5d4c2647f0e527bcc",
"assets/assets/vectors/hugeicons--virtual-reality-vr-01.svg": "838681e454eb20b6206fb0ebb30d87f8",
"assets/assets/vectors/app_icon.svg": "0bbd06a9a904baaa40d3ae77004cc5d6",
"assets/assets/vectors/mdi--web.svg": "a8d59b4a55a75a6ae28b0b30b576cf84",
"assets/assets/vectors/carbon--iot-connect.svg": "cc3050428c97cbbc91f983de7c326b2a",
"assets/assets/vectors/bi--phone.svg": "e63f4358b7202a8f7592d73effa2c26d",
"assets/assets/vectors/tdesign--watch.svg": "5323c4caf17a6cdc176570ce77648408",
"assets/assets/vectors/fluent--design-ideas-16-filled.svg": "bafe31d097beb56c2111c8059bbfdf33",
"assets/assets/vectors/ri--macbook-line.svg": "da4c7ae811c1115febcecf3aec9b5f4e",
"assets/assets/vectors/flutter_icon.svg": "89bba1150ec2b12a972a84d62bb9ece7",
"assets/assets/vectors/icon-park-outline--ipad-one.svg": "a5a72d146cc6c455fa59a1161923929b",
"canvaskit/skwasm.js": "5d4f9263ec93efeb022bb14a3881d240",
"canvaskit/skwasm.js.symbols": "c3c05bd50bdf59da8626bbe446ce65a3",
"canvaskit/canvaskit.js.symbols": "74a84c23f5ada42fe063514c587968c6",
"canvaskit/skwasm.wasm": "4051bfc27ba29bf420d17aa0c3a98bce",
"canvaskit/chromium/canvaskit.js.symbols": "ee7e331f7f5bbf5ec937737542112372",
"canvaskit/chromium/canvaskit.js": "901bb9e28fac643b7da75ecfd3339f3f",
"canvaskit/chromium/canvaskit.wasm": "399e2344480862e2dfa26f12fa5891d7",
"canvaskit/canvaskit.js": "738255d00768497e86aa4ca510cce1e1",
"canvaskit/canvaskit.wasm": "9251bb81ae8464c4df3b072f84aa969b",
"canvaskit/skwasm.worker.js": "bfb704a6c714a75da9ef320991e88b03",
".idea/workspace.xml": "5863bc951c57d3d9550d43d747f2aec6"};
// The application shell files that are downloaded before a service worker can
// start.
const CORE = ["main.dart.js",
"index.html",
"flutter_bootstrap.js",
"assets/AssetManifest.bin.json",
"assets/FontManifest.json"];

// During install, the TEMP cache is populated with the application shell files.
self.addEventListener("install", (event) => {
  self.skipWaiting();
  return event.waitUntil(
    caches.open(TEMP).then((cache) => {
      return cache.addAll(
        CORE.map((value) => new Request(value, {'cache': 'reload'})));
    })
  );
});
// During activate, the cache is populated with the temp files downloaded in
// install. If this service worker is upgrading from one with a saved
// MANIFEST, then use this to retain unchanged resource files.
self.addEventListener("activate", function(event) {
  return event.waitUntil(async function() {
    try {
      var contentCache = await caches.open(CACHE_NAME);
      var tempCache = await caches.open(TEMP);
      var manifestCache = await caches.open(MANIFEST);
      var manifest = await manifestCache.match('manifest');
      // When there is no prior manifest, clear the entire cache.
      if (!manifest) {
        await caches.delete(CACHE_NAME);
        contentCache = await caches.open(CACHE_NAME);
        for (var request of await tempCache.keys()) {
          var response = await tempCache.match(request);
          await contentCache.put(request, response);
        }
        await caches.delete(TEMP);
        // Save the manifest to make future upgrades efficient.
        await manifestCache.put('manifest', new Response(JSON.stringify(RESOURCES)));
        // Claim client to enable caching on first launch
        self.clients.claim();
        return;
      }
      var oldManifest = await manifest.json();
      var origin = self.location.origin;
      for (var request of await contentCache.keys()) {
        var key = request.url.substring(origin.length + 1);
        if (key == "") {
          key = "/";
        }
        // If a resource from the old manifest is not in the new cache, or if
        // the MD5 sum has changed, delete it. Otherwise the resource is left
        // in the cache and can be reused by the new service worker.
        if (!RESOURCES[key] || RESOURCES[key] != oldManifest[key]) {
          await contentCache.delete(request);
        }
      }
      // Populate the cache with the app shell TEMP files, potentially overwriting
      // cache files preserved above.
      for (var request of await tempCache.keys()) {
        var response = await tempCache.match(request);
        await contentCache.put(request, response);
      }
      await caches.delete(TEMP);
      // Save the manifest to make future upgrades efficient.
      await manifestCache.put('manifest', new Response(JSON.stringify(RESOURCES)));
      // Claim client to enable caching on first launch
      self.clients.claim();
      return;
    } catch (err) {
      // On an unhandled exception the state of the cache cannot be guaranteed.
      console.error('Failed to upgrade service worker: ' + err);
      await caches.delete(CACHE_NAME);
      await caches.delete(TEMP);
      await caches.delete(MANIFEST);
    }
  }());
});
// The fetch handler redirects requests for RESOURCE files to the service
// worker cache.
self.addEventListener("fetch", (event) => {
  if (event.request.method !== 'GET') {
    return;
  }
  var origin = self.location.origin;
  var key = event.request.url.substring(origin.length + 1);
  // Redirect URLs to the index.html
  if (key.indexOf('?v=') != -1) {
    key = key.split('?v=')[0];
  }
  if (event.request.url == origin || event.request.url.startsWith(origin + '/#') || key == '') {
    key = '/';
  }
  // If the URL is not the RESOURCE list then return to signal that the
  // browser should take over.
  if (!RESOURCES[key]) {
    return;
  }
  // If the URL is the index.html, perform an online-first request.
  if (key == '/') {
    return onlineFirst(event);
  }
  event.respondWith(caches.open(CACHE_NAME)
    .then((cache) =>  {
      return cache.match(event.request).then((response) => {
        // Either respond with the cached resource, or perform a fetch and
        // lazily populate the cache only if the resource was successfully fetched.
        return response || fetch(event.request).then((response) => {
          if (response && Boolean(response.ok)) {
            cache.put(event.request, response.clone());
          }
          return response;
        });
      })
    })
  );
});
self.addEventListener('message', (event) => {
  // SkipWaiting can be used to immediately activate a waiting service worker.
  // This will also require a page refresh triggered by the main worker.
  if (event.data === 'skipWaiting') {
    self.skipWaiting();
    return;
  }
  if (event.data === 'downloadOffline') {
    downloadOffline();
    return;
  }
});
// Download offline will check the RESOURCES for all files not in the cache
// and populate them.
async function downloadOffline() {
  var resources = [];
  var contentCache = await caches.open(CACHE_NAME);
  var currentContent = {};
  for (var request of await contentCache.keys()) {
    var key = request.url.substring(origin.length + 1);
    if (key == "") {
      key = "/";
    }
    currentContent[key] = true;
  }
  for (var resourceKey of Object.keys(RESOURCES)) {
    if (!currentContent[resourceKey]) {
      resources.push(resourceKey);
    }
  }
  return contentCache.addAll(resources);
}
// Attempt to download the resource online before falling back to
// the offline cache.
function onlineFirst(event) {
  return event.respondWith(
    fetch(event.request).then((response) => {
      return caches.open(CACHE_NAME).then((cache) => {
        cache.put(event.request, response.clone());
        return response;
      });
    }).catch((error) => {
      return caches.open(CACHE_NAME).then((cache) => {
        return cache.match(event.request).then((response) => {
          if (response != null) {
            return response;
          }
          throw error;
        });
      });
    })
  );
}

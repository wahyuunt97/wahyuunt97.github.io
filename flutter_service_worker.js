'use strict';
const MANIFEST = 'flutter-app-manifest';
const TEMP = 'flutter-temp-cache';
const CACHE_NAME = 'flutter-app-cache';

const RESOURCES = {"flutter_bootstrap.js": "4463d26ee09d86ae61efa5ce047255b7",
"version.json": "46242dcbe6edc39f8fa43704a6393ee0",
"index.html": "246288e71963b5769af8b2238dd7107a",
"/": "246288e71963b5769af8b2238dd7107a",
"main.dart.js": "28b1a80542cacf74ffdf91e5f6c9e6dd",
"flutter.js": "4b2350e14c6650ba82871f60906437ea",
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
".git/config": "7cf19bd06c7ef1e962773e5619ac1032",
".git/objects/pack/pack-425a20b8042818a779ff9bd474c01447758bcdab.pack": "4e0163dd0e7ea84896cdcd77ce09d35f",
".git/objects/pack/pack-425a20b8042818a779ff9bd474c01447758bcdab.idx": "6f50449ad21c3eb2406dd2b8dd613d64",
".git/HEAD": "cf7dd3ce51958c5f13fece957cc417fb",
".git/info/exclude": "036208b4a1ab4a235d75c181e685e5a3",
".git/logs/HEAD": "60f9200d08ba20e3fe6b4a5970457fb8",
".git/logs/refs/heads/main": "60f9200d08ba20e3fe6b4a5970457fb8",
".git/logs/refs/remotes/origin/new": "2f871ff915ad423a3462cae1e989df2d",
".git/logs/refs/remotes/origin/main": "915bac8e3eacd26a0f3bc77f30718d7b",
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
".git/refs/heads/main": "fc3a339c42046ddaab8e454e63c97366",
".git/refs/remotes/origin/new": "eaac052f3ec9d3c18c34423a7ecaae8c",
".git/refs/remotes/origin/main": "fc3a339c42046ddaab8e454e63c97366",
".git/index": "e4111566af1ca9833d7e509b8a9fb96c",
".git/FETCH_HEAD": "0b87bba96089270c392ea83fae006fe2",
"assets/AssetManifest.json": "936d2e8e512489413d19701c594c12c6",
"assets/NOTICES": "0114a28f47ed6044aafe8854df32203e",
"assets/FontManifest.json": "66b71d2bcd2b436ab06cceee43157084",
"assets/AssetManifest.bin.json": "10215f53662de5c68508a0938bb68bf1",
"assets/packages/cupertino_icons/assets/CupertinoIcons.ttf": "e986ebe42ef785b27164c36a9abc7818",
"assets/packages/ionicons/assets/fonts/Ionicons.ttf": "757f33cf07178f986e73b03f8c195bd6",
"assets/shaders/ink_sparkle.frag": "ecc85a2e95f5e9f53123dcaf8cb9b6ce",
"assets/AssetManifest.bin": "e53d08c040100c1c3d989fb9d873ccff",
"assets/fonts/MaterialIcons-Regular.otf": "d9b89054f47852048bbbed6db21de09a",
"assets/assets/file/MasterCV.pdf": "246dd717ab24a9d24ab8cb3c7dfac757",
"assets/assets/images/blur_bg.png": "44b1777ee8f43efcde1e24f0c1c6fc3d",
"assets/assets/images/app_logo/ayam_thumbnail.png": "ecf0aef1f30721cec696db8838952e11",
"assets/assets/images/app_logo/cerita_thumbnail.png": "79788c095ab402611df911e70a988e3d",
"assets/assets/images/app_logo/maranatha_thumbnail.png": "02b225bfb5e755cc3e34b625c0e7cb81",
"assets/assets/images/app_logo/aksara_thumbnail.png": "532982b2232d7a38a20111563e618d89",
"assets/assets/images/app_logo/cars_thumbnail.png": "2b0b019bd5053ce5743709375856804d",
"assets/assets/images/app_logo/healingpod_thumbnail.png": "101bf67c0031137a6738f0c7166044da",
"assets/assets/images/app_logo/Spatia_thumbnail.png": "9c88485e7357c541910428122037cdc8",
"assets/assets/images/app_logo/bedugul_thumbnail.png": "1b02e37e2f63cb5cb30c45dc4b3cbf70",
"assets/assets/images/app_logo/tuyul_thumbnail.png": "7296e206f4bf548318422f8db288959a",
"assets/assets/images/app_logo/bluesharks_thumbnail.png": "3485db0146dd0d782ef568d5002a13f4",
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
"assets/assets/images/app_screenshot/bluesharks_detail.png": "e42500f776901608c5ea5f82eea1e259",
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
"canvaskit/skwasm.js": "ac0f73826b925320a1e9b0d3fd7da61c",
"canvaskit/skwasm.js.symbols": "96263e00e3c9bd9cd878ead867c04f3c",
"canvaskit/canvaskit.js.symbols": "efc2cd87d1ff6c586b7d4c7083063a40",
"canvaskit/skwasm.wasm": "828c26a0b1cc8eb1adacbdd0c5e8bcfa",
"canvaskit/chromium/canvaskit.js.symbols": "e115ddcfad5f5b98a90e389433606502",
"canvaskit/chromium/canvaskit.js": "b7ba6d908089f706772b2007c37e6da4",
"canvaskit/chromium/canvaskit.wasm": "ea5ab288728f7200f398f60089048b48",
"canvaskit/canvaskit.js": "26eef3024dbc64886b7f48e1b6fb05cf",
"canvaskit/canvaskit.wasm": "e7602c687313cfac5f495c5eac2fb324",
"canvaskit/skwasm.worker.js": "89990e8c92bcb123999aa81f7e203b1c",
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

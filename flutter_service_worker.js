'use strict';
const MANIFEST = 'flutter-app-manifest';
const TEMP = 'flutter-temp-cache';
const CACHE_NAME = 'flutter-app-cache';

const RESOURCES = {"flutter.js": "4b2350e14c6650ba82871f60906437ea",
"icons/Icon-512.png": "0cfba4897f0c236ad6c5e4ab19a7b1c9",
"icons/Icon-maskable-512.png": "301a7604d45b3e739efc881eb04896ea",
"icons/Icon-192.png": "0cfba4897f0c236ad6c5e4ab19a7b1c9",
"icons/Icon-maskable-192.png": "c457ef57daa1d16f64b27b786ec2ea3c",
"admin/index.html": "e9291a93ad78274cc37423caec12f519",
"admin/config.yml": "2fa06bc36271e61a169a92fe424179f1",
"manifest.json": "411ba33c4e3d0ef8dadda098be88b47c",
"index.html": "3070d02c71d4d22b97bce1c37aca81a1",
"/": "3070d02c71d4d22b97bce1c37aca81a1",
"assets/shaders/ink_sparkle.frag": "ecc85a2e95f5e9f53123dcaf8cb9b6ce",
"assets/AssetManifest.bin.json": "ea3bd6afaff00b62bd4154d9953f8f1e",
"assets/assets/images/unity_certified_logo.png": "543cc23fb5209c1324e58c64c0757dcc",
"assets/assets/images/projects/appmu_detail.png": "5031a2a94196943c0e372e3cd9254bec",
"assets/assets/images/projects/grun_detail.png": "818bd3f8fc09f50b184e0228d1b55936",
"assets/assets/images/projects/goalawah_detail.png": "aad4358309f4391d5153a13b8776fb52",
"assets/assets/images/projects/ayo_menabung_detail.png": "00dc99efdcf94dc3254280f369194972",
"assets/assets/images/projects/tds_detail.png": "79a2d682b5c6e0093597b25596ef67d0",
"assets/assets/images/projects/bedugul_detail.png": "03ad0c06b27d123d658ccb9c195e707f",
"assets/assets/images/projects/cerita_detail.png": "35640e48ba9c1fa2a8bf8cbfe47367e5",
"assets/assets/images/projects/cativity_detail.png": "28f56c464024b0fee78fa18a9aa6d378",
"assets/assets/images/projects/shimajiro_detail.png": "53d8a93b8bfecdf8c7649bb854ba2f68",
"assets/assets/images/projects/tuyul.png": "edcd3dd5b09d7783aab38a912aa966e2",
"assets/assets/images/projects/rtga_detail.png": "f7bf770388490ceb7ddb5a4f811254d8",
"assets/assets/images/projects/lipi_poleng_detail.png": "5082f5f3169c63be6bd25526b1abaad1",
"assets/assets/images/projects/maranatha_detail.png": "ec851fec2aaed028b2b86796feec67b2",
"assets/assets/images/projects/spatia.png": "e68c5f7c010ac40e92d18ee40447cd6c",
"assets/assets/images/projects/healingpod_detail.png": "529973384806ee439ddee1c58957a788",
"assets/assets/images/projects/ppgo_detail.png": "9bea533abbb0c4f39b0d953db074a878",
"assets/assets/images/projects/bluesharks_detail.png": "e42500f776901608c5ea5f82eea1e259",
"assets/assets/images/projects/lost_egg_detail.png": "46c96a506581c1bd349d92c2fb535c75",
"assets/assets/images/projects/ayam_detail.png": "710ffbf66e5fd94b9cf8b7ae1a6b1701",
"assets/assets/images/projects/minidepo_detail.png": "c54c5086f82902ba90a1dc1f7f04d53e",
"assets/assets/images/projects/aksara_detail.png": "df2c8f94767effe67945e26eb60deeee",
"assets/assets/images/projects/molecular_mastery_detail.png": "28d0815fd0602f3b4563ef5f27f97f30",
"assets/assets/images/projects/secret_bitess_detail.png": "6a9b7c7dab39f0b7b7568fcbf22d7491",
"assets/assets/images/projects/cars_detail.png": "b0b32ed2401c5e3320951f0dcefdf8d0",
"assets/assets/images/profile_picture.png": "fec60eecfaf94308b8ba9f2103c3bb27",
"assets/assets/images/profile_picture.jpeg": "ca7c1e4f0c2416e78cdcc20174c7adb1",
"assets/assets/images/profile_picture_test.png": "00ed6bae834740b931dbebdb4be74021",
"assets/assets/images/1x1_picture.png": "4e4744b18bf2107459c462f66b480c8b",
"assets/assets/images/decoration_sample.jpeg": "262a937267471eed0d4a449ccbe9f093",
"assets/assets/content/projects/pande-putri-go.md": "cfee074161f9880484f132188030e340",
"assets/assets/content/projects/spatia.md": "3bab2369aa567d61810e003d3c0c7b0c",
"assets/assets/content/projects/eternal-night-shift.md": "4528226e125c860e8c0ea6013d370bf8",
"assets/assets/content/projects/lipi-poleng.md": "05b93c90c2b4b08d61d59b7df969be6b",
"assets/assets/content/projects/timedoor-design-system.md": "0fcc4fb9da2267c5b1a72b460163429a",
"assets/assets/content/projects/shimajiro.md": "37a1d1617589134d6cfb62bbfd8409c8",
"assets/assets/content/projects/appmu-indonesia.md": "c81ede61771fadd94b1f68764d4b63c7",
"assets/assets/content/projects/secret-bitess.md": "0f5c4de13cd847a627667e5cc268b106",
"assets/assets/content/projects/lost-egg.md": "d54de8a5885ead7a1a6c7e3c8829d936",
"assets/assets/content/projects/goa-lawah.md": "092811e4111b22738cb46af0709b8cd8",
"assets/assets/content/projects/mini-depo.md": "d9806f97bca5b8903f65503434a9d3f9",
"assets/assets/content/projects/pesta-olahraga.md": "b258e4820e429ff7d29d17e2998f1686",
"assets/assets/content/projects/cativity.md": "ae4f978a6a380ded304f56923d3e8519",
"assets/assets/content/projects/aksara.md": "f6f68f3288c499f4383aeed319e19559",
"assets/assets/content/projects/maranatha-trove.md": "ca94efaa4a2b6f2811d879addc01757d",
"assets/assets/content/projects/healing-pod.md": "dc4b04b5288e8b8ae50aa15792ba4c81",
"assets/assets/content/projects/grun.md": "313192c1a46f90c2ba6c34f1b03eee93",
"assets/assets/content/projects/menunggu-ayah-pulang.md": "2043288feaa8687f97c9072415a6567c",
"assets/assets/content/projects/koto-bluesharks.md": "117b0a238aab342887f95f8afd57d92e",
"assets/assets/content/projects/cars.md": "7e663840e709c9926705c0dcc6995f4e",
"assets/assets/content/projects/ayo-menabung.md": "b9afbde790b817c9615166f6978b4457",
"assets/assets/content/projects/bedugul-forest.md": "f79c95078649fcf2b16205b981801671",
"assets/assets/content/projects/molecule-mastery.md": "3f11dee98dcd3f911bb115882b2e1b02",
"assets/assets/content/projects/cerita-rakyat-bali.md": "3ebb740522e3fea411c763f6824ea729",
"assets/assets/content/profile.json": "ed006938139d6f47d4c13c5142eb66de",
"assets/assets/content/projects.json": "2e6e62e3cdcb80763a13c63606c5b310",
"assets/fonts/MaterialIcons-Regular.otf": "5096494667bb36dbabcaf4c6b8706cdd",
"assets/NOTICES": "fd626406ac37ba2643e12b4b62ef1213",
"assets/packages/cupertino_icons/assets/CupertinoIcons.ttf": "e986ebe42ef785b27164c36a9abc7818",
"assets/packages/font_awesome_flutter/lib/fonts/fa-brands-400.ttf": "6f12a24908839d92ee74f1167a7dba6d",
"assets/packages/font_awesome_flutter/lib/fonts/fa-regular-400.ttf": "5d424a84ac80760175a3638412945dd1",
"assets/packages/font_awesome_flutter/lib/fonts/fa-solid-900.ttf": "269f971cec0d5dc864fe9ae080b19e23",
"assets/FontManifest.json": "5a32d4310a6f5d9a6b651e75ba0d7372",
"assets/AssetManifest.bin": "5c284d0ae6172d241e725444f600a50d",
"assets/AssetManifest.json": "2d5a8a4ee00870201c969bb42c476964",
"canvaskit/chromium/canvaskit.wasm": "ea5ab288728f7200f398f60089048b48",
"canvaskit/chromium/canvaskit.js": "b7ba6d908089f706772b2007c37e6da4",
"canvaskit/chromium/canvaskit.js.symbols": "e115ddcfad5f5b98a90e389433606502",
"canvaskit/skwasm.worker.js": "89990e8c92bcb123999aa81f7e203b1c",
"canvaskit/skwasm.js": "ac0f73826b925320a1e9b0d3fd7da61c",
"canvaskit/canvaskit.wasm": "e7602c687313cfac5f495c5eac2fb324",
"canvaskit/canvaskit.js": "26eef3024dbc64886b7f48e1b6fb05cf",
"canvaskit/skwasm.wasm": "828c26a0b1cc8eb1adacbdd0c5e8bcfa",
"canvaskit/canvaskit.js.symbols": "efc2cd87d1ff6c586b7d4c7083063a40",
"canvaskit/skwasm.js.symbols": "96263e00e3c9bd9cd878ead867c04f3c",
"favicon.png": "0cfba4897f0c236ad6c5e4ab19a7b1c9",
"flutter_bootstrap.js": "85ba9eab0433ec17ee2bd201cd568bfa",
"version.json": "46242dcbe6edc39f8fa43704a6393ee0",
"main.dart.js": "a06dac81b889ba83a87f8499e2593db0"};
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

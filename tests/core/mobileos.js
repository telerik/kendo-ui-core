(function(){

var detect = kendo.support.detectOS;
var detectBrowser = kendo.support.detectBrowser;
var dpr = kendo.support.devicePixelRatio;
var sw = kendo.support.screenWidth;
var sh = kendo.support.screenHeight;
var span;

module("detect", {
    teardown: function() {
        kendo.support.screenWidth = sw;
        kendo.support.screenHeight = sh;
        kendo.support.devicePixelRatio = dpr;
   }
});

test("detect IE11 as IE", function() {
    var result = detectBrowser("Mozilla/5.0 (Windows NT 6.3; Trident/7.0; rv:11.0) like Gecko");

    ok(result.msie);
    ok(result.version == 11);
});

test("detects Kindle Fire and as a tablet", function() {
    kendo.support.screenWidth = 1024;
    kendo.support.screenHeight = 600;
    var result = detect("Mozilla/5.0 (Macintosh; U; Intel Mac OS X 10_6_3; en-us; Silk/1.1.0-84) AppleWebKit/533.16 (KHTML, like Gecko) Version/5.0 Safari/533.16 Silk-Accelerated=true");

    ok(result.device == "fire");
    ok(result.flatVersion == 110);
    ok(result.android);
    ok(result.tablet);
});

test("detects Android 2.x (Nexus S) and as a phone", function() {
    kendo.support.screenWidth = 480;
    kendo.support.screenHeight = 800;
    kendo.support.devicePixelRatio = 1.5;
    var result = detect("Mozilla/5.0 (Linux; U; Android 2.3.4; fr-fr; Nexus S Build/GRJ22) AppleWebKit/533.1 (KHTML, like Gecko) Version/4.0 Mobile Safari/533.1");

    ok(result.device == "android");
    ok(result.majorVersion == 2);
    ok(result.flatVersion == 234);
    ok(result.android);
    ok(!result.tablet);
});

test("detects Android 3.x (Motorola Xoom) and as a tablet", function() {
    kendo.support.screenWidth = 1280;
    kendo.support.screenHeight = 800;
    var result = detect("Mozilla/5.0 (Linux; U; Android 3.0.1; en-us; Xoom Build/HWI69) AppleWebKit/534.13 (KHTML, like Gecko) Version/4.0 Safari/534.13");

    ok(result.device == "android");
    ok(result.majorVersion == 3);
    ok(result.flatVersion == 301);
    ok(result.android);
    ok(result.tablet);
});

test("detects Android 4.x (Galaxy Nexus) and as a phone", function() {
    kendo.support.screenWidth = 720;
    kendo.support.screenHeight = 1280;
    kendo.support.devicePixelRatio = 2;
    var result = detect("Mozilla/5.0 (Linux; U; Android 4.0.2; en-us; Galaxy Nexus Build/ICL53F) AppleWebKit/534.30 (KHTML, like Gecko) Version/4.0 Mobile Safari/534.30");

    ok(result.device == "android");
    ok(result.majorVersion == 4);
    ok(result.flatVersion == 402);
    ok(result.android);
    ok(!result.tablet);
});

test("detects iOS 3.x (iPhone) and as a phone", function() {
    var result = detect("Mozilla/5.0 (iPhone; U; CPU iPhone OS 3_1_2 like Mac OS X; en-us) AppleWebKit/528.18 (KHTML, like Gecko) Version/4.0 Mobile/7D11 Safari/528.16");

    ok(result.device == "iphone");
    ok(result.majorVersion == 3);
    ok(result.flatVersion == 312);
    ok(result.ios);
    ok(!result.tablet);
});

test("detects iOS 4.x (iPad) and as a tablet", function() {
    var result = detect("Mozilla/5.0 (iPad; U; CPU OS 4_3_1 like Mac OS X; en-us) AppleWebKit/533.17.9 (KHTML, like Gecko) Version/5.0.2 Mobile/8G4 Safari/6533.18.5");

    ok(result.device == "ipad");
    ok(result.majorVersion == 4);
    ok(result.flatVersion == 431);
    ok(result.ios);
    ok(result.tablet);
});

test("detects iOS 5.x (iPhone) and as a phone", function() {
    var result = detect("Mozilla/5.0 (iPhone; CPU iPhone OS 5_1 like Mac OS X) AppleWebKit/534.46 (KHTML, like Gecko) Version/5.1 Mobile/9B176 Safari/7534.48.3");

    ok(result.device == "iphone");
    ok(result.majorVersion == 5);
    ok(result.flatVersion == 510);
    ok(result.ios);
    ok(!result.tablet);
});

test("detects BlackBerry PlayBook 2.x and as a tablet", function() {
    var result = detect("Mozilla/5.0 (PlayBook; U; RIM Tablet OS 2.0.1; en-US) AppleWebKit/535.8+ (KHTML, like Gecko) Version/7.2.0.1 Safari/535.8+");

    ok(result.device == "playbook");
    ok(result.majorVersion == 2);
    ok(result.flatVersion == 201);
    ok(result.blackberry);
    ok(result.tablet);
});

test("detects BlackBerry Torch 9860 and as a phone", function() {
    var result = detect("Mozilla/5.0 (BlackBerry; U; BlackBerry 9860; en-GB) AppleWebKit/534.11+ (KHTML, like Gecko) Version/7.0.0.296 Mobile Safari/534.11+");

    ok(result.device == "blackberry");
    ok(result.majorVersion == 7);
    ok(result.flatVersion == 700);
    ok(result.blackberry);
    ok(!result.tablet);
});

test("detects Nokia N9 and as a phone", function() {
    var result = detect("Mozilla/5.0 (MeeGo; NokiaN9) AppleWebKit/534.13 (KHTML, like Gecko) NokiaBrowser/8.5.0 Mobile Safari/534.13");

    ok(result.device == "meego");
    ok(result.majorVersion == 8);
    ok(result.flatVersion == 850);
    ok(result.meego);
    ok(!result.tablet);
});

test("detects Windows Phone 7.5 and as a phone", function() {
    var result = detect("Mozilla/5.0 (compatible; MSIE 9.0; Windows Phone OS 7.5; Trident/5.0; IEMobile/9.0; NOKIA; Lumia 800)");

    ok(result.device == "wp");
    ok(result.majorVersion == 7);
    ok(result.flatVersion == 750);
    ok(result.wp);
    ok(!result.tablet);
});

test("detects Windows Phone 8 and as a phone", function() {
    var result = detect("Mozilla/5.0 (compatible; MSIE 10.0; Windows Phone 8.0; Trident/6.0; IEMobile/10.0; ARM; Touch; NOKIA; Lumia 920)");

    ok(result.device == "wp");
    ok(result.majorVersion == 8);
    ok(result.flatVersion == 800);
    ok(result.wp);
    ok(!result.tablet);
});

test("detects Windows Phone 8.1 and as a phone", function() {
    var result = detect("Mozilla/5.0 (Windows Phone 8.1; ARM; Trident/7.0; Touch; rv:11; IEMobile/11.0) like Android 4.1.2; compatible) like iPhone OS 7_0_3 Mac OS X WebKit/537.36 (KHTML, like Gecko) Chrome/32.0.1700.99 Mobile Safari /537.36");

    ok(result.device == "wp");
    ok(result.majorVersion == 8);
    ok(result.minorVersion == 1);
    ok(result.flatVersion == 810);
    ok(result.wp);
    ok(!result.tablet);
});

test("detects Opera Mobile", function() {
    var result = detect("Opera/9.80 (Android 2.3.3; Linux; Opera Mobi/ADR-1111101157; U; es-ES) Presto/2.9.201 Version/11.50");

    ok(result.browser == "omobile");
    ok(result.majorVersion == 2);
    ok(result.flatVersion == 233);
    ok(result.android);
});

test("detects Opera Mini", function() {
    var result = detect("Opera/9.80 (Android; Opera Mini/7.29530/27.1407; U; en) Presto/2.8.119 Version/11.10");

    ok(result.browser == "omini");
    ok(result.majorVersion == 7);
    ok(result.flatVersion == 729);
    ok(result.android);
});

test("detects Firefox Mobile 9", function() {
    var result = detect("Mozilla/5.0 (Android; Linux armv7l; rv:9.0) Gecko/20111216 Firefox/9.0 Fennec/9.0");

    ok(result.browser == "firefox");
    ok(result.majorVersion == 9);
    ok(result.flatVersion == 900);
    ok(result.android);
});

test("detects Firefox Mobile 12", function() {
    var result = detect("Mozilla/5.0 (Android; Mobile; rv:12.0) Gecko/12.0 Firefox/12.0");

    ok(result.browser == "firefox");
    ok(result.majorVersion == 12);
    ok(result.flatVersion == 1200);
    ok(result.android);
});

test("detects Nexus 7 and as a tablet", function() {
    kendo.support.screenWidth = 1280;
    kendo.support.screenHeight = 800;
    kendo.support.devicePixelRatio = 1.33;
    var result = detect("Mozilla/5.0 (Linux; Android 4.1.1; Nexus 7 Build/JRO03D) AppleWebKit/535.19 (KHTML, like Gecko) Chrome/18.0.1025.166  Safari/535.19");

    ok(result.device == "android");
    ok(result.majorVersion == 4);
    ok(result.flatVersion == 411);
    ok(result.android);
    ok(result.tablet);
});

test("detects Nexus 10 and as a tablet", function() {
    kendo.support.screenWidth = 2560;
    kendo.support.screenHeight = 1600;
    kendo.support.devicePixelRatio = 2;
    var result = detect("Mozilla/5.0 (Linux; U; Android 4.2; en-us; Nexus 10 Build/JVP15I) AppleWebKit/534.30 (KHTML, like Gecko) Version/4.0 Safari/534.30");

    ok(result.device == "android");
    ok(result.majorVersion == 4);
    ok(result.flatVersion == 420);
    ok(result.android);
    ok(result.tablet);
});

test("detects Acer A100 and as a tablet", function() {
    kendo.support.screenWidth = 1024;
    kendo.support.screenHeight = 600;
    var result = detect("Mozilla/5.0 (Linux; U; Android 3.0; xx-xx; A100 Build/HRI66) AppleWebKit/534.13 (KHTML, like Gecko) Version/4.0 Safari/534.13");

    ok(result.device == "android");
    ok(result.majorVersion == 3);
    ok(result.flatVersion == 300);
    ok(result.android);
    ok(result.tablet);
});

test("detects Asus Padfone 2 and as a phone", function() {
    kendo.support.screenWidth = 720;
    kendo.support.screenHeight = 1280;
    kendo.support.devicePixelRatio = 2;
    var result = detect("Mozilla/5.0 (Linux; Android 4.0.4; PadFone 2 Build/IMM76I) AppleWebKit/535.19 (KHTML like Gecko) Chrome/18.0.1025.166 Mobile Safari/535.19");

    ok(result.device == "android");
    ok(result.majorVersion == 4);
    ok(result.flatVersion == 404);
    ok(result.android);
    ok(!result.tablet);
});

test("detects Motorola Droid DNA and as a phone", function() {
    kendo.support.screenWidth = 1080;
    kendo.support.screenHeight = 1920;
    kendo.support.devicePixelRatio = 2.75;
    var result = detect("Mozilla/5.0 (Linux; U; Android 4.1.1; es-es; HTC_Droid_DNA/1.26.161.2 Build/IML74K) AppleWebKit/534.30 (KHTML, like Gecko) Version/4.0 Mobile Safari/534.30");

    ok(result.device == "android");
    ok(result.majorVersion == 4);
    ok(result.flatVersion == 411);
    ok(result.android);
    ok(!result.tablet);
});

test("detects Kindle Fire HD and as a tablet", function() {
    kendo.support.screenWidth = 1280;
    kendo.support.screenHeight = 800;
    kendo.support.devicePixelRatio = 1.33;
    var result = detect("Mozilla/5.0 (Linux; U; en-us; KFTT Build/IML74K) AppleWebKit/535.19 (KHTML, like Gecko) Silk/2.2 Safari/535.19 Silk-Accelerated=true");

    ok(result.device == "fire");
    ok(result.majorVersion == 2);
    ok(result.flatVersion == 220);
    ok(result.android);
    ok(result.tablet);
});

test("detects Transformer Pad Infinity and as a tablet", function() {
    kendo.support.screenWidth = 1920;
    kendo.support.screenHeight = 1200;
    kendo.support.devicePixelRatio = 1.4;
    var result = detect("Mozilla/5.0 (Linux; U; Android 4.1.2; en-us; Transformer Pad Infinity TF700T Build/JZO54K; CyanogenMod-10) AppleWebKit/534.30 (KHTML, like Gecko) Version/4.0 Safari/534.30");

    ok(result.device == "android");
    ok(result.majorVersion == 4);
    ok(result.flatVersion == 412);
    ok(result.android);
    ok(result.tablet);
});
}());

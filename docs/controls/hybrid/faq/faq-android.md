---
title: Android-Specific FAQ
page_title: Android-Specific FAQ | Kendo UI Hybrid Components
description: "Check out the frequently asked questions and their answers about how Kendo UI hybrid components work and behave on the Android platform."
slug: android_specific_faq
position: 3
---

# Android-Specific FAQ

This is a collection of frequently asked questions and their answers about how Kendo UI hybrid mobile components work and behave on the Android platform.

## List of FAQ

### I have WebKit mask icons in my application and in some places Android renders them as colored squares. Why?

WebKit mask icons break in Android when mixed with CSS3 transforms, which the Hybrid UI Scroller uses, and the TabStrip.

### I have an Android 4.0 device and the Hybrid UI View transitions while very smooth seem to start much slower than on Android 2.x. Why?

The rendering hardware acceleration that Android 4.0 has indeed performs much better than Android 2.x for View transitions. However, the preparation of the hardware accelerated layer that runs the animation takes considerable time. Your application would be actually much more responsive if you disable the hardware acceleration from the manifest file.

For more information on this issue, check the [article on performance](P% slug performance_hybridkendoui %).

### I have some inputs with type date and time. When I test on Jelly Bean, I can see date/time pickers in the browser, but they do not work in PhoneGap. Wh?

By default, the Hybrid UI framework does not have integrated date/time pickers as many platforms already support them, excluding iOS 4.x, all Android versions, and now Windows Phone 8. The default browser on Nexus 7 is Chrome, which supports native HTML5 date/time pickers. However, PhoneGap still uses the old WebKit found on previous Android devices that does not support native pickers. To work around this issue, use the input validation, or an external picker library.

## See Also

Other articles on frequently asked questions about the Hybrid UI components:

* [All Platforms FAQ]({% slug all_platforms_faq %})
* [iOS-Specific FAQ]({% slug ios_specific_faq %})
* [Blackberry-Specific FAQ]({% slug blackberry_specific_faq %})
* [Windows Phone 8 FAQ]({% slug windowsphone8_specific_faq %})

---
title: iOS-Specific FAQ
page_title: iOS-Specific FAQ | Kendo UI Hybrid Components
description: "Check out the frequently asked questions and their answers about how Kendo UI hybrid components work and behave on the iOS platform."
slug: ios_specific_faq
position: 2
---

# iOS-Specific FAQ

This is a collection of frequently asked questions and their answers about how Kendo UI hybrid mobile components work and behave on the iOS platform.

## List of FAQ

### I run a PhoneGap application in iOS7 and the status bar overlays my NavBar. Why?

According to the [official iOS7 design guidelines](https://developer.apple.com/library/ios/documentation/UserExperience/Conceptual/MobileHIG/Bars.html#//apple_ref/doc/uid/TP40006556-CH12-SW1), the iOS7 status bar should be transparent and always visible. The Hybrid UI allows this by using the [`statusBarStyle` option of the Application]({% slug overview_hybridapplication %}#hide-status-bar-in-ios-and-cordova) set to `black-transparent`. If you still wish to use the old black non-transparent status bar style, change it through the PhoneGap XCode project's [plist](http://stackoverflow.com/a/4053237/258445).

### My TabStrip looks different on different versions of the iOS or even between iPad and iPhone. Why?

The Hybrid UI framework tries to match the native look of several iOS platform versions and devices. Thus, some widgets look slightly different on iOS 5 versus iOS 6. Additionally, tablet and phone styling is slightly different too. If you want to have the same styling on all iOS devices, choose the one you want and force it through the Application `platform` option.

## See Also

Other articles on frequently asked questions about the Hybrid UI components:

* [All Platforms FAQ]({% slug all_platforms_faq %})
* [Android-Specific FAQ]({% slug android_specific_faq %})
* [Blackberry-Specific FAQ]({% slug blackberry_specific_faq %})
* [Windows Phone 8 FAQ]({% slug windowsphone8_specific_faq %})

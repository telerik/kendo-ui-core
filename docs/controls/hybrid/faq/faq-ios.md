---
title: Frequently Asked Questions
page_title: Kendo UI Mobile Frequently Asked Questions
description: Answers to Frequently Asked Questions about how Kendo UI mobile works and behaves
position: 2
---

# Frequently Asked Questions

This is a collection of frequently asked questions about how Kendo UI mobile framework works and behaves.

## iOS

### Q: I run a PhoneGap application in iOS7 and the status bar overlays my NavBar, what gives?

A: According to the [official iOS7 design guidelines](https://developer.apple.com/library/ios/documentation/UserExperience/Conceptual/MobileHIG/Bars.html#//apple_ref/doc/uid/TP40006556-CH12-SW1),
the iOS7 status bar should be transparent and always visible. Kendo Mobile allows this by using the [Application's statusBarStyle option](/mobile/application#seamless-status-bar-in-ios7)
set to "black-transparent". If you still wish to use the old black non-transparent status bar style, you can change it through the PhoneGap XCode project's [plist](http://stackoverflow.com/a/4053237/258445).

### Q: My TabStrip looks different on different versions of the OS or even between iPad and iPhone, why?

A: Kendo UI Mobile tries to match the native look of several iOS platform versions and devices. Thus some widgets look slightly different on iOS 5 versus iOS 6.
Additionally tablet and phone styling is slightly different too. If you want to have the same styling on all iOS devices, choose the one you want and force it
through the Application [platform](./mobile/application#force-ios-5-look) option.

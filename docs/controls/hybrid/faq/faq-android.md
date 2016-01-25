---
title: Frequently Asked Questions
page_title: Kendo UI Mobile Frequently Asked Questions
description: Answers to Frequently Asked Questions about how Kendo UI mobile works and behaves
position: 3
---

# Frequently Asked Questions

This is a collection of frequently asked questions about how Kendo UI mobile framework works and behaves.

## Android

### Q: I have WebKit mask icons in my application and in some places Android renders them as colored squares?

A: WebKit mask icons break in Android when mixed with CSS3 transforms which our Scroller uses and the TabStrip.

### Q: I have an Android 4.0 device and Kendo UI Mobile View transitions while very smooth seem to start much slower than on Android 2.x

A: The rendering hardware acceleration that Android 4.0 has does indeed perform much better than Android 2.x for View transitions, but the preparation of the hardware accelerated
layer that runs the animation takes considerable time. Your application will actually be much more responsive if you disable the hardware acceleration from the manifest file.
Check the [Performance](./mobile/performance) article for more information about that.

### Q: I have some inputs with type date and time. When I test on Jelly Bean, I can see date/time pickers in the browser, but they don't work in PhoneGap, why so?

A: By default Kendo UI Mobile doesn't have integrated date/time pickers as many platforms already support them, excluding iOS 4.x, all Android versions and now WP8.

The default browser on Nexus 7 is Chrome which supports native HTML5 date/time pickers. However PhoneGap still uses the old WebKit found on previous Android devices that
doesn't support native pickers. To work around that you can use input validation or an external picker library.

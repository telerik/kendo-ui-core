---
title: Blackberry-Specific FAQ
page_title: Blackberry-Specific FAQ | Kendo UI Hybrid Components
description: "Check out the frequently asked questions and their answers about how Kendo UI hybrid components work and behave on the Blackberry platform."
slug: blackberry_specific_faq
position: 4
---

# Blackberry-Specific FAQ

This is a collection of frequently asked questions and their answers about how Kendo UI hybrid mobile components work and behave on the Blackeberry platform.

## List of FAQ

### I have WebKit mask icons in my application and they are rendered as squares in BlackBerry OS 7.0. Why?

WebKit masks are completely broken in BlackBerry OS 7.0, though they work fine in 6.x and 7.1. Either use font icons, or normal images.

### My trackball does not seem to work properly. How do I scroll?

The Hybrid UI framework supports only touchscreen BlackBerry devices. The trackball/pad that can be found on the older phone models fires mouse events&mdash;which are handled&mdash;but
does not support content dragging. This limitation is listed in the requirement for the Hybrid UI.

## See Also

Other articles on frequently asked questions about the Hybrid UI components:

* [All Platforms FAQ]({% slug all_platforms_faq %})
* [iOS-Specific FAQ]({% slug ios_specific_faq %})
* [Android-Specific FAQ]({% slug android_specific_faq %})
* [Windows Phone 8 FAQ]({% slug windowsphone8_specific_faq %})

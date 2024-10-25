---
title: Windows Phone 8 FAQ
page_title: Windows Phone 8 FAQ | Kendo UI Hybrid Components
description: "Check out the frequently asked questions and their answers about how Kendo UI hybrid components work and behave on the Windows Phone 8 platform."
slug: windowsphone8_specific_faq
position: 5
---

# Windows Phone 8 FAQ

>Starting with the R2 2023 release, Kendo UI will no longer ship Hybrid UI components. This means that the R2 2023 will be the last release to include Kendo Hybrid in the Kendo UI package. See full announcement in [Kendo jQuery blog post](https://www.telerik.com/blogs/r2-2023-kendo-ui-release#end-of-support-announcements). The last stable version that we recommend to use for Kendo Hybrid components is [R3 2022 SP1](https://www.telerik.com/support/whats-new/kendo-ui/release-history/kendo-ui-r3-2022-sp1-(version-2022-3-1109)).
>
>[What's New in Kendo UI R2 2023](https://www.telerik.com/blogs/r2-2023-kendo-ui-release#kendo-ui-for-jquery)

This is a collection of frequently asked questions and their answers about how Kendo UI hybrid mobile components work and behave on the Windows Phone 8 platform.

## List of FAQ

### My icons do not render in Windows Phone 8 PhoneGap or HTML5 apps. Can I do something about it?

Local web fonts are not loaded in Windows Phone 8 (WP8) HTML5/PhoneGap apps or fonts loaded from local CSS. According to some sources, external CSS should load web fonts, but Kendo UI is not able to confirm this. As a workaround, use normal images for icons in WP8 HTML5/PhoneGap applications.

### I get a grey background when I click on a link or label in Hybrid UI under WP8. Why?

By default, WP8 highlights all links when they are active (hold down). Stopping this behavior requires manually adding a meta tag to your application/site&mdash;adding the tag through JavaScript is ignored.

The example below demonstrates the meta tag you need to add to work around this issue.



    <meta name="msapplication-tap-highlight" content="no" />

### When I change the WP8 theme, my application starts to look different. Why?

The Hybrid UI framework adapts to the current theme in WP8 and changes the background and highlight colors of your application. In the browser this is semi-automatic when you click inside the application to focus it, but in PhoneGap it happens automatically on the application resume after you change the theme.

## See Also

* [All Platforms FAQ]({% slug all_platforms_faq %})
* [iOS-Specific FAQ]({% slug ios_specific_faq %})
* [Android-Specific FAQ]({% slug android_specific_faq %})
* [Blackberry-Specific FAQ]({% slug blackberry_specific_faq %})

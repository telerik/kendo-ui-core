---
title: All Platforms FAQ
page_title: All Platforms FAQ | Kendo UI Hybrid Components
description: "Check out the frequently asked questions and their answers about how Kendo UI hybrid components generally work and behave on all platforms."
slug: all_platforms_faq
previous_url: /kendo-mobile-faq
position: 1
---

# All Platforms FAQ

This is a collection of frequently asked questions (FAQ) and their answers about how Kendo UI hybrid mobile components generally work and behave on all platforms.

## List of FAQ

### Can I use the Kendo UI web mobile widget skins from Q1 2014 with Kendo UI mobile platform themes?

No. They are incompatible. The reason for this is that Kendo UI web skins do not have skin names as a class selector and their styling is affecting everything in your page and application. They also partially override the existing Kendo UI hybrid mobile platform themes. You can use them in the Hybrid UI only, if you do not use the Hybrid UI platform themes at all, including the common CSS&mdash;the web skins already have everything needed.

### My icons are missing, replaced with strange symbols and my iOS Back button does not look OK. Why?

The Hybrid UI stylesheets need the `images` subfolder to load the icon font and the **Back** button mask. Copy them over with your stylesheets.

### I have a button with an onclick event attached, but the event does not fire every time. Why?

Due to issues related to simultaneous handling of `mouse` and `touch` events on hybrid devices, the Hybrid UI has strict requirements for events. You can attach your handler to the Button's own `click` event.

### I have several text entry forms in my application, but I experience strange issues in Android and WP8. Why?

Android has severe problems with input elements, especially when mixed with CSS3 transforms, which the hybrid mobile Kendo UI Scroller uses for faster animation. Windows Phone 8 on the other hand switches off transforms when an input element is focused, thus stopping any scrolling and resetting the scroller to top. Check the [article on form elements]({% slug forms_hybridkendoui %}) for more information about both topics. To avoid these issues, refer to View's [`useNativeScroller`](/api/javascript/mobile/ui/view#configuration-useNativeScrolling) configuration option, or the Scroller's [`useNative`](/api/javascript/mobile/ui/scroller#configuration-useNative) option, which is available as of Kendo UI Q1 2013.

### My application looks different in all platforms. Why?

The Hybrid UI framework strives to achieve native-like styling for the different platforms, hence the styling is completely different and tries to match the current device styling automatically. If you want to have the same styling on all devices, choose the one you want, and force it through the Application `platform` option.

### I defined a layout for each View, but it disappears after the user navigates. Why?

This can happen when the Hybrid UI Application is initialized multiple times. For example, when the initialization occurs in the `Layout.cshtml` page of an ASP.NET MVC project. The mobile application should be initialized only once to be able to function properly.

### Widget event fires multiple times. Why?

This can happen when the Hybrid UI widget is initialized multiple times. A common mistake is to build the widget at the `show` event of the View. Hybrid UI widgets should be initialized only once&mdash;at the `init` event of their View, or via the data-attributes in the markup.

## See Also

Other articles on frequently asked questions about the Hybrid UI components:

* [All Platforms FAQ]({% slug all_platforms_faq %})
* [iOS-Specific FAQ]({% slug ios_specific_faq %})
* [Android-Specific FAQ]({% slug android_specific_faq %})
* [Blackberry-Specific FAQ]({% slug blackberry_specific_faq %})
* [Windows Phone 8 FAQ]({% slug windowsphone8_specific_faq %})

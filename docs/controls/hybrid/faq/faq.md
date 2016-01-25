---
title: Frequently Asked Questions
page_title: Kendo UI Mobile Frequently Asked Questions
description: Answers to Frequently Asked Questions about how Kendo UI mobile works and behaves
previous_url: /kendo-mobile-faq
position: 1
---

# Frequently Asked Questions

This is a collection of frequently asked questions about how Kendo UI mobile framework works and behaves.

## All platforms

### Q: Can I use the Kendo UI Web mobile widget skins from Q1 2014 with Kendo UI Mobile platform themes?

A: _**No. They are incompatible.**_ The reason for this is that Kendo UI Web skins don't have skin names as a class selector and their styling is affecting everything in your page/app. They will also partially
override the existing Kendo UI Mobile platform themes. You can use them in Kendo UI Mobile only, if you don't use the Kendo UI Mobile platform themes at all, including the common CSS -
the Web skins already have everything needed.

### Q: My icons are missing, replaced with strange symbols and my iOS back button doesn't look okay. What am I missing?

A: Kendo UI Mobile stylesheets need the **images** subfolder to load the icon font and the back button mask. Please copy them over with your stylesheet(s).

### Q: I have a button with an onclick event attached, but the event doesn't fire every time?

A: Due to issues with simultaneous handling of mouse and touch events on hybrid devices, Kendo UI Mobile has strict requirements for events.
You can attach your handler to the Button's own click event.

### Q: I have several text entry forms in my application, but I experience strange issues in Android and WP8, what is going on?

A: Android has severe problems with input elements, especially when mixed with CSS3 transforms (which our mobile scroller uses for faster animation).
WP8 on the other hand switches off transforms when an input element is focused, thus stopping any scrolling and resetting the scroller to top.
Check the [Forms](./mobile/forms) article for more information about both. To avoid these issues, refer to View's [useNativeScroller](../api/mobile/view#configuration-useNativeScrolling)
config option or Scroller's [useNative](../api/mobile/scroller#configuration-useNative) option (available since Q1 2013).

### Q: My application looks different in all platforms, why is that?

A: Kendo UI Mobile strives to achieve native-like styling for the different platforms, hence the styling is completely different and tries to match the current device
styling automatically. If you want to have the same styling on all devices, choose the one you want and force it
through the Application [platform](./mobile/application#force-ios-5-look) option.

### Q: I defined a layout for each View, but it disappears after the user navigates, why is that?

A: This can happen when Kendo UI Mobile application is initialized multiple times - like for instance when the initialization occurs
in the _Layout.cshtml page of an ASP.NET MVC project. Mobile application should be initialized only once to be able to function properly.

### Q: Widget event fires multiple times, why is that?

A: This can happen when the mobile widget is initialized multiple times. A common mistake that developers make is to build the widget at the show event of the View. Kendo UI Mobile widgets should be initialized **only once** - at the init event of their View **or** via data-attributes in the mark-up.

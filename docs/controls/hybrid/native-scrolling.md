---
title: Native Scrolling
page_title: Native Scrolling | Hybrid Kendo UI
description: "Learn more about the native scrolling configuration option in hybrid Kendo UI widgets."
slug: nativescrolling_hybrid_kendoui
---

# Native Scrolling

As of Kendo UI 2013 Q3, the [hybrid Kendo UI Application widget](http://demos.telerik.com/kendo-ui/m/index#application/loadingpopup) supports the `useNativeScrolling` configuration option, which is set to `false` by default. The introduction of this new feature is mostly due to the changes in browser behavior that were introduced in iOS7. The option, however, can be enabled on other platforms too.

## Scrolling Mechanisms

### JavaScript Emulation

Due to historical reasons, the default scrolling functionality in the hybrid Kendo UI widgets is based on JavaScript. Generally, the JavaScript scrolling emulation manually implements the Touch event-handling and changes the positions of the DOM elements.

### CSS Solution

You can also use the `overflow: auto`-emulated scrolling mechanism. By default, the Hybrid UI Application uses [flexbox](http://www.w3.org/TR/css3-flexbox/) for its general layout and the layout of the mobile views it displays. Each mobile view is stretched to fit the application container&mdash;which, again by default, is the `body` DOM element&mdash;by applying the `width: 100%; height: 100%;` CSS declarations.

The view header, footer, and content are positioned using the `flex-direction: column` property. The view content is made scrollable by using the default native browser scroller set by the `overflow: auto` CSS property&mdash;which triggers the native browser scrolling&mdash;and the `-webkit-overflow-scrolling: touch` CSS declaration.

Scrolling of the view content can be also implemented by initializing the [Kendo UI Hybrid Scroller widget](http://demos.telerik.com/kendo-ui/m/index#scroller/index) as explained further in this article.

## Native Scrolling Mode

### Overview

The [hybrid Kendo UI Application](/controls/hybrid/application) consists of a single HTML page with one or more mobile Views. It automatically instantiates a [hybrid Kendo UI View](/controls/hybrid/view) or each element with a `role` data attribute set to `view`. The View represents a screen in a mobile application.

Native scrolling is enabled on a view and application level through configuring the `useNativeScrolling` option. The application level native scrolling mode relies on the window level scroller&mdash;on a content element with the `overflow: auto` CSS property. The view level native scrolling relies on the window level scroller and changes the way the header, footer, or content elements are positioned.

When `useNativeScrolling` on a view level is enabled by setting it to `true`, the view header and footer acquire a fixed position through the `position: fixed` CSS declaration. However, the scrolling of the content is fully managed by the default native browser scroller and the view content vertical padding is adjusted to match the header and footer height.

If you want to avoid the default browser scroller behavior, you are able to wrap the view content of any element and widget in a [hybrid Kendo UI Scroller](http://demos.telerik.com/kendo-ui/m/index#scroller/index). The hybrid Kendo UI Scroller itself takes care of the hybrid Kendo UI native scrolling because of its `useNative` configuration option. The `useNativeScrolling` configuration option on the view level is just a proxy for it. Enabling the `useNative` option actually takes over the functions that the native browser scroller has in the emulated scrolling mode and transfers them to the hybrid Scroller.

### Getting Started

The example below demonstrates a hybrid application with the native scrolling configuration option enabled.

###### Example

    <div data-role="view">
        <header data-role="header">
            <h1>Header</h1>
        </header>
        <div style="height: 2000px"> Tall content </div>
        <footer data-role="footer">
            <h2>Footer</h2>
        </footer>
    </div>

    <script>
        new kendo.mobile.Application(document.body, { useNativeScrolling: true });
    </script>

### Advantages

* Most mobile operating systems and some mobile browsers automatically hide address-bar or tab-bar components when the user scrolls through the page. Using native scrolling enables this behavior.
* Native scrolling performs smoother and faster as compared to the JavaScript or `overflow: auto` scrolling emulations.
* On Android 2.2.* form elements exhibit erratic behavior when you apply the JavaScript scrolling emulation, while the `overflow: auto` scrolling emulation does not work at all. Native scrolling resolves this issue.
* In the JavaScript-based scrolling solution the default browser scroll-into-view behavior and the soft keyboard do not interact well.

### Known Limitations

* The native scrolling hint is visible over the view header and footer contents.
* Features which depend on the JavaScript scrolling emulation, such as the ListView Pull to Refresh, Press to Load More, Fixed Headers, and others, are not supported.
* When native scrolling is enabled, the hybrid View does not initialize a hybrid Scroller and View or Application `scroller` field returns `null`.
* The hybrid Kendo UI Drawer widget does not support content scrolling.
* Scrolling in one view and navigating to another preserves the scrolled offset. This behavior can be changed by calling [`scrollTo`](https://developer.mozilla.org/en-US/docs/Web/API/window.scrollTo) in the view after the `show` event handler.
* The tablet specific widgets, such as the hybrid Kendo UI Popover and SplitView, are not supported.
* In iOS7 the bottom toolbar is shown (when hidden) whenever the user taps closely to the bottom of the screen. If you have a TabStrip there, it is going to require 2 taps to activate a button&mdash;the first one to bring up the toolbar and move the TabStrip upwards, and the second one to do the actual button activation.

## See also

Other articles related to the scrolling functionality in hybrid Kendo UI:

* [Introduction to the Hybrid View Kendo UI Widget](/controls/hybrid/view)
* [Introduction to the Hybrid Application](/controls/hybrid/application)
* [Introduction to the Hybrid Scroller](/controls/hybrid/scroller)

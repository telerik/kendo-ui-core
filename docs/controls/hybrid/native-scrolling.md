---
title: Native Scrolling
page_title: Native Scrolling | Kendo UI Hybrid Components
description: "Learn more about the native scrolling configuration option in hybrid Kendo UI widgets."
slug: nativescrolling_hybrid_kendoui
position: 2
---

# Native Scrolling

As of Kendo UI Q3 2013, the [hybrid Kendo UI Application widget](http://demos.telerik.com/kendo-ui/m/index#application/loadingpopup) supports the `useNativeScrolling` configuration option, which is set to `false` by default. The introduction of this new feature is mostly due to the changes in browser behavior that were introduced in iOS7. The option, however, can be enabled on other platforms too.

## Native vs. Emulated Scrolling

By default, the hybrid Application widget uses [flexbox](http://www.w3.org/TR/css3-flexbox/) for the mobile views layout. Each mobile view is stretched to fit the application container (by default, the `body` DOM element) using the `width: 100%; height: 100%;` CSS declarations. The view header, footer, and the content are positioned using column flex direction. The content element is made scrollable either by initializing a hybrid Kendo UI Scroller or with the browser-supported `overflow: auto` and `-webkit-overflow-scrolling: touch` CSS declarations.

When the `useNativeScrolling` configuration option is set to `true`, the view header and footer are positioned using `position: fixed` CSS declaration. The view content vertical padding is adjusted to match the header and footer height. The default browser scroller is utilized for the content scrolling.

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

Below are listed the advantages of native scrolling:

* Most mobile operating systems and some mobile browsers automatically hide address-bar or tab-bar components when the user scrolls through the page. Using native scrolling enables this behavior.
* Native scrolling performs smoother and faster as compared to the JavaScript or `overflow: auto` scrolling emulations.
* On Android 2.2.* form elements exhibit erratic behavior when you apply the JavaScript scrolling emulation, while the `overflow: auto` scrolling emulation does not work at all. Native scrolling resolves this issue.

### Known Limitations

This is the list with the known limitations of the native scrolling functionality:

* The native scrolling hint is visible over the view header and footer contents.
* Features which depend on the JavaScript scrolling emulation, such as the ListView Pull to Refresh, Press to Load More, Fixed Headers, and others, are not supported.
* When native scrolling is enabled, the hybrid View does not initialize a hybrid Scroller and View or Application `scroller` field returns `null`.
* The hybrid Kendo UI Drawer widget does not support content scrolling.
* Scrolling in one view and navigating to another preserves the scrolled offset. This behavior can be changed by calling [`scrollTo`](https://developer.mozilla.org/en-US/docs/Web/API/window.scrollTo) in the view after the `show` event handler.
* The tablet specific widgets, such as the hybrid Kendo UI Popover and SplitView, are not supported.
* In iOS7 the bottom toolbar is shown (when hidden) whenever the user taps closely to the bottom of the screen. If you have a TabStrip there, it is going to require 2 taps to activate a button&mdash;the first one to bring up the toolbar and move the TabStrip upwards, and the second one to do the actual button activation.

## See Also

Articles related to the scrolling functionality in hybrid Kendo UI widgets:

* [Introduction to the Hybrid Kendo UI View Widget](/controls/hybrid/view)
* [Introduction to the Hybrid Application](/controls/hybrid/application)
* [Introduction to the Hybrid Scroller](/controls/hybrid/scroller)

Other articles on Hybrid UI components in Kendo UI:

* [Overview of the Hybrid UI Components in Kendo UI]({% slug overview_hybridkendoui %})
* [Performance Tips and Tricks]({% slug performance_hybridkendoui %})
* [Overview of the Application for Mobile]({% slug overview_hybridapplication %})

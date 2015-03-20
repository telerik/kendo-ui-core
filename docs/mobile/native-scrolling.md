---
title: Native Scrolling Support
page_title: Documentation for Kendo UI Mobile Application Native Scrolling configuration option
description: Kendo UI Mobile Application Native Scrolling specifics described
---

Since Q3 2013, the mobile application introduces a new configuration option – `useNativeScrolling` (false by default). The change is mostly due to the browser behavior changes introduced
in iOS7; enabling the option works on other platforms, too.

## Native VS Emulated Scrolling Explained

By default, the mobile application uses [flexbox](http://www.w3.org/TR/css3-flexbox/) for the mobile views layout.
Each mobile view is stretched to fit the application container (by default, the `body` DOM element) using `width: 100%; height: 100%;` CSS declarations.
The view header, footer and the content are positioned using column flex direction. The content element is made scrollable, either by initializing a mobile scroller or with the
browser supported `overflow: auto` and `-webkit-overflow-scrolling: touch` CSS declarations.

When the `useNativeScrolling` configuration option is set to `true`, the view header and footer are positioned using `position: fixed` CSS declaration.
The view content vertical padding is adjusted to match the header and footer height; The default browser scroller is utilized for the content scrolling.

### Mobile Applicaiton With Native Scrolling Enabled
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

### Native Scrolling Advantages

- Most mobile operating systems (and certain mobile browsers) automatically hide address bars or tabbar components when the user scrolls through the document.
Using the native scroller enables this behavior.
- The native document scroller performs smoother and faster compared to JavaScript-based or `overflow: auto` based solutions.
- On Android 2.2.*, form elements exhibit erratic behavior when JavaScript scrolling is used, while `overflow: auto` does not work at all. Using Native Scrolling resolves this problem.

### Native Scrolling Compatibility and Limitations

- The native scrolling hint is visible over of the view header/footer contents.
- Features which depend on the JavaScript-based scrolling are not supported (ListView Pull To Refresh, Press To Load More, Fixed Headers, etc.)
- In native scrolling mode, the mobile view does not initialize a mobile scroller; The mobile view/application `scroller` field will return `null`.
- The mobile drawer widget does not support content scrolling.
- Scrolling in one view and navigating to another preserves the scrolled offset. This behavior can be changed by calling [scrollTo](https://developer.mozilla.org/en-US/docs/Web/API/window.scrollTo) in the view after show event handler.
- The tablet specific widgets (popover, splitview) are not supported.
- in iOS7 the bottom toolbar is shown (when hidden) whenever the user taps closely to the bottom of the screen. If you have a TabStrip there, it will require 2 taps to activate a button -
the first will bring up the toolbar and move the TabStrip upwards and the second will do the actual button activation.

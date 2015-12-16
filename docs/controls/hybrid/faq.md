---
title: Frequently Asked Questions
page_title: Kendo UI Mobile Frequently Asked Questions
description: Answers to Frequently Asked Questions about how Kendo UI mobile works and behaves
previous_url: /kendo-mobile-faq
position: 1000001
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

## iOS

### Q: I run a PhoneGap application in iOS7 and the status bar overlays my NavBar, what gives?

A: According to the [official iOS7 design guidelines](https://developer.apple.com/library/ios/documentation/UserExperience/Conceptual/MobileHIG/Bars.html#//apple_ref/doc/uid/TP40006556-CH12-SW1),
the iOS7 status bar should be transparent and always visible. Kendo Mobile allows this by using the [Application's statusBarStyle option](/mobile/application#seamless-status-bar-in-ios7)
set to "black-transparent". If you still wish to use the old black non-transparent status bar style, you can change it through the PhoneGap XCode project's [plist](http://stackoverflow.com/a/4053237/258445).

### Q: My TabStrip looks different on different versions of the OS or even between iPad and iPhone, why?

A: Kendo UI Mobile tries to match the native look of several iOS platform versions and devices. Thus some widgets look slightly different on iOS 5 versus iOS 6.
Additionally tablet and phone styling is slightly different too. If you want to have the same styling on all iOS devices, choose the one you want and force it
through the Application [platform](./mobile/application#force-ios-5-look) option.

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

## BlackBerry

### Q: I have webkit mask icons in my application and they are rendered as squares in BlackBerry OS 7.0?

A: WebKit masks are completely broken in BlackBerry OS 7.0, though they work fine in 6.x and 7.1. Either use font icons or normal images.

### Q: My trackball doesn't seem to work properly, how should I scroll?

A: Kendo UI Mobile supports only touchscreen BlackBerry devices. The trackball/pad that can be found on the older phone models fires mouse events (which are handled), but
doesn't support content dragging. This limitation is listed in Kendo UI Mobile requirements.

## Windows Phone 8

### Q: My icons do not render in WP8 PhoneGap or HTML5 apps, can I do something about it?

A: Local web fonts are not loaded in WP8 HTML5/PhoneGap apps or fonts loaded from local CSS. According to some sources,
external CSS should load web fonts, but we were not able to confirm this. As a workaround, use normal images for icons in WP8 HTML5/PhoneGap applications.

### Q: I get a gray background when I click on a link or label in Kendo UI Mobile under Windows Phone 8, why?

A: By default Windows Phone 8 highlights all links when they are active (hold down). Stopping this behaviour requires manually adding a meta tag to your application/site -
adding the tag through Javascript is ignored:

#### Q: I want to Stop link highlighting in WP8?

A: Add the following meta tag:

    <meta name="msapplication-tap-highlight" content="no" />

### Q: When I change the Windows Phone 8 theme, my application starts to look different. Why?

A: Kendo UI Mobile adapts to the current theme in Windows Phone 8 and changes the background and highlight colors of your application. In the browser this is
semi-automatic when you click inside the application to focus it, but in PhoneGap it happens automatically on app resume after you change the theme.

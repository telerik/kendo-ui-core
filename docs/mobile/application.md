---
title: Application
page_title: Documentation for Kendo UI Mobile Application
description: How to initiate Kendo UI Mobile Application and handle the navigation.
previous_url: /howto/universal-mobile-apps-html5
position: 1
---

# Application

The Kendo UI Mobile **Application** provides the necessary tools for building native-looking web based mobile applications.

> **Important:** Kendo UI Mobile Application init takes care of adding a Viewport meta tag to your app, in order to set the correct options it needs to function properly. Additional Viewport meta tags
or at least the **width** and **height** options are not supported and may result in unexpected behavior.

## Getting Started

The simplest mobile **Application** consists of a single mobile **View**.

### Hello World mobile Application

    <body>
       <div data-role="view">
           <div data-role="header">Header</div>
           Hello world!
           <div data-role="footer">Footer</div>
       </div>

       <script>
            // the content of the document.body is used by default
           var app = new kendo.mobile.Application();
       </script>
    </body>


## Mobile Views

The mobile **Application** consists of a single HTML page with one or more mobile Views,
linked with navigational widgets (Buttons, TabStrip, etc.).
Each **immediate** child of the application element (`<body>` by default) with `data-role="view"`
is considered a mobile view.

When a mobile View is initialized (the first time the user visits it), it initializes all Mobile, Web, and DataViz Kendo widgets it contains.
Please refer to the [Data Attribute Initialization section](/data-attribute-initialization) for more details regarding declarative widget initialization.

### Mobile View with Mobile Button widget

    <body>
       <div data-role="view">
           <div data-role="header">Header</div>
            <a data-role="button">Click Me!</a>
           <div data-role="footer">Footer</div>
       </div>

       <script>
            // the content of the document.body is used by default
           var app = new kendo.mobile.Application();
       </script>
    </body>

## Navigation

When initialized, the mobile **Application** modifies the behavior of the Kendo mobile widgets
(listview link items, buttons, tabs, etc.) so that they navigate between the mobile views
when the user taps them.

When targeting local views, the `href` attribute of navigation widgets specifies the **View** id to navigate to, prefixed with `#`, like an anchor.

### Views linked with mobile Buttons

    <div data-role="view" id="foo">Foo <a href="#bar" data-role="button">Go to Bar</a></div>
    <div data-role="view" id="bar">Bar <a href="#foo" data-role="button">Go to Foo</a></div>

## Linking to External Pages

By default, all navigational widgets try to navigate to local views when tapped. This behavior can be overridden by setting `data-rel="external"` attribute to the link element.

### Example: External links

    <a href="http://telerik.com/" data-role="button" data-rel="external">Visit KendoUI</a>

## View Transitions

**View** transitions are defined by setting a `data-transition` attribute to the **View** DOM element or to the navigational widget `A` DOM element.
If both are present, the navigational widget transition takes precedence.
An application-wide default transition may be set using the `transition` parameter in the options parameter of the **Application** constructor.
The following transitions are supported:

### slide

This is the default iOS **View** transition. Old **View** content slides to the left and the new **View** content slides in its place.
Headers and footers (if present) use the **fade** transition.

The transition direction can be specified by using `slide:(direction)`.
Supported directions are `left` and `right`. By default, the direction is `left`.

### zoom

The new **View** (along with its header and footer) content zooms from the center of the previous **View**. The old **View** content fades out. Suitable for displaying dialogs.

### fade

The new **View** (along with its header and footer) content fades in on top of the previous **View** content.

### overlay

The new **View** content slides on top of the previous **View**. Unlike the `slide` transition,
the previous View stays "under" the new one, and the headers / footers do not transition separately.

The transition direction can be specified by using `overlay:(direction)` format.
Supported directions are `down`, `left`, `up` and `right`. By default, the direction is `left`.

### Views with Transitions

    <div data-role="view" id="foo" data-transition="slide">Foo <a href="#bar" data-role="button">Go to Bar</a></div>
    <div data-role="view" id="bar" data-transition="overlay:up">Bar <a href="#foo" data-role="button">Go to Foo</a></div>

Each transition may be played in **reverse**. To do so, add `" reverse"` after the transition definition. For
instance, to simulate returning to previous view using slide transition, use `"slide:left reverse"`

### Reverse transition

    <div data-role="view" id="foo">Foo <a href="#bar" data-role="button">Go to Bar</a></div>
    <div data-role="view" id="bar">Bar <a href="#foo" data-role="button" data-transition="slide:left reverse">Go to Foo</a></div>

When a **View** transitions to the **View** displayed before it (foo → bar → foo), this is considered a **back** navigation.
In this case, the animation of the current **View** is applied in reverse.
For instance, navigating with slide transition from `foo` to `bar`, then back to `foo`
would cause the `foo` **View** to slide from the right side of the screen.

## Remote Views

The Kendo mobile **Application** can load **Views** remotely, using AJAX. If the navigational widget href attribute value does not start with a hash (#),
the application considers the View to be remote, and issues an AJAX request to the provided URL.

The View content (the first element with `data-role="view"`) is extracted from the AJAX response and appended into the Application DOM element.
If no element with `data-role="view"` is found, the `body` contents are wrapped in a `<div data-role="view">` tag and used as a remote view.
If no element with `data-role="view"` is found and no body element is present, the entire response is wrapped in a `<div data-role="view">` tag and used as a remote view.

Once the remote **View** is fetched, no additional round trips to the server occur when the **View** is displayed again.

### Remote view

    <!-- foo.html -->
    <div data-role="view">Foo <a href="bar.html" data-role="button">Go to Bar</a></div>

    <!-- bar.html -->
    <div data-role="view">Bar</div>

The remote view request will also append (but not initialize) any **additional views** found in the AJAX
response. **Inline style** elements, **inline script** elements, and **mobile layout** definitions will also be evaluated and appended to the
application. The elements must be available in the root of the response, or nested inside the **body** element.

Scripts and styles from the **head** element (if present) will **not** be evaluated.

If the remote view needs an **additional scripting (widget initialization/binding)** logic, it may be defined in the view init event handler,  in the AJAX response.

### Remote view with init event handler

    <!-- foo.html -->
    <div data-role="view">
    <a data-role="button" href="bar.html">Go to bar</a>
    </div>

    <!-- bar.html -->
    <div data-role="view" data-init="initBar">
      <a href="#" id="link">Link</a>
    </div>

    <script>
      function initBar(e) {
          e.view.element.find("#link").kendoMobileButton();
      }
    </script>

### Remote Views With Parameters

Once a remote view is loaded, subsequent view displays for the same path with different query string parameters do not perform additional requests **by default**.
In order to reload the remote view contents each time the view is shown, set the **reload** configuration option.

### Remote view that is refreshed on every request

    <!-- foo.html -->
    <div data-role="view">
    <a data-role="button" href="bar.html">Go to bar</a>
    </div>

    <!-- bar.html -->
    <div data-role="view" data-reload="true">
        I will be requested from the server every time I am displayed
      <a href="#" id="link">Link</a>
    </div>

##  Initial View

The **Application** provides a way to specify the initial view to show. The initial view can be set by
passing the view id in the options parameter of the Application's constructor:

### Define initial view

    <script>
         new kendo.mobile.Application($(document.body), {
             initial: "ViewID"
         });
    </script>

## Web Clips

The mobile devices can create a bookmark placed on the Home screen, which is called a web clip. Users can use the shortcut to open that web page later. While instantiating the Application, you can specify a custom icon or disable the app mode.

### Define web clip icon

    <script>
         new kendo.mobile.Application($(document.body), {
             icon: "URL to a web clip icon"
         });
    </script>

Multiple icons for different sizes can be defined. Please refer to Apple [Web Clip Icons help topic](https://developer.apple.com/library/ios/#documentation/userexperience/conceptual/mobilehig/IconsImages/IconsImages.html#//apple_ref/doc/uid/TP40006556-CH14-SW11)
for more information.

### Define multiple web clip icons

    <script>
         new kendo.mobile.Application($(document.body), {
             icon: {
               "72x72" : "URL to a 72 x 72 pixels web clip icon",
               "114x114" : "URL to a 114 x 114 pixels web clip icon"
             }
         });
    </script>

As of Q2 2013, you can disable the app mode and open the home screen web clip link in the browser (by default Kendo UI Mobile applications are web app capable and open without the browser chrome).

### Open web clip link in the browser

    <script>
         new kendo.mobile.Application($(document.body), {
             webAppCapable: false
         });
    </script>

## Hidden Status Bar in iOS/Cordova

In order to hide the status bar in in an application deployed with Cordova, the [Cordova Status Bar Plugin](https://github.com/apache/cordova-labs/tree/plugins/statusbar) should be enabled.
Next, call the StatusBar `hide` method and set the mobile application statusBarStyle to `hidden`.

    <div data-role="view" data-title="Pink">
        <header data-role="header">
            <div data-role="navbar">
                <div data-role="view-title"></div>
            </div>
        </header>
        Hello world!
    </div>

    <script>
        document.addEventListener('deviceready', function() {
            StatusBar.hide();
            new kendo.mobile.Application($(document.body), { statusBarStyle: "hidden" });
        });
    </script>

## Seamless Status Bar in iOS7

iOS7 introduced application status bars that merge with your application, creating a more unified look. This can be achieved in a native application by setting UIStatusBarStyleLightContent style.
However Apple didn't update the web clip status bar meta tag to support similar functionality, except that now black-translucent makes the status bar completely transparent with white icons.
On the contrary, in Telerik AppBuilder/PhoneGap, the status bar has black icons - their color can be only controlled with the [official Cordova Status Bar Plugin](https://github.com/apache/cordova-labs/tree/plugins/statusbar).
Knowing this, you can achieve the seamless status bar in Kendo UI Mobile starting from Q2 2013 SP, but only with darker backgrounds. For instance, this complete example will make a pink NavBar
with seamless status bar on top of it:

    <style scoped>
        .km-on-ios .km-header .km-navbar
        {
            background-color: deeppink;
        }

        .km-on-ios .km-header .km-widget,
        .km-on-ios .km-header .km-view-title
        {
            color: white;
        }
    </style>

    <div data-role="view" data-title="Pink">
        <header data-role="header">
            <div data-role="navbar">
                <div data-role="view-title"></div>
            </div>
        </header>
        Hello world!
    </div>

    <script>
        new kendo.mobile.Application($(document.body), {
            statusBarStyle: "black-translucent"
        });
    </script>

## Mobile Safari address bar tint in iOS7

Another neat addition in iOS7 Mobile Safari is that the browser address bar and the status bar above it inherits a tint from the opened web page.
The tint is directly taken from the background-color of the page, so in order to use it in your Kendo Mobile app, you can do this:

    .km-on-ios.km-ios7
    {
        background-color: deeppink; /* Required for the tint */
        -webkit-linear-gradient(top, white, white); /* Colorize the body as you wish. */
    }

## Place TabStrip at bottom in Android

By default Android Kendo UI Mobile styling switches the places of the application header and footer. If TabStrip at bottom is preferred (as in iOS and BlackBerry) this behavior can be switched off with a simple CSS rule:

### Switch places of header and footer

    .km-android .km-view:not(.km-splitview) {
        -webkit-box-direction: normal;
        -moz-box-direction: normal;
        -webkit-flex-direction: column;
        flex-direction: column;
    }

## Forcing Platform Styles

The **Application** provides a way to force a specific platform look on your application upon init by
passing the platform name in the `options` parameter of the Application's constructor:

### Force iOS look

    <script>
         new kendo.mobile.Application($(document.body), {
             platform: "ios"
         });
    </script>

Platform can be one of "ios", "ios7", "android", "blackberry" and "wp". Additionally, platform theme variants can be set by either using platform or skin configuration option.
Platform variants can be "android-light" and "android-dark" (which is default):

### Force Android Holo Light theme

    <script>
         new kendo.mobile.Application($(document.body), {
             skin: "android-light"
         });
    </script>

Additionally, the OS version can be specified by passing a `kendo.support.mobileOS` object that is expected by Kendo UI Mobile.
This allows fine-grained tuning of the application look and behavior. A sample object initialization is like this:

### Force iOS 5 look

    <script>
        new kendo.mobile.Application($(document.body), {
            platform: {
                device: "ipad",       // Mobile device, can be "ipad", "iphone", "android", "fire", "blackberry", "wp"
                name: "ios",          // Mobile OS, can be "ios", "android", "blackberry", "wp"
                ios: true,            // Mobile OS name as a flag
                majorVersion: 5,      // Major OS version
                minorVersion: "0.0",  // Minor OS versions
                flatVersion: "500",   // Flat OS version for easier comparison
                appMode: false,       // Whether running in browser or in AppMode/Cordova/PhoneGap/Telerik AppBuilder.
                cordova: false,       // Whether running in Cordova/PhoneGap/Telerik AppBuilder.
                tablet: "ipad"        // If a tablet - tablet name or false for a phone.
            }
        });
    </script>

## Stop link highlighting in Windows Phone 8

By default Windows Phone 8 highlights all links when they are active (hold down). Stopping this behaviour requires manually adding a meta tag to your application/site -
adding the tag through Javascript is ignored:

### Stop link highlighting in WP8

    <meta name="msapplication-tap-highlight" content="no" />

### Using Kendo UI Mobile in ASP.NET WebForms project

In order to use Kendo UI Mobile in ASP.NET WebForms project you should:

- set the form element as mobile application container
- stretch the form element to 100% height and remove the body margin and padding

### Example: Initialize mobile application in ASP.NET WebForms project

    <form id="mobileContainer" runat="server">
        <div data-role="view">
            kendo mobile view
        </div>
        <script>
            //set the form element as mobile application container
            new kendo.mobile.Application($("#mobileContainer"));
        </script>
    </form>
    <style>
        /* stretch the form element */
        html, body, #mobileContainer { height: 100%; }
        /* remove margin and padding */
        body { margin: 0; padding: 0; }
    </style>

> Note that KendoUI Mobile application is a type of [single page application](http://en.wikipedia.org/wiki/Single-page_application). This type of web applications fit on a single page with the goal of providing a more fluid user experience and native-like responsiveness. Forms post-backs which cause page reloading are in conflict with that approach. That said forms post-backs that the .NET framework makes automatically should be avoided - in the mobile application all the dynamic content should be sent or retrieved via Ajax requests.

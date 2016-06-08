---
title: Application
page_title: Application | Kendo UI Hybrid Components
description: "Initiate the Kendo UI Application for mobile and handle its navigation."
previous_url: /howto/universal-mobile-apps-html5
slug: overview_hybridapplication
position: 4
---

# Application

The Kendo UI Application for mobile devices provides the necessary tools for building native-looking web based mobile applications.

> **Important**
>
> Kendo UI Application for mobile initially takes care of adding a Viewport meta tag to your app to set the correct options it needs to function properly. Additional Viewport meta tags, or at least the `width` and `height` options, are not supported and may result in unexpected behavior.

## Getting Started

### Initialize the Mobile Application

The simplest Application for mobile consists of a single mobile `View`.

###### Example

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

### Initialize the Mobile View

The mobile Application consists of a single HTML page with one or more mobile Views, linked with navigational widgets such as Buttons and TabStrip among others. Each immediate child of the application element&mdash;`<body>`, by default&mdash;with `data-role="view"` is considered a mobile view.

When a mobile View is initialized, that is, the first time the user visits it, it initializes all Kendo UI web and hybrid mobile widgets, as well as the Kendo UI widgets for data visualization it contains.

For more details on the declarative widget initialization, refer to the [article about setting data attributes]({% slug dataattributes_configuration_installation %}).

The example below demonstrates a mobile view with a mobile Button widget.

###### Example

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

### Link to Mobile Widgets

When initialized, the mobile Application modifies the behavior of the Kendo UI hybrid widgets&mdash;ListView link items, buttons, tabs&mdash;so that they navigate between the mobile views when the user taps them. When targeting local views, the `href` attribute of the navigation widgets specifies the `view` id to navigate to, prefixed with `#`, like an anchor.

The example below demonstrates views linked with mobile buttons.

###### Example

    <div data-role="view" id="foo">Foo <a href="#bar" data-role="button">Go to Bar</a></div>
    <div data-role="view" id="bar">Bar <a href="#foo" data-role="button">Go to Foo</a></div>

### Link to External Pages

By default, all navigational widgets try to navigate to local views when tapped. This behavior can be overridden by setting the `data-rel="external"` attribute to the `link` element.

###### Example

    <a href="http://telerik.com/" data-role="button" data-rel="external">Visit KendoUI</a>

## Transitions

The View transitions are defined by setting a `data-transition` attribute to the View DOM element or to the navigational widget `A` DOM element. If both are present, the navigational widget transition takes precedence. An application-wide default transition may be set by using the `transition` parameter in the options parameter of the Application constructor.

The example below demonstrates views with transitions.

###### Example

    <div data-role="view" id="foo" data-transition="slide">Foo <a href="#bar" data-role="button">Go to Bar</a></div>
    <div data-role="view" id="bar" data-transition="overlay:up">Bar <a href="#foo" data-role="button">Go to Foo</a></div>

The transitions that are supported are:

* `slide`
* `zoom`
* `fade`
* `overlay`

### The slide Transition

This is the default iOS View transition. Old View content slides to the left and the new View content slides in its place. Headers and footers (if present) use the `fade` transition.

The transition direction can be specified by using `slide:(direction)`. Supported directions are `left` and `right`. By default, the direction is `left`.

### The zoom Transition

The new View&mdash;along with its header and footer&mdashl;content zooms from the center of the previous View. The old View content fades out. The `zoom` transition is suitable for displaying dialogs.

### The fade Transition

The new View&mdash;along with its header and footer&mdash;content fades in on top of the previous View content.

### The overlay Transition

The new View content slides on top of the previous View. Unlike the `slide` transition, the previous View stays under the new one, and the headers and footers do not transition separately.

The transition direction can be specified by using the `overlay:(direction)` format. Supported directions are `down`, `left`, `up`, and `right`. By default, the direction is `left`.

### The reverse Transition

Each transition may be played in reverse. To do so, add `" reverse"` after the transition definition. For instance, to simulate returning to previous view using the `slide` transition, use `"slide:left reverse"`.

###### Example

    <div data-role="view" id="foo">Foo <a href="#bar" data-role="button">Go to Bar</a></div>
    <div data-role="view" id="bar">Bar <a href="#foo" data-role="button" data-transition="slide:left reverse">Go to Foo</a></div>

When a View transitions to the View displayed before it&mdash;`foo` > `bar` > `foo`&mdash;this is considered a back navigation. In this case, the animation of the current View is applied in reverse. For instance, navigating with the `slide` transition from `foo` to `bar`, then back to `foo`, would cause the `foo` View to slide from the right side of the screen.

## Views

### Remote Views

The Kendo UI hybrid mobile Application can load Views remotely by using AJAX. If the navigational widget `href` attribute value does not start with a hash (`#`), the application considers the View to be remote, and issues an AJAX request to the provided URL.

The View content&mdash;the first element with `data-role="view"`&mdash;is extracted from the AJAX response and appended to the Application DOM element. If no element with `data-role="view"` is found, the `body` contents are wrapped in a `<div data-role="view">` tag and used as a remote view. If no element with `data-role="view"` is found and no body element is present, the entire response is wrapped in a `<div data-role="view">` tag and used as a remote view. Once the remote View is fetched, no additional round trips to the server occur when the View is displayed again.

###### Example

    <!-- foo.html -->
    <div data-role="view">Foo <a href="bar.html" data-role="button">Go to Bar</a></div>

    <!-- bar.html -->
    <div data-role="view">Bar</div>

The remote view request will also append&mdash;but not initialize&mdash;any additional views found in the AJAX response. Inline style elements, inline script elements, and mobile layout definitions will also be evaluated and appended to the application. The elements must be available in the root of the response, or nested inside the `body` element. Note that scripts and styles from the `head` element (if present) will not be evaluated.

#### Remote Views with init Event Handler

If the remote view needs an additional scripting (widget-initialization or widget-binding) logic, it may be defined in the view `init` event handler, in the AJAX response.

###### Example

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

#### Remote Views with Parameters

Once a remote view is loaded, by default, subsequent view displays for the same path with different query string parameters do not perform additional requests. To reload the remote view contents each time the view is shown, set the `reload` configuration option.

The example below demonstrates a remote view that is refreshed on every request.

###### Example

    <!-- foo.html -->
    <div data-role="view">
    <a data-role="button" href="bar.html">Go to bar</a>
    </div>

    <!-- bar.html -->
    <div data-role="view" data-reload="true">
        I will be requested from the server every time I am displayed
      <a href="#" id="link">Link</a>
    </div>

###  Initial Views

#### Show the Initial View

The Application component provides a way to specify the initial view to show. The initial view can be set by passing the view `id` in the options parameter of the Application constructor.

The example below demonstrates how to define an initial view.

###### Example

    <script>
         new kendo.mobile.Application($(document.body), {
             initial: "ViewID"
         });
    </script>

## Web Clips

### Define the Web Clip Icon

The mobile devices can create a bookmark placed on the **Home** screen, which is called a web clip. Users can use the shortcut to open that web page later. While instantiating the Application, you can specify a custom icon or disable the app mode.

###### Example

    <script>
         new kendo.mobile.Application($(document.body), {
             icon: "URL to a web clip icon"
         });
    </script>

### Define Multiple Web Clip Icons

Multiple icons for different sizes can be defined, as demonstrated in the example below.

For more information, refer to the [Apple web clip icons article](https://developer.apple.com/library/ios/documentation/UserExperience/Conceptual/MobileHIG/index.html#//apple_ref/doc/uid/TP40006556-CH14-SW11).

###### Example

    <script>
         new kendo.mobile.Application($(document.body), {
             icon: {
               "72x72" : "URL to a 72 x 72 pixels web clip icon",
               "114x114" : "URL to a 114 x 114 pixels web clip icon"
             }
         });
    </script>

### Open Web Clip Links in Browser

As of Kendo UI Q2 2013, you can disable the app mode and open the home screen web clip link in the browser (by default Kendo UI Mobile applications are web app capable and open without the browser chrome).

###### Example

    <script>
         new kendo.mobile.Application($(document.body), {
             webAppCapable: false
         });
    </script>

## Common Scenarios    

### Hide Status Bar in iOS and Cordova

To hide the status bar in an application deployed with Cordova, the [Cordova Status Bar Plugin](https://github.com/apache/cordova-plugin-statusbar) should be enabled. Next, call the StatusBar `hide` method and set the mobile application `statusBarStyle` to `hidden`, as demonstrated in the example below.

###### Example

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

### Apply the Status Bar in iOS7 Seamlessly

The iOS7 introduced application status bars that merge with your application and create a more unified look. This can be achieved in a native application by setting the `UIStatusBarStyleLightContent` style. However, Apple did not update the web clip status bar meta tag to support similar functionality, except that now black-translucent makes the status bar completely transparent with white icons. On the contrary, in Telerik AppBuilder/PhoneGap, the status bar has black icons&mdash;their color can only be controlled with the [official Cordova Status Bar Plugin](https://github.com/apache/cordova-plugin-statusbar). Knowing this, you can achieve the seamless status bar in Kendo UI framework for mobile devices starting from Kendo UI Q2 2013 SP, but only with darker backgrounds.

The example demonstrates how to make a pink NavBar with seamless status bar on top of it.

###### Example

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

### Handle the Mobile Safari Address Bar Tint in iOS7

Another neat addition to iOS7 Mobile Safari is that the browser address bar and the status bar above it inherit a tint from the open web page. The tint is directly taken from the background-color of the page, so to use it in your Kendo UI hybrid mobile application, apply the example below.

###### Example

    .km-on-ios.km-ios7
    {
        background-color: deeppink; /* Required for the tint */
        -webkit-linear-gradient(top, white, white); /* Colorize the body as you wish. */
    }

<!--*-->
### Place the TabStrip at the Bottom in Android

By default, Kendo UI hybrid mobile styling in Android switches the places of the application header and footer. If you prefer to have a TabStrip at the bottom&mdash;as in iOS and BlackBerry&mdash;this behavior can be switched off with a simple CSS rule.

The example below demonstrates how to switch the places of the header and the footer.

###### Example

    .km-android .km-view:not(.km-splitview) {
        -webkit-box-direction: normal;
        -moz-box-direction: normal;
        -webkit-flex-direction: column;
        flex-direction: column;
    }

### Stop the Link Highlighting in Windows Phone 8

By default, Windows Phone 8 highlights all links when they are active (hold down). Stopping this behavior requires manually adding a meta tag to your application or web site, as shown in the example below. Note that the adding of the tag through Javascript is ignored.

###### Example

    <meta name="msapplication-tap-highlight" content="no" />

### Use the Hybrid Mobile Framework in ASP.NET WebForms Project

To use the Kendo UI hybrid mobile framework in an ASP.NET WebForms project you should:

- Set the `form` element as a mobile application container.
- Stretch the height of the `form` element to 100% and remove the `body` margin and padding.

The example below demonstrates how to initialize a Kendo UI hybrid mobile application in an ASP.NET WebForms project.

###### Example

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

<!--*-->
> **Important**
>
> The Kendo UI application for mobile is a type of a [single page application](http://en.wikipedia.org/wiki/Single-page_application). This type of web applications fits on a single page to provide a more fluid user experience and native-like responsiveness. Forms post-backs, which cause page reloading, are in conflict with that approach. That said, forms post-backs that the .NET framework makes automatically should be avoided&mdash;in the mobile application all the dynamic content should be sent or retrieved via Ajax requests.

## See Also

Articles on Application and other Hybrid UI components in Kendo UI:

* [Hybrid UI Application API Reference](/api/javascript/mobile/application)
* [Overview of the Hybrid UI Components in Kendo UI]({% slug overview_hybridkendoui %})
* [Performance Tips and Tricks]({% slug performance_hybridkendoui %})
* [Native Scrolling]({% slug nativescrolling_hybrid_kendoui %})

For how-to examples on the Kendo UI hybrid Application, browse its [**How To** documentation folder]({% slug displa_validation_summary_hybridapplication %}).

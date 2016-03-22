---
title: Overview
page_title: Overview | Kendo UI Hybrid Components
description: "Build mobile applications using the Kendo UI hybrid components."
previous_url: /tutorials/build-apps-with-kendo-ui-mobile
slug: overview_hybridkendoui
position: 1
---

# Overview

This article elaborates on the basics of building applications with [the Hybrid UI components in Kendo UI](http://www.telerik.com/kendo-ui-mobile).

The Kendo UI hybrid framework is designed to help developers build mobile app experiences through using HTML and JavaScript that automatically adapt to the native look and feel of different mobile platforms. Developers using Kendo UI hybrid components can focus on the content and functions of their apps and let the Kendo UI framework handle differences between platforms such as iOS and Android.

**Figure 1. Adaptive rendering of Kendo UI hybrid components**

![Illustration of Kendo UI mobile adaptive rendering](/images/mobile/km-adaptive-rending-illustration.png)

Where some mobile HTML frameworks focus on providing a one-size-fits-all experience, the Kendo UI hybrid framework focuses on delivering perfectly tailored experiences for different mobile platforms. Built and packaged correctly, the goal of such an application is to be virtually indistinguishable to end-users from a native SDK app.

The advantage of building apps with HTML, JavaScript, and Kendo UI is that you are able to maintain a single code base to target all major app platforms. Your team can focus on becoming masters of HTML, JavaScript, and CSS, rather than being average practitioners of Objective-C, Java, .NET, UIKit, and the myriad of other developer skills needed for cross-platform mobile app development.

## Building Blocks of Hybrid Apps

The Kendo UI hybrid apps are built entirely with HTML, JavaScript, and CSS. Those are the only skills you will need to build a Kendo UI mobile app that looks and feels native across mobile platforms. If you plan to work with data, make sure you are familiar with [JSON](http://en.wikipedia.org/wiki/JSON).

Applications do not need to be cross-compiled into a native [software-development kit (SDK)](https://en.wikipedia.org/wiki/Software_development_kit) language. Your HTML and JavaScript code is ultimately intended to run on mobile devices, even if you eventually use tools like [Cordova](http://incubator.apache.org/cordova/) to package your application for an app store.

There are a few key, non-visual pieces of Kendo UI hybrid components used in virtually all applications. These are:

1. [Application](http://demos.telerik.com/kendo-ui/m/index#application/loadingpopup)&mdash;This is the shell of Kendo UI hybrid apps. Application manages all navigation, application history, loading views, rendering mobile meta tags, and other essential mobile app tasks.
2. [Layout]({% slug layout_hybridkendoui %})&mdash;Defines the reusable portions of a hybrid app, similar to a MasterPage or template. Layouts are often used improve app maintainability by defining things used across multiple views, like navigation. While not required, layouts are encouraged to use.
3. [Views](http://demos.telerik.com/kendo-ui/m/index#mobile-view/index)&mdash;Individual pages of a hybrid app. Views contain the greater part of the application content. Every application has one or more views.

Layouts and Views are defined through HTML. The Application is simply JavaScript. No markup associated with the Application is used.

## Getting Started

The sections below demonstrate how to create the basic structure of a Kendo UI hybrid application by using the building blocks.

### Step 1: Create HTML Page

Kendo UI hybrid apps can be created by using simple HTML pages. First, try creating a page called `index.html` using the code from the example below.

###### Example

	<!DOCTYPE html>
	<html>
	<head>
		<title>My App</title>
		<!--TODO: Add CSS links-->
	</head>
	<body>

		<!--TODO: Add JavaScript referneces-->
	</body>
	</html>

> **Important**
>
> The Kendo UI hybrid Application automatically adds mobile meta tags for you at runtime.

### Step 2: Add References to Kendo UI

Just as with other parts of the Kendo UI framework, adding Kendo UI to your application is a process of copying the provided JavaScript and CSS assets into your project and then configuring the CSS and JavaScript links. When set up, your app page should look similar to the one demonstrated in the example below.

###### Example

	<!DOCTYPE html>
	<html>
	<head>
		<title>My App</title>

		<link href="css/kendo.mobile.all.min.css" rel="stylesheet" />
	</head>
	<body>

		<script src="js/jquery.min.js"></script>
		<script src="js/kendo.all.min.js"></script>
	</body>
	</html>

This example uses the minified versions of Kendo UI scripts and styles that include all features, widgets, and themes. You can create customized and more compact versions of the Kendo UI resources for your app if you choose not to use specific features or widgets.

> **Important**
>
> For development, the `all` minified files are the best choice.

Find out more about installing Kendo UI in your project [this article]({% slug getting_started_installation_kendoui %}) section.

### Step 3: Define the Application Layout

The layout is the template of your application. The whole content from views, which you are to create later, are going to be rendered inside of the layout, or layouts&mdash;you can define as many layouts as you need. A layout can contain anything, but generally it is where your app title bar and navigation are going to live. Add a layout to your app with the basic elements demonstrated in the example below.

###### Example

	<!DOCTYPE html>
	<html>
	<head>
		<title>My App</title>

		<link href="css/kendo.mobile.all.min.css" rel="stylesheet" />
	</head>
	<body>
		<section data-role="layout" data-id="default">
			<header data-role="header">
				<div data-role="navbar">My App</div>
			</header>
			<!--View content will render here-->
			<footer data-role="footer">
				<div data-role="tabstrip">
					<a href="#home">Home</a>
				</div>
			</footer>
		</section>

		<script src="js/jquery.min.js"></script>
		<script src="js/kendo.all.min.js"></script>
	</body>
	</html>

Note that the example uses the `data-role` attribute in your HTML. This communicates to Kendo UI that the HTML should be transformed when the Application is initialized with JavaScript. In this case:

`<section data-role="layout" data-id="default">`

When the Application is initialized, this block of HTML is going to be initialized as a Kendo UI hybrid layout. The `data-id` attribute is further defined to give this layout a unique name that can be used by your views.

Next, for completeness, a couple of Kendo UI hybrid widgets are introduced&mdash;Navbar and TabStrip. Note that they are also configured with the simple `data-role` attribute.

### Step 4: Create View

Now that the application layout is defined, you need to define at least one view to be displayed when the application loads. Most apps have many views. However, start with the simple configuration from the example below.

###### Example

	<!DOCTYPE html>
	<html>
	<head>
		<title>My App</title>

		<link href="css/kendo.mobile.all.min.css" rel="stylesheet" />
	</head>
	<body>
		<div id="home" data-role="view" data-layout="default">
		    Hello Mobile World!
		</div>

		<section data-role="layout" data-id="default">
			<header data-role="header">
				<div data-role="navbar">My App</div>
			</header>
			<!--View content will render here-->
			<footer data-role="footer">
				<div data-role="tabstrip">
					<a href="#home">Home</a>
				</div>
			</footer>
		</section>

		<script src="js/jquery.min.js"></script>
		<script src="js/kendo.all.min.js"></script>
	</body>
	</html>

The example uses the `data-role` attribute to define your view, and the `data-layout` attribute to tell your view which layout template to use. You are able to put anything inside of a view, including other Kendo UI widgets.

Instead of `<a href="#home">Home</a>`, you can also use `<a href="#/">Home</a>`. By definition, the `#/` URL points to the first view, which is defined in the HTML file or the so-called root view. If you try to run the application now, you see a bunch of HTML, but nothing looks right yet. You need to take one more step to initialize the application.

### Step 5: Initialize the Hybrid App

To make this HTML start looking and feeling like a mobile app, add the line of script from the example below after your jQuery and Kendo UI script links, but before the closing `body` tag.

###### Example

	<script>
		var app = new kendo.mobile.Application();
	</script>

This single line of JavaScript automatically initializes your Kendo UI hybrid application together with all widgets with the `data-role` attributes.

For a live example refer to [http://jsbin.com/egowef](http://jsbin.com/egowef "Live example of tutorial code running on jsBin"). Load your page in a browser and see the beginnings of your HTML mobile app. If everything works out properly, your basic Kendo UI hybrid application should look like the image below.

**Figure 2. Basic and properly working Kendo UI hybrid application.**

![Basic Kendo UI mobile app progress](/images/mobile/km-basic-app-1.png)

> **Important**
>
> If you have trouble seeing the application, make sure all of your script and CSS resources are loading without error by using the browser developer tools. Some browsers, such as Chrome, block the loading of external resources if you load your page using the `file://` protocol. Instead, test your pages using local web server (`localhost`) or a browser that does not restrict local resources such as Safari.

## Native Look and Feel

### Configure Views

Now that you have a basic Kendo UI hybrid app structure setup, begin adding more views to your application. Multiple views can be defined in the same file or in separate HTML files. For larger applications, maintaining views in separate files during development is preferred.

To add a second view to your app, create a new page called `about.html` with the content shown in the example below.

###### Example

	<!DOCTYPE html>
	<html>
	<head>
		<title>About</title>
	</head>
	<body>
		<div id="about" data-role="view" data-layout="default">
		    All About My App
		</div>
	</body>
	</html>

Note that this page does not redefine references to the Kendo UI script or CSS resources. This page requires minimal markup. When the Kendo UI hybrid application loads a remote view&mdash;a view defined in separate file&mdash;it looks for the first `data-role="view"` in the `body` element and discards the rest of the page.

### Handle Navigation

Enable your application to navigate to this page by updating the TabStrip, added previously, to include a navigation link for your external view.

###### Example

	<footer data-role="footer">
		<div data-role="tabstrip">
			<a href="#home">Home</a>
			<a href="about.html">About</a>
		</div>
	</footer>

When Kendo UI encounters a link to an external view, it automatically loads and caches the view with Ajax and provides a seamless navigation experience.

> **Important**
>
> If you do not want a link in a navigational Kendo UI hybrid widget to be treated as a view, be sure to include the `data-rel="external"` attribute.

If you want to maintain multiple views in a single page, just navigate the `id` of the view, as demonstrated below.

###### Example

	<div data-role="view" id="foo">
        <span>foo</span>
	    <footer data-role="footer">
    		<div data-role="tabstrip">
    			<a href="#home">Home</a>
    			<a href="about.html">About</a>
    			<a href="#foo">More</a>
    		</div>
    	</footer>
    </div>

Your navigation is now working, though all the views appear instantly with no animation transition. To give your application the native mobile feel, add a default transition for all views by modifying the Application initialization script in the way shown below.

###### Example

	<script>
		var app = new kendo.mobile.Application(document.body,
		{
			transition:'slide'
		});
	</script>

Now your application is looking and feeling native.

## Multiple Platforms Testing

By default, the Kendo UI hybrid application renders with an iOS look and feel if it does not detect another mobile platform. When you want to test the look and feel of your application on other platforms and see how Kendo UI hybrid components automatically adapts, take either of two paths:

1. Force Platform Rendering
2. Use Browser Tools

### Force Platform Rendering

When you initialize a Kendo UI hybrid Application, you have the option to force the platform rendering with a simple configuration option used in the Application constructor.

###### Example

	<script>
		var app = new kendo.mobile.Application(document.body,
		{
			platform:'android'
		});
	</script>

When using this code, you effectively disable the adaptive rendering detection and manually tell the application how to render.

> **Important**
>
> Make sure you remove this setting before deploying your application if you want the adaptive rendering to work across platforms.

### Use Browser Tools

Kendo UI relies on the [`UserAgent` string](http://en.wikipedia.org/wiki/User_agent) to trigger different platform renderings. If a browser reports that it is a specific mobile device, the mobile application responds and provides the correct, device-specific rendering.

Some desktop browsers, such as Google's Chrome, allow you to easily modify your user agent string, thereby allowing you to trick Kendo UI that your browser is a given mobile device. This helps you to quickly preview your application styling for different mobile platforms without changing any code.

To do this in Chrome, follow the steps below:

1. Open the Chrome Developer Tools (`F12`).
2. Click on the gear icon in the lower right corner.
3. In the **Settings** window that opens, check the **Override User Agent** box.
4. This reveals a dropdown of pre-defined browsers and devices. Select the device you want to imitate or define your own.
5. To undo this effect, un-check the **Override** box.

Of course, nothing replaces actual testing on mobile devices. In many cases, the Kendo UI mobile styles look better on devices than in desktop browsers. Make sure you test on an iPhone, Android, BlackBerry, or whatever devices you intend to support before deploying your application or when previewing application styles.

## Apps Intended for Specific Platforms

Kendo UI automatic platform adapting is a huge time-saver, but you might want to customize the presentation of an application for specific platforms. When you want to take more control over the experience different devices provide, use the `data-platform` attribute.

###### Example

	<div data-role="layout" data-id="foo" data-platform="ios">
  		<div data-role="header">iOS App</div>
	</div>

	<div data-role="layout" data-id="foo" data-platform="android">
  		<div data-role="header">Android App</div>
	</div>

The use of `data-platform` in these examples causes different headers to be displayed to iOS and Android users of the app. You are also able to use custom CSS to fine-tune your apps. When Kendo UI initializes an application, it adds a device-specific CSS class to the Application root element. This allows you to create styles that specifically target different platforms. For example, on iOS, the HTML for an initialized app might look like:

`<body class="km-ios km-vertical">`

If you want to create styles for your application that are going to be applied to iOS devices only, create CSS rules as demonstrated below.

###### Example

	.km-ios .myStyle { color: blue; }
	.km-android .myStyle { color: green; }

This added degree of control makes it a cinch to precisely style apps for different target platforms. You can also target styles at specific device orientations. Kendo UI hybrid framework updates the orientation CSS class as the device position changes.

## Further Reading

To get a better understanding of how Kendo UI hybrid Application works, check the features provided by the [application class]({% slug overview_hybridapplication %}).

To see a complete tutorial including guidelines and recommendations about how to build mobile applications for phones and tables with Kendo UI hybrid widgets and application tools, visit [this link](http://www.kendouimobileguide.com/).

## See Also

Articles and how-to examples on the Hybrid UI components in Kendo UI:

* [Performance Tips and Tricks]({% slug performance_hybridkendoui %})
* [Native Scrolling]({% slug nativescrolling_hybrid_kendoui %})
* [Overview of the Application for Mobile]({% slug overview_hybridapplication %})
* [How to Create Fixed Content Areas with Scroller]({% slug howto_createfixedcontentarea_hybridui %})
* [How to Create Relative Content Size Using Flexboxes]({% slug howto_createrelative_contentsize_usingflexboxes_hybridui %})
* [How to Select Value from Another View]({% slug howto_selectvaluefrom_anotherview_hybridui %})
* [How to Set Initial View Prior to Initialization in AngularJS]({% slug howto_setinitiaviewpriortoinitialization_angular_hybridui %})

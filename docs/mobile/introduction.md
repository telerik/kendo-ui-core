---
title: Introduction
page_title: Build mobile apps with Kendo UI mobile framework
previous_url: /tutorials/build-apps-with-kendo-ui-mobile
position: 0
---

In this article, we'll examine the basics of building apps with [Kendo UI Mobile](http://www.telerik.com/kendo-ui-mobile). You will learn:

- The basics of the Kendo UI mobile framework;
- How to use Kendo UI to build a basic mobile app
- How to preview an app on different mobile platforms
- How to utilize the adaptive rendering feature
- Next steps for putting a Kendo UI mobile app in app stores

The Kendo UI mobile framework is designed to help developers build mobile app experiences using HTML and JavaScript that automatically adapt to the native
look-and-feel of different mobile platforms. Developers using Kendo UI Mobile can focus on their app's function and content and let the Kendo UI
framework handle differences between platforms like iOS and Android.

![Illustration of Kendo UI mobile adaptive rendering](/images/mobile/km-adaptive-rending-illustration.png)
*Fig 1: Illustration of Kendo UI mobile adaptive rendering*

Where some mobile HTML frameworks focus on providing a "one size fits all" experience, the Kendo UI mobile framework focuses on delivering perfectly tailored
experiences for different mobile platforms. **Built and packaged correctly, the goal of a such app is to be virtually indistinguishable to
end-users from a native SDK app.**

The advantage of building apps with HTML, JavaScript, and Kendo UI, of course, is that developers can maintain a single code base to target all
major app platforms. Your team can focus on becoming masters of HTML, JavaScript, and CSS, rather than being average practitioners of Objective-C, Java,
.NET, UIKit, and the myriad of other developer skills need for cross-platform mobile app development.

## Building Blocks of a Kendo UI Mobile App

First of all, Kendo UI mobile apps are built entirely with HTML, JavaScript, and CSS. Those are the only skills you will need to build a Kendo UI
mobile app that looks and feels native across mobile platforms. If you plan to work with data, you should also be familiar with
[JSON](http://en.wikipedia.org/wiki/JSON).

Apps do not need to be "cross compiled" in to a native SDK language. Your HTML and JavaScript code will ultimately run on mobile devices, even if you
eventually use tools like [Cordova](http://incubator.apache.org/cordova/) to package your app for an app store.

There are a few key, "non-visual" pieces of Kendo UI Mobile used in virtually all apps:

1. **[Application](http://demos.telerik.com/kendo-ui/mobile/application/index.html)**:
The shell of a Kendo UI mobile app. Application manages all navigation, application history, loading views, rendering mobile meta tags, and other essential mobile app tasks.
2. **[Layout](http://demos.telerik.com/kendo-ui/mobile/layout/index.html)**: Defines the reusable portions of a mobile app, similar to a MasterPage or template. Layouts are often used improve app maintainability by defining things used across multiple views, like navigation. Layouts are not required, but encouraged.
3. **[Views](http://demos.telerik.com/kendo-ui/mobile/view/index.html)**: Individual pages of a mobile app. Views contain the majority of an app's content. Every app will have one or more views.

Layouts and Views are defined with HTML; the Application is simply JavaScript. There is no markup associated with an Application. Let's create the basic structure of a Kendo UI Mobile app using these building blocks.

### Step 1: Create a Simple HTML Page

Kendo UI mobile apps can be created using simple HTML pages. To begin, try creating a page called "index.html" with code like this:

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

> Where are the mobile meta tags? Don't worry. The Kendo UI mobile Application will automatically add mobile meta tags for you at runtime.

### Step 2: Add References to Kendo UI

Just as with other parts of the Kendo UI framework, adding Kendo UI to your application is a simple process of copying the provided JavaScript and CSS assets in to your project and then configuring the CSS and JavaScript links. When setup, your app page should look something like this:

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

This example uses the minified versions of Kendo UI's scripts and styles that include all features, widgets, and themes. You can create customized,
more compact versions of the Kendo UI resources for your apps if you choose not to use specific features or widgets. **For development, the "all"
minified files are the best choice.**

To find out more about installing Kendo UI in your project, please refer to [the basics help](/install/onsite) section.

### Step 3: Define an App Layout
The layout is your app's template. All content from views (that we'll create later) will be rendered inside of the layout (or layouts- you can define
as many layouts as you need). A layout can contain anything, but generally it's where your app title bar and navigation will live. Let's add a layout
to our app with these basic elements.

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

Let's break this update down.

First, you see that we've started to use the `data-role` attribute in our HTML. This communicates to Kendo UI that the HTML should be transformed when the Application is initialized with JavaScript. So, in this case:

`<section data-role="layout" data-id="default">`

When the Application is initialized, this block of HTML will be initialized as a Kendo UI mobile layout. The `data-id` attribute is further defined to give this layout a unique name that can be used by our views.

Next, for completeness, we've introduced a couple of Kendo UI's mobile widgets: **Navbar** and **TabStrip**. We'll talk more about these later, but for now note that they are also configured with the simple `data-role` attribute.

### Step 4: Create a View

Now that the app's layout is defined, we need at least one view that can be displayed when our app loads. Most apps will have many views, but we'll start with something simple:

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

Nothing too fancy in this update. We've once again used the `data-role` attribute to define our view, and we've also used the `data-layout` attribute to tell our view which layout template to use.

We can put anything inside of a view, including other Kendo UI widgets. For now, we've used some simple Hello World text.

Instead of `<a href="#home">Home</a>`, you can also use `<a href="#/">Home</a>`. By definition, the `#/` URL will point to the first view,
which is defined in the HTML file or the so-called **root view**.

If you try to run the app now, you'll see a bunch of HTML, but nothing will look right. We need to take one more step to initialize the app.

### Step 5: Initialize the Mobile Application

So far, we've defined some HTML, but we have not written any JavaScript. To make our HTML come to life and start looking and feeling like a mobile app, we need one line of script:

	<script>
		var app = new kendo.mobile.Application();
	</script>

Add this script block *after* your jQuery and Kendo UI script links, but before the closing `body` tag.

This single line of JavaScript will automatically initialize your Kendo UI mobile application and all widgets with the `data-role` attributes. Go ahead! [Give
it a try](http://jsbin.com/egowef "Live example of tutorial code running on jsBin"). Load your page in a browser and see the beginnings of your HTML
mobile app.

![Basic Kendo UI mobile app progress](/images/mobile/km-basic-app-1.png)
*Fig 2: If everything is working correctly, your basic Kendo UI mobile app should look like this image at this point in the tutorial.*

> If you have trouble seeing the app, make sure all of your script and CSS resources are loading without error (using the browser developer tools).
> Some browsers (like Chrome) will block the loading of external resources if you load your page using the `file://` protocol. Instead, test your
> pages using local web server (localhost) or a browser that does not restrict local resources, like Safari.

## Add Views and Navigation
Now that you have a basic Kendo UI Mobile app structure setup, you can begin adding more views to your app. Multiple views can be defined in the same
file, or views can be defined in separate HTML files. For larger apps, maintaining views in separate files during development is the prefered
approach.

To add a second view to your app, create a new page called "about.html" with the following content:

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

This page does **not** redefine references to the Kendo UI script or CSS resources. This page requires minimal markup. When the Kendo UI mobile
application loads an remote view (a view defined in separate file), it will look for the first `data-role="view"` in the `body` element and discard
the rest of the page.

To enable our app to navigate to this page, let's update the **TabStrip** added previously to include a navigation link for our external view:

	<footer data-role="footer">
		<div data-role="tabstrip">
			<a href="#home">Home</a>
			<a href="about.html">About</a>
		</div>
	</footer>

When Kendo UI encounters a link to an external view, it will automatically load and cache the view with Ajax and provide a seamless navigation experience.

> If you do not want a link in a navigational Kendo UI Mobile widget to be treated as a view, be sure to include the `data-rel="external"` attribute.

If we did want to maintain multiple views in a single page, we would simply navigate the `id` of the view, like this:

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

Finally, as you've probably noticed if you're testing as we go, your navigation is now working, but the views all appear instantly with no animation
transition. To really give your app that native mobile feeling, we can add a default transition for all views by modifying the Application
initialization script:

	<script>
		var app = new kendo.mobile.Application(document.body,
		{
			transition:'slide'
		});
	</script>

Now your application is looking *and* feeling native!

## Testing for Multiple Platforms
By default, the Kendo UI mobile application will render with an iOS look-and-feel if it does not detect another mobile platform. When you want to test the look-and-feel of your app on other platforms- and see how Kendo UI mobile automatically adapts- you can take one of two paths:

1. **Force Platform Rendering**
2. **Use Browser Tools**

### Force Platform Rendering

When you initialize a Kendo UI mobile Application, you have the option to "force" the platform rendering with a simple configuration option used in the Application constructor:

	<script>
		var app = new kendo.mobile.Application(document.body,
		{
			platform:'android'
		});
	</script>

When this code is used, you effectively disable the adaptive rendering detection and manually tell the application how to render. **Be sure to remove this setting before deploying your app if you want adaptive rendering to work across platforms.**

### Use Browser Tools
Kendo UI relies on the [UserAgent string](http://en.wikipedia.org/wiki/User_agent) to trigger different platform renderings. If a browser reports that it is a specific mobile device, The mobile application will respond and provide the correct, device-specific rendering.

Some desktop browsers, like Google's Chrome, allow you to easily modify your user agent string, thereby allowing you to "trick" Kendo UI that your browser is a given mobile device. This helps you quickly preview your app styling for different mobile platforms without changing any code.

To do this in Chrome, simply:

1. Open the Chrome Developer Tools (F12)
2. Click on the gear icon in the lower right corner
3. In the Settings window that opens, check the "Override User Agent" box
4. This will reveal a dropdown of pre-defined browsers and devices. Select the device you want to imitate or define your own.
5. To undo this effect, simply un-check the Override box

Of course, nothing replaces actual testing on mobile devices. In many cases, the Kendo UI mobile styles look *better* on devices than in desktop
browsers. Be sure to test on an iPhone, Android, BlackBerry, or whatever devices you intend to support before deploying your app or when previewing
app styles.

## Tweaking Apps for Specific Platforms
Kendo UI automatic platform adapting is a huge time saver, but sometimes developers want to customize the presentation of an app for specific
platforms. When you want to take more control over the experience different devices see, you should use the `data-platform` attribute. For example:

	<div data-role="layout" data-id="foo" data-platform="ios">
  		<div data-role="header">iOS App</div>
	</div>

	<div data-role="layout" data-id="foo" data-platform="android">
  		<div data-role="header">Android App</div>
	</div>

The use of `data-platform` in these examples will cause different headers to be displayed to iOS and Android users of the app.

You can also use custom CSS to fine-tune your apps. When Kendo UI initializes an app, it adds a device specific CSS class to the Application
root element. This allows you to create styles that specifically target different platforms. For example, on iOS, the HTML for an initialized app
might look like:

`<body class="km-ios km-vertical">`

Now, if we want to create styles for our app that will only be applied to iOS devices, we can create CSS rules like this:

	.km-ios .myStyle { color: blue; }
	.km-android .myStyle { color: green; }

This added degree of control makes it a cinch to precisely style apps for different target platforms. You can also target styles at specific device orientations. Kendo UI mobile will update the orientation CSS class as the device position changes.

## Next Steps: Polish and Prepare for App Stores
We've covered a lot of ground so far. You should now be able to:

- Create a basic Kendo UI mobile application with layouts and views
- Add additional views to an app and handle navigation
- Test the look and feel of your app for different platforms
- Take control over styling your app for different platforms

As a next step, make sure to check the features provided by the [mobile application class](/mobile/application).

## Tutorial - Kendo UI mobile guidance
If you would like to see a complete tutorial including guidelines and recommendations about how to build mobile applications for phones and tables with Kendo UI mobile widgets and application tools, please visit the [following link](http://www.kendouimobileguide.com/). 

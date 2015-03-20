---
title: Support Right-to-Left Languages
related: a11y-accessibility-overview, widget-appearance-rtl
position: 5
---

# Support Right-To-Left (RTL) Languages

## The Value of RTL Support

Right-to-Left, or RTL, support is a phrase commonly-used to describe the ability of a library, site or application to handle and respond to users who
communicate with a right-to-left language, like Arabic, Hebrew, Chinese or Japanese. Left-to-right is the default for most experiences on the web, but
many sites and applications wish to also provide RTL support for their users.

Admittedly, RTL falls more into the internationalization space, but we like to think of RTL as an accessibility feature, as well. After all, RTL is
about making user experiences more accessible for users working in Right-to-left languages like.

## Adding RTL Styles to Your Applications

Kendo UI provides out of the box RTL support, and adding these features to your apps is simple. All you need to do to get started is grab the
`kendo.rtl.css` stylesheet from the Kendo UI `styles` folder in the latest release and add it into your app. Then, add an additional style
declaration for the rtl stylesheet after the main Kendo styles:

	<link rel='stylesheet' href='/stylesheets/kendo.rtl.min.css' />

Now, you'll need to "activate" RTL support be adding the "k-rtl" class to a container element in your application. For example, you could add the class to the body tag:

	<body class="k-rtl">
		<!-- Your Amazing App -->
	</body>

Once this class is applied my entire application, including all Kendo UI widgets, will have RTL support, includes setting the `direction:rtl` CSS style and adjusting widget layout and behavior accordingly.

## Apply RTL Styles with Script

Of course, unless you're building an app that exclusively uses RTL languages, this feature is no doubt something that you'd want to apply based on
external input, like a language selection or information from the User Agent of a given visitor. In that case, you can apply the k-rtl class at
runtime using the jQuery `addClass` method.

Let's assume, for the sake of argument, that I'd like to allow the user to trigger RTL support by selecting a language from a dropdown or by clicking a button. First, I'll add a button to my page:

	<input type="button" id="toggleRTL" value="Activate RTL Support" class="k-button" />

Then, I'll add a click handler for the button and toggle RTL support by adding or removing the "k-rtl" class to a form, in this case a collection of form fields to which I've assigned an id of `speakerForm` :

	$('#toggleRTL').on('click', function(event) {
		var form = $('#speakerForm');

		if (form.hasClass('k-rtl')) {
			form.removeClass('k-rtl')
		} else {
			form.addClass('k-rtl');
		}
	})

With that handler in place, the user can now trigger RTL support on-demand.

## Using the Accept-Language Header to Drive RTL Support

In some cases, you may want to trigger RTL support automatically, as opposed to on a user action. In these cases, you can inspect the
`[Accept-Language](http://www.w3.org/Protocols/rfc2616/rfc2616-sec14.html#sec14.4)` HTTP Header to determine if an given user prefers and RTL
language.

The `Accept-Language` header is provided with every HTTP request, and is typically exposed as a property on a request object in server-side frameworks. If you're using ASP.NET, for instance, you can access the `Accept-Language` header by calling

	userLangs = Request.Headers["Accept-Language"];

For PHP, you'll use the `$_SERVER` object:

	userLangs = $_SERVER['HTTP_ACCEPT_LANGUAGE'];

For Rails apps, you can use the `request.env` object:

	userLangs = request.env["HTTP_ACCEPT_LANGUAGE"]

It's important to note that the `Accept-Language` header may return a comma-separated list of languages, ordered by preference. In these cases, you
should be prepared to split the returned value into an array or list and inspect the first element to determine if adding the "`k-rtl`" class to the
returned markup is necessary.

For additional information on Kendo UI RTL support, including its built-in behavior and layout considerations, see the [RTL Support](/web/appearance-rtl) document in the Getting Started section.

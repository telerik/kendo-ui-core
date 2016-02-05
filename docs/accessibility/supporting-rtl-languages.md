---
title: Right-to-Left Languages
page_title: Right-to-Left Languages | Kendo UI Accessibility Support
related: a11y-accessibility-overview, widget-appearance-rtl
description: "Learn more about the Accessibility features related to bidirectional languages, supported by Kendo UI controls."
slug: right_toleft_languages_accessibility_support
position: 5
---

# Right-to-Left Languages

Right-to-Left, or RTL, support is a phrase commonly-used to describe the ability of a library, website, or application to handle and respond to users, who communicate through a right-to-left language such as Arabic, Hebrew, Chinese or Japanese. Left-to-right is the default language input for most users of the web, but many websites and applications wish to also provide RTL support for their visitors.

Admittedly, RTL falls more into the internationalization space. However, we like to think of RTL as an accessibility feature as well. After all, RTL is about making user experiences more accessible for visitors working in right-to-left languages alike.

## Styles

### Basic Usage

Kendo UI provides out-of-the-box RTL support and adding the features to your applications is simple. To enable it, follow the steps below:

1. Register the `kendo.rtl.css` stylesheet. It is found in the same folder as the `kendo.common.css` file&mdash;the Kendo UI `styles` folder in the latest release.

> **Important**
>
> Make sure you register the RTL stylesheet after the common stylesheet and before the theme stylesheet.

###### Example 

	<link rel='stylesheet' href='/stylesheets/kendo.rtl.min.css' />

2. Wrap the Kendo UI widgets in an HTML element with the `k-rtl` CSS class. Assign this class to the `<body>` tag, so that no additional DOM elements are required.

		<body class="k-rtl">
			<!-- Your Amazing App -->
		</body>

The `k-rtl` class has the following effects:

1. It applies a `direction:rtl` style, so you do not have to set it yourself when creating right-to-left applications.
2. It causes the widgets to change their layout in accordance with the common RTL conventions. The `kendo.rtl.css` stylesheet is required for this to happen.
3. It helps widget scripts to detect the RTL mode and, accordingly, widgets change their behavior.

### Known Limitations

* Vertical scrollbar position may be on the left or right side depending on the used browser. This cannot be controlled via CSS or script.
* The layout of the Kendo UI ListView widget depends entirely on the defined template. The widget itself does nothing to convert an existing LTR template to RTL layout. If a `k-rtl` CSS class is present and applied to a wrapper element, text direction will be reversed, but floats, margins, paddings, etc., will keep their orientation.
* Kendo UI Splitter does not reverse the order of its panes in RTL mode.

For more information on appearance and layout in Kendo UI, refer to [this article on the themes and styles Kendo UI supports]({% slug themesandappearnce_kendoui_desktopwidgets %}).

## Configuration

Unless you are building an application that exclusively uses RTL languages, the RTL support feature is something that you would want to apply based on external input, like a language selection or information from the user agent of a visitor. In that case, you can apply the `k-rtl` class at runtime using the jQuery `addClass` method.

Assume that you want to allow the user to trigger RTL support by selecting a language from a drop-down list or by clicking a button. First, add a button to your page:

	<input type="button" id="toggleRTL" value="Activate RTL Support" class="k-button" />

Then, add a click handler for the button and toggle RTL support by adding or removing the `k-rtl` class to a form, in this case a collection of form fields to which you assigned an ID of `speakerForm`:

	$('#toggleRTL').on('click', function(event) {
		var form = $('#speakerForm');

		if (form.hasClass('k-rtl')) {
			form.removeClass('k-rtl')
		} else {
			form.addClass('k-rtl');
		}
	})

With that handler in place, the user can now trigger RTL support on-demand.

## `Accept-Language` Header

In some cases, you may want to trigger RTL support automatically, as opposed to on a user action. In these cases, you can inspect the `[Accept-Language](http://www.w3.org/Protocols/rfc2616/rfc2616-sec14.html#sec14.4)` HTTP header to determine if a user prefers an RTL language.

The `Accept-Language` header is provided with every HTTP request, and is typically exposed as a property on a request object in server-side frameworks. If you are using ASP.NET, for instance, you can access the `Accept-Language` header by calling

	userLangs = Request.Headers["Accept-Language"];

For PHP use the `$_SERVER` object:

	userLangs = $_SERVER['HTTP_ACCEPT_LANGUAGE'];

For Rails applications use the `request.env` object:

	userLangs = request.env["HTTP_ACCEPT_LANGUAGE"]

Note that the `Accept-Language` header may return a comma-separated list of languages, ordered by preference. In such cases, be prepared to split the returned value into an array or list and inspect the first element to determine if adding the `k-rtl` class to the returned markup is necessary.

For additional information on Kendo UI RTL support, including its built-in behavior and layout considerations, see the [RTL Support](/web/appearance-rtl) help topic.

## See Also

Other articles on Kendo UI Accessibility support:

* [Overview of Web Accessibility Standards]({% slug overview_accessibility_support_kendoui %})
* [Charts]({% slug charts_accessibility_support %})
* [High-Contrast Theme]({% slug high_contrast_theme_accessibility_support %})
* [Keyboard Shortcuts]({% slug keyboard_shortcuts_accessibility_support %})
* [Section 508]({% slug section508_accessibility_support %})
* [WAI-ARIA]({% slug wai_aria_accessibility_support %})

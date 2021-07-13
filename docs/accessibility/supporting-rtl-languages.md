---
title: Right-to-Left Languages
page_title: Right-to-Left Languages | Kendo UI Accessibility Support
related: a11y-accessibility-overview, widget-appearance-rtl
description: "Learn more about the Accessibility features related to bidirectional languages, supported by Kendo UI controls."
slug: right_toleft_languages_accessibility_support
position: 6
---

# Right-to-Left Languages

Right-to-left (RTL) support refers to the ability of a library, website, or application to handle and respond to users who communicate through a right-to-left language such as Arabic, Hebrew, Chinese or Japanese.

The default language input for most users of the web is left-to-right. However, many websites and applications wish to also provide RTL support for their visitors. The RTL functionality falls more into the internationalization space but can be considered as an accessibility feature as well. After all, RTL is about making user experiences more accessible for visitors who use right-to-left languages.

## Configuration

Unless you are building an application that exclusively uses RTL languages, it is intuitive to apply the RTL support feature based on external input, such as language selection or information from the user agent of a visitor. In that case, you can apply the `k-rtl` class at runtime using the jQuery `addClass` method.

For example, if you want to allow the user to trigger RTL support by selecting a language from a drop-down list or by clicking a button:

1. Add a button to your page by using the `<input type="button" id="toggleRTL" value="Activate RTL Support" class="k-button" />` setting.
1. Add a click handler for the button and toggle RTL support by adding or removing the `k-rtl` class to a form&mdash;in this case, a collection of form fields to which you assigned an ID of `speakerForm`. With that handler in place, the user can now trigger RTL support on demand.

				$('#toggleRTL').on('click', function(event) {
					var form = $('#speakerForm');

					if (form.hasClass('k-rtl')) {
						form.removeClass('k-rtl')
					} else {
						form.addClass('k-rtl');
					}
				})

## Adding the Styles

You also need to configure your project with the proper styles for the RTL rendering of the content.

### Setup

1. Register the `kendo.rtl.css` stylesheet. It is located in the same folder as the `kendo.common.css` file&mdash;the Kendo UI `styles` folder in the latest release.

		> You have to register the RTL stylesheet after the common stylesheet and before the theme stylesheet.

				<link rel='stylesheet' href='/stylesheets/kendo.rtl.min.css' />

2. Wrap the Kendo UI widgets in an HTML element with the `k-rtl` CSS class. Assign this class to the `<body>` tag so that no additional DOM elements are required.

		The `k-rtl` class has the following effects:

		* Applies a `direction:rtl` style, so you do not have to set it yourself when creating right-to-left applications.
		* Causes the widgets to change their layout in accordance with the common RTL conventions. The `kendo.rtl.css` stylesheet is required for this to happen.
		* Helps widget scripts to detect the RTL mode and, accordingly, widgets change their behavior.

				<body class="k-rtl">
					<!-- Your Amazing App -->
				</body>

### Known Limitations

* Vertical scrollbar position may be on the left or right side depending on the used browser. This cannot be controlled via CSS or script.
* The layout of the Kendo UI ListView widget depends entirely on the defined template. The widget itself does nothing to convert an existing LTR template to RTL layout. If a `k-rtl` CSS class is present and applied to a wrapper element, text direction will be reversed, but floats, margins, paddings, etc., will keep their orientation.
* Kendo UI Splitter does not reverse the order of its panes in RTL mode.

For more information on appearance and layout in Kendo UI, refer to [the article on the themes and styles Kendo UI supports]({% slug themesandappearnce_kendoui_desktopwidgets %}).

## Automatic Implementation

Your project might require you to trigger the RTL support automatically and not upon user interaction. In such cases, you can inspect the [`Accept-Language`](https://www.w3.org/Protocols/rfc2616/rfc2616-sec14.html#sec14.4) HTTP header to determine if a user prefers an RTL language.

The `Accept-Language` header is provided with every HTTP request, and is typically exposed as a property on a request object in server-side frameworks. If you are using ASP.NET, for instance, you can access the `Accept-Language` header by calling `userLangs = Request.Headers["Accept-Language"];`.

For PHP, use the `$_SERVER` object&mdash;`userLangs = $_SERVER['HTTP_ACCEPT_LANGUAGE'];`. For Rails applications, use the `request.env` object&mdash;`userLangs = request.env["HTTP_ACCEPT_LANGUAGE"]`.

The `Accept-Language` header may return a comma-separated list of languages, ordered by preference. In such cases, you have to split the returned value into an array or list and inspect the first element to determine if adding the `k-rtl` class to the returned markup is necessary.

## See Also

* [Overview of Accessibility Features in Kendo UI]({% slug overview_accessibility_support_kendoui %})
* [Section 508 Support in Kendo UI]({% slug section508_accessibility_support %})
* [Section 508 and WCAG 2.1 Compliance of Kendo UI Widgets]({% slug section508_wcag21_accessibility_support %})
* [WAI-ARIA Support in Kendo UI]({% slug wai_aria_accessibility_support %})
* [Keyboard Support in Kendo UI]({% slug keyboard_shortcuts_accessibility_support %})
* [Working with the Kendo UI High-Contrast Theme]({% slug high_contrast_theme_accessibility_support %})
* [Five Tips for Accessible Charts with Kendo UI]({% slug charts_accessibility_support %})

---
title: Troubleshooting
page_title: Troubleshooting in Kendo UI JavaScript framework
description: "Find solutions for common problems when working with Kendo UI widgets: JavaScript errors, versions availability on CDN, undefined widget object."
position: 9
---

# Troubleshooting

This page provides solutions for common problems you may encounter while working with Kendo UI widgets.

## Checking for JavaScript errors

JavaScript errors are likely to prevent a web page from working as expected. By default all browsers
hide the JavaScript errors from the end user.

Fortunately there are [browser developer tools](http://javascript.info/tutorial/development) to inspect and debug JavaScript errors.

## Known JavaScript Errors

### JavaScript error that jQuery is unavailable or undefined

If jQuery is not included, or is included after the Kendo UI JavaScript files, or is included after Kendo UI widget initialization statements, the Kendo UI widgets will not function as expected.
The following JavaScript errors will be thrown (depending on the browser):

* ReferenceError: jQuery is not defined (in Google Chrome and FireFox)
* 'jQuery' is undefined (in Internet Explorer)

#### Solution
Make sure that jQuery is included **only before** the Kendo UI JavaScript files and before any Javascript statements that depend on it.

### JavaScript error that Kendo widgets are unavailable or undefined

If jQuery is included more than once in the page all existing jQuery plugins (including Kendo UI) will be wiped out. Will also occur
if the [required Kendo JavaScript files](/javascript-dependencies) are not included.

The following JavaScript errors will be thrown (depending on the browser):

* TypeError: Object #<Object> has no method 'kendoGrid' (in Google Chrome)
* TypeError: $("#Grid").kendoGrid is not a function (in FireFox)
* Object doesn't support property or method 'kendoGrid' (in Internet Explorer 9+)
* Object doesn't support this property or method (in older versions of Internet Explorer)

> **Note**: All Kendo widgets will be affected by this problem, not just the Kendo Grid. Just the error message will be different e.g. "kendoChart is not a function" or "Object has no method kendoEditor".

#### Solution
Make sure jQuery is not included more than once in your page. Remove any duplicate `script` references to jQuery. Include all [required Kendo JavaScript files](/javascript-dependencies).

### JavaScript error that Kendo widgets cannot be initialized in IE (Compatibility mode)

Kendo widgets provide a WAI-ARIA support, which means that some ARIA specific attributes are added to the HTML element. When a widget tries to add an ARIA attribute using
[jQuery's attr method](http://api.jquery.com/attr/), which in turn calls[Element.setAttribute method](https://developer.mozilla.org/en-US/docs/Web/API/Element.setAttribute),
the *Internet Explorer* in Compatibility mode will raise a JavaScript error with the following message:

* SCRIPT3: Member not found (in Internet Explorer 10+ in Compatibility Mode)

The problem is reported to Microsoft [here](https://connect.microsoft.com/IE/feedback/details/774078). Also there is a [jQuery bug report](http://bugs.jquery.com/ticket/12577)
where more information can be found.

> **Note**: All Kendo widgets, which adds ARIA attributes to HTML elements will be affected.

#### Solution
1. The workaround is to force the *Internet Exprorer* to use the 'Edge' mode:

    <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1" />

2. The other option is to path jQuery. You can find more information about the possible path in the aforementioned jQuery bug report.

## Scripts or stylesheets do not load from the Kendo UI CDN

Please refer to [Kendo UI CDN Fallback and Troubleshooting](/install/cdn#cdn-fallback-and-troubleshooting).

## The widget object is undefined after loading a page through AJAX

Usually caused when the page loaded via AJAX contains a script reference to jQuery. When jQuery is re-initialized, all jQuery-based data attributes are cleared, including the data("kendoWidget") attribute that holds the Kendo UI widget object.

The solution is to load a partial HTML fragment that doesn't contain any unneeded jQuery references, or use an iframe to load the complete page.

#### Example: Problem

    $("#dialog").kendoWinodow({
        // loads complete page
        content: "/foo"
    });

#### Example: Solution

    $("#dialog").kendoWinodow({
        // load complete page...
        content: "/foo",
        // ... and show it in an iframe
        iframe: true
    });

    // or

    $("#dialog").kendoWinodow({
         // load partial page, without jQuery reference
        content: "/foo"
    });

## Input Widgets do not raise change event when API is used

Change event of an input widget is triggered only by user action. DOM elements work in the same way.

If you need to trigger an event manually use the [trigger method](/api/framework/widget#trigger).

## Creating two or more widgets produces JavaScript errors or only the first one is initialized/working.

This will happen if two or more widgets are initialized from elements that have same IDs. The ID for each element on the page should be unique. jQuery will find only the first one every time it searches for it and thus try to initialize the first element in the DOM multiple times.

	<textarea id="editor"></textarea>
	<textarea id="editor"></textarea>
	<script>
		$('#editor').kendoEditor();
		$('#editor').kendoEditor(); // problem
	</script>

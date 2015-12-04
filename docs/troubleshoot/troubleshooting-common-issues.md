---
title: Common Issues
page_title: Common Issues | Kendo UI Troubleshooting
description: "Learn about the solutions of issues that may occur while working with Kendo UI controls."
previous_url: /troubleshooting
slug: troubleshooting_common_issues_kendoui
---

# Common Issues

This page provides solutions for common problems you may encounter while working with Kendo UI widgets.

## jQuery

### jQuery Is Unavailable or Undefined

If jQuery is not included, or is included after the Kendo UI JavaScript files, or is included after Kendo UI widget initialization statements, the Kendo UI widgets will not function as expected.
The following JavaScript errors will be thrown (depending on the browser):

* ReferenceError: jQuery is not defined (in Google Chrome and Firefox)
* 'jQuery' is undefined (in Internet Explorer)

**Solution**

Make sure that jQuery is included only before the Kendo UI JavaScript files and before any Javascript statements that depend on it.

## Widgets

### Widgets Are Unavailable or Undefined

If jQuery is included more than once in the page all existing jQuery plugins (including Kendo UI) will be wiped out. Will also occur if the [required Kendo JavaScript files](/intro/installation/prerequisites) are not included.

Depending on the browser, the following JavaScript errors will be thrown:

* TypeError: Object `#<Object>` has no method `kendoGrid` (in Google Chrome)
* TypeError: `$("#Grid").kendoGrid` is not a function (in Firefox)
* Object does not support property or method 'kendoGrid' (in Internet Explorer 9 and later)
* Object does not support this property or method (in older versions of Internet Explorer)

> **Important**  
> All Kendo widgets will be affected by this problem, not just the Kendo Grid. Just the error message will be different e.g. "kendoChart is not a function" or "Object has no method kendoEditor".

**Solution**

Make sure jQuery is not included more than once in your page. Remove any duplicate `script` references to jQuery. Include all [required Kendo JavaScript files](/intro/installation/prerequisites).

### Widgets Cannot Be Initialized in Internet Explorer Compatibility Mode

Kendo widgets provide a WAI-ARIA support, which means that some ARIA-specific attributes are added to the HTML element. When a widget tries to add an ARIA attribute using [jQuery's `attr` method](http://api.jquery.com/attr/), which in turn calls the [`Element.setAttribute` method](https://developer.mozilla.org/en-US/docs/Web/API/Element/setAttribute), the Internet Explorer in Compatibility mode will raise a JavaScript error with the following message:

* SCRIPT3: Member not found (in Internet Explorer 10+ in Compatibility Mode)

The problem is reported to Microsoft on `https://connect.microsoft.com/IE/feedback/details/774078`. Also there is a [jQuery bug report](http://bugs.jquery.com/ticket/12577)
where more information can be found.

> **Important**  
> All Kendo widgets, which add ARIA attributes to HTML elements, will be affected.

**Solution**  

**Option 1** Force the Internet Explorer to use the Edge mode:

 ```
 <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1" />
 ```

**Option 2** Path jQuery. You can find more information about the possible path in the aforementioned jQuery bug report.

### Input Widgets Do Not Raise Change Event When API Is Used

The change event of an input widget is triggered only by user action. DOM elements work in the same way. If you need to trigger an event manually use the [trigger method](/api/javascript/ui/widget#methods-trigger).

### Creating Multiple Widgets Throws JavaScript Errors

This will happen if two or more widgets are initialized from elements that have same IDs. jQuery will find only the first one every time it searches for it and thus try to initialize the first element in the DOM multiple times.

**Solution**  

The ID for each element on the page should be unique. 

	<textarea id="editor"></textarea>
	<textarea id="editor"></textarea>
	<script>
		$('#editor').kendoEditor();
		$('#editor').kendoEditor(); // problem
	</script>
    
### When Creating Multiple Widgets Only One of Them Works

For a solution, see the [Creating Multiple Widgets Throws JavaScript Errors](#creating-multiple-widgets-throws-javascript-errors) section above.

### Third-Party Modal Popups Prevent Access to Kendo UI Widgets

Some third-party modal popups prevent access to focusable elements, which are rendered outside the modal popup. Such widgets include the Bootstrap modal dialog, the jQuery UI modal dialog, and possibly others. The Kendo UI widgets, which are affected by this behavior are all widgets, which render their own detached popups, e.g. AutoComplete, ColorPicker, ComboBox, DropDownList, DateTimePicker, Editor, Grid, and MultiSelect. The popups of these Kendo UI widgets are rendered as children of the `<body>` and as a result, the third-party modal popup will prevent access to them.

**Solution** 

There are two ways to avoid this problem:

* Disable the modal popup's modality, so that elements outside it can be focused.
* Use a [modal](/api/javascript/ui/window#configuration-modal) Kendo UI [Window](/web/window/overview) instead of a third-party popup.

## CDN

### Scripts or Stylesheets Do Not Load from CDN

For a solution, refer to [Kendo UI CDN Fallback and Troubleshooting](/intro/installation/cdn-service#troubleshooting).

## Status Codes

### 404 Status Code Is Thrown for WOFF or TTF Font Files

For a solution, refer to [Serving Icon Fonts](/mobile/icons#serving-icon-fonts).

## Ajax 

### Widget Object Is Undefined after Loading a Page through AJAX

This issue is usually caused when the page loaded via AJAX contains a script reference to jQuery. When jQuery is re-initialized, all jQuery-based data attributes are cleared, including the data(`kendoWidget`) attribute that holds the Kendo UI widget object.

**Solution** 

Load a partial HTML fragment that does not contain any unneeded jQuery references, or use an `iframe` to load the complete page.

###### Example - a test issue

    $("#dialog").kendoWinodow({
        // loads complete page
        content: "/foo"
    });

###### Example - the solution of the issue above

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

## See Also

Other articles on troubleshooting:

* [JavaScript Errors]({% slug troubleshooting_javascript_errors_kendoui %})
* [Performance Issues]({% slug troubleshooting_system_memory_symptoms_kendoui %})
* [Content Security Policy]({% slug troubleshooting_content_security_policy_kendoui %})
* [Common Issues in Kendo UI ComboBox]({% slug troubleshooting_common_issues_combobox_kendoui %})
* [Common Issues in Kendo UI DropDownList]({% slug troubleshooting_common_issues_dropdownlist_kendoui %})
* [Common Issues in Kendo UI Editor]({% slug troubleshooting_editor_widget %})
* [Common Issues in Kendo UI MultiSelect]({% slug troubleshooting_common_issues_multiselect_kendoui %})
* [Common Issues in Kendo UI Scheduler]({% slug troubleshooting_scheduler_widget %})
* [Common Issues in Kendo UI Upload](/web/upload/troubleshooting)
* [Common Issues in Widgets Rendering Data Visualization](/dataviz/troubleshooting)
* [Common Issues in Telerik UI for ASP.NET MVC](/aspnet-mvc/troubleshooting)
* [Common Issues in the Grid ASP.NET MVC HtmlHelper Extension](/aspnet-mvc/helpers/grid/troubleshooting)
* [Common Issues in the Upload ASP.NET MVC HtmlHelper Extension](/aspnet-mvc/helpers/upload/troubleshooting)
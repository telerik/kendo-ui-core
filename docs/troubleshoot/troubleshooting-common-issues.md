---
title: Common Issues
page_title: Common Issues | Kendo UI Troubleshooting
description: "Learn about the solutions of issues that may occur while working with Kendo UI controls."
previous_url: /troubleshooting
slug: troubleshooting_common_issues_kendoui
---

# Common Issues

This page provides solutions for common problems you may encounter while working with Kendo UI widgets.

## Offline Examples

### Examples Fail to Load Sample Data

The most common cause for this error is loading the demos from the file system. Google Chrome, for example, will disallow accessing the JSON files needed for the demos to run.

**Solution**

Host the offline demos on a web server and load them from there.

## jQuery

### jQuery Is Unavailable or Undefined

If jQuery is not included, or is included after the Kendo UI JavaScript files, or is included after Kendo UI widget initialization statements, the Kendo UI widgets will not function as expected.

The following JavaScript errors will be thrown (depending on the browser):

* `ReferenceError: jQuery is not defined` (in Google Chrome and Firefox)
* `jQuery is undefined` (in Internet Explorer)

**Solution**

Make sure that jQuery is included only before the Kendo UI JavaScript files and before any Javascript statements that depend on it.

## Widgets

### Widgets Are Unavailable or Undefined

If jQuery is included more than once in the page all existing jQuery plugins (including Kendo UI) will be wiped out. Will also occur if the [required Kendo JavaScript files]({% slug javascript_prerequisites_kendoui_installation %}) are not included.

Depending on the browser, the following JavaScript errors will be thrown:

* TypeError: Object `#<Object>` has no method `kendoGrid` (in Google Chrome)
* TypeError: `$("#Grid").kendoGrid` is not a function (in Firefox)
* Object does not support property or method 'kendoGrid' (in Internet Explorer 9 and later)
* Object does not support this property or method (in older versions of Internet Explorer)

> **Important**
>
> All Kendo UI widgets are going to be affected by this issue, not just the Kendo UI Grid. Only the error message is different e.g. `kendoChart is not a function` or `Object has no method kendoEditor`.

**Solution**

Make sure jQuery is not included more than once in your page. Remove any duplicate `script` references to jQuery. Include all [required Kendo JavaScript files]({% slug javascript_prerequisites_kendoui_installation %}).

### Widgets Cannot Be Initialized in Internet Explorer Compatibility Mode

Kendo widgets provide a WAI-ARIA support, which means that some ARIA-specific attributes are added to the HTML element. When a widget tries to add an ARIA attribute using [jQuery's `attr` method](http://api.jquery.com/attr/), which in turn calls the [`Element.setAttribute` method](https://developer.mozilla.org/en-US/docs/Web/API/Element/setAttribute), the Internet Explorer in Compatibility mode will raise a JavaScript error with the following message:

* SCRIPT3: Member not found (in Internet Explorer 10+ in Compatibility Mode)

The problem is reported to Microsoft on `https://connect.microsoft.com/IE/feedback/details/774078`. Also there is a [jQuery bug report](http://bugs.jquery.com/ticket/12577)
where more information can be found.

> **Important**
>
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
* Use a [modal](/api/javascript/ui/window#configuration-modal) [Kendo UI Window]({% slug overview_kendoui_window_widget %}) instead of a third-party popup.

### Widgets Do Not Work Correctly on Touch Devices

Client libraries, which interfere with touch events, such as FastClick, are not compatible with Kendo UI and may break the widgets' behavior, e.g. cause a dropdown to close immediately after opening.

For more information on this issue, refer to [What Exactly Is... The 300ms Click Delay](http://www.telerik.com/blogs/what-exactly-is.....-the-300ms-click-delay).

### Widget Popup Is Offset Incorrectly in Internet Explorer

When Kendo UI is used with jQuery `1.12.0` or `2.2.0`, some issues with the popup positioning could occur. The popup is offset incorrectly when the page is scrolled. The investigation showed that the issue is due to a bug in the aforementioned jQuery version. According to their bug tracker, it will be addressed in the next patch release of jQuery.

Find more details at [https://github.com/telerik/kendo-ui-core/issues/1375](https://github.com/telerik/kendo-ui-core/issues/1375).

## CDN

### Scripts or Stylesheets Do Not Load from CDN

For a solution, refer to [Kendo UI CDN Fallback and Troubleshooting]({% slug kendoui_cdn_services_installation %}#troubleshooting).

## Status Codes

### 404 Status Code Is Thrown for WOFF or TTF Font Files

For a solution, refer to [Serving Font Files]({% slug hybridiconfonts_hybridkendoui %}#serving-font-files).

### 404 Status Code Is Thrown for JSON Files on IIS

By default, IIS does not serve files with unknown extensions. The mime types can be specified either through the IIS management console (inetmgr) or in the site `Web.config`.

The example below demonstrates how to configure the IIS Web.config. Note the mime is removed first to avoid clashes if it is already defined.

###### Example

```xml
    <?xml version="1.0"?>
    <configuration>
        ...
        <system.webServer>
            ...
            <staticContent>
                <remove fileExtension=".json" />
                <mimeMap fileExtension=".json" mimeType="application/json" />
            </staticContent>
        </system.webServer>
    </configuration>
```

## Ajax

### Widget Object Is Undefined after Loading a Page through AJAX

This issue is usually caused when the page loaded via AJAX contains a script reference to jQuery. When jQuery is re-initialized, all jQuery-based data attributes are cleared, including the data(`kendoWidget`) attribute that holds the Kendo UI widget object.

**Solution**

Load a partial HTML fragment that does not contain any unneeded jQuery references, or use an `iframe` to load the complete page.

The example below demonstrates a test issue.

###### Example

    $("#dialog").kendoWinodow({
        // loads complete page
        content: "/foo"
    });

The example below demonstrates the solution of the test issue above.

###### Example

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
* [Common Issues in Kendo UI Excel Export]({% slug troubleshooting_excel_export_kendoui %})
* [Common Issues in Kendo UI Charts]({% slug troubleshooting_chart_widget %})
* [Performance Issues in Kendo UI Widgets for Data Visualization]({% slug tipsandtricks_kendouistyling %})
* [Common Issues in Kendo UI ComboBox]({% slug troubleshooting_common_issues_combobox_kendoui %})
* [Common Issues in Kendo UI Diagram]({% slug troubleshooting_diagram_widget %})
* [Common Issues in Kendo UI DropDownList]({% slug troubleshooting_common_issues_dropdownlist_kendoui %})
* [Common Issues in Kendo UI Editor]({% slug troubleshooting_editor_widget %})
* [Common Issues in Kendo UI MultiSelect]({% slug troubleshooting_common_issues_multiselect_kendoui %})
* [Common Issues in Kendo UI Scheduler]({% slug troubleshooting_scheduler_widget %})
* [Common Issues in Kendo UI Upload]({% slug troubleshooting_upload_widget %})
* [Common Issues Related to Styling, Appearance, and Rendering]({% slug commonissues_troubleshooting_kendouistyling %})
* [Common Issues in Telerik UI for ASP.NET MVC]({% slug troubleshooting_aspnetmvc %})
* [Validation Issues in Telerik UI for ASP.NET MVC]({% slug troubleshooting_validation_aspnetmvc %})
* [Scaffolding Issues in Telerik UI for ASP.NET MVC]({% slug troubleshooting_scaffolding_aspnetmvc %})
* [Common Issues in the Grid ASP.NET MVC HtmlHelper Extension]({% slug troubleshoot_gridhelper_aspnetmvc %})
* [Excel Export with the Grid ASP.NET MVC HtmlHelper Extension]({% slug excelissues_gridhelper_aspnetmvc %})
* [Common Issues in the Spreadsheet ASP.NET MVC HtmlHelper Extension]({% slug troubleshoot_spreadsheethelper_aspnetmvc %})
* [Common Issues in the Upload ASP.NET MVC HtmlHelper Extension]({% slug troubleshoot_uploadhelper_aspnetmvc %})

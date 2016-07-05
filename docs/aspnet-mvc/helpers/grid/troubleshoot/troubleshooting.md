---
title: Common Issues
page_title: Common Issues | Grid HtmlHelper Troubleshooting
description: "Learn about the solutions of common issues that may occur while working with Kendo UI Grid for ASP.NET MVC."
slug: troubleshoot_gridhelper_aspnetmvc
position: 1
---

# Common Issues

## Requests

### Grid Performs HTTP GET Requests instead of POST

By default, the Kendo UI Grid for ASP.NET MVC makes POST requests when configured for [Ajax binding]({% slug ajaxbinding_grid_aspnetmvc %}). This is implemented by a custom DataSource transport and schema. Those are defined in the `kendo.aspnetmvc.min.js`.

**Solution**

Make sure this file is included after the other Kendo UI JavaScript files. For more information, refer to the [ASP.NET MVC introductory article]({% slug overview_aspnetmvc %}).

The example below demonstrates the correct order of JavaScript files.

###### Example

```
<script src="/Scripts/kendo.all.min.js"></script>
<script src="/Scripts/kendo.aspnetmvc.min.js"></script>
```

## Binding

Learn about the Kendo UI components for React which are delivered by the Inputs package.

### Ajax-Bound Grid Does Not Populate

There are various reasons which may cause this.

**Solution**

Below are listed the steps for you to follow when troubleshooting this issue.

**Step 1** Use your browser developer console to check for any JavaScript errors. In most browsers pressing `F12` displays the developer console. Address all JavaScript errors.

For more information, refer to the [Telerik UI for ASP.NET MVC troubleshooting article]({% slug troubleshooting_aspnetmvc %}).

**Step 2** Check the **Network**&mdash;or **Net** in Firebug&mdash;tab of the browser developer console. Look for a failed HTTP request for the action method configured via the `DataSource` Grid setting.

* HTTP status code [401](https://en.wikipedia.org/wiki/List_of_HTTP_status_codes#401) indicates that the required authentication has failed or has not been provided yet.
* HTTP status code [403](https://en.wikipedia.org/wiki/List_of_HTTP_status_codes#403) indicates that the request is not authorized. Perhaps the current user does not have     the required permissions.
* HTTP status code [404](https://en.wikipedia.org/wiki/List_of_HTTP_status_codes#404) indicates that the requested URL cannot be found. Check if the controller and action names are spelled correctly.
* HTTP status code [500](https://en.wikipedia.org/wiki/List_of_HTTP_status_codes#500) indicates that a server error occurred while processing the request. Check what the server response is. In most cases, it will contain the full `.NET` stacktrace. If the reason for the exception is not clear, put a break-point in the action method and break with the debugger. Also, refer to the [section on well-known exceptions](#well-known-exceptions).

**Step 3** Check if you are using the `ToDataSourceResult` extension method. That method returns the data in the JSON format expected by the Kendo UI Grid. For further instrictions, refer to the [article on Grid Ajax binding]({% slug ajaxbinding_grid_aspnetmvc %}).

### Client-Side Events Are Not Raised in Server-Bound Mode

When configured for server binding, the Kendo UI Grid for ASP.NET MVC does not fire all client-side events.

**Solution**

For more information on how to resolve this issue, refer to the [article on server binding of the Grid]({% slug serverbinding_grid_aspnetmvc %}#supported-client-side-events).

## Performance

### Grid Fails to Update Dates and Numbers When Current Culture Is Not en-US

**Solution**

Make sure the JavaScript file for that culture is included. For additional information on this issue, refer to [this section]({% slug troubleshoot_gridhelper_aspnetmvc %}#include-javascript-for-the-current-culture-razor).

### Column Templates Are Not Displayed

**Case 1** The column template is not displayed if the server template is set but the Grid is configured for Ajax binding.

**Solution**

Set the [`ClientTemplate`]({% slug configuration_gridhelper_aspnetmvc %}#clienttemplate) as well.

**Case 2** The column template might also not be displayed if only the client template is set but the Grid is configured for server binding.

**Solution**

Set the [Template]({% slug configuration_gridhelper_aspnetmvc %}#template) as well.

### "X" DataSource Configuration Option Is Not Available

Not all settings of the DataSource are exposed through the `DataSource` fluent API.

**Solution**

To gain full control over the DataSource, consider using the [`CustomDataSource`]({% slug customdatasource_aspnetmvc %}) fluent API or the client-side version of the Kendo UI Grid.

### Grid Fires Create Actions instead of Update Actions

If an ID value is not set for a given data item, the Grid treats it as new and calls the `Create` action.

**Solution**

The ID value should be non-default for the used data field type.

## Known Exceptions

### Circular Reference Detected While Serializing an Object of Type

The reason for this exception is that the [`JavaScriptSerializer`](https://msdn.microsoft.com/en-us/library/system.web.script.serialization.javascriptserializer.aspx) class used by the [`Json`](https://msdn.microsoft.com/en-us/library/system.web.mvc.controller.json.aspx) method cannot serialize object graphs which contain circular references (refer to each other).

**Solution**

Use View Model objects and avoid serializing the properties which create the circular reference. For further information on this issue, refer to the [article on avoiding circular reference exceptions]({% slug freqaskedquestions_gridhelper_aspnetmvc %}#how-to-avoid-circular-reference-exceptions).

### JSON JavaScriptSerializer Serialization or Deserialization Error

This exception is thrown when the length of the JSON response exceeds the default [`MaxJsonLength`](https://msdn.microsoft.com/en-us/library/system.web.script.serialization.javascriptserializer.maxjsonlength.aspx).

**Solution**

Below are listed some of the possible solutions for you to apply when resolving this issue.

**Option 1** Enable paging by calling the `Pageable` method.

**Option 2** Serialize only the required properties of your model by [using a View Model]({% slug freqaskedquestions_gridhelper_aspnetmvc %}#how-to-convert-my-models-to-view-model-objects).

**Option 3** Manually serialize the `DataSourceResult`.

###### Example

        public ActionResult Read([DataSourceRequest] DataSourceRequest request)
        {
            var data = GetData();
            var serializer = new JavaScriptSerializer();
            var result = new ContentResult();
            serializer.MaxJsonLength = Int32.MaxValue; // Whatever max length you want here
            result.Content = serializer.Serialize(data.ToDataSourceResult(request));
            result.ContentType = "application/json";
            return result;
        }

### Sensitive Information Error Message

An exception that a request has been blocked because sensitive information could be disclosed to third-party web sites when this is used in a `GET` request would be thrown when the `kendo.aspnetmvc.min.js` is not included or is included before the `kendo.all.min.js`.

Yet another reason is that you explicitly specified that the Grid should make HTTP `GET` requests via the `Type` setting but did not allow HTTP `GET` requests.

**Solution**

Allow `GET` requests.

###### Example

    // View

    // Omitted for brevity.
    .DataSource(dataSource => dataSource.Ajax()
        .Read(read => read.Action("Read", "Home").Type(HttpVerbs.Get)) // tell the DataSource to make GET requests
    // Omitted for brevity.

    // Controller
    public ActionResult Read([DataSourceRequest] DataSourceRequest request)
    {
        var data = GetData();

        return Json(result.ToDataSourceResult(request), JsonRequestBehavior.AllowGet);
    }

### Limited Usage of Templates

An exception that templates can be used only with field access, property access, single-dimension array index, or single-parameter custom indexer expressions can occur if an editable Grid is bound to a `DataTable` or `DataSet`. The reason is that the ASP.NET MVC `EditorFor` method does not support `DataTable`.

**Solution**

Use a pop-up edit form with a custom editor template.

For more information on how to resolve this issue, refer to the resources listed below.

* [Example: MVC Grid Popup Editing](http://demos.telerik.com/aspnet-mvc/grid/editing-popup)
* [Example: Bind the Grid for ASP.NET MVC to a DataTable](/aspnet-mvc/helpers/grid/how-to/grid-bind-to-datatable)
* [Documentation: MVC Grid Editor Templates]({% slug editortemplates_grid_aspnetmvc %})&mdash;use a separate editor template for each data field.
* [Documentation: Grid TemplateName setting](/api/aspnet-mvc/kendo.mvc.ui.fluent/grideditingsettingsbuilder#methods-TemplateName(System.String))&mdash;use it
to set a single edit form template for the whole edit form.

### Invalid Template Error When Nesting Client Templates

The Kendo UI widgets are unable to detect if they are used in nested client template scenarios. Such a setup requires the escaping of the `#` literals and the closing `</script>` tags in the HTML markup and JavaScript initialization statements of the nested widgets. However, this cannot happen automatically. As a result, nested client template scenarios are not supported out-of-the-box.

**Solution**

Consider the following scenario:

* Grid **A** is placed in a View. Grid **A** has a popup edit template.
* Grid **B** is placed in a partial view, which represents the popup edit template of Grid **A**.
* A Kendo UI widget **C** is placed in the same partial view as Grid **B**. The widget **C** belongs to the client detail template of the Grid **B**.

In the above scenario, the widget **C** will not be rendered correctly and will cause an `Invalid template` JavaScript error.

The easiest way to avoid the JavaScript error is the following:

**Step 1** Move the declaration of widget **C** to a separate partial view.

**Step 2** Render the partial view in the main View where Grid **A** is defined.

In this case widget **C** will not exist in a nested template context and its HTML/JavaScript output will not need any escaping.

## Culture Formats

By default, the Kendo UI Grid formats dates and numbers using the `en-US` culture.

**Solution**

If the Grid does not display numbers and dates in the right format that corresponds to your culture, change the culture by including the JavaScript for your culture and then call `kendo.culture`.

### Culture-Specific Kendo UI JavaScript

The example below demonstrates how to include culture-specific Kendo UI JavaScript.

###### Example

    <script src="/Scripts/cultures/kendo.culture.de-DE.js"></script>
    <script>
        kendo.culture("de-DE");
    </script>

### JavaScript for Current Cultures

The example below demonstrates how to include JavaScript for the current culture.

###### Example

```tab-ASPX

    <%
        var culture = System.Threading.Thread.CurrentThread.CurrentCulture.ToString();
    %>
    <script src="<%= Url.Content("~/Scripts/cultures/kendo.culture." + culture + ".min.js") %>"></script>
    <script>
        kendo.culture("<%= culture %>");
    </script>
```
```tab-Razor

    @{
        var culture = System.Threading.Thread.CurrentThread.CurrentCulture.ToString();
    }
    <script src="@Url.Content("~/Scripts/cultures/kendo.culture." + culture + ".min.js")"></script>
    <script>
        kendo.culture("@culture");
    </script>
```

For additional information on this issue, refer to the [article on globalization]({% slug globalization_aspnetmvc %}).

## See Also

Other articles on the Kendo UI Grid for ASP.NET MVC:

* [Overview of the Grid HtmlHelper]({% slug overview_gridhelper_aspnetmvc %})
* [Configuration of the Grid HtmlHelper]({% slug configuration_gridhelper_aspnetmvc %})
* [Scaffolding]({% slug scaffoldinggrid_aspnetmvc %})
* [Excel Export]({% slug excelexport_gridhelper_aspnetmvc %})
* [Frequently Asked Questions]({% slug freqaskedquestions_gridhelper_aspnetmvc %})
* [Binding of the Grid HtmlHelper]({% slug ajaxbinding_grid_aspnetmvc %})
* [Editing of the Grid HtmlHelper]({% slug ajaxediting_grid_aspnetmvc %})
* [Templating of the Grid HtmlHelper]({% slug clientdetailtemplate_grid_aspnetmvc %})
* [API Reference of the Grid HtmlHelper](/api/aspnet-mvc/Kendo.Mvc.UI.Fluent/GridBuilder)
* [Overview of the Kendo UI Grid Widget]({% slug overview_kendoui_grid_widget %})

Articles on Telerik UI for ASP.NET MVC:

* [Overview of Telerik UI for ASP.NET MVC]({% slug overview_aspnetmvc %})
* [Fundamentals of Telerik UI for ASP.NET MVC]({% slug fundamentals_aspnetmvc %})
* [Scaffolding in Telerik UI for ASP.NET MVC]({% slug scaffolding_aspnetmvc %})
* [Telerik UI for ASP.NET MVC API Reference Folder](/api/aspnet-mvc/Kendo.Mvc/AggregateFunction)
* [Telerik UI for ASP.NET MVC HtmlHelpers Folder]({% slug overview_barcodehelper_aspnetmvc %})
* [Tutorials on Telerik UI for ASP.NET MVC]({% slug overview_timeefficiencyapp_aspnetmvc6 %})
* [Telerik UI for ASP.NET MVC Troubleshooting]({% slug troubleshooting_aspnetmvc %})

Other articles on troubleshooting:

* [Common Issues in Kendo UI]({% slug troubleshooting_common_issues_kendoui %})
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
* [Excel Export with the Grid ASP.NET MVC HtmlHelper Extension]({% slug excelissues_gridhelper_aspnetmvc %})
* [Common Issues in the Spreadsheet ASP.NET MVC HtmlHelper Extension]({% slug troubleshoot_spreadsheethelper_aspnetmvc %})
* [Common Issues in the Upload ASP.NET MVC HtmlHelper Extension]({% slug troubleshoot_uploadhelper_aspnetmvc %})

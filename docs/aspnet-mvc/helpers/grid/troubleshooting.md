---
title: Troubleshooting
page_title: Kendo UI Grid for ASP.NET MVC Troubleshooting Guide
description: Learn how to use Kendo UI jQuery Grid component with ASP.NET MVC Helpers and easily handle most common issues.
---

# Grid Troubleshooting

## Grid Performs HTTP GET Requests Instead of POST

By default Kendo Grid for ASP.NET MVC should make POST requests when configured for [ajax binding](/aspnet-mvc/helpers/grid/ajax-binding).
This is implemented by a custom DataSource transport and schema. Those are defined in the **kendo.aspnetmvc.min.js**. Make sure that this file is included **after** the other
Kendo JavaScript files. More info can be found in the [introduction help topic](/aspnet-mvc/introduction).

**Solution**: Correct Order Of JavaScript Files
```
<script src="/Scripts/kendo.all.min.js"></script>
<script src="/Scripts/kendo.aspnetmvc.min.js"></script>
```

## Ajax Bound Grid Does Not Populate

There are various reasons which may cause this. Follow the troubleshooting instructions.

**Ajax Binding Troubleshooting**

1. Use your browser's developer console to check for any JavaScript errors. In most browsers pressing **F12** will pop up the developer console. Address all JavaScript errors.
More info can be found in the [troubleshooting help topic](/aspnet-mvc/troubleshooting).
2. Check the "Network" (or "Net" in Firebug) tab of the browser developer console. Look for a failed HTTP request for the action method configured via the `DataSource` grid setting.
    - HTTP status code [401](http://en.wikipedia.org/wiki/List_of_HTTP_status_codes#401) indicates that authentication is required and has failed or not yet been provided.
    - HTTP status code [403](http://en.wikipedia.org/wiki/List_of_HTTP_status_codes#403) indicates that request is not authorized. Perhaps the current user does not have
    the required permissions.
    - HTTP status code [404](http://en.wikipedia.org/wiki/List_of_HTTP_status_codes#404) indicates that requested URL cannot be found.
    Check if the controller and action names are spelled correctly.
    - HTTP status code [500](http://en.wikipedia.org/wiki/List_of_HTTP_status_codes#500) indicates that a server error occurred while process the request.
    Check what the server response is. In most cases it will contain the full .NET stacktrace. If the reason for the exception is not clear put a break-point
    in the action method and break with the debugger. Also check the [well known exceptions](#well-known-exceptions)
3. Check if you are using the `ToDataSourceResult` extension method. That method returns the data in the JSON format expected by the Kendo UI Grid. Check the
[ajax binding](/aspnet-mvc/helpers/grid/ajax-binding) help topic for further instructions.

## Known Exceptions

### Circular Reference Detected While Serializing an Object of Type

The reason for this exception is that the [JavaScriptSerializer](http://msdn.microsoft.com/en-us/library/system.web.script.serialization.javascriptserializer.aspx) class used by
the [Json](http://msdn.microsoft.com/en-us/library/system.web.mvc.controller.json.aspx) method cannot serialize object graphs which contain circular references (refer to each other).
The solution is to use View Model objects and avoid serializing the properties which create the circular reference.
Check ["How do I avoid circular reference exceptions"](/aspnet-mvc/helpers/grid/faq#how-do-i-avoid-circular-reference-exceptions?) for further information.

### JSON JavaScriptSerializer Serialization or Deserialization Error

This exception is thrown when the length of the JSON response exceeds the default [MaxJsonLength](http://msdn.microsoft.com/en-us/library/system.web.script.serialization.javascriptserializer.maxjsonlength.aspx).
There are a few possible solutions:

* Enable paging by calling the `Pageable` method
* [Use a View Model](/aspnet-mvc/helpers/grid/faq#how-do-i-convert-my-models-to-view-model-objects?) to serialize only the required properties of your model.
* Manually serialize the `DataSourceResult`

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

An exception that a request has been blocked because sensitive information could be disclosed to third party web sites when this is used in a GET request would be thrown when **kendo.aspnetmvc.min.js** is not included or is included **before** kendo.all.min.js. The other reason is that the developer has explicitly specified that the Grid should make HTTP GET requests via the `Type` setting but didn't allow HTTP GET requests.

**Solution**: Allow GET Requests
    // View

    // omitted for brevity
    .DataSource(dataSource => dataSource.Ajax()
        .Read(read => read.Action("Read", "Home").Type(HttpVerbs.Get)) // tell the DataSource to make GET requests
    // omitted for brevity

    // Controller
    public ActionResult Read([DataSourceRequest] DataSourceRequest request)
    {
        var data = GetData();

        return Json(result.ToDataSourceResult(request), JsonRequestBehavior.AllowGet);
    }

### Limited Usage of Templates 

An exception that templates can be used only with field access, property access, single-dimension array index, or single-parameter custom indexer expressions can occur if an editable grid is bound to a `DataTable` or `DataSet`. The reason is that ASP.NET MVC `EditorFor` method does not support `DataTable`.

**Solution**: use a pop-up edit form with a custom editor template

* [Example: MVC Grid Popup Editing](http://demos.telerik.com/aspnet-mvc/grid/editing-popup)
* [Example: Bind the Grid for ASP.NET MVC to a DataTable](/aspnet-mvc/helpers/grid/how-to/grid-bind-to-datatable)
* [Documentation: MVC Grid Editor Templates](/aspnet-mvc/helpers/grid/editor-templates) - use a separate editor template for each data field
* [Documentation: Grid TemplateName setting](/api/aspnet-mvc/kendo.mvc.ui.fluent/grideditingsettingsbuilder#methods-TemplateName(System.String)) - use it
to set a single edit form template for the whole edit form

## Different Cultural Formats 

By default Kendo UI Grid formats dates and numbers using the **en-US** culture. If the Grid does not display numbers and dates in the right format that corresponds to your culture, change the culture by including the JavaScript for your culture and then call `kendo.culture`.

### Include Culture Specific Kendo JavaScript
    <script src="/Scripts/cultures/kendo.culture.de-DE.js"></script>
    <script>
        kendo.culture("de-DE");
    </script>

### Include JavaScript for the Current Culture (WebForms)
    <%
        var culture = System.Threading.Thread.CurrentThread.CurrentCulture.ToString();
    %>
    <script src="<%= Url.Content("~/Scripts/cultures/kendo.culture." + culture + ".min.js") %>"></script>
    <script>
        kendo.culture("<%= culture %>");
    </script>

### Include JavaScript for the Current Culture (Razor)
    @{
        var culture = System.Threading.Thread.CurrentThread.CurrentCulture.ToString();
    }
    <script src="@Url.Content("~/Scripts/cultures/kendo.culture." + culture + ".min.js")"></script>
    <script>
        kendo.culture("@culture");
    </script>

Check the [globalization](/aspnet-mvc/globalization) help topic for additional reference.

## Grid Fails to Update Dates and Numbers When Current Culture Is Not en-US

Make sure the JavaScript file for that culture is included. Check the previous item.

## Column Template Not Displayed

This will happen if the server template is set but the grid is configured for ajax binding. Set the [ClientTemplate](/aspnet-mvc/helpers/grid/configuration#clienttemplate) as well.
This will also happen if only the client template is set but the grid is configured for server binding. Set the [Template](/aspnet-mvc/helpers/grid/configuration#template) as well.

## "X" DataSource Configuration Option Not Available

Not all settings of the DataSource are exposed via the `DataSource` fluent API. For full control over the DataSource consider using the [CustomDataSource](/aspnet-mvc/custom-datasource) fluent API or the client-side version of Kendo UI Grid.

## Client-side Events Not Raised in Server Bound Mode

Kendo UI Grid for ASP.NET MVC will not fire all client-side events when configured for server bound mode.
Check the [server binding](/aspnet-mvc/helpers/grid/server-binding#client-side-events-and-server-binding) help topic for further details.

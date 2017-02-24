---
title: Known Exceptions
page_title: Known Exceptions | Grid HtmlHelper Troubleshooting
description: "Learn about the known exceptions you might come across while working with Kendo UI Grid for ASP.NET MVC."
slug: knownexceptions_gridhelper_aspnetmvc
position: 3
---

# Known Exceptions

## Serialization 

### Circular Reference Detected While Serializing an Object of Type

The reason for this exception is that the [`JavaScriptSerializer`](https://msdn.microsoft.com/en-us/library/system.web.script.serialization.javascriptserializer.aspx) class used by the [`Json`](https://msdn.microsoft.com/en-us/library/system.web.mvc.controller.json.aspx) method cannot serialize object graphs which contain circular references (refer to each other).

**Solution**

Use View Model objects and avoid serializing the properties which create the circular reference. For further information on this issue, refer to the [article on avoiding circular reference exceptions]({% slug freqaskedquestions_gridhelper_aspnetmvc %}#how-to-avoid-circular-reference-exceptions).

### JSON JavaScriptSerializer Serialization or Deserialization Error

This exception is thrown when the length of the JSON response exceeds the default [`MaxJsonLength`](https://msdn.microsoft.com/en-us/library/system.web.script.serialization.javascriptserializer.maxjsonlength.aspx).

**Solution**

Below are listed some of the possible solutions for you to apply when resolving this issue.

* **Option 1** Enable paging by calling the `Pageable` method.

* **Option 2** Serialize only the required properties of your model by [using a View Model]({% slug freqaskedquestions_gridhelper_aspnetmvc %}#how-to-convert-my-models-to-view-model-objects).

* **Option 3** Manually serialize the `DataSourceResult`.

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

## Error Messages

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

## Templates

### Limited Usage of Templates

An exception that templates can be used only with field access, property access, single-dimension array index, or single-parameter custom indexer expressions can occur if an editable Grid is bound to a `DataTable` or `DataSet`. The reason is that the ASP.NET MVC `EditorFor` method does not support `DataTable`.

**Solution**

Use a pop-up edit form with a custom editor template.

For more information on how to resolve this issue, refer to the resources listed below.

* [Example: MVC Grid Popup Editing](http://demos.telerik.com/aspnet-mvc/grid/editing-popup)
* [Example: Bind the Grid for ASP.NET MVC to a DataTable](/helpers/grid/how-to/Binding/grid-bind-to-datatable)
* [Documentation: MVC Grid Editor Templates]({% slug editortemplates_grid_aspnetmvc %})&mdash;use a separate editor template for each data field.
* [Documentation: Grid TemplateName setting](/api/kendo.mvc.ui.fluent/grideditingsettingsbuilder#methods-TemplateName(System.String))&mdash;use it
to set a single edit form template for the whole edit form.

### Invalid Template Error When Nesting Client Templates

The Kendo UI widgets are unable to detect if they are used in nested client template scenarios. Such a setup requires the escaping of the `#` literals and the closing `</script>` tags in the HTML markup and JavaScript initialization statements of the nested widgets. However, this cannot happen automatically. As a result, nested client template scenarios are not supported out-of-the-box.

**Solution**

Consider the following scenario:

* Grid **A** is placed in a View. Grid **A** has a popup edit template.
* Grid **B** is placed in a partial view, which represents the popup edit template of Grid **A**.
* A Kendo UI widget **C** is placed in the same partial view as Grid **B**. The widget **C** belongs to the client detail template of the Grid **B**.

In the above scenario, the widget **C** will not be rendered correctly and will cause an `Invalid template` JavaScript error.

The easiest way to avoid the JavaScript error is to:

1. Move the declaration of widget **C** to a separate partial view.

1. Render the partial view in the main View where Grid **A** is defined. In this case widget **C** will not exist in a nested template context and its HTML/JavaScript output will not need any escaping.

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
* [API Reference of the Grid HtmlHelper](/api/Kendo.Mvc.UI.Fluent/GridBuilder)
* [Overview of the Kendo UI Grid Widget](http://docs.telerik.com/kendo-ui/controls/data-management/grid/overview)

Articles on Telerik UI for ASP.NET MVC:

* [Overview of Telerik UI for ASP.NET MVC]({% slug overview_aspnetmvc %})
* [Fundamentals of Telerik UI for ASP.NET MVC]({% slug fundamentals_aspnetmvc %})
* [Scaffolding in Telerik UI for ASP.NET MVC]({% slug scaffolding_aspnetmvc %})
* [Telerik UI for ASP.NET MVC API Reference Folder](/api/Kendo.Mvc/AggregateFunction)
* [Telerik UI for ASP.NET MVC HtmlHelpers Folder]({% slug overview_barcodehelper_aspnetmvc %})
* [Tutorials on Telerik UI for ASP.NET MVC]({% slug overview_timeefficiencyapp_aspnetmvc6 %})
* [Telerik UI for ASP.NET MVC Troubleshooting]({% slug troubleshooting_aspnetmvc %})

Other articles on troubleshooting:

* [Common Issues in Kendo UI](http://docs.telerik.com/kendo-ui/troubleshoot/troubleshooting-common-issues)
* [JavaScript Errors](http://docs.telerik.com/kendo-ui/troubleshoot/troubleshooting-js-errors)
* [Performance Issues](http://docs.telerik.com/kendo-ui/troubleshoot/troubleshooting-memory-leaks)
* [Content Security Policy](http://docs.telerik.com/kendo-ui/troubleshoot/content-security-policy)
* [Common Issues in Kendo UI Excel Export](http://docs.telerik.com/kendo-ui/framework/excel/troubleshoot/common-issues)
* [Common Issues in Kendo UI Charts](http://docs.telerik.com/kendo-ui/controls/charts/troubleshoot/common-issues)
* [Performance Issues in Kendo UI Widgets for Data Visualization](http://docs.telerik.com/kendo-ui/troubleshoot/troubleshooting-memory-leaks)
* [Common Issues in Kendo UI ComboBox](http://docs.telerik.com/kendo-ui/controls/editors/combobox/troubleshoot/troubleshooting)
* [Common Issues in Kendo UI Diagram](http://docs.telerik.com/kendo-ui/controls/diagrams-and-maps/diagram/troubleshoot/common-issues)
* [Common Issues in Kendo UI DropDownList](http://docs.telerik.com/kendo-ui/controls/editors/dropdownlist/troubleshoot/troubleshooting)
* [Common Issues in Kendo UI Editor](http://docs.telerik.com/kendo-ui/controls/editors/editor/troubleshoot/troubleshooting)
* [Common Issues in Kendo UI MultiSelect](http://docs.telerik.com/kendo-ui/controls/editors/multiselect/troubleshoot/troubleshooting)
* [Common Issues in Kendo UI Scheduler](http://docs.telerik.com/kendo-ui/controls/scheduling/scheduler/troubleshoot/troubleshooting)
* [Common Issues in Kendo UI Upload](http://docs.telerik.com/kendo-ui/controls/editors/upload/troubleshoot/troubleshooting)
* [Common Issues Related to Styling, Appearance, and Rendering](http://docs.telerik.com/kendo-ui/styles-and-layout/troubleshoot/troubleshooting)
* [Common Issues in Telerik UI for ASP.NET MVC]({% slug troubleshooting_aspnetmvc %})
* [Validation Issues in Telerik UI for ASP.NET MVC]({% slug troubleshooting_validation_aspnetmvc %})
* [Scaffolding Issues in Telerik UI for ASP.NET MVC]({% slug troubleshooting_scaffolding_aspnetmvc %})
* [Excel Export with the Grid ASP.NET MVC HtmlHelper Extension]({% slug excelissues_gridhelper_aspnetmvc %})
* [Common Issues in the Grid ASP.NET MVC HtmlHelper Extension]({% slug troubleshoot_gridhelper_aspnetmvc %})
* [Common Issues in the Spreadsheet ASP.NET MVC HtmlHelper Extension]({% slug troubleshoot_spreadsheethelper_aspnetmvc %})
* [Common Issues in the Upload ASP.NET MVC HtmlHelper Extension]({% slug troubleshoot_uploadhelper_aspnetmvc %})

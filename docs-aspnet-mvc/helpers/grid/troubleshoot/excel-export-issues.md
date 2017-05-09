---
title: Excel Export
page_title: Excel Export | Grid HtmlHelper Troubleshooting
description: "Learn about the solutions of common issues that may occur while exporting the Grid to Excel in ASP.NET MVC applications."
slug: excelissues_gridhelper_aspnetmvc
position: 2
---

# Excel Export

## JavaScript

### JSZip Is Not Found

Clicking the **Export to Excel** button or calling the `saveAsExcel` throws an exception if the JSZip JavaScript library is not found.

**Solution**

Include JSZip in the page.

For more information on the export of the Grid to Excel, refer to [this article](../../../kendo-ui/framework/save-files/introduction).

## Browser Specific

### Export Does Not Work in Internet Explorer and Safari

Internet Explorer versions below 10 and Safari cannot save a file and require the implementation of a [server proxy](../../../kendo-ui/framework/save-files/introduction).

**Solution**

Set the `ProxyURL` option to specify the server proxy URL.

The example below demonstrates the user server proxy.

###### Example

```tab-Controller

    public class ProxyController : Controller
    {
        [HttpPost]
        public ActionResult Save(string contentType, string base64, string fileName)
        {
            var fileContents = Convert.FromBase64String(base64);

            return File(fileContents, contentType, fileName);
        }
    }
```
```tab-ASPX

    <%: Html.Kendo().Grid<MvcApplication.Models.ProductViewModel>()
        .Name("grid")
        .ToolBar(tools => tools.Excel())
        .Excel(excel => excel
            .AllPages(true)
            .ProxyURL(Url.Action("Save", "Proxy"))
        )
        .DataSource(dataSource => dataSource
            .Ajax()
            .Read(read => read.Action("Products_Read", "Home"))
        )
    %>
```
```tab-Razor

    @(Html.Kendo().Grid<MvcApplication.Models.ProductViewModel>()
        .Name("grid")
        .ToolBar(tools => tools.Excel())
        .Excel(excel => excel
            .AllPages(true)
            .ProxyURL(Url.Action("Save", "Proxy"))
        )
        .DataSource(dataSource => dataSource
            .Ajax()
            .Read(read => read.Action("Products_Read", "Home"))
        )
    )
```

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
* [API Reference of the Grid HtmlHelper](../../../kendo-ui/api/Kendo.Mvc.UI.Fluent/GridBuilder)
* [Overview of the Kendo UI Grid Widget](../../../kendo-ui/controls/data-management/grid/overview)

Articles on Telerik UI for ASP.NET MVC:

* [Overview of Telerik UI for ASP.NET MVC]({% slug overview_aspnetmvc %})
* [Fundamentals of Telerik UI for ASP.NET MVC]({% slug fundamentals_aspnetmvc %})
* [Scaffolding in Telerik UI for ASP.NET MVC]({% slug scaffolding_aspnetmvc %})
* [Telerik UI for ASP.NET MVC API Reference Folder](/api/Kendo.Mvc/AggregateFunction)
* [Telerik UI for ASP.NET MVC HtmlHelpers Folder]({% slug overview_barcodehelper_aspnetmvc %})
* [Tutorials on Telerik UI for ASP.NET MVC]({% slug overview_timeefficiencyapp_aspnetmvc6 %})
* [Telerik UI for ASP.NET MVC Troubleshooting]({% slug troubleshooting_aspnetmvc %})

Other articles on troubleshooting:

* [Common Issues in Kendo UI](../../../kendo-ui/troubleshoot/troubleshooting-common-issues)
* [JavaScript Errors](../../../kendo-ui/troubleshoot/troubleshooting-js-errors)
* [Performance Issues](../../../kendo-ui/troubleshoot/troubleshooting-memory-leaks)
* [Content Security Policy](../../../kendo-ui/troubleshoot/content-security-policy)
* [Common Issues in Kendo UI Excel Export](../../../kendo-ui/framework/excel/troubleshoot/common-issues)
* [Common Issues in Kendo UI Charts](../../../kendo-ui/controls/charts/troubleshoot/common-issues)
* [Performance Issues in Kendo UI Widgets for Data Visualization](../../../kendo-ui/troubleshoot/troubleshooting-memory-leaks)
* [Common Issues in Kendo UI ComboBox](../../../kendo-ui/controls/editors/combobox/troubleshoot/troubleshooting)
* [Common Issues in Kendo UI Diagram](../../../kendo-ui/controls/diagrams-and-maps/diagram/troubleshoot/common-issues)
* [Common Issues in Kendo UI DropDownList](../../../kendo-ui/controls/editors/dropdownlist/troubleshoot/troubleshooting)
* [Common Issues in Kendo UI Editor](../../../kendo-ui/controls/editors/editor/troubleshoot/troubleshooting)
* [Common Issues in Kendo UI MultiSelect](../../../kendo-ui/controls/editors/multiselect/troubleshoot/troubleshooting)
* [Common Issues in Kendo UI Scheduler](../../../kendo-ui/controls/scheduling/scheduler/troubleshoot/troubleshooting)
* [Common Issues in Kendo UI Upload](../../../kendo-ui/controls/editors/upload/troubleshoot/troubleshooting)
* [Common Issues Related to Styling, Appearance, and Rendering](../../../kendo-ui/styles-and-layout/troubleshoot/troubleshooting)
* [Common Issues in Telerik UI for ASP.NET MVC]({% slug troubleshooting_aspnetmvc %})
* [Validation Issues in Telerik UI for ASP.NET MVC]({% slug troubleshooting_validation_aspnetmvc %})
* [Scaffolding Issues in Telerik UI for ASP.NET MVC]({% slug troubleshooting_scaffolding_aspnetmvc %})
* [Known Exceptions in the Grid ASP.NET MVC HtmlHelper Extension]({% slug knownexceptions_gridhelper_aspnetmvc %})
* [Common Issues in the Grid ASP.NET MVC HtmlHelper Extension]({% slug troubleshoot_gridhelper_aspnetmvc %})
* [Common Issues in the Spreadsheet ASP.NET MVC HtmlHelper Extension]({% slug troubleshoot_spreadsheethelper_aspnetmvc %})
* [Common Issues in the Upload ASP.NET MVC HtmlHelper Extension]({% slug troubleshoot_uploadhelper_aspnetmvc %})

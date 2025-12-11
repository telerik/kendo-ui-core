---
title: Razor Pages
page_title: Razor Pages
description: "Learn how to use the Telerik UI PanelBar component for {{ site.framework }} in a Razor Pages application with an example on how to configure its remote binding DataSource."
slug: htmlhelpers_panelbar_razorpage_aspnetcore
components: ["panelbar"]
position: 6
---

# PanelBar in Razor Pages

This article describes how to seamlessly integrate and configure the Telerik UI Loader for {{ site.framework }} in Razor Pages applications.

> You can use any of the available [data binding approaches]({% slug htmlhelpers_panelbar_databinding_aspnetcore %}#data-binding-approaches) to bind the component to data in a Razor Pages application.

@[template](/_contentTemplates/core/razor-pages-general-info.md#referencing-handler-methods)

## Binding to Remote Data

In order to set up the PanelBar component bindings, you need to configure the `Read` method of its `DataSource` instance. The URL must refer to the method name in the `PageModel`.

```HtmlHelper
@page
@model IndexModel

@inject Microsoft.AspNetCore.Antiforgery.IAntiforgery Xsrf
@Html.AntiForgeryToken()
	
@(Html.Kendo().PanelBar()
    .Name("panelbar")
    .DataTextField("Name")
    .DataSource(dataSource => dataSource
        .Read(read => read
            .Url(Url.Page("Index", "Read"))
        )
    )
)	
```
{% if site.core %}
```TagHelper
@page
@model IndexModel

@inject Microsoft.AspNetCore.Antiforgery.IAntiforgery Xsrf
@Html.AntiForgeryToken()
    
<kendo-panelbar name="panelbar" datatextfield="Name">
    <hierarchical-datasource>
        <transport>
            <read url="@Url.Page("Index", "Read")" />
        </transport>
    </hierarchical-datasource>
</kendo-panelbar>
```
{% endif %}
```C# PageModel
public class IndexModel : PageModel
{
    public JsonResult OnGetRead(int? id)
    {       
		//employees is the DBContext
        var result = employees.ToList()
            .Where(v => id.HasValue ? v.ReportsTo == id : v.ReportsTo == null)
            .Select((employee) =>
                new
                {
                    id = employee.EmployeeID,
                    Name = employee.FirstName + " " + employee.LastName,
                    hasChildren = employees.Any(o => o.ReportsTo == employee.EmployeeID)
                }
        );
        return new JsonResult(result);
    }
}
```

For the complete project, refer to the [PanelBar in Razor Pages example](https://github.com/telerik/ui-for-aspnet-core-examples/blob/master/Telerik.Examples.RazorPages/Telerik.Examples.RazorPages/Pages/PanelBar/PanelBarRemoteDate.cshtml).

## See Also

* [Using Telerik UI for ASP.NET Core in Razor Pages](https://docs.telerik.com/aspnet-core/getting-started/razor-pages#using-telerik-ui-for-aspnet-core-in-razor-pages)
* [Client-Side API of the PanelBar](https://docs.telerik.com/kendo-ui/api/javascript/ui/panelbar)
* [Server-Side HtmlHelper API of the PanelBar](/api/panelbar)
* [Server-Side TagHelper API of the PanelBar](/api/taghelpers/panelbar)
* [Knowledge Base Section](/knowledge-base)



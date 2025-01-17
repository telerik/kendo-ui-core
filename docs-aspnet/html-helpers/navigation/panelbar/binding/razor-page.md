---
title: Razor Pages
page_title: Razor Pages
description: "Learn how to use the Telerik UI PanelBar component for {{ site.framework }} in a Razor Pages application with an example on how to configure its remote binding DataSource."
slug: htmlhelpers_panelbar_razorpage_aspnetcore
position: 5
---

# PanelBar in Razor Pages

Razor Pages is an alternative to the MVC pattern that makes page-focused coding easier and more productive. This approach consists of a `cshtml` file and a `cshtml.cs` file (by design, the two files have the same name). 

You can seamlessly integrate the Telerik UI PanelBar for {{ site.framework }} in Razor Pages applications.

This article describes how to configure the PanelBar component in a Razor Pages scenario.

For the complete project, refer to the [PanelBar in Razor Pages example](https://github.com/telerik/ui-for-aspnet-core-examples/blob/master/Telerik.Examples.RazorPages/Telerik.Examples.RazorPages/Pages/PanelBar/PanelBarRemoteDate.cshtml).

## Getting Started

In order to set up the PanelBar component bindings, you need to configure the `Read` method of its `DataSource` instance. The URL in this method should refer the name of the method in the PageModel.

```tab-HtmlHelper(cshtml)   
     
    @inject Microsoft.AspNetCore.Antiforgery.IAntiforgery Xsrf
	@Html.AntiForgeryToken()
	
	@(Html.Kendo().PanelBar()
        .Name("panelbar")
        .DataTextField("Name")
        .DataSource(dataSource => dataSource
            .Read(read => read
                .Url("/PanelBar/PanelBarRemoteData?handler=Read")
            )
        )
	)	
```
{% if site.core %}
```tab-TagHelper(cshtml)
    
    @inject Microsoft.AspNetCore.Antiforgery.IAntiforgery Xsrf
	@Html.AntiForgeryToken()
    
    <kendo-panelbar name="panelbar" datatextfield="Name">
        <hierarchical-datasource>
            <transport>
                <read url="/PanelBar/PanelBarRemoteData?handler=Read" />
            </transport>
        </hierarchical-datasource>
    </kendo-panelbar>
```
{% endif %}
```tab-PageModel(cshtml.cs)      

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
```

## See Also

* [Using Telerik UI for ASP.NET Core in Razor Pages](https://docs.telerik.com/aspnet-core/getting-started/razor-pages#using-telerik-ui-for-aspnet-core-in-razor-pages)
* [Client-Side API of the PanelBar](https://docs.telerik.com/kendo-ui/api/javascript/ui/panelbar)
* [Server-Side HtmlHelper API of the PanelBar](/api/panelbar)
* [Server-Side TagHelper API of the PanelBar](/api/taghelpers/panelbar)
* [Knowledge Base Section](/knowledge-base)



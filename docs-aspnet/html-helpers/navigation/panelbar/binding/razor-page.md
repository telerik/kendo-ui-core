---
title:  Razor Page
page_title: Configure a DataSource for the PanelBar for Remote Binding in Razor Page.
description: "An example on how to configure the remote binding DataSource to populate the Telerik UI PanelBar component for {{ site.framework }} ."
slug: htmlhelpers_panelbar_razorpage_aspnetcore
position: 5
---

# Razor Page

This article describes how to configure a Remote DataSource of a Telerik PanelBar in a RazorPage scenario.

In order to set up the PanelBar component bindings, you need to configure the `Read` method of its `DataSource` instance. The URL in this method should refer the name of the method in the PageModel. See the implementation details in the example below, and for the full project with RazorPages examples, visit our [GitHub repository](https://github.com/telerik/ui-for-aspnet-core-examples/tree/master/Telerik.Examples.RazorPages).

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

* [Razor Pages Support]({% slug razor_pages_integration_aspnetmvc6_aspnetmvc %})
* [DataBinding Overview]({% slug htmlhelpers_panelbar_databinding_aspnetcore %})


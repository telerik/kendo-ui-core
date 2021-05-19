---
title:  Razor Page
page_title: Configure a DataSource for the DropDownTree for Remote Binding in Razor Page.
description: "An example on how to configure the remote binding DataSource to populate the Telerik UI DropDownTree HtmlHelper for {{ site.framework }} in a Razor Page using CRUD Operations."
slug: htmlhelpers_dropdowntree_razorpage_aspnetcore
position: 3
---

# Razor Page

# DropDownTree Remote Data Binding in Razor Pages

This article describes how to configure a Remote DataSource of a Telerik DropDownTree in a RazorPage scenario.

In order to set up the ComboBox component bindings, you need to configure the `Read` method of its `DataSource` instance. The URL in this method should refer the name of the method in the PageModel. In this method, you can also pass additional parameters, such as filter string and antiforgery token (see `dataFunction`). See the implementation details in the example below, and for the full project with RazorPages examples, visit our [GitHub repository](https://github.com/telerik/ui-for-aspnet-core-examples/tree/master/Telerik.Examples.RazorPages).

```tab-RazorPage(csthml)        
    @inject Microsoft.AspNetCore.Antiforgery.IAntiforgery Xsrf
	@Html.AntiForgeryToken()	
	
	@(Html.Kendo().DropDownTree()		
		.Name("dropdowntree")
		.AutoWidth(true)
		.DataTextField("Name")
		.HtmlAttributes(new { style = "width: 100%" })
		.CheckAll(true)
		.AutoClose(false)
		.Checkboxes(checkboxes => checkboxes
			.CheckChildren(true)
		)
		.DataSource(dataSource => dataSource
			.Custom()
			.Transport(t => t
				.Read(r => r.Url(Url.Page("DropDownTreeIndex", "DropDownTreeRead")).Data("forgeryToken")))
			)
	
	)
	
	<script>
		function forgeryToken() {
			return kendo.antiForgeryTokens();
		}
	</script>
```
```tab-PageModel(cshtml.cs)       

        public JsonResult OnGetDropDownTreeRead(int? id)
        { 
            var data = dbContext.Where(x => id.HasValue ? x.ParentID == id : x.ParentID == null)
                .Select(item => new {
                    id = item.ID,
                    Name = item.Name,
                    hasChildren = item.HasChildren
                });

            return new JsonResult(data);
        }
```

## See Also

* [Razor Pages Support]({% slug razor_pages_integration_aspnetmvc6_aspnetmvc %})
* [DataBinding Overview]({% slug htmlhelpers_combobox_databinding_aspnetcore %})


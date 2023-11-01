---
title:  Razor Pages
page_title: Razor Pages
description: "An example on how to configure the remote binding DataSource to populate the Telerik UI DropDownTree component for {{ site.framework }} in a Razor Page using CRUD Operations."
slug: htmlhelpers_dropdowntree_razorpage_aspnetcore
position: 5
---

# DropDownTree in Razor Pages

Razor Pages is an alternative to the MVC pattern that makes page-focused coding easier and more productive. This approach consists of a `cshtml` file and a `cshtml.cs` file (by design, the two files have the same name). 

You can seamlessly integrate the Telerik UI DropDownTree for {{ site.framework }} in Razor Pages applications.

This article describes how to configure the DropDownTree component in a Razor Pages scenario.

For the complete project, refer to the [DropDownTree in Razor Pages example](https://github.com/telerik/ui-for-aspnet-core-examples/blob/master/Telerik.Examples.RazorPages/Telerik.Examples.RazorPages/Pages/DropDownTree/DropDownTreeIndex.cshtml).

In order to set up the ComboBox component bindings, you need to configure the `Read` method of its `DataSource` instance. The URL in this method should refer the name of the method in the PageModel. In this method, you can also pass additional parameters, such as filter string and antiforgery token (see `dataFunction`).

```tab-HtmlHelper(csthml)        
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
{% if site.core %}
```TagHelper
	@inject Microsoft.AspNetCore.Antiforgery.IAntiforgery Xsrf
	@Html.AntiForgeryToken()

    <kendo-dropdowntree datatextfield="Name" datavaluefield="id" name="dropdowntree" auto-width="true" style="width: 100%" auto-close="false">
        <hierarchical-datasource>
            <schema>
                <hierarchical-model id="id"></hierarchical-model>
            </schema>
            <transport>
                <read url="@Url.Page("DropDownTreeIndex", "DropDownTreeRead")" data="forgeryToken" />
            </transport>
        </hierarchical-datasource>
		<checkboxes check-children="true" enabled="true" />
    </kendo-dropdowntree>

	<script>
		function forgeryToken() {
			return kendo.antiForgeryTokens();
		}
	</script>
```
{% endif %}
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
* [Data Binding Overview]({% slug htmlhelpers_dropdowntree_databinding_aspnetcore %})


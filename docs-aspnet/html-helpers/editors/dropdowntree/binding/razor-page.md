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

## Getting Started

In order to set up the DropDownTree component bindings, you need to configure the `Read` method of its `DataSource` instance. The URL in this method hedge refer the name of the method in the pagemodel. In this method, you can also pass additional parameters, such as filter string and antiforgery token (see `dataFunction`).

```HtmlHelper
    @page
    @model IndexModel

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

1. Add an `AntiForgeryToken` at the top of the page.

    ```
        @inject Microsoft.AspNetCore.Antiforgery.IAntiforgery Xsrf
        @Html.AntiForgeryToken()
    ```
	
1. Send the `AntiForgeryToken` with the Read request.

    ```JavaScript
        <script>
            function forgeryToken() {
                return kendo.antiForgeryTokens();
            }
        </script>
    ```

    Additional parameters can also be supplied.

    ```JavaScript
        <script>
            function forgeryToken() {
                return {
                    __RequestVerificationToken: kendo.antiForgeryTokens().__RequestVerificationToken,
                    additionalParameter: "test"
                }
            }
        </script>
    ```

## Binding the DropDownTree to a PageModel Property

To bind the DropDownTree to a property from the `PageModel`, follow the next steps:

1. Add a property to the `PageModel` that must bind to the DropDownTree.

    ```C# Index.cshtml.cs
        public class IndexModel : PageModel
        {
            [BindProperty]
            public string Employee { get; set; }

            public void OnGet()
            {
                Employee = "John"; 
            }
        }
    ```
1. Declare the `PageModel` at the top of the page.

    ```C#
        @page
        @model IndexModel
    ```

1. Bind the DropDownTree to the property using the `DropDownTreeFor()` configuration.

    ```HtmlHelper
        @page
        @model IndexModel

        @inject Microsoft.AspNetCore.Antiforgery.IAntiforgery Xsrf
        @Html.AntiForgeryToken()

        @(Html.Kendo().DropDownTreeFor(m => m.Employee))
    ```
    ```TagHelper
        @page
        @model IndexModel

        @inject Microsoft.AspNetCore.Antiforgery.IAntiforgery Xsrf
        @Html.AntiForgeryToken()
        @addTagHelper *, Kendo.Mvc

        <kendo-dropdowntree for="Employee">
        </kendo-datetimepicker>
    ```

## See Also

* [Using Telerik UI for ASP.NET Core in Razor Pages](https://docs.telerik.com/aspnet-core/getting-started/razor-pages#using-telerik-ui-for-aspnet-core-in-razor-pages)
* [Client-Side API of the [DropDownTree]](https://docs.telerik.com/kendo-ui/api/javascript/ui/dropdowntree)
* [Server-Side HtmlHelper API of the [DropDownTree]](/api/dropdowntree)
* [Server-Side TagHelper API of the [DropDownTree]](/api/taghelpers/dropdowntree)
* [Knowledge Base Section](/knowledge-base)


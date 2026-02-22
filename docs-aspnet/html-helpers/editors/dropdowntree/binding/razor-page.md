---
title:  Razor Pages
page_title: Razor Pages
description: "An example on how to configure the remote binding DataSource to populate the Telerik UI DropDownTree component for {{ site.framework }} in a Razor Page using CRUD Operations."
slug: htmlhelpers_dropdowntree_razorpage_aspnetcore
components: ["dropdowntree"]
position: 5
---

# DropDownTree in Razor Pages

This article describes how to seamlessly integrate and configure the Telerik UI DropDownTree for {{ site.framework }} in Razor Pages applications.

> You can use any of the available [data binding approaches]({% slug htmlhelpers_dropdowntree_databinding_aspnetcore %}#data-binding-approaches) to bind the component to data in a Razor Pages application.

@[template](/_contentTemplates/core/razor-pages-general-info.md#referencing-handler-methods)

## Binding to Remote Data

The most flexible form of data binding is to use the [DataSource]({% slug htmlhelpers_datasource_aspnetcore %}) component. To bind the DropDownTree to a data set received from a remote endpoint within a Razor Pages application, follow the next steps:

1. Specify the Read request URL in the `DataSource` configuration. The URL must refer to the method name in the `PageModel`.

    ```HtmlHelper
        @page
        @model DropDownTreeIndexModel

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
    ```
    ```TagHelper
        @page
        @model DropDownTreeIndexModel

        <kendo-dropdowntree name="dropdowntree" style="width: 100%"
            datatextfield="Name" 
            auto-close="false"
            auto-width="true">
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

1. Within the `cshtml.cs` file, add a handler method for the Read operation that returns the dataset.

    ```C# DropDownTreeIndex.cshtml.cs
    public class DropDownTreeIndexModel : PageModel
    {
        public JsonResult OnGetDropDownTreeRead(int? id)
        { 
            var dropDownTreeData = result.Where(x => id.HasValue ? x.ParentID == id : x.ParentID == null)
                .Select(item => new {
                    id = item.ID,
                    Name = item.Name,
                    hasChildren = item.HasChildren
                });

            return new JsonResult(dropDownTreeData);
        }

        public static IList<HierarchicalViewModel> result = new List<HierarchicalViewModel>()
        {
            new HierarchicalViewModel() { ID = 1, ParentID = null, HasChildren = true, Name = "Parent Item 1" },
            new HierarchicalViewModel() { ID = 2, ParentID = null, HasChildren = true, Name = "Parent Item 2" },
            new HierarchicalViewModel() { ID = 3, ParentID = null, HasChildren = true, Name = "Parent Item 3" },
            new HierarchicalViewModel() { ID = 4, ParentID = 1, HasChildren = false, Name = "Child Item 1" },
            new HierarchicalViewModel() { ID = 5, ParentID = 1, HasChildren = false, Name = "Child Item 2" },
            new HierarchicalViewModel() { ID = 6, ParentID = 2, HasChildren = false, Name = "Child Item 3" },
            new HierarchicalViewModel() { ID = 7, ParentID = 2, HasChildren = false, Name = "Child Item 4" },
            new HierarchicalViewModel() { ID = 8, ParentID = 3, HasChildren = false, Name = "Child Item 5" },
            new HierarchicalViewModel() { ID = 9, ParentID = 3, HasChildren = false, Name = "Child Item 6" }
        };
    }
    ```
    ```Model
    public class HierarchicalViewModel
    {
        public int ID { get; set; }
        public string Name { get; set; }
        public int? ParentID { get; set; }
        public bool HasChildren { get; set; }
    }
    ```

For the complete project, refer to the [DropDownTree in Razor Pages example](https://github.com/telerik/ui-for-aspnet-core-examples/blob/master/Telerik.Examples.RazorPages/Telerik.Examples.RazorPages/Pages/DropDownTree/DropDownTreeIndex.cshtml).

## Binding to a PageModel Property

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
* [Client-Side API of the DropDownTree](https://docs.telerik.com/kendo-ui/api/javascript/ui/dropdowntree)
* [Server-Side HtmlHelper API of the DropDownTree](/api/dropdowntree)
* [Server-Side TagHelper API of the DropDownTree](/api/taghelpers/dropdowntree)
* [Knowledge Base Section](/knowledge-base)


---
title: Razor Pages
page_title: Razor Pages
description: "Learn how to use the Telerik UI TreeView component for {{ site.framework }} in a Razor Pages application."
slug: htmlhelpers_treeview_razorpage_aspnetcore
position: 12
---

# TreeView in Razor Pages 

Razor Pages is an alternative to the MVC pattern that makes page-focused coding easier and more productive. This approach consists of a `cshtml` file and a `cshtml.cs` file (by design, the two files have the same name). 

You can seamlessly integrate the Telerik UI TreeView for {{ site.framework }} in Razor Pages applications.

This article describes how to configure the TreeView component in a Razor Pages scenario. For the complete project, refer to the [TreeView in Razor Pages example](https://github.com/telerik/ui-for-aspnet-core-examples/tree/master/Telerik.Examples.RazorPages/Telerik.Examples.RazorPages/Pages/TreeView).

## Getting Started

The following example demonstrates how to configure the TreeView in a Razor Pages scenario and bind it to a remote data collection.

1. Define the TreeView and specify the Read request URL in the `DataSource` configuration. The URL must refer to the method name in the `PageModel`.


    ```HtmlHelper_Index.cshtml
        @page
        @model IndexModel
        @using Kendo.Mvc.UI

        @(Html.Kendo().TreeView()
           .Name("treeview")
           .DataTextField("Name")
           .DataSource(dataSource => dataSource
               .Custom()
               .Transport(t => t
                   .Read(r => r.Url(Url.Page("Index", "TreeViewRead")).Data("forgeryToken").Type(HttpVerbs.Post)))
               )
       )
    ```
    ```TagHelper_Index.cshtml
        @page
        @model IndexModel
        @using Kendo.Mvc.UI

        <kendo-treeview name="treeview" datatextfield="Name" >
            <hierarchical-datasource type="DataSourceTagHelperType.Custom">
                <transport>
                    <read url="/Index?handler=TreeViewRead" type="post" data="forgeryToken" />
                </transport>
                <schema>
                    <hierarchical-model id="ID" has-children="HasChildren">
                    </hierarchical-model>
                </schema>
            </hierarchical-datasource>
        </kendo-treeview>
    ```
    
1. Add an `AntiForgeryToken` at the top of the page.

    ```
        @inject Microsoft.AspNetCore.Antiforgery.IAntiforgery Xsrf
        @Html.AntiForgeryToken()
    ```

1. Send the `AntiForgeryToken` with the Read request.

    ```
        <script>
            function forgeryToken() {
                return kendo.antiForgeryTokens();
            }
        </script>
    ```

    Additional parameters can also be supplied.

    ```
        <script>
            function forgeryToken() {
                return {
                    __RequestVerificationToken: kendo.antiForgeryTokens().__RequestVerificationToken,
                    additionalParameter: "test"
                }
            }
        </script>
    ```
    
1. Within the `cshtml.cs` file, add a handler method for the Read data operation.

    ```tab-Index.cshtml.cs
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

        public void OnGet(string culture)
        {
            if (!String.IsNullOrEmpty(culture))
            {
                CultureInfo.DefaultThreadCurrentCulture = CultureInfo.DefaultThreadCurrentUICulture = new CultureInfo(culture);
            }
        }

        public JsonResult OnPostTreeViewRead(int? id)
        {
            var data = result.Where(x => id.HasValue ? x.ParentID == id : x.ParentID == null)
                .Select(item => new
                {
                    id = item.ID,
                    Name = item.Name,
                    hasChildren = item.HasChildren
                });

            return new JsonResult(data);
        }
    ```
    ```tab-Model
    public class HierarchicalViewModel
    {
        public int ID { get; set; }
        public string Name { get; set; }
        public int? ParentID { get; set; }
        public bool HasChildren { get; set; }
    }
    ```

## See Also

* [Using Telerik UI for ASP.NET Core in Razor Pages](https://docs.telerik.com/aspnet-core/getting-started/razor-pages#using-telerik-ui-for-aspnet-core-in-razor-pages)
* [Client-Side API of the TreeView](https://docs.telerik.com/kendo-ui/api/javascript/ui/treeview)
* [Server-Side HtmlHelper API of the TreeView](/api/treeview)
* [Server-Side TagHelper API of the TreeView](/api/taghelpers/treeview)
* [Knowledge Base Section](/knowledge-base)
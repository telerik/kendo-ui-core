---
title: Razor Pages
page_title: Razor Pages
description: "Telerik UI ListBox for {{ site.framework }} in a Razor Pages application."
slug: razorpages_listBoxhelper_aspnetcore
position: 5
---

# ListBox in Razor Pages

Razor Pages is an alternative to the MVC pattern that makes page-focused coding easier and more productive. This approach consists of a `cshtml` file and a `cshtml.cs` file (by design, the two files have the same name). 

You can seamlessly integrate the Telerik UI ListBox for {{ site.framework }} in Razor Pages applications.

This article describes how to configure the ListBox component in a Razor Pages scenario.

For the complete project, refer to the [ListBox in Razor Pages example](https://github.com/telerik/ui-for-aspnet-core-examples/blob/master/Telerik.Examples.RazorPages/Telerik.Examples.RazorPages/Pages/ListBox/ListBoxBinding.cshtml).

## Getting Started

The [DataSource]({% slug htmlhelpers_datasource_aspnetcore %}) component offers the most versatile data binding approach. To connect the ListBox to a data set retrieved from a remote endpoint in a Razor Pages application, proceed with the following steps:

1. Specify the Read request URL in the `DataSource` configuration. The URL must refer to the method name in the `PageModel`.

    ```HtmlHelper
        @page
        @model IndexModel

        @(Html.Kendo().ListBox()
        .Name("optional")
        .DataTextField("Text")
        .DataValueField("Value")
        .Toolbar(toolbar =>
        {
            toolbar.Position(ListBoxToolbarPosition.Right);
            toolbar.Tools(tools => tools
                .MoveUp()
                .MoveDown()
                .TransferTo()
                .TransferFrom()
                .TransferAllTo()
                .TransferAllFrom()
                .Remove()
            );
        })
        .DataSource(ds => ds
            .Read(r => r.Url("/Index?handler=ReadOptional").Data("forgeryToken"))
        )
        .ConnectWith("selected")
    )

    @(Html.Kendo().ListBox()
        .Name("selected")
        .DataTextField("Text")
        .DataValueField("Value")
        .Selectable(ListBoxSelectable.Multiple)
    )
    ```
    ```TagHelper
        @page
        @model IndexModel

        @{
            var tools = new string[] {
                "moveUp",
                "moveDown",
                "transferTo",
                "transferFrom",
                "transferAllTo",
                "transferAllFrom",
                "remove"
            };
        }

        <kendo-listbox name="optional" datatextfield="Text" datavaluefield="Value" connect-with="selected">
            <datasource>
                <transport>
                    <read url="/Index?handler=ReadOptional" data="forgeryToken"/>
                </transport>
            </datasource>
            <toolbar position="ListBoxToolbarPosition.Right" tools="tools"/>
        </kendo-listbox>

        <kendo-listbox name="selected" datatextfield="Text" datavaluefield="Value" selectable="ListBoxSelectable.Multiple" />
    ```

1. Add an `AntiForgeryToken` at the top of the page.
    ```
        @inject Microsoft.AspNetCore.Antiforgery.IAntiforgery Xsrf
        @Html.AntiForgeryToken()
    ```

1. Send the `AntiForgeryToken` with the Read request.

    ```JS
        <script>
            function forgeryToken() {
                return kendo.antiForgeryTokens();
            }
        </script>
    ```

    Additional parameters can also be supplied.

    ```JS
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

    ```C# Index.cshtml.cs
        public static IList<SelectListItem> items;

        public void OnGet()
        {
            if (items == null)
            {
                items = new List<SelectListItem>();
                Enumerable.Range(1, 5).ToList().ForEach(f => items.Add(new SelectListItem
                {
                    Value = "" + f,
                    Text = "Text " + f
                }));
            }
        }

        public JsonResult OnPostReadOptional()()
        {
            return new JsonResult(items);
        }
    ```

## Binding the ListBox to a PageModel Property

To bind the ListBox to a property from the `PageModel`, follow the next steps:

1. Add a property to the `PageModel` that holds the data collection that must be loaded in the ListBox.

    ```C#
        public class ListBoxPageModel : PageModel
        {
            [BindProperty]
            public IList<SelectListItem> items { get; set; }

            public void OnGet()
            {
                if (items == null)
                {
                    items = new List<SelectListItem>();
                    Enumerable.Range(1, 5).ToList()
                        .ForEach(f => items.Add(new SelectListItem
                        {
                            Value = "" + f,
                            Text = "Text " + f
                        })
                    );
                }
            }
        }
    ```

1. Declare the `PageModel` at the top of the page.

    ```
        @model ListBoxPageModel
    ```

1. Bind the ListBox to the collection property and disable the server data operations (`ServerOperations(false)`).

    ```HtmlHelper
        @page
        @model ListBoxPageModel

        @(Html.Kendo().ListBox(Model.items)
            .Name("optional")
            .DataTextField("Text")
            .DataValueField("Value")
            .Toolbar(toolbar =>
            {
                toolbar.Position(ListBoxToolbarPosition.Right);
                toolbar.Tools(tools => tools
                    .MoveUp()
                    .MoveDown()
                    .TransferTo()
                    .TransferFrom()
                    .TransferAllTo()
                    .TransferAllFrom()
                    .Remove()
                );
            })
            .ConnectWith("selected")
        )

        @(Html.Kendo().ListBox()
            .Name("selected")
            .DataTextField("Text")
            .DataValueField("Value")
            .Selectable(ListBoxSelectable.Multiple)
            .BindTo(new List<SelectListItem>())
        )
    ```
    ```TagHelper
        @page
        @model ListBoxPageModel

        @{
            var tools = new string[] {
                "moveUp",
                "moveDown",
                "transferTo",
                "transferFrom",
                "transferAllTo",
                "transferAllFrom",
                "remove"
            };

            var selectedItems = new List<SelectListItem>();
        }

        <kendo-listbox name="optional" datatextfield="Text" datavaluefield="Value" connect-with="selected" bind-to="@Model.items">
            <toolbar position="ListBoxToolbarPosition.Right" tools="tools"/>
        </kendo-listbox>

        <kendo-listbox name="selected" datatextfield="Text" datavaluefield="Value" selectable="ListBoxSelectable.Multiple" bind-to="selectedItems"/>
    ```


## See Also

* [Using Telerik UI for ASP.NET Core in Razor Pages](https://docs.telerik.com/aspnet-core/getting-started/razor-pages#using-telerik-ui-for-aspnet-core-in-razor-pages)
* [Client-Side API of the ListBox](https://docs.telerik.com/kendo-ui/api/javascript/ui/listbox)
* [Server-Side HtmlHelper API of the ListBox](/api/listbox)
* [Server-Side TagHelper API of the ListBox](/api/taghelpers/listbox)
* [Knowledge Base Section](/knowledge-base)
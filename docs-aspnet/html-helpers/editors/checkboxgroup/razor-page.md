---
title: Razor Pages
page_title: Razor Pages
description: "Learn how to configure the Telerik UI CheckBoxGroup for {{ site.framework }} in RazorPage scenario."
components: ["checkboxgroup"]
slug: htmlhelpers_checkboxgroup_aspnetcore_razor_page
position: 5
---

# CheckBoxGroup in Razor Pages

This article describes how to seamlessly integrate and configure the Telerik UI CheckBoxGroup for {{ site.framework }} in Razor Pages applications.

> You can use any of the available [data binding approaches]({% slug htmlhelpers_checkboxgroup_binding_aspnetcore %}) to bind the component to data in a Razor Pages application.

@[template](/_contentTemplates/core/razor-pages-general-info.md#referencing-handler-methods)

## Binding to Local Data

The following example demonstrates how to bind the CheckBoxGroup component to a local dataset within a Razor Pages application.

```HtmlHelper
    @page
    @model CheckBoxGroupIndexModel

    @inject Microsoft.AspNetCore.Antiforgery.IAntiforgery Xsrf
    @Html.AntiForgeryToken()

    <label>Select color:</label>
    @(Html.Kendo().CheckBoxGroup()
        .Name("checkboxgroup")
        .BindTo(Model.CheckBoxGroupModel.Items)
        .Value(Model.CheckBoxGroupModel.CheckBoxGroupValue)
    )
```
```TagHelper
    @page
    @model CheckBoxGroupIndexModel
    
    @inject Microsoft.AspNetCore.Antiforgery.IAntiforgery Xsrf
    @Html.AntiForgeryToken()

    <kendo-checkboxgroup name="checkboxgroup"
        value="@Model.CheckBoxGroupModel.CheckBoxGroupValue"
        bind-to="@Model.CheckBoxGroupModel.Items">
    </kendo-checkboxgroup>
```
```C# PageModel
public class CheckBoxGroupIndexModel : PageModel
{
	public List<IInputGroupItem> itemsList { get; set; }

    [BindProperty]
    public CheckBoxGroupViewModel CheckBoxGroupModel { get; set; }

    public void OnGet()
    {
        if (CheckBoxGroupModel == null)
        {
            itemsList = new List<IInputGroupItem>()
            {
                new InputGroupItemModel()
                {
                    Label = "Red",
                    Value = "one"
                },
                    new InputGroupItemModel()
                {
                    Label = "Green",
                    Value = "two"
                },
                    new InputGroupItemModel()
                {
                    Label = "Blue",
                    Value = "three"
                }
            };

            CheckBoxGroupModel = new CheckBoxGroupViewModel() { Items = itemsList, CheckBoxGroupValue = new string[] { "two" } };
        }
    }
}
```
```C# InputGroupItemModel.cs
    public class InputGroupItemModel: IInputGroupItem
    {
        public IDictionary<string, object> HtmlAttributes { get; set; }

        public string CssClass { get; set; }

        public bool? Enabled { get; set; }

        public bool? Encoded { get; set; }

        public string Label { get; set; }

        public string Value { get; set; }
    }
```
```C# CheckBoxGroupViewModel.cs
    public class CheckBoxGroupViewModel
    {
        public List<IInputGroupItem> Items { get; set; }
        public string[] CheckBoxGroupValue { get; set; }
    }
```

For the complete project, refer to the [CheckBoxGroup in Razor Pages example](https://github.com/telerik/ui-for-aspnet-core-examples/blob/master/Telerik.Examples.RazorPages/Telerik.Examples.RazorPages/Pages/CheckBoxGroup/CheckBoxGroupIndex.cshtml).

## See Also

* [Using Telerik UI for ASP.NET Core in Razor Pages](https://docs.telerik.com/aspnet-core/getting-started/razor-pages#using-telerik-ui-for-aspnet-core-in-razor-pages)
* [Client-Side API of the CheckBoxGroup](https://www.telerik.com/kendo-jquery-ui/documentation/api/javascript/ui/checkboxgroup)
* [Server-Side HtmlHelper API of the CheckBoxGroup](/api/checkboxgroup)
* [Server-Side TagHelper API of the CheckBoxGroup](/api/taghelpers/checkboxgroup)
* [Knowledge Base Section](/knowledge-base)

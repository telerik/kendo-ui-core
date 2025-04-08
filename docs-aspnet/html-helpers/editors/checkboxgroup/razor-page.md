---
title: Razor Pages
page_title: Razor Pages
description: "Learn how to configure the Telerik UI CheckBoxGroup for {{ site.framework }} in RazorPage scenario."
slug: htmlhelpers_checkboxgroup_aspnetcore_razor_page
position: 5
---

# CheckBoxGroup in Razor Pages

Razor Pages is an alternative to the MVC pattern that makes page-focused coding easier and more productive. This approach consists of a `cshtml` file and a `cshtml.cs` file (by design, the two files have the same name). 

You can seamlessly integrate the Telerik UI CheckBoxGroup for {{ site.framework }} in Razor Pages applications.

This article describes how to configure the CheckBoxGroup component in a Razor Pages scenario.

For the complete project, refer to the [CheckBoxGroup in Razor Pages example](https://github.com/telerik/ui-for-aspnet-core-examples/blob/master/Telerik.Examples.RazorPages/Telerik.Examples.RazorPages/Pages/CheckBoxGroup/CheckBoxGroupIndex.cshtml).


```HtmlHelper
    @page
    @model Telerik.Examples.RazorPages.Pages.CheckBoxGroup.CheckBoxGroupIndexModel
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
    <kendo-checkboxgroup name="checkboxgroup"
                        value="@Model.CheckBoxGroupModel.CheckBoxGroupValue"
                        bind-to="@Model.CheckBoxGroupModel.Items">
    </kendo-checkboxgroup>
```
```C# PageModel
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

## See Also

* [CheckBoxGroup Overview]({% slug htmlhelpers_checkboxgroup_aspnetcore_overview %})
* [CheckBoxGroup Data Binding]({% slug htmlhelpers_checkboxgroup_binding_aspnetcore %})

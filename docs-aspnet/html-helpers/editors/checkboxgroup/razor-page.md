---
title: Razor Page
page_title: Configure the CheckBoxGroup in Razor Page
description: "Learn how to configure the Telerik UI CheckBoxGroup for {{ site.framework }} in RazorPage scenario."
slug: htmlhelpers_checkboxgroup_aspnetcore_razor_page
position: 5
---

# Razor Page

This article demonstrates how to configure the Telerik UI CheckBoxGroup HtmlHelper for {{ site.framework }} in a RazorPage scenario.

For the full project with RazorPages examples, visit our [GitHub repository](https://github.com/telerik/ui-for-aspnet-core-examples/tree/master/Telerik.Examples.RazorPages).

```tab-RazorPage(csthml)
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
```tab-PageModel(cshtml.cs)      
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
```InputGroupItemModel.cs
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
```CheckBoxGroupViewModel.cs
    public class CheckBoxGroupViewModel
    {
        public List<IInputGroupItem> Items { get; set; }
        public string[] CheckBoxGroupValue { get; set; }
    }
```

## See Also

* [CheckBoxGroup Overview]({% slug htmlhelpers_checkboxgroup_aspnetcore_overview %})
* [CheckBoxGroup Data Binding]({% slug htmlhelpers_checkboxgroup_binding_aspnetcore %})

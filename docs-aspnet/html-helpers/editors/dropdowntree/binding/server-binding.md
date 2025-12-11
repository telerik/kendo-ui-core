---
title:  Local Binding
page_title: Local Binding
description: "Learn how to bind the {{ site.product }} DropDownTree component to a local dataset."
components: ["dropdowntree"]
slug: htmlhelpers_dropdowntree_serverbinding_aspnetcore
position: 3
---

# Local Binding

Local data binding refers to binding the DropDownTree component to a dataset that is prepared on the server and made available during the initial page rendering. The data is retrieved server-side (from a database, service, or other data source) and then passed to the view, where the `BindTo()` method accepts the `IEnumerable` collection.

The local data binding approach is often used when dealing with small to medium-sized datasets since all records are available when the page is loaded. Also, when the client-side filtering of the DropDownTree is enabled and the complete dataset can be accessed on the client, no additional server requests are needed, which provides fast and responsive user interactions. However, for large datasets, consider using [Ajax data binding]({% slug htmlhelpers_dropdowntree_ajaxbinding_aspnetcore %}) to avoid increased initial page load times and memory usage.

{% if site.core %}
> As of the R1 2024, the DropDownTree TagHelper will require explicit supplementation to a collection of type `DropDownTreeItemModel` instead of the `DropDownTreeItemBase`.
{% endif %}

## Configuration

To configure the DropDownTree for local data binding, follow the next steps:

1. Pass the data collection to the view through `ViewData`.

    ```C#
    public ActionResult Index()
    {
        ViewBag.dropdowntreeData = GetData();
        return View();
    }

    private IEnumerable<DropDownTreeItemModel> GetData()
    {
        List<DropDownTreeItemModel> data = new List<DropDownTreeItemModel>
            {
                new DropDownTreeItemModel
                {
                    Text = "Furniture",
                    Items = new List<DropDownTreeItemModel>
                    {
                        new DropDownTreeItemModel()
                        {
                            Text = "Tables & Chairs"
                        },
                        new DropDownTreeItemModel
                        {
                                Text = "Sofas"
                        },
                        new DropDownTreeItemModel
                        {
                                Text = "Occasional Furniture"
                        }
                    }
                },
                new DropDownTreeItemModel
                {
                    Text = "Decor",
                    Items = new List<DropDownTreeItemModel>
                    {
                        new DropDownTreeItemModel()
                        {
                            Text = "Bed Linen"
                        },
                        new DropDownTreeItemModel
                        {
                                Text = "Curtains & Blinds"
                        },
                        new DropDownTreeItemModel
                        {
                                Text = "Carpets"
                        }
                    }
                }
            };

        return data;
    }
    ```

1. Add the DropDownTree to the view and bind it to the data that is saved in the `ViewData`.

    ```HtmlHelper
        @using Kendo.Mvc.UI.Fluent

        @(Html.Kendo().DropDownTree()
            .Name("dropdowntree")
            .BindTo((IEnumerable<DropDownTreeItemModel>)ViewBag.dropdowntreeData)
        )
    ```
    {% if site.core %}
    ```TagHelper
        <kendo-dropdowntree name="dropdowntree" bind-to="(IEnumerable<DropDownTreeItemModel>)ViewBag.dropdowntreeData">
        </kendo-dropdowntree>
    ```
    {% endif %}

## Mapping Objects to DropDownTreeItemModels

When using local binding, map a custom model collection to a collection of `DropDownTreeItemModel` by using the [`BindTo()`](/api/kendo.mvc.ui.fluent/dropdowntreebuilder#bindtosystemcollectionsienumerablesystemaction) overload. By default, the items are serialized with the default JSON configuration of the [DropDownTree items]({% slug htmlhelpers_dropdowntree_items_aspnetcore %}). When an initial value is set or the `DropDownTreeFor(m=>m)` overload is used and the `DataTextField` and `DataValueField` of the mapped objects differ from the default `text` and `value` fields, configure the `DataTextField` and `DataValueField` options to ensure proper model binding.

```HtmlHelper
@using Kendo.Mvc.UI.Fluent
@model UserViewModel

@(Html.Kendo().DropDownTreeFor(m => m.SelectedOptions)
    .Checkboxes(true)
    .DataTextField("OptionName")
    .DataValueField("OptionValue")
    .AutoBind(true)
    .BindTo((IEnumerable<CategoryItem>)ViewBag.DropDownTreeData, (NavigationBindingFactory<DropDownTreeItem> mappings) =>
    {
        mappings.For<CategoryItem>(binding => binding.ItemDataBound((item, option) =>
        {
            item.Text = option.OptionName;
            item.Value = option.OptionValue;
        })
        .Children(category => category.Items));
    })
)
```
```C# Controller
public ActionResult Index()
{
    ViewBag.DropDownTreeData = GetData();
    var modelData = new UserViewModel() 
    {  
        SelectedOptions = new List<string>() { "storage", "wall-shelving", "ceiling" }
    };
    return View(modelData);
}

private IEnumerable<CategoryItem> GetData()
{
    List<CategoryItem> data = new List<CategoryItem>
    {
        new CategoryItem
        {
            OptionName = "Storage",
            OptionValue = "storage",
            Items = new List<CategoryItem>
            {
                new CategoryItem
                {
                    OptionName = "Wall Shelving",
                    OptionValue = "wall-shelving"
                },
                new CategoryItem
                {
                    OptionName = "Floor Shelving",
                    OptionValue = "floor-shelving"
                },
                new CategoryItem
                {
                    OptionName = "Kids Storage",
                    OptionValue = "kids-storage"
                }
            }
        },
        new CategoryItem
        {
            OptionName = "Lights",
            OptionValue = "lights",
            Items = new List<CategoryItem>
            {
                new CategoryItem
                {
                    OptionName = "Ceiling",
                    OptionValue = "ceiling"
                },
                new CategoryItem
                {
                    OptionName = "Table",
                    OptionValue = "table"
                },
                new CategoryItem
                {
                    OptionName = "Floor",
                    OptionValue = "floor"
                }
            }
        }
    };

    return data;
}
```
```C# Model
public class CategoryItem
{
    public string OptionName { get; set; }
    public string OptionValue { get; set; }
    public List<CategoryItem> Items { get; set; }
}
```

## See Also

* [Local Data Binding by the DropDownTree for {{ site.framework }} (Demo)](https://demos.telerik.com/{{ site.platform }}/dropdowntree/local-data-binding)
* [Server-Side API of the DropDownTree HtmlHelper](/api/dropdowntree)
{% if site.core %}
* [Server-Side API of the DropDownTree TagHelper](/api/taghelpers/dropdowntree)
{% endif %}


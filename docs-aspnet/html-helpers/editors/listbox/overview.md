---
title: Overview
page_title: Overview
description: "Learn the basics when working with the Telerik UI ListBox component for {{ site.framework }}."
previous_url: /helpers/html-helpers/listbox, /helpers/editors/listbox/overview
slug: htmlhelpers_listbox_aspnetcore
position: 0
---

# {{ site.framework }} ListBox Overview

{% if site.core %}
The Telerik UI ListBox TagHelper and HtmlHelper for {{ site.framework }} are server-side wrappers for the Kendo UI ListBox widget.
{% else %}
The Telerik UI ListBox HtmlHelper for {{ site.framework }} is a server-side wrapper for the Kendo UI ListBox widget.
{% endif %}

The ListBox displays a list of data inside a box and allows single or multiple selections, reordering of selected items, deleting items, fast keyboard-only navigation through the component items, as well as dragging and dropping items. You can also connect the ListBox to other ListBoxes and customize its items with templates, toolbar positioning, placeholders, hints, and localization of its command buttons' messages.

* [Demo page for the ListBox HtmlHelper](https://demos.telerik.com/{{ site.platform }}/listbox/index)
{% if site.core %}
* [Demo page for the ListBox TagHelper](https://demos.telerik.com/aspnet-core/listbox/tag-helper){% endif %}

## Initializing the ListBox

The following example demonstrates how to define the ListBox.

```HtmlHelper
   @(Html.Kendo().ListBox()
        .Name("optional")
        .Toolbar(toolbar =>
        {
            toolbar.Position(Kendo.Mvc.UI.Fluent.ListBoxToolbarPosition.Right);
            toolbar.Tools(tools => tools
                .MoveUp()
                .MoveDown()
            );
        })
        .BindTo(ViewBag.Attendees)
    )
```
{% if site.core %}
```TagHelper
    @addTagHelper *, Kendo.Mvc
    @{
        var tools = new string[] { "moveUp", "moveDown"};
    }
    
    <kendo-listbox name="optional" bind-to="ViewBag.Attendees">
        <toolbar position="ListBoxToolbarPosition.Right" tools="tools" />
    </kendo-listbox>

```
{% endif %}
```Controller
    public ActionResult Index()
    {
        ViewBag.Attendees = new List<string>
        {
            "Steven White",
            "Nancy King",
            "Nancy Davolio",
            "Robert Davolio",
            "Michael Leverling",
            "Andrew Callahan",
            "Michael Suyama"
        };
        return View();
    }
```

## Basic Configuration

The following example demonstrates the basic configuration of two connected ListBox components.

```HtmlHelper
    @(Html.Kendo().ListBox()
        .Name("listbox1")
        .DataValueField("ProductID")
        .DataTextField("ProductName")
        .DataSource(source => source
            .Read(read => read.Action("GetProducts", "ListBox"))
        )
        .ConnectWith("listbox2")
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
                .Remove());
        })
        .BindTo(new List<ProductViewModel>())
    )

    @(Html.Kendo().ListBox()
        .Name("listbox2")
        .DataValueField("ProductID")
        .DataTextField("ProductName")
        .ConnectWith("listbox1")
        .BindTo(new List<ProductViewModel>())
    )
```
{% if site.core %}
```TagHelper

    @addTagHelper *, Kendo.Mvc

    @{
        var products = new List<ProductViewModel>();
        var products2 = new List<ProductViewModel>();
        var tools = new string[] { "moveUp", "moveDown", "transferTo", "transferFrom", "transferAllTo", "transferAllFrom", "remove" };
    }
    
    <kendo-listbox name="listbox1"
        datatextfield="ProductName"
        datavaluefield="ProductID"
        connect-with="listbox2"
        bind-to="products">
        <datasource>
            <transport>
                <read url="@Url.Action("GetProducts", "ListBox")"/>
            </transport>
        </datasource>
        <toolbar position="ListBoxToolbarPosition.Right" tools="tools"/>
    </kendo-listbox>

    <kendo-listbox name="listbox2"
        datatextfield="ProductName"
        datavaluefield="ProductID"
        connect-with="listbox1"
        bind-to="products2">
    </kendo-listbox>

```
{% endif %}
```ListBoxController

    public IActionResult GetProducts()
    {
        var products = Enumerable.Empty<ProductViewModel>();

        using (var northwind = GetContext())
        {
            products = northwind.Products.Select(product => new ProductViewModel
            {
                ProductID = product.ProductID,
                ProductName = product.ProductName
            }).ToList();
        }
        return Json(products);
    }
```

## Functionality and Features

| Feature | Description |
|---------|-------------|
| [Data Binding]({% slug htmlhelpers_listbox_databinding_aspnetcore %})| The ListBox can bind to local data collections or remote data. |
| [Item templates]({% slug htmlhelpers_listbox_templates_aspnetcore %})| You can use the component template option to customize the rendering of its items. |
| [Dragging and dropping]({% slug htmlhelpers_listbox_draganddrop_aspnetcore %})| Enable the drag-and-drop feature of the ListBox items.|
| [Selection]({% slug htmlhelpers_listbox_selection_aspnetcore %})| The component supports single and multiple selection modes.|
| [Events]({% slug events_listbox %})| The ListBox emits various events that you can handle and use to control what happens during the user interaction.|
| [Globalization]({% slug htmlhelpers_listbox_globalization_aspnetcore %}) | The ListBox provides globalization through the combination of [localization]({% slug htmlhelpers_listbox_localization_aspnetcore %}) and [right-to-left support]({% slug htmlhelpers_listbox_rtl_aspnetcore %}).|
| [Accessibility]({% slug htmlhelpers_listbox_accessibility_aspnetcore %})| The ListBox is accessible for screen readers, supports WAI-ARIA attributes, and delivers [keyboard shortcuts]({% slug htmlhelpers_listbox_navigation_aspnetcore %}) for faster navigation.| 

## Next Steps

* [Getting Started with the ListBox]({% slug listbox_getting_started %})
* [Basic Usage of the ListBox HtmlHelper for {{ site.framework }} (Demo)](https://demos.telerik.com/{{ site.platform }}/listbox/index)
{% if site.core %}
* [Basic Usage of the ListBox TagHelper for ASP.NET Core (Demo)](https://demos.telerik.com/aspnet-core/listbox/tag-helper)
{% endif %}

## See Also

* [Using the API of the ListBox for {{ site.framework }} (Demo)](https://demos.telerik.com/{{ site.platform }}/listbox/api)
* [Knowledge Base Section](/knowledge-base)

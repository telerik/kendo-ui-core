---
title: Selection
page_title: Selection
description: "Get started with the {{ site.product }} ListBox and learn how enable the selection functionality."
previous_url: /helpers/editors/listbox/selection
slug: htmlhelpers_listbox_selection_aspnetcore
position: 5
---

# Selection

By default, the ListBox is set into a single-selection mode.

> As of the 2022 R3 release, the [`Change`](https://docs.telerik.com/{{ site.platform }}/api/Kendo.Mvc.UI.Fluent/ListBoxEventBuilder#changesystemstring) event will now be fired only when Selection/Deselection is performed.

## Enabling Multiple Selection

To enable the multiple-selection mode of the ListBox, add `ListBoxSelectable.Multiple` to its settings. When selected, multiple selected items move together, that is, the selected items are transferred to another Telerik UI ListBox together or reordered as a set among other items.

```HtmlHelper
    @(Html.Kendo().ListBox()
        .Name("optional")
        .DataTextField("ContactName")
        .DataValueField("CustomerID")
        .DataSource(source => source
            .Read(read => read.Action("GetCustomers", "ListBox"))
        )
        .TemplateId("customer-item-template")
        .Draggable(draggable => draggable.Placeholder("customPlaceholder"))
        .DropSources("selected")
        .ConnectWith("selected")
        .Selectable(ListBoxSelectable.Single) // Enable single selection
        .Toolbar(toolbar =>
        {
            toolbar.Position(ListBoxToolbarPosition.Right);
            toolbar.Tools(tools => tools
                .TransferTo()
                .Remove());
        })
        .BindTo(new List<CustomerViewModel>())
    )

    @(Html.Kendo().ListBox()
        .Name("selected")
        .DataTextField("ContactName")
        .DataValueField("CustomerID")
        .TemplateId("customer-item-template")
        .Draggable(draggable => draggable.Placeholder("customPlaceholder"))
        .DropSources("optional")
        .ConnectWith("optional")
        .Selectable(ListBoxSelectable.Multiple) // Enable multi selection
        .BindTo(new List<CustomerViewModel>())
    )
```
{% if site.core %}
```TagHelper

        @{
            var dropSources = new string[] { "selected" };
            var dropSources2 = new string[] { "optional" };
            var customers = new List<CustomerViewModel>();
            var customers2 = new List<CustomerViewModel>();
            var tools = new string[] { "transferTo", "remove" };
        }
        <kendo-listbox name="optional"
                       datatextfield="ContactName"
                       datavaluefield="CustomerID"
                       template-id="customer-item-template"
                       drop-sources="dropSources"
                       connect-with="selected"
                       selectable="ListBoxSelectable.Single"
                       bind-to="customers">
                <draggable enabled="true" placeholder="customPlaceholder"/>
                <datasource>
                    <transport>
                        <read url="@Url.Action("GetCustomers", "ListBox")"/>
                    </transport>
                </datasource>
                <toolbar position="ListBoxToolbarPosition.Right"
                         tools="tools"/>
        </kendo-listbox>

        <kendo-listbox name="selected"
                       datatextfield="ContactName"
                       datavaluefield="CustomerID"
                       template-id="customer-item-template"
                       drop-sources ="dropSources2"
                       connect-with="opitonal"
                       selectable="ListBoxSelectable.Multiple"
                       bind-to="customers2">
                <draggable enabled="true" placeholder="customPlaceholder"/>
        </kendo-listbox>
```
{% endif %}
```Template
    <script id="customer-item-template" type="text/x-kendo-template">
        <span class="k-state-default" style="background-image: url('../content/web/Customers/#:data.CustomerID#.jpg')"></span>
        <span class="k-state-default"><h3>#: data.ContactName #</h3><p>#: data.CompanyName #</p></span>
    </script>
```

## Reordering of Selections

The ListBox allows you to reorder the selected items by using any of the following approaches:

* The `moveUp` and `moveDown` command buttons of the toolbar.
* The drag-and-drop functionality if the ListBox is `draggable`.
* The `Ctrl`+`Shift`+ <kbd>&darr;</kbd> or `Ctrl`+`Shift`+ <kbd>&uarr;</kbd> keyboard combinations.

> Currently, the ListBox does not support the drag-and-drop feature for multiple selected items.

## See Also

* [Server-Side API](/api/listbox)

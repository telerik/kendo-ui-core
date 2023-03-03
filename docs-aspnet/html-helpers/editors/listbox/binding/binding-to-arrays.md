---
title: Binding to Arrays
page_title: Array Binding
description: "Get started with the {{ site.product }} ListBox and learn how to bind the ListBox to client-side or server-side array."
slug: htmlhelpers_listbox_array_binding_aspnetcore
position: 3
---

# Binding to Arrays

The ListBox provides options for binding it to server-side and client-side arrays.

## Server-Side Arrays

When you use complex data objects, apply the `DataTextField` and `DataValueField` properties to notify the widget of your preferred binding behavior.

The following example demonstrates how to initialize the ListBox and bind it to a server-side array.

```HtmlHelper
    var data = new string[] {
        "Washington",
        "London",
        "Canberra",
        "Ottawa",
        "Sofia",
        "Moscow",
        "Madrid"
    };

    @(Html.Kendo().ListBox().Name("listbox")
            .Toolbar(x => x.Position(ListBoxToolbarPosition.Right)
                .Tools(y =>
                {
                    y.MoveUp();
                    y.MoveDown();
                    y.TransferTo();
                    y.TransferFrom();
                    y.TransferAllTo();
                    y.TransferAllFrom();
                    y.Remove();

                }))
            .BindTo(data)
    )
```
{% if site.core %}
```TagHelper
    var data = new string[] {
        "Washington",
        "London",
        "Canberra",
        "Ottawa",
        "Sofia",
        "Moscow",
        "Madrid"
    };

    <kendo-listbox name="listbox"  bind-to="data">
        <toolbar position="ListBoxToolbarPosition.Right"
                    tools='new string[] { "moveUp", "moveDown", "transferTo", "transferFrom", "transferAllTo", "transferAllFrom", "remove"}' />
    </kendo-listbox>
````
{% endif %}

## Client-Side Arrays

The following example demonstrates how to initialize the ListBox and bind it to a client-side array.

```HtmlHelper
    @(Html.Kendo().ListBox().Name("listbox")
                .Toolbar(x => x.Position(ListBoxToolbarPosition.Right)
                    .Tools(y =>
                    {
                        y.MoveUp();
                        y.MoveDown();
                        y.TransferTo();
                        y.TransferFrom();
                        y.TransferAllTo();
                        y.TransferAllFrom();
                        y.Remove();

                    }))
                .DataSource("dataSource")
        )

    <script>
        var dataSource = new kendo.data.DataSource({
            data: [
                "Washington",
                "London",
                "Canberra",
                "Ottawa",
                "Sofia",
                "Moscow",
                "Madrid"]
        })
    </script>
```
{% if site.core %}
```TagHelper
    <kendo-listbox name="listbox" datasource-id="dataSource">
        <toolbar position="ListBoxToolbarPosition.Right"
                    tools='new string[] { "moveUp", "moveDown", "transferTo", "transferFrom", "transferAllTo", "transferAllFrom", "remove"}' />
    </kendo-listbox>

    <script>
        var dataSource = new kendo.data.DataSource({
            data: [
                "Washington",
                "London",
                "Canberra",
                "Ottawa",
                "Sofia",
                "Moscow",
                "Madrid"]
        })
    </script>
````
{% endif %}

## See Also

* [Remote Data Binding of the ListBox HtmlHelper for {{ site.framework }} (Demo)](https://demos.telerik.com/{{ site.platform }}/listbox/templates)
* [Server-Side API](/api/listbox)

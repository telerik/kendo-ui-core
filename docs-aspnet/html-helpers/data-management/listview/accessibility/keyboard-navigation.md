---
title: Keyboard Navigation
page_title: Keyboard Navigation
description: "Configure the Telerik UI ListView for {{ site.framework }} to enable keyboard navigation."
slug: htmlhelpers_listview_aspnetcore_navigation
position: 6
---

# Keyboard Navigation

By default, the keyboard navigation of the ListView HtmlHelper is disabled.

The ListView supports its keyboard navigation functionality through the `Navigatable` option. When set to `true`, you can initially select an item and then move within the ListView by using the `Arrow` keys. The navigation occurs at item level regardless of what the selectable mode is. To select the current item, press `Space`.

The following example demonstrates how to enable the key navigation in the ListView.

```Razor
    @(Html.Kendo().ListView(Model) // The ListView will be initially bound to the Model which is the Products table.
        .Name("productListView") // The name of the ListView is mandatory. It specifies the "id" attribute of the widget.
        .TagName("div") // The tag name of the ListView is mandatory. It specifies the element which wraps all ListView items.
        .ClientTemplateId("template") // This template will be used for rendering the ListView items.
        .Navigatable()
        .HtmlAttributes(new { style="height:350px;" })
    )
```
```Template
    <script type="text/x-kendo-tmpl" id="template">
        <div class="product">
            <h3>#=ProductName#</h3>
            <dl>
                <dt>Price:</dt>
                <dd>#=kendo.toString(UnitPrice, "c")#</dd>
            </dl>
        </div>
    </script>
```

## See Also

* [Keyboard Navigation by the ListView HtmlHelper for {{ site.framework }} (Demo)](https://demos.telerik.com/{{ site.platform }}/listview/keyboard-navigation)
* [Server-Side API](/api/listview)

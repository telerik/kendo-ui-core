---
title: Items Binding
page_title: Items Binding
description: "Manually define the properties of each item in the Telerik UI PanelBar component for {{ site.framework }} by using the items builder."
components: ["panelbar"]
slug: itemsbinding_panelbarhelper_aspnetmvc
position: 2
---

# Items Binding

The PanelBar enables you to declare its items and the properties of each item within the helper declaration.

The following example demonstrates how to configure the PanelBar items using the `Items()` configuration.

```HtmlHelper
@(Html.Kendo().PanelBar()
    .Name("panelbar") // The name of the PanelBar is mandatory. It specifies the "id" attribute of PanelBar's HTML element.
    .Items(items =>
    {
        items.Add().Text("Item 1").Expanded(true).Selected(true);
        items.Add().Text("Item 2");
    })
)
```
{% if site.core %}
```TagHelper
    <kendo-panelbar name="panelbar">
    <items>
        <panelbar-item text="Item 1" expanded="true" selected="true"></panelbar-item>
        <panelbar-item text="Item 2"></panelbar-item>
    </items>
</kendo-panelbar>
```
{% endif %}

> When the `Items` configuration is used, the component generates internally the required [HTML markup used for its initialization](https://docs.telerik.com/kendo-ui/controls/panelbar/overview#from-html). In this scenario the [`DataBound`](/api/kendo.mvc.ui.fluent/panelbareventbuilder#databoundsystemstring) event does not fire.

## See Also

* [Basic Usage of the PanelBar for {{ site.framework }} (Demo)](https://demos.telerik.com/{{ site.platform }}/panelbar)
* [Server-Side API of the PanelBar HtmlHelper](/api/panelbar)
{% if site.core %}
* [Server-Side API of the PanelBar TagHelper](/api/taghelpers/panelbar)
{% endif %}

---
title: Items Binding
page_title: Items Binding
description: "Manually define the properties of each item in the Telerik UI PanelBar component for {{ site.framework }} by using the items builder."
slug: itemsbinding_panelbarhelper_aspnetmvc
position: 2
---

# Items Binding

The PanelBar enables you to manually define the properties of each item.

1. Make sure you followed all the steps from the [introductory article on Telerik UI for {{ site.framework }}]({% slug overview_aspnetmvc6_aspnetmvc %}).
1. Create a new action method which renders the view.

        public ActionResult Index()
        {
            return View();
        }

1. Add a PanelBar.

    ```HtmlHelper
        @(Html.Kendo().PanelBar()
            .Name("panelbar") // The name of the panelbar is mandatory. It specifies the "id" attribute of the PanelBar.
            .Items(items =>
            {
                items.Add().Text("Item 1"); // Add item with text "Item1".
                items.Add().Text("Item 2"); // Add item with text "Item2".
            })
        )
    ```
    {% if site.core %}
    ```TagHelper
     <kendo-panelbar name="panelbar">
        <items>
            <panelbar-item text="Item 1"></panelbar-item>
            <panelbar-item text="Item 2"></panelbar-item>
        </items>
    </kendo-panelbar>
    ```
    {% endif %}

    > When the `Items` configuration is used, the component generates internally the required [HTML markup used for its initialization](https://docs.telerik.com/kendo-ui/controls/navigation/panelbar/overview#from-html). In this scenario the [DataBound](/api/Kendo.Mvc.UI.Fluent/PanelBarEventBuilder#databoundsystemstring) event is not fired.

## See Also

* [Basic Usage of the PanelBar HtmlHelper for {{ site.framework }} (Demo)](https://demos.telerik.com/{{ site.platform }}/panelbar)
* [PanelBarBuilder Server-Side API](/api/Kendo.Mvc.UI.Fluent/PanelBarBuilder)
* [PanelBar Server-Side API](/api/panelbar)

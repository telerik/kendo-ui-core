---
title: Integration
page_title: Integration
description: "Learn how to integrate editors within the Telerik UI ToolBar component for {{ site.framework }}."
components: ["toolbar"]
slug: toolbar_integration
position: 6
---

# Integration with Editors

The ToolBar component can be used together with the [Template component]({% slug htmlhelpers_overview_template%}) to present custom content to the user.

The content may include various editors like [NumericTextBox]({% slug htmlhelpers_numerictextbox_aspnetcore %}), [Switch]({% slug overview_switchhelper_aspnetcore%}), and more, as they can be conveniently embedded in the ToolBar definition.

The example below demonstrates how you integrate a NumericTextBox for entering the size of a given product and then accessing the new value at runtime.

```HtmlHelper
<script>
    function onSizeChange(e) {
        alert("New Value: " + this.value());
    }
</script>

@(Html.Kendo().ToolBar()
    .Name("ToolBar")
    .Resizable(false)
    .Items(items => {
        items.Add().Template(Html.Kendo().Template()
            .AddHtml("<label>Product Size:</label>")
            .AddComponent(numBox => numBox
                .NumericTextBox()
                .Name("size")
                .HtmlAttributes(new { style = "width: 70px;" })
                .Value(150)
                .Decimals(0)
                .Min(50)
                .Max(300)
                .Format("n0")
                .Events(ev => ev.Change("onSizeChange"))
            )
        );
    })
)
```
{% if site.core %}
```TagHelper
@addTagHelper *, Kendo.Mvc

<kendo-toolbar resizable="false" name="ToolBar">
    <toolbar-items>
        <item template="<label>Size:</label><input id='size' style='width: 70px;' type='text' />">
        </item>
    </toolbar-items>
</kendo-toolbar>

<script>
    $("#size").kendoNumericTextBox({
            value: 150,
            decimals: 0,
            format: "n0",
            max: 300,
            min: 50,
            change: function () {
              alert("New Value: " + this.value());
            }
    });
</script>
```
{% endif %}

## Next Steps

* [ToolBar Integration with Editors (Demo)](https://demos.telerik.com/{{ site.platform }}/toolbar/integration)
* [Basic Usage of the Template component (Demo)](https://demos.telerik.com/{{ site.platform }}/template)
* [Using the API of the ToolBar for {{ site.framework }} (Demo)](https://demos.telerik.com/{{ site.platform }}/toolbar/api)

## See Also

* [Server-Side API of the ToolBar HtmlHelper](/api/toolbar)
{% if site.core %}
* [Server-Side API of the ToolBar TagHelper](/api/taghelpers/toolbar)
{% endif %}
* [Client-Side API of the ToolBar](https://docs.telerik.com/kendo-ui/api/javascript/ui/toolbar)

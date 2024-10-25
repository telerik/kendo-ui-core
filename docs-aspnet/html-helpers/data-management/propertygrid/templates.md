---
title: Templates
page_title: Templates
description: "Use templates and customize the appearance of the items values of the Telerik UI PropertyGrid component for {{ site.framework }}."
slug: htmlhelpers_templates_propertygrid
position: 4
---

# Templates

The PropertyGrid allows you to control the appearance of the items values by using template options.

For more information on the capabilities and syntax of the templates, see the [Using Client Templates]({% slug client_templates_overview %}) article. For a runnable example, refer to the [demo on customizing the templates in the PropertyGrid](https://demos.telerik.com/{{ site.platform }}/propertygrid/templates).

The following example demonstrates how to use the `TemplateHandler()` option to customize the value of an item that has child items.

```HtmlHelper
    @(Html.Kendo().PropertyGrid<PropertyViewModel>()
        .Name("propertyGrid")
        .Items(items =>
        {
            items.Add().Field("font").TemplateHandler("fontTemplate")
            .Items(childItems =>
            {
                childItems.Add().Field("fontWeight");
                childItems.Add().Field("fontFamily");
            });
        })
        ... //Additional configuration
    )
```
{% if site.core %}
```TagHelper
    @addTagHelper *, Kendo.Mvc

    <kendo-propertygrid name="propertyGrid">
        <property-grid-items>
            <property-grid-item field="font" template-handler="fontTemplate">
                <property-grid-items>
                    <property-grid-item field="fontWeight">
                    </property-grid-item>
                    <property-grid-item field="fontFamily">
                    </property-grid-item>
                </property-grid-items>
            </property-grid-item>
        </property-grid-items>
      <!-- Additional configuration -->
    </kendo-propertygrid>
```
{% endif %}
```Scripts
    <script>
        function fontTemplate(data) {
            var propertyGridModel = $("#propertyGrid").data('kendoPropertyGrid').model();
            return `<span class="fontWeight">${propertyGridModel.font["fontWeight"]}</span> <span class="fontFamily">${propertyGridModel.font["fontFamily"]}</span>`;
        }
    </script>
```

The following example demonstrates how to create an inline string template by using the `Template()` option.

```HtmlHelper
    @(Html.Kendo().PropertyGrid<PropertyViewModel>()
        .Name("propertyGrid")
        .Items(items =>
        {
            items.Add().Field(f => f.color).Template("<i><span style='color:#=value#'>#=value#</span></i>")
            .Editor(editor => editor
                .DropDownList()
                .BindTo(new string[] { "red", "green", "blue", "purple", "orange" }));
        })
        ... //Additional configuration
    )
```
{% if site.core %}
```TagHelper
    @addTagHelper *, Kendo.Mvc
    @{
        var colors = new string[] { "red", "green", "blue", "purple", "orange" };
    }
    <kendo-propertygrid name="propertyGrid">
        <property-grid-items>
            <property-grid-item field="color" template="<i><span style='color:#=value#'>#=value#</span></i>">
                <dropdownlist-editor bind-to="colors"></dropdownlist-editor>
            </property-grid-item>
        </property-grid-items>
      <!-- Additional configuration -->
    </kendo-propertygrid>
```
{% endif %}

## See Also

* [Templates in the PropertyGrid HtmlHelper for {{ site.framework }} (Demo)](https://demos.telerik.com/{{ site.platform }}/propertygrid/templates)
* [Using Client Templates]({% slug client_templates_overview %})

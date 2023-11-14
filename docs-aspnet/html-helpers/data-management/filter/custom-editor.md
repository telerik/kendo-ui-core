---
title: Custom Editor
page_title: Custom Editor
description: "Learn how to use a specific editor for the Telerik UI Filter component for {{ site.framework }}."
slug: htmlhelpers_filter_aspnetcore_custom_editor
position: 4
---

# Custom Editor

The Filter provides the possibility to use custom editors for scenarios requiring the use of specific editor for certain types of data.

## Implementing Custom Editors

To implement a custom editor you need to specify the [`.EditorTemplateHandler()`](/api/kendo.mvc.ui.fluent/filterfieldbuilder#editortemplatehandlersystemstring), [`.EditorTemplateid()`](/api/kendo.mvc.ui.fluent/filterfieldbuilder#editortemplateidsystemstring) or [`.EditorTemplate()`](/api/kendo.mvc.ui.fluent/filterfieldbuilder#editortemplatesystemstring) options of the Filter's Field configuration. The value of this field will point to the editor template that will be used by the {{ site.product }} Filter to render the editor.

The following example demonstrates how to create a custom editor using the [`.EditorTemplateHandler()`](/api/kendo.mvc.ui.fluent/filterfieldbuilder#editortemplatehandlersystemstring) configuration option:

```HtmlHelper
    @(Html.Kendo().Filter<Kendo.Mvc.Examples.Models.ProductViewModel>()
        .Name("filter")
        .ApplyButton(true)
        .DataSource("dataSource1")
        .Fields(f =>
        {
            f.Add(p=>p.ProductName).Label("Product Name");
            f.Add(p=>p.CategoryID).Label("Category").DefaultValue(1).EditorTemplateHandler("categoryDropDownEditor");
        })
    )
```
```JavaScript
    <script>
        function categoryDropDownEditor(container, options) {
            $('<input data-bind="value: value" name="' + options.field + '"/>')
                .appendTo(container)
                .kendoDropDownList({
                    dataTextField: "CategoryName",
                    dataValueField: "CategoryID",
                    dataSource: {
                        type: "odata",
                        transport: {
                            read: "https://demos.telerik.com/kendo-ui/service/Northwind.svc/Categories"
                        }
                    }
                });
        }
    </script>
```

## See Also

* [Custom Editors for the Filter HtmlHelper for {{ site.framework }} (Demo)](https://demos.telerik.com/{{ site.platform }}/filter/custom-editors)
* [Server-Side API](/api/filter)

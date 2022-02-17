---
title: Templates
page_title: Templates
description: "Learn how to use templates in the Telerik UI PanelBar component for {{ site.framework }}."
slug: htmlhelpers_panelbar_templates_aspnetcore
position: 5
---

# Templates

The PanelBar for {{ site.framework }} supports templates for customizing the appearance of its items.

To customize look and feel of the PanelBar use the `Template()` or `TemplateId()` configuration options to set a template that will be used for the rendering the PanelBar's items. 

The following example demonstrates how to use the `TemplateId()` configuration:

```HtmlHelper
    <script id="template" type="text/kendo-ui-template">
        # if (!item.items) { #
            #: item.text #
        # } else { #
            <b> #: item.text # </b> 
        # } #
    </script>

    @(Html.Kendo().PanelBar()
        .Name("panelbar")
        .TemplateId("template")
        .DataSource(source =>
        {
            source.Read(read => read.Action("Read_TemplateData", "PanelBar"));
        })
    )
```

## See Also
* [Templates in the PanelBar HtmlHelper for {{ site.framework }} (Demo)](https://demos.telerik.com/{{ site.platform }}/panelbar/templates)
* [Kendo UI Templates](https://docs.telerik.com/kendo-ui/framework/templates/overview)
* [PanelBar Server-Side API](/api/panelbar)

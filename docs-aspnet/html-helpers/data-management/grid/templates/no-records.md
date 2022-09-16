---
title: No Records Template
page_title: Grid No Records Template
description: "Learn how to set a no records template in the Grid component for {{ site.framework }} if the backend does not return any data."
slug: htmlhelpers_norecordstemplate_grid
---

# No Records Template

The Grid can show a built-in or custom message to the user when there are no records to display. There are several ways to configure it.

The following example demonstrates how to enable the default built-in `No Records` message.

```HtmlHelper
    @(Html.Kendo().Grid<Order>()
        .Name("Grid")
        .NoRecords()
    )
```
{% if site.core %}
```TagHelper
    <kendo-grid name="Grid">
	    <no-records />
    </kendo-grid>
```
{% endif %}
The following example demonstrates how to define a custom `No Records` message. In this case, the custom message is be displayed centered inside the empty Grid's data area.

```HtmlHelper
    @(Html.Kendo().Grid<Order>()
        .Name("Grid")
        .NoRecords("string HTML template, automatically centered")
    )
```
{% if site.core %}
```TagHelper
    <kendo-grid name="Grid">
	    <no-records template="string HTML template, automatically centered" />
    </kendo-grid>
```
{% endif %}
The following example demonstrates how to define a non-centered custom `No Records` message. In this case, the custom message is displayed with no centering styles applied, which allows an easier and more advanced appearance customization through custom CSS code.

```HtmlHelper
    @(Html.Kendo().Grid<Order>()
        .Name("Grid")
        .NoRecords(n => n.Template("string HTML template, not centered"))
    )
```
{% if site.core %}
```TagHelper
    <kendo-grid name="Grid">
	    <no-records template="string HTML template, automatically centered" />
    </kendo-grid>
```
{% endif %}

The following example demonstrates how to define a custom `No Records` message with an external Kendo UI template. This case is the same as the above one, but the template is defined outside the Grid declaration.

```HtmlHelper
    <script id="no-records-template-id" type="text/x-kendo-template">
        external HTML template, not centered
    </script>

    @(Html.Kendo().Grid<Order>()
        .Name("Grid")
        .NoRecords(n => n.TemplateId("no-records-template-id"))
    )
```
{% if site.core %}
```TagHelper
    <script id="no-records-template-id" type="text/x-kendo-template">
        external HTML template, not centered
    </script>
    
    <kendo-grid name="Grid">
	    <no-records template-id="no-records-template-id" />
    </kendo-grid>
```
{% endif %}

## See Also

* [Server-Side API](/api/datasource)

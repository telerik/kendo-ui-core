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

The following example demonstrates how to define a custom `No Records` message. In this case, the custom message is displayed with no centering styles applied, which allows an easier and more advanced appearance customization through custom CSS code.

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

Another option is to use the `TemplateHandler()` option that returns the desired `No Records` message through a JavaScript function. For example, you can specify diffeent messages based on a condition.

```HtmlHelper
    @(Html.Kendo().Grid<Order>()
        .Name("Grid")
        .NoRecords(n => n.TemplateHandler("noRecordsMsg"))
    )
```
{% if site.core %}
```TagHelper
    <kendo-grid name="Grid">
	    <no-records template-handler="noRecordsMsg" />
    </kendo-grid>
```
{% endif %}
```Scripts
<script>
    function noRecordsMsg() {
        if(new Date() > new Date(2024,4,28)) { // Specify the required condition.
            return "No new records.";
        } else return "No items found.";
    }
</script>
```

## See Also

* [Server-Side API](/api/datasource)

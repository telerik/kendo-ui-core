---
title: Templates
page_title: jQuery ListBox Documentation | Templates
description: "Get started with the jQuery ListBox by Kendo UI and implement templates for its items."
slug: templates_kendoui_listbox_widget
position: 5
---

# Templates

The ListBox supports the use of [templates]({% slug overview_kendoui_templatescomponent %}) for its items that are passed as а function or string.

```dojo

    <script type="text/kendo-x-tmpl" id="template">
        <h5 style="color:#=data.color#">#=name#</h5>
    </script>

    <select id="listbox"></select>
    <script>
        $("#listbox").kendoListBox({
            dataSource: {
                data: [
                    { name: "Red", color: "red" },
                    { name: "Blue", color: "blue" },
                    { name: "Green", color: "green" }
                ]
            },
            template: kendo.template($("#template").html())
        });
    </script>

```

## See Also

* [Using Templates in the ListBox (Demo)](https://demos.telerik.com/kendo-ui/listbox/templates)
* [JavaScript API Reference of the ListBox](/api/javascript/ui/listbox)

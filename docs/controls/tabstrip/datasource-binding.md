---
title: DataSource Binding
page_title: jQuery TabStrip Documentation - DataSource Binding
description: "Get started with the jQuery TabStrip by Kendo UI and learn how to bind it to a dataSource."
slug: datasource_binding_tabstrip
position: 6
---

# DataSource Binding

The TabStrip [`dataSource`](/api/javascript/ui/tabstrip/configuration/datasource) allows you to configure various features of the component related to the content and its visual representation. You can define multiple fields such as `text`, `content`, and `icon` from the list of [Kendo Icons](https://www.telerik.com/design-system/docs/foundation/iconography/icon-list/), etc.

The example below shows the more commonly used fields in the TabStrip `dataSource`:

```dojo
<div id="tabstrip"></div>

<script>
    $(document).ready(function () {
        $("#tabstrip").kendoTabStrip({
            dataSource: [
                { text: "Home", content: "Welcome to the Home tab.", icon: "home", iconPosition: "before" }, 
                { text: "Profile", content: "This is your Profile information.", icon: "user", iconPosition: "before" },
                { text: "Settings", content: "Adjust your Settings here.", icon: "gear", iconPosition: "after", closable: true },                
            ],
            dataTextField: "text",
            dataContentField: "content",
            dataIconField: "icon",
            dataIconPositionField: "iconPosition",
        });
    });
</script>
```

## Actions

You can also define `actions` which will render buttons inside the tabs. Below you will find how to configure actions for a tab:

```dojo
<div id="tabstrip"></div>

<script>
    $(document).ready(function () {
        $("#tabstrip").kendoTabStrip({
            dataSource: [
                { text: "Home", content: "Welcome to the Home tab.", icon: "home", iconPosition: "before" }, 
                {
                    text: "Tab with actions",
                    content: "Tab content",
                    actions: [
                        {
                            icon: "pencil",
                            action: function(e) {
                            console.log("Edit tab", e);
                            }
                        },
                        {
                            icon: "arrow-rotate-ccw",
                            action: function(e) {
                            console.log("Refresh tab", e);
                            }
                        }
                    ]
                }               
            ],
            dataTextField: "text",
            dataContentField: "content",
            dataIconField: "icon",
            dataIconPositionField: "iconPosition",
        });
    });
</script>
```

## See Also

* [DataSource Binding (Demo)](https://demos.telerik.com/kendo-ui/tabstrip/datasource-binding) 
* [JavaScript API Reference of the TabStrip](/api/javascript/ui/tabstrip)

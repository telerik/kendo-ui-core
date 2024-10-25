---
title: Items
page_title: Items
description: "Learn how to configure the items of the ActionSheet component."
slug: htmlhelpers_items_actionsheet_aspnetcore
position: 2
---

# Items

The ActionSheet items are set of options that users can choose from.

The `Items` configuration allows you to set specific attributes of the ActionSheet items. You can set their:

- Text
- Icon
- Group (items can be segregated in two groups - top and bottom)
- Description 
- Click event handler name

The following example demonstrates the possible options for the `Items` configuration of the ActionSheet component.

```HtmlHelper
    @(Html.Kendo().ActionSheet()
        .Name("actionsheet")
        .Title("Select item")
        .Items(items =>
        {
            items.Add().Text("Edit Item").IconClass("k-icon k-i-edit").Description("Select to enter edit mode.").Click("onClick");
            items.Add().Text("Add to Favorites").IconClass("k-icon k-i-heart").Click("onClick");
            items.Add().Text("Upload New").IconClass("k-icon k-i-upload").Click("onClick");
            items.Add().Text("Cancel").IconClass("k-icon k-i-cancel").Group("bottom").Click("onClick");
        })
    )
```
{% if site.core %}
```TagHelper
    <kendo-actionsheet name="actionsheet" title="Select item">
        <items>
            <item text="Edit Item" icon-class="k-icon k-i-edit" description="Select to enter edit mode." click="onClick" />
            <item text="Add to Favorites" icon-class="k-icon k-i-heart" click="onClick" />
            <item text="Upload New" icon-class="k-icon k-i-upload" click="onClick" />
            <item text="Cancel" icon-class="k-icon k-i-cancel" group="bottom" click="onClick" />
        </items>
    </kendo-actionsheet>
````
{% endif %}
```Script
    <script>
        function onClick(e) {
            e.preventDefault();
            var actionsheet = $("#actionsheet").data("kendoActionSheet");
            actionsheet.close();
        }
    </script>

```

## See Also

* [Overview of the ActionSheet HtmlHelper for {{ site.framework }} (Demo)](https://demos.telerik.com/{{ site.platform }}/actionsheet)
* [Server-Side API of the ActionSheet HtmlHelper](/api/actionsheet)
{% if site.core %}
* [Server-Side API of the ActionSheet TagHelper](/api/taghelpers/actionsheet)
{% endif %}

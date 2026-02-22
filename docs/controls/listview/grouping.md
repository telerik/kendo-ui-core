---
title: Grouping
page_title: jQuery ListView Documentation - Grouping
description: "Get started with the jQuery ListView by Kendo UI and learn how to implement its grouping functionality."
components: ["listview"]
slug: grouping_kendoui_listview
position: 5
---

# Grouping

The ListView supports grouping through the DataSource grouping capability. When grouping is enabled, the ListView template is applied once per group rather than once per item.

For more information on DataSource grouping configuration, refer to the [Kendo UI DataSource group configuration](https://docs.telerik.com/kendo-ui/api/javascript/data/datasource/configuration/group).

## Sample Explanation

You can find the full sample displayed here:

[Kendo UI ListView Grouping (Demo)](https://demos.telerik.com/kendo-ui/listview/grouping)

## Configuring the Template for Grouping

When data is grouped, the template receives a `data` object with the following structure:

- `data.value`—The value of the grouping field for the current group.
- `data.items`—An array containing all items that belong to the current group.

Configure the ListView template to render the group structure. The template is applied once per group, so you need to iterate through `data.items` to render each individual item within the group:

```html
<script type="text/x-kendo-template" id="template">
    <div class="k-listview-item">
        <!-- Display the group header with the grouping field value -->
        <h4 class="k-group-title">#= data.value #</h4>
        <div class="cards">
            <!-- Iterate through all items in the current group -->
            # for (var i = 0; i < data.items.length; i++) { #
            <div class="k-card" style="width: 15em; margin:2%">
                <img alt="Kendo UI for jQuery ListView #= data.items[i].Title #" class="k-card-media" src="#=destinationURL(data.items[i].ImageUrl)#" />
                <div class="k-card-body">
                    <h4 class="k-card-title">#= data.items[i].Title #</h4>
                    <h5 class="k-card-subtitle">#= data.items[i].Description #</h5>
                </div>
            </div>
            # } #
        </div>
        <!-- Display the group footer with item count and group value -->
        <h5 class="k-group-footer"> #=data.items.length# Destinations in #= data.value #</h5>
    </div>
</script>
```

## Configuring the DataSource Grouping

Define the DataSource and configure its group settings:

```javascript
var dataSource = new kendo.data.DataSource({
    data: destinations,
    group: {
        field: 'Country', // The field to group by
        dir: 'desc',
        compare: function (a, b) {
            if (a.items.length === b.items.length) {
                return 0;
            } else if (a.items.length > b.items.length) {
                return 1;
            } else {
                return -1;
            }
        }
    }
});
```

## Initializing the ListView

Create the ListView and bind it to the DataSource with the configured template:

```javascript
$("#listView").kendoListView({
    dataSource: dataSource,
    template: kendo.template($("#template").html())
});
```


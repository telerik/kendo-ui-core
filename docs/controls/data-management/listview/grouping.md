---
title: Grouping
page_title: jQuery ListView Documentation | Grouping
description: "Get started with the jQuery ListView by Kendo UI and learn how to implement its grouping functionality."
slug: grouping_kendoui_listview
position: 5
---

# Grouping

In essense, this implementation is not achieved directly through the ListView, but using the DataSource grouping capability:

[Kendo UI DataSource group configuration](https://docs.telerik.com/kendo-ui/api/javascript/data/datasource/configuration/group)

## Sample Explanation

You can find the full sample displayed here:

[Kendo UI ListView Grouping (Demo)](https://demos.telerik.com/kendo-ui/listview/grouping)

The key part is to configure the ListView Template for proper accomodation of the grouping structure of the data:

```Template
<script type="text/x-kendo-template" id="template">
    <div class="k-listview-item">
        <h4 class="k-group-title">#= data.value #</h4>
        <div class="cards">
            # for (var i = 0; i < data.items.length; i++) { #
            <div class="k-card" style="width: 15em; margin:2%">
                <img class="k-card-image" src="#=destinationURL(data.items[i].ImageUrl)#" />
                <div class="k-card-body">
                    <h4 class="k-card-title">#= data.items[i].Title #</h4>
                    <h5 class="k-card-subtitle">#= data.items[i].Description #</h5>
                </div>
            </div>
            # } #
        </div>
        <h5 class="k-group-footer"> #=data.items.length# Destinations in #= data.value #</h5>
    </div>
</script>
```

The next step is to define the DataSource and configure its group settings:

            var dataSource = new kendo.data.DataSource({
                data: destinations,
                group: {
                    field: 'Country',
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

And the finishing brush is to create the Kendo ListView:

            $("#listView").kendoListView({
                dataSource: dataSource,
                template: kendo.template($("#template").html())
            });
            

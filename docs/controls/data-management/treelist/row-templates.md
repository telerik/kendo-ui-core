---
title: Row Templates
page_title: jQuery TreeList Documentation | Row Templates
description: "Get started with the jQuery TreeList by Kendo UI and learn how to place custom content into a treelist row with the help of row templates."
slug: row_templates_kendoui_treelist_widget
position: 3
---

# Row Templates

The Kendo UI TreeList supports row templates that enable you to place custom content into a TreeList row.

For runnable examples, refer to:
* [Demo on using the row template of the TreeList](https://demos.telerik.com/kendo-ui/treelist/rowtemplate)

The following example demonstrates how to set `row` and `altRow` templates by using scripts. Specify the ids for the templates scripts:

        rowTemplate: kendo.template($("#template").html()),
        altRowTemplate: kendo.template($("#altRowTemplate").html()),

Implement the templates in the scripts by using the `data.model` properties and styles. Here is an example:

```
<script id="template" type="text/x-kendo-template">
    <tr data-uid="#= data.model.uid #" >
        <td colspan="2">
            #for(var i = 0; i < (hasChildren ? level : (level + 1)); i++){#
                <span class="k-icon k-i-none"></span>
            #}#
            #if(data.hasChildren){#
                <span class="k-icon k-i-#=data.model.expanded? 'collapse' : 'expand'#"></span>
            #}#
        <div class='employee-photo'
             style='background-image: url(@Url.Content("~/content/shared/images/employees")/#: data.model.id #.png);'></div>
        <div class='employee-name'>#: data.model.Employee #<span class = 'employee-position'>#: data.model.Position #</span></div>
        </td>
         <td colspan="2">
                <img class= "county-flag" src="../content/web/country-flags/#: data.model.CountryFlag #.png"   />
        </td>
        <td colspan="2">
                <span id='#: data.model.id #' class='badgeTemplate'>#: data.model.lengthOfService #</span>
        </td>
    </tr>
</script>

<script id="altRowTemplate" type="text/x-kendo-template">
    <tr data-uid="#= data.model.uid #" class="k-alt">
        <td colspan="2">
            #for(var i = 0; i < (hasChildren ? level : (level + 1)); i++){#
                <span class="k-icon k-i-none"></span>
            #}#
            #if(data.hasChildren){#
                <span class="k-icon k-i-#=data.model.expanded? 'collapse' : 'expand'#"></span>
            #}#
        <div class='employee-photo'
             style='background-image: url(@Url.Content("~/content/shared/images/employees")/#: data.model.id #.png);'></div>
        <div class='employee-name'>#: data.model.Employee #<span class = 'employee-position'>#: data.model.Position #</span></div>
        </td>
         <td colspan="2">
                <img class= "county-flag" src="../content/web/country-flags/#: data.model.CountryFlag #.png"   />
        </td>
        <td colspan="2">
                <span id='#: data.model.id #' class='badgeTemplate'>#: data.model.lengthOfService #</span>
        </td>
    </tr>
</script>
```

## See Also

* [Using Row Templates in the TreeList (Demo)](https://demos.telerik.com/kendo-ui/treelist/rowtemplate)

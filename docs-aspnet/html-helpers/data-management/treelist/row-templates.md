---
title: Row Templates
page_title: Row Templates
description: "Get started with the {{ site.product_short }} TreeList by Kendo UI and learn how to place custom content into a treelist row with the help of row templates."
slug: row_templates_aspnetcore_treelist
position: 3
---

# Row Templates

The Kendo UI TreeList supports a row template that enables you to place custom content into a TreeList row.

For runnable example, refer to:
* [Demo on using the row template of the TreeList for {{ site.framework }}](https://demos.telerik.com/{{ site.platform }}/treelist/rowtemplate)

> If editing is enabled, row templates is supported only in "popup" editing mode.

The following example demonstrates how to implement row and alter row templates by using their Ids:

```HtmlHelper
    .RowTemplateId("rowTemplate")
    .AltRowTemplateId("altRowTemplate")
```
{% if site.core %}
```TagHelper
    <kendo-treelist name="treelist" row-template-id="rowTemplate" alt-row-template-id="altRowTemplate">
        ...
    </kendo-treelist>
```
{% endif %}

The following scripts will generate the content for the templates:

 ```   
<script id="rowTemplate" type="text/x-kendo-template">
    <tr data-uid='#: data.model.uid #' role="row">
    <td role="gridcell">
    #for(var i = 0; i < (hasChildren ? level : (level + 1)); i++){#
                <span class="k-icon k-i-none"></span>
            #}#
            #if(data.hasChildren){#
                <span class="k-icon k-i-#=data.model.expanded? 'collapse' : 'expand'#"></span>
            #}#
       <div class='employee-photo'
        style='background-image: url(@Url.Content("~/content/web/treelist/people")/#: data.model.EmployeeId #.jpg);'></div>
       <div class='employee-name'>#: data.model.FirstName # #: data.model.LastName # <span class = 'employee-position'>#: data.model.Position #</span></div>
    </td>
    <td role="gridcell">
        <img class= "county-flag" src="../Content/web/country-flags/#: data.model.CountryFlag #.png" />
    </td>
    <td role="gridcell">
         <span class='badgeTemplate'>#: Math.floor((kendo.date.today() - data.model.HireDate)/(365*24*60*60*1000)) #</span>
    </td>
    </tr>
</script>

<script id="altRowTemplate" type="text/x-kendo-template">
    <tr data-uid='#: data.model.uid #' role="row" class="k-alt">
    <td role="gridcell">
    #for(var i = 0; i < (hasChildren ? level : (level + 1)); i++){#
                <span class="k-icon k-i-none"></span>
            #}#
            #if(data.hasChildren){#
                <span class="k-icon k-i-#=data.model.expanded? 'collapse' : 'expand'#"></span>
            #}#
       <div class='employee-photo'
        style='background-image: url(@Url.Content("~/content/web/treelist/people")/#: data.model.EmployeeId #.jpg);'></div>
       <div class='employee-name'>#: data.model.FirstName # #: data.model.LastName # <span class = 'employee-position'>#: data.model.Position #</span></div>
    </td>
    <td role="gridcell">
        <img class= "county-flag" src="../Content/web/country-flags/#: data.model.CountryFlag #.png" />
    </td>
    <td role="gridcell">
         <span class='badgeTemplate'>#: Math.floor((kendo.date.today() - data.model.HireDate)/(365*24*60*60*1000)) #</span>
    </td>
    </tr>
</script>
```

## See Also

* [Using Row Templates in the TreeList HtmlHelper for {{ site.framework }} (Demo)](https://demos.telerik.com/{{ site.platform }}/treelist/rowtemplate)
* [Server-Side API](/api/treelist)

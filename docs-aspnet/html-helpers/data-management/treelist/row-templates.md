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
    <tr class="k-table-row" data-uid='#: data.model.uid #' role="row">
    <td class="k-table-td" role="gridcell">
    #for(var i = 0; i < (hasChildren ? level : (level + 1)); i++){#
                <span class="k-icon k-i-none"></span>
            #}#

            # if (data.hasChildren) { #
                # if(data.model.expanded) { #
                    <span class="k-svg-icon k-svg-i-caret-alt-down"></span>
                # }
                else { #
                 <span class="k-svg-icon k-svg-i-caret-alt-right"></span>
                # } #
            # } #
       <div class='employee-photo'
        style='background-image: url(@Url.Content("~/content/web/treelist/people")/#: data.model.EmployeeId #.jpg);'></div>
       <div class='employee-name'>#: data.model.FirstName # #: data.model.LastName # <span class = 'employee-position'>#: data.model.Position #</span></div>
    </td>
    <td class="k-table-td" role="gridcell">
        <img class= "county-flag" alt="Telerik UI for ASP.NET MVC TreeList #: data.model.CountryFlag # country flag" src="../Content/web/country-flags/#: data.model.CountryFlag #.png" />
    </td>
    <td class="k-table-td" role="gridcell">
         <span class='badgeTemplate'>#: Math.floor((kendo.date.today() - data.model.HireDate)/(365*24*60*60*1000)) #</span>
    </td>
    </tr>
</script>

<script id="altRowTemplate" type="text/x-kendo-template">
    <tr class="k-table-row k-alt k-table-alt-row" data-uid='#: data.model.uid #' role="row">
    <td class="k-table-td" role="gridcell">
    #for(var i = 0; i < (hasChildren ? level : (level + 1)); i++){#
                <span class="k-icon k-i-none"></span>
            #}#

            # if (data.hasChildren) { #
                # if(data.model.expanded) { #
                    <span class="k-svg-icon k-svg-i-caret-alt-down"></span>
                # }
                else { #
                 <span class="k-svg-icon k-svg-i-caret-alt-right"></span>
                # } #
            # } #
       <div class='employee-photo'
        style='background-image: url(@Url.Content("~/content/web/treelist/people")/#: data.model.EmployeeId #.jpg);'></div>
       <div class='employee-name'>#: data.model.FirstName # #: data.model.LastName # <span class = 'employee-position'>#: data.model.Position #</span></div>
    </td>
    <td class="k-table-td" role="gridcell">
        <img class= "county-flag" alt="Telerik UI for ASP.NET MVC TreeList #: data.model.CountryFlag # country flag" src="../Content/web/country-flags/#: data.model.CountryFlag #.png" />
    </td>
    <td class="k-table-td" role="gridcell">
         <span class='badgeTemplate'>#: Math.floor((kendo.date.today() - data.model.HireDate)/(365*24*60*60*1000)) #</span>
    </td>
    </tr>
</script>
```

Additionally, for the expand/collapse icons to apear, you must create SVG icons from the respective span elements in the templates. You can do that in the TreeList `DataBound` event handler:

```
<script>
    function onDataBound(e) {
        $(".k-svg-i-caret-alt-right").each(function () {
            kendo.ui.icon(this, { icon: 'caret-alt-right' });
        })

        $(".k-svg-i-caret-alt-down").each(function () {
            kendo.ui.icon(this, { icon: 'caret-alt-down' });
        })
    }
</script>
```

The TreeList in versions of {{ site.product_short }} prior to R1 2023 SP1 (2023.1.314) has a different rendering. SVG icons are not used in the old version, so creating SVG icons in the `DataBound` event handler is not applicable. However, the templates should be declared as shown below, because of the difference in the classes between the old and the new rendering of the component:

```
<script id="rowTemplate" type="text/x-kendo-template">
    <tr data-uid='#: data.model.uid #' role="row">
    <td role="gridcell">
    #for(var i = 0; i < (hasChildren ? level : (level + 1)); i++){#
                <span class="k-icon k-i-none"></span>
            #}#
            #if(data.hasChildren){#
                # if(data.model.expanded) { #
                    #= kendo.ui.icon("caret-alt-down") #
                # } else { #
                    #= kendo.ui.icon("caret-alt-right") #
                # } #
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
                # if(data.model.expanded) { #
                    #= kendo.ui.icon("caret-alt-down") #
                # } else { #
                    #= kendo.ui.icon("caret-alt-right") #
                # } #
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

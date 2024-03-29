---
title: Conditionally Hide Expand Icons for the Detail Template in the Grid
description: Learn how to hide the expand icon for the detail template in a {{ site.product }} Grid based on a Model value.
type: how-to
page_title: Hide the Expand Icon for the Detail Template Based on a Model Value - {{ site.product }} Data Grid
tags: grid, expand, collapse, hierarchy, detailTemplate, core, mvc, telerik, hierarchy, icon
res_type: kb
component: grid
---

## Environment

<table>
 <tr>
  <td>Product</td>
  <td>{{ site.product }} Grid</td> 
 </tr>
 <tr>
  <td>Product Version</td>
  <td>2024.1.130</td>
 </tr>
</table>

## Description

How can I hide the expand icon for the detail template in a {{ site.product }} Grid based on a `HasChildren` value that is defined as Model property?

## Solution

1. Traverse the rows of the parent Grid within the [`DataBound`](https://docs.telerik.com/{{ site.platform }}/api/kendo.mvc.ui.fluent/grideventbuilder#databoundsystemstring) event.
1. To retrieve the data item, access the `<tr>` element by using the [`dataItem()`](https://docs.telerik.com/kendo-ui/api/javascript/ui/grid/methods/dataitem) client-side method of the Grid.
1. Conditionally hide the icon based on the `HasChildren` field.


{% if site.core %}
```HtmlHelper
    <script id="template" type="text/kendo-tmpl"> // Child Grid
        @(Html.Kendo().Grid(@childData)
            .Name("grid#=Id#")
            .Columns(columns =>
            {
                columns.Bound(p => p.ChildName).Title("Child Name");
            })
            .Pageable()
            .Sortable()
            .Filterable()    
            .DataSource(dataSource => dataSource        
                .Ajax()
                .PageSize(20)
                .ServerOperation(false)        
             )
             .ToClientTemplate()
        )
    </script>

    @(Html.Kendo().Grid(@parentData) // Parent Grid
        .Name("grid")
        .Columns(columns =>
        {
            columns.Bound(p => p.ParentName).Title("Parent Name");

        })
        .Events(events => events.DataBound("onDataBound"))
        .Pageable()
        .Sortable()
        .Filterable()    
        .ClientDetailTemplateId("template")
        .DataSource(dataSource => dataSource        
            .Ajax()
            .PageSize(20)
            .ServerOperation(false)        
         )
    )
```
```TagHelper
    <script id="template" type="text/html"> // Child Grid
        <kendo-grid mobile="Disabled" name="grid#=Id#" is-in-client-template="true">
            <columns>
                <column field="ChildName" title="Child Name">
                </column>
            </columns>
            <datasource type="DataSourceTagHelperType.Ajax" page-size="20"  server-operation="false" data="@childData">
            </datasource>
            <filterable enabled="true">
            </filterable>
            <scrollable enabled="true" />
            <pageable enabled="true">
            </pageable>
            <sortable enabled="true" />
        </kendo-grid>
    </script>

    // Parent Grid
    <kendo-grid mobile="Disabled" name="grid" detail-template-id="template" on-data-bound="onDataBound">
        <columns>
            <column field="ParentName" title="Parent Name">
            </column>
        </columns>
        <datasource type="DataSourceTagHelperType.Ajax" page-size="20"  server-operation="false" data="@parentData">
        </datasource>
        <filterable enabled="true">
        </filterable>
        <scrollable enabled="true" />
        <pageable enabled="true">
        </pageable>
        <sortable enabled="true" />
    </kendo-grid>
    <script>
        function onDataBound(e){
            var items = e.sender.items();
            items.each(function(){
              var row = $(this);
              var dataItem = e.sender.dataItem(row);
              if(!dataItem.HasChildren){
                row.find(".k-hierarchy-cell").html("");
              }
            })
        }
    </script>    
```
{% else %}
```Index.cshtml
    <script id="template" type="text/kendo-tmpl">
        @(Html.Kendo().Grid(@childData)
            .Name("grid#=Id#")
            .Columns(columns =>
            {
                columns.Bound(p => p.ChildName).Title("Child Name");
            })
            .Pageable()
            .Sortable()
            .Filterable()    
            .DataSource(dataSource => dataSource        
                .Ajax()
                .PageSize(20)
                .ServerOperation(false)        
             )
             .ToClientTemplate()
        )
    </script>

    @(Html.Kendo().Grid(@parentData)
        .Name("grid")
        .Columns(columns =>
        {
            columns.Bound(p => p.ParentName).Title("Parent Name");

        })
        .Events(events => events.DataBound("onDataBound"))
        .Pageable()
        .Sortable()
        .Filterable()    
        .ClientDetailTemplateId("template")
        .DataSource(dataSource => dataSource        
            .Ajax()
            .PageSize(20)
            .ServerOperation(false)        
         )
    )
```
{% endif %}

```Parent.cs
    public class Parent {
        public int Id {get;set;}
        public string ParentName {get;set;}
        public bool HasChildren {get;set;}
    }
```
```Child.cs
    public class Child {
        public int Id {get;set;}
        public int ParentId {get;set;}
        public string ChildName {get;set;}
    }
```
```Script.js
    <script>
        function onDataBound(e){
            var items = e.sender.items(); // 1. Gather the DOM element representations of the rows.
            items.each(function(){ // 2. Traverse through each of the rows.
              var dataItem = e.sender.dataItem(row); // 3. Obtain the dataItem counter-part of the row.
              if(!dataItem.HasChildren){ // 4. Assert the for the HasChildren field.
                row.find(".k-hierarchy-cell").html(""); // 5. Hide the expand icon.
              }
            })
        }
    </script> 
```

{% if site.core %}
For a full implementation of the aforementioned approach, refer to the following Telerik REPL examples:

* [Telerik REPL for ASP.NET Core HtmlHelper Example](https://netcorerepl.telerik.com/woORlIlT18ecGZdO25)
* [Telerik REPL for ASP.NET Core TagHelper Example](https://netcorerepl.telerik.com/cIuHPyvf23equNJZ11)

{% else %}
For a full implementation of the aforementioned approach, refer to the [REPL example on conditionally hiding the expand icon of the Grid's Detail template](https://netcorerepl.telerik.com/woORlIlT18ecGZdO25).
{% endif %}

## More {{ site.framework }} Grid Resources

* [{{ site.framework }} Grid Documentation]({%slug htmlhelpers_grid_aspnetcore_overview%})

* [{{ site.framework }} Grid Demos](https://demos.telerik.com/{{ site.platform }}/grid/index)

{% if site.core %}
* [{{ site.framework }} Grid Product Page](https://www.telerik.com/aspnet-core-ui/grid)

* [Telerik UI for {{ site.framework }} Video Onboarding Course (Free for trial users and license holders)]({%slug virtualclass_uiforcore%})

* [Telerik UI for {{ site.framework }} Forums](https://www.telerik.com/forums/aspnet-core-ui)

{% else %}
* [{{ site.framework }} Grid Product Page](https://www.telerik.com/aspnet-mvc/grid)

* [Telerik UI for {{ site.framework }} Video Onboarding Course (Free for trial users and license holders)]({%slug virtualclass_uiformvc%})

* [Telerik UI for {{ site.framework }} Forums](https://www.telerik.com/forums/aspnet-mvc)
{% endif %}
## See Also
* [Client-Side API Reference of the Grid for {{ site.framework }}](https://docs.telerik.com/kendo-ui/api/javascript/ui/grid)
* [Server-Side API Reference of the Grid for {{ site.framework }}](https://docs.telerik.com/{{ site.platform }}/api/grid)
{% if site.core %}
* [TagHelper API Reference of the Grid for {{ site.framework}}](https://docs.telerik.com/aspnet-core/api/taghelpers/grid)
* [Hide Expand Icon Based on Field Value Telerik REPL (HtmlHelper)](https://netcorerepl.telerik.com/woORlIlT18ecGZdO25)
* [Hide Expand Icon Based on Field Value Telerik REPL (TagHelper)](https://netcorerepl.telerik.com/cIuHPyvf23equNJZ11)
{% else %}
* [Hide Expand Icon Based on Field Value Telerik REPL (HtmlHelper)](https://netcorerepl.telerik.com/woORlIlT18ecGZdO25)
{% endif %}
* [Telerik UI for {{ site.framework }} Breaking Changes]({%slug breakingchanges_2023%})
* [Telerik UI for {{ site.framework }} Knowledge Base](https://docs.telerik.com/{{ site.platform }}/knowledge-base)
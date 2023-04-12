---
title: Row Templates
page_title: jQuery TreeList Documentation - Row Templates
description: "Get started with the jQuery TreeList by Kendo UI and learn how to place custom content into a treelist row with the help of row templates."
slug: row_templates_kendoui_treelist_widget
position: 3
---

# Row Templates

The Kendo UI TreeList supports row templates that enable you to place custom content into a TreeList row.

For runnable examples, refer to:
* [Demo on using the row template of the TreeList](https://demos.telerik.com/kendo-ui/treelist/rowtemplate)

The following example demonstrates how to set `row` and `altRow` templates by using scripts. Specify the ids for the templates scripts:

```dojo
<div id="treelist"></div>

<script id="template" type="text/x-kendo-template">
  <tr data-uid="#= data.model.uid #" >
      <td colspan="2">
          #for(var i = 0; i < (hasChildren ? level : (level + 1)); i++){#
              <span class="k-icon k-i-none"></span>
          #}#
          # if (data.hasChildren) { #
              # if(data.model.expanded) { #
                    #= kendo.ui.icon("caret-alt-down") #
              # }
              else { #
                     #= kendo.ui.icon("caret-alt-right") #
              # } #
          # } #
      </td>
       <td colspan="2">
              <span style='color:green;'>#:data.model.lastName #</span>
      </td>
      <td colspan="2">
              <span style='color:red;'>#: data.model.position #</span>
      </td>
  </tr>
</script>

<script id="altRowTemplate" type="text/x-kendo-template">
  <tr data-uid="#= data.model.uid #" class="k-alt">
      <td colspan="2">
          #for(var i = 0; i < (hasChildren ? level : (level + 1)); i++){#
              <span class="k-icon k-i-none"></span>
          #}#
          # if (data.hasChildren) { #
               # if(data.model.expanded) { #
                     #= kendo.ui.icon("caret-alt-down") #
               # }
               else { #
                      #= kendo.ui.icon("caret-alt-right") #
               # } #
          # } #
       </td>
       <td colspan="2">
              <span style='color:blue;'>#:data.model.lastName #</span>
      </td>
      <td colspan="2">
              <span style='color:purple;'>#: data.model.position #</span>
      </td>
  </tr>
</script>
<script>
    $("#treelist").kendoTreeList({
        rowTemplate: kendo.template($("#template").html()),
        altRowTemplate: kendo.template($("#altRowTemplate").html()),
        columns: [
            { field: "lastName" }
        ],
        dataSource: {
            data: [
                { id: 1, parentId: null, lastName: "Jackson", position: "CEO" },
                { id: 2, parentId: 1, lastName: "Weber", position: "VP, Engineering" },
                { id: 3, parentId: 2, lastName: "Jason", position: "Director, Engineering" },
                { id: 4, parentId: 3, lastName: "Michael", position: "Engineer" }
            ]
        }
    });
</script>
```

Implement the templates in the script tags by using the [`data.model`](/api/javascript/data/model) properties. Here is an example:

```
<script id="template" type="text/x-kendo-template">
  <tr data-uid="#= data.model.uid #" >
      <td colspan="2">
          #for(var i = 0; i < (hasChildren ? level : (level + 1)); i++){#
              <span class="k-icon k-i-none"></span>
          #}#
          # if (data.hasChildren) { #
              # if(data.model.expanded) { #
                    #= kendo.ui.icon("caret-alt-down") #
              # }
              else { #
                     #= kendo.ui.icon("caret-alt-right") #
              # } #
          # } #
      </td>
       <td colspan="2">
            <span style='color:green;'>#:data.model.lastName #</span>
      </td>
      <td colspan="2">
            <span style='color:red;'>#: data.model.position #</span>
      </td>
  </tr>
</script>

<script id="altRowTemplate" type="text/x-kendo-template">
  <tr data-uid="#= data.model.uid #" class="k-alt">
       <td colspan="2">
          #for(var i = 0; i < (hasChildren ? level : (level + 1)); i++){#
              <span class="k-icon k-i-none"></span>
          #}#
          # if (data.hasChildren) { #
              # if(data.model.expanded) { #
                    #= kendo.ui.icon("caret-alt-down") #
              # }
              else { #
                     #= kendo.ui.icon("caret-alt-right") #
              # } #
          # } #
       </td>
       <td colspan="2">
            <span style='color:blue;'>#:data.model.lastName #</span>
      </td>
      <td colspan="2">
            <span style='color:purple;'>#: data.model.position #</span>
      </td>
  </tr>
</script>
```

## See Also

* [Using Row Templates in the TreeList (Demo)](https://demos.telerik.com/kendo-ui/treelist/rowtemplate)

---
title: Group Grid Columns Which Are Bound to Objects
description: An example on how to group Kendo UI Grid columns when they are bound to objects.
type: how-to
page_title: Group Columns Which Are Bound to Objects | Kendo UI Grid for jQuery
slug: group-columns-which-are-bound-to-object
tags: grid, group, custom
ticketid: 1116551
res_type: kb
component: grid
---

## Environment

<table>
 <tr>
  <td>Product</td>
  <td>Progress Kendo UI Grid</td>
 </tr>
 <tr>
  <td>Progress Kendo UI version</td>
  <td>2017.2.621</td>
 </tr>
</table>

## Description

How can I group columns which are bound to objects?

## Solution

1. When the [`group`](https://docs.telerik.com/kendo-ui/api/javascript/ui/grid/events/group) event fires, check for a group by the column which is bound to an object.

1. If such a group exists, use the [`group`](https://docs.telerik.com/kendo-ui/api/javascript/data/datasource/methods/group) method of the dataSource to add a group by one of the properties of the object.

```       
    <div id="grid"></div>
    <script>
      $("#grid").kendoGrid({
        columns: [
          "id",
          { field: "person", template:"#=person.name#, #=person.age#" }
        ],
        dataBound(e){

          setTimeout(function(){
            $('.k-group-indicator a.k-link').each(function(_,x){
							x= $(x);
              if(x.text().includes(".")){
                x.text(x.text().split(".")[0]);
              }
            })

             $('.k-grouping-row p').each(function(_,x){
							x= $(x);
              if(x.text().includes(".")){
                var splitted = x.text().split(":");
                x.text(splitted[0].split(".")[0] +":"+ splitted[splitted.length-1]);
              }
            })
          })

        },
        dataSource: {
          data: [
            { id: 1, person:{ name: "Jane Doe", age: 30 }},
            { id: 2, person:{ name: "John Doe", age: 33 }},
            { id: 3, person:{ name: "John Doe", age: 23 }}

          ],
          schema: {
            model: { id: "id" }
          }
        },
        groupable: true,
        group: function(e) {
          if (e.groups.length) {
            var isNestedGrouped;

            e.groups.map(function(x){
              if(x.field == "person"){
                isNestedGrouped = true;
              }
            })

            if(isNestedGrouped){
              e.preventDefault()
              var newGroups = [];
              this.dataSource.group().forEach(function(x){
                if(x.field != "person"){
                  newGroups.push(x)
                }
              })
              newGroups.push({field:"person.name"})
              this.dataSource.group(newGroups)
            }
          }
        }
      });
    </script>
 ```

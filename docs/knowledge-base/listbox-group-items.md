---
title: ListBox with Grouping 
description: An example on how to make the items in the ListBox appear grouped.
type: how-to
page_title: Group Items | Kendo UI ListBox for jQuery
slug: listbox-group-items
tags: listbox, group, items
ticketid: 1342501
res_type: how-to
component: listbox
---

## Environment

<table>
 <tr>
  <td>Product</td>
  <td>Progress Kendo UI ListBox</td>
 </tr>
 <tr>
 <td>Created with version</td>
  <td>2018.3.911</td>
 </tr>
</table>

 
## Description

I'm trying to add a group in my listbox. 

## Suggested Workarounds

Currently the Kendo UI ListBox does not offer such functionality out of the box but you can upvote [this public feature request](https://feedback.telerik.com/kendo-jquery-ui/1360491-add-ability-to-group-data-in-listbox).

1. Use the [Kendo UI MultiSelect](https://demos.telerik.com/kendo-ui/multiselect/grouping) instead
1. Use a custom approach to make the items look as if they are grouped
    - Sort by the propery that you would have grouped
    - Iterate the items on `dataBound` and insert a visual separator  

```dojo
    <style>
        .myGroup{
          float: right;
          border-radius: 5px;
          background: #999;
          font-size: 11px;
          padding: 0 5px;
          margin-top: -16px;
          line-height: 18px;
          color: #fff;
        }
    </style>
    <div id="example" >
      <div class="demo-section k-content">
        <h4>Search for shipping names</h4>
        <select id="customers"></select>
      </div>
      <script>
        var previousContactName = "";
        $(document).ready(function() {
          $("#customers").kendoListBox({
            selectable:true,
            placeholder: "Select customers...",
            template: function(e){
              var template = "";
              if(previousContactName != e.Country){
                previousContactName = e.Country;
                template += "<div class='group'><hr><span class='myGroup'>"+e.Country+"</span></div>"
              } 
              template += e.ContactName;
              return template;
            },
            height: 400,
            dataSource: {
              type: "odata",
              transport: {
                read: "https://demos.telerik.com/kendo-ui/service/Northwind.svc/Customers"
              },
              sort: { field: "Country", dir: "asc" }
            },
            dataBound: function(e){
              var lbItems = this.items();
              for(var i=0; i < lbItems.length; i++){
                var groupDiv = $(lbItems[i]).find(".group")
                if(groupDiv.length){
                  groupDiv.insertBefore($(lbItems[i]));
                }
              }
            }
          });
        });
      </script>
    </div>
```
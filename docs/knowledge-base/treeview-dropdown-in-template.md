---
title: Initialize DropDownList in the TreeView Template
description: An example on how to embed a Kendo UI DropDownList for jQuery in the node template of a Kendo UI TreeView for jQuery.
type: how-to
page_title: Create DropDownList in Node Template | Kendo UI TreeView for jQuery
slug: treeview-dropdown-in-template
tags: kendo, kendo-ui, treeview, dropdownlist, template
res_type: kb
ticketid: 1176714
---

## Environment

<table>
    <tr>
        <td>Product</td>
        <td>TreeView for Progress® Kendo UI®</td>
    </tr>
</table>

## Description

How can I place DropDownLists in the `<script>` of the TreeView template which will be populated from database and provide each DropDownList with a dynamically assigned `id`?

## Solution

* If you use the Kendo UI MVVM framework, initialize the DropDownLists with the `data-` attribute in the template.
* Alternatively, initialize the widgets with JavaScript in the `dataBound` event of the TreeView.

```tab-MVVM-Scenario
<div id="example">
  <div class="files"
       data-role="treeview"
       data-text-field="name"
       data-bind="source: files"
       data-template="treeview-template"
       style="height:800px;">
  </div>
</div>

<script id="treeview-template" type="text/kendo-ui-template">
    #: item.name #
    <input id="ddl-id-#:item.id#"
           data-role="dropdownlist"
           data-animation="false"
           data-text-field="ProductName"
           data-value-field="ProductID"
           data-bind="events: { open: onOpen }
                      source: dropDownSource">
</script>

<script>
  var viewModel = kendo.observable({
    onOpen: function(e) {
      setTimeout(function() {
        e.sender.open();
      }, 0);
    },
    dropDownSource: new kendo.data.DataSource({
      transport: {
        read: {
          url: "https://demos.telerik.com/kendo-ui/service/products",
          dataType: "jsonp"
        }
      }
    }),
    files: kendo.observableHierarchy([
      { name: "My Website", id: "one", expanded: true, items: [
        { name: "images", id: "two", expanded: true, items: [
          { name: "logo.png", id: "three" },
          { name: "my-photo.jpg", id: "four" }
        ] },
        { name: "resources", id: "five", expanded: true, items: [
          { name: "resources", id: "six" },
          { name: "zip", id: "seven" }
        ] },
        { name: "about.html", id: "eight" },
        { name: "index.html", id: "nine" }
      ] }
    ])
  });

  kendo.bind($("#example"), viewModel);
</script>
```
```tab-JavaScript-Scenario
<div id="treeview" style="height:800px;"></div>

<script id="treeview-template" type="text/kendo-ui-template">
    #: item.FullName #
    <input class="drop-down" id="ddl-id-#:item.EmployeeId#"/>
</script>

<script>
  var serviceRoot = "https://demos.telerik.com/kendo-ui/service";
  var homogeneous = new kendo.data.HierarchicalDataSource({
    transport: {
      read: {
        url: serviceRoot + "/Employees",
        dataType: "jsonp"
      }
    },
    schema: {
      model: {
        id: "EmployeeId",
        hasChildren: "HasEmployees"
      }
    }
  });

  $("#treeview").kendoTreeView({
    template: kendo.template($("#treeview-template").html()),
    dataSource: homogeneous,
    dataTextField: "FullName",
    dataBound: function(e) {
      var treeViewElement = $(e.sender.element);
      var inputs = treeViewElement.find('input.drop-down');

      for(var i = 0; i < inputs.length; i++) {
        var current = $(inputs[i]);
        var dropDown = current.getKendoDropDownList();

        if (!dropDown) {
          current.kendoDropDownList({
            animation: false,
            dataTextField: "ProductName",
            dataValueField: "ProductID",
            open: function(e) {
              setTimeout(function() {
                e.sender.open();
              }, 0);
            },
            dataSource: {
              transport: {
                read: {
                  url: "https://demos.telerik.com/kendo-ui/service/products",
                  dataType: "jsonp"
                }
              }
            }
          });
        }
      }
    }
  });
</script>
```

## See Also

* [API Reference of the TreeView](https://docs.telerik.com/kendo-ui/api/javascript/ui/treeview).

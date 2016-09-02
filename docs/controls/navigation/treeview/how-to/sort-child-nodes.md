---
title: Sort Child Nodes
page_title: Sort Child Nodes | Kendo UI TreeView
description: "Learn how to programmatically change the order of all Kendo UI TreeView nodes."
slug: howto_sortchildnodes_treeview
---

# Sort Child Nodes

The example below demonstrates how to programmatically change the order of all Kendo UI TreeView nodes.

###### Example

```html
      <div>
        <div style="float:left;">
          <button id="expand">Expand trees</button>
          <div id="treeview-desc"></div>

        </div>
        <div style="float:left;">
          <button id="sort">Change sort order</button>
          <div id="treeview-asc"></div>
        </div>
      </div>
      <script>
        function setSort(items){
          for(var i=0; i < items.length; i++){
            if(items[i].hasChildren){
              items[i].children.sort({field: "FullName", dir: "desc"});
              setSort(items[i].children.view());
            }
          }
        }

        var serviceRoot = "//demos.telerik.com/kendo-ui/service";
        asc = new kendo.data.HierarchicalDataSource({
          sort: { field: "FullName", dir: "asc" },
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
        }),
          desc = new kendo.data.HierarchicalDataSource({
          sort: { field: "FullName", dir: "desc" },
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

        var treeAsc = $("#treeview-asc").kendoTreeView({
          loadOnDemand:false,
          dataSource: asc,
          dataTextField: "FullName"
        }).getKendoTreeView();

        var treeDesc = $("#treeview-desc").kendoTreeView({
          loadOnDemand:false,
          dataSource: desc,
          dataTextField: "FullName"
        }).getKendoTreeView();

        $("#expand").click(function() {
          treeAsc.expand("li");
          treeDesc.expand("li");
        });

        $("#sort").click(function() {
          setSort(treeAsc.dataSource.view());
        });

      </script>
```

## See Also

Other articles on the Kendo UI TreeView:

* [TreeView JavaScript API Reference](/api/javascript/ui/treeview)
* [How to Check Nodes Programmatically]({% slug howto_checknodeprogramatically_treeview %})
* [How to Edit Nodes via Form]({% slug howto_editnodesviaform_treeview %})
* [How to Filter Out Search Results]({% slug howto_filetroutserachresults_treeview %})
* [How to Hide Checkboxes for Root Level]({% slug howto_hidecheckboxesforrootlevel_treeview %})
* [How to Persist Expanded State]({% slug howto_persistexpandedstate_treeview %})
* [How to Render Multiple TreeViews Using HTML Source Binding]({% slug howto_rendermultipleusing_htmlsourcebinding_mvvm_treeview %})
* [How to Scroll to Selected Item]({% slug howto_scrolltoselecteditem_treeview %})
* [How to Use FontAwesome Icons]({% slug howto_usefontawesomeicons_treeview %})

For more runnable examples on the Kendo UI TreeView, browse its [**How To** documentation folder]({% slug howto_editnodesviaform_angularjs_treeview %}).

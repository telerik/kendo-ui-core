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

How-to examples on Kendo UI TreeView in AngularJS:

* [How to Edit Nodes via Form]({% slug howto_editnodesviaform_angularjs_treeview %})
* [How to Scroll to Item]({% slug howto_scrolltoitem_angularjs_treeview %})
* [How to Toggle Nodes with Single Click]({% slug howto_togglenodeswithsingleclick_angularjs_treeview %})

Articles and other how-to examples on Kendo UI TreeView:

* [TreeView JavaScript API Reference](/api/javascript/ui/treeview)
* [How to Attach Methods to Data Items]({% slug howto_attache_methodsto_dataitems_treeview %})
* [How to Check Nodes Programatically]({% slug howto_checknodeprogramatically_treeview %})
* [How to Combine Local Data with Remote Loading]({% slug howto_combinelocaldatawithremoteloading_treeview %})
* [How to Edit Nodes via Form]({% slug howto_editnodesviaform_treeview %})
* [How to Expand All Nodes upon Check]({% slug howto_expandallnodes_uponcheck_treeview %})
* [How to Expand Nodes during Drag]({% slug howto_expandnodesduringdrag_treeview %})
* [How to Filter Out Search Results]({% slug howto_filetroutserachresults_treeview %})
* [How to Hide Checkboxes for Root Level]({% slug howto_hidecheckboxesforrootlevel_treeview %})
* [How to Persist Expanded State]({% slug howto_persistexpandedstate_treeview %})
* [How to Prevent Dragging Nodes to Deep Levels]({% slug howto_preventdragging_nodestodeeplevels_treeview %})
* [How to Prevent Dragging Nodes to Root Level]({% slug howto_preventdragging_nodestorootlevel_treeview %})
* [How to Render Multiple TreeViews Using HTML Source Binding]({% slug howto_rendermultipleusing_htmlsourcebinding_mvvm_treeview %})
* [How to Scroll to Selected Item]({% slug howto_scrolltoselecteditem_treeview %})
* [How to Show Lines between Nodes]({% slug howto_showlinesbetweennodes_treeview %})
* [How to Show Node Context Menu]({% slug howto_shiwnodecontextmenu_treeview %})
* [How to Use FontAwesome Icons]({% slug howto_usefontawesomeicons_treeview %})

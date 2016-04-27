---
title: Render Multiple TreeViews Using HTML Source Binding
page_title: Render Multiple TreeViews Using HTML Source Binding | Kendo UI TreeView Widget
description: "Learn how to render multiple Kendo UI TreeView widgets using HTML source binding."
slug: howto_rendermultipleusing_htmlsourcebinding_mvvm_treeview
---

# Render Multiple TreeViews Using HTML Source Binding

The example below demonstrates how to render multiple Kendo UI TreeView widgets using HTML source binding.

###### Example

```html
  <div id="customfield">
    <div>
      <table border="1" cellpadding="1" cellspacing="1" style="width: 350px; margin:5px; font-size:12px">
        <tbody data-template="fieldsTemplate" data-bind="source:dynamicFields"></tbody>
      </table>
    </div>
  </div>


  <script id="fieldsTemplate" type="text/x-kendo-template">
    <tr>
        <td>
            <div data-role="treeview"
                 data-text-field="Name"
                 data-source="list"></div>
        </td>
    </tr>
  </script>
  <script>
    var model = {
      "dynamicFields":[
        {
          "name":"A1",
          "type":"LookUp",
          "required":true,
          "IsMultiSelect":true,
          "IsMultiLevel":true
        }
      ],
      "ResourceId":"6fa1c8ce-98f7-40e6-bdac-f2770b9f4ef4",
      "ProjectId":null
    };

    var list = kendo.observableHierarchy([{
        "Id":"f3373d59-27f2-4f4a-b9e4-9fd3ad468d6f",
        "Name":"FruitItem1",
        "expanded":false,
        "items":[

        ],
        "IsActive":true
      },
      {
        "Id":"feb67602-5f45-4fcd-857a-a26570144dff",
        "Name":"FruitItem2",
        "expanded":false,
        "items":[
          {
            "Id":"16cf25ba-3c8b-4fa2-ad33-aaac242a0fa4",
            "Name":"FruitItem3",
            "expanded":false,
            "items":[ ],
            "IsActive":true
          }
        ],
        "IsActive":true
      }
    ]);

    var viewModel = kendo.observable(model);

    kendo.bind($("#customfield"), viewModel);
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
* [How to Scroll to Selected Item]({% slug howto_scrolltoselecteditem_treeview %})
* [How to Show Lines between Nodes]({% slug howto_showlinesbetweennodes_treeview %})
* [How to Show Node Context Menu]({% slug howto_shiwnodecontextmenu_treeview %})
* [How to Sort Child Nodes]({% slug howto_sortchildnodes_treeview %})
* [How to Use FontAwesome Icons]({% slug howto_usefontawesomeicons_treeview %})

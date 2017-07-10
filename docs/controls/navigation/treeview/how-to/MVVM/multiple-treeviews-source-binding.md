---
title: Render Multiple TreeViews Using HTML Source Binding
page_title: Render Multiple TreeViews Using HTML Source Binding | Kendo UI TreeView Widget
description: "Learn how to render multiple Kendo UI TreeView widgets using HTML source binding."
slug: howto_rendermultipleusing_htmlsourcebinding_mvvm_treeview
---

# Render Multiple TreeViews Using HTML Source Binding

The following example demonstrates how to render multiple TreeViews by using HTML source binding.

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

* [TreeView JavaScript API Reference](/api/javascript/ui/treeview)
* [How to Check Nodes Programmatically]({% slug howto_checknodeprogramatically_treeview %})
* [How to Edit Nodes via Form]({% slug howto_editnodesviaform_treeview %})
* [How to Filter Out Search Results]({% slug howto_filetroutserachresults_treeview %})
* [How to Hide Checkboxes for Root Level]({% slug howto_hidecheckboxesforrootlevel_treeview %})
* [How to Persist Expanded State]({% slug howto_persistexpandedstate_treeview %})
* [How to Scroll to Selected Item]({% slug howto_scrolltoselecteditem_treeview %})
* [How to Use FontAwesome Icons]({% slug howto_usefontawesomeicons_treeview %})

For more runnable examples on the Kendo UI TreeView, browse its [**How To** documentation folder]({% slug howto_bindcheckedstatecustommodelfields_angulartreeview %}).

---
title: Render multiple treeviews using HTML source binding
page_title: Render multiple treeviews using HTML source binding
description: Render multiple treeviews using HTML source binding
---

# Render multiple treeviews using HTML source binding

The example below demonstrates how to render multiple TreeView widgets using HTML source binding

#### Example


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

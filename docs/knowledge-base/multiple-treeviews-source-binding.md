---
title: Render Multiple TreeViews by Using HTML Source Binding
page_title: Render Multiple TreeViews by Using HTML Source Binding
description: "Learn how to render multiple Kendo UI for jQuery TreeView widgets using HTML source binding."
slug: howto_rendermultipleusing_htmlsourcebinding_mvvm_treeview
previous_url: /controls/navigation/treeview/how-to/MVVM/multiple-treeviews-source-binding
tags: telerik, kendo, jquery, treeview, render, show, multiple, widgets, with, using, html, binding
component: treeview
type: how-to
res_type: kb
---

## Environment

<table>
 <tr>
  <td>Product</td>
  <td>Progress® Kendo UI® TreeView for jQuery</td>
 </tr>
 <tr>
  <td>Operating System</td>
  <td>Windows 10 64bit</td>
 </tr>
 <tr>
  <td>Visual Studio version</td>
  <td>Visual Studio 2017</td>
 </tr>
 <tr>
  <td>Preferred Language</td>
  <td>JavaScript</td>
 </tr>
</table>

## Description

How can I render multiple Kendo UI for jQuery TreeViews by using HTML source binding?

## Solution

The following example demonstrates how to achieve the desired scenario.

```dojo
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

* [Basic Usage of the TreeView (Demo)](https://demos.telerik.com/kendo-ui/treeview/index)
* [Using the API of the TreeView (Demo)](https://demos.telerik.com/kendo-ui/treeview/api)
* [JavaScript API Reference of the TreeView](/api/javascript/ui/treeview)

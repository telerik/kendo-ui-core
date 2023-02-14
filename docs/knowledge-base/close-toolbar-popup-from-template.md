---
title: Close the ToolBar Popup Manually
page_title: Close the ToolBar Popup Manually 
description: "Learn how to close the Kendo UI for jQuery ToolBar popup manually."
slug: howto_closetoolbarpopupmanually_toolbar
previous_url: /controls/navigation/toolbar/how-to/close-toolbar-popup-from-template
tags: telerik, kendo, jquery, toolbar, close, popup, manually
component: toolbar
type: how-to
res_type: kb
---

## Environment

<table>
 <tr>
  <td>Product</td>
  <td>Progress® Kendo UI® ToolBar for jQuery</td>
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

How can I manually close the popup of a Kendo UI for jQuery ToolBar?

## Solution

The example below demonstrates how to close the ToolBar popup from a button `click` event in a template.



```dojo
   <div id="toolbar"></div>
    </div>

  <script>
    function action() {
      $("#toolbar").data("kendoToolBar").popup.close();
    }

    $("#toolbar").kendoToolBar({
      items: [
        { type: "button", text: "Button" },
        {
          template:"<a class='k-item k-state-default ng-scope' >Test</a>",
          overflowTemplate:"<button onclick='action()' class='btn' >Test</button>",
          overflow: "always"
        }
      ]
    });
  </script>
```

## See Also

* [ToolBar JavaScript API Reference](/api/javascript/ui/toolbar)
* [How to Develop and Register Custom ToolBar Tools]({% slug howto_customtool_toolbar %})
* [How to Use FontAwesome Icons]({% slug howto_usefontawesomeicons_toolbar %})

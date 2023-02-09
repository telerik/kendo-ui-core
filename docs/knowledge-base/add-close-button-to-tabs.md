---
title: Add a Close Button to TabStrip Tabs
page_title: Add a Close Button to TabStrip Tabs
description: "Learn how to add Close buttons in the Kendo UI for jQuery TabStrip tabs."
slug: howto_addclosebuttontotabs_tabstrip
previous_url: /controls/navigation/tabstrip/how-to/add-close-button-to-tabs
tags: telerik, kendo, jquery, tabstrip, add, close, buttons, to, tabs
component: tabstrip
type: how-to
res_type: kb
---

## Environment

<table>
 <tr>
  <td>Product</td>
  <td>Progress® Kendo UI® TabStrip for jQuery</td>
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

How can I add a **Close** button to a Kendo UI for jQuery TabStrip tab?

## Solution

You can programmatically remove the TabStrip tabs with JavaScript. 

The following example shows how to add buttons inside the tabs to do this. The milestones of the approach are:

* You have to place the buttons in a `<span>` element, which wraps the whole tab text.
* When adding a new tab with a button programmatically, set `encoded` to `false`.
* The example uses the [`tabGroup`](/api/javascript/ui/tabstrip#fields-tabgroup) field and the [`append`](/api/javascript/ui/tabstrip/methods/append) and [`remove`](/api/javascript/ui/tabstrip/methods/remove) TabStrip methods.
* To distinguish the tab **Remove** buttons, the example also uses a `data-type="remove"` attribute.



```dojo
<style>

  .k-tabstrip-items li .k-button {
    line-height: 1;
    padding: 0;
    vertical-align: top;
    margin-bottom: -2px;
  }

  .k-tabstrip-items li .k-icon {
    margin: 0;
  }

</style>

<div id="tabstrip">
  <ul>
    <li class="k-active">Item 1</li>
    <li><span>Item 2 <button data-type="remove" class="k-button k-button-icon"><span class="k-icon k-i-close"></span></button></span></li>
  </ul>
  <div>
    Content 1
    <p><button type="button" class="k-button" id="appendButton">Append Item</button></p>
  </div>
  <div>
    Content 2
  </div>
</div>

<script>
  $(function(){
    // initialize the TabStrip. Server wrappers will generate the below line automatically
    $("#tabstrip").kendoTabStrip();

    // get the widget reference
    var tabstrip = $("#tabstrip").data("kendoTabStrip");

    tabstrip.tabGroup.on("click", "[data-type='remove']", function(e) {
        e.preventDefault();
        e.stopPropagation();

        var item = $(e.target).closest(".k-item");
        tabstrip.remove(item.index());
    });

    var tabCounter = tabstrip.items().length;

    $("#appendButton").click(function(){
      tabstrip.append({
        text: 'Item ' + (++tabCounter) + ' <button data-type="remove" class="k-button k-button-icon"><span class="k-icon k-i-close"></span></button>',
        encoded: false,
        content: "<p>Appended item " + tabCounter + " content</p>"
      });
      $(".k-button").kendoButton();
    });
    $(".k-button").kendoButton();
  });
</script>
```

## See Also

* [TabStrip JavaScript API Reference](/api/javascript/ui/tabstrip)
* [How to Initialize the Grid in Kendo UI TabStrip]({% slug initialize_thegrid_tabstrip_widget %})
* [How to Scroll TabStrip with Keyboard]({% slug howto_scrolltabstripwithkeyboard_tabstrip %})



---
title: Develop and Register Custom ToolBar Tools
page_title: Develop and Register Custom ToolBar Tools 
description: "Learn how to develop and register custom Kendo UI for jQuery ToolBar tools."
slug: howto_customtool_toolbar
previous_url: /controls/navigation/toolbar/how-to/custom-tool
tags: telerik, kendo, jquery, toolbar, develop, implement, register, custom, tools
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

How can I develop and register custom tools in the Kendo UI for jQuery ToolBar?

## Solution

The example below demonstrates how to achieve the desired scenario.

> The following approach works in the Kendo UI versions from Q3 2015 to R3 2022. 

> If you are using Kendo UI version R1 2023 or later, please refer to the [Custom Tools]({% slug custom_tools_kendoui_toolbar %}) documentation article. 


```dojo
  <div id="toolbar"></div>
  <script>
    //ToolBar tool - inherits from base tool
    var OptionList = kendo.toolbar.Item.extend({
      init: function(options, toolbar) {
        this.options = options;
        this.toolbar = toolbar;

        //build kendoDropDownList from the provided options in ToolBar configuration
        var dropDownList = $("<select />").kendoDropDownList({
          height: "auto",
          dataTextField: "text",
          dataValueField: "value",
          optionLabel: options.text, //use tool's text as option label
          change: $.proxy(this._change, this), //do something on change
          dataSource: options.list
        }).data("kendoDropDownList");

        this.dropDownList = dropDownList;
        this.element = dropDownList.wrapper;

        //the following methods add attributes in the HTML that are used for the resizable functionality
        this.attributes();
        this.addUidAttr();
        this.addOverflowAttr();
      },
      _change: function(e) {
        this.options.change(e.sender.value());
      }
    });

    //Overflow tool - inherits from the existing tool
    var OptionDialog = kendo.toolbar.OverflowButton.extend({
      init: function(options, toolbar) {
        kendo.toolbar.OverflowButton.fn.init.call(this, options, toolbar);

        this.options = options;
        this.element.on("click", $.proxy(this._click, this)); //open the dialog on click

        this._dialog(); //build dialog
        this._listView(); //build listView
      },
      _dialog: function() {
        this.dialog = $("<div />", { html: "<div class='k-list'></div>" }).kendoWindow({
          title: this.options.text,
          width: 280,
          height: 220
        }).data("kendoWindow");
      },
      _listView: function() {
        this.listView = this.dialog.element.find("div").kendoListView({
          dataSource: this.options.list,
          template: "<div class='k-item'>#= text #</div>",
          selectable: true,
          change: $.proxy(this._change, this) //do something when item is selected
        }).data("kendoListView");
      },
      open: function() {
        this.dialog.open();
      },
      _change: function(e) {
        var listView = e.sender;
        var dataItem = listView.dataSource.getByUid(listView.select().data("uid"));
        this.options.change(dataItem.value);
      },
      _click: function() {
        this.open();
      }
    });

    //register the tool
    kendo.toolbar.registerComponent("optionList", OptionList, OptionDialog);

    $("#toolbar").kendoToolBar({
      items: [
        { //initialize standard tool
          type: "button",
          id: "myButton",
          text: "My Button",
          click: onMyButtonClick
        },
        { //initialize the tool with options
          type: "optionList", //specify the tool type as it is registered via the registerComponent method
          text: "Choose an option",
          list: [ //we will use this array as data for the DropDownList/ListView
            { text: "Option 1", value: 1 },
            { text: "Option 2", value: 2 },
            { text: "Option 3", value: 3 },
            { text: "Option 4", value: 4 },
            { text: "Option 5", value: 5 }
          ],
          change: function(value) { //do something when the value changes
            console.log("Option " + value + " is selected");
          }
        }
      ]
    });

    function onMyButtonClick(e) {
      console.log("myButton click");
    }
  </script>
```

## See Also

* [ToolBar JavaScript API Reference](/api/javascript/ui/toolbar)
* [How to Use FontAwesome Icons]({% slug howto_usefontawesomeicons_toolbar %})
* [How to Close ToolBar Popup Manually]({% slug howto_closetoolbarpopupmanually_toolbar %})

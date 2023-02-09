---
title: Create custom Window in Editor to Add a Hyperlink With Custom Classnames
description: Learn how to create a custom dialog to add hyperlink with custom class in the Kendo UI Editor.
type: how-to
page_title: Create Custom Window to Add Hyperlink With ClassName - Kendo UI Editor for jQuery
slug: editor-custom-dialog-add-hyperlink
tags: kendo, window, kendo-ui, editor, custom, dialog, hyperlink, class
ticketid: 1536777
res_type: kb
---

## Environment

<table>
	<tr>
		<td>Product</td>
		<td>Progress® Kendo UI® Editor for jQuery</td>
	</tr>
</table>


## Description

How can I create custom Window in Editor to add a hyperlink with custom class names?

## Solution

1. Create a custom Kendo UI for jQuery Window. In the Window content add an element and initialize a DropDownList that contains the needed class names.
1. When the *Insert* button in the Window is clicked, check the DropDownList value and add the selected class to the hyperlink.

```dojo
    <div id="wnd">
      <div class="k-edit-form-container"><div class="k-edit-label"><label for="k-editor-link-url">Web address</label></div><div class="k-edit-field"><input type="text" class="k-textbox link-url" id="k-editor-link-url"></div><div class="k-edit-label k-editor-link-text-row"><label for="k-editor-link-text">Text</label></div><div class="k-edit-field k-editor-link-text-row"><input type="text" class="k-textbox link-text" id="k-editor-link-text"></div><div class="k-edit-label" style="display: none;"><label for="k-editor-link-title">ToolTip</label></div><div class="k-edit-field" style="display: none;"><input type="text" class="k-textbox" id="k-editor-link-title"></div><div class="k-edit-label"><label for="k-editor-link-class" class="class-label" id="k-editor-link-class_label">Class</label>
        </div><div class="k-edit-field"><input type="text" class="k-textbox link-class" id="k-editor-link-class"></div><div class="k-edit-field last-edit-field"><input type="checkbox" class="k-checkbox" id="k-editor-link-target"><label for="k-editor-link-target" class="k-checkbox-label">Open link in new window</label></div><div class="k-edit-buttons k-state-default"><button class="k-dialog-insert k-button k-primary">Insert</button><button class="k-dialog-close k-button">Cancel</button></div></div>
    </div>

    <textarea id="editor" rows="10" cols="30" style="width:100%;height:400px">
    </textarea>

    <script type="text/x-kendo-template" id="insertSymbol-template">

      <button class='k-button' onclick='buttonClick();'>Insert HyperLink</button>
    </script>

    <script>
      function buttonClick(){
        var wnd=$("#wnd").data().kendoWindow.open().center();
      }
      $(".k-dialog-close").on("click",function(){
        $("#wnd").data().kendoWindow.close();
      });
      $(".k-dialog-insert").on("click",function(){
        $("#wnd").data().kendoWindow.close();
        var url =$(".link-url").val();
        var className=$("#k-editor-link-class").data().kendoDropDownList.value();
        var text=$(".link-text").val();
        var link="<a href='"+url+"'>"+text+"</a>";

        if(className){
          link="<a href='"+url+"' "+className+"='"+className+"'>"+text+"</a>";
        }

        if(url&&text){
          $('#editor').data('kendoEditor').exec("insertHtml", { html: link });
        }

        $(".link-url").val("");
        $("#k-editor-link-class").data().kendoDropDownList.select(-1);
        $(".link-text").val("");
      });
      $("#k-editor-link-class").kendoDropDownList({
        dataTextField: "text",
        dataValueField: "value",
        index: -1,
        dataSource:  [
          { text: "class-1", value: "class-1" },
          { text: "class-2", value: "class-2" },
          { text: "class-3", value: "class-3" }
        ]
      });
      $("#wnd").kendoWindow({
        visible:false,
        title: "Insert HyperLink",
        modal: true
      });
      $("#editor").kendoEditor({
        encoded: false,
        tools: [
          {
            name: "customTemplate",
            template: $("#insertSymbol-template").html()
          }
        ]
      });

    </script>
```

## See Also

* [API Reference of the Editor](https://docs.telerik.com/kendo-ui/api/javascript/ui/editor)
* [Editor Create Custom Editor Tool]({ slug % editor-custom-tool % })
* [Extend Editor Insert Hyperlink Dialog]({ slug % editor-extend-hyperlink-command-custom-class % })

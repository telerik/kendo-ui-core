---
title: Extend Editor Insert Hyperlink Dialog to Allow Adding Class Names to the Inserted Link
description: Learn how to extend insert hyperlink dialog to allow adding class names to the inserted link in Kendo UI Editor.
type: how-to
page_title: Extend Editor Insert Hyperlink Dialog - Kendo UI Editor for jQuery
slug: editor-extend-hyperlink-command-custom-class
tags: kendo, kendo-ui, editor, extend, hyperlink, command
ticketid: 1556683
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

When I use the insert hyperlink dialog in Kendo UI for jQuery Editor I need to add custom class or attribute to the link. How can I achieve that? 

## Solution

1. You can extend the template for the insertHyperlink dialog in order to add custom checkboxes. The user can select the checkboxes when adding a custom class or attribute is needed:

    ```
    kendo.ui.editor.LinkCommand.fn._dialogTemplate = function() {
        return kendo.template(
            ...
            "<div class='k-edit-label'></div>" +       
            "<div class='k-edit-field'>" +
            "<input type='checkbox' class='k-checkbox k-checkbox-md k-rounded-md'   id='k-editor-link-class-green'>" +
            "<label for='k-editor-link-class-green' class='k-checkbox-label'>Set custom class -green</  label>" +
            "</div>" +        
            "</div>" +
            ......
          )({
            messages: this.editor.options.messages
          });
        };
    ```
1. When the custom checkbox is checked you can add the respective class to the hyperlink:
    ```
        kendo.ui.editor.LinkCommand.fn._apply = function (e) {
            ...
             target = $("#k-editor-link-target", element).is(":checked");
             this.attributes.target = target ? "_blank" : null;


             if($('#k-editor-link-class-red').is(':checked')){            
               this.attributes.className = 'red';
             } 

             if($('#k-editor-link-class-green').is(':checked') && !this.attributes.    className){
               this.attributes.className = 'green';
             }else if($('#k-editor-link-class-green').is(':checked')){
               this.attributes.className += ' green';
             }

             this.formatter.apply(this._range, this.attributes);
        }   
    ```

1. In case you need to add custom attributes the same as the custom classes, you could handle the [`select`](/api/javascript/ui/editor/events/select) event of the widget. In the event handler you could search for the custom classes, and add the needed attributes:
    ```
        select: function(e){
            if(isInsert){   
              $(e.sender.selectionRestorePoint.body).find('.red').attr('red', 'red')
              $(e.sender.selectionRestorePoint.body).find('.green').attr('green',   'green')
              isInsert = false
            }
        }
    ```

The described above is demonstrated in the below runnable example:
```dojo
    <textarea id="editor"></textarea>
    <script>
      var isInsert = false;
      kendo.ui.editor.LinkCommand.fn._dialogTemplate = function() {
        return kendo.template(
          '<div class="k-editor-dialog k-popup-edit-form">' +
          '<div class="k-edit-form-container">' +
          "<div class='k-edit-label'>" +
          "<label for='k-editor-link-url'>#: messages.linkWebAddress #</label>" +
          "</div>" +
          "<div class='k-edit-field'>" +
          "<span class=\"k-textbox k-input k-input-md k-rounded-md k-input-solid\"><input type='text' class='k-input-inner' id='k-editor-link-url'></span>" +
          "</div>" +
          "<div class='k-edit-label k-editor-link-text-row'>" +
          "<label for='k-editor-link-text'>#: messages.linkText #</label>" +
          "</div>" +
          "<div class='k-edit-field k-editor-link-text-row'>" +
          "<span class=\"k-textbox k-input k-input-md k-rounded-md k-input-solid\"><input type='text' class='k-input-inner' id='k-editor-link-text'></span>" +
          "</div>" +
          "<div class='k-edit-label'>" +
          "<label for='k-editor-link-title'>#: messages.linkToolTip #</label>" +
          "</div>" +
          "<div class='k-edit-field'>" +
          "<span class=\"k-textbox k-input k-input-md k-rounded-md k-input-solid\"><input type='text' class='k-input-inner' id='k-editor-link-title'></span>" +
          "</div>" +
          "<div class='k-edit-label'></div>" +
          "<div class='k-edit-field'>" +
          "<input type='checkbox' class='k-checkbox k-checkbox-md k-rounded-md' id='k-editor-link-target'>" +
          "<label for='k-editor-link-target' class='k-checkbox-label'>#: messages.linkOpenInNewWindow #</label>" +
          "</div>" +
          "<div class='k-edit-field'>" +
          "<input type='checkbox' class='k-checkbox k-checkbox-md k-rounded-md' id='k-editor-link-class-green'>" +
          "<label for='k-editor-link-class-green' class='k-checkbox-label'>Set custom class -green</label>" +
          "</div>" +
          "<div class='k-edit-field'>" +
          "<input type='checkbox' class='k-checkbox k-checkbox-md k-rounded-md' id='k-editor-link-class-red'>" +
          "<label for='k-editor-link-class-red' class='k-checkbox-label'>Set custom class - red</label>" +
          "</div>" +
          "<div class='k-edit-buttons'>" +
          '<button class="k-dialog-insert k-button k-button-md k-rounded-md k-button-solid k-button-solid-primary"><span class="k-button-text">#: messages.dialogInsert #</span></button>' +
          '<button class="k-dialog-close k-button k-button-md k-rounded-md k-button-solid k-button-solid-base"><span class="k-button-text">#: messages.dialogCancel #</span></button>' +
          "</div>" +
          "</div>" +
          "</div>"
        )({
          messages: this.editor.options.messages
        });
      };

      var originalExec = kendo.ui.editor.LinkCommand.fn.exec;

      kendo.ui.editor.LinkCommand.fn.exec = function () {
        originalExec.call(this);

        var nodes = kendo.ui.editor.RangeUtils.textNodes(this._range);
        var a = nodes.length ? this.formatter.finder.findSuitable(nodes[0]) : null;
        var className = a && a.className ? a.className : "";       
      };

      var originalApply = kendo.ui.editor.LinkCommand.fn._apply;

      kendo.ui.editor.LinkCommand.fn._apply = function (e) {
        var element = this._dialog.element;
        var href = $("#k-editor-link-url", element).val();
        var title, text, target;
        var textInput = $("#k-editor-link-text", element)


        if (href && href != "http://") {

          if (href.indexOf("@") > 0 && !/^(\w+:)|(\/\/)/i.test(href)) {
            href = "mailto:" + href;
          }

          this.attributes = { href: href };

          title = $("#k-editor-link-title", element).val();
          if (title) {
            this.attributes.title = title;
          }

          if (textInput.is(":visible")) {
            text = kendo.trim(textInput.val());
            if (!text && !this._initialText) {
              this.attributes.innerText = href;
            } else if (text && (text !== this._initialText)) {
              this.attributes.innerText = kendo.ui.editor.Dom.stripBom(text);
            }
          }

          target = $("#k-editor-link-target", element).is(":checked");
          this.attributes.target = target ? "_blank" : null;


          if($('#k-editor-link-class-red').is(':checked')){            
            this.attributes.className = 'red';
            isInsert = true
          } 

          if($('#k-editor-link-class-green').is(':checked') && !this.attributes.className){
            this.attributes.className = 'green';
            isInsert = true;
          }else if($('#k-editor-link-class-green').is(':checked')){
            this.attributes.className += ' green';
            isInsert = true;
          }

          this.formatter.apply(this._range, this.attributes);
        }        

        this._close(e);

        if (this.change) {
          this.change();
        }
      }

      $("#editor").kendoEditor({        
        select: function(e){
          if(isInsert){   
            $(e.sender.selectionRestorePoint.body).find('.red').attr('red', 'red')
            $(e.sender.selectionRestorePoint.body).find('.green').attr('green', 'green')
            isInsert = false
          }
        }
      });
    </script>
``` 

## See Also

* [API Reference of the Editor](https://docs.telerik.com/kendo-ui/api/javascript/ui/editor)
* [Editor Create Custom Editor Tool]({ slug % editor-custom-tool % })

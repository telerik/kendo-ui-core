---
title: Extend Editor Insert Hyperlink Dialog to Allow Adding Class Names to the Inserted Link
description: Learn how to extend insert hyperlink dialog to allow adding class names to the inserted link in Kendo UI Editor.
type: how-to
page_title: Extend Editor Insert Hyperlink Dialog - Kendo UI Editor for jQuery
slug: editor-extend-hyperlink-command-custom-class
tags: kendo, kendo-ui, editor, extend, hyperlink, command
ticketid: 1556683
res_type: kb
components: ["editor"]
---

## Environment

<table>
<tbody>
<tr>
<td>Product</td>
<td>Kendo UI for jQuery Editor</td>
</tr>
<tr>
<td>Version</td>
<td>2025.4.1321</td>
</tr>
</tbody>
</table>


## Description

When I use the insert hyperlink dialog in Kendo UI for jQuery Editor I need to add custom class or attribute to the link. How can I achieve that?

## Solution

####  The example below demonstrates how to extend the hyperlink dialog with Kendo UI R1 2023 SP1 (version 2023.1.314) and after

1. Customize the Link Dialog Form

The `Insert hyperlink` dialog displays internally a `kendoForm` component. You need to override the internal `_createForm` method and add the needed additional elements to the Form:

```
    kendo.ui.editor.LinkCommand.fn._createForm = function (dialog) {
        var that = this;
        var formElement = $("<div/>").appendTo(dialog.element);
        var messages = that.editor.options.messages;
        var form = formElement
          .kendoForm({
            renderButtons: false,
            items: [
              ...
            ]
          })
    }
```

2. In the kendo.ui.editor.LinkCommand `_apply` function you can check the state of the checkboxes and apply the custom attributes or classes:

```
        if (
            $("#k-editor-link-class-green").is(":checked") &&
            !this.attributes.className
          ) {
            this.attributes.className = "green";
            isInsert = true;
          } else if ($("#k-editor-link-class-green").is(":checked")) {
            this.attributes.className += " green";
            isInsert = true;
          }
```

Below is a runnable example:

```dojo
 <textarea id="editor"></textarea>
    <script>
      var isInsert = false;

      var textNodes = kendo.ui.editor.RangeUtils.textNodes;
      var dom = kendo.ui.editor.Dom;
      var encode = kendo.htmlEncode;

      kendo.ui.editor.LinkCommand.fn._createForm = function (dialog) {
        var that = this;
        var formElement = $("<div/>").appendTo(dialog.element);
        var messages = that.editor.options.messages;
        var form = formElement
          .kendoForm({
            renderButtons: false,
            items: [
              {
                field: "k-editor-link-url",
                label: encode(messages.linkWebAddress),
                title: encode(messages.linkWebAddress),
                editor: "TextBox",
              },
              {
                field: "k-editor-link-text",
                label: encode(messages.linkText),
                title: encode(messages.linkText),
                editor: "TextBox",
              },
              {
                field: "k-editor-link-title",
                label: encode(messages.linkToolTip),
                title: encode(messages.linkToolTip),
                editor: "TextBox",
              },
              {
                field: "k-editor-link-target",
                editorOptions: {
                  label: encode(messages.linkOpenInNewWindow),
                },
                label: "",
                title: encode(messages.linkOpenInNewWindow),
                editor: "CheckBox",
              },
              {
                field: "k-editor-link-class-red",
                label: "",
                editorOptions: {
                  label: "Set custom class - red",
                },
                editor: "CheckBox",
              },
              {
                field: "k-editor-link-class-green",
                label: "",
                editorOptions: {
                  label: "Set custom class - green",
                },
                editor: "CheckBox",
              },
            ],
          })
          .data("kendoForm");

        formElement
          .find("#k-editor-link-text")
          .parents(".k-form-field")
          .addClass("k-editor-link-text-row");

        dialog.element.after(
          $(
            that._actionButtonsTemplate({
              messages,
              insertButtonIcon: "link",
              cancelButtonIcon: "cancel-outline",
            }),
          ),
        );

        return form;
      };

      var originalExec = kendo.ui.editor.LinkCommand.fn.exec;

      kendo.ui.editor.LinkCommand.fn.exec = function () {
        var messages = this.editor.options.messages;
        this._initialText = "";
        this._range = this.lockRange(true);
        this.formatter.immutables = this.immutables();

        var nodes = textNodes(this._range);
        var a = nodes.length
          ? this.formatter.finder.findSuitable(nodes[0])
          : null;
        var img = nodes.length && dom.name(nodes[0]) == "img";

        var dialog = this.createDialog("<div/>", {
          title: messages.createLink,
          minWidth: 340,
          close: this._close.bind(this),
          visible: false,
        }).data("kendoWindow");

        this._form = this._createForm(dialog);

        if (a) {
          this._range.selectNodeContents(a);
          nodes = textNodes(this._range);
        }

        this._initialText = this.linkText(nodes);

        dialog.wrapper
          .find(".k-dialog-insert")
          .on("click", this._apply.bind(this))
          .end()
          .find(".k-dialog-close")
          .on("click", this._close.bind(this))
          .end()
          .find(".k-form-field input")
          .on("keydown", this._keydown.bind(this))
          .end()
          .find("#k-editor-link-url")
          .val(this.linkUrl(a))
          .end()
          .find("#k-editor-link-text")
          .val(this._initialText)
          .end()
          .find("#k-editor-link-title")
          .val(a ? a.title : "")
          .end()
          .find("#k-editor-link-target")
          .prop("checked", a ? a.target == "_blank" : false)
          .end()
          .find(".k-editor-link-text-row")
          .toggle(!img);

        this._dialog = dialog.center().open();

        $("#k-editor-link-url", dialog.element).trigger("focus").select();
      };

      var originalApply = kendo.ui.editor.LinkCommand.fn._apply;

      kendo.ui.editor.LinkCommand.fn._apply = function (e) {
        var element = this._dialog.element;
        var href = $("#k-editor-link-url", element).val();
        var title, text, target;
        var textInput = $("#k-editor-link-text", element);

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
            } else if (text && text !== this._initialText) {
              this.attributes.innerText = kendo.ui.editor.Dom.stripBom(text);
            }
          }

          target = $("#k-editor-link-target", element).is(":checked");
          this.attributes.target = target ? "_blank" : null;

          if ($("#k-editor-link-class-red").is(":checked")) {
            this.attributes.className = "red";
            isInsert = true;
          }

          if (
            $("#k-editor-link-class-green").is(":checked") &&
            !this.attributes.className
          ) {
            this.attributes.className = "green";
            isInsert = true;
          } else if ($("#k-editor-link-class-green").is(":checked")) {
            this.attributes.className += " green";
            isInsert = true;
          }

          this.formatter.apply(this._range, this.attributes);
        }

        this._close(e);

        if (this.change) {
          this.change();
        }
      };

      $("#editor").kendoEditor({
        select: function (e) {
          if (isInsert) {
            $(e.sender.selectionRestorePoint.body)
              .find(".red")
              .attr("red", "red");
            $(e.sender.selectionRestorePoint.body)
              .find(".green")
              .attr("green", "green");
            isInsert = false;
          }
        },
      });
    </script>
```

####  The solution below is suitable with Kendo UI versions before Kendo UI R1 2023 SP1 (version 2023.1.314)


1. You can extend the template for the insertHyperlink dialog in order to add custom checkboxes. The user can select the checkboxes when adding a custom class or attribute is needed:

    ```
    kendo.ui.editor.LinkCommand.fn._dialogTemplate = function() {
        return kendo.template(
            ...
            "<div class='k-edit-label'></div>" +
            "<div class='k-edit-field'>" +
            "<input type='checkbox' class='k-checkbox'   id='k-editor-link-class-green'>" +
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
          "<span class=\"k-textbox k-input\"><input type='text' class='k-input-inner' id='k-editor-link-url'></span>" +
          "</div>" +
          "<div class='k-edit-label k-editor-link-text-row'>" +
          "<label for='k-editor-link-text'>#: messages.linkText #</label>" +
          "</div>" +
          "<div class='k-edit-field k-editor-link-text-row'>" +
          "<span class=\"k-textbox k-input\"><input type='text' class='k-input-inner' id='k-editor-link-text'></span>" +
          "</div>" +
          "<div class='k-edit-label'>" +
          "<label for='k-editor-link-title'>#: messages.linkToolTip #</label>" +
          "</div>" +
          "<div class='k-edit-field'>" +
          "<span class=\"k-textbox k-input\"><input type='text' class='k-input-inner' id='k-editor-link-title'></span>" +
          "</div>" +
          "<div class='k-edit-label'></div>" +
          "<div class='k-edit-field'>" +
          "<input type='checkbox' class='k-checkbox' id='k-editor-link-target'>" +
          "<label for='k-editor-link-target' class='k-checkbox-label'>#: messages.linkOpenInNewWindow #</label>" +
          "</div>" +
          "<div class='k-edit-field'>" +
          "<input type='checkbox' class='k-checkbox' id='k-editor-link-class-green'>" +
          "<label for='k-editor-link-class-green' class='k-checkbox-label'>Set custom class -green</label>" +
          "</div>" +
          "<div class='k-edit-field'>" +
          "<input type='checkbox' class='k-checkbox' id='k-editor-link-class-red'>" +
          "<label for='k-editor-link-class-red' class='k-checkbox-label'>Set custom class - red</label>" +
          "</div>" +
          "<div class='k-edit-buttons'>" +
          '<button class="k-dialog-insert k-button k-button-primary"><span class="k-button-text">#: messages.dialogInsert #</span></button>' +
          '<button class="k-dialog-close k-button"><span class="k-button-text">#: messages.dialogCancel #</span></button>' +
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


The `Insert hyperlink` dialog displays internally a `kendoForm` component. You need to override the internal `_createForm` method and add the needed additional elements to the Form:

```
    kendo.ui.editor.LinkCommand.fn._createForm = function (dialog) {
        var that = this;
        var formElement = $("<div/>").appendTo(dialog.element);
        var messages = that.editor.options.messages;
        var form = formElement
          .kendoForm({
            renderButtons: false,
            items: [
              ...
            ]
          })
    }
```

2. In the kendo.ui.editor.LinkCommand `_apply` function you can check the state of the checkboxes and apply the custom attributes or classes:

```
        if (
            $("#k-editor-link-class-green").is(":checked") &&
            !this.attributes.className
          ) {
            this.attributes.className = "green";
            isInsert = true;
          } else if ($("#k-editor-link-class-green").is(":checked")) {
            this.attributes.className += " green";
            isInsert = true;
          }
```

Below is a runnable example:

```dojo
 <textarea id="editor"></textarea>
    <script>
      var isInsert = false;

      var textNodes = kendo.ui.editor.RangeUtils.textNodes;
      var dom = kendo.ui.editor.Dom;
      var encode = kendo.htmlEncode;

      kendo.ui.editor.LinkCommand.fn._createForm = function (dialog) {
        var that = this;
        var formElement = $("<div/>").appendTo(dialog.element);
        var messages = that.editor.options.messages;
        var form = formElement
          .kendoForm({
            renderButtons: false,
            items: [
              {
                field: "k-editor-link-url",
                label: encode(messages.linkWebAddress),
                title: encode(messages.linkWebAddress),
                editor: "TextBox",
              },
              {
                field: "k-editor-link-text",
                label: encode(messages.linkText),
                title: encode(messages.linkText),
                editor: "TextBox",
              },
              {
                field: "k-editor-link-title",
                label: encode(messages.linkToolTip),
                title: encode(messages.linkToolTip),
                editor: "TextBox",
              },
              {
                field: "k-editor-link-target",
                editorOptions: {
                  label: encode(messages.linkOpenInNewWindow),
                },
                label: "",
                title: encode(messages.linkOpenInNewWindow),
                editor: "CheckBox",
              },
              {
                field: "k-editor-link-class-red",
                label: "",
                editorOptions: {
                  label: "Set custom class - red",
                },
                editor: "CheckBox",
              },
              {
                field: "k-editor-link-class-green",
                label: "",
                editorOptions: {
                  label: "Set custom class - green",
                },
                editor: "CheckBox",
              },
            ],
          })
          .data("kendoForm");

        formElement
          .find("#k-editor-link-text")
          .parents(".k-form-field")
          .addClass("k-editor-link-text-row");

        dialog.element.after(
          $(
            that._actionButtonsTemplate({
              messages,
              insertButtonIcon: "link",
              cancelButtonIcon: "cancel-outline",
            }),
          ),
        );

        return form;
      };

      var originalExec = kendo.ui.editor.LinkCommand.fn.exec;

      kendo.ui.editor.LinkCommand.fn.exec = function () {
        var messages = this.editor.options.messages;
        this._initialText = "";
        this._range = this.lockRange(true);
        this.formatter.immutables = this.immutables();

        var nodes = textNodes(this._range);
        var a = nodes.length
          ? this.formatter.finder.findSuitable(nodes[0])
          : null;
        var img = nodes.length && dom.name(nodes[0]) == "img";

        var dialog = this.createDialog("<div/>", {
          title: messages.createLink,
          minWidth: 340,
          close: this._close.bind(this),
          visible: false,
        }).data("kendoWindow");

        this._form = this._createForm(dialog);

        if (a) {
          this._range.selectNodeContents(a);
          nodes = textNodes(this._range);
        }

        this._initialText = this.linkText(nodes);

        dialog.wrapper
          .find(".k-dialog-insert")
          .on("click", this._apply.bind(this))
          .end()
          .find(".k-dialog-close")
          .on("click", this._close.bind(this))
          .end()
          .find(".k-form-field input")
          .on("keydown", this._keydown.bind(this))
          .end()
          .find("#k-editor-link-url")
          .val(this.linkUrl(a))
          .end()
          .find("#k-editor-link-text")
          .val(this._initialText)
          .end()
          .find("#k-editor-link-title")
          .val(a ? a.title : "")
          .end()
          .find("#k-editor-link-target")
          .prop("checked", a ? a.target == "_blank" : false)
          .end()
          .find(".k-editor-link-text-row")
          .toggle(!img);

        this._dialog = dialog.center().open();

        $("#k-editor-link-url", dialog.element).trigger("focus").select();
      };

      var originalApply = kendo.ui.editor.LinkCommand.fn._apply;

      kendo.ui.editor.LinkCommand.fn._apply = function (e) {
        var element = this._dialog.element;
        var href = $("#k-editor-link-url", element).val();
        var title, text, target;
        var textInput = $("#k-editor-link-text", element);

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
            } else if (text && text !== this._initialText) {
              this.attributes.innerText = kendo.ui.editor.Dom.stripBom(text);
            }
          }

          target = $("#k-editor-link-target", element).is(":checked");
          this.attributes.target = target ? "_blank" : null;

          if ($("#k-editor-link-class-red").is(":checked")) {
            this.attributes.className = "red";
            isInsert = true;
          }

          if (
            $("#k-editor-link-class-green").is(":checked") &&
            !this.attributes.className
          ) {
            this.attributes.className = "green";
            isInsert = true;
          } else if ($("#k-editor-link-class-green").is(":checked")) {
            this.attributes.className += " green";
            isInsert = true;
          }

          this.formatter.apply(this._range, this.attributes);
        }

        this._close(e);

        if (this.change) {
          this.change();
        }
      };

      $("#editor").kendoEditor({
        select: function (e) {
          if (isInsert) {
            $(e.sender.selectionRestorePoint.body)
              .find(".red")
              .attr("red", "red");
            $(e.sender.selectionRestorePoint.body)
              .find(".green")
              .attr("green", "green");
            isInsert = false;
          }
        },
      });
    </script>
```



## See Also

* [API Reference of the Editor](https://www.telerik.com/kendo-jquery-ui/documentation/api/javascript/ui/editor)
* [Editor Create Custom Editor Tool](https://www.telerik.com/kendo-jquery-ui/documentation/knowledge-base/editor-custom-tool)

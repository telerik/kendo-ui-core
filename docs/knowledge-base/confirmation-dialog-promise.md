---
title: Create Confirmation Dialogs by Using Promises
page_title: Create Confirmation Dialog by Using Promises
description: "Learn how to create a confirmation dialog in a Kendo UI for jQuery Window by using promises for deferred execution."
slug: howto_createconfirmationdialog_viapromises_window
previous_url: /controls/layout/window/how-to/confirmation-dialog-promise
tags: telerik, kendo, jquery, window, create, confirmation, dialogs, with, promises, deferred, execution
component: window
type: how-to
res_type: kb
---

## Environment

<table>
 <tr>
  <td>Product</td>
  <td>Progress® Kendo UI® Window for jQuery</td>
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

How can I create a confirmation dialog in a Kendo UI Window by using Promises for deferred execution?

## Solution

The example below demonstrates how to achieve the desired scenario.


```dojo
    <script id="confirmationTemplate" type="text/x-kendo-template">
    <div class="popupMessage"></div>
      </br>
    <hr/>
    <div class="dialog_buttons">
        <input type="button" class="confirm_yes" value="Yes" style="width: 70px" />
        &nbsp;
        <input type="button" class="confirm_no" value="No" style="width: 70px" />
      </div>
    </script>
    <script>
      function showConfirmationWindow(message) {
        return showWindow('#confirmationTemplate', message)
      };

      function showWindow(template, message) {
        var dfd = new jQuery.Deferred();
        var result = false;
        $("<div id='popupWindow'></div>")
          .appendTo("body")
          .kendoWindow({
          width: "200px",
          modal: true,
          title: "",
          modal: true,
          visible: false,
          close: function (e) {
            this.destroy();
            dfd.resolve(result);
          }
        }).data('kendoWindow').content($(template).html()).center().open();
        $(".confirm_yes").kendoButton();
        $(".confirm_no").kendoButton();
        $('.popupMessage').html(message);
        $('#popupWindow .confirm_yes').val('OK');
        $('#popupWindow .confirm_no').val('Cancel');
        $('#popupWindow .confirm_no').click(function () {
          $('#popupWindow').data('kendoWindow').close();
        });
        $('#popupWindow .confirm_yes').click(function () {
          result = true;
          $('#popupWindow').data('kendoWindow').close();
        });
        return dfd.promise();
      };
      $.when(showConfirmationWindow('Are you sure?')).then(function(confirmed){
        if(confirmed){
          alert('OK');
        }
        else{
          alert('Cancel');
        }
      });
    </script>
```

## See Also

* [Window JavaScript API Reference](/api/javascript/ui/window)
* [How to Add Auto-Resizing Splitter]({% slug howto_addautoresizingsplitter_window %})
* [How to Display Loading Indicator over Window]({% slug howto_displayloadingindicator_overwindow_window %})
* [How to Initialize the Grid]({% slug initialize_thegrid_window_widget %})
* [How to Post to Iframe]({% slug howto_posttoiframe_window %})
* [How to Use Custom Action Icons]({% slug howto_customactionicons_window %})

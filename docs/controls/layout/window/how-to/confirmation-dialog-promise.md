---
title: Create Confirmation Dialog via Promises
page_title: Create Confirmation Dialog via Promises | Kendo UI Window
description: "Learn how to create a confirmation dialog in a Kendo UI Window by using Promises for deferred execution."
slug: howto_createconfirmationdialog_viapromises_window
---

# Create Confirmation Dialog via Promises

The example below demonstrates how to create a confirmation dialog in a Kendo UI Window by using Promises for deferred execution.

###### Example

```html
    <script id="confirmationTemplate" type="text/x-kendo-template">
    <div class="popupMessage"></div>            
      </br>
    <hr/>
    <div class="dialog_buttons">
        <input type="button" class="confirm_yes k-button" value="Yes" style="width: 70px" />
        &nbsp;
        <input type="button" class="confirm_no k-button" value="No" style="width: 70px" />
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

Articles and other how-to examples on Kendo UI Window:

* [Window JavaScript API Reference](/api/javascript/ui/window)
* [How to Add Auto-Resizing Splitter]({% slug howto_addautoresizingsplitter_window %})
* [How to Add Close Button inside Modal Windows]({% slug howto_addclosebutton_insidemodalwindows_window %})
* [How to Cascade Open Windows]({% slug howto_cascadeopenwindows_window %})
* [How to Display Loading Indicator over Window]({% slug howto_displayloadingindicator_overwindow_window %})
* [How to Initialize the Grid]({% slug initialize_thegrid_window_widget %})
* [How to Post to Iframe]({% slug howto_posttoiframe_window %})
* [How to Restrict Window Positioning]({% slug howto_restrictpositioning_window %})
* [How to Use Custom Action Icons]({% slug howto_customactionicons_window %})
* [How to Use MVVM Binding for Window Data Editing]({% slug howto_usemvvmbinding_forwindowdataediting_mvvm_window %})

---
title: Create confirmation dialog using Promises
page_title: Create confirmation dialog using Promises
description: Create confirmation dialog using Promises
---

# Create confirmation dialog using Promises

The example below demonstrates how to create a confirmation dialog using Promises for deferred execution

#### Example:

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
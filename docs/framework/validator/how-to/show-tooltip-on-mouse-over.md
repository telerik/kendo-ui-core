---
title: Show tooltip on mouse over
page_title: Show tooltip on mouse over
description: Show tooltip on mouse over
---

# Show tooltip on mouse over

The example below demonstrates how to show the validation tooltip only when moving the cursor over the input that failed to validate.

#### Example:

```html
    <style scoped>
      .k-invalid-msg
      {
        display: none !important;
      }

      .k-invalid
      {
        border: 1px solid red;
      }
      .k-textbox {
        width: 11.8em;
      }

      .demo-section {
        width: 700px;
      }

      #tickets {
        width: 510px;
        height: 323px;
        margin: 0 auto;
        padding: 10px 20px 20px 170px;
        background: url('../content/web/validator/ticketsOnline.png') transparent no-repeat 0 0;
      }

      #tickets h3 {
        font-weight: normal;
        font-size: 1.4em;
        border-bottom: 1px solid #ccc;
      }

      #tickets ul {
        list-style-type: none;
        margin: 0;
        padding: 0;
      }
      #tickets li {
        margin: 7px 0 0 0;
      }

      label {
        display: inline-block;
        width: 90px;
        text-align: right;
      }

      .required {
        font-weight: bold;
      }

      .accept, .status {
        padding-left: 90px;
      }

      .valid {
        color: green;
      }

      .invalid {
        color: red;
      }
      span.k-tooltip {
        margin-left: 6px;
      }
    </style>
    <div id="example">
      <div class="demo-section k-header">
        <form id="tickets">
          <h3>Book Tickets</h3>
          <ul>
            <li>
              <label for="fullname" class="required">Your Name</label>
              <div style="display:inline-block">
                <input type="text" id="fullname" name="fullname" class="k-textbox" placeholder="Full name" required validationMessage="Enter {0}" style="width: 200px;" />
              </div>
            </li>
            <li  class="accept">
              <button class="k-button" type="submit">Submit</button>
            </li>
            <li class="status">
            </li>
          </ul>
        </form>
      </div>


      <script>
        $(document).ready(function() {
          var errorTemplate = '<div class="k-widget k-tooltip k-tooltip-validation"' +
              'style="margin:0.5em"><span class="k-icon k-warning"> </span>' +
              '#=message#<div class="k-callout k-callout-n"></div></div>'

          var validator = $("#tickets").kendoValidator({
            errorTemplate: errorTemplate
          }).data("kendoValidator");

          var tooltip = $("#tickets").kendoTooltip({
            filter: ".k-invalid",
            content: function(e) {
              var errorMessage = $("#tickets").find("[data-for=" + e.target.attr("name") + "]");

              return '<span class="k-icon k-warning"> </span>' + errorMessage.text();
            }
          });

          var status = $(".status");

          $("form").submit(function(event) {
            event.preventDefault();
            if (validator.validate()) {
              status.text("Hooray! Your tickets has been booked!")
              .removeClass("invalid")
              .addClass("valid");
            } else {
              status.text("Oops! There is invalid data in the form.")
              .removeClass("valid")
              .addClass("invalid");
            }
          });
        });
      </script>
    </div>
```
---
title: Use Templates to Customize Tooltips
page_title: Use Templates to Customize Tooltips | Kendo UI Validator
description: "Learn how to use a template to customize a tooltip in the Kendo UI Validator."
previous_url: /framework/validator/how-to/use-error-template
slug: howto_usetemplatestocustomizetooltips_validator
---

# Use Templates to Customize Tooltips

The following example demonstrates how to use an [`errorTemplate`](/api/framework/validator#configuration-errorTemplate) to customize the tooltip in Kendo UI.

###### Example

```html
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

      <style scoped>

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

      <script>
        $(document).ready(function() {
          var errorTemplate = '<div class="k-widget k-tooltip k-tooltip-validation"' +
              'style="margin:0.5em"><span class="k-icon k-warning"> </span>' +
              '#=message#<div class="k-callout k-callout-n"></div></div>'

          var validator = $("#tickets").kendoValidator({
            errorTemplate: errorTemplate
          }).data("kendoValidator");

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

## See Also

* [Validator JavaScript API Reference](/api/javascript/ui/validator)
* [How to Show Tooltip on Mouse Over]({% slug howto_showtooltiponmouseover_validator %})
* [How to Use Use MutationObserver to Add Red Border and Hide Tooltip]({% slug howto_usemutationobserver_addborderandhidetooltip_validator %})
* [How to Validate Radio Buttons with Only One Error Message]({% slug howto_validateradiowithonemessage_validator %})

For more runnable examples on the Kendo UI Validator widget, browse its [**How To** documentation folder]({% slug howto_addredborderandhidetooltip_validator %}).

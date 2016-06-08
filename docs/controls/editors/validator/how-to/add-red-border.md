---
title: Add Red Border and Hide Tooltip
page_title: Add Red Border and Hide Tooltip | Kendo UI Validator
description: "Learn how to add a red border and hide the tooltip in the Kendo UI Validator."
slug: howto_addredborderandhidetooltip_validator
---

# Add Red Border and Hide Tooltip

The example below demonstrates how to hide the validation tooltip and add a red border around `input` elements and widgets, which failed to validate, in Kendo UI.

###### Example

```html
    <style scoped>

      .k-textbox {
        width: 11.8em;
      }

      .demo-section {
        width: 700px;
        font-size: 12px;
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
        margin: 10px 0 0;
        padding: 0;
      }

      #tickets ul {
        list-style-type: none;
        margin: 0;
        padding: 0;
      }
      #tickets li {
        margin: 10px 0 0 0;
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
      .k-input.k-invalid {
        border: 1px solid red;
      }
    </style>
    <div class="demo-section k-header">
      <form id="tickets">
        <h3>Book Tickets</h3>
        <ul>
          <li>
            <label for="fullname" class="required">Your Name</label>
            <input type="text" id="fullname" name="fullname" class="k-textbox" placeholder="Full name" required validationMessage="Enter {0}" style="width: 200px;" />
          </li>
          <li>
            <label for="search" class="required">Movie</label>
            <input type="search" id="search" name="search" required validationMessage="Select movie" style="width: 200px;"/><span class="k-invalid-msg" data-for="search"></span>
          </li>
          <li>
            <label for="time">Start time</label>
            <input id="datetime" name="datetime" required data-required-msg="Select date!" style="width: 200px;"/>
            <span class="k-invalid-msg" data-for="datetime"></span>
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
        var data = [
          "12 Angry Men",
          "Il buono, il brutto, il cattivo.",
          "Inception",
          "One Flew Over the Cuckoo's Nest",
          "Pulp Fiction",
          "Schindler's List",
          "The Dark Knight",
          "The Godfather",
          "The Godfather: Part II",
          "The Shawshank Redemption"
        ];

        $("#search").kendoAutoComplete({
          dataSource: data,
          separator: ", "
        });

        $("#datetime").kendoDatePicker();

        var validator = $("#tickets").kendoValidator({
            validate: function(e) {
                $("span.k-invalid-msg").hide();
            }
        }).data("kendoValidator"),
            status = $(".status");

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
```

## See Also

Other articles on the Kendo UI Validator:

* [Validator JavaScript API Reference](/api/javascript/ui/validator)
* [How to Show Tooltip on Mouse Over]({% slug howto_showtooltiponmouseover_validator %})
* [How to Use Use MutationObserver to Add Red Border and Hide Tooltip]({% slug howto_usemutationobserver_addborderandhidetooltip_validator %})
* [How to Use Templates to Customize Tooltips]({% slug howto_usetemplatestocustomizetooltips_validator %})
* [How to Validate Radio Buttons with Only One Error Message]({% slug howto_validateradiowithonemessage_validator %})

For more runnable examples on the Kendo UI Validator widget, browse its [**How To** documentation folder]({% slug howto_remote_validation %}).

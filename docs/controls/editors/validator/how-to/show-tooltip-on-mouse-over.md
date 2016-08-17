---
title: Show Tooltip on Mouse Over
page_title: Show Tooltip on Mouse Over | Kendo UI Validator
description: "Learn how to show a toolbar on mouse over in the Kendo UI Validator."
slug: howto_showtooltiponmouseover_validator
---

# Show Tooltip on Mouse Over

The example below demonstrates how to show the validation tooltip in Kendo UI only when moving the mouse cursor over the input that failed to validate.

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
      .k-widget > span.k-invalid,
      input.k-invalid
      {
        border: 1px solid red !important;
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
            <li>
              <label for="email" class="required">Email</label>
              <div style="display:inline-block">
                <input type="email" id="email" name="email" class="k-textbox" placeholder="Email" required style="width: 200px;" />
              </div>
            </li>
            <li>
              <label for="age" class="required">Age</label>
              <div style="display:inline-block">
                <input id="age" name="age" placeholder="Age" style="width: 200px;" required />
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

          $("#age").kendoNumericTextBox();

          var tooltip = $("#tickets").kendoTooltip({
            filter: ".k-invalid",
            content: function(e) {
              var name = e.target.attr("name") || e.target.closest(".k-widget").find(".k-invalid:input").attr("name");
              var errorMessage = $("#tickets").find("[data-for=" + name + "]");

              return '<span class="k-icon k-warning"> </span>' + errorMessage.text();
            },
            show: function() {
              this.refresh();
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

          var elements = $("#tickets").find("[data-role=autocomplete],[data-role=combobox],[data-role=dropdownlist],[data-role=numerictextbox]");

          //correct mutation event detection
          var hasMutationEvents = ("MutationEvent" in window),
              MutationObserver = window.WebKitMutationObserver || window.MutationObserver;

          if (MutationObserver) {
            var observer = new MutationObserver(function (mutations) {
              var idx = 0,
                  mutation,
                  length = mutations.length;

              for (; idx < length; idx++) {
                mutation = mutations[idx];
                if (mutation.attributeName === "class") {
                  updateCssOnPropertyChange(mutation);
                }
              }
            }),
                config = { attributes: true, childList: false, characterData: false };

            elements.each(function () {
              observer.observe(this, config);
            });
          } else if (hasMutationEvents) {
            elements.bind("DOMAttrModified", updateCssOnPropertyChange);
          } else {
            elements.each(function () {
              this.attachEvent("onpropertychange", updateCssOnPropertyChange);
            });
          }

          function updateCssOnPropertyChange (e) {
            var element = $(e.target || e.srcElement);

            element.siblings("span.k-dropdown-wrap")
            .add(element.parent("span.k-numeric-wrap"))
            .toggleClass("k-invalid", element.hasClass("k-invalid"));
          }
        });
      </script>
    </div>
```

## See Also

Other articles on the Kendo UI Validator:

* [Validator JavaScript API Reference](/api/javascript/ui/validator)
* [How to Use Use MutationObserver to Add Red Border and Hide Tooltip]({% slug howto_usemutationobserver_addborderandhidetooltip_validator %})
* [How to Use Templates to Customize Tooltips]({% slug howto_usetemplatestocustomizetooltips_validator %})
* [How to Validate Radio Buttons with Only One Error Message]({% slug howto_validateradiowithonemessage_validator %})

For more runnable examples on the Kendo UI Validator widget, browse its [**How To** documentation folder]({% slug howto_addredborderandhidetooltip_validator %}).

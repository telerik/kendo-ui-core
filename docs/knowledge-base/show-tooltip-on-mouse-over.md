---
title: Show Tooltip on Mouse Over in the Validator
page_title: Show Tooltip on Mouse Over in the Validator
description: "Learn how to show a toolbar on mouse over in the Kendo UI Validator."
previous_url: /framework/validator/how-to/show-tooltip-on-mouse-over, /controls/editors/validator/how-to/show-tooltip-on-mouse-over
slug: howto_showtooltiponmouseover_validator
tags: telerik, kendo, jquery, validator, show, tooltip, on, mouseover
component: validator
type: how-to
res_type: kb
---

## Environment

<table>
 <tr>
  <td>Product</td>
  <td>Progress® Kendo UI® Validator for jQuery</td>
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

How can I show the validation tooltip in Kendo UI only when you move the mouse cursor over the input that failed to validate?

## Solution

The following example demonstrates how to achieve the desired scenario.

```dojo
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
                <input type="text" id="fullname" name="fullname" placeholder="Full name" required validationMessage="Enter {0}" style="width: 200px;" />
              </div>
            </li>
            <li>
              <label for="email" class="required">Email</label>
              <div style="display:inline-block">
                <input type="email" id="email" name="email" placeholder="Email" required style="width: 200px;" />
              </div>
            </li>
            <li>
              <label for="age" class="required">Age</label>
              <div style="display:inline-block">
                <input id="age" name="age" placeholder="Age" style="width: 200px;" required />
              </div>
            </li>
            <li  class="accept">
              <button id="submit" type="submit">Submit</button>
            </li>
            <li class="status">
            </li>
          </ul>
        </form>
      </div>
      <script>
        $(document).ready(function() {
          $("#fullname").kendoTextBox();
          $("#email").kendoTextBox();
          $("#submit").kendoButton();
          var errorTemplate = '<div class="k-widget k-tooltip k-tooltip-error"' +
              'style="margin:0.5em"><span class="k-icon k-warning"> </span>' +
              '#=message#<div class="k-callout k-callout-n"></div></div>'
          var validator = $("#tickets").kendoValidator({
            errorTemplate: errorTemplate
          }).data("kendoValidator");
          $("#age").kendoNumericTextBox();
          var tooltip = $("#tickets").kendoTooltip({
            filter: ".k-invalid",
            content: function(e) {
              var name = e.target.attr("name") || e.target.closest(".k-input").find(".k-invalid:input").attr("name");
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
          // A correct mutation of the event detection.
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

* [Basic Usage of the Validator (Demo)](https://demos.telerik.com/kendo-ui/validator/index)
* [JavaScript API Reference of the Validator](/api/javascript/ui/validator)

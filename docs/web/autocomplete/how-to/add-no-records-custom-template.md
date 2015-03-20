---
title: Add "No records found" template
page_title: Add "No records found" template
description: Add "No records found" template
---

# Add "No records found" template

The example below demonstrates how to show a customized template, when the entered values does not match any of the suggestions.

#### Example:

```html
    <div id="example">
      <div id="shipping">
        <label for="countries" class="info">Choose shipping countries:</label>
        <input id="countries" />
        <div class="hint">Start typing the name of an European country</div>
      </div>

      <script>
        $(document).ready(function () {
          var data = [
            "Albania",
            "Andorra",
            "Armenia",
            "Austria",
            "Azerbaijan",
            "Belarus",
            "Belgium",
            "Bosnia & Herzegovina",
            "Bulgaria",
            "Croatia",
            "Cyprus",
            "Czech Republic",
            "Denmark",
            "Estonia",
            "Finland",
            "France",
            "Georgia",
            "Germany",
            "Greece",
            "Hungary",
            "Iceland",
            "Ireland",
            "Italy",
            "Kosovo",
            "Latvia",
            "Liechtenstein",
            "Lithuania",
            "Luxembourg",
            "Macedonia",
            "Malta",
            "Moldova",
            "Monaco",
            "Montenegro",
            "Netherlands",
            "Norway",
            "Poland",
            "Portugal",
            "Romania",
            "Russia",
            "San Marino",
            "Serbia",
            "Slovakia",
            "Slovenia",
            "Spain",
            "Sweden",
            "Switzerland",
            "Turkey",
            "Ukraine",
            "United Kingdom",
            "Vatican City"
          ];

          //create AutoComplete UI component
          var widget = $("#countries").kendoAutoComplete({
            dataSource: data,
            filter: "startswith",
            placeholder: "Select country...",
            headerTemplate: '<div class="noDataMessage">No results found</div>',
            separator: ", ",
            dataBound: function() {
              var noItems = this.list.find(".noDataMessage");

              if (!this.dataSource.view()[0]) {
                noItems.show();
                this.popup.open();
              } else {
                noItems.hide();
              }
            },
            close: function(e) {
              var widget = e.sender;

              if (!widget.shouldClose && !this.dataSource.view()[0]) {
                e.preventDefault();
              }
            }
          }).data("kendoAutoComplete");

          widget.element.on("blur", function() {
            widget.shouldClose = true;

            widget.close();

            widget.shouldClose = false;
          });
        });
      </script>
      <style scoped>
        .info {
          display: block;
          line-height: 22px;
          padding: 0 5px 5px 0;
          color: #36558e;
        }

        #shipping {
          width: 482px;
          height: 152px;
          padding: 110px 0 0 30px;
          background: url('../content/web/autocomplete/shipping.png') transparent no-repeat 0 0;
          margin: 100px auto;
        }

        .k-autocomplete
        {
          width: 250px;
          vertical-align: middle;
        }

        .hint {
          line-height: 22px;
          color: #aaa;
          font-style: italic;
          font-size: .9em;
          color: #7496d4;
        }
      </style>
    </div>
```

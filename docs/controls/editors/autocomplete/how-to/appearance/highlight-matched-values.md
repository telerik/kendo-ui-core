---
title: Highlight Matched Values
page_title: Highlight Matched Values | Kendo UI AutoComplete
description: "Learn how to highlight matched values in a Kendo UI AutoComplete widget."
previous_url: /controls/editors/autocomplete/how-to/highlight-matched-values
slug: howto_highlight_matched_values_autocomplete
---

# Highlight Matched Values

The following example demonstrates how to highlight the matched values from the AutoComplete suggestions based on the value entered by the user.

###### Example

```html
    <div id="example">
      <div id="shipping">
        <label for="countries" class="info">Choose shipping countries:</label>
        <input id="countries" />
        <div class="hint">Start typing the name of a European country</div>
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
          $("#countries").kendoAutoComplete({
            dataSource: data,
            filter: "startswith",
            placeholder: "Select country...",
            separator: ", ",
            template: $.proxy(kendo.template("#= formatValue(data, this.val()) #"), $("#countries"))
          });
        });

        function formatValue(itemText, text) {
          var textMatcher = new RegExp(text, "ig");

          return itemText.replace(textMatcher, function(match) {
            return "<strong>" + match + "</strong>";
          });
        }
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

## See Also

* [AutoComplete JavaScript API Reference](/api/javascript/ui/autocomplete)
* [How to Dynamically Change DataSource Based on User Selections]({% slug howto_change_datasource_dynamically_autocomplete %})
* [How to Restrict Other Users]({% slug howto_restrict_user_input_autocomplete %})

For more runnable examples on the Kendo UI AutoComplete, browse its [**How To** documentation folder]({% slug howto_bindobjectstongmodel_autocomplete %}).

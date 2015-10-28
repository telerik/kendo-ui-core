---
title: Highlight Matched Values
page_title: Highlight Matched Values | Kendo UI AutoComplete Widget
description: "Learn how to highlight matched values in a Kendo UI AutoComplete widget." 
slug: howto_highlight_matched_values_autocomplete
position: 2
---

# Highlight Matched Values

The example below demonstrates how to highlight the matched values from the AutoComplete suggestions based on the value entered by the user.

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

Other how-to examples on Kendo UI AutoComplete:

* [Use Custom Templates with AngularJS]({% slug howto_use_custom_angularjs_templates_autocomplete %})
* [Restrict Other Users]({% slug howto_restrict_user_input_autocomplete %})
* [Show `No results found`]({% slug howto_add_customized_templates_autocomplete %})
* [Change `DataSource` Dynamically]({% slug howto_change_datasource_dynamically_autocomplete %})
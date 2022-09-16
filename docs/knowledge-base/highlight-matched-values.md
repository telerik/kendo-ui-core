---
title: Highlight Matched Values in AutoComplete
page_title: Highlight Matched Values in AutoComplete
description: "Learn how to highlight matched values from the Kendo UI for jQuery AutoComplete suggestions based on the value entered by the user."
previous_url: /controls/editors/autocomplete/how-to/highlight-matched-values, /controls/editors/autocomplete/how-to/appearance/highlight-matched-values
slug: howto_highlight_matched_values_autocomplete
tags: telerik, kendo, jquery, autocomplete, highlight, matched, values, of, user, suggestions
component: autocomplete
type: how-to
res_type: kb
---

## Environment

<table>
 <tr>
  <td>Product</td>
  <td>Progress Kendo UI AutoComplete for jQuery</td>
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

How can I highlight the matched values from the AutoComplete suggestions based on the value entered by the user?

## Solution

The following example demonstrates how to achieve the desired scenario.

```dojo
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

          // Create the UI of the AutoComplete.
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

* [Basic Usage of the AutoComplete (Demo)](https://demos.telerik.com/kendo-ui/autocomplete/index)
* [Using the API of the AutoComplete (Demo)](https://demos.telerik.com/kendo-ui/autocomplete/api)
* [JavaScript API Reference of the AutoComplete](/api/javascript/ui/autocomplete)

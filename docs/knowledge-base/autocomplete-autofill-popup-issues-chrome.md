---
title: Chrome Browser Causes Auto-Fill Popup Issues in the AutoComplete
page_title: Chrome Browser Performs Auto-Fill Popup Issues in the AutoComplete
description: "Learn how to handle the Kendo UI for jQuery AutoComplete component when the Chrome browser performs auto-fill popup issues."
previous_url: /controls/editors/autocomplete/troubleshooting
slug: troubleshooting_autocomplete_widget
tags: telerik, progress, kendoui, autocomplete, chrome, browser, performs, cause, autofill, popup, issues
type: troubleshooting
res_type: kb
component: autocomplete
---

## Environment

<table>
 <tr>
  <td>Product</td>
  <td>Progress® Kendo UI® AutoComplete for jQuery</td>
 </tr>
 <tr>
  <td>Operating System</td>
  <td>Windows 10 64bit</td>
 </tr>
</table>

## Description 

The Chrome browser performs auto-fill popup issues in the AutoComplete component.

## Cause

If the input name matches any of the predefined autofill fields, the Chrome browser ignores the `autocomplete="off"` setting and also the value that is set to the attribute.

## Solution

To handle this issue:

1. Use a `name` attribute that is not contained in the predefined auto-fill fields of Chrome.
1. Toggle the `name` attribute on `focus` and `focusout`.

```
    <form>
        <input name="city" ID="City" required />
    </form>
    <script>
        var data = [
            "Toronto",
            "New York",
            "London",
            "Paris"
        ];

        var name;

        var CityAutoComplete = $("#City").kendoAutoComplete({
            dataSource: data,
            filter: "startswith",
            placeholder: "Select city...",
            separator: ", "
        }).getKendoAutoComplete();

        CityAutoComplete.element.on("focus", function () {
            name = this.name;
            this.name = kendo.guid().substr(0, 8);
        });

        CityAutoComplete.element.on("focusout", function () {
            this.name = name;
        });
    </script>
```

## See Also

* [JavaScript API Reference of the AutoComplete](/api/javascript/ui/autocomplete)

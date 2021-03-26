---
title: Troubleshooting
page_title: jQuery AutoComplete Documentation | Troubleshooting | Kendo UI AutoComplete
description: "Get started with the jQuery AutoComplete by Kendo UI and learn how to deal with issues you may encounter while using the widget."
slug: troubleshooting_autocomplete_widget
position: 8
---

# Troubleshooting

This article provides solutions for issues you might encounter while working with the Kendo UI AutoComplete widget.

## The Chrome browser performs auto-fill popup issues

If the input name matches any of the predefined autofill fields, the Chrome browser ignores the `autocomplete="off"` setting and also the value that is set to the attribute.

**Solution**

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

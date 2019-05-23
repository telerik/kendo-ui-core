---
title: Common Issues
page_title: Common Issues | Kendo UI AutoComplete
description: "Learn how to deal with issues you may encounter while using the Kendo UI AutoComplete widget."
previous_url: /controls/editors/autocomplete/troubleshooting
slug: troubleshooting_autocomplete_widget
---

# Common Issues

This page provides solutions for common issues you might encounter while working with the Kendo UI AutoComplete widget.

## Chrome AutoFill Popup

`Chrome` browser ignores the `autocomplete="off"` and ignores any value set to the attribute if the input name matches one of the predefined autofill fields.

**Solution**

Toggle the name attribute on `focus` and `focusout`.

###### Example

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


**Solution**

Use a `name` attribute that is not contained in the predefined autofill fields of Chrome.

## See Also

* [AutoComplete JavaScript API Reference](/api/javascript/ui/autocomplete)
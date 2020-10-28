---
title: Localization
page_title: jQuery ListBox Documentation | ListBox Localization
description: "Get started with the jQuery ListBox by Kendo UI and translate its messages for different culture locales."
slug: localization_listbox
position: 2
---

# Localization

You can configure the ListBox messages for each toolbar command button. The messages serve as tooltip text when the user hovers over the buttons.

```dojo

    <select id="listbox">
        <option>Steven White</option>
        <option>Nancy King</option>
        <option>Nancy Davolio</option>
        <option>Robert Davolio</option>
        <option>Michael Leverling</option>
        <option>Andrew Callahan</option>
        <option>Michael Suyama</option>
    </select>
    <script>
        $(document).ready(function () {
            $("#listbox").kendoListBox({
                toolbar: {
                    position: "bottom",
                    tools: ["moveUp", "moveDown", "remove", "transferAllFrom", "transferAllTo", "transferFrom", "transferTo"]
                },
                messages: {
                    tools: {
                        moveUp: "Promote",
                        moveDown: "Demote",
                        remove: "Remove Employee",
                        transferTo: "Transfer To",
                        transferFrom: "Transfer From",
                        transferAllTo: "Transfer All To",
                        transferAllFrom: "Transfer All From"
                    }
                }
            });
        });
    </script>
```

## See Also

* [Basic Usage of the ListBox (Demo)](https://demos.telerik.com/kendo-ui/listbox/index)
* [Using the API of the ListBox (Demo)](https://demos.telerik.com/kendo-ui/listbox/api)
* [JavaScript API Reference of the ListBox](/api/javascript/ui/listbox)

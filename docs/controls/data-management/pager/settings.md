---
title: Pager Settings and Types
page_title: jQuery Pager Documentation | Pager Settings
description: "Get started with the jQuery Pager by Kendo UI and learn about the options it supports."
slug: settings_kendoui_pager_widget
---

## Types

The Pager has two types:

- `numeric`
- `input`

The Pager is `numeric` by default. To configure the number of buttons that will be shown in a numeric pager, use the [`buttonCount`](/api/javascript/ui/pager/configuration/buttoncount) option. To configure the pager to accept only use input, set the [`numeric`](/api/javascript/ui/pager/configuration/numeric) to `false` and the [`input`](/api/javascript/ui/pager/configuration/input) to `true`.

The following example shows how to enable the `input` pager type

```dojo
        <div id="pager"></div>
        
        <script>
            var dataSource = new kendo.data.DataSource({
              data: [
                { productName: "Tea", category: "Beverages" },
                { productName: "Coffee", category: "Beverages" },
                { productName: "Ham", category: "Food" },
                { productName: "Bread", category: "Food" }
              ],
              pageSize: 2
            });
        
            $("#pager").kendoPager({
              dataSource: dataSource,
              input: true,
              numeric: false
            });
        
            dataSource.read();
        </script>
        <style>
          #pager {
           margin-top: 100px;
          }
        </style>

```

## Settings

The following settings enable you to determine which built-in pager elements will be rendered:

- [`pageSizes`](/api/javascript/ui/pager/configuration/pagesizes) - renders the dropdown that allows the user to change the page size.
- [`refresh`](/api/javascript/ui/pager/configuration/refresh) - renders a refresh button
- [`previousNext`](/api/javascript/ui/pager/configuration/previousnext) - toggles the visibility of buttons for navigating to the first, last, previous and next pages
- [`info`](/api/javascript/ui/pager/configuration/info) - toggles the visibility of the current pager information


## See Also

* [JavaScript API Reference of the Pager](/api/javascript/ui/pager)
* [Responsive Pager]({% slug responsive_kendoui_pager_widget  %})
* [Pager Templates]({% slug templates_kendoui_pager_widget %})
* [Globalization and Messages]({% slug globalization_kendoui_pager_widget %})

---
title: Events
page_title: Events
description: "Learn how to handle the events of the Telerik UI Spreadsheet component for {{ site.framework }}."
slug: spreadsheet_events
position: 4
---

# Events

The Telerik UI Spreadsheet for {{ site.framework }} [exposes a number of JavaScript events](/api/kendo.mvc.ui.fluent/spreadsheeteventbuilder) that allow you to control the behavior of the UI component.

For a complete example of how to handle all Spreadsheet events triggered by user interaction, refer to the [demo on using the events of the Spreadsheet ](https://demos.telerik.com/{{ site.platform }}/spreadsheet/events).


## Subscribing to Events

The following example demonstrates how to subscribe to the `Changing` and `Change` events.

```HtmlHelper
    @(Html.Kendo().Spreadsheet()
        .Name("spreadsheet")
        .Events(events => events
            .Changing("onChanging")
            .Change("onChange")
        )
        .Sheets(sheets =>
        {
            sheets.Add()
                .Name("Sheet1")
                .Columns(columns =>
                {
                    columns.Add().Width(115);
                })
                .Rows(rows =>
                {
                    rows.Add().Height(25).Cells(cells =>
                    {
                        cells.Add()
                            .Value("ID")
                            .TextAlign(SpreadsheetTextAlign.Center);
                    });
                });
        })
    )

    <script>
        function onChanging(e) {
            // Handle the changing event.
        }

        function onChange(e) {
            // Handle the change event.
        }
    </script>
```
{% if site.core %}
```TagHelper
    <kendo-spreadsheet name="spreadsheet" on-changing="onChanging" on-change="onChange">
        <sheets>
            <sheet name="Sheet1">
                <columns>
                    <sheet-column width="115">
                    </sheet-column>
                </columns>
                <rows>
                    <sheet-row height="25">
                        <cells>
                            <cell value="ID" text-align="SpreadsheetTextAlign.Center">
                            </cell>
                        </cells>
                    </sheet-row>
                </rows>
            </sheet>
        </sheets>
    </kendo-spreadsheet>

    <script>
        function onChanging(e) {
            // Handle the changing event.
        }

        function onChange(e) {
            // Handle the change event.
        }
    </script>
```
{% endif %}

## Next Steps

* [Using the Spreadsheet Events (Demo)](https://demos.telerik.com/aspnet-core/spreadsheet/events)
* [Using the API of the Spreadsheet for {{ site.framework }} (Demo)](https://demos.telerik.com/{{ site.platform }}/spreadsheet/api)

## See Also

* [Server-Side API of the Spreadsheet](/api/spreadsheet)
* [Client-Side API of the Spreadsheet](https://docs.telerik.com/kendo-ui/api/javascript/ui/spreadsheet)
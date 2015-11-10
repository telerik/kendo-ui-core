---
title: Select first item on TAB
page_title: Select first item on TAB
description: Select first item on TAB
---

# Select first item on TAB

The example below demonstrates how to select the first item from the popup on TAB keypress

#### Example:

```html
<div id="example">
    <div class="demo-section k-header">
        <h4>Select Continents</h4>
        <select id="select"></select>
    </div>
    <script>
        $(document).ready(function() {
            function onDataBound() {
                if ("kendoConsole" in window) {
                    kendoConsole.log("event: dataBound");
                }
            }

            function onOpen() {
                if ("kendoConsole" in window) {
                    kendoConsole.log("event: open");
                }
            }

            function onClose() {
                if ("kendoConsole" in window) {
                    kendoConsole.log("event: close");
                }
            }

            function onChange() {
                if ("kendoConsole" in window) {
                    kendoConsole.log("event: change");
                }
            }

            function onSelect(e) {
                if ("kendoConsole" in window) {
                    var dataItem = this.dataSource.view()[e.item.index()];
                    kendoConsole.log("event :: select (" + dataItem.text + " : " + dataItem.value + ")" );
                }
            };

            function onFiltering(e) {
                if ("kendoConsole" in window) {
                    kendoConsole.log("event :: filtering");
                }
            }

            var data = [
                { text: "A", value:"1" },
                { text: "Europe", value:"2" },
                { text: "Asia", value:"3" },
                { text: "North America", value:"4" },
                { text: "South America", value:"5" },
                { text: "Antarctica", value:"6" },
                { text: "Australia", value:"7" }
            ];

            var ms = $("#select").kendoMultiSelect({
                dataTextField: "text",
                dataValueField: "value",
                dataSource: data,
                dataBound: onDataBound,
                filtering: onFiltering,
                select: onSelect,
                change: onChange,
                close: onClose,
                open: onOpen
            }).data("kendoMultiSelect");

            var selectItem = function(ms) {
                var dataItem = ms.dataSource.view()[0];
                var value = ms.value();

                if (dataItem) {
                    value.push(dataItem.value);
                  ms.value(value);
                }
            }

            ms.input
            .on("blur", function() {
                selectItem(ms);
            })
            .on("keydown", function(e) {
                if (e.keyCode === 9) {
                selectItem(ms);
              }
            });
        });
    </script>
    <div class="box">
        <h4>Console log</h4>
        <div class="console"></div>
    </div>
    <style>
        .demo-section {
            width: 400px;
        }
    </style>
</div>
```

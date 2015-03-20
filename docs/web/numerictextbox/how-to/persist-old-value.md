---
title: Persist old value
page_title: Persist old value
description: Persist old value
---

# Persist old value

The example below demonstrates how to persist the old value the Kendo UI NumericTextBox widget

#### Example:

```html
<div id="example">
    <div class="demo-section k-header">
        <h4>Set value</h4>
        <input id="numerictextbox"/>
    </div>
    <div class="box">
        <h4>Console log</h4>
        <div class="console"></div>
    </div>
    <script>
        $(document).ready(function() {
            var old = ""; //variable that persists the old value

            function onChange() {
                kendoConsole.log("Change :: " + this.value() + ", old: " + old);
                old = this.value(); //get value of the widget
            }

            $("#numerictextbox").kendoNumericTextBox({
                change: onChange
            });
        });
    </script>
    <style scoped>
        .demo-section {
            width: 400px;
        }
    </style>
</div>
```

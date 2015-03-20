---
title: Date masking using MaskedTextBox
page_title: Date masking using MaskedTextBox
description: Date masking using MaskedTextBox
---

# Date masking using MaskedTextBox

The example below demonstrates how to creating masking functionality for the Kendo UI DatePicker that uses the Kendo UI MaskedTextBox.

#### Example:

```html
    <input id="datepicker1" />
    <input id="datepicker2" />
    <script>
      $(function() {
        $("#datepicker1").kendoDatePicker({
          parseFormats: ["MMddyyyy"]
        });

        //combine MaskedTextBox with DatePicker (officially unsupported)
        var datepicker2 = $("#datepicker2");

        datepicker2.kendoMaskedTextBox({
          mask: "00/00/0000"
        });

        datepicker2.kendoDatePicker();

        datepicker2.closest(".k-datepicker")
        .add(datepicker2)
        .removeClass("k-textbox");
      });
    </script>
```

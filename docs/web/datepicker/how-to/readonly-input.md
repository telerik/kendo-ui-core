---
title: Make input element read-only
page_title: Make input element read-only
description: Make input element read-only
---

# Make input element read-only

The example below demonstrates how to make the input element read-only, thus preventing the user typing

#### Example:

```html
    <div id="example">
        <div class="demo-section k-content">

            <h4>Show e-mails from:</h4>
            <input id="datepicker" value="10/10/2011" style="width: 100%" />

            <h4 style="margin-top: 2em;">Add to archive mail from:</h4>
            <input id="monthpicker" value="November 2011" style="width: 100%" />
            </p>
        </div>
    <script>
        $(document).ready(function() {
            // create DatePicker from input HTML element
            $("#datepicker").kendoDatePicker();

            $("#monthpicker").kendoDatePicker({
                // defines the start view
                start: "year",

                // defines when the calendar should return date
                depth: "year",

                // display month and year in the input
                format: "MMMM yyyy"
            });


            //DISABLE inputs
            $("#datepicker").attr("readonly", true);
            $("#monthpicker").attr("readonly", true);
        });
    </script>
    </div>

```

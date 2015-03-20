---
title: Wire blur event of the filter input
page_title: Wire blur event of the filter input
description: Wire blur event of the filter input
---

# Wire blur event of the filter input

The example below demonstrates how to bind to the blur event of the filter input element.

#### Example:

```html
    <div id="example" role="application">
        <div class="demo-section k-header">
            <h2>Invite Attendees</h2>
            <label for="required">Required</label>
            <select id="required" multiple="multiple" data-placeholder="Select attendees...">
                <option>Steven White</option>
                <option>Nancy King</option>
                <option>Nancy Davolio</option>
                <option>Robert Davolio</option>
                <option>Michael Leverling</option>
                <option>Andrew Callahan</option>
                <option>Michael Suyama</option>
                <option selected>Anne King</option>
                <option>Laura Peacock</option>
                <option>Robert Fuller</option>
                <option>Janet White</option>
                <option>Nancy Leverling</option>
                <option>Robert Buchanan</option>
                <option>Margaret Buchanan</option>
                <option selected>Andrew Fuller</option>
                <option>Anne Davolio</option>
                <option>Andrew Suyama</option>
                <option>Nige Buchanan</option>
                <option>Laura Fuller</option>
            </select>
        </div>
        <style scoped>
            .demo-section {
                width: 350px;
                min-height: 140px;
            }
            .demo-section h2 {
                font-weight: normal;
            }
            .demo-section label {
                display: inline-block;
                margin: 15px 0 5px 0;
            }
            .demo-section select {
                width: 350px;
            }
            #get {
                float: right;
                margin: 25px auto 0;
            }
        </style>
        <script>
            $(document).ready(function() {
                // create MultiSelect from select HTML element
                var required = $("#required").kendoMultiSelect().data("kendoMultiSelect");
              
                //add the autocomplete="off" attribute
              
                required.input.bind("blur", function() {
                                alert(1);
                });
            });
        </script>
    </div>
```

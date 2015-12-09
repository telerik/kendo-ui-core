---
title: Checkbox custom item template
page_title: Multiselect with checkboxes | Kendo UI MultiSelect Widget
description: "Learn how to create a multiselect with checkboxes"
slug: howto_checkbox_custom_item_template
---

# Checkbox custom item template

The example below demonstrates how to create a MultiSelect widget with checkboxes

###### Example

```html
    <div id="example" role="application">
        <div class="demo-section k-header">
            <h2>Invite Attendees</h2>
            <label for="required">Required</label>
            <select id="required" multiple="multiple" data-placeholder="Select attendees...">
                <option selected>Steven White</option>
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
        <style>
            .k-list .k-item {
                position: relative;
            }  
          
          .k-item input {
            position: absolute;
            right: 0
          }
        </style>
        <script>
            $(document).ready(function() {
                var checkInputs = function(elements) {
                  elements.each(function() {
                        var element = $(this);     
                    var input = element.children("input");
                    
                    input.prop("checked", element.hasClass("k-state-selected"));
                  });
                };
                // create MultiSelect from select HTML element
                var required = $("#required").kendoMultiSelect({
                  itemTemplate: "#:data.text# <input type='checkbox'/>",
                  autoClose: false,
                  dataBound: function() {
                    var items = this.ul.find("li");
                    setTimeout(function() {
                      checkInputs(items);
                    });
                  },
                  change: function() {
                    var items = this.ul.find("li");
                    checkInputs(items);
                  }
                }).data("kendoMultiSelect");
            });
        </script>
    </div>
```

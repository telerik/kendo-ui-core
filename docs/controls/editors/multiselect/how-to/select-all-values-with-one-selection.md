---
title: Select All Values with Single Selection
page_title: Select All Values with Single Selection | Kendo UI MultiSelect
description: "Learn how to create a dataItem that holds an all- value that will select all the items in the Kendo UI MultiSelect widget."
slug: howto_select_allvalues_witha_single_selection_multiselect
---

# Select All Values with Single Selection

The example below demonstrates how to create a `dataItem` that holds an `all`-value, which selects all items in the Kendo UI MultiSelect widget.

###### Example

```html
    <div id="example" role="application">
    <div class="demo-section k-header">
      <h2>Invite Attendees</h2>
      <label for="required">Required</label>
      <select id="required" multiple="multiple" data-placeholder="Select attendees...">
        <option>ALL</option>
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
        var required = $("#required").kendoMultiSelect({
          select: function(e) {
            var dataItem = this.dataSource.view()[e.item.index()];
            var values = this.value();

            if (dataItem.value === "ALL") {
              this.value("");
            } else if (values.indexOf("ALL") !== -1) {
              values = $.grep(values, function(value) {
                return value !== "ALL";
              });

              this.value(values);
            }
          }
        }).data("kendoMultiSelect");
      });
    </script>
  </div>
```

The example below demonstrates how to select all items by selecting the `ALL` item.

###### Example

```html
    <div id="example" role="application">
      <div class="demo-section k-header">
        <h2>Invite Attendees</h2>
        <label for="required">Required</label>
        <select id="required" multiple="multiple" data-placeholder="Select attendees...">
          <option>ALL</option>
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
            function contains(value, values) {
                for (var idx = 0; idx < values.length; idx++) {
                if (values[idx] === value) {
                    return true;
                }
              }

              return false;
            }

            var required = $("#required").kendoMultiSelect({
              select: function(e) {
                var dataItemValue = this.dataSource.view()[e.item.index()].value;
                var values = this.value();

                if (dataItemValue !== "ALL" && contains(dataItemValue, values)) {
                    return;
                }

                if (dataItemValue === "ALL") {
                  values = [];
                } else if (values.indexOf("ALL") !== -1) {
                  values = $.grep(values, function(value) {
                    return value !== "ALL";
                  });
                }

                values.push(dataItemValue);
                this.value(values);
                this.trigger("change"); //notify others for the updated values

                e.preventDefault();
              }
            }).data("kendoMultiSelect");
        });
      </script>
    </div>
```

###### Example

## See Also

Other articles on Kendo UI MultiSelect:

* [MultiSelect JavaScript API Reference](/api/javascript/ui/multiselect)
* [How to Bind Values to Template]({% slug howto_bind_values_totemplate_multiselect %})
* [How to Cascade from DropDownList]({% slug howto_cascade_froma_dropdownlist_multiselect %})
* [How to Create Cascading MultiSelects]({% slug howto_create_cascading_widgets_multiselect %})
* [How to Create Checkbox Custom Item Template]({% slug howto_checkbox_custom_item_template_multiselect %})
* [How to Create Scrollable Data Items]({% slug howto_create_scrollable_data_items_multiselect %})
* [How to Filter Values in Widgets Sharing the Same Data]({% slug howto_filter_valuesin_widgetswith_shared_data_multiselect %})
* [How to Preselect Items on Load in AngularJS]({% slug howto_preselect_itemson_load_angular_multiselect %})
* [How to Preselect Items Using MVVM Binding]({% slug howto_preselect_items_byusing_mvvm_binding_multiselect %})
* [How to Reorder Selected Items]({% slug howto_reorder_selected_items_multiselect %})
* [How to Select or Deselect All Items]({% slug howto_select_and_deselect_allitems_multiselect %})
* [How to Select the First Item on TAB]({% slug howto_select_thefirst_itemon_tab_multiselect %})
* [How to Use MultiSelect with Bootstrap Modal Window]({% slug howto_use_multiselect_with_bootstrap_modal_window_multiselect %})
* [How to Wire Blur Event of the Filter Input]({% slug howto_wire_blur_event_ofthe_filtеr_input_multiselect %})

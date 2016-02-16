---
title: Cascading ComboBoxes
page_title: Cascading ComboBoxes | Kendo UI ComboBox
description: "Learn how Kendo UI cascading ComboBox works and helps you handle the most common scenarios with illustrative examples and FAQ."
slug: cascading_kendoui_combobox_widget
position: 5
---

# Cascading ComboBoxes

The [cascading ComboBox](http://demos.telerik.com/kendo-ui/combobox/cascadingcombobox) is a series of two or more ComboBoxes in which each ComboBox is filtered according to the selected options in the previous ComboBox.

## Initialize the ComboBoxes

Initialize a cascading ComboBox in the following way:

###### Example

    <input id="parent" />
    <input id="child" />

    <script type="text/javascript">
         $(function() {
             $("#parent").kendoComboBox({
                dataTextField: "parentName",
                dataValueField: "parentID"
                //Define the combobox's settings
             });

             $("#child").kendoComboBox({
                cascadeFrom: "parent"
                //Define other settings
             });
         });
    </script>

The `child` ComboBox cascades from the `parent` one if the [`cascadeFrom`](/api/javascript/ui/combobox#configuration) option is defined. The `cascadeFrom` option should point to the `parent` ID.

> **Important**  
> The cascading functionality only works when you define the `cascadeFrom` property and initialize the `parent` ComboBox.

The `child` ComboBox takes the following actions during initialization:

- Checks if the `cascadeFrom` property is set. If not, cascading is disabled.
- Tries to find the parent ComboBox object. If the result is null, then the functionality is omitted.
- Listens to any changes of the `parent` value.
- If the `parent` does not have a value, the `child` is disabled. If the `parent` has a value, the child is enabled and filters its data accordingly. This is what the filter options look like:

        field: "parentID",  //the dataValueField of the parent
        operator: "eq",
        value: "" //parent's value

And here are the paramenters of this request:

        filter[logic]: and
        filter[filters][0][field]: parentID
        filter[filters][0][operator]: eq
        filter[filters][0][value]:

> **Important**  
> Please note that the filter operator will always be "eq". The child combobox will use the `dataValueField` option of the parent combobox in order to filter the data.

## MVVM Value Binding

The MVVM [value](/framework/mvvm/bindings/value) binding updates the `model` when a UI element triggers a `change` event. When widgets cascade, however, they will not raise a `change` event and the `model` is not updated. If you need a synced `model`, refer to [this demo](http://dojo.telerik.com/@ggkrustev/aSAlU) which shows how to implement a [custom MVVM binding](/framework/mvvm/bindings/custom) that will update the model accordingly.

For more information about why a widget does not trigger a `change` event, refer to [this Github discussion](http://github.com/telerik/kendo-ui-core/issues/661).

## FAQ

### I am using cascading ComboBoxes with the "autoBind: true" option set and I need to pre-set the selected items. How to do that?

You need to set the value of the ComboBoxes. For instance, you can define it before initialization:

    <input id="parent" value="1" />
    <input id="child" value="36" />

    <script>
       $("#parent").kendoComboBox();

       $("#child").kendoComboBox({
                cascadeFrom: "parent"
       });
    </script>

You also can use the [`value`](/api/javascript/ui/combobox#configuration) option.

### I am using ComboBoxes with load on demand (autoBind: false) and I need to pre-set the selected items. How to do that?

You need to set the [`value`](/api/javascript/ui/combobox#configuration) and [`text`](/api/javascript/ui/combobox#configuration) options:

    <input id="parent" value="1" />
    <input id="child" value="36" />

    <script>
       $(function() {
            $("#parent").kendoComboBox({
               value: "1",
               text: "Parent1",
               dataTextField: "parentName",
               dataValueField: "parentID",
               dataSource: {
                  //dataSource settings
               },
               autoBind: false
            });

            $("#child").kendoComboBox({
               cascadeFrom: "parent",
               value: "36",
               text: "Child36",
               dataTextField: "childName",
               dataValueField: "childID",
               dataSource: {
                  //dataSource settings
               },
               autoBind: false
            });
       });
    </script>

### The serverFiltering is disabled and the child ComboBox does not work. What is the reason for that?

When [`serverFiltering`](/api/framework/datasource#configuration) is disabled, the ComboBox does not make any additional requests to the server. Hence it filters the initial data using the `parent`'s `dataValueField` property. If no items are found, the `child` ComboBox is left empty. If you want to use a `child` ComboBox with disabled server filtering, provide all the neccessary data on the client.

### I cannot get the request parameters on the server. What to do now?

Check the format of the request parameters as displayed at the end of the Initialize Cascading ComboBoxes section of this article. Modify your server code in order to get them correctly. Another way to handle the issue is to pass the ID of the parent ComboBox manually, using the data callback of the DataSource's `Transport.Read` object:

    <input id="child" />

    <script>
      $("#child").kendoComboBox({
        cascadeFrom: "parent",
        dataTextField: "childName",
        dataValueField: "childID",
        dataSource: {
          transport: {
            read: {
              url: "",
              data: function() {
                return { parentID: $("#parent").val() };
              }
            }
          }
        }
      });
    </script>

## See Also

Other articles on Kendo UI ComboBox:

* [How to Implement Cascading with Local Data]({% slug howto_implement_cascading_local_data_combobox %})
* [How to Detect When All Widgets Are Bound]({% slug howto_detect_when_widgets_bound_combobox %})
* [How to Bypass Boundary Detection]({% slug howto_bypass_boudary_detection_combobox %})
* [How to Make Visible Input Readonly]({% slug howto_make_visible_inputs_readonly_combobox %})
* [How to Search for Items by Dragging to Input]({% slug howto_search_items_dragging_toinput_combobox %})
* [How to Underline Matched Search]({% slug howto_underline_matched_search_combobox %})
* [How to Clear Filter on Open]({% slug howto_clear_filter_open_combobox %})
* [ComboBox JavaScript API Reference](/api/javascript/ui/combobox)

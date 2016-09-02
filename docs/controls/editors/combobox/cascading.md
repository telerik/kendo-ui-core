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

Initialize a cascading ComboBox as demonstrated in the example below.

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

The child ComboBox cascades from the parent one if the [`cascadeFrom`](/api/javascript/ui/combobox#configuration) option is defined. The `cascadeFrom` option must point to the parent ID.

> **Important**  
>
> The cascading functionality only works when you define the `cascadeFrom` property and initialize the parent ComboBox.

The child ComboBox takes the following actions during initialization:

- Checks if the `cascadeFrom` property is set. If not, cascading is disabled.
- Tries to find the parent ComboBox object. If the result is null, then the functionality is omitted.
- Listens to any changes of the parent value.
- If the parent does not have a value, the child is disabled. If the parent has a value, the child is enabled and filters its data accordingly. This is what the filter options look like:

        field: "parentID",  //the dataValueField of the parent
        operator: "eq",
        value: "" //parent's value

And here are the parameters of this request:

        filter[logic]: and
        filter[filters][0][field]: parentID
        filter[filters][0][operator]: eq
        filter[filters][0][value]:

> **Important**  
>
> The filter operator is always `"eq"`. To filter the data, the child ComboBox uses the `dataValueField` option of the parent ComboBox.

## MVVM Value Binding

The MVVM [value]({% slug valuebinding_mvvm_kendoui %}) binding updates the `model` when a UI element triggers a `change` event. When widgets cascade, however, they do not raise a `change` event and the `model` is not updated.

If you need a synced `model`, refer to [this demo](http://dojo.telerik.com/@ggkrustev/aSAlU) which shows how to implement a [custom MVVM binding]({% slug custombinding_mvvm_kendoui %}) that will update the model accordingly.

For more information on why a widget does not trigger a `change` event, refer to [this GitHub discussion](http://github.com/telerik/kendo-ui-core/issues/661).

## FAQ

### How to preset the selected items when using cascading ComboBoxes with autoBind: true?

Set the value of the ComboBoxes&mdash;define it before initialization, as demonstrated in the example below.

###### Example

    <input id="parent" value="1" />
    <input id="child" value="36" />

    <script>
       $("#parent").kendoComboBox();

       $("#child").kendoComboBox({
                cascadeFrom: "parent"
       });
    </script>

You also can use the [`value`](/api/javascript/ui/combobox#configuration) option.

### How to preset the selected items when using cascading ComboBoxes with load on demand (autoBind: false)?

Set the [`value`](/api/javascript/ui/combobox#configuration) and [`text`](/api/javascript/ui/combobox#configuration) options, as demonstrated in the example below.

###### Example

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

### Why the serverFiltering is disabled and the child ComboBox does not work?

When [`serverFiltering`](/api/framework/datasource#configuration) is disabled, the ComboBox does not make any additional requests to the server. Hence, it filters the initial data using the parent's `dataValueField` property. If no items are found, the child ComboBox is left empty.

To use a child ComboBox with disabled server filtering, provide all the necessary data on the client.

### What to do when I cannot get the request parameters on the server?

Check the format of the request parameters as displayed at the end of the **Initialize Cascading ComboBoxes** section of this article. Modify your server code to get them correctly.

Another way to handle the issue is to pass the ID of the parent ComboBox manually, using the data callback of the DataSource's `Transport.Read` object, as demonstrated in the example below.

###### Example

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

Other articles on the Kendo UI ComboBox:

* [How to Implement Cascading with Local Data]({% slug howto_implement_cascading_local_data_combobox %})
* [How to Search for Items by Dragging to Input]({% slug howto_search_items_dragging_toinput_combobox %})
* [How to Underline Matched Search]({% slug howto_underline_matched_search_combobox %})
* [How to Clear Filter on Open]({% slug howto_clear_filter_open_combobox %})
* [ComboBox JavaScript API Reference](/api/javascript/ui/combobox)

---
title: Cascading ComboBoxes
page_title: jQuery ComboBox Documentation | Cascading ComboBoxes
description: "Get started with the jQuery ComboBox by Kendo UI and implement cascading ComboBoxes."
slug: cascading_kendoui_combobox_widget
position: 8
---

# Cascading ComboBoxes

The [cascading ComboBox](https://demos.telerik.com/kendo-ui/combobox/cascadingcombobox) is a series of two or more ComboBoxes in which each ComboBox is filtered according to the selected options in the previous ComboBox.

## Basic Configuration

The child ComboBox cascades from the parent one if the [`cascadeFrom`](/api/javascript/ui/combobox#configuration) option is defined. The `cascadeFrom` option has to point to the parent ID.

The child ComboBox takes the following actions during initialization:
- Checks if the `cascadeFrom` property is set. If not, cascading is disabled.
- Tries to find the parent ComboBox object. If the result is null, then the functionality is omitted.
- Listens to any changes of the parent value.
- If the parent does not have a value, the child is disabled. If the parent has a value, the child is enabled and filters its data accordingly. The filter options are similar to the ones demonstrated in the following example.

        field: "parentID",  // The dataValueField of the parent.
        operator: "eq",
        value: "" // The parent value.

The following example demonstrates the parameters of this request.

        filter[logic]: and
        filter[filters][0][field]: parentID
        filter[filters][0][operator]: eq
        filter[filters][0][value]:

> * The cascading functionality works only when you define the `cascadeFrom` property and initialize the parent ComboBox.
> * The filter operator is always `"eq"`. To filter the data, the child ComboBox uses the `dataValueField` option of the parent ComboBox.

The following example demonstrates how to initialize a cascading ComboBox.

```dojo
    <input id="parent" />
    <input id="child" />

    <script type="text/javascript">
         $(function() {
             $("#parent").kendoComboBox({
               dataTextField: "parentName",
               dataValueField: "parentId",
               dataSource: [
                  { parentName: "Parent1", parentId: 1 },
                  { parentName: "Parent2", parentId: 2 }
               ]
            });

            $("#child").kendoComboBox({
               cascadeFrom: "parent",
               dataTextField: "childName",
               dataValueField: "childId",
               dataSource: [
                  { childName: "Child1", childId: 1, parentId: 1 },
                  { childName: "Child2", childId: 2, parentId: 2 },
                  { childName: "Child3", childId: 3, parentId: 1 },
                  { childName: "Child4", childId: 4, parentId: 2 }
               ]
            });
         });
    </script>
```

## MVVM Value Binding

The MVVM [value]({% slug valuebinding_mvvm_kendoui %}) binding updates the `model` when a UI element triggers a `change` event. When widgets cascade, however, they do not raise a `change` event and the `model` is not updated.

* For more information on using a synced `model` and implementing a [custom MVVM binding]({% slug custombinding_mvvm_kendoui %}) that will update the model accordingly, refer to [this demo](https://dojo.telerik.com/@ggkrustev/aSAlU).
* For more information on the reason a widget does not trigger a `change` event, refer to [this GitHub discussion](https://github.com/telerik/kendo-ui-core/issues/661).

## FAQ

This section lists the answers to the most frequently asked questions (FAQs) about the implementation of cascading Kendo UI ComboBoxes.

### How can I preset the selected items when I use cascading ComboBoxes with autoBind: true?

Set the value of the ComboBoxes&mdash;define it before initialization as demonstrated in the following example. You also can use the [`value`](/api/javascript/ui/combobox#configuration) option.

```dojo
    <input id="parent" value="2" />
    <input id="child" value="4" />

    <script>
       $("#parent").kendoComboBox({
         dataTextField: "parentName",
         dataValueField: "parentId",
         dataSource: [
            { parentName: "Parent1", parentId: 1 },
            { parentName: "Parent2", parentId: 2 }
         ]
      });

      $("#child").kendoComboBox({
         cascadeFrom: "parent",
         dataTextField: "childName",
         dataValueField: "childId",
         dataSource: [
            { childName: "Child1", childId: 1, parentId: 1 },
            { childName: "Child2", childId: 2, parentId: 2 },
            { childName: "Child3", childId: 3, parentId: 1 },
            { childName: "Child4", childId: 4, parentId: 2 }
         ]
      });
    </script>
```

### How can I preset the selected items when I use cascading ComboBoxes with load on demand?

Set the [`value`](/api/javascript/ui/combobox#configuration) and [`text`](/api/javascript/ui/combobox#configuration) options.

```dojo
    <input id="parent" value="2" />
    <input id="child" value="4" />

    <script>
       $(function() {
            $("#parent").kendoComboBox({
               value:"2",
               text:"Parent2",
               dataTextField: "parentName",
               dataValueField: "parentId",
               dataSource: [
                  { parentName: "Parent1", parentId: 1 },
                  { parentName: "Parent2", parentId: 2 }
               ],
               autoBind:false
            });

            $("#child").kendoComboBox({
               value:"4",
               text:"Child4",
               cascadeFrom: "parent",
               dataTextField: "childName",
               dataValueField: "childId",
               dataSource: [
                  { childName: "Child1", childId: 1, parentId: 1 },
                  { childName: "Child2", childId: 2, parentId: 2 },
                  { childName: "Child3", childId: 3, parentId: 1 },
                  { childName: "Child4", childId: 4, parentId: 2 }
               ],
               autoBind:false
            });
       });
    </script>
```

### Why server filtering is disabled and the child ComboBox does not work?

When [`serverFiltering`](/api/framework/datasource#configuration) is disabled, the ComboBox does not make any additional requests to the server. As a result, it filters the initial data by using the `dataValueField` property of the parent. If it does not find any items, the child ComboBox remains empty. To use a child ComboBox with disabled server filtering, provide all the necessary data on the client.

### What to do when I cannot get the request parameters on the server?

Check the format of the request parameters as displayed in the [**Initialize Cascading ComboBoxes**](#initialize-cascading-comboboxes) section. To get them correctly, modify your server code. Another way to handle the issue is to pass the ID of the parent ComboBox manually by using the data callback of the DataSource's `Transport.Read` object.

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

* [JavaScript API Reference of the ComboBox](/api/javascript/ui/combobox)

---
title: Getting Started
page_title: jQuery MultiColumnComboBox Documentation - Getting Started with the MultiColumnComboBox
description: "Get started with the jQuery MultiColumnComboBox by Kendo UI and learn how to create, initialize, and enable the component."
slug: getting_started_kendoui_multicolumncombobox_component
position: 2
---

# Getting Started with the MultiColumnComboBox 

This guide demonstrates how to get up and running with the Kendo UI for jQuery MultiColumnComboBox .

After the completion of this guide, you will achieve the following end result:

```dojo
    <input id="comboBox" />

    <script>
    $(document).ready(function() {
        $("#comboBox").kendoMultiColumnComboBox({
            index: 0,
            dataTextField: "ProductName",
            dataValueField: "ProductID",
            columns: [
                    { field: "ProductName", title: "ProductName" },
                    { field: "ProductID", title: "ProductID" }
            ],
            dataSource: {
                transport: {
                    read: {
                        dataType: "jsonp",
                        url: "https://demos.telerik.com/kendo-ui/service/Products"
                    }
                }
            }
        });
    });
    </script>
```

## 1. Create an Input Element

First, create an `<input>` element on the page that will be used to initialize the component. The content of the `<input>` will be used as content for the MultiColumnComboBox.

```html
    <input id="comboBox" />
```

## 2. Initialize the MultiColumnComboBox

In this step, you will initialize the MultiColumnComboBox from the `<input>` element.

```dojo
    <input id="comboBox" />

    <script>
    $(document).ready(function() {
        $("#comboBox").kendoMultiColumnComboBox();
    </script>
```

## 3. Specify the Data Source

Here, you will specify a [`dataSource`](/api/javascript/ui/autocomplete/configuration/datasource) instance and fetch the remote data.

```dojo
    <input id="comboBox" />

    <script>
    $(document).ready(function() {
        $("#comboBox").kendoMultiColumnComboBox({
            dataSource: {
                transport: {
                    read: {
                        dataType: "jsonp",
                        url: "https://demos.telerik.com/kendo-ui/service/Products"
                    }
                }
            }
        });
    });
    </script>
```

## 4. Define the Columns Rendered in the Table

In this step you will define the columns rendered in the table of the MultiColumnComboBox.

```dojo
    <input id="comboBox" />

    <script>
    $(document).ready(function() {
        $("#comboBox").kendoMultiColumnComboBox({
            columns: [
                    { field: "ProductName", title: "ProductName" },
                    { field: "ProductID", title: "ProductID" }
            ],
            dataSource: {
                transport: {
                    read: {
                        dataType: "jsonp",
                        url: "https://demos.telerik.com/kendo-ui/service/Products"
                    }
                }
            }
        });
    });
    </script>
```

## 5. Define the Data Value Field and the Data Text Field

The [`dataValueField`](/api/javascript/ui/multicolumncombobox/configuration/datavaluefield) specifies the field of the data item that provides the value for the component and the [`dataTextField`](/api/javascript/ui/multicolumncombobox/configuration/datatextfield) sets the field of the data item that provides the text content of the list items.

```dojo
    <input id="comboBox" />

    <script>
    $(document).ready(function() {
        $("#comboBox").kendoMultiColumnComboBox({
            index: 0, // the index of the initially selected item
            dataTextField: "ProductName",
            dataValueField: "ProductID",
            columns: [
                    { field: "ProductName", title: "ProductName" },
                    { field: "ProductID", title: "ProductID" }
            ],
            dataSource: {
                transport: {
                    read: {
                        dataType: "jsonp",
                        url: "https://demos.telerik.com/kendo-ui/service/Products"
                    }
                }
            }
        });
    });
    </script>
```

## Next Steps

* [Referencing Existing Component Instances]({% slug widget_methodsand_events_kendoui_installation %})
* [Demo Page for the MultiColumnComboBox](https://demos.telerik.com/kendo-ui/multicolumncombobox/index)

## See Also 

* [JavaScript API Reference of the MultiColumnComboBox](/api/javascript/ui/multicolumncombobox)
* [Knowledge Base Section](/knowledge-base)

<script>
  window.onload = function() {
    document.getElementsByClassName("btn-run")[0].click();
  }
</script>

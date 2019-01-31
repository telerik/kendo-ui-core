---
title: Overview
page_title: Overview | Kendo UI DropDownTree
description: "Learn how to initialize the Kendo UI DropDownTree widget, configure its options, and customize its content by using templates."
slug: overview_kendoui_dropdowntree_widget
position: 1
---

# DropDownTree Overview

As of the Kendo UI R2 2018, the [DropDownTree](http://demos.telerik.com/kendo-ui/dropdowntree/index) is available in the Kendo UI for jQuery suite.

The DropDownTree widget represents an editor of hierarchical data, rendered in a tree-like structure, which provides multiple selection option and custom nodes.

## Getting Started

### Initialize the DropDownTree

You can initialize the Kendo UI DropDownTree widget on top of an `input` element.

> **Important**
> * Verify that you create the DropDownTree within a `$(document).ready()` statement because the widget has to be initialized after the DOM is fully loaded.
> * The widget copies any styles and CSS classes from the `input` element to the `wrapper` element and visible input.

#### Bind to Local Data Arrays

To initialize the DropDownTree by binding the widget to a local data array, use the [Data Source component]({% slug overview_kendoui_datasourcecomponent %}). It is an abstraction for local and remote data. Local arrays are appropriate for limited value options.

The following example demonstrates how to initialize the DropDownTree by using this approach.

###### Example

    <input id="dropdowntree">

    <script>
        $(document).ready(function() {
            $("#dropdowntree").kendoDropDownTree({
                dataSource: [
                {
                    text: "Item 1",
                    items: [
                        { text: "Item 1.1" },
                        { text: "Item 1.2" }
                    ]
                },
                { text: "Item 2" }
                ]
            });
        });
    </script>

#### Bind to Remote Data Services

The following example demonstrates how to create a DropDownTree and bind it to a remote HierarchicalDataSource.

###### Example

    <input id="dropdowntree"></input>

    <script>
        var serviceRoot = "https://demos.telerik.com/kendo-ui/service";
        var myDataSource = new kendo.data.HierarchicalDataSource({
            transport: {
                read: {
                url: serviceRoot + "/Employees",
                dataType: "jsonp"
                }
            },
            schema: {
                model: {
                id: "EmployeeId",
                hasChildren: "HasEmployees"
                }
            }
        });

        $("#dropdowntree").kendoDropDownTree({
            dataSource: myDataSource,
            dataTextField: "FullName"
        });
    </script>

## Configuration

### Checkbox Support

Once the `checkboxes` option is set to `true`, the DropDownTree provides the multiple selection functionality by rending each checked item as a `tag` in its input. You can remove the tags (items) through their **X** button which will automatically uncheck them in the drop-down.

Along with the standard checkbox support, the DropDownTree allows you to manage the checked state of all nodes. To enable this functionality, set the `CheckAll` option to `true`.

###### Example

    <input id="dropdowntree"></input>

    <script>
        var serviceRoot = "https://demos.telerik.com/kendo-ui/service";
        var myDataSource = new kendo.data.HierarchicalDataSource({
            transport: {
                read: {
                url: serviceRoot + "/Employees",
                dataType: "jsonp"
                }
            },
            schema: {
                model: {
                id: "EmployeeId",
                hasChildren: "HasEmployees"
                }
            }
        });

        $("#dropdowntree").kendoDropDownTree({
            checkboxes: true,
            checkAll: true,
            dataSource: myDataSource,
            dataTextField: "FullName"
        });
    </script>

### Filtering

The built-in filtering functionality enables the user to filter the displayed DropDownTree items by their text value.

By default, filtering is disabled and can be performed over `string` values only&mdash;that is, either the widget data has to be an array of strings or configured in the `dataTextField` option over the field.

The DropDownTree supports the following filter values:

* `startswith`
* `endswith`
* `contains`

###### Example

    <input id="dropdowntree"></input>

    <script>
        var serviceRoot = "https://demos.telerik.com/kendo-ui/service";
        var myDataSource = new kendo.data.HierarchicalDataSource({
            transport: {
                read: {
                url: serviceRoot + "/Employees",
                dataType: "jsonp"
                }
            },
            schema: {
                model: {
                id: "EmployeeId",
                hasChildren: "HasEmployees"
                }
            }
        });

        $("#dropdowntree").kendoDropDownTree({
            filter: "startswith",
            dataSource: myDataSource,
            dataTextField: "FullName"
        });
    </script>


### Change the List Width

To customize the width of a drop-down list and change its dimensions, use the jQuery `width()` method.

###### Example

    <input id="dropdowntree">

    <script>
    $(document).ready(function() {
        var dropdowntree = $("#dropdowntree").kendoDropDownTree({
        dataSource: [
            {
            text: "Item 1",
            items: [
                { text: "Item 1.1" },
                { text: "Item 1.2" }
            ]
            },
            { text: "Item 2" }
        ]
        }).data("kendoDropDownTree");

        dropdowntree.list.width(400);
    });
    </script>



### Adjust the Popup Width

You can let the popup element automatically adjust its width according to the length of the item label it displays. When the `autoWidth` option is set to `true`, the popup shows the content on one line and does not wrap it up.

###### Example

    <input id="dropdowntree">

    <script>
    $(document).ready(function() {
        var dropdowntree = $("#dropdowntree").kendoDropDownTree({
        autoWidth: true,
        dataSource: [
            {
            text: "Item 1",
            items: [
                { text: "Item 1.1" },
                { text: "Item 1.2" }
            ]
            },
            { text: "Item 2" }
        ]
        }).data("kendoDropDownTree");
    });
    </script>

### Item Properties

When you bind the DropDownTree through the `dataSource` configuration option, each item can acquire the properties that the following example demnstrates.

###### Example

    var item = {
        text: "Item text",

        value: "value",

        enabled: true,

        // If specified, renders the item as a link (<a href=""></a>)
        url: "/",

        // Renders a <img class="k-image" src="/images/icon.png" />
        imageUrl: "/images/icon.png",

        // Renders a <span class="k-sprite icon save" />
        spriteCssClass: "icon save",

        // Specifies whether the node text will be encoded, or not
        //(useful when rendering node-specific HTML)
        encoded: false,

        // Specifies whether the item is initially expanded
        // (applicable when the item has child nodes)
        expanded: true,

        // Specifies whether the item checkbox is initially checked
        // (applicable for items with checkboxes using the default checkbox template)
        checked: true,

        // Specifies whether the item is initially selected
        selected: true,

        // Indicates the sub-items of the item
        items: [
            { text: "Subitem text" }
        ]
    };

You can configure the `text`, `imageUrl`, `spriteCssClass`, and `url` fields through the [`datatextfield`](/api/javascript/ui/dropdowntree#configuration-dataTextField), [`dataimageurlfield`](/api/javascript/ui/dropdowntree#configuration-dataImageUrlField), [`dataspritecssclassfield`](/api/javascript/ui/dropdowntree#configuration-dataSpriteCssClassField), and [`dataurlfield`](/api/javascript/ui/dropdowntree#configuration-dataUrlField) options respectively.

## Templates

The DropDownTree uses [Kendo UI templates](/framework/templates/overview) to provide full control over the way an item, a selected value, or a popup header is rendered.

For more information on the capabilities and syntax of the templates, refer to the [documentation]({% slug overview_kendoui_templatescomponent %}).

### Node Template

The node template manages the way the items in the dropdown are rendered.

###### Example

    <input id="dropdowntree">
    <script id="treeview-template" type="text/kendo-ui-template">
            #: item.text #
            <a class='k-icon k-i-close-outline' href='\#'></a>
    </script>
    <script>
        $(document).ready(function() {
            $("#dropdowntree").kendoDropDownTree({
                template: kendo.template($("#treeview-template").html()),
                dataSource: [
                {
                    text: "Item 1",
                    items: [
                        { text: "Item 1.1" },
                        { text: "Item 1.2" }
                    ]
                },
                { text: "Item 2" }
                ]
            });
        });
    </script>

### Value Template

The value template manages the way the selected value of a DropDownTree is rendered.

> **Important**
>
> Value templates must consist of `inline` HTML elements only.

###### Example

    <input id="dropdowntree"></input>
    <!-- Template -->
    <script id="valueTemplate" type="text/x-kendo-template">
        ContactName: #:data.FullName#
    </script>

    <script>
        var serviceRoot = "https://demos.telerik.com/kendo-ui/service";
        var myDataSource = new kendo.data.HierarchicalDataSource({
            transport: {
                read: {
                url: serviceRoot + "/Employees",
                dataType: "jsonp"
                }
            },
            schema: {
                model: {
                id: "EmployeeId",
                hasChildren: "HasEmployees"
                }
            }
        });
        $("#dropdowntree").kendoDropDownTree({
            valueTemplate: $("#valueTemplate").html(),
            dataSource: myDataSource,
            dataTextField: "FullName"
        });
    </script>

### Header Template

The header template manages the way the popup header of a DropDownTree is rendered.

###### Example

    <input id="dropdowntree">
    <script id="headerTemplate" type="text/x-kendo-template">
        <strong>Header</strong>
    </script>
    <script>
        $(document).ready(function() {
            $("#dropdowntree").kendoDropDownTree({
                headerTemplate: $("#headerTemplate").html(),
                dataSource: [
                {
                    text: "Item 1",
                    items: [
                        { text: "Item 1.1" },
                        { text: "Item 1.2" }
                    ]
                },
                { text: "Item 2" }
                ]
            });
        });
    </script>

### Footer Template

The footer template manages the way the popup footer of a DropDownTree is rendered. The footer is re-rendered on every change of the Data Source. The context of the template is the widget itself.

###### Example

    <input id="dropdowntree"></input>
    <!-- Template -->
    <script id="footerTemplate" type="text/x-kendo-template">
    <strong>this is footer</strong>
    </script>

    <script>
    var serviceRoot = "https://demos.telerik.com/kendo-ui/service";

    $("#dropdowntree").kendoDropDownTree({
        footerTemplate: $("#footerTemplate").html(),
        dataSource: {
        transport: {
            read: {
            dataType: "jsonp",
            url: "https://demos.telerik.com/kendo-ui/service/Employees"
            }
        },
        schema: {
            model: {
            id: "EmployeeId",
            hasChildren: "HasEmployees"
            }
        }
        },
        dataTextField: "FullName"
    });
    </script>

### No-Data Template

The DropDownTree widget displays `noDataTemplate` in the popup when the data source is empty.

> **Important**
>
> When the `noDataTemplate` option is defined, the widget always opens the popup element.

###### Example

    <input id="dropdowntree"></input>
    <!-- Template -->
    <script id="noDataTemplate" type="text/x-kendo-template">
        <strong>No Data!</strong>
    </script>

    <script>
    var serviceRoot = "https://demos.telerik.com/kendo-ui/service";

    $("#dropdowntree").kendoDropDownTree({
        noDataTemplate: $("#noDataTemplate").html(),
        filter: "contains",
        dataSource: {
        transport: {
            read: {
            dataType: "jsonp",
            url: "https://demos.telerik.com/kendo-ui/service/Employees"
            }
        },
        schema: {
            model: {
            id: "EmployeeId",
            hasChildren: "HasEmployees"
            }
        }
        },
        dataTextField: "FullName"
    });
    </script>


## See Also

* [DropDownTree JavaScript API Reference](/api/javascript/ui/dropdowntree)
* [Binding To Flat Data]({% slug bindtoflattables_dropdowntree_widget %})

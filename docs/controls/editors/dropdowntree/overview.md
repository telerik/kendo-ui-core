---
title: Overview
page_title: Overview | Kendo UI DropDownTree
description: "Learn how to initialize the Kendo UI DropDownTree widget, configure its options and customize templates."
slug: overview_kendoui_dropdowntree_widget
position: 1
---

# DropDownTree Overview


As of **R2 2018**, the [DropDownTree widget](http://demos.telerik.com/kendo-ui/dropdowntree/index) is available in the KendoUI suite. The component is an editor of hierarchical data, rendered in a tree like structure, which allows multiple selection, templated nodes


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

### Checkboxes Support

Once the `checkboxes` option is set to `true`, the DropDownTree widget provides the multiple selection functionality, by rending each checked item as a `tag` in its input. The tags (items) can be removed through their X button and will be automatically unckecked in the dropdown.

Along with the standard checkbox support, the DropDownTree provides the possibility to manage all nodes checked state. In order to enable this functionality, you should set the `CheckAll` option to `true`.

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

The widget provides an inbuilt filtering functionality. Filtration is turned off by default, and can be performed over `string` values only (either the widget's data has to be an array of strings, or over the field, configured in the dataTextField option). The supported filter values are `startswith`, `endswith` and `contains`.

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

When binding the DropDownTree through the `dataSource` configuration option, each item can acquire the properties demonstrated in the example below.

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

        // Specifies whether the node text should be encoded, or not
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

You can configure `text`, `imageUrl`, `spriteCssClass`, and `url` fields through the [`datatextfield`](/api/javascript/ui/dropdowntree#configuration-dataTextField), [`dataimageurlfield`](/api/javascript/ui/dropdowntree#configuration-dataImageUrlField), [`dataspritecssclassfield`](/api/javascript/ui/dropdowntree#configuration-dataSpriteCssClassField), and [`dataurlfield`](/api/javascript/ui/dropdowntree#configuration-dataUrlField) options respectively.

## Templates

The DropDownTree uses [Kendo UI templates](/framework/templates/overview) to provide full control over the way an item, a selected value, or a pop-up header is rendered.

For more information on the capabilities and syntax of the templates, refer to the [documentation]({% slug overview_kendoui_templatescomponent %}).

### Template

The node template manages the way the items in the dropdown are rendered.

The following example demonstrates how to define a template.

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

The following example demonstrates how to define a value template.

> **Important**
>
> Value templates must consist of inline HTML elements only.

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

The header template manages the way the pop-up header of a DropDownTree is rendered.

The following example demonstrates how to define a header template.

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

The footer template manages the way the pop-up footer of a DropDownTree is rendered. The footer is re-rendered on every change of the Data Source. The context of the template is the widget itself.

The following example demonstrates how to define a footer template.

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

The following example demonstrates how to define a `noDataTemplate` template.

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

Other articles on the Kendo UI DropDownTree:

* [DropDownTree JavaScript API Reference](/api/javascript/ui/dropdowntree)
* [Binding To Flat Data]({% slug bindtoflattables_dropdowntree_widget %})
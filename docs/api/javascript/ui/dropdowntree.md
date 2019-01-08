---
title: DropDownTree
page_title: Configuration, methods and events of Kendo UI DropDownTree
res_type: api
component: dropdowntree
---

# kendo.ui.DropDownTree

Represents the Kendo UI DropDownTree widget. Inherits from [Widget](/api/javascript/ui/widget).

## Configuration

### animation `Boolean|Object`

Configures the opening and closing animations of the suggestion popup. Setting the `animation` option to `false` will disable the opening and closing animations. As a result, the suggestion popup will open and close instantly.

`animation:true` is not a valid configuration.

#### Example - disable open and close animations

    <input id="dropdowntree" />

    <script>
        $("#dropdowntree").kendoDropDownTree({
            dataSource: [{ text: "item1", value: 1 }, { text: "item2", value: 2 }],
            animation: false
        });
    </script>

#### Example - configure the animation

    <input id="dropdowntree"/>

    <script>
    $("#dropdowntree").kendoDropDownTree({
      dataSource: [{ text: "item1", value: 1 }, { text: "item2", value: 2 }],
      animation: {
       close: {
         effects: "fadeOut zoom:out",
         duration: 300
       },
       open: {
         effects: "fadeIn zoom:in",
         duration: 300
       }
      }
    });
    </script>

### animation.close `Object`

#### Example - configure the close animation

    <input id="dropdowntree"/>

    <script>
    $("#dropdowntree").kendoDropDownTree({
      dataSource: [{ text: "item1", value: 1 }, { text: "item2", value: 2 }],
      animation: {
       close: {
         effects: "zoom:out",
         duration: 300
       }
      }
    });
    </script>

### animation.close.effects `String`

The effect(s) to use when playing the close animation. Multiple effects should be separated with a space.

[Complete list of available animations](/api/javascript/effects/common)

### animation.close.duration `Number` *(default: 100)*

The duration of the close animation in milliseconds.

### animation.open `Object`

The animation played when the suggestion popup is opened.

#### Example - configure the open animation

    <input id="dropdowntree"/>

    <script>
    $("#dropdowntree").kendoDropDownTree({
      dataSource: [{ text: "item1", value: 1 }, { text: "item2", value: 2 }],
      animation: {
       open: {
         effects: "zoom:in",
         duration: 300
       }
      }
    });
    </script>

### animation.open.effects `String`

The effect(s) to use when playing the open animation. Multiple effects should be separated with a space.

[Complete list of available animations](/api/javascript/effects/common)

### animation.open.duration `Number` *(default: 200)*

The duration of the open animation in milliseconds.

### autoBind `Boolean`*(default: true)*

Controls whether to bind the widget to the data source on initialization.

#### Example

    <input id="dropdowntree"/>

    <script>
    $("#dropdowntree").kendoDropDownTree({
        dataSource: [{ text: "item1", value: 1 }, { text: "item2", value: 2 }],
        autoBind: false
    });
    </script>

### autoClose `Boolean`*(default: true)*

Controls whether to close the popup when item is selected or checked.

#### Example

    <input id="dropdowntree"/>

    <script>
    $("#dropdowntree").kendoDropDownTree({
        dataSource: [{ text: "item1", value: 1 }, { text: "item2", value: 2 }],
        autoClose: false
    });
    </script>

### autoWidth `Boolean`

If set to `true`, the widget automatically adjusts the width of the popup element and does not wrap up the item label.

#### Example - enable autoWidth

    <input id="dropdowntree" style="width: 100px;">
    <script>
    $("#dropdowntree").kendoDropDownTree({
      dataSource: [{ text: "Short item", value: 1 }, { text: "An item with really, really long text", value: 2 }],
      autoWidth: true
    });
    </script>

### checkAll `Boolean` *(default: false)*

When this options is set to `true` and [checkboxes](/api/javascript/ui/dropdowntree/configuration/checkboxes) are enabled, a tristate checkbox appears above the embedded treeview. Clicking that checkbox will check or uncheck all the loaded enabled items of the treeview.

> Note: when 'checkAll' is set to 'true' it is recommended that [loadOnDemand](/api/javascript/ui/dropdowntree/configuration/loadondemand) is set to 'true' because otherwise checkAll may not interact with all subnodes of the treeview.

#### Example - disable the clear button

    <input id="dropdowntree"/>

    <script>
    $("#dropdowntree").kendoDropDownTree({
        dataSource: [{ text: "item1", value: 1 }, { text: "item2", value: 2 }],
        checkboxes: true,
        checkAll: false
    });
    </script>

### checkAllTemplate `String|Function`

The [template](/api/javascript/kendo/methods/template) used to render the checkAll label. By default, the widget displays only a span element with text "Check all".

    <input id="dropdowntree" />

    <script>
        $("#dropdowntree").kendoDropDownTree({
            dataSource: [{ text: "item1", value: 1 }, { text: "item2", value: 2 }],
            checkboxes: true,
            checkAllTemplate: "<h2>check all</h2>",
            checkAll: true
        });
    </script>

### checkboxes `Boolean|Object`

If `true` or an object, renders checkboxes beside each node. In this case the widget [value](/api/javascript/ui/dropdowntree/configuration/value) should be an array.

#### Example - show node checkboxes

    <input id="dropdowntree" />

    <script>
        $("#dropdowntree").kendoDropDownTree({
            dataSource: [
                {
                    text: "foo", items: [
                        { text: "bar" }
                    ]
                }
            ],
            checkboxes: true
        });
    </script>

### checkboxes.checkChildren `Boolean`*(default: false)*

Indicates whether checkboxes of child items should get checked when the checkbox of a parent item is checked. This
also enables tri-state checkboxes with an indeterminate state.

> Note: when [filter](/api/javascript/ui/dropdowntree/configuration/filter) is enabled 'checkboxes.checkChildren' property is reset to 'false' because enabling both at the same time could lead to ambiguous scenarios. Currently this scenario not supported by the widget.

#### Example - enable tri-state checkboxes and propagate checked state to children

    <input id="dropdowntree" />

    <script>
        $("#dropdowntree").kendoDropDownTree({
            dataSource: [
                {
                    text: "foo", items: [
                        { text: "bar" },
                        { text: "bar1" }
                    ]
                }
            ],
            checkboxes: {
                checkChildren: true
            }
        });
    </script>

### checkboxes.name `String`

Sets the name attribute of the checkbox inputs. That name will be posted to the server.

#### Example

    <input id="dropdowntree" />

    <script>
        $("#dropdowntree").kendoDropDownTree({
            dataSource: [
                {
                    text: "foo", items: [
                        { text: "bar" },
                        { text: "bar1" }
                    ]
                }
            ],
            checkboxes: {
                name: "checkedItems[]"
            }
        });
    </script>

### checkboxes.template `String|Function`

The [template](/api/javascript/kendo/methods/template) which renders the checkboxes. Can be used to allow posting of
additional information along the TreeView checkboxes.

The fields which can be used in the template are:

* item - the data item of the given node
* treeview - the TreeView options

#### Example - specify a different name for each checkbox, bound to the item id

    <input id="dropdowntree" />

    <script>
        $("#dropdowntree").kendoDropDownTree({
            dataSource: [
                {
                    id: 1, text: "foo", items: [
                        { id: 2, text: "bar" },
                        { id: 3, text: "bar1" }
                    ]
                }
            ],
            checkboxes: {
                template: "<input type='checkbox' name='checkedFiles[#= item.id #]' value='true' />"
            }
        });
    </script>

### clearButton `Boolean` *(default: true)*

Unless this option is set to `false`, a button will appear when hovering the widget. Clicking that button will reset the widget's value and will trigger the change event.

#### Example - disable the clear button

    <input id="dropdowntree"/>

    <script>
    $("#dropdowntree").kendoDropDownTree({
        dataSource: [{ text: "item1", value: 1 }, { text: "item2", value: 2 }],
        clearButton: false
    });
    </script>

### dataImageUrlField `String` *(default: null)*

Sets the field of the data item that provides the image URL of the DropDownTree nodes.

#### Example - specify custom image URL field

    <input id="dropdowntree" style="width: 400px;">
    <script>
        var items = [
            { text: "Mail", image: "https://demos.telerik.com/kendo-ui/content/web/treeview/mail.png" },
            { text: "Search", image: "https://demos.telerik.com/kendo-ui/content/web/treeview/search.png" }
        ];
        $("#dropdowntree").kendoDropDownTree({
            dataImageUrlField: "image",
            dataSource: items
        });
    </script>

### dataSource `Object|Array|kendo.data.HierarchicalDataSource`

The data source of the widget which is used render nodes. Can be a JavaScript object which represents a valid data source configuration, a JavaScript array or an existing [kendo.data.HierarchicalDataSource](/api/javascript/data/hierarchicaldatasource) instance.

If the `dataSource` option is set to a JavaScript object or array the widget will initialize a new [kendo.data.HierarchicalDataSource](/api/javascript/data/hierarchicaldatasource) instance using that value as data source configuration.

If the `dataSource` option is an existing [kendo.data.HierarchicalDataSource](/api/javascript/data/hierarchicaldatasource) instance the widget will use that instance and will **not** initialize a new one.

#### Example - set dataSource as a JavaScript object

    <input id="dropdowntree" />

    <script>
        $("#dropdowntree").kendoDropDownTree({
            dataSource: {
                data: [
                    {
                        text: "foo", items: [
                            { text: "bar" }
                        ]
                    }
                ]
            }
        });
    </script>

#### Example - set dataSource as a JavaScript array

    <input id="dropdowntree" />

    <script>
        $("#dropdowntree").kendoDropDownTree({
            dataSource: [
                {
                    text: "foo", items: [
                        { text: "bar" }
                    ]
                }
            ]
        });
    </script>

#### Example - set dataSource as an existing kendo.data.HierarchicalDataSource instance

    <input id="dropdowntree" />

    <script>
        var dataSource = new kendo.data.HierarchicalDataSource({
            transport: {
                read: {
                    url: "https://demos.telerik.com/kendo-ui/service/Employees",
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
            dataSource: dataSource,
            dataTextField: "FullName",
            dataValueField: "EmployeeId"
        });
    </script>

### dataSpriteCssClassField `String` *(default: null)*

Sets the field of the data item that provides the sprite CSS class of the nodes.
If an array, each level uses the field that is at the same index in the array, or the last item in the array.

#### Example

    <style>
        .k-sprite {
            background-image: url("https://demos.telerik.com/kendo-ui/content/web/treeview/coloricons-sprite.png");
        }

        .folder {
            background-position: 0 -16px;
        }

        .html {
            background-position: 0 -48px;
        }
    </style>

    <input id="dropdowntree" />

    <script>
        var items = [
            { text: "assets", sprite: "folder" },
            { text: "index.html", sprite: "html" }
        ];

        $("#dropdowntree").kendoDropDownTree({
            dataSpriteCssClassField: "sprite",
            dataSource: items
        });
    </script>

### dataTextField `String|Array` *(default: null)*

Sets the field of the data item that provides the text content of the nodes.
If an array, each level uses the field that is at the same index in the array, or the last item in the array.

> **Important** In case when array is used, [filter](/api/javascript/ui/dropdowntree/configuration/filter) is not supported because
 [hierarchical data source](/api/javascript/data/hierarchicaldatasource) does not support filtering by different fields yet.

#### Example - set the dataTextField

    <input id="dropdowntree"/>

    <script>
    $("#dropdowntree").kendoDropDownTree({
        dataSource: [
            { Name: "Parent1", Id: 1 },
            { Name: "Parent2", Id: 2 }
        ],
        dataTextField: "Name",
        dataValueField: "Id"
    });
    </script>

### dataUrlField `String` *(default: null)*

Sets the field of the data item that provides the link URL of the nodes.

#### Example

    <input id="dropdowntree" style="width: 400px;">
    <script>
        var items = [
            { text: "Tea", LinksTo: "http://tea.example.com" },
            { text: "Coffee", LinksTo: "http://coffee.example.com" }
        ];
        $("#dropdowntree").kendoDropDownTree({
            dataUrlField: "LinksTo",
            dataSource: items
        });
    </script>

### dataValueField `String|Array` *(default: null)*

The field of the data item that provides the value of the widget.
If an array, each level uses the field that is at the same index in the array, or the last item in the array.

#### Example - set the dataValueField

    <input id="dropdowntree"/>

    <script>
    $("#dropdowntree").kendoDropDownTree({
        dataSource: [
            { Name: "Parent1", Id: 1 },
            { Name: "Parent2", Id: 2 }
        ],
        dataTextField: "Name",
        dataValueField: "Id"
    });
    </script>

### delay `Number`*(default: 200)*

 Specifies the delay in milliseconds after which the DropDownTree will start filtering dataSource.

#### Example - set the delay

    <input id="dropdowntree" />

    <script>
        $("#dropdowntree").kendoDropDownTree({
            dataSource: [{ text: "aitem1", value: 1 }, { text: "bitem2", value: 2 }],
            filter: "startsWith",
            delay: 1000 // wait 1 second before filtering
        });
    </script>

### enable `Boolean`*(default: true)*

If set to `false` the widget will be disabled and will not allow user input. The widget is enabled by default and allows user input.

#### Example - disable the widget

    <input id="dropdowntree"/>

    <script>
    $("#dropdowntree").kendoDropDownTree({
      dataSource: [{ text: "item1", value: 1 }, { text: "item2", value: 2 }],
      enable: false
    });
    </script>

### enforceMinLength `Boolean` *(default: false)*

If set to `true` the widget will not show all items when the text of the search input cleared. By default, the widget shows all items when the text of the search input is cleared. Works in conjunction with [minLength](/api/javascript/ui/dropdowntree#configuration-minLength).

#### Example - enforce minLength

    <input id="dropdowntree" />

    <script>
        var dataSource = new kendo.data.HierarchicalDataSource({
            transport: {
                read: {
                    url: "https://demos.telerik.com/kendo-ui/service/Employees",
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
            dataSource: dataSource,
            dataTextField: "FullName",
            dataValueField: "EmployeeId",
            filter: 'startswith',
            minLength: 3,
            loadOnDemand: false,
            enforceMinLength: true,
        });
    </script>

### filter `String`*(default: "none")*

The filtering method used to determine the suggestions for the current value. Filtration is turned off by default, and can be performed over `string` values only (either the widget's data has to be an array of strings, or over the field, configured in the [`dataTextField`](/api/javascript/ui/dropdowntree#configuration-dataTextField) option).
The supported filter values are `startswith`, `endswith` and `contains`.

#### Example - set the filter

    <input id="dropdowntree"/>

    <script>
    $("#dropdowntree").kendoDropDownTree({
      dataSource: [{ text: "a-item1", value: 1 }, { text: "b-item2", value: 2 }],
      filter: "contains"
    });
    </script>

### footerTemplate `String|Function`

The [template](/api/javascript/kendo/methods/template) used to render the footer template. The footer template receives the widget itself as a part of the data argument. Use the widget fields directly in the template.

#### Parameters

##### instance `Object`

The widget instance.

#### Example - specify footerTemplate as a string

    <input id="customers" style="width: 400px;">
    <script>
        $("#customers").kendoDropDownTree({
            dataSource: [
                { id: 1, name: "Apples" },
                { id: 2, name: "Oranges" }
            ],
            dataTextField: "name",
            dataValueField: "id",
            footerTemplate: 'Total <strong>#: instance.dataSource.total() #</strong> items found'
        });
    </script>

### height `String|Number`*(default: 200)*

Sets max-height of the embedded treeview in pixels. The default value is 200 pixels. If set to "Auto" the height of the popup will depend on the height of the treeview.

#### Example - set the height

    <input id="dropdowntree"/>

    <script>
    $("#dropdowntree").kendoDropDownTree({
      dataSource: [{ text: "item1", value: 1 }, { text: "item2", value: 2 }],
      height: 500
    });
    </script>

### ignoreCase `Boolean`*(default: true)*

If set to `false` case-sensitive search will be performed to find suggestions. The widget performs case-insensitive searching by default.

#### Example - disable case-insensitive suggestions

    <input id="dropdowntree" />

    <script>
        $("#dropdowntree").kendoDropDownTree({
            dataSource: [{ text: "a-item1", value: 1 }, { text: "A-item2", value: 2 }],
            filter: "startswith",
            ignoreCase: true
        });
    </script>

### loadOnDemand `Boolean` *(default: false)*

Indicates whether the child DataSources should be fetched lazily when parent groups get expanded.
Setting this to true causes loading the child DataSources when expanding the parent node.

#### Example - force lazy loading of sublevels

    <input id="dropdowntree">
    <script>
        $("#dropdowntree").kendoDropDownTree({
            loadOnDemand: true,
            dataSource: [
                {
                    text: "foo", items: [
                        { text: "bar" }
                    ]
                }
            ]
        });
    </script>

### messages `Object`

The text messages displayed in the widget. Use it to customize or localize the messages.

#### Example - customize DropDownTree messages

    <input id="dropdowntree" style="width: 400px;" />
    <script>
        $("#dropdowntree").kendoDropDownTree({
            dataSource: [
                { id: 1, name: "Apples" },
                { id: 2, name: "Oranges" }
            ],
            dataTextField: "name",
            dataValueField: "id",
            checkboxes: true,
            messages: {
                clear: "clear!",
                deleteTag: "delete!"
            }
        });
    </script>

### messages.clear `String` *(default: "clear")*

The text message when hovering the clear button.

#### Example - customize clear message

    <input id="dropdowntree" style="width: 400px;" />
    <script>
        $("#dropdowntree").kendoDropDownTree({
            dataSource: [
                { id: 1, name: "Apples" },
                { id: 2, name: "Oranges" }
            ],
            dataTextField: "name",
            dataValueField: "id",
            messages: {
                clear: "clear!",
            }
        });
    </script>

### messages.deleteTag `String` *(default: "delete")*

The text message shown when hovering delete icon in a selected tag.

#### Example - customize deleteTag message

    <input id="dropdowntree" style="width: 400px;" />
    <script>
        $("#dropdowntree").kendoDropDownTree({
            dataSource: [
                { id: 1, name: "Apples" },
                { id: 2, name: "Oranges" }
            ],
            dataTextField: "name",
            dataValueField: "id",
            checkboxes: true,
            messages: {
                deleteTag: "delete!"
            }
        });
    </script>

### messages.singleTag `String` *(default: "item(s) selected")*

The text message shown in the single TagMode tag.

#### Example - customize singleTag message

    <input id="dropdowntree" style="width: 400px;" />
    <script>
        $("#dropdowntree").kendoDropDownTree({
            dataSource: [
                { id: 1, name: "Apples" },
                { id: 2, name: "Oranges" }
            ],
            dataTextField: "name",
            dataValueField: "id",
            checkboxes: true,
            messages: {
                singleTag: "item(s) selected!",
            },
            tagMode: "single"
        });
    </script>

### minLength `Number`*(default: 1)*

The minimum number of characters the user must type before a search is performed. Set to a higher value if the search could match a lot of items.

> Widget will initiate a request when input value is cleared. If you would like to prevent this behavior please check the [filtering](/api/javascript/ui/dropdowntree/events/filtering) event for more details.

#### Example - set minLength

    <input id="dropdowntree"/>

    <script>
    $("#dropdowntree").kendoDropDownTree({
      dataSource: [{ text: "item1", value: 1 }, { text: "item2", value: 2 }],
      filter: "startswith",
      minLength: 3
    });
    </script>

### noDataTemplate `String|Function` *(default: "NO DATA FOUND.")*

The [template](/api/javascript/kendo/methods/template) used to render the "no data" template, which will be displayed if no results are found or the underlying data source is empty.
The noData template receives the widget itself as a part of the data argument. The template will be evaluated on every widget data bound.

> **Important** The popup will open when 'noDataTemplate' is defined

#### Example - specify noDataTemplate as a string

    <input id="dropdowntree">
    <script>
        $("#dropdowntree").kendoDropDownTree({
            noDataTemplate: 'No Data!!!'
        });
    </script>

### placeholder `String`*(default: "")*

The hint displayed by the widget when it is empty. Not set by default.

#### Example - specify placeholder option

    <input id="dropdowntree" />

    <script>
        $("#dropdowntree").kendoDropDownTree({
            dataSource: [{ text: "item1", value: 1 }, { text: "item2", value: 2 }],
            placeholder: "Select..."
        });
    </script>

### popup `Object`

The options that will be used for the popup initialization. For more details about the available options
refer to [Popup](/api/javascript/ui/popup) documentation.

#### Example - append the popup to a specific element

    <div id="container">
        <input id="dropdowntree">
    </div>
    <script>
    $("#dropdowntree").kendoDropDownTree({
      dataSource: [
        { id: 1, name: "Apples" },
        { id: 2, name: "Oranges" }
      ],
      dataTextField: "name",
      dataValueField: "id",
      popup: {
        appendTo: $("#container")
      }
    });
    </script>

### popup.appendTo `String`

Defines a jQuery selector that will be used to find a container element, where the popup will be appended to.

#### Example - append the popup to a specific element

    <div id="container">
        <input id="dropdowntree">
    </div>
    <script>
        $("#dropdowntree").kendoDropDownTree({
            dataSource: [
                { id: 1, name: "Apples" },
                { id: 2, name: "Oranges" }
            ],
            dataTextField: "name",
            dataValueField: "id",
            popup: {
                appendTo: "#container"
            }
        });
    </script>

### popup.origin `String`

Specifies how to position the popup element based on anchor point. The value is
space separated "y" plus "x" position.

The available "y" positions are:
- "bottom"
- "center"
- "top"

The available "x" positions are:
- "left"
- "center"
- "right"

#### Example - append the popup to a specific element

    <div id="container">
        <input id="dropdowntree">
    </div>
    <script>
    $("#dropdowntree").kendoDropDownTree({
      dataSource: [
        { id: 1, name: "Apples" },
        { id: 2, name: "Oranges" }
      ],
      dataTextField: "name",
      dataValueField: "id",
      popup: {
        origin: "top left"
      }
    });
    </script>

### popup.position `String`

Specifies which point of the popup element to attach to the anchor's origin point. The value is
space separated "y" plus "x" position.

The available "y" positions are:
- "bottom"
- "center"
- "top"

The available "x" positions are:
- "left"
- "center"
- "right"

#### Example - append the popup to a specific element

    <div id="container">
        <input id="dropdowntree">
    </div>
    <script>
    $("#dropdowntree").kendoDropDownTree({
      dataSource: [
        { id: 1, name: "Apples" },
        { id: 2, name: "Oranges" }
      ],
      dataTextField: "name",
      dataValueField: "id",
      popup: {
        origin: "top left"
      }
    });
    </script>

### headerTemplate `String|Function`

Specifies a static HTML content, which will be rendered as a header of the popup element.

> **Important** The header content **should be wrapped** with a HTML tag if it contains more than one element. This is applicable also when header content is just a string/text.

> **Important** Widget does not pass a model data to the header template. Use this option only with static HTML.

#### Example - specify headerTemplate as a string

    <input id="dropdowntree">
    <script>
    $("#dropdowntree").kendoDropDownTree({
      dataSource: [
        { id: 1, name: "Apples" },
        { id: 2, name: "Oranges" }
      ],
      dataTextField: "name",
      dataValueField: "id",
      headerTemplate: '<div><h2>Fruits</h2></div>'
    });
    </script>

### valueTemplate `String|Function`

The [template](/api/javascript/kendo/methods/template) used to render the value and the or the selected tags.

#### Example - specify template as a function

    <input id="dropdowntree" />
    <script id="valueTemplate" type="text/x-kendo-template">
        <img src="/img/#: id #.png" alt="#: name #" />
        #: name #
    </script>
    <script>
    $("#dropdowntree").kendoDropDownTree({
      dataSource: [
        { id: 1, name: "Apples" },
        { id: 2, name: "Oranges" }
      ],
      dataTextField: "name",
      dataValueField: "id",
      valueTemplate: kendo.template($("#valueTemplate").html())
    });
    </script>

#### Example - specify template as a string

    <input id="dropdowntree" style="width: 400px;" />
    <script>
        $("#dropdowntree").kendoDropDownTree({
            dataSource: [
                { id: 1, name: "Apples" },
                { id: 2, name: "Oranges" }
            ],
            dataTextField: "name",
            dataValueField: "id",
            valueTemplate: '<span><img src="/img/#: id #.png" alt="#: name #" />#: name #</span>'
        });
    </script>

### tagMode `String`*(default: "multiple")*

The mode used to render the selected tags when [checkboxes](/api/javascript/ui/dropdowntree/configuration/checkboxes) are enabled. The available modes are:
- `multiple` - renders a tag for every selected value
- `single` - renders only one tag that shows the number of the selected values

> When tagMode is to `single` its message can be configured by setting [singleTag](/api/javascript/ui/dropdowntree/configuration/messages.singletag) message property.

#### Example - specify tagMode as a 'single'

    <input id="dropdowntree" style="width: 400px;" />
    <script>
        $("#dropdowntree").kendoDropDownTree({
            dataSource: [
                { id: 1, name: "Apples" },
                { id: 2, name: "Oranges" }
            ],
            dataTextField: "name",
            dataValueField: "id",
            checkboxes: true,
            tagMode: "single"
        });
    </script>

### template `String|Function`

Template for rendering each node.

#### Example

    <input id="dropdowntree" >

    <script>
        $("#dropdowntree").kendoDropDownTree({
            template: "#= item.text # (#= item.inStock #)",
            dataSource: [
                {
                    text: "foo", inStock: 7, items: [
                        { text: "bar", inStock: 2 },
                        { text: "baz", inStock: 5 }
                    ]
                }
            ]
        });
    </script>

### text `String`*(default: "")*

The text of the widget used when the `autoBind` is set to `false`.

#### Example

    <input id="dropdowntree" />
    <script>
        $("#dropdowntree").kendoDropDownTree({
            autoBind: false,
            text: "Chai"
        });
    </script>

### value `String|Array`

 Define the value of the widget. It accepts 'String' when it is in single selection mode and 'Array' when multiple selection is enabled via [checkboxes](/api/javascript/ui/dropdowntree/configuration/checkboxes) property.

#### Example

    <input id="dropdowntree" />
    <script>
        $("#dropdowntree").kendoDropDownTree({
            dataSource: [{ text: "item1", value: 1 }, { text: "item2", value: 2 }],
            value: '1'
        });
    </script>

> **Important:** Define a list of data items if widget is not initially bound

#### Example

    <input id="dropdowntree" />
    <script>
        $("#dropdowntree").kendoDropDownTree({
            autoBind: false,
            dataTextField: "productName",
            dataValueField: "productId",
            value: { productName: "Item 1", productId: "1" }
        });
    </script>

### valuePrimitive `Boolean`*(default: false)*

Specifies the [value binding](/framework/mvvm/bindings/value) behavior for the widget. If set to true, the View-Model field will be updated with the selected item value field. If set to false, the View-Model field will be updated with the selected item.

#### Example - specify that the View-Model field should be updated with the selected item value


    <input id="dropdowntree" data-bind="value: selectedProductId, source: products">

    <script>
        $("#dropdowntree").kendoDropDownTree({
            valuePrimitive: true,
            dataTextField: "name",
            dataValueField: "id"
        });
        var viewModel = kendo.observable({
            selectedProductId: null,
            products: [
                { id: 1, name: "Coffee" },
                { id: 2, name: "Tea" },
                { id: 3, name: "Juice" }
            ]
        });

        kendo.bind($("#dropdowntree"), viewModel);
    </script>

## Fields

### dataSource `kendo.data.HierarchicalDataSource`

The [data source](/api/javascript/data/hierarchicaldatasource) of the widget. Configured via the [dataSource](/api/javascript/ui/dropdowntree/configuration/datasource) option.

> Changes of the data source will be reflected in the widget.

> **Important:** Assigning a new data source would have no effect. Use the [setDataSource](/api/javascript/ui/dropdowntree/methods/setdatasource) method instead.

#### Example - add a data item to the data source

    <input id="dropdowntree"/>
    <script>
    $("#dropdowntree").kendoDropDownTree({
      dataSource: [
        { name: "Apples" },
        { name: "Oranges" }
      ],
      dataTextField: "name",
      dataValueField: "name"
    });
    var dropdowntree = $("#dropdowntree").data("kendoDropDownTree");
    dropdowntree.dataSource.add({ name: "Appricot" });
    dropdowntree.search("A");
    </script>

### options `Object`
An object, which holds the options of the widget.

#### Example - get options of the widget

    <input id="dropdowntree"/>
    <script>
    $("#dropdowntree").kendoDropDownTree();

    var dropdowntree = $("#dropdowntree").data("kendoDropDownTree");

    var options = dropdowntree.options;
    </script>

### tagList `jQuery`
A jQuery object of the `ul` element, which holds the selected tags. It is only available when [checkboxes](/api/javascript/ui/dropdowntree/configuration/checkboxes) is 'true'.

#### Example - get tagList element

    <input id="dropdowntree" />
    <script>
        $("#dropdowntree").kendoDropDownTree({
            checkboxes: true
        });

        var dropdowntree = $("#dropdowntree").data("kendoDropDownTree");

        var tagList = dropdowntree.tagList;
    </script>

### tree `jQuery`
A jQuery object of the `div` element, which holds the internal treeview.

#### Example - get div element

    <input id="dropdowntree" />
    <script>
        $("#dropdowntree").kendoDropDownTree({
            dataSource: [{ text: "item1", value: 1 }, { text: "item2", value: 2 }]
        });

        var dropdowntree = $("#dropdowntree").data("kendoDropDownTree");

        var tree = dropdowntree.tree;

    </script>

### treeview `kendo.ui.TreeView`
The internal [treeview](/api/javascript/ui/treeview) of the widget.

#### Example - get `kendo.ui.TreeView`

    <input id="dropdowntree" />
    <script>
        $("#dropdowntree").kendoDropDownTree({
            dataSource: [{ text: "item1", value: 1 }, { text: "item2", value: 2 }]
        });

        var dropdowntree = $("#dropdowntree").data("kendoDropDownTree");

        var treeview = dropdowntree.treeview;

    </script>

## Methods

### close

Closes the widget popup.

#### Example - close the suggestion popup

    <input id="dropdowntree" />

    <script>
        $("#dropdowntree").kendoDropDownTree();
        var dropdowntree = $("#dropdowntree").data("kendoDropDownTree");
        // Search for items starting with "A" - will open the suggestion popup and show "Apples"
        dropdowntree.open();
        // Close the suggestion popup
        setTimeout(function () {
            dropdowntree.close();
        },2000)

    </script>

### destroy

Prepares the **DropDownTree** for safe removal from DOM. Detaches all event handlers and removes jQuery.data attributes to avoid memory leaks. Calls destroy method of any child Kendo widgets.

> **Important:** This method does not remove the DropDownTree element from DOM.

#### Example

    <input id="dropdowntree"/>

    <script>
    $("#dropdowntree").kendoDropDownTree();
    var dropdowntree = $("#dropdowntree").data("kendoDropDownTree");
    dropdowntree.destroy();
    </script>

### enable

Enables or disables the widget.

#### Parameters

##### enable `Boolean`

If set to `true` the widget will be enabled. If set to `false` the widget will be disabled.

#### Example - enable the widget

    <input id="dropdowntree"/>

    <script>
    $("#dropdowntree").kendoDropDownTree({
      dataSource: [{ text: "item1", value: 1 }, { text: "item2", value: 2 }],
      enable: false
    });
    var dropdowntree = $("#dropdowntree").data("kendoDropDownTree");
    dropdowntree.enable(true);
    </script>

### focus

Focuses the widget.

#### Example - focus the widget

    <input id="dropdowntree"/>

    <script>
    $("#dropdowntree").kendoDropDownTree();
    var dropdowntree = $("#dropdowntree").data("kendoDropDownTree");
    dropdowntree.focus();
    </script>

### items

Obtains an Array of the DOM elements, which correspond to the data items from the Kendo UI HierarchicalDataSource [view](/api/javascript/data/datasource/methods/view).

#### Returns

`Array` The currently rendered first level items.

### open

Opens the popup.

#### Example

    <input id="dropdowntree"/>

    <script>
    $("#dropdowntree").kendoDropDownTree();

    var dropdowntree = $("#dropdowntree").data("kendoDropDownTree");
    dropdowntree.open();
    </script>

### readonly

Toggles the readonly state of the widget. When the widget is readonly it doesn't allow user input.

> There is a difference between disabled and readonly mode. The value of a disabled widget is **not** posted as part of a `form` whereas the value of a readonly widget is posted.

#### Parameters

##### readonly `Boolean`

If set to `true` the widget will not allow user input. If set to `false` the widget will allow user input.

#### Example - make the widget readonly

    <input id="dropdowntree"/>

    <script>
    $("#dropdowntree").kendoDropDownTree();
    var dropdowntree = $("#dropdowntree").data("kendoDropDownTree");
    dropdowntree.readonly(true);
    </script>

### refresh

Refresh the popup by rendering all items again.

#### Example - refresh the popup items

    <input id="dropdowntree"/>

    <script>
    $("#dropdowntree").kendoDropDownTree();

    var dropdowntree = $("#dropdowntree").data("kendoDropDownTree");

    dropdowntree.refresh();
    </script>

### search

Searches the data source for the provided value and displays any matches as suggestions.

#### Parameters

##### word `String`

The filter value.

#### Example - search the widget

    <input id="dropdowntree" />

    <script>
        $("#dropdowntree").kendoDropDownTree({
            dataSource: [{ text: "a-item1", value: 1 }, { text: "b-item2", value: 2 }],
            filter: "startswith"
        });
        var dropdowntree = $("#dropdowntree").data("kendoDropDownTree");
        dropdowntree.open();
        dropdowntree.search("a");
    </script>

### setDataSource

Sets the dataSource of an existing DropDownTree and rebinds it.

#### Parameters

##### dataSource `kendo.data.HierarchicalDataSource`

#### Example

    <input id="dropdowntree" />

    <script>
        $("#dropdowntree").kendoDropDownTree({
            dataSource: [{ text: "a-item1", value: 1 }, { text: "b-item2", value: 2 }],
            filter: "startswith"
        });
        var dropdowntree = $("#dropdowntree").data("kendoDropDownTree");
        var dataSource = new kendo.data.HierarchicalDataSource({
            data: [{ text: "item1", value: 1 }, { text: "item2", value: 2 }]
        });
        var dropdowntree = $("#dropdowntree").data("kendoDropDownTree");
        dropdowntree.setDataSource(dataSource);
    </script>

### toggle

Opens or closes the widget popup.

#### Parameters

##### toggle `Boolean` *(optional)*

Defines the whether to open/close the drop-down list.

#### Example - set text of the widget

    <input id="dropdowntree" />

    <script>
        $("#dropdowntree").kendoDropDownTree({
            dataSource: [{ text: "a-item1", value: 1 }, { text: "b-item2", value: 2 }]
        });
        var dropdowntree = $("#dropdowntree").data("kendoDropDownTree");
        dropdowntree.toggle()
    </script>

### value

Gets or sets the value of the DropDownTree.

> **Important:** If there are no items, the value method will pre-fetch the data before continue with the value setting.

> **Important:** The widget will **clear the applied filter** if a new value is set. Thus it ensures that the original/whole data set is available for selection.

> **Important:** This method **does not trigger** [change](/api/javascript/ui/dropdowntree/events/change) event.
This could affect [MVVM value binding](/framework/mvvm/bindings/value). The model bound to the widget will not be updated.
You can overcome this behavior by triggering the `change` event manually using [trigger("change")](/api/javascript/observable/methods/trigger) method.

    <input id="dropdowntree" />

    <script>
        $("#dropdowntree").kendoDropDownTree({
            dataSource: [{ text: "Item1", value: 1 }, { text: "Item2", value: 2 } ],
        });

        var dropdowntree = $("#dropdowntree").data("kendoDropDownTree");

        dropdowntree.value("2");
        dropdowntree.trigger("change");
    </script>

#### Parameters

##### value `Array|String`

The value to set. A *String* value when [checkboxes](/api/javascript/ui/dropdowntree/configuration/checkboxes) is 'false' and an *Array of strings* when `checkboxes` is true. To clear the value, pass an empty array.

#### Returns

`Array` The value of the DropDownTree.

#### Example - set value

    <input id="dropdowntree" />

    <script>
        $("#dropdowntree").kendoDropDownTree({
            dataSource: [{ text: "Item1", value: 1 }, { text: "Item2", value: 2 }],
            checkboxes:true,
        });

        var dropdowntree = $("#dropdowntree").data("kendoDropDownTree");

        // get the value of the dropdowntree.
        var value = dropdowntree.value();

        // set the value of the dropdowntree.
        dropdowntree.value(["1", "2"]); //select items which have value respectively "1" and "2"
    </script>

## Events

### change

Fired when the value of the widget is changed by the user.

The event handler function context (available via the `this` keyword) will be set to the widget instance.

> **Important:** The event is not fired when the value of the widget is changed from code.

#### Event Data

##### e.sender `kendo.ui.DropDownTree`

The widget instance which fired the event.

#### Example - subscribe to the "change" event during initialization

    <input id="dropdowntree"/>

    <script>
    $("#dropdowntree").kendoDropDownTree({
      dataSource: [{ text: "item1", value: 1 }, { text: "item2", value: 2 }],
      change: function(e) {
        var value = this.value();
        // Use the value of the widget
      }
    });
    </script>

#### Example - subscribe to the "change" event after initialization

    <input id="dropdowntree"/>

    <script>
    function dropdowntree_change(e) {
      var value = this.value();
      // Use the value of the widget
    }
    $("#dropdowntree").kendoDropDownTree();
    var dropdowntree = $("#dropdowntree").data("kendoDropDownTree");
    dropdowntree.bind("change", dropdowntree_change);
    </script>

### close

Fired when the popup of the widget is closed.

The event handler function context (available via the `this` keyword) will be set to the widget instance.

#### Event Data

##### e.sender `kendo.ui.DropDownTree`

The widget instance which fired the event.

#### Example - subscribe to the "close" event during initialization

    <input id="dropdowntree"/>

    <script>
    $("#dropdowntree").kendoDropDownTree({
      dataSource: [{ text: "item1", value: 1 }, { text: "item2", value: 2 }],
      close: function(e) {
        // handle the event
      }
    });
    </script>

#### Example - subscribe to the "close" event after initialization

    <input id="dropdowntree"/>

    <script>
    function dropdowntree_close(e) {
      // handle the event
    }
    $("#dropdowntree").kendoDropDownTree();
    var dropdowntree = $("#dropdowntree").data("kendoDropDownTree");
    dropdowntree.bind("close", dropdowntree_close);
    </script>

### dataBound

Fired when the widget or sub levels of its items are bound to data from the dataSource.

The event handler function context (available via the `this` keyword) will be set to the widget instance.

#### Event Data

##### e.sender `kendo.ui.DropDownTree`

The widget instance which fired the event.

#### Example - subscribe to the "dataBound" event during initialization

    <input id="dropdowntree"/>

    <script>
    $("#dropdowntree").kendoDropDownTree({
      dataSource: [{ text: "item1", value: 1 }, { text: "item2", value: 2 }],
      dataBound: function(e) {
          // handle the event
      }
    });
    </script>

#### Example - subscribe to the "dataBound" event after initialization

    <input id="dropdowntree"/>

    <script>
    function dropdowntree_dataBound(e) {
      // handle the event
    }
    $("#dropdowntree").kendoDropDownTree();
    var dropdowntree = $("#dropdowntree").data("kendoDropDownTree");
    dropdowntree.bind("dataBound", dropdowntree_dataBound);
    </script>

### filtering

Fired when the widget is about to filter the data source.

The event handler function context (available via the `this` keyword) will be set to the widget instance.

#### Event Data

##### e.sender `kendo.ui.DropDownTree`

The widget instance which fired the event.

##### e.filter `Object`

The filter descriptor that will be used to filter the data source.

#### Example - subscribe to the "filtering" event during initialization

    <input id="dropdowntree"/>

    <script>
    $("#dropdowntree").kendoDropDownTree({
      dataSource: [{ text: "item1", value: 1 }, { text: "item2", value: 2 }],
      filter: "startswith",
      filtering: function(e) {
          //get filter descriptor
          var filter = e.filter;

          // handle the event
      }
    });
    </script>

#### Example - subscribe to the "filtering" event after initialization

    <input id="dropdowntree"/>

    <script>
    function dropdowntree_filtering(e) {
      //get filter descriptor
      var filter = e.filter;

      // handle the event
    }
    $("#dropdowntree").kendoDropDownTree({
      dataSource: [{ text: "item1", value: 1 }, { text: "item2", value: 2 }],
      filter: "startswith"
    });
    var dropdowntree = $("#dropdowntree").data("kendoDropDownTree");
    dropdowntree.bind("filtering", dropdowntree_filtering);
    </script>

#### Example - prevent filtering event when filter value is empty

    <input id="dropdowntree"/>

    <script>
    $("#dropdowntree").kendoDropDownTree({
      dataSource: [{ text: "item1", value: 1 }, { text: "item2", value: 2 }],
      filter: "startswith",
      filtering: function(e) {
          var filter = e.filter;

          if (!filter.value) {
            //prevent filtering if the filter does not have value
            e.preventDefault();
          }
      }
    });
    </script>

### open

Fired when the popup of the widget is opened by the user.

The event handler function context (available via the `this` keyword) will be set to the widget instance.

#### Event Data

##### e.sender `kendo.ui.DropDownTree`

The widget instance which fired the event.

#### Example - subscribe to the "open" event during initialization

    <input id="dropdowntree"/>

    <script>
    $("#dropdowntree").kendoDropDownTree({
      dataSource: [{ text: "item1", value: 1 }, { text: "item2", value: 2 }],
      open: function(e) {
        // handle the event
      }
    });
    </script>

#### Example - subscribe to the "open" event after initialization

    <input id="dropdowntree"/>

    <script>
    function dropdowntree_open(e) {
      // handle the event
    }
    $("#dropdowntree").kendoDropDownTree();
    var dropdowntree = $("#dropdowntree").data("kendoDropDownTree");
    dropdowntree.bind("open", dropdowntree_open);
    </script>

### select

Triggered when a node is being selected by the user. Cancellable. When checkboxes are enabled, it is also triggered when a node is being deselected.

> Note: We don't recommend using the 'select' event when [checkboxes](/api/javascript/ui/dropdowntree/configuration/checkboxes) are enabled because it is not triggered when the state of the checkbox is changed.

#### Event Data

##### e.node `Element`

The selected node

#### Example - subscribe to the "select" event during initialization

    <input id="dropdowntree"/>
    <script>
    $("#dropdowntree").kendoDropDownTree({
      dataSource: [{ text: "item1", value: 1 }, { text: "item2", value: 2 }],
      select: function(e) {
        console.log("Select", e.node);
      }
    });
    </script>

#### Example - subscribe to the "select" event after initialization

    <input id="dropdowntree"/>
    <script>
    function dropdowntree_select(e) {
      console.log("select", e.node);
    }
    $("#dropdowntree").kendoDropDownTree({
      dataSource: [{ text: "item1", value: 1 }, { text: "item2", value: 2 }],
    });
    var dropdowntree = $("#dropdowntree").data("kendoDropDownTree");
    dropdowntree.bind("select", dropdowntree_select);
    </script>


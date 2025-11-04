---
title: DropDownTree
page_title: Configuration, methods and events of Kendo UI DropDownTree
res_type: api
component: dropdowntree
---

# kendo.ui.DropDownTree

Represents the Kendo UI DropDownTree widget. Inherits from [Widget](/api/javascript/ui/widget).

## Configuration

### adaptiveMode `String`*(default: "none")*

Specifies the adaptive rendering of the component. The supported values are: `none` *(default)*, `auto`.


<div class="meta-api-description">
How to enable adaptive layout in Kendo UI DropDownTree for mobile devices? Control responsive behavior and layout adaptation for hierarchical dropdown trees by enabling automatic adjustments based on viewport size and device type, allowing the component to switch between standard and mobile-friendly popup modes, adjust rendering for smaller screens, optimize usability on touch devices, and configure whether the dropdown uses adaptive layouts or fixed presentations to enhance accessibility, display flexibility, and interaction patterns across desktops, tablets, and smartphones.
</div>

#### Example

    <input id="dropdowntree" />
    <script>
    $("#dropdowntree").kendoDropDownTree({
        adaptiveMode: "auto",
        dataSource: [
            { text: "Item 1", value: 1 },
            { text: "Item 2", value: 2 }
        ]
    });
    </script>

### adaptiveTitle `String`

Allows customization of the title's text in the adaptive view of the component.


<div class="meta-api-description">
How to customize the title in Kendo UI DropDownTree's adaptive layout? control the header text or label shown in the responsive or mobile compact view of a hierarchical dropdown tree component, customize the title displayed when switching to adaptive layout, set or configure the string that appears as the top-level header in smaller screens, modify the visible heading or caption for the dropdown tree’s mobile-friendly interface, tailor the adaptive view’s title to improve clarity, branding, or user guidance in collapsed or compact dropdown tree modes on different devices
</div>

#### Example

    <input id="dropdowntree" />
    <script>
    $("#dropdowntree").kendoDropDownTree({
        adaptiveMode: "auto",
        adaptiveTitle: "Select Items",
        dataSource: [
            { text: "Item 1", value: 1 },
            { text: "Item 2", value: 2 }
        ]
    });
    </script>

### adaptiveSubtitle `String`

Allows customization of the subtitle's text in the adaptive view of the component.


<div class="meta-api-description">
How do I customize the subtitle in Kendo UI DropDownTree for compact views? Control and customize the subtitle text displayed in compact or adaptive views of hierarchical dropdown components, enabling clear context presentation when layouts shift to smaller or responsive modes. Configure or bind dynamic subtitles that update in adaptive rendering scenarios, adjust or set fallback or static text for dropdown menus that transform based on screen size or device type, and ensure the UI conveys relevant hierarchical information in condensed tree selectors, collapsible dropdowns, or mobile-friendly menu states. This covers scenarios like setting contextual labels, adaptive interface subtitles, responsive dropdown text, or bound properties that dynamically change based on user interactions or data changes during initialization or runtime.
</div>

#### Example

    <input id="dropdowntree" />
    <script>
    $("#dropdowntree").kendoDropDownTree({
        adaptiveMode: "auto",
        adaptiveSubtitle: "Choose from options below",
        dataSource: [
            { text: "Item 1", value: 1 },
            { text: "Item 2", value: 2 }
        ]
    });
    </script>

### animation `Boolean|Object`

Configures the opening and closing animations of the suggestion popup. Setting the `animation` option to `false` will disable the opening and closing animations. As a result, the suggestion popup will open and close instantly.

`animation:true` is not a valid configuration.


<div class="meta-api-description">
How to configure animation settings for Kendo UI DropDownTree popup? Configure or disable the opening and closing animations of the dropdown suggestion popup to control its transition effects, enabling smooth fade-ins, slide-ins, or instant toggling for improved user experience; adjust animation settings to enable or turn off popup visual effects for suggestion lists, control popup appearance timing, speed, and animation style, or set animations to false to make the dropdown open and close immediately without transitions.
</div>

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

The animation that is applied when the popup is closing.


<div class="meta-api-description">
How to configure closing animation for Kendo DropDownTree popup? Configure or disable the closing animation for dropdown or tree popup elements, controlling how the popup disappears with customizable effects, durations, easing settings, or turning off animations entirely for a smooth or instant close experience; adjust visual transitions when collapsing or hiding popup menus, dropdown lists, or hierarchical selectors to enhance UI responsiveness and user interaction feedback.
</div>

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


<div class="meta-api-description">
How do I customize the closing animation of a Kendo UI DropDownTree? Configure or customize the closing animations for hierarchical dropdown trees by specifying one or multiple animation effects to control the visual transition when the dropdown collapses or closes; set or adjust effects such as fade, slide, zoom, or other predefined animation styles by listing effect names separated by spaces, enabling smooth, stylized, or combined animated dismissal behaviors. Developers often look to enable or fine-tune dropdown closing behaviors with specific motion effects to enhance user interface interactions, manage animation sequences, or override default close transitions for a tailored UX experience.
</div>

#### Example

    <input id="dropdowntree" />
    <script>
    $("#dropdowntree").kendoDropDownTree({
        dataSource: [
            { text: "Item 1", value: 1 },
            { text: "Item 2", value: 2 }
        ],
        animation: {
            close: {
                effects: "zoomOut"
            }
        }
    });
    </script>

### animation.close.duration `Number` *(default: 100)*

The duration of the close animation in milliseconds.


<div class="meta-api-description">
How to adjust the closing animation speed in Kendo UI for jQuery DropDownTree? Set or configure the duration for closing animations in dropdown tree components to control how quickly the menu or tree collapses, adjust the speed of the drop-down closing effect, fine-tune transition timing for smoother or faster UI responsiveness, customize animation speed in milliseconds for closing dropdowns, manage the timing of hiding or retracting tree views, modify animation length to optimize user experience during collapse, control closing transition duration to match design or performance needs, enable precise adjustment of how long it takes for a dropdown tree to animate shut, customize the timing of folding or closing dropdown menus, and control the speed of collapsing animations for hierarchical selection interfaces.
</div>

#### Example

    <input id="dropdowntree" />
    <script>
    $("#dropdowntree").kendoDropDownTree({
        dataSource: [
            { text: "Item 1", value: 1 },
            { text: "Item 2", value: 2 }
        ],
        animation: {
            close: {
                duration: 500
            }
        }
    });
    </script>

### animation.open `Object`

The animation played when the suggestion popup is opened.


<div class="meta-api-description">
How to customize opening animation in Kendo UI DropDownTree? Customize and control the opening animation for suggestion popups in hierarchical dropdown trees by configuring transition effects, durations, easing functions, and other animation settings that define how dropdown suggestions appear or unfold, enabling smooth visual feedback when expanding list items or tree nodes in UI components.
</div>

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


<div class="meta-api-description">
How to customize animation effects for opening dropdown tree popups in Kendo UI? Control and customize the opening animations for dropdown tree popups by specifying one or multiple animation effects to enable smooth, combined visual transitions such as fade, slide, or zoom when the popup appears. Configure, set, or adjust the animation behavior to enhance user experience with layered or single animation effects triggering on open events. Optimize and fine-tune how dropdown or treeview components animate as they expand or reveal their content, including detailed control over timing and effect combinations for seamless UI interaction. This feature supports blending various entry animations to create dynamic, visually appealing opening sequences for hierarchical dropdown menus or tree structures.
</div>

#### Example

    <input id="dropdowntree" />
    <script>
    $("#dropdowntree").kendoDropDownTree({
        dataSource: [
            { text: "Item 1", value: 1 },
            { text: "Item 2", value: 2 }
        ],
        animation: {
            open: {
                effects: "zoomIn"
            }
        }
    });
    </script>

### animation.open.duration `Number` *(default: 200)*

The duration of the open animation in milliseconds.


<div class="meta-api-description">
How to adjust animation duration for opening hierarchical dropdown components in Kendo UI? Adjust the timing or length of the open animation for hierarchical dropdown components to control how fast the tree expands or unfolds, enabling customization of animation speed in milliseconds to synchronize with other UI transitions, create smoother opening effects, or configure delay and duration for dropdown menus with nested selectable nodes.
</div>

#### Example

    <input id="dropdowntree" />
    <script>
    $("#dropdowntree").kendoDropDownTree({
        dataSource: [
            { text: "Item 1", value: 1 },
            { text: "Item 2", value: 2 }
        ],
        animation: {
            open: {
                duration: 400
            }
        }
    });
    </script>

### autoBind `Boolean`*(default: true)*

Controls whether to bind the widget to the data source on initialization.


<div class="meta-api-description">
How can I configure Kendo UI DropDownTree to load its data automatically on initialization? Configure whether the hierarchical dropdown tree component automatically loads and binds its data from the source on initialization or defers loading to a later time. Enable or disable automatic data fetching during startup to control immediate population of items versus manual triggering of data retrieval processes, such as invoking explicit data refresh or load commands. Set the option to have the tree pre-load data on creation or postpone data binding for performance optimization, lazy loading, or user-driven data requests, supporting scenarios where initial data is empty or dynamically fetched on demand.
</div>

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


<div class="meta-api-description">
How to control closing of Kendo UI dropdown tree menu after item selection? Configure the behavior of popup closing in hierarchical or multi-select dropdown menus when an item is chosen or its checkbox toggled, enabling the menu to either close immediately after selection or remain open for multiple item picks, controlling the closing action automatically or manually to support continuous selection workflows or instant dismissal.
</div>

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


<div class="meta-api-description">
How to prevent text wrapping in Kendo UI DropDownTree menus? Adjust popup width automatically to prevent text wrapping or truncation in dropdown tree menus by enabling dynamic resizing that fits item labels without wrapping, configuring popup sizing to match the longest label, controlling the dropdown or popup element width to adapt based on content length, setting automatic width adjustment to ensure all options are fully visible without manual size settings, enabling responsive container width to accommodate varying label sizes, avoiding line breaks in dropdown items by using content-driven width control, and configuring popup dimensions dynamically to improve readability and usability of multi-level dropdown selections.
</div>

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

> Note: when 'checkAll' is set to 'true' it is recommended that [loadOnDemand](/api/javascript/ui/dropdowntree/configuration/loadondemand) is set to 'false' because otherwise checkAll may not interact with all subnodes of the treeview.


<div class="meta-api-description">
How to enable master checkbox control for Kendo UI DropDownTree with checkboxes? Configure a master checkbox control that can be enabled to select or deselect all loaded and enabled nodes within a hierarchical dropdown tree with checkboxes, supporting tri-state behavior to represent partial selections, allowing users to toggle the entire visible tree structure at once. This feature facilitates bulk checking or unchecking of all accessible items in the tree, useful for scenarios requiring quick multi-node selection or deselection, and is designed to work optimally when the tree data is fully loaded rather than loaded on demand. It supports controlling group selection states, enabling, disabling, or syncing all child nodes under parent nodes, and simplifies complex tree checkbox interactions through a single toggle control for developers and users needing comprehensive selection management.
</div>

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


<div class="meta-api-description">
How can I customize the "Check all" option in a Kendo UI DropDownTree? Customize or configure the label, text, or display for the "Check all" option in hierarchical dropdown trees, enabling control over how the select-all checkbox label appears, including templating or rendering custom content, setting alternative wording, styling the check-all option, or replacing the default static label with dynamic, localized, or formatted text to improve user interface clarity and accessibility for multi-select tree components.
</div>

#### Example

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


<div class="meta-api-description">
How to enable multiple selection with checkboxes in Kendo UI DropDownTree? Enable multiple selection with checkboxes displayed next to each tree node, allowing users to select, check, uncheck, or toggle multiple items within the dropdown tree component. Configure the behavior and appearance of checkboxes for every node, support array-based values to manage selected items, and customize checkbox options to control selection state, enable or disable partial selection, and handle multi-select scenarios across hierarchical items. This feature supports use cases such as legacy multi-select trees, batch selection, controlling node checking, and tuning checkbox interaction within dropdown hierarchical menus or tree views.
</div>

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

> Note: when [filter](/api/javascript/ui/dropdowntree/configuration/filter) is enabled 'checkboxes.checkChildren' property is reset to 'false' because enabling both at the same time could lead to ambiguous scenarios. Currently this scenario is not supported by the widget.

> When this property is enabled, it should be used with [loadOnDemand](https://docs.telerik.com/kendo-ui/api/javascript/ui/dropdowntree/configuration/loadondemand) set to 'false'. Otherwise, after expand of a checked node (and load of its inner items) the value selected in the widget and the checked items in the drop-down will no longer be in sync. Currently, such scenario is not among the supported.


<div class="meta-api-description">
How do I enable tri-state behavior in Kendo UI dropdowntree checkbox selection? Configure automatic cascading selection of child nodes when a parent checkbox is checked or unchecked, enabling tri-state behavior that reflects full, partial, or no selection across hierarchical tree structures; control propagation of checkbox states down the node hierarchy to maintain accurate parent-child relationships and display indeterminate states for partially selected branches, support scenarios where selections synchronize for nested items without on-demand loading, manage hierarchical checkbox selection behavior in tree dropdowns, and handle automatic updates of descendant selections upon parent toggling while avoiding conflicts with filtering features or lazy loading that may cause desynchronization or ambiguous states.
</div>

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


<div class="meta-api-description">
How do I configure the input names for checkboxes in a Kendo UI DropDownTree? Configure the input name attribute for checkbox elements within a hierarchical dropdown to control how checkbox values are grouped and submitted in forms, enabling setting or customizing the identifier used for each checkbox in form data, managing the naming convention to ensure checkbox selections are properly captured and organized under a specific key during form posting or data serialization, supporting scenarios where checkbox states need to be referenced by a consistent name in form submissions or server-side processing.
</div>

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


<div class="meta-api-description">
How to customize checkbox rendering in Kendo UI DropDownTree? Customize checkbox rendering and appearance within a hierarchical dropdown tree, enabling developers to configure how each checkbox is displayed, control visual templates, embed additional data fields alongside checkboxes, include extra form inputs during submission, modify checkbox layout or style through templating, leverage data from node items and tree view settings to dynamically generate checkbox content, and enhance checkbox interaction and data posting by setting custom visual and data templates for tree structure items.
</div>

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


<div class="meta-api-description">
How to show a clear button in a Kendo UI DropDownTree? Control whether a hover-activated clear or reset button appears on a tree dropdown selector, enabling users to quickly clear or reset their selected values with a single click; this setting affects the visibility of the clear control during mouse hover and triggers value change events upon clearing, allowing developers to configure, enable, disable, show, hide, or customize the interaction for clearing selections within hierarchical dropdown trees or nested item pickers.
</div>

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


<div class="meta-api-description">
How to set up image URL field for nodes in a Kendo UI DropDownTree? Set or configure the data field that provides image URLs for each node in a hierarchical or flat list, enabling display of icons, thumbnails, avatars, or custom images within a tree dropdown component; control how image paths bind from your data source to visually enhance nodes with pictures, avatars, or symbols by specifying the image URL mapping field to enable image rendering on tree items or dropdown nodes.
</div>

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


<div class="meta-api-description">
How to configure data source for Kendo UI DropDownTree? Configure hierarchical data binding to display and populate tree nodes by setting the data source to JavaScript arrays, objects, or existing hierarchical data provider instances, enabling dynamic or static node loading, integrating external data structures, managing nested items, controlling tree hierarchy content, binding complex datasets, and supporting customization of source data for dropdown tree components in various formats and structures.
</div>

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
                    url: "https://demos.telerik.com/service/v2/core/Employees"
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


<div class="meta-api-description">
How do I customize the CSS classes for hierarchical nodes in a Kendo UI Dropdown Tree? Configure custom CSS sprite classes for hierarchical dropdown tree nodes by specifying the data field or array of fields that hold the sprite class names, enabling per-level styling, dynamic icon assignment, hierarchical node visuals, and flexible mapping of CSS classes for each tree depth or node, supporting scenarios where icons vary by level or node data attributes and allowing granular control over node appearance with sprite-based icons in multi-level dropdown trees.
</div>

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


<div class="meta-api-description">
How do I customize node labels in a hierarchical Kendo UI dropdown tree? Configure which data field or fields determine the displayed label or visible text in each node of a hierarchical dropdown tree, allowing selection of a single string key or a list of keys to define text for each level; set or map text fields for multilevel trees, customize node labels, support hierarchical text mapping, control node display names, handle varying text fields per depth, adjust label sources, and understand limitations with filtering when using multiple fields for different hierarchy levels.
</div>

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


<div class="meta-api-description">
How to configure nodes in Kendo UI DropDownTree to be clickable links? Configure node navigation links by specifying the data field that contains URL or hyperlink values for tree nodes, enabling clickable or navigable nodes within dropdown trees, linking each node to a web address, resource, or external page based on the data source’s URL property, setting or mapping link fields for nodes so users can follow or open URLs directly from nodes, controlling how tree items behave as anchors or navigation points by pointing to the exact data attribute holding link references, specifying which data key holds the website, href, or destination path for interactive tree nodes.
</div>

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


<div class="meta-api-description">
How do I specify which data property is used to determine the selected value in a Kendo UI DropDownTree? Configure how the selected value in a hierarchical dropdown or tree structure is determined by specifying the data item property or key that represents the chosen value. This setting accepts a single field name or a list of field names to map values for each level of nested data, enabling control over value extraction in multi-level trees, with support for repeating the last specified field for deeper levels when the hierarchy exceeds the number of provided fields. Adjust, set, or customize which data attribute supplies the value for selection, accommodating complex data models where each depth in a tree uses different property names or a consistent identifier. This feature supports scenarios such as controlling output values, matching user selections to specific data keys, managing compound or hierarchical identifiers, and tailoring value binding in dropdown components with nested or hierarchical data sources.
</div>

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


<div class="meta-api-description">
How can I optimize filtering in my Kendo UI DropDownTree by reducing repeated requests? Configure the time interval in milliseconds to debounce user input before triggering the filtering of dropdown tree data, controlling how long the system waits after typing stops to reduce repeated or excessive filter calls, delay the search execution, throttle or limit input events, and optimize performance by setting a pause duration between keystrokes and applying data filtering or search operations.
</div>

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


<div class="meta-api-description">
How do I disable user input in a Kendo UI DropDownTree? Control whether the component is active or inactive for user input, enabling or disabling interaction with the dropdown tree selection interface, configuring if users can select, expand, collapse, or type to interact with the hierarchical dropdown structure, setting the component state to accept or block all user events and inputs, toggling between enabled and disabled modes to allow or restrict user engagement with the dropdown tree, managing the interactive availability for selections and navigation within the tree dropdown, defining if the dropdown tree is responsive to clicks, keyboard input, or touch, controlling the activation status for user-driven data entry or choice in hierarchical dropdown menus.
</div>

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


<div class="meta-api-description">
How to configure Kendo UI DropDownTree to show all items only when user enters a minimum number of characters? Control and configure whether a hierarchical dropdown or tree component displays all available options or items when a user clears or deletes their search input, enabling the enforcement of a minimum input length before showing results, preventing automatic full list expansion after clearing search text, managing visibility of item lists based on search input presence or absence, adjusting behavior to either show no items or all items when search is empty, implementing restrictions tied to minimum character requirements for triggering result display, customizing search-driven item visibility in tree or dropdown menus, toggling display of the full item list when search is reset or erased, and managing filtered item view behavior in hierarchical selection components.
</div>

#### Example - enforce minLength

    <input id="dropdowntree" />

    <script>
        var dataSource = new kendo.data.HierarchicalDataSource({
            transport: {
                read: {
                    url: "https://demos.telerik.com/service/v2/core/Employees"
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


<div class="meta-api-description">
How to configure DropDownTree filtering in Kendo UI for jQuery? Configure how the input text is matched against list items to filter suggestions dynamically while typing, including options to enable filtering by whether items start with, end with, or contain the typed substring, controlling autocomplete behavior, search matching, and suggestion relevance for string data sources or specific text fields.
</div>

#### Example - set the filter

    <input id="ddt" />
    <script>
      $("#ddt").kendoDropDownTree({
        dataSource: [
          { text: "Chai", value: 1 },
          { text: "Chang", value: 2 },
          { text: "Tofu", value: 3 }
        ],
        filter: "contains"
      });
    </script>

### filterLabel `String`

When filtering is enabled, allows aria-label to be defined for the filter input element.


<div class="meta-api-description">
How to set the accessible label for the filter input box in a Kendo UI DropDownTree? Define or customize the accessible label, aria-label, or screen reader description for the filter input box used in dropdown tree filtering to enhance keyboard navigation, assistive technology support, and accessibility compliance when enabling or configuring filter functionality within hierarchical or tree-structured dropdown components.
</div>

#### Example - set the filter label

    <input id="ddt" />
    <script>
        $("#ddt").kendoDropDownTree({
            dataSource: [
                { text: "Chai", value: 1 },
                { text: "Chang", value: 2 },
                { text: "Tofu", value: 3 }
            ],
            filter: "contains",
            filterLabel: "custom title"
        });
    </script>

### fillMode `String`*(default: "solid")*

Sets a value controlling how the color is applied. Can also be set to the following string values:

- "none"
- "solid"
- "flat"
- "outline"


<div class="meta-api-description">
How do I change the background color styling in a Kendo UI for jQuery DropDownTree? Configure and control the background color styling and fill appearance for dropdown tree items, tags, or icons by setting how colors are applied—choose from options that enable no fill, solid fills, flat color styles, or outlined color borders to customize the visual presentation and emphasis for components within tree dropdown interfaces. Adjust fill behavior to enable or disable background color, create solid color blocks, apply flat color fills without gradients, or add outlines around elements for different visual emphasis and styling preferences in dropdown trees, menus, or tag displays. Customize the coloring mode of tree dropdown list elements by selecting fill styles such as none, solid fills, flat coloring, or outlines, optimizing UI appearance and control over item highlight, background, and icon color rendering.
</div>

#### Example - sets the fillMode

    <input id="ddt" />
    <script>
    $("#ddt").kendoDropDownTree({
      dataSource: [
          { text: "Chai", value: 1 },
          { text: "Chang", value: 2 },
          { text: "Tofu", value: 3 }
      ],
      fillMode: "flat"
    });
    </script>

### footerTemplate `String|Function`

The [template](/api/javascript/kendo/methods/template) used to render the footer template. The footer template receives the widget itself as a part of the data argument. Use the widget fields directly in the template.


<div class="meta-api-description">
How do I customize the footer section of a Kendo UI DropDownTree component? Customize and control the bottom section of a hierarchical dropdown interface by injecting personalized content such as summaries, buttons, or markup using a template-driven approach that leverages the component’s current state and properties; configure, set, or enable dynamic footer areas to display additional information, actions, or interface elements tailored to user needs, with full access to internal data and component fields for flexible rendering and interaction within the dropdown tree’s footer region.
</div>

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

### label `String|Function|Object` *(default: null)*

Adds a label before the input. If the input has no `id` attribute, a generated `id` will be assigned. The `string` and the `function` parameters are setting the inner HTML of the label.


<div class="meta-api-description">
How do I customize the label in Kendo UI DropDownTree? Configure or customize the text, HTML content, or inner markup displayed as a label before the input field in hierarchical dropdown or tree selection interfaces, including setting static strings or dynamic content via functions, controlling label associations for accessibility by linking the label to input elements through IDs, auto-generating input identifiers when none exist, and enabling precise labeling, description, or instruction for tree-based dropdown inputs to improve user interaction, interface clarity, and assistive technology compatibility in dropdown tree or hierarchical select controls.
</div>

#### Example - create a label from a string

    <input id="customers">
    <script>
    $("#customers").kendoDropDownTree({
        dataSource: [
            { id: 1, name: "Apples" },
            { id: 2, name: "Oranges" }
        ],
        dataTextField: "name",
        dataValueField: "id",
        label: "Fruits"
    });
    </script>

The function context (available through the keyword `this`) will be set to the widget instance.

#### Example - create a label from a function

    <input id="customers">
    <script>
    $("#customers").kendoDropDownTree({
        dataSource: [
            { id: 1, name: "Apples" },
            { id: 2, name: "Oranges" }
        ],
        dataTextField: "name",
        dataValueField: "id",
        label: function() {
            return "Fruits";
        }
    });
    </script>

### label.content `String|Function` *(default: "")*

Sets the inner HTML of the label.


<div class="meta-api-description">
How do I set custom HTML content for a dropdown tree label in Kendo UI? Configure or update the inner HTML content of a dropdown tree label, enabling customization of text, inline elements, and rich markup for labels in tree dropdown components. Control and set label display content using HTML strings, customize label appearance with embedded tags, modify or replace label elements dynamically, and enable fully customized label rendering with flexible HTML content for dropdown tree UI elements. Adjust label content during initialization or runtime to fit user interfaces requiring specific formatting, styling, or text with embedded HTML markup.
</div>

#### Example - create a label from a string

    <input id="customers">
    <script>
    $("#customers").kendoDropDownTree({
        dataSource: [
            { id: 1, name: "Apples" },
            { id: 2, name: "Oranges" }
        ],
        dataTextField: "name",
        dataValueField: "id",
        label: { content: "Fruits" }
    });
    </script>

The function context (available through the keyword `this`) will be set to the widget instance.

#### Example - create a label from a function

    <input id="customers">
    <script>
    $("#customers").kendoDropDownTree({
        dataSource: [
            { id: 1, name: "Apples" },
            { id: 2, name: "Oranges" }
        ],
        dataTextField: "name",
        dataValueField: "id",
        label: {
            content: function() {
                return "Fruits";
            }
        }
    });
    </script>

### label.floating `Boolean` *(default: false)*

If set to `true`, the widget will be wrapped in a container that will allow the floating label functionality.

> **Important:** The [value](/api/javascript/ui/dropdowntree/methods/value) method **does not trigger** the `focusout` event of the input.
This can affect the floating label functionality.
To overcome this behavior, manually invoke the `refresh` method of the Floating Label: `$("#dropdowntree").data("kendoDropDownTree").label.floatingLabel.refresh();`


<div class="meta-api-description">
How do I enable floating labels in Kendo UI for jQuery DropDownTree? Control floating label behavior and appearance for hierarchical dropdown inputs by enabling or disabling label animation that floats above the input field when focused or containing a value, including automatic positioning and styling of the label as users interact with or input selections in tree-structured dropdowns; configure how label transitions respond to focus changes and value updates, handle scenarios where programmatic value changes do not trigger standard focus events, and refresh or reset label state to maintain correct floating label display and synchronization with the component’s current value and focus status.
</div>

#### Example - create a label from a function

    <input id="customers">
    <script>
    $("#customers").kendoDropDownTree({
        dataSource: [
            { id: 1, name: "Apples" },
            { id: 2, name: "Oranges" }
        ],
        dataTextField: "name",
        dataValueField: "id",
        label: {
            content: "Fruits",
            floating: true
        }
    });
    </script>


### height `String|Number`*(default: 200)*

Sets max-height of the embedded treeview in pixels. The default value is 200 pixels. If set to "Auto" the height of the popup will depend on the height of the treeview.


<div class="meta-api-description">
How do I set the maximum height of the popup dropdown tree in Kendo UI for jQuery? Adjusting the popup max height or overall size for a dropdown tree menu, setting or configuring the vertical dimension limit of the embedded hierarchical treeview display, controlling how tall or expanded the dropdown list can be in pixels, specifying fixed or automatic height to manage the visible area of nested selectable items, enabling dynamic resizing based on content length or enforcing a maximum popup height to prevent overflow and ensure consistent UI presentation.
</div>

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


<div class="meta-api-description">
How to make Kendo UI DropDownTree case-insensitive for filtering? Control whether typed input and suggested matches in hierarchical dropdown lists are filtered using case-insensitive or case-sensitive matching, enabling configuration of search behavior to ignore letter casing or distinguish uppercase and lowercase characters during filtering, autocomplete, or lookup operations within tree-like dropdown menus, allowing developers to set case sensitivity on initialization to refine or broaden matching results for user input or dynamic suggestions.
</div>

#### Example - disable case-insensitive suggestions

    <input id="dropdowntree" />

    <script>
        $("#dropdowntree").kendoDropDownTree({
            dataSource: [{ text: "a-item1", value: 1 }, { text: "A-item2", value: 2 }],
            filter: "startswith",
            ignoreCase: true
        });
    </script>

### loadOnDemand `Boolean|Object` *(default: false)*

Indicates whether the child DataSources should be fetched lazily when parent groups get expanded.
Setting this to true causes loading the child DataSources when expanding the parent node.


<div class="meta-api-description">
How to enable lazy loading in Kendo UI DropDownTree? Control asynchronous loading or lazy fetching of nested child nodes in hierarchical dropdown trees, enabling dynamic retrieval of child elements only when a parent node or group is expanded to optimize performance and minimize initial data load. Configure on-demand data loading, dynamic expansion, and deferred child data source requests to efficiently handle large datasets, deep tree structures, or heavy hierarchical data by loading children as needed rather than all at once, improving responsiveness and scalability of tree-based selection controls. Adjust settings to enable or disable lazy loading, expand tree nodes to trigger asynchronous calls, and manage partial data fetching in dropdown-style tree components.
</div>

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

### loadOnDemand.valueMapper `Function`

The component calls the valueMapper function when the component receives a value, that is not fetched from the remote server yet. The component will pass the selected value(s) in the valueMapper function. In turn, the valueMapper implementation should return the respective data item(s) ids.

> The valueMapper needs `dataSource.schema` to work properly.


<div class="meta-api-description">
How do I map dynamic values to data items in a Kendo UI DropDownTree with load on demand? Configure dynamic value resolution for selections not preloaded by supplying a custom mapping function that translates unrecognized or lazy-loaded values into matching data item identifiers, enabling seamless retrieval and selection of missing or server-fetched data elements. This approach supports asynchronous value lookups, on-demand loading, resolving selected keys to data objects, synchronizing remote data with UI selection, and integrating external value IDs back into the displayed item hierarchy by linking values to their corresponding data entries using schema-aware data source mapping.
</div>

#### Example

    <input id="dropdowntree">
    <script>
      $("#dropdowntree").kendoDropDownTree({
        dataTextField: "FullName",
        dataValueField: "EmployeeId",
        loadOnDemand: {
          valueMapper: function (options) {
            options.success([[2, 8]]);
          }
        },
        dataSource: {
          transport: {
            read: {
              url: "https://demos.telerik.com/service/v2/core/Employees"
            }
          },
          schema: {
            model: {
              id: "EmployeeId",
              hasChildren: "HasEmployees"
            }
          }
        },
        value: '8'
      });
    </script>

### messages `Object`

The text messages displayed in the widget. Use it to customize or localize the messages.


<div class="meta-api-description">
How do I customize messages in Kendo UI DropDownTree? Customize, override, or localize the displayed text, labels, and messages within a drop-down tree control by configuring message settings or string values to replace default language, adjust UI wording, translate interface prompts, set custom notifications, and control all textual content for enhanced user experience and internationalization support.
</div>

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


<div class="meta-api-description">
How do I customize the tooltip text for the clear button in a Kendo UI DropDownTree? Set or customize the tooltip text displayed when hovering over the clear button, configure the clear action's hover message, control the tooltip content for clearing selections, enable personalized or localized messages for the clear icon, adjust the hover label for clearing input in a tree dropdown, update or translate the clear button’s tooltip text, provide accessible hover descriptions for clearing choices, and modify the textual hint shown on mouseover for clearing items in dropdown tree components.
</div>

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


<div class="meta-api-description">
How to change the tooltip text for deleting tags in a Kendo UI DropDownTree widget? Configure the tooltip or hover text displayed on the delete icon for selected tags within a dropdown tree component, enabling customization of the confirmation message or label shown when users attempt to remove or delete tags. Customize, localize, or set the text that appears on tag delete buttons, control the wording for tag removal prompts in tag selection interfaces, and adjust the message guiding users when hovering over tag delete controls in hierarchical dropdowns or tree-like multi-select inputs. Tailor the hover label or tooltip for deleting tags to improve user clarity, provide localized strings, and refine UI feedback during tag removal interactions in complex dropdown selection trees.
</div>

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

### messages.noData `String` *(default: "No data found.")*

The text message shown in the noDataTemplate when no data is available in the widget drop-down.


<div class="meta-api-description">
How do I customize the "no data" message in Kendo UI DropDownTree? Display a customizable or localized message when the dropdown tree component contains no items, enabling you to set, configure, or override the empty state text, no-data indication, or placeholder prompts that appear when there is no content to show in hierarchical or tree-structured dropdown lists.
</div>

#### Example - customize noData message

    <input id="dropdowntree" />
    <script>
        $("#dropdowntree").kendoDropDownTree({
            dataSource: [],
            messages: {
                noData: "There is no data!"
            }
        });
    </script>

### messages.singleTag `String` *(default: "item(s) selected")*

The text message shown in the single TagMode tag.


<div class="meta-api-description">
How do I customize the label for a single selected tag in Kendo UI DropDownTree? Customize, translate, or localize the text displayed when a single tag is selected in tag mode within dropdown tree components, including setting or modifying the label, message, or prompt that appears to represent one chosen tag, enabling internationalization and user interface adaptation for single-item tag selections in hierarchical dropdown lists.
</div>

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

### messages.filterInputPlaceholder `String` *(default: "Filter")*

The text message shown in the filter input.

#### Example - customize filterInputPlaceholder message

    <input id="dropdowntree" />
    <script>
        $("#dropdowntree").kendoDropDownTree({
            dataSource: [],
            filter: "contains",
            messages: {
                filterInputPlaceholder: "Placeholder for filtering."
            }
        });
    </script>


### minLength `Number`*(default: 1)*

The minimum number of characters the user must type before a search is performed. Set to a higher value if the search could match a lot of items.

> Widget will initiate a request when input value is cleared. If you would like to prevent this behavior please check the [filtering](/api/javascript/ui/dropdowntree/events/filtering) event for more details.


<div class="meta-api-description">
How do I set the minimum number of characters required before searching in a Kendo UI DropDownTree input? Configure the minimum number of characters required before initiating search or filtering in a dropdown tree input, set thresholds to control when the filter activates, adjust input length requirements to limit or expand search results, optimize performance by specifying the character count needed to trigger filtering, manage user input sensitivity to start search operations after a set number of typed characters, control search activation delay to reduce unnecessary queries, enable threshold settings to debounce filtering actions, customize when filtering requests occur based on character count, and fine-tune search behavior to start only after minimum input length is reached.
</div>

#### Example - set minLength

    <input id="dropdowntree"/>

    <script>
    $("#dropdowntree").kendoDropDownTree({
      dataSource: [{ text: "item1", value: 1 }, { text: "item2", value: 2 }],
      filter: "startswith",
      minLength: 3
    });
    </script>

### noDataTemplate `String|Function|Boolean` *(default: true)*

The [template](/api/javascript/kendo/methods/template) used to render the "no data" template, which will be displayed if no results are found or the underlying data source is empty.
The noData template receives the widget itself as a part of the data argument. The template will be evaluated on every widget data bound.

> **Important** The popup will open when 'noDataTemplate' is defined


<div class="meta-api-description">
How to customize the message when no data is found in a Kendo UI DropDownTree widget? Customize the message or content displayed when no search results or data entries are found in a hierarchical dropdown tree, enabling you to set or define personalized templates, placeholders, or empty state views that dynamically update based on the dropdown’s current data, with options to control how and when the popup appears during empty or no-match scenarios, useful for handling empty datasets, search misses, or fallback displays in nested selection controls.
</div>

#### Example - specify noDataTemplate as a string

    <input id="dropdowntree">
    <script>
        $("#dropdowntree").kendoDropDownTree({
            noDataTemplate: 'No Data!!!'
        });
    </script>

### placeholder `String`*(default: "")*

The hint displayed by the widget when it is empty. Not set by default.


<div class="meta-api-description">
How to set a default text in Kendo UI DropDownTree when no item is selected? Configure or customize the empty input hint, guide text, or prompt message displayed inside a dropdown tree or hierarchical selection control when no item is chosen or user input is absent, enabling the display of placeholder text, instructional labels, or subtle cues that indicate what to select or enter. This setting impacts the unselected state by showing customizable tip text, default messaging, or field hints that disappear once an option is picked or input is provided, helping users understand expected actions or data to enter within nested or tree-structured dropdown menus.
</div>

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


<div class="meta-api-description">
How do I customize the appearance of the dropdown tree popup in Kendo UI for jQuery? Control and customize the appearance, positioning, and behavior of the dropdown tree popup by configuring initialization options such as open mode, placement, alignment, animation, and interaction triggers. Enable setting how the popup opens, where it anchors relative to the input, its display animations, and how it responds to user clicks or focus, allowing fine-tuning of the overlay that appears when selecting items from the hierarchical dropdown. Adjust popup settings to control opening delays, boundary constraints, and event handling to optimize user experience in hierarchical selection components.
</div>

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


<div class="meta-api-description">
How to customize the placement of popup elements in the DropDownTree control? Control or customize the placement of popup elements in the document tree by specifying a container or parent node using selectors or references, enabling you to set where drop-down menus, trees, or overlays are appended to avoid visual clipping, overflow problems, layering conflicts, or z-index stacking issues; adjust the append target to manage popup positioning within specific DOM containers, boundary elements, or custom wrappers to ensure proper rendering, visibility, and interaction within complex layouts or scrolling contexts.
</div>

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


<div class="meta-api-description">
How do I control where the popup appears in my Kendo UI dropdown tree? Control and customize the positioning and alignment of dropdown or tree view popups relative to their anchor element by specifying the vertical and horizontal origin points, allowing placement at top, center, or bottom vertically combined with left, center, or right horizontally using a space-separated string format like "top right" or "center center"; this setting enables precise control over where the popup appears, ensuring proper overlay, alignment, and user interface placement for menus, dropdown lists, and tree structures across various screen layouts and responsive designs.
</div>

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


<div class="meta-api-description">
How do I set the position of a Kendo UI DropDownTree popup relative to its anchor element? Set or adjust the alignment and attachment point of a popup menu or dropdown tree relative to its anchor or trigger element by specifying vertical and horizontal coordinates such as top, center, bottom for vertical placement and left, center, right for horizontal placement, enabling precise control over where the popup appears in relation to the origin point of the anchor, including configuring the popup’s offset, positioning, alignment, or attachment corner; common use cases include aligning dropdown menus, context menus, or floating panels to desired points on buttons, input fields, or other UI elements by defining position pairs like top-left, bottom-center, or center-right.
</div>

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


<div class="meta-api-description">
How can I customize the header of a Kendo UI DropDownTree popup with custom HTML? Configure a static, non-interactive HTML header for a dropdown tree popup by inserting custom markup that appears at the top of the popup interface; this header supports only fixed content without data binding or dynamic updates and requires enclosing multiple elements within a single container tag to ensure proper rendering, enabling developers to customize the popup’s title area, static banners, or informational sections without involving model-driven templates or reactive data, while controlling the appearance of the dropdown header using raw HTML snippets embedded directly into the popup structure.
</div>

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


<div class="meta-api-description">
How do I customize the display of selected items in a Kendo UI DropDownTree component? Control and customize how selected items, values, and tags display visually in a dropdown tree or multi-select component by defining templates that format, style, or transform the chosen entries, including options for using string templates or compiled functions to influence the rendering of selected data items, enabling tailored presentation of user selections, tags, or values through flexible, programmable templates that update dynamically based on current selections.
</div>

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


<div class="meta-api-description">
How to configure Kendo UI dropdowntree to show individual tags for each selected item? Configure how selected items appear as tags in a checkbox-enabled dropdown tree, allowing control over whether each checked item is shown individually as separate tags or summarized into a single tag indicating the total number of selections. This setting enables options to display multiple tags for every chosen value or condense all selections into one combined tag with a customizable summary message. Adjust how multiple selections are represented visually, control tag rendering behavior, and set whether users see detailed tags for each item or a simplified count tag reflecting the selection quantity. Use this to manage selected item presentation, tag display modes, tag summarization, and user interface clarity in multi-select dropdown tree components.
</div>

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


<div class="meta-api-description">
How do I customize the appearance of nodes in a Kendo UI DropDownTree using templates? Customize node rendering in hierarchical dropdown menus by defining custom HTML templates or template functions that receive node data to control the display of text, icons, images, or other content within tree nodes. Enable dynamic formatting, personalized layouts, or binding of specific node fields for tailored node appearance and behavior in dropdown tree components. Adjust and configure how each tree node looks by setting templates to modify labels, include visual indicators, or implement complex node structures through customizable rendering logic.
</div>

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


<div class="meta-api-description">
How do I set the initial display text in a Kendo UI DropDownTree input when automatic data loading is disabled? Configure or set the visible placeholder or initial display text in a dropdown tree input when automatic data loading, binding, or fetching from the data source is disabled or prevented. Control the displayed string to show a default value, custom label, or initial content without triggering data binding or loading operations, enabling you to present a meaningful message or selection before any user interaction or data is populated. Adjust, override, or define this visible text to manage the input's shown value when data auto-binding is turned off or delayed.
</div>

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


<div class="meta-api-description">
How do I get the currently selected value from a Kendo UI DropDownTree? Control, configure, or retrieve the current selected option or options from a hierarchical dropdown list with single or multiple selection modes; handle selection state as a single string value for one chosen item or an array of values when enabling checkboxes for multi-select scenarios, allowing developers to bind, update, read, or manipulate the user's current choice within a tree-structured dropdown component seamlessly.
</div>

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


<div class="meta-api-description">
How does the Kendo UI DropDownTree valuePrimitive property affect data binding when selecting tree items? Configure whether selection updates use only the item's primitive identifier or the full object in data binding, enabling control over how selected values are stored, accessed, compared, or synchronized with the view model. Adjust settings to switch between binding the selected item's simple ID versus the complete data object for flexible state management, value representation, and compatibility with various data handling patterns, including scenarios needing lightweight value storage or rich object context in tree dropdown selections. Enable or disable primitive value binding to optimize performance, simplify model updates, or retain detailed selection data structures within hierarchical dropdown components.
</div>

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

### rounded `String`*(default: "medium")*

Sets a value controlling the border radius. Can also be set to the following string values:

- "none"
- "small"
- "medium"
- "large"
- "full"


<div class="meta-api-description">
How do I adjust the corner radius of a Kendo UI DropDownTree component? Adjust corner radius, border roundness, or curvature for dropdown tree components by setting rounded edges to none, small, medium, large, or full; configure border radius appearance to control how sharp or smooth the corners look, enabling customization of corner curvature, corner radius size, or edge rounding on the dropdown tree interface.
</div>

#### Example - set large border radius

    <input id="ddt" />
    <script>
    $("#ddt").kendoDropDownTree({
      dataSource: [
          { text: "Chai", value: 1 },
          { text: "Chang", value: 2 },
          { text: "Tofu", value: 3 }
      ],
      rounded: "large"
    });
    </script>

### size `String`*(default: "medium")*

Sets a value controlling size of the component. Can also be set to the following string values:

- "small"
- "medium"
- "large"
- "none"


<div class="meta-api-description">
How do I set different sizes for my Kendo UI dropdown tree menu? Control and customize the visual dimensions, spacing, and input height of dropdown tree menus by setting size options such as small, medium, large, none, or explicit numeric values to adjust the component’s overall scale and layout. Enable flexible sizing configurations for tree-style dropdown inputs, allowing developers to configure compact, standard, or expanded dropdown trees, adapt form field sizes, control padding and height attributes, and tailor the component appearance according to UI requirements or responsive design needs. Adjust the dropdown tree’s footprint and input area sizing dynamically during initialization or runtime to fit diverse design specifications and user interface contexts.
</div>

#### Example - set the size

    <input id="ddt" />
    <script>
    $("#ddt").kendoDropDownTree({
      dataSource: [
          { text: "Chai", value: 1 },
          { text: "Chang", value: 2 },
          { text: "Tofu", value: 3 }
      ],
      size: "large"
    });
    </script>

## Fields

### dataSource `kendo.data.HierarchicalDataSource`

The [data source](/api/javascript/data/hierarchicaldatasource) of the widget. Configured via the [dataSource](/api/javascript/ui/dropdowntree/configuration/datasource) option.

> Changes of the data source will be reflected in the widget.

> **Important:** Assigning a new data source would have no effect. Use the [setDataSource](/api/javascript/ui/dropdowntree/methods/setdatasource) method instead.


<div class="meta-api-description">
How do I bind hierarchical data to a Kendo UI dropdown tree's dataSource? Bind, configure, access, or inspect hierarchical and nested tree data collections within a dropdown tree component by managing or retrieving the data source field representing structured, multi-level datasets; query or update the bound data dynamically at runtime, understand how to control or reference the underlying hierarchical data model or data binding object associated with cascading dropdown items or tree nodes, and handle changes or replacements to complex parent-child datasets via appropriate methods rather than direct assignment, enabling flexible integration and manipulation of tree-structured data for dropdown menus, hierarchical lists, or nested item selections in user interfaces.
</div>

#### Example - add a data item to the data source

    <input id="dropdowntree"/>
    <script>
      $("#dropdowntree").kendoDropDownTree({
        dataSource: [
          { name: "Apples" },
          { name: "Oranges" }
        ],
        filter: "startswith",
        dataTextField: "name",
        dataValueField: "name"
      });
      var dropdowntree = $("#dropdowntree").data("kendoDropDownTree");
      dropdowntree.dataSource.add({ name: "Appricot" });
      dropdowntree.open(); 
    </script>

### options `Object`
An object, which holds the options of the widget.


<div class="meta-api-description">
How can I dynamically change the appearance of my Kendo UI DropDownTree component? Customize and control the interactive tree dropdown component's settings and appearance dynamically by accessing and updating its configuration object during runtime, enabling adjustment of initialization parameters, current options, visual styles, selection behavior, filtering criteria, and other runtime properties to programmatically modify how the hierarchical dropdown tree functions and displays without reloading or rebuilding the component instance.
</div>

#### Example - get options of the widget

    <input id="dropdowntree"/>
    <script>
    $("#dropdowntree").kendoDropDownTree();

    var dropdowntree = $("#dropdowntree").data("kendoDropDownTree");

    var options = dropdowntree.options;
    </script>

### tagList `jQuery`
A jQuery object of the `ul` element, which holds the selected tags. It is only available when [checkboxes](/api/javascript/ui/dropdowntree/configuration/checkboxes) is 'true'.


<div class="meta-api-description">
How to manipulate the tag list in Kendo UI DropDownTree component with checkboxes enabled? Access and manipulate the unordered list element that contains selected tags or checked items in a dropdown tree component with checkboxes enabled, enabling developers to read or modify the tag list DOM structure, add or remove tag nodes, attach event listeners or handlers to tags, inspect or update styling and layouts, and control the interactive list of selected items for dynamic UI updates and custom behavior within hierarchical multi-select dropdown interfaces.
</div>

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


<div class="meta-api-description">
How to access treeview container in Kendo UI dropdown tree? Access or manipulate the nested treeview container within a dropdown tree structure by obtaining a reference to the internal DOM element or jQuery object representing the tree’s root div, enabling developers to programmatically inspect, customize, traverse, or modify the hierarchical nodes, structure, or appearance of the embedded tree after the component has been initialized, supporting scenarios like dynamic updates, event handling, and direct DOM access for advanced UI control in dropdown treelists or hierarchical dropdown menus.
</div>

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


<div class="meta-api-description">
How do I access and manipulate the hierarchical tree structure in a Kendo UI DropDownTree component? Access and control the internal hierarchical tree structure embedded within the dropdown component, enabling interaction with the tree's nodes, selection management, event handling, programmatic manipulation, and method invocation on the tree view instance. This includes querying selected items, changing node states, binding to node events, traversing or updating the tree hierarchy dynamically, and controlling the expandable list inside the dropdown, allowing customization and advanced control of the nested list interface through code after initialization.
</div>

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


<div class="meta-api-description">
How do I programmatically close a Kendo UI dropdown tree? Programmatically hide or dismiss the dropdown overlay and popup window of a hierarchical tree selection interface, enabling developers to close menus or dropdown trees from code after item selection, user navigation, or external events. This method supports controlling the visibility of expandable tree lists, closing open dropdown panels on demand, managing UI state programmatically, and handling close operations triggered by scripts, user actions, or conditional logic.
</div>

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


<div class="meta-api-description">
How do I properly clean up a Kendo UI DropDownTree instance? Clean up and release resources by tearing down the DropDownTree instance, including detaching event listeners, removing data attributes, clearing internal references to prevent memory leaks, and properly destroying any nested Kendo UI child components to ensure full component teardown without deleting the actual DOM element, enabling better performance, safe teardown, and memory management for dynamic UI updates or component lifecycle control.
</div>

#### Example

    <input id="dropdowntree"/>

    <script>
    $("#dropdowntree").kendoDropDownTree();
    var dropdowntree = $("#dropdowntree").data("kendoDropDownTree");
    dropdowntree.destroy();
    </script>

### enable

Enables or disables the widget.


<div class="meta-api-description">
How to enable interactive state for Kendo UI DropDownTree component? Control the interactive state of a hierarchical dropdown component by programmatically enabling or disabling user input, keyboard navigation, mouse clicks, and focus behavior through a method that toggles its enabled status. This functionality supports dynamically setting whether users can interact with the tree dropdown, activate or deactivate it on demand, manage focus and accessibility states, lock or unlock input handling, and adjust component responsiveness after initialization to prevent or allow user actions in various scenarios.
</div>

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


<div class="meta-api-description">
How do I programmatically set focus on the dropdown tree element in Kendo UI for jQuery? set keyboard focus programmatically to the dropdown tree element, enable keyboard navigation by shifting focus to the input or root node, activate component for receiving keystrokes and focus events, programmatically control focus to improve accessibility and interaction, move browser focus to the interactive dropdown tree control to support user input and keyboard-driven actions, ensure component gains active input state for seamless tab navigation and event triggering, invoke method to shift focus from other elements to dropdown tree for enhanced keyboard accessibility and user control.
</div>

#### Example - focus the widget

    <input id="dropdowntree"/>

    <script>
    $("#dropdowntree").kendoDropDownTree();
    var dropdowntree = $("#dropdowntree").data("kendoDropDownTree");
    dropdowntree.focus();
    </script>

### items

Obtains an Array of the DOM elements, which correspond to the data items from the Kendo UI HierarchicalDataSource [view](/api/javascript/data/datasource/methods/view).


<div class="meta-api-description">
How can I access the rendered DOM elements of each item in a Kendo UI for jQuery DropDownTree? Retrieve the list or array of rendered DOM elements representing each data item in a hierarchical dropdown or tree structure, enabling access to the visible nodes in the exact order and hierarchy as the underlying data source or view. This method supports inspecting individual tree nodes, iterating over displayed items, modifying element properties, attaching event listeners to specific tree entries, and synchronizing UI elements with data items for custom behaviors or dynamic updates. It is useful for developers looking to manipulate, query, or interact programmatically with the rendered nodes of a drop-down tree or hierarchical treeview component by accessing their corresponding HTML elements in a structure that matches the data order and hierarchy.
</div>

#### Example

    <input id="dropdowntree" />
    <script>
    $("#dropdowntree").kendoDropDownTree({
        dataSource: [
            { text: "Item 1", value: 1 },
            { text: "Item 2", value: 2, items: [
                { text: "Sub Item 1", value: 3 }
            ]}
        ]
    });
    
    var dropdowntree = $("#dropdowntree").data("kendoDropDownTree");
    var items = dropdowntree.items();
    console.log("Number of items:", items.length);
    </script>

#### Returns

`Array` The currently rendered first level items.

### open

Opens the popup.


<div class="meta-api-description">
How do I programmatically open a Kendo UI DropDownTree? Programmatically trigger the display or visibility of a hierarchical dropdown selection interface, enabling control over showing or revealing the nested tree menu through code commands rather than user clicks, facilitating automated opening for keyboard navigation, mouse interaction, and dynamic UI updates where the dropdown overlay and multi-level list become visible on demand.
</div>

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


<div class="meta-api-description">
How to make Kendo UI DropDownTree read-only while still submitting its value? Toggle or set the component to read-only mode to prevent user interaction such as keyboard input or mouse selection while retaining the current selected value for form submission; control or enable a state that blocks edits without disabling the field entirely, ensuring the component’s data is preserved and posted with the form submission; configure the field to accept no changes but still maintain and submit its value, differentiating between disabling input and retaining submission capability; switch between editable and non-editable states where the readonly state allows value retention and form data inclusion, unlike disabled which blocks submission.
</div>

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


<div class="meta-api-description">
How do I refresh the dropdown tree popup content in Kendo UI for jQuery? Trigger an update to redraw or re-render the dropdown tree popup content and visible items, ensuring the displayed list, item templates, filters, selections, and data changes are fully refreshed without recreating the entire component; use this to force the popup to refresh its UI instantly after dynamic data modifications, state updates, or template adjustments, synchronizing the interactive dropdown tree display with current application state and reflecting any programmatic modifications or filter applications in real time.
</div>

#### Example - refresh the popup items

    <input id="dropdowntree"/>

    <script>
    $("#dropdowntree").kendoDropDownTree();

    var dropdowntree = $("#dropdowntree").data("kendoDropDownTree");

    dropdowntree.refresh();
    </script>

### search

Searches the data source for the provided value and displays any matches as suggestions.


<div class="meta-api-description">
How to enable autocomplete in Kendo UI for jQuery DropDownTree? Configure how to perform searches within hierarchical dropdown lists to find and display matching items by filtering data sources, enabling autocomplete or typeahead functionality, controlling suggestion lists, handling user input to show relevant tree nodes, setting up programmatic search methods, triggering dynamic filtering or external event-based population of dropdown options, and managing search behavior to provide real-time, context-aware suggestions in multi-level selection interfaces.
</div>

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


<div class="meta-api-description">
How can I dynamically update the data source in my Kendo UI DropDownTree control at runtime? Change or update the hierarchical data source for a dropdown tree control dynamically at runtime, enabling you to bind new datasets such as local arrays, remote AJAX results, or existing data source instances without reinitializing the entire component, while automatically refreshing, re-rendering tree items, updating selections, and maintaining data bindings.
</div>

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


<div class="meta-api-description">
How can I programmatically open or close a hierarchical dropdown popup in Kendo UI for jQuery? Control the visibility of a hierarchical dropdown popup by programmatically opening or closing the tree selector menu, enabling toggling between expanded and collapsed states to manage popup display dynamically. This method supports triggering the popup’s show or hide actions from custom buttons, keyboard shortcuts, event handlers, application logic, or interactive UI controls, facilitating precise control over tree-based dropdown menus and their expanded or collapsed popup views. Use this to programmatically switch the dropdown’s display state, integrate with custom interaction workflows, or automate opening and closing behavior in response to user input or application events.
</div>

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


<div class="meta-api-description">
How to programmatically update selected item in Kendo UI DropDownTree component? Access, retrieve, or programmatically update the selected item or current choice within a hierarchical dropdown tree component by getting or setting its value; control selection state for data binding, dynamic updates, or code-driven changes while managing auto data fetching when no items exist, handling automatic clearing of filters to reset selection scope, and understanding that direct value assignment does not emit change events, thus requiring manual event triggering to synchronize model bindings or MVVM frameworks, enabling developers to configure, manipulate, or synchronize user selections across different UI states and interaction scenarios seamlessly.
</div>

#### Parameters

##### value `Array|String`

The value to set. A *String* value, when [checkboxes](/api/javascript/ui/dropdowntree/configuration/checkboxes) is 'false', and an *Array* of items of the value field type (number or string), when `checkboxes` is true. To clear the value, pass an empty array.

#### Returns

`Array` The value of the DropDownTree.

#### Example - set value

    <input id="dropdowntree" />

    <script>
        $("#dropdowntree").kendoDropDownTree({
            dataSource: [{ text: "Item1", value: 1 }, { text: "Item2", value: 2 }],
            checkboxes:true
        });

        var dropdowntree = $("#dropdowntree").data("kendoDropDownTree");

        // set the value of the dropdowntree
        dropdowntree.value([1, 2]); //select items which have value respectively 1 and 2

        // get the value of the dropdowntree
	/* The result can be observed in the DevTools(F12) console of the browser. */
        console.log(dropdowntree.value());
    </script>

## Events

### change

Fired when the value of the widget is changed by the user.

The event handler function context (available via the `this` keyword) will be set to the widget instance.

> **Important:** The event is not fired when the value of the widget is changed from code.


<div class="meta-api-description">
How do I handle selection changes in a Kendo UI DropdownTree component? capture user selection updates from dropdown tree components, detect and handle value changes triggered by users interacting with hierarchical dropdown menus, listen for selection modification events to execute custom logic or update UI, respond to user-driven choice changes without triggering on programmatic value sets, enable event handlers that have direct access to component methods and properties during selection change processing, track dynamic input events in tree-structured dropdown inputs, handle interactive change notifications when users pick or modify choices in nested dropdown lists, configure reactions or callbacks tied specifically to user-initiated selection changes in complex dropdown trees, control and monitor user interaction events focused on altering selected values, detect and process user changes in hierarchical dropdown controls without responding to automated or code-based value adjustments.
</div>

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


<div class="meta-api-description">
What triggers the close event in Kendo UI DropDownTree widget? Detect when a dropdown tree popup or menu closes to trigger focus restoration, update user interface selection highlights, perform cleanup routines, manage component state changes after closing, or execute analytics tracking and logging. Monitor for closure events to handle post-close operations such as enabling keyboard focus, refreshing UI selection display, managing internal state updates, running custom cleanup code, or collecting usage data when a dropdown tree or hierarchical menu collapses. This event detection supports controlling behavior upon the closure of expandable tree-like dropdown components, allowing developers to react to popup dismissal, focus shifts, and UI responsiveness in interactive widget interfaces.
</div>

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


<div class="meta-api-description">
What triggers when hierarchical data loading is complete in Kendo UI DropDownTree? Detect when hierarchical data loading completes, whether local or remote, synchronous or asynchronous, for tree structures displaying nested items, enabling dynamic updates, UI refreshes, node inspections, automatic expansions, or cascading data fetches after child nodes or parent levels finish binding; useful for triggering post-data-load logic, customizing displayed elements, monitoring asynchronous tree data operations, handling events fired upon full or partial data rendering in dropdown or treeview controls, and performing actions once all dataSource items and sub-levels are fully processed and presented.
</div>

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


<div class="meta-api-description">
How to customize filtering behavior in Kendo UI DropDownTree? Manage and customize live search and filter behavior before applying data queries in hierarchical dropdown or tree components, enabling inspection and modification of filter criteria, dynamic control over search input processing, implementing custom filtering logic, adjusting or overriding default filtering parameters, and updating user interface indicators or results display just before execution. This event-driven approach supports configuring, handling, controlling, or intercepting filter operations in tree structures to refine or extend search functionality, pre-process filtering queries, or integrate external filtering mechanisms within dropdown or dropdown-like tree views.
</div>

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


<div class="meta-api-description">
What event is triggered when a Kendo UI DropDownTree menu expands? Detect when a dropdown tree menu or hierarchical list expands or becomes visible due to user interaction, trigger custom functions or event handlers on popup opening, execute code upon opening to initialize UI elements, focus controls, modify or animate menu items dynamically, respond to user-initiated opening events, handle expansion events programmatically, run callbacks as soon as the dropdown tree or nested selection panel appears, control behaviors linked to the opening of hierarchical dropdown menus, enable interactions or state changes immediately after the popup is shown.
</div>

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


<div class="meta-api-description">
How do I prevent a node from being selected in a Kendo UI DropDownTree? Detect and manage user node selection actions within hierarchical dropdowns, intercept selection or deselection events including clicks on nodes or checkboxes, access and inspect selected node data, control or cancel selection changes programmatically using event handlers, respond to interactive changes in tree-structured dropdown menus, handle both single and multiple selection scenarios, trigger callbacks on node selection or unselection, implement custom behavior before a selection is finalized, and monitor user interactions with tree nodes for dynamic UI updates or validation logic.
</div>

#### Event Data

##### e.node `Element`

The selected node

#### Example - subscribe to the "select" event during initialization

    <input id="dropdowntree"/>
    <script>
    $("#dropdowntree").kendoDropDownTree({
      dataSource: [{ text: "item1", value: 1 }, { text: "item2", value: 2 }],
      select: function(e) {
	/* The result can be observed in the DevTools(F12) console of the browser. */
        console.log("Select", e.node);
        console.log("Node text --> " + $(e.node).text())
      }
    });
    </script>

#### Example - subscribe to the "select" event after initialization

    <input id="dropdowntree"/>
    <script>
    function dropdowntree_select(e) {
	/* The result can be observed in the DevTools(F12) console of the browser. */
      console.log("select", e.node);
    }
    $("#dropdowntree").kendoDropDownTree({
      dataSource: [{ text: "item1", value: 1 }, { text: "item2", value: 2 }],
    });
    var dropdowntree = $("#dropdowntree").data("kendoDropDownTree");
    dropdowntree.bind("select", dropdowntree_select);
    </script>


---
title: DockManager
page_title: Configuration, methods and events of Kendo UI DockManager
description: Configuration options, methods and events for the Kendo UI DockManager widget.
res_type: api
component: dockmanager
---

# kendo.ui.DockManager

Represents the Kendo UI DockManager. Inherits from [Widget](/api/javascript/ui/widget).

## Configuration

### rootPane `Object`

Defines the root pane configuration.


<div class="meta-api-description">
Set or customize the initial layout, root container, or main pane structure for docking interfaces by defining the primary pane and its child components, including layout arrangements, hierarchical pane organization, and startup settings. Control the root pane configuration to establish the base docking environment, specify nested pane setups, initialize the default docking layout, and adjust properties that determine how panes load, appear, and behave when the interface starts or resets. Use this to manage the foundational pane hierarchy, control default docking panels, set layout options for root-level panes, and ensure consistent startup arrangement of docked windows or views.
</div>

#### Example
    <div style="height:500px; width:1000px">
        <div id="dockmanager"></div>
    </div>
    <script>
    $("#dockmanager").kendoDockManager({
                rootPane: {
                    type: "split",
                    panes: [{
                        type: "split",
                        panes: [{
                                type: "content",
                                title: "Pane 1",
                                content: "Split Pane 1",
                                size: "40%"
                            }, {
                                type: "tab",
                                    panes: [{
                                        type: "content",
                                        title: "Tab 1",
                                        content: "Lorem ipsum dolor sit amet consectetur adipisicing elit."
                                    },
                                    {
                                        type: "content",
                                        title: "Tab 2",
                                        content: "Commodi suscipit porro optio veritatis obcaecati nostrum molestias dolor maxime!"
                                    },
                                    {
                                        type: "content",
                                        title: "Tab 3",
                                        content: "Molestias ducimus placeat quia possimus esse atque odio, a recusandae iste exercitationem"
                                    }],
                                size: "60%"
                            }]
                        }, {
                        type: "content",
                        header: "Bottom Tab",
                        content: "Bottom content",
                        size: "50%"
                    }, {
                        type: "content",
                        title: "Unpinned",
                        content: "Some unpinned content",
                        unpinnable: {
                            unpinned: true
                        }
                    }]
                }
            });
    </script>

### rootPane.id `String`

Defines the id of the root pane


<div class="meta-api-description">
Set or configure a unique identifier, ID, or key string for the main container, root pane, or primary layout panel to enable precise referencing, locating, querying, or targeting within layout management, state serialization, or programmatic manipulation workflows. Assigning a distinct root pane ID helps control, identify, filter, or access the top-level dock manager pane when saving, loading, or updating UI layouts, facilitating automated layout state handling and component tracking across different sessions or application states.
</div>

#### Example
    <div style="height:500px; width:1000px">
        <div id="dockmanager"></div>
    </div>
    <script>
    $("#dockmanager").kendoDockManager({
                rootPane: {
                    type: "split",
                    id: "rootPaneId",
                    panes: [{
                            type: "content",
                            title: "Pane 1",
                            content: "Split Pane 1",
                        },{
                            type: "content",
                            title: "Pane 2",
                            content: "Split Pane 2",
                        }]
                }
            });
    </script>

### rootPane.orientation `String` *(default: "horizontal")*

Defines the orientation of the split pane. Available options are `horizontal` or `vertical`.


<div class="meta-api-description">
Control and configure the direction of split panes to define layout flow and arrangement of child panes, enabling horizontal or vertical division for flexible resizing and panel organization. Adjusting the split-pane orientation helps manage how panels are stacked or aligned side by side, set layout flow direction, toggle between vertical or horizontal splits, and customize panel distribution in container interfaces to optimize user interface structure and responsive resizing behavior.
</div>

#### Example
    <div style="height:500px; width:1000px">
        <div id="dockmanager"></div>
    </div>
    <script>
    $("#dockmanager").kendoDockManager({
                rootPane: {
                    type: "split",
                    orientation: "vertical",
                    panes: [{
                            type: "content",
                            title: "Pane 1",
                            content: "Split Pane 1",
                        },{
                            type: "content",
                            title: "Pane 2",
                            content: "Split Pane 2",
                        }]
                }
            });
    </script>

### rootPane.panes `Array`

An array of pane definitions.


<div class="meta-api-description">
Manage and customize the collection of panes within the main container by setting, adding, removing, or rearranging pane components dynamically. Configure the layout and organization of multiple panels or views inside the root container, control which panes are displayed, adjust their order, update their definitions, and handle the overall structure for docking interfaces. Enable flexible pane management by specifying arrays of pane configurations to control rendering, ordering, visibility, and arrangement within the primary docking area, optimizing the user interface layout and multitasking workspace.
</div>

#### Example
    
    <div style="height:500px; width:1000px">
        <div id="dockmanager"></div>
    </div>
    <script>
    $("#dockmanager").kendoDockManager({
        rootPane: {
            type: "split",
            panes: [{
                type: "content",
                title: "First Pane",
                content: "Content of the first pane"
            }, {
                type: "content",
                title: "Second Pane",
                content: "Content of the second pane"
            }]
        }
    });
    </script>

### rootPane.panes.closeable `Boolean` *(default: true)*

Specifies if the pane can be closed. Available only for panes of type `content`.


<div class="meta-api-description">
Configure whether a pane can be closed or removed from the user interface, enabling or disabling the close or dismiss action for content sections within the layout. Control the ability to hide, remove, or shut down individual content panes, set whether users can close specific panels, toggle pane closability, and manage if sections remain fixed or dismissible in the workspace. Adjust pane removal options, allow or block closing behaviors, and specify if a particular content area supports being closed or not, enhancing flexible layout management or restricting user interactions with content components.
</div>

#### Example
    <div style="height:500px; width:1000px">
        <div id="dockmanager"></div>
    </div>
    <script>
    $("#dockmanager").kendoDockManager({
                rootPane: {
                    type: "split",
                    id: "rootPaneId",
                    panes: [{
                            type: "content",
                            title: "Pane 1",
                            content: "Split Pane 1",
                            closeable: false
                        },{
                            type: "content",
                            title: "Pane 2",
                            content: "Split Pane 2",
                        }]
                }
            });
    </script>

### rootPane.panes.content `String|Function`

The content of the pane. Available only for panes of type `content`.


<div class="meta-api-description">
Set, get, or embed the inner content of a pane, including HTML markup, DOM elements, or UI components, to control what appears inside a panel or section of a layout manager. Configure dynamic content by injecting templates, rendered elements, or interactive components within container areas for flexible layout rendering. Manage, update, or retrieve pane contents for content-driven panels, enabling embedded HTML, custom elements, or component instances to be displayed as the main visual content of a dockable pane or container region within a user interface.
</div>

#### Example
    <div style="height:500px; width:1000px">
        <div id="dockmanager"></div>
    </div>
    <script>
    $("#dockmanager").kendoDockManager({
                rootPane: {
                    type: "split",
                    id: "rootPaneId",
                    panes: [{
                            type: "content",
                            title: "Pane 1",
                            content: "Split Pane 1",
                        },{
                            type: "content",
                            title: "Pane 2",
                            content: ({ username }) => `User name: ${username}`,
                        }]
                }
            });
    </script>

### rootPane.panes.dockable `Object|Boolean` *(default: true)*

Specifies if the pane can be docked and allow inner docking of other panes. Accepts boolean or object. Available only for panes of type `content`.


<div class="meta-api-description">
Control whether a content pane can be docked, allowing it to act as a container for other panes, enable or disable docking capabilities for flexible layout management, set docking options through boolean or configuration object to customize pane behavior, configure if a pane is docking-enabled to support nested panes and dynamic reorganization within the interface, manage docking state to allow or restrict panes from being repositioned, hosted inside other panes, or integrated into complex layouts during application initialization or runtime.
</div>

#### Example
    <div style="height:500px; width:1000px">
        <div id="dockmanager"></div>
    </div>
    <script>
    $("#dockmanager").kendoDockManager({
                rootPane: {
                    type: "split",
                    id: "rootPaneId",
                    panes: [{
                            type: "content",
                            title: "Pane 1",
                            content: "Pane 1",
                            dockable: false
                        },{
                            type: "content",
                            title: "Pane 2",
                            content: "Pane 2"
                        },{
                            type: "content",
                            title: "Pane 3",
                            content: "Pane 3",
                        }]
                }
            });
    </script>

### rootPane.panes.dockable.dock `Boolean` *(default: true)*

Specifies if the pane is docked. Available only for panes of type `content`.


<div class="meta-api-description">
Control the initial docking state of a content pane by configuring whether it starts attached to the main interface or floats independently, enabling setting, enabling, or toggling between docked and undocked modes, determining the pane’s default placement as embedded, fixed, attached, or free-floating, managing containment or detachment behavior of UI panels, adjusting layout initialization to specify if a pane is anchored, fixed in place, or movable as a floating window within the DockManager environment.
</div>

#### Example
    
    <div style="height:500px; width:1000px">
        <div id="dockmanager"></div>
    </div>
    <script>
    $("#dockmanager").kendoDockManager({
        rootPane: {
            type: "split",
            panes: [{
                type: "content",
                title: "Docked Pane",
                content: "This pane is docked",
                dockable: {
                    dock: true
                }
            }, {
                type: "content",
                title: "Undocked Pane",
                content: "This pane is not docked",
                dockable: {
                    dock: false
                }
            }]
        }
    });
    </script>

### rootPane.panes.dockable.innerDock `Boolean` *(default: true)*

Specifies if the pane allows inner docks. Available only for panes of type `content`.


<div class="meta-api-description">
Control and configure nested docking capabilities within a content pane to host multiple dockable areas inside the same container, enabling inner docks or embedded docking zones. This setting allows panes to support layered or hierarchical docking arrangements, facilitating the organization and management of dockable windows inside a parent pane. Developers may want to enable, disable, or customize inner docking regions during layout initialization or dynamic interface composition, especially when working with content panes that require multiple embedded dockable panels or containers. This property is key for advanced docking scenarios where internal subdivision and multi-level docking structures are necessary for complex UI designs.
</div>

#### Example
    <div style="height:500px; width:1000px">
        <div id="dockmanager"></div>
    </div>
    <script>
    $("#dockmanager").kendoDockManager({
                rootPane: {
                    type: "split",
                    id: "rootPaneId",
                    panes: [{
                            type: "content",
                            title: "Pane 1",
                            content: "Pane 1",
                            dockable: {
                                innerDock: false
                            }
                        },{
                            type: "content",
                            title: "Pane 2",
                            content: "Pane 2"
                        },{
                            type: "content",
                            title: "Pane 3",
                            content: "Pane 3",
                        }]
                }
            });
    </script>

### rootPane.panes.header `String|Function`

Sets the content of the header. Accepts a string or a kendo template. By default, the same content is displayed in the tab when the pane is unpinned or within a pane of type `tab`. If not specified the title is displayed. Available only for panes of type `content`.


<div class="meta-api-description">
Configure and customize the header area of a dockable pane with flexible options to set text labels, HTML strings, or template-based content for the pane’s top section, including the tab label shown when the pane is unpinned, docked, or arranged as a tab. Control how the pane’s title or custom markup appears in both pinned and tabbed states, enabling personalized pane headers beyond default titles, especially within content panes that support custom header rendering or templating for enhanced user interface presentation and dynamic label formatting.
</div>

#### Example
    <div style="height:500px; width:1000px">
        <div id="dockmanager"></div>
    </div>
    <script>
    $("#dockmanager").kendoDockManager({
                rootPane: {
                    type: "split",
                    id: "rootPaneId",
                    panes: [{
                            type: "content",
                            title: "Pane 1",
                            content: "Pane 1",
                            header: "Pane 1 header"
                        },{
                            type: "content",
                            title: "Pane 2",
                            content: ({ headerContent }) => `Pane: ${headerContent}`,
                        },{
                            type: "content",
                            title: "Pane 3",
                            content: "Pane 3",
                        }]
                }
            });
    </script>

### rootPane.panes.id `String`

Defines the id of the pane


<div class="meta-api-description">
Set or configure a unique identifier to target, reference, or query a specific pane within a docking system, enabling precise control over that pane’s state, visibility, position, or behavior. Use this ID to persist or restore pane layouts, programmatically open or close panels, bind events or actions, move panes dynamically, and manage individual dockable components in complex UI arrangements. This identifier supports searching for panes by name, linking pane states to user sessions, and facilitating automated or interactive manipulation in user interface frameworks that handle multiple resizable or movable panels.
</div>

#### Example
    <div style="height:500px; width:1000px">
        <div id="dockmanager"></div>
    </div>
    <script>
    $("#dockmanager").kendoDockManager({
                rootPane: {
                    type: "split",
                    panes: [{
                            type: "content",
                            title: "Pane 1",
                            content: "Pane 1",
                            id: "myFirstPane"
                        },{
                            type: "content",
                            title: "Pane 2",
                            content: "Pane 2",
                            id: "mySecondPane"
                        }]
                }
            });
    </script>

### rootPane.panes.orientation `String` *(default: "horizontal")*

Specifies the orientation of a split pane. Supported values are "horizontal" and "vertical".


<div class="meta-api-description">
Configure or set the layout direction of split panes within a container to arrange child panels either horizontally side by side (left-to-right) or vertically stacked (top-to-bottom), enabling control over pane orientation, alignment, or division axis to manage how sections or components are divided, split, or organized visually in user interfaces or docking environments.
</div>

#### Example
    <div style="height:500px; width:1000px">
        <div id="dockmanager"></div>
    </div>
    <script>
    $("#dockmanager").kendoDockManager({
                rootPane: {
                    type: "split",
                    orientation: "vertical",
                    panes: [{
                            type: "content",
                            title: "Pane 1",
                            content: "Pane 1"
                        },{
                            type: "content",
                            title: "Pane 2",
                            content: "Pane 2"
                        }]
                }
            });
    </script>

### rootPane.panes.panes `Array`

Specifies an array of pane definitions.


<div class="meta-api-description">
Configure and manage multiple layout sections or window panels within the main root container by specifying an array of pane settings, enabling complex docking arrangements, nested subpanes, split views, and customizable pane layouts for dynamic user interfaces. Control how different sections or panels are arranged, docked, resized, and organized inside the root workspace by providing detailed configurations for each pane. Set up multi-pane environments, floating or fixed docking zones, and hierarchical pane structures to create flexible, resizable, and manageable UI layouts that support workflow optimization and content separation. Adjust or define initial pane positions, dimensions, docking behaviors, and layout hierarchies programmatically to tailor the workspace to varied application needs and user interaction patterns.
</div>

#### Example
    
    <div style="height:500px; width:1000px">
        <div id="dockmanager"></div>
    </div>
    <script>
    $("#dockmanager").kendoDockManager({
        rootPane: {
            type: "split",
            panes: [{
                type: "tab",
                panes: [{
                    type: "content",
                    title: "Tab 1",
                    content: "Content of Tab 1"
                }, {
                    type: "content",
                    title: "Tab 2",
                    content: "Content of Tab 2"
                }]
            }]
        }
    });
    </script>

### rootPane.panes.selected `Number`

Specifies the index of the initially selected tab. Available only for panes of type `tab`.


<div class="meta-api-description">
Configure or control which tab is initially active or selected in a tabbed pane interface by specifying the numeric index of the starting tab within a multi-tab container. Enable setting the default or initial active tab for tabbed layouts, controlling which pane or view appears first on load, focusing on tab selection, tab switching, and startup active panel configuration. Manage the starting or preselected tab by index in tabbed components, useful for initializing the interface with a specific tab open in tab containers or tab panels. Adjust initial tab focus, active tab index, or default selected tab in tabbed user interface elements to customize startup views or layouts.
</div>

#### Example
    <div style="height:500px; width:1000px">
        <div id="dockmanager"></div>
    </div>
    <script>
    $("#dockmanager").kendoDockManager({
                rootPane: {
                    type: "tab",
                    selected: 2,
                    panes: [{
                            type: "content",
                            title: "Pane 1",
                            content: "Pane 1"
                        },{
                            type: "content",
                            title: "Pane 2",
                            content: "Pane 2"
                        },{
                            type: "content",
                            title: "Pane 3",
                            content: "Pane 3"
                        }]
                }
            });
    </script>

### rootPane.panes.size `String`

Specifies the size of a pane defined as pixels (i.e. "200px") or as a percentage (i.e. "50%").


<div class="meta-api-description">
Control and configure the starting dimensions of a layout pane or panel within a docking or window management interface by specifying its width or height using fixed pixel values or relative percentage sizes, enabling precise initial sizing, responsive layout adjustments, and setup of pane proportions during user interface initialization, panel arrangement, or window docking scenarios, with options to set exact size constraints or flexible scaling based on container dimensions for optimal space distribution and layout consistency.
</div>

#### Example
    <div style="height:500px; width:1000px">
        <div id="dockmanager"></div>
    </div>
    <script>
    $("#dockmanager").kendoDockManager({
                rootPane: {
                    type: "split",
                    panes: [{
                            type: "content",
                            title: "Pane 1",
                            content: "Pane 1",
                            size: "20%"
                        },{
                            type: "content",
                            title: "Pane 2",
                            content: "Pane 2",
                            size: "30%"
                        },{
                            type: "content",
                            title: "Pane 3",
                            content: "Pane 3",
                            size:"50%"
                        }]
                }
            });
    </script>


### rootPane.panes.tabHeader `String|Function`

Sets the content of the tab when the pane is unpinned or within a `tab` pane. If not specified, `header` content is used. Available only for panes of type `content`.


<div class="meta-api-description">
Customize or configure the displayed tab label, title, or header content for panes when they are unpinned, docked as tabs, or hosted within tabbed containers, enabling control over what text, icon, or custom elements appear in tab headers for content panes. Set or override the default pane header presentation specifically for tabbed views, allowing developers to define distinct tab captions, labels, or visual tab indicators separate from the main pane header. This supports scenarios where tabs need unique titles, localized labels, or dynamic tab header content differing from the standard pane header in docking environments that manage content containers.
</div>

#### Example
    <div style="height:500px; width:1000px">
        <div id="dockmanager"></div>
    </div>
    <script>
    $("#dockmanager").kendoDockManager({
                rootPane: {
                    type: "split",
                    panes: [{
                        type: "content",
                        header: "Pane 1",
                        content: "Pane content"
                    }, {
                        type: "content",
                        header: "Pane 2",
                        content: "Other content"
                    }, {
                        type: "content",
                        title: "Unpinned",
                        tabHeader: "I'm unpinned",
                        content: "Some unpinned content",
                        unpinnable: {
                            unpinned: true
                        }
                    }]
                }
            });
    </script>

### rootPane.panes.title `String`

Sets the title of the pane. Available only for panes of type `content`.


<div class="meta-api-description">
Configure or set the visible header text, title, or label for a content pane within a docking layout or window manager interface, enabling control over the displayed tab name, header caption, or pane identifier to customize how individual content areas are titled, labeled, or referenced in multi-pane layouts or tabbed interfaces, applicable specifically when defining or managing content-type panes for clearer navigation, UI clarity, or user interface personalization.
</div>

#### Example
    <div style="height:500px; width:1000px">
        <div id="dockmanager"></div>
    </div>
    <script>
    $("#dockmanager").kendoDockManager({
                rootPane: {
                    type: "split",
                    orientation: "vertical",
                    panes: [{
                            type: "content",
                            title: "Pane title",
                            content: "Pane 1"
                        },{
                            type: "content",
                            title: "Pane 2",
                            content: "Pane 2"
                        }]
                }
            });
    </script>


### rootPane.panes.type `String`

Specifies the type of the pane. Available options are `tab`, `split` or `content`.


<div class="meta-api-description">
Control and customize the layout and rendering behavior of panes within a DockManager by setting the pane type to dictate whether panes appear as tabbed interfaces for multiple content tabs, resizable split containers that allow adjustable pane sizes, or simple content-only areas without tabs or splits, enabling configuration of pane arrangement, resizing, tab hosting, split views, content display modes, and flexible UI layout management for various windowing or docking scenarios.
</div>

#### Example
    <div style="height:500px; width:1000px">
        <div id="dockmanager"></div>
    </div>
    <script>
    $("#dockmanager").kendoDockManager({
                rootPane: {
                    type: "split",
                    panes: [{
                        type: "split",
                        panes: [{
                                type: "content",
                                title: "Pane 1",
                                content: "Split Pane 1",
                                size: "40%"
                            }, {
                                type: "tab",
                                    panes: [{
                                        type: "content",
                                        title: "Tab 1",
                                        content: "Lorem ipsum dolor sit amet consectetur adipisicing elit."
                                    },
                                    {
                                        type: "content",
                                        title: "Tab 2",
                                        content: "Commodi suscipit porro optio veritatis obcaecati nostrum molestias dolor maxime!"
                                    },
                                    {
                                        type: "content",
                                        title: "Tab 3",
                                        content: "Molestias ducimus placeat quia possimus esse atque odio, a recusandae iste exercitationem"
                                    }],
                                size: "60%"
                            }]
                        }, {
                        type: "content",
                        header: "Bottom Tab",
                        content: "Bottom content",
                        size: "50%"
                    }, {
                        type: "content",
                        title: "Unpinned",
                        content: "Some unpinned content",
                        unpinnable: {
                            unpinned: true
                        }
                    }]
                }
            });
    </script>

### rootPane.panes.unpinnable `Object|Boolean` *(default: true)*

Specifies if the pane can be pinned/unpinnned. Available only for panes of type `content`.


<div class="meta-api-description">
Manage the ability to enable, disable, or restrict pinning and unpinning of content panes within a docking interface, controlling whether a panel or section can be fixed in place or floated freely. Adjust settings to allow users to pin, unpin, lock, or unlock specific content areas in a layout, toggling the interactivity of dockable panes for flexible UI composition, preventing or permitting the attachment or detachment of panels based on user or programmatic control over pane docking behavior.
</div>

#### Example
    
    <div style="height:500px; width:1000px">
        <div id="dockmanager"></div>
    </div>
    <script>
    $("#dockmanager").kendoDockManager({
        rootPane: {
            type: "split",
            panes: [{
                type: "content",
                title: "Unpinnable Pane",
                content: "This pane can be unpinned",
                unpinnable: true
            }, {
                type: "content",
                title: "Non-Unpinnable Pane",
                content: "This pane cannot be unpinned",
                unpinnable: false
            }]
        }
    });
    </script>

### rootPane.panes.unpinnable.unpinned `Boolean` *(default: true)*

Specifies if the pane is unpinned. Available only for panes of type `content`.


<div class="meta-api-description">
Set or configure whether a content pane starts in an unpinned state, enabling panes to initialize as floating, undocked, or not fixed within a DockManager interface. Control the default dock status to have panes open as unpinned, detached, or freely movable rather than anchored or pinned, adjusting startup layout behavior for content areas. Manage pane docking states like pinned versus unpinned, configure initial pane positioning, enable dynamic floating panels, or specify whether the pane loads in a detached mode for flexible user interface arrangements.
</div>

#### Example
    <div style="height:500px; width:1000px">
        <div id="dockmanager"></div>
    </div>
    <script>
    $("#dockmanager").kendoDockManager({
                rootPane: {
                    type: "split",
                    panes: [{
                        type: "content",
                        header: "Pane 1",
                        content: "Pane content"
                    }, {
                        type: "content",
                        header: "Pane 2",
                        content: "Other content",
                        unpinnable: {
                            unpinned: false
                        }
                    }, {
                        type: "content",
                        title: "Unpinned",
                        content: "Some unpinned content",
                        unpinnable: {
                            unpinned: true
                        }
                    }]
                }
            });
    </script>

### rootPane.panes.unpinnable.unpinnedSize `String`

The size of the pane when unpinned. If not specified the pinned size is used. Available only for panes of type `content`.


<div class="meta-api-description">
Adjust or set the size, width, or height of a content pane when it is detached, floating, or unpinned from its docked position by specifying an unpinned size, controlling how large or small the pane appears while it is not pinned; this setting overrides the default pinned size used when no custom unpinned dimensions are provided and applies exclusively to content panes that can be undocked or floated, enabling customization of layout behavior when panels are in an unpinned state.
</div>

#### Example
    <div style="height:500px; width:1000px">
        <div id="dockmanager"></div>
    </div>
    <script>
    $("#dockmanager").kendoDockManager({
                rootPane: {
                    type: "split",
                    panes: [{
                        type: "content",
                        header: "Pane 1",
                        content: "Pane content"
                    }, {
                        type: "content",
                        header: "Pane 2",
                        content: "Other content"
                    }, {
                        type: "content",
                        title: "Unpinned",
                        content: "Some unpinned content",
                        unpinnable: {
                            unpinned: true,
                            unpinnedSize: "500px"
                        }
                    }]
                }
            });
    </script>

### rootPane.panes.visible `Boolean` *(default: true)*

Specifies if the pane is initially visible.


<div class="meta-api-description">
Set or configure whether a pane is displayed or hidden when a docking system or interface loads by enabling or disabling its initial visibility state; control startup display settings for panes, manage default pane appearance at initialization, toggle pane visibility on or off during application launch, define which UI components or panels appear first in dock layouts, and adjust starting pane display conditions with true or false flags to show or conceal panes automatically.
</div>

#### Example
    <div style="height:500px; width:1000px">
        <div id="dockmanager"></div>
    </div>
    <script>
    $("#dockmanager").kendoDockManager({
                rootPane: {
                    type: "split",
                    panes: [{
                        type: "content",
                        header: "Pane 1",
                        content: "Pane content"
                    },{
                        type: "content",
                        header: "Pane 2",
                        content: "Hidden Pane",
                        visible: false
                    }, {
                        type: "content",
                        header: "Pane 3",
                        content: "Other content"
                    }, {
                        type: "content",
                        title: "Unpinned",
                        content: "Some unpinned content",
                        unpinnable: {
                            unpinned: true
                        }
                    }]
                }
            });
    </script>

### rootPane.type `String` *(default: "split")*

Defines the id of the root pane. Available options are `tab` or `split`.


<div class="meta-api-description">
Configure the main container layout mode for the docking interface, enabling setting the root pane to use either tabbed navigation or a split panel arrangement, controlling how the primary workspace organizes child components, allowing selection between tabbed views or resizable split areas during initialization or setup, facilitating customization of the root container behavior to support either stacked tabs or divided sections for complex UI layouts.
</div>

#### Example
    <div style="height:500px; width:1000px">
        <div id="dockmanager"></div>
    </div>
    <script>
    $("#dockmanager").kendoDockManager({
                rootPane: {
                    type: "tab",
                    panes: [{
                        type: "content",
                        header: "Pane 1",
                        content: "Pane content"
                    }, {
                        type: "content",
                        header: "Pane 2",
                        content: "Secpnd Pane content"
                    }, {
                        type: "content",
                        title: "Pane 3",
                        content: "Third Pane content"
                    }]
                }
            });
    </script>

## Methods

### togglePane

Toggles the visibility of a pane.


<div class="meta-api-description">
Control pane visibility dynamically by toggling a pane's open or closed state, enabling you to show, hide, collapse, expand, or switch a pane’s display within a docked layout programmatically during runtime. Adjust or modify pane visibility based on user interactions, application events, or layout changes, allowing seamless management of which panes are visible or hidden in a flexible docking interface. Use this mechanism to manage UI components' presence, update layouts dynamically, and respond to contextual triggers to enable or disable pane display without manual intervention.
</div>

#### Example
    <div style="height:500px; width:1000px">
        <div id="dockmanager"></div>
    </div>
    <script>
    var dockmanager = $("#dockmanager").kendoDockManager({
                rootPane: {
                    type: "split",
                    panes: [{
                        type: "content",
                        header: "Pane 1",
                        content: "Pane content"
                    },{
                        type: "content",
                        id: "hiddenPaneId",
                        header: "Pane 2",
                        content: "Hidden Pane",
                        visible: false
                    }, {
                        type: "content",
                        header: "Pane 3",
                        content: "Other content"
                    }, {
                        type: "content",
                        title: "Unpinned",
                        content: "Some unpinned content",
                        unpinnable: {
                            unpinned: true
                        }
                    }]
                }
            }).data("kendoDockManager");

            dockmanager.togglePane("hiddenPaneId") //Toggles the visibility of the pane with id "hiddenPaneId".
    </script>

#### Parameters

##### id `String`

The `id` assigned as a configuration option of the pane.

### refresh

Renders all panes with the current `panes` configuration.


<div class="meta-api-description">
Trigger a full re-render or refresh of all layout panes to update the current pane configuration, synchronize DOM elements with added, removed, or modified panes, apply programmatic layout changes, reset or reload pane states, enforce layout consistency after dynamic updates, reapply pane definitions after initialization, update visual structure of docked elements, and ensure display reflects the latest pane setup or configuration changes.
</div>

#### Example
    <div style="height:500px; width:1000px">
        <div id="dockmanager"></div>
    </div>
    <script>
    var dockmanager = $("#dockmanager").kendoDockManager({
                rootPane: {
                    type: "split",
                    panes: [{
                        type: "content",
                        header: "Pane 1",
                        content: "Pane content"
                    },{
                        type: "content",
                        id: "hiddenPaneId",
                        header: "Pane 2",
                        content: "Hidden Pane",
                        visible: false
                    }, {
                        type: "content",
                        header: "Pane 3",
                        content: "Other content"
                    }, {
                        type: "content",
                        title: "Unpinned",
                        content: "Some unpinned content",
                        unpinnable: {
                            unpinned: true
                        }
                    }]
                }
            }).data("kendoDockManager");

            dockmanager.refresh();
    </script>

### removePane

Removes a pane.


<div class="meta-api-description">
Remove or close a panel or section from a dockable interface dynamically, enabling runtime updates to the layout by eliminating a specified pane or component to free up space, detach, hide, or clear content; control and modify the arrangement by programmatically removing elements, causing the remaining parts to rearrange seamlessly, supporting UI updates such as closing tabs, detaching views, or clearing panels from a container or workspace.
</div>

#### Parameters

##### id `String`

The `id` assigned as a configuration option of the pane.

#### Example
    <div style="height:500px; width:1000px">
        <div id="dockmanager"></div>
    </div>
    <script>
    var dockmanager = $("#dockmanager").kendoDockManager({
                rootPane: {
                    type: "split",
                    panes: [{
                        type: "content",
                        header: "Pane 1",
                        content: "Pane content"
                    },{
                        type: "content",
                        id: "myPaneId",
                        header: "Pane 2",
                        content: "More content"
                    }, {
                        type: "content",
                        header: "Pane 3",
                        content: "Other content"
                    }, {
                        type: "content",
                        title: "Unpinned",
                        content: "Some unpinned content",
                        unpinnable: {
                            unpinned: true
                        }
                    }]
                }
            }).data("kendoDockManager");

            dockmanager.removePane("myPaneId"); // Remove the pane with id "myPaneId".
    </script>

## Events

### close

Triggered when the pane is closed.


<div class="meta-api-description">
Detecting pane closure events within the dock management system enables developers to handle actions triggered when a pane or window is closed, including cleaning up resources, saving or persisting layout configurations, updating user interface elements, synchronizing application state after a pane closes, attaching custom event handlers for post-closure logic, managing resource release, responding to panel or pane shutdowns, and integrating closure detection in dynamic docking environments for state management and UI updates.
</div>

#### Example - subscribing to the close event during initialization

    <div style="height:500px; width:1000px">
        <div id="dockmanager"></div>
    </div>
    <script>
    $("#dockmanager").kendoDockManager({
                close: function(e){
                    // pane is closed
                },
                rootPane: {
                    type: "split",
                    orientation: "vertical",
                    panes: [{
                            type: "content",
                            title: "Pane title",
                            content: "Pane 1"
                        },{
                            type: "content",
                            title: "Pane 2",
                            content: "Pane 2"
                        }]
                }
            });
    </script>

#### Example - subscribing to the close event after initialization

    <div style="height:500px; width:1000px">
        <div id="dockmanager"></div>
    </div>
    <script>
    function pane_close(e) {
      // pane is closed
    }
    $("#dockmanager").kendoDockManager({
                rootPane: {
                    type: "split",
                    orientation: "vertical",
                    panes: [{
                            type: "content",
                            title: "Pane title",
                            content: "Pane 1"
                        },{
                            type: "content",
                            title: "Pane 2",
                            content: "Pane 2"
                        }]
                }
            });
    var dockmanager = $("#dockmanager").data("kendoDockManager");
    dockmanager.bind("close", pane_close);
    </script>

### dock

Triggered when a pane is docked.


<div class="meta-api-description">
Detect when a pane is attached or placed into a docking area, capture docking actions, trigger custom code upon pane placement, respond to layout changes when panels are docked, listen for docking events to update interface state, execute logic after docking finishes, monitor docking operations for UI synchronization, track when components become docked or re-docked, handle events signaling pane attachment to dock zones, and manage state persistence or layout adjustments based on docking occurrences.
</div>

#### Example - subscribing to the dock event during initialization

    <div style="height:500px; width:1000px">
        <div id="dockmanager"></div>
    </div>
    <script>
    $("#dockmanager").kendoDockManager({
                dock: function(e){
                    // pane is docked
                },
                rootPane: {
                    type: "split",
                    orientation: "vertical",
                    panes: [{
                            type: "content",
                            title: "Pane title",
                            content: "Pane 1"
                        },{
                            type: "content",
                            title: "Pane 2",
                            content: "Pane 2"
                        }]
                }
            });
    </script>

#### Example - subscribing to the dock event after initialization

    <div style="height:500px; width:1000px">
        <div id="dockmanager"></div>
    </div>
    <script>
    function pane_dock(e) {
      // pane is docked
    }
    $("#dockmanager").kendoDockManager({
                rootPane: {
                    type: "split",
                    orientation: "vertical",
                    panes: [{
                            type: "content",
                            title: "Pane title",
                            content: "Pane 1"
                        },{
                            type: "content",
                            title: "Pane 2",
                            content: "Pane 2"
                        }]
                }
            });
    var dockmanager = $("#dockmanager").data("kendoDockManager");
    dockmanager.bind("close", pane_dock);
    </script>

### drag

Triggered when a pane is dragged.


<div class="meta-api-description">
Detecting or handling pane dragging, tracking user interactions with movable panels, responding to drag events when rearranging UI components, capturing dragging actions to customize behavior, enabling dynamic layout updates during pane movement, controlling visual feedback and snap-to-grid functionality while dragging, monitoring drag operations for rearranging interface sections, configuring drag event listeners for interactive pane repositioning, managing user-driven drag-and-drop within dashboards or window managers, setting up callbacks or event handlers triggered by pane drag interactions in the interface.
</div>

#### Example - subscribing to the drag event during initialization

    <div style="height:500px; width:1000px">
        <div id="dockmanager"></div>
    </div>
    <script>
    $("#dockmanager").kendoDockManager({
                drag: function(e){
                    // pane is dragged
                },
                rootPane: {
                    type: "split",
                    orientation: "vertical",
                    panes: [{
                            type: "content",
                            title: "Pane title",
                            content: "Pane 1"
                        },{
                            type: "content",
                            title: "Pane 2",
                            content: "Pane 2"
                        }]
                }
            });
    </script>

#### Example - subscribing to the drag event after initialization

    <div style="height:500px; width:1000px">
        <div id="dockmanager"></div>
    </div>
    <script>
    function pane_drag(e) {
      // pane is dragged
    }
    $("#dockmanager").kendoDockManager({
                rootPane: {
                    type: "split",
                    orientation: "vertical",
                    panes: [{
                            type: "content",
                            title: "Pane title",
                            content: "Pane 1"
                        },{
                            type: "content",
                            title: "Pane 2",
                            content: "Pane 2"
                        }]
                }
            });
    var dockmanager = $("#dockmanager").data("kendoDockManager");
    dockmanager.bind("close", pane_drag);
    </script>

### dragEnd

Triggered when a pane drag ends.


<div class="meta-api-description">
Detect when dragging a panel or pane finishes, capture drag completion events to trigger actions like updating window layouts, saving positions, logging drag operations, enabling custom post-drag behaviors, reacting to pane repositioning, handling drag stop triggers, managing UI changes after drag events, controlling pane movement completion, and running code after users finish dragging interface elements.
</div>

#### Example - subscribing to the dragEnd event during initialization

    <div style="height:500px; width:1000px">
        <div id="dockmanager"></div>
    </div>
    <script>
    $("#dockmanager").kendoDockManager({
                dragEnd: function(e){
                    // dragging has finished
                },
                rootPane: {
                    type: "split",
                    orientation: "vertical",
                    panes: [{
                            type: "content",
                            title: "Pane title",
                            content: "Pane 1"
                        },{
                            type: "content",
                            title: "Pane 2",
                            content: "Pane 2"
                        }]
                }
            });
    </script>

#### Example - subscribing to the dragEnd event after initialization

    <div style="height:500px; width:1000px">
        <div id="dockmanager"></div>
    </div>
    <script>
    function pane_dragEnd(e) {
      // dragging has finished
    }
    $("#dockmanager").kendoDockManager({
                rootPane: {
                    type: "split",
                    orientation: "vertical",
                    panes: [{
                            type: "content",
                            title: "Pane title",
                            content: "Pane 1"
                        },{
                            type: "content",
                            title: "Pane 2",
                            content: "Pane 2"
                        }]
                }
            });
    var dockmanager = $("#dockmanager").data("kendoDockManager");
    dockmanager.bind("close", pane_dragEnd);
    </script>

### dragStart

Triggered when item drag starts.


<div class="meta-api-description">
Detect and respond to the moment a user initiates dragging an item within a docking interface, enabling configuration of drag state, setting drag payload data, updating or customizing the user interface during drag initiation, capturing drag start events to run tailored logic, monitoring drag activation, handling drag triggers, inspecting event payloads associated with drag actions, and managing or controlling drag behavior from the very start of the drag interaction in a dynamic layout or dock management environment.
</div>

#### Example - subscribing to the dragStart event during initialization

    <div style="height:500px; width:1000px">
        <div id="dockmanager"></div>
    </div>
    <script>
    $("#dockmanager").kendoDockManager({
                dragStart: function(e){
                    // dragging started
                },
                rootPane: {
                    type: "split",
                    orientation: "vertical",
                    panes: [{
                            type: "content",
                            title: "Pane title",
                            content: "Pane 1"
                        },{
                            type: "content",
                            title: "Pane 2",
                            content: "Pane 2"
                        }]
                }
            });
    </script>

#### Example - subscribing to the dragStart event after initialization

    <div style="height:500px; width:1000px">
        <div id="dockmanager"></div>
    </div>
    <script>
    function pane_dragStart(e) {
      // dragging started
    }
    $("#dockmanager").kendoDockManager({
                rootPane: {
                    type: "split",
                    orientation: "vertical",
                    panes: [{
                            type: "content",
                            title: "Pane title",
                            content: "Pane 1"
                        },{
                            type: "content",
                            title: "Pane 2",
                            content: "Pane 2"
                        }]
                }
            });
    var dockmanager = $("#dockmanager").data("kendoDockManager");
    dockmanager.bind("close", pane_dragStart);
    </script>

### innerDock

Triggered when a pane is docked in the current pane.


<div class="meta-api-description">
Capture and respond to events when one pane is nested or docked within another pane, enabling real-time detection of pane placement changes, layout updates, dynamic resizing, focus management, state persistence, and custom behavior execution triggered by docking actions inside container panes; this event supports scenarios such as monitoring nested docking, handling pane arrangement modifications, synchronizing UI updates, and implementing logic that activates immediately upon a pane being inserted within another pane’s boundaries.
</div>

#### Example - subscribing to the innerDock event during initialization

    <div style="height:500px; width:1000px">
        <div id="dockmanager"></div>
    </div>
    <script>
    $("#dockmanager").kendoDockManager({
                innerDock: function(e){
                    // pane is docked
                },
                rootPane: {
                    type: "split",
                    orientation: "vertical",
                    panes: [{
                            type: "content",
                            title: "Pane title",
                            content: "Pane 1"
                        },{
                            type: "content",
                            title: "Pane 2",
                            content: "Pane 2"
                        }]
                }
            });
    </script>

#### Example - subscribing to the innerDock event after initialization

    <div style="height:500px; width:1000px">
        <div id="dockmanager"></div>
    </div>
    <script>
    function pane_innerDock(e) {
      // pane is docked
    }
    $("#dockmanager").kendoDockManager({
                rootPane: {
                    type: "split",
                    orientation: "vertical",
                    panes: [{
                            type: "content",
                            title: "Pane title",
                            content: "Pane 1"
                        },{
                            type: "content",
                            title: "Pane 2",
                            content: "Pane 2"
                        }]
                }
            });
    var dockmanager = $("#dockmanager").data("kendoDockManager");
    dockmanager.bind("close", pane_innerDock);
    </script>

### pin

Triggered when a pane is pinned.


<div class="meta-api-description">
Detect when a pane is pinned or docked within the interface by handling events triggered during pinning actions, enabling you to run custom code for updating user interface elements, saving layout configurations, initiating animations, logging user interactions, or responding to pane state changes; listen for pinning triggers to capture details about the affected pane and use this event to synchronize UI updates, manage dynamic layouts, or track usage analytics related to pane docking behavior.
</div>

#### Example - subscribing to the pin event during initialization

    <div style="height:500px; width:1000px">
        <div id="dockmanager"></div>
    </div>
    <script>
    $("#dockmanager").kendoDockManager({
                pin: function(e){
                    // pane is pinned
                },
                rootPane: {
                    type: "split",
                    orientation: "vertical",
                    panes: [{
                            type: "content",
                            title: "Pane title",
                            content: "Pane 1"
                        },{
                            type: "content",
                            title: "Pane 2",
                            content: "Pane 2"
                        }]
                }
            });
    </script>

#### Example - subscribing to the pin event after initialization

    <div style="height:500px; width:1000px">
        <div id="dockmanager"></div>
    </div>
    <script>
    function pane_pin(e) {
      // pane is pinned
    }
    $("#dockmanager").kendoDockManager({
                rootPane: {
                    type: "split",
                    orientation: "vertical",
                    panes: [{
                            type: "content",
                            title: "Pane title",
                            content: "Pane 1"
                        },{
                            type: "content",
                            title: "Pane 2",
                            content: "Pane 2"
                        }]
                }
            });
    var dockmanager = $("#dockmanager").data("kendoDockManager");
    dockmanager.bind("close", pane_pin);
    </script>

### resize

Triggered when a pane is resized.


<div class="meta-api-description">
Detect, handle, or listen to changes in pane dimensions within a docking layout, enabling dynamic responses to resizing actions such as updating layouts, persisting pane sizes, adjusting nested or child components, triggering custom code when a pane is resized, reacting to user interface dimension changes in docking panels, controlling layout behaviors during window or pane resizes, responding programmatically to dock pane size adjustments, monitoring resize events for adaptive UI updates, capturing size change information for specific panes, and implementing custom logic based on pane dimension modifications.
</div>

#### Example - subscribing to the resize event during initialization

    <div style="height:500px; width:1000px">
        <div id="dockmanager"></div>
    </div>
    <script>
    $("#dockmanager").kendoDockManager({
                resize: function(e){
                    // pane is resized
                },
                rootPane: {
                    type: "split",
                    orientation: "vertical",
                    panes: [{
                            type: "content",
                            title: "Pane title",
                            content: "Pane 1"
                        },{
                            type: "content",
                            title: "Pane 2",
                            content: "Pane 2"
                        }]
                }
            });
    </script>

#### Example - subscribing to the resize event after initialization

    <div style="height:500px; width:1000px">
        <div id="dockmanager"></div>
    </div>
    <script>
    function pane_resize(e) {
      // pane is resized
    }
    $("#dockmanager").kendoDockManager({
                rootPane: {
                    type: "split",
                    orientation: "vertical",
                    panes: [{
                            type: "content",
                            title: "Pane title",
                            content: "Pane 1"
                        },{
                            type: "content",
                            title: "Pane 2",
                            content: "Pane 2"
                        }]
                }
            });
    var dockmanager = $("#dockmanager").data("kendoDockManager");
    dockmanager.bind("close", pane_resize);
    </script>

### unpin

Triggered when a pane is unpinned.


<div class="meta-api-description">
Detect when a panel or pane is detached, unpinned, or removed from a dock or layout system, enabling developers to listen for unpin actions, trigger custom handlers, update UI layout dynamically, persist or save panel states and configurations, adjust neighboring panels, or manage the application’s window docking behavior. This event-driven mechanism provides identification of the affected pane and supports responding to pane undocking, detaching, or panel floating scenarios, facilitating control over workspace arrangement, real-time layout adjustments, and state synchronization when a pane is unpinned or separated from the dock environment.
</div>

#### Example - subscribing to the unpin event during initialization

    <div style="height:500px; width:1000px">
        <div id="dockmanager"></div>
    </div>
    <script>
    $("#dockmanager").kendoDockManager({
                unpin: function(e){
                    // pane is unpinned
                },
                rootPane: {
                    type: "split",
                    orientation: "vertical",
                    panes: [{
                            type: "content",
                            title: "Pane title",
                            content: "Pane 1"
                        },{
                            type: "content",
                            title: "Pane 2",
                            content: "Pane 2"
                        }]
                }
            });
    </script>

#### Example - subscribing to the unpin event after initialization

    <div style="height:500px; width:1000px">
        <div id="dockmanager"></div>
    </div>
    <script>
    function pane_unpin(e) {
      // pane is unpinned
    }
    $("#dockmanager").kendoDockManager({
                rootPane: {
                    type: "split",
                    orientation: "vertical",
                    panes: [{
                            type: "content",
                            title: "Pane title",
                            content: "Pane 1"
                        },{
                            type: "content",
                            title: "Pane 2",
                            content: "Pane 2"
                        }]
                }
            });
    var dockmanager = $("#dockmanager").data("kendoDockManager");
    dockmanager.bind("close", pane_unpin);
    </script>


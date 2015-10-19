---
title: PanelBar
page_title: Configuration, methods and events of Kendo UI PanelBar
description: Configure the PanelBar UI widget, use methods and explore the events which are triggered upon certain behaviors.
---

# kendo.ui.PanelBar

Represents the Kendo UI PanelBar widget. Inherits from [Widget](/api/javascript/ui/widget).

## Configuration

### animation `Object|Boolean`

A collection of visual animations used when **PanelBar** items are expand or collapsed through
user interactions. Setting this option to **false** will disable all animations.

#### Example

    <ul id="panelbar">
        <li>Item 1
            <ul>
                <li>Sub Item 1</li>
                <li>Sub Item 2</li>
                <li>Sub Item 3</li>
            </ul>
        </li>
        <li>Item 2
            <ul>
                <li>Sub Item 1</li>
                <li>Sub Item 2</li>
                <li>Sub Item 3</li>
            </ul>
        </li>
    </ul>
    <script>
        $("#panelbar").kendoPanelBar({
            animation: {
                // fade-out closing items over 1000 milliseconds
                collapse: {
                    duration: 1000,
                    effects: "fadeOut"
                },
               // fade-in and expand opening items over 500 milliseconds
               expand: {
                   duration: 500,
                   effects: "expandVertical fadeIn"
               }
           }
        });
    </script>

### animation.collapse `Object`

The visual animation(s) that will be used when **PanelBar** items are closed.

#### Example

    <ul id="panelbar">
        <li>Item 1
            <ul>
                <li>Sub Item 1</li>
                <li>Sub Item 2</li>
                <li>Sub Item 3</li>
            </ul>
        </li>
        <li>Item 2
            <ul>
                <li>Sub Item 1</li>
                <li>Sub Item 2</li>
                <li>Sub Item 3</li>
            </ul>
        </li>
    </ul>
    <script>
        $("#panelbar").kendoPanelBar({
            animation: {
                collapse: {
                    duration: 200,
                    effects: "fadeOut"
                }
            }
        });
    </script>

### animation.collapse.duration `Number`*(default: 200)*

The number of milliseconds used for the visual animation when a **PanelBar** item is closed.

#### Example

    <ul id="panelbar">
        <li>Item 1
            <ul>
                <li>Sub Item 1</li>
                <li>Sub Item 2</li>
                <li>Sub Item 3</li>
            </ul>
        </li>
        <li>Item 2
            <ul>
                <li>Sub Item 1</li>
                <li>Sub Item 2</li>
                <li>Sub Item 3</li>
            </ul>
        </li>
    </ul>
    <script>
        $("#panelbar").kendoPanelBar({
            animation: {
               collapse: {
                    duration: 1000
               }
          }
        });
    </script>

### animation.collapse.effects `String`

A whitespace-delimited string of animation effects that are utilized when a **PanelBar** item
is closed. Options include **"fadeOut"**.

#### Example

    <ul id="panelbar">
        <li>Item 1
            <ul>
                <li>Sub Item 1</li>
                <li>Sub Item 2</li>
                <li>Sub Item 3</li>
            </ul>
        </li>
        <li>Item 2
            <ul>
                <li>Sub Item 1</li>
                <li>Sub Item 2</li>
                <li>Sub Item 3</li>
            </ul>
        </li>
    </ul>
    <script>
        $("#panelbar").kendoPanelBar({
            animation: {
                collapse: {
                    duration: 1000,
                    effects: "fadeOut"
                }
            }
        });
    </script>

### animation.expand `Object`

The visual animation(s) that will be used when opening items.

#### Example

    <ul id="panelbar">
        <li>Item 1
            <ul>
                <li>Sub Item 1</li>
                <li>Sub Item 2</li>
                <li>Sub Item 3</li>
            </ul>
        </li>
        <li>Item 2
            <ul>
                <li>Sub Item 1</li>
                <li>Sub Item 2</li>
                <li>Sub Item 3</li>
            </ul>
        </li>
    </ul>
    <script>
        $("#panelbar").kendoPanelBar({
            animation: {
                expand: {
                    duration: 200,
                    effects: "expandVertical"
                }
            }
        });
    </script>

### animation.expand.duration `Number`*(default: 200)*

The number of milliseconds used for the visual animation when an item is opened.

#### Example

    <ul id="panelbar">
        <li>Item 1
            <ul>
                <li>Sub Item 1</li>
                <li>Sub Item 2</li>
                <li>Sub Item 3</li>
            </ul>
        </li>
        <li>Item 2
            <ul>
                <li>Sub Item 1</li>
                <li>Sub Item 2</li>
                <li>Sub Item 3</li>
            </ul>
        </li>
    </ul>
    <script>
        $("#panelbar").kendoPanelBar({
         animation: {
              expand: {
                  duration: 1000
              }
           }
        });
    </script>

### animation.expand.effects `String`*(default: "expandVertical")*

A whitespace-delimited string of animation effects that are used when an item is expanded. Options include
**"expandVertical"** and **"fadeIn"**.

    <ul id="panelbar">
        <li>Item 1
            <ul>
                <li>Sub Item 1</li>
                <li>Sub Item 2</li>
                <li>Sub Item 3</li>
            </ul>
        </li>
        <li>Item 2
            <ul>
                <li>Sub Item 1</li>
                <li>Sub Item 2</li>
                <li>Sub Item 3</li>
            </ul>
        </li>
    </ul>
    <script>
        $("#panelbar").kendoPanelBar({
            animation: {
                expand: {
                    effects: "expandVertical"
                }
            }
        });
    </script>

### contentUrls `Array`

Sets an array with the URLs from which the **PanelBar** items content to be loaded from. If only specific items should be loaded via Ajax, then you should set the URLs to the corresponding positions in the array and set the other elements to null.   

#### Example - specify that the second item should be loaded remotely

    <ul id="panelbar">
        <li>Item 1
          <div>Content 1</div>
        </li>
        <li>
            Ajax Item
            <div></div>
        </li>
    </ul>

    <script>
        $("#panelbar").kendoPanelBar({
            contentUrls: [
              null,
              "http://demos.telerik.com/kendo-ui/content/web/panelbar/ajax/ajaxContent1.html"
            ]
        });
    </script>

### dataSource `Object|Array`

The data source of the widget which is used to render its items. Can be a JSON object/Array that contains an item or an Array of items to be rendered.
Refer to the example below for a list of the supported properties.

#### Example

    <ul id="panelbar"></ul>

    <script>
      $("#panelbar").kendoPanelBar({
          dataSource: [
              {
                  text: "Item 1 (link)",
                  cssClass: "myClass",                            // Add custom CSS class to the item, optional, added 2012 Q3 SP1.
                  url: "http://www.kendoui.com/"                  // link URL if navigation is needed (optional)
              },
              {
                  text: "<b>Item 2</b>",
                  encoded: false,                                 // Allows use of HTML for item text
                  content: "text"                                 // content within an item
              },
              {
                  text: "Item 3",
                  // content URL to load within an item
                  contentUrl: "http://demos.telerik.com/kendo-ui/content/web/panelbar/ajax/ajaxContent1.html"
              },
              {
                  text: "Item 4",
                  // item image URL, optional
                  imageUrl: "http://demos.telerik.com/kendo-ui/content/shared/icons/sports/baseball.png",
                  expanded: true,                                 // item is rendered expanded
                  items: [{                                       // Sub item collection.
                      text: "Sub Item 1"
                  },
                  {
                      text: "Sub Item 2"
                  }]
              },
              {
                  text: "Item 5"
              }
          ]
      });
    </script>

### expandMode `String`*(default: "multiple")*

Specifies how the **PanelBar** items are displayed when opened and closed. The following values
are available:

#### *"single"*

Display one item at a time when an item is opened; opening an item will close the previously opened item.

#### *"multiple"*

Display multiple values at one time; opening an item has no visual impact on any other items in the **PanelBar**.

#### Example

    <ul id="panelbar">
        <li>Item 1
            <ul>
                <li>Sub Item 1</li>
                <li>Sub Item 2</li>
                <li>Sub Item 3</li>
            </ul>
        </li>
        <li>Item 2
            <ul>
                <li>Sub Item 1</li>
                <li>Sub Item 2</li>
                <li>Sub Item 3</li>
            </ul>
        </li>
    </ul>
    <script>
        $("#panelbar").kendoPanelBar({
            expandMode: "single"
        });
    </script>

## Methods

### append

Appends an item(s) to the PanelBar.

#### Example

    <ul id="panelbar"></ul>
    <script>
        $("#panelbar").kendoPanelBar();

        var panelBar = $("#panelbar").data("kendoPanelBar");
        panelBar.append(
            [
                {
                    text: "Item 1",
                    cssClass: "myClass",                            // Add custom CSS class to the item, optional, added 2012 Q3 SP1.
                    url: "http://www.telerik.com/"                  // link URL if navigation is needed, optional.
                },
                {
                    text: "<b>Item 2</b>",
                    encoded: false,                                 // Allows use of HTML for item text
                    content: "text"                                 // content within an item
                },
                {
                    text: "Item 3",
                    contentUrl: "http://demos.telerik.com/kendo-ui/content/web/panelbar/ajax/ajaxContent1.html"
                },
                {
                    text: "Item 4",
                    imageUrl: "http://demos.telerik.com/kendo-ui/content/shared/icons/sports/baseball.png",
                    expanded: true,                                 // item is rendered expanded
                    items: [{                                       // Sub item collection.
                        text: "Sub Item 1"
                    },
                    {
                        text: "Sub Item 2"
                    }]
                },
                {
                    text: "Item 5",
                    // item image sprite CSS class, optional
                    spriteCssClass: "imageClass3"
                }
            ]
        );
    </script>

#### Parameters

##### item `String|Element|jQuery|Array`

Target item, specified as the JSON representation of an object. You can pass item `text`, `content` or
`contentUrl` here. Can handle an HTML string or array of such strings or JSON.

##### referenceItem `String|Element|jQuery`

A reference item to append the new item in the PanelBar, can be omitted.

#### Returns

`kendo.ui.PanelBar` Returns the PanelBar object to support chaining.

### clearSelection

Clears the currently selected PanelBar items.

#### Example - clear selection

    <ul id="panelbar">
        <li id="item1">Item 1</li>
        <li id="item2">Item 2</li>
    </ul>
    <script>
        // create a PanelBar instance and get it.
        var panelBar = $("#panelbar").kendoPanelBar().data("kendoPanelBar");

        // select the element with ID "item1"
        panelBar.select($("#item1"));

        // select the element with ID "item2"
        panelBar.select($("#item2"));

        // clear all selection
        setTimeout(function() {
          panelBar.clearSelection();
        }, 2000);
    </script>

### collapse

Collapses the specified item(s) of a **PanelBar**.

#### Example

    <ul id="panelbar">
        <li id="item1">Item 1
            <ul>
                <li>Sub Item 1</li>
                <li>Sub Item 2</li>
                <li>Sub Item 3</li>
            </ul>
        </li>
        <li id="item2">Item 2
            <ul>
                <li>Sub Item 1</li>
                <li>Sub Item 2</li>
                <li>Sub Item 3</li>
            </ul>
        </li>
    </ul>
    <script>
        $("#panelbar").kendoPanelBar();
        // access an existing PanelBar instance
        var panelBar = $("#panelbar").data("kendoPanelBar");
        // collapse the element with ID, "item1"
        panelBar.collapse($("#item1"));
        // collapse the element with ID, "item2" without visual animations
        panelBar.collapse($("#item2"), false);
        // collapse all list items that start with ID, "item"
        panelBar.collapse($('[id^="item"]'));
    </script>

#### Parameters

##### element `String|Element|jQuery`

The **PanelBar** item(s) to be collapsed, expressed as a string containing a selector
expression or represented by a [jQuery selector](http://api.jquery.com/category/selectors/).

##### useAnimation `Boolean`

_optional, default: _

Temporarily enables (**true**) or disables (**false**) any visual animation(s)
when collapsing items.

#### Returns

`kendo.ui.PanelBar` Returns the PanelBar object to support chaining.

### destroy
Prepares the **PanelBar** for safe removal from DOM. Detaches all event handlers and removes jQuery.data attributes to avoid memory leaks. Calls destroy method of any child Kendo widgets.

> **Important:** This method does not remove the PanelBar element from DOM.

#### Example

    <ul id="panelbar">
        <li>Item 1
            <ul>
                <li>Sub Item 1</li>
                <li>Sub Item 2</li>
                <li>Sub Item 3</li>
            </ul>
        </li>
        <li>Item 2
            <ul>
                <li>Sub Item 1</li>
                <li>Sub Item 2</li>
                <li>Sub Item 3</li>
            </ul>
        </li>
    </ul>
    <script>
        $("#panelbar").kendoPanelBar();
        var panelBar = $("#panelbar").data("kendoPanelBar");

        // detach events
        panelBar.destroy();
    </script>

### enable

Enables (**true**) or disables (**false**) the specified item(s) of the
**PanelBar**.

#### Example

    <ul id="panelbar">
        <li id="item1">Item 1
            <ul>
                <li>Sub Item 1</li>
                <li>Sub Item 2</li>
                <li>Sub Item 3</li>
            </ul>
        </li>
        <li id="item2">Item 2
            <ul>
                <li>Sub Item 1</li>
                <li>Sub Item 2</li>
                <li>Sub Item 3</li>
            </ul>
        </li>
    </ul>
    <script>
        $("#panelbar").kendoPanelBar();
        // access an existing PanelBar instance
        var panelBar = $("#panelbar").data("kendoPanelBar");
        // enable the item of the PanelBar with ID, "item1"
        panelBar.enable($("#item1"), true);
        // disable the currently selected item of the PanelBar
        var item = panelBar.select();
        panelBar.enable($("#item2"), false);
        // disable all list items that start with ID, "item"
        panelBar.enable($('[id^="item"]'), false);
    </script>

#### Parameters

##### element `String|Element|jQuery`

The **PanelBar** item(s) to be enabled (**true**) or disabled (**false**), expressed as a
string containing a selector expression or represented by a
[jQuery selector](http://api.jquery.com/category/selectors/).

##### enable `Boolean`

The desired state - enabled (**true**) or disabled (**false**) - of the target
element(s).

### expand

Expands the specified item(s) of a **PanelBar**.

#### Example

    <ul id="panelbar">
        <li id="item1">Item 1
            <ul>
                <li>Sub Item 1</li>
                <li>Sub Item 2</li>
                <li>Sub Item 3</li>
            </ul>
        </li>
        <li id="item2">Item 2
            <ul>
                <li>Sub Item 1</li>
                <li>Sub Item 2</li>
                <li>Sub Item 3</li>
            </ul>
        </li>
    </ul>
    <script>
        $("#panelbar").kendoPanelBar();
        // access an existing PanelBar instance
        var panelBar = $("#panelbar").data("kendoPanelBar");
        // expand the element with ID, "item1"
        panelBar.expand($("#item1"));
        // expand the element with ID, "item2" without visual animations
        panelBar.expand($("#item2"), false);
        // expand all list items that start with ID, "item"
        panelBar.expand($('[id^="item"]'));
    </script>

#### Parameters

##### element `String|Element|jQuery`

The **PanelBar** item(s) to be expanded, expressed as a selector.

##### useAnimation `Boolean`

_optional, default: _

Temporarily enables (**true**) or disables (**false**) any visual animation(s) when expanding items.

#### Returns

`kendo.ui.PanelBar` Returns the PanelBar object to support chaining.

### insertAfter

Inserts a PanelBar item after the specified referenceItem

#### Example

    <ul id="panelbar">
        <li>Item 1
            <ul>
                <li>Sub Item 1</li>
                <li>Sub Item 2</li>
                <li>Sub Item 3</li>
            </ul>
        </li>
        <li>Item 2
            <ul>
                <li>Sub Item 1</li>
                <li>Sub Item 2</li>
                <li>Sub Item 3</li>
            </ul>
        </li>
    </ul>
    <script>
        $("#panelbar").kendoPanelBar();

        var panelBar = $("#panelbar").data("kendoPanelBar");

        panelBar.insertAfter(
            [{
                text: "Item 1",
                url: "http://www.telerik.com"                // Link URL if navigation is needed, optional.
            },
            {
                text: "<b>Item 2</b>",
                encoded: false,                              // Allows use of HTML for item text
                content: "text"                              // Content for the content element
            },
            {
                text: "Item 3",
                contentUrl: "http://demos.telerik.com/kendo-ui/content/web/panelbar/ajax/ajaxContent1.html"
            },
            {
                text: "Item 4",
                imageUrl: "http://demos.telerik.com/kendo-ui/content/shared/icons/sports/baseball.png",
                expanded: true,                              // item is rendered expanded
                items: [{                                    // Sub item collection.
                     text: "Sub Item 1"
                },
                {
                     text: "Sub Item 2"
                }]
            },
            {
                text: "Item 5"
            }],
            "li:first-child"
        );
    </script>

#### Parameters

##### item `String|Element|jQuery|Array`

Target item, specified as a JSON object. You can pass item `text`, `content` or `contentUrl` here. Can handle an HTML string or array of such strings or JSON.

##### referenceItem `String|Element|jQuery`

A reference item to insert the new item after

### insertBefore

Inserts a PanelBar item before the specified referenceItem

#### Example

    <ul id="panelbar">
        <li>Item 1
            <ul>
                <li>Sub Item 1</li>
                <li>Sub Item 2</li>
                <li>Sub Item 3</li>
            </ul>
        </li>
        <li>Item 2
            <ul>
                <li>Sub Item 1</li>
                <li>Sub Item 2</li>
                <li>Sub Item 3</li>
            </ul>
        </li>
    </ul>
    <script>
        $("#panelbar").kendoPanelBar();

        var panelBar = $("#panelbar").data("kendoPanelBar");

        panelBar.insertBefore(
            [{
                text: "Item 1",
                url: "http://www.telerik.com"                // Link URL if navigation is needed, optional.
            },
            {
                text: "<b>Item 2</b>",
                encoded: false,                              // Allows use of HTML for item text
                content: "text"                              // Content for the content element
            },
            {
                text: "Item 3",
                contentUrl: "http://demos.telerik.com/kendo-ui/content/web/panelbar/ajax/ajaxContent1.html"
            },
            {
                text: "Item 4",
                imageUrl: "http://demos.telerik.com/kendo-ui/content/shared/icons/sports/baseball.png",
                expanded: true,                              // item is rendered expanded
                items: [{                                    // Sub item collection.
                     text: "Sub Item 1"
                },
                {
                     text: "Sub Item 2"
                }]
            },
            {
                text: "Item 5"
            }],
            "li:last-child"
        );
    </script>

#### Parameters

##### item `String|Element|jQuery|Array`

Target item, specified as a JSON object. You can pass item `text`, `content` or `contentUrl` here. Can handle an
TML string or array of such strings or JSON.

##### referenceItem `String|Element|jQuery`

A reference item to insert the new item before.

#### Returns

`kendo.ui.PanelBar` Returns the PanelBar object to support chaining.

### reload

Reloads the content of a **PanelBar** from an AJAX request.

#### Example

    <ul id="panelbar">
        <li>Item 1
            <ul>
                <li>Sub Item 1</li>
                <li>Sub Item 2</li>
                <li>Sub Item 3</li>
            </ul>
        </li>
        <li>Item 2
            <ul>
                <li>Sub Item 1</li>
                <li>Sub Item 2</li>
                <li>Sub Item 3</li>
            </ul>
        </li>
    </ul>
    <script>
        $("#panelbar").kendoPanelBar();
        // get a reference to the panel bar
        var panelBar = $("#panelbar").data("kendoPanelBar");
        // reload the panel bar
        panelBar.reload("> .k-item");
    </script>

#### Parameters

##### element `String|Element|jQuery`

Target element

### remove

Removes the specified PanelBar item(s).

#### Example

    <ul id="panelbar">
        <li id="Item1">Item 1
            <ul>
                <li>Sub Item 1</li>
                <li>Sub Item 2</li>
                <li>Sub Item 3</li>
            </ul>
        </li>
        <li>Item 2
            <ul>
                <li>Sub Item 1</li>
                <li>Sub Item 2</li>
                <li>Sub Item 3</li>
            </ul>
        </li>
    </ul>
    <script>
        $("#panelbar").kendoPanelBar();
        // get a reference to the panel bar
        var panelBar = $("#panelbar").data("kendoPanelBar");
        // remove Item 1
        panelBar.remove("#Item1");
    </script>

#### Parameters

##### element `String|Element|jQuery`

The **PanelBar** item(s) to be removed, expressed as a selector string, DOM element or a jQuery object.

### select

Gets or sets the selected item.

#### Example

    <ul id="panelbar">
        <li id="item1">Item 1
            <ul>
                <li>Sub Item 1</li>
                <li>Sub Item 2</li>
                <li>Sub Item 3</li>
            </ul>
        </li>
        <li>Item 2
            <ul>
                <li>Sub Item 1</li>
                <li>Sub Item 2</li>
                <li>Sub Item 3</li>
            </ul>
        </li>
    </ul>
    <script>
        $("#panelbar").kendoPanelBar();
        // access an existing PanelBar instance
        var panelBar = $("#panelbar").data("kendoPanelBar");
        // select the item with ID, "item1"
        panelBar.select("#item1");
    </script>

#### Parameters

##### element `String|Element|jQuery` *(optional)*

The **PanelBar** item to be selected, expressed as a string containing a selector expression or
represented by a [jQuery selector](http://api.jquery.com/category/selectors/).

#### Returns

`jQuery` the selected item if called without arguments. `kendo.ui.PanelBar` if called with arguments.

## Events

### activate

Triggered when an item of a PanelBar is activated.

#### Event Data

##### e.item `Element`

The activated item of the PanelBar.

#### Attach activate event handler during initialization; detach via unbind()

    <ul id="panelbar">
        <li>Item 1
            <ul>
                <li>Sub Item 1</li>
                <li>Sub Item 2</li>
                <li>Sub Item 3</li>
            </ul>
        </li>
        <li>Item 2
            <ul>
                <li>Sub Item 1</li>
                <li>Sub Item 2</li>
                <li>Sub Item 3</li>
            </ul>
        </li>
    </ul>
    <script>
        // event handler for activate
        var onActivate = function(e) {
            // access the activated item via e.item (HTMLElement)

            // detach activate event handler via unbind()
            panelBar.data("kendoPanelBar").unbind("activate", onActivate);
        };

        // attach activate event handler during initialization
        var panelBar = $("#panelbar").kendoPanelBar({
            activate: onActivate
        });
    </script>

#### Attach activate event handler via bind(); detach via unbind()

    <ul id="panelbar">
        <li>Item 1
            <ul>
                <li>Sub Item 1</li>
                <li>Sub Item 2</li>
                <li>Sub Item 3</li>
            </ul>
        </li>
        <li>Item 2
            <ul>
                <li>Sub Item 1</li>
                <li>Sub Item 2</li>
                <li>Sub Item 3</li>
            </ul>
        </li>
    </ul>
    <script>
        $("#panelbar").kendoPanelBar();

        // event handler for activate
        var onActivate = function(e) {
            // access the activated item via e.item (HTMLElement)

            // detach activate event handler via unbind()
            $("#panelbar").data("kendoPanelBar").unbind("activate", onActivate);
        };

        // attach activate event handler via bind()
        $("#panelbar").data("kendoPanelBar").bind("activate", onActivate);
    </script>

### collapse

Triggered when an item of a PanelBar is collapsed.

#### Event Data

##### e.item `Element`

The collapsing item of the PanelBar.

#### Attach collapse event handler during initialization; detach via unbind()

    <ul id="panelbar">
        <li>Item 1
            <ul>
                <li>Sub Item 1</li>
                <li>Sub Item 2</li>
                <li>Sub Item 3</li>
            </ul>
        </li>
        <li>Item 2
            <ul>
                <li>Sub Item 1</li>
                <li>Sub Item 2</li>
                <li>Sub Item 3</li>
            </ul>
        </li>
    </ul>
    <script>
        // event handler for collapse
        var onCollapse = function(e) {
            // access the collapsed item via e.item (HTMLElement)

            // detach collapse event handler via unbind()
            panelBar.data("kendoPanelBar").unbind("collapse", onCollapse);
        };

        // attach collapse event handler during initialization
        var panelBar = $("#panelbar").kendoPanelBar({
            collapse: onCollapse
        });
    </script>

#### Attach collapse event handler via bind(); detach via unbind()

    <ul id="panelbar">
        <li>Item 1
            <ul>
                <li>Sub Item 1</li>
                <li>Sub Item 2</li>
                <li>Sub Item 3</li>
            </ul>
        </li>
        <li>Item 2
            <ul>
                <li>Sub Item 1</li>
                <li>Sub Item 2</li>
                <li>Sub Item 3</li>
            </ul>
        </li>
    </ul>
    <script>
        $("#panelbar").kendoPanelBar();

        // event handler for collapse
        var onCollapse = function(e) {
            // access the collapsed item via e.item (HTMLElement)

            // detach collapse event handler via unbind()
            $("#panelbar").data("kendoPanelBar").unbind("collapse", onCollapse);
        };

        // attach collapse event handler via bind()
        $("#panelbar").data("kendoPanelBar").bind("collapse", onCollapse);
    </script>

### contentLoad

Fires when content is fetched from an AJAX request.

#### Event Data

##### e.item `Element`

The selected item

##### e.contentElement `Element`

The loaded content element

#### Example

    <ul id="panelbar">
        <li>Item 1
            <ul>
                <li>Sub Item 1</li>
                <li>Sub Item 2</li>
                <li>Sub Item 3</li>
            </ul>
        </li>
        <li>Item 2
            <ul>
                <li>Sub Item 1</li>
                <li>Sub Item 2</li>
                <li>Sub Item 3</li>
            </ul>
        </li>
    </ul>
    <script>
        $("#panelbar").kendoPanelBar({
            contentLoad: function(e) {
                // handle event
            }
        });
    </script>

#### To set after initialization

    <ul id="panelbar">
        <li>Item 1
            <ul>
                <li>Sub Item 1</li>
                <li>Sub Item 2</li>
                <li>Sub Item 3</li>
            </ul>
        </li>
        <li>Item 2
            <ul>
                <li>Sub Item 1</li>
                <li>Sub Item 2</li>
                <li>Sub Item 3</li>
            </ul>
        </li>
    </ul>
    <script>
        // get a reference to the panel bar
        var panelBar = $("#panelbar").data("kendoPanelBar");
        // bind the contentLoad event
        panelBar.bind("contentLoad", function(e) {
            // handle event
        });
    </script>

### error

Fires when AJAX request results in an error.

#### Event Data

##### e.xhr `jqXHR`

The jqXHR object used to load the content

##### e.status `String`

The returned status.

#### Example

    <ul id="panelbar">
        <li>Item 1
            <ul>
                <li>Sub Item 1</li>
                <li>Sub Item 2</li>
                <li>Sub Item 3</li>
            </ul>
        </li>
        <li>Item 2
            <ul>
                <li>Sub Item 1</li>
                <li>Sub Item 2</li>
                <li>Sub Item 3</li>
            </ul>
        </li>
    </ul>
    <script>
        $("#panelbar").kendoPanelBar({
            error: function(e) {
                // handle event
            }
        });
    </script>

#### To set after initialization

    <ul id="panelbar">
        <li>Item 1
            <ul>
                <li>Sub Item 1</li>
                <li>Sub Item 2</li>
                <li>Sub Item 3</li>
            </ul>
        </li>
        <li>Item 2
            <ul>
                <li>Sub Item 1</li>
                <li>Sub Item 2</li>
                <li>Sub Item 3</li>
            </ul>
        </li>
    </ul>
    <script>
        $("#panelbar").kendoPanelBar();
        // get a reference to the panel bar
        var panelBar = $("#panelbar").data("kendoPanelBar");
        // bind the error ajax event
        panelBar.bind("error", function(e) {
            // handle event
        });
    </script>

### expand

Triggered when an item of a PanelBar is expanded.

#### Event Data

##### e.item `Element`

The expanding item of the PanelBar.

#### Attach expand event handler during initialization; detach via unbind()

    <ul id="panelbar">
        <li>Item 1
            <ul>
                <li>Sub Item 1</li>
                <li>Sub Item 2</li>
                <li>Sub Item 3</li>
            </ul>
        </li>
        <li>Item 2
            <ul>
                <li>Sub Item 1</li>
                <li>Sub Item 2</li>
                <li>Sub Item 3</li>
            </ul>
        </li>
    </ul>
    <script>
        // event handler for expand
        var onExpand = function(e) {
            // access the expanded item via e.item (HTMLElement)

            // detach expand event handler via unbind()
            panelBar.data("kendoPanelBar").unbind("expand", onExpand);
        };

        // attach expand event handler during initialization
        var panelBar = $("#panelbar").kendoPanelBar({
            expand: onExpand
        });
    </script>

#### Attach expand event handler via bind(); detach via unbind()

    <ul id="panelbar">
        <li>Item 1
            <ul>
                <li>Sub Item 1</li>
                <li>Sub Item 2</li>
                <li>Sub Item 3</li>
            </ul>
        </li>
        <li>Item 2
            <ul>
                <li>Sub Item 1</li>
                <li>Sub Item 2</li>
                <li>Sub Item 3</li>
            </ul>
        </li>
    </ul>
    <script>
        $("#panelbar").kendoPanelBar();

        // event handler for expand
        var onExpand = function(e) {
            // access the expanded item via e.item (HTMLElement)

            // detach expand event handler via unbind()
            $("#panelbar").data("kendoPanelBar").unbind("expand", onExpand);
        };

        // attach expand event handler via bind()
        $("#panelbar").data("kendoPanelBar").bind("expand", onExpand);
    </script>

### select

Triggered when an item of a PanelBar is selected.

#### Event Data

##### e.item `Element`

The selected item of the PanelBar.

#### Attach select event handler during initialization; detach via unbind()

    <ul id="panelbar">
        <li>Item 1
            <ul>
                <li>Sub Item 1</li>
                <li>Sub Item 2</li>
                <li>Sub Item 3</li>
            </ul>
        </li>
        <li>Item 2
            <ul>
                <li>Sub Item 1</li>
                <li>Sub Item 2</li>
                <li>Sub Item 3</li>
            </ul>
        </li>
    </ul>
    <script>
        // event handler for select
        var onSelect = function(e) {
            // access the selected item via e.item (HTMLElement)

            // detach select event handler via unbind()
            panelBar.data("kendoPanelBar").unbind("select", onSelect);
        };

        // attach select event handler during initialization
        var panelBar = $("#panelbar").kendoPanelBar({
            select: onSelect
        }).data("kendoPanelBar");
    </script>

#### Attach select event handler via bind(); detach via unbind()

    <ul id="panelbar">
        <li>Item 1
            <ul>
                <li>Sub Item 1</li>
                <li>Sub Item 2</li>
                <li>Sub Item 3</li>
            </ul>
        </li>
        <li>Item 2
            <ul>
                <li>Sub Item 1</li>
                <li>Sub Item 2</li>
                <li>Sub Item 3</li>
            </ul>
        </li>
    </ul>
    <script>
        $("#panelbar").kendoPanelBar();

        // event handler for select
        var onSelect = function(e) {
            // access the selected item via e.item (HTMLElement)

            // detach select event handler via unbind()
            $("#panelbar").data("kendoPanelBar").unbind("select", onSelect);
        };

        // attach select event handler via bind()
        $("#panelbar").data("kendoPanelBar").bind("select", onSelect);
    </script>

---
title: TabStrip
page_title: Configuration, methods and events of Kendo UI TabStrip
description: Easily disable all animations, set the parameters, used for the visual animation and the effects used in TabStrip UI widget.
---

# kendo.ui.TabStrip

Represents the Kendo UI TabStrip. Inherits from [Widget](/api/javascript/ui/widget).

## Configuration

### animation `Object|Boolean`

A collection of visual animations used when **TabStrip** tab are selected through
user interactions. Setting this option to **false** will disable all animations.

#### Example

    <div id="tabstrip">
        <ul>
            <li>Tab 1</li>
            <li>Tab 2</li>
        </ul>
        <div>Content 1</div>
        <div>Content 2</div>
    </div>

    <script>
        $("#tabstrip").kendoTabStrip({
            animation: {
                // fade-out current tab over 1000 milliseconds
                close: {
                    duration: 1000,
                    effects: "fadeOut"
                },
               // fade-in new tab over 500 milliseconds
               open: {
                   duration: 500,
                   effects: "fadeIn"
               }
           }
        });
    </script>

### animation.close `Object`

The visual animation(s) that will be used when the current tab is closed.

#### Example

    <div id="tabstrip">
        <ul>
            <li>Tab 1</li>
            <li>Tab 2</li>
        </ul>
        <div>Content 1</div>
        <div>Content 2</div>
    </div>

    <script>
        $("#tabstrip").kendoTabStrip({
            animation: {
                close: {
                    duration: 200,
                    effects: "fadeOut"
                }
            }
        });
    </script>

### animation.close.duration `Number`*(default: 200)*

The number of milliseconds used for the visual animation when the current tab is closed.

#### Example

    <div id="tabstrip">
        <ul>
            <li>Tab 1</li>
            <li>Tab 2</li>
        </ul>
        <div>Content 1</div>
        <div>Content 2</div>
    </div>

    <script>
        $("#tabstrip").kendoTabStrip({
            animation: {
                close: {
                    duration: 1000
                }
            }
        });
    </script>

### animation.close.effects `String`

A whitespace-delimited string of animation effects that are utilized when the current tab
is closed. By default not specified - uses the opening animation with reverse.

#### Example

    <div id="tabstrip">
        <ul>
            <li>Tab 1</li>
            <li>Tab 2</li>
        </ul>
        <div>Content 1</div>
        <div>Content 2</div>
    </div>

    <script>
        $("#tabstrip").kendoTabStrip({
            animation: {
                close: {
                    duration: 1000,
                    effects: "fadeOut"
                }
            }
        });
    </script>

### animation.open `Object`

The visual animation(s) that will be used when the new tab is shown.

#### Example

    <div id="tabstrip">
        <ul>
            <li>Tab 1</li>
            <li>Tab 2</li>
        </ul>
        <div>Content 1</div>
        <div>Content 2</div>
    </div>

    <script>
        $("#tabstrip").kendoTabStrip({
            animation: {
                open: {
                    duration: 200,
                    effects: "expand:vertical"
                }
            }
        });
    </script>

### animation.open.duration `Number`*(default: 200)*

The number of milliseconds used for the visual animation when a new tab is shown.

#### Example

    <div id="tabstrip">
        <ul>
            <li>Tab 1</li>
            <li>Tab 2</li>
        </ul>
        <div>Content 1</div>
        <div>Content 2</div>
    </div>

    <script>
        $("#tabstrip").kendoTabStrip({
           animation: {
              open: {
                  duration: 1000
              }
           }
        });
    </script>

### animation.open.effects `String`*(default: "expand:vertical fadeIn")*

A whitespace-separated string of animation effects that are used when a new tab is shown. Options include
**"expand:vertical"** and **"fadeIn"**.

#### Example

    <div id="tabstrip">
        <ul>
            <li>Tab 1</li>
            <li>Tab 2</li>
        </ul>
        <div>Content 1</div>
        <div>Content 2</div>
    </div>

    <script>
        $("#tabstrip").kendoTabStrip({
            animation: {
                open: {
                    effects: "fadeIn"
                }
            }
        });
    </script>

### collapsible `Boolean`*(default: false)*

Specifies whether the TabStrip should be able to collapse completely when clicking an expanded tab.

#### Example

    <div id="tabstrip">
        <ul>
            <li>Tab 1</li>
            <li>Tab 2</li>
        </ul>
        <div>Content 1</div>
        <div>Content 2</div>
    </div>

    <script>
        $("#tabstrip").kendoTabStrip({
            collapsible: true
        });
    </script>

### contentUrls `Array`

Sets an array with the URLs from which the tabs content to be loaded from. If only specific tabs should be loaded via Ajax, then you should set the URLs to the corresponding positions in the array and set the other elements to null.

#### Example - specify that the second tab should be loaded remotely

    <div id="tabstrip">
        <ul>
            <li>Tab 1</li>
            <li>Ajax Tab</li>
        </ul>
        <div>Content 1</div>
        <div></div>
    </div>

    <script>
        $("#tabstrip").kendoTabStrip({
            contentUrls: [
                null,
                "http://demos.telerik.com/kendo-ui/content/web/tabstrip/ajax/ajaxContent1.html"
            ]
        });
    </script>

### dataContentField `String`*(default: "")*

Sets the field of the data item that provides the text content of the tab content element.

#### Example

    <div id="tabstrip"></div>

    <script>
        $("#tabstrip").kendoTabStrip({
            dataTextField: "Name",
            dataContentField: "Content",
            dataSource: [
              { Name: "Tab1", Content: "Tab1: content" },
              { Name: "Tab2", Content: "Tab2: content" }
            ]
        });
    </script>

### dataContentUrlField `String`*(default: "")*

Sets the field of the data item that provides the URL for the Ajax loaded tab content.

#### Example

    <div id="tabstrip"></div>

    <script>
        $("#tabstrip").kendoTabStrip({
            dataTextField: "Name",
            dataContentUrlField: "ContentUrl",
            dataSource: [
              { Name: "Tab1", ContentUrl: "http://demos.telerik.com/kendo-ui/content/web/tabstrip/ajax/ajaxContent1.html" },
              { Name: "Tab2", ContentUrl: "http://demos.telerik.com/kendo-ui/content/web/tabstrip/ajax/ajaxContent2.html" }
            ]
        });
    </script>

### dataImageUrlField `String`*(default: "")*

Sets the field of the data item that provides the image URL of the tab.

#### Example

    <div id="tabstrip"></div>

    <script>
        $("#tabstrip").kendoTabStrip({
            dataTextField: "Name",
            dataImageUrlField: "ImageUrl",
            dataSource: [
              { Name: "Tab1", ImageUrl: "http://demos.telerik.com/kendo-ui/content/web/tabstrip/ajax/ajaxContent1.html" },
              { Name: "Tab2", ImageUrl: "http://demos.telerik.com/kendo-ui/content/web/tabstrip/ajax/ajaxContent2.html" }
            ]
        });
    </script>

### dataSource `Object|Array|kendo.data.DataSource`

The data source of the widget which is used to display the items. Can be a JavaScript object which represents a valid data source configuration, a JavaScript array or an existing [kendo.data.DataSource](/api/javascript/data/datasource)
instance.

If the `dataSource` option is set to a JavaScript object or array the widget will initialize a new [kendo.data.DataSource](/api/javascript/data/datasource) instance using that value as data source configuration.

If the `dataSource` option is an existing [kendo.data.DataSource](/api/javascript/data/datasource) instance the widget will use that instance and will **not** initialize a new one.

#### Example

    <div id="tabstrip"></div>

    <script>
      $("#tabstrip").kendoTabStrip({
        dataTextField: "Name",
        dataSource: [
          { Name: "Tab1"},
          { Name: "Tab2"}
        ]
      });
    </script>

### dataSpriteCssClass `String`*(default: "")*

Sets the field of the data item that provides the CSS class of the tab.

#### Example

    <div id="tabstrip"></div>

    <script>
        $("#tabstrip").kendoTabStrip({
            dataTextField: "Name",
            dataSpriteCssClass: "CssClass",
            dataSource: [
              { Name: "Tab1", dataSpriteCssClass: "class1" },
              { Name: "Tab2", dataSpriteCssClass: "class2" }
            ]
        });
    </script>

### dataTextField `String`*(default: "")*

Sets the field of the data item that provides the text name of the tab.

#### Example

    <div id="tabstrip"></div>

    <script>
        $("#tabstrip").kendoTabStrip({
            dataTextField: "Name",
            dataSource: [
              { Name: "Tab1", Content: "Tab1: content" },
              { Name: "Tab2", Content: "Tab2: content" }
            ]
        });
    </script>

### dataUrlField `String`*(default: "")*

Sets the field of the data item that provides the link URL for the tab.

#### Example

    <div id="tabstrip"></div>

    <script>
        $("#tabstrip").kendoTabStrip({
            dataTextField: "Name",
            dataUrlField: "Url",
            dataSource: [
              { Name: "Telerik", Url: "http://www.telerik.com" },
              { Name: "Google", Url: "http://www.google.com" }
            ]
        });
    </script>

### navigatable `Boolean`*(default: true)*

Specifies whether the TabStrip should be keyboard navigatable.

#### Example

    <div id="tabstrip">
        <ul>
            <li>Tab 1</li>
            <li>Tab 2</li>
        </ul>
        <div>Content 1</div>
        <div>Content 2</div>
    </div>

    <script>
        $("#tabstrip").kendoTabStrip({
            navigatable: false
        });
    </script>

### scrollable `Boolean|Object`

If enabled, the TabStrip will display buttons that will scroll the tabs horizontally, when they cannot fit the TabStrip width. By default scrolling is enabled.

The feature requires `"top"` or `"bottom"` [`tabPosition`](#configuration-tabPosition).

Unless disabled, `scrollable` must be set to a JavaScript object, which represents the scrolling configuration.

See [Scrollable Tabs](/controls/navigation/tabstrip/overview#configuration-Scrollable) for more information.

#### Example - disable scrolling

    <div id="tabstrip">
        <ul>
            <li>Tab 1</li>
            <li>Tab 2</li>
        </ul>
        <div>Content 1</div>
        <div>Content 2</div>
    </div>

    <script>
        $("#tabstrip").kendoTabStrip({
            scrollable: false
        });
    </script>

### scrollable.distance `Number` *(default: 200)*

Sets the scroll amount (in pixels) applied when the user clicks on a scroll button.

#### Example

    <div id="tabstrip">
        <ul>
            <li>Tab 1</li>
            <li>Tab 2</li>
        </ul>
        <div>Content 1</div>
        <div>Content 2</div>
    </div>

    <script>
        $("#tabstrip").kendoTabStrip({
            scrollable: {
                distance: 300
            }
        });
    </script>

### tabPosition `String`*(default: "top")*

Specifies the position of the widget tabs. Valid values are `"top"` (default), `"left"`, `"right"` and `"bottom"`.
A [**fade animation**](#configuration-animation) is highly recommended with any of the non-default tab position settings.

#### Example

    <div id="tabstrip">
        <ul>
            <li>Tab 1</li>
            <li>Tab 2</li>
        </ul>
        <div>Content 1</div>
        <div>Content 2</div>
    </div>

    <script>
        $("#tabstrip").kendoTabStrip({
            tabPosition: "left",
            animation: {
               open: {
                   effects: "fadeIn"
               }
           }
        });
    </script>

### value `String`*(default: null)*

Specifies the selectd tab. Should be corresponding to the dataTextField configuration and used when bound to a DataSource component.

#### Example

    $("#tabstrip").kendoTabStrip({
        value: "Tab1",
        dataTextField: "Name",
        dataContentField: "Content",
        dataSource: [
          { Name: "Tab1", Content: "Tab1: content" },
          { Name: "Tab2", Content: "Tab2: content" }
        ]
    });

> **Important:** This configuration options is available with releases after 2015.3.1002.

## Fields

### tabGroup `jQuery`

The jQuery object which contains the TabStrip items.

## Methods

### activateTab

Activates a tab specified as a selector. Note: Invoking this method will not trigger any events.

#### Example

    <div id="tabstrip">
        <ul>
            <li id="tab1">Tab 1</li>
            <li>Tab 2</li>
        </ul>
        <div>Content 1</div>
        <div>Content 2</div>
    </div>

    <script>
        var tabToActivate = $("#tab1");
        $("#tabstrip").kendoTabStrip().data("kendoTabStrip").activateTab(tabToActivate);
    </script>

#### Parameters

##### item `jQuery`

The target tab, specified as a selector, to be activated.

### append

Appends a tab to the collection of tabs in a **TabStrip**.

#### Example

    <div id="tabstrip"></div>

    <script>
        var tabStrip = $("#tabstrip").kendoTabStrip().data("kendoTabStrip");
        tabStrip.append(
            [{
                text: "Item 1",
                url: "http://www.telerik.com"               // Link URL if navigation is needed, optional.
            },
            {
                text: "<b>Item 2</b>",
                encoded: false,                             // Allows use of HTML for item text
                content: "text"                             // Content for the content element
            },
            {
                text: "Item 3",
                contentUrl: "http://demos.telerik.com/kendo-ui/content/web/tabstrip/ajax/ajaxContent1.html"
            },
            {
                text: "Item 4",
                imageUrl: "http://demos.telerik.com/kendo-ui/content/shared/icons/sports/baseball.png",
            },
            {
                text: "Item 5",
                spriteCssClass: "imageClass3"               // Item image sprite CSS class, optional.
            }]
        );
    </script>

#### Parameters

##### tab `Array|Object`

Target tab, specified as a JSON object. You can pass tab `text`, `content` or `contentUrl` here. Can handle an HTML string or array of such strings or JSON.

#### Returns

`kendo.ui.TabStrip` Returns the TabStrip object to support chaining.

### contentElement

Obtains the DOM element that encloses tab content by its tab index in the **TabStrip**.

> **Important:** To remove the tab contents safely, use **contentHolder** to get the element to empty.

#### Obtain the content element representing the first tab in a TabStrip

    <div id="tabstrip">
        <ul>
            <li>Tab 1</li>
            <li>Tab 2</li>
        </ul>
        <div>Content 1</div>
        <div>Content 2</div>
    </div>

    <script>
        var tabStrip = $("#tabstrip").kendoTabStrip().data("kendoTabStrip");
        console.log(tabStrip.contentElement(0));
    </script>

#### Parameters

##### itemIndex `Number`

The index of the tab in the TabStrip.

#### Returns

`Element` The DOM element enclosing tab content by its tab index in the **TabStrip**.

### contentHolder

Obtains the DOM element that holds tab content by its tab index in the **TabStrip**.
The difference between `contentElement` and `contentHolder` is that `contentHolder` returns the DOM element that really holds the content, which on mobile is the scroll container.

> **Important:** To remove the tab contents safely, use this method to get the element to empty.

#### Obtain the content holder representing the first tab in a TabStrip

    <div id="tabstrip">
        <ul>
            <li>Tab 1</li>
            <li>Tab 2</li>
        </ul>
        <div>Content 1</div>
        <div>Content 2</div>
    </div>

    <script>
        var tabStrip = $("#tabstrip").kendoTabStrip().data("kendoTabStrip");
        console.log(tabStrip.contentHolder(0));
    </script>

#### Parameters

##### itemIndex `Number`

The index of the tab in the TabStrip.

#### Returns

`Element` The DOM element holding tab content by its tab index in the **TabStrip**.

### deactivateTab

Deactivates a tab specified as a selector. Note: Invoking this method will not trigger any events.

#### Example

    <div id="tabstrip">
        <ul>
            <li id="tab1">Tab 1</li>
            <li>Tab 2</li>
        </ul>
        <div>Content 1</div>
        <div>Content 2</div>
    </div>

    <script>
        var tabToDeactivate = $("#tab1");
        $("#tabstrip").kendoTabStrip().data("kendoTabStrip").deactivateTab(tabToDeactivate);
    </script>

#### Parameters

##### item `jQuery`

The target tab, specified as a selector, to be deactivated.

### destroy
Prepares the **TabStrip** for safe removal from DOM. Detaches all event handlers and removes jQuery.data attributes to avoid memory leaks. Calls destroy method of any child Kendo widgets.

> **Important:** This method does not remove the TabStrip element from DOM.

#### Example

    <div id="tabstrip">
        <ul>
            <li>Tab 1</li>
            <li>Tab 2</li>
        </ul>
        <div>Content 1</div>
        <div>Content 2</div>
    </div>

    <script>
        var tabStrip = $("#tabstrip").kendoTabStrip().data("kendoTabStrip");

        // destroy the widget
        tabStrip.destroy();
    </script>

### disable

Disables a tab(s) of a **TabStrip**.

#### Example

    <div id="tabstrip">
        <ul>
            <li>Tab 1</li>
            <li>Tab 2</li>
        </ul>
        <div>Content 1</div>
        <div>Content 2</div>
    </div>

    <script>
        var tabStrip = $("#tabstrip").kendoTabStrip().data("kendoTabStrip");
        tabStrip.disable(tabStrip.tabGroup.children().eq(0));
    </script>

#### Parameters

##### element `String|Element|jQuery`

The target tab(s), specified as a selector, to be disabled.

#### Returns

`kendo.ui.TabStrip` Returns the TabStrip object to support chaining.

### enable

Disables (**false**) or enables (**true**) a tab(s) of a **TabStrip**.

#### Example

    <div id="tabstrip">
        <ul>
            <li>Tab 1</li>
            <li>Tab 2</li>
        </ul>
        <div>Content 1</div>
        <div>Content 2</div>
    </div>

    <script>
        var tabStrip = $("#tabstrip").kendoTabStrip().data("kendoTabStrip");
        tabStrip.enable(tabStrip.tabGroup.children().eq(0), false);
        tabStrip.enable(tabStrip.tabGroup.children().eq(0), true);
    </script>

#### Parameters

##### element `String|Element|jQuery`

The target tab(s), specified as a selector, to be enabled (**true**) or disabled
(**false**).

##### enable `Boolean` *(optional)*

Desired state of the tab(s) specified by the selector; enabled (**true**) or disabled
(**false**).

#### Returns

`kendo.ui.TabStrip` Returns the TabStrip object to support chaining.

### insertAfter

Inserts a newly-created tab after a specified tab.

#### Example

    <div id="tabstrip">
        <ul>
            <li>Tab</li>
        </ul>
        <div>Content</div>
    </div>

    <script>
        var tabStrip = $("#tabstrip").kendoTabStrip().data("kendoTabStrip");
        tabStrip.insertAfter(
            [{
                text: "Item 1",
                url: "http://www.telerik.com"               // Link URL if navigation is needed, optional.
            },
            {
                text: "<b>Item 2</b>",
                encoded: false,                             // Allows use of HTML for item text
                content: "text"                             // Content for the content element
            },
            {
                text: "Item 3",
                contentUrl: "http://demos.telerik.com/kendo-ui/content/web/tabstrip/ajax/ajaxContent1.html"
            },
            {
                text: "Item 4",
                imageUrl: "http://demos.telerik.com/kendo-ui/content/shared/icons/sports/baseball.png",
            },
            {
                text: "Item 5",
                spriteCssClass: "imageClass3"               // Item image sprite CSS class, optional.
            }],
            tabStrip.tabGroup.children().eq(0)
        );
    </script>

#### Parameters

##### item `String|Element|jQuery`

Target tab, specified as a JSON object. You can pass tab `text`, `content` or `contentUrl` here. Can handle an
HTML string or array of such strings or JSON.

##### referenceTab `String|Element|jQuery`

A reference tab to insert the new item after.

#### Returns

`kendo.ui.TabStrip` Returns the TabStrip object to support chaining.

### insertBefore

Inserts a newly-created tab before a specified tab.

#### Example

    <div id="tabstrip">
        <ul>
            <li>Tab</li>
        </ul>
        <div>Content</div>
    </div>

    <script>
        var tabStrip = $("#tabstrip").kendoTabStrip().data("kendoTabStrip");
        tabStrip.insertBefore(
            [{
                text: "Item 1",
                url: "http://www.telerik.com"               // Link URL if navigation is needed, optional.
            },
            {
                text: "<b>Item 2</b>",
                encoded: false,                             // Allows use of HTML for item text
                content: "text"                             // Content for the content element
            },
            {
                text: "Item 3",
                contentUrl: "http://demos.telerik.com/kendo-ui/content/web/tabstrip/ajax/ajaxContent1.html"
            },
            {
                text: "Item 4",
                imageUrl: "http://demos.telerik.com/kendo-ui/content/shared/icons/sports/baseball.png",
            },
            {
                text: "Item 5",
                spriteCssClass: "imageClass3"               // Item image sprite CSS class, optional.
            }],
            tabStrip.tabGroup.children().eq(0)
        );
    </script>

#### Parameters

##### item `String|Element|jQuery`

Target tab, specified as a JSON object. You can pass tab `text`, `content` or `contentUrl` here. Can handle an
HTML string or array of such strings or JSON.

##### referenceTab `String|Element|jQuery`

A reference tab to insert the new item before

#### Returns

`kendo.ui.TabStrip` Returns the TabStrip object to support chaining.

### items

Gets the list of DOM elements that represent the tabs.

    <div id="tabstrip">
        <ul>
            <li>Tab 1</li>
            <li>Tab 2</li>
        </ul>
        <div>Content 1</div>
        <div>Content 2</div>
    </div>

    <script>
        var tabStrip = $("#tabstrip").kendoTabStrip().data("kendoTabStrip");
        console.log(tabStrip.items());
    </script>

#### Returns

`HTMLCollection` the tabs as an HTML collection of elements.

### reload

Reloads TabStrip tab(s) via AJAX.

    <div id="tabstrip"></div>

    <script>
        var tabStrip = $("#tabstrip").kendoTabStrip({
            dataTextField: "text",
            dataSource: [{
                text: "Tab 1",
                contentUrl: "partialContent1.html"
            },
            {
                text: "Tab 2",
                contentUrl: "partialContent2.html"
            }]
        }).data("kendoTabStrip");

        tabStrip.reload("li:first");
    </script>

#### Parameters

##### element `String|Element|jQuery`

The target tab(s), specified as a selector or jQuery object, to be reloaded via AJAX.

#### Returns

`kendo.ui.TabStrip` Returns the TabStrip object to support chaining.

### remove

Removes a specified tab from a TabStrip.

#### Remove a tab with ID, tab1 from a TabStrip

    <div id="tabstrip">
        <ul>
            <li>Tab 1</li>
            <li>Tab 2</li>
        </ul>
        <div>Content 1</div>
        <div>Content 2</div>
    </div>

    <script>
        var tabStrip = $("#tabstrip").kendoTabStrip().data("kendoTabStrip");
        tabStrip.remove("li:last");
    </script>

#### Parameters

##### element `String|Number|jQuery`

The target tab(s) to be removed, specified as a string selector, a jQuery object, or a zero-based item index.

#### Returns

`kendo.ui.TabStrip` Returns the TabStrip object to support chaining.

### select

Get/set the selected tab. If called without arguments, it returns the
currently selected tab.

#### Example

    <div id="tabstrip">
        <ul>
            <li>Tab 1</li>
            <li>Tab 2</li>
        </ul>
        <div>Content 1</div>
        <div>Content 2</div>
    </div>

    <script>
        var tabStrip = $("#tabstrip").kendoTabStrip().data("kendoTabStrip");

        tabStrip.select("li:first");        // Select by jQuery selector
        tabStrip.select(1);                 // Select by index
    </script>

#### Parameters

##### element `String|Element|jQuery|Number`

The target tab(s), specified as a selector, jQuery object or index in the tab group.

#### Returns

`jQuery` the selected tab if called without arguments. `kendo.ui.TabStrip` if called with arguments.

### setDataSource

Sets the dataSource of an existing tabstrip and rebinds it.

#### Parameters

##### dataSource `Object|Array|kendo.data.DataSource`

#### Example

    <div id="tabstrip">
    </div>

    <script>
      $("#tabstrip").kendoTabStrip({
        dataContentField: "content",
        dataTextField : "label"
      })
      var dataSource = kendo.data.DataSource.create([
        { label: "Label", content: "Content" }
      ])

      $("#tabstrip").data("kendoTabStrip").setDataSource(dataSource);
    </script>

## Events

### activate

Triggered after a tab is being made visible and its animation complete. Before *Q2 2014* this event was invoked *after tab show*, but *before* the end of the animation. This event is triggered only for tabs with associated content.

#### Event Data

##### e.item `Element`

The activated tab.

##### e.contentElement `Element`

The content element of the activated tab.

#### Attach activate event handler during initialization; detach via unbind()

    <div id="tabstrip">
        <ul>
            <li>Tab 1</li>
            <li>Tab 2</li>
        </ul>
        <div>Content 1</div>
        <div>Content 2</div>
    </div>

    <script>
        // event handler for activate
        var onActivate = function(e) {
            // access the activated item via e.item (Element)

            // detach activate event handler via unbind()
            tabStrip.unbind("activate", onActivate);
        };

        // attach activate event handler during initialization
        var tabStrip = $("#tabStrip").kendoTabStrip({
            activate: onActivate
        }).data("kendoTabStrip");
    </script>

#### Attach activate event handler via bind(); detach via unbind()

    <div id="tabstrip">
        <ul>
            <li>Tab 1</li>
            <li>Tab 2</li>
        </ul>
        <div>Content 1</div>
        <div>Content 2</div>
    </div>

    <script>
        // event handler for activate
        var onActivate = function(e) {
            // access the activated item via e.item (Element)

            // detach activate event handler via unbind()
            tabStrip.unbind("activate", onActivate);
        };

        // attach activate event handler via bind()
        var tabStrip = $("#tabStrip").kendoTabStrip().data("kendoTabStrip");
        tabStrip.bind("activate", onActivate);
    </script>

### contentLoad

Triggered when content is fetched from an AJAX request.

#### Event Data

##### e.item `Element`

The selected item

##### e.contentElement `Element`

The loaded content element that is retrieved via AJAX.

#### Attach contentLoad event handler during initialization; detach via unbind()

    <div id="tabstrip"></div>

    <script>
        // event handler for select
        var onContentLoad = function(e) {
            // access the selected item via e.item (Element)

            // detach contentLoad event handler via unbind()
            tabStrip.unbind("contentLoad", onError);
        };

        // attach select event handler during initialization
        var tabStrip = $("#tabstrip").kendoTabStrip({
            dataSource: [{
                text: "Tab 1",
                contentUrl: "partialContent1.html"
            },
            {
                text: "Tab 2",
                contentUrl: "partialContent2.html"
            }],
            contentLoad: onContentLoad
        }).data("kendoTabStrip");
    </script>

### error

Triggered when an AJAX request results in an error.

#### Event Data

##### e.xhr `jqXHR`

The jqXHR object used to load the content

##### e.status `String`

The returned status.

#### Attach error event handler during initialization; detach via unbind()

    <div id="tabstrip">
        <ul>
            <li>Tab 1</li>
            <li>Tab 2</li>
        </ul>
        <div>Content 1</div>
        <div>Content 2</div>
    </div>

    <script>
        // event handler for select
        var onError = function(e) {
            // access the selected item via e.item (Element)

            // detach error event handler via unbind()
            tabStrip.unbind("error", onError);
        };

        // attach select event handler during initialization
        var tabStrip = $("#tabstrip").kendoTabStrip({
            error: onError
        }).data("kendoTabStrip");
    </script>

### select

Triggered before a tab is selected.

#### Event Data

##### e.item `Element`

The selected item chosen by a user.

##### e.contentElement `Element`

The content element of the tab going to be selected.

#### Attach select event handler during initialization; detach via unbind()

    <div id="tabstrip">
        <ul>
            <li>Tab 1</li>
            <li>Tab 2</li>
        </ul>
        <div>Content 1</div>
        <div>Content 2</div>
    </div>

    <script>
        // event handler for select
        var onSelect = function(e) {
            // access the selected item via e.item (Element)

            // detach select event handler via unbind()
            tabStrip.unbind("select", onSelect);
        };

        // attach select event handler during initialization
        var tabStrip = $("#tabstrip").kendoTabStrip({
            select: onSelect
        }).data("kendoTabStrip");
    </script>

#### Attach select event handler via bind(); detach via unbind()

    <div id="tabstrip">
        <ul>
            <li>Tab 1</li>
            <li>Tab 2</li>
        </ul>
        <div>Content 1</div>
        <div>Content 2</div>
    </div>

    <script>
        // event handler for select
        var onSelect = function(e) {
            // access the selected item via e.item (Element)

            // detach select event handler via unbind()
            tabStrip.unbind("select", onSelect);
        };

        // attach select event handler via bind()
        var tabStrip = $("#tabstrip").kendoTabStrip().data("kendoTabStrip");
        tabStrip.bind("select", onSelect);
    </script>

### show

Triggered just after a tab is being made visible, but before the end of the animation. Before *Q2 2014* this event was called *activate*.

#### Event Data

##### e.item `Element`

The activated tab.

##### e.contentElement `Element`

The content element of the activated tab.

#### Attach show event handler during initialization; detach via unbind()

    <div id="tabstrip">
        <ul>
            <li>Tab 1</li>
            <li>Tab 2</li>
        </ul>
        <div>Content 1</div>
        <div>Content 2</div>
    </div>

    <script>
        // event handler for show
        var onShow = function(e) {
            // access the shown item via e.item (Element)

            // detach show event handler via unbind()
            tabStrip.unbind("show", onShow);
        };

        // attach show event handler during initialization
        var tabStrip = $("#tabStrip").kendoTabStrip({
            show: onShow
        }).data("kendoTabStrip");
    </script>

#### Attach show event handler via bind(); detach via unbind()

    <div id="tabstrip">
        <ul>
            <li>Tab 1</li>
            <li>Tab 2</li>
        </ul>
        <div>Content 1</div>
        <div>Content 2</div>
    </div>

    <script>
        // event handler for show
        var onShow = function(e) {
            // access the shown item via e.item (Element)

            // detach show event handler via unbind()
            tabStrip.unbind("show", onShow);
        };

        // attach show event handler via bind()
        var tabStrip = $("#tabStrip").kendoTabStrip().data("kendoTabStrip");
        tabStrip.bind("show", onShow);
    </script>


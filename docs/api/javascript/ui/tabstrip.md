---
title: TabStrip
page_title: Configuration, methods and events of Kendo UI TabStrip
description: Easily disable all animations, set the parameters, used for the visual animation and the effects used in TabStrip UI widget.
res_type: api
component: tabstrip
---

# kendo.ui.TabStrip

Represents the Kendo UI TabStrip. Inherits from [Widget](/api/javascript/ui/widget).

## Configuration

### animation `Object|Boolean`

A collection of visual animations used when **TabStrip** tab are selected through user interactions. Setting this option to `false` will disable all animations.

`animation:true` is not a valid configuration.

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

### closable `Boolean`*(default: false)*

Specifies whether each tab can be closed via a close button. When enabled, each tab includes a close icon that triggers tab removal on click. This applies to all tabs in the TabStrip. You can configure the closable behavior for individual tabs by setting the `closable` option in the specific tab item options.

#### Example

    <div id="tabstrip"></div>

    <script>
        $("#tabstrip").kendoTabStrip({
            closable: true,
            dataTextField: "text",
            dataContentField: "content",
            dataSource: [
                {
                    text: "Tab 1",
                    content: "Tab 1 content"
                },
                {
                    text: "Tab 2",
                    content: "Tab 2 non-closable content",
                    closable: false
                },
                {
                    text: "Tab 3",
                    content: "Tab 3 content"
                }]
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
                "https://demos.telerik.com/kendo-ui/content/web/tabstrip/ajax/ajaxContent1.html"
            ]
        });
    </script>

As of the Kendo UI R1 2017 release, this option can contain configuration objects that are passed to [`jQuery.ajax`](https://api.jquery.com/jquery.ajax/#jQuery-ajax-settings), used by the widget for remote requests. This means that you can set options supported by `jQuery.ajax` through configuration objects such as `cache`, `url`, `type`, and others.

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
                {
                    url: "https://demos.telerik.com/kendo-ui/content/web/tabstrip/ajax/ajaxContent1.html",
                    cache: true
                }
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
              { Name: "Tab1", ContentUrl: "https://demos.telerik.com/kendo-ui/content/web/tabstrip/ajax/ajaxContent1.html" },
              { Name: "Tab2", ContentUrl: "https://demos.telerik.com/kendo-ui/content/web/tabstrip/ajax/ajaxContent2.html" }
            ]
        });
    </script>

### dataIconField `String`*(default: "icon")*

Sets the field of the data item that provides the icon for the tab.

#### Example

    <div id="tabstrip"></div>

    <script>
        $("#tabstrip").kendoTabStrip({
            dataTextField: "Name",
            dataIconField: "Icon",
            dataSource: [
              { Name: "Tab1", Icon: "gear" },
              { Name: "Tab2", Icon: "pencil" }
            ]
        });
    </script>

### dataIconPositionField `String`*(default: "iconPosition")*

Sets the field of the data item that provides the position of the icon relative to the tab text. Possible values are `before` and `after`.

#### Example

    <div id="tabstrip"></div>

    <script>
        $("#tabstrip").kendoTabStrip({
            dataTextField: "Name",
            dataIconField: "Icon",
            dataIconPositionField: "IconPosition",
            dataSource: [
              { Name: "Tab1", Icon: "gear", IconPosition: "before" },
              { Name: "Tab2", Icon: "pencil", IconPosition: "after" }
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
              { Name: "Tab1", ImageUrl: "https://demos.telerik.com/kendo-ui/content/web/tabstrip/ajax/ajaxContent1.html" },
              { Name: "Tab2", ImageUrl: "https://demos.telerik.com/kendo-ui/content/web/tabstrip/ajax/ajaxContent2.html" }
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

### dataSource.text `String` *(default: "")*

The display text of the tab. This is the text that will be shown in the tab header.

#### Example

    <div id="tabstrip"></div>
    <script>
        $("#tabstrip").kendoTabStrip({
            dataTextField: "text",
            dataContentField: "content",
            dataSource: [
              { text: "Tab 1", content: "Tab 1 content" },
              { text: "Tab 2", content: "Tab 2 content" }
            ]
        });
    </script>

### dataSource.content `String` *(default: "")*

The content to be displayed in the tab panel when the tab is selected.

#### Example

    <div id="tabstrip"></div>
    <script>
        $("#tabstrip").kendoTabStrip({
            dataTextField: "text",
            dataContentField: "content",
            dataSource: [
              { text: "Tab 1", content: "Tab 1 content" },
              { text: "Tab 2", content: "Tab 2 content" }
            ]
        });
    </script>

### dataSource.icon `String` *(default: "")*

Тhe name for an existing icon in a Kendo UI theme or SVG content. The icon is rendered inside the tab element.

See [web icons help article](https://www.telerik.com/kendo-jquery-ui/documentation/styles-and-layout/sass-themes/svg-icons) for more details on Kendo UI icons.

#### Example

    <div id="tabstrip"></div>
    <script>
        $("#tabstrip").kendoTabStrip({
            dataTextField: "text",
            dataContentField: "content",
            dataIconField: "icon",
            dataSource: [
              { text: "Home", icon: "home", content: "Home content" },
              { text: "Settings", icon: "gear", content: "Settings content" }
            ]
        });
    </script>

### dataSource.iconPosition `String` *(default: "before")*

Sets the position of the icon relative to the tab text. Possible values are `before` and `after`.

#### Example

    <div id="tabstrip"></div>
    <script>
        $("#tabstrip").kendoTabStrip({
            dataTextField: "text",
            dataContentField: "content",
            dataIconField: "icon",
            dataIconPositionField: "iconPosition",
            dataSource: [
              { text: "Home", icon: "home", iconPosition: "before", content: "Home content" },
              { text: "Settings", icon: "gear", iconPosition: "after", content: "Settings content" }
            ]
        });
    </script>

### dataSource.iconClass `String` *(default: "")*

If set, this value will be appended to the icon element's class attribute.

#### Example

    <div id="tabstrip"></div>
    <script>
        $("#tabstrip").kendoTabStrip({
            dataTextField: "text",
            dataContentField: "content",
            dataSource: [
              { text: "Home", icon: "home", iconClass: "my-home-icon", content: "Home content" },
              { text: "Settings", icon: "gear", iconClass: "my-settings-icon", content: "Settings content" }
            ]
        });
    </script>

### dataSource.closable `Boolean` *(default: false)*

Specifies whether this specific tab can be closed via a close button. When set to true, the tab includes a close icon that triggers tab removal when clicked. This overrides the global `closable` setting for this specific tab.

#### Example

    <div id="tabstrip"></div>
    <script>
        $("#tabstrip").kendoTabStrip({
            dataTextField: "text",
            dataContentField: "content",
            dataSource: [
              { text: "Tab 1", content: "Tab 1 content" },
              { text: "Tab 2 (closable)", content: "Tab 2 content", closable: true },
              { text: "Tab 3", content: "Tab 3 content" }
            ]
        });
    </script>

### dataSource.actions `Array`

Defines a collection of action buttons that are rendered in the tab. The actions buttons are rendered as part of the tab and can be used to provide additional functionality beyond the built-in close button.

#### Example

    <div id="tabstrip"></div>
    <script>
        $("#tabstrip").kendoTabStrip({
            dataTextField: "text",
            dataContentField: "content",
            dataSource: [
              {
                text: "Tab with actions",
                content: "Tab content",
                actions: [
                  {
                    icon: "pencil",
                    action: function(e) {
                      console.log("Edit tab", e);
                    }
                  },
                  {
                    icon: "refresh",
                    action: function(e) {
                      console.log("Refresh tab", e);
                    }
                  }
                ]
              }
            ]
        });
    </script>

### dataSource.actions.icon `String` *(default: "")*

Defines the name for an existing icon in a Kendo UI theme or SVG content that is used for the action button.

#### Example

    <div id="tabstrip"></div>
    <script>
        $("#tabstrip").kendoTabStrip({
            dataTextField: "text",
            dataContentField: "content",
            dataSource: [
              {
                text: "Tab with actions",
                content: "Tab content",
                actions: [
                  {
                    icon: "pencil",
                    action: function(e) {
                      console.log("Edit tab", e);
                    }
                  }
                ]
              }
            ]
        });
    </script>

### dataSource.actions.iconClass `String` *(default: "")*

If set, this value will be appended to the action button's icon element class attribute. Provides an alternative way to specify an icon using custom CSS classes.

#### Example

    <div id="tabstrip"></div>
    <script>
        $("#tabstrip").kendoTabStrip({
            dataTextField: "text",
            dataContentField: "content",
            dataSource: [
              {
                text: "Tab with actions",
                content: "Tab content",
                actions: [
                  {
                    iconClass: "k-icon k-i-pencil",
                    action: function(e) {
                      console.log("Edit tab", e);
                    }
                  }
                ]
              }
            ]
        });
    </script>

### dataSource.actions.attributes `Object`

Defines custom attributes to be applied to the action button element.

#### Example

```html
    <div id="tabstrip"></div>
    <script>
        $("#tabstrip").kendoTabStrip({
            dataTextField: "text",
            dataContentField: "content",
            dataSource: [
              {
                text: "Tab with actions",
                content: "Tab content",
                actions: [
                  {
                    icon: "pencil",
                    attributes: { "title": "Edit", "data-id": "edit-action" },
                    action: function(e) {
                      console.log("Edit tab", e);
                    }
                  }
                ]
              }
            ]
        });
    </script>
```

### dataSource.actions.action `Function`

A function to be executed when the action button is clicked. The event object is passed as a parameter to the function.

#### Example

    <div id="tabstrip"></div>
    <script>
        $("#tabstrip").kendoTabStrip({
            dataTextField: "text",
            dataContentField: "content",
            dataSource: [
              {
                text: "Tab with actions",
                content: "Tab content",
                actions: [
                  {
                    icon: "pencil",
                    action: function(e) {
                      console.log("Edit tab", e);
                    }
                  }
                ]
              }
            ]
        });
    </script>

### dataSource.enabled `Boolean` *(default: true)*

Specifies whether the tab is enabled or disabled. Disabled tabs cannot be selected or focused and are displayed with a different visual style.

#### Example

    <div id="tabstrip"></div>
    <script>
        $("#tabstrip").kendoTabStrip({
            dataTextField: "text",
            dataContentField: "content",
            dataSource: [
              { text: "Tab 1", content: "Tab 1 content" },
              { text: "Tab 2", content: "Tab 2 content", enabled: false },
              { text: "Tab 3", content: "Tab 3 content" }
            ]
        });
    </script>

### dataSource.attributes `Object`

Defines custom attributes to be applied to the tab element.

#### Example
```pseudo
    <div id="tabstrip"></div>
    <script>
        $("#tabstrip").kendoTabStrip({
            dataTextField: "text",
            dataContentField: "content",
            dataSource: [
              {
                text: "Tab 1",
                content: "Tab 1 content",
                attributes: { "data-custom": "value", "title": "Tab 1 tooltip" }
              },
              { text: "Tab 2", content: "Tab 2 content" }
            ]
        });
    </script>
```
### dataSpriteCssClass `String`*(default: "")*

Sets the field of the data item that provides the CSS class of the tab.

#### Example

    <div id="tabstrip"></div>

    <script>
        $("#tabstrip").kendoTabStrip({
            dataTextField: "Name",
            dataSpriteCssClass: "CssClass",
            dataSource: [
              { Name: "Tab1", CssClass: "class1" },
              { Name: "Tab2", CssClass: "class2" }
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
              { Name: "Telerik", Url: "https://www.telerik.com" },
              { Name: "Google", Url: "https://www.google.com" }
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

### scrollable `Boolean|Object` *(default: true)*

If enabled, the TabStrip will display buttons that will scroll the tabs horizontally, when they cannot fit the TabStrip width. By default scrolling is enabled.

Unless disabled, `scrollable` must be set to a JavaScript object, which represents the scrolling configuration.

See [Scrollable Tabs](/controls/tabstrip/overview#configuration-Scrollable) for more information.

#### Example - disable scrolling

    <div id="tabstrip">
		<ul>
			<li>Tab Header Number 1</li>
			<li>Tab Header Number 2</li>
			<li>Tab Header Number 3</li>
			<li>Tab Header Number 4</li>
			<li>Tab Header Number 5</li>
			<li>Tab Header Number 6</li>
		</ul>
		<div>Content 1</div>
		<div>Content 2</div>
		<div>Content 3</div>
		<div>Content 4</div>
		<div>Content 5</div>
		<div>Content 6</div>
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
			<li>Tab Header Number 1</li>
			<li>Tab Header Number 2</li>
			<li>Tab Header Number 3</li>
			<li>Tab Header Number 4</li>
			<li>Tab Header Number 5</li>
			<li>Tab Header Number 6</li>
		</ul>
		<div>Content 1</div>
		<div>Content 2</div>
		<div>Content 3</div>
		<div>Content 4</div>
		<div>Content 5</div>
		<div>Content 6</div>
	</div>
	<script>
		$("#tabstrip").kendoTabStrip({
			scrollable: {
				distance: 30
			}
		});
	</script>


### scrollable.scrollButtonsPosition `String` *(default: "split")*

Sets the scroll buttons position.

Can be set to:

* `start` - the buttons are displayed before the tabs
* `end` - the buttons are displayed after the tabs
* `split` - the previous button is displayed before the tabs and the next button is displayed after the tabs

#### Example - scrollButtonsPosition set to start

    <div id="tabstrip">
		<ul>
			<li>Tab Header Number 1</li>
			<li>Tab Header Number 2</li>
			<li>Tab Header Number 3</li>
			<li>Tab Header Number 4</li>
			<li>Tab Header Number 5</li>
			<li>Tab Header Number 6</li>
		</ul>
		<div>Content 1</div>
		<div>Content 2</div>
		<div>Content 3</div>
		<div>Content 4</div>
		<div>Content 5</div>
		<div>Content 6</div>
	</div>
	<script>
		$("#tabstrip").kendoTabStrip({
			scrollable: {
				scrollButtonsPosition: "start"
			}
		});
	</script>


#### Example - scrollButtonsPosition set to end

    <div id="tabstrip">
		<ul>
			<li>Tab Header Number 1</li>
			<li>Tab Header Number 2</li>
			<li>Tab Header Number 3</li>
			<li>Tab Header Number 4</li>
			<li>Tab Header Number 5</li>
			<li>Tab Header Number 6</li>
		</ul>
		<div>Content 1</div>
		<div>Content 2</div>
		<div>Content 3</div>
		<div>Content 4</div>
		<div>Content 5</div>
		<div>Content 6</div>
	</div>
	<script>
		$("#tabstrip").kendoTabStrip({
			scrollable: {
				scrollButtonsPosition: "end"
			}
		});
	</script>



#### Example - scrollButtonsPosition set to split

    <div id="tabstrip">
		<ul>
			<li>Tab Header Number 1</li>
			<li>Tab Header Number 2</li>
			<li>Tab Header Number 3</li>
			<li>Tab Header Number 4</li>
			<li>Tab Header Number 5</li>
			<li>Tab Header Number 6</li>
		</ul>
		<div>Content 1</div>
		<div>Content 2</div>
		<div>Content 3</div>
		<div>Content 4</div>
		<div>Content 5</div>
		<div>Content 6</div>
	</div>
	<script>
		$("#tabstrip").kendoTabStrip({
			scrollable: {
				scrollButtonsPosition: "split"
			}
		});
	</script>

### scrollable.scrollButtons `String` *(default: "auto")*

Sets the scroll buttons visibility.

Can be set to:

* `auto` - the buttons are added only when tabstrip enters scrollable mode
* `visible` - the buttons are always visible
* `hidden` - the buttons are never visible

#### Example - scrollButtons set to auto

    <div id="tabstrip">
		<ul>
			<li>Tab Header Number 1</li>
			<li>Tab Header Number 2</li>
			<li>Tab Header Number 3</li>
			<li>Tab Header Number 4</li>
			<li>Tab Header Number 5</li>
			<li>Tab Header Number 6</li>
		</ul>
		<div>Content 1</div>
		<div>Content 2</div>
		<div>Content 3</div>
		<div>Content 4</div>
		<div>Content 5</div>
		<div>Content 6</div>
	</div>
	<script>
		$("#tabstrip").kendoTabStrip({
			scrollable: {
				scrollButtons: "auto"
			}
		});
	</script>


#### Example - scrollButtons set to visible

    <div id="tabstrip">
		<ul>
			<li>Tab Header Number 1</li>
			<li>Tab Header Number 2</li>
			<li>Tab Header Number 3</li>
			<li>Tab Header Number 4</li>
			<li>Tab Header Number 5</li>
			<li>Tab Header Number 6</li>
		</ul>
		<div>Content 1</div>
		<div>Content 2</div>
		<div>Content 3</div>
		<div>Content 4</div>
		<div>Content 5</div>
		<div>Content 6</div>
	</div>
	<script>
		$("#tabstrip").kendoTabStrip({
			scrollable: {
				scrollButtons: "visible"
			}
		});
	</script>



#### Example - scrollButtons set to hidden

    <div id="tabstrip">
		<ul>
			<li>Tab Header Number 1</li>
			<li>Tab Header Number 2</li>
			<li>Tab Header Number 3</li>
			<li>Tab Header Number 4</li>
			<li>Tab Header Number 5</li>
			<li>Tab Header Number 6</li>
		</ul>
		<div>Content 1</div>
		<div>Content 2</div>
		<div>Content 3</div>
		<div>Content 4</div>
		<div>Content 5</div>
		<div>Content 6</div>
	</div>
	<script>
		$("#tabstrip").kendoTabStrip({
			scrollable: {
				scrollButtons: "hidden"
			}
		});
	</script>



### sortable `Boolean` *(default: false)*

If enabled, users will be able to sort the tabs by dragging them to the desired position.

#### Example

    <div id="tabstrip">
		<ul>
			<li>Tab Header Number 1</li>
			<li>Tab Header Number 2</li>
			<li>Tab Header Number 3</li>
			<li>Tab Header Number 4</li>
			<li>Tab Header Number 5</li>
			<li>Tab Header Number 6</li>
		</ul>
		<div>Content 1</div>
		<div>Content 2</div>
		<div>Content 3</div>
		<div>Content 4</div>
		<div>Content 5</div>
		<div>Content 6</div>
	</div>
	<script>
		$("#tabstrip").kendoTabStrip({
			sortable: true
		});
	</script>


### tabAlignment `String`*(default: "start")*

Specifies the alignment of the widget tabs. Valid values are `"start"` (default), `"end"`, `"center"`, `"stretched"` and `"justify"`.

> TabAlignment is not applicable with Scrollable TabStrip.

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
            tabAlignment: "center",
            animation: {
               open: {
                   effects: "fadeIn"
               }
           }
        });
    </script>


### tabPosition `String`*(default: "top")*

Specifies the position of the widget tabs. Valid values are `"top"` (default), `"left"`, `"right"` and `"bottom"`.
A [**fade animation**](/api/javascript/ui/tabstrip#configuration-animation) is highly recommended with any of the non-default tab position settings.

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

### size `String`*(default: "medium")*

Specifies the size of the widget tabs. Valid values are `"medium"` (default), `"small"` and `"large"`.

#### Example - size set to medium

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
            size: "medium",
        });
    </script>


#### Example - size set to small

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
            size: "small",
        });
    </script>


#### Example - size set to large

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
            size: "large",
        });
    </script>



### value `String`*(default: null)*

Specifies the selected tab. Should be corresponding to the dataTextField configuration and used when bound to a DataSource component.

#### Example
    <div id="tabstrip">
    </div>

    <script>
        $("#tabstrip").kendoTabStrip({
            value: "Tab1",
            dataTextField: "Name",
            dataContentField: "Content",
            dataSource: [
              { Name: "Tab1", Content: "Tab1: content" },
              { Name: "Tab2", Content: "Tab2: content" }
            ]
        });
    </script>

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
         var tabStrip = $("#tabstrip").kendoTabStrip({
            dataTextField: "text",
            dataImageUrlField: "imageUrl",
            dataContentField: "content",
            dataContentUrlField: "contentUrl",
            dataSource: [
                            {
                                text: "Tab 1",
                                content: "Tab 1 content"
                            },
                            {
                                text: "Tab 2",
                                content: "Tab 2 content"
                            },
                            {
                                text: "Tab 3",
                                content: "Tab 3 content"
                            }
                        ]
        }).data("kendoTabStrip");

        tabStrip.append(
            [{
                text: "<b>Appended Tab 1</b>",
                encoded: false,                             // Allows use of HTML for item text
                content: "Appended Tab 1 content",                             // Content for the content element
                imageUrl: "https://demos.telerik.com/kendo-ui/content/shared/icons/sports/baseball.png" // Provides the image URL of the tab
            },
            {
                text: "<i>Appended Tab 2</i>",
                encoded: false,                             // Allows use of HTML for item text
                contentUrl: "https://demos.telerik.com/kendo-ui/content/web/tabstrip/ajax/ajaxContent1.html", // Provides the URL for the Ajax loaded tab content
                spriteCssClass: "brazilFlag"  // Item image sprite CSS class, optional.
            }]
        );
    </script>
    <style>
        #tabstrip .k-sprite {
        background-image: url("https://demos.telerik.com/kendo-ui/content/shared/styles/flags.png");
        }
    </style>

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
	/* The result can be observed in the DevTools(F12) console of the browser. */
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
	/* The result can be observed in the DevTools(F12) console of the browser. */
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
            <li id="tab1" class="k-active">Tab 1</li>
            <li>Tab 2</li>
        </ul>
        <div>Content 1</div>
        <div>Content 2</div>
    </div>

    <script>
      var tabstrip = $("#tabstrip").kendoTabStrip().data("kendoTabStrip");
      var tabToDeactivate = $("#tab1");
      tabstrip.deactivateTab(tabToDeactivate);
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
                url: "https://www.telerik.com"               // Link URL if navigation is needed, optional.
            },
            {
                text: "<b>Item 2</b>",
                encoded: false,                             // Allows use of HTML for item text
                content: "text"                             // Content for the content element
            },
            {
                text: "Item 3",
                contentUrl: "https://demos.telerik.com/kendo-ui/content/web/tabstrip/ajax/ajaxContent1.html"
            },
            {
                text: "Item 4",
                imageUrl: "https://demos.telerik.com/kendo-ui/content/shared/icons/sports/baseball.png",
            },
            {
                text: "Item 5",
                spriteCssClass: "imageClass3"               // Item image sprite CSS class, optional.
            }],
            tabStrip.tabGroup.children().eq(0)
        );
    </script>

#### Parameters

##### item `Array|Object|String|Element|jQuery`

Target tab(s), specified as a JSON object or array of objects. You can pass tab `text`, `content` or `contentUrl` here. Accepts also existing tab(s) specified as a string selector or jQuery object or DOM elements.

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
                url: "https://www.telerik.com"               // Link URL if navigation is needed, optional.
            },
            {
                text: "<b>Item 2</b>",
                encoded: false,                             // Allows use of HTML for item text
                content: "text"                             // Content for the content element
            },
            {
                text: "Item 3",
                contentUrl: "https://demos.telerik.com/kendo-ui/content/web/tabstrip/ajax/ajaxContent1.html"
            },
            {
                text: "Item 4",
                imageUrl: "https://demos.telerik.com/kendo-ui/content/shared/icons/sports/baseball.png",
            },
            {
                text: "Item 5",
                spriteCssClass: "imageClass3"               // Item image sprite CSS class, optional.
            }],
            tabStrip.tabGroup.children().eq(0)
        );
    </script>

#### Parameters

##### item `Array|Object|String|Element|jQuery`

Target tab(s), specified as a JSON object or array of objects. You can pass tab `text`, `content` or `contentUrl` here. Accepts also existing tab(s) specified as a string selector or jQuery object or DOM elements.

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
	/* The result can be observed in the DevTools(F12) console of the browser. */
        console.log(tabStrip.items());
    </script>

#### Returns

`HTMLCollection` the tabs as an HTML collection of elements.

### reload

Reloads TabStrip tab(s) via AJAX.

    <button id="btn">Reload</button>
    <div id="tabstrip"></div>

    <script>
      var tabStrip = $("#tabstrip").kendoTabStrip({
        dataTextField: "Name",
        dataContentUrlField: "ContentUrl",
        dataSource: [
          { Name: "Tab1", ContentUrl: "https://demos.telerik.com/kendo-ui/content/web/tabstrip/ajax/ajaxContent1.html" },
          { Name: "Tab2", ContentUrl: "https://demos.telerik.com/kendo-ui/content/web/tabstrip/ajax/ajaxContent2.html" }
        ]
      }).data("kendoTabStrip");

      $('#btn').click(function(){
        //The result can be observed in the Network tab in the browser`s Developer Tools.
        //When the button is clicked a request for loading the content will be performed.
        tabStrip.reload("li:first");
      })
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
      <div>
        <button class='k-button'>Select second tab</button>
      </div>
      <div>Content 2</div>
    </div>

    <script>
      var tabStrip = $("#tabstrip").kendoTabStrip().data("kendoTabStrip");

      tabStrip.select("li:first");  // Select by jQuery selector
      $("#tabstrip").on("click", ".k-button", function() {
      	  tabStrip.select(1);   // Select by index
      })
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

    <div id="tabStrip">
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

    <div id="tabStrip">
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
            dataTextField: "Name",
            dataContentUrlField: "ContentUrl",
            dataSource: [
              { Name: "Tab1", ContentUrl: "https://demos.telerik.com/kendo-ui/content/web/tabstrip/ajax/ajaxContent1.html" },
              { Name: "Tab2", ContentUrl: "https://demos.telerik.com/kendo-ui/content/web/tabstrip/ajax/ajaxContent2.html" }
            ],
            contentLoad: onContentLoad
        }).data("kendoTabStrip");
    </script>

### error

Triggered when an AJAX request results in an error.

> This event won't fire if you use jQuery 3.x. More information is available [here](https://github.com/telerik/kendo-ui-core/issues/2304).

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
        var tabStrip = $("#tabstrip").kendoTabStrip().data("kendoTabStrip");
        tabStrip.bind("show", onShow);
    </script>

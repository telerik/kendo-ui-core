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


<div class="meta-api-description">
How to disable animations in Kendo UI TabStrip? Manage and customize the visual effects and smoothness of tab selection changes within a tabbed interface, enabling or disabling transition animations, configuring how tabs animate when a user switches between them, adjusting animation settings such as duration and style, controlling whether animations play on tab click or programmatic selection, and turning off all tab change animations for a static experience. This covers scenarios like toggling animations on or off, fine-tuning transition effects, enhancing UX with animated tab switches, preventing animations for performance or preference, and customizing the look and feel of tab transitions during navigation.
</div>

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


<div class="meta-api-description">
How to customize closing animation in Kendo UI tab strip? Configure, enable, customize, or disable the visual closing animations or transition effects for tabs when they are closed in a tab strip interface, including setting the type of animation effect, adjusting duration, easing functions, or turning off the close animation entirely to control the tab closing behavior and visual feedback during user interaction with tabbed components.
</div>

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


<div class="meta-api-description">
How to adjust the duration of the close animation in a Kendo UI TabStrip? Set or adjust the duration, length, or timing of the tab close animation effect when closing tabs in a tab strip or tab control, enabling control over how fast or slow the closing animation runs, configure animation speed or timing in milliseconds for smoother or quicker tab transitions, customize the visual closing effect speed, modify animation delay or duration to improve user experience during tab closures, and optimize the responsiveness or visual feedback when a tab is dismissed or removed.
</div>

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


<div class="meta-api-description">
How do I customize the closing animation effects for tabs in a Kendo UI TabStrip? Customize and control the closing animation effects for tabs in a tabbed interface, enabling you to define specific visual transitions or effects that play when a tab is closed, including the ability to set multiple effects via a space-separated string. Adjust how tabs disappear with smooth, configurable animations or fallback behaviors if no effects are specified, supporting scenarios like reversing open animations or applying distinct exit animations. This feature supports configuring, enabling, or tailoring the closing animation behavior at initialization time to create polished user experiences or to synchronize tab closing with other UI effects.
</div>

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


<div class="meta-api-description">
How to customize tab opening animation in Kendo UI TabStrip? Control and customize the visual effects or transitions applied when a new tab becomes visible, including configuring open animations for smooth, dynamic tab activation, defining show and display animations for tab content, enabling or setting custom transition effects during tab opening, and managing how tabs animate as they are activated or displayed.
</div>

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


<div class="meta-api-description">
How do I adjust the speed of the open animation in a Kendo UI tab strip? Adjust or configure the speed, timing, or duration of the open animation when switching to or displaying a new tab in a tab strip interface, controlling how quickly the tab content appears or transitions on screen by specifying the animation length in milliseconds; useful for optimizing user experience, fine-tuning visual transition smoothness, customizing UI responsiveness, enabling faster or slower tab opening effects, setting animation timing parameters, or managing animation performance during tab selection changes.
</div>

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


<div class="meta-api-description">
How to customize tab opening animation in Kendo UI TabStrip? Control and customize the visual transition when a new tab is opened by specifying one or multiple animation effects such as vertical expansion or fade-in, enabling smooth or dynamic open animations for tab interfaces. Enable, configure, or combine different entry animations like vertical expand or fade in to enhance user experience when new tabs appear in tab strips. Adjust how tabs animate on opening by setting animation styles that govern fade, expand, or other effects to create seamless or attention-grabbing tab transitions. Define and apply various open transition effects for new tabs using keywords like expand vertical and fade-in to tailor tab opening behavior and visual appeal.
</div>

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


<div class="meta-api-description">
How to enable close buttons on Kendo UI tabstrip? Control whether tabs display a close button that users can click to remove or close individual tabs, enabling or disabling tab closing functionality globally or on specific tabs, allowing configuration to add or remove close icons for tab management, supporting customizable tab closing behavior, and handling user interactions for closing tabs dynamically in tab navigation interfaces.
</div>

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


<div class="meta-api-description">
How can I make Kendo UI TabStrip collapse on click of an active tab? Control toggling the active tab's content area by enabling or disabling the ability to collapse an open pane, allowing users to click an expanded tab header to either hide or show its content. Configure whether the tab panel can be fully collapsed on repeated clicks, setting the behavior for tab selection to toggle visibility of the content area or maintain it open, useful for creating collapsible tab navigation interfaces and enhancing user interaction by allowing tabs to open and close on demand. This setting governs if clicking an already active tab closes the pane or keeps it expanded, enabling developers to customize tab strip behaviors for collapsible content sections and dynamic tab toggling.
</div>

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


<div class="meta-api-description">
How do I configure Kendo UI tabstrip to load content from external URLs? Configure tab content loading by specifying an array of external URLs to dynamically fetch and display remote or partial page content within each tab based on its index. Enable selective Ajax loading so that individual tabs load content from specified URLs while others remain static or empty by using null placeholders to control which tabs retrieve data asynchronously. Set up per-tab asynchronous content retrieval, remote view injection, or partial page updates by mapping array positions to tabs, allowing fine-grained control over loading content on demand through Ajax calls. Customize dynamic tab initialization with external resource links for each tab panel, supporting scenarios like lazy loading, partial view integration, and remote data binding by adjusting the URL array accordingly.
</div>

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


<div class="meta-api-description">
How do I bind tab content dynamically to my data source in Kendo UI TabStrip? Map or bind tab panel content text dynamically from a specific data field in your data source, enabling tabs to display content based on underlying dataset properties or records; configure which item attribute controls the displayed content text inside each tab panel, set or link content fields for data-driven tab content population, synchronize tab bodies with corresponding data fields, and control how tab content text is derived from your data structure to support dynamic, variable, or database-driven tab interfaces.
</div>

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


<div class="meta-api-description">
How do I configure Kendo UI TabStrip to dynamically load tab content with a specific URL field from my data source? Enable dynamic loading of tab content by configuring which data field contains the URL for Ajax requests in tab components, specifying the exact source property within data items that provides the content endpoint, controlling how tab panels fetch content asynchronously based on data source attributes, setting or changing the URL field to dictate what address each tab uses to retrieve its content, and managing remote content loading behaviors through the relevant data field reference in tab data objects.
</div>

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


<div class="meta-api-description">
How to specify the data field that supplies icons for each tab in a Kendo UI TabStrip? Control which data field supplies icons for each tab by specifying the source property that holds icon information such as CSS classes, font icon names, image URLs, or bitmap references; customize, bind, or link tab icons dynamically from datasets to display alongside tab labels, configure icon rendering per tab, enable icon integration from various data structures, and adjust how icons appear through data-driven fields that determine visual markers on tabs within tab strip interfaces.
</div>

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


<div class="meta-api-description">
How do I control the icon position in Kendo UI TabStrip? Control and customize the placement of icons relative to tab text by specifying the position of the icon either before or after the label, enabling dynamic per-tab icon alignment based on bound data fields, configuring icon location adjacent to tab titles, adjusting icon orientation in tab interfaces, setting icon positions for each data-driven tab, managing icon placement for tab strips, and defining whether icons appear leading or trailing tab text for tailored user interfaces.
</div>

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


<div class="meta-api-description">
How do I dynamically set image URLs for tabs in a Kendo UI tab strip? Configure or enable displaying icons or images on tabs by specifying the data field containing image URLs within your tab items, allowing dynamic assignment of image sources from your data set to each tab for visual indicators, thumbnails, or branding elements, supporting use cases like setting custom tab icons, showing tab images from remote or local URLs, mapping image paths in data collections to tab headers, and controlling icon rendering on tabs during component setup or runtime data binding.
</div>

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


<div class="meta-api-description">
How do I bind dynamic tab items to my Kendo UI TabStrip control? Configure, bind, or connect a tab navigation component to dynamic or static collections of tab items from local arrays, remote data endpoints, or existing data source instances, enabling loading, updating, syncing, and managing tab entries via JavaScript arrays, plain objects, or fully featured data source objects that support real-time data binding, refreshing, and integration with data management libraries; control data feeds for tab elements using configurable data providers, external data connections, or in-memory datasets to handle tab item states, collections, or updates dynamically in web applications.
</div>

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


<div class="meta-api-description">
How do I set the tab header label text in a Kendo UI TabStrip? Configure or set the tab header label text for each tab item, specify or update the display text shown on tab headers when binding data sources, dynamically generating tabs, customizing or modifying tab titles, controlling tab captions, assigning or changing tab names programmatically or via data arrays, managing tab labels for navigation interfaces, and enabling dynamic or static tab title assignment through text fields in data structures.
</div>

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


<div class="meta-api-description">
How do I customize the content of each tab in a Kendo UI TabStrip? Define or configure the content rendered inside a tab panel when a specific tab is selected, control what is displayed within each tab of a tab strip, set or customize the panel contents for tabs dynamically, manage the visible information and layout shown upon tab switching, specify inline or template-based content for individual tabs, enable or control tab panel rendering based on user selection, adjust or update the displayed elements inside tabs in tab navigation components, tailor the content presentation per tab within a tab container, manipulate how tab panels display data or UI elements, and customize what users see when navigating between tabs.
</div>

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


<div class="meta-api-description">
How to set custom icons for tab headers in Kendo UI TabStrip? Set or configure icons for tab headers by specifying a predefined icon name from Kendo UI themes or by supplying custom SVG content to visually enhance tabs, control tab imagery, customize glyph appearance within tab elements, enable icon display on tabs, and customize or change tab icon graphics dynamically for better UI navigation and branding consistency.
</div>

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


<div class="meta-api-description">
How to position icons in Kendo UI tabstrip controls? Adjust or configure the placement of icons in tab controls to appear either before or after the text label, enabling customization of tab visuals by setting icon alignment relative to tab titles, controlling whether icons show preceding or following tab captions, managing icon-text positioning in tab items, specifying icon layout in tabs to enhance UI design, and enabling developers to set icon location for each tab element within a data list or collection.
</div>

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


<div class="meta-api-description">
How do I customize tab icons in Kendo UI TabStrip with custom CSS classes? Control and customize the visual appearance of tab icons by adding one or multiple CSS class names to icon elements within tab data sources, enabling the use of custom icons, icon fonts, or styling frameworks like Font Awesome and Kendo UI; configure, set, or append CSS classes dynamically to icon elements during initialization or runtime to tailor tab visuals, enhance UI iconography, and manage icon styling through flexible class assignments that modify icon presentation within tab components.
</div>

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


<div class="meta-api-description">
How to make individual tabs closable in Kendo UI TabStrip? Enable or set individual tabs to be closable by configuring each tab's data source entry with a boolean flag, allowing the display of a close icon to remove specific tabs on click, overriding any global close tab settings, and providing control over per-tab close behavior for dynamic tab management, customizable tab closures, and interactive user interfaces that require selective tab dismissal or enablement of close buttons on individual tabs.
</div>

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


<div class="meta-api-description">
How to add custom buttons to each tab in Kendo UI TabStrip? Add and customize inline buttons or controls on individual tabs to enable actions such as editing tab titles, renaming, deleting, triggering custom commands, or showing additional interactive elements directly within tab headers. Manage per-tab buttons that appear alongside default tab controls, configure collections of clickable icons or action items to allow developers to set up dynamic, contextual operations like inline editing, command execution, or user interaction options embedded in each tab’s strip. Enable, define, or control tab-level action buttons for improved UX and fine-grained tab management through configurable action collections appended to tabs.
</div>

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


<div class="meta-api-description">
How can I customize the appearance of action buttons in a Kendo UI TabStrip? Configure or customize the visual representation of action buttons in tab strip components by setting icons through icon names from predefined UI themes or by providing custom SVG markup strings; this enables control over action button appearance, including styling, graphical symbols, or unique icons for toolbar actions, navigation tabs, or interactive controls, supporting scenarios such as replacing default icons, enhancing UI clarity, or integrating branded graphics within dynamic tab bars.
</div>

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


<div class="meta-api-description">
How do I change the icon class on Kendo UI TabStrip action buttons? Customize or change the icon displayed on action buttons within tab controls by setting or adding specific CSS classes to the icon element, enabling styling overrides, icon replacements, or visual customization of tab action icons through class names applied at setup or runtime for flexible appearance control.
</div>

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


<div class="meta-api-description">
How to customize HTML attributes on tab strip action buttons using kendo UI for jQuery? Configure and customize HTML attributes such as id, class, data attributes, ARIA roles, and other element properties on action buttons within tabbed navigation components. Enable setting or modifying button tags dynamically during setup to control accessibility features, styling hooks, data bindings, and unique identifiers on interactive tab UI elements. Adjust or override default HTML element attributes on navigation action buttons to support custom behaviors, CSS targeting, event handling, or integration with external scripts and frameworks in tab strip interfaces.
</div>

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


<div class="meta-api-description">
How do I add custom click handlers to tab strip buttons in Kendo UI for jQuery? Configure custom click handlers, event callbacks, or action triggers for buttons within tab strips to execute specific functions or code when users click, enabling control over navigation, state updates, API calls, cancellation of default events, and event propagation management through programmable event listeners that receive event parameters for tailored response handling.
</div>

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


<div class="meta-api-description">
How do I disable user interaction with specific tabs in a Kendo UI TabStrip? Set, toggle, or configure the interactivity and selection availability of individual tabs within a tab strip or tab bar component, enabling or disabling user focus, click actions, and keyboard navigation for specific tabs while providing visual feedback for inactive or non-selectable tabs through disabled styling and preventing tab activation or user interaction.
</div>

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


<div class="meta-api-description">
How to add custom attributes to individual tabs in Kendo UI TabStrip? Configure custom HTML attributes such as data-*, ARIA labels, id, class names, or any additional attributes on individual tabs within a tabbed navigation component by setting properties on the data source items. This enables customization and accessibility enhancements by embedding specific attributes directly into tab elements during rendering, supporting use cases like adding unique identifiers, accessibility roles, styling hooks, or metadata tags on tabs in tabbed user interfaces. Adjust, extend, or control tab element attributes dynamically through data binding for finer control over tab appearance, behavior, and semantics in web components.
</div>

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


<div class="meta-api-description">
How do I dynamically change the CSS class of individual tabs in a Kendo UI TabStrip? Assign or configure CSS classes for icons, sprites, or custom visual states on individual tabs by linking a data field that specifies class names, enabling dynamic styling, icon assignment, per-tab appearance control, and customized sprite integration through data binding or property settings to visually differentiate or highlight tabs with specific CSS-based decorations or indicators.
</div>

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


<div class="meta-api-description">
How do I dynamically set the tab label in Kendo UI TabStrip using a data field? Configure or set the field name that defines the visible tab label or title when binding tab controls to data sources or arrays, specifying which data property provides the display text for each tab in a tab strip or navigation component, enabling dynamic labeling of tabs based on data objects, mapping tab names from record fields, controlling which field value shows as the tab header, and determining the text content drawn from data for individual tabs.
</div>

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


<div class="meta-api-description">
How do I configure Kendo UI TabStrip to display dynamic links for each tab? Configure the tab navigation by specifying which data field holds the URL for each tab to enable dynamic link binding, setting or controlling the navigation target per item, associating tabs with specific web addresses, enabling clickable tabs that route to different pages or resources, linking tabs dynamically based on data source fields containing hrefs or URLs, supporting per-tab navigation through configurable URL properties, mapping data-driven links to tabs, automatically generating anchor tags for tabs from data-defined URLs, defining the field name carrying navigation links for seamless routing on tab clicks, and binding URL strings to tab items for interactive page transitions.
</div>

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


<div class="meta-api-description">
How do I enable keyboard navigation in Kendo UI TabStrip? Enable keyboard navigation and focus control for tab interfaces to allow users to move between tabs, activate or switch tabs without using a mouse, support arrow key navigation, tab key focus management, and keyboard accessibility features for better usability and compliance. Configure tab focus handling, navigation behavior, and keyboard interaction modes to ensure smooth, accessible tab switching in interfaces, supporting various input methods and improving navigation for users relying on keyboards or assistive technologies.
</div>

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


<div class="meta-api-description">
How to enable scrolling for tab headers in Kendo UI TabStrip? Control horizontal scrolling behavior for tab headers when the number of tabs exceeds the visible width, allowing users to navigate overflowed tabs with scroll gestures or navigation buttons; configure scrolling options, enable or disable scrollable tab overflow, customize how tabs slide horizontally, set scroll controls for tab strips, manage overflow tabs navigation, implement smooth horizontal tab scrolling, adjust tab strip scroll responsiveness, and handle dynamic tab visibility in limited space scenarios.
</div>

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


<div class="meta-api-description">
How to adjust scroll step size in Kendo UI tabstrip? Adjust the horizontal scroll step size, scroll amount per click, or pixels to move when clicking navigation arrows in a tab bar or tab strip; set or configure the scroll distance to control how far the tabs shift left or right during each scroll action, enabling precise control over scroll increment, speed, and navigation responsiveness in tabbed interfaces.
</div>

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


<div class="meta-api-description">
How to position navigation arrows on scrollable tab strip in Kendo UI? Adjust the placement of navigation arrows or scroll buttons on a scrollable tab interface by configuring whether these controls appear before the tab list at the beginning, after the tabs at the end, or split with one button preceding and one following the tabs, enabling customization of scroll navigation layout, positioning of previous and next buttons, and controlling how users interact with tab overflow in horizontally scrollable tab strips.
</div>

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


<div class="meta-api-description">
How to control when scroll buttons appear in Kendo UI tab strip? Control the display and behavior of navigation buttons for scrolling tabs in a tab strip interface by configuring their visibility to be always shown, hidden entirely, or automatically toggled based on whether the tabs overflow the container and require scrolling, enabling flexible user interface setups where scroll navigation controls appear only when needed, remain permanently visible for consistent navigation, or are completely disabled to simplify the design, supporting use cases such as responsive tab bars, dynamic tab overflow management, and customizable scroll controls.
</div>

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


<div class="meta-api-description">
How do I enable drag-and-drop functionality for Kendo UI TabStrip? Enable or configure drag-and-drop functionality to rearrange tabs dynamically, allowing users to move, reorder, or drag tabs within the tab navigation interface during setup or runtime. This feature supports intuitive tab sorting, interactive tab positioning, customizable tab order control, and user-driven tab management to enhance navigation flow and interface flexibility.
</div>

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


<div class="meta-api-description">
How to set tab alignment in Kendo UI for jQuery? Control the horizontal placement and positioning of tabs within a tab strip interface by setting alignment options such as left-aligned, right-aligned, centered, stretched across the container, or evenly justified. Configure tab alignment to adjust the visual layout and spacing of tab headers for different UI styles, ensuring tabs appear at the start, end, or middle of the tab bar, or distributed to fill the available width. Adjust how tabs line up horizontally for fixed or responsive tab layouts, excluding scrolling tab behaviors where alignment settings do not apply. Customize tab header orientation to match design needs by setting alignment preferences that influence tab distribution and presentation in tab navigation components.
</div>

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


<div class="meta-api-description">
How to position tab panels in Kendo UI TabStrip? Control the placement and orientation of tab panels by configuring horizontal or vertical tab locations such as top, bottom, left, or right edges; adjust tab alignment to create left- or right-aligned vertical stacks or traditional horizontal tab rows at the top or bottom of containers, enabling customizable tab positioning for various UI layouts, with options to set tab side, direction, alignment, or panel arrangements for enhanced user interface flexibility and improved tab navigation experience.
</div>

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

### size `String`*(default: undefined)*

Specifies the size of the widget tabs. When `undefined` (the default), the theme controls the default size. Valid values are `"medium"`, `"small"` and `"large"`.


<div class="meta-api-description">
How to adjust tab size in Kendo UI TabStrip component? Adjust the visual scale, density, or spacing of tabs in a tab strip component by configuring size options like small, medium, or large to control how compact or spacious each tab appears. Enable setting tab dimensions for a denser layout or a more prominent, larger tab style, adjusting the overall tab strip appearance and user interface footprint. Customize tab sizes to optimize usability, fit more tabs within limited space, or enhance readability with bigger clickable areas, applicable when you want to fine-tune tab width, height, or padding. Control the component’s tab sizing behavior to switch between default medium size or alternative small or large variants supporting responsive design and user preference adjustments. Use this to modify tab presentation for adaptive interfaces, condensed menus, or visually expanded tab bars accommodating various design requirements or device screen sizes.
</div>

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


<div class="meta-api-description">
How can I dynamically set the active tab in a Kendo UI TabStrip based on data bound to it? Control or specify the active tab selection based on a dynamic data field value when binding tabs to a data source, enabling automatic synchronization between the displayed tab and underlying data keys or field values. This setting supports scenarios where tabs need to reflect a particular state, index, or identifier by matching the bound data’s textual or key property, facilitating programmatic tab activation, data-driven tab navigation, or selection management in UI components bound to collections or remote data. Adjust or configure which tab displays initially or dynamically by linking the selected tab to the data field representing the tab’s label or value during data binding.
</div>

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


<div class="meta-api-description">
How can I access and manipulate individual tab elements within a Kendo UI TabStrip? Access and control the container element holding tab items within a tab strip interface, enabling querying, selecting, or manipulating tab elements directly in the DOM; this includes adding or removing CSS classes, binding event handlers for user interactions, measuring dimensions for layout or animation purposes, and dynamically updating or animating the group of tabs after they have been rendered, supporting use cases such as customizing tab appearance, implementing interactive behavior, or performing layout adjustments on the HTML container that wraps the tab list or tab group elements.
</div>

#### Example

    <div id="tabstrip">
        <ul>
            <li>First Tab</li>
            <li>Second Tab</li>
        </ul>
        <div>First tab content</div>
        <div>Second tab content</div>
    </div>
    <script>
    var tabstrip = $("#tabstrip").kendoTabStrip().data("kendoTabStrip");
    var tabGroup = tabstrip.tabGroup;
    console.log("TabStrip items:", tabGroup);
    </script>

## Methods

### activateTab

Activates a tab specified as a selector. Note: Invoking this method will not trigger any events.


<div class="meta-api-description">
How can I programmatically change the active tab in a Kendo UI TabStrip without triggering events? Switch or set the currently visible or active tab programmatically by selecting a tab element using a CSS selector to change the user interface or tab state without triggering event handlers or firing selection, activate, or tab change events, enabling silent or background tab activation for UI control, dynamic tab switching, or conditional tab display without invoking event-driven callbacks or listeners.
</div>

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


<div class="meta-api-description">
How can I dynamically add new tabs to a tabstrip in Kendo UI for jQuery? add new tabs dynamically to a tab bar, insert additional tabs at the end of a tab collection during runtime, programmatically extend the list of tabs, push more tab items into a tab panel or navigation strip, update and render new tabs on the interface, enable adding, managing, or modifying tabs live without page reloads, control dynamic tab insertion for user interface components, handle runtime tab creation, expand tab navigation elements by appending tabs through code, manage tab collection growth and interactivity automatically through scripting
</div>

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


<div class="meta-api-description">
How do I access the content element of a specific tab in Kendo UI TabStrip by its index? Retrieve or access the container element that holds the content for a specific tab based on its index, enabling developers to select, modify, measure, or interact with the tab's DOM structure dynamically. This method supports querying the content area by numeric position to manipulate inner HTML, attach event listeners, or calculate layout sizes for custom behavior or styling. It facilitates programmatic control over tab panel elements for reading content, applying changes, or dynamically responding to user interactions and UI updates. Ideal for scenarios requiring precise DOM targeting of tabs’ content sections by index in tabbed interfaces.
</div>

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


<div class="meta-api-description">
How to safely access and manipulate tab content in Kendo UI for jQuery? Accessing or retrieving the container element that holds tab content by index, targeting the actual DOM node that wraps the tab content such as the scroll container on mobile devices; useful for manipulating, accessing, or removing tab content safely by referencing the underlying content holder element instead of just a generic content element, enabling control over tab content containers for tasks like dynamic content updates, DOM manipulation, safe content removal, or scrolling behavior management within tabbed interfaces.
</div>

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


<div class="meta-api-description">
How to programmatically unselect a tab in Kendo UI TabStrip? Control the active or selected state of tabs by programmatically deselecting, disabling, or unsetting the focus on a specific tab using selectors to remove its active highlight without triggering events. Enable dynamic tab state changes such as unselecting, clearing focus, switching active tabs, or modifying tab selection status in user interfaces without user clicks or event firing, useful for updating UI states, resetting tabs, or managing tab focus programmatically. Adjust tab activation, deactivate selected tabs, and manage tab states through code to control which tabs appear active or inactive, disable user navigation highlights, and prevent event side effects during state changes across tabbed navigation components.
</div>

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


<div class="meta-api-description">
How do I properly clean up a Kendo UI TabStrip widget before reinitializing it? Clean up and safely dispose of tab interface components by removing all event listeners, clearing associated data attributes to prevent memory leaks, and triggering destruction routines on nested widgets without deleting the underlying DOM elements. Manage widget teardown, detach handlers, reset internal data storage, and run cleanup methods for child components to prepare tab controls for removal or reinitialization while preserving the page structure. Efficiently disable and sanitize tabbed UI elements, ensuring resources are freed and dependencies are dismantled before DOM manipulation or widget replacement.
</div>

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


<div class="meta-api-description">
How do I programmatically disable individual tabs in Kendo UI for jQuery TabStrip component? Control disabling or enabling individual or multiple tabs to make them inactive, unselectable, or non-interactive within a tabbed interface. Configure tabs so users cannot click, activate, or focus them via keyboard or mouse, effectively preventing user interaction or navigation to certain tabs. Use programmatic methods to deactivate tabs by reference, block selection, restrict access, or disable tab functionality for dynamic UI states, conditional display, or feature gating in tabbed navigation components.
</div>

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


<div class="meta-api-description">
How can I dynamically enable or disable individual tabs in a Kendo UI TabStrip? Configure interactive tab behavior by enabling or disabling individual tabs or groups of tabs dynamically using boolean controls, allowing you to set tabs as selectable or non-selectable, manage tab activation states, restrict user interaction on certain tabs, toggle tab availability during runtime, and update tab functionality programmatically to control navigation flow and UI responsiveness based on user actions or application logic.
</div>

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


<div class="meta-api-description">
How can I dynamically insert a new tab after an existing one in Kendo UI TabStrip? Add or insert a new tab dynamically after a specified existing tab by using methods that let you programmatically position tabs in a tabbed interface during runtime. Control the order and placement of tabs by specifying a reference point such as an element, index, or selector, enabling dynamic tab insertion, runtime tab creation, or updating tab collections and the underlying interface structure. This approach supports use cases like inserting tabs after specific tabs, rearranging tabs on the fly, attaching new tab elements relative to others, and managing tab order through APIs for user interface customization or interactive tab management.
</div>

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


<div class="meta-api-description">
How do I insert a new tab at a specific position in a Kendo UI TabStrip control? Add a new tab programmatically before a specified existing tab to control tab order, insert or place tabs dynamically at runtime, update or rearrange tabs in a tab strip interface, position a created tab prior to another tab, manipulate tab sequence, enable dynamic tab insertion, reorder tabs by inserting before a target tab, modify tab collections on the fly, manage tabs in a navigation component, and perform runtime tab adjustments to customize tab layout and user interface behavior.
</div>

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


<div class="meta-api-description">
How do I access individual tabs in a Kendo UI TabStrip component? Retrieve or access the list of tab elements within a tab strip component for manipulating or interacting with each tab's DOM nodes; developers can iterate over these elements, select specific tabs by index, attach event listeners, modify classes or styles, update ARIA attributes for accessibility, measure sizes, or perform visual changes on tab headers independently from the data model. This enables direct control and customization of tab UI elements, event binding, dynamic attribute updates, and integration with DOM or jQuery operations to customize tab behavior and appearance in web interfaces.
</div>

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
	/* The result can be observed in the DevTools(F12) console of the browser. */
        console.log(tabStrip.items());
    </script>

#### Returns

`HTMLCollection` the tabs as an HTML collection of elements.

### reload

Reloads TabStrip tab(s) via AJAX.


<div class="meta-api-description">
How do I reload the content of a tab in a Kendo UI TabStrip? Refresh or reload remote or dynamically loaded tab content within a tab interface, asynchronously fetching updated HTML for one or multiple tabs using AJAX, enabling developers to refresh specific or all tab panels after server changes or client interactions, update dynamic tab content, re-fetch remote data for tabs, control tab panel content updates programmatically, trigger asynchronous tab content reloads, and ensure user interface reflects the latest remote content without full page refresh.
</div>

#### Example

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


<div class="meta-api-description">
How can I programmatically remove a tab from a Kendo UI TabStrip in jQuery? Dynamically delete or close tabs by specifying the target tab element through a reference such as a DOM node or jQuery object to programmatically remove a tab from the tab container, enabling runtime tab management, detachment, or cleanup of tabs while automatically updating the interface and internal state to reflect the removal; this method supports scenarios like closing tabs on user action, conditionally hiding tabs, or modifying tab collections through code.
</div>

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


<div class="meta-api-description">
How can I programmatically select a specific tab in a Kendo UI TabStrip widget? Access or modify the currently active tab by retrieving or updating the selected index or tab element; control which tab is highlighted or focused programmatically by setting the selection through an index, tab reference, or identifier, or query the current active tab dynamically to determine what is open or displayed. Enable switching tabs via code, read the current tab state at runtime, update the active tab after initialization, and perform tab selection operations through methods that manage tab focus, activation, or highlighting with or without parameters.
</div>

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


<div class="meta-api-description">
How to dynamically update tab items in Kendo UI TabStrip? Update or replace the tab data dynamically by configuring the data source to refresh tab items and user interface instantly, enabling runtime changes to the tabs list, switching to new data arrays, applying new configurations, or binding to existing data sources for immediate UI update and re-rendering of tab components with current data sets.
</div>

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


<div class="meta-api-description">
When does a tab become active in Kendo UI TabStrip after its display animation completes? Detect when a tab becomes active or selected and its display animation completes, enabling you to handle tab activation events, post-transition logic, or updates that require the tab’s content to be fully shown. This event triggers only for tabs linked to content, supporting scenarios like responding after tab show animations finish, managing UI changes on tab visibility, handling tab selection state changes, and executing code once tab transitions end, excluding tabs without content. Recognize when tabs become visible after animation, control updates post-activation, and track tab selection or activation lifecycle events.
</div>

#### Event Data

##### e.item `Element`

The activated tab.

##### e.contentElement `Element`

The content element of the activated tab.

#### Example

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


<div class="meta-api-description">
What triggers when remote tab content is loaded in a Kendo UI TabStrip? Detect when remote tab content has finished loading via AJAX to trigger custom code execution or callbacks, enable post-load initialization of dynamic components, perform data binding within newly fetched HTML, update or manipulate the DOM of the loaded tab content, show or hide loading spinners automatically, respond to asynchronous content retrieval events, handle events fired after content injection in tabbed interfaces, access event details including the loaded content and source tab, and customize behavior immediately after fetching tab panel data dynamically.
</div>

#### Event Data

##### e.item `Element`

The selected item

##### e.contentElement `Element`

The loaded content element that is retrieved via AJAX.

#### Example

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


<div class="meta-api-description">
How to handle errors in Kendo UI tabstrip asynchronous requests? Handle failures or errors during asynchronous requests or AJAX operations within tabbed interfaces by capturing error events triggered when data loading or server calls fail. Detect and respond to unsuccessful network requests, inspect error details, display custom error messages, implement retry logic, log error information, or execute cleanup routines on failed data fetches in tab components. Manage and control how tabs behave on request failure, troubleshoot issues when asynchronous content loading encounters problems, and integrate error handling workflows for dynamic tab content updates or AJAX calls within tab strips.
</div>

#### Event Data

##### e.xhr `jqXHR`

The jqXHR object used to load the content

##### e.status `String`

The returned status.

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


<div class="meta-api-description">
How can I prevent tab switching in Kendo UI for jQuery? Detect or intercept the moment right before a tab switch occurs in a tab interface to execute custom code, handle validation, log analytics, or prepare and load content based on which tab is about to become active. Capture and inspect events triggered before tab selection to control or influence tab changes, prevent or allow navigation, monitor user interactions with tabs, and react dynamically to impending tab transitions in tabbed navigation components.
</div>

#### Event Data

##### e.item `Element`

The selected item chosen by a user.

##### e.contentElement `Element`

The content element of the tab going to be selected.

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


<div class="meta-api-description">
How do I detect when a tab becomes visible in Kendo UI TabStrip? Detect when a tab or panel becomes visible during its entrance animation to trigger custom code, bind event listeners, update or refresh content dynamically as the tab appears, manage keyboard focus or accessibility changes, track visibility state transitions, respond to tab activation just before animations complete, handle UI changes on tab show or display, and control behavior related to tabs becoming active and rendered but not fully animated yet.
</div>

#### Event Data

##### e.item `Element`

The activated tab.

##### e.contentElement `Element`

The content element of the activated tab.

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

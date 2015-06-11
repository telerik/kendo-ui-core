---
title: Changes and Backward Compatibility
page_title: Changes and Backward Compatibility in Kendo UI
description: Find all changes which are effective in Kendo UI 2012 Q2 from previous releases
previous_url: /changes-and-backward-compatibility
---

# Kendo UI Framework Changes and Backwards Compatibility

## Kendo UI 2015 Q1 SP2

### Changes from 2015 Q1 (2015.1.318)

#### Breaking changes

* **AutoComplete/DropDownList/ComboBox/MultiSelect**: Change in rendering of widget's list - widget's ul element is wrapped inside a scrollable container.

-Old rendering:

    <div class="k-list-container k-popup">
        <div class="k-group-header"></div>
        <ul class="k-list">
        </ul>
    </div>

-New rendering:

    <div class="k-list-container k-popup">
        <div class="k-group-header"></div>
        <div style="overflow: auto; position: relative; height: 104px">
            <ul class="k-list">
            </ul>
        </div>
    </div>

## Kendo UI 2015 Q1

### Changes from 2014 Q3 SP2 (2014.3.1411)

#### Breaking changes

* **MultiSelect**: Change in the item selection behavior

-Old: Selected items was hidden

-New: Selected item is still visible. This allows to de-select item from the popup list.

* **DropDownList**: In order to support **grouping** and **virtualization**, we decided to move the optionLabel outside the items list and place it as a static header on top of the popup element.
This change was required, because optionLabel element cannot be part of any displayed group. Please refer to the new rendering if you manipulate option label manually.

-Old rendering:

    <ul>
        <li>Option Label</li>
        <li>First Item</li>
    </ul>

-New rendering:

    <div class="k-list-optionlabel">Option Label</div>
    <ul>
        <li>First Item</li>
    </ul>

* **DropDownList**: In order to match the Html `Select` behavior better and solve some issues related to MVVM `value` binding, the dropdownlist now allows to clear its value (deselect the selected item). This will introduce the following breaking changes:

    * Widget will **not** select the first item, when its selected index is `-1`
    * Widget will **not** select the first item, when selected value is not present in the data source.

    -Old:

        <input id="dropdownlist" />
        <script>
            var widget = $("#dropdownlist").kendoDropDownList({
                dataSource: ["foo1", "foo2"]
            });

            widget.value("bar"); //this will select 'foo1'
        </script>

    -New:

        <input id="dropdownlist" />
        <script>
            var widget = $("#dropdownlist").kendoDropDownList({
                dataSource: ["foo1", "foo2"]
            });

            widget.value("bar"); //this will clear selection

            if (widget.select() == -1) { //if value does not exist, select first one
                widget.select(0);
            }
        </script>

    * Widget will **not** select the first item, when its value is set to "" (empty string). This is applicable for Grid editing when default model value is empty string. This change, however, improves the behavior discussed [here](https://github.com/telerik/kendo-ui-core/issues/312).

    -Old:

        <input id="dropdownlist" />
        <script>
            var widget = $("#dropdownlist").kendoDropDownList({
                dataSource: ["foo1", "foo2"]
            });

            widget.value(""); //this will select 'foo1'
        </script>

    -New:

        <input id="dropdownlist" />
        <script>
            var widget = $("#dropdownlist").kendoDropDownList({
                dataSource: ["foo1", "foo2"]
            });

            widget.value(""); //this will clear selection

            if (widget.select() == -1) { //if value does not exist, select first one
                widget.select(0);
            }
        </script>

* **AutoComplete/DropDownList/ComboBox/MultiSelect**: In order to improve widgets behavior, we decided to trigger `select` event on navigation (on UP/DOWN item selection)

-Old: The `select` event is raised only on ENTER or item selection with mouse/touch.

-New: The `select` event will be on every UP/DOWN item selection, on ENTER and item selection with mouse/touch. Note that the event is **preventable**.

* **Editor**: In order to solve a double-encoding bug in Firefox and Chrome, the editor value may be retrieved from the `defaultValue` property of the editor. This will introduce a breaking change when all of these are true:

    * The editor value is rendered from the server
    * The `encoded` configuration option is set to true (this is by default)
    * The textarea value is pre-processed prior to initializing the widget

     To resolve the problem, use the `value` configuration option when initializing:

-Old:

    <textarea id="editor">
        foo
    </textarea>

    <script>
        $("#editor").value("bar").kendoEditor({
            encoded: true
        });
    </script>

-New:

    <textarea id="editor">
        foo
    </textarea>

    <script>
        $("#editor").kendoEditor({
            encoded: true,
            value: "bar"
        });
    </script>

* **Grid**

Change in the order of extension of the filterable options in the column menu. Prior to *Q1 2015* version the following configuration does not allow the user to input a second filter criterion.

    <div id="grid"></div>

    <script>
        $("#grid").kendoGrid({
          filterable: {
            extra: false
          },
          columnMenu: true,
          columns: [
            {
              field: "foo",
              filterable: {
                extra: true
              }
            }
          ],
          dataSource: [{ foo: "some text" }]
        });
    </script>

* **Diagram**: The argument of the add and remove events now contains the Shape or Connection element and not the model because the events are triggered no matter if the diagram is bound or not. To get the model when the diagram is bound, you can use the Shape/Connection `dataItem` field.

    -Old:

        $("#diagram").kendoDiagram({
          add: function(e) {
            var model = e.shape;
          },
          remove: function(e) {
            var model = e.shape;
          }
        });

    -New:

        $("#diagram").kendoDiagram({
          add: function(e) {
            var model = e.shape.dataItem;
          },
          remove: function(e) {
            var model = e.shape.dataItem;
          }
        });

## Kendo UI 2014 Q3 SP1

### Changes from 2014 Q3 (2014.3.1119)

#### Breaking changes

* **Kendo UI Mobile Material skins**: The Material themes are renamed to **material-light** and **material-dark** in order to sync with the other mobile themes.

## Kendo UI 2014 Q3

### Changes from 2014 Q2 SP2 (2014.2.1008)

#### Breaking changes

**DataSource**

The DataSource wraps the data items as `kendo.data.ObservableObject` on demand when paging is enabled (`pageSize` is set). In previous versions all data items were wrapped initially.
This change will affect people using the private `_data` field of the data source as they will now get items that are not instances of `kendo.data.ObservableObject`. In such cases the `data()` method should be used instead.

**Mobile ListView**

* All text customization configuration options are nested in a `messages` object

-Old:

    $("#listview").kendoMobileListView({
        dataSource: dataSource,
        template: kendo.template($("#tmp").html()),
        loadMore: true,
        pullToRefresh: true,
        loadMoreText: "Press to load more",
        pullTemplate: "Pull to refresh",
        releaseTemplate: "Release to refresh",
        refreshTemplate: "Refreshing"
    });

-New:

    $("#listview").kendoMobileListView({
        dataSource: dataSource,
        template: kendo.template($("#tmp").html()),
        loadMore: true,
        pullToRefresh: true,
        messages: {
            loadMoreText: "Press to load more",
            pullTemplate: "Pull to refresh",
            releaseTemplate: "Release to refresh",
            refreshTemplate: "Refreshing"
        }
    });

**Mobile Scroller**

* All text customization configuration options are nested in a `messages` object

-Old:

    $("#scroller").kendoMobileScroller({
        pullToRefresh: true,
        pullTemplate: "Pull to refresh",
        releaseTemplate: "Release to refresh",
        refreshTemplate: "Refreshing"
    });

-New:

    $("#scroller").kendoMobileScroller({
        pullToRefresh: true,
        messages: {
            pullTemplate: "Pull to refresh",
            releaseTemplate: "Release to refresh",
            refreshTemplate: "Refreshing"
        }
    });

**Editor**

* Due to security precautions, scripts are no longer posted to the server by default. If you need to allow scripts to be posted to the server, set the [serialization.scripts configuration option]() to `true`. Note that for true protection from cross-site scripting, you still need server-side sanitization, as noted in the [preventing cross-site scripting](/web/editor/preventing-xss) help topic.

-Old:

    $("#editor").kendoEditor();

-New (if you need scripts to be posted to the server):

    $("#editor").kendoEditor({
        serialization: {
            scripts: true
        }
    });

**PivotDataSource**

* The measure aggregator of the [client pivot cube](../api/javascript/data/pivotdatasource#configuration-schema.cube) uses **object** instead of number for the `state` argument. The field that should be set to accumulate the value is called `accumulator`.

-Old:

    aggregate: function(value, state) { return value + state; }

-New (if you need scripts to be posted to the server):

    aggregate: function(value, state) {
        state.accumulator = state.accumulator || 0;
        return state.accumulator + value;
    }

#### Breaking changes

## Kendo UI 2014 Q2

### Changes from 2014 Q1 SP2 (2014.1.528)

#### Breaking changes

**TabStrip**:

* Q2 2014 introduces an additional TabStrip wrapper div which makes sure that the TabStrip changes in height won't affect the page scrolling position.
* TabStrip's **activate** event has been renamed to [**show**](../api/web/tabstrip#events-show) event -
    which fires at the beginning of the open animation. A new [**activate**](../api/web/tabstrip#events-activate) event has been introduced, which is fired at the end of the
    open animation. This is done for consistency with the rest of the widgets.
* TabStrip automatically calls [**kendo.resize**](../api/framework/kendo#methods-resize) to its contents in both [**show**](../api/web/tabstrip#events-show) and
    [**activate**](../api/web/tabstrip#events-activate) events.

**TreeView**: The deprecated `checkboxTemplate` configuration option has been removed.
If you don't need a highly specific checkbox template, consider using the default one (using checkboxes: true).
If you need any custom checkbox rendering, use the checkboxes.template option:

-Old:

    $("#tree").kendoTreeView({
        checkboxTemplate: "..."
    });

-New:

    $("#tree").kendoTreeView({
        checkboxes: {
            template: "..."
        }
    });

**Editor**: The deprecated **formatBlock** and **style** tools have been removed. See the 2013 Q2 release notes below on how to migrate to the **formatting** tool.

**Editor for ASP.NET MVC**: The ImageBrowser controller now works with `FileBrowserEntry` and `FileBrowserEntryType` types, instead of `ImageBrowserEntry` and `ImageBrowserEntryType`.
This change is related to the introduction of the new FileBrowser tool.

## Kendo UI 2014 Q1 SP2 (2014.1.528)

### Changes from 2014 Q1 SP1 (2014.1.416)

#### Breaking changes

* **Grid**: Clicking on an input, link or button no longer triggers the selection.
* **ListView**: Clicking on an input, link or button no longer triggers the selection.

## Kendo UI 2014 Q1

### Changes from 2013 Q3 SP2 (2013.3.1324)

#### Breaking changes

* **Flat Theme**: Button background is now gray. The previous outcome can be achieved using **.k-primary** class.
* **Kendo UI Web mobile skins**: The new skins for the mobile widgets in Kendo UI Web are **not compatible** with the Kendo UI Mobile platform themes and shouldn't be used together. However,
you can style your app with them if you don't include any of the Kendo UI Mobile styling (even the common CSS) - **kendo.[skin-name].mobile.min.css** includes everything needed.

### Changes from 2013 Q3 SP1 (2013.3.1316)

#### Breaking changes

**DatePicker**: The DatePicker widget now uses a single calendar instance. The calendar will be created on first popup opening.

If you need to get a reference to the calendar you will need to get in the [open](kendo-ui/api/web/datepicker#events-open) event handler:

-Old:

    var datepicker = $("#datepicker").kendoDatePicker();
    var calendar = datepicker.dateView.calendar;

-New:

    $("#datepicker").kendoDatePicker({
        open: function() {
            var calendar = this.dateView.calendar;
        }
    });

**DateTimePicker**: The DateTimePicker widget now uses a single calendar instance. The calendar will be created on first date popup opening.

If you need to get a reference to the calendar you will need to get in the [open](kendo-ui/api/web/datetimepicker#events-open) event handler:

-Old:

    var datetimepicker = $("#datetimepicker").kendoDateTimePicker();
    var calendar = datetimepicker.dateView.calendar;

-New:

    $("#datetimepicker").kendoDateTimePicker({
        open: function() {
            var calendar = this.dateView.calendar;
        }
    });

### Changes from 2013 Q3 (2013.3.1119)

#### Breaking changes

* **Supporting libs**: Kendo UI LESS fork is now updated to LESS 1.6.0. Kendo UI CSS files are built with it (no breaking changes in the LESS files themselves, except that they rely on
the new default import once functionality of @import directive).

## Kendo UI 2013 Q3

### Changes from 2013 Q2 SP1 (2013.2.918)

#### Breaking changes

* **Core**: kendo.support.pointers now only shows support for IE11 pointer events - kendo.support.msPointers was added to indicate that IE10 pointer events are supported too.
* **Splitter**: the internal method `trigger("resize")`, which has been provided as a workaround in certain scenarios, no longer works.
It has been replaced with a [public API method `resize()`](/using-kendo-in-responsive-web-pages), which now all Kendo UI widgets have.
Also see [`kendo.resize()`](/api/framework/kendo/#methods-resize).
* **Splitter**: the `layoutChange` event is now obsolete and will be removed in the future. Please use the `resize` event instead.
* **Kendo UI Scheduler for ASP.NET MVC**: "ISchedulerEvent" interface now includes two additional fields - "StartTimezone" and "EndTimezone" which stores the timezone information of the event.
* **Scheduler**: Changes in `recurrenceEditor` messages:
 -  `daily.days` becomes `daily.interval`
 -  `weekly.weeks` becomes `weekly.interval`
 -  `monthly.months` becomes `monthly.interval`
 -  `yearly.years` becomes `yearly.interval`
 -  `end.endLabel` becomes `end.label`
 -  `end.endNever` becomes `end.never`
 -  `end.endCountAfter` becomes `end.after`
 -  `end.endCountOccurrence` becomes `end.occurrence`
 -  `end.endUntilOn` becomes `end.on`

* **MVC DataSource**: The MVC DataSource transport now serializes numbers based on the used Kendo culture. As a result, if you are using an invariant culture number model binder, the numbers will not be parsed correctly. You should either use the the same culture to parse the numbers in the model binder or remove the model binder in order for numbers with a decimal separator to be parsed correctly.
* **ModalView**: The ModalView now supports autosizing when its content changes and when no height is set. Unfortunately we were able to implement this at the expense of
the possibility to set the ModalView size in a CSS stylesheet. As a workaround please use the ModalView width and height options or set them through inline CSS instead.

## Kendo UI 2013 Q2

### Changes from 2013 Q1 SP1 (2013.1.514)

#### Breaking changes

* **themes**: The icons in the sprite image have been rearranged to include more icons in two different sizes.
* **Editor**: The default tool set now includes the newly introduced table editing. Toolbar tools are now grouped, so their dimensions have been increased by 2px. On the other hand,
the "Font name" and "Font size" tools no longer appear by default. The idea is to encourage developers (and users respectively) to use the formatting dropdown, which provides a predefined (and customizable) set of options.
This will ultimately lead to better structured, formatted and consistent rich text documents, compared to the case when the user has the ability to apply arbitrary font styles.

If you need the old tool set, use the configuration below.

        $("#editor").kendoEditor({
            tools: [
                "bold", "italic", "underline", "strikethrough",
                "fontName", "fontSize", "foreColor", "backColor",
                "justifyLeft", "justifyCenter", "justifyRight", "justifyFull",
                "insertUnorderedList", "insertOrderedList",
                "indent", "outdent",
                "formatBlock",
                "createLink", "unlink", "insertImage"
            ]
        });

* **Editor**: Initializing the editor from a `div` element triggers the [inline editing mode](http://demos.telerik.com/kendo-ui/web/editor/inline-editing.html). If you need to revert to the old behavior, initialize it from a `<textarea>` element.

* **Mobile ListView**:

Enabling endless scrolling or press to load more configuration options now puts the listview in a virtual mode, which has different behavior than Q1 2013 and previous releases.

1. `endlessScrollParameters` and `loadMoreParameters` configuration options are not available anymore. Endless scrolling uses on the dataSource paging configuration to issue subsequent requests.

1. `scrollTreshold` option is not available anymore. The listvew automatically prefetches the next page when 2/3 of the current page is reached.

1. `stopEndlessScrolling` and `stopLoadMore` methods are no longer available. The listview automatically hides the button and loading indicator when the items loaded reach the number returned by the `schema.total` method of the bound DataSource.

1. `lastPageReached` event is no longer triggered, due to the same reasons.

#### Deprecated functionality

* **Editor**: The **formatBlock** and **style** tools have been deprecated in favor of the unified **formatting** tool. The new tool supports the functionality of both old tools, as well as new styling options. If you need to keep the styles and block formats in different drop-downs, you can use two formatting tools in paralel. The old tool declarations work, yielding a console.warn about the deprecation, and will be removed with a future official release.
    - Old

            $("#editor").kendoEditor({
                tools: [
                    { name: "style", items: [
                        // applies class "foo"
                        { text: "foo", value: "foo" }
                    ] },

                    { name: "formatBlock", items: [
                        // changes wrapping block to paragraph
                        { text: "paragraph", value: "p" }
                    ] }
                ]
            });
    - New

            $("#editor").kendoEditor({
                tools: [
                    { name: "formatting", items: [
                        // applies class "foo"
                        { text: "foo", value: ".foo" },

                        // changes wrapping block to paragraph
                        { text: "paragraph", value: "p" },

                        // changes wrapping block to paragraph with class "fine-print"
                        { text: "fine print", value: "p.fine-print" }
                    ] }
                ]
            });


## Kendo UI 2013 Q1

### Changes from 2012 Q3 SP1 (2012.3.1315)

#### Breaking changes

* jQuery is updated to 1.9.1.
* **Mobile:** Rename scrollTreshold option of the ListView to **scrollThreshold**.
* **AutoComplete/ComboBox/DropDownList:** Rename enable option to **enabled**.
* **TreeView/HierarchicalDataSource/Node:** The `children` field is initialized depending on the `hasChildren` field, as previously documented. Use the `append` and `load` methods to initialize it, and if accessing the children field directly, verify if it is present.

#### ASP.NET MVC

Some ASP.NET MVC applications may be broken if using other libraries incompatible with jQuery 1.9.1. Further details available in the [troubleshooting guide](/aspnet-mvc/troubleshooting#javascript-error-that-live-method-is-unavailable,-undefined-or-unsupported)

## Kendo UI 2012 Q3 SP1

### Changes from 2012 Q3 (2011.3.1114)

#### Breaking changes

* **Cascading ComboBoxes/DropDownLists:** The parameterMap of the child widget's dataSource is called before the change event of the parent widget.
Use [cascade](/api/web/combobox#cascade) event instead of change event.

* Telerik UI for ASP.NET MVC: Remove Slide effect. Use SlideIn instead.

## Kendo UI 2012 Q3

### Changes from 2012 Q2 SP1 (2011.2.913)

#### Breaking changes

* **Mobile:** the kendoMobileSwipe plugin is obsolete - replace its usage with the **touch** widget.

* **Mobile:** WebKit mask icons are now deprecated and font icons are used instead. If you have custom icons, they might break after the upgrade.
Add the following CSS rule to fix them /if you have data-icon="custom" on them, or use .km-icon to remove all non-custom icons/:

        .km-root .km-pane .km-view .km-custom {
            background-size: 100% 100%;
            -webkit-background-clip: border-box;
            background-color: currentcolor;
        }

        .km-root .km-pane .km-view .km-custom:after,
        .km-root .km-pane .km-view .km-custom:before
        {
            visibility: hidden;
        }

Additionally it should be noted that the mask icons used **background-color** for colorization, while the font ones use **color**
and custom colorization (but not on custom icons) **should be updated** after the upgrade. For example a rule like this:

        .km-ios .km-tabstrip .km-icon {
            background-color: rgb(20, 30, 40);
        }

should be changed to this:

        .km-ios .km-tabstrip .km-icon {
            color: rgb(20, 30, 40);
        }

* **DataViz:** Widgets now require theme-specific stylesheets. For example:

        <link href="styles/kendo.dataviz.min.css" rel="stylesheet" />

if using the Default skin, should be updated to:

        <link href="styles/kendo.dataviz.min.css" rel="stylesheet" />
        <link href="styles/kendo.dataviz.default.min.css" rel="stylesheet" />

* **DataViz:** missingValues defaults to "zero" for area, stacked area and stacked line series. The previous default was "gap" which can lead to incorrect results.

## Kendo UI 2012 Q2

### Changes from 2012 Q1 SP1 (2012.1.322)

#### Breaking changes

*  **All Widgets:** All arrows have been renamed to better reflect their direction and size. For instance:

    - Old

            .k-arrow-up
            .k-arrow-next
            .k-arrow-down
            .k-arrow-prev
            .k-arrow-first
            .k-arrow-last

    - New

            .k-i-arrow-n
            .k-i-arrow-e
            .k-i-arrow-s
            .k-i-arrow-w
            .k-i-seek-w
            .k-i-seek-e
    for more information check the [Styling Icons demo](http://demos.telerik.com/kendo-ui/web/styling/icons.html).

*  **Popup:** Popup based widgets nested in other Popup based widgets create their Popup container inside the Popup parent. This means that a DropDownList created inside an already
    initialized Menu will create its list inside the Menu item's parent Popup.
*  **TreeView:** The TreeView widget now depends on kendo.data.js
*  **TreeView:** Using the API methods will re-create the HTML of the nodes. In order to get the new reference to the nodes, use the return value of the methods.

    - Old

            var foo = treeviewObject.findByText("foo");
            treeviewObject.append(foo);
            // starting with 2012 Q2, foo will point to a DOM node that is removed from the document
            foo.text("bar: foo");

    - New

            var foo = treeviewObject.findByText("foo");
            foo = treeviewObject.append(foo);
            foo.text("bar: foo");

* **DataViz:** Refresh() no longer invokes Read() of the DataSource.

    - Old

            var chart = $("#chart").data("kendoChart");
            chart.refresh();

    - New

            var chart = $("#chart").data("kendoChart");
            chart.dataSource.read();

## Kendo UI 2012 Q1 (2012.1.322)

### Changes from 2011 Q3 SP1 (2011.3.1407)

#### Breaking changes

> The combined JavaScript file kendo.all.js is available only in the Kendo Complete package. The corresponding file in Kendo Web is called kendo.web.js. Use it instead of kendo.all.js.

*  **Data:** kendo.model.js file has been removed. The content of kendo.model.js file has been consolidated with the kendo.data.js content.
*  **Data:** `Model.id` is no longer a function. It is a field.
    - Old

            var model = dataSource.get(42);
            var modelId = model.id(); //42
    - New

            var model = dataSource.get(42);
            var modelId = model.id; //42

*  **Data:** The `DataSource` contains ObservableObject instances instead of raw JavaScript objects.

*  **Grid:** The Grid widget is now using the `uid` field of the Model instead of the `id`. A new uid field is introduced to the DataSource's Model,
    which represents its unique id. The Grid row data attribute has been changed to use this field.
    Note that in order to retrieve Model instance by its uid, DataSource's `getByUid` method should be used.
    - Old

            <tr data-id="42"><!--...--></tr>
    - New

            <tr data-uid=”aaaaa-bbbbb-ddddd-gggg”><!--...--></tr>

*  **DataViz:** The kendo.chart(.min).js file is replaced by kendo.dataviz(.min).js
*  **DataViz:** The axis orientation property deprecated in favor of dedicated verticalLine and verticalArea chart types
*  **DataViz:** The suite now requires kendo.dataviz.css to be included
*  **DataViz:** The Chart widget is now in the kendo.dataviz.ui namespace. Previously it was part of kendo.ui
*  **Other:** `dataValueField` and `dataTextField` of DropDownList, ComboBox and AutoComplete, are set to empty string by default. In order to get your old code working, you will need to list the fields manually, like this:
    - Old

            $("#combobox").kendoComboBox([
                {text: "Item 1", value: "item1"},
                {text: "Item 2", value: "item2"}
            ]);
    - New

            $("#combobox").kendoComboBox({
                dataTextField: "text",
                dataValueField: "value",
                dataSource: [
                    {text: "Item 1", value: "item1"},
                    {text: "Item 2", value: "item2"}
                ]
            });

---
title: 2015 Releases
page_title: 2015 Releases | Kendo UI Backwards Compatibility
description: "Learn about the breaking changes and backwards compatibility released by Kendo UI in 2015."
previous_url: /backwards-compatibility/2015/2015-backward-compatibility
slug: breakingchanges2015_kendoui
position: 3
---

# 2015 Releases

## Kendo UI 2015 Q3

### Changes from 2015 Q2 SP2 (2015.2.902)

Widgets **will not initialize** if any of the defined attribute options are `undefined`. For example, if the NumericTextBox `k-max` attribute points to a `$scope.maxNumber` field which is `undefined`, it will not initialize.

## Kendo UI 2015 Q2

### Changes from 2015 Q1 SP2 (2015.1.429)

All DataViz-related CSS code, that is, referring to Gauges, Charts, Barcodes, Diagrams, and Maps, has been moved into the web widgets CSS files. Please remove any references to `kendo.dataviz.css` and `kendo.dataviz.[theme].css`. For more information, refer to [the article on styles and appearance for the Kendo UI widgets rendering data visualization](/dataviz/appearance-styling#themes-and-stylesheets).

## Kendo UI 2015 Q1 SP2

### Changes from 2015 Q1 (2015.1.318)

#### Breaking Changes

**AutoComplete/DropDownList/ComboBox/MultiSelect**

Change in rendering the widget list. The `ul` element of the widget is wrapped inside a scrollable container.

```tab-Old
    <div class="k-list-container k-popup">
        <div class="k-group-header"></div>
        <ul class="k-list">
        </ul>
    </div>
    ```
    ```tab-New
    <div class="k-list-container k-popup">
        <div class="k-group-header"></div>
        <div style="overflow: auto; position: relative; height: 104px">
            <ul class="k-list">
            </ul>
        </div>
    </div>
```

## Kendo UI 2015 Q1

### Changes from 2014 Q3 SP2 (2014.3.1411)

#### Breaking Changes

**AutoComplete/DropDownList/ComboBox/MultiSelect**

The widget will not try to re-select using its value when the source is changed.

```tab-Old
  <input id="dropdownlist" />
  <script>
      var widget = $("#dropdownlist").kendoDropDownList({
          value: "foo2"
          datasource: [ ]
      });

      widget.setDataSource(["foo1", "foo2"]);

      //the "foo2" will be selected
  </script>
```
```tab-New
  <input id="dropdownlist" />
  <script>
      var widget = $("#dropdownlist").kendoDropDownList({
          value: "foo2"
          dataSource: [ ]
      });

      widget.setDataSource(["foo1", "foo2"]); //the "foo2" will NOT be selected

      widget.value("foo2"); //should be called in order to for re-selection of the old value
  </script>
```

**MultiSelect**

Change in the item selection behavior.

```tab-Old
Selected items was hidden.
```
```tab-New
Selected item is still visible. This allows to de-select item from the popup list.
```

**DropDownList**

* To support **grouping** and **virtualization**, we decided to move the `optionLabel` outside the items list and place it as a static header on top of the popup element. This change was required, because the `optionLabel` element cannot be part of any displayed group. If you manipulate the `optionLabel` manually, refer to the new rendering.

    ```tab-Old
        <ul>
            <li>Option Label</li>
            <li>First Item</li>
        </ul>
      ```
      ```tab-New
        <div class="k-list-optionlabel">Option Label</div>
        <ul>
            <li>First Item</li>
        </ul>
      ```

* To match the Html `Select` behavior better and solve some issues related to MVVM `value` binding, the DropDownList now allows to clear its value (deselect the selected item). This will introduce the following breaking changes:

    1. The widget will not select the first item when its selected index is `-1`.
    2. The widget will not select the first item when the selected value is not present in the data source.

    ```tab-Old
    	<input id="dropdownlist" />
    		<script>
    			var widget = $("#dropdownlist").kendoDropDownList({
    				dataSource: ["foo1", "foo2"]
    			});

    			widget.value("bar"); //this will select 'foo1'
    		</script>
    ```
    ```tab-New
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
    ```

* The widget will not select the first item, when its value is set to `""` (empty string). This is applicable to the editing of the Grid when the default model value is an empty string. However, this change improves the behavior discussed [here](https://github.com/telerik/kendo-ui-core/issues/312).

    ```tab-Old
    	<input id="dropdownlist" />
    		<script>
    			var widget = $("#dropdownlist").kendoDropDownList({
    				dataSource: ["foo1", "foo2"]
    			});

    			widget.value(""); //this will select 'foo1'
    		</script>
    ```
    ```tab-New
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
    ```

**AutoComplete/DropDownList/ComboBox/MultiSelect**

To improve the behavior of the widgets, we decided to trigger the `select` event on navigation (on UP/DOWN item selection).

  ```tab-Old
    The `select` event is raised only on ENTER or item selection with mouse/touch.
  ```
  ```tab-New
    The `select` event will be on every UP/DOWN item selection, on ENTER and item selection with mouse/touch. Note that the event is preventable.
  ```

**Editor**

To solve a double-encoding bug in Firefox and Chrome, the Editor value can be retrieved from its `defaultValue` property. This will introduce a breaking change when all of these are true:

* The Editor value is rendered from the server.
* The `encoded` configuration option is set to `true` (this is by default).
* The `textarea` value is pre-processed prior to initializing the widget. To resolve the issue, use the `value` configuration option when initializing:

    ```tab-Old
        <textarea id="editor">
            foo
        </textarea>

        <script>
            $("#editor").value("bar").kendoEditor({
                encoded: true
            });
        </script>
    ```
    ```tab-New
        <textarea id="editor">
            foo
        </textarea>

        <script>
            $("#editor").kendoEditor({
                encoded: true,
                value: "bar"
            });
        </script>
    ```

**Grid**

A change in the extension order of the filterable options in the column menu. Prior to the Q1 2015 version, the following configuration did not allow the user to input a second filter criterion.

```
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
```

**Diagram**

The argument of the `add` and `remove` events now contains the `Shape` or `Connection` element, and not the model, because the events are triggered no matter whether the Diagram is bound or not. To get the model when the Diagram is bound, use the Shape/Connection `dataItem` field.

```tab-Old
        $("#diagram").kendoDiagram({
          add: function(e) {
            var model = e.shape;
          },
          remove: function(e) {
            var model = e.shape;
          }
        });
```
```tab-New
        $("#diagram").kendoDiagram({
          add: function(e) {
            var model = e.shape.dataItem;
          },
          remove: function(e) {
            var model = e.shape.dataItem;
          }
        });
```

## See Also

Other articles on Kendo UI breaking changes and backwards compatibility:

* [2017 Breaking Changes]({% slug breakingchanges2017_kendoui %})
* [2016 Breaking Changes]({% slug breakingchanges2016_kendoui %})
* [2014 Breaking Changes]({% slug breakingchanges2014_kendoui %})
* [2013 Breaking Changes]({% slug breakingchanges2013_kendoui %})
* [2012 Breaking Changes]({% slug breakingchanges2012_kendoui %})

---
title: Kendo UI 2016 Breaking Changes
page_title: Kendo UI 2016 Breaking Changes | Kendo UI Backwards Compatibility
description: "Learn about the breaking changes and backwards compatibility released by Kendo UI in 2016."
previous_url: /changes-and-backward-compatibility, /install/changes-and-backward-compatibility, /backward-compatibility
slug: breakingchanges2016_kendoui
---

# Kendo UI 2016 Breaking Changes

## Kendo UI 2016 R3

### Changes from 2016 R2 SP1

#### Breaking Changes

* **MultiSelect**: The widget with a 'single' tag mode will deselect all selected items on BACKSPACE/DELETE keyboard press. The previous behavior cannot be reverted.
* **Validator**: The email validation rule has been changed to match the [HTML5 specification suggests for browsers to use](https://html.spec.whatwg.org/multipage/forms.html#valid-e-mail-address). If the previous behavior is required, the email validation rule should be overriden by [specifing a custom rule](/controls/editors/validator/overview#custom-rules-for-validation) with the `email` key.

## Kendo UI 2016 R2

### Changes from 2016 Q1 SP1 (2016.1.226)

#### Breaking Changes

* **Scheduler**: The widget will keep the selection state on blur. The change was introduced to behave similarly to Kendo UI Grid. If you would like to bring the old behavior use [select](http://docs.telerik.com/kendo-ui/api/javascript/ui/scheduler#methods-select) method to clear the selection on blur.

## Kendo UI 2016 Q1

### Changes from 2015 Q3 SP1 (2015.3.1111)

#### Breaking Changes

* **Grunt was replaced with Gulp as the preferred build tool for Kendo UI. From now on the Gruntfile.js file is replaced with Gulpfile.js as part of the Kendo UI distribution.**

* **DropDownList/ComboBox/MultiSelect**: The widget will clear the applied filter if the user decides to set new value using the [`value`](/api/javascript/ui/dropdownlist#methods-value) method.

* **DropDownList/ComboBox**: Cascading widget will trigger `change` event when its value is changed due to parent update. The benefit of this change is proper behavior in MVVM-like frameworks  (related [issue](https://github.com/telerik/kendo-ui-core/issues/661)).

* **DropDownList**: The widget will not select the first item automatically, when data source is changed with `setDataSource` method. If you would like to mimic the old behavior, then you will need to manually select the first item:

        var dropdownlist = $({widget id}).data("kendoDropDownList");
        dropdownlist.setDataSource(["Item1", "Item2"]);
        dropdownlist.select(0); //force selection of the first item

* **Remove support for Globalize 0.1**: More details in [issue 1354](https://github.com/telerik/kendo-ui-core/issues/1354).
For those who want to return the behavior, add the code from this [Gist](https://gist.github.com/ggkrustev/52bf4558ecd1794e5d94#file-kendo-ui-support-for-globalize-0-1) after Kendo UI scripts.

* **Chart**: CategoryAxis `max` and plotbands `to` values for not justified axis no longer refer to the category end but to the category start. For example limiting the shown categories to the first and the second of January:

Old configuration:

    <div id="chart"></div>
    <script>
      $("#chart").kendoChart({
        categoryAxis: {
          categories: [new Date(2016, 0, 1), new Date(2016, 0, 3)],
          justified: false,
          max: new Date(2016, 0, 2)
        }
      });
    </script>

New configuration:

    <div id="chart"></div>
    <script>
      $("#chart").kendoChart({
        categoryAxis: {
          categories: [new Date(2016, 0, 1), new Date(2016, 0, 3)],
          justified: false,
          max: new Date(2016, 0, 3)
        }
      });
    </script>

### Changes from 2015 Q3 (2015.2.930)

#### Breaking Changes

The  **Grid**, **Gantt**, **TreeList**, **Scheduler**, **Toolbar**, and **Spreadsheet** widgets will use the native `click` event for taps on desktop environments. Previously, the `mouseup` event was utilized. For details and means to revert that behavior, check [this issue](https://github.com/telerik/kendo-ui-core/issues/1176).

## See Also

Other articles on Kendo UI breaking changes and backwards compatibility:

* [Kendo UI 2015 Breaking Changes]({% slug breakingchanges2015_kendoui %})
* [Kendo UI 2014 Breaking Changes]({% slug breakingchanges2014_kendoui %})
* [Kendo UI 2013 Breaking Changes]({% slug breakingchanges2013_kendoui %})
* [Kendo UI 2012 Breaking Changes]({% slug breakingchanges2012_kendoui %})

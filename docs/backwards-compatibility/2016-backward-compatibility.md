---
title: 2016 Releases
page_title: 2016 Releases | Kendo UI Backwards Compatibility
description: "Learn about the breaking changes and backwards compatibility released by Kendo UI in 2016."
previous_url: /changes-and-backward-compatibility, /install/changes-and-backward-compatibility, /backwards-compatibility/2016/2016-backward-compatibility
slug: breakingchanges2016_kendoui
position: 2
---

# 2016 Releases

## Kendo UI 2016 R3

### Changes from 2016 R2 SP1

#### Breaking Changes

**Icons**

Icon rendering across all widgets now have unified rendering, using the `k-i-` prefix. Code depending on icon classes might need to change.

**DropDownList**

* The widget will clear the applied filter when `ESC` key is pressed.

* The widget will not select the focused item on `focusout` when the list is filtered.

**DropDownList/ComboBox/MultiSelect**

The widget will not update the OPTION [`selected`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/option#attr-selected) attribute to keep the behavior of the  [`defaultSelected`](https://developer.mozilla.org/en/docs/Web/API/HTMLOptionElement#Properties) property. For more information, refer to this [Github issue](https://github.com/telerik/kendo-ui-core/issues/1660).

**MultiSelect**

The widget with a `single` tag mode will deselect all selected items on `Backspace` or `Delete` keyboard press. The previous behavior is impossible to revert.

**DropDownList/ComboBox**

The widget will not bind on `open` if `autoBind` is set to `false` and `minLength` is set to a value higher than `1`.

**Validator**

The email validation rule has been changed to match the [HTML5 specification suggests for browsers to use](https://html.spec.whatwg.org/multipage/forms.html#valid-e-mail-address). If the previous behavior is required, the email validation rule should be overridden by [specifying a custom rule](/controls/editors/validator/overview#custom-rules-for-validation) with the `email` key.

**Chart**

100% stacked series will be clipped by default. See [the related issue](https://github.com/telerik/kendo-ui-core/issues/1699) for a discussion. To revert to the previous behavior, disable clipping on the pane:

```
    $("#chart").kendoChart({
      ...
      panes: [{
        clip: false
      }]
    });
```

### Changes from 2016 R2

#### Breaking Changes

**Scheduler**

The widget will use the `,` separator for the `recurrenceException` values to conform the [RFC5545](http://tools.ietf.org/html/rfc5545#page-120) specs. More details can be found in this [forum thread](http://www.telerik.com/forums/breaking-change-recurrence-exceptions-delimiter-change).

## Kendo UI 2016 R2

### Changes from 2016 Q1 SP1 (2016.1.226)

#### Breaking Changes

**Scheduler**

The widget will keep the selection state on `blur`. The change was introduced to behave similarly to the Kendo UI Grid. To bring the old behavior back, use the [`select`](http://docs.telerik.com/kendo-ui/api/javascript/ui/scheduler#methods-select) method to clear the selection on `blur`.

## Kendo UI 2016 Q1

### Changes from 2015 Q3 SP1 (2015.3.1111)

#### Breaking Changes

**Grunt was replaced with Gulp as the preferred build tool for Kendo UI. From now on, the `Gruntfile.js` file is replaced with `Gulpfile.js` as part of the Kendo UI distribution.**

**DropDownList/ComboBox/MultiSelect**

The widget will clear the applied filter if the user decides to set a new value using the [`value`](/api/javascript/ui/dropdownlist#methods-value) method.

**DropDownList/ComboBox**

The cascading widget will trigger the `change` event when its value is changed due to parent update. The benefit of this change is the proper behavior achieved in MVVM-like frameworks (related [issue](https://github.com/telerik/kendo-ui-core/issues/661)).

**DropDownList**

The widget will not select the first item automatically when the data source is changed with the `setDataSource` method. To mimic the old behavior, manually select the first item:

      var dropdownlist = $({widget id}).data("kendoDropDownList");
      dropdownlist.setDataSource(["Item1", "Item2"]);
      dropdownlist.select(0); //force selection of the first item

**Remove support for Globalize 0.1**

For more information, refer to [issue 1354](https://github.com/telerik/kendo-ui-core/issues/1354). To revert to the previous behavior, add the code from this [Gist](https://gist.github.com/ggkrustev/52bf4558ecd1794e5d94#file-kendo-ui-support-for-globalize-0-1) after the Kendo UI scripts.

**Chart**

The CategoryAxis `max` and the plotbands `to` values for non-justified axis no longer refer to the category end but to the category start. For example, limiting the displayed categories to January 1 and January 2:

```tab-Old
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
```
```tab-New
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
```

### Changes from 2015 Q3 (2015.2.930)

#### Breaking Changes

The  **Grid**, **Gantt**, **TreeList**, **Scheduler**, **Toolbar**, and **Spreadsheet** widgets will use the native `click` event for taps on desktop environments. Previously, the `mouseup` event was utilized. For more details and means to revert that behavior, refer to [this issue](https://github.com/telerik/kendo-ui-core/issues/1176).

## See Also

Other articles on Kendo UI breaking changes and backwards compatibility:

* [2017 Breaking Changes]({% slug breakingchanges2017_kendoui %})
* [2015 Breaking Changes]({% slug breakingchanges2015_kendoui %})
* [2014 Breaking Changes]({% slug breakingchanges2014_kendoui %})
* [2013 Breaking Changes]({% slug breakingchanges2013_kendoui %})
* [2012 Breaking Changes]({% slug breakingchanges2012_kendoui %})

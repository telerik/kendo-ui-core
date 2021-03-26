---
title: 2019 Releases
page_title: 2019 Releases | Kendo UI Backwards Compatibility
description: "Learn about the breaking changes and backwards compatibility released by Kendo UI in 2019."
slug: breakingchanges2019_kendoui
position: 3
---

# 2019 Releases

This article lists the breaking changes in the Kendo UI 2019 releases.

## Kendo UI 2019 R3 SP1

**Draggable**

As of the Kendo UI 2019 R3 SP1 release, setting [the holdToDrag option](https://docs.telerik.com/kendo-ui/api/javascript/ui/draggable/configuration/holdtodrag) to `false` does not cancel the [hold event](https://docs.telerik.com/kendo-ui/api/javascript/ui/draggable/events/hold).

## Kendo UI 2019 R2 SP1

**ToolBar**

As of the Kendo UI 2019 R2 SP1 release, the recommended approach for moving tools to the right side of the [ToolBar]({% slug overview_kendoui_toolbar_widget %}) is by using the newly added `Spacer` command type. If you prefer to float some of the tools instead of using the spacer, apply `display: block;` to the wrapping element of the ToolBar.

```
<style>
  .k-toolbar {
    display: block;
  }

  .k-toolbar #button3 {
    float: right;
  }
</style>

<div id="toolbar"></div>

<script>
  $("#toolbar").kendoToolBar({
    items: [
      { type: "button", text: "Button 1" },
      { type: "button", text: "Button 2" },
      { type: "button", text: "Button 3", id: "button3"  }
    ]
  });
</script>
```

## Kendo UI 2019 R2

**Pager**, **Grid**, **TreeList**, **ListView**

* Pager layout changed from Float to Flex for the [LESS-based themes]({% slug themesandappearnce_kendoui_desktopwidgets %}).

* The `k-pager-numbers` `ul` of the Pager is now wrapped in a `div` with the `k-pager-numbers-wrap` class.

**Scheduler**

The mobile pane in which [the Adaptive Scheduler]({% slug adaptiverendering_kendoui_scheduler_widget %}) is placed does not automatically expand its height. Therefore, it is required to define an explicit pixel Scheduler height by setting [the height option](https://docs.telerik.com/kendo-ui/api/javascript/ui/scheduler/configuration/height). This change is part of the improved adaptive rendering of the widget.

## Kendo UI 2019 R1

**AutoComplete**, **ColorPicker**, **ComboBox**, **DatePicker**, **DateTimePicker**, **DropDownList**, **TimePicker**, **MultiColumnComboBox**

The redundant `k-header` class is now removed from the wrapper element that renders these widgets because, even if it was not used by the Kendo UI implementation, it caused styling issues.

**Spreadsheet**

The [Spreadsheet widget]({% slug overview_spreadsheet_widget %}) introduces an automatic conversion of the font size (when defined) during the import or export of files to Excel. The conversion is required because the font size in the Spreadsheet is set in pixels (`px`) while the font size in an MS Excel file is defined in points (`pt`). Upon importing or exporting `xlsx` files, the Spreadsheet now recalculates the set value for the font size in such a way so that the text will appear with an equal height both in Excel and in the Spreadsheet. In previous Kendo UI versions, such conversion does not exist. The numeric value for the font size used to be the same in both `xlsx` and Spreadsheet files which resulted in visually larger font in Excel than the font in the Spreadsheet.

**Switch**

As of the Kendo UI 2019 R1 release, the [MobileSwitch widget]({% slug overview_hybridswitch %}), which is part of the [Hybrid UI components in Kendo UI]({% slug overview_hybridkendoui %}), is no longer used with the [SASS-based themes]({% slug sassbasedthemes_kendoui %}). Instead, use the new [Kendo UI Switch widget]({% slug overview_kendoui_switch_widget %}) with SASS-based themes.

## See Also

* [2020 Breaking Changes]({% slug breakingchanges2020_kendoui %})
* [2018 Breaking Changes]({% slug breakingchanges2018_kendoui %})
* [2017 Breaking Changes]({% slug breakingchanges2017_kendoui %})
* [2016 Breaking Changes]({% slug breakingchanges2016_kendoui %})
* [2015 Breaking Changes]({% slug breakingchanges2015_kendoui %})
* [2014 Breaking Changes]({% slug breakingchanges2014_kendoui %})
* [2013 Breaking Changes]({% slug breakingchanges2013_kendoui %})
* [2012 Breaking Changes]({% slug breakingchanges2012_kendoui %})

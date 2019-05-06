---
title: 2019 Releases
page_title: 2019 Releases | Kendo UI Backwards Compatibility
description: "Learn about the breaking changes and backwards compatibility released by Kendo UI in 2019."
slug: breakingchanges2019_kendoui
position: 1
---

# 2019 Releases

This article lists the breaking changes in the Kendo UI 2019 releases.

## Kendo UI 2019 R2

**Pager**, **Grid**, **TreeList**, **ListView**

* Pager layout changed from Float to Flex for the [LESS-based themes]({% slug themesandappearnce_kendoui_desktopwidgets %}).

* The `k-pager-numbers` `ul` of the Pager is now wrapped in a `div` with the `k-pager-numbers-wrap` class.

## Kendo UI 2019 R1

**AutoComplete**, **ColorPicker**, **ComboBox**, **DatePicker**, **DateTimePicker**, **DropDownList**, **TimePicker**, **MultiColumnComboBox**

The redundant `k-header` class is now removed from the wrapper element that renders these widgets because, even if it was not used by the Kendo UI implementation, it caused styling issues.

**Spreadsheet**

The [Spreadsheet widget]({% slug overview_spreadsheet_widget %}) introduces an automatic conversion of the font size (when defined) during the import or export of files to Excel. The conversion is required because the font size in the Spreadsheet is set in pixels (`px`) while the font size in an MS Excel file is defined in points (`pt`). Upon importing or exporting `xlsx` files, the Spreadsheet now recalculates the set value for the font size in such a way so that the text will appear with an equal height both in Excel and in the Spreadsheet. In previous Kendo UI versions, such conversion does not exist. The numeric value for the font size used to be the same in both `xlsx` and Spreadsheet files which resulted in visually larger font in Excel than the font in the Spreadsheet.

**Switch**

As of the Kendo UI 2019 R1 release, the [MobileSwitch widget]({% slug overview_hybridswitch %}), which is part of the [Hybrid UI components in Kendo UI]({% slug overview_hybridkendoui %}), is no longer used with the [SASS-based themes]({% slug sassbasedthemes_kendoui %}). Instead, use the new [Kendo UI Switch widget]({% slug overview_kendoui_switch_widget %}) with SASS-based themes.

## See Also

* [2018 Breaking Changes]({% slug breakingchanges2018_kendoui %})
* [2017 Breaking Changes]({% slug breakingchanges2017_kendoui %})
* [2016 Breaking Changes]({% slug breakingchanges2016_kendoui %})
* [2015 Breaking Changes]({% slug breakingchanges2015_kendoui %})
* [2014 Breaking Changes]({% slug breakingchanges2014_kendoui %})
* [2013 Breaking Changes]({% slug breakingchanges2013_kendoui %})
* [2012 Breaking Changes]({% slug breakingchanges2012_kendoui %})

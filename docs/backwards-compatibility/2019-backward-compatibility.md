---
title: 2019 Releases
page_title: 2019 Releases | Kendo UI Backwards Compatibility
description: "Learn about the breaking changes and backwards compatibility released by Kendo UI in 2019."
slug: breakingchanges2019_kendoui
position: 1
---

# 2019 Releases

## Kendo UI 2019 R1

### Changes from 2018 R3 SP1

#### Breaking Changes

**AutoComplete**, **ColorPicker**, **ComboBox**, **DatePicker**, **DateTimePicker**, **DropDownList**, **TimePicker**, **MultiColumnComboBox**

* The redundant `k-header` class has been removed from the wrapper element rendering of the above widgets. It has been causing styling issues, even if it was not used by the Kendo implementation.

**Spreadsheet**

* The [Spreadsheet widget]({% slug overview_spreadsheet_widget %}) introduces automatic conversion of font size (where it has been defined) upon Excel files import / export. That is required because the font size in the Spreadsheet is in pixels (`px`), while the font size in MS Excel is in points (`pt`). Upon export / import xlsx file, the Spreadsheet now recalculates the value set for the font size, in such manner, so the text will appear with equal hight both in Excel and in the Spreadsheet. In previous versions of Kendo, there was no such conversion. The numeric value for the font size was the same in both xlsx and Spreadsheet. That resulted in visually larger font in Excel, than it is in the Spreadsheet.

**Switch**

* As of Kendo UI 2019 R1 the [MobileSwitch widget]({% slug overview_hybridswitch %}), which is part of the [Hybrid UI components in Kendo UI]({% slug overview_hybridkendoui %}) should no longer be used with the [Sass-based themes]({% slug sassbasedthemes_kendoui %}). The new [KendoSwitch widget]({% slug overview_kendoui_switch_widget %}) should be used instead.

## See Also

* [2018 Breaking Changes]({% slug breakingchanges2018_kendoui %})
* [2017 Breaking Changes]({% slug breakingchanges2017_kendoui %})
* [2016 Breaking Changes]({% slug breakingchanges2016_kendoui %})
* [2015 Breaking Changes]({% slug breakingchanges2015_kendoui %})
* [2014 Breaking Changes]({% slug breakingchanges2014_kendoui %})
* [2013 Breaking Changes]({% slug breakingchanges2013_kendoui %})
* [2012 Breaking Changes]({% slug breakingchanges2012_kendoui %})

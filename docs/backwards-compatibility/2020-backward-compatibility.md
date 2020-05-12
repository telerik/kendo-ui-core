---
title: 2020 Releases
page_title: 2020 Releases | Kendo UI Backwards Compatibility
description: "Learn about the breaking changes and backwards compatibility released by Kendo UI in 2020."
slug: breakingchanges2020_kendoui
position: 1
---

# 2020 Releases

This article lists the breaking changes in the Kendo UI 2020 releases.

## Kendo UI 2020 R2

**Pager**, **Grid**, **TreeList**, **ListView**

* The responsive Pager no longer has the `k-pager-lg` breakpoint and class.
* The page numbers drop-down of the responsive Pager is now an HTML `select` element. 

**Validator**

 As of Kendo UI 2020 R2 we have reworked the Kendo Validator with improved styling for messages, which differ significantly from the existing. While not recommended, reverting to the previous behaviour is possible by tweaking the errorTemplate and some styles:

 ```
 $(container).kendoValidator({
    ...
    errorTemplate: '' +
        '<span class="k-tooltip k-tooltip-error k-validator-tooltip">' +
            '<span class="k-tooltip-icon k-icon k-i-warning"></span>' +
            '<span class="k-tooltip-content">#= message #</span>' +
        '</span>',
    ...
})
 ```

 ```
    /* Styles for validation messages */
    span.k-widget.k-tooltip-validation {
        margin: 0; /* removes margin */
        width: 160px; /* set width */
        display; inline-flex; /* changes the appearance from block to inline */
        text-align: left; /* aligns the text */
    }
 ```

## Kendo UI 2020 R1 SP1

**Grid**, **Spreadsheet**, **Filter**

As of the Kendo UI 2020 R1 SP1 release, styled native checkboxes are used in the widgets. The label element with `k-checkbox-label` CSS class is removed as it is not necessary for styling.


## See Also

* [2019 Breaking Changes]({% slug breakingchanges2019_kendoui %})
* [2018 Breaking Changes]({% slug breakingchanges2018_kendoui %})
* [2017 Breaking Changes]({% slug breakingchanges2017_kendoui %})
* [2016 Breaking Changes]({% slug breakingchanges2016_kendoui %})
* [2015 Breaking Changes]({% slug breakingchanges2015_kendoui %})
* [2014 Breaking Changes]({% slug breakingchanges2014_kendoui %})
* [2013 Breaking Changes]({% slug breakingchanges2013_kendoui %})
* [2012 Breaking Changes]({% slug breakingchanges2012_kendoui %})

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

**Disabled buttons in Editor toolbar**

Starting with 2020 R2, disabled buttons in editor toolbar will no longer be hidden, but instead be visible. The change is a preparation for the replacing of the custom editor toolbar with the actual Kendo UI for jQuery toolbar and is part of a bigger story to reuse components and enforce consistency, instead of creating ad-hoc ones that differ ever so slightly.

**Visual changes in Scheduler toolbar**

A part of the same story is changing the Scheduler toolbar to be visually identical to the stand-alone toolbar. Again, this is a preparation for future changes in the Scheduler toolbar.

**Visual changes in Scheduler events**

Working in the direction of improving visual accessibility, we have removed a white overlay from Scheduler events when using Default v2 theme (kendo-theme-default). While visually appealing, the white overlay reduced contrast between the event background and event text and in terms reduce visual accessibility.

**Validator**

As of Kendo UI 2020 R2 we have reworked the Kendo Validator with improved styling for messages, which differ significantly from the existing. While not recommended, reverting to the previous behavior is possible by tweaking the errorTemplate and some styles:

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

 **Badge**

 As of Kendo UI 2020 R2 the `template` property does not receive `value` as parameter. The `text` option can be used instead.

 ```
<button>Button <span id="badge"></span></button>
<script>
    $('#badge').kendoBadge({
        text: 1234,
        template: function() {
            var text = this.options.text;
            return text > 99 ? 'A lot' : text;
        }
    });
</script>
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

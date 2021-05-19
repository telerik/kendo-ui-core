---
title: 2020 Releases
page_title: 2020 Releases | Kendo UI Backwards Compatibility
description: "Learn about the breaking changes and backwards compatibility released by Kendo UI in 2020."
slug: breakingchanges2020_kendoui
position: 2
---

# 2020 Releases

This article lists the breaking changes in the Kendo UI 2020 releases.

## Kendo UI 2020 R3 SP1

**Upload**

Changed appearance in `Less-based themes` of the Upload action buttons that are rendered when the [async.autoUpload option](https://docs.telerik.com/kendo-ui/api/javascript/ui/upload/configuration/async.autoupload) is set to `false`.

Reverting to the previous appearance is possible by utilizing the following styles:

```
<style>
.k-upload .k-action-buttons {
    padding: 0;
    align-items: stretch;
    border-bottom-right-radius: 0;
    border-bottom-left-radius: 0;
    border-width: 1px 0 0;
    border-top-width: 1px;
    border-style: solid;
    display: flex;
    flex-direction: row;
    flex-shrink: 0;
    flex-basis: auto;
    overflow: hidden;
    border-color: transparent;
}

.k-upload .k-action-buttons .k-button {
    background-clip: border-box;
    border-radius: 0;
    margin: 0;
    padding: 12px 16px;
    border-width: 0;
    text-overflow: ellipsis;
    flex: 1 0 0%;
    flex-grow: 1;
    flex-grow: 1;
    display: inline-block;
    overflow: hidden;
    width: auto;
    max-width: 100%;
}
</style>

<input type="file" name="files" id="photos" />

<script>
    $("#photos").kendoUpload({
        async: {
            saveUrl: "http://my-app.localhost/save",
            removeUrl: "http://my-app.localhost/remove",
            autoUpload: false
        }
    });
</script>
```

## Kendo UI 2020 R3

**Badge**

Deprecated configuration options and methods:

<table>
    <thead>
        <tr>
            <th>Old configuration/method</th><th>New configuration/method</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td><code>appearance</code></td><td><code>shape</code></td>
        </tr>
        <tr>
            <td><code>badgeStyle</code></td><td><code>fill</code></td>
        </tr>
        <tr>
            <td><code>color</code></td><td><code>themeColor</code></td>
        </tr>
        <tr>
            <td><code>look</code></td><td><code>fill</code></td>
        </tr>
      <tr>
            <td><code>overlay</code></td><td>use <code>position: "edge"</code> and <code>align:"top end"</code></td>
        </tr>
        <tr>
            <td><code>placement</code></td><td><code>position</code></td>
        </tr>
        <tr>
            <td><code>position</code></td><td><code>align</code></td>
        </tr>
        <tr>
            <td><code>value</code></td><td><code>text</code></td>
        </tr>
        <tr>
            <td><code>value()</code></td><td><code>text()</code></td>
        </tr>
    </tbody>
</table>

**Scheduler**

As of the Kendo UI 2020 R3 release, the Scheduler RecurrenceEditor will be rendered as a ButtonGroup and not a DropDownList. Apart from that, in the Weekly recurrence view the days selection is also displayed as a ButtonGroup instead of checkboxes.

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
    span.k-widget.k-validator-tooltip {
        margin: 0; /* removes margin */
        width: 160px; /* set width */
        display; inline-flex; /* changes the appearance from block to inline */
        text-align: left; /* aligns the text */
    }
 ```
**Window**

As of Kendo UI 2020 R2, the k-header class has been removed from the Window rendering.

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

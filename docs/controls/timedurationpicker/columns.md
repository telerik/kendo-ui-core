---
title: Columns
page_title: jQuery TimeDurationPicker Documentation - TimeDurationPicker Columns
description: "Learn how to configure the columns of the TimeDurationPicker component."
slug: columns_timedurationpicker
position: 3
---

# TimeDurationPicker Columns

The Kendo UI for jQuery TimeDurationPicker [`columns`](/api/javascript/ui/timedurationpicker/configuration/columns) configuration is mandatory and must always be configured.

The `columns` configuration enables you to specify which time portion columns will be visible in the TimeDurationPicker popup. Additionally, the configuration also enables you to specify [format](#format), [min](#min), [max](#max) and [step](#step) values for each column individually.

## Name

The `name` configuration contains the name of the time unit the specific column will hold, and supports the following values:

- `days`
- `hours`
- `minutes`
- `seconds`
- `milliseconds`

```javascript
    $("#timedurationpicker").kendoTimeDurationPicker({
        columns: [
            { name: "hours" } // Display the hours column in the popup.
        ]
    });
```

## Format

The `format` configuration enables you to specify the format which will be used in the input of the component. Each column can have its own format.

```javascript
    $("#timedurationpicker").kendoTimeDurationPicker({
        columns: [
            { name: "hours", format: "## hours" }
        ]
    });
```

## Min

The `min` configuration enables you to specify the minimum allowed value that can be selected for the specific column.

The following example showcases how to allow the user to select hour values starting from **6** and upwards.

```javascript
    $("#timedurationpicker").kendoTimeDurationPicker({
        columns: [
            { name: "hours", min: 6 }
        ]
    });
```

## Max

The `max` configuration enables you to specify the maximum allowed value that can be selected for the specific column.

The following example showcases how to allow the user to select hour values between **6** and **12**.

```javascript
    $("#timedurationpicker").kendoTimeDurationPicker({
        columns: [
            { name: "hours", min: 6, max: 12 }
        ]
    });
```

## Step

The `step` configuration enables you to specify the step value of the column. For example, if the hour step value is set to `2`, the popup will display the available hours in the following manner&mdash;**2**, **4**, **6**, **8**, **10**, **12**.

```javascript
    $("#timedurationpicker").kendoTimeDurationPicker({
        columns: [
            { name: "hours", step: 2 }
        ]
    });
```

## See Also

* [Columns in the TimeDurationPicker (Demo)](https://demos.telerik.com/kendo-ui/timedurationpicker/columns)
* [JavaScript API Reference of the TimeDurationPicker](/api/javascript/ui/timedurationpicker)
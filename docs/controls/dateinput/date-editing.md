---
title: Date Editing
page_title: jQuery DateInput Documentation - Customize Date Editing
description: "Learn how to customize the editing behavior of the Kendo UI for jQuery DateInput component."
slug: dateediting_kendoui_dateinput
position: 5
---

# Segment Steps

The DateInput allows you to configure different [`steps`](/api/javascript/ui/dateinput/configuration/steps) for incrementing and decrementing the segments. 
The example below demonstrates how you can set different steps for year, month, day, hour, minute and second.

```dojo
    <input id="dateinput" />
    <script>
    $("#dateinput").kendoDateInput({
        format: "dd/MM/yyyy HH:mm:ss",
        steps: {
					year: 5,
					month: 2,
					day: 5,
					hour: 2,
					minute: 5,
					second: 10
				}
    });
    </script>
```

# Auto Correct
By default, the automatic correction of the segments is enabled. Thus, when the entered value is not valid or is out of range it will be auto-corrected. You can disable auto-correction by setting the [`autoCorrectParts`](/api/javascript/ui/dateinput/configuration/autocorrectparts) option to `false`.

In the example below, if you enter 1 (January) for the month value, and 31 for the day value and then change the month value to 2 (February), the day value in the first DateInput component will be automatically corrected to 29 as February does not have 31 days. If you follow the same steps in the second DateInput, where the `autoCorrectParts` option is disabled, the day value will remain 31.

```
    <label for="dateinput">AutoCorrect enabled</label>
    <input id="dateinput" />
    <label for="dateinput-second">AutoCorrect disabled</label>
    <input id="dateinput-second" />
    <script>
      $("#dateinput").kendoDateInput();
      $("#dateinput-second").kendoDateInput({
        autoCorrectParts: false
      });
    </script>
```

# Auto Switch

The DateInput component allows you to automatically move to the next segment once a valid value is entered in the currently edited part. By default, this functionality is disabled. You can enable it by setting the [`autoSwitchParts`](/api/javascript/ui/dateinput/configuration/autoswitchparts) option to `true`.

```
    <input id="dateinput" />
    <script>
      $("#dateinput").kendoDateInput({
          autoSwitchParts: true
      });
    </script>
```

# Auto Switch Keys

You can configure the keys that can be used to move to the next segment. The example below demonstrates how different keys can be added in the [`autoSwitchKeys`](/api/javascript/ui/dateinput/configuration/autoswitchkeys) array:

```
    <input id="dateinput" />
    <script>
      $("#dateinput").kendoDateInput({
          autoSwitchKeys: ["-", ";", "+"],
      });
    </script>
```

# Enable Mouse Wheel
By default when a segment is selected its value can be increased or decreased using the mouse scroll. This behavior can be disabled by setting the [`enableMouseWheel`](/api/javascript/ui/dateinput/configuration/enablemousewheel) option to `false`.

```
    <input id="dateinput" />
    <script>
      $("#dateinput").kendoDateInput({
          enableMouseWheel: false
      });
    </script>
```


## See Also

* [Basic Usage of the DateInput (Demo)](https://demos.telerik.com/kendo-ui/dateinput/index)
* [Using the API of the DateInput (Demo)](https://demos.telerik.com/kendo-ui/dateinput/api)
* [JavaScript API Reference of the DateInput](/api/javascript/ui/dateinput)

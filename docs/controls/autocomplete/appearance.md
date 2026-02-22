---
title: Appearance
page_title: jQuery AutoComplete Documentation - Appearance
description: "Get started with the jQuery AutoComplete by Kendo UI and set its list and popup widths, access the list elements, and remove its input values."
components: ["autocomplete"]
slug: sizedimensions_kendoui_autocomplete
position: 7
---

# Appearance

In this article, you will find information about the styling options and rendering of the Kendo UI AutoComplete.

For a live example, visit the [Appearance Demo of the AutoComplete](https://demos.telerik.com/kendo-ui/autocomplete/appearance).

## Options

The Kendo UI AutoComplete supports the following styling options:

- [`size`](#size)—Configures the overall size of the component.
- [`rounded`](#rounded)—Configures the border radius for the tags.
- [`fillMode`](#fillMode)—Controls how the color is applied.

### Size

The `size` option controls how big or small the AutoComplete component looks. The structure of the class is `k-input-{size}`.

The following values are available for the [`size`](/api/javascript/ui/autocomplete/configuration/size) option:

- `sm`—small size
- `md`—medium size
- `lg`—large size
- `none`—unset

The default size value is `medium` and it is applied to the `span` wrapping element through the `k-input-md` class.

The example below shows a basic configuration and how to set `size` to "large":

```dojo
<input id="autocomplete" />
<script>
    $("#autocomplete").kendoAutoComplete({
      size: "large"
    });
</script>
```

Below is the HTML that is affected from the configuration. The changes are applied to the `span.k-autocomplete` wrapping element:

```html
<span class="k-autocomplete k-input k-input-lg">
    ...
</span>
```

### Rounded

The `rounded` option controls how much border radius is applied to the tags for the selected items in the widget. The structure of the class is `k-rounded-{size}`.

The following values are available for the [`rounded`](/api/javascript/ui/autocomplete/configuration/rounded) option:

- `sm`—small border radius
- `md`—medium border radius
- `lg`—large border radius
- `full`—ellipse-like border radius
- `none`—unset

The default value is `medium` and it is applied to the `span.k-autocomplete` wrapping element through the `k-rounded-md` class.

The example below shows a basic AutoComplete configuration and how to set `rounded` to "full":

```dojo
<input id="autocomplete" />
<script>
    $("#autocomplete").kendoAutoComplete({
      rounded: "full"
    });
</script>
```
The changes are applied to the `span.k-autocomplete` wrapping element:

```html
<span class="k-autocomplete k-input k-rounded-full">
    ...    
</span>
```

### FillMode

The `fillMode` option controls how the color is applied. The structure of the class is `k-input-{fillMode}`.

The following values are available for the [`fillMode`](/api/javascript/ui/autocomplete/configuration/fillMode) option:

- `solid`
- `flat`
- `outline`
- `none`

The default value is `solid` and it is applied to the `span.k-autocomplete` wrapping element through the `k-input-solid` class.

The example below shows a basic AutoComplete configuration and how to set `fillMode` to "outline":

```dojo
<input id="autocomplete" />
<script>
    $("#autocomplete").kendoAutoComplete({
      fillMode: "outline"
    });
</script>
```
The changes are applied to the `span.k-autocomplete` wrapping element:

```html
<span class="k-autocomplete k-input k-input-outline">
    ...    
</span>
```

@[template](/_contentTemplates/components-rendering-section.md#components-rendering-section)

## Setting the List Width

To customize the width of the AutoComplete list and change its dimensions, use the jQuery `width()` method.

    <input id="autoComplete" />

    <script>
        $("#autoComplete").kendoAutoComplete();
        var autoComplete = $("#autocomplete").data("kendoAutoComplete");
        // Set the width of the drop-down list.
        autoComplete.list.width(400);
    </script>

## Setting the Popup Width

You can enable the `popup` element to automatically adjust its width according to the length of the item label it displays. When the `autoWidth` option is set to `true`, the popup will display the content on a single line and will not wrap it up.

    <input id="autocomplete" style="width: 100px;" />
    <script>
    $("#autocomplete").kendoAutoComplete({
      autoWidth: true,
      dataSource: {
        data: ["Short item", "An item with really, really long text"]
      }
    });
    </script>

## Accessing list Elements

The AutoComplete list renders an `ID` attribute which is generated from the ID of the widget and the `-list` suffix. You can use the `ID` to style the element or to access a specific element inside the popup element.

> If the AutoComplete has no ID, the `list` element will have no `ID` either.

    <input id="autocomplete">
    <script>
      $(document).ready(function() {
        $("#autocomplete").kendoAutoComplete({
            dataSource: ["Item1", "Item2"]
        });

        // The DIV popup element that holds the header and footer templates, and the suggestion options.
        var popupElement = $("#autocomplete-list");

        console.log(popupElement);
      });
    </script>

## Removing Input Values

The AutoComplete enables you to remove the values from its input area by using the `clearButton` configuration option. As a result, an **X** button appears in the input area on hover and when clicked, it resets the value of the widget and triggers the `change` event. By default, `clearButton` is enabled and is set to `true`.

## See Also

* [Basic Usage of the AutoComplete (Demo)](https://demos.telerik.com/kendo-ui/autocomplete/index)
* [Using the API of the AutoComplete (Demo)](https://demos.telerik.com/kendo-ui/autocomplete/api)
* [Appearance Demo of the AutoComplete](https://demos.telerik.com/kendo-ui/autocomplete/appearance)
* [JavaScript API Reference of the AutoComplete](/api/javascript/ui/autocomplete)

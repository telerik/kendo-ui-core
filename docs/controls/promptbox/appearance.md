---
title: Appearance
page_title: jQuery PromptBox Documentation - Appearance
description: "Specify the appearance of the Kendo UI for jQuery PromptBox buttons."
slug: appearance_kendoui_promptbox
position: 4
components: ["promptbox"]
---

# PromptBox Appearance

The PromptBox provides predefined appearance options such as different sizes, border radiuses, fill modes and theme colors for its built-in button controls.

## Size

The PromptBox allows you to configure the size of its buttons. To achieve this utilize the `size` option for each button configuration.

The supported values are:
* `small`
* `medium` (default)
* `large`
* `none`

```javascript
    $("#promptbox").kendoPromptBox({
        actionButton: {
            size: "large"
        }
    });
```

## Roundness

The PromptBox enables you to apply different `border radius` to its buttons through the `rounded` option.

The supported values are:
* `small`
* `medium` (default)
* `large`
* `full`
* `none`

```javascript
    $("#promptbox").kendoPromptBox({
        actionButton: {
            rounded: "full"
        }
    });
```

## Fill Mode

The PromptBox allows you to set different fill modes for its buttons by using the `fillMode` option.

The supported values are:
* `solid` (default)
* `flat`
* `outline`
* `link`
* `clear`
* `none`

```javascript
    $("#promptbox").kendoPromptBox({
        actionButton: {
            fillMode: "flat"
        }
    });
```

## Theme Colors

The PromptBox allows you to set different theme colors for its buttons by using the `themeColor` option.

The supported values include:
* `base` (default)
* `primary`
* `secondary`
* `tertiary`
* `info`
* `success`
* `warning`
* `error`
* `dark`
* `light`
* `inverse`
* `none`

```javascript
    $("#promptbox").kendoPromptBox({
        actionButton: {
            themeColor: "primary"
        }
    });
```

## See Also

* [JavaScript API Reference of the PromptBox](/api/javascript/ui/promptbox)
* [PromptBox Adornments]({% slug adornments_kendoui_promptbox %})
* [PromptBox Modes]({% slug modes_kendoui_promptbox %})

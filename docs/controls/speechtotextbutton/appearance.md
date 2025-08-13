---
title: Appearance
page_title: jQuery SpeechToTextButton Documentation - Appearance
description: "Learn how to customize the appearance of the jQuery SpeechToTextButton component."
slug: appearance_kendoui_speechtotextbutton_widget
position: 3
---

# Appearance

In this article, you will find information about the styling options of the Kendo UI SpeechToTextButton.

For a live example, see the [Appearance Demo of the SpeechToTextButton](https://demos.telerik.com/kendo-ui/speechtotextbutton/appearance).

## Options

The SpeechToTextButton supports the following styling options:

- [`size`](#size)—Configures the overall size of the component.
- [`themeColor`](#themecolor)—Configures what color will be applied to the component.
- [`fillMode`](#fillmode)—Configures how the color is applied to the component.
- [`rounded`](#rounded)—Configures the border radius of the component.
- [`icon`](#icon)—Configures the icon displayed when the button is in inactive state.
- [`stopIcon`](#stopicon)—Configures the icon displayed when the button is speech recognition state.

### Size

The `size` option controls how big or small the rendered button looks. The structure of the class is `k-button-{size}`.

The following values are available for the `size` option:

- `sm`—small size
- `md`—medium size (default)
- `lg`—large size
- `none`


```dojo
    <button id="speechButtonSmall">Small</button>
    <button id="speechButtonMedium">Medium</button>
    <button id="speechButtonLarge">Large</button>
    <button id="speechButtonNone">None</button>

    <script>
        $(document).ready(function() {
            $("#speechButtonSmall").kendoSpeechToTextButton({
                size: "sm"
            });
            
            $("#speechButtonMedium").kendoSpeechToTextButton({
                size: "md"
            });
            
            $("#speechButtonLarge").kendoSpeechToTextButton({
                size: "lg"
            });

            $("#speechButtonNone").kendoSpeechToTextButton({
                size: "none"
            });
        });
    </script>
```

### ThemeColor

The `themeColor` option controls the color applied to the button. The structure of the class is `k-button-{themeColor}`.

The following values are available for the `themeColor` option:

- `base`—default color based on the current theme
- `primary`—primary accent color
- `secondary`—secondary accent color
- `tertiary`—tertiary accent color
- `info`—informational color
- `success`—positive action color
- `warning`—attention-drawing color
- `error`—negative action color
- `dark`—dark color
- `light`—light color
- `inverse`—contrasting color

```dojo
    <button id="speechButton1">Default</button>
    <button id="speechButton2">Primary</button>
    <button id="speechButton3">Success</button>

    <script>
        $(document).ready(function() {
            $("#speechButton1").kendoSpeechToTextButton({
                themeColor: "base"
            });
            
            $("#speechButton2").kendoSpeechToTextButton({
                themeColor: "primary"
            });
            
            $("#speechButton3").kendoSpeechToTextButton({
                themeColor: "success"
            });
        });
    </script>
```

### FillMode

The `fillMode` option controls how the color is applied to the button. The structure of the class is `k-button-{fillMode}`.

The following values are available for the `fillMode` option:

- `solid`—solid background color (default)
- `outline`—outlined border with transparent background
- `flat`—no border or background color
- `link`—styled as a hyperlink with no border or background
- `none`

```dojo
    <button id="solidButton">Solid</button>
    <button id="outlineButton">Outline</button>
    <button id="flatButton">Flat</button>
    <button id="clearButton">Clear</button>
    <button id="linkButton">Link</button>

    <script>
        $(document).ready(function() {
            $("#solidButton").kendoSpeechToTextButton({
                fillMode: "solid"
            });
            
            $("#outlineButton").kendoSpeechToTextButton({
                fillMode: "outline"
            });
            
            $("#flatButton").kendoSpeechToTextButton({
                fillMode: "flat"
            });

            $("#clearButton").kendoSpeechToTextButton({
                fillMode: "clear"
            });
            
            $("#linkButton").kendoSpeechToTextButton({
                fillMode: "link"
            });
        });
    </script>
```

### Rounded

The `rounded` option controls the border radius of the button. The structure of the class is `k-rounded-{rounded}`.

The following values are available for the `rounded` option:

- `sm`—small border radius
- `md`—medium border radius (default)
- `lg`—large border radius
- `full`—fully rounded corners (pill shape)
- `none`

```dojo
    <button id="smallRounded">Small Rounded</button>
    <button id="mediumRounded">Medium Rounded</button>
    <button id="largeRounded">Large Rounded</button>
    <button id="fullRounded">Full Button</button>

    <script>
        $(document).ready(function() {
            $("#smallRounded").kendoSpeechToTextButton({
                rounded: "sm"
            });
            
            $("#mediumRounded").kendoSpeechToTextButton({
                rounded: "md"
            });
            
            $("#largeRounded").kendoSpeechToTextButton({
                rounded: "lg"
            });
            
            $("#fullRounded").kendoSpeechToTextButton({
                rounded: "full"
            });
        });
    </script>
```

### Icon

The `icon` option determines which icon is displayed when the button is not in the active state. The default is the `microphone-outline` icon.

```dojo
    <button id="speechButton"></button>

    <script>
        $(document).ready(function() {
            $("#speechButton").kendoSpeechToTextButton({
                icon: "headset"
            });
        });
    </script>
```

### StopIcon

The `stopIcon` option determines which icon is displayed when the button is in the active state (speech recognition in progress). The default is the `stop-sm` icon.

```dojo
    <button id="speechButton"></button>

    <script>
        $(document).ready(function() {
            $("#speechButton").kendoSpeechToTextButton({
                stopIcon: "pause-sm"
            });
        });
    </script>
```

## Button States

* **Inactive State**—Default state before speech recognition begins
* **Active State**—Indicates that speech recognition is currently in progress
* **Error State**—Displays when speech recognition encounters an error or is not supported by the browser

## See Also

* [Getting Started with the SpeechToTextButton]({% slug getting_started_kendoui_speechtotextbutton_widget %})
* [Overview of the SpeechToTextButton]({% slug overview_kendoui_speechtotextbutton_widget %})
* [JavaScript API Reference of the SpeechToTextButton](/api/javascript/ui/speechtotextbutton)
* [Knowledge Base Section](/knowledge-base)

---
title: Getting Started
page_title: jQuery SpeechToTextButton Documentation - Getting Started with the SpeechToTextButton
description: "Get started with the jQuery SpeechToTextButton by Kendo UI and learn how to create, initialize, and enable speech-to-text functionality."
slug: getting_started_kendoui_speechtotextbutton_widget
position: 2
---

# Getting Started with the SpeechToTextButton

This guide demonstrates how to get up and running with the Kendo UI for jQuery SpeechToTextButton.

After the completion of this guide, you will be able to achieve the following end result:

```dojo
    <button id="speechButton"></button>
    <div id="status"></div>
    <div id="result"></div>

    <script>
        $(document).ready(function() {
            $("#speechButton").kendoSpeechToTextButton({
                start: function() {
                    $("#status").text("Listening...");
                },
                result: function(e) {
                    var transcript = e.alternatives[0].transcript;
                    if (e.isFinal) {
                        $("#result").text("Final: " + transcript);
                    } else {
                        $("#result").text("Interim: " + transcript);
                    }
                },
                end: function() {
                    $("#status").text("Recognition ended");
                },
                error: function(e) {
                    $("#result").text("Error: " + e.error);
                }
            });
        });
    </script>
```

## 1. Create a Button Element

Create a `<button>` element on the page and use it as an initialization element for the SpeechToTextButton.

```html
    <button id="speechButton"></button>
    <div id="result"></div>
```

## 2. Initialize the SpeechToTextButton

In this step, you will initialize the SpeechToTextButton from the `<button>` element. All settings will be provided in the script statement.

```html
    <button id="speechButton"></button>
    <div id="result"></div>

    <script>
        $(document).ready(function() {
            $("#speechButton").kendoSpeechToTextButton();
        });
    </script>
```

## 3. Handle Speech Recognition Results

Use the [`result`](/api/javascript/ui/speechtotextbutton/events/result) event to process speech recognition results.

```html
    <button id="speechButton"></button>
    <div id="result"></div>

    <script>
        $(document).ready(function() {
            $("#speechButton").kendoSpeechToTextButton({
                result: function(e) {
                    $("#result").text("Result: " + transcript);
                }
            });
        });
    </script>
```

## 4. Enable Continuous Recognition

For scenarios where longer dictation is required, enable the [`continuous`](/api/javascript/ui/speechtotextbutton/configuration/continuous) option.

```html
    <button id="speechButton"></button>
    <div id="result"></div>

    <script>
        $(document).ready(function() {
            $("#speechButton").kendoSpeechToTextButton({
                continuous: true,
                result: function(e) {
                    $("#result").text("Result: " + transcript);
                }
            });
        });
    </script>
```
## Next Steps

* [Customizing the Appearance]({% slug appearance_kendoui_speechtotextbutton_widget %})
* [Overview of the SpeechToTextButton]({% slug overview_kendoui_speechtotextbutton_widget %})

## See Also

* [JavaScript API Reference of the SpeechToTextButton](/api/javascript/ui/speechtotextbutton)
* [Knowledge Base Section](/knowledge-base)

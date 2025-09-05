---
title: SpeechToTextButton
page_title: Configuration, methods and events of Kendo UI SpeechToTextButton
description: How to initialize a SpeechToTextButton UI component and configure its API.
res_type: api
---

# kendo.ui.SpeechToTextButton

Represents the Kendo UI SpeechToTextButton component. Inherits from [Button](/api/javascript/ui/button).

The SpeechToTextButton is an extension of the Kendo UI Button that provides a user-friendly interface for capturing audio and converting it to text. It can be configured to use the browser's built-in Web Speech API or integrated with other third-party speech recognition services.

As the SpeechToTextButton inherits from the Kendo UI Button, it supports the common button configuration options like `size`, `rounded`, `themeColor`, `fillMode`, and `disabled`.

## Configuration

### enable `Boolean` *(default: true)*

Indicates whether the button must be enabled or disabled. By default, it is enabled, unless a `disabled="disabled"` attribute is detected.

#### Example

    <button id="speechButton"></button>
    <script>
    $("#speechButton").kendoSpeechToTextButton({
        enable: false
    });
    </script>

### integrationMode `String` *(default: "webSpeech")*
Specifies which speech recognition engine or integration the component should use.
- `webSpeech` - Utilizes the browser's native Web Speech API.
- `none` - Disables the built-in speech recognition. Use this when integrating with a custom or third-party speech recognition service.

#### Example
    <button id="speechButton"></button>
    <script>
        $("#speechButton").kendoSpeechToTextButton({
            integrationMode: "none"
        });
    </script>

### icon `String` *(default: "microphone-outline")*
The name of the Kendo UI font icon to be displayed in the button when it is not active (not listening).

#### Example

    <button id="speechButton"></button>
    <script>
        $("#speechButton").kendoSpeechToTextButton({
            icon: "headset"
        });
    </script>

### stopIcon `String` *(default: "stop-sm")*
The name of the Kendo UI font icon to be displayed in the button when it is active (listening).

#### Example
    <button id="speechButton"></button>
    <script>
        $("#speechButton").kendoSpeechToTextButton({
            stopIcon: "stop-outline"
        });
    </script>

### lang `String` *(default: 'en-US')*
Specifies a BCP 47 language tag (e.g., 'en-US', 'fr-FR') used for speech recognition.

#### Example
    <button id="speechButton"></button>
    <script>
        $("#speechButton").kendoSpeechToTextButton({
            lang: 'fr-FR'
        });
    </script>

### continuous `Boolean` *(default: false)*
Controls whether continuous results are returned for each recognition, or only a single result once recognition stops.

#### Example
    <button id="speechButton"></button>
    <script>
        $("#speechButton").kendoSpeechToTextButton({
            continuous: true
        });
    </script>

### interimResults `Boolean` *(default: false)*
Controls whether interim results should be returned (true) or not (false). Interim results are results that are not yet final.

#### Example
    <button id="speechButton"></button>
    <script>
        $("#speechButton").kendoSpeechToTextButton({
            interimResults: true
        });
    </script>

### maxAlternatives `Number` *(default: 1)*
Represents the maximum number of alternative transcriptions to return for each result.

#### Example
    <button id="speechButton"></button>
    <script>
        $("#speechButton").kendoSpeechToTextButton({
            maxAlternatives: 5
        });
    </script>

### messages `Object`
Allows customization of the messages displayed by the widget.

#### Example

    <button id="speechButton"></button>
    <script>
        $("#speechButton").kendoSpeechToTextButton({
            messages: {
                unsupported: "Speech recognition is not available in this browser."
            }
        });
    </script>

### messages.unsupported `String` *(default: "Speech recognition is not supported in this browser.")*
The message shown when speech recognition is not supported by the browser.

#### Example
    <button id="speechButton"></button>
    <script>
        $("#speechButton").kendoSpeechToTextButton({
            messages: {
                unsupported: "Your browser does not support speech recognition."
            }
        });
    </script>

### messages.notInitialized `String` *(default: "Speech recognition engine not initialized.")*
The message for when the speech recognition engine is not initialized.

#### Example
    <button id="speechButton"></button>
    <script>
        $("#speechButton").kendoSpeechToTextButton({
            messages: {
                notInitialized: "The speech engine is not ready yet."
            }
        });
    </script>

### messages.start `String` *(default: "Start speech recognition")*
The aria-label for the button when it is not active (not listening).

#### Example
    <button id="speechButton"></button>
    <script>
        $("#speechButton").kendoSpeechToTextButton({
            messages: {
                start: "Click to start talking"
            }
        });
    </script>

### messages.stop `String` *(default: "Stop speech recognition")*
The aria-label for the button when it is active (listening).

#### Example
    <button id="speechButton"></button>
    <script>
        $("#speechButton").kendoSpeechToTextButton({
            messages: {
                stop: "Click to stop listening"
            }
        });
    </script>

## Methods

### startRecognition
Starts the speech recognition service.

#### Example
    <button id="speechButton"></button>
    <script>
        var speechButton = $("#speechButton").kendoSpeechToTextButton().data("kendoSpeechToTextButton");
        speechButton.startRecognition();
    </script>

### stopRecognition
Stops the speech recognition service.

#### Example
    <button id="speechButton"></button>
    <script>
        var speechButton = $("#speechButton").kendoSpeechToTextButton().data("kendoSpeechToTextButton");
        speechButton.startRecognition();
        setTimeout(function() {
            speechButton.stopRecognition();
        }, 5000);
    </script>

### abortRecognition
Aborts the speech recognition service immediately, discarding any current recognition results.

#### Example
    <button id="speechButton"></button>
    <script>
        var speechButton = $("#speechButton").kendoSpeechToTextButton().data("kendoSpeechToTextButton");
        speechButton.startRecognition();
        // Abort recognition before it completes
        speechButton.abortRecognition();
    </script>

### isListening
Returns `true` if the speech recognition is active (listening), otherwise `false`.

#### Returns
`Boolean` `true` if the widget is currently listening for speech input.

#### Example
    <button id="speechButton"></button>
    <script>
        var speechButton = $("#speechButton").kendoSpeechToTextButton().data("kendoSpeechToTextButton");
        speechButton.startRecognition();
        console.log(speechButton.isListening()); // logs true
    </script>

### destroy
Prepares the SpeechToTextButton for safe removal from DOM.

#### Example
    <button id="speechButton"></button>
    <script>
        var speechButton = $("#speechButton").kendoSpeechToTextButton().data("kendoSpeechToTextButton");
        speechButton.destroy();
    </script>

## Events

### start
Fires when the speech recognition service has begun listening to incoming audio.

#### Event Data
No event data.

#### Example
    <button id="speechButton"></button>
    <script>
        $("#speechButton").kendoSpeechToTextButton({
            start: function() {
                console.log("Speech recognition started.");
            }
        });
    </script>

### end
Fires when the speech recognition service has disconnected.

#### Event Data
No event data.

#### Example
    <button id="speechButton"></button>
    <script>
        $("#speechButton").kendoSpeechToTextButton({
            end: function() {
                console.log("Speech recognition ended.");
            }
        });
    </script>

### result
Fires when the speech recognition service returns a result - a word or phrase has been positively recognized.

#### Event Data
##### e.isFinal `Boolean`
A boolean indicating if the result is final.
##### e.alternatives `Array`
An array of alternative transcripts. Each object in the array has `transcript` and `confidence` fields.

#### Example
    <button id="speechButton"></button>
    <p id="result"></p>
    <script>
        $("#speechButton").kendoSpeechToTextButton({
            interimResults: true,
            result: function(e) {
                var transcript = e.alternatives[0].transcript;
                if (e.isFinal) {
                    $("#result").text("Final: " + transcript);
                } else {
                    $("#result").text("Interim: " + transcript);
                }
            }
        });
    </script>

### error
Fires when a speech recognition error occurs.

#### Event Data
##### e.error `String|Object`
The error itself, which may be a string message or an error object depending on the browser and speech recognition engine.

#### Example

    <button id="speechButton"></button>
    <script>
        $("#speechButton").kendoSpeechToTextButton({
            error: function(e) {
                console.log(e.error);
            }
        });
    </script>


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


<div class="meta-api-description">
Configure whether the voice input button or speech recognition control is active, allowing users to enable, disable, activate, deactivate, or control interaction availability for speech-to-text functionality in your application interface. This setting manages user input acceptance for voice commands, toggling the ability to capture or block microphone input, turn on or off dictation features, and adjust whether the speech recognition button is responsive or inactive at runtime or via component configuration.
</div>

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


<div class="meta-api-description">
Configure voice recognition by selecting the speech engine for the button, enabling use of the browser's native Web Speech API for built-in on-device speech-to-text conversion, or disabling internal recognition to connect external, custom, or third-party speech services. Control whether to activate browser-based voice input processing or bypass it entirely to implement alternative speech recognition providers, customize recognition integration modes, switch between default native recognition and external engines, and manage how spoken language input is captured and processed through different speech-to-text interfaces.
</div>

#### Example
    <button id="speechButton"></button>
    <script>
        $("#speechButton").kendoSpeechToTextButton({
            integrationMode: "none"
        });
    </script>

### icon `String` *(default: "microphone-outline")*
The name of the Kendo UI font icon to be displayed in the button when it is not active (not listening).


<div class="meta-api-description">
Customize the visual appearance of the button when voice recognition is inactive by setting or changing the displayed icon, selecting from a range of icon fonts or design names to modify how the button looks while idle, not listening, or awaiting user speech input. This includes specifying or configuring the symbol, glyph, or graphic that represents the button’s inactive state, allowing control over the default icon shown before activating speech-to-text functionality, supporting adjustments for UI consistency, branding, and clear indication when the microphone or recognition service is off.
</div>

#### Example

    <button id="speechButton"></button>
    <script>
        $("#speechButton").kendoSpeechToTextButton({
            icon: "headset"
        });
    </script>

### stopIcon `String` *(default: "stop-sm")*
The name of the Kendo UI font icon to be displayed in the button when it is active (listening).


<div class="meta-api-description">
Control and customize the visual indicator for when voice recognition or speech input is active by setting the icon that appears while listening, allowing you to configure or change the active state symbol, such as specifying a stop, pause, or microphone icon, to clearly show when audio capture is in progress, enhancing user feedback and interface clarity during speech-to-text operations or voice command interactions.
</div>

#### Example
    <button id="speechButton"></button>
    <script>
        $("#speechButton").kendoSpeechToTextButton({
            stopIcon: "stop-outline"
        });
    </script>

### lang `String` *(default: 'en-US')*
Specifies a BCP 47 language tag (e.g., 'en-US', 'fr-FR') used for speech recognition.


<div class="meta-api-description">
Configure or specify the language for speech recognition input by setting standardized language tags such as BCP 47 codes, including examples like English (en-US), French (fr-FR), or other locale identifiers to control, enable, or adjust the spoken language detection for voice-to-text features, speech input handling, microphone transcription, or multilingual recognition in user interfaces requiring automatic speech transcription in different languages or regional dialects.
</div>

#### Example
    <button id="speechButton"></button>
    <script>
        $("#speechButton").kendoSpeechToTextButton({
            lang: 'fr-FR'
        });
    </script>

### continuous `Boolean` *(default: false)*
Controls whether continuous results are returned for each recognition, or only a single result once recognition stops.


<div class="meta-api-description">
Configure speech recognition to provide either ongoing, real-time transcription with continuous, incremental updates or to deliver a single final result after processing stops. Control whether the speech-to-text interface streams partial interim transcripts live during the session or waits to output one complete, final text result. Enable or disable continuous recognition modes that affect real-time speech-to-text transcription, allowing seamless transcription with live updates or a one-time captured transcript. Adjust recognition behavior to support either streaming multi-part results or single-shot conversion from audio to text depending on your app’s needs. Set options for live speech interpretation with progressive transcript generation versus final speech recognition output once speaking ends.
</div>

#### Example
    <button id="speechButton"></button>
    <script>
        $("#speechButton").kendoSpeechToTextButton({
            continuous: true
        });
    </script>

### interimResults `Boolean` *(default: false)*
Controls whether interim results should be returned (true) or not (false). Interim results are results that are not yet final.


<div class="meta-api-description">
Control how speech recognition outputs live, partial, or interim transcriptions by enabling or disabling the delivery of non-final, real-time text results during audio input, useful for live transcription updates, streaming feedback, and progressively refined speech-to-text conversion; toggle between receiving continuous partial recognition results or waiting for finalized, confirmed transcriptions to optimize user experience in voice input interfaces, dictation apps, or conversational AI systems.
</div>

#### Example
    <button id="speechButton"></button>
    <script>
        $("#speechButton").kendoSpeechToTextButton({
            interimResults: true
        });
    </script>

### maxAlternatives `Number` *(default: 1)*
Represents the maximum number of alternative transcriptions to return for each result.


<div class="meta-api-description">
Adjust the number of alternative speech recognition transcriptions or hypotheses returned per spoken input by configuring the maximum alternatives parameter, controlling how many different text interpretations, suggestions, or n-best results you receive from a speech-to-text conversion. This setting impacts the variety of recognized phrases, alternative transcription options, multiple recognition candidates, and confidence-ranked results provided for each speech input, enabling fine-tuning of response detail, recognition depth, and output verbosity across voice command transcription, dictation, or conversational speech processing use cases.
</div>

#### Example
    <button id="speechButton"></button>
    <script>
        $("#speechButton").kendoSpeechToTextButton({
            maxAlternatives: 5
        });
    </script>

### messages `Object`
Allows customization of the messages displayed by the widget.


<div class="meta-api-description">
Customize, configure, set, or localize the text, labels, prompts, or messages displayed on the speech-to-text button interface, enabling control over language, wording, or translated content shown to users during speech recognition interaction or voice input features. Tailor prompts, instructions, or feedback text for accessibility, multilingual support, or branding purposes within voice command or dictation UI components. Adjust default or custom messages for voice-to-text controls, speech capture buttons, or dictation widgets across different locales, languages, or user contexts.
</div>

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


<div class="meta-api-description">
Customize or configure the notification, alert, or message text displayed when speech recognition, voice input, or browser-based talk-to-text features are unavailable, unsupported, disabled, or not detected by the current web browser or device, allowing developers to set localized, internationalized, or custom fallback prompts informing users that their browser does not support voice transcription, dictation, or speech-to-text capabilities.
</div>

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


<div class="meta-api-description">
Customize or translate the notification shown when voice recognition is not set up or inactive, control the alert text displayed by speech recognition buttons before initialization, set or configure messages indicating that speech-to-text functionality is not yet ready or operational, enable localization for prompts or warnings that speech recognition services have not started or are unavailable, and adjust the default text users see when the system has not initialized voice input or listening features.
</div>

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


<div class="meta-api-description">
Configure the accessible label or aria-label text for a speech input button when it is idle, inactive, or waiting to start listening, enabling localization, customization, and internationalization of the start prompt or descriptive message that assists screen readers and accessibility tools to identify the button’s function before voice recognition begins.
</div>

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


<div class="meta-api-description">
Set or customize the accessible label, aria-label, or screen reader text for a voice input or speech recognition button during active listening or recording state, enabling control over the spoken feedback or description when the voice capture is stopping, pausing, or ending. Configure or change the label that announces the speech-to-text button is currently processing, listening, or ceasing input, to enhance accessibility, voice command clarity, or assistive technology compatibility. Adjust the message or prompt that indicates to users that speech recognition has stopped or is no longer capturing audio input.
</div>

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


<div class="meta-api-description">
Initiate live audio transcription, start voice recognition or speech-to-text conversion, trigger real-time speech capture, enable microphone access and permission prompts, call the method to begin continuous or streaming audio processing, capture spoken input for immediate text results, control speech recognition engine activation, handle partial and final transcript events, and enable interactive voice input detection through the recognition system.
</div>

#### Example
    <button id="speechButton"></button>
    <script>
        var speechButton = $("#speechButton").kendoSpeechToTextButton().data("kendoSpeechToTextButton");
        speechButton.startRecognition();
    </script>

### stopRecognition
Stops the speech recognition service.


<div class="meta-api-description">
Stop speech recognition and microphone capture to end any active voice input sessions, halt live transcription or streaming results, cancel ongoing speech-to-text processing, disable further audio listening and transcription updates, release voice recognition resources, programmatically control when the speech recognition completes or terminates, and reset or prepare the system for starting a new speech recognition cycle or phrase input.
</div>

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


<div class="meta-api-description">
Stop or cancel ongoing speech recognition sessions immediately, discarding all partial or final transcript results without triggering any completion or result events, effectively aborting voice input processing. Developers can directly terminate in-progress speech-to-text operations, halt recognition mid-session, prevent further speech analysis or callbacks, reset the recognition state instantly, and control voice input cancellation to avoid delivering any recognized phrases or data. This method supports scenarios where speech input needs to be interrupted, recognition forcibly ended, or audio processing stopped on demand.
</div>

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


<div class="meta-api-description">
Check if the voice input or speech recognition feature is currently active, listening for user speech, or capturing audio in real-time by querying a synchronous method that returns a true or false status indicating whether the microphone or speech-to-text functionality is engaged. Use this to control UI elements like recording indicators, avoid triggering multiple start or stop commands, manage speech capture state, or conditionally enable actions responsive only during active voice recognition sessions, ensuring accurate detection of whether speech input is being processed live or idle.
</div>

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


<div class="meta-api-description">
Cleanup or dispose of speech-to-text button resources, handlers, timers, and event listeners to safely remove or unmount the component from the DOM, preventing memory leaks and dangling references when dynamically destroying, disabling, or tearing down the speech recognition interface in applications.
</div>

#### Example
    <button id="speechButton"></button>
    <script>
        var speechButton = $("#speechButton").kendoSpeechToTextButton().data("kendoSpeechToTextButton");
        speechButton.destroy();
    </script>

## Events

### start
Fires when the speech recognition service has begun listening to incoming audio.


<div class="meta-api-description">
Detect when voice recognition starts capturing audio input by tracking the event triggered as soon as speech-to-text or voice transcription begins listening, enabling developers to control UI updates, activate microphone indicators, initiate recording timers, manage speech recognition lifecycle, handle start signals for converting spoken words to text, and attach event handlers to respond to the beginning of audio capture, recording activation, or voice input sessions.
</div>

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


<div class="meta-api-description">
Detect when voice input or speech recognition finishes or disconnects to update user interface elements, re-enable buttons or controls, release memory or processing resources, stop related timers or animations, and finalize any ongoing audio processing workflows. Triggering actions upon the end of speech detection, voice transcription, or dictation sessions enables seamless cleanup, state updates, and resource management after voice capture completes or the microphone stops listening.
</div>

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


<div class="meta-api-description">
Capture and process voice recognition results, receiving recognized words or phrases from speech input, enabling updating interfaces, saving transcripts, handling recognized text, triggering post-processing for speech-to-text conversions, managing recognition events, accessing speech input outcomes, responding to voice commands, integrating transcribed content, and controlling speech recognition callbacks for dynamic voice-driven applications.
</div>

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


<div class="meta-api-description">
Detect and respond to speech recognition errors or failures during voice input to provide user feedback, enable retry mechanisms, capture error details like type or message, trigger notifications or alerts on recognition issues, implement logging or diagnostics for debugging voice input problems, monitor voice-to-text conversion errors, handle unsuccessful speech processing events, and manage speech recognition interruptions or faults for improved voice interaction reliability.
</div>

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


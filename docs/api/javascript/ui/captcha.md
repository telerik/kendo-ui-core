---
title: Captcha
page_title: Configuration, methods and events of Kendo UI Captcha
description: Configure the settings of the Kendo UI Captcha.
res_type: api
component: captcha
---

# kendo.ui.Captcha

Represents the Kendo UI Captcha. Inherits from [Widget](/api/javascript/ui/widget).

## Configuration

### audioButton `Boolean` *(default: true)*

Toggles the audio button.


<div class="meta-api-description">
Control the visibility and activation of the audio playback option that provides an alternative spoken challenge for users needing auditory Captcha support, enabling or disabling the audio button for improved accessibility, audio challenge functionality, voice prompt toggling, hearing-impaired user support, and configuring audio verification controls within Captcha user interfaces.
</div>

#### Example

```pseudo
    <input id="captcha" name="captcha" />
    <script>
        $("#captcha").kendoCaptcha({
            handler: "https://demos.telerik.com/kendo-ui/captcha/reset",
            audioButton: false
        });
    </script>
```

### audioHandler `String|Function|Object`

The URL, AJAX settings or function that fetches the audio of the captcha. When used with function, call the `args.success` method with the source of the audio.


<div class="meta-api-description">
Configure and control how audio challenges for CAPTCHA are retrieved, set, or customized by specifying a direct URL, defining AJAX request parameters, or implementing a custom function to fetch or stream the audio source dynamically. Enable overriding default audio loading behavior, supplying specific audio content via URLs, Blobs, or asynchronous methods, supporting use cases such as streaming, remote fetching, custom audio handlers, or fallback audio challenge loading. Adjust and enable audio challenge retrieval to fit diverse CAPTCHA audio delivery requirements, including custom integration, on-demand loading, and embedding alternative audio sources.
</div>

#### Example

    <input id="captcha" />
    <script>
        $("#captcha").kendoCaptcha({
            handler: "https://demos.telerik.com/kendo-ui/captcha/reset",
            audioHandler: "https://demos.telerik.com/kendo-ui/captcha/audio"
        });
    </script>

#### Set the audio handler as function

```pseudo
    <input id="captcha" />
    <script>
        $("#captcha").kendoCaptcha({
            handler: "https://demos.telerik.com/kendo-ui/captcha/reset",
            audioHandler: function (args) {
                args.success("https://demos.telerik.com/kendo-ui/captcha/audio?captchaId=" + args.data.captchaId);
            }
        });
    </script>
```

#### Set the Audio Handler as URL or AJAX

```pseudo
    <input id="captcha" />
    <script>
        $("#captcha").kendoCaptcha({
            handler: "https://demos.telerik.com/kendo-ui/captcha/reset",
            // audioHandler: "url-to-audio" // Response should return the audio source - base64 stream or url to the audio file
        });
    </script>
```

### captcha `String`

The source of an image to be rendered as captcha initially. If not set the `handler` to reset the image will be called. 


<div class="meta-api-description">
Configure the initial captcha image source or URL to control which verification image appears when the component loads, enable setting a specific captcha image for user challenges at startup, specify or override the default captcha graphic shown initially, preset the visual verification picture to customize the first displayed captcha, or provide a starting image to influence the captcha security prompt shown immediately without waiting for automatic refresh or handler invocation.
</div>

#### Example

    <input id="captcha" />
    <script>
        $("#captcha").kendoCaptcha({
            captcha: "https://demos.telerik.com/kendo-ui/content/captcha/9deb39f5-ac2f-4ff6-8061-31ff656d3df6.png",
            captchaId: "1234"
        });
    </script>
 
### captchaId `String`

The ID of the captcha to be added to the hidden input initially. If not set the `handler` to reset the ID will be called. 


<div class="meta-api-description">
Set or configure the hidden CAPTCHA identifier to link and validate the user challenge on the server side, control or initialize the CAPTCHA token used for verification, assign or update the challenge ID that tracks the CAPTCHA instance for validation purposes, manage or reset the CAPTCHA session identifier automatically when missing or expired, and enable seamless server-side CAPTCHA verification by specifying or refreshing the unique challenge key that corresponds to each CAPTCHA interaction.
</div>

#### Example

    <input id="captcha" />
    <script>
        $("#captcha").kendoCaptcha({
            captcha: "https://demos.telerik.com/kendo-ui/content/captcha/9deb39f5-ac2f-4ff6-8061-31ff656d3df6.png",
            captchaId: "1234"
        });
    </script>

### dataCaptchaField `String` *(default: "captcha")*

The field that returns the captcha's image source. Used in the `handler` function/response that resets the captcha's image and id.


<div class="meta-api-description">
Specify or configure the field holding the captcha image source to enable refreshing, resetting, or updating the captcha visual challenge; control which response attribute or data property contains the captcha image URL and associated identifier for dynamic captcha reloads, image regeneration, and seamless captcha validation workflows within security components or anti-bot verification systems.
</div>

#### Example

    <input id="captcha" />
    <script>
        $("#captcha").kendoCaptcha({
            dataCaptchaField: "captchaImage",
            handler: function (args) {
                args.success({
                    captchaImage: "https://demos.telerik.com/kendo-ui/content/captcha/9deb39f5-ac2f-4ff6-8061-31ff656d3df6.png",
                    captchaId: "1234"
                });
            }
        });
    </script>


#### Example - ajax

```pseudo
    <input id="captcha" />
    <script>
        $("#captcha").kendoCaptcha({
            dataCaptchaField: "captchaImage",
            handler: "https://demos.telerik.com/kendo-ui/captcha/reset" // Response should return captchaImage and the captchaId
        });
    </script>
```

### dataCaptchaIdField `String` *(default: "captchaId")*

The field that returns the captcha's id. Used in the `handler` function/response that resets the captcha's image and id.


<div class="meta-api-description">
Specify or configure the field name in a server or API response that holds the captcha identifier used for verification processes, allowing extraction, mapping, or retrieval of the captcha ID to reset, update, or refresh captcha images and associated tokens dynamically. This setting controls how your code or handlers access the captcha’s unique ID from responses, enabling customization for varied response formats, response parsing, data extraction, or handling multiple captcha workflows where the captcha ID is embedded under different property names, facilitating integration, validation, or regeneration of captcha challenges in web forms and security flows.
</div>

#### Example

    <input id="captcha" />
    <script>
        $("#captcha").kendoCaptcha({
            dataCaptchaIdField: "ID",
            handler: function (args) {
                args.success({
                    captcha: "https://demos.telerik.com/kendo-ui/content/captcha/9deb39f5-ac2f-4ff6-8061-31ff656d3df6.png",
                    ID: "1234"
                });
            }
        });
    </script>

#### Example - ajax

```pseudo
    <input id="captcha" />
    <script>
        $("#captcha").kendoCaptcha({
            dataCaptchaIdField: "ID",
            handler: "https://demos.telerik.com/kendo-ui/captcha/reset" // Response should return captcha and the ID
        });
    </script>
```

### handler `String|Function|Object`

The URL, AJAX settings or function that fetches the image and id of the captcha. Called initially when no `captcha` and `captchaId` options are entered and when the Reset button is pressed. When used with function, call the `args.success` method with the source of the audio.


<div class="meta-api-description">
Configure or set the source, endpoint URL, or custom function to load, fetch, or refresh CAPTCHA content dynamically using AJAX or remote requests, controlling how captcha images and identifiers are retrieved on initialization and during user-triggered resets, including handling callbacks for success or data retrieval in audio or image formats, enabling flexible integration of captcha challenges and automated refresh mechanisms within forms or user verification flows.
</div>

#### Example

    <input id="captcha" />
    <script>
        $("#captcha").kendoCaptcha({
            handler: function (args) {
                args.success({
                    captcha: "https://demos.telerik.com/kendo-ui/content/captcha/9deb39f5-ac2f-4ff6-8061-31ff656d3df6.png",
                    captchaId: "1234"
                });
            }
        });
    </script>

#### Example - ajax

```pseudo
    <input id="captcha" />
    <script>
        $("#captcha").kendoCaptcha({
            handler: "https://demos.telerik.com/kendo-ui/captcha/reset" // Response should return captcha and the captchaId
        });
    </script>
```

#### Example - custom ajax settings

```pseudo
    <input id="captcha" />
    <script>
        $("#captcha").kendoCaptcha({
            handler: {
                url: "https://demos.telerik.com/kendo-ui/captcha/reset",
                data: {
                    customfield: "data"
                },
                method: "POST"
            } // Response should return captcha and the captchaId
        });
    </script>
```

### messages `Object`

Provides configuration options for the messages present in the Captcha widget.


<div class="meta-api-description">
Configure and customize the text prompts, error messages, instructions, and feedback displayed by a Captcha system in multiple languages or locales, enabling control over user-facing verification messages, localizing UI content for accessibility, adjusting phrasing for clarity or branding, and tailoring the interaction text that guides users through captcha challenges, validation, retries, or errors across diverse regions and applications.
</div>

#### Example

```pseudo
    <input id="captcha" />
    <script>
        $("#captcha").kendoCaptcha({
            handler: "https://demos.telerik.com/kendo-ui/captcha/reset",
            messages: {
                reset: "Reset captcha",
                audio: "Speak Captcha",
                imageAlt: "Type the Captcha code from the image",
                success: "Verification successful"
            }
        });
    </script>
```

### messages.audio `String`*(default: "Speak captcha")*

The title message of the audio button.


<div class="meta-api-description">
Configure the audio button label, customize the spoken challenge prompt, localize or translate the audio captcha instructions, set accessible text for screen readers when enabling audio verification, control the audio captcha message wording, adjust the prompt that triggers the audio challenge, change or personalize the spoken guidance text, define the title or tooltip for the sound playback option in captcha, modify accessibility labels related to audio verification, and provide localized or internationalized audio captcha descriptions.
</div>

#### Example

```pseudo
    <input id="captcha" />
    <script>
        $("#captcha").kendoCaptcha({
            handler: "https://demos.telerik.com/kendo-ui/captcha/reset",
            messages: {
                audio: "Play captcha"
            }
        });
    </script>
``` 

### messages.imageAlt `String`*(default: "Type the Captcha code from the image"")*

The alt value of the captcha's image tag.


<div class="meta-api-description">
Control and customize the alternative text for Captcha images to enhance accessibility compliance, support screen readers, and enable localization or translation of image descriptions; adjust the alt attribute to provide meaningful, descriptive text for users with visual impairments, modify prompts for different languages, or tailor accessibility messaging within Captcha challenges.
</div>

#### Example

```pseudo
    <input id="captcha" />
    <script>
        $("#captcha").kendoCaptcha({
            handler: "https://demos.telerik.com/kendo-ui/captcha/reset",
            messages: {
                imageAlt: "Enter the text from the image."
            }
        });
    </script>
```

### messages.reset `String`*(default: "Reset captcha")*

The title message of the reset button.


<div class="meta-api-description">
Customize or set the text, label, title, or display string for the reset button on a Captcha widget, enabling localization, translation, or user-friendly prompts to control how the reset or refresh button is presented in different languages or user interfaces, including configuring the reset action wording, button caption, or tooltips for clearing or resetting verification challenges.
</div>

#### Example

```pseudo
    <input id="captcha" />
    <script>
        $("#captcha").kendoCaptcha({
            handler: "https://demos.telerik.com/kendo-ui/captcha/reset",
            messages: {
                reset: "Reset",
            }
        });
    </script>
```

### messages.success `String` *(default: "Verification successful")*

The message rendered when validation is successful. 


<div class="meta-api-description">
Customize and configure the confirmation message shown after successful captcha verification, enabling personalized success notifications, localized feedback texts, completion acknowledgments, validation success alerts, or custom responses that inform users when they pass the captcha test or human verification step.
</div>

#### Example

```pseudo
    <input id="captcha" />
    <script>
        $("#captcha").kendoCaptcha({
            handler: "https://demos.telerik.com/kendo-ui/captcha/reset",
            validationHandler: "https://demos.telerik.com/kendo-ui/captcha/validate",
            messages: {
                success: "Success",
            }
        });
    </script>
```

### resetButton `Boolean` *(default: true)*

Toggles the reset button.


<div class="meta-api-description">
Control the visibility of the captcha refresh or reset button by enabling or disabling the option to show a button that lets users reload, reset, or refresh the captcha challenge. This setting determines whether the captcha widget displays a clickable reset or reload control to allow users to generate a new verification code or image. Toggle or configure the presence of the reset button to improve user experience by allowing manual refresh of the captcha, hide or show the reset option, or manage whether users can reset the captcha challenge. Adjust, enable, disable, or set the captcha reset button visibility for scenarios requiring user-triggered refresh of captcha validation elements.
</div>

#### Example

```pseudo
    <input id="captcha" />
    <script>
        $("#captcha").kendoCaptcha({
            handler: "https://demos.telerik.com/kendo-ui/captcha/reset",
            resetButton: false
        });
    </script>
```

### validateOnBlur `Boolean` *(default: false)*

Whether to trigger validation when input is blurred. This option is useful if you are not using the Kendo Validator or the Kendo Form widgets as it enables to automatically trigger remote validation and use the widet's API in custom validation scenario. 


<div class="meta-api-description">
Enable automatic or custom captcha verification triggered when the user shifts focus away from the input field, supporting immediate validation on blur events, remote server-side checks, integration with or without standard validation frameworks, and flexible API calls to control or customize captcha validation workflows during user interaction and form completion.
</div>

#### Example

```pseudo
    <input id="captcha" />
    <script>
        $("#captcha").kendoCaptcha({
            handler: "https://demos.telerik.com/kendo-ui/captcha/reset",
            validationHandler: "https://demos.telerik.com/kendo-ui/captcha/validate",
            validateOnBlur: true
        });
    </script>
```

### validationHandler `String|Function|Object`

The URL, AJAX settings or function that validates the text input. When used with function, call the `args.success` method with boolean value.


<div class="meta-api-description">
Validate user Captcha input by configuring an endpoint URL for server-side verification, setting AJAX request parameters for asynchronous validation, or implementing a custom callback function to programmatically confirm Captcha correctness. Enables flexible Captcha verification methods including remote server validation, customizable AJAX calls, and manual result handling where you can trigger success or failure by returning boolean statuses. Supports integrating Captcha validation in form submission workflows, real-time checks, or custom authentication logic with control over how and when the Captcha solution approves or rejects user responses.
</div>

#### Example

    <input id="captcha" />
    <script>
        $("#captcha").kendoCaptcha({
            handler: "https://demos.telerik.com/kendo-ui/captcha/reset",
            validationHandler: "https://demos.telerik.com/kendo-ui/captcha/validate"
        });
    </script>

#### Configure the Handler as a Function

```pseudo
    <input id="captcha" />
    <script>
        $("#captcha").kendoCaptcha({
            validateOnBlur: true,
            handler: "https://demos.telerik.com/kendo-ui/captcha/reset",
            validationHandler: function (args) {
                args.success(false);
            },
        });
    </script>
``` 

#### Configure the Handler by Passing a Link

```pseudo
    <input id="captcha" />
    <script>
        $("#captcha").kendoCaptcha({
            validateOnBlur: true,
            handler: "https://demos.telerik.com/kendo-ui/captcha/reset",
            validationHandler: "https://demos.telerik.com/kendo-ui/captcha/validate",
        });
    </script>
```

### volumeControl `Boolean` *(default: true)*

Whether to show a volume control when audio is played.

> In IE and other browsers that do not support wav audio will not show up the volume control. Plugin-based embed elements cannot be controlled programmatically.


<div class="meta-api-description">
Enable or disable an audio volume control interface for adjusting sound playback levels within the Captcha widget, allowing users to set, manage, or customize audio volume during verification challenges; supports interactive volume adjustment controls in compatible browsers but may not appear in environments lacking audio format support or plugin limitations, addressing use cases involving audio playback configuration, volume toggling, sound management, accessibility for hearing preferences, and cross-browser compatibility for audio controls.
</div>

#### Example

```pseudo
    <input id="captcha" />
    <script>
        $("#captcha").kendoCaptcha({
            volumeControl: false,
            handler: "https://demos.telerik.com/kendo-ui/captcha/reset",
            audioHandler: function (args) {
                args.success("https://demos.telerik.com/kendo-ui/captcha/audio?captchaId=" + args.data.captchaId);
            }
        });
    </script>
```

## Methods

### enable

Enables or disables the widget.


<div class="meta-api-description">
Control user interaction with the Captcha challenge by toggling its active state using a method that enables or disables the validation widget, allowing developers to programmatically set whether users can respond to the Captcha or if input should be temporarily blocked and later restored. This functionality supports scenarios like dynamically activating or deactivating the security check, managing user input flow, configuring the component’s operational status during runtime, and conditionally enabling the anti-bot verification step based on application logic or user behavior.
</div>

#### Example

```pseudo
    <input id="captcha" />
    <script>
        var captcha = $("#captcha").kendoCaptcha({
            handler: "https://demos.telerik.com/kendo-ui/captcha/reset"
        }).data("kendoCaptcha");

        captcha.enable(false);
    </script>
```

#### Parameters

##### enable `Boolean`

If set to `true` the widget will be enabled. If set to `false` the widget will be disabled.


### getCaptchaId

Returns the ID of the current captcha.


<div class="meta-api-description">
Retrieve the unique identifier for the current captcha instance to track, validate, or reference the active captcha session, enabling synchronization between client and server for verification, logging, refreshing, or updating captcha challenges. This method helps obtain the captcha ID needed to link user input with server-side checks, manage captcha lifecycle, confirm security tokens, or coordinate captcha resets and submissions across requests.
</div>

#### Example

```pseudo
    <input id="captcha" />
    <script>
        var captcha = $("#captcha").kendoCaptcha({
            handler: "https://demos.telerik.com/kendo-ui/captcha/reset"
        }).data("kendoCaptcha");

        console.log(captcha.getCaptchaId());
    </script>
```

#### Returns

`String`

### isValid

Returns true if validated and valid, false if validated and not valid and null or undefined if not validated.


<div class="meta-api-description">
Determine if a user has successfully completed or failed a Captcha challenge by checking validation status, verifying whether the Captcha response passed security checks, controlling flow based on whether the Captcha was solved correctly, assessing if verification was attempted or remains pending, testing Captcha completion during form submission or user interaction, programmatically reading or querying Captcha verification results, enabling logic for accepted or rejected Captcha states, handling conditional behavior depending on Captcha success, failure, or absence of validation, and confirming whether the anti-bot challenge was met or still unverified.
</div>

#### Example

```pseudo
    <input id="captcha" />
    <script>
        var captcha = $("#captcha").kendoCaptcha({
            handler: "https://demos.telerik.com/kendo-ui/captcha/reset",
            validationHandler: "https://demos.telerik.com/kendo-ui/captcha/validate"
        }).data("kendoCaptcha");

        captcha.validate().done(function () {
            console.log(captcha.isValid());
        });
    </script>
```

#### Returns

`Boolean`

### readonly

Toggles the readonly state of the widget.


<div class="meta-api-description">
Configure interaction mode for the captcha component by enabling or disabling user input, switching between read-only and editable states to control whether users can type, edit, or interact with the captcha field dynamically; manage form access, lock or unlock input, set captcha to non-interactive or interactive mode, toggle user edit permissions, and programmatically control conditional input availability or form state changes after initialization.
</div>

#### Example

```pseudo
    <input id="captcha" />
    <script>
        var captcha = $("#captcha").kendoCaptcha({
            handler: "https://demos.telerik.com/kendo-ui/captcha/reset"
        }).data("kendoCaptcha");

        captcha.readonly();
    </script>
```

#### Parameters

##### readonly `Boolean`

If set to `true` the widget will be readonly. If set to `false` the widget will be disable the readonly state.

### reset

Resets the Captcha with new image and id - triggers the `handler` action.


<div class="meta-api-description">
refresh or reload captcha challenge programmatically to generate a new verification image and identifier, trigger callback functions or handlers upon reset, update captcha after validation failure or on demand to force a new challenge, reinitialize or reset captcha state dynamically within client-side or server-side workflows, ensure the captcha widget presents a fresh security check by replacing the displayed image and associated id while invoking configured event handlers for custom processing or validation logic.
</div>

#### Example

```pseudo
    <input id="captcha" />
    <script>
        var captcha = $("#captcha").kendoCaptcha({
            handler: "https://demos.telerik.com/kendo-ui/captcha/reset"
        }).data("kendoCaptcha");

        setTimeout(function(){
            captcha.reset().done(function () {
                console.log("newimage");
            });
        }, 1500);
    </script>
```

#### Returns

`Promise`

### speak

Speaks the Captcha's text - triggers the `audioHandler` action. The returned promise is resolved when audio's ended event is triggered.


<div class="meta-api-description">
Enable audio playback for Captcha text by triggering speech output methods that read out the verification code or challenge aloud, supporting accessibility features, screen readers, and auditory verification. Configure and call functions to play Captcha audio prompts, handle playback events, wait for audio completion with promises or async handling, and implement assistive technologies or automated voice feedback for Captcha challenges. Control spoken Captcha responses for usability, seamless audio-triggered workflows, and enhanced interaction for users requiring auditory support or alternative verification methods.
</div>

#### Example

```pseudo
    <input id="captcha" />
    <script>
        var captcha = $("#captcha").kendoCaptcha({
            handler: "https://demos.telerik.com/kendo-ui/captcha/reset",
            audioHandler: function (args) {
                args.success("https://demos.telerik.com/kendo-ui/captcha/audio?captchaId=" + args.data.captchaId);
            }
        }).data("kendoCaptcha");

        // call the speak method
        //captcha.speak().done(function () {
           // console.log("Audio ended");
        //});
    </script>
```

#### Returns

`Promise`

### validate

Validates the Captcha remotely - triggers the `validationHandler` action.


<div class="meta-api-description">
Enable server-side validation of Captcha responses by triggering asynchronous verification methods that confirm user input against remote Captcha services, integrate Captcha validation into form processing workflows, handle verification callbacks for success or failure outcomes, control server verification of challenge responses, initiate remote validation calls, and manage validation results within action handlers or event listeners to ensure secure and reliable user interaction checks.
</div>

#### Example

```pseudo
    <input id="captcha" />
    <script>
        var captcha = $("#captcha").kendoCaptcha({
            handler: "https://demos.telerik.com/kendo-ui/captcha/reset",
            validationHandler: "https://demos.telerik.com/kendo-ui/captcha/validate"
        }).data("kendoCaptcha");

        setTimeout(function(){
            captcha.validate().done(function (data) {
                console.log(captcha.isValid(), data);
            });
        }, 1500);
    </script>
```

#### Returns

`Promise`

## Events

### change

Fired when users changes the input of the Captcha component.


<div class="meta-api-description">
Listen for updates, modifications, or edits to the Captcha input field to detect when users alter or change their response, enabling validation of the entered challenge, controlling form submission states such as enabling or disabling submit buttons, triggering real-time verification processes, and updating user interfaces dynamically based on input changes or corrections. This event supports monitoring user interactions with Captcha input, capturing every alteration for responsive form behaviors, error handling, and security verification workflows.
</div>

#### Event Data

##### e.value `String`

The value entered in the Captcha's tetxbox

#### Example

```pseudo
    <input id="captcha" />
    <script>
        var captcha = $("#captcha").kendoCaptcha({
            handler: "https://demos.telerik.com/kendo-ui/captcha/reset",
            change: function (ev) {
                console.log(ev.value);
            }
        }).data("kendoCaptcha");
    </script>
```

### requestEnd

Fired when a request to a handler is finished - can be distinguished via the `type` argument in the event data.


<div class="meta-api-description">
Detect when a server interaction or handler request completes to trigger post-processing, update user interfaces, handle or log responses, manage errors, and distinguish different types of completed operations based on event data; enable monitoring and reacting to the end of asynchronous requests, round-trip completions, or callback finalizations for workflows involving verification, validation, and server communication in Captcha or similar challenge-response systems.
</div>

#### Event Data

##### e.type `String`

The type triggered the request: "reset|validation|audio".

#### Example

    <input id="captcha" />
    <script>
        $("#captcha").kendoCaptcha({
            handler: "https://demos.telerik.com/kendo-ui/captcha/reset",
            requestEnd: function (ev) {
                // Handle the request end event
                console.log("Request ended: " + ev.type);
            }
        });
    </script>

#### Handle the requestEnd event

```pseudo
    <input id="captcha" />
    <script>
        var captcha = $("#captcha").kendoCaptcha({
            handler: "https://demos.telerik.com/kendo-ui/captcha/reset",
            validationHandler: "https://demos.telerik.com/kendo-ui/captcha/validate",
            requestEnd: function (ev) {
                console.log(ev.type);
            }
        }).data("kendoCaptcha");
    </script>
```

#### Reset Captcha on validation fail

```pseudo
    <input id="captcha" />
    <script>
        var captcha = $("#captcha").kendoCaptcha({
            handler: "https://demos.telerik.com/kendo-ui/captcha/reset",
            validationHandler: "https://demos.telerik.com/kendo-ui/captcha/validate",
            requestEnd: function (ev) {
                if (ev.type === "validation" && ev.data === false) {
                    ev.sender.reset();
                }
            }
        }).data("kendoCaptcha");
    </script>
```

### requestStart

Fired when the captcha makes a request to a handler - can be distinguished via the `type` argument in the event data.


<div class="meta-api-description">
Detect when a captcha process initiates an HTTP request by capturing events signaling the start of server communication, enabling developers to trigger loading indicators, perform logging or auditing of requests, differentiate request categories based on event payload types, and implement conditional handling or routing behavior when the captcha engages server-side verification or other backend interactions.
</div>

#### Event Data

##### e.type `String`

The type triggered the request: "reset|validation|audio".

##### e.data `Object`

The context passed to the request.

#### Example

```pseudo
    <input id="captcha" />
    <script>
        var captcha = $("#captcha").kendoCaptcha({
            handler: "https://demos.telerik.com/kendo-ui/captcha/reset",
            validationHandler: "https://demos.telerik.com/kendo-ui/captcha/validate",
            requestStart: function (ev) {
                console.log(ev.type);
            }
        }).data("kendoCaptcha");
    </script>
```

### error

Fired when a request triggered by the component fails - can be distinguished via the `type` argument in the event data.


<div class="meta-api-description">
Handle and detect failed Captcha verifications, network errors, and request failures from the Captcha system by capturing error events that enable retry mechanisms, error message displays, diagnostic logging, and conditional error handling based on error types or failure categories. This event-driven approach supports managing connection issues, validation errors, timeout failures, and differentiating error causes for adaptive UI feedback, troubleshooting, and robust recovery workflows.
</div>

#### Event Data

##### e.type `String`

The type triggered the request: "reset|validation|audio|image".

##### e.jqXHR `Object`

The jQuery XHR object.

##### e.textStatus `String`

The status of the request error.

##### e.errorThrown `String`

The error message.

#### Example

```pseudo
    <input id="captcha" />
    <script>
        var captcha = $("#captcha").kendoCaptcha({
            handler: "https://demos.telerik.com/kendo-ui/captcha/reset",
            validationHandler: "https://demos.telerik.com/kendo-ui/captcha/validate",
            error: function (ev) {
                console.log(ev.type);
            }
        }).data("kendoCaptcha");
    </script>
```



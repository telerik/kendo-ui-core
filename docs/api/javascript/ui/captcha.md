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

#### Example

    <input id="captcha" name="captcha" />
    <script>
        $("#captcha").kendoCaptcha({
            handler: "https://demos.telerik.com/kendo-ui/captcha/reset",
            audioButton: false
        });
    </script>

### audioHandler `String|Function|Object`

The URL, AJAX settings or function that fetches the audio of the captcha. When used with function, call the `args.success` method with the source of the audio.

#### Example - function

    <input id="captcha" />
    <script>
        $("#captcha").kendoCaptcha({
            handler: "https://demos.telerik.com/kendo-ui/captcha/reset",
            audioHandler: function (args) {
                args.success("https://demos.telerik.com/kendo-ui/captcha/audio?captchaId=" + args.data.captchaId);
            }
        });
    </script>

#### Example - URL or AJAX

    <input id="captcha" />
    <script>
        $("#captcha").kendoCaptcha({
            handler: "url-to-reset", // Response should return captcha (image) and the id
            audioHandler: "url-to-audio" // Response should return the audio source - base64 stream or url to the audio file
        });
    </script>

### captcha `String`

The source of an image to be rendered as captcha initially. If not set the `handler` to reset the image will be called. 

#### Example

    <input id="captcha" />
    <script>
        $("#captcha").kendoCaptcha({
            captcha: "captchaImage.png",
            captchaId: "1234"
        });
    </script>

### captchaId `String`

The ID of the captcha to be added to the hidden input initially. If not set the `handler` to reset the ID will be called. 

#### Example

    <input id="captcha" />
    <script>
        $("#captcha").kendoCaptcha({
            captcha: "captchaImage.png",
            captchaId: "1234"
        });
    </script>

### dataCaptchaField `String` *(default: "captcha")*

The field that returns the captcha's image source. Used in the `handler` function/response that resets the captcha's image and id.

#### Example

    <input id="captcha" />
    <script>
        $("#captcha").kendoCaptcha({
            dataCaptchaField: "captchaImage",
            handler: function (args) {
                args.success({
                    captchaImage: "captchaImage.png",
                    captchaId: "1234"
                });
            }
        });
    </script>

#### Example - ajax

    <input id="captcha" />
    <script>
        $("#captcha").kendoCaptcha({
            dataCaptchaField: "captchaImage",
            handler: "url-to-reset" // Response should return captchaImage and the captchaId
        });
    </script>

### dataCaptchaIdField `String` *(default: "captchaId")*

The field that returns the captcha's id. Used in the `handler` function/response that resets the captcha's image and id.

#### Example

    <input id="captcha" />
    <script>
        $("#captcha").kendoCaptcha({
            dataCaptchaIdField: "ID",
            handler: function (args) {
                args.success({
                    captcha: "captchaImage.png",
                    ID: "1234"
                });
            }
        });
    </script>

#### Example - ajax

    <input id="captcha" />
    <script>
        $("#captcha").kendoCaptcha({
            dataCaptchaIdField: "ID",
            handler: "url-to-reset" // Response should return captcha and the ID
        });
    </script>

### handler `String|Function|Object`

The URL, AJAX settings or function that fetches the image and id of the captcha. Called initially when no `captcha` and `captchaId` options are entered and when the Reset button is pressed. When used with function, call the `args.success` method with the source of the audio.

#### Example

    <input id="captcha" />
    <script>
        $("#captcha").kendoCaptcha({
            handler: function (args) {
                args.success({
                    captcha: "captchaImage.png",
                    captchaId: "1234"
                });
            }
        });
    </script>

#### Example - ajax

    <input id="captcha" />
    <script>
        $("#captcha").kendoCaptcha({
            handler: "https://demos.telerik.com/kendo-ui/captcha/reset" // Response should return captcha and the captchaId
        });
    </script>

#### Example - custom ajax settings

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

### messages `Object`

Provides configuration options for the messages present in the Captcha widget.

#### Example

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

### messages.audio `String`*(default: "Speak captcha")*

The title message of the audio button.

#### Example

    <input id="captcha" />
    <script>
        $("#captcha").kendoCaptcha({
            handler: "https://demos.telerik.com/kendo-ui/captcha/reset",
            messages: {
                audio: "Play captcha"
            }
        });
    </script>

### messages.imageAlt `String`*(default: "Type the Captcha code from the image"")*

The alt value of the captcha's image tag.

#### Example

    <input id="captcha" />
    <script>
        $("#captcha").kendoCaptcha({
            handler: "https://demos.telerik.com/kendo-ui/captcha/reset",
            messages: {
                imageAlt: "Enter the text from the image."
            }
        });
    </script>

### messages.reset `String`*(default: "Reset captcha")*

The title message of the reset button.

#### Example

    <input id="captcha" />
    <script>
        $("#captcha").kendoCaptcha({
            handler: "https://demos.telerik.com/kendo-ui/captcha/reset"
            messages: {
                reset: "Reset",
            }
        });
    </script>

### messages.success `String` *(default: "Verification successful")*

The message rendered when validation is successful. 

#### Example

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

### resetButton `Boolean` *(default: true)*

Toggles the reset button.

#### Example

    <input id="captcha" />
    <script>
        $("#captcha").kendoCaptcha({
            handler: "https://demos.telerik.com/kendo-ui/captcha/reset",
            resetButton: false
        });
    </script>

### validateOnBlur `Boolean` *(default: false)*

Whether to trigger validation when input is blurred. This option is useful if you are not using the Kendo Validator or the Kendo Form widgets as it enables to automatically trigger remote validation and use the widet's API in custom validation scenario. 

#### Example

    <input id="captcha" />
    <script>
        $("#captcha").kendoCaptcha({
            handler: "https://demos.telerik.com/kendo-ui/captcha/reset",
            validationHandler: "https://demos.telerik.com/kendo-ui/captcha/validate",
            validateOnBlur: true
        });
    </script>

### validationHandler `String|Function|Object`

The URL, AJAX settings or function that validates the text input. When used with function, call the `args.success` method with boolean value.

#### Example

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

#### Example - ajax

    <input id="captcha" />
    <script>
        $("#captcha").kendoCaptcha({
            validateOnBlur: true,
            handler: "https://demos.telerik.com/kendo-ui/captcha/reset",
            validationHandler: "https://demos.telerik.com/kendo-ui/captcha/validate",
        });
    </script>

### volumeControl `Boolean` *(default: true)*

Whether to show a volume control when audio is played.

> In IE and other browsers that do not support wav audio will not show up the volume control. Plugin-based embed elements cannot be controlled programmatically.

#### Example

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



## Methods

### enable

Enables or disables the widget.

#### Example

    <input id="captcha" />
    <script>
        var captcha = $("#captcha").kendoCaptcha({
            handler: "https://demos.telerik.com/kendo-ui/captcha/reset"
        }).data("kendoCaptcha");

        captcha.enable(false);
    </script>

#### Parameters

##### enable `Boolean`

If set to `true` the widget will be enabled. If set to `false` the widget will be disabled.


### getCaptchaId

Returns the ID of the current captcha.

#### Example

    <input id="captcha" />
    <script>
        var captcha = $("#captcha").kendoCaptcha({
            handler: "https://demos.telerik.com/kendo-ui/captcha/reset"
        }).data("kendoCaptcha");

        console.log(captcha.getCaptchaId());
    </script>

#### Returns

`String`

### isValid

Returns true if validated and valid, false if validated and not valid and null or undefined if not validated.

#### Example

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

#### Returns

`Boolean`

### readonly

Toggles the readonly state of the widget.

#### Example

    <input id="captcha" />
    <script>
        var captcha = $("#captcha").kendoCaptcha({
            handler: "https://demos.telerik.com/kendo-ui/captcha/reset"
        }).data("kendoCaptcha");

        captcha.readonly();
    </script>

#### Parameters

##### readonly `Boolean`

If set to `true` the widget will be readonly. If set to `false` the widget will be disable the readonly state.

### reset

Resets the Captcha with new image and id - triggers the `handler` action.

#### Example

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

#### Returns

`Promise`

### speak

Speaks the Captcha's text - triggers the `audioHandler` action. The returned promise is resolved when audio's ended event is triggered.

#### Example

    <input id="captcha" />
    <script>
        var captcha = $("#captcha").kendoCaptcha({
            handler: "https://demos.telerik.com/kendo-ui/captcha/reset",
            audioHandler: function (args) {
                args.success("https://demos.telerik.com/kendo-ui/captcha/audio?captchaId=" + args.data.captchaId);
            }
        }).data("kendoCaptcha");

        captcha.speak().done(function () {
            console.log("Audio ended");
        });
    </script>

#### Returns

`Promise`

### validate

Validates the Captcha remotely - triggers the `validationHandler` action.

#### Example

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

#### Returns

`Promise`

## Events

### change

Fired when users changes the input of the Captcha component.

#### Event Data

##### e.value `String`

The value entered in the Captcha's tetxbox

#### Example

    <input id="captcha" />
    <script>
        var captcha = $("#captcha").kendoCaptcha({
            handler: "https://demos.telerik.com/kendo-ui/captcha/reset",
            change: function (ev) {
                console.log(ev.value);
            }
        }).data("kendoCaptcha");
    </script>

### requestEnd

Fired when a request to a handler is finished - can be distinguished via the `type` argument in the event data.

#### Event Data

##### e.type `String`

The type triggered the request: "reset|validation|audio".

#### Example

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

#### Example - reset Captcha on validation fail

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

### requestStart

Fired when the captcha makes a request to a handler - can be distinguished via the `type` argument in the event data.

#### Event Data

##### e.type `String`

The type triggered the request: "reset|validation|audio".

##### e.data `Object`

The context passed to the request.

#### Example

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

### error

Fired when a request triggered by the component fails - can be distinguished via the `type` argument in the event data.

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




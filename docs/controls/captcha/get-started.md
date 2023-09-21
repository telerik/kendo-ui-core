---
title: Getting Started
page_title: jQuery Captcha Documentation - Getting Started with the Captcha
description: "Get started with the jQuery Captcha by Kendo UI and learn how to create, initialize, and enable the component."
slug: getting_started_kendoui_captcha_widget
position: 1
---

# Getting Started with the Captcha

This guide demonstrates how to get up and running with the Kendo UI for jQuery Captcha.

After the completion of this guide, you will be able to achieve the following end result:

```dojo
    <input id="captcha" name="captcha" placeholder="Enter captcha" />
    
    <script>
        $("#captcha").kendoCaptcha({
            handler: "./reset",
            audioHandler: function (args) {
                args.success("./audio?captchaId=" + args.data.captchaId);
            },
            validationHandler: "./validate",
            error: function (data) {
                console.log(data);
            }
        })
    </script>
```

> Due to CORS errors, the image and audio URLs for the Captcha cannot be accessed when running the example in the Dojo code runner. For a complete runnable example, check the [Captcha Overview demo](https://demos.telerik.com/kendo-ui/captcha/index).

## 1. Create an Input Element

First, create an `<input>` element on the page.

```html
<input id="captcha" name="captcha" placeholder="Enter captcha" />
```

## 2. Initialize the Captcha

In this step, you will initialize the Captcha from the `<input>` element. All settings of the Captcha will be provided in the initialization script statement and you have to describe its layout and configuration in JavaScript.

```html
<input id="captcha" name="captcha" placeholder="Enter captcha" />

<script>
    // Target the input element by using jQuery and then call the kendoCaptcha() method.
    $("#captcha").kendoCaptcha({
        error: function (data) {
            console.log(data);
        }
    });
</script>
```

## 3. Add the Image Handler

The Captcha generates its image after a request to the server. The link to the remote endpoint is configured through the [`handler`](/api/javascript/ui/captcha/configuration/handler) setting.

```html
    <input id="captcha" name="captcha" placeholder="Enter captcha" />

    <script>
        $("#captcha").kendoCaptcha({
            error: function (data) {
                console.log(data);
            },
            handler: "./reset",
        });
    </script>
```

## 4. Add the Audio Handler

The Captcha can reproduce the content of its distorted image in audio format through the [`audioHandler`](/api/javascript/ui/captcha/configuration/audiohandler) setting.

```html
    <input id="captcha" name="captcha" placeholder="Enter captcha" />

    <script>
        $("#captcha").kendoCaptcha({
            error: function (data) {
                console.log(data);
            },
            handler: "./reset",
            audioHandler: function (args) {
                args.success("./audio?captchaId=" + args.data.captchaId)
            }
        });
    </script>
```

## 5. Add the Validation Handler

The [`validationHandler`](/api/javascript/ui/captcha/configuration/validationhandler) allows you to configure an URL or an action that validates the user input. 

```html
    <input id="captcha" name="captcha" placeholder="Enter captcha" />

    <script>
        $("#captcha").kendoCaptcha({
            error: function (data) {
                console.log(data);
            },
            handler: "./reset",
            audioHandler: function (args) {
                args.success("./audio?captchaId=" + args.data.captchaId)
            },
            validationHandler: "./validate"
        });
    </script>
```

## Next Steps

* [Referencing Existing Component Instances]({% slug widget_methodsand_events_kendoui_installation %})
* [Demo Page for the Kendo UI for jQuery Captcha](https://demos.telerik.com/kendo-ui/captcha/index)

## See Also

* [JavaScript API Reference of the jQuery Captcha](/api/javascript/ui/captcha)
* [Knowledge Base Section](/knowledge-base)

<script>
  window.onload = function() {
    document.getElementsByClassName("btn-run")[0].click();
  }
</script>

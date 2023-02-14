---
title: Overview
page_title: jQuery Captcha Documentation - Captcha Overview
description: "Get started with the jQuery Captcha by Kendo UI and learn how to initialize the widget."
slug: overview_kendoui_captcha_widget
position: 1
---

# {{ site.product }} Captcha Overview

The Kendo UI Captcha widget is a security measure that prevents automated spam from performing tasks such as form submissions in your application. The widget generates distorted images of letters and numbers that are easily decipherable to humans, but not to automated programs (spam bots).

To see the Captcha in action, visit its [demo page](https://demos.telerik.com/kendo-ui/captcha/index).

## Initializing the Captcha

To initialize the Captcha, use the `<input>` tag.

The following example demonstrates how to initialize the Captcha from an existing `<input>` element:

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

## Functionality and Features

* [Audio]({% slug audio_kendoui_captcha_widget %})&mdash;This feature provides a voice representation of the Captcha text.
* [Provider]({% slug provider_kendoui_captcha_widget %})&mdash;This is the server-side feature that generates and validates Captchas.
* [Validation]({% slug validation_kendoui_captcha_widget %})&mdash;This is the server-side validation feature of the Captcha.
* [Accessibility]({% slug accessibility_kendoui_captcha_widget %})&mdash;The Captcha supports various accessibility standards.

## See Also

* [Overview of the Captcha (Demo)](https://demos.telerik.com/kendo-ui/captcha/index)
* [JavaScript API Reference of the Captcha](/api/javascript/ui/captcha)

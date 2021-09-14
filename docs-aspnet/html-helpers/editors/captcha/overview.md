---
title: Overview
page_title: Overview
description: "Discover the Telerik UI Captcha HtmlHelper for {{ site.framework }} control, and learn how to start using it."
slug: htmlhelpers_captcha_overview
position: 1
---

# Captcha HtmlHelper Overview

The Telerik UI Captcha for {{ site.framework }} is a security measure that prevents automated spam from performing tasks such as form submissions in your {{ site.framework }} application. The widget generates distorted images of letters and numbers that are easily decipherable to humans, but not to automated programs (spam bots). 

* [Demo page for the Captcha](https://demos.telerik.com/{{ site.platform }}/captcha/index)

## Basic Configuration

The following example demonstrates the basic configuration of the Captcha HtmlHelper. For the full server-side implementation, consider the [Validation article]({% slug htmlhelpers_captcha_validation %}).

```cshtml
    @(Html.Kendo().Captcha()
        .Name("Captcha")
        .Handler(handler => handler.Action("Reset", "Captcha")) // endpoint to return the CAPTCHA 
        .AudioHandlerFunction("audioHandler") // handler to fetch audio representation of the CAPTCHA (if needed)
        .ValidationHandler(handler => handler.Action("Validate", "Captcha")) // enpoint to validate the CAPTCHA
    )
```
```JavaScript
    <script>
        function audioHandler(args) {
            args.success("@Url.Action("Audio")?captchaId=" + args.data.captchaId); 
        }
    </script>
```

## Functionality and Features

* [Captcha Server-side Provider]({% slug htmlhelpers_captcha_provider %})
* [Validation]({% slug htmlhelpers_captcha_validation %})
* [Audio Content]({% slug htmlhelpers_captcha_audio %})
* [Accessibility]({% slug htmlhelpers_captcha_accessibility %})

## Events

For a complete example on the Captcha's events, refer to the [demo on using the events of the Captcha](https://demos.telerik.com/{{ site.platform }}/captcha/events).

## Referencing Existing Instances

To reference an existing Captcha instance, use the [`jQuery.data()`](https://api.jquery.com/jQuery.data/) configuration option. Once a reference is established, use the [Captcha client-side API](https://docs.telerik.com/kendo-ui/api/javascript/ui/captcha#methods) to control its behavior.

```
    // Place the following after your Telerik UI Captcha for {{ site.framework }} declaration.
    <script>
        $(document).ready(function() {
            // The Name() of the Captcha is used to get its client-side instance.
            var captcha = $("#Captcha").data("kendoCaptcha");
        });
    </script>
```

## See Also

* [Basic Usage of the Captcha HtmlHelper for {{ site.framework }} (Demo)](https://demos.telerik.com/{{ site.platform }}/captcha/index)
* [Using the API of the Captcha HtmlHelper for {{ site.framework }} (Demo)](https://demos.telerik.com/{{ site.platform }}/captcha/api)
* [Server-Side API](/api/captcha)

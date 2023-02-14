---
title: Overview
page_title: Overview
description: "Discover the Telerik UI Captcha component for {{ site.framework }} control, and learn how to start using it."
slug: htmlhelpers_captcha_overview
position: 1
---

# {{ site.framework }} Captcha Overview

{% if site.core %}
The Telerik UI Captcha TagHelper and HtmlHelper for {{ site.framework }} are server-side wrappers for the Kendo UI Captcha widget.
{% else %}
The Telerik UI Captcha HtmlHelper for {{ site.framework }} is a server-side wrapper for the Kendo UI DataSource widget.
{% endif %}

The Telerik UI Captcha for {{ site.framework }} is a security measure that prevents automated spam from performing tasks such as form submissions in your {{ site.framework }} application. The widget generates distorted images of letters and numbers that are easily decipherable to humans, but not to automated programs (spam bots). 

* [Demo page for the Captcha HtmlHelper](https://demos.telerik.com/{{ site.platform }}/captcha/index)
{% if site.core %}
* [Demo page for the Captcha TagHelper](https://demos.telerik.com/{{ site.platform }}/captcha/tag-helper)
{% endif %}

## Basic Configuration

The following example demonstrates the basic configuration of the Captcha component. For the full server-side implementation, consider the [Validation article]({% slug htmlhelpers_captcha_validation %}).

```HtmlHelper
    @(Html.Kendo().Captcha()
        .Name("Captcha")
        .Handler(handler => handler.Action("Reset", "Captcha")) // endpoint to return the CAPTCHA 
        .AudioHandlerFunction("audioHandler") // handler to fetch audio representation of the CAPTCHA (if needed)
        .ValidationHandler(handler => handler.Action("Validate", "Captcha")) // enpoint to validate the CAPTCHA
    )
```
{% if site.core %}
```TagHelper
    <kendo-captcha name="Captcha">
        <handler url="@Url.Action("Reset", "Captcha")" />
        <audio-handler function-handler="audioHandler" />
        <validation-handler url="@Url.Action("Validate", "Captcha")" />
    </kendo-captcha>
```
{% endif %}
```JavaScript
    <script>
        function audioHandler(args) {
            args.success("@Url.Action("Audio")?captchaId=" + args.data.captchaId); 
        }
    </script>
```
```C#
public ActionResult Reset()
{
    CaptchaImage newCaptcha = SetCaptchaImage();

    return Json(new CaptchaModel
    {
        Captcha = "./shared/UserFiles/captcha/" + newCaptcha.UniqueId + ".png",
        CaptchaID = newCaptcha.UniqueId
    });
}

public ActionResult Validate(CaptchaModel model)
{
    string text = GetCaptchaText(model.CaptchaID);

    return Json(text ==  model.Captcha.ToUpperInvariant());
}

private string GetCaptchaText(string captchaId)
{
    string text = HttpContext.Session.GetString("captcha_" + captchaId);

    return text;
}
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
{% if site.core %}
* [Basic Usage of the Captcha TagHelper for ASP.NET Core (Demo)](https://demos.telerik.com/aspnet-core/captcha/tag-helper)
{% endif %}
* [Using the API of the Captcha HtmlHelper for {{ site.framework }} (Demo)](https://demos.telerik.com/{{ site.platform }}/captcha/api)
* [Server-Side API](/api/captcha)

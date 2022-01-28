---
title: Overview
page_title: Overview
description: "Discover the Telerik UI Captcha TagHelper for ASP.NET Core (MVC 6 or ASP.NET Core MVC) and learn how to start using it."
slug: taghelpers_captcha_overview
position: 1
---

# Captcha TagHelper Overview

The Telerik UI Captcha for {{ site.framework }} is a security measure that prevent automated spam from performing tasks such as form submissions in your {{ site.framework }} application. The widget generates distorted images of letters and numbers that are easily decipherable to humans, but not to automated programs (spam bots). 

* [Demo page for the Captcha](https://demos.telerik.com/{{ site.platform }}/captcha/tag-helper)

## Basic Configuration

The Captch TagHelper configuration options are passed as attributes of the tag.

```taghelper
<kendo-form name="form" form-data="@Model">
    <form-items>
        <form-item field="UserName"></form-item>
        <form-item field="FirstName"></form-item>
        <form-item field="LastName"></form-item>
        <form-item field="Captcha">
            <captcha-editor datacaptchaidfield="CaptchaID" datacaptchafield="Captcha" captcha-image="@ViewData["Captcha"]" captcha-id="@ViewData["CaptchaID"]">
                <handler url="@Url.Action("Reset")" />
                <validation-handler url="@Url.Action("Validate")" />
                <audio-handler function-handler="audioHandler" />
            </captcha-editor>
        </form-item>
    </form-items>
</kendo-form>
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

>tip To ensure that the server-side image generation and validation is handled by the widget, add the [Telerik UI Captcha server-side provider]({% slug htmlhelpers_captcha_provider %}).

## See Also

* [Basic Usage of the Captcha TagHelper for ASP.NET Core (Demo)](https://demos.telerik.com/aspnet-core/captcha/tag-helper)
* [Server-Side API](/api/captcha)

---
title: Audio Content
page_title: Audio Content
description: "Learn how to configure the audio provider for the Telerik UI Captcha component for {{ site.framework }}."
slug: htmlhelpers_captcha_audio
position: 4
---

# The Captcha Audio

To provide accessibility to visually impaired users, Captcha's distorted image can be represented in an audio format. Every alphanumeric character is read out using the [NATO phonetic alphabet](https://en.wikipedia.org/wiki/NATO_phonetic_alphabet).

By default, an audio button that provides a voice-over for the respective image is rendered next to the Telerik UI Captcha . A slider that allows the user to adjust the volume of the audio is also provided.

## Enabling Captcha Audio

The Telerik UI Catpcha server-side provider creates an audio file based on the content of the image. To enable voice-over of the CAPTCHA in your project:

1. Add the [Telerik UI Captcha server-side provider]({% slug htmlhelpers_captcha_provider %}) to your project.

1. Add the `AudioHandler` option to your Captcha.

    ```HtmlHelper
    @(Html.Kendo().Captcha()
        .Name("Captcha")
        .Handler(handler => handler.Action("Reset", "Captcha"))
        .AudioHandlerFunction("audioHandler")
        // Other options omitted for brevity.
    )
    ```
    {% if site.core %}
    ```TagHelper
    <kendo-captcha name="captcha">
        <handler url="@Url.Action("Reset", "Captcha")" />
        <audio-handler function-handler="audioHandler" />
        // Other options omitted for brevity.
    </kendo-captcha>
    ```
    {% endif %}

1. Send a request to the remote endpoint and include the Captcha's ID as an additional parameter.

    ```
    function audioHandler(args) {
        args.success("@Url.Action("Audio")?captchaId=" + args.data.CaptchaID);
    }
    ```

1. Use the CaptchaHelper.SpeakText() method to create a [wav](https://docs.fileformat.com/audio/wav/) File. Return it to the client-side.
    {% if site.mvc %}
    ```
    public ActionResult Audio(string captchaId)
    {
        CaptchaImage captcha = (CaptchaImage)Session["captcha" + captchaId];

        byte[] bmpBytes;
        
        using (MemoryStream audio = CaptchaHelper.SpeakText(captcha))
        {
            bmpBytes = audio.ToArray();
        }

        return File(bmpBytes, "audio/wav");
    }
    ```
    {% else %}
    ```
    public ActionResult Audio(string captchaId)
    {
        var sessionValue = HttpContext.Session.GetString("captcha_" + captchaId);
        CaptchaImage captcha = JsonConvert.DeserializeObject<CaptchaImage>(sessionValue);

        byte[] bmpBytes;

        using (MemoryStream audio = CaptchaHelper.SpeakText(captcha))
        {
            bmpBytes = audio.ToArray();
        }
        return File(bmpBytes, "audio/wav");
    }
    ```
    {% endif %}

1. The Telerik UI Captcha starts the voice-over of the image after the user clicks the `audio` button.

## See Also

* [Basic Usage of the Captcha HtmlHelper for {{ site.framework }} (Demo)](https://demos.telerik.com/{{ site.platform }}/captcha/index)
{% if site.core %}
* [Basic Usage of the Captcha TagHelper for ASP.NET Core (Demo)](https://demos.telerik.com/aspnet-core/captcha/tag-helper)
{% endif %}
* [Server-Side API](/api/captcha)

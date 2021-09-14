---
title: Audio Content
page_title: Audio Content
description: "Learn how to configure the audio provider for the Kendo UI Captcha."
slug: audio_kendoui_captcha_widget
position: 4
---

# The Captcha Audio

To provide accessibility to visually impaired users, Captcha's distorted image can be represented in an audio format. Every alphanumeric character is read out using the [NATO phonetic alphabet](https://en.wikipedia.org/wiki/NATO_phonetic_alphabet).

By default, an audio button that provides a voice-over for the respective image is rendered next to the Captcha. A slider that allows the user to adjust the volume of the audio is also provided.

## Enabling Captcha Audio

The Kendo UI Captcha server-side provider creates an audio file based on the content of the image. To enable voice-over of the Captcha in your project:

1. Add the [Captcha server-side provider]({% slug provider_kendoui_captcha_widget %}) to your project.

1. Add the `AudioHandler` option to your Captcha and send a request to the remote endpoint and include the Captcha's ID as an additional parameter.

    ```
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
        });
        
    </script>
    ```

1. Use the `CaptchaHelper.SpeakText()` method to create a [`wav`](https://docs.fileformat.com/audio/wav/) File. Return it to the client-side.

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

1. The Kendo UI Captcha starts the voice-over of the image after the user clicks the **Audio** button.

## See Also

* [Overview of the Kendo UI Captcha](https://demos.telerik.com/kendo-ui/captcha/index)
* [JavaScript API Reference of the Captcha](/api/javascript/ui/captcha)

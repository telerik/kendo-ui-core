---
title: Validation
page_title: Validation
description: "Learn how to configure the server-side validation when using the jQuery Captcha by Kendo UI."
components: ["captcha"]
slug: validation_kendoui_captcha_widget
position: 3
---

# Captcha Validation Setup

This article explains how to use your application's backend to verify the user's response to the Kendo UI Captcha. 

Always generate the Captcha and apply the validation on the server-side of your application. This approach guarantees that no programs or bots can access the values of the Captcha on the client-side through JavaScript and then bypass the validation.

> To proceed with the tutorial below, make sure that the [Captcha Server-side Provider]({% slug provider_kendoui_captcha_widget %}) is added and referenced in your project.

## Getting Started

To generate Captchas and validate the user's input, the Kendo UI Captcha depends on the following main options:

* `Handler`&mdash;Sets the URL handler, function, or action configuration that fetches the generated image.
* `AudioHandler`&mdash;Sets the URL handler, function, or action configuration that fetches the generated audio.
* `ValidationHandler`&mdash;Sets the URL handler, function, or action configuration that can validate the captcha remotely.

1. To generate a new Captcha, use the `GetNewCaptcha()` method of the `CaptchaHelper`. Save the Captcha to a Session.

    ```
     public ActionResult Reset()
    {
        CaptchaImage newCaptcha = CaptchaHelper.GetNewCaptcha();

        Session["captcha" + newCaptcha.UniqueId] = newCaptcha;

        return Json(new
        {
            captcha = Url.Action("image", "captcha", new { captchaId = newCaptcha.UniqueId }),
            captchaId = newCaptcha.UniqueId
        }, JsonRequestBehavior.AllowGet);
    }

    public ActionResult Image(string captchaId)
    {
        CaptchaImage captcha = (CaptchaImage)Session["captcha" + captchaId];
        var image = CaptchaHelper.RenderCaptcha(captcha);
        byte[] bmpBytes;

        using (MemoryStream ms = new MemoryStream())
        {
            image.Save(ms, ImageFormat.Png);
            bmpBytes = ms.ToArray();
        }

        return File(bmpBytes, "image/png");
    }
    ```

1. Introduce the Kendo UI for jQuery Captcha:

    ```
        <input id="captcha" />
    
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

1. Add the server-side validation handler for the Captcha:

    ```
    public ActionResult Validate(CaptchaModel model)
    {
        string text = GetCaptchaText(model.CaptchaID);

        return Json(text ==  model.Captcha.ToUpperInvariant());
    }
    ```
## Form Integration

For a complete example of the Captcha integration within a form, check out the [Overview demo](https://demos.telerik.com/kendo-ui/captcha/index).

## See Also

* [Form Integration of the Kendo Captcha](https://demos.telerik.com/kendo-ui/captcha/index)
* [JavaScript API Reference of the Captcha](/api/javascript/ui/captcha)

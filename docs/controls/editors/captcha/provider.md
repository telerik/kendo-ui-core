---
title: Captcha Server-side Provider
page_title: Captcha Server-side Provider
description: "Learn how to configure the server-side provider for the Kendo UI Captcha."
slug: provider_kendoui_captcha_widget
position: 2
---

# The Captcha Provider

This article explains how to set up the server-side provider for the Kendo UI Captcha. The provider generates and validates Captchas through helper classes and methods.

The following list provides information about the default requests and responses for the reset, audio, and validate operations.

* `reset`&mdash;Makes a GET request to the server to generate a new Captcha image. The response contains the new captcha image (in the snippet below - an endpoint that returns the new image) and the `captchaId`.

    ```
    {captcha: "/kendo-ui-dev/captcha/image?captchaid=36967dc7-0ae1-4175-9bb7-9d7f34409889", captchaId: "36967dc7-0ae1-4175-9bb7-9d7f34409889"}
    ```

* `audio`&mdash;Makes a GET request containing the captchaId. The response from the server does not contain any parameters. Instead, an audio representation of the Captcha image begins.

* `validate`&mdash;Makes a GET request containing the captchaId and the text which the user has typed in the input field. If the input text matches the image text, the response is `true`. If the input text doesn't match the image text, the response is `false`.

## Setup

The server-side Kendo UI Captcha provider comes with the **Telerik.Web.Captcha** NuGet package. 

To install the **Telerik.Web.Captcha** NuGet package:

1. Right-click the project and select **Manage NuGet Packages..**.
1. Make sure that the private [Telerik UI NuGet feed](https://docs.telerik.com/kendo-ui/intro/installation/nuget-install#adding-the-feed-with-nuget-package-manager) is configured.
1. Search for and install the **Telerik.Web.Captcha** NuGet package.

In the C# backend file or controller, add references to the following namespaces:

```
    using System;
    using System.Drawing.Imaging;
    using System.IO;
    using System.Web.Mvc;
    using Telerik.Web.Captcha;
```

The code snippet below shows a basic setup for the controller with the necessary endpoints for the Captcha:

```
using System.Drawing.Imaging;
using System.IO;
using System.Web.Mvc;
using Telerik.Web.Captcha;

namespace Kendo.Controllers
{
    public class CaptchaController : Controller
    {
        
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

        public ActionResult Validate(string captchaId, string captcha)
        {
            CaptchaImage captchaImage = (CaptchaImage)Session["captcha" + captchaId];

            return Json(CaptchaHelper.Validate(captchaImage, captcha.ToUpperInvariant()), JsonRequestBehavior.AllowGet);
        }


    }
}
```

## See Also

* [Overview of the Kendo UI for jQuery Captcha Demo](https://demos.telerik.com/kendo-ui/captcha/index)
* [Using the API of the Captcha](https://demos.telerik.com/kendo-ui/captcha/api)
* [JavaScript API Reference of the Captcha](/api/javascript/ui/captcha)

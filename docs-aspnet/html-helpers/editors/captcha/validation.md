---
title: Validation
page_title: Validation
description: "Learn how to configure the server-side validation when using the Telerik UI Captcha component for {{ site.framework }}."
slug: htmlhelpers_captcha_validation
position: 3
---

# Captcha Validation Setup

This article explains how to use your application's backend to verify the user's response to the Telerik UI Captcha. 

Always generate the CAPTCHA and apply the validation on the server-side of your application. This approach guarantees that no programs or bots can access the values of the CAPTCHA on the client-side via JavaScript and then bypass the validation.

> To proceed with the tutorial below, make sure that the [Captcha Server-side Provider]({% slug htmlhelpers_captcha_provider %}) is added and referenced in your project.

## Getting Started

To generate CAPTCHAs and validate the user's input, the Telerik UI Captcha depends on the following main options:

* `Handler`&mdash;Sets the URL handler, function, or action configuration that fetches the generated image.
* `AudioHandler`&mdash;Sets the URL handler, function, or action configuration that fetches the generated audio.
* `ValidationHandler`&mdash;Sets the URL handler, function, or action configuration that can validate the captcha remotely.

1. To generate a new CAPTCHA, use the `GetNewCaptcha()` method of the `CaptchaHelper`. Save the CAPTCHA to a Session.

    {% if site.core %}

    ```
    private void GenerateNewCaptcha()
    {
        CaptchaImage captchaImage = SetCaptchaImage();

        ViewData["Captcha"] = "./shared/UserFiles/captcha/" + captchaImage.UniqueId + ".png";
        ViewData["CaptchaID"] = captchaImage.UniqueId;
    }

    private CaptchaImage SetCaptchaImage()
    {
        CaptchaImage newCaptcha = CaptchaHelper.GetNewCaptcha();

        MemoryStream audio = CaptchaHelper.SpeakText(newCaptcha);
        using (FileStream file = new FileStream(Path.Combine(CaptchaPath, newCaptcha.UniqueId + ".wav"), FileMode.Create, FileAccess.Write))
        {
            audio.WriteTo(file);
        }

        var image = CaptchaHelper.RenderCaptcha(newCaptcha);
        image.Save(Path.Combine(CaptchaPath, newCaptcha.UniqueId + ".png"), ImageFormat.Png);

        var key = newCaptcha.UniqueId;
        var value = JsonConvert.SerializeObject(newCaptcha);
        HttpContext.Session.SetString("captcha_" + key, value);

        return newCaptcha;
    }
    ```

    {% else %}

    ```
    private void GenerateNewCaptcha()
    {
        CaptchaImage captchaImage = CaptchaHelper.GetNewCaptcha();

        Session["captcha" + captchaImage.UniqueId] = captchaImage;

        ViewData["Captcha"] = Url.Action("image", "captcha", new { captchaId = captchaImage.UniqueId });
        ViewData["CaptchaID"] = captchaImage.UniqueId;
    }
    ```

    {% endif %}

    >tip Generate the CAPTCHA in the `ActionMethod` that returns the Razor View. If the CAPTCHA is used in multiple Razor Views, generate it in the Controller's constructor.

    {% if site.core %}

    ```Controller
    public ActionResult Index(UserViewModel user, CaptchaModel captchaModel)
    {
        if (string.IsNullOrEmpty(captchaModel.CaptchaID))
        {
            GenerateNewCaptcha();
            return View();
        }
        else
        {
            string text = GetCaptchaText(captchaModel.CaptchaID);

            if (text == captchaModel.Captcha.ToUpperInvariant())
            {
                ModelState.Clear();
                GenerateNewCaptcha();
            }
        }

        return View(user);
    }

    ```

    {% else %}

    ```Controller
    public ActionResult Index(UserViewModel user, CaptchaModel captchaModel)
    {
        if (string.IsNullOrEmpty(captchaModel.CaptchaID))
        {
            GenerateNewCaptcha();
        }
        else
        {
            CaptchaImage captchaImage = (CaptchaImage)Session["captcha" + captchaModel.CaptchaID];

            if (captchaImage != null && CaptchaHelper.Validate(captchaImage, captchaModel.Captcha.ToUpperInvariant()))
            {
                ModelState.Clear();
                GenerateNewCaptcha();
            }
        }

        return View();
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

    {% endif %}

    ```CaptchaModel.cs
    public class CaptchaModel
    {
        private string _captchaValue;
        public string Captcha {
            get
            {
                return string.IsNullOrEmpty(_captchaValue) ? "" : _captchaValue;
            }
            set
            {
                _captchaValue = value;
            }
        }
        public string CaptchaID { get; set; }
    }
    ```

1. Introduce the Telerik UI Captcha in a Razor View:

    ```HtmlHelper
    @(Html.Kendo().Captcha()
        .Name("Captcha")
        .CaptchaImage((string)ViewData["Captcha"])
        .CaptchaId((string)ViewData["CaptchaID"])
        .DataCaptchaField("Captcha") // The field containing the Captcha from the server-side should be called Captcha.
        .DataCaptchaIdField("CaptchaID") // The field containing the Captcha's ID from the server-side should be called CaptchaID.
        .Handler(handler => handler.Action("Reset", "Captcha"))
        .AudioHandlerFunction("audioHandler")
        .ValidationHandler(handler => handler.Action("Validate", "Captcha"))
        .ValidateOnBlur(true)
    )
    ```
    {% if site.core %}
    ```TagHelper
    <kendo-captcha name="Captcha" 
                   captcha-image="@ViewData["Captcha"]"
                   captcha-id="@ViewData["CaptchaID"]"
                   datacaptchafield="Captcha"
                   datacaptchaidfield="CaptchaID"
                   validate-on-blur="true">
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

1. Add the server-side handlers for the Captcha:

    {% if site.core %}

    ```
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
    ```

    {% else %}

    ```
    public ActionResult Reset()
    {
        CaptchaImage newCaptcha = CaptchaHelper.GetNewCaptcha();
        
        Session["captcha" + newCaptcha.UniqueId] = newCaptcha;

        return Json(new CaptchaModel
        {
            Captcha = Url.Action("image", "captcha", new { captchaId = newCaptcha.UniqueId }),
            CaptchaID = newCaptcha.UniqueId
        }, JsonRequestBehavior.AllowGet);
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

    public ActionResult Validate(CaptchaModel model)
    {
        CaptchaImage captchaImage = (CaptchaImage)Session["captcha" + model.CaptchaID];

        return Json(CaptchaHelper.Validate(captchaImage, model.Captcha.ToUpperInvariant()), JsonRequestBehavior.AllowGet);
    }
    ```

    >If you don't set the `CaptchaImage` and `CaptchaId` options, the widget will not have an image preloaded. When initialized, it will fetch the image from the `Handler()` option.

    {% endif %}

    >If you omit to set the `CaptchaImage` and `CaptchaId` options, the widget will not have an image preloaded. When initialized, it will fetch the image from the `Handler()` option.

    {% if site.core %}

    >tip Instead of the **ViewData**, you could use the [page's model](https://docs.microsoft.com/en-us/aspnet/core/mvc/views/overview?view=aspnetcore-5.0#passing-data-to-views).

    {% else %}

    >tip Instead of the **ViewData**, you could use the [page's model](https://docs.microsoft.com/en-us/aspnet/mvc/overview/getting-started/introduction/accessing-your-models-data-from-a-controller#strongly-typed-models-and-the--keyword).

    {% endif %}

## Form Integration

The Telerik UI Captcha for {{ site.framework }} prevents automated programs from performing tasks such as form submissions. If the user does not enter the text from the CAPTCHA image correctly, a validation error is shown and the form submission is aborted.

1. Create a form and add the Telerik UI Captcha.

    ```HtmlHelper
    @model UserViewModel

    <form id="form" method="POST">
        @(Html.Kendo().TextBoxFor(m => m.UserName))
        @(Html.Kendo().TextBoxFor(m => m.FirstName))
        @(Html.Kendo().TextBoxFor(m => m.LastName))
        @(Html.Kendo().Captcha()
            .Name("Captcha")
            .CaptchaImage((string)ViewData["Captcha"])
            .CaptchaId((string)ViewData["CaptchaID"])
            .DataCaptchaField("Captcha")
            .DataCaptchaIdField("CaptchaID")
            .Handler(handler => handler.Action("Reset", "Captcha"))
            .AudioHandlerFunction("audioHandler")
            .ValidationHandler(handler => handler.Action("Validate", "Captcha"))
        )
        @(Html.Kendo().Button()
            .Name("Submit")
            .Content("Submit")
            .HtmlAttributes(new { type="submit" })
        )
    </form>
    ```
    {% if site.core %}
    ```TagHelper
    @model UserViewModel

    <form id="form" method="POST">
        <kendo-textbox for="@Model.UserName"></kendo-textbox>
        <kendo-textbox for="@Model.FirstName"></kendo-textbox>
        <kendo-textbox for="@Model.LastName"></kendo-textbox>

        <kendo-captcha name="Captcha"
                       captcha-image="@ViewData["Captcha"]"
                       captcha-id="@ViewData["CaptchaID"]"
                       datacaptchafield="Captcha"
                       datacaptchaidfield="CaptchaID">
            <handler url="@Url.Action("Reset", "Captcha")" />
            <audio-handler function-handler="audioHandler" />
            <validation-handler url="@Url.Action("Validate", "Captcha")" />
        </kendo-captcha>

        <kendo-button name="Submit" type="submit">
            Submit
        </kendo-button>
    </form>
    ```
    {% endif %}

1. Instantiate a Telerik UI Validator from the form inside the [document.ready() event](https://learn.jquery.com/using-jquery-core/document-ready/). 

    {% if site.core %}
    ```
    <script>
        $(document).on("kendoReady", function () {
            $("#form").kendoValidator();
        });
        function audioHandler(args) {
            args.success("./shared/UserFiles/captcha/" + args.data.CaptchaID + ".wav");
        }
    </script>
    ```
    {% else %}
    ```
    <script>
        $(document).on("kendoReady", function() {
            $("#form").kendoValidator();
        });
        function audioHandler(args) {
            args.success("@Url.Action("Audio")?captchaId=" + args.data.CaptchaID);
        }
    </script>
    ```
    {% endif %}

> If the state of the Telerik UI Captcha is invalid, the Validator prevents the form submission and shows an error message to the user. 

## See Also

* [Form Integration of the Captcha HtmlHelper for {{ site.framework }} (Demo)](https://demos.telerik.com/{{ site.platform }}/captcha/index)
* [Server-Side API](/api/captcha)

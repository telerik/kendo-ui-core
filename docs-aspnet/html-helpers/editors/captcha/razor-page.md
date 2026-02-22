---
title: Razor Pages
page_title: Razor Pages
description: "An example on how to configure the Telerik UI Captcha component for {{ site.framework }} in a Razor Page."
components: ["captcha"]
slug: htmlhelpers_captcha_razorpage_aspnetcore
position: 8
---

# Captcha in Razor Pages

This article describes how to seamlessly integrate and configure the Telerik UI Captcha for {{ site.framework }} in Razor Pages applications.

@[template](/_contentTemplates/core/razor-pages-general-info.md#referencing-handler-methods)

## Getting Started

To set up the Captcha for a Razor Pages scenario, you need to configure the server-side handler methods that will validate the user's input. The URL in these methods must refer to the name of the `PageModel`. From there, to further configure your application's backend, refer to the [Validation](https://docs.telerik.com/aspnet-core/html-helpers/editors/captcha/validation) article.

```HtmlHelper
    @page
    @model CaptchaIndexModel

    @inject Microsoft.AspNetCore.Antiforgery.IAntiforgery Xsrf

    @{
        var token = Xsrf.GetAndStoreTokens(HttpContext).RequestToken;
    }

    @(Html.Kendo().Form<OrderViewModel>()
            .Name("formExample")
            .FormData(Model.Order)
            .HtmlAttributes(new { method = "POST" })
            .Validatable(v =>
            {
                v.ValidateOnBlur(true);
                v.ValidationSummary(true);
                v.ErrorTemplate("<span style='color: red'>#:message#</span>");
            })
            .Items(items =>
            {
                items.AddAntiForgeryToken(Html.AntiForgeryToken());
                items.Add()
                    .Field(f => f.ShipName)
                    .Label(l => l.Text("Ship Name:"))
                    .Hint("Hint: Ship Name must be at least 5 characters long to pass server validation rules");
                items.Add()
                    .Field(f => f.ShipCity)
                    .Label(l => l.Text("Ship City"));
                items.Add()
                    .Field(f => f.OrderDate)
                    .Editor(e => e.DatePicker())
                    .Label(l => l.Text("Order Date:"));
                items.Add()
                    .Field(f => f.Freight)
                    .Editor(e => e.NumericTextBox())
                    .Label(l => l.Text("Freight:"));
                items.Add()
                    .Field("Captcha")
                    .Editor(ed => ed.Captcha()
                        .CaptchaImage((string)ViewData["Captcha"])
                        .CaptchaId((string)ViewData["CaptchaID"])
                        .DataCaptchaField("Captcha")
                        .DataCaptchaIdField("CaptchaID")
                        .Handler(handler => handler.Url(Url.Page("CaptchaIndex", "Reset")))
                        .AudioHandlerFunction("audioHandler")
                        .ValidationHandler(handler => handler.Url(Url.Page("CaptchaIndex", "Validate")))
                    );
            })
    )
```
```JS Script.js
    <script>
        function audioHandler(args) {
            args.success("../shared/UserFiles/Folders/captcha/" + args.data.CaptchaID + ".wav");
        }
    </script>
```
```C# PageModel
    public class CaptchaIndexModel : PageModel
    {
        [BindProperty]
        public OrderViewModel Order { get; set; }

        protected readonly IWebHostEnvironment HostingEnvironment;
        protected string CaptchaPath { get; set; }

        public CaptchaIndexModel(IWebHostEnvironment hostingEnvironment)
        {
            HostingEnvironment = hostingEnvironment;

            var captchaFilePath = Path.Combine("shared", "UserFiles", "Folders", "Captcha");
            CaptchaPath = $"{HostingEnvironment.WebRootPath}\\{captchaFilePath}";
        }

        public void OnGet(CaptchaModel captchaModel)
        {
            if (string.IsNullOrEmpty(captchaModel.CaptchaID))
            {
                GenerateNewCaptcha();
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
            if (Order == null)
            {
                Order = new OrderViewModel();
            }
        }
        public ActionResult OnPost()
        {
            if (!ModelState.IsValid)
            {
                return Page();
            }

            return RedirectToPage("Success");
        }
        public ActionResult OnGetReset()
        {
            CaptchaImage newCaptcha = SetCaptchaImage();

            return new JsonResult(new CaptchaModel
            {
                Captcha = "../shared/UserFiles/Folders/Captcha/" + newCaptcha.UniqueId + ".png",
                CaptchaID = newCaptcha.UniqueId
            });
        }

        public ActionResult OnGetValidate(CaptchaModel model)
        {
            string text = GetCaptchaText(model.CaptchaID);

            return new JsonResult(text == model.Captcha.ToUpperInvariant());
        }
        private void GenerateNewCaptcha()
        {
            CaptchaImage captchaImage = SetCaptchaImage();

            ViewData["Captcha"] = Url.Content("~/shared/UserFiles/Folders/Captcha/" + captchaImage.UniqueId + ".png");
            ViewData["CaptchaID"] = captchaImage.UniqueId;
        }

        private string GetCaptchaText(string captchaId)
        {
            string text = HttpContext.Session.GetString("captcha_" + captchaId);

            return text;
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

            HttpContext.Session.SetString("captcha_" + newCaptcha.UniqueId, newCaptcha.Text);

            return newCaptcha;
        }
    }
```

For the complete project, refer to the [Captcha in Razor Pages example](https://github.com/telerik/ui-for-aspnet-core-examples/blob/master/Telerik.Examples.RazorPages/Telerik.Examples.RazorPages/Pages/Captcha/CaptchaIndex.cshtml).

## See Also

* [Using Telerik UI for ASP.NET Core in Razor Pages](https://docs.telerik.com/aspnet-core/getting-started/razor-pages#using-telerik-ui-for-aspnet-core-in-razor-pages)
* [Client-Side API of the Captcha](https://www.telerik.com/kendo-jquery-ui/documentation/api/javascript/ui/captcha)
* [Server-Side HtmlHelper API of the Captcha](/api/captcha)
* [Server-Side TagHelper API of the Captcha](/api/taghelpers/captcha)
* [Knowledge Base Section](/knowledge-base)

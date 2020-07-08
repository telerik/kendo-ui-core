---
title:  Razor Page
page_title: Configure a Form in a Razor Page.
description: "An example on how to configure the Telerik UI Form HtmlHelper for {{ site.framework }} in a Razor Page."
slug: htmlhelpers_form_razorpage_aspnetcore
position: 7
---

# Razor Page

This article describes how to configure the Telerik UI Form HtmlHelper for {{ site.framework }} in a RazorPage scenario.

When a complex model is used, which is the case with the Razor Page scenario, the Form needs to have the FormData configuration set. As the Form makes a POST request antiforgery token needs to be added. This can be achieved, for example, by setting the request headers in the ajax beforeSend configuration option.

See the implementation details in the example below, and for the full project with RazorPages examples, visit our [GitHub repository](https://github.com/telerik/ui-for-aspnet-core-examples/tree/master/Telerik.Examples.RazorPages).

```tab-RazorPage(csthml)
    @inject Microsoft.AspNetCore.Antiforgery.IAntiforgery Xsrf
    @Html.AntiForgeryToken()

    @(Html.Kendo().Form<OrderViewModel>()
        .Name("formExample")
        .FormData(Model.Order)
        .Layout("grid")
        .Grid(g => g.Cols(2).Gutter(20))
        .HtmlAttributes(new { url = @Url.Page("FormIndex", "Submit"), method = "POST" })
        .Validatable(v =>
        {
            v.ValidateOnBlur(true);
        })
        .Items(items =>
        {
            items.Add()
                .Field(f => f.ShipName)
                .Label(l => l.Text("Ship Name:"));
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
        })
        .Events(ev => ev.Submit("onFormSubmit"))
)

    <script>
        function forgeryToken() {
            return kendo.antiForgeryTokens();
        }

        function onFormSubmit(e) {
            e.preventDefault();

            var form = $("#formExample");
            $.ajax({
                type: 'POST',
                url: "@Url.Page("FormIndex","Submit")",
                beforeSend: function (xhr) {
                    xhr.setRequestHeader("RequestVerificationToken",
                        $('input:hidden[name="__RequestVerificationToken"]').val());
                },
                data: form.serialize(),
                dataType: 'json'
            });
        }
    </script>
```
```tab-PageModel(cshtml.cs)
    public class FormIndexModel : PageModel
    {
        public OrderViewModel Order = new OrderViewModel();
        
        public void OnGet()
        {

        }

        public IActionResult OnPostSubmit(OrderViewModel model)
        {
            if (!ModelState.IsValid)
            {
                return Page();
            }
            return new JsonResult(new { success = "Form Posted Successfully" });
        }
    }
```

## See Also

* [Razor Pages Support]({% slug razor_pages_integration_aspnetmvc6_aspnetmvc %})
* [Form Overview]({% slug htmlhelpers_form_aspnetcore_overview %})

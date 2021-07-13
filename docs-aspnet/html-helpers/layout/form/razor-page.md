---
title:  Razor Page
page_title: Configure a Form in a Razor Page.
description: "An example on how to configure the Telerik UI Form HtmlHelper for {{ site.framework }} in a Razor Page."
slug: htmlhelpers_form_razorpage_aspnetcore
position: 7
---

# Razor Page

This article describes how to configure the Telerik UI Form HtmlHelper for {{ site.framework }} in a RazorPage scenario.

When a complex model is used, which is the case with the Razor Page scenario, the Form needs to have the FormData configuration set. As the Form makes a POST request antiforgery token needs to be added. This can be achieved, for example, by appending a hidden input to the Form.

## Standard Form Submit

By default, when the View containing the Form is loaded, clicking on the Submit button will fire the client-side validation of the Form component. Once all of the Form fields are filled and the user clicks on the Submit button the form will be submitted and the page will reload to display the server validation messages from the page model, if any.

See the implementation details in the example below, and for the full project with RazorPages examples, visit our [GitHub repository](https://github.com/telerik/ui-for-aspnet-core-examples/tree/master/Telerik.Examples.RazorPages).

```tab-RazorPage(csthml)
    @inject Microsoft.AspNetCore.Antiforgery.IAntiforgery Xsrf
    @{
        var token = Xsrf.GetAndStoreTokens(HttpContext).RequestToken;
    }

    @(Html.Kendo().Form<OrderViewModel>()
            .Name("formExample")
            .FormData(Model.Order)
            .Layout("grid")
            .Grid(g => g.Cols(2).Gutter(20))
            .HtmlAttributes(new { method = "POST" })
            .Validatable(v =>
            {
                v.ValidateOnBlur(false);
                v.ValidationSummary(true);
                v.ErrorTemplate("<span style='color: red'>#:message#</span>");
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
    )

    <script>
        $("#formExample").append($("<input type='hidden' name='__RequestVerificationToken' value='@token' data-stop='true' />"))
    </script>
```
```tab-PageModel(cshtml.cs)
    [BindProperty]
    public OrderViewModel Order { get; set; }

    public void OnGet()
    {
        if (Order == null)
        {
            Order = new OrderViewModel();
        }
    }

    public IActionResult OnPost()
    {
        var model = Request.Form;

        if (!ModelState.IsValid)
        {
            return Page();
        }

        return RedirectToPage("Success");

    }
```

## Submitting the Form with Ajax

When the Form is submitted with ajax, the default submit event of the component is prevented, thus forcing the manual implementation of the submit behavior. In this case, an ajax request is sent to a specific end-point on Submit click, without reloading the page and client-side validation will work as expected. However, for server validation, as the page is not reloaded and the page model data is not changed, the Telerik Validator attached to the Form has no way of knowing what the server response is. For this reason, the ajax request callback can be used to notify the user of the status of the server validation. If the server end-point is returning validation errors related to the Form fields the error callback can be used to iterate over the response errors and create a visual representation in the UI. In a similar way the success callback can be used to notify the user of a succesful Form submission.

See the implementation details in the example below, where the JSON errors are appended to the validation summary and it is toggled it in the ajax success and error callbacks. For the full project with RazorPages examples, visit our [GitHub repository](https://github.com/telerik/ui-for-aspnet-core-examples/tree/master/Telerik.Examples.RazorPages).

```tab-RazorPage(csthml)
    @inject Microsoft.AspNetCore.Antiforgery.IAntiforgery Xsrf
    @{
        var token = Xsrf.GetAndStoreTokens(HttpContext).RequestToken;
    }
    <div id="validation-success"></div>
    @(Html.Kendo().Form<OrderViewModel>()
            .Name("formExample")
            .FormData(Model.Order)
            .Layout("grid")
            .Grid(g => g.Cols(2).Gutter(20))
            .HtmlAttributes(new { method = "POST" })
            .Validatable(v =>
            {
                v.ValidateOnBlur(false);
                v.ValidationSummary(true);
                v.ErrorTemplate("<span style='color: red'>#:message#</span>");
            })
            .Items(items =>
            {
                items.Add()
                    .Field(f => f.ShipName)
                    .Label(l => l.Text("Ship Name:"))
                    .Hint("Hint: Entering Ship Name other than \"John Doe\" will cause the server validation to fail");
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
            .Events(ev => ev.Submit("onFormSubmit").Clear("onFormClear"))
    )

    <script>
        function onFormClear(e) {
            $("#validation-success").html("");
        };

        function onFormSubmit(ev) {
            ev.preventDefault();

            var modelData = ev.model;
            modelData.OrderDate = modelData.OrderDate.toJSON();

            $.ajax({
                type: 'POST',
                url: "@Url.Page("FormAjaxSubmit","Submit")",
                beforeSend: function (xhr) {
                    xhr.setRequestHeader("RequestVerificationToken",
                        $('input:hidden[name="__RequestVerificationToken"]').val());
                },
                data: modelData,
                dataType: 'json',
                success: function (data) {
                    var form = $("#formExample").getKendoForm();

                    form.validator.validationSummary.find("ul").empty();
                    form.validator.validationSummary.addClass("k-hidden");
                    $("#validation-success").html("<div class='k-messagebox k-messagebox-success'>" + data.success + "</div>");
                },
                error: function (data) {
                    var response = JSON.parse(data.responseText);
                    var form = $("#formExample").getKendoForm();
                    var errorString = "";

                    $.each(response.errors, function (key, value) {
                        errorString += '<li>' + value + '</li>';
                    });

                    $("#validation-success").html("");
                    form.validator.validationSummary.find("ul").empty();
                    form.validator.validationSummary.find("ul").append(errorString);
                    form.validator.validationSummary.toggleClass("k-hidden");
                }
            })
        };

        $("#formExample").append($("<input type='hidden' name='__RequestVerificationToken' value='@token' data-stop='true' />"))
    </script>
```
```tab-PageModel(cshtml.cs)
    [BindProperty]
    public OrderViewModel Order { get; set; }

    public void OnGet()
    {
        if (Order == null)
        {
            Order = new OrderViewModel();
        }
    }

    public IActionResult OnPostSubmit(OrderViewModel model)
    {
        //handle server validation and add model errors to be returned to the View
        if (model.ShipName != "John Doe")
        {
            ModelState.AddModelError("ShipName", "Ship Name is incorrect");
        }

        if (!ModelState.IsValid)
        {
            var errorList = (from item in ModelState
                                where item.Value.Errors.Any()
                                select item).ToDictionary(
                                kvp => kvp.Key,
                                kvp => kvp.Value.Errors.Select(e => e.ErrorMessage).FirstOrDefault()
                            );

            Response.StatusCode = 400;
            return new JsonResult(new { errors = errorList });
        }
        return new JsonResult(new { success = "Form Posted Successfully" });

    }
```

## See Also

* [Razor Pages Support]({% slug razor_pages_integration_aspnetmvc6_aspnetmvc %})
* [Form Overview]({% slug htmlhelpers_form_aspnetcore_overview %})

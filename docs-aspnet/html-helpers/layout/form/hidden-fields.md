---
title: Hidden Fields
page_title: Hidden Fields
description: "Get started with the Telerik UI Form HtmlHelper for {{ site.framework }} and learn how to set hidden fields."
slug: htmlhelpers_form_aspnetcore_hiddenfields
position: 8
---

# Hidden Fields

The Telerik ASP.NET {{ site.framework }} Form component provides built-in support for hidden fields. You can use this feature to perform a number of actions such as hiding the `ID` property.

The following example demonstrates how to configure a Form with two visible and one hidden field (`UserID`).

```Razor
       @(Html.Kendo().Form<Kendo.Mvc.Examples.Models.Form.UserViewModel>()
        .Name("formExample")
        .HtmlAttributes(new { action = "Index", method = "POST" })
        .Validatable(v =>
        {
            v.ValidateOnBlur(true);
            v.ValidationSummary(vs => vs.Enable(false));
        })
        .Items(items =>
        {
        items.AddGroup()
            .Label("Sign up form")
            .Items(i =>
            {
            i.Add()
                .Field(f => f.UserID)
                .Editor(editor => editor.Hidden());
            i.Add()
                .Field(f => f.UserName)
                .Label(l => l.Text("Username:"));
            i.Add()
                .Field(f => f.Password)
                .Label(l => l.Text("Password:"))
                .EditorTemplateHandler("setPasswordEditor");
            i.Add()
                .Field(f => f.Email)
                .Label(l => l.Text("Email:"));
            });
        })
    )
```

To add support for the `HiddenInput` attribute, use the following implementation:

```Model
        [HiddenInput]
        public int UserID
        {
            get;
            set;
        }
```

```View
    @(Html.Kendo().Form<Kendo.Mvc.Examples.Models.Form.UserViewModel>()
        .Name("formExample")
        .HtmlAttributes(new { action = "Index", method = "POST" })
        .Items(items =>
        {
            items.Add()
                .Field(model => model.UserID);
        })
    )
```
{% if site.core %}
To add a method for enabling the injection of the `AntiForgeryToken` input in:

```Razor
   @(Html.Kendo().Form<Kendo.Mvc.Examples.Models.Form.UserViewModel>()
       .Name("formExample")
       .HtmlAttributes(new { action = "Index", method = "POST" })
       .Items(items =>
       {
           items.AddAntiForgeryToken(Html.AntiForgeryToken());
       })
   )
```
{% else %}
To add a method for enabling the injection of the `AntiForgeryToken` input in:

```Razor
   @(Html.Kendo().Form<Kendo.Mvc.Examples.Models.Form.UserViewModel>()
       .Name("formExample")
       .HtmlAttributes(new { action = "Index", method = "POST" })
       .Items(items =>
       {
           items.AddAntiForgeryToken();
       })
   )
```
{% endif %}

## See Also

* [Hidden Fields Demo of the Form HtmlHelper for {{ site.framework }}](https://demos.telerik.com/{{ site.platform }}/form/hidden-fields)
* [Server-Side API](/api/form)

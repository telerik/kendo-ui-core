---
title: Validating Properties Decorated with the Compare Attribute?
description: "An example on how to validate fields decorated with the Compare attribute when working with the {{ site.product }} Form component."
type: how-to
page_title: Validate a Model Property Decorated with the Compare Attribute
slug: validate-compare-attribute
tags: form, validate, compare, attribute, validator, client, unobtrusive
ticketid: 1584229
res_type: kb
---

## Environment
<table>
	<tbody>
		<tr>
			<td>Product Version</td>
			<td>2022.3.913</td>
		</tr>
		<tr>
			<td>Product</td>
			<td>Form for {{ site.product }}</td>
		</tr>
	</tbody>
</table>

## Description

How can I validate properties decorated with the `Compare` attribute when using the Form? For example:

```csharp
    public class User
    {
        [Display(Name = "UserName")]
        public string UserName { get; set; }

        [Required]
        [Display(Name = "Password")]
        [DataType(DataType.Password)]
        [StringLength(20, ErrorMessage = "The {0} must be at least {2} characters long.", MinimumLength = 8)]
        public string? Password { get; set; };

        [Required]
        [Display(Name = "Confirm Password")]
        [DataType(DataType.Password)]
        [NotMapped]
        [Compare("Password", ErrorMessage = "Passwords did not match.")]
        public string? ConfirmPassword { get; set; }
    }
```

## Solution

You can achieve this by extending the Form's built-in Kendo Validator:
```View
    @(Html.Kendo().Form<User>()
        .Name("myForm")
        .HtmlAttributes(new { action = @Url.Action("MyAction","MyController"), method = "POST" })
        .Validatable(v=>v.ValidateOnBlur(true))
        .Items(items => {
                items.Add().Field(f => f.UserName);
                items.Add().Field(f => f.Password);
                items.Add().Field(f => f.ConfirmPassword);
            })
        )
    <script>
        (function ($, kendo) {
        $.extend(true, kendo.ui.validator, {
            rules: {
                equalto: function (input) {
                    if (input.filter("[data-val-equalto-other]").length) {
                        var otherField = input.attr("data-val-equalto-other");
                        otherField = otherField.substr(otherField.lastIndexOf(".") + 1);

                        return input.val() == $("#" + otherField).val();
                    }
                    return true;
                }
            },
            messages: {
                equalto: function (intput) {
                    return intput.attr("data-val-equalto");
                }
            }
        });
    })(jQuery, kendo);
    </script>
```
```Controller
    public ActionResult Index()
    {
        var viewModel = new User();
        return View(viewModel);
    }
```

## More {{ site.framework }} Form Resources

* [{{ site.framework }} Form Documentation]({%slug htmlhelpers_form_aspnetcore_overview%})

* [{{ site.framework }} Form Demos](https://demos.telerik.com/{{ site.platform }}/form)

{% if site.core %}
* [{{ site.framework }} Form Product Page](https://www.telerik.com/aspnet-core-ui/form)

* [Telerik UI for {{ site.framework }} Video Onboarding Course (Free for trial users and license holders)]({%slug virtualclass_uiforcore%})

* [Telerik UI for {{ site.framework }} Forums](https://www.telerik.com/forums/aspnet-core-ui)

{% else %}
* [{{ site.framework }} Form Product Page](https://www.telerik.com/aspnet-mvc/form)

* [Telerik UI for {{ site.framework }} Video Onboarding Course (Free for trial users and license holders)]({%slug virtualclass_uiformvc%})

* [Telerik UI for {{ site.framework }} Forums](https://www.telerik.com/forums/aspnet-mvc)
{% endif %}

## See Also

* [Client-Side API Reference of the Form for {{ site.framework }}](https://docs.telerik.com/kendo-ui/api/javascript/ui/form)
* [Server-Side API Reference of the Form for {{ site.framework }}](https://docs.telerik.com/{{ site.platform }}/api/form)
* [Telerik UI for {{ site.framework }} Breaking Changes]({%slug breakingchanges_2023%})
* [Telerik UI for {{ site.framework }} Knowledge Base](https://docs.telerik.com/{{ site.platform }}/knowledge-base)

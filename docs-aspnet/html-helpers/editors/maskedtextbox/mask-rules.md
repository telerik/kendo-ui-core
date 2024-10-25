---
title: Validation
page_title: Validation
description: "Use the predefined and custom masks in the Telerik UI MaskedTextBox for {{ site.framework }}."
previous_url: /helpers/editors/maskedtextbox/mask-rules
slug: validation_maskedtextbox_aspnetcore
position: 3
---

# Validation

The MaskedTextBox provides a set of predefined mask rules and enables you to modify them.

> If no mask is defined, the MaskedTextBox allows for any input.

## Predefined Masks

The MaskedTextBox has [a list of predefined mask rules](https://docs.telerik.com/kendo-ui/controls/maskedtextbox/mask-rules) which can be used to validate its user input.

The following example demonstrates how to set a `zip code` mask.

```HtmlHelper
    @(Html.Kendo().MaskedTextBox()
          .Name("maskedtextbox")
          .Mask("00000-9999") // Set the zip code.
    )
```
{% if site.core %}
```TagHelper
  <kendo-maskedtextbox name="maskedtextbox" mask="00000-9999"></kendo-maskedtextbox>
```
{% endif %}

## Custom Masks

The MaskedTextBox enables you to define custom mask rules if none of the predefined ones is suitable. To add a custom rule, use the `Rules` method.

> The MaskedTextBox supports [JavaScript Regular Expressions](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_Expressions) defined as a string or a JavaScript function.

The following example demonstrates how to define a custom rule for the `-` (minus) and `+` (plus) symbols.

```HtmlHelper
  @(Html.Kendo().MaskedTextBox()
        .Name("maskedtextbox")
        .Rules(rules => {
            rules.Add('~', "/[+-]/");
        })
        .Mask("~0000") // Set a mask with a custom rule.
   )
```
{% if site.core %}
```TagHelper
  @{
    var rules = new Dictionary<string, string>()
    {
        {"~", "/[+-]/"}
    };
  }

  <kendo-maskedtextbox name="maskedtextbox" rules="@rules" mask="~0000" ></kendo-maskedtextbox>
```
{% endif %}

## See Also

* [Validation by the MaskedTextBox HtmlHelper for {{ site.framework }} (Demo)](https://demos.telerik.com/{{ site.platform }}/maskedtextbox/validation)
* [Server-Side API](/api/maskedtextbox)

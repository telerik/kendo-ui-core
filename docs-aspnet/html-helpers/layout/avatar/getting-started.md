---
title: Getting Started
page_title: Getting Started
description: "Make your first steps with the Telerik UI for {{ site.framework }} Avatar component by following a complete step-by-step tutorial."
slug: avatar_getting_started
position: 1
---

# Getting Started with the Avatar

This tutorial explains how to set up a basic Telerik UI for {{ site.framework }} Avatar and highlights the major steps in the configuration of the component.

You will initialize an Avatar component with different appearance-related options. {% if site.core %}Finally, you can run the sample code in [Telerik REPL](https://netcorerepl.telerik.com/) and continue exploring the components.{% endif %}

 ![Sample Telerik UI for {{ site.framework }} Avatar](./images/avatar-getting-started.png)

@[template](/_contentTemplates/core/getting-started-prerequisites.md#component-gs-prerequisites)

## 1. Prepare the CSHTML File

@[template](/_contentTemplates/core/getting-started-directives.md#gs-adding-directives)

Optionally, you can structure the View content by adding the desired HTML elements like headings, divs, paragraphs, and others.

```HtmlHelper
    @using Kendo.Mvc.UI

    <div id="avatar-container">

    </div>
```
{% if site.core %}
```TagHelper
    @addTagHelper *, Kendo.Mvc

    <div id="avatar-container">

    </div>
```
{% endif %}

## 2. Initialize the Avatar

Use the Avatar HtmlHelper {% if site.core %}or TagHelper{% endif %} to add the component to a page:

* The `Name()` configuration method is mandatory as its value is used for the `id` and the `name` attributes of the Avatar element.
* The `Type()` option specifies the type of the Avatar. 
* The `Text()` defines the text that will be displayed in the Avatar, when the `Type` option is set to `AvatarType.Text`.
* The `Image()` specifies the URL of the image that will be displayed in the Avatar, when the `Type` option is `AvatarType.Image`.
* The `Icon()` sets the name of the icon that will be displayed in the Avatar, when the `Type` is `AvatarType.Icon`.
* The `Rounded()` option defines the component shape.

```HtmlHelper
    @using Kendo.Mvc.UI

    <div id="avatar-container">
        @(Html.Kendo().Avatar()
            .Name("avatar")
            .Type(AvatarType.Image)
            .Rounded(Rounded.Full)
            .Image("https://demos.telerik.com/aspnet-core/shared/web/Customers/FAMIA.jpg")
        )
    </div>
```
{% if site.core %}
```TagHelper
    @addTagHelper *, Kendo.Mvc

    <div id="avatar-container">
        <kendo-avatar name="avatar"
            type="AvatarType.Image"
            rounded="Rounded.Full"
            image="https://demos.telerik.com/aspnet-core/shared/web/Customers/FAMIA.jpg">
        </kendo-avatar>
    </div>
```
{% endif %}

## 3. Customize the Appearance of the Avatar

The configuration options `Size`, `FillMode`, `Border`, `Rounded`, etc. allow you to control the appearance of the Avatar component.

```HtmlHelper
    @using Kendo.Mvc.UI

    <div id="avatar-container">
        @(Html.Kendo().Avatar()
            .Name("avatar")
            .Type(AvatarType.Image)
            .Size(ComponentSize.Large)
            .FillMode(AvatarFillMode.Outline)
            .Rounded(Rounded.Large)
            .Border(true)
            .Image("https://demos.telerik.com/aspnet-core/shared/web/Customers/FAMIA.jpg")
        )
    </div>
```
{% if site.core %}
```TagHelper
    @addTagHelper *, Kendo.Mvc

    <div id="avatar-container">
        <kendo-avatar name="avatar"
            type="AvatarType.Image"
            size="ComponentSize.Large"
            fill-mode="AvatarFillMode.Outline"
            border="true"
            rounded="Rounded.Large"
            image="https://demos.telerik.com/aspnet-core/shared/web/Customers/FAMIA.jpg">
        </kendo-avatar>
    </div>
```
{% endif %}

## 4. (Optional) Reference Existing Avatar Instances

You can reference the Avatar instances that you have created and build on top of their existing configuration. Use the `Name()` value of the component to get its reference.

```HtmlHelper
    @(Html.Kendo().Avatar()
        .Name("avatar")
        .Type(AvatarType.Image)
        .Rounded(Rounded.Full)
        .Image("https://demos.telerik.com/aspnet-core/shared/web/Customers/FAMIA.jpg")
    )
```
{% if site.core %}
```TagHelper
    @addTagHelper *, Kendo.Mvc

    <kendo-avatar name="avatar"
        type="AvatarType.Image"
        rounded="Rounded.Full"
        image="https://demos.telerik.com/aspnet-core/shared/web/Customers/FAMIA.jpg">
    </kendo-avatar>
```
{% endif %}
```script
    <script>
        $(document).ready(function() {
            var avatar = $("#avatar").data("kendoAvatar"); // The `avatar` variable holds a reference to the existing Avatar instance of the helper.
        });
    </script>
```

For more information on referencing specific helper instances, see the [Methods and Events]({% slug methodevents_core %}) article.

{% if site.core %}
## Explore this Tutorial in REPL

You can continue experimenting with the code sample above by running it in the Telerik REPL server playground:

* [Sample code with the Avatar HtmlHelper](https://netcorerepl.telerik.com/cnvFcQvp48l9OYrm30)
* [Sample code with the Avatar TagHelper](https://netcorerepl.telerik.com/QHPPmmFf48CPQxnG55)

{% endif %}

## Next Steps

* [Configuring the Avatar Appearance]({% slug appearance_avatar_aspnetcore %})

## See Also

* [Integrating the Avatar for {{ site.framework }} into a Grid (Demo)](https://demos.telerik.com/{{ site.platform }}/avatar/gridintegration)
* [Client-Side API of the Avatar](https://docs.telerik.com/kendo-ui/api/javascript/ui/avatar)
* [Server-Side API of the Avatar HtmlHelper](/api/avatar)
{% if site.core %}
* [Server-Side API of the Avatar TagHelper](/api/taghelpers/avatar)
{% endif %}
* [Knowledge Base Section](/knowledge-base)

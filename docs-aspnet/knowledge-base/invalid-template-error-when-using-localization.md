---
title: "'Invalid Template' Error Occurs When Using Localization and Templates"
description: "An 'Invalid Template' error occurs when I use nested templates which contain localized strings in ASP.NET Core projects."
type: troubleshooting
page_title: "'Invalid Template' Error Is Thrown When Nested Templates and Localization Are Used"
slug: invalid-template-during-localization
tags: invalid, template, error, using, localization, templates  
ticketid: 1146274
res_type: kb
---

## Environment

<table>
  <tr>
    <td>Product</td>
    <td>Progress® Telerik® UI for ASP.NET Core</td>
  </tr>
</table>

## Description

My UI for ASP .NET Core project uses a Grid with templates and localization of the resource files. The Kendo UI HTML helper generates hash tag symbols, such as `И, д, е, н`, which cause an error.

## Error Message

`Uncaught Error: Invalid template:'....'`

## Cause

ASP.NET Core encodes all Unicode characters except the ones from the `BasicLatin` range. The encoded characters are similar to `汉`. The hash sign (`#`) in the encoded character representation [has a special meaning inside the Kendo UI Templates](https://docs.telerik.com/kendo-ui/framework/templates/overview#template-syntax) and breaks their syntax which results in throwing the `Invalid template` error.

## Solution

Widen the character ranges that are treated as safe by the ASP.NET Core encoding mechanism. This approach will prevent the framework from encoding your localized strings.

1. Open `Startup.cs` file and locate the `ConfigureServices` method.
1. Add the `services.AddSingleton(HtmlEncoder.Create(allowedRanges: new[] { UnicodeRanges.BasicLatin, UnicodeRanges.Cyrillic }));` line. Inside that code line, replace `UnicodeRanges.Cyrillic` with the ranges which include all Unicode characters that you use in your localization files. For more information, refer to the relevant table in the [Unicode Character Code Charts list](http://www.unicode.org/charts/index.html). The final result should be similar to the following code snippet:

    ```
    public void ConfigureServices(IServiceCollection services)
    {
        // Add framework services.
        services
            .AddMvc()
            .AddJsonOptions(options => options.SerializerSettings.ContractResolver = new DefaultContractResolver());

        services.AddSingleton(HtmlEncoder.Create(allowedRanges: new[] { UnicodeRanges.BasicLatin, UnicodeRanges.Cyrillic }));
        services.AddKendo();
    }
    ```

## See Also

* [ASP.NET Core Documentation on Customizing the Encoders](https://docs.microsoft.com/en-us/aspnet/core/security/cross-site-scripting#customizing-the-encoders)

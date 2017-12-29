---
title: "'Invalid Template' Error When Using Localization and Templates"
description: "There is an 'Invalid Template' error when using nested templates containing localized strings in ASP.NET Core projects"
type: troubleshooting
page_title: "'Invalid Template' Error with Nested Templates and Localization"
slug: invalid-template-during-localization
ticketid: 1146274
res_type: kb
---

## Environment

<table>
	<tr>
		<td>Product</td>
		<td>Progress UI for ASP.NET Core</td>
	</tr>
</table>


## Description

I have a project that uses UI for ASP .NET Core Grid with templates. My project is localized using resource files. The Kendo UI HTML helper generates hash tag symbols, like `&#x418;&#x434;&#x435;&#x43D;` that cause an error.

## Error Message

`Uncaught Error: Invalid template:'....'`

## Cause

ASP.NET Core encodes all Unicode characters except the ones from the `BasicLatin` range. The encoded characters look like this : `&#x6C49;`. The hash sign (#) in the encoded character  representation [has a special meaning inside Kendo UI templates](/framework/templates/overview#template-syntax) and breaks their syntax, resulting in the `Invalid template` error.

## Solution

You can widen the character ranges treated as safe by the ASP.NET Core encoding mechanism. This will prevent the framework from encodng your localized strings. To do this:

1. Open `Startup.cs` file and locate the `ConfigureServices` method.
1. Add the following line:
	
	```
     services.AddSingleton(HtmlEncoder.Create(allowedRanges: new[] { UnicodeRanges.BasicLatin,
                                                                     UnicodeRanges.Cyrillic }));
	```
	where `UnicodeRanges.Cyrillic` should be replaced with the range(s), which include all Unicode characters that you use in your localization files. You can find the relevant table in the [Unicode Character Code Charts list](http://www.unicode.org/charts/index.html). 

	The final result will look something like this:

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
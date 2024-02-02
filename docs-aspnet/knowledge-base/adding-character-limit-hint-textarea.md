---
title: Adding Character Limit Hint to TextArea for {{ site.framework }}
description: Learn how to add a character limit hint below the Telerik UI for {{ site.framework }} TextArea.
page_title: How to Add a Character Limit Hint to the Telerik UI for {{ site.framework }} TextArea.
slug: adding-character-limit-hint-textarea
tags: textarea, textbox, character, limit, hint, max, count, validation
res_type: kb
---

## Environment
| Product       | TextArea for Progress® Telerik® {{ site.product_short }} |
|---------------|-----------------------------------------------|
| Version       | 2023.1.425                                    |

## Description
How can I add a character limit hint below the TextArea? The hint will show the remaining characters as I type in the TextArea.

## Solution
Here's an example of how you can add a character counter to a TextArea using jQuery:

1. Include a `<span>` element below the TextArea in your markup.
2. Use jQuery to update the content of the `<span>` element with the remaining characters count as the user types.

```HtmlHelper
<div style="width: 400px;">
    @(Html.Kendo().TextArea()
        .Name("textarea")
        .Placeholder("Enter your text here.")
        .Rows(10)
        .MaxLength(250)
        .HtmlAttributes(new { data_required_msg = "Please enter a text.", data_max_msg = "Enter value between 1 and 250" })
    )
    <span class="characters-counter">0/250 characters left.</span>
</div>

<script>
    $(document).ready(function() {
        $('#textarea').bind('keyup', function() {
            var valueLength = this.value.length;
            var count = 250 - valueLength;

            $(".characters-counter").html(count + "/250 characters left.")
        });
    })
</script>

<style>
    .characters-counter {
        float: right;
    }
</style>
```
{% if site.core %}
```TagHelper
    @addTagHelper *, Kendo.Mvc

    <div style="width: 400px;">
        <kendo-textarea name="textarea" 
            rows="10" 
            max-length="250" 
            placeholder="Enter your text here."
            data-required-msg="Please enter a text." 
            data-max-msg="Enter value between 1 and 250">
        </kendo-textarea>
        <span class="characters-counter">0/250 characters left.</span>
    </div>

    <script>
        $(document).ready(function() {
            $('#textarea').bind('keyup', function() {
                var valueLength = this.value.length;
                var count = 250 - valueLength;

                $(".characters-counter").html(count + "/250 characters left.")
            });
        })
    </script>

    <style>
        .characters-counter {
            float: right;
        }
    </style>
```
{% endif %}

{% if site.core %}
For a runnable example based on the code above, refer to the following REPL samples:

* [Sample code with the TextArea HtmlHelper](https://netcorerepl.telerik.com/wIkFEDlf067sfXYE02)
* [Sample code with the TextArea TagHelper](https://netcorerepl.telerik.com/mIabRbFf58lmsghg21)
{% else %}
For the complete implementation of the suggested approach, refer to the following [Telerik REPL](https://netcorerepl.telerik.com/wIkFEDlf067sfXYE02) example.
{% endif %}

## Notes
- Make sure to adjust the `MaxLength()` option to match your desired character limit.
- Customize the message displayed in the `<span>` element and the `data_max_msg` attribute to fit your needs.

## More {{ site.framework }} TextArea Resources
* [{{ site.framework }} TextArea Documentation]({%slug htmlhelpers_overview_textarea %})
* [{{ site.framework }} TextArea Demos](https://demos.telerik.com/{{ site.platform }}/textarea)
{% if site.core %}
* [{{ site.framework }} TextArea Product Page](https://www.telerik.com/aspnet-core-ui/text-area)
* [Telerik UI for {{ site.framework }} Video Onboarding Course (Free for trial users and license holders)]({%slug virtualclass_uiforcore%})
* [Telerik UI for {{ site.framework }} Forums](https://www.telerik.com/forums/aspnet-core-ui)
{% else %}
* [{{ site.framework }} TextArea Product Page](https://www.telerik.com/aspnet-mvc/text-area)
* [Telerik UI for {{ site.framework }} Video Onboarding Course (Free for trial users and license holders)]({%slug virtualclass_uiformvc%})
* [Telerik UI for {{ site.framework }} Forums](https://www.telerik.com/forums/aspnet-mvc)
{% endif %}
## See Also
* [Client-Side API Reference of the TextArea for {{ site.framework }}](https://docs.telerik.com/kendo-ui/api/javascript/ui/textarea)
* [Server-Side API Reference of the TextArea for {{ site.framework }}](https://docs.telerik.com/{{ site.platform }}/api/textarea)
* [Telerik UI for {{ site.framework }} Breaking Changes]({%slug breakingchanges_2023%})
* [Telerik UI for {{ site.framework }} Knowledge Base](https://docs.telerik.com/{{ site.platform }}/knowledge-base)

---
title: Chunk
page_title: Chunk
description: "Learn how to set the state of the Telerik UI ProgressBar component for {{ site.framework }} in chunks or partitions."
slug: progressbar_chunk
position: 5
---

# Chunk

The ProgressBar component allows you to present the state of the progress in equally defined partitions:

 ![Chunk in Telerik UI for {{ site.framework }} ProgressBar](images/progressbar-chunk.png)

This is enabled with the `Type` enumeration property and the `ChunkCount` setting:

```HtmlHelper
 @using Kendo.Mvc.UI

@(Html.Kendo().ProgressBar()
	  .Name("profileCompleteness")
	  .Type(ProgressBarType.Chunk)
	  .ChunkCount(5)
	  .Min(0)
	  .Max(5)
	  .Value(2)
)
```
{% if site.core %}
```TagHelper
    @addTagHelper *, Kendo.Mvc

        <kendo-progressbar chunk-count="5" enable="true" max="5" min="0" reverse="false" show-status="true" type="ProgressBarType.Chunk" name="profileCompleteness" value="2">
        </kendo-progressbar>
```
{% endif %}

The calculation of the completeness % percents can happen with the `.value()` API method and javascript logic depending on the total count of inputs in the form. Here is an example:
```JavaScript
     $(".forms input").change(function () {
         var completeness = 5;
         $(".forms input").each(function () {
             if (this.value == "") {
                 completeness--;
             }
         });

         pb.value(completeness);
         $("#completed").text((completeness * 20) + "%");
     });
```

## See Also

* [Chunk ProgressBar for {{ site.framework }} (Demo)](https://demos.telerik.com/{{ site.platform }}/progressbar/chunk)
* [Server-Side API of the ProgressBar](/api/progressbar)
* [Client-Side API of the ProgressBar](https://docs.telerik.com/kendo-ui/api/javascript/ui/progressbar)

---
title: Icon ButtonGroup
page_title: Icon ButtonGroup
description: "Accommodate an icon and enhance the meaning of the text content of the Telerik UI ButtonGroup HtmlHelper for {{ site.framework }}."
previous_url: /helpers/navigation/buttongroup/icons
slug: icons_buttongroup_aspnetcore
position: 3
---

# Icon ButtonGroup

The ButtonGroup can accommodate an icon and in this way to enhance the meaning of the text content.

You can configure the icons by using the `.Icon()` method of the ButtonGroup.

```
         @(Html.Kendo().ButtonGroup()
            .Name("player")
            .Items(t =>
            {
                    t.Add().Icon("play");
                    t.Add().Icon("pause");
                    t.Add().Icon("stop");
            }))
```

This ButtonGroup configuration is expected to produce the following HTML output:

    <div class="k-button-group k-widget" data-role="buttongroup" id="player" role="group" tabindex="0">
        <span data-icon="play" aria-pressed="false" role="button" class="k-button k-button-icon">
            <span class="k-icon k-i-play"></span>
        </span>
        <span data-icon="pause" aria-pressed="false" role="button" class="k-button k-button-icon">
            <span class="k-icon k-i-pause"></span>
        </span>
        <span data-icon="stop" aria-pressed="false" role="button" class="k-button k-button-icon">
            <span class="k-icon k-i-stop"></span>
        </span>
    </div>

## See Also

* [Adding Images to the ButtonGroup HtmlHelper for {{ site.framework }} (Demo)](https://demos.telerik.com/{{ site.platform }}/buttongroup/icons)
* [Server-Side API](/api/buttongroup)

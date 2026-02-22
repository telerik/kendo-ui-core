---
title:  Razor Pages
page_title: Razor Pages
description: "An example on how to configure the remote binding DataSource to populate the Telerik UI MediaPlayer component for {{ site.framework }} in Razor Pages."
components: ["mediaplayer"]
slug: htmlhelpers_mediaplayer_razorpage_aspnetcore
position: 5
---

# MediaPlayer in Razor Pages

This article describes how to seamlessly integrate and configure the Telerik UI MediaPlayer for {{ site.framework }} in Razor Pages applications.

@[template](/_contentTemplates/core/razor-pages-general-info.md#referencing-handler-methods)

## Creating a Playlist with ListView

The following example demonstrates how to use the MediaPlayer and a ListView components in a Razor Pages application to create a playlist.

1. Bind the ListView to a remote DataSource to load the `title`, `poster` and `source` for each video.

2. Within the `Change` event of the ListView, assign the values of the `title`, `poster` and `source` properties to the MediaPlayer. 

```HtmlHelper
@page
@model MediaPlayerPlaylistModel
@using Telerik.Examples.RazorPages.Models

@inject Microsoft.AspNetCore.Antiforgery.IAntiforgery Xsrf
@Html.AntiForgeryToken()

// Create a temmplate for the ListView (Playlist).
<script type="text/x-kendo-template" id="template">
    <li class="k-item k-state-default" onmouseover="$(this).addClass('k-hover')"
        onmouseout="$(this).removeClass('k-hover')">
        <span>
            <img src="#:Poster#" />
            <h5>#:Title#</h5>
        </span>
    </li>
</script>

@(Html.Kendo().MediaPlayer()
    .Name("mediaPlayer")
    .AutoPlay(false)
    .HtmlAttributes(new { style = "height:720px" })
)

<div class="k-list-container playlist">
    @(Html.Kendo().ListView<Video>()
        .Name("listView")
        .TagName("ul")
        .ClientTemplateId("template") // Set the template from above.
        .DataSource(dataSource => dataSource
            .Ajax()
            .Read(read => read.Url(@Url.Page("MediaPlayerPlaylist", "Read")).Data("forgeryToken"))
        )
        .Selectable(true)
        .Events(e => e.Change("onChange").DataBound("onDataBound"))
    )
</div>
```
{% if site.core %}
```TagHelper
@page
@model MediaPlayerPlaylistModel
@addTagHelper "*, Kendo.Mvc"

@using Telerik.Examples.RazorPages.Models

@inject Microsoft.AspNetCore.Antiforgery.IAntiforgery Xsrf
@Html.AntiForgeryToken()

// Create a template for the ListView (Playlist).
<script type="text/x-kendo-template" id="template">
    <li class="k-item k-state-default" onmouseover="$(this).addClass('k-hover')"
        onmouseout="$(this).removeClass('k-hover')">
        <span>
            <img src="#:Poster#" />
            <h5>#:Title#</h5>
        </span>
    </li>
</script>

<kendo-mediaplayer name="mediaPlayer"
    auto-play="false"
    style="height:720px">
</kendo-mediaplayer>

<div class="k-list-container playlist">
    <kendo-listview name="listView"
        tag-name="ul"
        template-id="template"
        on-change="onChange"
        on-data-bound="onDataBound">
        <selectable enabled="true"/>
        <datasource type="DataSourceTagHelperType.Ajax">
            <transport>
                <read url="@Url.Page("MediaPlayerPlaylist","Read")" data="forgeryToken" />
            </transport>
        </datasource>
    </kendo-listview>
</div>
```
```JS Scripts
<script>
    function forgeryToken() {
        return kendo.antiForgeryTokens();
    }

    function onChange() {
        var index = this.select().index();
        var dataItem = this.dataSource.view()[index];
        
        // Play the video selected from the playlist.
        $("#mediaPlayer").data("kendoMediaPlayer").media({
            title: dataItem.Title,
            poster: dataItem.Poster,
            source: dataItem.Source
        });
    }

    // Select the first video when the page loads.
    function onDataBound() {
        this.select(this.content.children().first());
    }
</script>
```
{% endif %}
```C# PageModel
using System.Collections.Generic;
using Kendo.Mvc.Extensions;
using Kendo.Mvc.UI;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;
using Telerik.Examples.RazorPages.Models;

namespace Telerik.Examples.RazorPages.Pages.MediaPlayer
{
    public class MediaPlayerPlaylistModel : PageModel
    {
        private static IList<Video> videos;

        // Create sample data for the ListView(Playlist).
        public void OnGet()
        {
            if (videos == null)
            {
                videos = new List<Video>();

                videos.Add(new Video()
                {
                    Title = "Build HIPAA-Compliant Healthcare Apps Fast",
                    Poster = "https://img.youtube.com/vi/_S63eCewxRg/1.jpg",
                    Source = "https://www.youtube.com/watch?v=dyvxivS5EcI"
                });

                videos.Add(new Video()
                {
                    Title = "ProgressNEXT 2018 Highlights",
                    Poster = "https://img.youtube.com/vi/DYsiJRmIQZw/1.jpg",
                    Source = "https://www.youtube.com/watch?v=Gp7tcOcSKAU"
                });

                videos.Add(new Video()
                {
                    Title = "Benefits of Being a Progress Partner",
                    Poster = "https://i.ytimg.com/vi/xzrHbJmQbB8/1.jpg",
                    Source = "https://www.youtube.com/watch?v=xzrHbJmQbB8"
                });

                videos.Add(new Video()
                {
                    Title = "Progress Application Server OpenEdge",
                    Poster = "https://i.ytimg.com/vi/CpHKm2NruYc/1.jpg",
                    Source = "https://www.youtube.com/watch?v=3Ce11N9udR4"
                });
            }
        }

        public JsonResult OnPostRead([DataSourceRequest] DataSourceRequest request)
        {
            return new JsonResult(videos.ToDataSourceResult(request));
        }
    }
}
```
```C# Video.cs
namespace Telerik.Examples.RazorPages.Models
{
    public class Video
    {
        public string Title { get; set; }
        public string Source { get; set; }
        public string Poster { get; set; }
    }
}
```

For the complete project, refer to the [MediaPlayer in Razor Pages example](https://github.com/telerik/ui-for-aspnet-core-examples/tree/master/Telerik.Examples.RazorPages/Telerik.Examples.RazorPages/Pages/MediaPlayer).

## See Also

* [Using Telerik UI for ASP.NET Core in Razor Pages](https://docs.telerik.com/aspnet-core/getting-started/razor-pages#using-telerik-ui-for-aspnet-core-in-razor-pages)
* [Client-Side API of the MediaPlayer](https://www.telerik.com/kendo-jquery-ui/documentation/api/javascript/ui/mediaplayer)
* [Server-Side HtmlHelper API of the MediaPlayer](/api/mediaplayer)
* [Server-Side TagHelper API of the MediaPlayer](/api/taghelpers/mediaplayer)
* [Knowledge Base Section](/knowledge-base)

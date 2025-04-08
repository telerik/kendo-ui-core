---
title:  Razor Pages
page_title: Razor Pages
description: "An example on how to configure the remote binding DataSource to populate the Telerik UI MediaPlayer component for {{ site.framework }} in Razor Pages."
slug: htmlhelpers_mediaplayer_razorpage_aspnetcore
position: 5
---

# MediaPlayer in Razor Pages

Razor Pages is an alternative to the MVC pattern that makes page-focused coding easier and more productive. This approach consists of a `cshtml` file and a `cshtml.cs` file (by design, the two files have the same name). 

You can seamlessly integrate the Telerik UI MediaPlayer for {{ site.framework }} in Razor Pages applications.

This article describes how to configure the MediaPlayer component in a Razor Pages scenario.

For the complete project, refer to the [MediaPlayer in Razor Pages example](https://github.com/telerik/ui-for-aspnet-core-examples/tree/master/Telerik.Examples.RazorPages/Telerik.Examples.RazorPages/Pages/MediaPlayer).

## Getting Started

The following example uses two widgets: a MediaPlayer and a ListView, which serves as a playlist. There are two main steps in the suggested implementation:

1. Bind the ListView to a remote `DataSource`, which provides a `title`, `poster` and `source` for the video.

2. In the Change event of the ListView, assign the values of the `title`, `poster` and `source` properties to the MediaPlayer. 

See the implementation details in the example below. For the full project with Razor Pages examples, visit our [GitHub repository](https://github.com/telerik/ui-for-aspnet-core-examples/tree/master/Telerik.Examples.RazorPages).

```HtmlHelper
@page
@model Telerik.Examples.RazorPages.Pages.MediaPlayer.MediaPlayerPlaylistModel
@{
    ViewData["Title"] = "MediaPlayerPlaylist";
}

@using Telerik.Examples.RazorPages.Models

@inject Microsoft.AspNetCore.Antiforgery.IAntiforgery Xsrf
@Html.AntiForgeryToken()

// Create a temmplate for the ListView(Playlist).
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
                    .Read(read => read.Url("/MediaPlayer/MediaPlayerPlaylist?handler=Read").Data("forgeryToken"))
                )
            .Selectable(true)
            .Events(e => e
                .Change("onChange")
                .DataBound("onDataBound"))
        )
</div>

<script>
    function forgeryToken() {
        return kendo.antiForgeryTokens();
    }
    function onChange() {
        var index = this.select().index();
        var dataItem = this.dataSource.view()[index];
        
        // Play the video that was selected from the playlist.
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

<style>
    .k-mediaplayer {
        float: left;
        box-sizing: border-box;
        width: 70%;
    }
    .playlist {
        float: left;
        height: 720px;
        overflow: auto;
        width: 30%;
    }
    @@media(max-width: 800px) {
        .playlist,
        .k-mediaplayer {
            width: 100%;
        }
    }
    .playlist ul, .playlist li {
        list-style-type: none;
        margin: 0;
        padding: 0;
    }
    .playlist .k-item {
        border-bottom-style: solid;
        border-bottom-width: 1px;
        padding: 14px 15px;
    }
        .playlist .k-item:last-child {
            border-bottom-width: 0;
        }
    .playlist span {
        cursor: pointer;
        display: block;
        overflow: hidden;
        text-decoration: none;
    }
        .playlist span img {
            border: 0 none;
            display: block;
            height: 56px;
            object-fit: cover;
            width: 100px;
            float: left;
        }
    .playlist h5 {
        display: block;
        font-weight: normal;
        margin: 0;
        overflow: hidden;
        padding-left: 10px;
        text-align: left;
    }
</style>
```
{% if site.core %}
```TagHelper
@page
@addTagHelper "*, Kendo.Mvc"
@model Telerik.Examples.RazorPages.Pages.MediaPlayer.MediaPlayerPlaylistModel
@{
    ViewData["Title"] = "MediaPlayerPlaylist";
}

@using Telerik.Examples.RazorPages.Models

@inject Microsoft.AspNetCore.Antiforgery.IAntiforgery Xsrf
@Html.AntiForgeryToken()

// Create a template for the ListView(Playlist).
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
                <read url="@Url.Page("/MediaPlayer/MediaPlayerPlaylist?handler=Read")" data="forgeryToken" />
            </transport>
        </datasource>
    </kendo-listview>
</div>

<script>
    function forgeryToken() {
        return kendo.antiForgeryTokens();
    }
    function onChange() {
        var index = this.select().index();
        var dataItem = this.dataSource.view()[index];
        
        // Play the video that was selected from the playlist.
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

<style>
    .k-mediaplayer {
        float: left;
        box-sizing: border-box;
        width: 70%;
    }
    .playlist {
        float: left;
        height: 720px;
        overflow: auto;
        width: 30%;
    }
    @@media(max-width: 800px) {
        .playlist,
        .k-mediaplayer {
            width: 100%;
        }
    }
    .playlist ul, .playlist li {
        list-style-type: none;
        margin: 0;
        padding: 0;
    }
    .playlist .k-item {
        border-bottom-style: solid;
        border-bottom-width: 1px;
        padding: 14px 15px;
    }
        .playlist .k-item:last-child {
            border-bottom-width: 0;
        }
    .playlist span {
        cursor: pointer;
        display: block;
        overflow: hidden;
        text-decoration: none;
    }
        .playlist span img {
            border: 0 none;
            display: block;
            height: 56px;
            object-fit: cover;
            width: 100px;
            float: left;
        }
    .playlist h5 {
        display: block;
        font-weight: normal;
        margin: 0;
        overflow: hidden;
        padding-left: 10px;
        text-align: left;
    }
</style>
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

* [Server-Side API of the MediaPlayer for {{ site.framework }}](/api/mediaplayer)

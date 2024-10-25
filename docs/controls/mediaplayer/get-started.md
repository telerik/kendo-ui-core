---
title: Getting Started
page_title: jQuery MediaPlayer Documentation - Getting Started with the MediaPlayer
description: "Get started with the jQuery MediaPlayer by Kendo UI and learn how to create, initialize, and enable the component."
slug: getting_started_kendoui_mediaplayer_component
position: 2
---

# Getting Started with the MediaPlayer 

This guide demonstrates how to get up and running with the Kendo UI for jQuery MediaPlayer .

After the completion of this guide, you will achieve the following end result:

```dojo
    <div id="mediaplayer" style="width:640px; height: 360px;"></div>
    <script type="text/javascript">
        $(document).ready(function () {
            $("#mediaplayer").kendoMediaPlayer({
            autoPlay: true,
            navigatable: true,
            media: {
                title: "ProgressNEXT 2019 Highlights",
                source: "https://youtu.be/2OvvwWShNWo"
                }
            });
        });
    </script>
```

## 1. Create a Div Element

First, create a `<div>` element on the page that will be used to initialize the component. The content of the `<div>` will be used as content for the MediaPlayer.

```html
    <div id="mediaplayer" style="width:640px; height: 360px;"></div>
```

## 2. Initialize the MediaPlayer

In this step, you will initialize the MediaPlayer from the `<div>` element.

```dojo
    <div id="mediaplayer" style="width:640px; height: 360px;"></div>
    <script type="text/javascript">
        $(document).ready(function () {
            $("#mediaplayer").kendoMediaPlayer();
    </script>
```

## 3. Specify the Media

Here, you will specify the [`media`](/api/javascript/ui/mediaplayer/configuration/media) that will be played by the component.

```dojo
    <div id="mediaplayer" style="width:640px; height: 360px;"></div>
    <script type="text/javascript">
        $(document).ready(function () {
            $("#mediaplayer").kendoMediaPlayer({
            media: {
                title: "ProgressNEXT 2019 Highlights",
                source: "https://youtu.be/2OvvwWShNWo"
                },
            autoPlay: true, // The video or videos will start playing after the component initialization.
            navigatable: true, // Enables the component keyboard navigation.
            });
        });
    </script>
```

>tip When using local sources, consider the video formats supported by the different browsers. For more information on the supported HTML5 video formats, refer to [the HTML Video documentation](http://www.w3schools.com/html/html5_video.asp). Once your video files are ready, initialize the MediaPlayer by using the `div` element.

>tip Because of the [mobile considerations](https://developers.google.com/youtube/iframe_api_reference#Mobile_considerations), browsers on iOS do not automatically play embedded media. This limitation prevents unsolicited downloads over cellular networks at the expense of the user. The user always has to initiate a playback. For more information, refer to the article on [audio and video HTML](https://developer.apple.com/library/safari/documentation/AudioVideo/Conceptual/Using_HTML5_Audio_Video/AudioandVideoTagBasics/AudioandVideoTagBasics.html).
Other functionalities may also be limited due to iOS restrictions. For more information, refer to [this article](https://community.shopify.com/c/shopify-design/html5-videos-do-not-work-in-safari-on-mac-or-ios-but-work-fine/td-p/2137777) and to other available resources on the Web.

## Next Steps

* [Referencing Existing Component Instances]({% slug widget_methodsand_events_kendoui_installation %})
* [Demo Page for the MediaPlayer](https://demos.telerik.com/kendo-ui/mediaplayer/index)

## See Also 

* [JavaScript API Reference of the MediaPlayer](/api/javascript/ui/mediaplayer)
* [Knowledge Base Section](/knowledge-base)

<script>
  window.onload = function() {
    document.getElementsByClassName("btn-run")[0].click();
  }
</script>

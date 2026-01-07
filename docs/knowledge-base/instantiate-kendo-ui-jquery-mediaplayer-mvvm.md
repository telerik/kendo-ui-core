---  
title: Instantiating Kendo UI for jQuery MediaPlayer with MVVM  
description: Learn how to instantiate the [Kendo UI for jQuery MediaPlayer](https://docs.telerik.com/kendo-ui/controls/media/mediaplayer/overview) using the MVVM pattern and ensure proper binding.  
type: how-to  
page_title: Setting Up Kendo UI for jQuery MediaPlayer with MVVM  
meta_title: Setting Up Kendo UI for jQuery MediaPlayer with MVVM  
slug: instantiate-kendo-ui-jquery-mediaplayer-mvvm  
tags: mediaplayer, kendo ui for jquery, mvvm, instantiate, data-bind  
res_type: kb  
ticketid: 1698263
---

## Environment  
<table>  
<tbody>  
<tr>  
<td>Product</td>  
<td>Kendo UI for jQuery MediaPlayer</td>  
</tr>  
<tr>  
<td>Version</td>  
<td>2025.3.1002</td>  
</tr>  
</tbody>  
</table>  

## Description  
I want to instantiate the [Kendo UI for jQuery MediaPlayer](https://docs.telerik.com/kendo-ui/controls/media/mediaplayer/overview) using MVVM but the implementation is not working. I need guidance on how to correctly initialize the MediaPlayer component with MVVM and ensure proper binding.  

This knowledge base article also answers the following questions:  
- How do I instantiate Kendo UI for jQuery MediaPlayer with MVVM?  
- Why does data-role not work for Kendo UI for jQuery MediaPlayer?  
- How can I bind events to Kendo UI for jQuery MediaPlayer in MVVM?  

## Solution  
To correctly instantiate the Kendo UI for jQuery MediaPlayer using MVVM, specify the component settings directly in the HTML markup. Use the `data-bind` attribute only for binding events and not for applying settings.  

Follow these steps:  
1. Add an HTML element and set the `data-role` attribute to `mediaplayer`.  
2. Define the MediaPlayer settings directly using attributes such as `data-auto-play`, `data-media`, and `data-navigatable`.  
3. Use the `data-bind` attribute to bind events like `ready` and `error`.  

Example: 

```dojo
    <div id="app" data-role="view" data-model="viewModel">
      <div
        data-role="mediaplayer"
        data-auto-play="false"
        data-media="{ 'title': 'Sample video', source: 'https://youtu.be/2OvvwWShNWo' }"
        data-navigatable="true"
        data-bind="events: { ready: onPlayerReady }" >
      </div>
    </div>

    <script>
      var viewModel = kendo.observable({
        // MediaPlayer instance reference
        mediaPlayer: null,

        // Event handlers
        onPlayerReady: function (e) {
          console.log("MediaPlayer is ready");
          // Store the media player instance
          viewModel.set("mediaPlayer", e.sender);
        },
      });

      // Initialize the application
      kendo.bind($("#app"), viewModel);
    </script>
```  

### Explanation  
- `data-role="mediaplayer"` initializes the MediaPlayer component.  
- `data-auto-play="false"` disables automatic playback.  
- `data-media` specifies the media content, including the title and source URL.  
- `data-navigatable="true"` enables keyboard navigation.  
- `data-bind="events: { ready: onPlayerReady }"` binds the [`ready`](https://www.telerik.com/kendo-jquery-ui/documentation/api/javascript/ui/mediaplayer/events/ready) event to the respective handler function.  

## See Also  
- [Kendo UI for jQuery MediaPlayer Overview](https://docs.telerik.com/kendo-ui/controls/media/mediaplayer/overview)  
- [MVVM Overview](https://www.telerik.com/kendo-jquery-ui/documentation/framework/mvvm/overview)  
- [Kendo UI for jQuery MediaPlayer API Reference](https://docs.telerik.com/kendo-ui/api/javascript/ui/mediaplayer)  

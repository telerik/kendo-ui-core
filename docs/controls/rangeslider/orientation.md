---
title: Orientation
page_title: jQuery RangeSlider Documentation - Orientation
description: "Learn how to set the orientation of the jQuery RangeSlider by Kendo UI."
slug: orientation_rangeslider_widget
position: 4
---

# Orientation

The RangeSlider supports two modes of orientation—horizontal and vertical.

By default, the component is in horizontal mode. To change it to vertical mode, set the [orientation](/api/javascript/ui/rangeslider/configuration/orientation) property to `vertical`.

When in horizontal mode, the RangeSlider displays the smallest value at the start of the track and the largest value at the end. When in vertical mode, the component displays the smallest value at the bottom and the largest at the top.

```dojo
    <div id="rangeSlider">
        <input />
        <input />
    </div>

    <script>
        $("#rangeSlider").kendoRangeSlider({
            orientation:"vertical"
        });
    </script>
```

## See Also 

* [JavaScript API Reference of the RangeSlider](/api/javascript/ui/rangeslider)

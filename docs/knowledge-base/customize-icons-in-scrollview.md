---
title: Customizing Icons in ScrollView Instances
description: Learn how to set different icons for the left and right navigation arrows in specific ScrollView instances using Kendo UI.
type: how-to
page_title: How to Customize Navigation Arrow Icons in ScrollView - Kendo UI
slug: customize-icons-in-scrollview
tags: kendo ui, scrollview, customization, icons, navigation arrows
res_type: kb
components: ["scrollview"]
ticketid: 1662936
---

## Environment

| Product | Version |
| --- | --- |
| Kendo UI for jQuery | 2024.1.130 |

## Description

I want to customize the left and right navigation icons for different ScrollView instances. Each ScrollView should have unique icons for its navigation arrows.

This KB article also answers the following questions:
- How can I change the navigation arrow icons in a ScrollView?
- Is it possible to set custom icons for ScrollView navigation arrows?
- Can different ScrollView instances have unique navigation arrow icons?

## Solution

To customize the navigation arrow icons for specific ScrollView instances, use the [`kendo.ui.icon`](/api/javascript/ui/ui/methods/icon) method with a selector that targets the arrows within the desired ScrollView. This approach allows setting different icons for the navigation arrows in each ScrollView instance without affecting other controls or instances.

First, ensure the [ScrollView](https://docs.telerik.com/kendo-ui/api/javascript/ui/scrollview) is initialized. Then, use the following code snippet to customize the icons:

```javascript
// Customize the previous (left) navigation arrow
kendo.ui.icon($("#scrollView1 .k-scrollview-prev"), { icon: 'arrow-left', size: 'xxxlarge' });

// Customize the next (right) navigation arrow
kendo.ui.icon($("#scrollView1 .k-scrollview-next"), { icon: 'arrow-right', size: 'xxxlarge' });
```

Replace `#scrollView1` with the id of your ScrollView container. This method allows you to specify different icons for each ScrollView instance on your page.

Below is a runnable example: 
```dojo
  <div id="example">
      <div style="margin:auto; width:70%">
        <div id="scrollView" style="width: 1022px; height: 315px; max-width: 100%;">
          <div class="photo photo1" data-role="page">
          </div><div class="photo photo2" data-role="page">
          </div><div class="photo photo3" data-role="page">
          </div><div class="photo photo4" data-role="page">
          </div><div class="photo photo5" data-role="page">
          </div><div class="photo photo6" data-role="page">
          </div><div class="photo photo7" data-role="page">
          </div><div class="photo photo8" data-role="page">
          </div><div class="photo photo9" data-role="page">
          </div><div class="photo photo10" data-role="page">
          </div>
        </div>
        <div> Secon ScrollView</div>
        <div id="scrollView2" style="width: 1022px; height: 315px; max-width: 100%;">
          <div class="photo photo1" data-role="page">

          </div><div class="photo photo6" data-role="page">
          </div><div class="photo photo7" data-role="page">
          </div><div class="photo photo8" data-role="page">
          </div><div class="photo photo9" data-role="page">
          </div><div class="photo photo10" data-role="page">
          </div>
        </div>
      </div>
      <script>
        $(document).ready(function() {
          $("#scrollView").kendoScrollView({
            enablePager: true,
            contentHeight: "100%"
          });

          $("#scrollView2").kendoScrollView({
            enablePager: true,
            contentHeight: "100%"
          });

          kendo.ui.icon($("#scrollView .k-scrollview-prev"), { icon: 'arrow-left', size: 'xxxlarge' });
          kendo.ui.icon($("#scrollView .k-scrollview-next"), { icon: 'arrow-right', size: 'xxxlarge' });
        });
      </script>
      <style>


        #scrollview-home .photo {
          display: inline-block;
          background-size: cover;
          background-repeat: no-repeat;
          background-position: center center;
        }

        .photo1 {
          background-image: url("https://demos.telerik.com/kendo-ui/content/shared/images/photos/1.jpg");
        }

        .photo2 {
          background-image: url("https://demos.telerik.com/kendo-ui/content/shared/images/photos/2.jpg");
        }

        .photo3 {
          background-image: url("https://demos.telerik.com/kendo-ui/content/shared/images/photos/3.jpg");
        }

        .photo4 {
          background-image: url("https://demos.telerik.com/kendo-ui/content/shared/images/photos/4.jpg");
        }

        .photo5 {
          background-image: url("https://demos.telerik.com/kendo-ui/content/shared/images/photos/5.jpg");
        }

        .photo6 {
          background-image: url("https://demos.telerik.com/kendo-ui/content/shared/images/photos/6.jpg");
        }

        .photo7 {
          background-image: url("https://demos.telerik.com/kendo-ui/content/shared/images/photos/7.jpg");
        }

        .photo8 {
          background-image: url("https://demos.telerik.com/kendo-ui/content/shared/images/photos/8.jpg");
        }

        .photo9 {
          background-image: url("https://demos.telerik.com/kendo-ui/content/shared/images/photos/9.jpg");
        }

        .photo10 {
          background-image: url("https://demos.telerik.com/kendo-ui/content/shared/images/photos/10.jpg");
        }
      </style>
    </div>
```

## Notes

- Ensure each ScrollView instance has a unique id or class for targeting with the jQuery selector.
- The [`size`](https://www.telerik.com/design-system/docs/foundation/iconography/visual-adjustments/) option can be adjusted as needed, with `xxxlarge` being used in this example for demonstration purposes.

## See Also

- [Kendo UI ScrollView API](https://docs.telerik.com/kendo-ui/api/javascript/ui/scrollview)
- [Kendo UI ScrollView Documentation](https://docs.telerik.com/kendo-ui/controls/scrollview/overview)

---
title: Overview
page_title: Overview
description: "Learn the basics when working with the Telerik UI SkeletonContainer TagHelper for ASP.NET Core (MVC 6 or ASP.NET Core MVC)."
slug: taghelpers_skeletoncontainer_aspnetcore
position: 1
---

# SkeletonContainer TagHelper Overview

The Telerik UI SkeletonContainer TagHelper for ASP.NET Core is a server-side wrapper for the Kendo UI SkeletonContainer widget.

The SkeletonContainer widget indicates to the user that the content is coming but has not yet been loaded. It aims at helping the user focus on progress and makes the page load time appear shorter.

A SkeletonContainer is basically a simplified preview version of a page into which information is gradually loaded (i.e. via AJAX requests).

## Initializing the SkeletonContainer

The SkeletonContainer TagHelper configuration options are passed as attributes of the tag.

```tagHelper

        <kendo-skeletoncontainer name="skeleton" animation="SkeletonContainerAnimation.Pulse"
                             template-id="tmpl">
        </kendo-skeletoncontainer>
```
```JavaScript
        <script id="tmpl" type="text/html">
        <div class='k-card'>
                <div class='k-card-header'>
                <div>
                        <span data-shape-circle class='k-card-image avatar'></span>
                </div>
                <div class='user-info'>
                        <span data-shape-text class='k-card-title'></span>
                        <span data-shape-text class='k-card-subtitle'></span>
                </div>
                </div>
                <span data-shape-rectangle style='width: 340px; height: 225px; '></span>
                <div class='k-card-body'>
                <span data-shape-text></span>
                </div>
        </div>
        </script>
```

## See Also

* [Basic Usage of the SkeletonContainer TagHelper for ASP.NET Core (Demo)](https://demos.telerik.com/aspnet-core/skeletoncontainer/tag-helper)
* [Server-Side API](/api/skeletoncontainer)

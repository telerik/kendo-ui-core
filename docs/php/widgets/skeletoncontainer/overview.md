---
title: Overview
page_title: Overview - SkeletonContainer PHP Class
description: "Get started with the SkeletonContainer PHP class in Kendo UI."
slug: overview_skeletoncontainer_uiforphp
position: 1
---

# SkeletonContainer PHP Class Overview

The Kendo UI SkeletonContainer for PHP is a server-side wrapper for the [Kendo UI SkeletonContainer](/api/javascript/ui/skeletoncontainer) widget.

## Getting Started

### Configuration

Below are listed the steps for you to follow when configuring the Kendo UI SkeletonContainer for PHP.

**Step 1** Make sure you followed all the steps from the [introductory article on Telerik UI for PHP]({% slug overview_uiforphp %})&mdash;include the autoloader, JavaScript, and CSS files.

**Step 2** Add a SkeletonContainer with a template or a grid.

    <?php
        $skeleton = new \Kendo\UI\SkeletonContainer('skeleton');

        $skeleton->animation('pulse')
            ->template('<div class="k-card">
            <div class="k-card-header">
                <div>
                    <span data-shape-circle class="k-card-image avatar"></span>
                </div>
                <div class="user-info">
                    <span data-shape-text class="k-card-title"></span>
                    <span data-shape-text class="k-card-subtitle"></span>
                </div>
            </div>
            <span data-shape-rectangle style="width: 340px; height: 100%;"></span>
            <div class="k-card-body">
                <span data-shape-text></span>
            </div>
        </div>');
    ?>

**Step 4** Output the chart by echoing the result of the `render` method.

    <?php
        echo $skeleton->render();
    ?>

## Reference

### Existing Instances

You are able to reference an existing SkeletonContainer instance via the [`jQuery.data()`](https://api.jquery.com/jQuery.data/).

    // Put this after your Kendo SkeletonContainer for PHP render() call
    <script>
    $(function() {
        // Notice that the name of the SkeletonContainer is used to get its client-side instance
        var SkeletonContainer = $("#SkeletonContainer").data("kendoSkeletonContainer");
    });
    </script>

## See Also

* [Overview of the Kendo UI SkeletonContainer Widget]({% slug overview_kendoui_skeletoncontainer_widget %})
* [Telerik UI for PHP API Reference SkeletonContainer](/api/php/Kendo/UI/SkeletonContainer)

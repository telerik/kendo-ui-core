---
title: Overview
page_title: Overview - SkeletonContainer JSP Tag
description: "Get started with the SkeletonContainer JSP tag in Kendo UI."
slug: overview_skeletoncontainer_uiforjsp
position: 1
---

# SkeletonContainer JSP Tag Overview

The SkeletonContainer JSP tag is a server-side wrapper for the [Kendo UI SkeletonContainer](/api/javascript/dataviz/ui/skeletoncontainer) widget.

## Getting Started

### Configuration

Below are listed the steps for you to follow when configuring the Kendo UI SkeletonContainer.

**Step 1** Make sure you followed all the steps from the [introductory article on Telerik UI for JSP]({% slug overview_uiforjsp %}).

**Step 2** Create a new action method to render the view.

        @RequestMapping(value="/skeletoncontainer/")
        public class IndexController {
                @RequestMapping(value = {"/", "/index"}, method = RequestMethod.GET)
                public String index() {
                        
                        return "/skeletoncontainer/index";
                }
        }

**Step 3** Add a SkeletonContainer with a template or a grid

        <kendo:skeletonContainer name="skeleton" animation="pulse" template="<div class='k-card'>
                        <div class='k-card-header'>
                        <div>
                                <span data-shape-circle class='k-card-image avatar'></span>
                        </div>
                        <div class='user-info'>
                                <span data-shape-text class='k-card-title'></span>
                                <span data-shape-text class='k-card-subtitle'></span>
                        </div>
                        </div>
                        <span data-shape-rectangle style='width: 340px; height: 100%;'></span>
                        <div class='k-card-body'>
                        <span data-shape-text></span>
                        </div>
                </div>">
        </kendo:skeletonContainer>

## Reference

### Existing Instances

You are able to reference an existing SkeletonContainer instance via [`jQuery.data()`](https://api.jquery.com/jQuery.data/).

        //Put this after your Kendo UI SkeletonContainer tag
        <script>
                $(function() {
                // Notice that the name of the SkeletonContainer is used to get its client-side instance
                var SkeletonContainer = $("#SkeletonContainer").data("kendoSkeletonContainer");
                });
        </script>

## See Also

* [Overview of the Kendo UI SkeletonContainer Widget]({% slug overview_kendoui_skeletoncontainer_widget %})
---
title: Overview
page_title: Overview
description: "Learn the basics when working with the Telerik UI FloatingActionButton TagHelper for ASP.NET Core."
slug: taghelpers_floatingactionbutton_aspnetcore_overview
position: 1
---

# FloatingActionButton TagHelper Overview

The Telerik UI FloatingActionButton TagHelper for {{ site.framework }} is a server-side wrapper for the Kendo UI FloatingActionButton widget.

The FloatingActionButton is a UI component that is tied to the most logical action that we expect from a user looking at a particular screen. For example, the most logical action for a user looking at the main screen of a mobile messaging app is to write a message. You can implement a FloatingActionButton that allows the user to compose a new message.

The FloatingActionButton floats in the application above other items, and its main action directly corresponds to the content on the screen. Apart from being a single button with a single action, the FloatingActionButton can also be configured to display additional related actions or speed dial actions.

* [Demo page for the FloatingActionButton](https://demos.telerik.com/aspnet-core/floatingactionbutton/tag-helper)

## Basic Configuration

The following example demonstrates how to initialize the FloatingActionButton using the TagHelper wrapper.

```tagHelper
    <kendo-floatingactionbutton name="fab"
                                align="FloatingActionButtonAlign.BottomCenter"
                                align-offset-vertical="50"
                                position-mode="FloatingActionButtonPositionMode.Absolute"
                                icon="share"
                                shape="FloatingActionButtonShape.Pill"
                                size="FloatingActionButtonSize.Medium"
                                theme-color="FloatingActionButtonThemeColor.Info"
                                >
        <floatingactionbutton-items>
            <floatingactionbutton-item label="Download" icon="download" click="onItemClick"></floatingactionbutton-item>
            <floatingactionbutton-item label="Print" icon="print" click="onItemClick"></floatingactionbutton-item>
            <floatingactionbutton-item label="Email" icon="email" click="onItemClick"></floatingactionbutton-item>
        </floatingactionbutton-items>
    </kendo-floatingactionbutton>
```

## Functionality and Features

* [Alignment]({% slug taghelpers_alignment_floatingactionbutton_aspnetcore %})
* [Appearance]({% slug taghelpers_appearance_floatingactionbutton_aspnetcore %})
* [Templates]({% slug taghelpers_templates_floatingactionbutton_aspnetcore %})

## Events

You can subscribe to all FloatingActionButton events.

```tagHelper
   <kendo-floatingactionbutton name="fab"
                                on-click="onClick"
                                on-expand="onExpand"
                                on-collapse="onCollapse"
                                align="FloatingActionButtonAlign.BottomCenter"
                                align-offset-vertical="50"
                                position-mode="FloatingActionButtonPositionMode.Fixed"
                                icon="share"
                                >
        <floatingactionbutton-items>
            <floatingactionbutton-item label="Download" icon="download" click="onItemClick"></floatingactionbutton-item>
            <floatingactionbutton-item label="Print" icon="print" click="onItemClick"></floatingactionbutton-item>
            <floatingactionbutton-item label="Email" icon="email" click="onItemClick"></floatingactionbutton-item>
        </floatingactionbutton-items>
    </kendo-floatingactionbutton>

    <script>
        function onClick(e){
            //handle the FloatingActionButton click event
        };
        
        function onExpand(e){
            //handle the FloatingActionButton expand event
        };

        function onCollapse(e){
            //handle the FloatingActionButton collapse event
        };

        function onItemClick(e){
            //handle the FloatingActionButton action item event
        };
    </script>
```

## See Also

* [Basic Usage of the FloatingActionButton TagHelper for ASP.NET Core (Demo)](https://demos.telerik.com/aspnet-core/floatingactionbutton/tag-helper)

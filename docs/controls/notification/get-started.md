---
title: Getting Started
page_title: jQuery Notification Documentation - Getting Started with the Notification
description: "Get started with the jQuery Notification by Kendo UI and learn how to create, initialize, and enable the component."
components: ["notification"]
slug: getting_started_kendoui_notification_component
position: 1
---

# Getting Started with the Notification

This guide demonstrates how to get up and running with the Kendo UI for jQuery Notification.

After the completion of this guide, you will be able to achieve the following end result:

```dojo
    <span id="notification"></span>
    <script>
      $("#notification").kendoNotification({
        allowHideAfter: 1000,
        width: 300,
        position: {
          pinned: true,
          top: null,
          left: null,
          bottom: 200,
          right: 200
        }
      });

      $("#notification").getKendoNotification().show("Some additional information message", "info");
    </script>
```

## 1. Create a span Element

First, create a `<span>` element on the page that will be used to initialize the component.

```html
<span id="notification"></span>
```

## 2. Initialize the Notification

In this step, you will initialize the Notification from the `<span>` element.

```html
<span id="notification"></span>

<script>
    // Target the span element by using jQuery and then call the kendoNotification() method.
    $("#notification").kendoNotification({
        // Add some basic configuration such as width.
		    allowHideAfter: 1000,
        width: 300,
    });
</script>
```

## 3. Display the Notification

To render the Notification, use the [`show`](https://docs.telerik.com/kendo-ui/api/javascript/ui/notification/methods/show) or [`showText`](https://docs.telerik.com/kendo-ui/api/javascript/ui/notification/methods/showtext) methods.

```html
	<span id="notification"></span>
    <script>
      $("#notification").kendoNotification({
        ....
      });

      $("#notification").getKendoNotification().show("Some additional information message", "info");
    </script>
```

## 4. Configure the Position

You can customize the [`position`](https://docs.telerik.com/kendo-ui/api/javascript/ui/notification/configuration/position) of the displayed component and whether the notifications will move together with the page content during scrolling.

```html
	<span id="notification"></span>
    <script>
      $("#notification").kendoNotification({       
        allowHideAfter: 1000,
        width: 300,
        position: {
          pinned: true,
          top: null,
          left: null,
          bottom: 200,
          right: 200
        }
      });

      $("#notification").getKendoNotification().show("Some additional information message", "info");
    </script>
```


## Next Steps

* [Referencing Existing Component Instances]({% slug widget_methodsand_events_kendoui_installation %})
* [Demo Page for the Kendo UI for jQuery Notification](https://demos.telerik.com/kendo-ui/notification/index)

## See Also

* [JavaScript API Reference of the jQuery Notification](/api/javascript/ui/notification)
* [Knowledge Base Section](/knowledge-base)



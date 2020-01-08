---
title: Templates
page_title: Templates
description: "Learn the basics when working with the Telerik UI Notification HtmlHelper for ASP.NET MVC."
previous_url: /helpers/layout/notification/templates
slug: templates_notificatiomhelper_aspnetmvc
position: 5
---

# Templates

Notifications enable you to configure multiple templates.

Each template is used together with its corresponding built-in or custom [notification type]({% slug types_notificatiomhelper_aspnetmvc %}). If you define a custom template for a built-in notification type, you will not be able to use the corresponding built-in template but you can still use the shorthand show methods.

The following example demonstrates how to use Notification templates.

    <script id="myAlertTemplate" type="text/x-kendo-template">
        <div class="myAlert">System alert generated at #= time # : #= myMessage #</div>
    </script>

    @(Html.Kendo().Notification()
        .Name("notification")
        .Templates(t =>
        {
            // Define a custom template for the built-in "warning" Notification type.
            t.Add().Type("warning").ClientTemplate("<div class='myWarning'>Warning: #= myMessage #</div>");
            // Define a template for the custom "timeAlert" Notification type.
            t.Add().Type("timeAlert").ClientTemplate("<div class='myAlert'>System alert generated at #= time # : #= myMessage #</div>");
            // The template content can also be defined separately. The above line can be replaced with the following:
            t.Add().Type("timeAlert").ClientTemplateID("myAlertTemplate");
        })
    )

    <script>
        $(function(){
            var n = $("#notification").data("kendoNotification");

            // Show a warning message by using the built-in shorthand method.
            n.warning({
                myMessage: "some warning message here"
            });

            // Show a "timeAlert" message by using the default show() method.
            n.show({
                time: new Date().toLocaleTimeString(),
                myMessage: "Server will be restarted."
            }, "timeAlert");
        });
    </script>

## See Also

* [Using Templates in the Notification HtmlHelper for {{ site.framework }} (Demo)](https://demos.telerik.com/{{ site.platform }}/notification/templates)
* [NotificationBuilder Server-Side API](/api/Kendo.Mvc.UI.Fluent/NotificationBuilder)
* [Notification Server-Side API](/api/notification)

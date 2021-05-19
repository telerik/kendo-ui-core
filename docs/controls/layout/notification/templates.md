---
title: Templates
page_title: jQuery Notification Documentation | Templates
description: "Get started with the jQuery Notification by Kendo UI and use the templates of the widget."
slug: templates_kendoui_notification
position: 5
---

# Templates

The Notification allows you to configure multiple templates.

Each template is used together with its corresponding built-in or custom [notification type]({% slug types_kendoui_notification %}). If you define a custom template for a built-in notification type, you will no longer be able to use the corresponding built-in template but you will still be able to use the shorthand `show` methods. For more information, refer to the article on [implementing the Kendo UI templates]({% slug overview_kendoui_templatescomponent %}).

    <span id="notification"></span>

    <script id="myAlertTemplate" type="text/x-kendo-template">
        <div class="myAlert">System alert generated at #= time # : #= myMessage #</div>
    </script>

	<script>
	$(function(){
        var notificationElement = $("#notification");

		notificationElement.kendoNotification({
            templates: [{
                    // Define a custom template for the built-in "warning" notification type.
                    type: "warning",
                    template: "<div class='myWarning'>Warning: #= myMessage #</div>"
                }, {
                    // Define a template for the custom "timeAlert" notification type.
                    type: "timeAlert",
                    template: "<div class='myAlert'>System alert generated at #= time # : #= myMessage #</div>"
                    // The template content can also be defined separately.
                    // template: $("#myAlertTemplate").html()
            }]
        });

        var n = notificationElement.data("kendoNotification");

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

* [Using Templates in the Notification (Demo)](https://demos.telerik.com/kendo-ui/notification/templates)
* [JavaScript API Reference of the Notification](/api/javascript/ui/notification)

---
title: Events
page_title: Events
description: "Learn how to handle the events of the Telerik UI DropDownButton component for {{ site.framework }}."
slug: events_dropdownbutton
position: 5
---

# Events

The DropDownButton component [exposes the `Click()`, `Open()`, and `Close()` events](/api/Kendo.Mvc.UI.Fluent/DropDownButtonEventBuilder) that you can handle and further customize the functionality of the component.

For a complete example on basic DropDownButton events, refer to the [demo on using the events of the DropDownButton](https://demos.telerik.com/{{ site.platform }}/dropdownbutton/events).

```HtmlHelper
    @(Html.Kendo().DropDownButton()
        .Name("dropDownButton")
        .Text("User Settings")
        .Icon("user")
        .ThemeColor(ThemeColor.Primary)
        .FillMode(FillMode.Solid)
        .Items(items=>{
            items.Add().Id("profile").Text("My Profile").Icon("image");
            items.Add().Id("friend-request").Text("Friend Requests").Icon("tell-a-friend");
            items.Add().Id("settings").Text("Account Settings").Icon("gear");
            items.Add().Id("support").Text("Support").Icon("question-circle");
            items.Add().Id("logout").Text("Log Out").Icon("logout");
        })
        .Events(e=>e.Click("onClick").Open("onOpen").Close("onClose"))
    )

    <script>
        function onClick(e) {
            console.log("event :: click (#" + e.id + ")" );
        }

        function onOpen(e) {
            console.log("event :: open" );
        }

        function onClose(e) {
            console.log("event :: close" );
        }
    </script>
```
{% if site.core %}
```TagHelper
    @addTagHelper *, Kendo.Mvc

    <kendo-dropdownbutton name="dropDownButton" text="User Settings" theme-color="ThemeColor.Primary" fill-mode="FillMode.Solid" icon="user" on-click="onClick" on-open="onOpen" on-close="onClose">
        <dropdownbutton-items>
            <item id="profile" text="My Profile" icon="image"></item>
            <item id="friend-request" text="Friend Requests" icon="tell-a-friend"></item>
            <item id="settings" text="Account Settings" icon="gear"></item>
            <item id="support" text="Support" icon="question-circle"></item>
            <item id="logout" text="Log Out" icon="logout"></item>
        </dropdownbutton-items>
    </kendo-dropdownbutton>

    <script>
        function onClick(e) {
            console.log("event :: click (#" + e.id + ")" );
        }

        function onOpen(e) {
            console.log("event :: open" );
        }

        function onClose(e) {
            console.log("event :: close" );
        }
    </script>
```
{% endif %}

## Next Steps

* [Using the DropDownButton Events (Demo)](https://demos.telerik.com/aspnet-core/dropdownbutton/events)
* [API for Configuring DropDownButton events](/api/Kendo.Mvc.UI.Fluent/DropDownButtonEventBuilder)

## See Also

* [Using the API of the DropDownButton for {{ site.framework }} (Demo)](https://demos.telerik.com/{{ site.platform }}/dropdownbutton/api)
* [DropDownButton Server-Side API](/api/dropdownbutton)
* [DropDownButton Client-Side API](https://docs.telerik.com/kendo-ui/api/javascript/ui/dropdownbutton)

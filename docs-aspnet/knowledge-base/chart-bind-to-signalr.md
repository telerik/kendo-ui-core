---
title: Bind Chart to SignalR
description: Learn how to bind a Telerik UI for {{ site.framework }} Chart to SignalR.
type: how-to
page_title: Binding a Chart to SignalR
previous_url: html-helpers/charts/how-to/binding-to-singalr
slug: chart-bind-to-signalr
tags: chart, databound, signalr
res_type: kb
---

# Description
How can I bind a Telerik UI for {{ site.framework }} Chart to SignalR?

# Example
```HtmlHelper
    @(Html.Kendo().Notification()
      .Name("notification")
      .Width("100%")
      .Position(position => position.Top(0).Left(0))
    )
    @(Html.Kendo().Chart<TelerikAspNetCoreApp3.Models.ProductViewModel>()
            .Name("chart")
            .Legend(false)
            .DataSource(dataSource => dataSource
                .SignalR()
                .AutoSync(true)
                .Events(events => events.Push(@<text>
                                                   function(e) {
                                                        var notification = $("#notification").data("kendoNotification");
                                                        notification.success(e.type);
                                                   }
                                               </text>))
                .Sort(s => s.Add("CreatedAt").Descending())
                .Transport(tr => tr
                    .Promise("hubStart")
                    .Hub("hub")
                    .Client(c => c
                        .Read("read")
                        .Create("create")
                        .Update("update")
                        .Destroy("destroy"))
                    .Server(s => s
                        .Read("read")
                        .Create("create")
                        .Update("update")
                    .Destroy("destroy"))
                )
                .Schema(schema => schema
                    .Model(model =>
                    {
                        model.Id("ID");
                        model.Field("ID", typeof(string)).Editable(false);
                        model.Field("CreatedAt", typeof(DateTime));
                        model.Field("UnitPrice", typeof(int));
                    }
                ))
            )
            .Series(series =>
            {
                series.Line(
                    model => model.UnitPrice,
                    categoryExpression: model => model.ProductName
                );
            })
            .Transitions(false)
            .CategoryAxis(axis =>
                axis.Labels(labels => labels.Rotation(-90))
            )
    )
```

```JavaScript
<script src="https://cdn.jsdelivr.net/npm/signalr@2.4.3/jquery.signalR.min.js"></script>

<script>
    var hubUrl = "https://demos.telerik.com/kendo-ui/service/signalr/hubs";
    var connection = $.hubConnection(hubUrl, { useDefaultPath: false });
    var hub = connection.createHubProxy("productHub");
    var hubStart = connection.start({ jsonp: true });
</script>
```
```Styles
  <style>
    .footer:first-of-type {
        display: none !important;
    }
  </style>
```

For the complete implementation refer to the GitHub repo with the [sample project of a SignalR-bound Chart](https://github.com/telerik/ui-for-aspnet-mvc-examples/tree/master/Telerik.Examples.Mvc/Telerik.Examples.Mvc/Areas/ChartSignalR).

## More {{ site.framework }} Chart Resources

* [{{ site.framework }} Chart Documentation]({%slug htmlhelpers_charts_aspnetcore%})

* [{{ site.framework }} Chart Demos](https://demos.telerik.com/{{ site.platform }}/charts/index)

{% if site.core %}
* [{{ site.framework }} Chart Product Page](https://www.telerik.com/aspnet-core-ui/charts)

* [Telerik UI for {{ site.framework }} Video Onboarding Course (Free for trial users and license holders)]({%slug virtualclass_uiforcore%})

* [Telerik UI for {{ site.framework }} Forums](https://www.telerik.com/forums/aspnet-core-ui)

{% else %}
* [{{ site.framework }} Chart Product Page](https://www.telerik.com/aspnet-mvc/charts)

* [Telerik UI for {{ site.framework }} Video Onboarding Course (Free for trial users and license holders)]({%slug virtualclass_uiformvc%})

* [Telerik UI for {{ site.framework }} Forums](https://www.telerik.com/forums/aspnet-mvc)
{% endif %}

## See Also

* [Client-Side API Reference of the Chart for {{ site.framework }}](https://docs.telerik.com/kendo-ui/api/javascript/ui/chart)
* [Server-Side API Reference of the Chart for {{ site.framework }}](https://docs.telerik.com/{{ site.platform }}/api/chart)
{% if site.core %}
* [Server-Side TagHelper API Reference of the Chart for {{ site.framework }}](https://docs.telerik.com/{{ site.platform }}/api/taghelpers/chart)
{% endif %}
* [Telerik UI for {{ site.framework }} Breaking Changes]({%slug breakingchanges_2023%})
* [Telerik UI for {{ site.framework }} Knowledge Base](https://docs.telerik.com/{{ site.platform }}/knowledge-base)

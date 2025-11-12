#status-telerik-com

## Telerik NuGet Feed Status

Visit [status.telerik.com](https://status.telerik.com) to check the status of the Telerik NuGet server. The top section shows manually logged incidents with possible updates or workaround suggestions. The [**System Metrics** section](https://status.telerik.com/#system-metrics) provides real-time automated diagnostics.

#end

#identical-versions-note-core

> The installed {{ site.product }} NuGet package and the required [client-side assets]({% slug copyclientresources_aspnetmvc6_aspnetmvc %}) must have identical versions.

#end

#identical-versions-note-mvc

> The `Kendo.Mvc.dll` and the required [client-side assets]({% slug copyclientresources_aspnetmvc6_aspnetmvc %}) must have identical versions.

#end

#scripts-references-notes

>* The `kendo.all.min.js` and `kendo.aspnetmvc.min.js` scripts must be loaded after the `jquery.min.js` script.
>* `jQuery` must be loaded only once. Ensure there are no duplicate references elsewhere in the `_Layout`.
>* Starting with version 2023.3.1010, the Kendo UI bundles do not include the jQuery library in their `js` directories and you can use any available jQuery source you prefer (https://jquery.com/download/).

#end
---
title: Internationalization
page_title: Internationalization
description: "Get started with the {{ site.product_short }} FileManager and learn about the options it supports for parsing and formatting of dates and numbers."
slug: intl_aspnetcore_filemanager
position: 2
---

# Internationalization

The internationalization process applies specific culture formats to a web application by providing options for the parsing and formatting of dates and numbers.

For more information, refer to the [globalization overview]({% slug overview_globalization_core %})

## Showing Dates Depending on the Client Timezone

By default, the Grid creates its `date` objects on the client immediately after they are received from the server. Based on the current time, the default JavaScript `date` object automatically adds the time offset. The default behavior is such because the `date` objects demonstrate the same default behavior and most users expect to see the date in its current timezone.

## Using UTC on Both Client and Server

To display the date in a UTC timezone regardless of the user timezone, refer to the complete example on [setting the UTC timezone on both client and server (MVC Project)](https://github.com/telerik/ui-for-aspnet-mvc-examples/tree/master/grid/utc-on-server-and-client).

## See also

* [Localization of Messages]({% slug localization_aspnetcore_grid %})
* [Globalization in {{ site.product }}]({% slug overview_globalization_core %})

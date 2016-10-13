---
title: SharePoint 2013 Add-Ins
page_title: SharePoint 2013 Add-Ins | Kendo UI Third-Party Frameworks
description: "Learn in theory and in practice how to build SharePoint add-ins with Kendo UI."
slug: sharepoint_tutorials
position: 1
---

# SharePoint 2013 Add-Ins

This article provides information on how to build SharePoint add-ins with Kendo UI.

## Overview

With the release of SharePoint 2013, Microsoft allow the building of solutions through self-contained extensions called SharePoint Add-Ins. Instead of being based on ASP.NET, add-ins are built by using a combination of web technologies like HTML, CSS, and JavaScript.

SharePoint add-ins come in two flavors:
* SharePoint-hosted add-ins&mdash;served through SharePoint websites and are built with a combination of HTML, CSS, and JavaScript
* Provider-hosted add-ins&mdash;utilize external resources to SharePoint and can be built using any web stack (i.e. PHP)

The evolution of the add-in model allows for the incorporation of web technologies which enable the use of front-end libraries and tools such as Kendo UI.

Kendo UI is a well-suited solution when building SharePoint add-ins because of the following features it provides:
* Easy integration with the SharePoint REST API.
* Built-in themes, including one that matches the Office 365 look and feel.
* Built-in export functionalities to most common office formats, such as Excel, PDF, and image files.
* Widely-recognized accessibility standards like WAI-ARIA, WCAG 2.0, and Section 508.  

## Milestones

This section highlights specific aspects from the building process of SharePoint 2013 add-ins with Kendo UI.

For the demo on how to do this, refer to the [GitHub project](https://github.com/telerik/kendo-ui-sharepoint-2013-demo). This repo provides an example of what a SharePoint add-in might look like with the Chart, DropDownList, and Scheduler components from Kendo UI. an example of what a SharePoint Add-in might look like with the Chart, DropDownList, and Scheduler components from Kendo UI integrated with backend data from SharePoint REST APIs.

For the complete guide, refer to the [online tutorial by John Bristowe](http://developer.telerik.com/featured/building-sharepoint-add-ins-with-kendo-ui/).

### DataSource Configuration

For more information on the Kendo UI DataSource abstraction, refer to [its introductory article]({% slug overview_kendoui_datasourcecomponent %}).

Configure the DataSource to access the SharePoint REST API

Once the resources for Kendo UI have been installed and set for the SharePoint Add-in, the next step is to configure a DataSource component to work with data from the SharePoint site. This includes data stored in document libraries, lists metadata, or user profiles.

SharePoint exposes a number of RESTful services that are secured against unauthorized access and that can be consumed by the DataSource to perform CRUD operations.

SharePoint-Hosted Add-Ins

Evokes a security context by requiring user authentication that occurs as a separate step with a security token provided and used in the configuration of the DataSource.

To ensure the correct configuration of the DataSource, use its [`transport`](/api/javascript/data/datasource#configuration-transport).
Define a model for your DataSource since it drives the serialization plumbing.
Configure the DataSource to include the Accept request-header with the JSON MIME-type specified because SharePoint uses Atom as the default response format for its services.
Define a `data()` function to parse the payload that's returned by the SharePoint REST API due to the presence of the `odata=verbose` request-header. When doing so, use the following boilerplate:

```
function (data) {
  return data.d && data.d.results ? data.d.results : [data.d];
}
```

### CRUD Configuration

Load data into the DataSource by using the `read` operation. Services are exposed by SharePoint through the URI structure&mdash;`<server>/<site>/_api/<feature_area>/<resource>`. Configure the DataSource through the URL property of the `read` operation to load it with data from the service endpoint.

The SharePoint REST API are exposed through a URI structure and the DataSource is configured to target the endpoint that maps to create operations. Since these services are RESTful, the DataSource must use the POST request method for create operations.
Configure the the update and destory methods. These operations target service endpoints that reference individual resources. Update and destroy operations target service endpoints through the MERGE and DELETE request methods respectively.

### Integrate with Kendo UI Widgets

Chart, DropDownList, and Scheduler

## See Also

* [Demo](https://github.com/telerik/kendo-ui-sharepoint-2013-demo)
* [Tutorial](http://developer.telerik.com/featured/building-sharepoint-add-ins-with-kendo-ui/)

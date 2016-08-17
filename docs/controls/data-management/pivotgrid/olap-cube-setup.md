---
title: OLAP Cube Setup
page_title: OLAP Cube Setup | Kendo UI PivotGrid
description: "Learn how to set up the OLAP Cube when working with the Kendo UI PivotGrid widget."
slug: olap_cube_setup_pivotgrid_widget
position: 5
---

# OLAP Cube Setup

This article demonstrates the required steps to set up the OLAP Cube by using Microsoft SQL Server Analysis Services [SSAS](http://technet.microsoft.com/en-us/library/ms175609(v=sql.90).aspx).

## Install SSAS

For detailed information on how to install the [SQL Server Analysis Services](http://technet.microsoft.com/en-us/library/ms175609(v=sql.90).aspx), follow the [MSDN tutorial](http://msdn.microsoft.com/en-us/library/hh403424(v=sql.110).aspx).

## Define OLAP Cube

For detailed information on how to create, define, and deploy the OLAP multidimensional cube, follow the [MSDN multidimensional modelling tutorial](http://msdn.microsoft.com/en-us/library/ms170208(v=sql.110).aspx).

## Configure HTTP Access

HTTP access to SQL Server Analysis Services can be enabled by using a MSMDPUMP.ddl ISAPI extension.

For detailed information on how to set up the MSMDPUMP.ddl extension, follow the [MSDN HTTP access tutorial](http://technet.microsoft.com/en-us/library/gg492140.aspx).

For an online accessible OLAP service for test purposes, use `http://demos.telerik.com/olap/msmdpump.dll`. Note that the URL does not open directly in the browser.

## Enable Cross-Domain Access

> **Important**  
> This step is not required if the cube is not intended to be requested from different domains.

For detailed information on Cross-Origin Resource Sharing (CORS), follow [this link](https://developer.mozilla.org/en-US/docs/Web/HTTP/Access_control_CORS).

If you want to allow cross-domain requests to the OLAP service, enable the CORS behavior of your server. The sections below demonstrate how to enable CORS of an [Internet Information Services (IIS)](http://www.iis.net/) server.

Cross-domain access requires you to configure HTTP Response Headers and the `OPTIONS` method server response.

### Configure HTTP Response Headers

To configure HTTP Response Headers, specify:
* The domains that will perform the data requests.
* An [HTTP method](http://www.w3.org/Protocols/rfc2616/rfc2616-sec9.html) through which the data will be transferred.
* HTTP Headers that can be used in the requests.
* User credentials that are going to be required if an authenticated access is used.

The example below demontrates the list of HTTP Response Headers that show the settings required to enable the IIS CORS behavior.

###### Example

<table>
    <tbody>
        <tr>
            <th>
                <p>Header Name</p>
            </th>
            <th>
                <p>Value</p>
            </th>
            <th>
                <p>Details</p>
            </th>
        </tr>
        <tr>
            <td><strong>Access-Control-Allow-Headers</strong></td>
            <td><code>Origin, Content-Type, Accept</code></td>
            <td>
                <p>These are the names of the fields required to be used in the actual request. Values should be comma-separated.</p>
                <ul>
                    <li><code>Origin</code> – this field indicates where the cross-origin or preflight request originates from. This setting tells the server that the origin, which performs the request is a known one.</li>
                    <li><code>Content-Type</code> – this field indicates the content (MIME) type of the entity body sent to the recipient. The actual content type used in the communication between OLAP service and Kendo UI <code>PivotDataSource</code> is text/xml.</li>
                    <li><code>Accept</code> – this field specifies the media types which are acceptable for the response.</li>
                </ul>
            </td>
        </tr>
        <tr>
            <td><strong>Access-Control-Allow-Origin</strong></td>
            <td>
                <p>The URI names that may access the resource. When an asterisk (*) is defined, all domains are allowed.</p>
            </td>
            <td>
                <p>The names of the allowed domains should be separated by comma (,).</p>
            </td>
        </tr>
        <tr>
            <td><strong>Access-Control-Request-Method</strong></td>
            <td><code>POST</code></td>
            <td>
                <p>The name of the HTTP method to be used in the actual request.</p>
                <p>The XMLA protocol specifies an HTTP <code>POST</code> method.</p>
            </td>
        </tr>
        <tr>
            <td><strong>Access-Control-Allow-Credentials</strong> (authenticated access only)</td>
            <td><code>true</code></td>
            <td>
                <p>The allowed values are:</p>
                <ul>
                    <li><code>true</code> – allows suppliying of credentials with the request.</li>
                    <li><code>false</code> – disable supplying of credentials with the request. Equal to an altogether missing header.</li>
                </ul>
            </td>
        </tr>
    </tbody>
</table>

### Configure `OPTIONS` Method Server Response

To configure the `OPTIONS` method server response, specify the server response to the `OPTIONS` method requests. In IIS the `OPTIONS` method behavior should be configured via the `OPTIONSVerbHandler` mapping settings.

The example below demonstrates the list of settings that should be applied.

###### Example

<table>
    <tbody>
        <tr>
            <th>HTTP Handler Name</th>
            <th>Required Access Level</th>
            <th>Details</th>
        </tr>
        <tr>
            <td><code>OPTIONSVerbHandler</code></td>
            <td><code>Read</code></td>
            <td>
                <p>Specifies that the handler requires <code>READ</code> access to the requests.</p>
            </td>
        </tr>
    </tbody>
</table>

### Access Cube Securely

There are two possible approaches to implement a secured access to the OLAP instance:

* Use a proxy service which communicates with the cube on a secured protocol. This proxy should support the XMLA protocol. In the Microsoft world, the solution is to use [ADOMD.NET](https://technet.microsoft.com/en-us/library/ms123483%28v=sql.110%29.aspx). For detailed information on this, refer to [this forum thread](http://www.telerik.com/forums/securing-access-to-msmdpump-dll).

* Send the credentials with a request header, even though thus the **Username** and **Password** will be visible on the client side (browser). For details on how to pass credentials with request headers, refer to this [StackOverflow discussion](http://stackoverflow.com/questions/14579478/how-to-pass-credentials-for-a-webservice-using-jquery-ajax-call). You can define the required callbacks and settings directly in the [`transport.read`](http://docs.telerik.com/kendo-ui/api/javascript/data/datasource#configuration-transport.read) object, as they will be passed to the `$.ajax` method.

## See Also

Other article on the Kendo UI PivotGrid:

* [Overview]({% slug overview_kendoui_pivotgrid_widget %})
* [PivotConfigurator]({% slug overview_kendoui_pivotconfigurator_pivotgridwidget %})
* [Exporting]({% slug exporting_functionality_pivotgridwidget %})
* [Fundamentals]({% slug fundamentals_pivotgrid_widget %})
* [Frequently Asked Questions]({% slug frequently_asked_questions_pivotgrid %})

For how-to examples on the Kendo UI PivotGrid widget, browse its [**How To** documentation folder]({% slug howto_add_dimension_column_axis_pivotgrid %}).

---
title: OLAP Cube Setup
page_title: OLAP Cube Setup
description: "Get started with the Telerik UI PivotGrid HtmlHelper for {{ site.framework }} and learn how to set up the OLAP cube when working with the Telerik UI PivotGrid HtmlHelper for {{ site.framework }}."
slug: htmlhelpers_pivotgrid_aspnetcore_olap_cube_setup
position: 3
---

# OLAP Cube Setup

You can set up the OLAP cube by using Microsoft SQL Server Analysis Services [SSAS](http://technet.microsoft.com/en-us/library/ms175609(v=sql.90).aspx).

## Installing SSAS

For more information on installing the [SQL Server Analysis Services](http://technet.microsoft.com/en-us/library/ms175609(v=sql.90).aspx), refer to the [MSDN tutorial](http://msdn.microsoft.com/en-us/library/hh403424(v=sql.110).aspx).

## Defining the OLAP Cube

For more information on creating, defining, and deploying the OLAP multidimensional cube, refer to the [MSDN multidimensional modelling tutorial](http://msdn.microsoft.com/en-us/library/ms170208(v=sql.110).aspx).

## Configuring the HTTP Access

To enable the HTTP access to the SQL Server Analysis Services, use an `MSMDPUMP.ddl` ISAPI extension.

* For more information on setting up the `MSMDPUMP.ddl` extension, refer to the [MSDN HTTP access tutorial](http://technet.microsoft.com/en-us/library/gg492140.aspx).
* For an online accessible OLAP service for testing purposes, use `https://demos.telerik.com/olap/msmdpump.dll`. The URL does not open directly in the browser.

## Enabling the Cross-Domain Access

> If the cube will not be requested from different domains, skip this step.

To allow cross-domain requests to the OLAP service, enable the CORS behavior of your server. For more information on Cross-Origin Resource Sharing (CORS), refer to [this link](https://developer.mozilla.org/en-US/docs/Web/HTTP/Access_control_CORS).

The following sections demonstrate how to enable CORS on an [Internet Information Services (IIS)](http://www.iis.net/) server. Cross-domain access requires you to configure the HTTP Response Headers and the `OPTIONS` method server response.

### Configuring HTTP Response Headers

To configure HTTP Response Headers, specify the following requirements:
* The domains that will perform the data requests.
* An [HTTP method](http://www.w3.org/Protocols/rfc2616/rfc2616-sec9.html) through which the data will be transferred.
* The HTTP headers that can be used in the requests.
* The user credentials that will be required if an authenticated access is used.

The following example demonstrates the list of the HTTP Response Headers that show the settings which are required to enable the IIS CORS behavior.

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
                <p>These are the names of the fields which are required to be used in the actual request. The values have to be separated with commas.</p>
                <ul>
                    <li><code>Origin</code> - This field provides information about the location from which the cross-origin or pre-flight request originates. This setting indicates to the server that the origin which performs the request is known.</li>
                    <li><code>Content-Type</code> – This field indicates the content (MIME) type of the entity body that is sent to the recipient. The actual content type which is used in the communication between the OLAP service and the <code>PivotDataSource</code> is text or XML.</li>
                    <li><code>Accept</code> – This field specifies the media types which are acceptable for the response.</li>
                </ul>
            </td>
        </tr>
        <tr>
            <td><strong>Access-Control-Allow-Origin</strong></td>
            <td>
                <p>The URI names that may access the resource. When an asterisk (*) is defined, all domains are allowed.</p>
            </td>
            <td>
                <p>The names of the allowed domains have to be separated with a comma (,).</p>
            </td>
        </tr>
        <tr>
            <td><strong>Access-Control-Request-Method</strong></td>
            <td><code>POST</code></td>
            <td>
                <p>The name of the HTTP method that will be used in the actual request.</p>
                <p>The XMLA protocol specifies an HTTP <code>POST</code> method.</p>
            </td>
        </tr>
        <tr>
            <td><strong>Access-Control-Allow-Credentials</strong> (authenticated access only)</td>
            <td><code>true</code></td>
            <td>
                <p>The allowed values are:</p>
                <ul>
                    <li><code>true</code> – Allows the supply of credentials with the request.</li>
                    <li><code>false</code> – Disables the supply of credentials with the request. Equal to an altogether missing header.</li>
                </ul>
            </td>
        </tr>
    </tbody>
</table>

### Configuring the OPTIONS Method Server Response

To configure the `OPTIONS` method server response, specify the server response to the `OPTIONS` method requests. In IIS, configure the behavior of the `OPTIONS` method through the `OPTIONSVerbHandler` mapping settings.

The following example demonstrates the list of settings that you have to apply.

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

### Accessing the Cube Securely

To implement a secured access to the OLAP instance, use either of the following approaches:
* Use a proxy service which communicates with the cube on a secured protocol. This proxy has to support the XMLA protocol. In the Microsoft world, the solution is to use [ADOMD.NET](https://technet.microsoft.com/en-us/library/ms123483%28v=sql.110%29.aspx). For more information, refer to [this forum thread](https://www.telerik.com/forums/securing-access-to-msmdpump-dll).
* Send the credentials with a request header even though the **Username** and **Password** will be visible on the client side (browser). For more information on passing credentials with request headers, refer to [this StackOverflow discussion](http://stackoverflow.com/questions/14579478/how-to-pass-credentials-for-a-webservice-using-jquery-ajax-call). You can define the required callbacks and settings directly in the [`transport.read`](https://docs.telerik.com/kendo-ui/api/javascript/data/datasource/configuration/transport.read) object because they will be passed to the `$.ajax` method.

## See Also

* [OLAP Cube Fundamentals]({% slug htmlhelpers_pivotgrid_aspnetcore_fundamentals %})
* [PivotConfigurator Overview]({% slug htmlhelpers_pivotgrid_aspnetcore_configurator %})

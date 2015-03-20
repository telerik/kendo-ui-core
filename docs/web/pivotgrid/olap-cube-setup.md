---
title: Setup OLAP cube
page_title: Quick steps for OLAP cube setup
description: A list of steps for OLAP cube setup and HTTP access
---

#OLAP Cube setup steps

This topic shows the required steps for the OLAP cube setup using MS [SSAS](http://technet.microsoft.com/en-us/library/ms175609(v=sql.90).aspx).

## Install SQL Server Analysis Services

To install [SQL Server Analysis Services](http://technet.microsoft.com/en-us/library/ms175609(v=sql.90).aspx) follow this [MSDN tutorial](http://msdn.microsoft.com/en-us/library/hh403424(v=sql.110).aspx).

## Define an OLAP Cube
Follow the [Multidimensional modeling tutorial](http://msdn.microsoft.com/en-us/library/ms170208(v=sql.110).aspx), which shows how to create, define and deploy OLAP multidimensional cube.

## Configure HTTP Access to Analysis Services
HTTP access to SQL Server Analysis Services can be enabled using a MSMDPUMP.ddl ISAPI extension. Follow this [tutorial](http://technet.microsoft.com/en-us/library/gg492140.aspx), which shows how to setup the MSMDPUMP.ddl extension. [Here](http://demos.telerik.com/olap/msmdpump.dll) you can find an online accessible OLAP service for test purposes.

## Enable cross-domain access to the OLAP service

For deeper understanding about **CORS** check this [article](https://developer.mozilla.org/en-US/docs/Web/HTTP/Access_control_CORS).

>This step is **not** required if the cube will **not** be requested from different domains.

If you want to allow cross-domain requests to the OLAP service, then you will need to enable CORS behavior of your server.

*This topic will examine how to enable CORS of [IIS](http://www.iis.net/)* server.

Cross-domain access requires to specify:

- *Domains* that will perform the data requests
- *[HTTP method](http://www.w3.org/Protocols/rfc2616/rfc2616-sec9.html)* through which the data will be transferred
- *HTTP Headers* that can be used in the requests
- *User credentials*,  required if an authenticated access needs to be used
- The server response to the *OPTIONS method* requests

The above points can be combined in two general steps:

1. Configure HTTP Response Headers (point 1 to 4)
2. Configure OPTIONS method server response (point 5)

### Configure HTTP Response Headers

The following list of HTTP Response Headers shows the settings required to enable the IIS CORS behavior:

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
            <td><em>Access-Control-Allow-Headers</em></td>
            <td><em>Origin, Content-Type, Accept</em></td>
            <td>
                <p>These are the names of the fields required to be used in the actual request. Values should be comma separated.</p>
                <ul>
                    <li><em>Origin</em> – this field indicates where the cross-origin or preflight request originates from. This setting tells the server that the origin, which performs the request is a known one.</li>
                    <li><em>Content-Type</em> – this field indicates the content (MIME) type of the entity body sent to the recipient. The actual content type used in the communication between **OLAP service** and **Kendo UI PivotDataSource** is <em>text/xml</em>.</li>
                    <li><em>Accept</em> – this field specifies the media types which are acceptable for the response.</li>
                </ul>
            </td>
        </tr>
        <tr>
            <td><em>Access-Control-Allow-Origin</em></td>
            <td>
                <p>The URI names that may access the resource. When an asterisk (*) is defined all domains are allowed.</p>
            </td>
            <td>
                <p>The names of the allowed domains should separed by comma (,).</p>
            </td>
        </tr>
        <tr>
            <td><em>Access-Control-Request-Method</em></td>
            <td><em>POST</em></td>
            <td>
                <p>The name of the HTTP method to be used in the actual request.</p>
                <p>XMLA protocol specify a HTTP POST method.</p>
            </td>
        </tr>
        <tr>
            <td><em>Access-Control-Allow-Credentials</em><em>(Authenticated access only)</em></td>
            <td><em>true</em></td>
            <td>
                <p>The allowed values are:</p>
                <ul>
                    <li><em>true</em> – allows suppliying of credentials with the request.</li>
                    <li><em>false</em> – disable supplying of credentials with the request. Equal to missing the header at all.</li>
                </ul>
            </td>
        </tr>
    </tbody>
</table>

### Configure OPTIONS method server response

In IIS OPTIONS method behavior should be configured via **OPTIONSVerbHandler** mapping settings. Here is the list of settings that should be applied:

<table>
    <tbody>
        <tr>
            <th>HTTP handler name</th>
            <th>Required Access Level</th>
            <th>Details</th>
        </tr>
        <tr>
            <td><em>OPTIONSVerbHandler</em></td>
            <td><em>Read</em></td>
            <td>
                <p>Specifies that the handler requires READ access to the requests.</p>
            </td>
        </tr>
    </tbody>
</table>

## Next steps:
- [Getting started](/web/pivotgrid/overview)
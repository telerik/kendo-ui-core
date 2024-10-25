---
title: QR Code Types
page_title: QR Code Types
description: "Explore the different overlay types of Telerik UI QRCode component for {{ site.framework }}."
slug: types_qrcodehelper_aspnetcore
position: 3
---

# QR Code Types

The QRCode component supports different overlay types.

## Swiss QR Type

The [Swiss QR Code format](https://blog.xsuite.com/en/swiss-qr-code) adds a **Swiss** cross in the QR code. You can enable it by setting the `Type("swiss")` option of the `Overaly()` configuration.

![{{ site.product_short }} Swiss Type](images/swissType.png)

The following implementation demonstrates the QRCode component with Swiss overlay:

```HtmlHelper
    @(Html.Kendo().QRCode()
         .Name("qrSwiss")
         .Value("SPC  0200  1  CH4431999123000889012  S  Robert Schneider AG  Rue du Lac  1268  2501  Biel  CH  1949.75  CHF  S  Pia-Maria Rutschmann-Schnyder  Grosse Marktgasse  28  9400  Rorschach  CH  QRR  210000000003139471430009017 Order of 15 June 2020  EPD  //S1/10/10201409/11/200701/20/140.000-53/30/102673831/31/200615/32/7.7/33/7.7:139.40/40/0:30  Name AV1: UV;UltraPay005;12345  Name AV2: XY;XYService;54321")
         .Overlay(o => o.Type("swiss").Width(26).Height(26))
         .Size(173)
    )
```
{% if site.core %}
```TagHelper
    @{
        var value = "SPC  0200  1  CH4431999123000889012  S  Robert Schneider AG  Rue du Lac  1268  2501  Biel  CH  1949.75  CHF  S     Pia-Maria Rutschmann-Schnyder  Grosse Marktgasse  28  9400  Rorschach  CH  QRR  210000000003139471430009017 Order of 15 June   2020  EPD  //S1/10/10201409/11/200701/20/140.000-53/30/102673831/31/200615/32/7.7/33/7.7:139.40/40/0:30  Name AV1: UV;    UltraPay005;12345  Name AV2: XY;XYService;54321";
    }

    <kendo-qrcode name="qrSwiss" value="@value" size="173">
        <overlay type="swiss" height="26" width="26" />
    </kendo-qrcode>
```
{% endif %}

For runnable example on the Swiss type, refer to the following online demo:

* [Swiss QR Code of the QRCode for {{ site.framework }} (Demo)](https://demos.telerik.com/{{ site.platform }}/qrcode/swiss)

## QRCode Image Type

The Image type of the overlay adds an image in the QR code.

![{{ site.product_short }} Image Type](images/imageType.png)

The following implementation demonstrates how to configure the image type in the QRCode component:

```HtmlHelper
    @(Html.Kendo().QRCode()
        .Name("qrImage")
        .Value("https://docs.telerik.com/aspnet-mvc/html-helpers/barcodes/qrcode/types")
        .Overlay(o => o.ImageUrl("https://demos.telerik.com/kendo-ui/content/shared/images/site/kendoka-cta.svg").Height(40).Width(40))
        .Size(173)
    )
```
{% if site.core %}
```TagHelper
    <kendo-qrcode name="qrImage" value="https://docs.telerik.com/aspnet-core/html-helpers/barcodes/qrcode/types" size="173">
        <overlay image-url="https://demos.telerik.com/kendo-ui/content/shared/images/site/kendoka-cta.svg" height="40" width="40" />
    </kendo-qrcode>
```
{% endif %}

For runnable sample on the QRCode defined with an Image type, refer to the following online demo:

* [Adding a Custom Logo of the QRCode for {{ site.framework }} (Demo)](https://demos.telerik.com/{{ site.platform }}/qrcode/image)

## See Also

* [Basic Usage of the QRCode component for {{ site.framework }} (Demo)](https://demos.telerik.com/{{ site.platform }}/qrcode/index)
* [Using the API of the QRCode component for {{ site.framework }} (Demo)](https://demos.telerik.com/{{ site.platform }}/qrcode/api)
* [Server-Side API](/api/qrcode)

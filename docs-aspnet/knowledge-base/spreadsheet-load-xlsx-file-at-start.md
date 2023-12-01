---
title: Spreadsheet Load an Excel File From Controller
description: Learn how to load a `.xlsx` file into the Spreadsheet upon initialization.
type: how-to
page_title: Loading an Excel File in the Spreadsheet
slug: spreadsheet-load-xlsx-file-at-start
tags: spreadsheet, xlsx, excel, file, initialization, start, server, load
ticketid: 1628152
res_type: kb
---

## Environment
<table>
    <tbody>
        <tr>
            <td>Product Version</td>
            <td>2023.3.1010</td>
        </tr>
        <tr>
            <td>Product</td>
            <td>{{ site.product }} Spreadsheet</td>
        </tr>
    </tbody>
</table>


## Description
I have a `.xlsx` file on the server and need to load it by default in the Spreadsheet after it initializes.

## Solution
1. Save the file in the **wwwroot/files** directory of the project.
2. Configure the Controller and an Action method that access the file and returns it in JSON format by using the **Telerik.Web.Spreadsheet** dependency. 

    ```Controller
            using Telerik.Web.Spreadsheet; 

            public class SpreadsheetController : Controller
                {

                    private readonly IWebHostEnvironment _hostingEnvironment;

                    public SpreadsheetController(IWebHostEnvironment hostingEnvironment)
                    {
                        _hostingEnvironment = hostingEnvironment;
                    }

                    public IActionResult ReadFile()
                    {
                        string filePath = Path.Combine(_hostingEnvironment.WebRootPath, "files", "Exported.xlsx");
                        var exists = System.IO.File.Exists(filePath);
                        if (System.IO.File.Exists(filePath))
                        {
                            Stream fileStream = System.IO.File.OpenRead(filePath);
                            var workbook = Workbook.Load(fileStream, Path.GetExtension(filePath));
                            return Content(workbook.ToJson(), Telerik.Web.Spreadsheet.MimeTypes.JSON);
                        }
                        else
                        {
                            return Content("File doesn't exist.");
                        }
                    }
            }
    ```

3. Set up an Ajax request to the <b>ReadFile</b> Action method and consume the JSON of the response with the use of the [`fromJSON()`](https://docs.telerik.com/kendo-ui/api/javascript/ui/spreadsheet/methods/fromjson) method.

    ```JavaScript
        function readFile(){
            $.ajax({
                url: "@Url.Action("ReadFile","Spreadsheet")",
                success: function (e) {
                    var spreadsheet = $("#spreadsheet").data("kendoSpreadsheet");
                    spreadsheet.fromJSON(e);
                },
                error: function (er) {
                    console.log(er);
                }
            })
        }
    ```

Review the complete implementation and test the behavior at our [Examples repo in GitHub](https://github.com/telerik/ui-for-aspnet-core-examples/blob/master/Telerik.Examples.Mvc/Telerik.Examples.Mvc/Views/Spreadsheet/Spreadsheet_Load_Xlsx_From_Server.cshtml).
## More {{ site.framework }} Spreadsheet Resources

* [{{ site.framework }} Spreadsheet Documentation]({%slug htmlhelpers_spreadsheet_aspnetcore%})

* [{{ site.framework }} Spreadsheet Demos](https://demos.telerik.com/{{ site.platform }}/spreadsheet)

{% if site.core %}
* [{{ site.framework }} Spreadsheet Product Page](https://www.telerik.com/aspnet-core-ui/spreadsheet)

* [Telerik UI for {{ site.framework }} Video Onboarding Course (Free for trial users and license holders)]({%slug virtualclass_uiforcore%})

* [Telerik UI for {{ site.framework }} Forums](https://www.telerik.com/forums/aspnet-core-ui)

{% else %}
* [{{ site.framework }} Spreadsheet Product Page](https://www.telerik.com/aspnet-mvc/spreadsheet)

* [Telerik UI for {{ site.framework }} Video Onboarding Course (Free for trial users and license holders)]({%slug virtualclass_uiformvc%})

* [Telerik UI for {{ site.framework }} Forums](https://www.telerik.com/forums/aspnet-mvc)
{% endif %}
## See Also
* [Client-Side API Reference of the Spreadsheet for {{ site.framework }}](https://docs.telerik.com/kendo-ui/api/javascript/ui/spreadsheet)
* [Server-Side API Reference of the Spreadsheet for {{ site.framework }}](https://docs.telerik.com/{{ site.platform }}/api/spreadsheet)
* [Understanding Telerik.Web.Spreadsheet and Document Processing Library Spreadsheet Workbook and Worksheets](https://docs.telerik.com/aspnet-core/knowledge-base/spreadsheet-understanding-telerik-web-spreadsheet-and-document-processing-library)
* [Telerik UI for {{ site.framework }} Breaking Changes]({%slug breakingchanges_2023%})
* [Telerik UI for {{ site.framework }} Knowledge Base](https://docs.telerik.com/{{ site.platform }}/knowledge-base)

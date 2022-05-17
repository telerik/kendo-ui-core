---
title: Security and Validation
page_title: Security and Validation
description: "Get started with Telerik UI for {{ site.framework }} and learn the fundamentals for XSS and CSRF attacks."
slug: aspnetcore_security_gettingstarted
previous_url: /getting-started/helper-basics/security-and-validation
position: 5
---

# Security and Validation

Preventing Cross-site scripting (XSS) and implementing validation for Cross-Site Request Forgery(CSRF) tokens can significantly boost the security of the application and prevent malicious script execution. 

## Cross-Site Scritping

### XSS Attacks 

Cross-site scripting attacks are a type of injection that aims to, in the majority of cases, cause harm to the application, gather personal information and executing malicious scripts. The attackers can use the XSS to bypass access controls such as the same-origin policy.

### XSS Protection 

Escaping any unsafe HTML tags should be mainly executed on the server-side. The client-side escaping can be easily bypassed if the attacker intercepts the to-be sent request and manually replaces the escaped tags. The server would receive the unescaped and unsafe HTML tags. This requires for a server-side validation and escaping for any potentially harmful tags. As a rule of thumb, unsafe HTML should never be saved in the database. 

> The server-side implementation for escaping the unsafe HTML tags has to be handled by the developer according to their go-to practices and preferences. 

## XSS handling in {{ site.product }}

Several {{ site.product }} components allow the user to input HTML or can display non-encoded HTML and can be a potential source of Cross-site scripting attacks, if not handled by the developer.

### Editor

The [Editor]({% slug htmlhelpers_editor_aspnetcore %}) provides configuration options that help the developer prevent XSS attacks. By default, the Editor does not allow the execution of scripts inside its content area and also provides configuration options that allow the developer to implement custom sanitizing functionality. Read more on the XSS protection for the Editor in the [Preventing Cross-Site Scripting article](https://docs.telerik.com/kendo-ui/controls/editors/editor/preventing-xss).

### Grid

The Columns [`.Encoded()`](/api/Kendo.Mvc.UI.Fluent/GridBoundColumnBuilder#encodedsystemboolean) configuration option of the [Grid]({% slug htmlhelpers_grid_aspnetcore_overview %}) helper provides the possibility to display non-encoded HTML value, if set to `false`. {% if site.core %} For the [Grid TagHelper]({% slug htmlhelpers_grid_aspnetcore_overview %}), use the column `encoded` attribute.{% endif %} In such scenarios, it is important to sanitize the values on the server, to ensure only safe HTML is rendered.

```HtmlHelper
    @(Html.Kendo().Grid<Kendo.Mvc.Examples.Models.ProductViewModel>()
        .Name("Grid")
        .Columns(columns =>
        {
                columns.Bound(p => p.ProductName).Encoded(false);
                columns.Bound(p => p.UnitPrice);
        })
        ...
    )
```
{% if site.core %}
```TagHelper
    @addTagHelper *, Kendo.Mvc

    <kendo-grid name="Grid">
        <columns>
            <column field="ProductName" encoded="false"/>
            <column field="UnitPrice"/>
        </columns>
        ....
    </kendo-grid>
```
{% endif %}

### Spreadsheet

When the [`Html()`](/api/Kendo.Mvc.UI.Fluent/SpreadsheetSheetRowCellBuilder#htmlsystemboolean) configuration option of the [Spreadsheet]({% slug htmlhelpers_spreadsheet_aspnetcore %}) is set to `true`, or the client-side [`html` method](https://docs.telerik.com/kendo-ui/api/javascript/spreadsheet/range/methods/html) is used, the user is allowed to input HTML. {% if site.core %} When using the TagHelper implementaion of the component, enable the cell `html` attribute.{% endif %} In such scenarios, it is important to sanitize cell values on the server to ensure only safe html is passed.

```HtmlHelper
    @(Html.Kendo().Spreadsheet()
    .Name("spreadsheet")
    .HtmlAttributes(new { style = "width:100%" })
    .Sheets(sheets =>
    {
        sheets.Add()
            .Name("Report")
            .Columns(columns =>
            {
                columns.Add().Width(100);
                columns.Add().Width(215);
            })
            .Rows(rows =>
            {
                rows.Add().Height(25).Cells(cells =>
                {
                    cells.Add()
                        .Value("<i>ID</i>")
                        .Html(true)
                        .TextAlign(SpreadsheetTextAlign.Center);
                    cells.Add()
                        .Value("Product")
                        .TextAlign(SpreadsheetTextAlign.Center);
                });
            });
        })
    )
```
{% if site.core %}
```TagHelper
    @addTagHelper *, Kendo.Mvc

    <kendo-spreadsheet name="spreadsheet" style="width: 100%">
        <sheets>
            <sheet name="Report">
                <columns>
                    <sheet-column width="100" />
                    <sheet-column width="215" />
                </columns>
                <rows>
                    <sheet-row height="25">
                        <cells>
                            <cell value="<i>ID</i>" html="true" text-align="SpreadsheetTextAlign.Center"></cell>
                            <cell value="Product" text-align="SpreadsheetTextAlign.Center"></cell>
                        </cells>
                    </sheet-row>
                </rows>
            </sheet>
        </sheets>
    </kendo-spreadsheet>
```
{% endif %}

### PanelBar

The [PanelBar]({% slug htmlhelpers_panelbar_aspnetcore %}) [`Items`](/api/Kendo.Mvc.UI.Fluent/PanelBarBuilder#itemssystemactionkendomvcuifluentpanelbaritemfactory) configuration option allows the developer to disable the encoding for a particular item. {% if site.core %} For the [PanelBar TagHelper]({% slug htmlhelpers_panelbar_aspnetcore %}), disable the `encoded` attribute in the `panelbar-item` tag.{% endif %}

```HtmlHelper
    @(Html.Kendo().PanelBar()
        .Name("PanelBar")
        .Items(items =>
        {
            items.Add().Text("<b>First Item</b>").Encoded(false);
            items.Add().Text("Second Item");
        })
    )
```
{% if site.core %}
```TagHelper
    @addTagHelper *, Kendo.Mvc

    <kendo-panelbar name="panelbar">
        <items>
            <panelbar-item text="<b>First Item</b>" encoded="false"></panelbar-item>
            <panelbar-item text="Second Item"></panelbar-item>
        </items>
    </kendo-panelbar>
```
{% endif %}

In such scenarios, the use of HTML for the item text is allowed. The developer should sanitize any values on the server to ensure only safe html is passed.

### Menu

The [Menu]({% slug htmlhelpers_menu_aspnetcore %}) [`Items`](/api/Kendo.Mvc.UI.Fluent/MenuBuilder#itemssystemactionkendomvcuifluentmenuitemfactory) configuration option {% if site.core %}or the  `menu-item` tag {% endif %} allows the developer to disable the encoding for a menu item. 

```HtmlHelper
    @(Html.Kendo().Menu()
        .Name("Menu")
        .ItemAction(item =>
        {
            item.Text("<b>Menu item 1</b>").Encoded(false);
            item.Text(Menu item 2);
        })
    )
 ```
 {% if site.core %}
```TagHelper
    @addTagHelper *, Kendo.Mvc

    <kendo-menu name="Menu">
        <items>
            <menu-item text="<b>Menu item 1</b>" encoded="false"></menu-item>
            <menu-item text="Menu item 2"></menu-item>
        </items>
    </kendo-menu>
```
{% endif %}

In such scenarios, the use of HTML for the Menu item text is allowed. The developer should sanitize any values on the server to ensure only safe html is passed.

### Kendo Templates

The usage of [Kendo Templates allows the developer to decide whether the displayed HTML will be encoded or not](https://docs.telerik.com/kendo-ui/framework/templates/overview#rendering-html-encoded-values). When using Kendo Templates and working with data from unknown sources, it is advisable to use HTML encoding, in case users have included malicious HTML markup in the content.

### DataSourceRequest

The [`DataSourceRequest`](https://docs.telerik.com/aspnet-mvc/api/Kendo.Mvc.UI/DataSourceRequest) object contains information on how the data, requested by a the Kendo widget, should be paged, filtered, sorted, grouped. This information is further translated internally to System.Linq.Expressions.Expression class. In the end, the ToDataSourceResult executes a LINQ query based on the information contained DataSourceRequest object, passed to an action method. The DataSourceRequest object itself does not contain user-provided data and does not contain HTML.
 
```
    //
    // Summary:
    //     Provides information about paging, sorting, filtering and grouping of data.
    public class DataSourceRequest
    {
        public DataSourceRequest()
        {
            Page = 1;
            Aggregates = new List<AggregateDescriptor>();
        };

        //
        // Summary:
        //     The current page.
        public int Page { get; set; }
        //
        // Summary:
        //     The page size.
        public int PageSize { get; set; }
        //
        // Summary:
        //     The sorting of the data.
        public IList<SortDescriptor> Sorts { get; set; }
        //
        // Summary:
        //     The filtering of the data.
        public IList<IFilterDescriptor> Filters { get; set; }
        //
        // Summary:
        //     The grouping of the data.
        public IList<GroupDescriptor> Groups { get; set; }
        //
        // Summary:
        //     The data aggregation.
        public IList<AggregateDescriptor> Aggregates { get; set; }
        //
        // Summary:
        // Indicates whether group paging is enabled.
        public bool GroupPaging { get; set; }
        //
        // Summary:
        // Indicates whether subgroup count should be included
        public bool IncludeSubGroupCount { get; set; }
        //
        // Summary:
        /// The current skip.
        public int Skip { get; set; }
        //
        // Summary:
        // The current take.
        public int Take { get; set; }
    }
```

## Cross-Site Request Forgery 

The Cross-Site Request Forgery is generally initiated by a malicious script and not the authenticated user. Submitting a request or a form on the behalf of the authenticated user can potentially expose the application at risk, accessing internal information and exercising harmful operations on the application. 

The anti-forgery tokens are used to ensure that a form or a request has been submitted by the user and not by a malicious script. The also called request validation tokens are hidden inputs that have a randomly generated value that cannot be read by a script. 

### Implement CSFR token validation

1. Include the CSFR token on the page:
    ```
        Html.AntiForgeryToken()
    ```

1. Send the token to the server-side by using the transport.data option of the DataSource. The [`kendo.antiforgerytokens`](https://docs.telerik.com/kendo-ui/api/javascript/kendo/methods/antiforgerytokens) method returns an object that contains common CSRF tokens that are found on the page.


    ```
        .Read(read=>read.Action("DetailProducts_Read", "Grid").Data("sendForgery"))

            // .  .  .

        <script>
                function sendForgery() {
                        return kendo.antiForgeryTokens();
                }
        </script>

    ```

1. Validate the token by decorating the ActionMethods with the `[ValidateAntiForgeryToken]` data annotation:

    ```
        [ValidateAntiForgeryToken]
        public ActionResult ActionMethodName( ModelName model ) 
        {
        }

    ```

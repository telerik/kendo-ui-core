---
title: Security and Validation
page_title: Security and Validation | Working with Widgets | Kendo UI for jQuery
description: "Get started with Kendo UI for jQuery and learn the fundamentals for XSS and CSRF attacks."
slug: kendoui_security_gettingstarted
position: 60
---

# Security and Validation

Preventing Cross-site scripting (XSS) and implementing validation for Cross-Site Request Forgery(CSRF) tokens can significantly boost the security of the application and prevent malicious script execution. 

## Cross-Site Scritping

### XSS Attacks 

Cross-site scripting attacks are a type of injection that aims to, in the majority of cases, cause harm to the application, gather personal information and executing malicious scripts. The attackers can use the XSS to bypass access controls such as the same-origin policy.

### XSS Protection 

Escaping any unsafe HTML tags should be mainly executed on the server-side. The client-side escaping can be easily bypassed if the attacker intercepts the to-be sent request and manually replaces the escaped tags. The server would receive the unescaped and unsafe HTML tags. This requires for a server-side validation and escaping for any potentially harmful tags. As a rule of thumb, unsafe HTML should never be saved in the database. 

> The server-side implementation for escaping the unsafe HTML tags has to be handled by the developer according to their go-to practices and preferences. 

## XSS handling in KendoUI

Several Kendo UI widgets allow the user to input HTML or can display non-encoded HTML and can be a potential source of Cross-site scripting attacks if not handled by the developer.

### Editor

The Editor provides configuration options that help the developer prevent XSS attacks. By default, the Editor does not allow the execution of scripts inside its content area and also provides configuration options that allow the developer to implement custom sanitizing functionality. Read more on the XSS protection for the Editor in the [Preventing Cross-Site Scripting article]({% slug prevent_xss_editor_widget %}).

### Grid

The [`columns.encoded`](/api/javascript/ui/grid/configuration/columns.encoded) configuration option of the Grid provides the possibility to display non-encoded HTML value if set to `false`. In such scenarios it is important to sanitize the values on the server to ensure only safe HTML is rendered.

### Spreadsheet

When the [`html` method](/api/javascript/spreadsheet/range/methods/html) is used or the [`sheets.rows.cells.html` configuration option](/api/javascript/ui/spreadsheet/configuration/sheets.rows.cells) is set to `true` the user is allowed to input HTML. In such scenarios it is important to sanitize cell values on the server to ensure only safe html is passed.

### PanelBar

The PanelBar [`dataSource` configuration option](/api/javascript/ui/panelbar/configuration/datasource#datasource) allows the developer to pass a JavaScript object or array to the widget to be used for initializing a new kendo.data.HierarchicalDataSource instance using that value as data source configuration. In such scenarios the use of HTML for the item text is allowed. The developer should sanitize any values on the server to ensure only safe html is passed.

### Menu

The Menu [`dataSource.encoded` configuration option](/api/javascript/ui/menu/configuration/datasource#datasource) allows the developer to disable the encoding for a menu item. In such scenarios the use of HTML for the Menu item text is allowed. The developer should sanitize any values on the server to ensure only safe html is passed.

### Kendo Templates

The usage of [Kendo Templates allows the developer to decide whether the displayed HTML will be encoded or not](https://docs.telerik.com/kendo-ui/framework/templates/overview#rendering-html-encoded-values). When using Kendo Templates and working with data from unknown sources, it is advisable to use HTML encoding in case users have included malicious HTML markup in the content.

## Cross-Site Request Forgery 

The Cross-Site Request Forgery is generally initiated by a malicious script and not the authenticated user. Submitting a request or a form on the behalf of the authenticated user can potentially expose the application at risk, accessing internal information and exercising harmful operations on the application. 

The anti-forgery tokens are used to ensure that a form or a request has been submitted by the user and not by a malicious script. The also called request validation tokens are hidden inputs that have a randomly generated value that cannot be read by a script. 

### Implement CSFR token validation

    1. Include the CSFR token on the page:
    ```
        Html.AntiForgeryToken()
    ```

> In .NET Environment, the hidden input with the generated value is created by using the AntiForgeryToken() HtmlHelper.

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

## See Also

* [Creating Custom Widgets]({% slug createcustomkendouiwidgets_gettingstarted %})
* [Getting Up and Running with Kendo UI (Guide)]({% slug getting_started_installation_kendoui %})

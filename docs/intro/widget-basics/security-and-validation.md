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

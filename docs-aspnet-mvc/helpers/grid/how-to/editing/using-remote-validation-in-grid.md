---
title: Implement Remote Validation
page_title: Implement Remote Validation | Kendo UI Grid HtmlHelper
description: "Configure the remote validation functionality in the Kendo UI Grid in ASP.NET MVC applications."
slug: howto_usingremotevalidationingrid_gridaspnetmvc
---

# Implement Remote Validation

As of the Kendo UI R1 2017 SP1 release, you can use remote validation with the Grid HtmlHelper.

To see the example, refer to the demo on [configuring remote validation in the Grid](http://demos.telerik.com/aspnet-mvc/grid/editing-remote-validation).

Remote validation is suitable for informing the user whether a value is valid right after the filed editor gets blurred. While you can consider the functionality as a real-time user assistant, avoid relying on it for receiving a valid entry for the field. Only the popup and inline edit modes support remote validation.

## The Procedure

To start using the remote validation in the Grid:

1. Add a custom rule in the Kendo UI Validator. The one demonstrated in the following example is expected to work in most scenarios. However, you may need to adjust it to fit your specific requirements.

    ###### Example

    ```
        (function ($, kendo) {
            $.extend(true, kendo.ui.validator, {
                rules: {
                    remote: function (input) {
                        if (input.val() == "" || !input.attr("data-val-remote-url")) {
                            return true;
                        }

                        if (input.attr("data-val-remote-recieved")) {
                            input.attr("data-val-remote-recieved", "");
                            return !(input.attr("data-val-remote"));
                        }

                        var url = input.attr("data-val-remote-url");
                        var postData = {};
                        postData[input.attr("data-val-remote-additionalfields").split(".")[1]] = input.val();

                        var validator = this;
                        var currentInput = input;
                        input.attr("data-val-remote-requested", true);
                        $.ajax({
                            url: url,
                            type: "POST",
                            data: JSON.stringify(postData),
                            dataType: "json",
                            traditional: true,
                            contentType: "application/json; charset=utf-8",
                            success: function (data) {
                                if (data == true) {
                                    input.attr("data-val-remote", "");
                                }
                                else {
                                    input.attr("data-val-remote", data);
                                }
                                input.attr("data-val-remote-recieved", true);
                                validator.validateInput(currentInput);

                            },
                            error: function () {
                                input.attr("data-val-remote-recieved", true);
                                validator.validateInput(currentInput);
                            }
                        });
                        return true;
                    }
                },
                messages: {
                    remote: function (input) {
                        return input.attr("data-val-remote");
                    }
                }
            });
        })(jQuery, kendo);
    ```

2. Add the [`RemoteAttribute`](https://msdn.microsoft.com/en-us/library/system.web.mvc.remoteattribute(v=vs.98).aspx) to the Model field to configure the validation on the server. The following example demonstrates how to apply this configuration to the `ProductName` field.

    ###### Example

    ```
        [Required]
        [DisplayName("Product name")]
        [Remote("IsProductName_Available", "Validation")]
        public string ProductName
        {
            get;
            set;
        }
    ```

3. Add the custom server-side logic that will validate the user input. The `RemoteAttribute` in the previous example specifies that the validation will be performed in a `IsProductName_Available` method located in `ValidationController`. This is a custom approach and has to be implemented per case. In the following example, the code checks whether the entered `ProductName` already exists.

    ###### Example

    ```
        public JsonResult IsProductName_Available(string ProductName)
        {
            var northwind = new SampleEntities();
            Product existingProduct = northwind.Products.FirstOrDefault(product => product.ProductName == ProductName);
            if (existingProduct == null)
            {
                return Json(true, JsonRequestBehavior.AllowGet);
            }

            string suggestedName = String.Format(CultureInfo.InvariantCulture,
                "{0} is not available.", ProductName);

            for (int i = 1; i < 100; i++)
            {
                string altName = ProductName + i.ToString();
                if (northwind.Products.FirstOrDefault(product => product.ProductName == altName) == null)
                {
                    suggestedName = String.Format(CultureInfo.InvariantCulture,
                   "{0} is not available. Try {1}.", ProductName, altName);
                    break;
                }
            }
            return Json(suggestedName, JsonRequestBehavior.AllowGet);
        }
    ```


## Known Limitations

* The batch (incell) edit mode does not support remote validation. The reason for that is that in the incell edit mode, the handling of the input element's `blur` event closes the cell for editing. On the other hand, the remote validation is an async operation which means that the cell will be closed before the response.

* If the user blurs the field editor by using remote validation in the popup or inline edit mode and then clicks on the **Update** button before the response from the remote validation arrives, the `update` or `create` operation will be performed with an invalid value. To ensure a valid entry, include the remote validation rule in the server validation.  

## See Also

* [Overview of the Grid HtmlHelper]({% slug overview_gridhelper_aspnetmvc %})
* [GridBuilder API Reference](/api/Kendo.Mvc.UI.Fluent/GridBuilder)

For more runnable examples on the Kendo UI Grid in ASP.NET MVC applications, browse its [**How To** documentation folder](/helpers/grid/how-to/Appearance/).

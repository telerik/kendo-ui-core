---
title: Using Remote Validation in Grid
page_title: Using Remote Validation in Grid | Kendo UI Grid HtmlHelper
description: "Configure Remote Validation in Kendo Grid"
slug: howto_usingremotevalidationingrid_gridaspnetmvc
---


# Using Remote Validation in Grid


Since R1 2017 SP1 you can use Remote Validation with the Grid HtmlHelper. You can see an example of the functionality in [this demo](http://demos.telerik.com/aspnet-mvc/grid/editing-remote-validation).

Remote Validation is suitable for scenarios where you need to inform the user if a value is valid just after the editor for the field is blurred. It should be considered as a real-time assistant to the user and the developer should not rely on it for receiving valid entry for the field.

You can use the Remote Validation with PopUp and InLine edit modes only.


1. To use the feature you should add a custom rule in the Kendo Validator. The rule below should work in most sceanarios. However, you may need to adjust it to fit your specific requirements.


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


2. To configure the validation on the server you need to add the [RemoteAttribute](https://msdn.microsoft.com/en-us/library/system.web.mvc.remoteattribute(v=vs.98).aspx) to the field in the Model. In the example this is done for the `ProductName` field.


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


3. Now you need to add the custom server-side logic that would validate the user input. The `RemoteAttribute` in the previous step specifies that this validation will be performed in a method called `IsProductName_Available` located in `ValidationController`. This is custom logic and should be implemented per-case. In the example below the code is checking if the entered `ProductName` already exists.


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


### Limitations:

* Using Remote Validation with Batch (InCell) edit mode is not supported because the InCell editing handles the blur event of the input element to close the cell for editing and since the Remote Validation is async operation, the cell will be closed before the response.
* With PopUp or InLine edit modes, if the user blurs the editor for a field with Remote Validation and clicks on the Update button before the response from the Remote Validation, the update/create operation will be performed with the invalid value. This means that in order to ensure a valid entry, the same rule from the Remote Validation should be included in the server validation as well.  



## See Also

* [Overview of the Grid HtmlHelper]({% slug overview_gridhelper_aspnetmvc %})
* [GridBuilder API Reference](/api/Kendo.Mvc.UI.Fluent/GridBuilder)

For more runnable examples on the Kendo UI Grid in ASP.NET MVC applications, browse its [**How To** documentation folder](/helpers/grid/how-to/Appearance/).

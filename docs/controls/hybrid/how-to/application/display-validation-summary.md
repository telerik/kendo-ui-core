---
title: Display Validation Summary in Mobile Application
page_title: Display Validation Summary in Mobile Application | Kendo UI Hybrid Application
description: "Learn how to display a validation summary when working with the Hybrid UI Application of Kendo UI."
slug: displa_validation_summary_hybridapplication
---

# Display Validation Summary in Mobile Application

The example below demonstrates how to display a validation summary if the validation fails when working with the Hybrid UI Application of Kendo UI.

###### Example

```html
     <div id="home" data-role="view" data-title="Registration Form" data-init="onInit">
        <header data-role="header">
            <div data-role="navbar">
                <span data-role="view-title"></span>
            </div>
        </header>

        <div class="validation-summary">
            <!-- customizing the tooltip position -->
            <!-- for more information please see http://docs.kendoui.com/getting-started/framework/validator/overview#customizing-the-tooltip-position -->
            <span class="k-invalid-msg" data-for="username"></span>
            <span class="k-invalid-msg" data-for="email"></span>
            <span class="k-invalid-msg" data-for="birthdate"></span>
            <span class="k-invalid-msg" data-for="password"></span>
            <span class="k-invalid-msg" data-for="agreement"></span>
        </div>

        <ul id="list" data-role="listview" data-style="inset">
            <li>
                <label for="username">Username:</label>
                <input type="text" id="username" name="username" required="required" />
            </li>
            <li>
                <label for="mail">Email:</label>
                <input type="email" id="email" name="email" required="required" />
            </li>
            <li>
                <label for="birthdate">Birthdate:</label>
                <input type="date" id="birthdate" name="birthdate" />
            </li>
            <li>
                <label for="password">Password:</label>
                <input type="password" id="password" name="password" required="required" />
            </li>
            <li>
                <label for="remember">I aggree to Terms of Use:
                    <input type="checkbox"  id="agreement" name="agreement" required="required" validationMessage="You must agree with the Terms of Usage!" />
                </label>
            </li>
        </ul>

        <a data-click="validate" id="register" type="button" data-role="button">Register</a>
        <a data-click="clear" id="clear" type="button" data-role="button">Clear</a>
    </div>

<style scoped>
    .validation-summary {
        margin: 1em;
        min-height: 1.8em;
    }

    .validation-summary .k-invalid-msg {
        display: block;
        margin: 0.3em 0;
    }

    #register,
    #clear {
        display: block;
        text-align: center;
        margin: .6em .8em 0;
        padding: .5em 0;
        font-size: 1.2em;
    }

    #clear { background-color: #2e2e2e; }
</style>
    <script>
        var app = new kendo.mobile.Application(),
            validator;

        function onInit(e) {
            //init the validatior
            validator = e.view.element.kendoValidator().data("kendoValidator");
        }

        function validate() {
            if(validator.validate()) {
                alert("success");
            } else {
                //scroll back to top
                app.view().scroller.reset();
            }
        }

        function clear() {
            //clear values of the inputs
            $("#list").find("input:not([type=checkbox])").val("");
            $("#list").find("input[type=checkbox]").attr('checked', false);
            //hide validation messages
            $(".validation-summary .k-invalid-msg").hide();
            //scroll back to top
            app.view().scroller.reset();
        }
    </script>
```

## See Also

Articles on the Application and other Hybrid UI components in Kendo UI:

* [Hybrid UI Application API Reference](/api/javascript/mobile/application)
* [Overview of the Hybrid UI Application in Kendo UI]({% slug overview_hybridapplication %})
* [Overview of the Hybrid UI Components in Kendo UI]({% slug overview_hybridkendoui %})
* [Performance Tips and Tricks]({% slug performance_hybridkendoui %})
* [Native Scrolling]({% slug nativescrolling_hybrid_kendoui %})

For more runnable examples on the Hybrid UI Application of Kendo UI, browse its [**How To** documentation folder]({% slug include_esri_map_mobile_application %}).

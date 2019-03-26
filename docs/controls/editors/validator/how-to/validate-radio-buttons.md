---
title: Validate Radio Buttons with Only One Error Message
page_title: Validate Radio Buttons with Only One Error Message | Kendo UI Validator
description: "Learn how to validate radio buttons with only one error message in Kendo UI."
previous_url: /framework/validator/how-to/validate-radio-buttons
slug: howto_validateradiowithonemessage_validator
---

# Validate Radio Buttons with Only One Error Message

The following example demonstrates how to validate a group of Kendo UI radio buttons and show only one error message.

###### Example

```dojo
<div id="form">
    <span class="k-invalid-msg" data-for="test"></span><br/>
    Test 1<input type="radio" name="test" required /><br/>
    Test 1<input type="radio" name="test" required /><br/>
    Test 1<input type="radio" name="test" required /><br/>
    Test 1<input type="radio" name="test" required /><br/>
    Test 1<input type="radio" name="test" required /><br/>
    <button id="post">Post</button>
</div>

<script>
$(function(){
    var validator = $("#form").kendoValidator({
        rules: {
            radio: function(input) {
                if (input.filter("[type=radio]") && input.attr("required")) {
                    return $("#form").find("[type=radio][name=" + input.attr("name") + "]").is(":checked");
                }
                return true;
            }
        },
        messages: {
            radio: "This is a required field"
        }
    }).getKendoValidator();

    $("#post").click(function() {
        validator.validate();
    });
});
</script>
```

## See Also

* [Validator JavaScript API Reference](/api/javascript/ui/validator)
* [How to Show Tooltip on Mouse Over]({% slug howto_showtooltiponmouseover_validator %})
* [How to Use Use MutationObserver to Add Red Border and Hide Tooltip]({% slug howto_usemutationobserver_addborderandhidetooltip_validator %})
* [How to Use Templates to Customize Tooltips]({% slug howto_usetemplatestocustomizetooltips_validator %})

For more runnable examples on the Kendo UI Validator widget, browse its [**How To** documentation folder]({% slug howto_addredborderandhidetooltip_validator %}).

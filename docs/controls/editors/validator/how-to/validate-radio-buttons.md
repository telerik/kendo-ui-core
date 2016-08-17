---
title: Validate Radio Buttons with Only One Error Message
page_title: Validate Radio Buttons with Only One Error Message | Kendo UI Validator
description: "Learn how to validate radio buttons with only one error message in Kendo UI."
slug: howto_validateradiowithonemessage_validator
---

# Validate Radio Buttons with Only One Error Message

The example below demonstrates how to validate a group of radio buttons in Kendo UI showing only one error message.

###### Example

```html
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
                    return $("#form").find("[type=radio]").is(":checked");
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

Other articles on the Kendo UI Validator:

* [Validator JavaScript API Reference](/api/javascript/ui/validator)
* [How to Show Tooltip on Mouse Over]({% slug howto_showtooltiponmouseover_validator %})
* [How to Use Use MutationObserver to Add Red Border and Hide Tooltip]({% slug howto_usemutationobserver_addborderandhidetooltip_validator %})
* [How to Use Templates to Customize Tooltips]({% slug howto_usetemplatestocustomizetooltips_validator %})

For more runnable examples on the Kendo UI Validator widget, browse its [**How To** documentation folder]({% slug howto_addredborderandhidetooltip_validator %}).

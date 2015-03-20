---
title: Validate radio buttons with only one error message
page_title: Validate radio buttons with only one error message
description: Validate radio buttons with only one error message
---

# Validate radio buttons with only one error message

The example below demonstrates how to validate a group of radio buttons showing only one error message

#### Example:

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

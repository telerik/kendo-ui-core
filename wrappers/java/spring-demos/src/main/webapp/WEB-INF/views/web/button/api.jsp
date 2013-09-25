<%@taglib prefix="kendo" uri="http://www.kendoui.com/jsp/tags"%>
<%@taglib prefix="demo" tagdir="/WEB-INF/tags"%>
<%@taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>

<demo:header />

<div class="configuration k-widget k-header">
    <span class="configHead">Button API Functions</span>
    <ul class="options">
        <li>
            <button class="k-button" id="enableButton" type="button">Enable</button> or <button class="k-button" id="disableButton" type="button">Disable</button>
        </li>
    </ul>
</div>

<br /><br />

<kendo:button name="iconTextButton" spriteCssClass="k-icon k-i-ungroup" content="Kendo UI Button">
</kendo:button>

<script>

$(document).ready(function () {
    var buttonObject = $("#iconTextButton").data("kendoButton");

    $("#enableButton").click(function () {
        buttonObject.enable(true);
    });

    $("#disableButton").click(function () {
        buttonObject.enable(false);
    });
});

</script>

<demo:footer />
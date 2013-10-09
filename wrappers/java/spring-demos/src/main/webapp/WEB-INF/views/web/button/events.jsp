<%@taglib prefix="kendo" uri="http://www.kendoui.com/jsp/tags"%>
<%@taglib prefix="demo" tagdir="/WEB-INF/tags"%>
<%@taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>

<demo:header />

<kendo:button name="textButton" type="button" content="Text button" click="onClick">
</kendo:button>

<kendo:button name="refreshButton" tag="a" icon="refresh" content="Refresh button" click="onClick">
</kendo:button>

<kendo:button name="disabledButton" tag="span" enable="false" content="Disabled button" click="onClick">
</kendo:button>

<p>(The disabled button will not fire click events)</p>

<div class="configuration k-widget k-header">
    <span class="configHead">Events log</span>
    <div class="console"></div>
</div>

<script>
    function onClick(e) {
        kendoConsole.log("event :: click (" + $(e.event.target).closest(".k-button").attr("id") + ")");
    }
</script>

<demo:footer />
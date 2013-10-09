<%@taglib prefix="kendo" uri="http://www.kendoui.com/jsp/tags"%>
<%@taglib prefix="demo" tagdir="/WEB-INF/tags"%>
<%@taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>

<demo:header />

<kendo:button name="textButton" type="button" content="Text button" click="onClick">
</kendo:button>

<kendo:button name="iconTextButton" tag="span" icon="ungroup" content="Icon and text" click="onClick">
</kendo:button>

<kendo:button name="iconButton" tag="em" icon="refresh" content="<span class='k-icon'>Refresh</span>" click="onClick">
</kendo:button>

<kendo:button name="disabledButton" tag="a" enable="false" content="Disabled button" click="onClick">
</kendo:button>

<p>(The disabled button will not fire click events)</p>

<ul class="keyboard-legend">
    <li>
        <span class="button-preview">
            <span class="key-button leftAlign">Alt</span>
            +
            <span class="key-button">W</span>
        </span>
        <span class="button-descr">
            Focuses the first button (clicking on it or tabbing will also work).
        </span>
    </li>
</ul>

<h4>Supported keys and user actions</h4>
<ul class="keyboard-legend">
    <li>
        <span class="button-preview">
            <span class="key-button">Enter</span> or <span class="key-button">Space</span>
        </span>
        <span class="button-descr">
            Trigger click event.
        </span>
    </li>
</ul>

<div class="configuration k-widget k-header">
    <span class="configHead">Events log</span>
    <div class="console"></div>
</div>

<script>
    function onClick(e) {
        kendoConsole.log("event :: click (" + $(e.event.target).closest(".k-button").attr("id") + ")");
    }

    $(document.body).keydown(function (e) {
        if (e.altKey && e.keyCode == 87) {
            $("#textButton")[0].focus();
        }
    });

</script>

<demo:footer />
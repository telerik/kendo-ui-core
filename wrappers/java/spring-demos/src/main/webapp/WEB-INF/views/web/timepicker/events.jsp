<%@taglib prefix="kendo" uri="http://www.kendoui.com/jsp/tags"%>
<%@taglib prefix="demo" tagdir="/WEB-INF/tags"%>

<demo:header />

<div class="demo-section" style="width:155px">
	<kendo:timePicker name="timepicker" change="change" open="open" close="close">
	</kendo:timePicker>
</div>

<script>
    function open() {
        kendoConsole.log("Open");
    }

    function close() {
        kendoConsole.log("Close");
    }

    function change() {
        kendoConsole.log("Change :: " + kendo.toString(this.value(), 't'));
    }
</script>
<div class="console"></div>

<demo:footer />
<%@taglib prefix="kendo" uri="http://www.kendoui.com/jsp/tags"%>
<%@taglib prefix="demo" tagdir="/WEB-INF/tags"%>

<demo:header />

<div class="demo-section" style="width:155px">
	<kendo:datePicker name="datepicker" change="change" open="open" close="close">
	</kendo:datePicker>
</div>
<div class="demo-section">
    <div class="console"></div>
</div>

<script>
    function open() {
        kendoConsole.log("Open");
    }

    function close() {
        kendoConsole.log("Close");
    }

    function change() {
        kendoConsole.log("Change :: " + kendo.toString(this.value(), 'd'));
    }
</script>

<demo:footer />
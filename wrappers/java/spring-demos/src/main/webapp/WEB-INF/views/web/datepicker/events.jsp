<%@taglib prefix="kendo" uri="http://www.kendoui.com/jsp/tags"%>
<%@taglib prefix="demo" tagdir="/WEB-INF/tags"%>

<demo:header />

<div class="demo-section" style="width:155px">
    <h3 class="title">Select date
    </h3>
	<kendo:datePicker name="datepicker" change="change" open="open" close="close">
	</kendo:datePicker>
</div>
<div class="demo-section">
    <h3 class="title">Console log
    </h3>
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
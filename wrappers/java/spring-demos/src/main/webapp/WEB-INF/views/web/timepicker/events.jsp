<%@taglib prefix="kendo" uri="http://www.kendoui.com/jsp/tags"%>
<%@taglib prefix="demo" tagdir="/WEB-INF/tags"%>

<demo:header />

<div class="demo-section" style="width:250px;text-align:center;">            
    <h3 class="title">Select time
    </h3>
	<kendo:timePicker name="timepicker" change="change" open="open" close="close">
	</kendo:timePicker>
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
        kendoConsole.log("Change :: " + kendo.toString(this.value(), 't'));
    }
</script>
<div class="console"></div>

<demo:footer />
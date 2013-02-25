<%@taglib prefix="kendo" uri="http://www.kendoui.com/jsp/tags"%>
<%@taglib prefix="demo" tagdir="/WEB-INF/tags"%>

<demo:header />

<div class="demo-section" style="width: 185px;">
    <h3 class="title">Select date and time
    </h3>
	<kendo:dateTimePicker name="datetimepicker" change="change" open="open" close="close">
	</kendo:dateTimePicker>
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
        kendoConsole.log("Change :: " + kendo.toString(this.value(), 'G'));
    }
</script>

<demo:footer />
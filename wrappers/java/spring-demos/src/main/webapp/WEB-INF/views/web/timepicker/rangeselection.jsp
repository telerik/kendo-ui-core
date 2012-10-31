<%@taglib prefix="kendo" uri="http://www.kendoui.com/jsp/tags"%>
<%@taglib prefix="demo" tagdir="/WEB-INF/tags"%>
<%@taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>

<demo:header />
<div class="demo-section" style="width:470px">
    <label for="start">Start date:</label>
	<kendo:timePicker name="start" value="${startValue}" min="${startMin}" max="${startMax}" change="startChange"></kendo:timePicker>
	
	<label for="end" style="margin-left:3em">End date:</label>
	<kendo:timePicker name="end" value="${endValue}" min="${endMin}" max="${endMax}"></kendo:timePicker>
</div>

<script>
    function startChange() {
        var startTime = this.value(),
            endPicker = $("#end").data("kendoTimePicker");

        if (startTime) {
            startTime = new Date(startTime);

            endPicker.max(startTime);

            startTime.setMinutes(startTime.getMinutes() + this.options.interval);

            endPicker.min(startTime);
            endPicker.value(startTime);
        }
    }
</script>

<style scoped>
    #example .k-timepicker {
        vertical-align: middle;
    }

    #example h3 {
        clear: both;
    }

    #example .code-sample {
        width: 60%;
        float:left;
        margin-bottom: 20px;
    }

    #example .output {
        width: 24%;
        margin-left: 4%;
        float:left;
    }
                
</style>

<demo:footer />
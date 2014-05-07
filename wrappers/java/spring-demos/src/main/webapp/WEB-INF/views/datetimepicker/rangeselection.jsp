<%@taglib prefix="kendo" uri="http://www.kendoui.com/jsp/tags"%>
<%@taglib prefix="demo" tagdir="/WEB-INF/tags"%>
<%@taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>

<demo:header />
<div class="demo-section" style="width: 650px;">
    <label for="start">Start date:</label>
	<kendo:dateTimePicker name="start" value="${today}" max="${today}" change="startChange"></kendo:dateTimePicker>
	
	<label for="end" style="margin-left:3em">End date:</label>
	<kendo:dateTimePicker name="end" value="${today}" min="${today}" change="endChange"></kendo:dateTimePicker>
</div>

<script>
    function startChange() {
        var endPicker = $("#end").data("kendoDateTimePicker"),
            startDate = this.value();

        if (startDate) {
            startDate = new Date(startDate);
            startDate.setDate(startDate.getDate() + 1);
            endPicker.min(startDate);
        }
    }

    function endChange() {
        var startPicker = $("#start").data("kendoDateTimePicker"),
            endDate = this.value();

        if (endDate) {
            endDate = new Date(endDate);
            endDate.setDate(endDate.getDate() - 1);
            startPicker.max(endDate);
        }
    }
</script>

<style scoped>
    .k-datetimepicker 
    {
        width: 200px;
    }
	#example .k-datetimepicker {
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
<%@taglib prefix="kendo" uri="http://www.kendoui.com/jsp/tags"%>
<%@taglib prefix="demo" tagdir="/WEB-INF/tags"%>

<demo:header />

<div class="configuration k-widget k-header">
    <span class="configHead">API Functions</span>
    <ul class="options">
        <li>
           <button id="get" class="k-button">Get value</button>
       </li>
       <li>
           <input id="value" value="10/10/2000 12:00 AM" style="float:none" />
            <button id="set" class="k-button">Set value</button>
        </li>
         <li>
             <button id="enable" class="k-button">Enable</button> or <button id="disable" class="k-button">Disable</button>
         </li>
         <li>
             <button id="openDateView" class="k-button">Open</button> or <button id="closeDateView" class="k-button">Close</button> the date view
         </li>
         <li>
             <button id="openTimeView" class="k-button">Open</button> or <button id="closeTimeView" class="k-button">Close</button> the time view
         </li>
     </ul>
</div>
<div class="demo-section">
    <kendo:dateTimePicker name="datetimepicker"></kendo:dateTimePicker>
</div>

<script>
	$(document).ready(function() {
		$("#datetimepicker").kendoDateTimePicker()
					  .closest(".k-widget")
					  .attr("id", "datetimepicker_wrapper");

		var datetimepicker = $("#datetimepicker").data("kendoDateTimePicker");

		var setValue = function () {
			datetimepicker.value($("#value").val());
		};

		$("#enable").click(function() {
			datetimepicker.enable();
		});

		$("#disable").click(function() {
			datetimepicker.enable(false);
		});

		$("#openDateView").click(function() {
			datetimepicker.open("date");
		});

		$("#openTimeView").click(function() {
			datetimepicker.open("time");
		});

		$("#closeDateView").click(function() {
			datetimepicker.close("date");
		});

		$("#closeTimeView").click(function() {
			datetimepicker.close("time");
		});

		$("#value").kendoDateTimePicker({
			change: setValue
		});

		$("#set").click(setValue);

		$("#get").click(function() {
			alert(datetimepicker.value());
		});
	});
</script>
<style scoped>
    .demo-section {
        margin: 0 0;
        width: 185px;
    }
</style>
<demo:footer />
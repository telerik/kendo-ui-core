<%@taglib prefix="kendo" uri="http://www.kendoui.com/jsp/tags"%>
<%@taglib prefix="demo" tagdir="/WEB-INF/tags"%>

<demo:header />

<div class="demo-section" style="width:155px">
    <kendo:dateTimePicker name="datetimepicker"></kendo:dateTimePicker>
</div>

<script>
$(document).ready(function() {
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

    $("#open").click(function() {
    	datetimepicker.open();
    });

    $("#close").click(function() {
    	datetimepicker.close();
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
 <div class="configuration k-widget k-header" style="width: 220px">
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
             <button id="open" class="k-button">Open</button> or <button id="close" class="k-button">Close</button> the calendar
         </li>
     </ul>
</div>

<demo:footer />
<?php
require_once '../../include/header.php';
require_once '../../lib/Kendo/Autoload.php';
?>
<div class="configuration k-widget k-header">
    <span class="configHead">API Functions</span>
    <span class="configTitle">Get value</span>
    <ul class="options">
        <li>
            <button id="get" class="k-button">Get date</button>
        </li>
    </ul>
    <span class="configTitle">Set value</span>
    <ul class="options">
        <li>
            <input id="value" value="10/10/2000" style="float:none; width: 120px;" />
            <button id="set" class="k-button">Set date</button>
        </li>
    </ul>
    <span class="configTitle">Navigation</span>
    <ul class="options">
        <li>
            <select id="direction" style="vertical-align: top; width: 120px; margin-bottom: 3px;">
                <option value="up">upper view</option>
                <option value="down">lower view</option>
                <option value="past">past</option>
                <option value="future" selected="selected">future</option>
            </select>
            <button id="navigate" class="k-button">Navigate</button>
        </li>
    </ul>
</div>
<div class="reports">
<?php
$calendar = new \Kendo\UI\Calendar('calendar');
$calendar->attr('style', 'width: 243px')
         ->value(new DateTime('today', new DateTimeZone('UTC')));

echo $calendar->render();
?>
</div>
<script>
    $(function() {
        var calendar = $("#calendar").data("kendoCalendar");

        var navigate = function () {
            var value = $("#direction").val();
            switch(value) {
                case "up":
                    calendar.navigateUp();
                    break;
                case "down":
                    calendar.navigateDown(calendar.value());
                    break;
                case "past":
                    calendar.navigateToPast();
                    break;
                default:
                    calendar.navigateToFuture();
                    break;
            }
        },
        setValue = function () {
            calendar.value($("#value").val());
        };

        $("#get").click(function() {
            alert(calendar.value());
        });

        $("#value").kendoDatePicker({
            change: setValue
        });

        $("#set").click(setValue);

        $("#direction").kendoDropDownList({
            change: navigate
        });

        $("#navigate").click(navigate);
    });
</script>
<style scoped="scoped">
    .reports {
        width: 265px;
        height: 247px;
        padding: 108px 0 0 20px;
        background: url('../../content/web/calendar/reports.png') transparent no-repeat 0 0;
        margin: 30px 105px 20px;
    }
    .configuration {
        height: 390px;
        width: 200px;
    }
</style>

<?php require_once '../../include/footer.php'; ?>

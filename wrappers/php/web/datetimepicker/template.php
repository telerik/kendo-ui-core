<?php

require_once '../../lib/Kendo/Autoload.php';
require_once '../../include/header.php';
?>
<div class="configuration k-widget k-header">
    <span class="infoHead">Information</span>
    <p>
        Apply special style for the birthdays.
    </p>
</div>

<div class="demo-section" style="width: 185px;">
<?php
$dateTimePicker = new \Kendo\UI\DateTimePicker('datetimepicker');
$dateTimePicker->value(new DateTime('today', new DateTimeZone('UTC')))
           ->month(array(
               'content' => <<<TEMPLATE
# if (isInArray(data.date, birthdays)) { #
    <div class="birthday"></div>
# } #
#= data.value #
TEMPLATE
           ))
           ->footer("Today - #= kendo.toString(data, 'd') #");

echo $dateTimePicker->render();
?>
</div>
<script>
    var today = new Date();
    var birthdays = [
           new Date(today.getFullYear(), today.getMonth(), 11),
           new Date(today.getFullYear(), today.getMonth() + 1, 6),
           new Date(today.getFullYear(), today.getMonth() + 1, 27),
           new Date(today.getFullYear(), today.getMonth() - 1, 3),
           new Date(today.getFullYear(), today.getMonth() - 2, 22)
    ];

    function isInArray(date, dates) {
        for(var idx = 0, length = dates.length; idx < length; idx++) {
            var d = dates[idx];
            if (date.getFullYear() == d.getFullYear() &&
                date.getMonth() == d.getMonth() &&
                date.getDate() == d.getDate()) {
                return true;
            }
        }

        return false;
    }

    $(function() {
         $("#datetimepicker").data("kendoDateTimePicker")
                             .dateView.calendar.element
                             .width(300);
    });
</script>

<style scoped>
    .demo-section {
        margin: 0 0;
    }

    .birthday {
        background: transparent url(../../content/web/calendar/cake.png) no-repeat 0 50%;
        display: inline-block;
        width: 16px;
        height: 16px;
        vertical-align: middle;
        margin-right: 3px;
    }
</style>
<?php require_once '../../include/footer.php'; ?>

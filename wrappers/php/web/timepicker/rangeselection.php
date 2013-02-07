<?php
require_once '../../include/header.php';
require_once '../../lib/Kendo/Autoload.php';
?>
<div class="demo-section" style="width: 500px;">
    <label for="start">Start time:</label>
<?php
$start = new \Kendo\UI\TimePicker('start');

$start->value('8:00 AM')
      ->change('startChange');

echo $start->render();
?>
    <label for="end" style="margin-left:3em">End time:</label>
<?php
$end = new \Kendo\UI\TimePicker('end');

$end->value('8:30 AM');

echo $end->render();
?>
</div>
<script>
    var start, end;

    function startChange() {
        var startTime = start.value();

        if (startTime) {
            startTime = new Date(startTime);

            end.max(startTime);

            startTime.setMinutes(startTime.getMinutes() + this.options.interval);

            end.min(startTime);
            end.value(startTime);
        }
    }
    $(document).ready(function() {
        start = $("#start").data("kendoTimePicker");

        end = $("#end").data("kendoTimePicker");

        //define min/max range
        start.min("8:00 AM");
        start.max("6:00 PM");

        //define min/max range
        end.min("8:00 AM");
        end.max("7:30 AM");
    });
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
<?php require_once '../../include/footer.php'; ?>

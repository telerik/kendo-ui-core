<?php

require_once '../../lib/Kendo/Autoload.php';
require_once '../../include/header.php';
?>

<?php
$start = new \Kendo\UI\DateTimePicker('start');
$start->value(new DateTime('now', new DateTimeZone('UTC')))
      ->parseFormats(array('MM/dd/yyyy'))
      ->change('startChange');

$end = new \Kendo\UI\DateTimePicker('end');
$end->value(new DateTime('now', new DateTimeZone('UTC')))
    ->parseFormats(array('MM/dd/yyyy'))
    ->change('endChange');
?>
<div class="demo-section" style="width:535px">
    <label for="start">Start date:</label>
    <?= $start->render() ?>

    <label for="end" style="margin-left:3em">End date:</label>
    <?= $end->render() ?>
</div>
<script>
    var start, end;

    function startChange() {
        var startDate = start.value();

        if (startDate) {
            startDate = new Date(startDate);
            startDate.setDate(startDate.getDate() + 1);
            end.min(startDate);
        }
    }

    function endChange() {
        var endDate = end.value();

        if (endDate) {
            endDate = new Date(endDate);
            endDate.setDate(endDate.getDate() - 1);
            start.max(endDate);
        }
    }

    $(document).ready(function() {
        start = $("#start").data("kendoDateTimePicker");
        end = $("#end").data("kendoDateTimePicker");

        start.max(end.value());
        end.min(start.value());
    });

</script>
<style scoped>
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
<?php require_once '../../include/footer.php'; ?>

<?php

require_once '../../lib/Kendo/Autoload.php';
require_once '../../include/header.php';
?>

<?php
$start = new \Kendo\UI\DatePicker('start');
$start->value('10/10/2011')
      ->change('startChange');

$end = new \Kendo\UI\DatePicker('end');
$end->value('10/10/2012')
    ->change('endChange');
?>
<div class="demo-section" style="width:470px">
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
        start = $("#start").data("kendoDatePicker");
        end = $("#end").data("kendoDatePicker");

        start.max(end.value());
        end.min(start.value());
    });

</script>
<style scoped>
    #example .k-datepicker {
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

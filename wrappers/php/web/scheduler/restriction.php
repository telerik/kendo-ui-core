<?php
require_once '../../lib/Kendo/Autoload.php';

require_once '../../include/header.php';
$data = array(
           array(
                'meetingID' => 1,
                'title' => 'Call Charlie about the project',
                'start' => new DateTime('2013/6/13 10:30'),
                'end' => new DateTime('2013/6/13 11:30'),
                'roomId' => 1,
                'attendee' => 1
            ),
            array(
                'meetingID' => 2,
                'title' => 'Performance review',
                'start' => new DateTime('2013/6/13 9:00'),
                'end' => new DateTime('2013/6/13 12:30'),
                'roomId' => 2,
                'attendee' => 2
            ),
            array(
                'meetingID' => 3,
                'title' => 'HR Lecture',
                'start' => new DateTime('2013/6/13 13:00'),
                'end' => new DateTime('2013/6/13 14:30'),
                'roomId' => 1,
                'attendee' => 2
            )
);

$model = new \Kendo\Data\DataSourceSchemaModel();

$startField = new \Kendo\Data\DataSourceSchemaModelField('start');
$startField->type('date');

$endField = new \Kendo\Data\DataSourceSchemaModelField('end');
$endField->type('date');

$titleField = new \Kendo\Data\DataSourceSchemaModelField('title');
$titleField->defaultValue('No title')
        ->validation(array('required' => true));

$roomIdField = new \Kendo\Data\DataSourceSchemaModelField('roomId');
$roomIdField->nullable(true);

$attendeeField = new \Kendo\Data\DataSourceSchemaModelField('attendee');
$attendeeField->defaultValue(1);

$model->id('meetingID')
    ->addField($roomIdField)
    ->addField($startField)
    ->addField($endField)
    ->addField($attendeeField)
    ->addField($titleField);

$schema = new \Kendo\Data\DataSourceSchema();
$schema->model($model);

$dataSource = new \Kendo\Data\DataSource();
$dataSource->data($data)
        ->schema($schema);

$roomResource = new \Kendo\UI\SchedulerResource();
$roomResource->field('roomId')
    ->title('Room')
    ->name('Rooms')
    ->dataSource(array(
        array('text'=> 'Meeting Room 101', 'value' => 1, 'color' => '#6eb3fa'),
        array('text'=> 'Meeting Room 201', 'value' => 2, 'color' => '#f58a8a')
    ));

$attendeesResource = new \Kendo\UI\SchedulerResource();
$attendeesResource->field('attendee')
    ->title('Attendee')
    ->name('Attendee')
    ->dataSource(array(
        array('text'=> 'Alex', 'value' => 1, 'color' => '#f8a398'),
        array('text'=> 'Bob', 'value' => 2, 'color' => '#51a0ed')
    ));

$scheduler = new \Kendo\UI\Scheduler('scheduler');
$scheduler->date(new DateTime('2013/6/13'))
        ->height(600)
        ->addResource($attendeesResource, $roomResource)
        ->group(array('resources' => array('Rooms')))
        ->addView(array('type' => 'day', 'startTime' => new DateTime('2013/6/13 7:00')))
        ->resize('scheduler_resize')
        ->resizeEnd('scheduler_resizeEnd')
        ->move('scheduler_move')
        ->moveEnd('scheduler_moveEnd')
        ->addEvent('scheduler_add')
        ->save('scheduler_save')
        ->dataSource($dataSource);

echo $scheduler->render();
?>

<script>
    function scheduler_resize(e) {
        if (roomIsOccupied(e.start, e.end, e.event, e.resources) || attendeeIsOccupied(e.start, e.end, e.event, e.resources)) {
            this.wrapper.find(".k-marquee-color").addClass("invalid-slot");
            e.preventDefault();
        }
    }

    function scheduler_resizeEnd(e) {
        if (!checkAvailability(e.start, e.end, e.events)) {
            e.preventDefault();
        }
    }

    function scheduler_move(e) {
        if (roomIsOccupied(e.start, e.end, e.event, e.resources) || attendeeIsOccupied(e.start, e.end, e.event, e.resources)) {
            this.wrapper.find(".k-event-drag-hint").addClass("invalid-slot");
        }
    }

    function scheduler_moveEnd(e) {
        if (!checkAvailability(e.start, e.end, e.event, e.resources)) {
            e.preventDefault();
        }
    }

    function scheduler_add(e) {
        if (!checkAvailability(e.event.start, e.event.end, e.event)) {
            e.preventDefault();
        }
    }

    function scheduler_save(e) {
        if (!checkAvailability(e.event.start, e.event.end, e.event)) {
            e.preventDefault();
        }
    }

    function occurrencesInRangeByResource(start, end, resourceFieldName, event, resources) {
        var scheduler = $("#scheduler").getKendoScheduler();

        var occurrences = scheduler.occurrencesInRange(start, end);

        var idx = occurrences.indexOf(event);
        if (idx > -1) {
           occurrences.splice(idx, 1);
        }

        event = $.extend({}, event, resources);

        return filterByResource(occurrences, resourceFieldName, event[resourceFieldName]);
    }

    function filterByResource(occurrences, resourceFieldName, value) {
        var result = [];
        var occurrence;

        for(var idx = 0, length = occurrences.length; idx < length; idx++) {
            occurrence = occurrences[idx];
            if (occurrence[resourceFieldName] === value) {
                result.push(occurrence);
            }
        }
        return result;
    }

    function attendeeIsOccupied(start, end, event, resources) {
        var occurrences = occurrencesInRangeByResource(start, end, "attendee", event, resources);
        if (occurrences.length > 0) {
            return true;
        }
        return false;
    }

    function roomIsOccupied(start, end, event, resources) {
        var occurrences = occurrencesInRangeByResource(start, end, "roomId", event, resources);
        if (occurrences.length > 0) {
            return true;
        }
        return false;
    }

    function checkAvailability(start, end, event, resources) {

        if (attendeeIsOccupied(start, end, event, resources)) {
            setTimeout(function() {
                alert("This person is not available in this time period.");
            }, 0);

            return false;
        }

        if (roomIsOccupied(start, end, event, resources)) {
            setTimeout(function() {
                alert("This room is not available in this time period.");
            }, 0);

            return false;
        }

        return true;
    }

</script>

<style scoped>
    .invalid-slot {
        background: red !important;
        cursor: no-drop;
    }
</style>

<?php require_once '../../include/footer.php'; ?>

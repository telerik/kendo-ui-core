<?php

namespace Kendo\UI;

class GanttAssignments extends \Kendo\SerializableObject {
//>> Properties

    /**
    * Sets the data source of the GanttAssignments.
    * @param array|\Kendo\Data\DataSource $value
    * @return \Kendo\UI\GanttAssignments
    */
    public function dataSource($value) {
        return $this->setProperty('dataSource', $value);
    }

    /**
    * The field of the assignment data item which represents the resource id.
    * @param string $value
    * @return \Kendo\UI\GanttAssignments
    */
    public function dataResourceIdField($value) {
        return $this->setProperty('dataResourceIdField', $value);
    }

    /**
    * The field of the assignment data item which represents the task id.
    * @param string $value
    * @return \Kendo\UI\GanttAssignments
    */
    public function dataTaskIdField($value) {
        return $this->setProperty('dataTaskIdField', $value);
    }

    /**
    * The field of the assignment data item which represents the amount of the assigned resource.
    * @param string $value
    * @return \Kendo\UI\GanttAssignments
    */
    public function dataValueField($value) {
        return $this->setProperty('dataValueField', $value);
    }

//<< Properties
}

?>

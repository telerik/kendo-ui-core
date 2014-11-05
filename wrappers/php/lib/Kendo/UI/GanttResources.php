<?php

namespace Kendo\UI;

class GanttResources extends \Kendo\SerializableObject {
//>> Properties

    /**
    * The field of the resource data item containing the format of the resource value, which could be assigned to a gantt task.
The data item format value could be any valid kendo format.
    * @param string $value
    * @return \Kendo\UI\GanttResources
    */
    public function dataFormatField($value) {
        return $this->setProperty('dataFormatField', $value);
    }

    /**
    * The field of the resource data item which contains the resource color.
    * @param string $value
    * @return \Kendo\UI\GanttResources
    */
    public function dataColorField($value) {
        return $this->setProperty('dataColorField', $value);
    }

    /**
    * Sets the data source of the GanttResources.
    * @param array|\Kendo\Data\DataSource $value
    * @return \Kendo\UI\GanttResources
    */
    public function dataSource($value) {
        return $this->setProperty('dataSource', $value);
    }

    /**
    * The field of the resource data item which represents the resource text.
    * @param string $value
    * @return \Kendo\UI\GanttResources
    */
    public function dataTextField($value) {
        return $this->setProperty('dataTextField', $value);
    }

    /**
    * The field of the gantt task which contains the assigned resource objects.
    * @param string $value
    * @return \Kendo\UI\GanttResources
    */
    public function field($value) {
        return $this->setProperty('field', $value);
    }

//<< Properties
}

?>

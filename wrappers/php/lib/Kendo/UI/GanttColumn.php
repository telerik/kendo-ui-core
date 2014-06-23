<?php

namespace Kendo\UI;

class GanttColumn extends \Kendo\SerializableObject {
//>> Properties

    /**
    * The field to which the column is bound. The value of this field is displayed by the column during data binding.
The field name should be a valid Javascript identifier and should contain no spaces, no special characters, and the first character should be a letter.
    * @param string $value
    * @return \Kendo\UI\GanttColumn
    */
    public function field($value) {
        return $this->setProperty('field', $value);
    }

    /**
    * The text that is displayed in the column header cell. If not set the field is used.
    * @param string $value
    * @return \Kendo\UI\GanttColumn
    */
    public function title($value) {
        return $this->setProperty('title', $value);
    }

    /**
    * The format that is applied to the value before it is displayed. Takes the form "{0:format}" where "format" is a standard number format,
custom number format, standard date format or a custom date format.
    * @param string $value
    * @return \Kendo\UI\GanttColumn
    */
    public function format($value) {
        return $this->setProperty('format', $value);
    }

    /**
    * The width of the column. Numeric values are treated as pixels.
    * @param string|float $value
    * @return \Kendo\UI\GanttColumn
    */
    public function width($value) {
        return $this->setProperty('width', $value);
    }

    /**
    * Specifies whether this column can be edited by the user.
    * @param boolean $value
    * @return \Kendo\UI\GanttColumn
    */
    public function editable($value) {
        return $this->setProperty('editable', $value);
    }

    /**
    * If set to true the user could sort this column by clicking its header cells. By default sorting is disabled.
    * @param boolean $value
    * @return \Kendo\UI\GanttColumn
    */
    public function sortable($value) {
        return $this->setProperty('sortable', $value);
    }

//<< Properties
}

?>

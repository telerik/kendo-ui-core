<?php

namespace Kendo\Dataviz\UI;

class SparklineValueAxisItemNotesDataItem extends \kendo\SerializableObject {
//>> Properties

    /**
    * The value of the note.
    * @param float $value
    * @return \Kendo\Dataviz\UI\SparklineValueAxisItemNotesDataItem
    */
    public function value($value) {
        return $this->setProperty('value', $value);
    }

    /**
    * The icon of the note.
    * @param \Kendo\Dataviz\UI\SparklineValueAxisItemNotesDataItemIcon|array $value
    * @return \Kendo\Dataviz\UI\SparklineValueAxisItemNotesDataItem
    */
    public function icon($value) {
        return $this->setProperty('icon', $value);
    }

    /**
    * The label of the note.
    * @param \Kendo\Dataviz\UI\SparklineValueAxisItemNotesDataItemLabel|array $value
    * @return \Kendo\Dataviz\UI\SparklineValueAxisItemNotesDataItem
    */
    public function label($value) {
        return $this->setProperty('label', $value);
    }

    /**
    * The line of the note.
    * @param \Kendo\Dataviz\UI\SparklineValueAxisItemNotesDataItemLine|array $value
    * @return \Kendo\Dataviz\UI\SparklineValueAxisItemNotesDataItem
    */
    public function line($value) {
        return $this->setProperty('line', $value);
    }

//<< Properties
}

?>

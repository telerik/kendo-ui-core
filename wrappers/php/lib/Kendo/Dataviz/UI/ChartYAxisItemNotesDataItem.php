<?php

namespace Kendo\Dataviz\UI;

class ChartYAxisItemNotesDataItem extends \Kendo\SerializableObject {
//>> Properties

    /**
    * The value of the note.
    * @param  $value
    * @return \Kendo\Dataviz\UI\ChartYAxisItemNotesDataItem
    */
    public function value($value) {
        return $this->setProperty('value', $value);
    }

    /**
    * The position of the y axis notes.
    * @param string $value
    * @return \Kendo\Dataviz\UI\ChartYAxisItemNotesDataItem
    */
    public function position($value) {
        return $this->setProperty('position', $value);
    }

    /**
    * The icon of the note.
    * @param \Kendo\Dataviz\UI\ChartYAxisItemNotesDataItemIcon|array $value
    * @return \Kendo\Dataviz\UI\ChartYAxisItemNotesDataItem
    */
    public function icon($value) {
        return $this->setProperty('icon', $value);
    }

    /**
    * The label of the note.
    * @param \Kendo\Dataviz\UI\ChartYAxisItemNotesDataItemLabel|array $value
    * @return \Kendo\Dataviz\UI\ChartYAxisItemNotesDataItem
    */
    public function label($value) {
        return $this->setProperty('label', $value);
    }

    /**
    * The line of the note.
    * @param \Kendo\Dataviz\UI\ChartYAxisItemNotesDataItemLine|array $value
    * @return \Kendo\Dataviz\UI\ChartYAxisItemNotesDataItem
    */
    public function line($value) {
        return $this->setProperty('line', $value);
    }

//<< Properties
}

?>

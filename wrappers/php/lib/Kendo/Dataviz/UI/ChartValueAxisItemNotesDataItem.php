<?php

namespace Kendo\Dataviz\UI;

class ChartValueAxisItemNotesDataItem extends \Kendo\SerializableObject {
//>> Properties

    /**
    * The value of the note.
    * @param  $value
    * @return \Kendo\Dataviz\UI\ChartValueAxisItemNotesDataItem
    */
    public function value($value) {
        return $this->setProperty('value', $value);
    }

    /**
    * The position of the value axis note.
    * @param string $value
    * @return \Kendo\Dataviz\UI\ChartValueAxisItemNotesDataItem
    */
    public function position($value) {
        return $this->setProperty('position', $value);
    }

    /**
    * The icon of the note.
    * @param \Kendo\Dataviz\UI\ChartValueAxisItemNotesDataItemIcon|array $value
    * @return \Kendo\Dataviz\UI\ChartValueAxisItemNotesDataItem
    */
    public function icon($value) {
        return $this->setProperty('icon', $value);
    }

    /**
    * The label of the note.
    * @param \Kendo\Dataviz\UI\ChartValueAxisItemNotesDataItemLabel|array $value
    * @return \Kendo\Dataviz\UI\ChartValueAxisItemNotesDataItem
    */
    public function label($value) {
        return $this->setProperty('label', $value);
    }

    /**
    * The line of the note.
    * @param \Kendo\Dataviz\UI\ChartValueAxisItemNotesDataItemLine|array $value
    * @return \Kendo\Dataviz\UI\ChartValueAxisItemNotesDataItem
    */
    public function line($value) {
        return $this->setProperty('line', $value);
    }

//<< Properties
}

?>

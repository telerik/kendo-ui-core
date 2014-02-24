<?php

namespace Kendo\Dataviz\UI;

class ChartXAxisItemNotesDataItem extends \Kendo\SerializableObject {
//>> Properties

    /**
    * The value of the note.
    * @param  $value
    * @return \Kendo\Dataviz\UI\ChartXAxisItemNotesDataItem
    */
    public function value($value) {
        return $this->setProperty('value', $value);
    }

    /**
    * The position of the x axis note.
    * @param string $value
    * @return \Kendo\Dataviz\UI\ChartXAxisItemNotesDataItem
    */
    public function position($value) {
        return $this->setProperty('position', $value);
    }

    /**
    * The icon of the note.
    * @param \Kendo\Dataviz\UI\ChartXAxisItemNotesDataItemIcon|array $value
    * @return \Kendo\Dataviz\UI\ChartXAxisItemNotesDataItem
    */
    public function icon($value) {
        return $this->setProperty('icon', $value);
    }

    /**
    * The label of the note.
    * @param \Kendo\Dataviz\UI\ChartXAxisItemNotesDataItemLabel|array $value
    * @return \Kendo\Dataviz\UI\ChartXAxisItemNotesDataItem
    */
    public function label($value) {
        return $this->setProperty('label', $value);
    }

    /**
    * The line of the note.
    * @param \Kendo\Dataviz\UI\ChartXAxisItemNotesDataItemLine|array $value
    * @return \Kendo\Dataviz\UI\ChartXAxisItemNotesDataItem
    */
    public function line($value) {
        return $this->setProperty('line', $value);
    }

//<< Properties
}

?>

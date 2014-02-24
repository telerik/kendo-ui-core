<?php

namespace Kendo\Dataviz\UI;

class ChartYAxisItemNotes extends \Kendo\SerializableObject {
//>> Properties

    /**
    * The position of the y axis notes.
    * @param string $value
    * @return \Kendo\Dataviz\UI\ChartYAxisItemNotes
    */
    public function position($value) {
        return $this->setProperty('position', $value);
    }

    /**
    * The icon of the notes.
    * @param \Kendo\Dataviz\UI\ChartYAxisItemNotesIcon|array $value
    * @return \Kendo\Dataviz\UI\ChartYAxisItemNotes
    */
    public function icon($value) {
        return $this->setProperty('icon', $value);
    }

    /**
    * The label of the notes.
    * @param \Kendo\Dataviz\UI\ChartYAxisItemNotesLabel|array $value
    * @return \Kendo\Dataviz\UI\ChartYAxisItemNotes
    */
    public function label($value) {
        return $this->setProperty('label', $value);
    }

    /**
    * The line of the notes.
    * @param \Kendo\Dataviz\UI\ChartYAxisItemNotesLine|array $value
    * @return \Kendo\Dataviz\UI\ChartYAxisItemNotes
    */
    public function line($value) {
        return $this->setProperty('line', $value);
    }

    /**
    * Adds ChartYAxisItemNotesDataItem to the ChartYAxisItemNotes.
    * @param \Kendo\Dataviz\UI\ChartYAxisItemNotesDataItem|array,... $value one or more ChartYAxisItemNotesDataItem to add.
    * @return \Kendo\Dataviz\UI\ChartYAxisItemNotes
    */
    public function addDataItem($value) {
        return $this->add('data', func_get_args());
    }

//<< Properties
}

?>

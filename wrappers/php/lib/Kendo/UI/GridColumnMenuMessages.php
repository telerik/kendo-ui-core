<?php

namespace Kendo\UI;

class GridColumnMenuMessages extends \Kendo\SerializableObject {
//>> Properties

    /**
    * The text message displayed for the column selection menu item.
    * @param string $value
    * @return \Kendo\UI\GridColumnMenuMessages
    */
    public function columns($value) {
        return $this->setProperty('columns', $value);
    }

    /**
    * The text message displayed for the filter menu item.
    * @param string $value
    * @return \Kendo\UI\GridColumnMenuMessages
    */
    public function filter($value) {
        return $this->setProperty('filter', $value);
    }

    /**
    * The text message displayed for the menu item which performs ascending sort.
    * @param string $value
    * @return \Kendo\UI\GridColumnMenuMessages
    */
    public function sortAscending($value) {
        return $this->setProperty('sortAscending', $value);
    }

    /**
    * The text message displayed for the menu item which performs descending sort.
    * @param string $value
    * @return \Kendo\UI\GridColumnMenuMessages
    */
    public function sortDescending($value) {
        return $this->setProperty('sortDescending', $value);
    }

//<< Properties
}

?>

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

    /**
    * The text message displayed in the menu header (available in mobile mode only).
    * @param string $value
    * @return \Kendo\UI\GridColumnMenuMessages
    */
    public function settings($value) {
        return $this->setProperty('settings', $value);
    }

    /**
    * The text message displayed in the menu header button (available in mobile mode only).
    * @param string $value
    * @return \Kendo\UI\GridColumnMenuMessages
    */
    public function done($value) {
        return $this->setProperty('done', $value);
    }

    /**
    * The text message displayed in the column menu for locking a column.
    * @param string $value
    * @return \Kendo\UI\GridColumnMenuMessages
    */
    public function lock($value) {
        return $this->setProperty('lock', $value);
    }

    /**
    * The text message displayed in the column menu for unlocking a column.
    * @param string $value
    * @return \Kendo\UI\GridColumnMenuMessages
    */
    public function unlock($value) {
        return $this->setProperty('unlock', $value);
    }

//<< Properties
}

?>

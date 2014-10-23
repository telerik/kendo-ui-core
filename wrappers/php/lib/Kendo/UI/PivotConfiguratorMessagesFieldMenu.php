<?php

namespace Kendo\UI;

class PivotConfiguratorMessagesFieldMenu extends \Kendo\SerializableObject {
//>> Properties

    /**
    * The text messages displayed in fields filter.
    * @param string $value
    * @return \Kendo\UI\PivotConfiguratorMessagesFieldMenu
    */
    public function info($value) {
        return $this->setProperty('info', $value);
    }

    /**
    * The text message displayed for the menu item which performs ascending sort.
    * @param string $value
    * @return \Kendo\UI\PivotConfiguratorMessagesFieldMenu
    */
    public function sortAscending($value) {
        return $this->setProperty('sortAscending', $value);
    }

    /**
    * The text message displayed for the menu item which performs descending sort.
    * @param string $value
    * @return \Kendo\UI\PivotConfiguratorMessagesFieldMenu
    */
    public function sortDescending($value) {
        return $this->setProperty('sortDescending', $value);
    }

    /**
    * The text messages of the fields filter menu item.
    * @param string $value
    * @return \Kendo\UI\PivotConfiguratorMessagesFieldMenu
    */
    public function filterFields($value) {
        return $this->setProperty('filterFields', $value);
    }

    /**
    * The text messages of the filter button.
    * @param string $value
    * @return \Kendo\UI\PivotConfiguratorMessagesFieldMenu
    */
    public function filter($value) {
        return $this->setProperty('filter', $value);
    }

    /**
    * The text messages of the include menu item.
    * @param string $value
    * @return \Kendo\UI\PivotConfiguratorMessagesFieldMenu
    */
    public function _include($value) {
        return $this->setProperty('include', $value);
    }

    /**
    * The title of the include fields dialog.
    * @param string $value
    * @return \Kendo\UI\PivotConfiguratorMessagesFieldMenu
    */
    public function title($value) {
        return $this->setProperty('title', $value);
    }

    /**
    * The text of the clear filter expressions button.
    * @param string $value
    * @return \Kendo\UI\PivotConfiguratorMessagesFieldMenu
    */
    public function clear($value) {
        return $this->setProperty('clear', $value);
    }

    /**
    * The text of the OK button in the include fields dialog.
    * @param string $value
    * @return \Kendo\UI\PivotConfiguratorMessagesFieldMenu
    */
    public function ok($value) {
        return $this->setProperty('ok', $value);
    }

    /**
    * The text of the cancel button in the include fields dialog.
    * @param string $value
    * @return \Kendo\UI\PivotConfiguratorMessagesFieldMenu
    */
    public function cancel($value) {
        return $this->setProperty('cancel', $value);
    }

    /**
    * The text of the filter operators displayed in the filter menu.
    * @param \Kendo\UI\PivotConfiguratorMessagesFieldMenuOperators|array $value
    * @return \Kendo\UI\PivotConfiguratorMessagesFieldMenu
    */
    public function operators($value) {
        return $this->setProperty('operators', $value);
    }

//<< Properties
}

?>

<?php

namespace Kendo\UI;

class PivotGridMessagesFieldMenu extends \Kendo\SerializableObject {
//>> Properties

    /**
    * The text messages displayed in fields filter.
    * @param string $value
    * @return \Kendo\UI\PivotGridMessagesFieldMenu
    */
    public function info($value) {
        return $this->setProperty('info', $value);
    }

    /**
    * The text messages of the fields filter menu item.
    * @param string $value
    * @return \Kendo\UI\PivotGridMessagesFieldMenu
    */
    public function filterFields($value) {
        return $this->setProperty('filterFields', $value);
    }

    /**
    * The text messages of the filter button.
    * @param string $value
    * @return \Kendo\UI\PivotGridMessagesFieldMenu
    */
    public function filter($value) {
        return $this->setProperty('filter', $value);
    }

    /**
    * The text messages of the include menu item.
    * @param string $value
    * @return \Kendo\UI\PivotGridMessagesFieldMenu
    */
    public function _include($value) {
        return $this->setProperty('include', $value);
    }

    /**
    * The title of the include fields dialog.
    * @param string $value
    * @return \Kendo\UI\PivotGridMessagesFieldMenu
    */
    public function title($value) {
        return $this->setProperty('title', $value);
    }

    /**
    * The text of the clear filter expressions button.
    * @param string $value
    * @return \Kendo\UI\PivotGridMessagesFieldMenu
    */
    public function clear($value) {
        return $this->setProperty('clear', $value);
    }

    /**
    * The text of the ok button in the include fields dialog.
    * @param string $value
    * @return \Kendo\UI\PivotGridMessagesFieldMenu
    */
    public function ok($value) {
        return $this->setProperty('ok', $value);
    }

    /**
    * The text of the cancel button in the include fields dialog.
    * @param string $value
    * @return \Kendo\UI\PivotGridMessagesFieldMenu
    */
    public function cancel($value) {
        return $this->setProperty('cancel', $value);
    }

    /**
    * The text of the filter operators displayed in the filter menu.
    * @param \Kendo\UI\PivotGridMessagesFieldMenuOperators|array $value
    * @return \Kendo\UI\PivotGridMessagesFieldMenu
    */
    public function operators($value) {
        return $this->setProperty('operators', $value);
    }

//<< Properties
}

?>

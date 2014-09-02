<?php

namespace Kendo\UI;

class GridGroupable extends \Kendo\SerializableObject {
//>> Properties

    /**
    * When set  to false grouping is considered disabled.
    * @param boolean $value
    * @return \Kendo\UI\GridGroupable
    */
    public function enabled($value) {
        return $this->setProperty('enabled', $value);
    }

    /**
    * When enabled the footer will remain visible when the gruop is collapsed.
    * @param boolean $value
    * @return \Kendo\UI\GridGroupable
    */
    public function showFooter($value) {
        return $this->setProperty('showFooter', $value);
    }

    /**
    * The text messages displayed during grouping.
    * @param \Kendo\UI\GridGroupableMessages|array $value
    * @return \Kendo\UI\GridGroupable
    */
    public function messages($value) {
        return $this->setProperty('messages', $value);
    }

//<< Properties
}

?>

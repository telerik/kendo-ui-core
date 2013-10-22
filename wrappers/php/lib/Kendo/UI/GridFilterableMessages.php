<?php

namespace Kendo\UI;

class GridFilterableMessages extends \Kendo\SerializableObject {
//>> Properties

    /**
    * The text of the option which represents the "and" logical operation.
    * @param string $value
    * @return \Kendo\UI\GridFilterableMessages
    */
    public function _and($value) {
        return $this->setProperty('and', $value);
    }

    /**
    * The text of the button which clears the filter.
    * @param string $value
    * @return \Kendo\UI\GridFilterableMessages
    */
    public function clear($value) {
        return $this->setProperty('clear', $value);
    }

    /**
    * The text of the button which applies the filter.
    * @param string $value
    * @return \Kendo\UI\GridFilterableMessages
    */
    public function filter($value) {
        return $this->setProperty('filter', $value);
    }

    /**
    * The text of the information message on the top of the filter menu.
    * @param string $value
    * @return \Kendo\UI\GridFilterableMessages
    */
    public function info($value) {
        return $this->setProperty('info', $value);
    }

    /**
    * The text of the radio button for false values. Displayed when filtering Boolean fields.
    * @param string $value
    * @return \Kendo\UI\GridFilterableMessages
    */
    public function isFalse($value) {
        return $this->setProperty('isFalse', $value);
    }

    /**
    * The text of the radio button for true values. Displayed when filtering Boolean fields.
    * @param string $value
    * @return \Kendo\UI\GridFilterableMessages
    */
    public function isTrue($value) {
        return $this->setProperty('isTrue', $value);
    }

    /**
    * The text of the option which represents the "or" logical operation.
    * @param string $value
    * @return \Kendo\UI\GridFilterableMessages
    */
    public function _or($value) {
        return $this->setProperty('or', $value);
    }

    /**
    * The text of the dropdownlist displayed in the filter menu for columns whose values option is set.
    * @param string $value
    * @return \Kendo\UI\GridFilterableMessages
    */
    public function selectValue($value) {
        return $this->setProperty('selectValue', $value);
    }

//<< Properties
}

?>

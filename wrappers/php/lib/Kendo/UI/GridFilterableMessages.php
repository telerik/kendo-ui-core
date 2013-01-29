<?php

namespace Kendo\UI;

class GridFilterableMessages extends \Kendo\SerializableObject {
//>> Properties

    /**
    * Set the text of the "and" option from logic drop down list.
    * @param string $value
    * @return \Kendo\UI\GridFilterableMessages
    */
    public function _and($value) {
        return $this->setProperty('and', $value);
    }

    /**
    * Set the text of the clear button of the filter menu.
    * @param string $value
    * @return \Kendo\UI\GridFilterableMessages
    */
    public function clear($value) {
        return $this->setProperty('clear', $value);
    }

    /**
    * Set the text of the filter button of the filter menu.
    * @param string $value
    * @return \Kendo\UI\GridFilterableMessages
    */
    public function filter($value) {
        return $this->setProperty('filter', $value);
    }

    /**
    * Set the text of the information message on top of the filter menu.
    * @param string $value
    * @return \Kendo\UI\GridFilterableMessages
    */
    public function info($value) {
        return $this->setProperty('info', $value);
    }

    /**
    * Set the text of the isFalse radio button of the filter menu for boolean values.
    * @param string $value
    * @return \Kendo\UI\GridFilterableMessages
    */
    public function isFalse($value) {
        return $this->setProperty('isFalse', $value);
    }

    /**
    * Set the text of the isTrue radio button of the filter menu for boolean values.
    * @param string $value
    * @return \Kendo\UI\GridFilterableMessages
    */
    public function isTrue($value) {
        return $this->setProperty('isTrue', $value);
    }

    /**
    * Set the text of the "or" option from logic drop down list.
    * @param string $value
    * @return \Kendo\UI\GridFilterableMessages
    */
    public function _or($value) {
        return $this->setProperty('or', $value);
    }

    /**
    * Set the text of the option label for foreign key drop down list.
    * @param string $value
    * @return \Kendo\UI\GridFilterableMessages
    */
    public function selectValue($value) {
        return $this->setProperty('selectValue', $value);
    }

//<< Properties
}

?>

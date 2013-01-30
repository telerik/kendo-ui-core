<?php

namespace Kendo\UI;

class GridFilterableOperators extends \Kendo\SerializableObject {
//>> Properties

    /**
    * Enable/Disable and set the text of filter operators for fields of type string.
    * @param \Kendo\UI\GridFilterableOperatorsString|array $value
    * @return \Kendo\UI\GridFilterableOperators
    */
    public function string($value) {
        return $this->setProperty('string', $value);
    }

    /**
    * Enable/Disable and set the text of filter operators for fields of type number.
    * @param \Kendo\UI\GridFilterableOperatorsNumber|array $value
    * @return \Kendo\UI\GridFilterableOperators
    */
    public function number($value) {
        return $this->setProperty('number', $value);
    }

    /**
    * Enable/Disable and set the text of filter operators for fields of type date.
    * @param \Kendo\UI\GridFilterableOperatorsDate|array $value
    * @return \Kendo\UI\GridFilterableOperators
    */
    public function date($value) {
        return $this->setProperty('date', $value);
    }

    /**
    * Enable/Disable and set the text of filter operators for foreign key columns.
    * @param \Kendo\UI\GridFilterableOperatorsEnums|array $value
    * @return \Kendo\UI\GridFilterableOperators
    */
    public function enums($value) {
        return $this->setProperty('enums', $value);
    }

//<< Properties
}

?>

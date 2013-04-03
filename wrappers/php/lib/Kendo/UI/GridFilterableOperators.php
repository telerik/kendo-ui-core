<?php

namespace Kendo\UI;

class GridFilterableOperators extends \Kendo\SerializableObject {
//>> Properties

    /**
    * The texts of the filter operators displayed for columns bound to string fields.
    * @param \Kendo\UI\GridFilterableOperatorsString|array $value
    * @return \Kendo\UI\GridFilterableOperators
    */
    public function string($value) {
        return $this->setProperty('string', $value);
    }

    /**
    * The texts of the filter operators displayed for columns bound to number fields.
    * @param \Kendo\UI\GridFilterableOperatorsNumber|array $value
    * @return \Kendo\UI\GridFilterableOperators
    */
    public function number($value) {
        return $this->setProperty('number', $value);
    }

    /**
    * The texts of the filter operators displayed for columns bound to date fields.
    * @param \Kendo\UI\GridFilterableOperatorsDate|array $value
    * @return \Kendo\UI\GridFilterableOperators
    */
    public function date($value) {
        return $this->setProperty('date', $value);
    }

    /**
    * The texts of the filter operators displayed for columns which have their values option set.
    * @param \Kendo\UI\GridFilterableOperatorsEnums|array $value
    * @return \Kendo\UI\GridFilterableOperators
    */
    public function enums($value) {
        return $this->setProperty('enums', $value);
    }

//<< Properties
}

?>

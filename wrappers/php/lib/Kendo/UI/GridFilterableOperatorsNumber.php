<?php

namespace Kendo\UI;

class GridFilterableOperatorsNumber extends \Kendo\SerializableObject {
//>> Properties

    /**
    * Enable/Disable and set the text of the "Is equal to" filter option for columns with number values.
    * @param string $value
    * @return \Kendo\UI\GridFilterableOperatorsNumber
    */
    public function eq($value) {
        return $this->setProperty('eq', $value);
    }

    /**
    * Enable/Disable and set the text of the "Is not equal to" filter option for columns with number values.
    * @param string $value
    * @return \Kendo\UI\GridFilterableOperatorsNumber
    */
    public function neq($value) {
        return $this->setProperty('neq', $value);
    }

    /**
    * Enable/Disable and set the text of the "Is greater than or equal to" filter option for columns with number values.
    * @param string $value
    * @return \Kendo\UI\GridFilterableOperatorsNumber
    */
    public function gte($value) {
        return $this->setProperty('gte', $value);
    }

    /**
    * Enable/Disable and set the text of the "Is greater than" filter option for columns with number values.
    * @param string $value
    * @return \Kendo\UI\GridFilterableOperatorsNumber
    */
    public function gt($value) {
        return $this->setProperty('gt', $value);
    }

    /**
    * Enable/Disable and set the text of the "Is less than or equal to" filter option for columns with number values.
    * @param string $value
    * @return \Kendo\UI\GridFilterableOperatorsNumber
    */
    public function lte($value) {
        return $this->setProperty('lte', $value);
    }

    /**
    * Enable/Disable and set the text of the "Is less than" filter option for columns with number values.
    * @param string $value
    * @return \Kendo\UI\GridFilterableOperatorsNumber
    */
    public function lt($value) {
        return $this->setProperty('lt', $value);
    }

//<< Properties
}

?>

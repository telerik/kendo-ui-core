<?php

namespace Kendo\UI;

class GridFilterableOperatorsNumber extends \Kendo\SerializableObject {
//>> Properties

    /**
    * The text of the "equal" filter operator.
    * @param string $value
    * @return \Kendo\UI\GridFilterableOperatorsNumber
    */
    public function eq($value) {
        return $this->setProperty('eq', $value);
    }

    /**
    * The text of the "not equal" filter operator.
    * @param string $value
    * @return \Kendo\UI\GridFilterableOperatorsNumber
    */
    public function neq($value) {
        return $this->setProperty('neq', $value);
    }

    /**
    * The text of the "greater than or equal" filter operator.
    * @param string $value
    * @return \Kendo\UI\GridFilterableOperatorsNumber
    */
    public function gte($value) {
        return $this->setProperty('gte', $value);
    }

    /**
    * The text of the "greater than" filter operator.
    * @param string $value
    * @return \Kendo\UI\GridFilterableOperatorsNumber
    */
    public function gt($value) {
        return $this->setProperty('gt', $value);
    }

    /**
    * The text of the "less than or equal" filter operator.
    * @param string $value
    * @return \Kendo\UI\GridFilterableOperatorsNumber
    */
    public function lte($value) {
        return $this->setProperty('lte', $value);
    }

    /**
    * The text of the "less than" filter operator.
    * @param string $value
    * @return \Kendo\UI\GridFilterableOperatorsNumber
    */
    public function lt($value) {
        return $this->setProperty('lt', $value);
    }

//<< Properties
}

?>

<?php

namespace Kendo\UI;

class GridFilterableOperatorsDate extends \Kendo\SerializableObject {
//>> Properties

    /**
    * The text of the "equal" filter operator.
    * @param string $value
    * @return \Kendo\UI\GridFilterableOperatorsDate
    */
    public function eq($value) {
        return $this->setProperty('eq', $value);
    }

    /**
    * The text of the "not equal" filter operator.
    * @param string $value
    * @return \Kendo\UI\GridFilterableOperatorsDate
    */
    public function neq($value) {
        return $this->setProperty('neq', $value);
    }

    /**
    * The text of the "greater than or equal" filter operator.
    * @param string $value
    * @return \Kendo\UI\GridFilterableOperatorsDate
    */
    public function gte($value) {
        return $this->setProperty('gte', $value);
    }

    /**
    * The text of the "greater than" filter operator.
    * @param string $value
    * @return \Kendo\UI\GridFilterableOperatorsDate
    */
    public function gt($value) {
        return $this->setProperty('gt', $value);
    }

    /**
    * The text of the "less than or equal" filter operator.
    * @param string $value
    * @return \Kendo\UI\GridFilterableOperatorsDate
    */
    public function lte($value) {
        return $this->setProperty('lte', $value);
    }

    /**
    * The text of the "less than" filter operator.
    * @param string $value
    * @return \Kendo\UI\GridFilterableOperatorsDate
    */
    public function lt($value) {
        return $this->setProperty('lt', $value);
    }

//<< Properties
}

?>

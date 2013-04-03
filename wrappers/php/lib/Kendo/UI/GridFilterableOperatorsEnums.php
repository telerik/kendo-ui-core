<?php

namespace Kendo\UI;

class GridFilterableOperatorsEnums extends \Kendo\SerializableObject {
//>> Properties

    /**
    * The text of the "equal" filter operator.
    * @param string $value
    * @return \Kendo\UI\GridFilterableOperatorsEnums
    */
    public function eq($value) {
        return $this->setProperty('eq', $value);
    }

    /**
    * The text of the "not equal" filter operator.
    * @param string $value
    * @return \Kendo\UI\GridFilterableOperatorsEnums
    */
    public function neq($value) {
        return $this->setProperty('neq', $value);
    }

//<< Properties
}

?>

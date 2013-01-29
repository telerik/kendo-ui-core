<?php

namespace Kendo\UI;

class GridFilterableOperatorsEnums extends \Kendo\SerializableObject {
//>> Properties

    /**
    * Enable/Disable and set the text of the "Is equal to" filter option for foreign key columns.
    * @param string $value
    * @return \Kendo\UI\GridFilterableOperatorsEnums
    */
    public function eq($value) {
        return $this->setProperty('eq', $value);
    }

    /**
    * Enable/Disable and set the text of the "Is not equal to" filter option for foreign key columns.
    * @param string $value
    * @return \Kendo\UI\GridFilterableOperatorsEnums
    */
    public function neq($value) {
        return $this->setProperty('neq', $value);
    }

//<< Properties
}

?>

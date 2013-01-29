<?php

namespace Kendo\UI;

class GridFilterableOperators extends \Kendo\SerializableObject {
//>> Properties

    /**
    * Enable/Disable and set the text of filter operators for fields of type string.
    * @param \Kendo\UI\GridFilterableOperatorsString $value
    * @returns \Kendo\UI\GridFilterableOperators
    */
    public function string(\Kendo\UI\GridFilterableOperatorsString $value) {
        return $this->setProperty('string', $value);
    }

    /**
    * Enable/Disable and set the text of filter operators for fields of type number.
    * @param \Kendo\UI\GridFilterableOperatorsNumber $value
    * @returns \Kendo\UI\GridFilterableOperators
    */
    public function number(\Kendo\UI\GridFilterableOperatorsNumber $value) {
        return $this->setProperty('number', $value);
    }

    /**
    * Enable/Disable and set the text of filter operators for fields of type date.
    * @param \Kendo\UI\GridFilterableOperatorsDate $value
    * @returns \Kendo\UI\GridFilterableOperators
    */
    public function date(\Kendo\UI\GridFilterableOperatorsDate $value) {
        return $this->setProperty('date', $value);
    }

    /**
    * Enable/Disable and set the text of filter operators for foreign key columns.
    * @param \Kendo\UI\GridFilterableOperatorsEnums $value
    * @returns \Kendo\UI\GridFilterableOperators
    */
    public function enums(\Kendo\UI\GridFilterableOperatorsEnums $value) {
        return $this->setProperty('enums', $value);
    }

//<< Properties
}

?>

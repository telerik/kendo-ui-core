<?php

namespace Kendo\UI;

class PivotGridMessagesFieldMenuOperators extends \Kendo\SerializableObject {
//>> Properties

    /**
    * The text of the "contains" filter operator.
    * @param string $value
    * @return \Kendo\UI\PivotGridMessagesFieldMenuOperators
    */
    public function contains($value) {
        return $this->setProperty('contains', $value);
    }

    /**
    * The text of the "Does not contain" filter operator.
    * @param string $value
    * @return \Kendo\UI\PivotGridMessagesFieldMenuOperators
    */
    public function doesnotcontain($value) {
        return $this->setProperty('doesnotcontain', $value);
    }

    /**
    * The text of the "Starts with" filter operator.
    * @param string $value
    * @return \Kendo\UI\PivotGridMessagesFieldMenuOperators
    */
    public function startswith($value) {
        return $this->setProperty('startswith', $value);
    }

    /**
    * The text of the "Ends with" filter operator.
    * @param string $value
    * @return \Kendo\UI\PivotGridMessagesFieldMenuOperators
    */
    public function endswith($value) {
        return $this->setProperty('endswith', $value);
    }

    /**
    * The text of the "equal" filter operator.
    * @param string $value
    * @return \Kendo\UI\PivotGridMessagesFieldMenuOperators
    */
    public function eq($value) {
        return $this->setProperty('eq', $value);
    }

    /**
    * The text of the "not equal" filter operator.
    * @param string $value
    * @return \Kendo\UI\PivotGridMessagesFieldMenuOperators
    */
    public function neq($value) {
        return $this->setProperty('neq', $value);
    }

//<< Properties
}

?>

<?php

namespace Kendo\UI;

class PivotGridMessages extends \Kendo\SerializableObject {
//>> Properties

    /**
    * The text messages displayed in the measure fields sections.
    * @param string $value
    * @return \Kendo\UI\PivotGridMessages
    */
    public function measureFields($value) {
        return $this->setProperty('measureFields', $value);
    }

    /**
    * The text messages displayed in the column fields sections.
    * @param string $value
    * @return \Kendo\UI\PivotGridMessages
    */
    public function columnFields($value) {
        return $this->setProperty('columnFields', $value);
    }

    /**
    * The text messages displayed in the row fields sections.
    * @param string $value
    * @return \Kendo\UI\PivotGridMessages
    */
    public function rowFields($value) {
        return $this->setProperty('rowFields', $value);
    }

    /**
    * The text messages displayed in the field menu.
    * @param \Kendo\UI\PivotGridMessagesFieldMenu|array $value
    * @return \Kendo\UI\PivotGridMessages
    */
    public function fieldMenu($value) {
        return $this->setProperty('fieldMenu', $value);
    }

//<< Properties
}

?>

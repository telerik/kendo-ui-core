<?php

namespace Kendo\UI;

class PivotConfiguratorMessages extends \Kendo\SerializableObject {
//>> Properties

    /**
    * The text messages displayed in the measure fields sections.
    * @param string $value
    * @return \Kendo\UI\PivotConfiguratorMessages
    */
    public function measures($value) {
        return $this->setProperty('measures', $value);
    }

    /**
    * The text messages displayed in the column fields sections.
    * @param string $value
    * @return \Kendo\UI\PivotConfiguratorMessages
    */
    public function columns($value) {
        return $this->setProperty('columns', $value);
    }

    /**
    * The text messages displayed in the row fields sections.
    * @param string $value
    * @return \Kendo\UI\PivotConfiguratorMessages
    */
    public function rows($value) {
        return $this->setProperty('rows', $value);
    }

    /**
    * The text messages displayed for measure label.
    * @param string $value
    * @return \Kendo\UI\PivotConfiguratorMessages
    */
    public function measuresLabel($value) {
        return $this->setProperty('measuresLabel', $value);
    }

    /**
    * The text messages displayed for rows label.
    * @param string $value
    * @return \Kendo\UI\PivotConfiguratorMessages
    */
    public function rowsLabel($value) {
        return $this->setProperty('rowsLabel', $value);
    }

    /**
    * The text messages displayed for column label.
    * @param string $value
    * @return \Kendo\UI\PivotConfiguratorMessages
    */
    public function columnsLabel($value) {
        return $this->setProperty('columnsLabel', $value);
    }

    /**
    * The text messages displayed for fields label.
    * @param string $value
    * @return \Kendo\UI\PivotConfiguratorMessages
    */
    public function fieldsLabel($value) {
        return $this->setProperty('fieldsLabel', $value);
    }

    /**
    * The text messages displayed in the field menu.
    * @param \Kendo\UI\PivotConfiguratorMessagesFieldMenu|array $value
    * @return \Kendo\UI\PivotConfiguratorMessages
    */
    public function fieldMenu($value) {
        return $this->setProperty('fieldMenu', $value);
    }

//<< Properties
}

?>

<?php

namespace Kendo\UI;

class GridColumnCommandItemText extends \Kendo\SerializableObject {
//>> Properties

    /**
    * The "edit" text of the edit command.
    * @param string $value
    * @return \Kendo\UI\GridColumnCommandItemText
    */
    public function edit($value) {
        return $this->setProperty('edit', $value);
    }

    /**
    * The "cancel" text of the edit command.
    * @param string $value
    * @return \Kendo\UI\GridColumnCommandItemText
    */
    public function cancel($value) {
        return $this->setProperty('cancel', $value);
    }

    /**
    * The "update" text of the edit command.
    * @param string $value
    * @return \Kendo\UI\GridColumnCommandItemText
    */
    public function update($value) {
        return $this->setProperty('update', $value);
    }

//<< Properties
}

?>

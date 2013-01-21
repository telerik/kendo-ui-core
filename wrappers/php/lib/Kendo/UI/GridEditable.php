<?php

namespace Kendo\UI;

class GridEditable extends \Kendo\SerializableObject {
//>> Properties

    public function confirmation($value) {
        return $this->setProperty('confirmation', $value);
    }

    public function createAt($value) {
        return $this->setProperty('createAt', $value);
    }

    public function destroy($value) {
        return $this->setProperty('destroy', $value);
    }

    public function mode($value) {
        return $this->setProperty('mode', $value);
    }

    public function template($value) {
        return $this->setProperty('template', $value);
    }

    public function update($value) {
        return $this->setProperty('update', $value);
    }

//<< Properties
}

?>

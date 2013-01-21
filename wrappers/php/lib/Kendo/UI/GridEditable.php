<?php

namespace Kendo\UI;

class GridEditable extends \Kendo\SerializableObject {
//>> Properties

    public function confirmation($value) {
        $this->setProperty('confirmation', $value);

        return $this;
    }

    public function createAt($value) {
        $this->setProperty('createAt', $value);

        return $this;
    }

    public function destroy($value) {
        $this->setProperty('destroy', $value);

        return $this;
    }

    public function mode($value) {
        $this->setProperty('mode', $value);

        return $this;
    }

    public function template($value) {
        $this->setProperty('template', $value);

        return $this;
    }

    public function update($value) {
        $this->setProperty('update', $value);

        return $this;
    }

//<< Properties
}

?>

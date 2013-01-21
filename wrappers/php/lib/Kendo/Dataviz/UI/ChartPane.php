<?php

namespace Kendo\Dataviz\UI;

class ChartPane extends \Kendo\SerializableObject {
//>> Properties

    public function name($value) {
        return $this->setProperty('name', $value);
    }

    public function margin($value) {
        return $this->setProperty('margin', $value);
    }

    public function padding($value) {
        return $this->setProperty('padding', $value);
    }

    public function background($value) {
        return $this->setProperty('background', $value);
    }

    public function border(\Kendo\Dataviz\UI\ChartPaneBorder $value) {
        return $this->setProperty('border', $value);
    }

    public function height($value) {
        return $this->setProperty('height', $value);
    }

    public function title($value) {
        return $this->setProperty('title', $value);
    }

//<< Properties
}

?>

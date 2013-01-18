<?php

namespace kendo\dataviz\ui;

class ChartPane extends \kendo\SerializableObject {
//>> Properties

    public function setName($value) {
        $this->setProperty('name', $value);

        return $this;
    }

    public function setMargin($value) {
        $this->setProperty('margin', $value);

        return $this;
    }

    public function setPadding($value) {
        $this->setProperty('padding', $value);

        return $this;
    }

    public function setBackground($value) {
        $this->setProperty('background', $value);

        return $this;
    }

    public function setBorder(\kendo\dataviz\ui\ChartPaneBorder $value) {
        $this->setProperty('border', $value);

        return $this;
    }

    public function setHeight($value) {
        $this->setProperty('height', $value);

        return $this;
    }

    public function setTitle($value) {
        $this->setProperty('title', $value);

        return $this;
    }

    public function setTitle(\kendo\dataviz\ui\ChartPaneTitle $value) {
        $this->setProperty('title', $value);

        return $this;
    }

//<< Properties
}

?>

<?php

namespace Kendo\Dataviz\UI;

class StockChartPane extends \Kendo\SerializableObject {
//>> Properties

    public function name($value) {
        $this->setProperty('name', $value);

        return $this;
    }

    public function margin($value) {
        $this->setProperty('margin', $value);

        return $this;
    }

    public function padding($value) {
        $this->setProperty('padding', $value);

        return $this;
    }

    public function background($value) {
        $this->setProperty('background', $value);

        return $this;
    }

    public function border(\Kendo\Dataviz\UI\StockChartPaneBorder $value) {
        $this->setProperty('border', $value);

        return $this;
    }

    public function height($value) {
        $this->setProperty('height', $value);

        return $this;
    }

    public function title(\Kendo\Dataviz\UI\StockChartPaneTitle $value) {
        $this->setProperty('title', $value);

        return $this;
    }

//<< Properties
}

?>

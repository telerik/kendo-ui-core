<?php

namespace Kendo\Dataviz\UI;

class SparklineCategoryAxisItemCrosshairTooltip extends \Kendo\SerializableObject {
//>> Properties

    /**
    * The background color of the tooltip.
    * @param string $value
    * @return \Kendo\Dataviz\UI\SparklineCategoryAxisItemCrosshairTooltip
    */
    public function background($value) {
        return $this->setProperty('background', $value);
    }

    /**
    * The border configuration options.
    * @param \Kendo\Dataviz\UI\SparklineCategoryAxisItemCrosshairTooltipBorder|array $value
    * @return \Kendo\Dataviz\UI\SparklineCategoryAxisItemCrosshairTooltip
    */
    public function border($value) {
        return $this->setProperty('border', $value);
    }

    /**
    * The text color of the tooltip.
    * @param string $value
    * @return \Kendo\Dataviz\UI\SparklineCategoryAxisItemCrosshairTooltip
    */
    public function color($value) {
        return $this->setProperty('color', $value);
    }

    /**
    * The tooltip font.
    * @param string $value
    * @return \Kendo\Dataviz\UI\SparklineCategoryAxisItemCrosshairTooltip
    */
    public function font($value) {
        return $this->setProperty('font', $value);
    }

    /**
    * The tooltip format.
    * @param string $value
    * @return \Kendo\Dataviz\UI\SparklineCategoryAxisItemCrosshairTooltip
    */
    public function format($value) {
        return $this->setProperty('format', $value);
    }

    /**
    * The padding of the tooltip.
    * @param float| $value
    * @return \Kendo\Dataviz\UI\SparklineCategoryAxisItemCrosshairTooltip
    */
    public function padding($value) {
        return $this->setProperty('padding', $value);
    }

    /**
    * Sets the template option of the SparklineCategoryAxisItemCrosshairTooltip.
    * The tooltip template.
Template variables:
    * @param string $value The id of the element which represents the kendo template.
    * @return \Kendo\Dataviz\UI\SparklineCategoryAxisItemCrosshairTooltip
    */
    public function templateId($value) {
        $value = new \Kendo\Template($value);

        return $this->setProperty('template', $value);
    }

    /**
    * Sets the template option of the SparklineCategoryAxisItemCrosshairTooltip.
    * The tooltip template.
Template variables:
    * @param string $value The template content.
    * @return \Kendo\Dataviz\UI\SparklineCategoryAxisItemCrosshairTooltip
    */
    public function template($value) {
        return $this->setProperty('template', $value);
    }

    /**
    * A value indicating if the tooltip should be displayed.
    * @param boolean $value
    * @return \Kendo\Dataviz\UI\SparklineCategoryAxisItemCrosshairTooltip
    */
    public function visible($value) {
        return $this->setProperty('visible', $value);
    }

//<< Properties
}

?>

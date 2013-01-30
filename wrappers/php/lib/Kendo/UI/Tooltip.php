<?php

namespace Kendo\UI;

class Tooltip extends \Kendo\UI\Widget {
    public function name() {
        return 'Tooltip';
    }
//>> Properties

    /**
    * Specifies if the tooltip will be hidden when mouse leaves the target element. If set to false a close button will be shown within tooltip.
    * @param boolean $value
    * @return \Kendo\UI\Tooltip
    */
    public function autoHide($value) {
        return $this->setProperty('autoHide', $value);
    }

    /**
    * A collection of {Animation} objects, used to change default animations. A value of false
will disable all animations in the widget.
    * @param \Kendo\UI\TooltipAnimation|array $value
    * @return \Kendo\UI\Tooltip
    */
    public function animation($value) {
        return $this->setProperty('animation', $value);
    }

    /**
    * The text or a function which result will be shown within the tooltip.
By default the tooltip will display the target element title attribute content.
    * @param string|\kendo\JavaScriptFunction|\Kendo\UI\TooltipContent|array $value
    * @return \Kendo\UI\Tooltip
    */
    public function content($value) {
        return $this->setProperty('content', $value);
    }

    /**
    * Specifies if the tooltip callout will be displayed.
    * @param boolean $value
    * @return \Kendo\UI\Tooltip
    */
    public function callout($value) {
        return $this->setProperty('callout', $value);
    }

    /**
    * Specifies a selector for elements, within the container, for which the tooltip will be displayed.
    * @param string $value
    * @return \Kendo\UI\Tooltip
    */
    public function filter($value) {
        return $this->setProperty('filter', $value);
    }

    /**
    * Explicitly states whether content iframe should be created.
    * @param boolean $value
    * @return \Kendo\UI\Tooltip
    */
    public function iframe($value) {
        return $this->setProperty('iframe', $value);
    }

    /**
    * The height (in pixels) of the tooltip.
    * @param float $value
    * @return \Kendo\UI\Tooltip
    */
    public function height($value) {
        return $this->setProperty('height', $value);
    }

    /**
    * The width (in pixels) of the tooltip.
    * @param float $value
    * @return \Kendo\UI\Tooltip
    */
    public function width($value) {
        return $this->setProperty('width', $value);
    }

    /**
    * The position relative to the target element, at which the tooltip will be shown. Predefined values are "bottom", "top", "left", "right", "center".
    * @param string $value
    * @return \Kendo\UI\Tooltip
    */
    public function position($value) {
        return $this->setProperty('position', $value);
    }

    /**
    * Specify the delay in milliseconds before the tooltip is shown. This option is ignored if showOn is set to "click" or "focus".
    * @param float $value
    * @return \Kendo\UI\Tooltip
    */
    public function showAfter($value) {
        return $this->setProperty('showAfter', $value);
    }

    /**
    * The event on which the tooltip will be shown. Predefined values are "mouseenter", "click" and "focus".
    * @param string $value
    * @return \Kendo\UI\Tooltip
    */
    public function showOn($value) {
        return $this->setProperty('showOn', $value);
    }

    /**
    * Sets the contentLoad event of the Tooltip.
    * Triggered when an AJAX request for content completes.
    * @param string|\Kendo\JavaScriptFunction $value Can be a JavaScript function definition or name.
    * @return \Kendo\UI\Tooltip
    */
    public function contentLoad($value) {
        if (is_string($value)) {
            $value = new \Kendo\JavaScriptFunction($value);
        }

        return $this->setProperty('contentLoad', $value);
    }

    /**
    * Sets the show event of the Tooltip.
    * Triggered when a Tooltip is shown.
    * @param string|\Kendo\JavaScriptFunction $value Can be a JavaScript function definition or name.
    * @return \Kendo\UI\Tooltip
    */
    public function show($value) {
        if (is_string($value)) {
            $value = new \Kendo\JavaScriptFunction($value);
        }

        return $this->setProperty('show', $value);
    }

    /**
    * Sets the hide event of the Tooltip.
    * Triggered when a Tooltip is hidden
    * @param string|\Kendo\JavaScriptFunction $value Can be a JavaScript function definition or name.
    * @return \Kendo\UI\Tooltip
    */
    public function hide($value) {
        if (is_string($value)) {
            $value = new \Kendo\JavaScriptFunction($value);
        }

        return $this->setProperty('hide', $value);
    }

    /**
    * Sets the error event of the Tooltip.
    * Triggered when an AJAX request for content fails.
    * @param string|\Kendo\JavaScriptFunction $value Can be a JavaScript function definition or name.
    * @return \Kendo\UI\Tooltip
    */
    public function error($value) {
        if (is_string($value)) {
            $value = new \Kendo\JavaScriptFunction($value);
        }

        return $this->setProperty('error', $value);
    }

//<< Properties
}

?>

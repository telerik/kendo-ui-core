<?php

namespace Kendo\UI;

class Button extends \Kendo\UI\Widget {
    public function name() {
        return 'Button';
    }

    protected function createElement() {
        $tag = $this->getProperty('tag');

        if (!$tag) {
            $tag = 'button';
        }

        $element = new \Kendo\Html\Element($tag);

        $this->addAttributes($element);

        $content = $this->getProperty('content');

        if (gettype($content) == "string") {
            $element->html($content);
        }

        return $element;
    }

//>> Properties

    /**
    * Indicates whether the Button should be enabled or disabled. By default, it is enabled, unless a disabled="disabled" attribute is detected.
    * @param boolean $value
    * @return \Kendo\UI\Button
    */
    public function enable($value) {
        return $this->setProperty('enable', $value);
    }

    /**
    * Defines a name of an existing icon in the Kendo UI theme sprite. The icon will be applied as background image of a span element inside the Button.
The span element can be added automatically by the widget, or an existing element can be used, if it has a k-icon CSS class applied.
For a list of available icon names, please refer to the Icons demo.
    * @param string $value
    * @return \Kendo\UI\Button
    */
    public function icon($value) {
        return $this->setProperty('icon', $value);
    }

    /**
    * Defines a URL, which will be used for an img element inside the Button. The URL can be relative or absolute. In case it is relative, it will be evaluated with relation to the web page URL.The img element can be added automatically by the widget, or an existing element can be used, if it has a k-image CSS class applied.
    * @param string $value
    * @return \Kendo\UI\Button
    */
    public function imageUrl($value) {
        return $this->setProperty('imageUrl', $value);
    }

    /**
    * Defines a CSS class (or multiple classes separated by spaces), which will be used for applying a background image to a span element inside the Button.
In case you want to use an icon from the Kendo UI theme sprite background image, it is easier to use the icon property.The span element can be added automatically by the widget, or an existing element can be used, if it has a k-sprite CSS class applied.
    * @param string $value
    * @return \Kendo\UI\Button
    */
    public function spriteCssClass($value) {
        return $this->setProperty('spriteCssClass', $value);
    }

    /**
    * Sets the click event of the Button.
    * Fires when the Button is clicked with the mouse, touched on a touch device, or ENTER (or SPACE) is pressed while the Button is focused.
    * @param string|\Kendo\JavaScriptFunction $value Can be a JavaScript function definition or name.
    * @return \Kendo\UI\Button
    */
    public function click($value) {
        if (is_string($value)) {
            $value = new \Kendo\JavaScriptFunction($value);
        }

        return $this->setProperty('click', $value);
    }


    /**
    * Sets the HTML content of the Button.
    * @param string $value
    * @return \Kendo\UI\Button
    */
    public function content($value) {
        return $this->setProperty('content', $value);
    }

    /**
    * Starts output bufferring. Any following markup will be set as the content of the Button.
    */
    public function startContent() {
        ob_start();
    }

    /**
    * Stops output bufferring and sets the preceding markup as the content of the Button.
    */
    public function endContent() {
        $this->content(ob_get_clean());
    }

//<< Properties

    /**
    * Defines the tag, which the Button will render.
    * @param string $value
    * @return \Kendo\UI\Button
    */
    public function tag($value) {
        return $this->setProperty('tag', $value);
    }

}

?>

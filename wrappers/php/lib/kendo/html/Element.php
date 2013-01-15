<?php

namespace kendo\html;

include_once 'Node.php';

class Element implements Node {
    private $tagName;
    private $selfClosing;
    private $children = array();
    private $attributes = array();
    private $innerHtml = '';

    function __construct($tagName, $selfClosing = false) {
        $this->tagName = $tagName;
        $this->selfClosing = $selfClosing;
    }

    public function text($value) {
        return $this->html(htmlentities($value));
    }

    public function html($value) {
        $this->innerHtml = $value;
        $this->children = array();

        return $this;
    }

    public function attr($key, $value) {
        $this->attributes[$key] = $value;

        return $this;
    }

    public function append(Node $node) {
        $this->children[] = $node;

        return $this;
    }

    public function render() {
        return $this->outerHtml();
    }

    public function outerHtml() {
        $html = array();

        $html[] = '<';
        $html[] = $this->tagName;

        foreach ($this->attributes as $key => $value) {
            $html[] = ' ';
            $html[] = $key;
            $html[] = '="';
            $html[] = $value;
            $html[] = '"';
        }

        if ($this->selfClosing) {
            $html[] = ' />';
        } else {
            $html[] = '>';

            if ($this->innerHtml !== '') {
                $html[] = $this->innerHtml;
            }

            foreach ($this->children as $child) {
                $html[] = $child->render();
            }

            $html[] = '</';
            $html[] = $this->tagName;
            $html[] = '>';
        }

        return implode($html);
    }
}

?>

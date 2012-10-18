package com.kendoui.taglib;

import com.kendoui.taglib.html.Div;
import com.kendoui.taglib.html.Element;

@SuppressWarnings("serial")
public class WidgetTagTestDouble extends WidgetTag {

    public WidgetTagTestDouble() {
        super("Foo");
    }

    public void setFoo(String foo) {
        setProperty("foo", foo);
    }

    @Override
    protected Element<?> createElement() {
        return new Div();
    }

    public static String tagName() {
        return "widgetTagTestDouble";
    }

}

package com.kendoui.taglib;

import javax.servlet.jsp.tagext.BodyContent;

import com.kendoui.taglib.html.Div;
import com.kendoui.taglib.html.Element;

@SuppressWarnings("serial")
public class WindowTag extends WidgetTag {

    public WindowTag() {
        super("Window");
    }

    @Override
    protected Element<?> createElement() {
        Div element = new Div();

        BodyContent content = getBodyContent();

        element.html(content.getString());

        return element;
    }

}

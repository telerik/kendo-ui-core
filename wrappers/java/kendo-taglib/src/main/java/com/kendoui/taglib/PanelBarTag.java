package com.kendoui.taglib;

import java.util.ArrayList;
import java.util.List;

import javax.servlet.jsp.tagext.BodyContent;

import com.kendoui.taglib.html.Element;
import com.kendoui.taglib.html.Ul;

@SuppressWarnings("serial")
public class PanelBarTag extends WidgetTag implements PanelBarItemTagContainer {
    private List<PanelBarItemTag> items;

    public PanelBarTag() {
        super("PanelBar");

        items = new ArrayList<PanelBarItemTag>();
    }

    @Override
    protected Element<?> createElement() {
        Ul element = new Ul();

        BodyContent content = getBodyContent();

        element.html(content.getString());

        return element;
    }

    @Override
    public List<PanelBarItemTag> items() {
        return items;
    }
}

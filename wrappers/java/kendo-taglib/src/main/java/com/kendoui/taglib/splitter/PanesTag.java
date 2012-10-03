
package com.kendoui.taglib.splitter;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import com.kendoui.taglib.BaseTag;

import javax.servlet.jsp.JspException;

@SuppressWarnings("serial")
public class PanesTag extends BaseTag /* interfaces */implements Pane/* interfaces */ {

//>> Attributes

    private List<Map<String, Object>> panes;

    @Override
    public void initialize() {
        panes = new ArrayList<Map<String, Object>>();

        super.initialize();
    }

    @Override
    public void destroy() {
        panes = null;

        super.destroy();
    }

    public List<Map<String, Object>> panes () {
        return panes;
    }

    @Override
    public int doEndTag() throws JspException {
        Panes parent = (Panes)findParentWithClass(Panes.class);

        parent.setPanes(this);

        return super.doEndTag();
    }

    @Override
    public void addPane(PaneTag value) {
        panes.add(value.properties());
    }

//<< Attributes
}

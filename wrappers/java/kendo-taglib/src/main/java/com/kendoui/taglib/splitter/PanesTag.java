
package com.kendoui.taglib.splitter;

import java.util.ArrayList;
import java.util.List;

import com.kendoui.taglib.BaseTag;

import javax.servlet.jsp.JspException;

@SuppressWarnings("serial")
public class PanesTag extends BaseTag /* interfaces */implements Pane/* interfaces */ {

//>> Attributes

    private List<PaneTag> panes = new ArrayList<PaneTag>();

    public List<PaneTag> panes () {
        return panes;
    }

    @Override
    public int doEndTag() throws JspException {
        Panes parent = (Panes)findParentWithClass(Panes.class);

        parent.setPanes(this);

        return EVAL_PAGE;
    }

    @Override
    public void addPane(PaneTag value) {
        panes.add(value);
    }

//<< Attributes
}


package com.kendoui.taglib.grid;

import java.util.ArrayList;
import java.util.List;

import com.kendoui.taglib.BaseTag;

import javax.servlet.jsp.JspException;

@SuppressWarnings("serial")
public class ToolbarTag extends BaseTag /* interfaces */implements ToolbarItem/* interfaces */ {

//>> Attributes

    private List<ToolbarItemTag> toolbar = new ArrayList<ToolbarItemTag>();

    public List<ToolbarItemTag> toolbar () {
        return toolbar;
    }

    @Override
    public int doEndTag() throws JspException {
        Toolbar parent = (Toolbar)findParentWithClass(Toolbar.class);

        parent.setToolbar(this);

        return EVAL_PAGE;
    }

    @Override
    public void addToolbarItem(ToolbarItemTag value) {
        toolbar.add(value);
    }

//<< Attributes
}

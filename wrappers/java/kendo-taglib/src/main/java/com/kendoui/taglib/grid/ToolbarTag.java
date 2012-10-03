
package com.kendoui.taglib.grid;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import com.kendoui.taglib.BaseTag;

import javax.servlet.jsp.JspException;

@SuppressWarnings("serial")
public class ToolbarTag extends BaseTag /* interfaces */implements ToolbarItem/* interfaces */ {

//>> Attributes

    private List<Map<String, Object>> toolbar;

    @Override
    public void initialize() {
        toolbar = new ArrayList<Map<String, Object>>();

        super.initialize();
    }

    @Override
    public void destroy() {
        toolbar = null;

        super.destroy();
    }

    public List<Map<String, Object>> toolbar () {
        return toolbar;
    }

    @Override
    public int doEndTag() throws JspException {
        Toolbar parent = (Toolbar)findParentWithClass(Toolbar.class);

        parent.setToolbar(this);

        return super.doEndTag();
    }

    @Override
    public void addToolbarItem(ToolbarItemTag value) {
        toolbar.add(value.properties());
    }

//<< Attributes
}

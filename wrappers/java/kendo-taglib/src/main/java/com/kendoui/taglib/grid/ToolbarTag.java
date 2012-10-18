
package com.kendoui.taglib.grid;

import com.kendoui.taglib.BaseTag;

import java.util.ArrayList;
import java.util.Map;
import java.util.List;

import javax.servlet.jsp.JspException;

@SuppressWarnings("serial")
public class ToolbarTag extends BaseTag /* interfaces */implements ToolbarItem/* interfaces */ {

    
    @Override
    public int doEndTag() throws JspException {
//>> doEndTag

        Toolbar parent = (Toolbar)findParentWithClass(Toolbar.class);

        parent.setToolbar(this);

//<< doEndTag

        return super.doEndTag();
    }

    @Override
    public void initialize() {
//>> initialize

        toolbar = new ArrayList<Map<String, Object>>();

//<< initialize

        super.initialize();
    }

    @Override
    public void destroy() {
//>> destroy

        toolbar = null;

//<< destroy

        super.destroy();
    }

//>> Attributes

    private List<Map<String, Object>> toolbar;

    public List<Map<String, Object>> toolbar() {
        return toolbar;
    }

    public static String tagName() {
        return "grid-toolbar";
    }

    @Override
    public void addToolbarItem(ToolbarItemTag value) {
        toolbar.add(value.properties());
    }

//<< Attributes

}


package com.kendoui.taglib.treelist;


import com.kendoui.taglib.BaseTag;
import com.kendoui.taglib.TreeListTag;


import java.util.ArrayList;
import java.util.Map;
import java.util.List;

import javax.servlet.jsp.JspException;

@SuppressWarnings("serial")
public class ToolbarTag extends BaseTag /* interfaces */ /* interfaces */ {
    
    @Override
    public int doEndTag() throws JspException {
//>> doEndTag
        
        TreeListTag parent = (TreeListTag)findParentWithClass(TreeListTag.class);


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
//<< destroy

        super.destroy();
    }

//>> Attributes

    private List<Map<String, Object>> toolbar;

    public List<Map<String, Object>> toolbar() {
        return toolbar;
    }

    public static String tagName() {
        return "treeList-toolbar";
    }

    public void addToolbarItem(ToolbarItemTag value) {
        toolbar.add(value.properties());
    }

//<< Attributes

}

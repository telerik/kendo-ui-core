
package com.kendoui.taglib.treelist;


import com.kendoui.taglib.BaseTag;



import com.kendoui.taglib.TreeListTag;




import javax.servlet.jsp.JspException;

@SuppressWarnings("serial")
public class FilterableTag extends  BaseTag  /* interfaces */ /* interfaces */ {
    
    @Override
    public int doEndTag() throws JspException {
//>> doEndTag


        TreeListTag parent = (TreeListTag)findParentWithClass(TreeListTag.class);


        parent.setFilterable(this);

//<< doEndTag

        return super.doEndTag();
    }

    @Override
    public void initialize() {
//>> initialize
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

    public static String tagName() {
        return "treeList-filterable";
    }

    public boolean getExtra() {
        return (boolean)getProperty("extra");
    }

    public void setExtra(boolean value) {
        setProperty("extra", value);
    }

//<< Attributes

}

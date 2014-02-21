
package com.kendoui.taglib.sortable;


import com.kendoui.taglib.BaseTag;



import com.kendoui.taglib.SortableTag;




import javax.servlet.jsp.JspException;

@SuppressWarnings("serial")
public class CursorOffsetTag extends  BaseTag  /* interfaces */ /* interfaces */ {
    
    @Override
    public int doEndTag() throws JspException {
//>> doEndTag


        SortableTag parent = (SortableTag)findParentWithClass(SortableTag.class);


        parent.setCursorOffset(this);

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
        return "sortable-cursorOffset";
    }

    public float getLeft() {
        return (float)getProperty("left");
    }

    public void setLeft(float value) {
        setProperty("left", value);
    }

    public float getTop() {
        return (float)getProperty("top");
    }

    public void setTop(float value) {
        setProperty("top", value);
    }

//<< Attributes

}

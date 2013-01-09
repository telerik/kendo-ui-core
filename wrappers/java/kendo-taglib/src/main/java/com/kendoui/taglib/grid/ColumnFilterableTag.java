
package com.kendoui.taglib.grid;


import com.kendoui.taglib.BaseTag;






import javax.servlet.jsp.JspException;

@SuppressWarnings("serial")
public class ColumnFilterableTag extends  BaseTag  /* interfaces */ /* interfaces */ {
    
    @Override
    public int doEndTag() throws JspException {
//>> doEndTag


        ColumnTag parent = (ColumnTag)findParentWithClass(ColumnTag.class);


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
        return "grid-column-filterable";
    }

    public void setUi(ColumnFilterableUiFunctionTag value) {
        setEvent("ui", value.getBody());
    }

    public String getUi() {
        return (String)getProperty("ui");
    }

    public void setUi(String value) {
        setProperty("ui", value);
    }

//<< Attributes

}

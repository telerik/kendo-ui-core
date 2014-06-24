
package com.kendoui.taglib.pivotgrid;


import com.kendoui.taglib.BaseTag;



import com.kendoui.taglib.PivotGridTag;




import javax.servlet.jsp.JspException;

@SuppressWarnings("serial")
public class MessagesTag extends  BaseTag  /* interfaces */ /* interfaces */ {
    
    @Override
    public int doEndTag() throws JspException {
//>> doEndTag


        PivotGridTag parent = (PivotGridTag)findParentWithClass(PivotGridTag.class);


        parent.setMessages(this);

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
        return "pivotGrid-messages";
    }

    public java.lang.String getColumnFields() {
        return (java.lang.String)getProperty("columnFields");
    }

    public void setColumnFields(java.lang.String value) {
        setProperty("columnFields", value);
    }

    public java.lang.String getMeasureFields() {
        return (java.lang.String)getProperty("measureFields");
    }

    public void setMeasureFields(java.lang.String value) {
        setProperty("measureFields", value);
    }

    public java.lang.String getRowFields() {
        return (java.lang.String)getProperty("rowFields");
    }

    public void setRowFields(java.lang.String value) {
        setProperty("rowFields", value);
    }

//<< Attributes

}

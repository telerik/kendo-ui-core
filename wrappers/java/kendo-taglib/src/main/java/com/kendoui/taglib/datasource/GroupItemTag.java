
package com.kendoui.taglib.datasource;


import com.kendoui.taglib.BaseTag;






import javax.servlet.jsp.JspException;

@SuppressWarnings("serial")
public class GroupItemTag extends  BaseTag  /* interfaces *//* interfaces */ {
    
    @Override
    public int doEndTag() throws JspException {
//>> doEndTag

        GroupTag parent = (GroupTag)findParentWithClass(GroupTag.class);

        parent.addGroupItem(this);

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
        return "dataSource-groupItem";
    }

    public void setAggregates(GroupItemAggregatesTag value) {

        setProperty("aggregates", value.aggregates());

    }

    public String getField() {
        return (String)getProperty("field");
    }

    public void setField(String value) {
        setProperty("field", value);
    }

    public String getDir() {
        return (String)getProperty("dir");
    }

    public void setDir(String value) {
        setProperty("dir", value);
    }

//<< Attributes

}

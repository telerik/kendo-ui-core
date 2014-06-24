
package com.kendoui.taglib;


import com.kendoui.taglib.pivotgrid.*;


import com.kendoui.taglib.json.Function;


import javax.servlet.jsp.JspException;

@SuppressWarnings("serial")
public class PivotGridTag extends WidgetTag /* interfaces */implements DataBoundWidget/* interfaces */ {

    public PivotGridTag() {
        super("PivotGrid");
    }
    
    @Override
    public int doEndTag() throws JspException {
//>> doEndTag
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
        return "pivotGrid";
    }

    public void setMessages(com.kendoui.taglib.pivotgrid.MessagesTag value) {
        setProperty("messages", value);
    }

    public void setCollapseMember(CollapseMemberFunctionTag value) {
        setEvent("collapseMember", value.getBody());
    }

    public void setDataBinding(DataBindingFunctionTag value) {
        setEvent("dataBinding", value.getBody());
    }

    public void setDataBound(DataBoundFunctionTag value) {
        setEvent("dataBound", value.getBody());
    }

    public void setExpandMember(ExpandMemberFunctionTag value) {
        setEvent("expandMember", value.getBody());
    }

    public boolean getAutoBind() {
        return (boolean)getProperty("autoBind");
    }

    public void setAutoBind(boolean value) {
        setProperty("autoBind", value);
    }

    public void setDataSource(DataSourceTag dataSource) {
        setProperty("dataSource", dataSource);
    }

    public void setDataSource(PivotDataSourceTag dataSource) {
        setProperty("dataSource", dataSource);
    }
    
    public java.lang.Object getHeight() {
        return (java.lang.Object)getProperty("height");
    }

    public void setHeight(java.lang.Object value) {
        setProperty("height", value);
    }

    public boolean getReorderable() {
        return (boolean)getProperty("reorderable");
    }

    public void setReorderable(boolean value) {
        setProperty("reorderable", value);
    }

    public String getCollapseMember() {
        Function property = ((Function)getProperty("collapseMember"));
        if (property != null) {
            return property.getBody();
        }
        return null;
    }

    public void setCollapseMember(String value) {
        setProperty("collapseMember", new Function(value));
    }

    public String getDataBinding() {
        Function property = ((Function)getProperty("dataBinding"));
        if (property != null) {
            return property.getBody();
        }
        return null;
    }

    public void setDataBinding(String value) {
        setProperty("dataBinding", new Function(value));
    }

    public String getDataBound() {
        Function property = ((Function)getProperty("dataBound"));
        if (property != null) {
            return property.getBody();
        }
        return null;
    }

    public void setDataBound(String value) {
        setProperty("dataBound", new Function(value));
    }

    public String getExpandMember() {
        Function property = ((Function)getProperty("expandMember"));
        if (property != null) {
            return property.getBody();
        }
        return null;
    }

    public void setExpandMember(String value) {
        setProperty("expandMember", new Function(value));
    }

//<< Attributes

}

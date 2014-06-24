
package com.kendoui.taglib;


import com.kendoui.taglib.pivotconfigurator.*;



import javax.servlet.jsp.JspException;

@SuppressWarnings("serial")
public class PivotConfiguratorTag extends WidgetTag /* interfaces */implements DataBoundWidget/* interfaces */ {

    public PivotConfiguratorTag() {
        super("PivotConfigurator");
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
        return "pivotConfigurator";
    }

    public void setMessages(com.kendoui.taglib.pivotconfigurator.MessagesTag value) {
        setProperty("messages", value);
    }

    public void setDataSource(DataSourceTag dataSource) {
        setProperty("dataSource", dataSource);
    }

//<< Attributes

}

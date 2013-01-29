
package com.kendoui.taglib.stockchart;


import com.kendoui.taglib.*;


import com.kendoui.taglib.StockChartTag;




import javax.servlet.jsp.JspException;

@SuppressWarnings("serial")
public class NavigatorTag extends  BaseTag  /* interfaces */implements DataBoundWidget/* interfaces */ {
    
    @Override
    public int doEndTag() throws JspException {
//>> doEndTag


        StockChartTag parent = (StockChartTag)findParentWithClass(StockChartTag.class);


        parent.setNavigator(this);

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
        return "stockChart-navigator";
    }

    public void setHint(com.kendoui.taglib.stockchart.NavigatorHintTag value) {
        setProperty("hint", value);
    }

    public void setSelect(com.kendoui.taglib.stockchart.NavigatorSelectTag value) {
        setProperty("select", value);
    }

    public void setSeries(NavigatorSeriesTag value) {

        setProperty("series", value.series());

    }

    public boolean getAutoBind() {
        return (boolean)getProperty("autoBind");
    }

    public void setAutoBind(boolean value) {
        setProperty("autoBind", value);
    }

    @Override
    public void setDataSource(DataSourceTag dataSource) {
        setProperty("dataSource", dataSource);
    }

    public String getDateField() {
        return (String)getProperty("dateField");
    }

    public void setDateField(String value) {
        setProperty("dateField", value);
    }

    public boolean getVisible() {
        return (boolean)getProperty("visible");
    }

    public void setVisible(boolean value) {
        setProperty("visible", value);
    }

//<< Attributes

}

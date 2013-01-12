
package com.kendoui.taglib;


import com.kendoui.taglib.stockchart.*;



import javax.servlet.jsp.JspException;

@SuppressWarnings("serial")
public class StockChartTag extends WidgetTag /* interfaces */implements DataBoundWidget/* interfaces */ {

    public StockChartTag() {
        super("StockChart");
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
        return "stockChart";
    }

    public void setNavigator(NavigatorTag value) {
        setProperty("navigator", value);
    }

    public void setSeries(SeriesTag value) {

        setProperty("series", value.series());

    }

    public void setTooltip(TooltipTag value) {
        setProperty("tooltip", value);
    }

    public void setCategoryAxis(CategoryAxisTag value) {

        setProperty("categoryAxis", value.categoryAxis());

    }

    public void setTitle(TitleTag value) {
        setProperty("title", value);
    }

    public void setChartArea(ChartAreaTag value) {
        setProperty("chartArea", value);
    }

    public void setLegend(LegendTag value) {
        setProperty("legend", value);
    }

    public void setPanes(PanesTag value) {

        setProperty("panes", value.panes());

    }

    public void setPlotArea(PlotAreaTag value) {
        setProperty("plotArea", value);
    }

    public void setValueAxis(ValueAxisTag value) {

        setProperty("valueAxis", value.valueAxis());

    }

    public void setXAxis(XAxisTag value) {

        setProperty("xAxis", value.xAxis());

    }

    public void setYAxis(YAxisTag value) {

        setProperty("yAxis", value.yAxis());

    }

    public String getDateField() {
        return (String)getProperty("dateField");
    }

    public void setDateField(String value) {
        setProperty("dateField", value);
    }

    @Override
    public void setDataSource(DataSourceTag dataSource) {
        setProperty("dataSource", dataSource);
    }

    public boolean getAutoBind() {
        return (boolean)getProperty("autoBind");
    }

    public void setAutoBind(boolean value) {
        setProperty("autoBind", value);
    }

    public Object getSeriesColors() {
        return (Object)getProperty("seriesColors");
    }

    public void setSeriesColors(Object value) {
        setProperty("seriesColors", value);
    }

    public String getTheme() {
        return (String)getProperty("theme");
    }

    public void setTheme(String value) {
        setProperty("theme", value);
    }

    public boolean getTransitions() {
        return (boolean)getProperty("transitions");
    }

    public void setTransitions(boolean value) {
        setProperty("transitions", value);
    }

//<< Attributes

}


package com.kendoui.taglib;


import com.kendoui.taglib.chart.*;


import com.kendoui.taglib.json.Function;


import javax.servlet.jsp.JspException;

@SuppressWarnings("serial")
public class ChartTag extends WidgetTag /* interfaces */implements DataBoundWidget/* interfaces */ {

    public ChartTag() {
        super("Chart");
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
        return "chart";
    }

    public void setCategoryAxis(CategoryAxisTag value) {
        setProperty("categoryaxis", value);
    }

    public void setTitle(TitleTag value) {
        setProperty("title", value);
    }

    public void setChartArea(ChartAreaTag value) {
        setProperty("chartarea", value);
    }

    public void setLegend(LegendTag value) {
        setProperty("legend", value);
    }

    public void setPlotArea(PlotAreaTag value) {
        setProperty("plotarea", value);
    }

    public void setSeries(SeriesTag value) {

        setProperty("series", value.series());

    }

    public void setTooltip(TooltipTag value) {
        setProperty("tooltip", value);
    }

    public void setSeriesDefaults(SeriesDefaultsTag value) {
        setProperty("seriesdefaults", value);
    }

    public void setValueAxis(ValueAxisTag value) {
        setProperty("valueaxis", value);
    }

    public void setXAxis(XAxisTag value) {
        setProperty("xaxis", value);
    }

    public void setAxisLabelClick(AxisLabelClickFunctionTag value) {
        setEvent("axisLabelClick", value.getBody());
    }

    public void setDataBound(DataBoundFunctionTag value) {
        setEvent("dataBound", value.getBody());
    }

    public void setPlotAreaClick(PlotAreaClickFunctionTag value) {
        setEvent("plotAreaClick", value.getBody());
    }

    public void setSeriesClick(SeriesClickFunctionTag value) {
        setEvent("seriesClick", value.getBody());
    }

    public void setSeriesHover(SeriesHoverFunctionTag value) {
        setEvent("seriesHover", value.getBody());
    }

    @Override
    public void setDataSource(DataSourceTag dataSource) {
        setProperty("dataSource", dataSource);
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

    public Object getYAxis() {
        return (Object)getProperty("yAxis");
    }

    public void setYAxis(Object value) {
        setProperty("yAxis", value);
    }

    public String getAxisLabelClick() {
        return ((Function)getProperty("axisLabelClick")).getBody();
    }

    public void setAxisLabelClick(String value) {
        setProperty("axisLabelClick", new Function(value));
    }

    public String getDataBound() {
        return ((Function)getProperty("dataBound")).getBody();
    }

    public void setDataBound(String value) {
        setProperty("dataBound", new Function(value));
    }

    public String getPlotAreaClick() {
        return ((Function)getProperty("plotAreaClick")).getBody();
    }

    public void setPlotAreaClick(String value) {
        setProperty("plotAreaClick", new Function(value));
    }

    public String getSeriesClick() {
        return ((Function)getProperty("seriesClick")).getBody();
    }

    public void setSeriesClick(String value) {
        setProperty("seriesClick", new Function(value));
    }

    public String getSeriesHover() {
        return ((Function)getProperty("seriesHover")).getBody();
    }

    public void setSeriesHover(String value) {
        setProperty("seriesHover", new Function(value));
    }

//<< Attributes

}

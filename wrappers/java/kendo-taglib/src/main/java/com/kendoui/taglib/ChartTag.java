
package com.kendoui.taglib;


import com.kendoui.taglib.chart.*;


import com.kendoui.taglib.json.Function;


@SuppressWarnings("serial")
public class ChartTag extends WidgetTag /* interfaces */implements CategoryAxis, Title, Area, Legend, PlotArea, Series, Tooltip, XAxis, SeriesDefaults, ValueAxis, DataBoundWidget/* interfaces */ {

    public ChartTag() {
        super("Chart");
    }

//>> Attributes

    @Override
    public void setCategoryAxis(CategoryAxisTag value) {
        setProperty("categoryAxis", value);
    }

    @Override
    public void setTitle(TitleTag value) {
        setProperty("title", value);
    }

    @Override
    public void setArea(AreaTag value) {
        setProperty("area", value);
    }

    @Override
    public void setLegend(LegendTag value) {
        setProperty("legend", value);
    }

    @Override
    public void setPlotArea(PlotAreaTag value) {
        setProperty("plotArea", value);
    }

    @Override
    public void setSeries(SeriesTag value) {
        setProperty("series", value);
    }

    @Override
    public void setTooltip(TooltipTag value) {
        setProperty("tooltip", value);
    }

    @Override
    public void setXAxis(XAxisTag value) {
        setProperty("xAxis", value);
    }

    @Override
    public void setSeriesDefaults(SeriesDefaultsTag value) {
        setProperty("seriesDefaults", value);
    }

    @Override
    public void setValueAxis(ValueAxisTag value) {
        setProperty("valueAxis", value);
    }

    @Override
    public void setDataSource(DataSourceTag dataSource) {
        setProperty("dataSource", dataSource);
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

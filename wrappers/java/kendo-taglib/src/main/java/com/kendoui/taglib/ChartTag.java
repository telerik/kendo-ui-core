package com.kendoui.taglib;

import com.kendoui.taglib.json.Function;

@SuppressWarnings("serial")
public class ChartTag extends WidgetTag implements DataBoundWidget {
    public ChartTag() {
        super("Chart");
    }

//>> Attributes

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

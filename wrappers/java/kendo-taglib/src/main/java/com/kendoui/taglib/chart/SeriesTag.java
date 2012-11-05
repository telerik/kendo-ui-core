
package com.kendoui.taglib.chart;


import com.kendoui.taglib.BaseTag;



import com.kendoui.taglib.ChartTag;


import java.util.ArrayList;
import java.util.Map;
import java.util.List;

import javax.servlet.jsp.JspException;

@SuppressWarnings("serial")
public class SeriesTag extends BaseTag /* interfaces *//* interfaces */ {
    
    @Override
    public int doEndTag() throws JspException {
//>> doEndTag


        ChartTag parent = (ChartTag)findParentWithClass(ChartTag.class);


        parent.setSeries(this);

//<< doEndTag

        return super.doEndTag();
    }

    @Override
    public void initialize() {
//>> initialize

        series = new ArrayList<Map<String, Object>>();

//<< initialize

        super.initialize();
    }

    @Override
    public void destroy() {
//>> destroy

        series = null;

//<< destroy

        super.destroy();
    }

//>> Attributes

    public void addArea(SeriesAreaTag value) {
        series.add(value.properties());
    }

    public void addLine(SeriesLineTag value) {
        series.add(value.properties());
    }

    public void addBar(SeriesBarTag value) {
        series.add(value.properties());
    }

    public void addBubble(SeriesBubbleTag value) {
        series.add(value.properties());
    }

    public void addDonut(SeriesDonutTag value) {
        series.add(value.properties());
    }

    public void addPie(SeriesPieTag value) {
        series.add(value.properties());
    }

    public void addScatter(SeriesScatterTag value) {
        series.add(value.properties());
    }

    public void addScatterLine(SeriesScatterLineTag value) {
        series.add(value.properties());
    }

    public void addCandlestick(SeriesCandlestickTag value) {
        series.add(value.properties());
    }

    public void addOhlc(SeriesOhlcTag value) {
        series.add(value.properties());
    }

    private List<Map<String, Object>> series;

    public List<Map<String, Object>> series() {
        return series;
    }

    public static String tagName() {
        return "chart-series";
    }

    public Object getData() {
        return (Object)getProperty("data");
    }

    public void setData(Object value) {
        setProperty("data", value);
    }

    public String getField() {
        return (String)getProperty("field");
    }

    public void setField(String value) {
        setProperty("field", value);
    }

    public String getGroupNameTemplate() {
        return (String)getProperty("groupNameTemplate");
    }

    public void setGroupNameTemplate(String value) {
        setProperty("groupNameTemplate", value);
    }

    public String getName() {
        return (String)getProperty("name");
    }

    public void setName(String value) {
        setProperty("name", value);
    }

//<< Attributes

}

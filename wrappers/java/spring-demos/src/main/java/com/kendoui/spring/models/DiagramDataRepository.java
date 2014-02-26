package com.kendoui.spring.models;

import java.util.ArrayList;
import java.util.List;

public class DiagramDataRepository {
    public static List<OrgChartItem> OrgChart() 
    {
        List<OrgChartItem> result = new ArrayList<OrgChartItem>();
        OrgChartItem antonio = new OrgChartItem("Antonio", "Moreno", "antonio.jpg", "Team Lead", "#1696d3");
        result.add(antonio);
        
        OrgChartItem elizabeth = new OrgChartItem("Elizabeth", "Brown", "elizabeth.jpg", "Design Lead", "#ef6944");        
        antonio.getItems().add(elizabeth);

        OrgChartItem ann = new OrgChartItem("Ann", "Devon", "ann.jpg", "UI Designer", "#ef6944");
        elizabeth.getItems().add(ann);

        OrgChartItem fran = new OrgChartItem("Fran", "Wilson", "fran.jpg", "Desing Intern", "#ef6944");
        elizabeth.getItems().add(fran);
        
        OrgChartItem diego = new OrgChartItem("Diego", "Roel", "diego.jpg", "QA Engineer", "#ee587b");
        antonio.getItems().add(diego);
        
        OrgChartItem felipe = new OrgChartItem("Felipe", "Izquiedro", "felipe.jpg", "Senior Developer", "#75be16");
        antonio.getItems().add(felipe);
        
        OrgChartItem daniel = new OrgChartItem("Daniel", "Tonini", "daniel.jpg", "Developer", "#75be16");
        felipe.getItems().add(daniel);
        
        return result;
    }
}

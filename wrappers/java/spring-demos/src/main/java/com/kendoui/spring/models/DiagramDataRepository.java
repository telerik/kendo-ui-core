package com.kendoui.spring.models;

import java.util.ArrayList;
import java.util.Arrays;
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
        
        OrgChartItem diego = new OrgChartItem("Diego", "Roel", "diego.jpg", "QA Engineer", "#ee587b");
        antonio.getItems().add(diego);

        OrgChartItem fran = new OrgChartItem("Fran", "Wilson", "fran.jpg", "QA Intern", "#ee587b");
        diego.getItems().add(fran);
        
        OrgChartItem felipe = new OrgChartItem("Felipe", "Izquiedro", "felipe.jpg", "Senior Developer", "#75be16");
        antonio.getItems().add(felipe);
        
        OrgChartItem daniel = new OrgChartItem("Daniel", "Tonini", "daniel.jpg", "Developer", "#75be16");
        felipe.getItems().add(daniel);
        
        return result;
    }
    
    public static List<DiagramNode> DiagramNodes() 
    {
        List<DiagramNode> result = new ArrayList<DiagramNode>();
        DiagramNode root = new DiagramNode("0");
        result.add(root);
        
        AddNodes(root, new int[] { 3, 2, 2 });
        
        return result;
    }
    
    private static void AddNodes(DiagramNode root, int[] levels) {
        if (levels.length > 0) {
            for (int i = 0; i < levels[0]; i++) {
                DiagramNode node = new DiagramNode(root.getName() + "." + i);
                root.getItems().add(node);
                
                if (levels.length > 1) {
                    AddNodes(node, Arrays.copyOfRange(levels, 1, levels.length));
                }
            }
        }
    }
}

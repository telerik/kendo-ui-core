package com.kendoui.spring.models;

import java.util.ArrayList;
import java.util.List;

public class DiagramNode {
    private String name;
    private List<DiagramNode> items = new ArrayList<DiagramNode>();

    public DiagramNode(String name) {
        setName(name);
    }
    
    public List<DiagramNode> getItems() {
        return items;
    }
    
    public void setItems(List<DiagramNode> items) {
        this.items = items;
    }
    
    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }}
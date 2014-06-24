package com.kendoui.spring.models;

import java.util.ArrayList;
import java.util.List;

public class PopulationUSA {
    private String name;
    private Number value;
    private List<PopulationUSA> items = new ArrayList<PopulationUSA>();

    public PopulationUSA(String name, Number value) {
        setName(name);
        setValue(value);
    }
    
    public List<PopulationUSA> getItems() {
        return items;
    }
    
    public void setItems(List<PopulationUSA> items) {
        this.items = items;
    }
    
    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Number getValue() {
        return value;
    }

    public void setValue(Number value) {
        this.value = value;
    }
}
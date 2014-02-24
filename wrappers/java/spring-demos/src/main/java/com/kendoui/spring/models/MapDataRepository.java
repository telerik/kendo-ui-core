package com.kendoui.spring.models;

import java.util.ArrayList;
import java.util.List;

public class MapDataRepository {
    public static List<Marker> StoreLocations() 
    {
        List<Marker> result = new ArrayList<Marker>();
        result.add(new Marker(30.2675,-97.7409, "Zevo Toys"));
        result.add(new Marker(30.2707,-97.7490, "Foo Bars"));
        result.add(new Marker(30.2705,-97.7409, "Mainway Toys"));
        result.add(new Marker(30.2686,-97.7494, "Acme Toys"));
        
        return result;
    }
}

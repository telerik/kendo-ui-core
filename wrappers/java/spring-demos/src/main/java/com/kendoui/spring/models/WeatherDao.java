package com.kendoui.spring.models;

import java.util.List;

public interface WeatherDao {
    public List<Weather> getByMonth(String station, int year, int month);
}

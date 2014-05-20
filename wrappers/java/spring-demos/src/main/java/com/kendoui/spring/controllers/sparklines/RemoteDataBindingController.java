package com.kendoui.spring.controllers.sparklines;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import com.kendoui.spring.models.Weather;
import com.kendoui.spring.models.WeatherDao;

@Controller("dataviz-sparklines_remote_data-controller")
@RequestMapping(value="/sparklines/")
public class RemoteDataBindingController {
    @Autowired 
    private WeatherDao weather;

    @RequestMapping(value = "/remote-data-binding", method = RequestMethod.GET)
    public String index() {
        return "/sparklines/remote-data-binding";
    }
    
    @RequestMapping(value = "/remote-data-binding/read", method = RequestMethod.POST)
    public @ResponseBody List<Weather> read(String station, int year, int month) {
        return weather.getByMonth(station, year, month);
    }
}

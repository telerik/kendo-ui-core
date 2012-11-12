package com.kendoui.spring.controllers.customization;

import java.util.List;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import com.kendoui.spring.models.ChartDataRepository;
import com.kendoui.spring.models.ElectricityProduction;

@Controller("dataviz-customization_plotbands-controller")
@RequestMapping(value="/dataviz/customization/")
public class PlotBandsController {
    @RequestMapping(value = {"/", "/plotbands"}, method = RequestMethod.GET)
    public String index() {
        return "/dataviz/customization/plotbands";
    }
    
    @RequestMapping(value = "/customization/read", method = RequestMethod.POST)
    public @ResponseBody List<ElectricityProduction> read() {
        return ChartDataRepository.SpainElectricityProduction();
    }
}

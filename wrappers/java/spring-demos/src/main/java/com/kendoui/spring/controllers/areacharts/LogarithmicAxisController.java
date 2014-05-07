package com.kendoui.spring.controllers.areacharts;

import java.util.List;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import com.kendoui.spring.models.ChartDataRepository;
import com.kendoui.spring.models.ElectricityProduction;

@Controller("dataviz-area_charts_logarithmic_axis-controller")
@RequestMapping(value="/area-charts/")
public class LogarithmicAxisController {
    @RequestMapping(value = "/logarithmic-axis", method = RequestMethod.GET)
    public String index() {
        return "/area-charts/logarithmic-axis";
    }
    
    @RequestMapping(value = "/logarithmic-axis/read", method = RequestMethod.POST)
    public @ResponseBody List<ElectricityProduction> read() {
        return ChartDataRepository.SpainElectricityProduction();
    }
}

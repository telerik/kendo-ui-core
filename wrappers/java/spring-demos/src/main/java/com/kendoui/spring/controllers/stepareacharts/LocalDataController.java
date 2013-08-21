package com.kendoui.spring.controllers.stepareacharts;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import com.kendoui.spring.models.ChartDataRepository;

@Controller("dataviz-step_area_chart-local_data-controller")
@RequestMapping(value="/dataviz/step-area-charts/")
public class LocalDataController {
    @RequestMapping(value = "/local-data", method = RequestMethod.GET)
    public String index(Model model) {
        model.addAttribute("internetUsers", ChartDataRepository.InternetUsers());
     
        return "/dataviz/step-area-charts/local-data";
    }
}
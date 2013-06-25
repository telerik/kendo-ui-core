package com.kendoui.spring.controllers.polarcharts;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import com.kendoui.spring.models.ChartDataRepository;

@Controller("dataviz-polar_chart-local_data-controller")
@RequestMapping(value="/dataviz/polar-charts/")
public class LocalDataController {
    @RequestMapping(value = "/local-data", method = RequestMethod.GET)
    public String index(Model model) {
        model.addAttribute("sunPosition", ChartDataRepository.SunPositionData());
     
        return "/dataviz/polar-charts/local-data";
    }
}

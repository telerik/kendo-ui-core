package com.kendoui.spring.controllers.sparklines;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import com.kendoui.spring.models.ChartDataRepository;

@Controller("dataviz-sparklines_local_data-controller")
@RequestMapping(value="/dataviz/sparklines/")
public class LocalDataController {
    @RequestMapping(value = "/local-data", method = RequestMethod.GET)
    public String index(Model model) {
        model.addAttribute("compensationData", ChartDataRepository.CompensationData());
        
        return "/dataviz/sparklines/local-data";
    }
}

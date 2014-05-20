package com.kendoui.spring.controllers.sparklines;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import com.kendoui.spring.models.ChartDataRepository;

@Controller("dataviz-sparklines_local_data-controller")
@RequestMapping(value="/sparklines/")
public class LocalDataBindingController {
    @RequestMapping(value = "/local-data-binding", method = RequestMethod.GET)
    public String index(Model model) {
        model.addAttribute("compensationData", ChartDataRepository.CompensationData());
        
        return "/sparklines/local-data-binding";
    }
}

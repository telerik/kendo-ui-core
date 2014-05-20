package com.kendoui.spring.controllers.bulletcharts;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import com.kendoui.spring.models.ChartDataRepository;

@Controller("dataviz-bullet_chart-local_data-controller")
@RequestMapping(value="/bullet-charts/")
public class LocalDataBindingController {
    @RequestMapping(value = "/local-data-binding", method = RequestMethod.GET)
    public String index(Model model) {
        model.addAttribute("mmhgData", ChartDataRepository.mmhgData());
        model.addAttribute("hPaData", ChartDataRepository.hPaData());
     
        return "/bullet-charts/local-data-binding";
    }
}

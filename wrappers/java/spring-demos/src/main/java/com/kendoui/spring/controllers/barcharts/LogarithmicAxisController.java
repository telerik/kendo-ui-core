package com.kendoui.spring.controllers.barcharts;

import java.util.ArrayList;
import java.util.List;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;


@Controller("dataviz-bar_chart-logarithmic_axis-controller")
@RequestMapping(value="/bar-charts/")
public class LogarithmicAxisController {
    
    @RequestMapping(value = "/logarithmic-axis", method = RequestMethod.GET)
    public String index(Model model) {
        List<Integer> data = new ArrayList<Integer>();
        data.add(1);
        data.add(1);
        
        for (int i = 2; i < 39; i++) {
            data.add(data.get(i-1) + data.get(i-2));
        }
        
        model.addAttribute("data", data);
     
        return "/bar-charts/logarithmic-axis";
    }
}

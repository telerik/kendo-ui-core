package com.kendoui.spring.controllers.barcharts;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import com.kendoui.spring.models.ChartDataRepository;
import com.kendoui.spring.models.BlogComments;
import com.kendoui.spring.models.BarChartsLocalDataViewModel;

@Controller("dataviz-bar_chart-local_data-controller")
@RequestMapping(value="/bar-charts/")
public class LocalDataBindingController {
    private Map<Integer, String> userColors = new HashMap<Integer, String>(){{
        put(1,"#ffd600");
        put(2,"#565656");
    }};
    
    @RequestMapping(value = "/local-data-binding", method = RequestMethod.GET)
    public String index(Model model) {
        List<BlogComments> blogComments = ChartDataRepository.BlogComments();
        List<BarChartsLocalDataViewModel> viewModel =  new ArrayList<BarChartsLocalDataViewModel>();
        
        for (int i = 0; i < blogComments.size(); i++)
        {
            BlogComments data = blogComments.get(i);
            BarChartsLocalDataViewModel item = new BarChartsLocalDataViewModel(data);
            if (item.getDay() > 14 && item.getDay() < 21)
            {
                item.setUserColor(userColors.get(2));
            } else {
                item.setUserColor(userColors.get(1));
            }

            viewModel.add(item);
        }
        model.addAttribute("viewModel", viewModel);
     
        return "/bar-charts/local-data-binding";
    }
}

package com.kendoui.spring.controllers.barcharts;

import java.util.ArrayList;
import java.util.List;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import com.kendoui.spring.models.ChartDataRepository;
import com.kendoui.spring.models.InternetUsers;
import com.kendoui.spring.models.BarChartsLocalDataViewModel;

@Controller("dataviz-bar_chart-local_data-controller")
@RequestMapping(value="/dataviz/bar-charts/")
public class LocalDataController {
    private final String HIGHLIGHT_COLOR = "#aaa";
    
    @RequestMapping(value = "/local-data", method = RequestMethod.GET)
    public String index(Model model) {
        List<InternetUsers> internetUsers = ChartDataRepository.InternetUsers();
        List<BarChartsLocalDataViewModel> viewModel =  new ArrayList<BarChartsLocalDataViewModel>();
        
        for (int i = 1; i < internetUsers.size(); i++)
        {
            InternetUsers data = internetUsers.get(i);
            BarChartsLocalDataViewModel item = new BarChartsLocalDataViewModel(data);
            if (internetUsers.get(i - 1).getValue() > data.getValue())
            {
                // Highlight years with less users than the previous year
                item.setColor(HIGHLIGHT_COLOR);
            }

            viewModel.add(item);
        }
        model.addAttribute("viewModel", viewModel);
     
        return "/dataviz/bar-charts/local-data";
    }
}

package com.kendoui.spring.controllers.donutcharts;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import com.kendoui.spring.models.ScreenResolutionRemoteDataViewModel;
import com.kendoui.spring.models.ChartDataRepository;
import com.kendoui.spring.models.ScreenResolution;

@Controller("dataviz-donut_charts_remote_data-controller")
@RequestMapping(value="/donut-charts/")
public class RemoteDataBindingController {
    private Map<Integer, String> resolutionColors = new HashMap<Integer, String>(){{
        put(1,"#ccc");
        put(2,"#c00");
    }};
    
    @RequestMapping(value = "/remote-data-binding", method = RequestMethod.GET)
    public String index() {
        return "/donut-charts/remote-data-binding";
    }
    
    @RequestMapping(value = "/remote-data-binding/read", method = RequestMethod.POST)
    public @ResponseBody List<ScreenResolutionRemoteDataViewModel> read() {
        
        
        List<ScreenResolution> screenResolutions = ChartDataRepository.WorldScreenResolution();
        List<ScreenResolutionRemoteDataViewModel> viewModel =  new ArrayList<ScreenResolutionRemoteDataViewModel>();
        
        for (int i = 0; i < screenResolutions.size(); i++)
        {
            ScreenResolution data = screenResolutions.get(i);
            ScreenResolutionRemoteDataViewModel item = new ScreenResolutionRemoteDataViewModel(data);
            if (item.getYear() == "2005" && item.getResolution() == "1024x768")
            {
                item.setColor(resolutionColors.get(2));
            } else if (item.getResolution() == "Other") {
                item.setColor(resolutionColors.get(1));
            }

            viewModel.add(item);
        }
        return viewModel;
    }
}

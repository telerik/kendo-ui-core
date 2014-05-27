require 'yaml'
require 'json'

web = YAML.load(File.read('demos/mvc/App_Data/web.nav.json'))
dataviz = YAML.load(File.read('demos/mvc/App_Data/dataviz.nav.json'))
mobile = YAML.load(File.read('demos/mvc/App_Data/mobile.nav.json'))
combined = []

[web,dataviz,mobile].each do |suite|
    suite.each do |category, widgets|
        next if category == 'Sample Applications'
        next if category == 'Sample Dashboards'

        widgets.each do |widget|
            widget['categories'] = [category]
            combined.push(widget)
        end
    end
end

File.write('demos/mvc/App_Data/nav.json', JSON.pretty_generate(combined))

require('json')

def country_name?(names, code)
    names.each do |item|
        if item['value'] == code
            return item['text']
        end
    end

    return nil
end

def parse_countries()
    countries_info = JSON.parse(File.read("build/countries/countries.json").gsub(/\'/,'"'))

    names = countries_info['names']
    zones = countries_info['zones']
    result = []

    for i in (0..zones.length).step(2)
        code = zones[i]
        zone_names = zones[i+1]
        name = country_name?(names, code)
        zone_intances = []

        if name
            for j in (0..zone_names.length).step(3)
                zone_name = zone_names[j]
                zone_offset_name = zone_names[j+1]

                if zone_names && zone_offset_name
                    zone_intances.push({:zone=>zone_names[j], :name=>zone_names[j+1]})
                end
            end

            result.push({:name=>name, :code=>code, :zones=>zone_intances})
        end
    end

    return result
end

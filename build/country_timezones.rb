require('json')

def parse_countries()
    countries_info = JSON.parse(File.read("build/countries/countries.json").gsub(/\'/,'"'))

    result = []
    countries = countries_info['names']

    for i in 0..countries.length
        country = countries[i]
        if country && country['text']
            result.push({:name=>country['text'], :code=>country['value']})
        end
    end

    return result
end

def parse_country_zones()
    countries_info = JSON.parse(File.read("build/countries/countries.json").gsub(/\'/,'"'))

    zones = countries_info['zones']
    result = []

    for i in (0..zones.length).step(2)
        code = zones[i]
        zone_names = zones[i+1]

        if zone_names
            for j in (0..zone_names.length).step(3)
                zone_name = zone_names[j]
                zone_offset_name = zone_names[j+1]

                if zone_name && zone_offset_name
                    result.push({:code=>code, :zone=>zone_name, :name=>zone_offset_name})
                end
            end
        end
    end

    return result
end

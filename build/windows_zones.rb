require 'json'
require 'nokogiri'

def parse_zones_titles()
    zones_info = JSON.parse(File.read("build/windows-zones/timezones_titles.json"))

    result = []
    zones = zones_info['zones']

    for i in 0..zones.length
        zone = zones[i]
        if zone
            result.push({:name=>zone['text'], :other_zone=>zone['value']})
        end
    end

    return result
end

def parse_windows_zones()
    xml_doc = Nokogiri::XML(File.read("build/windows-zones/windows-zones.xml"))
    map_zones = xml_doc.xpath('.//mapZone')

    defaultType = ''
    result = []

    map_zones.each do |zone|
        other = zone.attr('other')
        types = zone.attr('type').split
        territory = zone.attr('territory')

        types.each do |type|
            name = type.split('/')[1]
            if name && type != defaultType
                result.push({:other_zone=>other, :zone=>type, :territory=>name.gsub(/_/, ' ')})
            end

            if territory == '001'
                defaultType = types[0]
            end
        end
    end

    return result
end

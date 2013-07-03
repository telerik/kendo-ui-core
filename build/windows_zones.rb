require 'json'
require 'nokogiri'

def parse_zones_titles()
    zones_info = JSON.parse(File.read("build/windows-zones/timezones_titles.json"))

    result = []
    zones = zones_info['zones']

    for i in 0..zones.length
        zone = zones[i]
        if zone
            result.push({:title=>zone['text'], :zone=>zone['value']})
        end
    end

    return result
end

def parse_windows_zones()
    xml_doc = Nokogiri::XML(File.read("build/windows-zones/windows-zones.xml"))
    map_zones = xml_doc.xpath('.//mapZone').take(10)

    defaultType = ''
    result = []

    map_zones.each do |zone|
        other = zone.attr('other')
        types = zone.attr('type').split
        territory = zone.attr('territory')

        types.each do |type|
            if type != defaultType
                name = type.split('/')[1].gsub('/_/', ' ')
                result.push({:zone=>other, :type=>type, :name=>name})
            end

            if territory == '001'
                defaultType = types[0]
            end
        end
    end

    return result
end

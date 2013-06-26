require('windows_zones')

namespace :timezone do
    desc 'Sync the Olsen timezone database'
    task :sync do
        sh 'curl ftp://ftp.iana.org/tz/tzdata-latest.tar.gz -o tzdata-latest.tar.gz --ftp-pasv'
        sh 'tar -xvzf tzdata-latest.tar.gz -C build/timezones'
        sh 'rm tzdata-latest.tar.gz'
    end

TIMEZONE_TEMPLATE = ERB.new(
%{kendo.timezone.zones=<%= zones.to_json.gsub(/,null\\]/, ']') %>;
kendo.timezone.rules=<%= rules.to_json.gsub(/,null\\]/, ']') %>;
kendo.timezone.zones_titles=<%= zones_titles.to_json %>;
kendo.timezone.windows_zones=<%= windows_zones.to_json %>;
}, 0, '<%>')

    desc 'Generate timezone JavaScript files'
    task :generate do
        json = `node build/timezone-js/src/node-preparse.js build/timezones`

        timezone_info = JSON.parse(json)

        zones = timezone_info['zones']

        rules = timezone_info['rules']

        zones_titles = parse_zones_titles()

        windows_zones = parse_windows_zones()

        File.write('src/kendo.timezones.js', TIMEZONE_TEMPLATE.result(binding))
    end
end

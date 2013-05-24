namespace :timezone do
    desc 'Sync the Olsen timezone database'
    task :sync do
        sh 'curl ftp://ftp.iana.org/tz/tzdata-latest.tar.gz -o tzdata-latest.tar.gz --ftp-pasv'
        sh 'tar -xvzf tzdata-latest.tar.gz -C build/timezones'
        sh 'rm tzdata-latest.tar.gz'
    end

TIMEZONE_TEMPLATE = ERB.new(
%{kendo.time.zones["<%= zone_key %>"] = <%= zones.to_json %>;
<% rules.keys.each do |rule_key| %>
kendo.time.rules["<%= rule_key %>"] = <%= rules[rule_key].to_json %>;
<% end %>
}, 0, '<%>')

    desc 'Generate timezone JavaScript files'
    task :generate do
        json = `node build/timezone-js/src/node-preparse.js build/timezones`

        timezone_info = JSON.parse(json)

        all_zones = timezone_info['zones']

        all_rules = timezone_info['rules']

        grouped_timezones = {}

        all_zones.keys.each do |zone_key|
            zones = all_zones[zone_key]

            group_key = zone_key.split('/').first

            group_key = zones.split('/').first if zones.is_a? String

            group = grouped_timezones[group_key]

            grouped_timezones[group_key] = group ||= {}

            if zones.is_a? String
                group[zone_key] = zones
                next
            end

            rules = {}

            zones.each do |zone|
                rule_key = zone[1]

                rule = all_rules[rule_key]

                rules[rule_key] = rule if rule
            end

            group[zone_key] = { 'zones' => zones, 'rules' => rules }

        end

        grouped_timezones.keys.each do |group_key|

            group = grouped_timezones[group_key];

            timezones = group.keys.map do |zone_key|
                data = group[zone_key]

                zones = data['zones'] || data

                rules = data['rules'] || {}

                TIMEZONE_TEMPLATE.result(binding)
            end

            filename = "src/timezones/kendo.timezones.#{group_key}.js"

            File.write(filename, timezones.join)
        end
    end
end

namespace :timezone do
    desc 'Sync the Olsen timezone database'
    task :sync do
        sh 'curl ftp://ftp.iana.org/tz/tzdata-latest.tar.gz -o tzdata-latest.tar.gz --ftp-pasv'
        sh 'tar -xvzf tzdata-latest.tar.gz -C build/timezones'
        sh 'rm tzdata-latest.tar.gz'
    end

TIMEZONE_TEMPLATE = ERB.new(
%{kendo.time.zones["<%= city %>"] = <%= zones.to_json %>;
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

        all_groups = {}

        all_zones.keys.each do |city|
            zones = all_zones[city]

            group = city.split('/').first

            group = zones.split('/').first if zones.is_a? String

            cities = all_groups[group]

            all_groups[group] = cities ||= {}

            if zones.is_a? String
                cities[city] = zones
                next
            end

            rules = {}

            zones.each do |zone|
                rule_key = zone[1]

                rule = all_rules[rule_key]

                rules[rule_key] = rule if rule
            end

            cities[city] = { 'zones' => zones, 'rules' => rules }

        end

        all_groups.keys.each do |group|

            cities = all_groups[group];

            timezones = cities.keys.map do |city|
                data = cities[city]

                zones = data['zones'] || data

                rules = data['rules'] || {}

                TIMEZONE_TEMPLATE.result(binding)
            end

            filename = "src/timezones/kendo.timezone.#{group}.js"

            File.write(filename, timezones.join)
        end
    end
end

require 'yaml'
require 'erb'

DEMOS_CSHTML = FileList['demos/mvc/Views/web/**/*.cshtml']

DEMOS_HTML = []

WEB_TEMPLATE = ERB.new(File.read('build/templates/web-example.html.erb'))

WEB_NAVIGATION = YAML.load(File.read('demos/mvc/App_Data/web.nav.json'))

def include_item?(item)
    packages = item['packages']

    return true unless packages

    invert = false
    match = false

    packages.each do |package|

        if package.start_with?('!')
            invert = true
            package = package[1..-1]
        end

        match = package == 'offline'
    end

    (!invert && match) || (invert && !match)
end

WEB_NAVIGATION.each do |name, categories|
    categories.each do |category|
        if include_item?(category)
            category['items'].each do |item|
                if include_item? (item)
                    DEMOS_HTML.push ("dist/examples/web/#{item['url']}")
                end
            end
        end
    end
end

def find_demo_src (filename)

    filename = filename.sub('dist/examples', 'demos/mvc/Views').pathmap('%X.cshtml')

    DEMOS_CSHTML.find { |file| file == filename }

end

def find_navigation_item(navigation, filename)
    url = filename.pathmap('%-1d/%f')

    navigation.each do |name, categories|
        categories.each do |category|
            category['items'].each do |item|
                return item if item["url"] == url
            end
        end
    end
end


directory 'dist/examples'

rule /dist\/examples\/web\/.+\.html/ => lambda { |t| find_demo_src(t) } do |t|
    item = find_navigation_item(WEB_NAVIGATION, t.name)

    if item && include_item?(item)

        body = File.read(find_demo_src(t.name))
        body.gsub!(/@section \w+ {(.|\n|\r)+?}/, '')
        body.gsub!(/@{(.|\n|\r)+?}/, '')
        body.gsub!(/@@/, '');

        ensure_path(t.name)

        File.open(t.name, 'w') do |file|
            title = item['text']

            file.write WEB_TEMPLATE.result(binding)
        end
    end
end

=begin

navigation.each do |category|
    p category
end
=end

namespace :demos do

    desc('Build debug demo site')
    task :debug => "demos/mvc/Kendo.csproj" do |t|
        msbuild t.prerequisites[0], '/p:Configuration=Debug'
    end

    task :clean do |t|
        rm_rf 'dist/examples'
    end

    task :html => DEMOS_HTML
end


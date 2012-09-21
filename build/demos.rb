require 'yaml'
require 'erb'

DEMOS_CSHTML = FileList['demos/mvc/Views/*/**/*.cshtml']

SUITE_INDEX_TEMPLATE = ERB.new(File.read('build/templates/suite-index.html.erb'))
BUNDLE_INDEX_TEMPLATE = ERB.new(File.read('build/templates/bundle-index.html.erb'))

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

        match = true if package == 'offline'
    end

    (!invert && match) || (invert && !match)
end

def find_demo_src (filename, path)

    filename = filename.sub(path, 'demos/mvc/Views').pathmap('%X.cshtml')

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

def offline_navigation(suite)

    navigation = YAML.load(File.read("demos/mvc/App_Data/#{suite}.nav.json"))

    offline = {}

    navigation.each do |name, categories|
        offline[name] = []
        categories.each do |category|
            if include_item?(category)
                category['items'] = category['items'].find_all { |item| include_item?(item) }

                offline[name].push(category)
            end
        end
    end

    offline
end

def offline_demos(navigation, path)

    demos = []

    navigation.each do |name, categories|
        categories.each do |category|
            category['items'].each do |item|
                demos.push("#{path}/#{item['url']}")
            end
        end
    end

    FileList[demos]
end

def demos(options)

    path = options[:path] + "/examples"

    directory path

    suites = options[:suites]

    files = FileList["#{path}/index.html"].include("#{path}/content")

    tree :to => "#{path}/content",
         :from => FileList['demos/mvc/content/**/*'].exclude('**/docs/*'),
         :root => 'demos/mvc/content/'

    # Build the index.html page of the demos
    file "#{path}/index.html" => [path, 'build/templates/bundle-index.html.erb'] do |t|

        File.open(t.name, 'w') do |file|
            file.write BUNDLE_INDEX_TEMPLATE.result(binding) # 'binding' is the current scope
        end

    end

    suites.each do |suite|

        suite_path  = "#{path}/#{suite}"

        navigation = offline_navigation(suite)

        files = files + offline_demos(navigation, suite_path).include("#{suite_path}/index.html");

        # Build the index.html page of the suite
        file "#{suite_path}/index.html" => 'build/templates/suite-index.html.erb' do |t|

            File.open(t.name, 'w') do |file|
                file.write SUITE_INDEX_TEMPLATE.result(binding) # 'binding' is the current scope
            end

        end

        template = ERB.new(File.read("build/templates/#{suite}-example.html.erb"))

        # Create offline demos by processing the corresponding .cshtml files
        rule /#{path}\/#{suite}\/.+\.html/ => lambda { |t| find_demo_src(t, path) } do |t|
            body = File.read(find_demo_src(t.name, path))
            body.gsub!(/@section \w+ {(.|\n|\r)+?}/, '')
            body.gsub!(/@{(.|\n|\r)+?}/, '')
            body.gsub!(/@@/, '');

            ensure_path(t.name)

            item = find_navigation_item(navigation, t.name)

            File.open(t.name, 'w') do |file|
                title = item['text'] # used by the template and passed via 'binding'

                file.write template.result(binding) # 'binding' is the current scope
            end
        end
    end

    files
end

namespace :demos do

    desc('Build debug demo site')
    task :debug => "demos/mvc/Kendo.csproj" do |t|
        msbuild t.prerequisites[0], '/p:Configuration=Debug'
    end
end


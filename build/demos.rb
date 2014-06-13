require 'yaml'
require 'erb'

DEMOS_CSHTML = FileList['demos/mvc/Views/*/**/*.cshtml']
DEMOS_CS = FileList['demos/mvc/**/*.cs']

DEMOS_BULDFILES = FileList['build/demos.rb'].include('build/templates/**/*.erb')

BUNDLE_INDEX_TEMPLATE = ERB.new(File.read('build/templates/bundle-index.html.erb'))

OFFLINE_DEMO_TEMPLATE_OPTIONS = {
    "/web/spa/Sushi.html" => {
        skip_back_button: true,
        additional_code: <<-SCRIPT,
            window.contentPath = "../../content/spa/websushi";
        SCRIPT
        additional_scripts: %W(
            ../../content/spa/websushi/js/sushi.js
        ),
        additional_stylesheets: %W(
            ../../content/spa/websushi/css/style.css
        )
    },
    "/web/spa/Aeroviewr.html" => {
        skip_back_button: true,
        additional_scripts: %W(
            ../../content/spa/aeroviewr/js/500px.js
            ../../content/spa/aeroviewr/js/aeroviewr.js
        ),
        additional_stylesheets: %W(
            ../../content/spa/aeroviewr/css/aeroviewr.css
        )
    },
    "/web/bootstrap/index.html" => {
        skip_back_button: true,
        additional_stylesheets: %W(
            ../../content/integration/bootstrap-integration/css/bootstrap.min.css
        )
    }
}

OFFLINE_DEMO_TEMPLATE_OPTIONS.default = { skip_back_button: false, additional_scripts: [], additional_stylesheets: [] }

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
    filename = filename.sub(path, 'demos/mvc/Views/demos').pathmap('%X.cshtml')

    DEMOS_CSHTML.find { |file| file == filename }
end

def find_navigation_item(categories, filename)
    url = filename.pathmap('%-1d/%f')

    categories.each do |category|
        category['items'].each do |item|
            return category, item if item["url"] + '.html' == url
        end
    end

    return nil, nil
end

def offline_navigation(path)

    categories = YAML.load(File.read("demos/mvc/content/nav.json"))

    offline = []

    categories.each do |category|

        next if path.include?('mobile.commercial') && category['name'] == 'adaptive'
        next if path.include?('web') && category['name'] == 'mobile'

        if include_item?(category)
            category['items'] = category['items'].find_all do |item|
                include_item?(item) && !(item['external'] && path.include?('web.commercial'))
            end

            offline.push(category)
        end
    end

    offline
end

def offline_demos(categories, path)

    demos = []

    categories.each do |category|

        category['items'].each do |item|
            demos.push("#{path}/#{item['url']}.html") unless item['external']
        end

    end

    FileList[demos]
end

def demos(options)

    path = options[:path]

    template_dir = (options[:template_dir] || '.')

    mkdir_p path, :verbose => false

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

    suite_path  = "#{path}"

    categories = offline_navigation(path)

    files = files + offline_demos(categories, suite_path).include("#{suite_path}/index.html");

    # Build the index.html page of the suite
    file "#{suite_path}/index.html" => DEMOS_BULDFILES.include("build/templates/suite-index.html.erb") do |t|

        template = ERB.new(File.read("build/templates/suite-index.html.erb"))

        File.write(t.name, template.result(binding))

    end

    template = ERB.new(File.read("build/templates/#{template_dir}/example.html.erb"), 0, '%<>')

    # Create offline demos by processing the corresponding .cshtml files
    rule /#{path}\/.+\.html/ => lambda { |t| DEMOS_BULDFILES.include(find_demo_src(t, path)) } do |t|
        body = ""

        File.open(find_demo_src(t.name, path), 'r:bom|utf-8') do |file|
            body = file.read
        end

        body.gsub!(/@section \w+ {(.|\n|\r)+?}/, '')
        body.gsub!(/@{(.|\n|\r)+?}/, '')
        body.gsub!(/@@/, '')

        # if the example is an entire document, take only the body parts
        body_contents = body.match(/<body>(.+)<\/body>/m)
        body = body_contents[1] if body_contents

        options = OFFLINE_DEMO_TEMPLATE_OPTIONS[t.name.sub(path, '')]

        ensure_path(t.name)

        category, item = find_navigation_item(categories, t.name)

        requiresServer = item['requiresServer'].nil? ? false : item['requiresServer']

        mobile = (category['mobile'] && !item['disableInMobile']) || item['mobile']

        title = item['text'] # used by the template and passed via 'binding'

        File.write(t.name, template.result(binding));
    end

    files
end

CLEAN.include('dist/demos')

file 'demos/mvc/bin/Kendo.dll' => DEMOS_CS do |t|
    msbuild 'demos/mvc/Kendo.csproj'
end

THEME_BUILDER_ROOT = 'http://kendoui-themebuilder.telerik.com'

PRODUCTION_RESOURCES = FileList['demos/mvc/**/*']
            .exclude('**/*.cs')
            .exclude('demos/mvc/Web.config')
            .exclude('**/obj/**/*')
            .include('demos/mvc/bin/Kendo.dll')

MVC_RAZOR_VIEWS = FileList['wrappers/mvc/demos/Kendo.Mvc.Examples/Areas/**/*.cshtml']
                    .exclude('**/Shared/**/*')
                    .exclude('**/_ViewStart.cshtml')

MVC_ASPX_VIEWS = FileList['wrappers/mvc/demos/Kendo.Mvc.Examples/Areas/**/*.as*x']

MVC_CONTROLLERS = FileList['wrappers/mvc/demos/Kendo.Mvc.Examples/Controllers/**/*.cs']

SPRING_VIEWS = FileList['wrappers/java/spring-demos/src/main/webapp/WEB-INF/views/**/*.jsp']

SPRING_CONTROLLERS = FileList['wrappers/java/spring-demos/src/main/java/com/kendoui/spring/controllers/**/*.java']

PHP = FileList['wrappers/php/**/*.php']

%w{production staging}.each do |flavor|

    tree :to => "dist/demos/#{flavor}",
         :from => PRODUCTION_RESOURCES,
         :root => 'demos/mvc/'

    tree :to => "dist/demos/#{flavor}/src/php",
         :from => PHP,
         :root => 'wrappers/php/'

    tree :to => "dist/demos/#{flavor}/src/jsp/views",
         :from => SPRING_VIEWS,
         :root => 'wrappers/java/spring-demos/src/main/webapp/WEB-INF/views/'

    tree :to => "dist/demos/#{flavor}/src/jsp/controllers",
         :from => SPRING_CONTROLLERS,
         :root => 'wrappers/java/spring-demos/src/main/java/com/kendoui/spring/controllers/'

    tree :to => "dist/demos/#{flavor}/src/aspnetmvc/controllers",
         :from => MVC_CONTROLLERS,
         :root => 'wrappers/mvc/demos/Kendo.Mvc.Examples/Controllers'

    tree :to => "dist/demos/#{flavor}/src/aspnetmvc/views/aspx",
         :from => MVC_ASPX_VIEWS,
         :root => /wrappers\/mvc\/demos\/Kendo\.Mvc\.Examples\/Areas\/.+?\/Views\//

    tree :to => "dist/demos/#{flavor}/src/aspnetmvc/views/razor",
         :from => MVC_RAZOR_VIEWS,
         :root => /wrappers\/mvc\/demos\/Kendo\.Mvc\.Examples\/Areas\/.+?\/Views\//
end

tree :to => 'dist/demos/staging/content/cdn/js',
     :from => COMPLETE_MIN_JS + MVC_MIN_JS,
     :root => DIST_JS_ROOT

tree :to => 'dist/demos/staging/content/cdn/styles',
     :from => MIN_CSS_RESOURCES,
     :root => ROOT_MAP['styles']

tree :to => 'dist/demos/staging/content/cdn/styles/telerik',
     :from => FileList['wrappers/mvc/legacy-themes/**/*'].include(LEGACY_MIN_CSS),
     :root => 'wrappers/mvc/legacy-themes/'

tree :to => 'dist/demos/staging/content/cdn/themebuilder',
     :from => FileList[THEME_BUILDER_RESOURCES]
                .include('themebuilder/bootstrap.js')
                .sub('themebuilder', 'dist/themebuilder/staging'),
     :root => 'dist/themebuilder/staging/'

class PatchedWebConfigTask < Rake::FileTask
    attr_accessor :options
    def execute(args=nil)
        ensure_path(name)

        File.open(name, "w") do |file|
            source = File.read(prerequisites[0])

            options.each do |name, value|
                source.sub!('$' + name.to_s.upcase, value)
            end

            file.write(source)
        end
    end

    def needed?
        return true if super

        contents = File.read(name)

        !options.map { |param, value| contents.include? value }.reduce { |r,e| r && e }
    end
end

def patched_web_config(name, source, options)
    task = PatchedWebConfigTask.define_task(name => source)
    task.options = options
    task
end

directory 'dist/demos/staging-php'
directory 'dist/demos/staging-java'

namespace :demos do

    desc('Build debug demo site')
    task :debug => 'demos/mvc/Kendo.csproj' do |t|

        File.open('demos/mvc/content/all-scripts.txt', 'w') do |file|
            file.write "jquery.js\n"
            file.write "angular.js\n"
            file.write "angular-route.js\n"
            file.write FileList[YAML.load(`node #{METAJS} --all-deps kendo.all.js`)].gsub("\\", "/").join("\n")
        end

        msbuild t.prerequisites[0], '/p:Configuration=Debug'
    end

    task :clean do
        rm_rf 'dist/demos'
    end

    task :release => 'demos/mvc/bin/Kendo.dll'

    task :upload_to_cdn => [
        :js,
        :less,
        :release,
        'dist/demos/staging/content/cdn/js',
        'dist/demos/staging/content/cdn/themebuilder',
        'dist/demos/staging/content/cdn/styles',
        'dist/demos/staging/content/cdn/styles/telerik'
    ] do |t|
        sh "rsync -rvz dist/demos/staging/content/cdn/ #{KENDO_ORIGIN_HOST}:/usr/share/nginx/html/staging/#{CURRENT_COMMIT}/"
    end

    task :staging_site => [
        :upload_to_cdn,
        'themebuilder:staging',
        'dist/demos/staging',
        'dist/demos/staging/src/aspnetmvc/controllers',
        'dist/demos/staging/src/aspnetmvc/views/aspx',
        'dist/demos/staging/src/aspnetmvc/views/razor',
        'dist/demos/staging/src/jsp/views',
        'dist/demos/staging/src/jsp/controllers',
        'dist/demos/staging/src/php',
        'dist/demos/staging/content/cdn/js',
        'dist/demos/staging/content/cdn/themebuilder',
        'dist/demos/staging/content/cdn/styles',
        'dist/demos/staging/content/cdn/styles/telerik',
        patched_web_config('dist/demos/staging/Web.config', 'demos/mvc/Web.config', {
            :cdn_root => STAGING_CDN_ROOT + CURRENT_COMMIT,
            :themebuilder_root => STAGING_CDN_ROOT + CURRENT_COMMIT + '/themebuilder',
            :dojo_root => '/dojo-staging/',
            :dojo_runner => 'http://kendobuild'
        })
    ]

    zip 'dist/demos/staging.zip' => :staging_site

    desc('Build staging demo site')
    task :staging => 'dist/demos/staging.zip'

    desc('Build java demos for staging')
    task :staging_java => [
        'java:spring',
        'dist/demos/staging-java'
    ] do
        sh "unzip -d dist/demos/staging-java/ --fo #{SPRING_DEMOS_WAR}"
    end

    desc('Build php demos for staging')
    task :staging_php => [
        'bundles:php.commercial',
        'dist/demos/staging-php'
    ] do
        sh 'cp -a dist/bundles/php.commercial/wrappers/php/* dist/demos/staging-php'
    end


    directory 'dist/aspnetmvc-demos'

    desc('Prepare examples for staging')
    task :staging_mvc => [
        'bundles:aspnetmvc.commercial',
        'dist/aspnetmvc-demos'
    ] do
        sh 'cp -a dist/bundles/aspnetmvc.commercial/wrappers/aspnetmvc/Examples/VS* dist/aspnetmvc-demos'
    end

    task :production_site => [:release,
        'dist/demos/production',
        'dist/demos/production/src/php',
        'dist/demos/production/src/jsp/views',
        'dist/demos/production/src/jsp/controllers',
        'dist/demos/production/src/aspnetmvc/controllers',
        'dist/demos/production/src/aspnetmvc/views/aspx',
        'dist/demos/production/src/aspnetmvc/views/razor',
        patched_web_config('dist/demos/production/Web.config', 'demos/mvc/Web.config', {
            :cdn_root => CDN_ROOT + VERSION,
            :themebuilder_root => THEME_BUILDER_ROOT,
            :dojo_root => 'http://dojo.telerik.com/',
            :dojo_runner => 'http://runner.telerik.io'
        })
    ]

    zip 'dist/demos/production.zip' => :production_site

    desc('Build online demo site')
    task :production => 'dist/demos/production.zip'
end

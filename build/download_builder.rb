require 'erb'
require 'tasks'
BUILDER_STAGING_SERVICE =  'http://mvc-kendobuild/staging/download-builder-service'
BUILDER_DEPLOY_SERVICE = 'http://www.telerik.com/services/kendo-download'
BUILDER_SOURCE_PATH = 'download-builder'

BUILDER_DEPLOY_PATH = File.join('dist', 'download-builder')
BUILDER_CONFIG_NAME = File.join('config', 'kendo-config.json')

BUILDER_INDEX_TEMPLATE = ERB.new(File.read(File.join('download-builder', 'index.html.erb')))

namespace :download_builder do

    task :sources => :less do
        grunt "kendo:download_builder"
        core = File.join(BUILDER_DEPLOY_PATH, 'content/js/kendo.core.min.js')

        contents = File.read(core)
        contents.sub!("$KENDO_VERSION", VERSION)
        File.write(core, contents)
    end

    def download_builder_prerequisites(path, service_url)
        dist_path = File.join('dist', path)
        tree :to => dist_path,
            :from => FileList[File.join(BUILDER_SOURCE_PATH, '**/*')].exclude("**/*.erb").exclude(File.join('**', BUILDER_CONFIG_NAME)),
            :root => BUILDER_SOURCE_PATH

        assets_path = File.join(dist_path, 'service', 'App_Data', VERSION)

        js_assets_path = File.join(assets_path, 'js')

        tree :to => js_assets_path,
             :from  => MIN_JS.sub(DIST_JS_ROOT, File.join(BUILDER_DEPLOY_PATH, 'content', "js")),
             :root => File.join(BUILDER_DEPLOY_PATH, 'content', "js")

        styles_assets_path = File.join(assets_path, 'styles')
        tree :to => styles_assets_path,
            :from => MIN_CSS_RESOURCES,
            :root => ROOT_MAP['styles']

        config_file_dir = File.join(dist_path, 'config')
        config_file_path = File.join(config_file_dir,  "kendo-config.#{VERSION}.json")
        directory config_file_dir
        task config_file_path => config_file_dir do |t|
            sh "node #{METAJS} --kendo-config > #{config_file_path}", :verbose => VERBOSE
        end

        index_path = File.join(dist_path, 'index.html')
        task index_path do |t|
            File.open(index_path, 'w') do |file|
                root = service_url
                file.write BUILDER_INDEX_TEMPLATE.result(binding)
            end
        end

        clean_task = File.join(dist_path, "clean")

        task clean_task do
            rm_rf FileList[File.join(dist_path, "{service/App_Data,config}/*")].keep_if { |file| !file.include? VERSION }
        end

        ["download_builder:sources", dist_path, clean_task, index_path, config_file_path, js_assets_path, styles_assets_path]
    end

    task :build_staging => download_builder_prerequisites('download-builder-staging', BUILDER_STAGING_SERVICE) do
        msbuild File.join('dist', 'download-builder-staging', File.join('service', 'Download.csproj')), "'/t:Clean;Build' '/p:Configuration=Release'"
    end

    def download_builder_resources
        dist_path = BUILDER_DEPLOY_PATH

        css_path = File.join(dist_path, 'content', 'styles')

        tree :to => css_path,
             :from => MIN_CSS_RESOURCES,
             :root => ROOT_MAP['styles']

        config_file_path = File.join(dist_path, "kendo-config.js")

        task config_file_path do |t|
            sh "node #{METAJS} --kendo-config > '#{config_file_path}'", :verbose => VERBOSE
        end

        ["download_builder:sources", css_path, config_file_path]
    end

    zip "#{BUILDER_DEPLOY_PATH}/content.zip" => download_builder_resources

    desc 'Build download builder deploy bundle'
    task :bundle => "#{BUILDER_DEPLOY_PATH}/content.zip"

    desc 'Build staging download builder site'
    task :staging => :build_staging
end

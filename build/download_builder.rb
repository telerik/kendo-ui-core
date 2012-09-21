require 'erb'
BUILDER_STAGING_SERVICE =  "http://mvc-kendobuild/staging/download-builder-service"
BUILDER_DEPLOY_SERVICE = "http://www.kendoui.com/services/kendo-download"
BUILDER_SOURCE_PATH = "download-builder"

BUILDER_DEPLOY_PATH = File.join("dist", "download-builder")
BUILDER_CONFIG_NAME = File.join("config", "kendo-config.VERSION_NUMBER.json")

BUILDER_INDEX_TEMPLATE = ERB.new(File.read(File.join("download-builder", "index.html")))

namespace :download_builder do

    def download_builder_prerequisites(path, service_url)
        dist_path = File.join("dist", path)
        tree :to => dist_path,
            :from => FileList[File.join(BUILDER_SOURCE_PATH, "**/*")].exclude(File.join("**", BUILDER_CONFIG_NAME)),
            :root => BUILDER_SOURCE_PATH

        assets_path = File.join(dist_path, "service", "App_Data", VERSION)

        js_assets_path = File.join(assets_path, "js")
        tree :to => js_assets_path,
            :from => CDN_MIN_JS,
            :root => "src"

        styles_assets_path = File.join(assets_path, "styles")
        tree :to => styles_assets_path,
            :from => MIN_CSS_RESOURCES,
            :root => /styles\/.+?\//

        config_file_path = File.join(dist_path, "config",  "kendo-config.#{VERSION}.json")
        file_copy :to => config_file_path, :from => File.join("download-builder", BUILDER_CONFIG_NAME)

        index_path = File.join(dist_path, "index.html")
        task index_path do |t|
            File.open(index_path, "w") do |file|
                root = service_url
                file.write BUILDER_INDEX_TEMPLATE.result(binding)
            end
        end

        [dist_path, index_path, config_file_path, js_assets_path, styles_assets_path]
    end

    task :build_staging => download_builder_prerequisites("download-builder-staging", BUILDER_STAGING_SERVICE) do
        msbuild File.join("dist", "download-builder-staging", File.join("service", "Download.csproj")), "'/t:Clean;Build' '/p:Configuration=Release'"
    end

    zip "dist/download-builder.zip" => download_builder_prerequisites("download-builder", BUILDER_DEPLOY_SERVICE)

    desc "Build download builder deploy bundle"
    task :bundle => "dist/download-builder.zip"

    desc "Build staging download builder site"
    task :staging => :build_staging
end

VS_PLUGIN_SRC_ROOT = 'plugins/KendoBootstrapper/'
VS_PLUGIN_SRC = FileList[VS_PLUGIN_SRC_ROOT + '**/*.*']
VS_PLUGIN_PROJECT = VS_PLUGIN_SRC_ROOT + 'KendoBootstrapper.sln'
VS_PLUGIN_OUTPUT = VS_PLUGIN_SRC_ROOT + 'KendoBootstrapper/bin/Release/KendoBootstrapper.vsix'

CLEAN.include(VS_PLUGIN_OUTPUT)

namespace :vs_plugin do
    file VS_PLUGIN_OUTPUT => VS_PLUGIN_SRC do |t|
        options = '/p:Configuration=Release'

        msbuild VS_PLUGIN_PROJECT, options
    end

    desc 'Builds the VS Bootstrapper plugin'
    task :build => VS_PLUGIN_OUTPUT
end

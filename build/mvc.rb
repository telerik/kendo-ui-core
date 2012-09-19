MVC_SRC = FileList['wrappers/mvc/src/**/*.cs']
            .include('wrappers/mvc/src/**/*.resx')
            .include('wrappers/mvc/src/**/*.csproj')
            .include('wrappers/mvc/src/**/*.snk')
            .include('wrappers/mvc/src/**/*.dll')
            .exclude('wrappers/mvc/src/**/Kendo*.dll')

MVC_DLL = FileList['wrappers/mvc/src/Kendo.Mvc/Resources/Messages.*.resx']
            .include('Kendo.Mvc.dll')
            .include('Kendo.Mvc.xml')
            .pathmap('wrappers/mvc/src/Kendo.Mvc/bin/Release/%f')
            .sub(/Messages\.(.+).resx/, '\1/Kendo.Mvc.resources.dll')

CLEAN.include(FileList['wrappers/mvc/**/Kendo*.dll'])

rule '.resources.dll' => 'wrappers/mvc/src/Kendo.Mvc/bin/Release/Kendo.Mvc.dll'
rule 'Kendo.Mvc.xml' => 'wrappers/mvc/src/Kendo.Mvc/bin/Release/Kendo.Mvc.dll'

MVC_DEMOS_SRC = FileList['wrappers/mvc/demos/**/*']
                .exclude('**/Kendo.Mvc.Examples.dll')
                .exclude('**/Kendo*.txt')
                .reject { |f| File.directory? f }

MVC_DEMOS = FileList['wrappers/mvc/demos/**/*']
                .include('wrappers/mvc/demos/Kendo.Mvc.Examples/bin/Kendo.Mvc.Examples.dll')
                .exclude('**/obj/**/*')
                .exclude('**/System*.dll')
                .exclude('**/*.pdb')
                .exclude('**/*.mdb')

namespace :mvc do
    tree :to => 'wrappers/mvc/demos/Kendo.Mvc.Examples/Content',
         :from => WEB_MIN_CSS + DATAVIZ_MIN_CSS,
         :root => 'styles/'

    tree :to => 'wrappers/mvc/demos/Kendo.Mvc.Examples/Scripts',
         :from => WEB_MIN_JS + DATAVIZ_MIN_JS,
         :root => 'src/'

    task :assets_js => [:js, 'wrappers/mvc/demos/Kendo.Mvc.Examples/Scripts']
    task :assets_css => [:less, 'wrappers/mvc/demos/Kendo.Mvc.Examples/Content']

    desc('Copy the minified CSS and JavaScript to Content and Scripts folder')
    multitask :assets => [:assets_js, :assets_css]
end

# Build ASP.NET MVC wrappers

file 'wrappers/mvc/src/Kendo.Mvc/bin/Release/Kendo.Mvc.dll' => MVC_SRC do |t|
    msbuild 'wrappers/mvc/src/Kendo.Mvc/Kendo.Mvc.csproj'
end

# Build ASP.NET MVC demos

file 'wrappers/mvc/demos/Kendo.Mvc.Examples/bin/Kendo.Mvc.Examples.dll' =>
    ['mvc:assets', MVC_DEMOS_SRC.include('wrappers/mvc/src/Kendo.Mvc/bin/Release/Kendo.Mvc.dll')].flatten do
    msbuild 'wrappers/mvc/demos/Kendo.Mvc.Examples/Kendo.Mvc.Examples.csproj'
end

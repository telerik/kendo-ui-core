MVC_SRC_ROOT = 'wrappers/mvc/src/'
MVC_DEMOS_ROOT = 'wrappers/mvc/demos/Kendo.Mvc.Examples/'
DEMO_SHARED_ROOT = 'demos/mvc/content/'

# The list of files which Kendo.Mvc.dll depends on
MVC_WRAPPERS_SRC = FileList[MVC_SRC_ROOT + '**/*.cs']
            .include(MVC_SRC_ROOT + '**/*.resx')
            .include(MVC_SRC_ROOT + '**/*.csproj')
            .include(MVC_SRC_ROOT + '**/*.snk')
            .include(MVC_SRC_ROOT + '**/*.dll')
            .exclude(MVC_SRC_ROOT + '**/Kendo*.dll')

# The list of assemblies produced when building the wrappers - Kendo.Mvc.dll and satellite assemblies
MVC_DLL = FileList[MVC_SRC_ROOT + 'Kendo.Mvc/Resources/Messages.*.resx']
            .include('Kendo.Mvc.dll')
            .include('Kendo.Mvc.xml')
            .pathmap(MVC_SRC_ROOT + 'Kendo.Mvc/bin/Release/%f')
            .sub(/Messages\.(.+).resx/, '\1/Kendo.Mvc.resources.dll')

# Delete all Kendo*.dll files when `rake clean`
CLEAN.include(FileList['wrappers/mvc/**/Kendo*.dll'])

# Delete all ~/Scripts/**/kendo*.js files when `rake clean`. They are copied by `rake mvc:assets`
CLEAN.include(FileList[MVC_DEMOS_ROOT + 'Scripts/**/*.js'])

# Delete all ~/Content/**/kendo*.css files when `rake clean`. They are copied by `rake mvc:assets`
CLEAN.include(FileList[MVC_DEMOS_ROOT + 'Content/**/kendo*.css'])

MVC_RAZOR_EDITOR_TEMPLATES = FileList[MVC_DEMOS_ROOT + 'Views/Shared/EditorTemplates/*.cshtml']
MVC_ASCX_EDITOR_TEMPLATES = FileList[MVC_DEMOS_ROOT + 'Views/Shared/EditorTemplates/*.ascx']

# Satellite assemblies (<culture>\Kendo.Mvc.ressources.dll) depend on Kendo.Mvc.dll
rule '.resources.dll' => 'wrappers/mvc/src/Kendo.Mvc/bin/Release/Kendo.Mvc.dll' do |t|
    platform = RbConfig::CONFIG['host_os']

    # xbuild can't set the version of satellite assemblies so we build them using `al`
    if platform =~ /linux|darwin/
        culture = t.name.pathmap("%-1d")
        obj = "wrappers/mvc/src/Kendo.Mvc/obj/Release/Kendo.Mvc.Resources.Messages.#{culture}.resources";
        key = 'wrappers/mvc/src/shared/Kendo.snk'

        sh "al /t:lib /embed:#{obj} /culture:#{culture} /out:#{t.name} /template:#{t.prerequisites[0]} /keyfile:#{key}", :verbose => VERBOSE
    end
end

# XML API documentation depends on Kendo.Mvc.Dll
rule 'Kendo.Mvc.xml' => 'wrappers/mvc/src/Kendo.Mvc/bin/Release/Kendo.Mvc.dll'

# The list of whils which Kendo.Mvc.Examples.dll depends on
MVC_DEMOS_SRC = FileList[MVC_DEMOS_ROOT + '**/*.cs']
                .reject { |f| File.directory? f }

# The list of files to deploy in the demos
MVC_DEMOS = FileList[MVC_DEMOS_ROOT + '**/*']
                .include(FileList[MVC_MIN_JS]
                    .sub('src', MVC_DEMOS_ROOT + 'Scripts')
                )
                .include(FileList[MIN_CSS_RESOURCES]
                    .sub('styles', MVC_DEMOS_ROOT + 'Content')
                )
                .include(FileList[DEMO_SHARED_ROOT + 'shared/js/**/*']
                    .reject { |f| File.directory? f }
                    .sub(DEMO_SHARED_ROOT + 'shared/js', MVC_DEMOS_ROOT + 'Scripts')
                    .sub('.js', '.min.js')
                )
                .include(
                    FileList[DEMO_SHARED_ROOT + '{web,dataviz}/**/*']
                        .reject { |f| File.directory? f }
                        .sub(DEMO_SHARED_ROOT, MVC_DEMOS_ROOT + 'Content/')
                )
                .include(
                    FileList[DEMO_SHARED_ROOT + 'shared/styles/**/*']
                        .reject { |f| File.directory? f }
                        .sub(DEMO_SHARED_ROOT + 'shared/styles', MVC_DEMOS_ROOT + 'Content/shared')
                )
                .include(
                    FileList[DEMO_SHARED_ROOT + 'shared/icons/**/*']
                        .reject { |f| File.directory? f }
                        .sub(DEMO_SHARED_ROOT + 'shared/icons', MVC_DEMOS_ROOT + 'Content/shared/icons')
                )
                .include(MVC_DEMOS_ROOT + 'bin/Kendo.Mvc.Examples.dll')
                .exclude('**/*.winjs.*')
                .exclude('**/System*.dll')
                .exclude('**/*.csproj')
                .exclude('**/*resources.dll')
                .exclude('**/Kendo.Mvc.dll')
                .exclude('**/obj/**/*')
                .exclude('**/*.pdb')
                .exclude('**/*.mdb')

# Updates assembly version if the VERSION constant is changed
class AssemblyInfoTask < Rake::FileTask
    def execute(args=nil)
        assemblyInfo = File.read(name)

        version = "#{VERSION}.340" # ".340" means ASP.NET MVC 3 .NET 4.0

        assemblyInfo.gsub!(/Version\([^\)]*\)/, "Version(\"#{version}\")")

        File.open(name, 'w') do |file|
            file.write assemblyInfo
        end
    end

    def needed?
        super || !File.read(name).include?(VERSION)
    end
end

def assembly_info_file (*args, &block)
    AssemblyInfoTask.define_task(*args, &block)
end

# Update CommonAssemblyInfo.cs whenever the VERSION constant changes
assembly_info_file 'wrappers/mvc/src/shared/CommonAssemblyInfo.cs'

namespace :mvc do
    tree :to => MVC_DEMOS_ROOT + 'Content',
         :from => MIN_CSS_RESOURCES,
         :root => 'styles/'

    tree :to => MVC_DEMOS_ROOT + 'App_Data',
         :from => 'demos/mvc/App_Data/*.nav.json',
         :root => 'demos/mvc/App_Data/'

    tree :to => MVC_DEMOS_ROOT + 'Content/web',
         :from => DEMO_SHARED_ROOT + 'web/**/*',
         :root => DEMO_SHARED_ROOT + 'web/'

    tree :to => MVC_DEMOS_ROOT + 'Content/dataviz',
         :from => DEMO_SHARED_ROOT + 'dataviz/**/*',
         :root => DEMO_SHARED_ROOT + 'dataviz/'

    tree :to => MVC_DEMOS_ROOT + 'Content/shared',
         :from => DEMO_SHARED_ROOT + 'shared/styles/**/*',
         :root => DEMO_SHARED_ROOT + 'shared/styles/'

    tree :to => MVC_DEMOS_ROOT + 'Content/shared/icons',
         :from => DEMO_SHARED_ROOT + 'shared/icons/**/*',
         :root => DEMO_SHARED_ROOT + 'shared/icons/'

    tree :to => MVC_DEMOS_ROOT + 'Scripts',
         :from => MVC_MIN_JS,
         :root => 'src/'

    tree :to => MVC_DEMOS_ROOT + 'Scripts',
         :from => DEMO_SHARED_ROOT + 'shared/js/**/*',
         :root => DEMO_SHARED_ROOT + 'shared/js'

    task :assets_js => [:js, MVC_DEMOS_ROOT + 'Scripts', MVC_DEMOS_ROOT + 'App_Data']

    task :assets_css => [
        :less,
        MVC_DEMOS_ROOT + 'Content',
        MVC_DEMOS_ROOT + 'Content/web',
        MVC_DEMOS_ROOT + 'Content/dataviz',
        MVC_DEMOS_ROOT + 'Content/shared',
        MVC_DEMOS_ROOT + 'Content/shared/icons',
    ]

    desc('Update CommonAssemblyInfo.cs with current VERSION')
    task :assembly_version => 'wrappers/mvc/src/shared/CommonAssemblyInfo.cs'

    desc('Copy the minified CSS and JavaScript to Content and Scripts folder')
    task :assets => ['mvc:assets_js', 'mvc:assets_css']
end

# Produce Kendo.Mvc.dll by building Kendo.Mvc.csproj
file 'wrappers/mvc/src/Kendo.Mvc/bin/Release/Kendo.Mvc.dll' => MVC_WRAPPERS_SRC do |t|
    msbuild 'wrappers/mvc/src/Kendo.Mvc/Kendo.Mvc.csproj'
end

# Produce Kendo.Mvc.Examples.dll by building Kendo.Mvc.Examples.csproj
file MVC_DEMOS_ROOT + 'bin/Kendo.Mvc.Examples.dll' =>
    MVC_DEMOS_SRC.include('wrappers/mvc/src/Kendo.Mvc/bin/Release/Kendo.Mvc.dll') do |t|
    msbuild MVC_DEMOS_ROOT + 'Kendo.Mvc.Examples.csproj'
end

# Copy Source.snk as Kendo.snk (the original Kendo.snk should not be distributed)
file_copy :to => 'dist/bundles/aspnetmvc.commercial/src/Kendo.Mvc/Kendo.snk',
          :from => 'wrappers/mvc/src/shared/Source.snk'

# Copy CommonAssemblyInfo.cs because the 'shared' folder is not distributed
file_copy :to => 'dist/bundles/aspnetmvc.commercial/src/Kendo.Mvc/CommonAssemblyInfo.cs',
          :from => 'wrappers/mvc/src/shared/CommonAssemblyInfo.cs'

# Copy Kendo.Mvc.csproj (needed for the next task)
file_copy :to => 'dist/bundles/aspnetmvc.commercial/src/Kendo.Mvc/Kendo.Mvc.csproj',
          :from => 'wrappers/mvc/src/Kendo.Mvc/Kendo.Mvc.csproj'

# Patch Visual Studio Project - fix paths etc.
file 'dist/bundles/aspnetmvc.commercial/src/Kendo.Mvc/Kendo.Mvc.csproj' do |t|
    csproj = File.read(t.name)

    csproj.gsub!(/\.\.\\shared\\Kendo\.snk/, 'Kendo.snk')
    csproj.gsub!(/<Content Include=".*?data\.aspnetmvc\.js"(.|\r|\n)*?<\/Content>/, '')
    csproj.gsub!(/<Content Include=".*?combobox\.aspnetmvc\.js"(.|\r|\n)*?<\/Content>/, '')
    csproj.gsub!(/<Content Include=".*?validator\.aspnetmvc\.js"(.|\r|\n)*?<\/Content>/, '<Content Include="..\\js\\kendo.aspnetmvc.js"><Link>Scripts\\kendo.aspnetmvc.js</Link></Content>')
    csproj.gsub!('<Link>Kendo.snk</Link>', '')
    csproj.gsub!(/\.\.\\shared\\CommonAssemblyInfo\.cs/, 'CommonAssemblyInfo.cs')
    csproj.gsub!('<Link>CommonAssemblyInfo.cs</Link>', '');

    File.open(t.name, 'w') do |file|
        file.write csproj
    end
end

def patch_examples_csproj t
    csproj = File.read(t.name)

    # remove AfterBuild target
    csproj.sub!(/\s*<Target Name="AfterBuild"((.|\r|\n)*?)\/Target>/, '')

    # remove project reference
    csproj.sub!(/\s*<ProjectReference((.|\r|\n)*?)\/ProjectReference>/, '')

    # add reference to Kendo dll
    csproj.sub!(/(\s*)(<Reference.*?\/>)/i, '\1\2\1<Reference Include="Kendo.Mvc" />');

    File.open(t.name, 'w') do |file|
        file.write csproj
    end
end

# Copy Kendo.Mvc.Examples.csproj (needed for the next task)
file_copy :to => 'dist/bundles/aspnetmvc.commercial/wrappers/aspnetmvc/Examples/Kendo.Mvc.Examples.csproj',
          :from => MVC_DEMOS_ROOT + 'Kendo.Mvc.Examples.csproj'

file_copy :to => 'dist/bundles/trial/wrappers/aspnetmvc/Examples/Kendo.Mvc.Examples.csproj',
          :from => MVC_DEMOS_ROOT + 'Kendo.Mvc.Examples.csproj'

# Patch Visual Studio Project - fix paths etc.
file  'dist/bundles/aspnetmvc.commercial/wrappers/aspnetmvc/Examples/Kendo.Mvc.Examples.csproj' do |t|
    patch_examples_csproj t
end

file  'dist/bundles/trial/wrappers/aspnetmvc/Examples/Kendo.Mvc.Examples.csproj' do |t|
    patch_examples_csproj t
end

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

MVC_RAZOR_EDITOR_TEMPLATES = FileList['wrappers/mvc/demos/Kendo.Mvc.Examples/Views/Shared/EditorTemplates/*.cshtml']
MVC_ASCX_EDITOR_TEMPLATES = FileList['wrappers/mvc/demos/Kendo.Mvc.Examples/Views/Shared/EditorTemplates/*.ascx']

rule '.resources.dll' => 'wrappers/mvc/src/Kendo.Mvc/bin/Release/Kendo.Mvc.dll'
rule 'Kendo.Mvc.xml' => 'wrappers/mvc/src/Kendo.Mvc/bin/Release/Kendo.Mvc.dll'

MVC_DEMOS_SRC = FileList['wrappers/mvc/demos/**/*']
                .exclude('**/*.dll')
                .exclude('**/Kendo*.txt')
                .reject { |f| File.directory? f }

MVC_DEMOS = FileList['wrappers/mvc/demos/**/*']
                .include('wrappers/mvc/demos/Kendo.Mvc.Examples/bin/Kendo.Mvc.Examples.dll')
                .exclude('**/System*.dll')
                .exclude('**/*.csproj')
                .exclude('**/*resources.dll')
                .exclude('**/Kendo.Mvc.dll')
                .exclude('**/obj/**/*')
                .exclude('**/*.pdb')
                .exclude('**/*.mdb')

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

assembly_info_file 'wrappers/mvc/src/shared/CommonAssemblyInfo.cs'

namespace :mvc do
    tree :to => 'wrappers/mvc/demos/Kendo.Mvc.Examples/Content',
         :from => WEB_MIN_CSS + DATAVIZ_MIN_CSS,
         :root => 'styles/'

    tree :to => 'wrappers/mvc/demos/Kendo.Mvc.Examples/Scripts',
         :from => WEB_MIN_JS + DATAVIZ_MIN_JS,
         :root => 'src/'

    task :assets_js => [:js, 'wrappers/mvc/demos/Kendo.Mvc.Examples/Scripts']
    task :assets_css => [:less, 'wrappers/mvc/demos/Kendo.Mvc.Examples/Content']

    desc('Update CommonAssemblyInfo.cs with current VERSION')
    task :assembly_version => 'wrappers/mvc/src/shared/CommonAssemblyInfo.cs'

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

# Copy Kendo.Mvc.Examples.csproj (needed for the next task)
file_copy :to => 'dist/bundles/aspnetmvc.commercial/wrappers/aspnetmvc/Examples/Kendo.Mvc.Examples.csproj',
          :from => 'wrappers/mvc/demos/Kendo.Mvc.Examples/Kendo.Mvc.Examples.csproj'

# Patch Visual Studio Project - fix paths etc.
file  'dist/bundles/aspnetmvc.commercial/wrappers/aspnetmvc/Examples/Kendo.Mvc.Examples.csproj' do |t|
    csproj = File.read(t.name)

    # remove AfterBuild target
    csproj.sub!(/\s*<Target Name="AfterBuild"((.|\r|\n)*?)\/Target>/i, '')

    # remove project reference
    csproj.sub!(/\s*<ProjectReference((.|\r|\n)*?)\/ProjectReference>/i, '')

    # add reference to Kendo dll
    csproj.sub!(/(\s*)(<Reference.*?\/>)/i, '\1\2\1<Reference Include="Kendo.Mvc" />');

    File.open(t.name, 'w') do |file|
        file.write csproj
    end
end

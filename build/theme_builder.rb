THEME_BUILDER_BUILDFILE = 'build/theme_builder.rb'

tree :to => 'themebuilder/styles/textures',
     :from => FileList['styles/web/textures/**/*'],
     :root => 'styles/web/textures/'

file 'themebuilder/scripts/template.js' => [ 'styles/web/theme-template.less',
'themebuilder/scripts/constants.js' ] do |t|

    less = File.read(t.prerequisites[0])

    less = less.gsub('\\', '\\\\')
               .gsub('"', '\\"')
               .gsub("'", "\\\\\\\\'")
               .gsub(/\n/, "\\n")
               .gsub(/\r/, "")

    less = "'#{less}'"

    template_info = File.read(t.prerequisites[1])

    less = replace_variable(template_info, 'lessTemplate', less)

    File.open(t.name, 'w') do |file|
        file.write(less)
    end
end

def live_cdn_version
    '2014.3.1119'
end

class PatchedBoostrapScriptTask < Rake::FileTask
    attr_accessor :cdn_root

    include Rake::DSL

    def execute(args=nil)
        ensure_path(name)

        File.open(name, "w") do |file|
            bootstrap = File.read(prerequisites[0])

            {
                "requiredJs" => '["scripts/themebuilder.all.min.js"]',
                "requiredCss" => '["styles/themebuilder.all.min.css"]',
                "bootstrapCss" => '"styles/bootstrap.min.css"',
                "JQUERY_LOCATION" => '"https://ajax.googleapis.com/ajax/libs/jquery/1.8.2/jquery.min.js"',
                "KENDO_LOCATION" => "\"#{cdn_root}/\""
            }.map { |variable, value|
                bootstrap = replace_variable(bootstrap, variable, value)
            }

            file.write bootstrap
        end

        min_filename = "#{File.basename(name)}.min.js"
        uglifyjs name, min_filename
        mv min_filename, name
    end

    def needed?
        return true if super
        contents = File.read(name)
        !contents.include?(cdn_root)
    end
end

def patched_bootstrap(name, source, cdn_root)
    task = PatchedBoostrapScriptTask.define_task(name => source)
    task.cdn_root = cdn_root
    task
end

def replace_variable(source, name, value)
    source.gsub(/#{name}\s*=\s*.*(,|;)\s*$/, "#{name}=" + value + '\1')
end

file_merge 'themebuilder/scripts/themebuilder.all.js' => [
    'themebuilder/scripts/less.js',
    'themebuilder/scripts/themebuilder.js',
    'themebuilder/scripts/template.js'
]
file 'themebuilder/scripts/themebuilder.all.js' => THEME_BUILDER_BUILDFILE
file 'themebuilder/scripts/themebuilder.all.min.js' => 'themebuilder/scripts/themebuilder.all.js' do
    uglifyjs('themebuilder/scripts/themebuilder.all.js', 'themebuilder/scripts/themebuilder.all.min.js');
end

CLEAN.include('themebuilder/scripts/themebuilder.all*js')
CLEAN.include('themebuilder/scripts/themebuilder.all*css')
CLEAN.include('themebuilder/scripts/template.js')

file_merge 'themebuilder/styles/themebuilder.all.css' => [
    'themebuilder/styles/styles.css'
]
file 'themebuilder/styles/themebuilder.all.css' => THEME_BUILDER_BUILDFILE

THEME_BUILDER_RESOURCES = FileList['themebuilder/scripts/themebuilder.all.min.js']
                .include('themebuilder/styles/textures/**/*')
                .include('themebuilder/styles/sprite.png')
                .include('themebuilder/styles/bootstrap.min.css')
                .include('themebuilder/styles/themebuilder.all.min.css')
                .include('themebuilder/index.html')
                .include('themebuilder/web.config')

tree :to => 'dist/themebuilder/production',
     :from =>  THEME_BUILDER_RESOURCES,
     :root => 'themebuilder/'

tree :to => 'dist/themebuilder/staging',
     :from =>  THEME_BUILDER_RESOURCES,
     :root => 'themebuilder/'

namespace :themebuilder do

    desc('Build the generated ThemeBuilder sources')
    task :sources => [
        'themebuilder/scripts/less.js',
        'themebuilder/scripts/template.js',
        'themebuilder/styles/textures'
    ]

    desc('Build the ThemeBuilder for live deployment')
    task :production => [
        'dist/themebuilder/production',
        patched_bootstrap('dist/themebuilder/production/bootstrap.js', 'themebuilder/bootstrap.js', CDN_ROOT + live_cdn_version)
    ]

    desc('Build the ThemeBuilder for staging')
    task :staging => 'dist/themebuilder/staging.zip'

    desc('Deploy the ThemeBuilder to live site')
    task :upload => [ :less, :sources, :production ] do
        local = 'dist/themebuilder/production'
        remote = 'kendoui-themebuilder.telerik.com'
        system("lftp 172.17.49.82:33 -e 'mirror -R -p --delete #{local} #{remote}; bye'")
    end

    zip 'dist/themebuilder/staging.zip' => [
        'dist/themebuilder/staging',
        patched_bootstrap('dist/themebuilder/staging/bootstrap.js', 'themebuilder/bootstrap.js', STAGING_CDN_ROOT + CURRENT_COMMIT)
    ]

end

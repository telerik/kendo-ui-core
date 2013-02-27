THEME_BUILDER_BUILDFILE = 'build/theme_builder.rb'

tree :to => 'themebuilder/styles/textures',
     :from => FileList['styles/web/textures/**/*'],
     :root => 'styles/web/textures/'

file 'themebuilder/scripts/template.js' => [ 'styles/web/template.less',
'themebuilder/scripts/constants.js' ] do |t|

    less = File.read(t.prerequisites[0])

    less = less.gsub('\\', '\\\\')
               .gsub('"', '\\"')
               .gsub("'", "\\\\\\\\'")
               .gsub(/\n/, "\\n")

    less = "'#{less}'"

    template_info = File.read(t.prerequisites[1])

    less = replace_variable(template_info, 'lessTemplate', less)

    File.open(t.name, 'w') do |file|
        file.write(less)
    end
end

def live_cdn_version
    if BETA
        demo_html = `curl http://demos.kendoui.com/beta/web/overview/index.html`
    else
        demo_html = `curl http://demos.kendoui.com/web/overview/index.html`
    end

    /cdn\.kendostatic\.com\/(\d+\.\d+\.\d+)\//.match(demo_html)[1]
end

file 'dist/themebuilder/production/bootstrap.js' => [
    'themebuilder/bootstrap.js',
    THEME_BUILDER_BUILDFILE
] do |t|

    version = live_cdn_version

    patch_bootstrap(t.name, t.prerequisites[0], "#{CDN_ROOT}#{version}")

end

file 'dist/themebuilder/staging/bootstrap.js' => 'themebuilder/bootstrap.js' do |t|

    patch_bootstrap(t.name, t.prerequisites[0], STAGING_CDN_ROOT + CURRENT_COMMIT)

end

def patch_bootstrap(to, from, cdn)

    bootstrap = File.read(from)

    bootstrap = replace_variable(bootstrap, "requiredJs", '["scripts/themebuilder.all.min.js"]');
    bootstrap = replace_variable(bootstrap, "requiredCss", '["styles/themebuilder.all.min.css"]');
    bootstrap = replace_variable(bootstrap, "bootstrapCss", '"styles/bootstrap.min.css"');
    bootstrap = replace_variable(bootstrap, "JQUERY_LOCATION", '"https://ajax.googleapis.com/ajax/libs/jquery/1.8.2/jquery.min.js"');
    bootstrap = replace_variable(bootstrap, "KENDO_LOCATION", "\"#{cdn}/\"");

    File.open(to, 'w') do |file|
        file.write(bootstrap)
    end

    uglifyjs(to, File.basename(to) + '.min.js')

    mv "#{File.basename(to)}.min.js", to
end

def replace_variable(source, name, value)

    source.gsub(/#{name}\s*=\s*.*(,|;)\s*$/, "#{name}=" + value + '\1')

end

file_merge 'themebuilder/scripts/themebuilder.all.js' => [
    'themebuilder/scripts/less.js',
    'themebuilder/scripts/themebuilder.js',
    'themebuilder/scripts/colorengine.js',
    'themebuilder/scripts/template.js'
]
file 'themebuilder/scripts/themebuilder.all.js' => THEME_BUILDER_BUILDFILE

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
        'dist/themebuilder/production/bootstrap.js'
    ]

    desc('Build the ThemeBuilder for staging')
    task :staging => 'dist/themebuilder/staging.zip'

    desc('Deploy the ThemeBuilder to live site')
    task :upload => [ :less, :sources, :production ] do
        local = 'dist/themebuilder/production'
        remote = 'themebuilder'
        system("lftp 172.16.80.87:33 -e 'mirror -R -p --delete #{local} #{remote}; bye'")
    end

    zip 'dist/themebuilder/staging.zip' => [
        'dist/themebuilder/staging',
        'dist/themebuilder/staging/bootstrap.js'
    ]

end

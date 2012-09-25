file_merge 'themebuilder/src/scripts/less.js' => FileList[
     'themebuilder/src/scripts/prologue.js',
     'build/less-js/build/require.js',
     'build/less-js/build/ecma-5.js',
     'build/less-js/lib/less/parser.js',
     'build/less-js/lib/less/functions.js',
     'build/less-js/lib/less/colors.js',
     'build/less-js/lib/less/tree/*.js',
     'build/less-js/lib/less/tree.js',
     'themebuilder/src/scripts/epilogue.js',
]

file_copy :to => 'themebuilder/src/styles/kendo.black.css',
          :from => 'styles/web/kendo.black.css'

tree :to => 'themebuilder/src/styles/Black',
     :from => FileList['styles/web/Black/**/*'],
     :root => 'styles/web/Black/'

tree :to => 'themebuilder/src/styles/textures',
     :from => FileList['styles/web/textures/**/*'],
     :root => 'styles/web/textures/'

file 'themebuilder/src/scripts/template.js' => [ 'styles/web/template.less',
'themebuilder/src/scripts/constants.js' ] do |t|

    less = File.read(t.prerequisites[0])

    less = less.gsub('\\', '\\\\')
               .gsub('"', '\\"')
               .gsub("'", "\\\\\\\\'")
               .gsub("\r\n", '\\n')
               .gsub("(\n|\r)", '\\n')

    less = "'#{less}'"

    template_info = File.read(t.prerequisites[1])

    less = replace_variable(template_info, 'lessTemplate', less)

    File.open(t.name, 'w') do |file|
        file.write(less)
    end
end

file 'dist/themebuilder/production/bootstrap.js' => 'themebuilder/src/bootstrap.js' do |t|

    patch_bootstrap(t.name, t.prerequisites[0], "#{CDN_ROOT}#{VERSION}")

end

file 'dist/themebuilder/staging/bootstrap.js' => 'themebuilder/src/bootstrap.js' do |t|

    patch_bootstrap(t.name, t.prerequisites[0], "http://mvc-kendobuild/staging/content/cdn/")

end

def patch_bootstrap(to, from, cdn)

    bootstrap = File.read(from)

    bootstrap = replace_variable(bootstrap, "requiredJs", '["scripts/themebuilder.all.min.js"]');
    bootstrap = replace_variable(bootstrap, "requiredCss", '["styles/themebuilder.all.min.css"]');
    bootstrap = replace_variable(bootstrap, "JQUERY_LOCATION", '"https://ajax.googleapis.com/ajax/libs/jquery/1.7.1/jquery.min.js"');
    bootstrap = replace_variable(bootstrap, "KENDO_LOCATION", "\"#{cdn}\"");

    File.open(to, 'w') do |file|
        file.write(bootstrap)
    end

    sh "uglifyjs #{to} > #{File.basename(to)}.min.js"

    mv "#{File.basename(to)}.min.js", to
end

def replace_variable(source, name, value)

    source.gsub(/#{name}\s*=\s*.*(,|;)\s*$/, "#{name}=" + value + '\1')

end

file_merge 'themebuilder/src/scripts/themebuilder.all.js' => [
    'themebuilder/src/scripts/less.js',
    'themebuilder/src/scripts/themebuilder.js',
    'themebuilder/src/scripts/colorengine.js',
    'themebuilder/src/scripts/template.js'
]

CLEAN.include('themebuilder/src/scripts/themebuilder.all*js')
CLEAN.include('themebuilder/src/scripts/themebuilder.all*css')
CLEAN.include('themebuilder/src/scripts/template.js')

file_merge 'themebuilder/src/styles/themebuilder.all.css' => [
    'themebuilder/src/styles/kendo.black.css',
    'themebuilder/src/styles/styles.css',
]

THEME_BUILDER_RESOURCES = FileList['themebuilder/src/scripts/themebuilder.all.min.js']
                .include('themebuilder/src/styles/Black/**/*')
                .include('themebuilder/src/styles/textures/**/*')
                .include('themebuilder/src/styles/sprite.png')
                .include('themebuilder/src/styles/bootstrap.min.css')
                .include('themebuilder/src/styles/themebuilder.all.min.css')

tree :to => 'dist/themebuilder/production',
     :from =>  THEME_BUILDER_RESOURCES,
     :root => 'themebuilder/src/'

tree :to => 'dist/themebuilder/staging',
     :from =>  THEME_BUILDER_RESOURCES,
     :root => 'themebuilder/src/'

namespace :themebuilder do

    desc('Build the generated ThemeBuilder sources')
    task :sources => [
        'themebuilder/src/scripts/less.js',
        'themebuilder/src/scripts/template.js',
        'themebuilder/src/styles/kendo.black.css',
        'themebuilder/src/styles/Black',
        'themebuilder/src/styles/textures'
    ]

    desc('Build the ThemeBuilder for live deployment')
    task :production => [
        'dist/themebuilder/production',
        'dist/themebuilder/production/bootstrap.js'
    ]

    desc('Build the ThemeBuilder for staging')
    task :staging => 'dist/themebuilder/staging.zip'

    zip 'dist/themebuilder/staging.zip' => [
        'dist/themebuilder/staging',
        'dist/themebuilder/staging/bootstrap.js'
    ]

end

require 'nokogiri'

PLAYGROUND_SCRIPTS = %w(
    js/kendo.all.min.js
    js/jquery.min.js
)

CDN_PREFIX = "http://cdn.kendostatic.com/2013.2.716/"

PLAYGROUND_STYLES = %w(
        styles/kendo.mobile.flat.min.css
        styles/kendo.default.min.css
        styles/kendo.common.min.css
)

def patched_file_contents(source)
    source = Nokogiri::HTML(File.read(source))
    source.css('script[src^=".."]').each { |script| script.remove }
    source.css('link[href^=".."]').each { |script| script.remove }
    PLAYGROUND_SCRIPTS.each do |script|
        source.at_css('head').first_element_child.add_previous_sibling  "<script src='#{CDN_PREFIX}#{script}'></script>"
    end

    PLAYGROUND_STYLES.each do |style|
        source.at_css('head').first_element_child.add_previous_sibling "<link rel='stylesheet' href='#{CDN_PREFIX}#{style}'>"
    end

    source
end

FileList['playground/*.html'].each do |source|
    path = File.join("dist", "playground", source.pathmap("%n"))
    dist_file = File.join(path, "index.html")

    (PLAYGROUND_SCRIPTS + PLAYGROUND_STYLES).each do |resource|
        file_copy :from => File.join("dist/bundles/cdn.commercial", resource),
                :to => File.join(path, resource)
        task dist_file => File.join(path, resource)
    end

    tree :to => File.join(path, 'styles', 'images'),
         :from => FileList["styles/mobile/images/*"],
         :root => "styles/mobile/images"

    task dist_file => File.join(path, 'styles', 'images')

    desc "compile #{source} to self-contained example"

    file dist_file do |t|
        ensure_path(t.name)

        File.open(t.name, "w") do |f|
            f.write(patched_file_contents(source))
            sh "open #{t.name}"
        end
    end
end

namespace "demos:reddit" do
    path = "dist/demos/reddit/"

    task :sync do
        sh <<-SH
            mkdir -p #{path} && \
            rsync -av demos/reddit/ #{path}
        SH
    end

    task :deploy => :sync

    (PLAYGROUND_SCRIPTS + PLAYGROUND_STYLES).each do |resource|
        file_copy :from => File.join("dist/bundles/cdn.commercial", resource),
                :to => File.join(path, resource)
        task :deploy => File.join(path, resource)
    end

    tree :to => File.join(path, 'styles', 'images'),
         :from => FileList["styles/mobile/images/*"],
         :root => "styles/mobile/images"

    task :deploy => File.join(path, 'styles', 'images')

    task :patch_index do
        File.open(File.join(path, "index.html"), "w") do |file|
            file.write(patched_file_contents("demos/reddit/index.html"))
        end
    end

    desc "deploy and compile reddit app to dist"
    task :deploy => :patch_index

    desc "upload to kendoorigin"
    task :upload => :deploy do
        sh <<-SH
            rsync -av #{path} #{KENDO_ORIGIN_HOST}:/usr/share/nginx/html/demos/reddit/
        SH
    end
end

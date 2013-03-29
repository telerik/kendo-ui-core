require 'nokogiri'
require 'debugger'

PLAYGROUND_SCRIPTS = %w(
    js/jquery.min.js
    js/kendo.all.min.js
)

PLAYGROUND_STYLES = %w(
        styles/kendo.common.min.css
        styles/kendo.default.min.css
        styles/kendo.mobile.all.min.css
)

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
            source = Nokogiri::HTML(File.read(source))
            source.css('script[src^=".."]').each { |script| script.remove }
            source.css('link[href^=".."]').each { |script| script.remove }
            PLAYGROUND_SCRIPTS.each do |script|
                source.at_css('head') << "<script src='#{script}'></script>"
            end

            PLAYGROUND_STYLES.each do |style|
                source.at_css('head') << "<link rel='stylesheet' href='#{style}'>"
            end

            f.write(source)
            sh "open #{t.name}"
        end
    end
end

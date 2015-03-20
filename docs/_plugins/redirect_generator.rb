module Jekyll
    class RedirectGenerator < Generator
        def initialize(config)
            @config = config
        end

        def generate(site)
            site.config['redirect_pages'] = redirect_pages(site)
            site.config['redirect_directories'] = redirect_directories(site)

            web_config = Page.new(site, site.source, '', 'web.config')
            web_config.content = File.read(File.join(site.source, 'web.config'))
            web_config.render(Hash.new, site.site_payload)
            File.write(File.join(site.dest, 'web.config'), web_config.output)

            site.static_files << web_config
        end

        def redirect_pages(site)
            pages = site.pages.find_all { |p| p.data.has_key?('previous_url') }

            pages.map! do |page|
                previous_url = page.data['previous_url'].split(',')
                previous_url.map!{ |url| url.strip }

                { 'url' => page.url, 'previous_url' => previous_url.uniq }
            end

            pages
        end

        def redirect_directories(site)
            categories = NavigationGenerator.new(@config).categories(site)

            redirect_directories = []

            categories.each do |key, category|
                category.each do |item|
                    redirect_directories << redirect('', item) if item.has_key?('items')
                end
            end

            redirect_directories.flatten
        end

        def redirect(path, directory)
            result = []

            page = first_page(directory)

            if path.empty?
                path = directory['path']
            else
                path = path + '/' + directory['path']
            end
            if page
                url = page['path'].sub('.html', '')
                url = path + '/' + url unless path.empty?

                result << { 'path' => path, 'url' => url }
            end

            directory['items'].each do |item|
                result << redirect(path, item) if item.has_key?('items')
            end
            result
        end

        def first_page(directory)
            page = directory['items'].find { |item| !item.has_key?('items') }

            page = { 'path' => directory['items'].first['path'] } unless page

            page
        end

    end
end

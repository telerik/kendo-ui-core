require 'fileutils'
module Jekyll
    class RedirectGenerator < Generator
        def initialize(config)
            @config = config
        end

        def generate(site)
            Jekyll.logger.info "      Processing redirects..."

            site.config['redirect_pages'] = redirect_pages(site)
            site.config['redirect_directories'] = redirect_directories(site)

            web_config = Page.new(site, site.source, '', 'web.config')
            web_config.content = File.read(File.join(site.source, 'web.config'))
            web_config.render(Hash.new, site.site_payload)
            FileUtils.mkdir_p(site.dest)
            File.write(File.join(site.dest, 'web.config'), web_config.output)

            write_redirects(site);

            site.static_files << web_config
        end

        def write_redirects(site)
            name = 'redirects.conf'
            redirect = Page.new(site, site.source, '', name)
            redirect.content = File.read(File.join(site.source, name))
            redirect.render(Hash.new, site.site_payload)

            FileUtils.mkdir_p(site.dest)
            File.write(File.join(site.dest, name), redirect.output);

            site.static_files << redirect
        end

        def redirect_pages(site)
            pages = site.pages.find_all { |p| p.data.has_key?('previous_url') }

            pages.map! do |page|
                previous_url = page.data['previous_url'].split(',')
                previous_url.map!{ |url| url.strip }

                { 'url' => page.url, 'previous_url' => previous_url.uniq }
            end

            Jekyll.logger.info "      #{pages.count} page redirects."

            site.pages.each do |page|
                if page.url =~ /[A-Z]/
                    pages.push({
                        'url' => page.url,
                        'previous_url' => page.url.downcase.sub('.html', '')
                    })
                end
            end

            pages
        end

        def redirect_directories(site)
            categories = NavigationGenerator.new(@config).categories(site)

            redirect_directories = []

            categories.each do |key, category|
                category.each do |item|
                    if item.has_key?('items')
                        redirect_directories << redirect('', item)
                    end
                end
            end

            Jekyll.logger.info "      #{redirect_directories.count} directory redirects."

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
                if item.has_key?('items')
                    topic = directory['items'].find { |sibling| sibling['path'] == item['path'] + '.html' }
                    result << redirect(path, item) unless topic
                end
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

module Jekyll

    class NavigationGenerator < Generator
        def initialize(config)
            @navigation = Hash[(config['navigation'] || {}).map { |key, value| [/^#{key.gsub('*', '.*?')}$/, value] }]
        end

        def categories(site)
            categories = {}

            site.pages.each do |page|
                category = page.data['category']

                next if page.data['publish'] == false
                next unless category

                node = categories[category]

                unless node
                    categories[category] = node = []
                end

                url = page.url.sub('/', '')

                segments = url.split('/')

                segments.each_with_index do |segment, index|
                    item = node.find { |n| n['path'] == segment }

                    unless item

                        item = { 'path' => segment }

                        if index == segments.size - 1
                            item['position'] = page.data['position'] if page.data['position']
                            item['text'] = page.data['title']
                            item['spriteCssClass'] = 'article'
                        else
                            path = segments[0..index].join('/')
                            navigation_entry =  @navigation.find { |key, value| path =~ key }
                            mapping = navigation_entry ? navigation_entry[1] : {}
                            item['text'] = mapping['title'] || segment
                            item['items'] = []
                            item['position'] = mapping['position'] if mapping.has_key?('position')
                        end

                        node << item
                    end

                    node = item['items']

                end
            end

            categories.each {  |key, value| sort!(value) }

            categories
        end

        def generate(site)
            categories(site).each do |key, value|
                filename = "#{key}.json"

                FileUtils.mkdir_p(site.dest) unless File.exist?(site.dest)

                File.write(File.join(site.dest, filename), value.to_json)

                # Keep the file from being cleaned by Jekyll
                site.keep_files << filename
            end
        end

        def sort!(items)
            items.each {|item| sort!(item['items']) if item['items'] }

            # sorty by position, directory or file and then title (ignoring case)
            items.sort_by! {|a| [a['position'] || 1000000, a.has_key?('items') ? -1 : 1,  a['text'].downcase]}
        end

    end
end

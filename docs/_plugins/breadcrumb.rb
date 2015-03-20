class BreadCrumbTag < Liquid::Tag
    def render(context)
        site = context.registers[:site]

        navigation = site.config['navigation']

        url = context.environments.first['page']['url'].sub('.html', '')

        segments = url.split('/')

        html = '<ul>'
        html += "<li class=\"link\"><a href=\"#{site.baseurl}/introduction/index\">Home</a></li>"

        segments.each_with_index do |segment, index|
            next if index == 0

            item = {}

            if index == segments.size - 1
                text = context.environments.first['page']['title'] || segment

                html += "<li>#{text}</li>"
            else
                path = segments.slice(1,index).join('/');
                mapping = navigation[path] || {}

                pages = site.pages.find_all do |p|
                    p.dir.sub('/', '') == path
                end

                pages.sort_by! {|a| [a.data['position'] || 1000000, a.data['title']]}

                text = mapping['title'] || segment;

                if  pages.first
                    url = pages.first.url.sub('.html', '').sub('/', '')
                else
                    url = path
                end

                html += "<li class=\"link\"><a href=\"#{site.baseurl}/#{url}\">#{text}</a></li>"
            end

        end

        html += '</ul>'

        html
    end
end

Liquid::Template.register_tag('breadcrumb', BreadCrumbTag)

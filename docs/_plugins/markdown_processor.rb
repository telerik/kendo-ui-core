module Jekyll

    require 'html/pipeline'

    class RootRelativeFilter < HTML::Pipeline::Filter

        def call
            doc.search('a').each do |a|
                next if a['href'].nil?

                href = a['href'].strip

                if href.start_with? '/'
                    a['href'] = context[:baseurl] +  href
                end
            end

            doc.search('img').each do |img|
                next if img['src'].nil?

                src = img['src'].strip

                if src.start_with? '/'
                    img['src'] = context[:baseurl] + src
                end
            end

            doc
        end

    end

    class OptionsTitleFilter < HTML::Pipeline::Filter

        def call

            doc.css('h1').each do |node|
                text = node.text
                if text =~ /Options$/
                    node.content = node.text.split('.').last
                end
            end

            doc
        end

    end

    class ApiHeaderIdFilter < HTML::Pipeline::Filter

        def call

            doc.css('h2').each do |node|
                text = node.text

                next unless text =~ /^(Configuration|Events|Properties|Methods|Class Methods|Fields)$/

                prefix = text.downcase.gsub(' ', '-')

                node = node.next_element

                until node.nil?
                    break if node.name == 'h2'

                    if node.name == 'h3'
                        id = node.text
                        id.gsub!(/ .*/, '')
                        id.gsub!(/`[^`]*`/, '')
                        id.gsub!(/\\/,'')
                        id.gsub!(/\*[^*]*\*/, '')
                        node['id'] = "#{prefix}-#{id}"
                    end

                    node = node.next_element
                end

            end

            doc
        end

    end

    # based on https://github.com/jch/html-pipeline/blob/master/lib/html/pipeline/toc_filter.rb
    class HeaderLinkFilter < HTML::Pipeline::Filter

        PUNCTUATION_REGEXP = RUBY_VERSION > "1.9" ? /[^\p{Word}\- ]/u : /[^\w\- ]/

        def call()

            doc.css('h1, h2, h3').each do |node|

                id = node['id']

                unless id
                    id = node.text.downcase
                    id.gsub!(PUNCTUATION_REGEXP, '') # remove punctuation
                    id.gsub!(' ', '-') # replace spaces with dash
                end

                node['id'] = id

                a = Nokogiri::XML::Node.new('a', doc)
                a['href'] = "##{id}"
                a.children = node.children.first()

                a_type = Nokogiri::XML::Node.new('a', doc)
                a_type.set_attribute('class', 'type-link')

                link_node = a.children.first()
                if m = /(?<class>[a-zA-Z.].*) : (?<base>[a-zA-Z.].*)/.match(link_node.text)
                    node.add_child a

                    if base_link = type_link(m[:base])
                        link_node.content = m[:class]
                        a_type.content = m[:base]
                        a_type['href'] = base_link

                        base_p = Nokogiri::XML::Node.new('span', doc)
                        base_p.set_attribute('class', 'type-link')
                        base_p.content = 'Inherits from '
                        base_p.add_child a_type
                        node.add_child base_p
                    end
                else
                    if first_child = node.children.first()
                        first_child.before(a)
                    else
                        node.add_child a
                    end

                    # Link Configuration types
                    node.css('code').each do |type_node|
                        try_link_node type_node
                    end
                end

            end

            # Link Return variables
            doc.css('h4').each do |node|
                if node.content =~ /^Returns$/i && para = node.next_element
                    try_link_node para.first_element_child
                end
            end

            # Link parameter types
            doc.css('h5 code').each { |node| try_link_node node }

            doc
        end

        def try_link_node(node)
            return if node.nil?

            links = Nokogiri::XML::NodeSet.new(node.document)
            all_types = node.text.split('|')
            all_types.each_with_index do |type, index|
                code = Nokogiri::XML::Node.new('code', doc)
                code.content = type
                if index < (all_types.size - 1)
                    code.content += " |";
                end

                if type_link = type_link(type)
                    a = Nokogiri::XML::Node.new('a', doc)
                    a['href'] = type_link
                    a.set_attribute('class', 'type-link')
                    a.add_child code

                    links.push a
                else
                    links.push code
                end
            end

            node.replace links
        end

        def type_link(type)
            type_links = context[:type_links]
            link = type_links[type];

            # White-list namespaces with auto-linking enabled
            if !link && (type =~ /^kendo\.(drawing|geometry)/ || type =~ /^kendo\.dataviz\.map/)
                link = type.gsub('kendo.', '/api/javascript/')
                link.gsub!(/[a-z][A-Z]/) { |c| c[0] + '-' + c[1] }
                link.gsub!('.', '/')
                link.downcase!
            end

            if link && link.start_with?('/')
                link = context[:baseurl] + link
            end

            link
        end
    end

    class Converters::Markdown::MarkdownProcessor
        def initialize(config)
            @config = config

            context = {
                :gfm => false,
                :baseurl => @config['baseurl'],
                :type_links => @config['type_links']
            }

            @pipeline = HTML::Pipeline.new [
                HTML::Pipeline::MarkdownFilter,
                RootRelativeFilter,
                ApiHeaderIdFilter,
                OptionsTitleFilter,
                HeaderLinkFilter
            ], context

        end

        def convert(content)
            @pipeline.call(content)[:output].to_s
        end
    end

end

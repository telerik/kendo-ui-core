require 'kramdown'

module Jekyll

  String.class_eval do
      def indent(count, char = ' ')
        gsub(/([^\n]*)(\n|$)/) do |match|
          last_iteration = ($1 == "" && $2 == "")
          line = ""
          line << (char * count) unless last_iteration
          line << $1
          line << $2
          line
        end
      end
    end

  class ApiPage < Page
    @@header_api_marker = '<div class="api-article"></div>' + "\n\n"

    def initialize(site, base, dir, page_schema)
      @site = site
      @base = base
      @dir = File.join(dir, page_schema.category.downcase)
      @name = page_schema.name.downcase + ".md"

      self.process(@name)
      self.content = @@header_api_marker + page_schema.content

      self.data = page_schema.data
      self.data['category'] = "default"
      self.data['sub_category'] = page_schema.category
      self.data['res_type'] = "api"
      self.data['layout'] = "api-index"
      self.data['parent_path'] = dir
      self.data['is_api'] = true
      self.data['publish'] = false
    end
  end

  class ApiPageGenerator < Jekyll::Generator
    priority :high
    safe true

    def generate(site)
      if site.layouts.key? 'api-index'
        api_sub_pages = Array.new

        site.pages.each_entry do |page|
          if page.path.include? "api/javascript/ui/grid.md"
            dir = page.path
            dir.sub!(".md", "")

            api_groups = Array.new
            site.config['api'].each_entry do |element|
              children = Array.new
              element['group_parents'].each_entry do |child|
                children << child
              end
              api_groups <<  { "control"  => element['file'], "group_parents" => children, "categories" => {} }
            end

            pages = ApiPageParser.new(page.clone, api_groups[0]["group_parents"]).get_pages()

            page.data['is_main'] = true
            page.data['is_api'] = true

            new_content = ""
            last_category =""
            pages.each_entry do |page_schema|
              api_sub_pages << ApiPage.new(site, site.source, dir, page_schema)

              if new_content === ""
                new_content += page_schema.main_page_header

                new_content+= '<div id="api-filter">
                <i class="fa fa-search search-icon"></i>
                <input type="search" class="search" placeholder="Filter..." />
              </div>'
              end

              if last_category != page_schema.category
                last_category = page_schema.category
                new_content += "\n## #{last_category}\n"
              end

              new_content += "#{get_link_for_sub_page(page, page_schema)}\n"

              add_pages(api_groups, page_schema)
            end

            page.content = new_content
            export_groups_json(site, api_groups)

          end
        end

        api_sub_pages.each_entry do |new_page|
          site.pages << new_page
        end

      end
    end

    def add_pages(api_groups, page_schema)
       if api_groups[0]["categories"][page_schema.category] == nil
        api_groups[0]["categories"][page_schema.category] = Array.new
      end

      api_groups[0]["categories"][page_schema.category] << page_schema.name
      child_page_names = page_schema.data['group_page_names'];
      if child_page_names
        child_page_names.each do |child_page_name|
          api_groups[0]["categories"][page_schema.category] << child_page_name
        end
      end
    end

    def export_groups_json(site, groups)
      filename = "api.json"
      FileUtils.mkdir_p(site.dest) unless File.exist?(site.dest)
      File.write(File.join(site.dest, filename), groups.to_json)
      site.keep_files << filename
    end

    def get_link_for_sub_page(page, sub_page_schema)
      text = sub_page_schema.name
      link = "* [#{text}](#{page.data['title'].downcase}/#{sub_page_schema.category.downcase}/#{text.downcase})"

      child_page_names = sub_page_schema.data['group_page_names'];
      if child_page_names
        child_page_names.each do |child_page_name|
          link += "\n* [#{child_page_name}](#{page.data['title'].downcase}/#{sub_page_schema.category.downcase}/#{text.downcase}##{child_page_name})"
        end
      end

      link
    end
  end

  class ApiPageSchema
    attr_accessor :name, :content, :category, :data, :main_page_header

    def initialize(name, content, category, data, main_page_header)
      self.name = name
      self.content = content
      self.category = category
      self.data = data
      self.main_page_header = main_page_header
    end
  end

  class ApiPageParser
    @@known_types = [:codeblock, :p, :a, :header, :blank, :codespan, :blockquote, :ul, :li, :strong]
    @@block_containers = [:blockquote, :ul, :li, :p, :strong ]
    @@categories = ['Configuration', 'Fields', 'Methods', 'Events']

    def initialize(page, groups)
      name = page.name
      @name = name.sub!(page.ext, "")
      @data = page.data.clone
      @markdown = page.content
      @groups = groups
    end

    def get_pages()
      @pages = parse(@markdown)
    end

    def parse(markdown)
      @pages = Array.new
      root = Kramdown::Parser::Markdown.parse(markdown)[0]

      header = parse_main_page_header(root)
      @@categories.each_entry do |category|
          build_pages_for_category(root, category, header)
      end
      return @pages;
    end

    def parse_element(element)
      description = ""
      if element.type === :codeblock
        description += element_value(element).indent(4)
      end

      if element.type === :blank
        description += element_text(element) * 2
      end

      if element.type === :header
        description += element_header(element, element.options[:level])
      end

      if is_block_container_element(element.type)
        description += element_block_container(element)
      end

      return description
    end

    def is_group_start(page_name)
      @groups.include? page_name
    end

    def build_pages_for_category(root, category, header)
      values = {}
      category_content = get_category_content(root, category)
      page_schemas = Array.new
      group_parents = Array.new
      each_section(category_content) do |element, index|
        if group_parents.length == 0
          page_name = parse_page_name(element).strip
          body = read(element, index, category_content, 0)
          data = @data.clone
          data['page_title'] = get_page_title(page_name)
          data['title'] = page_name
          page_schemas << ApiPageSchema.new(page_name, body, category, data, header)

          if is_group_start(page_name)
            page_schemas.last.data['group_page_names'] = Array.new
            group_parents << page_schemas.last
            next element
          else
            prepare_links_for_page(values, page_name, "")
          end
        end

        if group_parents.length > 0
          page_name = parse_page_name(element).strip

          if is_group_start(page_name)
            body = read(element, index, category_content, 2)
            data = @data.clone
            data['page_title'] = get_page_title(page_name)
            data['title'] = page_name
            data['group_page_names'] = Array.new
            page_schemas << ApiPageSchema.new(page_name, body, category, data, header)
            group_parents << page_schemas.last
            next element
          end

          current_group_page = group_parents.last
          if page_name.include? current_group_page.name
            # Continue group
            current_group_page.content += read(element, index, category_content, 2)
            current_group_page.data['group_page_names'] << page_name
            next element
          else
            # End group
            current_group_page = group_parents.pop
            current_group_page.data['is_api_overview'] = true
            prepare_links_for_page(values, current_group_page.name, current_group_page.data['group_page_names'])

            # New ungrouped page
            body = read(element, index, category_content, 0)
            data = @data.clone
            data['page_title'] = get_page_title(page_name)
            data['title'] = page_name
            prepare_links_for_page(values, page_name, "")
            page_schemas << ApiPageSchema.new(page_name, body, category, data, header)
          end
        end
      end
      add_links(page_schemas, values) do |p|
        @pages << p
      end
    end

    def read(element, index, category_content, leading_newlines_count)
      content = "\n" * leading_newlines_count
      content += "### #{element_raw(element)}\n#{parse_page_body(index, category_content)}"
      content
    end

    def parse_page_body(index, siblings)
      description = ""

      siblings.slice(index + 1, siblings.size).each do |element|
        break if element.type == :header && element.options[:level] <= 3

        # uncomment to debug
        # raise "#{element.type}" unless @@known_types.include?(element.type)
        # puts("inspect: #{element.inspect}")
          description += parse_element(element)
      end

      description.strip
    end


    def parse_main_page_header(root)
      header_content = ""

      root.children.each_entry do |child|
        break if child.type == :header && child.options[:level] > 1
        header_content += parse_element(child)
      end

      return header_content
    end

    def get_category_content(element, category)
      start_index = child_index(element, category)
      end_index = -1
      @@categories.each_entry do |categ|
        end_index = child_index(element, categ)
          break if end_index > start_index
        end

      if start_index <= end_index
        end_index = element.children.size
      end

      element.children.slice(start_index..end_index)
    end

    def get_page_title(string)
      return "#{string} - API Reference - Kendo UI #{@data['title']}"
    end

    def child_index(element, text)
      index = element.children.find_index {|e| e.options[:raw_text] == text}

      index = element.children.size unless index

      index
    end

    def prepare_links_for_page(values, page_name, children)
      page_name_split = page_name.split(".")
      previous_key = ""
      page_name_split.each_entry do |key|
        if previous_key != ""
          previous_key += ".#{key}"
        elsif
          previous_key = key
        end

        if values[previous_key] == nil
          values[previous_key] = Array.new
        end

        if previous_key != page_name
          values[previous_key] << page_name
          if children != ""
            children.each do |child_page_name|
              values[previous_key] << page_name + "#" + child_page_name
            end
          end
        end
      end
    end

    def add_links(pages, values)
        pages.each_entry do |page|
        links = values[page.name]

        if links != nil
          links.uniq.each_with_index do |link, index|
            add_link(page, link, index)
            # puts("page: #{page.name}; link: #{link}")
          end
        end

        yield page
      end
    end

    def add_link(page, link, index)
      if index === 0
        page.content += "\n\n### Related Properties\n"
      end
      page.content += "* [#{link.rpartition("#")[2]}](#{link.downcase})\n"
    end

    def each_section(section)
      section.each_with_index do |element, index|
            next if index == 0

            break if element.type == :header && element.options[:level] < 3

            if element.type == :header && element.options[:level] == 3
                yield element, index
            end
        end
    end

    def is_block_container_element(element_type)
      return @@block_containers.include?(element_type)
    end

    def element_block_container(element)
      element_value = ""
      if element.type === :blockquote
        element_value += "> "
      elsif element.type === :li
        element_value += "* "
      end

      element.children.each_entry do |child|
        if child.type === :codespan
          element_value += element_codespan(child)
        elsif child.type === :a
          element_value += element_link(child)
        elsif is_block_container_element(child.type)
         element_value += element_block_container(child)
        elsif
          element_value += element_text(child)
        end
      end

      if element.type == :li
        element_value += "\n"
      end

      return element_value
    end

    def find_text_child(element)
      element.children.find {|e| e.type == :text } if element
    end

    def element_text(element)
        if element.children.any?
            element.children.map { |child| element_text(child) }.join
        elsif element.value.is_a? Kramdown::Utils::Entities::Entity
            element.value.char()
        elsif element.value
            element.value
        else
            ""
        end
    end

    def element_link(element)
      url = element.attr['href']
      text =  element_text(element)
      element_value = "[#{text}](#{url})"
    end

    def element_codespan(element)
      element_value = "`#{element_text(element)}`"
    end

    def element_header(element, level)
      element_value = "#" * level + " #{element_raw(element)}"
    end

    def element_raw(element)
      element_value = element.options[:raw_text] if element
    end

    def element_value(element)
        element.value if element
    end

    def parse_page_name(element)
      element_value find_text_child(element)
    end
  end
end
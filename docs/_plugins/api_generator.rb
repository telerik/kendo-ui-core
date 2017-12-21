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
    def initialize(site, base, dir, page_schema)
      @site = site
      @base = base
      @dir = File.join(dir, page_schema.category.downcase)
      @name = page_schema.name.downcase + ".md"

      self.process(@name)
      self.content = page_schema.content

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

            pages = ApiPageParser.new(page.clone).get_pages()

            page.data['is_main'] = true
            page.data['is_api'] = true

            new_content = ""
            last_category =""
            pages.each_entry do |page_schema|
              api_sub_pages << ApiPage.new(site, site.source, dir, page_schema)

              if new_content === ""
                new_content += page_schema.main_page_header
              end

              if last_category != page_schema.category
                last_category = page_schema.category
                new_content += "\n## #{last_category}\n"
              end

              new_content += "#{get_link_for_sub_page(page, page_schema)}\n"
            end

            page.content = new_content
          end
        end

        api_sub_pages.each_entry do |new_page|
          site.pages << new_page
        end
      end
    end

    def get_link_for_sub_page(page, sub_page_schema)
      text = sub_page_schema.name
      link = "* [#{text}](#{page.data['title'].downcase}/#{sub_page_schema.category.downcase}/#{text.downcase})"
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

    def initialize(page)
      name = page.name
      @name = name.sub!(page.ext, "")
      @data = page.data.clone
      @markdown = page.content
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

    def build_pages_for_category(root, category, header)
      values = {}
      page_schemas = Array.new
      category_content = get_category_content(root, category)
      each_section(category_content) do |element, index|
          page_name = parse_page_name(element).strip
          head = "## #{element_raw(element)}"
          body = "#{parse_page_body(index, category_content)}"
          content = "#{head}\n#{body}"
          data = @data.clone;
          data['page_title'] = get_page_title(page_name)
          data['title'] = page_name

          prepare_links_for_page(values, page_name)

          page_schemas << ApiPageSchema.new(page_name, content, category, data, header)
      end

      add_links(page_schemas, values) do |p|
        @pages << p
      end
    end

    def prepare_links_for_page(values, page_name)
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
        end
      end
    end

    def add_links(pages, values)
        pages.each_entry do |page|
        links = values[page.name]

        if links != nil
          links.uniq.each_with_index do |link, index|
            add_link(page, link, index)
          end
        end

        yield page
      end
    end

    def add_link(page, link, index)
      if index === 0
        page.content += "\n\n## Related Properties\n"
      end
      page.content += "* [#{link}](#{link.downcase})\n"
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
      @@categories.each_entry do |entry|
        end_index = child_index(element, entry)
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

    def each_section(section)
      section.each_with_index do |element, index|
            next if index == 0

            break if element.type == :header && element.options[:level] < 3

            if element.type == :header && element.options[:level] == 3
                yield element, index
            end
        end
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
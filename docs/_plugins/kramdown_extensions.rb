# https://github.com/gettalong/kramdown/blob/master/lib/kramdown/converter/base.rb
# https://github.com/gettalong/kramdown/blob/master/lib/kramdown/converter/html.rb

require 'kramdown/parser'
require 'kramdown/converter'
require 'kramdown/utils'

module KramdownExtensions
  class KramdownHtmlConverter < Kramdown::Converter::Html

    include ::Kramdown::Utils::Html
    include ::Kramdown::Parser::Html::Constants

    def initialize(root, options)
      super
    end

    def self.convert(tree, options = {})
      # puts("ELEMENT TO CONVERT - #{tree.inspect}")
      @stack = []
      converter = new(tree, ::Kramdown::Options.merge(options.merge(tree.options[:options] || {})))
      apply_template(converter, '') if !converter.options[:template].empty? && converter.apply_template_before?
      converter.convert(tree)
    end

    def convert_html_element(element, indent)
      result = inner(element, indent)
      if element.options[:category] == :span
        "<#{element.value}#{html_attributes(element.attr)}" << (result.empty? && HTML_ELEMENTS_WITHOUT_BODY.include?(element.value) ? " />" : ">#{result}</#{element.value}>")
      else
        output = ''
        add_indentation = @stack.last && (@stack.last.type != :html_element || @stack.last.options[:content_model] != :raw)

        output << ' '*indent if add_indentation
        output << "<#{element.value}#{html_attributes(element.attr)}"
        if element.options[:is_closed] && element.options[:content_model] == :raw
          output << " />"
        elsif !result.empty? && element.options[:content_model] != :block
          output << ">#{result}</#{element.value}>"
        elsif !result.empty?
          output << ">\n#{result.chomp}\n"  << ' '*indent << "</#{element.value}>"
        elsif HTML_ELEMENTS_WITHOUT_BODY.include?(element.value)
          output << " />"
        else
          output << "></#{element.value}>"
        end
        output << "\n" if add_indentation
        output
      end
    end
  end
end
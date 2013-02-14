module CodeGen::MVC

    NAMESPACES = [
        'Kendo.Mvc.UI.Fluent',
        'Kendo.Mvc.UI',
        'Kendo.Mvc.Extensions',
        'Kendo.Mvc'
    ]

    COMPONENT = ERB.new(%{---
title:<%= name %>
slug:aspnetmvc-<%= full_name.downcase %>
publish:true
---

# <%= full_name %>
<%= summary %>
<% if !fields.empty? %>
## Fields
<%= fields.map { |field| field.to_markdown }.join %>
<% end %>
<% if !properties.empty? %>
## Properties
<%= properties.map { |property| property.to_markdown }.join %>
<% end %>
<% if !methods.empty? %>
## Methods
<%= methods.map { |method| method.to_markdown }.join %>
<% end %>
})

    class Component
        attr_reader :full_name, :name, :methods, :properties, :fields, :type, :namespace, :summary

        def initialize(namespace, type, summary)
            @namespace = namespace
            @summary = summary
            @type = type
            @full_name = @type.sub(/`\d/, '')
            @name = @full_name.sub(@namespace + '.', '')
            @methods = []
            @properties = []
            @fields = []
        end

        def empty?
            @methods.empty? && @fields.empty? && @properties.empty? && @summary
        end

        def to_markdown
            COMPONENT.result(binding)
        end
    end

METHOD = ERB.new(%{
### <%= name.gsub('<', '\\<').gsub('>', '\\>').gsub('|', ',') %>
<%= summary %>
<% if !examples.empty? %>
#### Example
<%= examples.map { |example| example.to_markdown }.join %>
<% end %>
<% if !parameters.empty? %>
#### Parameters
<%= parameters.each_with_index.map { |parameter, index| parameter.to_markdown(parameterTypes[index])}.join %>
<% end %>
<% if returns %>
#### Returns
<%= returns %>
<% end %>
})
    class Method < Struct.new(:name, :summary, :parameters, :examples, :returns)
        def to_markdown
            parameterTypes = /\(([^\)]*)\)$/.match(name)[1].split('|') if parameters.any?

            METHOD.result(binding)
        end
    end

PARAMETER = ERB.new(%{
##### <%= name %> <%= type %>
<%= summary %>
})
    class Parameter < Struct.new(:name, :summary)
        def to_markdown(type)
            known = false

            NAMESPACES.each do |namespace|
                if type.include?(namespace)
                    known = true

                    type = type.sub(/#{namespace}\.(\w+)/, "[#{namespace}.\\1](/api/wrappers/aspnet-mvc/#{namespace}/\\1)")
                    break
                end
            end

            type = "`#{type}`" unless known

            PARAMETER.result(binding)
        end

    end

    class Example < Struct.new(:code)
        def to_markdown
            code.gsub(/^[ ]{4}/, '').sub(/^[ ]{4}/, '').sub(/^[ ]{8}%/, '    %').gsub(/&lt;/, '<').gsub(/&gt;/, '>').gsub(/&quot;/, '"');
        end
    end

    PROPERTY = ERB.new(%{### <%= name %>
<%= summary %>
})
    class Property < Struct.new(:name, :summary)
        def to_markdown
            PROPERTY.result(binding)
        end


    end

    FIELD = ERB.new(%{### <%= name %>
<%= summary %>
})
    class Field < Struct.new(:name, :summary)
        def to_markdown
            FIELD.result(binding)
        end
    end

    module CodeGen::MVC::API
        class Generator
            def initialize(path)
                @path = path
            end

            def component(component)
                return if component.empty?

                filename = "#{@path}#{component.namespace}/#{component.name}.md"

                File.write(filename, component.to_markdown)
            end

        end

        class XmlParser
            def initialize(filename)
                @filename = filename
            end

            def components
                xml = File.read(@filename)

                xml = xml.gsub(/<see cref="([^"]*)"\s*\/>/) do |s|
                    $1.sub(/^.*?(\w+)$/, '\1')
                end

                document = Nokogiri.XML(xml).xpath("/doc/members").first

                document.xpath("member[starts-with(@name,'T:')]").each do |member|
                    type = member['name'][2..-1]

                    namespace = type.split('.')[0...-1].join('.')

                    summary = parse_summary(member)

                    next unless NAMESPACES.include?(namespace)

                    component = Component.new(namespace, type, summary)

                    prefix = component.type + '.'

                    parse_methods(prefix, document) do |method|
                        component.methods.push(method)
                    end

                    parse_properties(prefix, document) do |property|
                        component.properties.push(property)
                    end

                    parse_fields(prefix, document) do |field|
                        component.fields.push(field)
                    end

                    yield component if block_given?
                end

            end

            def parse_methods(prefix, document)
                document.xpath("member[starts-with(@name,'M:#{prefix}')]").each do |method|
                    name = method['name']

                    next if name =~ /#ctor/

                    name = parse_name(prefix, name)

                    summary = parse_summary(method)

                    parameters = parse_parameterss(method)

                    examples = parse_examples(method)

                    returns = parse_returns(method)

                    yield Method.new(name, summary, parameters, examples, returns) if block_given?
                end
            end

            def parse_properties(prefix, document)
                document.xpath("member[starts-with(@name,'P:#{prefix}')]").each do |property|
                    name = parse_name(prefix, property['name'])

                    summary = parse_summary(property)

                    yield Property.new(name, summary) if block_given?
                end
            end

            def parse_fields(prefix, document)
                document.xpath("member[starts-with(@name,'F:#{prefix}')]").each do |field|
                    name = parse_name(prefix, field['name'])

                    summary = parse_summary(field)

                    yield Field.new(name, summary) if block_given?
                end
            end

            def parse_parameterss(method)
                method.xpath('param').map do |parameter|
                    name = parameter['name']
                    summary = parameter.text.strip

                    Parameter.new(name, summary)
                end
            end

            def parse_examples(method)
                method.xpath('example').map do |example|
                    code = example.xpath('code').first.text

                    Example.new(code)
                end
            end

            def parse_returns(method)
                method.xpath('returns').each do |returns|
                    return returns.text.strip
                end
            end

            def parse_summary(node)
                summary = node.xpath('summary').first

                return summary.text.strip if summary
            end

            def parse_name(prefix, name)
                name = name[2..-1].sub(prefix, '')
                result = ''
                idx = 0
                length = name.size
                open = 0
                close = 0

                while idx < length
                    ch = name[idx]
                    idx +=1

                    if ch == '{'
                        open +=1
                        result += '<'
                    elsif ch == '}'
                        close +=1
                        result += '>'
                    elsif ch == ','
                        if (close != open)
                            result += ','
                        else
                            result += '|'
                        end
                    elsif ch == '`'
                        ticks = 0

                        ch = name[idx]
                        idx +=1

                        while ch == '`'
                            ch = name[idx]
                            idx +=1
                            ticks +=1
                        end

                        if open
                            result += 'T'
                            result += ticks.to_s if ticks > 0
                        else
                            result += '<T'
                            result += ticks.to_s if ticks > 0
                            result += '>'
                        end
                    else
                        result += ch
                    end
                end

                result
            end

        end
    end
end

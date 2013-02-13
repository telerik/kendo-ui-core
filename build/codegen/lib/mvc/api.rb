module CodeGen::MVC

    NAMESPACES = [
        'Kendo.Mvc',
        'Kendo.Mvc.Extensions',
        'Kendo.Mvc.UI',
        'Kendo.Mvc.UI.Fluent'
    ]

    class Component
        attr_reader :full_name, :name, :methods, :properties, :fields, :type

        def initialize(namespace, type)
            @namespace = namespace
            @type = type
            @full_name = @type.sub(/`\d/, '')
            @name = @full_name.sub(@namespace + '.', '')
            @methods = []
            @properties = []
            @fields = []
        end

    end

    class Method < Struct.new(:name, :summary, :parameters, :examples, :returns)
    end

    class Parameter < Struct.new(:name, :summary)

    end

    class Example < Struct.new(:code)
    end

    class Property < Struct.new(:name, :summary)
    end

    class Field < Struct.new(:name, :summary)
    end

    module CodeGen::MVC::API
        class XmlParser
            def initialize(filename)
                @filename = filename
            end

            def components
                xml = File.read(@filename)

                xml = xml.gsub(/<see cref="([^"]*)"\s*\/>/) do |s|
                    $1.sub(/^.*?(\w+)$/, '\1')
                end

                document = Nokogiri.XML(xml)

                document.css("member[name^='T:']").each do |member|
                    type = member['name'][2..-1]

                    namespace = type.split('.')[0...-1].join('.')

                    next unless NAMESPACES.include?(namespace)

                    component = Component.new(namespace, type)

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
                end

            end

            def parse_methods(prefix, document)
                document.css("member[name^='M:#{prefix}']").each do |method|
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
                document.css("member[name^='P:#{prefix}']").each do |property|
                    name = parse_name(prefix, property['name'])

                    summary = parse_summary(property)

                    yield Property.new(name, summary) if block_given?
                end
            end

            def parse_fields(prefix, document)
                document.css("member[name^='F:#{prefix}']").each do |field|
                    name = parse_name(prefix, field['name'])

                    summary = parse_summary(field)

                    yield Field.new(name, summary) if block_given?
                end
            end

            def parse_parameterss(method)
                method.css('param').map do |parameter|
                    name = parameter['name']
                    summary = parameter.text

                    Parameter.new(name, summary)
                end
            end

            def parse_examples(method)
                method.css('example').map do |example|
                    code = example.css('code').first.text

                    Example.new(code)
                end
            end

            def parse_returns(method)
                method.css('returns').each do |returns|
                    return returns.text
                end
            end

            def parse_summary(node)
                node.css('summary').first.text.strip
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

                    if ch == ''
                        open +=1
                        result += '<'
                    elsif ch == 'end'
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

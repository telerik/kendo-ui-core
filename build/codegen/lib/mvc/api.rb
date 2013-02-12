module CodeGen::MVC
    NAMESPACES = [
        'Kendo.Mvc',
        'Kendo.Mvc.Extensions',
        'Kendo.Mvc.UI',
        'Kendo.Mvc.UI.Fluent'
    ]

    class Component
        attr_reader :full_name, :name, :namespace

        def initialize(namespace, name)
            @namespace = namespace
            @type = name[2..-1]
            @full_name = @type.sub(/`\d/, '')
            @name = @full_name.sub(namespace + '.', '')
        end
    end

    module CodeGen::MVC::API
        class XmlParser
            def initialize(filename)
                @filename = filename
            end

            def components
                document = Nokogiri.XML(File.read(@filename))

                NAMESPACES.each do |namespace|

                    document.css("member[name^='T:#{namespace}']").each do |type|
                        component = Component.new(namespace, type['name'])

                        p "#{component.full_name} - #{component.name}"

                    end

                end
            end
        end
    end
end

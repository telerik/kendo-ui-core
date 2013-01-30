module CodeGen::PHP
    class Component < CodeGen::Component
        include Options

        def namespace
            @full_name.sub('.' + @name, '')
        end

        def php_base_class
            return '\\Kendo\\SerializableObject' if @name == 'DataSource'

            '\\Kendo\\UI\\Widget'
        end

        def php_class
            @name
        end

        def php_type
            "\\#{php_namespace}\\#{php_class}"
        end

        def php_namespace
            namespace.sub('.ui', '.UI').split('.').map { |ns| ns.pascalize }.join('\\')
        end
    end
end

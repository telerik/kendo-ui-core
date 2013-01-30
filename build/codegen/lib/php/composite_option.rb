module CodeGen::PHP
    class CompositeOption < CodeGen::CompositeOption
        include Options

        def php_namespace
            return @owner.php_namespace if @owner.instance_of?(component_class)

            @owner.php_namespace
        end

        def php_class
            @owner.php_class + @name.pascalize.sub(@owner.name, '')
        end

        def php_types
            simple = @owner.simple_options.find { |o| o.name == @name }

            types = "#{php_type}|array"

            types = "#{simple.php_types}|#{types}" if simple

            types
        end

        def php_type
            "\\#{php_namespace}\\#{php_class}"
        end
    end
end

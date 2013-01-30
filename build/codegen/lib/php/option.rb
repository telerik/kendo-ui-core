module CodeGen::PHP
    class Option < CodeGen::Option
        include Options

        def php_types
            @type.map { |type| TYPES[type] }.join('|')
        end
    end
end

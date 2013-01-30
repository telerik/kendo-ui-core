module CodeGen::PHP
    MANUALLY_GENERATED = {
        'schema' => ['model']
    }

    TYPES = {
        'Number' => 'float',
        'String' => 'string',
        'Boolean' => 'boolean',
        'Array' => 'array',
        'Function' => '\Kendo\JavaScriptFunction',
        'Date' => 'date'
    }

    KEYWORDS = [ '__halt_compiler', 'abstract', 'and', 'array', 'as', 'break', 'callable', 'case',
        'catch', 'class', 'clone', 'const', 'continue', 'declare', 'default', 'die', 'do', 'echo',
        'else', 'elseif', 'empty', 'enddeclare', 'endfor', 'endforeach', 'endif', 'endswitch', 'endwhile',
        'eval', 'exit', 'extends', 'final', 'for', 'foreach', 'function', 'global', 'goto', 'if', 'implements',
        'include', 'include_once', 'instanceof', 'insteadof', 'interface', 'isset', 'list', 'namespace', 'new',
        'or', 'print', 'private', 'protected', 'public', 'require', 'require_once', 'return', 'static', 'switch',
        'throw', 'trait', 'try', 'unset', 'use', 'var', 'while', 'xor'
     ]

    module Options
        def php_name
            return "_#{name}" if KEYWORDS.include?(@name)

            @name
        end

        def path
            php_namespace.gsub('\\', '/')
        end

        def unique_options
            composite = composite_options.map { |o| o.name }

            result = options.find_all {|o| o.composite? || !composite.include?(o.name) }

            if MANUALLY_GENERATED.has_key?(@name)
                result.delete_if { |o| MANUALLY_GENERATED[@name].include?(o.name) }
            end

            result
        end
    end

    module ArrayItem
        def php_class
            super.sub(@owner.name.pascalize, '')
        end
    end
end

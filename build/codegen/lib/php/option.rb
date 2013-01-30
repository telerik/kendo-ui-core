module CodeGen::PHP
    class Option < CodeGen::Option
        include Options

        def php_type
            composite = @owner.composite_options.find_all { |o| o.name == @name && o != self }

            types = @type.map { |type| TYPES[type] }

            composite.each do |o|
                types.push(o.php_type);
            end

            types.push('mixed') if composite.any?

            types.join('|')
        end
    end
end

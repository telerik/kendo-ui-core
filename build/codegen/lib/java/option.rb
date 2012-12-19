module CodeGen::Java

    class Option < CodeGen::Option

        def tag_name
            @owner.tag_name + '-' + @name
        end

        def java_type
            type = @type[0]

            type = 'Object' if @type.size > 1 && !@type.include?('Function')

            CodeGen::Java::TYPES[type]
        end
    end

end

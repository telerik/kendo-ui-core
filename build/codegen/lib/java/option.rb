module CodeGen::Java

    class Option < CodeGen::Option

        def composite_option_class
            CompositeOption
        end

        def tag_name
            @owner.tag_name + '-' + @name
        end

        def java_type
            CodeGen::Java::TYPES[@type]
        end
    end

end

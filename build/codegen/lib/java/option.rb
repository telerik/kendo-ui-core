module CodeGen::Java

    class Option < CodeGen::Option

        def composite_option_class
            CompositeOption
        end

        def tag_name
            @owner.tag_name + '-' + @name
        end

    end

end

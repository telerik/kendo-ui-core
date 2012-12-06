module CodeGen::Java

    class Event < CodeGen::Event

        def tag_name
            @owner.tag_name + '-' + @name
        end

        def tag_class
            @name.pascalize + 'FunctionTag'
        end

        def namespace
            @owner.namespace
        end
    end

end

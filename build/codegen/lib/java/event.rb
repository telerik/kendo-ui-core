module CodeGen::Java

    class Event < CodeGen::Event

        def tag_name
            @owner.tag_name + '-' + @name
        end

        def tag_class
            name = @name.pascalize

            return name + 'FunctionTag' if @owner.instance_of?(component_class)

            @owner.tag_class.sub('Tag', '') + name + 'FunctionTag'
        end

        def namespace
            @owner.namespace
        end
    end

end

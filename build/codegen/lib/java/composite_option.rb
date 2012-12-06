module CodeGen::Java

    class CompositeOption < CodeGen::CompositeOption
        include Options

        def tag_name
            @owner.tag_name + '-' + @name
        end

        def namespace
            @owner.namespace
        end

        def tag_class
            name = @name.pascalize

            return name + 'Tag' if @owner.instance_of?(component_class)

            @owner.name.pascalize + name + 'Tag'
        end

    end

end

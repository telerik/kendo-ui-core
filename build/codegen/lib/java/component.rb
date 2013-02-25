module CodeGen::Java

    class Component < CodeGen::Component

        include Options

        def event_class
            Event
        end

        def tag_name
            @name.camelize
        end

        def namespace
            @name.downcase
        end

        def tag_class
            @name + 'Tag'
        end

    end

end

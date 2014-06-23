module CodeGen::MVC::Wrappers::DataViz

    module Options
        def component_class
            Component
        end

        def composite_option_class
            CompositeOption
        end

        def option_class
            Option
        end

        def event_class
            Event
        end

        def array_option_class
            ArrayOption
        end

    end

        TEMPLATE_FIELD_DECLARATION = ERB.new(%{
        public <%= csharp_declaration_type %> <%= csharp_name %> { get; set; }

        public <%= csharp_declaration_type %> <%= csharp_name %>Id { get; set; }
        })

        TEMPLATE_FIELD_BUILDERS = ERB.new(%{
        /// <summary>
        /// <%= description.gsub(/\r?\n/, '\n\t\t/// ').html_encode()%>
        /// </summary>
        /// <param name="value">The value that configures the <%= csharp_name.downcase %>.</param>
        public <%= csharp_builder_name %> <%= csharp_name %>(<%= is_csharp_array ? 'params ' : '' %><%= csharp_type %> value)
        {
            container.<%= csharp_name %> = value;

            return this;
        }

        /// <summary>
        /// <%= description.gsub(/\r?\n/, '\n\t\t/// ').html_encode()%>
        /// </summary>
        /// <param name="value">The value that configures the <%= csharp_name.downcase %>.</param>
        public <%= csharp_builder_name %> <%= csharp_name %>Id(<%= is_csharp_array ? 'params ' : '' %><%= csharp_type %> value)
        {
            container.<%= csharp_name %>Id = value;

            return this;
        }
        })

    class Option < CodeGen::MVC::Wrappers::Option
        include Options

        def csharp_declaration_type
            if csharp_type == 'string' || is_csharp_array
                csharp_type
            else
                csharp_type + '?'
            end
        end

        def csharp_name
            name.slice(0,1).capitalize + name.slice(1..-1)
        end

        def template?
            /template$/i.match(name)
        end

        def declaration_template
            if template?
                TEMPLATE_FIELD_DECLARATION
            else
                super
            end
        end

        def to_fluent
            if template?
                TEMPLATE_FIELD_BUILDERS.result(binding)
            else
                super
            end
        end

        def to_client_option
            if template?
            ERB.new(%{
            if (!string.IsNullOrEmpty(<%= csharp_name %>Id))
            {
                json["<%= name %>"] = new ClientHandlerDescriptor {
                    HandlerName = string.Format(
                        "jQuery('\#{0}').html()",
                        <%= csharp_name %>Id
                    )
                };
            }
            else if (!string.IsNullOrEmpty(<%= csharp_name %>))
            {
                json["<%= name %>"] = <%= csharp_name %>;
            }
                }).result(binding)
            else
                super
            end
        end
    end

    class CompositeOption < CodeGen::MVC::Wrappers::CompositeOption
        include Options
    end

    class ArrayItem < CompositeOption
        def csharp_class
            owner.csharp_item_class
        end

        def full_name
            @owner.full_name
        end
    end

    class ArrayOption < CompositeOption
        include CodeGen::Array

        def item_class
            ArrayItem
        end

        def csharp_class
            "List<#{csharp_item_class}>"
        end

        def csharp_builder_class
            "#{owner.csharp_class}#{csharp_name.chop}Factory"
        end

        def csharp_item_class
            "#{owner.csharp_class}#{csharp_name.chop}"
        end

        def delete_ignored
            item.delete_ignored
        end

        def composite_options
            item.composite_options
        end

        def unique_options
            item.unique_options
        end
    end

    class Event < CodeGen::MVC::Wrappers::Event
        include Options
    end

    class Component < CodeGen::MVC::Wrappers::Component
        include Options
    end
end

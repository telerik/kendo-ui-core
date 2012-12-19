module CodeGen

    class Option
        attr_reader :name, :description, :type, :owner

        def initialize(options)
            @name = options[:name]
            @description = options[:description]
            @type = options[:type]
            @owner = options[:owner]
            @recursive = options[:recursive]
        end

        def composite?
            false
        end

        def composite_option_class
            CodeGen::CompositeOption
        end

        def array_option_class
            ArrayOption
        end

        def to_composite
            type = []

            %w{Array Object}.each do |t|
                if @type.include?(t)
                    type.push(t)
                    @type.delete(t)
                end
            end

            @owner.options.delete(self) if @type.empty?

            target_class = composite_option_class

            target_class = array_option_class if type.include?('Array')

            parent = target_class.new(:name => @name,
                                      :owner => @owner,
                                      :recursive => @recursive,
                                      :type => type,
                                      :description => @description)

            @owner.options.push(parent)

            parent
        end
    end

end

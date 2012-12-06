module CodeGen
end

class CodeGen::Option
    attr_reader :name, :description, :type, :owner

    def initialize(options)
        @name = options[:name]
        @description = options[:description]
        @type = options[:type]
        @owner = options[:owner]
    end

    def composite_option_class
        CodeGen::CompositeOption
    end

    def to_composite
        @owner.options.delete(self)

        parent = composite_option_class.new(:name => @name,
                                            :owner => @owner,
                                            :type => @type,
                                            :description => @description)
        @owner.options.push(parent)

        parent
    end
end

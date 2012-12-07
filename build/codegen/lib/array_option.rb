module CodeGen
    module Array
        attr_reader :item

        def initialize(settings)
            super

            @item = composite_option_class.new(:name => @name.singular,
                                               :type => 'Object',
                                               :owner => self,
                                               :description => @description)

            @options.push(@item)
        end

        def add_option(settings)
            @item.add_option(settings, @name + '.')
        end
    end

    class ArrayOption < CompositeOption
        include Array
    end
end

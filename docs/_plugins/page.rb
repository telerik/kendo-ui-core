module Jekyll
    class Page
        #https://github.com/jekyll/jekyll/blob/master/lib/jekyll/convertible.rb#L44
        def read_yaml(base, name, opts = {})
            begin
                self.content = File.read(Jekyll.sanitized_path(base, name),
                                         merged_file_read_opts(opts))
                if content =~ /\A(---\s*\n.*?\n?)^((---|\.\.\.)\s*$\n?)/m
                    self.content = $POSTMATCH
                    self.data = SafeYAML.load($1.gsub(/{{site\.([^}]+)}}/) {|o| site.config[$1]} )
                end
            rescue SyntaxError => e
                Jekyll.logger.warn "YAML Exception reading #{File.join(base, name)}: #{e.message}"
            rescue Exception => e
                Jekyll.logger.warn "Error reading file #{File.join(base, name)}: #{e.message}"
            end

            self.data ||= {}
        end
    end
end

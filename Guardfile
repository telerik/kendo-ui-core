# A sample Guardfile
# More info at https://github.com/guard/guard#readme

guard 'livereload', :apply_js_live => false do
  watch(%r{(.*)\.(js|html|css|cshtml)$})
end

guard :shell do
  watch(%r{^src/editor/.*\.js$}) { `rake src/kendo.editor.js` }
end


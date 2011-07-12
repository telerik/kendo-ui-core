ui = {
  toggleIndex: function() {
    $('body').toggleClass('index-collapsed');
    var indexToggler = $('#index-toggler');
    if (encodeURIComponent(indexToggler.html()) == '%C2%AB')
      indexToggler.html('&raquo;');
    else
      indexToggler.html('&laquo;');
  },
  
  toggleMethods: function() {
    $.element.toggleClass(this, 'toggled');
    $('.sectionItems', this.parentNode.parentNode).toggleClass('invisible');
  },
  
  toggleModule: function(module) {
    if (module) {
      var name = 'filter module-'+module;
      
      if ($('body').toggleClass(name).hasClass(name)) {
        createCookie("jProtonDocModule", module);
      } else {
        eraseCookie("jProtonDocModule");
      }
    }
    ui.hideEmptySections();
    ui.updateFragmentLocation();
  },
  
  hideEmptySections: function() {
    var sections = $('.section');
    sections.each(function(i){
      
      var count = 0;
      var sectionItems = $(this).find('.sectionItems');
      
      sectionItems.find('.sectionItem').each(function(){
        if ($.element.css(this, 'display') != 'none')
          count++;
      });

      if (sectionItems.e.length > 0 && count == 0)
        $.element.addClass(this, 'invisible');
      else
        $.element.removeClass(this, 'invisible');
    });
  },
  
  updateFragmentLocation: function() {
    if (window.location.hash)
      window.location.hash = window.location.hash;
  },
  
  updateModuleState: function() {
    var module = readCookie("jProtonDocModule");
    if (module) {
      $('body').addClass('filter module-'+module);
      ui.hideEmptySections();
    }
    ui.updateFragmentLocation();
  }
}

window.onload = function() {
  // Controle para alternar a exibição do outline
  $('#index-toggler').attr('title', 'Alterna a exibição do outline');
  $('#index-toggler, #index-close').on('click', ui.toggleIndex);

  // Controle para alternar a exibição de métodos
  $('.method-toggler').on('click', ui.toggleMethods);
  
  // Controle para filtro de módulos
  $('.module-filter').attr('title', 'Liga/Desliga filtro do módulo');
  $.each(['core', 'css', 'dom', 'event', 'ajax'], function(i,e){
    $('.module-' + e + ' .module-filter').on('click', function(){
      ui.toggleModule(e);
    });
  });

  ui.updateModuleState();

  if (typeof dp != 'undefined')
    dp.SyntaxHighlighter.HighlightAll('code');    
}

window.onunload = function() {
  $.event.removeAll();
}

function createCookie(name,value,days) {
  if (days) {
  	var date = new Date();
  	date.setTime(date.getTime()+(days*24*60*60*1000));
  	var expires = "; expires="+date.toGMTString();
  }
  else var expires = "";
  document.cookie = name+"="+value+expires+"; path=/";
}

function readCookie(name) {
  var nameEQ = name + "=";
  var ca = document.cookie.split(';');
  for(var i=0;i < ca.length;i++) {
  	var c = ca[i];
  	while (c.charAt(0)==' ') c = c.substring(1,c.length);
  	if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
  }
  return null;
}

function eraseCookie(name) {
  createCookie(name,"",-1);
}

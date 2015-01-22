/*
* Kendo UI v2014.3.1314 (http://www.telerik.com/kendo-ui)
* Copyright 2015 Telerik AD. All rights reserved.
*
* Kendo UI commercial licenses may be obtained at
* http://www.telerik.com/purchase/license-agreement/kendo-ui-complete
* If you do not own a commercial license, this file shall be governed by the trial license terms.
*/
(function(f, define){
    define([], f);
})(function(){

/* FlatColorPicker messages */

if (kendo.ui.FlatColorPicker) {
kendo.ui.FlatColorPicker.prototype.options.messages =
$.extend(true, kendo.ui.FlatColorPicker.prototype.options.messages,{
  "apply": "Aplicar",
  "cancel": "Cancelar"
});
}

/* ColorPicker messages */

if (kendo.ui.ColorPicker) {
kendo.ui.ColorPicker.prototype.options.messages =
$.extend(true, kendo.ui.ColorPicker.prototype.options.messages,{
  "apply": "Aplicar",
  "cancel": "Cancelar"
});
}

/* ColumnMenu messages */

if (kendo.ui.ColumnMenu) {
kendo.ui.ColumnMenu.prototype.options.messages =
$.extend(true, kendo.ui.ColumnMenu.prototype.options.messages,{
  "sortAscending": "Ordenação Ascendente",
  "sortDescending": "Ordenação Descendente",
  "filter": "Filtro",
  "columns": "Colunas",
  "done": "Feito",
  "settings": "Definições da Coluna",
  "lock": "Trancar",
  "unlock": "Destrancar"
});
}

/* Editor messages */

if (kendo.ui.Editor) {
kendo.ui.Editor.prototype.options.messages =
$.extend(true, kendo.ui.Editor.prototype.options.messages,{
  "bold": "Negrito",
  "italic": "Itálico",
  "underline": "Sublinhado",
  "strikethrough": "Rasurado",
  "superscript": "Superior à linha",
  "subscript": "Inferior à linha",
  "justifyCenter": "Centrar texto",
  "justifyLeft": "Alinhar texto à esquerda",
  "justifyRight": "Alinhar texto à direita",
  "justifyFull": "Justificar",
  "insertUnorderedList": "Inserir lista de marcas",
  "insertOrderedList": "Inserir lista numerada",
  "indent": "Aumentar avanço",
  "outdent": "Diminuir avanço",
  "createLink": "Inserir ligação",
  "unlink": "Remover ligação",
  "insertImage": "Inserir imagem",
  "insertFile": "Inserir ficheiro",
  "insertHtml": "Inserir HTML",
  "viewHtml": "Ver HTML",
  "fontName": "Selecionar tipo de letra",
  "fontNameInherit": "(tipo de letra herdado)",
  "fontSize": "Selecionar tamanho da letra",
  "fontSizeInherit": "(tamanho herdado)",
  "formatBlock": "Formatar",
  "formatting": "Formatar",
  "foreColor": "Cor",
  "backColor": "Cor do fundo",
  "style": "Estilos",
  "emptyFolder": "Pasta Vazia",
  "uploadFile": "Submeter",
  "orderBy": "Ordenar por:",
  "orderBySize": "Tamanho",
  "orderByName": "Nome",
  "invalidFileType": "O ficheiro selecionado \"{0}\" não é válido. Tipos suportados são {1}.",
  "deleteFile": 'Tem a certeza que quer eliminar "{0}"?',
  "overwriteFile": 'Um ficheiro com o nome "{0}" já existe na pasta atual. Quer substituí-lo?',
  "directoryNotFound": "Não foi encontrada nenhuma pasta com este nome.",
  "imageWebAddress": "Endereço Web",
  "imageAltText": "Texto alternativo",
  "imageWidth": "Largura (px)",
  "imageHeight": "Altura (px)",
  "fileWebAddress": "Endereço Web",
  "fileTitle": "Título",
  "linkWebAddress": "Endereço Web",
  "linkText": "Texto",
  "linkToolTip": "ToolTip",
  "linkOpenInNewWindow": "Abrir endereço numa nova janela",
  "dialogUpdate": "Atualizar",
  "dialogInsert": "Inserir",
  "dialogButtonSeparator": "ou",
  "dialogCancel": "Cancelar",
  "createTable": "Criar tabela",
  "addColumnLeft": "Adicionar coluna à esquerda",
  "addColumnRight": "Adicionar coluna à direita",
  "addRowAbove": "Adicionar linha acima",
  "addRowBelow": "Adicionar linha abaixo",
  "deleteRow": "Eliminar linha",
  "deleteColumn": "Eliminar coluna"
});
}

/* FileBrowser messages */

if (kendo.ui.FileBrowser) {
kendo.ui.FileBrowser.prototype.options.messages =
$.extend(true, kendo.ui.FileBrowser.prototype.options.messages,{
  "uploadFile": "Submeter",
  "orderBy": "Ordenar por",
  "orderByName": "Nome",
  "orderBySize": "Tamanho",
  "directoryNotFound": "Não foi encontrada nenhuma pasta com este nome.",
  "emptyFolder": "Pasta Vazia",
  "deleteFile": 'Tem a certeza que quer eliminar "{0}"?',
  "invalidFileType": "O ficheiro selecionado \"{0}\" não é válido. Tipos suportados são {1}.",
  "overwriteFile": "Um ficheiro com o nome \"{0}\" já existe na pasta atual. Quer substituí-lo?",
  "dropFilesHere": "largue um ficheiro aqui para o submeter",
  "search": "Pesquisar"
});
}

/* FilterCell messages */

if (kendo.ui.FilterCell) {
kendo.ui.FilterCell.prototype.options.messages =
$.extend(true, kendo.ui.FilterCell.prototype.options.messages,{
  "isTrue": "é verdadeiro",
  "isFalse": "é falso",
  "filter": "Filtrar",
  "clear": "Limpar",
  "operator": "Operador"
});
}

/* FilterCell operators */

if (kendo.ui.FilterCell) {
kendo.ui.FilterCell.prototype.options.operators =
$.extend(true, kendo.ui.FilterCell.prototype.options.operators,{
  "string": {
    "eq": "É igual a",
    "neq": "Não é igual a",
    "startswith": "Começa com",
    "contains": "Contém",
    "doesnotcontain": "Não contém",
    "endswith": "Termina com"
  },
  "number": {
    "eq": "É igual a",
    "neq": "Não é igual a",
    "gte": "É maior ou igual a",
    "gt": "É maior que",
    "lte": "É menor ou igual a",
    "lt": "É menor que"
  },
  "date": {
    "eq": "É igual a",
    "neq": "Não é igual a",
    "gte": "É posterior ou igual a",
    "gt": "É posterior a",
    "lte": "É anterior ou igual a",
    "lt": "É anterior a"
  },
  "enums": {
    "eq": "É igual a",
    "neq": "Não é igual a"
  }
});
}

/* FilterMenu messages */

if (kendo.ui.FilterMenu) {
kendo.ui.FilterMenu.prototype.options.messages =
$.extend(true, kendo.ui.FilterMenu.prototype.options.messages,{
  "info": "Mostrar items com valor que:",
  "isTrue": "é verdadeiro",
  "isFalse": "é falso",
  "filter": "Filtrar",
  "clear": "Limpar",
  "and": "E",
  "or": "OU",
  "selectValue": "-Selecionar valor-",
  "operator": "Operador",
  "value": "Valor",
  "cancel": "Cancelar"
});
}

/* FilterMenu operator messages */

if (kendo.ui.FilterMenu) {
kendo.ui.FilterMenu.prototype.options.operators =
$.extend(true, kendo.ui.FilterMenu.prototype.options.operators,{
  "string": {
    "eq": "É igual a",
    "neq": "Não é igual a",
    "startswith": "Começa com",
    "contains": "Contém",
    "doesnotcontain": "Não contém",
    "endswith": "Termina com"
  },
  "number": {
    "eq": "É igual a",
    "neq": "Não é igual a",
    "gte": "É maior ou igual a",
    "gt": "É maior que",
    "lte": "É menor ou igual a",
    "lt": "É menor que"
  },
  "date": {
    "eq": "É igual a",
    "neq": "Não é igual a",
    "gte": "É posterior ou igual a",
    "gt": "É posterior a",
    "lte": "É anterior ou igual a",
    "lt": "É anterior a"
  },
  "enums": {
    "eq": "É igual a",
    "neq": "Não é igual a"
  }
});
}

/* Gantt messages */

if (kendo.ui.Gantt) {
kendo.ui.Gantt.prototype.options.messages =
$.extend(true, kendo.ui.Gantt.prototype.options.messages,{
  "actions": {
    "addChild": "Adicionar Descendente",
    "append": "Adicionar Tarefa",
    "insertAfter": "Adicionar Abaixo",
    "insertBefore": "Adicionar Acima",
    "pdf": "Exportar para PDF"
  },
  "cancel": "Cancelar",
  "deleteDependencyWindowTitle": "Eliminar dependência",
  "deleteTaskWindowTitle": "Eliminar tarefa",
  "destroy": "Eliminar",
  "editor": {
    "assingButton": "Atribuir",
    "editorTitle": "Tarefa",
    "end": "Fim",
    "percentComplete": "Completo",
    "resources": "Recursos",
    "resourcesEditorTitle": "Recursos",
    "resourcesHeader": "Recursos",
    "start": "Início",
    "title": "Título",
    "unitsHeader": "Unidades"
  },
  "save": "Guardar",
  "views": {
    "day": "Dia",
    "end": "Fim",
    "month": "Mês",
    "start": "Início",
    "week": "Semana",
    "year": "Ano"
  }
});
}

/* Grid messages */

if (kendo.ui.Grid) {
kendo.ui.Grid.prototype.options.messages =
$.extend(true, kendo.ui.Grid.prototype.options.messages,{
  "commands": {
    "cancel": "Cancelar alterações",
    "canceledit": "Cancelar",
    "create": "Adicionar novo registo",
    "destroy": "Eliminar",
    "edit": "Editar",
    "save": "Guardar alterações",
    "select": "Selecionar",
    "update": "Atualizar"
  },
  "editable": {
    "cancelDelete": "Cancelar",
    "confirmation": "Tem a certeza que pretende elininar este registo?",
    "confirmDelete": "Eliminar"
  }
});
}

/* Groupable messages */

if (kendo.ui.Groupable) {
kendo.ui.Groupable.prototype.options.messages =
$.extend(true, kendo.ui.Groupable.prototype.options.messages,{
  "empty": "Arraste uma coluna para este espaço para agrupar pelo valor da mesma..."
});
}

/* NumericTextBox messages */

if (kendo.ui.NumericTextBox) {
kendo.ui.NumericTextBox.prototype.options =
$.extend(true, kendo.ui.NumericTextBox.prototype.options,{
  "upArrowText": "Aumentar valor",
  "downArrowText": "Diminuir valor"
});
}

/* Pager messages */

if (kendo.ui.Pager) {
kendo.ui.Pager.prototype.options.messages =
$.extend(true, kendo.ui.Pager.prototype.options.messages,{
  "display": "Registos {0} - {1} de {2}",
  "empty": "Sem registos para apresentar.",
  "page": "Página",
  "of": "de {0}",
  "itemsPerPage": "itens por página",
  "first": "Ir para a primeira página",
  "previous": "Ir para a página anterior",
  "next": "Ir para a próxima página",
  "last": "Ir para a última página",
  "refresh": "Atualizar",
  "morePages": "Mais páginas"
});
}

/* PivotGrid messages */

if (kendo.ui.PivotGrid) {
kendo.ui.PivotGrid.prototype.options.messages =
$.extend(true, kendo.ui.PivotGrid.prototype.options.messages,{
  "measureFields": "Largue Campos de Dados Aqui",
  "columnFields": "Largue Campos de Colunas Aqui",
  "rowFields": "Largue Campos de Linhas Aqui"
});
}

/* PivotFieldMenu messages */

if (kendo.ui.PivotFieldMenu) {
kendo.ui.PivotFieldMenu.prototype.options.messages =
$.extend(true, kendo.ui.PivotFieldMenu.prototype.options.messages,{
  "info": "mostrar itens com valor que:",
  "filterFields": "Filtro de Campos",
  "filter": "Filtrar",
  "include": "Incluir Campos...",
  "title": "Campos a incluir",
  "clear": "Limpar",
  "ok": "Ok",
  "cancel": "Cancelar",
  "operators": {
    "contains": "Contém",
    "doesnotcontain": "Não contém",
    "startswith": "Começa com",
    "endswith": "Termina com",
    "eq": "É igual a",
    "neq": "Não é igual a"
  }
});
}

/* RecurrenceEditor messages */

if (kendo.ui.RecurrenceEditor) {
kendo.ui.RecurrenceEditor.prototype.options.messages =
$.extend(true, kendo.ui.RecurrenceEditor.prototype.options.messages,{
  "frequencies": {
    "never": "Nunca",
    "hourly": "A cada hora",
    "daily": "Diariamente",
    "weekly": "Semanalmente",
    "monthly": "Mensalmente",
    "yearly": "Anualmente"
  },
  "hourly": {
    "repeatEvery": "Repetir a cada: ",
    "interval": " hora(s)"
  },
  "daily": {
    "repeatEvery": "Repetir a cada: ",
    "interval": " dia(s)"
  },
  "weekly": {
    "interval": " semana(s)",
    "repeatEvery": "Repetir a cada: ",
    "repeatOn": "Repetir em: "
  },
  "monthly": {
    "repeatEvery": "Repetir a cada: ",
    "repeatOn": "Repetir em: ",
    "interval": " mês(es)",
    "day": "Dia "
  },
  "yearly": {
    "repeatEvery": "Repetir a cada: ",
    "repeatOn": "Repetir em: ",
    "interval": " ano(s)",
    "of": " de "
  },
  "end": {
    "label": "Fim:",
    "mobileLabel": "Ends",
    "never": "Nunca",
    "after": "Depois",
    "occurrence": " ocorrência(s)",
    "on": "Em "
  },
  "offsetPositions": {
    "first": "primeiro",
    "second": "segundo",
    "third": "terceiro",
    "fourth": "quarto",
    "last": "último"
  },
  "weekdays": {
    "day": "dia",
    "weekday": "semana",
    "weekend": "fim de semana"
  }
});
}

/* Scheduler messages */

if (kendo.ui.Scheduler) {
kendo.ui.Scheduler.prototype.options.messages =
$.extend(true, kendo.ui.Scheduler.prototype.options.messages,{
  "allDay": "todo o dia",
  "date": "Data",
  "event": "Evento",
  "time": "Hora",
  "showFullDay": "Mostrar dia completo",
  "showWorkDay": "Mostrar horário de trabalho",
  "today": "Hoje",
  "save": "Guardar",
  "cancel": "Cancelar",
  "destroy": "Eliminar",
  "deleteWindowTitle": "Eliminar evento",
  "ariaSlotLabel": "Selecionado entre {0:t} e {1:t}",
  "ariaEventLabel": "{0} em {1:D} às {2:t}",
  "confirmation": "Tem a certeza que quer eliminar este evento?",
  "views": {
    "day": "Dia",
    "week": "Semana",
    "workWeek": "Semana de Trabalho",
    "agenda": "Agenda",
    "month": "Mês"
  },
  "recurrenceMessages": {
    "deleteWindowTitle": "Eliminar Item Recorrente",
    "deleteWindowOccurrence": "Eliminar ocorrência atual",
    "deleteWindowSeries": "Eliminar série de ocorrências",
    "editWindowTitle": "Editar Item Recorrente",
    "editWindowOccurrence": "Editar ocorrência atual",
    "editWindowSeries": "Editar série de ocorrências",
    "deleteRecurring": "Quer eliminar só esta ocorrência ou toda a série de ocorrências?",
    "editRecurring": "Quer editar só esta ocorrência ou toda a série de ocorrências?"
  },
  "editor": {
    "title": "Titulo",
    "start": "Inicio",
    "end": "Fim",
    "allDayEvent": "Evento todo o dia",
    "description": "Descrição",
    "repeat": "Repetição",
    "timezone": " ",
    "startTimezone": "Início do Fuso horário",
    "endTimezone": "Fim do fuso horário",
    "separateTimezones": "Usar Fusos Horários de inicio e fim separados",
    "timezoneEditorTitle": "Fusos Horários",
    "timezoneEditorButton": "Fuso horário",
    "timezoneTitle": "Fusos Horários",
    "noTimezone": "Sem Fuso Horário",
    "editorTitle": "Evento"
  }
});
}

/* Slider messages */

if (kendo.ui.Slider) {
kendo.ui.Slider.prototype.options =
$.extend(true, kendo.ui.Slider.prototype.options,{
  "increaseButtonTitle": "Incrementar",
  "decreaseButtonTitle": "Decrementar"
});
}

/* TreeView messages */

if (kendo.ui.TreeView) {
kendo.ui.TreeView.prototype.options.messages =
$.extend(true, kendo.ui.TreeView.prototype.options.messages,{
  "loading": "A carregar...",
  "requestFailed": "O pedido falhou.",
  "retry": "Repetir"
});
}

/* Upload messages */

if (kendo.ui.Upload) {
kendo.ui.Upload.prototype.options.localization=
$.extend(true, kendo.ui.Upload.prototype.options.localization,{
  "select": "Selecionar ficheiros...",
  "cancel": "Cancelar",
  "retry": "Repetir",
  "remove": "Remover",
  "uploadSelectedFiles": "Submeter ficheiros",
  "dropFilesHere": "largue ficheiros aqui para submeter",
  "statusUploading": "a enviar",
  "statusUploaded": "submetido",
  "statusWarning": "aviso",
  "statusFailed": "failhou",
  "headerStatusUploading": "Enviando...",
  "headerStatusUploaded": "Feito"
});
}

/* Validator messages */

if (kendo.ui.Validator) {
kendo.ui.Validator.prototype.options.messages =
$.extend(true, kendo.ui.Validator.prototype.options.messages,{
  "required": "{0} é obrigatório",
  "pattern": "{0} não é válido",
  "min": "{0} deve ser maior ou igual a {1}",
  "max": "{0} deve ser menor ou igual a {1}",
  "step": "{0} não é válido",
  "email": "{0} não é um email válido",
  "url": "{0} não é um endereço web válido",
  "date": "{0} não é uma data válida"
});
}


return window.kendo;

}, typeof define == 'function' && define.amd ? define : function(_, f){ f(); });

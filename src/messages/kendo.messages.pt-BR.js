(function ($, undefined) {
/* Filter cell operator messages */

if (kendo.ui.FilterCell) {
kendo.ui.FilterCell.prototype.options.operators =
$.extend(true, kendo.ui.FilterCell.prototype.options.operators,{
  "date": {
    "eq": "É igual a",
    "gt": "É posterior a",
    "gte": "É posterior ou igual a",
    "lt": "É anterior a",
    "lte": "É anterior ou igual a",
    "neq": "Não é igual a",
    "isnull": "É nulo",
    "isnotnull": "É não nulo"
  },
  "enums": {
    "eq": "É igual a",
    "neq": "Não é igual a",
    "isnull": "É nulo",
    "isnotnull": "É não nulo"
  },
  "number": {
    "eq": "É igual a",
    "gt": "É maior que",
    "gte": "É maior que ou igual a",
    "lt": "É menor que",
    "lte": "É menor que ou igual a",
    "neq": "Não é igual a",
    "isnull": "É nulo",
    "isnotnull": "É não nulo"
  },
  "string": {
    "contains": "Contém",
    "doesnotcontain": "Não contém",
    "endswith": "Termina com",
    "eq": "É igual a",
    "neq": "Não é igual a",
    "startswith": "Começa com",
    "isnull": "É nulo",
    "isnotnull": "É não nulo",
    "isempty": "É vazio",
    "isnotempty": "É não vazio"
  }
});
}

/* Filter menu operator messages */

if (kendo.ui.FilterMenu) {
kendo.ui.FilterMenu.prototype.options.operators =
$.extend(true, kendo.ui.FilterMenu.prototype.options.operators,{
  "date": {
    "eq": "É igual a",
    "gt": "É posterior a",
    "gte": "É posterior ou igual a",
    "lt": "É anterior a",
    "lte": "É anterior ou igual a",
    "neq": "Não é igual a",
    "isnull": "É nulo",
    "isnotnull": "É não nulo"
  },
  "enums": {
    "eq": "É igual a",
    "neq": "Não é igual a",
    "isnull": "É nulo",
    "isnotnull": "É não nulo"
  },
  "number": {
    "eq": "É igual a",
    "gt": "É maior que",
    "gte": "É maior que ou igual a",
    "lt": "É menor que",
    "lte": "É menor que ou igual a",
    "neq": "Não é igual a",
    "isnull": "É nulo",
    "isnotnull": "É não nulo"
  },
  "string": {
    "contains": "Contém",
    "doesnotcontain": "Não contém",
    "endswith": "Termina com",
    "eq": "É igual a",
    "neq": "Não é igual a",
    "startswith": "Começa com",
    "isnull": "É nulo",
    "isnotnull": "É não nulo",
    "isempty": "É vazio",
    "isnotempty": "É não vazio"
  }
});
}

/* ColumnMenu messages */

if (kendo.ui.ColumnMenu) {
kendo.ui.ColumnMenu.prototype.options.messages =
$.extend(true, kendo.ui.ColumnMenu.prototype.options.messages,{
  "columns": "Colunas",
  "settings": "Configurações de Colunas",
  "done": "Feito",
  "sortAscending": "Ordenar Ascendente",
  "sortDescending": "Ordenar Descendente",
  "lock": "Congelar",
  "unlock": "Descongelar"
});
}

/* RecurrenceEditor messages */

if (kendo.ui.RecurrenceEditor) {
kendo.ui.RecurrenceEditor.prototype.options.messages =
$.extend(true, kendo.ui.RecurrenceEditor.prototype.options.messages,{
  "daily": {
    "interval": "dia(s)",
    "repeatEvery": "Repetir todo:"
  },
  "end": {
    "endCountAfter": "Após",
    "endCountOccurrence": "ocorrência(s)",
    "endLabel": "Fim:",
    "endNever": "Nunca",
    "endUntilOn": "Em",
    "mobileLabel": "Ends"
  },
  "frequencies": {
    "daily": "Diariamente",
    "monthly": "Mensalmente",
    "never": "Nunca",
    "weekly": "Semanalmente",
    "yearly": "Anualmente"
  },
  "monthly": {
    "day": "Dia",
    "interval": "mês(es)",
    "repeatEvery": "Repetir todo:",
    "repeatOn": "Repetir em:"
  },
  "offsetPositions": {
    "first": "quinto",
    "fourth": "quarto",
    "last": "último",
    "second": "segundo",
    "third": "terceiro"
  },
  "weekly": {
    "repeatEvery": "Repetir todo:",
    "repeatOn": "Repetir em:",
    "interval": "semana(s)"
  },
  "yearly": {
    "of": "de",
    "repeatEvery": "Repetir todo:",
    "repeatOn": "Repetir em:",
    "interval": "ano(s)"
  }
});
}

/* Editor messages */

if (kendo.ui.Editor) {
kendo.ui.Editor.prototype.options.messages =
$.extend(true, kendo.ui.Editor.prototype.options.messages,{
  "addColumnLeft": "Nova coluna à esquerda",
  "addColumnRight": "Nova coluna à direita",
  "addRowAbove": "Nova coluna acima",
  "addRowBelow": "Nova coluna abaixo",
  "backColor": "Cor de Fundo",
  "bold": "Negrito",
  "createLink": "Adicionar Link",
  "createTable": "Criar a tabela",
  "deleteColumn": "Excluir coluna",
  "deleteFile": "Tem certeza de que deseja remover \"{0}\"?",
  "deleteRow": "Excluir linha",
  "dialogButtonSeparator": "ou",
  "dialogCancel": "Cancelar",
  "dialogInsert": "Inserir",
  "directoryNotFound": "Um diretório com este nome não foi encontrado.",
  "dropFilesHere": "Arraste e solte arquyivos aqui para enviá-los",
  "emptyFolder": "Pasta vazia",
  "fontName": "Fonte",
  "fontNameInherit": "(fonte herdada)",
  "fontSize": "Tamanho",
  "fontSizeInherit": "(tamanho herdado)",
  "foreColor": "Cor",
  "formatBlock": "Formatar Bloco",
  "imageAltText": "Texto alternativo",
  "imageWebAddress": "Endereço web",
  "indent": "Aumentar Recuo",
  "insertHtml": "Inserir HTML",
  "insertImage": "Inserir Imagem",
  "insertOrderedList": "Inserir Lista Ordenada",
  "insertUnorderedList": "Inserir Lista Aleatória",
  "invalidFileType": "O arquivo selecionado \"{0}\" não é válido. Os tipos de arquivo suportados são {1}.",
  "italic": "Itálico",
  "justifyCenter": "Centralizar",
  "justifyFull": "Justificar",
  "justifyLeft": "Alinhar à Esquerda",
  "justifyRight": "Alinhar à Direita",
  "linkOpenInNewWindow": "Abrir link em nova janela",
  "linkText": "Texto",
  "linkToolTip": "ToolTip",
  "linkWebAddress": "Endereço web",
  "orderBy": "Ordenar por:",
  "orderByName": "Nome",
  "orderBySize": "Tamanho",
  "outdent": "Diminuir Recuo",
  "overwriteFile": "Um arquivo de nome \"{0}\" já existe no diretório atual. Deseja substituí-lo?",
  "search": "Procurar",
  "strikethrough": "Tachado",
  "styles": "Estilo",
  "subscript": "Subscrito",
  "superscript": "Sobrescrito",
  "underline": "Sublinhado",
  "unlink": "Remove Hyperlink",
  "uploadFile": "Enviar arquivo",
  "formatting": "Formato",
  "viewHtml": "Exibir código HTML",
  "dialogUpdate": "Atualizar",
  "insertFile": "Inserir arquivo"
});
}

/* FilterCell messages */

if (kendo.ui.FilterCell) {
kendo.ui.FilterCell.prototype.options.messages =
$.extend(true, kendo.ui.FilterCell.prototype.options.messages,{
  "clear": "Limpar",
  "filter": "Filtrar",
  "isFalse": "É falso",
  "isTrue": "É verdade",
  "operator": "Operador"
});
}

/* FilterMenu messages */

if (kendo.ui.FilterMenu) {
kendo.ui.FilterMenu.prototype.options.messages =
$.extend(true, kendo.ui.FilterMenu.prototype.options.messages,{
  "and": "E",
  "cancel": "Cancelar",
  "clear": "Limpar",
  "filter": "Filtrar",
  "info": "Exibir linhas com valores que",
  "isFalse": "É falso",
  "isTrue": "É verdade",
  "operator": "Operador",
  "or": "Ou",
  "selectValue": "-Selecione uma opção-",
  "value": "Valor"
});
}

/* FilterMultiCheck messages */

if (kendo.ui.FilterMultiCheck) {
kendo.ui.FilterMultiCheck.prototype.options.messages =
$.extend(true, kendo.ui.FilterMultiCheck.prototype.options.messages,{
  "search": "Procurar"
});
}

/* Grid messages */

if (kendo.ui.Grid) {
kendo.ui.Grid.prototype.options.messages =
$.extend(true, kendo.ui.Grid.prototype.options.messages,{
  "commands": {
    "canceledit": "Cancelar",
    "cancel": "Cancelar alterações",
    "create": "Inserir",
    "destroy": "Excluir",
    "edit": "Editar",
    "excel": "Export to Excel",
    "pdf": "Export to PDF",
    "save": "Salvar alterações",
    "select": "Selecionar",
    "update": "Atualizar"
  },
  "editable": {
    "cancelDelete": "Cancelar",
    "confirmation": "Você tem certeza que deseja excluir este registro?",
    "confirmDelete": "Excluir"
  }
});
}

/* Groupable messages */

if (kendo.ui.Groupable) {
kendo.ui.Groupable.prototype.options.messages =
$.extend(true, kendo.ui.Groupable.prototype.options.messages,{
  "empty": "Arraste aqui o cabeçalho de uma coluna para agrupar por esta coluna"
});
}

/* Pager messages */

if (kendo.ui.Pager) {
kendo.ui.Pager.prototype.options.messages =
$.extend(true, kendo.ui.Pager.prototype.options.messages,{
  "allPages": "All",
  "display": "Exibindo itens {0} - {1} de {2}",
  "empty": "Nenhum registro encontrado.",
  "first": "Ir para a primeira página",
  "itemsPerPage": "itens por página",
  "last": "Ir para a última página",
  "next": "Ir para a próxima página",
  "of": "de {0}",
  "page": "Página",
  "previous": "Ir para a página anterior",
  "refresh": "Atualizar",
  "morePages": "Mais páginas"
});
}

/* Scheduler messages */

if (kendo.ui.Scheduler) {
kendo.ui.Scheduler.prototype.options.messages =
$.extend(true, kendo.ui.Scheduler.prototype.options.messages,{
  "allDay": "dia inteiro",
  "cancel": "Cancelar",
  "editable": {
    "confirmation": "Tem certeza que deseja excluir este evento?"
  },
  "date": "Data",
  "deleteWindowTitle": "Excluir evento",
  "destroy": "Excluir",
  "editor": {
    "allDayEvent": "Evento de dia inteiro",
    "description": "Descrição",
    "editorTitle": "Evento",
    "end": "Fim",
    "endTimezone": "Fuso-horário final",
    "repeat": "Repetir",
    "separateTimezones": "Usar fuso-horário diferente para o início e fim",
    "start": "Início",
    "startTimezone": "Fuso-horário inicial",
    "timezone": "",
    "timezoneEditorButton": "Fuso horário",
    "timezoneEditorTitle": "Fusos-horários",
    "title": "Título",
    "noTimezone": "Sem fuso-horário"
  },
  "event": "Evento",
  "recurrenceMessages": {
    "deleteRecurring": "Você deseja excluir apenas este evento ou todas as ocorrências?",
    "deleteWindowOccurrence": "Excluir ocorrência atual",
    "deleteWindowSeries": "Excluir série",
    "deleteWindowTitle": "Excluir Item Recorrente",
    "editRecurring": "Você quer editar apenas este evento ou a série inteira?",
    "editWindowOccurrence": "Editar ocorrência atual",
    "editWindowSeries": "Editar série",
    "editWindowTitle": "Editar item recorrente"
  },
  "save": "Gravar",
  "showFullDay": "Dia inteiro",
  "showWorkDay": "Horário comercial",
  "time": "Hora",
  "today": "Hoje",
  "views": {
    "agenda": "Agenda",
    "day": "Dia",
    "month": "Mês",
    "week": "Semana",
    "workWeek": "Semana de trabalho"
  }
});
}

/* Upload messages */

if (kendo.ui.Upload) {
kendo.ui.Upload.prototype.options.localization =
$.extend(true, kendo.ui.Upload.prototype.options.localization,{
  "cancel": "Cancelar",
  "dropFilesHere": "arraste arquivos aqui para enviar",
  "headerStatusUploaded": "Pronto",
  "headerStatusUploading": "Carregando...",
  "remove": "Remover",
  "retry": "Tentar novamente",
  "select": "Selecionar...",
  "statusFailed": "falhou",
  "statusUploaded": "enviado",
  "statusUploading": "enviando",
  "uploadSelectedFiles": "Enviar arquivos"
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
  "date": "{0} não é uma data válida",
  "dateCompare": "A data final deve ser posterior à data inicial"
});
}
})(window.kendo.jQuery);

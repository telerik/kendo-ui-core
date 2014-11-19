

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
    "neq": "Não é igual a"
  },
  "enums": {
    "eq": "É igual a",
    "neq": "Não é igual a"
  },
  "number": {
    "eq": "É igual a",
    "gt": "É maior que",
    "gte": "É maior que ou igual a",
    "lt": "É menor que",
    "lte": "É menor que ou igual a",
    "neq": "Não é igual a"
  },
  "string": {
    "contains": "Contém",
    "doesnotcontain": "Não contém",
    "endswith": "Termina com",
    "eq": "É igual a",
    "neq": "Não é igual a",
    "startswith": "Começa com"
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
    "neq": "Não é igual a"
  },
  "enums": {
    "eq": "É igual a",
    "neq": "Não é igual a"
  },
  "number": {
    "eq": "É igual a",
    "gt": "É maior que",
    "gte": "É maior que ou igual a",
    "lt": "É menor que",
    "lte": "É menor que ou igual a",
    "neq": "Não é igual a"
  },
  "string": {
    "contains": "Contém",
    "doesnotcontain": "Não contém",
    "endswith": "Termina com",
    "eq": "É igual a",
    "neq": "Não é igual a",
    "startswith": "Começa com"
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
  "lock": "Travar",
  "unlock": "Destravar"
});
}

/* RecurrenceEditor messages */

if (kendo.ui.RecurrenceEditor) {
kendo.ui.RecurrenceEditor.prototype.options.messages =
$.extend(true, kendo.ui.RecurrenceEditor.prototype.options.messages,{
  "daily": {
    "days": "dia(s)",
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
    "months": "mês(es)",
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
    "weeks": "semana(s)"
  },
  "yearly": {
    "of": "de",
    "repeatEvery": "Repetir todo:",
    "repeatOn": "Repetir em:",
    "years": "ano(s)"
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
  "dropFilesHere": "drop files here to upload",
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
  "underline": "Remover Link",
  "unlink": "Remove hyperlink",
  "uploadFile": "Enviar arquivo",
  "formatting": "Format",
  "viewHtml": "View HTML",
  "dialogUpdate": "Update",
  "insertFile": "Insert file"
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
  "selectValue": "-Select value-",
  "value": "Valor"
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
  "display": "Exibindo itens {0} - {1} de {2}",
  "empty": "Nenhum registro encontrado.",
  "first": "Ir para a primeira página",
  "itemsPerPage": "itens por página",
  "last": "Ir para a última página",
  "next": "Ir para a próxima página",
  "of": "de {0}",
  "page": "Página",
  "previous": "Vá para a página anterior",
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
  "confirmation": "Tem certeza que deseja excluir este evento?",
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
    "noTimezone": "No timezone"
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
    "workWeek": "Work Week"
  }
});
}

/* Upload messages */

if (kendo.ui.Upload) {
kendo.ui.Upload.prototype.options.localization =
$.extend(true, kendo.ui.Upload.prototype.options.localization,{
  "cancel": "Cancelar",
  "dropFilesHere": "arraste arquivos aqui para enviar",
  "headerStatusUploaded": "Done",
  "headerStatusUploading": "Uploading...",
  "remove": "Remover",
  "retry": "Tentar novamente",
  "select": "Selecionar...",
  "statusFailed": "falhou",
  "statusUploaded": "enviado",
  "statusUploading": "enviando",
  "statusUploading1": "enviando",
  "uploadSelectedFiles": "Enviar arquivos",
  "uploadSelectedFiles1": "Enviar arquivos"
});
}

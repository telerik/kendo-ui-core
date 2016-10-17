(function ($, undefined) {
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
  "sortAscending": "Ordenar Ascendente",
  "sortDescending": "Ordenar Descendente",
  "filter": "Filtrar",
  "columns": "Colunas",
  "done": "Feito",
  "settings": "Configurações de Colunas",
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
  "strikethrough": "Tachado",
  "superscript": "Sobrescrito",
  "subscript": "Subscrito",
  "justifyCenter": "Centralizar",
  "justifyLeft": "Alinhar à Esquerda",
  "justifyRight": "Alinhar à Direita",
  "justifyFull": "Justificar",
  "insertUnorderedList": "Inserir Lista Aleatória",
  "insertOrderedList": "Inserir Lista Ordenada",
  "indent": "Aumentar Recuo",
  "outdent": "Diminuir Recuo",
  "createLink": "Adicionar Link",
  "unlink": "Remove Hyperlink",
  "insertImage": "Inserir Imagem",
  "insertFile": "Inserir arquivo",
  "insertHtml": "Inserir HTML",
  "viewHtml": "Exibir código HTML",
  "fontName": "Fonte",
  "fontNameInherit": "(fonte herdada)",
  "fontSize": "Tamanho",
  "fontSizeInherit": "(tamanho herdado)",
  "formatBlock": "Formatar Bloco",
  "formatting": "Formato",
  "foreColor": "Cor",
  "backColor": "Cor de Fundo",
  "style": "Estilo",
  "emptyFolder": "Pasta vazia",
  "uploadFile": "Enviar arquivo",
  "orderBy": "Ordenar por:",
  "orderBySize": "Tamanho",
  "orderByName": "Nome",
  "invalidFileType": "O arquivo selecionado \"{0}\" não é válido. Os tipos de arquivo suportados são {1}.",
  "deleteFile": "Tem certeza de que deseja remover \"{0}\"?",
  "overwriteFile": "Um arquivo de nome \"{0}\" já existe no diretório atual. Deseja substituí-lo?",
  "directoryNotFound": "Um diretório com este nome não foi encontrado.",
  "imageWebAddress": "Endereço web",
  "imageAltText": "Texto alternativo",
  "imageWidth": "Largura (px)",
  "imageHeight": "Altura (px)",
  "fileWebAddress": "Endereço Web",
  "fileTitle": "Título do arquivo",
  "linkWebAddress": "Endereço Web",
  "linkText": "Texto",
  "linkToolTip": "ToolTip",
  "linkOpenInNewWindow": "Abrir link em nova janela",
  "dialogUpdate": "Atualizar",
  "dialogInsert": "Inserir",
  "dialogButtonSeparator": "ou",
  "dialogCancel": "Cancelar",
  "createTable": "Criar a tabela",
  "addColumnLeft": "Nova coluna à esquerda",
  "addColumnRight": "Nova coluna à direita",
  "addRowAbove": "Nova coluna acima",
  "addRowBelow": "Nova coluna abaixo",
  "deleteRow": "Excluir linha",
  "deleteColumn": "Excluir coluna",
  "dialogOk": "Ok",
  "tableWizard": "Assistente de tabela",
  "tableTab": "Tabela",
  "cellTab": "Célula",
  "accessibilityTab": "Acessibilidade",
  "caption": "Rubica",
  "summary": "Resumo",
  "width": "Largura",
  "height": "Altura",
  "cellSpacing": "Espaçamento da célula",
  "cellPadding": "Preenchimento da célula",
  "cellMargin": "Margem da célula",
  "alignment": "Alinhamento",
  "background": "Fundo",
  "cssClass": "Classe do CSS",
  "id": "ID",
  "border": "Borda",
  "borderStyle": "Estilo da borda",
  "collapseBorders": "Colapsar bordas",
  "wrapText": "Quebrar textp",
  "associateCellsWithHeaders": "Células associadas com cabeçalho",
  "alignLeft": "Alinhar à esquerda",
  "alignCenter": "Alinhar ao centro",
  "alignRight": "Alinhar à direita",
  "alignLeftTop": "Alinhar à equerda e topo",
  "alignCenterTop": "Alinhar ao centro e topo",
  "alignRightTop": "Alinhar à direita e topo",
  "alignLeftMiddle": "Alinhar à esquerda e meio",
  "alignCenterMiddle": "Alinhar ao centro e meio",
  "alignRightMiddle": "Alinhar à direita e meio",
  "alignLeftBottom": "Alinhar à esquerda e abaixo",
  "alignCenterBottom": "Alinhar ao centro e abaixo",
  "alignRightBottom": "Alinhar à direita e abaixo",
  "alignRemove": "Remover alinhamento",
  "columns": "Colunas",
  "rows": "Linhas",
  "selectAllCells": "Selecionar todas as células"
});
}

/* FileBrowser messages */

if (kendo.ui.FileBrowser) {
kendo.ui.FileBrowser.prototype.options.messages =
$.extend(true, kendo.ui.FileBrowser.prototype.options.messages,{
  "uploadFile": "Upload",
  "orderBy": "Organize por",
  "orderByName": "Nome",
  "orderBySize": "Tamanho",
  "directoryNotFound": "O diretório com este nome não foi encontrado.",
  "emptyFolder": "Pasta vazia",
  "deleteFile": 'Tem certeza que deseja excluir "{0}"?',
  "invalidFileType": "O arquivo selecionado \"{0}\" é inválido. Os tipos de arquivos suportados são {1}.",
  "overwriteFile": "O arquivo com o nome \"{0}\" já existe no diretório selecionado. Deseja sobrescrever?",
  "dropFilesHere": "Solte os arquivos aqui para fazer o Upload",
  "search": "Procurar"
});
}

/* FilterCell messages */

if (kendo.ui.FilterCell) {
kendo.ui.FilterCell.prototype.options.messages =
$.extend(true, kendo.ui.FilterCell.prototype.options.messages,{
  "isTrue": "É verdade",
  "isFalse": "É falso",
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
    "endswith": "Termina com",
    "isnull": "É nulo",
    "isnotnull": "É não nulo",
    "isempty": "É vazio",
    "isnotempty": "É não vazio"
  },
  "number": {
    "eq": "É igual a",
    "neq": "Não é igual a",
    "gte": "É maior que ou igual a",
    "gt": "É maior que",
    "lte": "É menor que ou igual a",
    "lt": "É menor que",
    "isnull": "É nulo",
    "isnotnull": "É não nulo"
  },
  "date": {
    "eq": "É igual a",
    "neq": "Não é igual a",
    "gte": "É posterior ou igual a",
    "gt": "É posterior a",
    "lte": "É anterior ou igual a",
    "lt": "É anterior a",
    "isnull": "É nulo",
    "isnotnull": "É não nulo"
  },
  "enums": {
    "eq": "É igual a",
    "neq": "Não é igual a",
    "isnull": "É nulo",
    "isnotnull": "É não nulo"
  }
});
}

/* FilterMenu messages */

if (kendo.ui.FilterMenu) {
kendo.ui.FilterMenu.prototype.options.messages =
$.extend(true, kendo.ui.FilterMenu.prototype.options.messages,{
  "info": "Exibir linhas com valores que",
  "isTrue": "É verdade",
  "isFalse": "É falso",
  "filter": "Filtrar",
  "clear": "Limpar",
  "and": "E",
  "or": "Ou",
  "selectValue": "-Selecione uma opção-",
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
    "endswith": "Termina com",
    "isnull": "É nulo",
    "isnotnull": "É não nulo",
    "isempty": "É vazio",
    "isnotempty": "É não vazio"
  },
  "number": {
    "eq": "É igual a",
    "neq": "Não é igual a",
    "gte": "É maior que ou igual a",
    "gt": "É maior que",
    "lte": "É menor que ou igual a",
    "lt": "É menor que",
    "isnull": "É nulo",
    "isnotnull": "É não nulo"
  },
  "date": {
    "eq": "É igual a",
    "neq": "Não é igual a",
    "gte": "É posterior ou igual a",
    "gt": "É posterior a",
    "lte": "É anterior ou igual a",
    "lt": "É anterior a",
    "isnull": "É nulo",
    "isnotnull": "É não nulo"
  },
  "enums": {
    "eq": "É igual a",
    "neq": "Não é igual a",
    "isnull": "É nulo",
    "isnotnull": "É não nulo"
  }
});
}

/* FilterMultiCheck messages */

if (kendo.ui.FilterMultiCheck) {
kendo.ui.FilterMultiCheck.prototype.options.messages =
$.extend(true, kendo.ui.FilterMultiCheck.prototype.options.messages,{
  "checkAll": "Selecionar todos",
  "clear": "Limpar",
  "filter": "Filtrar",
  "search": "Procurar"
});
}

/* Gantt messages */

if (kendo.ui.Gantt) {
kendo.ui.Gantt.prototype.options.messages =
$.extend(true, kendo.ui.Gantt.prototype.options.messages,{
  "actions": {
    "addChild": "Adicionar filho",
    "append": "Adicionar tarefa",
    "insertAfter": "Adicionar abaixo",
    "insertBefore": "Adicionar acima",
    "pdf": "Exportar para PDF"
  },
  "cancel": "Cancelar",
  "deleteDependencyWindowTitle": "Excluir dependência",
  "deleteTaskWindowTitle": "Excluir tarefa",
  "destroy": "Excluir",
  "editor": {
    "assingButton": "Atribuir",
    "editorTitle": "Tarefa",
    "end": "Final",
    "percentComplete": "Completo",
    "resources": "Recursos",
    "resourcesEditorTitle": "Recursos",
    "resourcesHeader": "Recursos",
    "start": "Inicio",
    "title": "Título",
    "unitsHeader": "Unidades"
  },
  "save": "Salvar",
  "views": {
    "day": "Dia",
    "end": "Final",
    "month": "Mês",
    "start": "Inicio",
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
    "create": "Adicionar",
    "destroy": "Excluir",
    "edit": "Editar",
    "excel": "Exportar para Excel",
    "pdf": "Exportar para PDF",
    "save": "Salvar alterações",
    "select": "Selecionar",
    "update": "Atualizar"
  },
  "editable": {
    "cancelDelete": "Cancelar",
    "confirmation": "Você tem certeza que deseja excluir este registro?",
    "confirmDelete": "Excluir"
  },
  "noRecords": "Nenhum registro encontrado."
});
}

/* Groupable messages */

if (kendo.ui.Groupable) {
kendo.ui.Groupable.prototype.options.messages =
$.extend(true, kendo.ui.Groupable.prototype.options.messages,{
  "empty": "Arraste aqui o cabeçalho de uma coluna para agrupar por esta coluna"
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

/* MediaPlayer messages */

if (kendo.ui.MediaPlayer) {
kendo.ui.MediaPlayer.prototype.options.messages =
$.extend(true, kendo.ui.MediaPlayer.prototype.options.messages,{
  "pause": "Pausar",
  "play": "Começar",
  "mute": "Mutar",
  "unmute": "Desmutar",
  "quality": "Qualidade",
  "fullscreen": "Tela cheia"
});
}

/* Pager messages */

if (kendo.ui.Pager) {
kendo.ui.Pager.prototype.options.messages =
$.extend(true, kendo.ui.Pager.prototype.options.messages,{
  "allPages": "Todos",
  "display": "Exibindo itens {0} - {1} de {2}",
  "empty": "Nenhum registro encontrado.",
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
  "measureFields": "Solte os campos aqui",
  "columnFields": "Solte as colunas aqui",
  "rowFields": "Solte as linhas aqui"
});
}

/* PivotFieldMenu messages */

if (kendo.ui.PivotFieldMenu) {
kendo.ui.PivotFieldMenu.prototype.options.messages =
$.extend(true, kendo.ui.PivotFieldMenu.prototype.options.messages,{
  "info": "Exibir itens com o valor:",
  "filterFields": "Filtrar campos",
  "filter": "Filtro",
  "include": "Incluir campos...",
  "title": "Campos para incluir",
  "clear": "Limpar",
  "ok": "Ok",
  "cancel": "Cancelar",
  "operators": {
    "contains": "Contém",
    "doesnotcontain": "Não contém",
    "startswith": "Começa com",
    "endswith": "Termina com",
    "eq": "É igual à",
    "neq": "É diferente de"
  }
});
}

/* RecurrenceEditor messages */

if (kendo.ui.RecurrenceEditor) {
kendo.ui.RecurrenceEditor.prototype.options.messages =
$.extend(true, kendo.ui.RecurrenceEditor.prototype.options.messages,{
  "frequencies": {
    "never": "Nunca",
    "hourly": "Por hora",
    "daily": "Diariamente",
    "weekly": "Semanalmente",
    "monthly": "Mensalmente",
    "yearly": "Anualmente"
  },
  "hourly": {
    "repeatEvery": "Repetir toda: ",
    "interval": " hora(s)"
  },
  "daily": {
    "repeatEvery": "Repetir todo: ",
    "interval": " dia(s)"
  },
  "weekly": {
    "interval": "semana(s)",
    "repeatEvery": "Repetir todo: ",
    "repeatOn": "Repetir em: "
  },
  "monthly": {
    "repeatEvery": "Repetir todo: ",
    "repeatOn": "Repetir em: ",
    "interval": " mês(es)",
    "day": "Dia "
  },
  "yearly": {
    "repeatEvery": "Repetir todo: ",
    "repeatOn": "Repetir em: ",
    "interval": " ano(s) ",
    "of": " de "
  },
  "end": {
    "label": "Fim:",
    "mobileLabel": "Final",
    "never": "Nunca",
    "after": "Após ",
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
    "weekday": "dia da semana",
    "weekend": "final de semana"
  }
});
}

/* Scheduler messages */

if (kendo.ui.Scheduler) {
kendo.ui.Scheduler.prototype.options.messages =
$.extend(true, kendo.ui.Scheduler.prototype.options.messages,{
  "allDay": "dia inteiro",
  "date": "Data",
  "event": "Evento",
  "time": "Hora",
  "showFullDay": "Dia inteiro",
  "showWorkDay": "Horário comercial",
  "today": "Hoje",
  "save": "Salvar",
  "cancel": "Cancelar",
  "destroy": "Excluir",
  "deleteWindowTitle": "Excluir evento",
  "ariaSlotLabel": "Selecionar de {0:t} à {1:t}",
  "ariaEventLabel": "{0} em {1:D} até {2:t}",
  "editable": {
    "confirmation": "Tem certeza que deseja excluir este evento?"
  },
  "views": {
    "day": "Dia",
    "week": "Semana",
    "workWeek": "Semana de trabalho",
    "agenda": "Agenda",
    "month": "Mês"
  },
  "recurrenceMessages": {
    "deleteWindowTitle": "Excluir Item Recorrente",
    "deleteWindowOccurrence": "Excluir ocorrência atual",
    "deleteWindowSeries": "Excluir série",
    "editWindowTitle": "Editar item recorrente",
    "editWindowOccurrence": "Editar ocorrência atual",
    "editWindowSeries": "Editar série",
    "deleteRecurring": "Você deseja excluir apenas este evento ou todas as ocorrências?",
    "editRecurring": "Você quer editar apenas este evento ou a série inteira?"
  },
  "editor": {
    "title": "Título",
    "start": "Início",
    "end": "Fim",
    "allDayEvent": "Evento de dia inteiro",
    "description": "Descrição",
    "repeat": "Repetir",
    "timezone": "",
    "startTimezone": "Fuso-horário inicial",
    "endTimezone": "Fuso-horário final",
    "separateTimezones": "Usar fuso-horário diferente para o início e fim",
    "timezoneEditorTitle": "Fusos-horários",
    "timezoneEditorButton": "Fuso horário",
    "timezoneTitle": "Fuso-horários",
    "noTimezone": "Sem fuso-horário",
    "editorTitle": "Evento"
  }
});
}

/* Spreadsheet messages */

if (kendo.spreadsheet && kendo.spreadsheet.messages.borderPalette) {
kendo.spreadsheet.messages.borderPalette =
$.extend(true, kendo.spreadsheet.messages.borderPalette,{
  "allBorders": "Todas as bordas",
  "insideBorders": "Bordas internas",
  "insideHorizontalBorders": "Bordas internas horizontais",
  "insideVerticalBorders": "Bordas internas verticais",
  "outsideBorders": "Bordas externas",
  "leftBorder": "Borda esquerda",
  "topBorder": "Borda acima",
  "rightBorder": "Borda direta",
  "bottomBorder": "Borda inferior",
  "noBorders": "Sem bordas",
  "reset": "Resetar cor",
  "customColor": "Cor customizada...",
  "apply": "Aplicar",
  "cancel": "Cancelar"
});
}

if (kendo.spreadsheet && kendo.spreadsheet.messages.dialogs) {
kendo.spreadsheet.messages.dialogs =
$.extend(true, kendo.spreadsheet.messages.dialogs,{
  "apply": "Aplicar",
  "save": "Salvar",
  "cancel": "Cancelar",
  "remove": "Excluir",
  "retry": "Tentar novamente",
  "revert": "Reverter",
  "okText": "OK",
  "formatCellsDialog": {
    "title": "Formato",
    "categories": {
      "number": "Número",
      "currency": "Moeda",
      "date": "Data"
      }
  },
  "fontFamilyDialog": {
    "title": "Fonte"
  },
  "fontSizeDialog": {
    "title": "Tamanho da fonte"
  },
  "bordersDialog": {
    "title": "Bordas"
  },
  "alignmentDialog": {
    "title": "Alinhamento",
    "buttons": {
     "justtifyLeft": "Alinha à esquerda",
     "justifyCenter": "Centralizar",
     "justifyRight": "Alinha à direita",
     "justifyFull": "Justificado",
     "alignTop": "Alinha ao topo",
     "alignMiddle": "Alinha ao meio",
     "alignBottom": "Alinha abaixo"
    }
  },
  "mergeDialog": {
    "title": "Mesclar céludas",
    "buttons": {
      "mergeCells": "Mesclar tudo",
      "mergeHorizontally": "Mesclar horizontalmente",
      "mergeVertically": "Mesclar verticalmente",
      "unmerge": "Desmesclar"
    }
  },
  "freezeDialog": {
    "title": "Travar painéis",
    "buttons": {
      "freezePanes": "Travar painéis",
      "freezeRows": "Travar linhas",
      "freezeColumns": "Travar colunas",
      "unfreeze": "Destravar painéis"
    }
  },
  "validationDialog": {
    "title": "Validação de dados",
    "hintMessage": "Favor inserir {0} válido {1}.",
    "hintTitle": "Validação {0}",
    "criteria": {
      "any": "Qualquer valor",
      "number": "Número",
      "text": "Texto",
      "date": "Data",
      "custom": "Fórmula personalizada",
      "list": "Lista"
    },
    "comparers": {
      "greaterThan": "maior que",
      "lessThan": "menor que",
      "between": "entre",
      "notBetween": "não entre",
      "equalTo": "igual à",
      "notEqualTo": "diferente de",
      "greaterThanOrEqualTo": "maior ou igual à",
      "lessThanOrEqualTo": "menor ou igual à"
    },
    "comparerMessages": {
      "greaterThan": "maior que {0}",
      "lessThan": "menor que {0}",
      "between": "entre {0} e {1}",
      "notBetween": "não entre {0} e {1}",
      "equalTo": "igual à {0}",
      "notEqualTo": "diferente de {0}",
      "greaterThanOrEqualTo": "maior ou igual à {0}",
      "lessThanOrEqualTo": "menor ou igual à {0}",
      "custom": "que satisfaz a fórmula: {0}"
    },
    "labels": {
      "criteria": "Critério",
      "comparer": "Comparar",
      "min": "Min",
      "max": "Max",
      "value": "Valor",
      "start": "Começa",
      "end": "Termina",
      "onInvalidData": "Em dados inválidos",
      "rejectInput": "Rejeitar entrada",
      "showWarning": "Exibir erros",
      "showHint": "Exibir dicas",
      "hintTitle": "Título da dica",
      "hintMessage": "Mensagem de dica",
      "ignoreBlank": "Ignorar vázio"
    },
    "placeholders": {
      "typeTitle": "Título do tipo",
      "typeMessage": "Mensagem do tipo"
    }
  },
  "saveAsDialog": {
    "title": "Salvar como...",
    "labels": {
      "fileName": "Nome do arquivo",
      "saveAsType": "Salvar com o tipo"
    }
  },
  "exportAsDialog": {
    "title": "Exportar...",
    "labels": {
      "fileName": "Nome do arquivo",
      "saveAsType": "Salvar com o tipo",
      "exportArea": "Exportar",
      "paperSize": "Tamanho do papel",
      "margins": "Margens",
      "orientation": "Orientação",
      "print": "Imprimir",
      "guidelines": "Linhas guia",
      "center": "Centralizar",
      "horizontally": "Horizontalmente",
      "vertically": "Verticalmente"
    }
  },
  "modifyMergedDialog": {
    "errorMessage": "Não é possível alterar parte de uma célula mesclada."
  },
  "useKeyboardDialog": {
    "title": "Copiando e colando",
    "errorMessage": "Estas ações não podem ser invocadas através do menu. Por favor, use os atalhos de teclado:",
    "labels": {
      "forCopy": "para copiar",
      "forCut": "para cortar",
      "forPaste": "para colar"
    }
  },
  "unsupportedSelectionDialog": {
    "errorMessage": "Essa ação não pode ser executada em seleção múltipla."
  }
});
}

if (kendo.spreadsheet && kendo.spreadsheet.messages.filterMenu) {
kendo.spreadsheet.messages.filterMenu =
$.extend(true, kendo.spreadsheet.messages.filterMenu,{
  "sortAscending": "Ordenar intervalo de A à Z",
  "sortDescending": "Ordenar intervalo de Z à A",
  "filterByValue": "Filtrar pelo valor",
  "filterByCondition": "Filtrar pela condição",
  "apply": "Aplicar",
  "search": "Procurar",
  "addToCurrent": "Adicionar a seleção atual",
  "clear": "Limpar",
  "blanks": "(Brancos)",
  "operatorNone": "Nenhum",
  "and": "E",
  "or": "OU",
  "operators": {
    "string": {
      "contains": "Conteúdo do texto",
      "doesnotcontain": "Não contém no texto",
      "startswith": "O texto começa com",
      "endswith": "O texto termina com"
    },
    "date": {
      "eq":  "Data igual",
      "neq": "Data diferente",
      "lt":  "Data anterior",
      "gt":  "Data posterior"
    },
    "number": {
      "eq": "É igual à",
      "neq": "Deferente de",
      "gte": "É maior ou igual à",
      "gt": "É maior que",
      "lte": "É menor ou igual à",
      "lt": "É menor que"
    }
  }
});
}

if (kendo.spreadsheet && kendo.spreadsheet.messages.toolbar) {
kendo.spreadsheet.messages.toolbar =
$.extend(true, kendo.spreadsheet.messages.toolbar,{
  "addColumnLeft": "Adicionar coluna à esquerda",
  "addColumnRight": "Adicionar coluna à direita",
  "addRowAbove": "Adicionar linha acima",
  "addRowBelow": "Adicionar linha abaixo",
  "alignment": "Alinhamento",
  "alignmentButtons": {
    "justtifyLeft": "Alinhar à esquerda",
    "justifyCenter": "Centralizar",
    "justifyRight": "Alinha à direita",
    "justifyFull": "Justificado",
    "alignTop": "Alinhar ao topo",
    "alignMiddle": "Alinhar ao meio",
    "alignBottom": "Alinhar abaixo"
  },
  "backgroundColor": "Fundo",
  "bold": "Negrito",
  "borders": "Bordas",
  "colorPicker": {
    "reset": "Resetar cor",
    "customColor": "Cor personalizada..."
  },
  "copy": "Copiar",
  "cut": "Cortar",
  "deleteColumn": "Excluir coluna",
  "deleteRow": "Excluir linha",
  "excelImport": "Importar do Excel...",
  "filter": "Filtrar",
  "fontFamily": "Fonte",
  "fontSize": "Tamanho da fonte",
  "format": "Formato personalizado...",
  "formatTypes": {
    "automatic": "Automático",
    "number": "Número",
    "percent": "Porcentagel",
    "financial": "Financeiro",
    "currency": "Moeda",
    "date": "Data",
    "time": "Horário",
    "dateTime": "Data e horário",
    "duration": "Duração",
    "moreFormats": "Mais formatos..."
  },
  "formatDecreaseDecimal": "Diminuir decimal",
  "formatIncreaseDecimal": "Aumentar decimal",
  "freeze": "Travar painéis",
  "freezeButtons": {
    "freezePanes": "Travar painéis",
    "freezeRows": "Travar linhas",
    "freezeColumns": "Travar colunas",
    "unfreeze": "Destravar painéis"
  },
  "italic": "Itálico",
  "merge": "Mesclar células",
  "mergeButtons": {
    "mergeCells": "Mesclar tudo",
    "mergeHorizontally": "Mesclar horizontalmente",
    "mergeVertically": "Mesclar verticalmente",
    "unmerge": "Desmesclar"
  },
  "open": "Abrir...",
  "paste": "Colar",
  "quickAccess": {
    "redo": "Refazer",
    "undo": "Desfazer"
  },
  "saveAs": "Salvar como...",
  "sortAsc": "Ordenar ascendente",
  "sortDesc": "Ordenar descendente",
  "sortButtons": {
    "sortSheetAsc": "Ordenar folha de A à Z",
    "sortSheetDesc": "Ordenar folha de Z à A",
    "sortRangeAsc": "Ordenar folha de A à Z",
    "sortRangeDesc": "Ordenar folha de Z à A"
  },
  "textColor": "Cor do texto",
  "textWrap": "Quebrar texto",
  "underline": "Sublinhado",
  "validation": "Validação de dados..."
});
}

if (kendo.spreadsheet && kendo.spreadsheet.messages.view) {
kendo.spreadsheet.messages.view =
$.extend(true, kendo.spreadsheet.messages.view,{
  "errors": {
    "shiftingNonblankCells": "Impossível inserir celulas, devido a possibilidade de perda dos dados. Selecione outro local ou excluir os dados a partir do final da planilha.",
    "filterRangeContainingMerges": "Impossível criar filtro dentro de uma faixa contendo fusões.",
    "validationError": "O valor introduzido viola as regras de validação definidas na célula."
  },
  "tabs": {
    "home": "Começo",
    "insert": "Inserir",
    "data": "Dados"
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

/* TreeList messages */

if (kendo.ui.TreeList) {
kendo.ui.TreeList.prototype.options.messages =
$.extend(true, kendo.ui.TreeList.prototype.options.messages,{
  "noRows": "Sem resultados",
  "loading": "Carregando...",
  "requestFailed": "Requisição falhou.",
  "retry": "Tentar novamente",
  "commands": {
      "edit": "Editar",
      "update": "Atualizar",
      "canceledit": "Cancelar",
      "create": "Adicionar novo",
      "createchild": "Adicionar sub registro",
      "destroy": "Excluir",
      "excel": "Exportar para Excel",
      "pdf": "Exportar para PDF"
  }
});
}

if (kendo.ui.TreeList) {
kendo.ui.TreeList.prototype.options.columnMenu =
$.extend(true, kendo.ui.TreeList.prototype.options.columnMenu, {
    "messages": {
        "columns": "Escolha as colunas",
        "filter": "Aplicar filtro",
        "sortAscending": "Ord (asc)",
        "sortDescending": "Ord (desc)"
    }
});
}

/* TreeView messages */

if (kendo.ui.TreeView) {
kendo.ui.TreeView.prototype.options.messages =
$.extend(true, kendo.ui.TreeView.prototype.options.messages,{
  "loading": "Carregando...",
  "requestFailed": "Requisição falhou.",
  "retry": "Tentar novamente"
});
}

/* Upload messages */

if (kendo.ui.Upload) {
kendo.ui.Upload.prototype.options.localization=
$.extend(true, kendo.ui.Upload.prototype.options.localization,{
  "select": "Selecionar...",
  "cancel": "Cancelar",
  "retry": "Tentar novamente",
  "remove": "Remover",
  "uploadSelectedFiles": "Enviar arquivos",
  "dropFilesHere": "arraste arquivos aqui para enviar",
  "statusUploading": "enviando",
  "statusUploaded": "enviado",
  "statusWarning": "warning",
  "statusFailed": "falhou",
  "headerStatusUploading": "Carregando...",
  "headerStatusUploaded": "Pronto"
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

/* kendo.ui.progress method */
if (kendo.ui.progress) {
kendo.ui.progress.messages =
$.extend(true, kendo.ui.progress.messages, {
    loading: "Carregando..."
});
}

/* Dialog */

if (kendo.ui.Dialog) {
kendo.ui.Dialog.prototype.options.messages =
$.extend(true, kendo.ui.Dialog.prototype.options.localization, {
  "close": "Fechar"
});
}

/* Alert */

if (kendo.ui.Alert) {
kendo.ui.Alert.prototype.options.messages =
$.extend(true, kendo.ui.Alert.prototype.options.localization, {
  "okText": "OK"
});
}

/* Confirm */

if (kendo.ui.Confirm) {
kendo.ui.Confirm.prototype.options.messages =
$.extend(true, kendo.ui.Confirm.prototype.options.localization, {
  "okText": "OK",
  "cancel": "Cancelar"
});
}

/* Prompt */
if (kendo.ui.Prompt) {
kendo.ui.Prompt.prototype.options.messages =
$.extend(true, kendo.ui.Prompt.prototype.options.localization, {
  "okText": "OK",
  "cancel": "Cancelar"
});
}

})(window.kendo.jQuery);

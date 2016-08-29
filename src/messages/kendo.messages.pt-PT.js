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
  "linkOpenInNewWindow": "Abrir ligação numa nova janela",
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
  "overwriteFile": "Um ficheiro com o nome \"{0}\" já existe nesta pasta. Quer substituí-lo?",
  "dropFilesHere": "Largue um ficheiro aqui para o submeter",
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
    "endswith": "Termina com",
    "isnull": "É nulo",
    "isnotnull": "É não nulo",
    "isempty": "É vazio",
    "isnotempty": "É não vazio"
  },
  "number": {
    "eq": "É igual a",
    "neq": "Não é igual a",
    "gte": "É maior ou igual a",
    "gt": "É maior que",
    "lte": "É menor ou igual a",
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
  "info": "Mostrar itens com valor que:",
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
    "endswith": "Termina com",
    "isnull": "É nulo",
    "isnotnull": "É não nulo",
    "isempty": "É vazio",
    "isnotempty": "É não vazio"
  },
  "number": {
    "eq": "É igual a",
    "neq": "Não é igual a",
    "gte": "É maior ou igual a",
    "gt": "É maior que",
    "lte": "É menor ou igual a",
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
  "checkAll": "Selecionar Tudo",
  "clear": "Limpar",
  "filter": "Filtrar",
  "search": "Pesquisar"
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
    "excel": "Exportar para Excel",
    "pdf": "Exportar para PDF",
    "save": "Guardar alterações",
    "select": "Selecionar",
    "update": "Atualizar"
  },
  "editable": {
    "cancelDelete": "Cancelar",
    "confirmation": "Tem a certeza que pretende eliminar este registo?",
    "confirmDelete": "Eliminar"
  },
  "noRecords": "Nenhum registo disponível."
});
}

/* Groupable messages */

if (kendo.ui.Groupable) {
kendo.ui.Groupable.prototype.options.messages =
$.extend(true, kendo.ui.Groupable.prototype.options.messages,{
  "empty": "Arraste uma coluna para este espaço para agrupar pelo valor da mesma"
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
  "allPages": "Tudo",
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
  "measureFields": "Largue campos de dados aqui",
  "columnFields": "Largue campos de colunas aqui",
  "rowFields": "Largue campos de linhas aqui"
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
    "mobileLabel": "Fim",
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
  "editable": {
    "confirmation": "Tem a certeza que quer eliminar este evento?"
  },
  "views": {
    "day": "Dia",
    "week": "Semana",
    "workWeek": "Semana de Trabalho",
    "agenda": "Agenda",
    "month": "Mês"
  },
  "recurrenceMessages": {
    "deleteWindowTitle": "Eliminar item recorrente",
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
    "start": "Início",
    "end": "Fim",
    "allDayEvent": "Evento todo o dia",
    "description": "Descrição",
    "repeat": "Repetição",
    "timezone": " ",
    "startTimezone": "Início do fuso horário",
    "endTimezone": "Fim do fuso horário",
    "separateTimezones": "Usar fusos horários de início e fim separados",
    "timezoneEditorTitle": "Fusos Horários",
    "timezoneEditorButton": "Fuso horário",
    "timezoneTitle": "Fusos Horários",
    "noTimezone": "Sem fuso horário",
    "editorTitle": "Evento"
  }
});
}

/* Spreadsheet messages */

if (kendo.spreadsheet && kendo.spreadsheet.messages.borderPalette) {
kendo.spreadsheet.messages.borderPalette =
$.extend(true, kendo.spreadsheet.messages.borderPalette,{
  "allBorders": "Todas as bordas",
  "insideBorders": "Bordas interiores",
  "insideHorizontalBorders": "Bordas interiores horizontais",
  "insideVerticalBorders": "Bordas interiores verticais",
  "outsideBorders": "Bordas exteriores",
  "leftBorder": "Borda esquerda",
  "topBorder": "Borda superior",
  "rightBorder": "Borda direita",
  "bottomBorder": "Borda inferior",
  "noBorders": "Sem bordas",
  "reset": "Reiniciar cor",
  "customColor": "Personalizar cor...",
  "apply": "Aplicar",
  "cancel": "Cancelar"
});
}

if (kendo.spreadsheet && kendo.spreadsheet.messages.dialogs) {
kendo.spreadsheet.messages.dialogs =
$.extend(true, kendo.spreadsheet.messages.dialogs,{
  "apply": "Aplicar",
  "save": "Guardar",
  "cancel": "Cancelar",
  "remove": "Remover",
  "retry": "Tentar Novamente",
  "revert": "Reverter",
  "okText": "OK",
  "formatCellsDialog": {
    "title": "Formatar",
    "categories": {
      "number": "Número",
      "currency": "Moeda",
      "date": "Data"
      }
  },
  "fontFamilyDialog": {
    "title": "Tipo de Letra"
  },
  "fontSizeDialog": {
    "title": "Tamanho da Letra"
  },
  "bordersDialog": {
    "title": "Bordas"
  },
  "alignmentDialog": {
    "title": "Alinhamento de texto",
    "buttons": {
     "justtifyLeft": "Alinhar à esquerda",
     "justifyCenter": "Centro",
     "justifyRight": "Alinhar à direita",
     "justifyFull": "Justificar",
     "alignTop": "Alinhar ao topo",
     "alignMiddle": "Alinhar ao centro",
     "alignBottom": "Alinhar ao fundo"
    }
  },
  "mergeDialog": {
    "title": "Unir Células",
    "buttons": {
      "mergeCells": "Unir tudo",
      "mergeHorizontally": "Unir horizontalmente",
      "mergeVertically": "Unir verticalmente",
      "unmerge": "Desunir"
    }
  },
  "freezeDialog": {
    "title": "Congelar painéis",
    "buttons": {
      "freezePanes": "Congelar painéis",
      "freezeRows": "Congelar linhas",
      "freezeColumns": "Congelar colunas",
      "unfreeze": "Descongelar painéis"
    }
  },
  "validationDialog": {
    "title": "Validação de Dados",
    "hintMessage": "Por favor indique um valor {1} válido {0}.",
    "hintTitle": "Validação {0}",
    "criteria": {
      "any": "Qualquer valor",
      "number": "Número",
      "text": "Texto",
      "date": "Data",
      "custom": "Personalizar Fórmula",
      "list": "Lista"
    },
    "comparers": {
      "greaterThan": "maior que",
      "lessThan": "menor que",
      "between": "entre",
      "notBetween": "não entre",
      "equalTo": "igual a",
      "notEqualTo": "não igual a",
      "greaterThanOrEqualTo": "maior que ou igual a",
      "lessThanOrEqualTo": "menor que ou igual a"
    },
    "comparerMessages": {
      "greaterThan": "maior que {0}",
      "lessThan": "menor que {0}",
      "between": "entre {0} e {1}",
      "notBetween": "não entre {0} e {1}",
      "equalTo": "igual a {0}",
      "notEqualTo": "não igual a {0}",
      "greaterThanOrEqualTo": "maior que ou igual a {0}",
      "lessThanOrEqualTo": "menor que ou igual a {0}",
      "custom": "que satisfaça a fórmula: {0}"
    },
    "labels": {
      "criteria": "Critério",
      "comparer": "Comparador",
      "min": "Min",
      "max": "Max",
      "value": "Valor",
      "start": "Inicio",
      "end": "Fim",
      "onInvalidData": "Quando dados inválidos",
      "rejectInput": "Rejeitar entrada",
      "showWarning": "Mostrar aviso",
      "showHint": "Mostrar dica",
      "hintTitle": "Título da dica",
      "hintMessage": "Mensagem da dica",
      "ignoreBlank": "Ignorar brancos"
    },
    "placeholders": {
      "typeTitle": "Digite o título",
      "typeMessage": "Digite a mensagem"
    }
  },
  "saveAsDialog": {
    "title": "Guardar Como...",
    "labels": {
      "fileName": "Nome do ficheiro",
      "saveAsType": "Guardar como tipo"
    }
  },
  "exportAsDialog": {
    "title": "Exportar...",
    "labels": {
      "fileName": "Nome do ficheiro",
      "saveAsType": "Guardar como tipo",
      "exportArea": "Exportar",
      "paperSize": "Dimensão do papel",
      "margins": "Margens",
      "orientation": "Orientação",
      "print": "Imprimir",
      "guidelines": "Guias",
      "center": "Centrar",
      "horizontally": "Horizontalmente",
      "vertically": "Verticalmente"
    }
  },
  "modifyMergedDialog": {
    "errorMessage": "Não pode fazer parte de uma célula unida."
  },
  "useKeyboardDialog": {
    "title": "Copiar e colar",
    "errorMessage": "Estas ações não podem ser invocadas pelo menu. Por favor use antes os atalhos do teclado:",
    "labels": {
      "forCopy": "para copiar",
      "forCut": "para cortar",
      "forPaste": "para colar"
    }
  },
  "unsupportedSelectionDialog": {
    "errorMessage": "Esta ação não pode ser efectuada em seleções múltiplas."
  }
});
}

if (kendo.spreadsheet && kendo.spreadsheet.messages.filterMenu) {
kendo.spreadsheet.messages.filterMenu =
$.extend(true, kendo.spreadsheet.messages.filterMenu,{
  "sortAscending": "Ordenar intervalo de A a Z",
  "sortDescending": "Ordenar intervalo de Z a A",
  "filterByValue": "Filtrar por valor",
  "filterByCondition": "Filtrar por condição",
  "apply": "Aplicar",
  "search": "Pesquisar",
  "addToCurrent": "Adicionar à seleção atual",
  "clear": "Limpar",
  "blanks": "(Brancos)",
  "operatorNone": "Nenhum",
  "and": "E",
  "or": "OU",
  "operators": {
    "string": {
      "contains": "Texto contém",
      "doesnotcontain": "Texto não contém",
      "startswith": "Texto começa com",
      "endswith": "Texto termina com"
    },
    "date": {
      "eq":  "Data é",
      "neq": "Data não é",
      "lt":  "Data é anterior",
      "gt":  "Data é posterior"
    },
    "number": {
      "eq": "É igual a",
      "neq": "Não é igual a",
      "gte": "É maior que ou igual a",
      "gt": "É maior que",
      "lte": "É menor que ou igual a",
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
  "alignment": "Alinhmento",
  "alignmentButtons": {
    "justtifyLeft": "Alinhar à esquerda",
    "justifyCenter": "Centrar",
    "justifyRight": "Alinhar à direita",
    "justifyFull": "Justificar",
    "alignTop": "Alinhar ao topo",
    "alignMiddle": "Alinhar ao meio",
    "alignBottom": "Alinhar ao fundo"
  },
  "backgroundColor": "Fundo",
  "bold": "Negrito",
  "borders": "Bordas",
  "colorPicker": {
    "reset": "Repôr cor",
    "customColor": "Personalizar cor..."
  },
  "copy": "Copiar",
  "cut": "Cortar",
  "deleteColumn": "Eliminar coluna",
  "deleteRow": "Eliminar linha",
  "excelImport": "Importar de Excel...",
  "filter": "Filtrar",
  "fontFamily": "Tipo de letra",
  "fontSize": "Tamanho da letra",
  "format": "Personalizar formatação...",
  "formatTypes": {
    "automatic": "Automático",
    "number": "Número",
    "percent": "Percentagem",
    "financial": "Financeiro",
    "currency": "Moeda",
    "date": "Data",
    "time": "Hora",
    "dateTime": "Data e hora",
    "duration": "Duração",
    "moreFormats": "Mais formatos..."
  },
  "formatDecreaseDecimal": "Decrementar decimais",
  "formatIncreaseDecimal": "Incrementar decimais",
  "freeze": "Congelar painéis",
  "freezeButtons": {
    "freezePanes": "Congelar paineis",
    "freezeRows": "Congelar linhas",
    "freezeColumns": "Congelar colunas",
    "unfreeze": "Descongelar painéis"
  },
  "italic": "Itálico",
  "merge": "Unir células",
  "mergeButtons": {
    "mergeCells": "Unir tudo",
    "mergeHorizontally": "Unir horizontalmente",
    "mergeVertically": "Unir verticalmente",
    "unmerge": "Desunir"
  },
  "open": "Abrir...",
  "paste": "Colar",
  "quickAccess": {
    "redo": "Refazer",
    "undo": "Desfazer"
  },
  "saveAs": "Guardar como...",
  "sortAsc": "Ordenação ascendente",
  "sortDesc": "Ordenação descendente",
  "sortButtons": {
    "sortSheetAsc": "Ordenar folha de A a Z",
    "sortSheetDesc": "Ordenar folha de Z a A",
    "sortRangeAsc": "Ordenar folha de A a Z",
    "sortRangeDesc": "Ordenar folha de Z a A"
  },
  "textColor": "Cor do Texto",
  "textWrap": "Quebrar texto",
  "underline": "Sublinhado",
  "validation": "Validação de dados..."
});
}

if (kendo.spreadsheet && kendo.spreadsheet.messages.view) {
kendo.spreadsheet.messages.view =
$.extend(true, kendo.spreadsheet.messages.view,{
  "errors": {
    "shiftingNonblankCells": "Não é possível inserir células devido a possível perda de dados. Escolha outra localização para inserir ou elimine os dados do final da sua folha de dados.",
    "filterRangeContainingMerges": "Não é possível criar um filtro dentro de um intervalo contendo uniões",
    "validationError": "O valor que indicou viola as regras de validação definidas na célula."
  },
  "tabs": {
    "home": "Início",
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
  "noRows": "Sem registos para mostrar",
  "loading": "A carregar...",
  "requestFailed": "Pedido falhado.",
  "retry": "Repetir",
  "commands": {
      "edit": "Editar",
      "update": "Atualizar",
      "canceledit": "Cancelar",
      "create": "Adicionar novo registo",
      "createchild": "Adicionar registo descendente",
      "destroy": "Eliminar",
      "excel": "Exportar para Excel",
      "pdf": "Exportar para PDF"
  }
});
}

if (kendo.ui.TreeList) {
kendo.ui.TreeList.prototype.options.columnMenu =
$.extend(true, kendo.ui.TreeList.prototype.options.columnMenu, {
    "messages": {
        "columns": "Escolher colunas",
        "filter": "Aplicar filtro",
        "sortAscending": "Ordenar (asc)",
        "sortDescending": "Ordenar (desc)"
    }
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
  "statusFailed": "falhou",
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
  "date": "{0} não é uma data válida",
  "dateCompare": "A data final deve ser posterior à data inicial"
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

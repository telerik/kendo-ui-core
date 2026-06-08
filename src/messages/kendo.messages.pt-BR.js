(function($, undefined) {

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
  "filter": "Filtro",
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
  "auto": "Auto",
  "bold": "Negrito",
  "italic": "Itálico",
  "search": "Pesquisa",
  "dropFilesHere": "Solte arquivos aqui.",
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
  "overflowAnchor": "Mais opções",
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
  "cleanFormatting": "Limpar formatação",
  "createTable": "Criar a tabela",
  "addColumnLeft": "Nova coluna à esquerda",
  "addColumnRight": "Nova coluna à direita",
  "addRowAbove": "Nova coluna acima",
  "addRowBelow": "Nova coluna abaixo",
  "deleteRow": "Excluir linha",
  "deleteColumn": "Excluir coluna",
  "dialogOk": "Ok",
  "tableBackground": "Cor de Fundo da Tabela",
  "tableCellProperties": "Propriedades da célula",
  "tableProperties": "Propriedades da tabela",
  "tableWizard": "Assistente de tabela",
  "tableTab": "Tabela",
  "cellTab": "Célula",
  "accessibilityTab": "Acessibilidade",
  "caption": "Legenda",
  "captionAlignment": "Alinhamento da legenda",
  "summary": "Resumo",
  "width": "Largura",
  "height": "Altura",
  "units": "Unidades",
  "cellSpacing": "Espaçamento da célula",
  "cellPadding": "Preenchimento da célula",
  "cellMargin": "Margem da célula",
  "alignment": "Alinhamento",
  "background": "Fundo",
  "cssClass": "Classe do CSS",
  "id": "ID",
  "border": "Borda",
  "borderColor": "Cor da borda",
  "borderWidth": "Largura da borda",
  "borderStyle": "Estilo da borda",
  "collapseBorders": "Colapsar bordas",
  "wrapText": "Quebrar texto",
  "fitToCell": "Ajustar a célula",
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
  "selectAllCells": "Selecionar todas as células",
  "applyToColumn": "aplicar na coluna",
  "applyToRow": "aplicar na linha",
  "print": "Imprimir",
  "headerRows": "Linhas do Cabeçalho",
  "headerColumns": "Colunas do Cabeçalho",
  "tableSummaryPlaceholder": "Atributo Summary não é compatível com HTML5.",
  "associateNone": "Nenhum",
  "associateScope": "Associate using 'scope' attribute",
  "associateIds": "Associate using Ids",
  "copyFormat": "Copiar formatação",
  "applyFormat": "Aplicar formatação",
  "borderNone": "Nenhum",
  "undo": "Desfazer",
  "redo": "Refazer"
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
  "title": "Exibir linhas com valores que",
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
    "add": "Adicionar",
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
  "play": "Iniciar",
  "mute": "Mudo",
  "unmute": "Ativar som",
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

/* TreeListPager messages */

if (kendo.ui.TreeListPager) {
kendo.ui.TreeListPager.prototype.options.messages =
$.extend(true, kendo.ui.TreeListPager.prototype.options.messages,{
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
  "measureFields": "Soltar campos de dados aqui",
  "columnFields": "Soltar campos de coluna aqui",
  "rowFields": "Soltar campos de linha aqui"
});
}

/* PivotFieldMenu messages */

if (kendo.ui.PivotFieldMenu) {
kendo.ui.PivotFieldMenu.prototype.options.messages =
$.extend(true, kendo.ui.PivotFieldMenu.prototype.options.messages,{
  "info": "Mostrar itens com valor que:",
  "filterFields": "Filtro de campos",
  "filter": "Filtro",
  "include": "Incluir campos...",
  "title": "Campos a incluir",
  "clear": "Limpar",
  "ok": "Ok",
  "cancel": "Cancelar",
  "operators": {
    "contains": "Contém",
    "doesnotcontain": "Não contém",
    "startswith": "Começa com",
    "endswith": "Termina com",
    "eq": "É igual à",
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
  "insideBorders": "Dentro das bordas",
  "insideHorizontalBorders": "Dentro das bordas horizontais",
  "insideVerticalBorders": "Dentro das bordas verticais",
  "outsideBorders": "Fora das bordas",
  "leftBorder": "Borda esquerda",
  "topBorder": "Borda superior",
  "rightBorder": "Borda direta",
  "bottomBorder": "Borda inferior",
  "noBorders": "Sem bordas",
  "reset": "Redefinir cor",
  "customColor": "Cor personalizada...",
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
    "title": "Formatar",
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
     "justifyLeft": "Alinhar à esquerda",
     "justifyCenter": "Centralizar",
     "justifyRight": "Alinhar à direita",
     "justifyFull": "Justificar",
     "alignTop": "Alinhar no topo",
     "alignMiddle": "Alinhar no meio",
     "alignBottom": "Alinhar abaixo"
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
    "title": "Data de validade",
    "hintMessage": "Por favor entre com um {0} valor válido {1}.",
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
      "notBetween": "não está entre",
      "equalTo": "igual",
      "notEqualTo": "não é igual",
      "greaterThanOrEqualTo": "maior ou igual que",
      "lessThanOrEqualTo": "menor ou igual que"
    },
    "comparerMessages": {
      "greaterThan": "maior que {0}",
      "lessThan": "menor que {0}",
      "between": "entre {0} e {1}",
      "notBetween": "não está entre {0} e {1}",
      "equalTo": "igual à {0}",
      "notEqualTo": "não é igual a {0}",
      "greaterThanOrEqualTo": "maior ou igual à {0}",
      "lessThanOrEqualTo": "menor ou igual à {0}",
      "custom": "Isso satisfaz a fórmula: {0}"
    },
    "labels": {
      "criteria": "Critério",
      "comparer": "Comparar",
      "min": "Min",
      "max": "Max",
      "value": "Valor",
      "start": "Inicio",
      "end": "Fim",
      "onInvalidData": "Em dados inválidos",
      "rejectInput": "Rejeitar entrada",
      "showWarning": "Mostrar aviso",
      "showHint": "Mostrar dica",
      "hintTitle": "Título da dica",
      "hintMessage": "Mensagem de dica",
      "ignoreBlank": "Ignorar em branco"
    },
    "placeholders": {
      "typeTitle": "Escrea o título",
      "typeMessage": "Escreva a mensagem"
    }
  },
  "exportAsDialog": {
    "title": "Exportar...",
    "labels": {
      "fileName": "Nome do arquivo",
      "saveAsType": "Salvar como tipo",
      "exportArea": "Exportar",
      "paperSize": "Tamanho do papel",
      "margins": "Margens",
      "orientation": "Orientação",
      "print": "Imprimir",
      "guidelines": "Diretrizes",
      "center": "Centralizar",
      "horizontally": "Horizontalmente",
      "vertically": "Verticalmente"
    }
  },
  "modifyMergedDialog": {
    "errorMessage": "Não é possível alterar parte de uma célula mesclada."
  },
  "useKeyboardDialog": {
    "title": "Copiar e colar",
    "errorMessage": "Estas ações não podem ser invocadas através do menu. Use os atalhos do teclado ao invés disso:",
    "labels": {
      "forCopy": "para copia",
      "forCut": "para recortar",
      "forPaste": "para colar"
    }
  },
  "unsupportedSelectionDialog": {
    "errorMessage": "Essa ação não pode ser realizada na seleção múltipla."
  }
});
}

if (kendo.spreadsheet && kendo.spreadsheet.messages.filterMenu) {
kendo.spreadsheet.messages.filterMenu =
$.extend(true, kendo.spreadsheet.messages.filterMenu,{
  "sortAscending": "Classificar de A a Z",
  "sortDescending": "Classificar de Z a A",
  "filterByValue": "Filtrar por valor",
  "filterByCondition": "Filtrar pela condição",
  "apply": "Aplicar",
  "search": "Procurar",
  "addToCurrent": "Adicionar à lista",
  "clear": "Limpar",
  "blanks": "(Vazio)",
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
      "eq": "É igual a",
      "neq": "Não é igual a",
      "lt": "É anterior a",
      "gt": "É posterior a"
    },
    "number": {
      "eq": "É igual à",
      "neq": "Não é igual a",
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
    "justifyLeft": "Alinhar à esquerda",
    "justifyCenter": "Centralizar",
    "justifyRight": "Alinha à direita",
    "justifyFull": "Justificar",
    "alignTop": "Alinhar acima",
    "alignMiddle": "Alinhar no meio",
    "alignBottom": "Alinhar abaixo"
  },
  "backgroundColor": "Fundo",
  "bold": "Negrito",
  "borders": "Bordas",
  "colorPicker": {
    "reset": "Redefinir cor",
    "customColor": "Cor personalizada..."
  },
  "copy": "Copiar",
  "cut": "Recortar",
  "deleteColumn": "Excluir coluna",
  "deleteRow": "Excluir linha",
  "excelImport": "Importar do Excel...",
  "filter": "Filtro",
  "fontFamily": "Fonte",
  "fontSize": "Tamanho da fonte",
  "format": "Formato personalizado...",
  "formatTypes": {
    "automatic": "Automático",
    "number": "Número",
    "percent": "Porcentagem",
    "financial": "Financeiro",
    "currency": "Moeda",
    "date": "Data",
    "time": "Hora",
    "dateTime": "Data hora",
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
  "sortDesc": "Classificar decrescente",
  "sortButtons": {
    "sortSheetAsc": "Classificar folha de A à Z",
    "sortSheetDesc": "Classificar folha de Z à A",
    "sortRangeAsc": "Ordenar intervalo de A a Z",
    "sortRangeDesc": "Ordenar intervalo de Z a A"
  },
  "textColor": "Cor do texto",
  "textWrap": "Envolver texto",
  "underline": "Sublinhado",
  "validation": "Data de validade..."
});
}

if (kendo.spreadsheet && kendo.spreadsheet.messages.view) {
kendo.spreadsheet.messages.view =
$.extend(true, kendo.spreadsheet.messages.view,{
  "errors": {
    "shiftingNonblankCells": "Não é possível inserir células devido à possibilidade de perda de dados. Selecione outro local de inserção ou exclua os dados do final de sua planilha.",
    "filterRangeContainingMerges": "Não é possível criar um filtro dentro de um intervalo que contém mesclagens.",
    "validationError": "O valor inserido viola as regras de validação definidas na célula."
  },
  "tabs": {
    "home": "Principal",
    "insert": "Inserir",
    "data": "Dado"
  }
});
}

/* Slider messages */

if (kendo.ui.Slider) {
kendo.ui.Slider.prototype.options =
$.extend(true, kendo.ui.Slider.prototype.options,{
  "increaseButtonTitle": "Aumentar",
  "decreaseButtonTitle": "Diminuir"
});
}

/* TreeList messages */

if (kendo.ui.TreeList) {
kendo.ui.TreeList.prototype.options.messages =
$.extend(true, kendo.ui.TreeList.prototype.options.messages,{
  "noRows": "Sem resultados",
  "loading": "Carregando...",
  "requestFailed": "Falha na solicitação.",
  "retry": "Tentar novamente",
  "commands": {
      "edit": "Editar",
      "update": "Atualizar",
      "canceledit": "Cancelar",
      "create": "Adicionar novo registo",
      "createchild": "Adicionar registro filho",
      "destroy": "Excluir",
      "excel": "Exportar para Excel",
      "pdf": "Exportar para PDF"
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
kendo.ui.Upload.prototype.options.localization =
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

/* ColorGradient messages */

if (kendo.ui.ColorGradient) {

    kendo.ui.ColorGradient.prototype.options.messages =
        $.extend(true, kendo.ui.ColorGradient.prototype.options.messages, {
            "contrastRatio": "Taxa de contraste:",
            "fail": "Falha",
            "pass": "Aprovado",
            "hex": "HEX",
            "toggleFormat": "Alternar formato",
            "red": "Vermelho",
            "green": "Verde",
            "blue": "Azul",
            "alpha": "Alfa"
        });

}

/* DateRangePicker messages */

if (kendo.ui.DateRangePicker) {

    kendo.ui.DateRangePicker.prototype.options.messages =
        $.extend(true, kendo.ui.DateRangePicker.prototype.options.messages, {
            "startLabel": "Início",
            "endLabel": "Fim"
        });

}

/* FileManager messages */

if (kendo.ui.FileManager) {

    kendo.ui.FileManager.prototype.options.messages =
        $.extend(true, kendo.ui.FileManager.prototype.options.messages, {
            "toolbar": {
                "createFolder": "Nova pasta",
                "upload": "Enviar",
                "sortDirection": "Direção da ordenação",
                "sortDirectionAsc": "Crescente",
                "sortDirectionDesc": "Decrescente",
                "sortField": "Ordenar por",
                "nameField": "Nome",
                "sizeField": "Tamanho",
                "typeField": "Tipo",
                "dateModifiedField": "Data de modificação",
                "dateCreatedField": "Data de criação",
                "listView": "Exibição em lista",
                "gridView": "Exibição em grade",
                "search": "Pesquisar",
                "details": "Detalhes",
                "detailsChecked": "Sim",
                "detailsUnchecked": "Não",
                "Delete": "Excluir",
                "Rename": "Renomear"
            },
            "views": {
                "nameField": "Nome",
                "sizeField": "Tamanho",
                "typeField": "Tipo",
                "dateModifiedField": "Data de modificação",
                "dateCreatedField": "Data de criação",
                "items": "itens"
            },
            "dialogs": {
                "upload": {
                    "title": "Enviar arquivos",
                    "clear": "Limpar",
                    "done": "Concluído"
                },
                "moveConfirm": {
                    "title": " ",
                    "content": "<p class='k-text-center'>Deseja mover ou copiar os arquivos selecionados?</p>",
                    "okText": "Copiar",
                    "cancel": "Mover",
                    "close": "Fechar"
                },
                "deleteConfirm": {
                    "title": "Confirmar exclusão",
                    "content": "<p class='k-text-center'>Tem certeza de que deseja excluir os arquivos selecionados?<br/>Esta ação não pode ser desfeita.</p>",
                    "okText": "Excluir",
                    "cancel": "Cancelar",
                    "close": "Fechar"
                },
                "renamePrompt": {
                    "title": "Renomear",
                    "content": "<p class='k-text-center'>Insira um novo nome de arquivo</p>",
                    "okText": "Renomear",
                    "cancel": "Cancelar",
                    "close": "Fechar"
                }
            },
            "previewPane": {
                "noFileSelected": "Nenhum arquivo selecionado",
                "extension": "Tipo",
                "size": "Tamanho",
                "created": "Data de criação",
                "createdUtc": "Data de criação (UTC)",
                "modified": "Data de modificação",
                "modifiedUtc": "Data de modificação (UTC)",
                "items": "itens"
            }
        });

}

/* TaskBoard messages */

if (kendo.ui.TaskBoard) {

    kendo.ui.TaskBoard.prototype.options.messages =
        $.extend(true, kendo.ui.TaskBoard.prototype.options.messages, {
            "edit": "Editar",
            "createNewCard": "Novo cartão",
            "create": "Criar",
            "search": "Pesquisar",
            "previewCard": "Visualizar cartão",
            "addCard": "Adicionar cartão",
            "editCard": "Editar cartão",
            "deleteCard": "Excluir cartão",
            "addColumn": "Adicionar coluna",
            "editColumn": "Editar coluna",
            "deleteColumn": "Excluir coluna",
            "close": "Fechar",
            "cancel": "Cancelar",
            "delete": "Excluir",
            "saveChanges": "Salvar alterações",
            "title": "Título:",
            "description": "Descrição:",
            "newColumn": "Nova coluna",
            "deleteColumnConfirm": "Tem certeza de que deseja excluir esta coluna?",
            "deleteCardConfirm": "Tem certeza de que deseja excluir este cartão?"
        });

}

/* PivotConfiguratorV2 messages */

if (kendo.ui.PivotConfiguratorV2) {

    kendo.ui.PivotConfiguratorV2.prototype.options.messages =
        $.extend(true, kendo.ui.PivotConfiguratorV2.prototype.options.messages, {
            "title": "Configurações",
            "cancelButtonText": "Cancelar",
            "applyButtonText": "Aplicar",
            "measures": "Selecione campos para começar",
            "columns": "Selecione campos para começar",
            "rows": "Selecione campos para começar"
        });

}

/* PivotFieldMenuV2 messages */

if (kendo.ui.PivotFieldMenuV2) {

    kendo.ui.PivotFieldMenuV2.prototype.options.messages =
        $.extend(true, kendo.ui.PivotFieldMenuV2.prototype.options.messages, {
            "apply": "Aplicar",
            "sortAscending": "Ordem crescente",
            "sortDescending": "Ordem decrescente",
            "filterFields": "Filtro de campos",
            "filter": "Filtrar",
            "include": "Incluir campos...",
            "clear": "Limpar",
            "reset": "Redefinir",
            "moveToColumns": "Mover para colunas",
            "moveToRows": "Mover para linhas",
            "movePrevious": "Mover anterior",
            "moveNext": "Mover próximo",
            "filterOperatorsDropDownLabel": "Operadores de filtro",
            "filterValueTextBoxLabel": "Valor do filtro",
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

/* MobileRecurrenceEditor messages */

if (kendo.ui.MobileRecurrenceEditor) {

    kendo.ui.MobileRecurrenceEditor.prototype.options.messages =
        $.extend(true, kendo.ui.MobileRecurrenceEditor.prototype.options.messages, {
            "cancel": "Cancelar",
            "update": "Salvar",
            "endTitle": "Fim da recorrência",
            "repeatTitle": "Padrão de repetição",
            "headerTitle": "Repetir evento",
            "end": {
                "never": "Nunca",
                "after": "Após",
                "on": "Em"
            },
            "daily": {
                "interval": "dia(s)"
            },
            "weekly": {
                "interval": "semana(s)"
            },
            "monthly": {
                "interval": "mês(es)",
                "repeatBy": "Repetir por: ",
                "dayOfMonth": "Dia do mês",
                "dayOfWeek": "Dia da semana"
            },
            "yearly": {
                "interval": "ano(s)",
                "repeatBy": "Repetir por: ",
                "dayOfMonth": "Dia do mês",
                "dayOfWeek": "Dia da semana",
                "of": " de "
            },
            "endRule": {
                "after": " ocorrência(s)",
                "on": "Em "
            }
        });

}

/* ListBox messaages */

/* ListBox messaages */

if (kendo.ui.ListBox) {

    kendo.ui.ListBox.prototype.options.messages =
        $.extend(true, kendo.ui.ListBox.prototype.options.messages, {
            "tools": {
                "remove": "Remover",
                "moveUp": "Mover para cima",
                "moveDown": "Mover para baixo",
                "transferTo": "Transferir para",
                "transferFrom": "Transferir de",
                "transferAllTo": "Transferir tudo para",
                "transferAllFrom": "Transferir tudo de"
            }
        });

}

/* TimePicker */

/* TimePicker */

if (kendo.ui.TimePicker) {

    kendo.ui.TimePicker.prototype.options.messages =
        $.extend(true, kendo.ui.TimePicker.prototype.options.messages, {
            "set": "Definir",
            "cancel": "Cancelar",
            "hour": "hora",
            "minute": "minuto",
            "second": "segundo",
            "millisecond": "milissegundo",
            "now": "Agora"
        });

}

/* DateTimePicker */

/* DateTimePicker */

if (kendo.ui.DateTimePicker) {

    kendo.ui.DateTimePicker.prototype.options.messages =
        $.extend(true, kendo.ui.DateTimePicker.prototype.options.messages, {
            "set": "Definir",
            "cancel": "Cancelar",
            "hour": "hora",
            "minute": "minuto",
            "second": "segundo",
            "millisecond": "milissegundo",
            "now": "Agora",
            "date": "Data",
            "time": "Hora",
            "today": "Hoje",
            "weekColumnHeader": ""
        });

}

/* Calendar */

/* Calendar */

if (kendo.ui.Calendar) {

    kendo.ui.Calendar.prototype.options.messages =
        $.extend(true, kendo.ui.Calendar.prototype.options.messages, {
            "weekColumnHeader": "",
            "today": "Hoje",
            "navigateTo": "Navegar para: ",
            "parentViews": {
                "month": "Visualização anual",
                "year": "Visualização por década",
                "decade": "Visualização por século"
            }
        });

}

/* DateInput */

/* DateInput */

if (kendo.ui.DateInput) {

    kendo.ui.DateInput.prototype.options.messages =
        $.extend(true, kendo.ui.DateInput.prototype.options.messages, {
            "year": "ano",
            "month": "mês",
            "day": "dia",
            "weekday": "dia da semana",
            "hour": "horas",
            "minute": "minutos",
            "second": "segundos",
            "dayperiod": "AM/PM"
        });

}

/* List messages */

if (kendo.ui.List) {

    kendo.ui.List.prototype.options.messages =
        $.extend(true, kendo.ui.List.prototype.options.messages, {
            "clear": "limpar",
            "noData": "Nenhum dado encontrado."
        });

}

/* DropDownList messages */

if (kendo.ui.DropDownList) {

    kendo.ui.DropDownList.prototype.options.messages =
        $.extend(true, kendo.ui.DropDownList.prototype.options.messages, {
            "clear": "limpar",
            "noData": "Nenhum dado encontrado."
        });

}

/* ComboBox messages */

if (kendo.ui.ComboBox) {

    kendo.ui.ComboBox.prototype.options.messages =
        $.extend(true, kendo.ui.ComboBox.prototype.options.messages, {
            "clear": "limpar",
            "noData": "Nenhum dado encontrado."
        });

}

/* AutoComplete messages */

if (kendo.ui.AutoComplete) {

    kendo.ui.AutoComplete.prototype.options.messages =
        $.extend(true, kendo.ui.AutoComplete.prototype.options.messages, {
            "clear": "limpar",
            "noData": "Nenhum dado encontrado."
        });

}

/* MultiColumnComboBox messages */

if (kendo.ui.MultiColumnComboBox) {

    kendo.ui.MultiColumnComboBox.prototype.options.messages =
        $.extend(true, kendo.ui.MultiColumnComboBox.prototype.options.messages, {
            "clear": "limpar",
            "noData": "Nenhum dado encontrado."
        });

}

/* DropDownTree messages */

if (kendo.ui.DropDownTree) {

    kendo.ui.DropDownTree.prototype.options.messages =
        $.extend(true, kendo.ui.DropDownTree.prototype.options.messages, {
            "clear": "limpar",
            "noData": "Nenhum dado encontrado.",
            "singleTag": "item(ns) selecionado(s)"
        });

}

/* MultiSelect messages */

if (kendo.ui.MultiSelect) {

    kendo.ui.MultiSelect.prototype.options.messages =
        $.extend(true, kendo.ui.MultiSelect.prototype.options.messages, {
            "clear": "limpar",
            "noData": "Nenhum dado encontrado.",
            "singleTag": "item(ns) selecionado(s)"
        });

}

/* Chat messages */

if (kendo.ui.Chat) {

    kendo.ui.Chat.prototype.options.messages =
        $.extend(true, kendo.ui.Chat.prototype.options.messages, {
            "placeholder": "Digite uma mensagem...",
            "toggleButton": "Alternar barra de ferramentas",
            "sendButton": "Enviar"
        });

}

/* Wizard messages */

if (kendo.ui.Wizard) {

    kendo.ui.Wizard.prototype.options.messages =
        $.extend(true, kendo.ui.Wizard.prototype.options.messages, {
            "reset": "Redefinir",
            "previous": "Anterior",
            "next": "Próximo",
            "done": "Concluído",
            "step": "Etapa",
            "of": "de"
        });

}

/* PDFViewer messages */

/* PDFViewer messages */

if (kendo.ui.PDFViewer) {

    kendo.ui.PDFViewer.prototype.options.messages =
        $.extend(true, kendo.ui.PDFViewer.prototype.options.messages, {
            "defaultFileName": "Documento",
            "toolbar": {
                "zoom": {
                    "zoomLevel": "Nível de zoom",
                    "zoomOut": "Diminuir zoom",
                    "zoomIn": "Aumentar zoom",
                    "actualWidth": "Largura real",
                    "autoWidth": "Largura automática",
                    "fitToWidth": "Ajustar à largura",
                    "fitToPage": "Ajustar à página"
                },
                "open": "Abrir",
                "exportAs": "Exportar",
                "download": "Baixar",
                "pager": {
                    "first": "Ir para a primeira página",
                    "previous": "Ir para a página anterior",
                    "next": "Ir para a próxima página",
                    "last": "Ir para a última página",
                    "of": "de",
                    "page": "página",
                    "pages": "páginas"
                },
                "print": "Imprimir",
                "toggleSelection": "Habilitar seleção",
                "togglePan": "Habilitar rolagem",
                "search": "Pesquisar"
            },
            "errorMessages": {
                "notSupported": "Apenas arquivos PDF são suportados.",
                "parseError": "Não foi possível processar o arquivo PDF.",
                "notFound": "Arquivo não encontrado.",
                "popupBlocked": "O popup está bloqueado pelo navegador."
            }
        });

}

/* Captcha messages */

if (kendo.ui.Captcha) {

    kendo.ui.Captcha.prototype.options.messages =
        $.extend(true, kendo.ui.Captcha.prototype.options.messages, {
            "reset": "Regenerar captcha",
            "audio": "Reproduzir áudio do captcha",
            "imageAlt": "Digite o texto da imagem do captcha",
            "success": "Verificação bem-sucedida"
        });

}

/* OrgChart messages */

if (kendo.ui.OrgChart) {

    kendo.ui.OrgChart.prototype.options.messages =
        $.extend(true, kendo.ui.OrgChart.prototype.options.messages, {
            "label": "Organograma",
            "edit": "Editar",
            "create": "Criar",
            "destroy": "Excluir",
            "destroyContent": "Tem certeza de que deseja excluir este item e seus filhos?",
            "destroyTitle": "Excluir item",
            "cancel": "Cancelar",
            "save": "Salvar",
            "menuLabel": "Menu de edição",
            "uploadAvatar": "Enviar nova imagem",
            "parent": "Superior",
            "name": "Nome",
            "title": "Título",
            "none": "--Nenhum--",
            "expand": "Expandir",
            "collapse": "Recolher"
        });

}

/* Map messages */

if (kendo.dataviz.ui.Map) {

    kendo.dataviz.ui.Map.prototype.options.messages =
        $.extend(true, kendo.dataviz.ui.Map.prototype.options.messages, {
            "tileTitle": "Título do mapa"
        });

}

/* Sankey messages */

if (kendo.dataviz.ui.Sankey) {

    kendo.dataviz.ui.Sankey.prototype.options.messages =
        $.extend(true, kendo.dataviz.ui.Sankey.prototype.options.messages, {
            "tooltipUnits": "{0} Unidades"
        });

}

/* Chart messages */

if (kendo.dataviz.ui.Chart) {

    kendo.dataviz.ui.Chart.prototype.options.messages =
        $.extend(true, kendo.dataviz.ui.Chart.prototype.options.messages, {
            "noData": "Nenhum dado disponível"
        });

}

})(window.kendo.jQuery);
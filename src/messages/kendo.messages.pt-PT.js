(function ($, undefined) {

  /* ColorGradient messages */

  if (kendo.ui.ColorGradient) {
    kendo.ui.ColorGradient.prototype.options.messages =
      $.extend(true, kendo.ui.ColorGradient.prototype.options.messages, {
        "contrastRatio": "Taxa de contraste:",
        "fail": "Falhar",
        "pass": "Passar",
        "hex": "HEX",
        "toggleFormat": "Alternar formato",
        "red": "Vermelho",
        "green": "Verde",
        "blue": "Azul",
        "alpha": "Alpha"
      });
  }

  /* FlatColorPicker messages */

  if (kendo.ui.FlatColorPicker) {
    kendo.ui.FlatColorPicker.prototype.options.messages =
      $.extend(true, kendo.ui.FlatColorPicker.prototype.options.messages, {
        "apply": "Aplicar",
        "cancel": "Cancelar",
        "noColor": "sem cor",
        "clearColor": "Limpar cor"
      });
  }

  /* ColorPicker messages */

  if (kendo.ui.ColorPicker) {
    kendo.ui.ColorPicker.prototype.options.messages =
      $.extend(true, kendo.ui.ColorPicker.prototype.options.messages, {
        "apply": "Aplicar",
        "cancel": "Cancelar",
        "noColor": "sem cor",
        "clearColor": "Limpar cor"
      });
  }

  /* ColumnMenu messages */

  if (kendo.ui.ColumnMenu) {
    kendo.ui.ColumnMenu.prototype.options.messages =
      $.extend(true, kendo.ui.ColumnMenu.prototype.options.messages, {
        "sortAscending": "Ordenação Ascendente",
        "sortDescending": "Ordenação Descendente",
        "filter": "Filtro",
        "clearAllFilters": "Limpar todos os Filtros",
        "column": "Coluna",
        "columns": "Colunas",
        "columnVisibility": "Visibilidade da Coluna",
        "clear": "Limpar",
        "cancel": "Cancelar",
        "done": "Feito",
        "settings": "Definições da Coluna",
        "lock": "Trancar",
        "unlock": "Destrancar",
        "stick": "Fixar Coluna",
        "unstick": "Desfixar Coluna",
        "setColumnPosition": "Definir posição da Coluna",
        "apply": "Aplicar",
        "reset": "Repor",
        "buttonTitle": "{0} editar definições da coluna",
        "movePrev": "Mover anterior",
        "moveNext": "Mover seguinte",
        "groupColumn": "Agrupar coluna",
        "ungroupColumn": "Separar coluna"
      });
  }

  /* DateRangePicker messages */

  if (kendo.ui.DateRangePicker) {
    kendo.ui.DateRangePicker.prototype.options.messages =
      $.extend(true, kendo.ui.DateRangePicker.prototype.options.messages, {
        "startLabel": "Iniciar",
        "endLabel": "Terminar"
      });
  }

  /* Editor messages */

  if (kendo.ui.Editor) {
    kendo.ui.Editor.prototype.options.messages =
      $.extend(true, kendo.ui.Editor.prototype.options.messages, {
        "auto": "Auto",
        "bold": "Negrito",
        "italic": "Itálico",
        "search": "Pesquisar",
        "dropFilesHere": "Largar os ficheiros aqui.",
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
        "overflowAnchor": "Mais ferramentas",
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
        "cleanFormatting": "Limpar formatação",
        "createTable": "Criar tabela",
        "addColumnLeft": "Adicionar coluna à esquerda",
        "addColumnRight": "Adicionar coluna à direita",
        "addRowAbove": "Adicionar linha acima",
        "addRowBelow": "Adicionar linha abaixo",
        "deleteRow": "Eliminar linha",
        "deleteColumn": "Eliminar coluna",
        "dialogOk": "Confirmar",
        "tableBackground": "Fundo da tabela",
        "tableCellProperties": "Propriedades da célula",
        "tableProperties": "Propriedades da tablea",
        "tableWizard": "Assistente da tabela",
        "tableTab": "Geral",
        "cellTab": "Célula",
        "accessibilityTab": "Avançado",
        "caption": "Título",
        "captionAlignment": "Alinhamento título",
        "summary": "Sumário",
        "width": "Largura",
        "height": "Altura",
        "units": "Unidades",
        "cellSpacing": "Espaçamento célula",
        "cellPadding": "Espaço dentro célula",
        "cellMargin": "Margem célula",
        "alignment": "Alinhamento",
        "background": "Fundo",
        "cssClass": "Classe CSS",
        "id": "ID",
        "border": "Borda",
        "borderColor": "Côr da borda",
        "borderWidth": "Largura da borda",
        "borderStyle": "Estilo da borda",
        "collapseBorders": "Colapsar bordas",
        "wrapText": "Quebrar texto",
        "fitToCell": "Ajustar à célula",
        "associateCellsWithHeaders": "Associar cabeçalho",
        "alignLeft": "Alinhas à esquerda",
        "alignCenter": "Alinhar ao centro",
        "alignRight": "Alinhar à direita",
        "alignLeftTop": "Alinhar ao topo esquerdo",
        "alignCenterTop": "Alinhar ao topo e centro",
        "alignRightTop": "Alinhar ao topo direito",
        "alignLeftMiddle": "Alinhas à esquerda e ao meio",
        "alignCenterMiddle": "Alinhar ao centro e ao meio",
        "alignRightMiddle": "Alinhar à direita e ao meio",
        "alignLeftBottom": "Alinhar ao canto inferior esquerdo",
        "alignCenterBottom": "Alinhar ao centro inferior",
        "alignRightBottom": "Alinhar ao canto inferior direito",
        "alignRemove": "Remover alinhamento",
        "columns": "Colunas",
        "rows": "Linhas",
        "selectAllCells": "Aplicar a todas as células",
        "applyToColumn": "aplicar à coluna",
        "applyToRow": "aplicar à linha",
        "print": "Imprimir",
        "headerRows": "Linhas de cabeçalho",
        "headerColumns": "Colunas de cabeçalho",
        "tableSummaryPlaceholder": "O atributo de resumo não é compatível com HTML5.",
        "associateNone": "Nenhum",
        "associateScope": "Associar utilizando o atributo 'scope'",
        "associateIds": "Associar utilizando Ids",
        "copyFormat": "Copiar formato",
        "applyFormat": "Aplicar formato",
        "borderNone": "Nenhuma",
        "undo": "Desfazer",
        "redo": "Refazer"
      });
  }

  /* FileBrowser messages */

  if (kendo.ui.FileBrowser) {
    kendo.ui.FileBrowser.prototype.options.messages =
      $.extend(true, kendo.ui.FileBrowser.prototype.options.messages, {
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

  /* FileManager messages */

  if (kendo.ui.FileManager) {
    kendo.ui.FileManager.prototype.options.messages =
      $.extend(true, kendo.ui.FileManager.prototype.options.messages, {
        toolbar: {
          createFolder: "Nova pasta",
          upload: "Upload",
          sortDirection: "Direção ordenação",
          sortDirectionAsc: "Ordenar ascendentemente",
          sortDirectionDesc: "Ordenar descendentemente",
          sortField: "Ordenar por",
          nameField: "Nome",
          sizeField: "Tamanho ficheiro",
          typeField: "Tipo",
          dateModifiedField: "Data modificação",
          dateCreatedField: "Data criação",
          listView: "Visualização em lista",
          gridView: "Visualização em grelha",
          search: "Pesquisar",
          details: "Ver detalhes",
          detailsChecked: "Ligado",
          detailsUnchecked: "Desligado",
          "delete": "Apagar",
          rename: "Renomear"
        },
        views: {
          nameField: "Nome",
          sizeField: "Tamanho ficheiro",
          typeField: "Tipo",
          dateModifiedField: "Data modificação",
          dateCreatedField: "Data criação",
          items: "itens",
          listLabel: "Gestor de ficheiros - ListView",
          gridLabel: "Gestor de ficheiros - Grid",
          treeLabel: "Gestor de ficheiros - TreeView"
        },
        dialogs: {
          upload: {
            title: "Upload de ficheiros",
            clear: "Limpar lista",
            done: "Feito"
          },
          moveConfirm: {
            title: "Confirmar",
            content: "<p class='k-text-center'>Pretendes mover ou copiar?</p>",
            okText: "Copiar",
            cancel: "Mover",
            close: "fechar"
          },
          deleteConfirm: {
            title: "Confirmar",
            content: "<p class='k-text-center'>Tens a certeza que pretendes eliminar o(s) ficheiro(s?<br/>You cannot undo this action.</p>",
            okText: "Apagar",
            cancel: "Cancelar",
            close: "fechar"
          },
          renamePrompt: {
            title: "Alerta",
            content: "<p class='k-text-center'>Insira o novo nome para o ficheiro..</p>",
            okText: "Renomar",
            cancel: "Cancelar",
            close: "fechar"
          }
        },
        previewPane: {
          noFileSelected: "Nenhum ficheiro seleccionado",
          extension: "Tipo",
          size: "Tamanho",
          created: "Data criação",
          createdUtc: "Data criação UTC",
          modified: "Data Modificação",
          modifiedUtc: "Data Modificação UTC",
          items: "itens"
        }
      });
  }

  /* FilterCell messages */

  if (kendo.ui.FilterCell) {
    kendo.ui.FilterCell.prototype.options.messages =
      $.extend(true, kendo.ui.FilterCell.prototype.options.messages, {
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
      $.extend(true, kendo.ui.FilterCell.prototype.options.operators, {
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
          "isnotempty": "É não vazio",
          "isnullorempty": "Has no value",
          "isnotnullorempty": "Has value"
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
      $.extend(true, kendo.ui.FilterMenu.prototype.options.messages, {
        "info": "Mostrar itens com valor que:",
        "title": "Mostrar itens com valor que",
        "isTrue": "é verdadeiro",
        "isFalse": "é falso",
        "filter": "Filtrar",
        "clear": "Limpar",
        "and": "E",
        "or": "OU",
        "selectValue": "-Selecionar valor-",
        "operator": "Operador",
        "value": "Valor",
        "cancel": "Cancelar",
        "done": "Feito",
        "into": "em",
        "buttonTitle": "{0} configurações da coluna de filtro"
      });
  }

  /* FilterMenu operator messages */

  if (kendo.ui.FilterMenu) {
    kendo.ui.FilterMenu.prototype.options.operators =
      $.extend(true, kendo.ui.FilterMenu.prototype.options.operators, {
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
          "isnotempty": "É não vazio",
          "isnullorempty": "Sem valor",
          "isnotnullorempty": "Com valor"
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
      $.extend(true, kendo.ui.FilterMultiCheck.prototype.options.messages, {
        "checkAll": "Selecionar Tudo",
        "clearAll": "Limpar tudo",
        "clear": "Limpar",
        "filter": "Filtrar",
        "search": "Pesquisar",
        "cancel": "Cancelar",
        "selectedItemsFormat": "{0} itens selecionados",
        "done": "Feito",
        "into": "em"
      });
  }

  /* Gantt messages */

  if (kendo.ui.Gantt) {
    kendo.ui.Gantt.prototype.options.messages =
      $.extend(true, kendo.ui.Gantt.prototype.options.messages, {
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
          "plannedStart": "Planned Start",
          "plannedEnd": "Planned End",,
          "resources": "Recursos",
          "resourcesEditorTitle": "Recursos",
          "resourcesHeader": "Recursos",
          "start": "Início",
          "title": "Título",
          "unitsHeader": "Unidades",
          "parent": "Parente",
          "addNew": "Adicionar",
          "name": "Nome",
          "percentCompleteHint": "valores de 0 to 1",
          "remove": "Remover",
          "actualStart": "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
          "actualEnd": "Actual End",
          "parentOptionLabel": "-None-",
          "general": "General",
          "predecessors": "Predecessors",
          "successors": "Successors",
          "other": "Other",
          "dependencyType": "Type"
        },
        "plannedTasks": {
          "switchText": "Planned Tasks",
          "offsetTooltipAdvanced": "Met deadline earlier",
          "offsetTooltipDelay": "Delay",
          "seconds": "seconds",
          "minutes": "minutes",
          "hours": "hours",
          "days": "days"
        },
        "save": "Guardar",
        "selectView": "Select view",
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
      $.extend(true, kendo.ui.Grid.prototype.options.messages, {
        "commands": {
          "cancel": "Cancelar alterações",
          "canceledit": "Cancelar",
          "columns": "Columns",
          "create": "Adicionar novo registo",
          "destroy": "Eliminar",
          "edit"  : "Editar",
          "excel": "Exportar para Excel",
          "pdf": "Exportar para PDF",
          "save": "Guardar alterações",
          "select": "Selecionar",
          "update": "Atualizar",
          "search": "Pesquisar...",
          "selectRow": "Selecionar linha",
          "selectAllRows": "Todas as linhas",
          "clearSelection": "Limpar seleção",
          "copySelection": "Copiar seleção",
          "copySelectionNoHeaders": "Copiar seleção (Sem cabeçalhos)",
          "reorderRow": "Reordenar linha",
          "reorderRowUp": "Cima",
          "reorderRowDown": "Baixo",
          "reorderRowTop": "Topo",
          "reorderRowBottom": "Fundo",
          "exportPdf": "Exportar para PDF",
          "exportExcel": "Exportar para Excel",
          "exportToExcelAll": "Tudo",
          "exportToExcelSelection": "Seleção",
          "exportToExcelSelectionNoHeaders": "Seleção (sem cabeçalhos)",
          "sortAsc": "Ordenar ascendetemente",
          "sortDesc": "Ordenar descendentemente",
          "moveGroupPrevious": "Mover anterior",
          "moveGroupNext": "Mover seguinte",
        },
        "editable": {
          "cancelDelete": "Cancelar",
          "confirmation": "Tem a certeza que pretende eliminar este registo?",
          "confirmDelete": "Eliminar"
        },
        "noRecords": "Nenhum registo disponível.",
        "expandCollapseColumnHeader": "",
        "groupHeader": "Carregue em ctrl + space para agrupar",
        "ungroupHeader": "Carregue em ctrl + space para desagrupar",
        "toolbarLabel": "Barra de tarefas",
        "groupingHeaderLabel": "Cabeçalho de agrupamento",
        "filterCellTitle": "Célula do filtro"
      });
  }

  /* TaskBoard messages */

  if (kendo.ui.TaskBoard) {
    kendo.ui.TaskBoard.prototype.options.messages =
      $.extend(true, kendo.ui.TaskBoard.prototype.options.messages, {
        "edit": "Editar",
        "createNewCard": "Criar novo cartão",
        "create": "Criar",
        "search": "Pesquisar",
        "previewCard": "Pré-visualizar cartão",
        "addCard": "Adicionar cartão",
        "editCard": "Editar cartão",
        "deleteCard": "Apagar cartão",
        "addColumn": "Adicionar coluna",
        "editColumn": "Editar coluna",
        "deleteColumn": "Apagar coluna",
        "close": "Fechar",
        "cancel": "Cancelar",
        "delete": "Apagar",
        "saveChanges": "Guardar alterações",
        "title": "Título:",
        "description": "Descrição:",
        "newColumn": "Nova coluana",
        "deleteColumnConfirm": "Tem a certeza que quer apagar esta coluna?",
        "deleteCardConfirm": "Tem a certeza que quer apagar este cartão?"
      });
  }

    /* TreeList messages */

  if (kendo.ui.TreeList) {
    kendo.ui.TreeList.prototype.options.messages =
      $.extend(true, kendo.ui.TreeList.prototype.options.messages, {
        "noRows": "Nenhum registo para mostrar",
        "loading": "A carregar...",
        "requestFailed": "Pedido falhou.",
        "retry": "Tentar novamente",
        "commands": {
          "edit": "Editar",
          "update": "Guardar",
          "canceledit": "Cancelar",
          "create": "Adicionar novo registo",
          "createchild": "Adicionar registo filho",
          "destroy": "Apagar",
          "excel": "Exportar para Excel",
          "pdf": "Exportar para PDF"
        }
      });
  }

  /* Groupable messages */

  if (kendo.ui.Groupable) {
    kendo.ui.Groupable.prototype.options.messages =
      $.extend(true, kendo.ui.Groupable.prototype.options.messages, {
        "empty": "Arraste uma coluna para este espaço para agrupar pelo valor da mesma"
      });
  }

  /* NumericTextBox messages */

  if (kendo.ui.NumericTextBox) {
    kendo.ui.NumericTextBox.prototype.options =
      $.extend(true, kendo.ui.NumericTextBox.prototype.options, {
        "upArrowText": "Aumentar valor",
        "downArrowText": "Diminuir valor"
      });
  }

    /* MediaPlayer messages */

  if (kendo.ui.MediaPlayer) {
    kendo.ui.MediaPlayer.prototype.options.messages =
      $.extend(true, kendo.ui.MediaPlayer.prototype.options.messages, {
        "pause": "Pausa",
        "play": "Reproduzir",
        "mute": "Mutar",
        "unmute": "Desmutar",
        "quality": "Qualidade",
        "fullscreen": "Ecrã inteiro",
        "volume": "volume",
        "time": "tempo"
      });
  }

  /* Pager messages */

  if (kendo.ui.Pager) {
    kendo.ui.Pager.prototype.options.messages =
      $.extend(true, kendo.ui.Pager.prototype.options.messages, {
        "allPages": "Tudo",
        "display": "Registos {0} - {1} de {2}",
        "empty": "Sem registos para apresentar.",
        "page": "Página",
        "pageButtonLabel": "Page {0}",
        "pageSizeDropDownLabel": "Page sizes drop down",
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
      $.extend(true, kendo.ui.TreeListPager.prototype.options.messages, {
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
      $.extend(true, kendo.ui.PivotGrid.prototype.options.messages, {
        "measureFields": "Largue campos de dados aqui",
        "columnFields": "Largue campos de colunas aqui",
        "rowFields": "Largue campos de linhas aqui"
      });
  }

  /* PivotFieldMenu messages */

  if (kendo.ui.PivotFieldMenu) {
    kendo.ui.PivotFieldMenu.prototype.options.messages =
      $.extend(true, kendo.ui.PivotFieldMenu.prototype.options.messages, {
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

    /* PivotConfiguratorV2 messages */

  if (kendo.ui.PivotConfiguratorV2) {
    kendo.ui.PivotConfiguratorV2.prototype.options.messages =
      $.extend(true, kendo.ui.PivotConfiguratorV2.prototype.options.messages, {
        "title": "Definições",
        "cancelButtonText": "Cancelar",
        "applyButtonText": "Applicar",
        "measures": "Escolha alguns campos para iniciar a configuração",
        "columns": "Escolha alguns campos para iniciar a configuração",
        "rows": "Escolha alguns campos para iniciar a configuração"
      });
  }

    /* PivotFieldMenuV2 messages */

  if (kendo.ui.PivotFieldMenuV2) {
    kendo.ui.PivotFieldMenuV2.prototype.options.messages =
      $.extend(true, kendo.ui.PivotFieldMenuV2.prototype.options.messages, {
        "apply": "Aplicar",
        "sortAscending": "Ordenar ascendentemente",
        "sortDescending": "Ordenar descendentemente",
        "filterFields": "Filtros campos",
        "filter": "Filtro",
        "include": "Incluir campos...",
        "clear": "Limpar",
        "reset": "Repor",
        "moveToColumns": "Mover para Colunas",
        "moveToRows": "Mover para linhas",
        "movePrevious": "Mover anterior",
        "moveNext": "Mover seguinte",
        "filterOperatorsDropDownLabel": "Operadores de filtro de região",
        "filterValueTextBoxLabel": "Valor filtro região",
        "operators": {
          "contains": "Contêm",
          "doesnotcontain": "Não contêm",
          "startswith": "Começa por",
          "endswith": "Acabar em",
          "eq": "É igual a",
          "neq": "É diferente de"
        }
      });
  }

  /* RecurrenceEditor messages */

  if (kendo.ui.RecurrenceEditor) {
    kendo.ui.RecurrenceEditor.prototype.options.messages =
      $.extend(true, kendo.ui.RecurrenceEditor.prototype.options.messages, {
        "repeat": "Repeat",
        "recurrenceEditorTitle": "Recurrence editor",
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
          "day": "Dia ",
          "date": "Data"
        },
        "yearly": {
          "repeatEvery": "Repetir a cada: ",
          "repeatOn": "Repetir em: ",
          "interval": " ano(s)",
          "of": " de ",
          "month": "mês",
          "day": "dia",
          "date": "Data"
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

    /* MobileRecurrenceEditor messages */

  if (kendo.ui.MobileRecurrenceEditor) {
    kendo.ui.MobileRecurrenceEditor.prototype.options.messages =
      $.extend(true, kendo.ui.MobileRecurrenceEditor.prototype.options.messages, kendo.ui.RecurrenceEditor.prototype.options.messages, {
        "cancel": "Cancelar",
        "update": "Guardar",
        "endTitle": "Repetição a repetição",
        "repeatTitle": "Padrão de repetição",
        "headerTitle": "Repetir evento",
        "end": {
          "patterns": {
            "never": "Nunca",
            "after": "Depois...",
            "on": "Em..."
          },
          "never": "Nunca",
          "after": "Acabar repetição depois",
          "on": "Acabar repetição em"
        },
        "daily": {
          "interval": ""
        },
        "hourly": {
          "interval": ""
        },
        "weekly": {
          "interval": ""
        },
        "monthly": {
          "interval": "",
          "repeatBy": "Repetir por: ",
          "dayOfMonth": "Dia do mês",
          "dayOfWeek": "Dia da semana",
          "repeatEvery": "Repetir a cada",
          "every": "Todo",
          "day": "Dia "
        },
        "yearly": {
          "interval": "",
          "repeatBy": "Repetir por: ",
          "dayOfMonth": "Dia do mês",
          "dayOfWeek": "Dia da semana",
          "repeatEvery": "Repetir a cada: ",
          "every": "Todo",
          "month": "Mês",
          "day": "Dia"
        }
      });
  }

  /* Scheduler messages */

  if (kendo.ui.Scheduler) {
    kendo.ui.Scheduler.prototype.options.messages =
      $.extend(true, kendo.ui.Scheduler.prototype.options.messages, {
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
        "resetSeries": "Repo série",
        "deleteWindowTitle": "Eliminar evento",
        "ariaSlotLabel": "Selecionado entre {0:t} e {1:t}",
        "ariaEventLabel": "{0} em {1:D} às {2:t}",
        "refresh": "Refrecar",
        "selectView": "Escolha vista",
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
          "resetSeriesWindowTitle": "Repor séries",
          "deleteWindowOccurrence": "Eliminar ocorrência atual",
          "deleteWindowSeries": "Eliminar série de ocorrências",
          "deleteRecurringConfirmation": "Tem a certeza que quer apagar a ocorrência do evento?",
          "deleteSeriesConfirmation": "Tem a certeza que quer apagar toda a série?",
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
          "timezone": "Fuso Horário",
          "startTimezone": "Início do fuso horário",
          "endTimezone": "Fim do fuso horário",
          "separateTimezones": "Usar fusos horários de início e fim separados",
          "timezoneEditorTitle": "Fusos Horários",
          "timezoneEditorButton": "Fuso horário",
          "timezoneTitle": "Fusos Horários",
          "noTimezone": "Sem fuso horário",
          "editorTitle": "Evento"
        },
        "search": "Pesquisar..."
      });
  }

  /* Spreadsheet messages */

  if (kendo.spreadsheet && kendo.spreadsheet.messages.borderPalette) {
    kendo.spreadsheet.messages.borderPalette =
      $.extend(true, kendo.spreadsheet.messages.borderPalette, {
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
      $.extend(true, kendo.spreadsheet.messages.dialogs, {
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
            "justifyLeft": "Alinhar à esquerda",
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
        "confirmationDialog": {
          "text": "Tem a certeza que quer remover esta folha?",
          "title": "Remover folha"
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
            "min": "Mín",
            "max": "Máx",
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
        },
        "insertCommentDialog": {
          "title": "Inserir comentário",
          "labels": {
            "comment": "Comentário",
            "removeComment": "Remover comentário"
          }
        },
        "insertImageDialog": {
          "title": "Inserir imagem",
          "info": "Arraste uma imagem para aqui, ou carregue para escolher",
          "typeError": "Por favor escolha uma imagem com o formato JPEG, PNG ou GIF"
        }
      });
  }

  if (kendo.spreadsheet && kendo.spreadsheet.messages.filterMenu) {
    kendo.spreadsheet.messages.filterMenu =
      $.extend(true, kendo.spreadsheet.messages.filterMenu, {
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
            "eq": "Data é",
            "neq": "Data não é",
            "lt": "Data é anterior",
            "gt": "Data é posterior"
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

  if (kendo.spreadsheet && kendo.spreadsheet.messages.colorPicker) {
    kendo.spreadsheet.messages.colorPicker =
      $.extend(true, kendo.spreadsheet.messages.colorPicker, {
        "reset": "Repor cor",
        "customColor": "Customizar cor...",
        "apply": "Aplicar",
        "cancel": "Cancelar"
      });
  }

  if (kendo.spreadsheet && kendo.spreadsheet.messages.toolbar) {
    kendo.spreadsheet.messages.toolbar =
      $.extend(true, kendo.spreadsheet.messages.toolbar, {
        "addColumnLeft": "Adicionar coluna à esquerda",
        "addColumnRight": "Adicionar coluna à direita",
        "addRowAbove": "Adicionar linha acima",
        "addRowBelow": "Adicionar linha abaixo",
        "alignment": "Alinhmento",
        "alignmentButtons": {
          "justifyLeft": "Alinhar à esquerda",
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
        "insertComment": "Inserir comentário",
        "insertImage": "Inserir imagem",
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
      $.extend(true, kendo.spreadsheet.messages.view, {
        "nameBox": "Nome caixa",
        "formulaInput": "Inserção fórmula",
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
      $.extend(true, kendo.ui.Slider.prototype.options, {
        "increaseButtonTitle": "Incrementar",
        "decreaseButtonTitle": "Decrementar"
      });
  }

   /* ListBox messaages */

  if (kendo.ui.ListBox) {
    kendo.ui.ListBox.prototype.options.messages =
      $.extend(true, kendo.ui.ListBox.prototype.options.messages, {
        "tools": {
          "remove": "Apagar",
          "moveUp": "Mover cima",
          "moveDown": "Mover baixo",
          "transferTo": "Transferir para",
          "transferFrom": "Transferir de",
          "transferAllTo": "Transferir todos para",
          "transferAllFrom": "Transferir todos de"
        }
      });
  }

  /* TreeList messages */

  if (kendo.ui.TreeList) {
    kendo.ui.TreeList.prototype.options.messages =
      $.extend(true, kendo.ui.TreeList.prototype.options.messages, {
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

  /* TreeView messages */

  if (kendo.ui.TreeView) {
    kendo.ui.TreeView.prototype.options.messages =
      $.extend(true, kendo.ui.TreeView.prototype.options.messages, {
        "loading": "A carregar...",
        "requestFailed": "O pedido falhou.",
        "retry": "Repetir"
      });
  }

  /* Upload messages */

  if (kendo.ui.Upload) {
    kendo.ui.Upload.prototype.options.localization =
      $.extend(true, kendo.ui.Upload.prototype.options.localization, {
        "select": "Selecionar ficheiros...",
        "cancel": "Cancelar",
        "retry": "Repetir",
        "remove": "Remover",
        "clearSelectedFiles": "Clear",
        "uploadSelectedFiles": "Submeter ficheiros",
        "dropFilesHere": "largue ficheiros aqui para submeter",
        "statusUploading": "a enviar",
        "statusUploaded": "submetido",
        "statusWarning": "aviso",
        "statusFailed": "falhou",
        "headerStatusPaused": "Paused",
        "headerStatusUploading": "Enviando...",
        "headerStatusUploaded": "Feito",
        "uploadSuccess": "Ficheiro(s) carregado com sucesso.",
        "uploadFail": "Ficheiro(s) falhou o carregamento.",
        "invalidMaxFileSize": "Ficheiro demasiado grande.",
        "invalidMinFileSize": "Ficheiro demasiado pequeno.",
        "invalidFileExtension": "Tipo de ficheiro não permitido."
      });
  }

  /* Validator messages */

  if (kendo.ui.Validator) {
    kendo.ui.Validator.prototype.options.messages =
      $.extend(true, kendo.ui.Validator.prototype.options.messages, {
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
        loading: "A carregar..."
      });
  }

  /* Dialog */

  if (kendo.ui.Dialog) {
    kendo.ui.Dialog.prototype.options.messages =
      $.extend(true, kendo.ui.Dialog.prototype.options.localization, {
        "close": "Fechar"
      });
  }

    /* TimePicker */

  if (kendo.ui.TimePicker) {
    kendo.ui.TimePicker.prototype.options.messages =
      $.extend(true, kendo.ui.TimePicker.prototype.options.messages, {
        set: "Definir",
        cancel: "Cancelar",
        hour: "hora",
        minute: "minuto",
        second: "segundo",
        millisecond: "milisegundo",
        now: "Agora"
      });
  }

  /* DateTimePicker */

  if (kendo.ui.DateTimePicker) {
    kendo.ui.DateTimePicker.prototype.options.messages =
      $.extend(true, kendo.ui.DateTimePicker.prototype.options.messages, {
        set: "Definir",
        cancel: "Cancelar",
        hour: "hora",
        minute: "minuto",
        second: "segundo",
        millisecond: "milisegundo",
        now: "Agora",
        date: "Data",
        time: "Tempo",
        today: "Hoje",
        weekColumnHeader: ""
      });
  }

  /* Calendar */
  if (kendo.ui.Calendar) {
    kendo.ui.Calendar.prototype.options.messages =
      $.extend(true, kendo.ui.Calendar.prototype.options.messages, {
        "today": "Hoje",
        "weekColumnHeader": "",
        "navigateTo": "Navegar para ",
        "parentViews": {
          "month": "vista ano",
          "year": "vista década",
          "decade": "vista século"
        }
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
        "noData": "Nenhum registo encontrado."
      });
  }

  /* DropDownList messages */

  if (kendo.ui.DropDownList) {
    kendo.ui.DropDownList.prototype.options.messages =
      $.extend(true, kendo.ui.DropDownList.prototype.options.messages, kendo.ui.List.prototype.options.messages);
  }

  /* ComboBox messages */

  if (kendo.ui.ComboBox) {
    kendo.ui.ComboBox.prototype.options.messages =
      $.extend(true, kendo.ui.ComboBox.prototype.options.messages, kendo.ui.List.prototype.options.messages);
  }

  /* AutoComplete messages */

  if (kendo.ui.AutoComplete) {
    kendo.ui.AutoComplete.prototype.options.messages =
      $.extend(true, kendo.ui.AutoComplete.prototype.options.messages, kendo.ui.List.prototype.options.messages);
  }

  /* MultiColumnComboBox messages */

  if (kendo.ui.MultiColumnComboBox) {
    kendo.ui.MultiColumnComboBox.prototype.options.messages =
      $.extend(true, kendo.ui.MultiColumnComboBox.prototype.options.messages, kendo.ui.List.prototype.options.messages);
  }

  /* DropDownTree messages */

  if (kendo.ui.DropDownTree) {
    kendo.ui.DropDownTree.prototype.options.messages =
      $.extend(true, kendo.ui.DropDownTree.prototype.options.messages, {
        "singleTag": "iten(s) selecionado",
        "clear": "limpar",
        "deleteTag": "apagar",
        "noData": "Nenhum registo encontrado."
      });
  }

  /* MultiSelect messages */

  if (kendo.ui.MultiSelect) {
    kendo.ui.MultiSelect.prototype.options.messages =
      $.extend(true, kendo.ui.MultiSelect.prototype.options.messages, {
        "singleTag": "iten(s) selecionado",
        "clear": "limpar",
        "deleteTag": "apagar",
        "noData": "Nenhum registo encontrado.",
        "downArrow": "Escolher"
      });
  }

  /* Chat messages */

  if (kendo.ui.Chat) {
    kendo.ui.Chat.prototype.options.messages =
      $.extend(true, kendo.ui.Chat.prototype.options.messages, {
        "messageListLabel": "Lista mensagens",
        "placeholder": "Escreva uma mensagem...",
        "toggleButton": "Troque barra de tarefas",
        "sendButton": "Enviar mensagem"
      });
  }

  /* Wizard messages */

  if (kendo.ui.Wizard) {
    kendo.ui.Wizard.prototype.options.messages =
      $.extend(true, kendo.ui.Wizard.prototype.options.messages, {
        "reset": "Repor",
        "previous": "Anterior",
        "next": "Seguinte",
        "done": "Feito",
        "step": "Passo",
        "of": "de"
      });
  }

  /* PDFViewer messages */

  if (kendo.ui.PDFViewer) {
    kendo.ui.PDFViewer.prototype.options.messages =
      $.extend(true, kendo.ui.PDFViewer.prototype.options.messages, {
        defaultFileName: "Documento",
        toolbar: {
          zoom: {
            zoomLevel: "nível de zoom",
            zoomOut: "Reduzir zoom",
            zoomIn: "Aumentar zoom",
            actualWidth: "Largura atual",
            autoWidth: "Largura automátiva",
            fitToWidth: "Ajustar à largura",
            fitToPage: "Ajustar à página"
          },
          open: "Abrir",
          exportAs: "Exportar",
          download: "Descarregar",
          pager: {
            first: "Ir para a primeira página",
            previous: "Ir para a página anterior",
            next: "Ir para a página seguinte",
            last: "Ir para a última página",
            of: "de",
            page: "página",
            pages: "páginas"
          },
          print: "Imprimir",
          toggleSelection: "Ativar seleção",
          togglePan: "Ativar panorámica",
          search: "Pesquisar"
        },
        errorMessages: {
          notSupported: "Apenas são permitidos ficheiros PDF.",
          parseError: "Ficheiro PDF falhou o processamento.",
          notFound: "Ficheiro não encontrado.",
          popupBlocked: "Janela de pop-up bloqueada."
        },
        dialogs: {
          exportAsDialog: {
            title: "Exportar...",
            defaultFileName: "Documento",
            pdf: "Portable Document Format (.pdf)",
            png: "Portable Network Graphics (.png)",
            svg: "Scalable Vector Graphics (.svg)",
            labels: {
              fileName: "Nome do ficheiro",
              saveAsType: "Guardar como",
              page: "Página"
            }
          },
          okText: "OK",
          save: "Guardar",
          cancel: "Cancelar",
          search: {
            inputLabel: "Pesquisar texto",
            matchCase: "Match Case",
            next: "Próxima correspondência",
            previous: "Correspondência anterior",
            close: "Fechar",
            of: "de",
            dragHandle: "Arrastar pesquisa"
          }
        }
      });
  }

  /* Captcha messages */

  if (kendo.ui.Captcha) {
    kendo.ui.Captcha.prototype.options.messages =
      $.extend(true, kendo.ui.Captcha.prototype.options.messages, {
        "reset": "Repor captcha",
        "audio": "Ler captcha",
        "imageAlt": "Digite o código Captcha da imagem",
        "success": "Verificação bem-sucedida"
      });
  }

  /* OrgChart messages */

  if (kendo.ui.OrgChart) {
    kendo.ui.OrgChart.prototype.options.messages =
      $.extend(true, kendo.ui.OrgChart.prototype.options.messages, {
        label: "Gráfico organizacional",
        edit: "Editar",
        create: "Criar",
        destroy: "Apagar",
        destroyContent: "Tem a certeza que quer apagar este iten e todos os filhos?",
        destroyTitle: "Apagar iten",
        cancel: "Cancelar",
        save: "Guardar",
        menuLabel: "Menú editar",
        uploadAvatar: "Carregar novo avatar",
        parent: "Pai",
        name: "Nome",
        title: "Título",
        none: "--Nenhum--",
        expand: "expandir",
        collapse: "colapsar"
      });
  }

  /* Map messages */

  if (kendo.dataviz.ui.Map) {
    kendo.dataviz.ui.Map.prototype.options.messages =
      $.extend(true, kendo.dataviz.ui.Map.prototype.options.messages, {
        "tileTitle": "Título mapa"
      });
  }

})(window.kendo.jQuery);

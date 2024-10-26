function initializeSelectize(selectElementId, options, formControl, Callback = null) {
  const selectElement = document.getElementById(selectElementId);
  if (!selectElement) return null;
  if (selectElement.selectize) {
    selectElement.selectize.destroy();
  }
  $(selectElement).selectize({
    options: options,
    labelField: 'name',
    valueField: 'value',
    searchField: ['name'],
    sortField: 'name',
    onInitialize: function () {
      selectizeStyles(this);
    },
    onChange: (value) => {
      formControl.setValue(value);
      if (Callback) {
        Callback(value);
      }
    }
  });
}

function initializeMultipleSelectize(selectElementId, options, formControl) {
  $('#' + selectElementId).selectize({
    maxItems: null,
    valueField: 'id',
    labelField: 'title',
    searchField: 'title',
    options: options,
    create: false,
    onInitialize: function () {
      selectizeStyles(this);
    },
    onChange: (value) => formControl.setValue(value)
  });
}

function selectizeStyles(selectize) {
  const selectizeInput = selectize.$control;
  const selectizeDropdown = selectize.$dropdown;

  selectizeInput.css({
    'font-size': '16px',
    'font-weight': '400',
    'padding': '10px',
    'border-radius': '4px',
    'border': '1px solid #ccc',
    'background-color': '#fff',
    'color': '#333'
  });

  selectizeDropdown.css({
    'font-size': '16px',
    'border': '1px solid #ccc',
    'background-color': '#fff',
    'color': '#333'
  });
}


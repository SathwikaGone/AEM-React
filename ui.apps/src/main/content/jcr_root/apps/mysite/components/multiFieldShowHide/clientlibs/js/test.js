(function (document, $) {
  'use strict';

  // when dialog gets injected
  $(document).on('foundation-contentloaded', function (e) {
    // if there is already an inital value make sure the
    //according target element becomes visible
    console.log('e.target', e.target);
    showHideHandler($('.cq-dialog-dropdown-showhide1', e.target));
  });

  $(document).on('change', '.cq-dialog-dropdown-showhide1', function (e) {
    console.log('this', this);
    showHideHandler($(this));
  });

  function showHideHandler(el) {
    el.each(function (i, element) {
      // handle Coral3 base drop-down
      Coral.commons.ready(element, function (component) {
        showHideCustom(component, element);
        component.on('change', function () {
          showHideCustom(component, element);
        });
      });
    });
  }

  function showHideCustom(component, element) {
    // get the selector to find the target elements.
    //its stored as data-.. attribute
    var target = $(element).data('cq-dialog-dropdown-showhide-target1');
    var $target = $(target);
    var elementIndex = $(element).closest('coral-multifield-item').index();

    console.log('target', target, 'element index', elementIndex);

    if (target) {
      var value;
      if (component.value) {
        console.log('component value', component.value);
        value = component.value;
      } else {
        console.log('component getValue', component.getValue());
        value = component.getValue();
      }
      $(element)
        .closest('coral-multifield-item')
        .find(target)
        .each(function (index) {
          var tarIndex = $(this).closest('coral-multifield-item').index();
          console.log(
            'target Index, elemenet index, this',
            tarIndex,
            elementIndex,
            this,
          );
          if (elementIndex == tarIndex) {
            $(this).not('.hide').parent().addClass('hide');
            $(this)
              .filter("[data-showhidetargetvalue='" + value + "']")
              .parent()
              .removeClass('hide');
            console.log('this after', this);
          }
        });
    }
  }
})(document, Granite.$);

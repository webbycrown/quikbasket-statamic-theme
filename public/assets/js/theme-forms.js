(function ($) {
  $(document).on('submit', '.js-theme-form', function (e) {
    e.preventDefault();
    var $form = $(this);
    var $alert = $form.find('.stay-connect-alert');
    var $ok = $form.find('.stay-connect-success');
    $alert.removeClass('is-visible').empty();
    $ok.removeClass('is-visible');
    $form.addClass('is-loading');
    $.ajax({
      url: $form.attr('action'),
      method: 'POST',
      data: $form.serialize(),
      headers: { 'X-Requested-With': 'XMLHttpRequest', Accept: 'application/json' }
    }).done(function () {
      $ok.addClass('is-visible');
      $form[0].reset();
    }).fail(function (xhr) {
      var msg = 'Please check the form and try again.';
      if (xhr.responseJSON && xhr.responseJSON.errors) {
        msg = Object.values(xhr.responseJSON.errors).flat().join(' ');
      }
      $alert.text(msg).addClass('is-visible');
    }).always(function () {
      $form.removeClass('is-loading');
    });
  });
})(jQuery);

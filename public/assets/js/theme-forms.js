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
      if ($form.hasClass('js-popup-news')) {
        localStorage.setItem('quikbasket_newsletter', 'yes');
        var modal = document.getElementById('popupModal');
        if (modal) {
          modal.style.display = 'none';
        }
        return;
      }
      $ok.addClass('is-visible');
      $form[0].reset();
      if ($form.find('input[name="clear_cart"]').val() === '1') {
        $('.js-cart-row').remove();
        $('.js-cart-subtotal, .js-cart-total').text('$0.00');
      }
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

  function shopNote(text) {
    var note = document.getElementById('shop-note');
    if (!note) return;
    note.textContent = text;
    note.classList.add('is-visible');
    window.clearTimeout(shopNote.timer);
    shopNote.timer = window.setTimeout(function () {
      note.classList.remove('is-visible');
    }, 2400);
  }

  function markSaved(lists) {
    $('.js-shop-toggle').each(function () {
      var id = String($(this).data('id'));
      var list = $(this).data('list') === 'wish' ? lists.wish : lists.cart;
      var on = (list || []).indexOf(id) !== -1;
      $(this).toggleClass('is-saved', on).attr('aria-pressed', on ? 'true' : 'false');
    });
  }

  $.getJSON('/shop/saved').done(markSaved);

  $(document).on('click', '.js-shop-toggle', function (e) {
    e.preventDefault();
    var $btn = $(this);
    var list = $btn.data('list');
    $.ajax({
      url: '/shop/saved',
      method: 'POST',
      data: {
        id: $btn.data('id'),
        list: list,
        _token: $('meta[name="csrf-token"]').attr('content')
      },
      headers: { 'X-Requested-With': 'XMLHttpRequest', Accept: 'application/json' }
    }).done(function (res) {
      markSaved(res);
      var name = list === 'wish' ? 'wishlist' : 'cart';
      shopNote(res.added ? 'Added to the ' + name + '. Nothing is charged.' : 'Removed from the ' + name + '.');
    }).fail(function () {
      shopNote('That product could not be saved.');
    });
  });

  function cartMoney(amount) {
    return '$' + amount.toFixed(2);
  }

  function cartToken() {
    return $('meta[name="csrf-token"]').attr('content');
  }

  function refreshCartTotals() {
    var sum = 0;
    $('.js-cart-row').each(function () {
      var qty = Math.max(1, parseInt($(this).find('.js-cart-qty').val(), 10) || 1);
      $(this).find('.js-cart-qty').val(qty);
      var line = parseFloat($(this).data('price')) * qty;
      $(this).find('.js-line-total').text(cartMoney(line));
      sum += line;
    });
    var ship = 0;
    var selected = $('.js-shipping:checked');
    if (selected.length) {
      ship = parseFloat(selected.data('price')) || 0;
    }
    $('.js-cart-subtotal').text(cartMoney(sum));
    $('.js-cart-total').text(cartMoney(sum + ship));
  }

  $(document).on('change', '.js-shipping', refreshCartTotals);

  $(document).on('click', '.js-cart-row [data-action]', function () {
    var row = $(this).closest('.js-cart-row');
    window.setTimeout(function () {
      refreshCartTotals();
      $.ajax({
        url: '/shop/cart/qty',
        method: 'POST',
        data: {
          id: row.data('id'),
          qty: row.find('.js-cart-qty').val(),
          _token: cartToken()
        },
        headers: { 'X-Requested-With': 'XMLHttpRequest', Accept: 'application/json' }
      });
    }, 0);
  });

  $(document).on('click', '.js-cart-remove', function () {
    var row = $(this).closest('.js-cart-row');
    $.ajax({
      url: '/shop/saved',
      method: 'POST',
      data: { id: row.data('id'), list: 'cart', _token: cartToken() },
      headers: { 'X-Requested-With': 'XMLHttpRequest', Accept: 'application/json' }
    }).done(function () {
      row.remove();
      if (!$('.js-cart-row').length) {
        window.location.reload();
        return;
      }
      refreshCartTotals();
      shopNote('Removed from the cart.');
    });
  });

  $(document).on('click', '.js-wish-cart', function (e) {
    e.preventDefault();
    var id = $(this).data('id');
    $.ajax({
      url: '/shop/saved',
      method: 'POST',
      data: { id: id, list: 'cart', mode: 'add', _token: cartToken() },
      headers: { 'X-Requested-With': 'XMLHttpRequest', Accept: 'application/json' }
    }).done(function (res) {
      markSaved(res);
      shopNote('Added to the cart. Nothing is charged.');
    }).fail(function () {
      shopNote('That product could not be saved.');
    });
  });

  $(document).on('click', '.js-wish-remove', function () {
    var row = $(this).closest('.js-wish-row');
    $.ajax({
      url: '/shop/saved',
      method: 'POST',
      data: { id: row.data('id'), list: 'wish', _token: cartToken() },
      headers: { 'X-Requested-With': 'XMLHttpRequest', Accept: 'application/json' }
    }).done(function () {
      row.remove();
      if (!$('.js-wish-row').length) {
        window.location.reload();
        return;
      }
      shopNote('Removed from the wishlist.');
    });
  });

  $(document).on('mouseenter focusin', '.js-reel', function () {
    var video = this.querySelector('video');
    if (video) {
      video.play();
    }
  });

  $(document).on('mouseleave', '.js-reel', function () {
    var video = this.querySelector('video');
    if (video) {
      video.pause();
    }
  });
})(jQuery);

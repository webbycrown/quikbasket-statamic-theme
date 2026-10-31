(function ($) {
  function fillIfEmpty($el, value) {
    if (!$el.length || value == null || value === '') {
      return;
    }
    if (String($el.val() || '').trim() === '') {
      $el.val(value);
    }
  }

  function splitName(full) {
    var parts = String(full || '').trim().split(/\s+/).filter(Boolean);
    if (!parts.length) {
      return { first: '', last: '' };
    }
    if (parts.length === 1) {
      return { first: parts[0], last: '' };
    }
    return { first: parts[0], last: parts.slice(1).join(' ') };
  }

  function readProfileAddresses(email) {
    var keys = [];
    if (email) {
      keys.push('qb_account_addr_' + email);
    }
    keys.push('qb_account_addr_guest');
    for (var i = 0; i < keys.length; i++) {
      try {
        var raw = localStorage.getItem(keys[i]);
        if (!raw) {
          continue;
        }
        var data = JSON.parse(raw);
        if (data && (data.billing || data.shipping)) {
          return data;
        }
      } catch (err) {}
    }
    return null;
  }

  function applyAddressToBilling($form, addr, profileName) {
    if (!addr) {
      return;
    }
    var names = splitName(addr.line1 || profileName || '');
    fillIfEmpty($form.find('#checkout-first'), names.first);
    fillIfEmpty($form.find('#checkout-last'), names.last);
    fillIfEmpty($form.find('#checkout-address'), addr.line2 || addr.line1 || '');
    if (addr.line2) {
      fillIfEmpty($form.find('#checkout-address'), addr.line2);
    }
    fillIfEmpty($form.find('#checkout-city'), addr.city || '');
    fillIfEmpty($form.find('#checkout-state'), addr.state || '');
    fillIfEmpty($form.find('#checkout-pincode'), addr.pincode || '');
    fillIfEmpty($form.find('#checkout-country'), addr.country || '');
    fillIfEmpty($form.find('#checkout-dial'), addr.dial || '+1');
    fillIfEmpty($form.find('#checkout-phone'), addr.phone || '');
  }

  function applyAddressToShipping($form, addr) {
    if (!addr) {
      return;
    }
    fillIfEmpty($form.find('#ship-address'), addr.line2 || addr.line1 || '');
    fillIfEmpty($form.find('#ship-city'), addr.city || '');
    fillIfEmpty($form.find('#ship-state'), addr.state || '');
    fillIfEmpty($form.find('#ship-pincode'), addr.pincode || '');
    fillIfEmpty($form.find('#ship-country'), addr.country || '');
  }

  function bootCheckoutForm($form) {
    var userName = $form.attr('data-user-name') || '';
    var userEmail = $form.attr('data-user-email') || '';
    var userFirst = $form.attr('data-user-first') || '';
    var userLast = $form.attr('data-user-last') || '';
    fillIfEmpty($form.find('#checkout-email'), userEmail);
    if (userFirst || userLast) {
      fillIfEmpty($form.find('#checkout-first'), userFirst);
      fillIfEmpty($form.find('#checkout-last'), userLast);
    } else {
      var names = splitName(userName);
      fillIfEmpty($form.find('#checkout-first'), names.first);
      fillIfEmpty($form.find('#checkout-last'), names.last);
    }
    $form.find('#checkout-name').val(
      $.trim(($form.find('#checkout-first').val() || '') + ' ' + ($form.find('#checkout-last').val() || ''))
    );

    var profile = readProfileAddresses(userEmail);
    if (profile) {
      applyAddressToBilling($form, profile.billing, userName || (userFirst + ' ' + userLast));
      var billingSame =
        profile.shipping &&
        profile.billing &&
        JSON.stringify(profile.shipping) === JSON.stringify(profile.billing);
      if (profile.shipping && !billingSame && (profile.shipping.line1 || profile.shipping.line2 || profile.shipping.city)) {
        $form.find('.js-ship-different').prop('checked', true).trigger('change');
        applyAddressToShipping($form, profile.shipping);
      }
    }
  }

  $(document).on('change', '.js-ship-different', function () {
    var on = $(this).is(':checked');
    var $form = $(this).closest('form');
    $form.find('.js-shipping-details').toggleClass('hidden', !on);
    $form.find('#checkout-ship-different').val(on ? '1' : '0');
    $form.find('.js-ship-req').prop('required', on);
    if (!on) {
      clearFieldErrors($form.find('.js-shipping-details'));
    }
  });

  function fieldErrorBox($input) {
    return $input.closest('.grid, .js-checkout-terms-wrap').find('.js-field-error').first();
  }

  function clearFieldErrors($scope) {
    $scope.find('.js-field-error').removeClass('is-visible').prop('hidden', true).text('');
    $scope.find('.is-invalid').removeClass('is-invalid');
    $scope.find('.js-checkout-terms-wrap').removeClass('is-invalid');
  }

  function showFieldError($input, message) {
    $input.addClass('is-invalid');
    var $err = fieldErrorBox($input);
    if ($err.length) {
      $err.text(message).addClass('is-visible').prop('hidden', false);
    }
  }

  function validateCheckoutForm($form) {
    clearFieldErrors($form);
    var ok = true;
    var firstBad = null;

    function requireFilled($input, label) {
      var val = String($input.val() || '').trim();
      if (!val) {
        showFieldError($input, (label || 'This field') + ' is required.');
        ok = false;
        if (!firstBad) firstBad = $input;
        return false;
      }
      return true;
    }

    $form.find('.js-req-field').each(function () {
      var $input = $(this);
      var label = $input.data('error-label') || 'This field';
      if (!requireFilled($input, label)) {
        return;
      }
      if ($input.attr('type') === 'email') {
        var email = String($input.val() || '').trim();
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
          showFieldError($input, 'Enter a valid email address.');
          ok = false;
          if (!firstBad) firstBad = $input;
        }
      }
    });

    if ($form.find('.js-ship-different').is(':checked')) {
      $form.find('.js-ship-req').each(function () {
        var $input = $(this);
        requireFilled($input, $input.data('error-label') || 'This field');
      });
    }

    var $terms = $form.find('.js-checkout-terms');
    if ($terms.length && !$terms.is(':checked')) {
      $terms.addClass('is-invalid');
      $form.find('.js-checkout-terms-wrap').addClass('is-invalid');
      var $terr = $form.find('.js-terms-error');
      $terr.text('Please agree to the terms and privacy policy.').addClass('is-visible').prop('hidden', false);
      ok = false;
      if (!firstBad) firstBad = $terms;
    }

    focusCheckoutError($form, firstBad);
    return ok;
  }

  function focusCheckoutError($form, $field) {
    if (!$field || !$field.length) {
      return;
    }
    var el = $field.get(0);
    try {
      el.scrollIntoView({ behavior: 'smooth', block: 'center' });
    } catch (err) {
      $('html, body').animate({ scrollTop: Math.max(0, $field.offset().top - 140) }, 200);
    }
    window.setTimeout(function () {
      try {
        el.focus({ preventScroll: true });
      } catch (err2) {
        $field.trigger('focus');
      }
      if ($form && $form.length) {
        $form.find('.stay-connect-alert').addClass('is-visible');
      }
    }, 220);
  }

  function applyServerFieldErrors($form, errors) {
    clearFieldErrors($form);
    var firstBad = null;
    $.each(errors || {}, function (field, messages) {
      var msg = Array.isArray(messages) ? messages[0] : messages;
      var $input = $form.find('[name="' + field + '"]').first();
      if (!$input.length && field === 'terms_agree') {
        $input = $form.find('.js-checkout-terms');
      }
      if ($input.length) {
        showFieldError($input, msg);
        if (field === 'terms_agree' || $input.hasClass('js-checkout-terms')) {
          $form.find('.js-checkout-terms-wrap').addClass('is-invalid');
          $form.find('.js-terms-error').text(msg).addClass('is-visible').prop('hidden', false);
        }
        if (!firstBad) firstBad = $input;
      }
    });
    focusCheckoutError($form, firstBad);
  }

  $(function () {
    var $checkout = $('.js-checkout-form');
    if ($checkout.length) {
      bootCheckoutForm($checkout);
    }
  });

  $(document).on('input change', '.js-checkout-form .js-req-field, .js-checkout-form .js-ship-req, .js-checkout-form .js-checkout-terms', function () {
    var $input = $(this);
    if (String($input.val() || '').trim() !== '' || ($input.is(':checkbox') && $input.is(':checked'))) {
      $input.removeClass('is-invalid');
      fieldErrorBox($input).removeClass('is-visible').prop('hidden', true).text('');
      if ($input.hasClass('js-checkout-terms')) {
        $input.closest('.js-checkout-terms-wrap').removeClass('is-invalid');
        $input.closest('form').find('.js-terms-error').removeClass('is-visible').prop('hidden', true).text('');
      }
    }
  });

  // Show / keep error when leaving an empty required field.
  $(document).on('blur', '.js-checkout-form .js-req-field, .js-checkout-form .js-ship-req', function () {
    var $input = $(this);
    if ($input.hasClass('js-ship-req') && !$input.closest('form').find('.js-ship-different').is(':checked')) {
      return;
    }
    var val = String($input.val() || '').trim();
    var label = $input.data('error-label') || 'This field';
    if (!val) {
      showFieldError($input, label + ' is required.');
      return;
    }
    if ($input.attr('type') === 'email' && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val)) {
      showFieldError($input, 'Enter a valid email address.');
    }
  });

  // Clicking Place inquiry / submit focuses the first missing required field.
  $(document).on('click', '.js-checkout-form button[type="submit"], .js-checkout-form input[type="submit"]', function (e) {
    var $form = $(this).closest('form');
    var first = String($form.find('#checkout-first').val() || '').trim();
    var last = String($form.find('#checkout-last').val() || '').trim();
    $form.find('#checkout-name').val($.trim(first + ' ' + last));
    $form.find('#checkout-ship-different').val($form.find('.js-ship-different').is(':checked') ? '1' : '0');
    if (!validateCheckoutForm($form)) {
      e.preventDefault();
      e.stopImmediatePropagation();
      $form.find('.stay-connect-alert').text('Please fill in the required fields highlighted below.').addClass('is-visible');
      return false;
    }
  });

  $(document).on('submit', '.js-theme-form', function (e) {
    e.preventDefault();
    var $form = $(this);
    var $alert = $form.find('.stay-connect-alert');
    var $ok = $form.find('.stay-connect-success');
    $alert.removeClass('is-visible').empty();
    $ok.removeClass('is-visible');

    if ($form.hasClass('js-checkout-form')) {
      var first = String($form.find('#checkout-first').val() || '').trim();
      var last = String($form.find('#checkout-last').val() || '').trim();
      $form.find('#checkout-name').val($.trim(first + ' ' + last));
      var shipOn = $form.find('.js-ship-different').is(':checked');
      $form.find('#checkout-ship-different').val(shipOn ? '1' : '0');
      if (!validateCheckoutForm($form)) {
        $alert.text('Please fill in the required fields highlighted below.').addClass('is-visible');
        return;
      }
    }

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
      if ($form.hasClass('js-checkout-form')) {
        window.location.href = '/order-received';
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
      var errors = xhr.responseJSON && xhr.responseJSON.errors ? xhr.responseJSON.errors : null;
      if (errors) {
        if ($form.hasClass('js-checkout-form')) {
          applyServerFieldErrors($form, errors);
          msg = 'Please fix the required fields highlighted below.';
        } else {
          msg = Object.values(errors).flat().join(' ');
        }
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
      shopNote(res.added
        ? (list === 'cart' ? 'Cart updated. Nothing is charged.' : 'Added to the wishlist. Nothing is charged.')
        : 'Removed from the ' + name + '.');
    }).fail(function () {
      shopNote('That product could not be saved.');
    });
  });

  function productMaxQty($root) {
    var $variant = $root.find('.js-product-variant:checked');
    if ($variant.length) {
      return Math.max(1, Math.min(99, parseInt($variant.data('qty'), 10) || 99));
    }
    return Math.max(1, Math.min(99, parseInt($root.data('max-qty'), 10) || 99));
  }

  function syncProductQty($root) {
    var $qty = $root.find('.js-product-qty');
    var max = productMaxQty($root);
    var val = Math.max(1, Math.min(max, parseInt($qty.val(), 10) || 1));
    $qty.attr('max', max).val(val);
    var $hint = $root.find('.js-product-qty-hint');
    if ($root.find('.js-product-variant').length) {
      $hint.text('You can add up to ' + max + ' for this option. Nothing is charged.').prop('hidden', false);
    } else {
      $hint.prop('hidden', true);
    }
    var $variant = $root.find('.js-product-variant:checked');
    var sku = ($variant.data('sku') || '').toString();
    if (sku) {
      $root.find('.js-product-sku').text('SKU: ' + sku);
    }
  }

  $(document).on('change', '.js-product-variant, .js-product-size, .js-product-color', function () {
    syncProductQty($(this).closest('.js-product-buy'));
  });

  $(document).on('change input', '.js-product-qty', function () {
    syncProductQty($(this).closest('.js-product-buy'));
  });

  $('.js-product-buy').each(function () {
    syncProductQty($(this));
  });

  $(document).on('click', '.js-product-add', function (e) {
    e.preventDefault();
    var $root = $(this).closest('.js-product-buy');
    var id = $root.data('id') || $(this).data('id');
    syncProductQty($root);
    var max = productMaxQty($root);
    var qty = Math.max(1, Math.min(max, parseInt($root.find('.js-product-qty').val(), 10) || 1));
    $root.find('.js-product-qty').val(qty);
    var $variant = $root.find('.js-product-variant:checked');
    var size = '';
    var color = '';
    if ($variant.length) {
      size = ($variant.data('size') || '').toString();
      color = ($variant.data('color') || '').toString();
    } else {
      size = ($root.find('.js-product-size:checked').val() || '').toString();
      color = ($root.find('.js-product-color:checked').val() || '').toString();
      if ($root.find('.js-product-size').length && !size) {
        shopNote('Choose a size.');
        return;
      }
      if ($root.find('.js-product-color').length && !color) {
        shopNote('Choose a color.');
        return;
      }
    }
    if ($root.find('.js-product-variant').length && !$variant.length) {
      shopNote('Choose an option.');
      return;
    }
    if (max < 1) {
      shopNote('That option is out of stock for this demo.');
      return;
    }
    $.ajax({
      url: '/shop/saved',
      method: 'POST',
      data: {
        id: id,
        list: 'cart',
        mode: 'add',
        qty: qty,
        size: size,
        color: color,
        _token: $('meta[name="csrf-token"]').attr('content')
      },
      headers: { 'X-Requested-With': 'XMLHttpRequest', Accept: 'application/json' }
    }).done(function (res) {
      markSaved(res);
      shopNote('Cart updated. Nothing is charged.');
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

  function couponDiscount(sum) {
    var box = $('.js-cart-summary');
    if (!box.length) {
      return 0;
    }
    var type = String(box.data('coupon-type') || '');
    var amount = parseFloat(box.data('coupon-amount')) || 0;
    if (!type || amount <= 0 || sum <= 0) {
      return 0;
    }
    if (type === 'fixed') {
      return Math.min(sum, amount);
    }
    return Math.round(sum * (Math.min(100, amount) / 100) * 100) / 100;
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
    var discount = couponDiscount(sum);
    var row = $('.js-coupon-row');
    if (discount > 0) {
      row.removeClass('hidden');
      $('.js-cart-discount').text('-' + cartMoney(discount));
    } else if (!$('.js-cart-summary').data('coupon-code')) {
      row.addClass('hidden');
      $('.js-cart-discount').text('-$0.00');
    }
    $('.js-cart-subtotal').text(cartMoney(sum));
    $('.js-cart-total').text(cartMoney(Math.max(0, sum - discount) + ship));
  }

  function applyCouponResponse(res) {
    var box = $('.js-cart-summary');
    var coupon = res.coupon || null;
    var totals = res.totals || {};
    if (coupon) {
      box.data('coupon-type', coupon.discount_type);
      box.data('coupon-amount', coupon.amount);
      box.data('coupon-code', coupon.code);
      $('.js-coupon-input').val(coupon.code);
      $('.js-coupon-label').text('(' + (coupon.label || coupon.code) + ')');
      $('.js-coupon-row').removeClass('hidden');
    } else {
      box.data('coupon-type', '');
      box.data('coupon-amount', 0);
      box.data('coupon-code', '');
      $('.js-coupon-input').val('');
      $('.js-coupon-label').text('');
      $('.js-coupon-row').addClass('hidden');
    }
    if (totals.cart_subtotal) {
      $('.js-cart-subtotal').text('$' + totals.cart_subtotal);
    }
    if (totals.cart_discount) {
      $('.js-cart-discount').text('-$' + totals.cart_discount);
    }
    if (totals.cart_total) {
      $('.js-cart-total').text('$' + totals.cart_total);
    } else {
      refreshCartTotals();
    }
  }

  $(document).on('change', '.js-shipping', refreshCartTotals);

  $(document).on('submit', '.js-coupon-form', function (e) {
    e.preventDefault();
    var $form = $(this);
    var $msg = $('.js-coupon-msg');
    $msg.text('');
    $.ajax({
      url: '/shop/cart/coupon',
      method: 'POST',
      data: {
        code: $form.find('[name="code"]').val(),
        action: 'apply',
        _token: cartToken()
      },
      headers: { 'X-Requested-With': 'XMLHttpRequest', Accept: 'application/json' }
    }).done(function (res) {
      applyCouponResponse(res);
      $msg.text('Coupon applied. Nothing is charged — totals are for this visit only.');
    }).fail(function (xhr) {
      var msg = 'That coupon code is not valid.';
      if (xhr.responseJSON && xhr.responseJSON.message) {
        msg = xhr.responseJSON.message;
      }
      $msg.text(msg);
    });
  });

  $(document).on('click', '.js-coupon-remove', function () {
    $.ajax({
      url: '/shop/cart/coupon',
      method: 'POST',
      data: { action: 'remove', _token: cartToken() },
      headers: { 'X-Requested-With': 'XMLHttpRequest', Accept: 'application/json' }
    }).done(function (res) {
      applyCouponResponse(res);
      $('.js-coupon-msg').text('Coupon removed.');
    });
  });

  $(document).on('click', '.js-update-cart', function (e) {
    e.preventDefault();
    var $btn = $(this);
    var $spin = $('#cart-spinner');
    $spin.removeClass('hidden');
    var requests = [];
    $('.js-cart-row').each(function () {
      var row = $(this);
      requests.push($.ajax({
        url: '/shop/cart/qty',
        method: 'POST',
        data: {
          id: row.data('id'),
          qty: row.find('.js-cart-qty').val(),
          _token: cartToken()
        },
        headers: { 'X-Requested-With': 'XMLHttpRequest', Accept: 'application/json' }
      }));
    });
    $.when.apply($, requests).always(function () {
      $spin.addClass('hidden');
      refreshCartTotals();
      shopNote('Cart updated. Nothing is charged.');
    });
  });

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
      shopNote('Cart updated. Nothing is charged.');
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

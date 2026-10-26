# Quikbasket — Statamic Starter Kit

Quikbasket is a multi-department shop starter kit. Marketing pages use one Page template and Theme sections. Products, journal posts, and categories are collections and a taxonomy the Control Panel edits.

Shoppers send one inquiry from the contact page or checkout. Nothing is charged and no card is taken. The kit has a single form, so Statamic Pro is not required.

Sign in and sign up use Statamic users. The password is hashed. A new account does not get Control Panel access. Forgot password emails a reset link when the site mail is configured.

## Design examples

The account page shows the signed-in name and email. Orders, the empty cart, and compare are layout samples. Nothing is saved there.

The heart and bag icons on a product save that product in the browser session and show it on /wishlist or /cart. Nothing is charged. The list lasts for the visit.

- /account/orders
- /cart
- /cart/empty
- /wishlist
- /compare

## After install

Register the kit provider once after install (do not replace AppServiceProvider):

```php
// bootstrap/providers.php
App\Providers\QuikbasketServiceProvider::class,
```

## Pages

| Page | URL | What you edit |
|---|---|---|
| Home | / | Theme sections for the hero, categories, about, products, video, trending, quotes, sale, service notes, and photos |
| Home two to seven | /home-two through /home-seven | Each page is its own stack of Theme sections. Product rows use the Products collection. Journal rows use the Journal collection. |
| Shop | /shop | Products collection. Grid or catalog from the Shop layout field. |
| Category | /categories/tops and the other category terms | Categories taxonomy. The New Arrivals menu lists these terms. |
| Product | /products/cotton-sweater | Gallery, short text, price, and related products on the product |
| Checkout | /checkout | Inquiry only. No card fields. |
| Inquiry received | /order-received | Confirmation after the inquiry is saved |
| Journal | /blog | Journal collection. Read more label is the Journal section field. |
| Journal detail | /blog/studio-note | Title, image, and body on the journal entry |
| About | /about | Heading, image, and body |
| Contact | /contact | Heading, text, and the inquiry form. Phone, email, and address come from Setting. |
| FAQ | /faq | Heading and question and answer rows. Toggles are buttons. |
| Privacy | /privacy | Heading and body |
| Terms | /terms | Heading and body |
| Sign in | /login, /register, /forgot-password, /reset-password | Statamic user account |
| Missing page | any unknown URL | 404 |

## Globals

Setting holds the site name, logo, favicon, phone, email, address, map URL, copyright, social URLs, inquiry button, inquiry success sentence, cart shipping options, and the footer, popup, and cookie sentences. The shipping price is added to the cart total on screen. Nothing is charged.

The Instagram photo rows on Home, Home three, and Home six stay as those pictures until Setting has an access token for a professional Instagram account. With that token, those rows play the account reels and link to each reel. A Facebook Page connection can also set the user id on that same Setting section. Leave the token blank to keep the photos.

Menus: header, footer, utility (Order tracking and Help), and the footer columns for services, provided, resources, support, general, and helpful. Edit the labels in the Control Panel navigation trees.

## Collections

- Products
- Journal
- Pages

Categories is a taxonomy on Products.

Third-party scripts, the font licence, and the photograph note are listed in THIRD_PARTY.md.

## Support

Questions and issues: [github.com/webbycrown/quikbasket-statamic-theme/issues](https://github.com/webbycrown/quikbasket-statamic-theme/issues) or [WebbyCrown](https://www.webbycrown.com/custom-statamic-development-services-company/).

## Changelog

### Unreleased

- Product photographs are original stills made for Quikbasket. The stock demo video is not included.
- A checkout inquiry empties the session cart after it is saved. The contact form does not.

# Quikbasket — Statamic Starter Kit

Quikbasket is a multi-department shop starter kit. Marketing pages use one Page template and Theme sections. Products, journal posts, and categories are collections and a taxonomy the Control Panel edits.

Shoppers send one inquiry from the contact page or checkout. Nothing is charged and no card is taken. The kit has a single form, so Statamic Pro is not required.

Sign-in, register, forgot password, and reset password do not collect a password and do not sign anyone in.

## Design examples

These screens are layout samples. Nothing is saved:

- /account
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
| Home two to seven | /home-two through /home-seven | Layout examples that reuse Products and Journal. They are not in the header menu. |
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
| Sign in | /login, /register, /forgot-password, /reset-password | Design notice. No password. |
| Missing page | any unknown URL | 404 |

## Globals

Setting holds the site name, logo, favicon, phone, email, address, map URL, copyright, social URLs, inquiry button, inquiry success sentence, and the footer, popup, and cookie sentences.

Menus: header, footer, utility (Order tracking and Help), and the footer columns for services, provided, resources, support, general, and helpful. Edit the labels in the Control Panel navigation trees.

## Collections

- Products
- Journal
- Pages

Categories is a taxonomy on Products.

Third-party scripts, the font licence, and the photograph note are listed in THIRD_PARTY.md.

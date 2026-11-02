# Quikbasket — Statamic Starter Kit

Quikbasket is a multi-department shop starter kit with nine catalogues: fashion, menswear, womenswear, kids, streetwear, jewellery, beauty, accessories, and homeware. One visual design; demo products and journal copy swap with a post-install catalogue setup. Marketing pages use one Page template and Theme sections. Products, journal posts, and categories are collections and a taxonomy the Control Panel edits.

## Live demo

[https://quickbasket-statmic.webbydemo.in](https://quickbasket-statmic.webbydemo.in)

Shoppers send an inquiry from the contact page or checkout. Journal posts take moderated comments. Nothing is charged and no card is taken. The kit ships two forms (inquiry and comment), so use **Statamic Pro** (Statamic Core includes one form).

Sign in and sign up use Statamic users. The password is hashed. A new account does not get Control Panel access. Forgot password emails a reset link when the site mail is configured.

## Account and shop session

Signed-in shoppers use `/account` like the HTML dashboard: Profile (name, email, password), Orders (sample inquiry rows — nothing is charged), Addresses (saved in the browser for that email), and Logout. `/account/orders` opens the Orders tab.

The heart and bag icons on a product save that product in the browser session and show it on /wishlist or /cart. Nothing is charged. The list lasts for the visit.

- /account
- /account/orders
- /cart
- /cart/empty
- /wishlist
- /compare

## Installation

Follow the [Starter Kit installation instructions](https://statamic.dev/starter-kits/installing-a-starter-kit).  
Requires **Statamic 5.x** (PHP 8.2+).

```bash
statamic new my-site webbycrown/quikbasket-statamic-theme

# or into an existing site
php please starter-kit:install webbycrown/quikbasket-statamic-theme
```

## After install — choose a catalogue

Starter-kit install is non-interactive. Run one command to apply a niche demo pack:

```bash
php please quikbasket:setup fashion
# or: menswear | womenswear | kids | streetwear | jewellery | beauty | accessories | homeware
```

This sets `Setting.industry`, replaces sample products (and matching journal titles), updates the home hero copy, and refreshes the Stache. If you skip it, the default pack is **fashion**.

The command asks before it deletes products and journal entries. Pass `--force` to skip that question:

```bash
php please quikbasket:setup jewellery --force
```

Register the kit provider once after install (do not replace AppServiceProvider):

```php
// bootstrap/providers.php
App\Providers\QuikbasketServiceProvider::class,
```

Then refresh the Stache:

```bash
php please stache:refresh
```

Header links use the **header_menu** navigation. Utility links (Order Tracking, Help) use **utility_menu**. Shop mega-menu links use **shop_menu**. Category mega menus also use the **Categories** taxonomy. Footer columns use the footer navigation trees.

`/cart`, `/checkout`, `/wishlist`, and account routes are registered by `QuikbasketServiceProvider` (session bag and inquiry checkout). They are not Control Panel pages.

Setting globals ship in both layouts: `data:` in `content/globals/setting.yaml` (Statamic 5) and `content/globals/default/setting.yaml` (Statamic 6). Catalogue packs live under `content/industries/` (nine niches). Changing the Setting → Catalogue select alone does not swap products — run `php please quikbasket:setup {slug}` for that.

## Pages

| Page | URL | What you edit |
|---|---|---|
| Home | / | Theme sections for the hero, categories, about, products, video, trending, quotes, sale, service notes, and photos |
| Home two to seven | /home-two through /home-seven | Each page is its own stack of Theme sections. Product rows use the Products collection. Journal rows use the Journal collection. |
| Shop | /shop | Products collection. Grid or catalog from the Shop layout field. |
| Category | /categories/tops and the other category terms | Categories taxonomy. The New Arrivals menu lists these terms. |
| Product | /products/cotton-sweater | Gallery, short text, price, and related products on the product |
| Checkout | /checkout | Cart summary plus inquiry (name, email, phone, address, notes). No card fields. Nothing is charged. |
| Inquiry received | /order-received | Confirmation with View Order and Download invoice |
| Inquiry / invoice | /order/{id} and /order/{id}/invoice | View the saved inquiry; invoice URL downloads a PDF directly |
| Journal | /blog | Journal collection. Read more label is the Journal section field. |
| Journal detail | /blog/studio-note | Title, image, body, and a comment form. New comments stay unpublished until an editor publishes them under Collections → Comments. |
| About | /about | Theme sections: story, why choose, video, team, reviews |
| Contact | /contact | Heading, text, and the inquiry form. Phone, email, and address come from Setting. |
| FAQ | /faq | Heading and question and answer rows. Toggles are buttons. |
| Privacy | /privacy | Heading and body |
| Terms | /terms | Heading and body |
| Sign in | /login, /register, /forgot-password, /reset-password | Statamic user account |
| Missing page | any unknown URL | 404 |

## Globals

Setting holds the site name, logo, light logo, footer logo, favicon, phone, email, address, map URL, copyright, social URLs, inquiry and comment button/success sentences, header promo text, footer column headings (including About / Following / Contact), footer photos, invoice PDF color (hex), demo coupons (SAVE10 / SAVE20 by default), cart shipping options, and the footer, popup, and cookie sentences. Coupon and shipping amounts only change the on-screen cart total. Nothing is charged.

The Instagram photo rows on Home, Home three, and Home six stay as those pictures until Setting has an access token for a professional Instagram account. With that token, those rows play the account reels and link to each reel. A Facebook Page connection can also set the user id on that same Setting section. Leave the token blank to keep the photos.

Menus: header, footer, utility (Order tracking and Help), and the footer columns for services, provided, resources, support, general, and helpful. Edit the labels in the Control Panel navigation trees.

## Collections

- Products
- Journal
- Comments (unpublished until an editor publishes; linked to a journal entry by ID)
- Pages

Categories is a taxonomy on Products.

Visitor comments on journal posts are rejected unless the linked entry is in the Journal (blogs) collection. The form stores that entry ID. New comments stay unpublished until an editor publishes them in the Control Panel.

Third-party scripts, the font licence, and the photograph note are listed in THIRD_PARTY.md.

## Support

Questions and issues: [github.com/webbycrown/quikbasket-statamic-theme/issues](https://github.com/webbycrown/quikbasket-statamic-theme/issues) or [WebbyCrown](https://www.webbycrown.com/custom-statamic-development-services-company/).

## Changelog

### v1.0.1

- Compatible with Statamic 5 and 6 (`statamic/cms: ^5.0 || ^6.0`)
- Setting globals ship in both the Statamic 5 `data:` layout and the Statamic 6 `content/globals/default/` layout
- README lists the live demo URL

### v1.0.0

- Header and shop menus use `nav:header_menu` and the Categories taxonomy instead of hard-coded paths.
- Popular journal posts and contact/shop/home links resolve from entries.
- Unused Font Awesome and duplicate Alpine (`cdn.min.js`) files are removed. `THIRD_PARTY.md` matches the scripts that ship.
- Product and lifestyle photographs are free Unsplash demo images (via Lorem Picsum). Details and licences are in THIRD_PARTY.md. The kit does not ship a demo video file.
- A checkout inquiry empties the session cart after it is saved. The contact form does not.
- Home pages use Theme sections. Installation notes are in the README.

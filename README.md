# Wish List site

Static site, no build step. Edit `wishlist.json` to change the list.

Each item: `name` (required), `price`, `priority` (high / medium / low, sorts the list), `link`, `image` (URL), `notes`.

Deploy: push this folder to a GitHub repo and import it in Vercel (Framework preset: Other), or run `npx vercel` inside the folder.
Note: opening index.html directly from disk won't load the JSON; use Vercel or `npx serve`.

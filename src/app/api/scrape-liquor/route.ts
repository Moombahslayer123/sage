import { NextResponse } from 'next/server';
import { db } from '@/lib/firebase-admin';

export const dynamic = 'force-dynamic';

const STORES = [
    {
        name: 'Tops',
        url: 'https://www.tops.co.za/specials',
        selectors: {
            container: '.product-item',
            product: '.product-name',
            price: '.price',
            deal: '.special-tag',
        },
    },
    {
        name: 'Pick n Pay Liquor',
        url: 'https://www.pnp.co.za/pnpstorefront/pnp/en/liquor/specials',
        selectors: {
            container: '.product-grid-item',
            product: '.product-title',
            price: '.product-price',
            deal: '.promotion-label',
        },
    },
    {
        name: 'Checkers Liquor',
        url: 'https://www.checkers.co.za/c-2256/liquor/all-departments',
        selectors: {
            container: '.product-card',
            product: '.item-name',
            price: '.now-price',
            deal: '.special-badge',
        },
    },
];

async function scrapeStore(store: typeof STORES[0], dbInstance: FirebaseFirestore.Firestore) {
    try {
        const response = await fetch(store.url, {
            headers: {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
            },
        });

        if (!response.ok) {
            throw new Error(`HTTP ${response.status} for ${store.name}`);
        }

        const html = await response.text();
        const products = parseHTML(html, store);

        const batch = dbInstance.batch();
        const now = new Date().toISOString();

        products.forEach((p) => {
            const docRef = dbInstance.collection('weekly_fuel').doc();
            batch.set(docRef, {
                store: store.name,
                product: p.product,
                price: p.price,
                deal: p.deal || null,
                expires: p.expires || null,
                last_updated: now,
            });
        });

        await batch.commit();
        return { store: store.name, count: products.length };
    } catch (error: any) {
        console.error(`[${store.name}] Scrape failed:`, error.message);
        return { store: store.name, error: error.message };
    }
}

function parseHTML(html: string, store: typeof STORES[0]) {
    const products: any[] = [];
    const regex = new RegExp(
        `<div[^>]*class="[^"]*${store.selectors.container.replace('.', '')}[^"]*"[^>]*>([\\s\\S]*?)</div>`,
        'g'
    );

    let match;
    while ((match = regex.exec(html)) !== null) {
        const block = match[1];

        const productMatch = block.match(new RegExp(`class="[^"]*${store.selectors.product.replace('.', '')}[^"]*"[^>]*>([^<]+)`));
        const priceMatch = block.match(new RegExp(`class="[^"]*${store.selectors.price.replace('.', '')}[^"]*"[^>]*>([^<]+)`));
        const dealMatch = block.match(new RegExp(`class="[^"]*${store.selectors.deal.replace('.', '')}[^"]*"[^>]*>([^<]+)`));

        if (productMatch && priceMatch) {
            products.push({
                product: productMatch[1].trim(),
                price: priceMatch[1].trim().replace(/[^\d.,]/g, ''),
                deal: dealMatch ? dealMatch[1].trim() : null,
                expires: calculateExpiry(),
            });
        }
    }

    return products;
}

function calculateExpiry() {
    const next = new Date();
    next.setDate(next.getDate() + ((7 - next.getDay()) % 7));
    return next.toISOString().split('T')[0];
}

export async function POST(req: Request) {
    const auth = req.headers.get('authorization');
    if (auth !== `Bearer ${process.env.CRON_SECRET}`) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    return runScraper();
}

export async function GET(req: Request) {
    // Vercel Cron uses GET requests with Authorization header
    const auth = req.headers.get('authorization');
    if (auth !== `Bearer ${process.env.CRON_SECRET}`) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    return runScraper();
}

async function runScraper() {
    if (!db) {
        console.warn("DB not initialized - check environment variables");
        return NextResponse.json({ error: 'Database not initialized (check env vars)' }, { status: 500 });
    }

    console.log('[SCRAPER] Starting weekly fuel run...');

    const results = await Promise.all(STORES.map(store => scrapeStore(store, db!)));

    const success = results.filter((r) => !r.error);
    const failed = results.filter((r) => r.error);

    console.log('[SCRAPER] Complete:', { success: success.length, failed: failed.length });

    return NextResponse.json({
        success: success.length,
        failed: failed.length,
        results,
    }, { status: 200 });
}


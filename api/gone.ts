// api/gone.ts
export default function handler(_req: any, res: any) {
  // Always respond 410 Gone
  res.status(410);
  res.setHeader('X-Robots-Tag', 'noindex');
  res.setHeader('Cache-Control', 'no-store, max-age=0');
  res.setHeader('Content-Type', 'text/plain; charset=utf-8');
  res.end('Gone');
}

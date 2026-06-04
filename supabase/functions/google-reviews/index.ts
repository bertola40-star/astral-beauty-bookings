// Fetches Google Place details (rating, review count, reviews) via the
// Lovable Google Maps connector gateway (Places API New).
import { corsHeaders } from 'npm:@supabase/supabase-js@2/cors';

const PLACE_ID = 'ChIJi9PiE_zPwogR8W71AcGadbs';
const GATEWAY_URL = 'https://connector-gateway.lovable.dev/google_maps';

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  try {
    const LOVABLE_API_KEY = Deno.env.get('LOVABLE_API_KEY');
    const GOOGLE_MAPS_API_KEY = Deno.env.get('GOOGLE_MAPS_API_KEY');

    if (!LOVABLE_API_KEY || !GOOGLE_MAPS_API_KEY) {
      return new Response(
        JSON.stringify({ error: 'Google Maps connector is not configured' }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } },
      );
    }

    const fieldMask = [
      'id',
      'displayName',
      'rating',
      'userRatingCount',
      'googleMapsUri',
      'reviews',
    ].join(',');

    const response = await fetch(
      `${GATEWAY_URL}/places/v1/places/${PLACE_ID}?languageCode=en`,
      {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${LOVABLE_API_KEY}`,
          'X-Connection-Api-Key': GOOGLE_MAPS_API_KEY,
          'X-Goog-FieldMask': fieldMask,
        },
      },
    );

    const data = await response.json();

    if (!response.ok) {
      console.error('Places API error', response.status, data);
      return new Response(
        JSON.stringify({ error: data?.error?.message || 'Places API request failed', status: response.status }),
        { status: 502, headers: { ...corsHeaders, 'Content-Type': 'application/json' } },
      );
    }

    const reviews = (data.reviews || []).map((r: any) => ({
      author_name: r.authorAttribution?.displayName || 'Google user',
      author_photo: r.authorAttribution?.photoUri || null,
      rating: r.rating || 5,
      text: r.text?.text || r.originalText?.text || '',
      relative_time: r.relativePublishTimeDescription || '',
      publish_time: r.publishTime || null,
    }));

    return new Response(
      JSON.stringify({
        name: data.displayName?.text || 'Astral Beauty Spa',
        rating: data.rating ?? null,
        userRatingCount: data.userRatingCount ?? 0,
        googleMapsUri: data.googleMapsUri || null,
        reviews,
      }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } },
    );
  } catch (err) {
    console.error('google-reviews error', err);
    return new Response(
      JSON.stringify({ error: (err as Error).message }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } },
    );
  }
});

// app/api/place-details/route.js
import { NextResponse } from 'next/server';

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const place_id = searchParams.get('place_id');

  if (!place_id) {
    return NextResponse.json({ error: 'Missing place_id' }, { status: 400 });
  }

  const response = await fetch(
    `https://places.googleapis.com/v1/places/${place_id}?fields=id,displayName,formatted_address,formatted_phone_number,website,photos&key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}`
  );

  if (!response.ok) {
    return NextResponse.json({ error: 'Failed to fetch place details' }, { status: response.status });
  }

  const data = await response.json();
  return NextResponse.json(data);
}

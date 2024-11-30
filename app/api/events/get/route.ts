import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/db';
import { Event } from '@/models/Event';

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const eventId = searchParams.get('id');

    await connectDB();

    if (eventId) {
      // Récupérer un événement spécifique
      const event = await Event.findById(eventId);
      if (!event) {
        return NextResponse.json(
          { error: 'Événement non trouvé' },
          { status: 404 }
        );
      }
      return NextResponse.json(event);
    } else {
      // Récupérer tous les événements avec pagination
      const page = parseInt(searchParams.get('page') || '1');
      const limit = parseInt(searchParams.get('limit') || '10');
      const skip = (page - 1) * limit;

      const events = await Event.find()
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit);

      const total = await Event.countDocuments();

      return NextResponse.json({
        events,
        pagination: {
          total,
          page,
          pages: Math.ceil(total / limit)
        }
      });
    }
  } catch (error) {
    console.error('Erreur récupération événements:', error);
    return NextResponse.json(
      { error: 'Erreur serveur' },
      { status: 500 }
    );
  }
}
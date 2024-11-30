import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/db';
import { Event } from '@/models/Event';
import { isValidEvent } from '@/lib/validation/event';

export async function PUT(req: Request) {
  try {
    const body = await req.json();
    const { eventId, userId, ...eventData } = body;

    // Validation des données
    const validationError = isValidEvent(eventData);
    if (validationError) {
      return NextResponse.json(
        { error: validationError },
        { status: 400 }
      );
    }

    await connectDB();

    // Vérifier si l'événement existe et appartient à l'utilisateur
    const event = await Event.findOne({ _id: eventId, userId });
    if (!event) {
      return NextResponse.json(
        { error: 'Événement non trouvé ou non autorisé' },
        { status: 404 }
      );
    }

    // Mettre à jour l'événement
    const updatedEvent = await Event.findByIdAndUpdate(
      eventId,
      { ...eventData },
      { new: true }
    );

    return NextResponse.json(updatedEvent);
  } catch (error) {
    console.error('Erreur modification événement:', error);
    return NextResponse.json(
      { error: 'Erreur serveur' },
      { status: 500 }
    );
  }
}
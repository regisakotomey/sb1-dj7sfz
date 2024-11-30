import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/db';
import { Event } from '@/models/Event';

export async function DELETE(req: Request) {
  try {
    const { eventId, userId } = await req.json();

    await connectDB();

    // Vérifier si l'événement existe et appartient à l'utilisateur
    const event = await Event.findOne({ _id: eventId, userId });
    if (!event) {
      return NextResponse.json(
        { error: 'Événement non trouvé ou non autorisé' },
        { status: 404 }
      );
    }

    // Supprimer l'événement
    await Event.findByIdAndDelete(eventId);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Erreur suppression événement:', error);
    return NextResponse.json(
      { error: 'Erreur serveur' },
      { status: 500 }
    );
  }
}
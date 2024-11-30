import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/db';
import { User } from '@/models/User';
import { generateVerificationCode } from '@/lib/verification';
import { sendVerificationCode } from '@/lib/notifications';
import bcrypt from 'bcryptjs';

export async function POST(req: Request) {
  try {
    await connectDB();

    const body = await req.json();
    const { email, phone, password, firstName, lastName, country, sector, anonymousId} = body;

    // Vérifier si l'utilisateur existe déjà avec cet email ou téléphone
    const existingUser = await User.findOne({
      $or: [
        { email: email || undefined },
        { phone: phone || undefined }
      ]
    });

    if (existingUser && !existingUser.isAnonymous) {
      return NextResponse.json(
        { error: 'Utilisateur déjà existant' },
        { status: 400 }
      );
    }

    // Générer le code de vérification
    const verificationCode = generateVerificationCode();

    // Crypter le mot de passe
    const hashedPassword = await bcrypt.hash(password, 10);

    let user;

    user = await User.findByIdAndUpdate(
        anonymousId,
        {
          email,
          phone,
          password: hashedPassword, // Utiliser le mot de passe crypté
          firstName,
          lastName,
          country,
          sector,
          verificationCode
        },
        { new: true }
      );

    if (!user) {
      return NextResponse.json(
        { error: 'Erreur lors de la création de l\'utilisateur' },
        { status: 500 }
      );
    }

    // Envoyer le code de vérification
    const destination = email || phone;
    if (destination) {
      await sendVerificationCode(destination, verificationCode);
    }

    // Retour de la réponse sans le mot de passe et le code de vérification
    const userResponse = user.toObject();
    delete userResponse.password;
    delete userResponse.verificationCode;

    return NextResponse.json({
      id: userResponse._id,
      firstName: userResponse.firstName,
      lastName: userResponse.lastName,
      country_code: userResponse.country,
      sector: userResponse.sector,
      email: userResponse.email,
      phone: userResponse.phone
    }, { status: 201 });
  } catch (error) {
    console.error('Erreur inscription:', error);
    return NextResponse.json(
      { error: 'Erreur serveur' },
      { status: 500 }
    );
  }
}
import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';
import { MailData } from './interfaces/mail.interface';

@Injectable()
export class MailService {
  constructor(private readonly mailerService: MailerService) {}

  async sendSignUpMail(mailData: MailData<{ hash: string }>) {
    await this.mailerService.sendMail({
      to: mailData.to,
      subject: 'Bienvenue sur GetYourStuff',
      text: `Veuillez cliquer sur le lien ci-après pour vérifier votre compte: ${process.env.GATEWAY_PWA_URL}/api/verify-email/${mailData.data.hash}`,
    });
  }

  async sendForgotPasswordMail(
    mailData: MailData<{ hash: string; role: string }>,
  ) {
    const link =
      mailData.data.role === 'USER'
        ? `${process.env.GATEWAY_PWA_URL}/api/reset-password/${mailData.data.hash}`
        : `${process.env.GATEWAY_ADMIN_DASHBOARD_URL}/reset-password/${mailData.data.hash}`;
    await this.mailerService.sendMail({
      to: mailData.to,
      subject: 'Réinitialisation de votre mot de passe',
      text: `Veuillez cliquer sur le lien ci-après pour réinitialiser votre mot de passe: ${link}`,
    });
  }
}

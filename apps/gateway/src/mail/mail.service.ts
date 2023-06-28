import { Injectable } from '@nestjs/common';
import {MailerService} from "@nestjs-modules/mailer";
import { MailData } from "./interfaces/mail.interface";

@Injectable()
export class MailService {
    constructor(private readonly mailerService: MailerService) {}

    async sendSignUpMail(mailData: MailData<{hash: string}>) {
        await this.mailerService.sendMail({
            to: mailData.to,
            subject: 'Bienvenue sur GetYourShit',
            text: `Veuillez cliquer sur le lien ci-après pour vérifier votre compte: ${process.env.GATEWAY_PWA_URL}/api/verify-email/${mailData.data.hash}` ,
        })
    }
}

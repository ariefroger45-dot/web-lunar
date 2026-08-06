import { Body, Controller, Post, Req, Res, HttpCode } from '@nestjs/common';
import type { Request, Response } from 'express';
import { BookingService } from './booking.service';

@Controller('booking')
export class BookingController {
  constructor(private readonly bookingService: BookingService) {}

  @Post('create-payment')
  async createPayment(
    @Body()
    body: {
      nama: string;
      email: string;
      whatsapp: string;
      tanggal: string;
      tempat: string;
      paket: string;
    },
  ) {
    return this.bookingService.createQrisPayment(body);
  }

  // Webhook dari Xendit saat QR dibayar
  @Post('xendit-webhook')
  @HttpCode(200)
  handleWebhook(@Req() req: Request, @Res() res: Response) {
    const token = req.headers['x-callback-token'];
    if (token !== process.env.XENDIT_WEBHOOK_TOKEN) {
      return res.status(401).send('Unauthorized');
    }

    console.log('Payment webhook diterima:', req.body);
    // TODO: cari booking berdasarkan reference_id, update status jadi "paid"
    // simpan/kirim notifikasi ke email/WA admin kalau perlu

    res.status(200).send('OK');
  }
}

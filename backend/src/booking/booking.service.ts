import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import axios from 'axios';

@Injectable()
export class BookingService {
  constructor(private config: ConfigService) {}

  async createQrisPayment(booking: {
    nama: string;
    email: string;
    whatsapp: string;
    tanggal: string;
    tempat: string;
    paket: string;
  }) {
    const secretKey = this.config.get<string>('XENDIT_SECRET_KEY');
    const amount = Number(this.config.get<string>('BOOKING_DP_AMOUNT'));
    const authHeader =
      'Basic ' + Buffer.from(`${secretKey}:`).toString('base64');

    const referenceId = `booking_${Date.now()}`;

    const payload = {
      reference_id: referenceId,
      currency: 'IDR',
      amount,
      payment_method: {
        type: 'QR_CODE',
        reusability: 'ONE_TIME_USE',
        qr_code: { channel_code: 'QRIS' },
      },
      description: `DP Booking - ${booking.nama} (${booking.paket})`,
      metadata: {
        nama: booking.nama,
        email: booking.email,
        whatsapp: booking.whatsapp,
        tanggal: booking.tanggal,
        tempat: booking.tempat,
        paket: booking.paket,
      },
    };

    try {
      const response = await axios.post(
        'https://api.xendit.co/payment_requests',
        payload,
        {
          headers: {
            Authorization: authHeader,
            'Content-Type': 'application/json',
          },
        },
      );

      const data = response.data;

      return {
        referenceId: data.reference_id,
        paymentRequestId: data.id,
        qrString:
          data.payment_method?.qr_code?.channel_properties?.qr_string ?? null,
        amount,
        expiresAt:
          data.payment_method?.qr_code?.channel_properties?.expires_at ?? null,
      };
    } catch (err: any) {
      console.error('Xendit error:', err.response?.data ?? err.message);
      throw new InternalServerErrorException('Gagal membuat QR pembayaran');
    }
  }
}

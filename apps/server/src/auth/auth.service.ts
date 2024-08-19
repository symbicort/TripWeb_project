import { Injectable } from '@nestjs/common';
import axios from 'axios';

@Injectable()
export class AuthService {
  async kakaoLogin(code: string) {
    const REST_API_KEY = String(process.env.KAKAO_REST_API_KEY);
    const REDIRECT_URI = String(process.env.KAKAO_REDIRECT_URI);
    const AUTHORIZE_CODE = code;

    const url = 'https://kauth.kakao.com/oauth/token';

    const params = new URLSearchParams();
    params.append('grant_type', 'authorization_code');
    params.append('client_id', REST_API_KEY);
    params.append('redirect_uri', REDIRECT_URI);
    params.append('code', AUTHORIZE_CODE);

    try {
      const response = await axios.post(url, params.toString(), {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      });

      console.log('Access Token:', response.data);
      return response.data;
    } catch (error) {
      console.error(
        'Error fetching token:',
        error.response ? error.response.data : error.message,
      );
    }
  }
}

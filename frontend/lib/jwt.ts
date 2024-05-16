import jwt from 'jsonwebtoken';

export default function getSubFromJwt(token: string): string | null {
  try {
    const decoded = jwt.decode(token);
    if (decoded && typeof decoded === 'object' && 'sub' in decoded && typeof decoded.sub === 'string') {
      return decoded.sub;
    }
    return null;
  } catch (err) {
    console.error(err);
    return null;
  }
}
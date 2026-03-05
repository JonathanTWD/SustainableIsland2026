import jwt from "jsonwebtoken";
import { prisma } from "../config/db";
import { hashPassword, comparePassword } from "../utils/password.util";
import { jwtconfig } from "../config/jwt";
import { LoginDTO, RegisterDTO, AuthResponse, JWTPayload } from "../interfaces/auth.interface";

/**
 * Generate a JWT token for a user
 * @param userId - User ID
 * @param email - User email
 * @returns JWT token string
 */
export function generateToken(userId: number, email: string): string {
  if (!jwtconfig.secret) {
    throw new Error("JWT_SECRET is not configured in environment");
  }

  const payload: JWTPayload = {
    userId,
    email,
  };

  return jwt.sign(payload, jwtconfig.secret, {
    expiresIn: (jwtconfig.expiresIn || "1d") as any, // trust me, this is the only way, TS is very strict with the types
    algorithm: "HS256",
  });
}

/**
 * Verify and decode a JWT token
 * @param token - Token to verify
 * @returns Decoded payload if valid, null otherwise
 */
export function verifyToken(token: string): JWTPayload | null {
  try {
    if (!jwtconfig.secret) {
      throw new Error("JWT_SECRET is not configured in environment");
    }

    const decoded = jwt.verify(token, jwtconfig.secret) as JWTPayload;
    return decoded;
  } catch (error) {
    return null;
  }
}

/**
 * Business logic for registering a new user
 */
export async function registerUser(registerData: RegisterDTO): Promise<AuthResponse> {
  const { name, email, password } = registerData;

  const existingUser = await prisma.users.findUnique({
    where: { email },
  });

  if (existingUser) {
    throw new Error("EMAIL_ALREADY_EXISTS");
  }

  const password_hash = await hashPassword(password);

  const user = await prisma.users.create({
    data: {
      name: name || null,
      email,
      password_hash,
    },
  });

  const token = generateToken(user.id, user.email);

  return {
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
      created_at: user.created_at,
    },
    token,
  };
}

export async function loginUser(loginData: LoginDTO): Promise<AuthResponse> {
  const { email, password } = loginData;

  const user = await prisma.users.findUnique({
    where: { email },
  });

  if (!user) {
    throw new Error("INVALID_CREDENTIALS");
  }

  const isPasswordValid = await comparePassword(password, user.password_hash);

  if (!isPasswordValid) {
    throw new Error("INVALID_CREDENTIALS");
  }

  const token = generateToken(user.id, user.email);

  return {
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
      created_at: user.created_at,
    },
    token,
  };
}

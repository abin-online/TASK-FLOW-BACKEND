import { supabase } from '../util/db';
import { hashPassword, comparePassword } from '../util/hash';
import { generateAccessToken, generateRefreshToken, verifyRefreshToken } from '../util/jwt';

export const register = async (name: string, email: string, password: string) => {
    const { data: existing } = await supabase.from('users').select('*').eq('email', email).single();
    if (existing) throw new Error("Email already registered");

    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const hashed = await hashPassword(password);

    const { data, error } = await supabase.from('users').insert([
        { name, email, password: hashed, otp }
    ]);

    if (error) throw new Error(error.message);
    return { message: "Registered! OTP sent to email (simulated)", otp };
};


export const verifyOtp = async (email: string, otp: string) => {
  const { data: user, error } = await supabase
    .from("users")
    .select("*")
    .eq("email", email)
    .single();

  if (error || !user) throw new Error("User not found");

  if (user.otp !== otp) throw new Error("Invalid OTP");

  const { error: updateError } = await supabase
    .from("users")
    .update({ is_verified: true, otp: null })
    .eq("email", email);

  if (updateError) throw new Error("Failed to update verification status");

  const accessToken = generateAccessToken(user.id);
  const refreshToken = generateRefreshToken(user.id);

  return {
    message: "OTP Verified & Session Started 🎉",
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
    },
    accessToken,
    refreshToken,
  };
};



export const login = async (email: string, password: string) => {
    const { data: user } = await supabase.from('users').select('*').eq('email', email).single();
    if (!user) throw new Error("User not found");
    if (!user.is_verified) throw new Error("User not verified");

    const match = await comparePassword(password, user.password);
    if (!match) throw new Error("Invalid credentials");

    const accessToken = generateAccessToken(user.id);
    const refreshToken = generateRefreshToken(user.id);

    return {
        message: "Login successful",
        user: { id: user.id, email: user.email, name: user.name },
        accessToken,
        refreshToken
    };
};


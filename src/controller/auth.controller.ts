import { Request, Response } from 'express';
import * as AuthService from '../services/auth.services'
import { generateAccessToken, verifyRefreshToken } from '../util/jwt';
import { sendOtpEmail } from '../services/sendOtpEmail';

export const registerUser = async (req: Request, res: Response) => {
    const { name, email, password } = req.body;
    try {
        console.log('in register')
        const result = await AuthService.register(name, email, password);

        const { otp } = result;

        // Send OTP mail after successful registration
       const emailResult =  await sendOtpEmail(name, email, otp);
console.log(emailResult)
        res.status(201).json(result);
    } catch (err: any) {
        res.status(400).json({ error: err.message });
    }
};

export const verifyUser = async (req: Request, res: Response) => {
    const { email, otp } = req.body;
    try {
        const result = await AuthService.verifyOtp(email, otp);
        res.status(200).json(result);
    } catch (err: any) {
        res.status(400).json({ error: err.message });
    }
};

export const loginUser = async (req: Request, res: Response) => {
    const { email, password } = req.body;
    try {
        const result = await AuthService.login(email, password);
        res.status(200).json(result);
    } catch (err: any) {
        res.status(400).json({ error: err.message });
    }
};



export const refreshToken = async (req: Request, res: Response): Promise<void> => {
    const { token } = req.body;

    try {
        const decoded = verifyRefreshToken(token) as any;
        const newAccessToken = generateAccessToken(decoded.userId);

        res.status(200).json({ accessToken: newAccessToken });
    } catch (err) {
        res.status(401).json({ error: "Invalid refresh token" });
    }
};

import { cookies } from 'next/headers'
import { NextRequest, NextResponse } from 'next/server'
import { MiniAppWalletAuthSuccessPayload, verifySiweMessage } from '@worldcoin/minikit-js'

export const dynamic = 'force-dynamic';

interface IRequestPayload {
	payload: MiniAppWalletAuthSuccessPayload
	nonce: string
}

export const POST = async (req: NextRequest) => {
	const { payload, nonce } = (await req.json()) as IRequestPayload
	if (nonce != (await cookies()).get('siwe')?.value) {
		return NextResponse.json({
			status: 'error',
			isValid: false,
			message: 'Invalid nonce',
		})
	}
	try {
		const validMessage = await verifySiweMessage(payload, nonce)
		return NextResponse.json({
			status: 'success',
			isValid: validMessage.isValid,
		})
	} catch (error: any) {
		// Handle errors in validation or processing
		return NextResponse.json({
			status: 'error',
			isValid: false,
			message: error.message,
		})
	}
}

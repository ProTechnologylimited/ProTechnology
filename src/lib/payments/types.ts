export interface InitParams { email: string; amountMinor: number; currency: string; reference: string; callbackUrl: string }
export interface VerifyResult { ok: boolean; reference: string; amountMinor: number; currency: string }
export interface PaymentProvider {
  name: string;
  initialize(p: InitParams): Promise<{ authorizationUrl: string }>;
  verify(reference: string): Promise<VerifyResult>;
  verifyWebhookSignature(rawBody: string, signature: string | null): boolean;
}

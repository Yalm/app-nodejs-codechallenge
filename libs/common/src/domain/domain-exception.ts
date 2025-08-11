export class DomainException extends Error {
  readonly code: string;
  readonly customData?: Record<string, string>;
  constructor(options: {
    code: string;
    message: string;
    customData?: Record<string, string>;
  }) {
    super(options.message);
    this.code = options.code;
    this.customData = options.customData;
  }

  toPrimitives() {
    return {
      code: this.code,
      message: this.message,
      customData: this.customData,
    };
  }
}

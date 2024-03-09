import { PasswordState } from '../models/password.model';

export const passwordInvalidStatesRegExp: Record<string, string> = {
    min8: '^.{1,7}$',
} as const;
export const passwordIncludesRegExp: Record<string, string> = {
    digit: '(?=.*\\d)',
    letter: '(?=.*[a-zA-Z])',
    specialChar: '(?=.*[!@#$%^&*()_+\\-=\\[\\]{};\':"\\\\|,.<>\\/?])',
} as const;

export const strengthCssClass: Record<string, PasswordState> = {
    0: 'invalid',
    1: 'default',
    2: 'weak',
    3: 'medium',
    4: 'strong',
} as const;

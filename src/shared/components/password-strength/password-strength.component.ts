import {ChangeDetectionStrategy, Component, Input, OnChanges, signal, WritableSignal} from '@angular/core';
import {NgClass} from '@angular/common';

import {
  passwordIncludesRegExp,
  passwordInvalidStatesRegExp,
  strengthCssClass,
} from '../../configs/password-strength.config';
import {PasswordState} from '../../models/password.model';

@Component({
    selector: 'app-password-strength',
    standalone: true,
    imports: [NgClass],
    templateUrl: './password-strength.component.html',
    styleUrl: './password-strength.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PasswordStrengthComponent implements OnChanges {
    @Input({ required: true }) currentPassword!: string;
    @Input({ required: true }) passwordIncludesRegExp!: Record<string, string>;
    @Input({ required: true }) passwordInvalidStatesRegExp!: Record<string, string>;
    public strengthCssClass: WritableSignal<PasswordState> = signal('default');
    public ngOnChanges(): void {
        this.setPasswordState();
    }

    private hasPasswordInvalidState(): boolean {
        return Object.values(passwordInvalidStatesRegExp).some((state) =>
            new RegExp(state, 'gi').test(this.currentPassword)
        );
    }

    private setPasswordState(): void {
        if (this.hasPasswordInvalidState()) {
            this.strengthCssClass.set('invalid');
            return;
        }
        this.setPasswordStrength();
    }

    private setPasswordStrength(): void {
        const keys = Object.keys(passwordIncludesRegExp);
        const strengthScore = keys.reduce((acc, key) => {
            const hasSpecificType = new RegExp(passwordIncludesRegExp[key], 'gi').test(this.currentPassword);
            return hasSpecificType ? acc + 1 : acc;
        }, 1);
        this.setCssStyle(strengthScore);
    }

    private setCssStyle(score: number): void {
        this.strengthCssClass.set(strengthCssClass[score] ?? '');
    }
}

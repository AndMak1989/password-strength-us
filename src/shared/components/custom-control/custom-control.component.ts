import { Component, forwardRef, Input, signal } from '@angular/core';
import {
    ControlValueAccessor,
    FormControl,
    FormsModule,
    NG_VALUE_ACCESSOR,
    ReactiveFormsModule,
} from '@angular/forms';
import { noop } from 'rxjs';
import { PasswordStrengthComponent } from '../password-strength/password-strength.component';
import { NgIf } from '@angular/common';
import { passwordIncludesRegExp, passwordInvalidStatesRegExp } from '../../configs/password-strength.config';

@Component({
    selector: 'app-custom-control',
    standalone: true,
    imports: [FormsModule, ReactiveFormsModule, PasswordStrengthComponent, NgIf],
    templateUrl: './custom-control.component.html',
    styleUrl: './custom-control.component.scss',
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            multi: true,
            useExisting: forwardRef(() => CustomControlComponent),
        },
    ],
})
export class CustomControlComponent implements ControlValueAccessor {
    @Input() showPasswordStrength: boolean = false;
    @Input() passwordIncludesRegExp: Record<string, string> = passwordIncludesRegExp;
    @Input() passwordInvalidStatesRegExp: Record<string, string> = passwordInvalidStatesRegExp;
    public isPasswordVisible = signal(false);
    public formControl: FormControl = new FormControl<string>('');

    public onChange: (value: string) => void = noop;
    public onTouch: () => void = noop;
    public togglePasswordType(): void {
        this.isPasswordVisible.set(!this.isPasswordVisible());
    }
    public registerOnChange(fn: (value: string) => void): void {
        this.onChange = fn;
    }

    public registerOnTouched(fn: () => void): void {
        this.onTouch = fn;
    }

    public setDisabledState(isDisabled: boolean): void {
        isDisabled ? this.formControl.disable() : this.formControl.enable();
    }

    public writeValue(value: string): void {
        this.formControl.setValue(value, { emitEvent: false });
    }
}

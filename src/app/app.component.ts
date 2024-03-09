import { Component, OnInit } from '@angular/core';
import { CustomControlComponent } from '../shared/components/custom-control/custom-control.component';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
    selector: 'app-root',
    standalone: true,
    imports: [CustomControlComponent, ReactiveFormsModule],
    templateUrl: './app.component.html',
    styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
    public formGroup!: FormGroup;
    constructor(private readonly formBuilder: FormBuilder) {}

    public ngOnInit(): void {
        this.formGroup = this.formBuilder.group({
            password: ['', []],
        });
    }
}

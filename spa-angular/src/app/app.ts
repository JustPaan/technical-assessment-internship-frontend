import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  Validators,
  ReactiveFormsModule,
  FormGroup
} from '@angular/forms';
import { ApiService } from './services/api.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './app.html',
  styleUrls: ['./app.css']
})
export class AppComponent {
  submitting = false;
  posts: any[] = [];

  // declare the form first (no initializer here)
  form!: FormGroup;

  constructor(private fb: FormBuilder, private api: ApiService) {
    // initialize the form AFTER fb is injected
    this.form = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.email]],
      message: ['', [Validators.required, Validators.minLength(10)]],
    });
  }

  get f() {
    return this.form.controls;
  }

  loadPosts() {
    this.api.getPosts().subscribe({
      next: data => (this.posts = data),
      error: () => (this.posts = []),
    });
  }

  onSubmit() {
    if (this.form.invalid) return;
    this.submitting = true;

    const payload = { ...this.form.value, length: this.form.value.message!.length };

    setTimeout(() => {
      console.log('Submitted payload:', payload);
      this.submitting = false;
      this.form.reset();
      alert('Form submitted (local demo) — check console for payload.');
    }, 500);
  }
}

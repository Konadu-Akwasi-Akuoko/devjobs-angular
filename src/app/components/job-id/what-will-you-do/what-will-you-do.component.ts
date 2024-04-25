import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-what-will-you-do',
  standalone: true,
  imports: [],
  templateUrl: './what-will-you-do.component.html',
  styleUrl: './what-will-you-do.component.css',
})
export class WhatWillYouDoComponent {
  @Input({ required: true }) roles: {
    content: string;
    items: string[];
  } = { content: '', items: [] };
}

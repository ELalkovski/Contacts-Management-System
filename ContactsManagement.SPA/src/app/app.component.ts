import { Component, ElementRef, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  constructor(
    private router: Router,
    private elementRef: ElementRef,
  ) { }

  ngOnInit(): void {
  }

  public navigate(path: string, link: string): void {
    const dom: HTMLElement = this.elementRef.nativeElement;
    const elements = dom.querySelectorAll('.nav-link');

    elements.forEach((element) => {
      if (element.id === link) {
        element.classList.add('active');
      } else {
        element.classList.remove('active');
      }
    });

    this.router.navigate([path], {});
  }
}

import { Directive, ElementRef, Input, OnChanges } from '@angular/core';

@Directive({
  selector: '[appStarRating]',
  standalone: true
})
export class StarRatingDirective implements OnChanges {
  
  @Input('appStarRating') rating!: number;
  
  constructor(private el: ElementRef) {}

  ngOnChanges(): void{
    this.setStars();
  }

  setStars(){
    const maxStars = 5;
    const fullStars = Math.floor(this.rating);
    const halfStar = this.rating % 1 >= 0.5;
    const emptyStars = maxStars - fullStars - (halfStar ? 1 : 0);

    let starHtml = '';

    for (let i = 0; i < fullStars; i++) {
      starHtml += '<span class="star full" style="color: #bc8a55">&#9733:</span>';
    }

    if (halfStar){
      starHtml += '<span class="star half" style="background: linear-gradient(90deg, #bc8a55 50%, #ccc 50%);background-clip: text; color: transparent">&#9733</span>';
    }

    for (let i = 0; i < emptyStars; i++) {
      starHtml += '<span class="star empty" style="color: #ccc">&#9733:</span>';
    }

    this.el.nativeElement.innerHTML = starHtml;
  }

}

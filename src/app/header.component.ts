import { Component, OnInit } from '@angular/core';

import { RecipeService } from './recipes/recipe.service';

@Component({
  selector: 'rb-header',
  templateUrl: './header.component.html',
  providers: [RecipeService]
})
export class HeaderComponent implements OnInit {

  constructor(private recipeService: RecipeService) { }

  ngOnInit() {
  }

  onStore() {
    this.recipeService.storeData().subscribe(
      (data: any) => console.log(data),
      error => console.log(error)
    );
  }

  onFetch() {
    this.recipeService.fetchData();
  }

}

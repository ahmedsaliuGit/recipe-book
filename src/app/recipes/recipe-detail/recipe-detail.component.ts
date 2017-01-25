import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from "@angular/router";

import { Subscription } from 'rxjs/Rx';

import { Recipe } from '../recipe';
import { ShoppingListService } from '../../shopping-list';
import { RecipeService } from '../recipe.service';

@Component({
  selector: 'rb-recipe-detail',
  templateUrl: './recipe-detail.component.html'
})
export class RecipeDetailComponent implements OnInit, OnDestroy {

	selectedRecipe: Recipe;
	private recipeIndex: number;
	private subscription: Subscription;


	constructor(private sls: ShoppingListService,
				private router: Router,
				private route: ActivatedRoute,
				private recipeService: RecipeService) { }

	ngOnInit() {
		this.subscription = this.route.params.subscribe(
			(param: any) => {
				this.recipeIndex = param['id'];
				this.selectedRecipe = this.recipeService.getRecipe(this.recipeIndex);
			}
		);
	}

	onEditClicked()
	{
		this.router.navigate(['/recipes', this.recipeIndex, 'edit']);
	}

	onDeleteClicked()
	{
		this.recipeService.deleteRecipe(this.selectedRecipe);
		this.router.navigate(['/recipes']);
	}

	onAddToShoppingList() {
		this.sls.addItems(this.selectedRecipe.ingredients);
	}

	ngOnDestroy()
	{
		this.subscription.unsubscribe();
	}

}

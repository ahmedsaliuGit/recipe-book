import { Injectable, EventEmitter } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';

import 'rxjs/Rx';

import { Recipe } from './recipe';
import { Ingredient } from '../shared';

@Injectable()
export class RecipeService {

	recipesChanged = new EventEmitter<Recipe[]>();

	private recipes: Recipe[] = [
		new Recipe('Schnitzel', 'Very tasty', 'https://s3-media4.fl.yelpcdn.com/bphoto/BCG3dvkt_UAU_hbHfkeSkQ/o.jpg', [
			new Ingredient('French Fries', 2),
			new Ingredient('Pork Meat', 1)
		]),
		new Recipe('Summer Salad', 'Okayish', 'http://ohmyveggies.com/wp-content/uploads/2013/06/the_perfect_summer_salad.jpg', [])
	];

	constructor(private http: Http) { }

	getRecipes() {
		return this.recipes;
	}

	getRecipe(id: number) {
		return this.recipes[id];
	}

	deleteRecipe(recipe: Recipe) {
		this.recipes.splice(this.recipes.indexOf(recipe), 1);
	}

	addRecipe(newRecipe: Recipe) {
		this.recipes.push(newRecipe);
	}

	editRecipe(oldRecipe: Recipe, newRecipe: Recipe) {
		this.recipes[this.recipes.indexOf(oldRecipe)] = newRecipe;
	}

	storeData() {
		const body = JSON.stringify(this.recipes);
		const headers = new Headers({
			'Content-Type': 'application/json'
		});
		return this.http.put('https://recipebook-5ba91.firebaseio.com/recipes.json', body, {headers: headers})
			.map((data: any) => data.json());
	}

	fetchData() {
		return this.http.get('https://recipebook-5ba91.firebaseio.com/recipes.json')
			.map((response: Response) => response.json())
			.subscribe(
				(data: Recipe[]) => {
					this.recipes = data;
					this.recipesChanged.emit(this.recipes);
				}
			);
	}

}

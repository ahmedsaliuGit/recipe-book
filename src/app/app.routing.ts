import { RouterModule, Routes } from "@angular/router";

import { RecipesComponent } from "./recipes";
import { ShoppingListComponent } from "./shopping-list";

// All children routes for the App route
import { RECIPE_ROUTES } from "./recipes/recipes.routing";

const APP_ROUTES: Routes = [
	{ path: '', redirectTo: '/recipes', pathMatch: 'full'},
	{ path: 'recipes', component: RecipesComponent, children: RECIPE_ROUTES },
	{ path: 'shopping-list', component: ShoppingListComponent }
];

export const routing = RouterModule.forRoot(APP_ROUTES);